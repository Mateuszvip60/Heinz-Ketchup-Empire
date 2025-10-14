/*
 * → Developed by: @Mateuszvip60
 * → Łączy się z jsonsilo.com dla synchronizacji rankingu.
 */

import { jsonSiloConfig, leaderboardOptions } from "../config.js";

function headers() {
    return {
        "Content-Type": "application/json",
        "X-SILO-KEY": jsonSiloConfig.apiKey,
        "X-SILO-REGION": jsonSiloConfig.region || "api"
    };
}

function buildUrl() {
    const base = jsonSiloConfig.baseUrl?.replace(/\/$/, "") || "https://api.jsonsilo.com";
    return `${base}/${jsonSiloConfig.fileId}`;
}

export function isJsonSiloEnabled() {
    return Boolean(jsonSiloConfig.apiKey && jsonSiloConfig.fileId);
}

export async function fetchLeaderboardRemote() {
    if (!isJsonSiloEnabled()) return null;
    try {
        const response = await fetch(buildUrl(), {
            method: "GET",
            headers: headers()
        });
        if (!response.ok) throw new Error("jsonsilo fetch error");
        const data = await response.json();
        return sanitizeLeaderboard(data);
    } catch (error) {
        console.warn("jsonsilo fetch failed", error);
        return null;
    }
}

export async function pushLeaderboardRemote(data) {
    if (!isJsonSiloEnabled()) return false;
    try {
        const response = await fetch(buildUrl(), {
            method: "PATCH",
            headers: headers(),
            body: JSON.stringify(limitEntries(data))
        });
        return response.ok;
    } catch (error) {
        console.warn("jsonsilo push failed", error);
        return false;
    }
}

function sanitizeLeaderboard(data) {
    const safe = { totalDrops: [], rebirths: [], maxDps: [], playtime: [] };
    if (!data || typeof data !== "object") return safe;
    Object.keys(safe).forEach(key => {
        const list = Array.isArray(data[key]) ? data[key] : [];
        safe[key] = list
            .filter(entry => entry && typeof entry.name === "string")
            .map(entry => ({
                name: entry.name.slice(0, 20),
                score: Number(entry.score) || 0,
                timestamp: entry.timestamp || Date.now()
            }))
            .sort((a, b) => b.score - a.score)
            .slice(0, leaderboardOptions.maxEntries);
    });
    return safe;
}

function limitEntries(data) {
    const limited = { totalDrops: [], rebirths: [], maxDps: [], playtime: [] };
    Object.keys(limited).forEach(key => {
        limited[key] = (data[key] || [])
            .sort((a, b) => b.score - a.score)
            .slice(0, leaderboardOptions.maxEntries);
    });
    return limited;
}
