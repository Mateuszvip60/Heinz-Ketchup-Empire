/*
 * → Developed by: @Mateuszvip60
 * → Liczy koszty, moce kliknięć i produkcję.
 */

import { upgrades } from "../data/upgrades.js";
import { soulUpgrades } from "../data/soulUpgrades.js";
import { markDirty, spendDrops, updateStatsCache } from "./state.js";

const upgradeMap = upgrades.reduce((map, upgrade) => {
    map.set(upgrade.id, upgrade);
    return map;
}, new Map());

const soulUpgradeMap = soulUpgrades.reduce((map, upgrade) => {
    map.set(upgrade.id, upgrade);
    return map;
}, new Map());

export function getUpgradeLevel(state, id) {
    return state.upgrades[id] || 0;
}

export function getUpgradeCost(state, id) {
    const upgrade = upgradeMap.get(id);
    const level = getUpgradeLevel(state, id);
    return Math.floor(upgrade.baseCost * Math.pow(upgrade.costMultiplier, level));
}

export function canAffordUpgrade(state, id) {
    return state.drops >= getUpgradeCost(state, id);
}

export function buyUpgrade(state, id) {
    if (!canAffordUpgrade(state, id)) return false;
    const cost = getUpgradeCost(state, id);
    spendDrops(state, cost);
    state.upgrades[id] = getUpgradeLevel(state, id) + 1;
    markDirty(state);
    return true;
}

export function computeStats(state) {
    const clickPower = calculateClickPower(state);
    const dps = calculateDps(state);
    updateStatsCache(state, { clickPower, dps });
    return { clickPower, dps };
}

export function calculateClickPower(state) {
    if (!state.cached.dirty) {
        return state.cached.clickPower;
    }

    let basePower = state.baseClickPower;
    const clickUpgrade = upgradeMap.get("clickPower");
    basePower += getUpgradeLevel(state, "clickPower") * clickUpgrade.effectPerLevel;
    
    // Add soul upgrade click power
    basePower += getSoulUpgradeLevel(state, "soulClickPower") * 50;

    let multiplier = state.clickMultiplierBonus;
    multiplier *= 1 + state.soulPoints * 0.01;
    // Additional multiplier for rebirths (10% per rebirth)
    multiplier *= Math.pow(1.1, state.rebirthCount);
    // Soul upgrade global multiplier
    multiplier *= 1 + getSoulUpgradeLevel(state, "soulGlobalMultiplier") * 0.25;
    // Soul upgrade drop multiplier
    multiplier *= 1 + getSoulUpgradeLevel(state, "soulDropMultiplier") * 0.1;
    multiplier *= state.globalMultiplierBonus;
    multiplier *= state.randomBoost;

    const bottleLevel = getUpgradeLevel(state, "biggerBottle");
    if (bottleLevel > 0) {
        const bottleUpgrade = upgradeMap.get("biggerBottle");
        multiplier *= 1 + bottleLevel * bottleUpgrade.effectPerLevel;
    }

    const dominationLevel = getUpgradeLevel(state, "globalDomination");
    if (dominationLevel > 0) {
        const dominationUpgrade = upgradeMap.get("globalDomination");
        multiplier *= Math.pow(1 + dominationUpgrade.effectPerLevel, dominationLevel);
    }

    const result = Math.max(1, Math.floor(basePower * multiplier));
    state.cached.clickPower = result;
    return result;
}

export function calculateDps(state) {
    if (!state.cached.dirty) {
        return state.cached.dps;
    }

    let production = 0;
    let globalMultiplier = state.globalMultiplierBonus;

    // Add soul auto clicker
    production += getSoulUpgradeLevel(state, "soulAutoClicker") * 100;
    
    upgrades.forEach(upgrade => {
        const level = getUpgradeLevel(state, upgrade.id);
        if (level === 0) return;
        switch (upgrade.type) {
            case "dpsFlat":
                production += level * upgrade.effectPerLevel;
                break;
            case "globalMultiplier":
                globalMultiplier *= Math.pow(1 + upgrade.effectPerLevel, level);
                break;
            default:
                break;
        }
    });

    production *= globalMultiplier;
    production *= 1 + state.soulPoints * 0.01;
    // Additional multiplier for rebirths (10% per rebirth)
    production *= Math.pow(1.1, state.rebirthCount);
    // Soul upgrade global multiplier
    production *= 1 + getSoulUpgradeLevel(state, "soulGlobalMultiplier") * 0.25;
    // Soul upgrade drop multiplier
    production *= 1 + getSoulUpgradeLevel(state, "soulDropMultiplier") * 0.1;
    production *= state.randomBoost;

    state.cached.dps = Math.max(0, production);
    return state.cached.dps;
}

export function applyPassiveIncome(state, deltaSeconds) {
    const dps = calculateDps(state);
    if (dps <= 0) return;
    const income = dps * deltaSeconds;
    state.drops += income;
    state.totalLifetimeDrops = Math.max(state.totalLifetimeDrops, state.drops);
    markDirty(state);
}

export function estimateRebirth(state) {
    if (state.drops < 1e12) return 0;
    let baseSoulPoints = Math.floor(Math.sqrt(state.drops / 1e12));
    // Apply soul rebirth bonus
    const bonusLevel = getSoulUpgradeLevel(state, "soulRebirthBonus");
    baseSoulPoints *= 1 + (bonusLevel * 0.5);
    return Math.floor(baseSoulPoints);
}

// Soul Upgrade functions
export function getSoulUpgradeLevel(state, id) {
    return state.soulUpgrades[id] || 0;
}

export function getSoulUpgradeCost(state, id) {
    const upgrade = soulUpgradeMap.get(id);
    const level = getSoulUpgradeLevel(state, id);
    return Math.floor(upgrade.baseCost * Math.pow(upgrade.costMultiplier, level));
}

export function canAffordSoulUpgrade(state, id) {
    const upgrade = soulUpgradeMap.get(id);
    const level = getSoulUpgradeLevel(state, id);
    if (upgrade.maxLevel && level >= upgrade.maxLevel) return false;
    return state.soulPoints >= getSoulUpgradeCost(state, id);
}

export function buySoulUpgrade(state, id) {
    if (!canAffordSoulUpgrade(state, id)) return false;
    const cost = getSoulUpgradeCost(state, id);
    state.soulPoints -= cost;
    state.soulUpgrades[id] = getSoulUpgradeLevel(state, id) + 1;
    markDirty(state);
    return true;
}
