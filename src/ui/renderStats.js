/*
 * → Developed by: @Mateuszvip60
 * → Aktualizuje sekcję statystyk w interfejsie.
 */

import { elements } from "./elements.js";
import { formatNumber } from "../utils/number.js";

export function renderStats(state, stats) {
    elements.totalDrops.textContent = formatNumber(state.drops);
    elements.dropsPerSecond.textContent = formatNumber(Math.floor(stats.dps));
    elements.totalClicks.textContent = formatNumber(state.totalClicks);
    elements.rebirthCount.textContent = formatNumber(state.rebirthCount);
    elements.soulPoints.textContent = formatNumber(state.soulPoints);
}
