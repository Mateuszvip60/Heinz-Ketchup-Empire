/*
 * → Developed by: @Mateuszvip60
 * → Sprawdza warunki osiągnięć i wywołuje nagrody.
 */

import { achievements } from "../data/achievements.js";
import { markDirty } from "./state.js";

export function evaluateAchievements(state, onUnlock) {
    achievements.forEach(achievement => {
        if (state.achievements[achievement.id]) return;
        if (!achievement.condition(state)) return;
        achievement.reward(state);
        state.achievements[achievement.id] = true;
        markDirty(state);
        if (typeof onUnlock === "function") {
            onUnlock(achievement.id);
        }
    });
}
