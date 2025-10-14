/*
 * → Developed by: @Mateuszvip60
 * → Prowadzi pętlę gry z adaptacyjnym tempem.
 */

import { performanceOptions } from "../config.js";
import { applyPassiveIncome, computeStats } from "./calculations.js";
import { trackPlaytime, updateMaxDps } from "./state.js";
import { tickRandomEvents } from "./randomEvents.js";

export function createGameLoop(state, callbacks) {
    const { onTick, onSecond } = callbacks;
    let running = false;
    let accumulator = 0;
    let secondTimer = 0;
    let lastFrame = performance.now();

    function determineTick(stats) {
        const now = Date.now();
        const idleTime = now - state.lastClickTime;
        if (idleTime > performanceOptions.idleThreshold) {
            return performanceOptions.maxTick;
        }
        if (stats.dps > performanceOptions.burstThreshold) {
            return performanceOptions.minTick;
        }
        return Math.round((performanceOptions.minTick + performanceOptions.maxTick) / 2);
    }

    function frame(now) {
        if (!running) return;
        const delta = now - lastFrame;
        lastFrame = now;
        accumulator += delta;
        secondTimer += delta;

        let stats = state.cached;

        const targetTick = determineTick(stats);
        while (accumulator >= targetTick) {
            const deltaSeconds = targetTick / 1000;
            applyPassiveIncome(state, deltaSeconds);
            stats = computeStats(state);
            trackPlaytime(state);
            updateMaxDps(state, stats.dps);
            tickRandomEvents(state, stats);
            accumulator -= targetTick;
            if (typeof onTick === "function") {
                onTick({ delta: deltaSeconds, stats });
            }
        }

        if (secondTimer >= 1000) {
            if (typeof onSecond === "function") {
                onSecond({ stats });
            }
            secondTimer = 0;
        }

        requestAnimationFrame(frame);
    }

    return {
        start() {
            if (running) return;
            running = true;
            lastFrame = performance.now();
            requestAnimationFrame(frame);
        },
        stop() {
            running = false;
        }
    };
}
