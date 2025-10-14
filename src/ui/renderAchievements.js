/*
 * → Developed by: @Mateuszvip60
 * → Renderuje listę osiągnięć z ich statusami.
 */

import { elements } from "./elements.js";
import { achievements } from "../data/achievements.js";
import { translate } from "../services/i18n.js";

export function renderAchievements(state) {
    if (!elements.achievementsContainer) return;
    
    const unlockedCount = state.achievements.length;
    const totalCount = achievements.length;
    
    elements.achievementsContainer.innerHTML = `
        <div class="achievements-stats">
            <div class="achievements-progress">${unlockedCount}/${totalCount}</div>
            <div class="achievements-subtitle">${translate('achievementsProgress')}</div>
        </div>
        ${achievements.map(achievement => {
            const isUnlocked = state.achievements.includes(achievement.id);
            const titleKey = `${achievement.id}Title`;
            const descKey = `${achievement.id}Desc`;
            const rewardKey = `${achievement.id}Reward`;
            
            return `
                <div class="achievement-item ${isUnlocked ? 'unlocked' : 'locked'}">
                    <div class="achievement-header">
                        <div class="achievement-icon">${isUnlocked ? '🏆' : '🔒'}</div>
                        <div class="achievement-title">${translate(titleKey)}</div>
                    </div>
                    <div class="achievement-desc">${translate(descKey)}</div>
                    <div class="achievement-reward">${translate(rewardKey)}</div>
                </div>
            `;
        }).join('')}
    `;
}
