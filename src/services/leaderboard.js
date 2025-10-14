/*
 * → Developed by: @Mateuszvip60
 * → Zarządza rankingiem lokalnym i zdalnym.
 */

import { leaderboardOptions } from "../config.js";
import { loadLocalLeaderboard, saveLocalLeaderboard } from "./storage.js";
import { fetchLeaderboardRemote, pushLeaderboardRemote, isJsonSiloEnabled } from "./jsonsilo.js";

const defaultData = {
    totalDrops: [],
    rebirths: [],
    maxDps: [],
    playtime: []
};

export function createLeaderboardManager(state) {
    let data = ensureShape(loadLocalLeaderboard()) || { ...defaultData };
    let category = "totalDrops";
    let lastSync = 0;

    async function refresh() {
        if (!isRemoteActive()) return data;
        try {
            const remote = await fetchLeaderboardRemote();
            if (remote) {
                data = mergeLeaderboard(data, remote);
                saveLocalLeaderboard(data);
            }
        } catch (error) {
            console.warn("refresh leaderboard failed", error);
        }
        return data;
    }

    async function submit() {
        if (!state.playerNameSet || !state.playerName) return data;

        const snapshot = {
            name: state.playerName,
            totalDrops: state.totalLifetimeDrops,
            rebirths: state.rebirthCount,
            maxDps: state.maxDpsReached,
            playtime: state.playTime,
            timestamp: Date.now()
        };

        Object.keys(data).forEach(key => {
            data[key] = data[key].filter(entry => entry.name !== snapshot.name);
        });

        data.totalDrops.push({ name: snapshot.name, score: snapshot.totalDrops, timestamp: snapshot.timestamp });
        data.rebirths.push({ name: snapshot.name, score: snapshot.rebirths, timestamp: snapshot.timestamp });
        data.maxDps.push({ name: snapshot.name, score: snapshot.maxDps, timestamp: snapshot.timestamp });
        data.playtime.push({ name: snapshot.name, score: snapshot.playtime, timestamp: snapshot.timestamp });

        Object.keys(data).forEach(key => {
            data[key] = data[key]
                .sort((a, b) => b.score - a.score)
                .slice(0, leaderboardOptions.maxEntries);
        });

        saveLocalLeaderboard(data);

        if (isRemoteActive()) {
            const now = Date.now();
            if (now - lastSync > leaderboardOptions.autoSubmitInterval) {
                lastSync = now;
                pushLeaderboardRemote(data).catch(error => console.warn("push leaderboard failed", error));
            }
        }

        return data;
    }

    function setCategory(next) {
        category = next;
    }

    function getCategory() {
        return category;
    }

    function getData() {
        return data;
    }

    function getSyncStatus() {
        return isRemoteActive();
    }

    return {
        refresh,
        submit,
        getData,
        getCategory,
        setCategory,
        getSyncStatus
    };

    function isRemoteActive() {
        return Boolean(state.onlineFeaturesEnabled && isJsonSiloEnabled());
    }
}

function ensureShape(raw) {
    if (!raw) return null;
    return {
        totalDrops: Array.isArray(raw.totalDrops) ? raw.totalDrops : [],
        rebirths: Array.isArray(raw.rebirths) ? raw.rebirths : [],
        maxDps: Array.isArray(raw.maxDps) ? raw.maxDps : [],
        playtime: Array.isArray(raw.playtime) ? raw.playtime : []
    };
}

function mergeLeaderboard(local, remote) {
    const merged = { ...defaultData };
    Object.keys(merged).forEach(key => {
        const combined = [...(local[key] || []), ...(remote[key] || [])];
        const seen = new Map();
        combined.forEach(entry => {
            if (!entry || !entry.name) return;
            const existing = seen.get(entry.name);
            if (!existing || existing.score < entry.score) {
                seen.set(entry.name, entry);
            }
        });
        merged[key] = Array.from(seen.values())
            .sort((a, b) => b.score - a.score)
            .slice(0, leaderboardOptions.maxEntries);
    });
    return merged;
}
