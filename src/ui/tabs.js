/*
 * → Developed by: @Mateuszvip60
 * → Przełącza zakładki ulepszeń i rankingu.
 */

import { elements } from "./elements.js";

export function showUpgrades() {
    elements.upgradesContainer.style.display = "block";
    elements.leaderboardContainer.style.display = "none";
    elements.upgradesTab.classList.add("active");
    elements.leaderboardTab.classList.remove("active");
}

export function showLeaderboard() {
    elements.upgradesContainer.style.display = "none";
    elements.leaderboardContainer.style.display = "block";
    elements.upgradesTab.classList.remove("active");
    elements.leaderboardTab.classList.add("active");
}
