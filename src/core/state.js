/*
 * → Developed by: @Mateuszvip60
 * → Odpowiada za tworzenie i aktualizację stanu gry.
 */

import { skins } from "../data/skins.js";
import { featureToggles } from "../config.js";

const VERSION = 2;

export function createInitialState() {
    return {
        version: VERSION,
        drops: 0,
        totalClicks: 0,
        rebirthCount: 0,
        soulPoints: 0,
        language: "pl",
        currentSkin: "classic",
        upgrades: {},
        achievements: {},
        playerName: "",
        playerNameSet: false,
        lastSave: Date.now(),
        lastTick: Date.now(),
        startTime: Date.now(),
        playTime: 0,
        totalLifetimeDrops: 0,
        maxDpsReached: 0,
        lastClickTime: Date.now(),
        baseClickPower: 1,
        clickMultiplierBonus: 1,
        globalMultiplierBonus: 1,
        randomBoost: 1,
        cached: {
            clickPower: 1,
            dps: 0,
            dirty: true
        },
        onlineFeaturesEnabled: featureToggles.onlineFeaturesDefault !== undefined ? featureToggles.onlineFeaturesDefault : true,
        skinUnlocks: skins.reduce((acc, skin) => {
            acc[skin.id] = skin.unlocked;
            return acc;
        }, {}),
        eventTimers: {
            randomBoostExpires: 0,
            nextRandomRoll: Date.now() + 60000
        }
    };
}

export function hydrateState(saved) {
    const state = createInitialState();
    if (!saved) return state;
    try {
        const parsed = typeof saved === "string" ? JSON.parse(saved) : saved;
        return {
            ...state,
            ...parsed,
            version: VERSION,
            cached: {
                ...state.cached,
                dirty: true
            },
            skinUnlocks: {
                ...state.skinUnlocks,
                ...(parsed?.skinUnlocks || {})
            }
        };
    } catch (error) {
        console.warn("Nie udało się odczytać zapisu", error);
        return state;
    }
}

export function markDirty(state) {
    state.cached.dirty = true;
}

export function updateStatsCache(state, { clickPower, dps }) {
    state.cached.clickPower = clickPower;
    state.cached.dps = dps;
    state.cached.dirty = false;
}

export function registerClick(state, value) {
    state.drops += value;
    state.totalClicks += 1;
    state.totalLifetimeDrops = Math.max(state.totalLifetimeDrops, state.drops);
    state.lastClickTime = Date.now();
    markDirty(state);
}

export function addDrops(state, value) {
    state.drops += value;
    state.totalLifetimeDrops = Math.max(state.totalLifetimeDrops, state.drops);
    markDirty(state);
}

export function spendDrops(state, cost) {
    state.drops -= cost;
    if (state.drops < 0) state.drops = 0;
    markDirty(state);
}

export function trackPlaytime(state) {
    const now = Date.now();
    state.playTime = Math.floor((now - state.startTime) / 1000);
}

export function updateMaxDps(state, dps) {
    state.maxDpsReached = Math.max(state.maxDpsReached, dps);
}

export function unlockSkin(state, skinId) {
    state.skinUnlocks[skinId] = true;
}

export function setSkin(state, skinId) {
    state.currentSkin = skinId;
}

export function setLanguage(state, language) {
    state.language = language;
}

export function setPlayerName(state, name) {
    state.playerName = name;
    state.playerNameSet = true;
}

export function scheduleRandomRoll(state, delay) {
    state.eventTimers.nextRandomRoll = Date.now() + delay;
}

export function setRandomBoost(state, multiplier, duration) {
    state.randomBoost = multiplier;
    state.eventTimers.randomBoostExpires = Date.now() + duration;
}

export function clearRandomBoost(state) {
    state.randomBoost = 1;
    state.eventTimers.randomBoostExpires = 0;
}

export function beginRebirth(state, gainedSoulPoints) {
    state.soulPoints += gainedSoulPoints;
    state.rebirthCount += 1;
    state.drops = 0;
    state.totalClicks = 0;
    state.upgrades = {};
    state.baseClickPower = 1;
    state.globalMultiplierBonus = 1;
    state.clickMultiplierBonus = 1;
    state.randomBoost = 1;
    state.cached.dirty = true;
    state.lastTick = Date.now();
}

export function setOnlineFeatures(state, enabled) {
    state.onlineFeaturesEnabled = enabled;
}
