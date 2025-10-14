/*
 * → Developed by: @Mateuszvip60
 * → Przełącza zakładki ulepszeń i rankingu.
 */

import { elements } from "./elements.js";

export function showUpgrades() {
    if (elements.upgradesContainer) {
        elements.upgradesContainer.style.display = "block";
    }
    if (elements.leaderboardContainer) {
        elements.leaderboardContainer.style.display = "none";
    }
    if (elements.upgradesTab) {
        elements.upgradesTab.classList.add("active");
    }
    if (elements.leaderboardTab) {
        elements.leaderboardTab.classList.remove("active");
    }
}

export function showLeaderboard() {
    if (elements.upgradesContainer) {
        elements.upgradesContainer.style.display = "none";
    }
    if (elements.leaderboardContainer) {
        elements.leaderboardContainer.style.display = "block";
    }
    if (elements.upgradesTab) {
        elements.upgradesTab.classList.remove("active");
    }
    if (elements.leaderboardTab) {
        elements.leaderboardTab.classList.add("active");
    }
}
