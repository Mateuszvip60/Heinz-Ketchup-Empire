/*
 * → Developed by: @Mateuszvip60
 * → Przechowuje globalne konfiguracje projektu.
 */

const env = window.__ENV__ || {};

export const jsonSiloConfig = {
    baseUrl: env.JSONSILO_BASE_URL || "https://api.jsonsilo.com",
    fileId: env.JSONSILO_FILE_ID || "82305321-d682-411d-b028-83640c37fc14",
    apiKey: env.JSONSILO_KEY || "",
    region: env.JSONSILO_REGION || "api"
};

export const featureToggles = {
    onlineFeaturesDefault: env.ONLINE_FEATURES_ENABLED !== "false"
};

export const leaderboardOptions = {
    maxEntries: 10,
    autoSubmitInterval: 15000,
    autoRefreshInterval: 20000
};

export const performanceOptions = {
    minTick: 50,
    maxTick: 250,
    burstThreshold: 120,
    idleThreshold: 8000
};
