/*
 * → Developed by: @Mateuszvip60
 * → Steruje losowymi zdarzeniami zwiększającymi tempo gry.
 */

import { addDrops, scheduleRandomRoll, setRandomBoost, clearRandomBoost, markDirty } from "./state.js";
import { chance, pickRandom } from "../utils/random.js";

const BOOST_DURATION = 30000;
const BOOST_MULTIPLIER = 2;
const RAIN_MINUTE = 60000;

export function tickRandomEvents(state, stats) {
    const now = Date.now();

    if (state.eventTimers.randomBoostExpires && now >= state.eventTimers.randomBoostExpires) {
        clearRandomBoost(state);
        markDirty(state);
    }

    if (now < state.eventTimers.nextRandomRoll) {
        return;
    }

    if (!chance(0.2)) {
        scheduleRandomRoll(state, RAIN_MINUTE);
        return;
    }

    const events = [
        () => {
            const bonus = stats.dps * 60;
            addDrops(state, bonus);
        },
        () => {
            setRandomBoost(state, BOOST_MULTIPLIER, BOOST_DURATION);
        }
    ];

    const event = pickRandom(events);
    event();
    markDirty(state);
    scheduleRandomRoll(state, RAIN_MINUTE);
}
