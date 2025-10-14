/*
 * → Developed by: @Mateuszvip60
 * → Przełącza zakładki ulepszeń i rankingu.
 */

import { elements } from "./elements.js";

export function showRegularUpgrades() {
    // Hide all containers
    if (elements.upgradesContainer) elements.upgradesContainer.style.display = "block";
    if (elements.soulUpgradesContainer) elements.soulUpgradesContainer.style.display = "none";
    if (elements.achievementsContainer) elements.achievementsContainer.style.display = "none";
    if (elements.leaderboardContainer) elements.leaderboardContainer.style.display = "none";
    
    // Update tab states
    if (elements.regularUpgradesTab) elements.regularUpgradesTab.classList.add("active");
    if (elements.soulUpgradesTab) elements.soulUpgradesTab.classList.remove("active");
    if (elements.achievementsTab) elements.achievementsTab.classList.remove("active");
    if (elements.leaderboardTab) elements.leaderboardTab.classList.remove("active");
}

export function showSoulUpgrades() {
    // Hide all containers
    if (elements.upgradesContainer) elements.upgradesContainer.style.display = "none";
    if (elements.soulUpgradesContainer) elements.soulUpgradesContainer.style.display = "block";
    if (elements.achievementsContainer) elements.achievementsContainer.style.display = "none";
    if (elements.leaderboardContainer) elements.leaderboardContainer.style.display = "none";
    
    // Update tab states
    if (elements.regularUpgradesTab) elements.regularUpgradesTab.classList.remove("active");
    if (elements.soulUpgradesTab) elements.soulUpgradesTab.classList.add("active");
    if (elements.achievementsTab) elements.achievementsTab.classList.remove("active");
    if (elements.leaderboardTab) elements.leaderboardTab.classList.remove("active");
}

export function showAchievements() {
    // Hide all containers
    if (elements.upgradesContainer) elements.upgradesContainer.style.display = "none";
    if (elements.soulUpgradesContainer) elements.soulUpgradesContainer.style.display = "none";
    if (elements.achievementsContainer) elements.achievementsContainer.style.display = "block";
    if (elements.leaderboardContainer) elements.leaderboardContainer.style.display = "none";
    
    // Update tab states
    if (elements.regularUpgradesTab) elements.regularUpgradesTab.classList.remove("active");
    if (elements.soulUpgradesTab) elements.soulUpgradesTab.classList.remove("active");
    if (elements.achievementsTab) elements.achievementsTab.classList.add("active");
    if (elements.leaderboardTab) elements.leaderboardTab.classList.remove("active");
}

export function showUpgrades() {
    showRegularUpgrades();
}

export function showLeaderboard() {
    // Hide all containers
    if (elements.upgradesContainer) elements.upgradesContainer.style.display = "none";
    if (elements.soulUpgradesContainer) elements.soulUpgradesContainer.style.display = "none";
    if (elements.achievementsContainer) elements.achievementsContainer.style.display = "none";
    if (elements.leaderboardContainer) elements.leaderboardContainer.style.display = "block";
    
    // Update tab states
    if (elements.regularUpgradesTab) elements.regularUpgradesTab.classList.remove("active");
    if (elements.soulUpgradesTab) elements.soulUpgradesTab.classList.remove("active");
    if (elements.achievementsTab) elements.achievementsTab.classList.remove("active");
    if (elements.leaderboardTab) elements.leaderboardTab.classList.add("active");
}
