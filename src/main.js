/*
 * → Developed by: @Mateuszvip60
 * → Spina logikę gry, UI i usługi zewnętrzne.
 */

import { hydrateState, registerClick, spendDrops, unlockSkin, setSkin, beginRebirth, setOnlineFeatures } from "./core/state.js";
import { computeStats, calculateClickPower, buyUpgrade, estimateRebirth, buySoulUpgrade } from "./core/calculations.js";
import { evaluateAchievements } from "./core/achievements.js";
import { createGameLoop } from "./core/gameLoop.js";
import { renderStats } from "./ui/renderStats.js";
import { renderUpgrades } from "./ui/renderUpgrades.js";
import { renderSoulUpgrades } from "./ui/renderSoulUpgrades.js";
import { renderAchievements } from "./ui/renderAchievements.js";
import { renderLeaderboard } from "./ui/renderLeaderboard.js";
import { renderSkins, renderBottle } from "./ui/renderSkins.js";
import { renderRebirth } from "./ui/renderRebirth.js";
import { bindBottle } from "./ui/bottle.js";
import { showAchievementPopup, playSound, hideLoadingScreen } from "./ui/effects_helio.js";
import { elements } from "./ui/elements.js";
import { showLeaderboard, showUpgrades, showRegularUpgrades, showSoulUpgrades, showAchievements } from "./ui/tabs.js";
import { openRebirthModal, closeRebirthModal } from "./ui/rebirthModal.js";
import { promptForPlayerName } from "./ui/playerName.js";
import { createI18n, applyTranslationsToDom, applyPlaceholders } from "./services/i18n.js";
import { createLeaderboardManager } from "./services/leaderboard.js";
import { createAutoSaver } from "./services/autoSaver.js";
import { loadGameState, saveGameState } from "./services/storage.js";
import { leaderboardOptions } from "./config.js";
import { formatNumber } from "./utils/number.js";
import { skins } from "./data/skins.js";

const saved = loadGameState();
const state = hydrateState(saved);
const i18n = createI18n(state);
let stats = computeStats(state);

const leaderboardManager = createLeaderboardManager(state);
const autoSaver = createAutoSaver(state, saveGameState, 5000);

function translate(key) {
    return i18n.t(key);
}

function updateLanguageToggle() {
    elements.languageToggle.textContent = `🌍 ${i18n.getLanguage().toUpperCase()}`;
}

function refreshTranslations() {
    applyTranslationsToDom(translate);
    applyPlaceholders(translate);
    updateLanguageToggle();
    refreshUpgrades();
    refreshLeaderboard();
    renderRebirth(state, translate, estimateRebirth(state));
}

function refreshStats() {
    renderStats(state, stats);
    renderRebirth(state, translate, estimateRebirth(state));
}

function refreshUpgrades() {
    renderUpgrades(state, translate, { onBuy: handleUpgradeClick });
}

function refreshSoulUpgrades() {
    renderSoulUpgrades(state, translate, { onBuy: handleSoulUpgradeClick });
}

function refreshAchievements() {
    renderAchievements(state, translate);
}

function refreshSkins() {
    renderSkins(state, { onSelect: handleSkinSelect });
    renderBottle(state);
}

function refreshLeaderboard() {
    if (!elements.leaderboardContainer) {
        return;
    }
    renderLeaderboard({
        state,
        data: leaderboardManager.getData(),
        category: leaderboardManager.getCategory(),
        translate,
        syncEnabled: leaderboardManager.getSyncStatus(),
        onlineEnabled: state.onlineFeaturesEnabled
    });
}

function handleUpgradeClick(id) {
    if (!buyUpgrade(state, id)) return;
    stats = computeStats(state);
    playSound("upgrade");
    refreshStats();
    refreshUpgrades();
    evaluateAchievements(state, onAchievementUnlock);
}

function handleSoulUpgradeClick(id) {
    if (!buySoulUpgrade(state, id)) return;
    stats = computeStats(state);
    playSound("upgrade");
    refreshStats();
    refreshSoulUpgrades();
    evaluateAchievements(state, onAchievementUnlock);
}

function handleSkinSelect(id) {
    if (state.currentSkin === id) return;
    const skin = skins.find(item => item.id === id);
    if (!skin) return;

    const unlocked = Boolean(state.skinUnlocks[id]);
    if (!unlocked && state.drops < skin.cost) return;

    if (!unlocked && skin.cost > 0) {
        spendDrops(state, skin.cost);
        unlockSkin(state, id);
    }

    setSkin(state, id);
    stats = computeStats(state);
    refreshStats();
    refreshSkins();
    evaluateAchievements(state, onAchievementUnlock);
}

function handleLanguageToggle() {
    const next = i18n.getLanguage() === "pl" ? "en" : "pl";
    i18n.setLanguage(next);
    refreshTranslations();
}

function handleLeaderboardTab(event) {
    const target = event.target.closest(".tab-button");
    if (!target) return;
    leaderboardManager.setCategory(target.dataset.category);
    refreshLeaderboard();
}

function handleSubmitScore() {
    leaderboardManager.submit().then(() => refreshLeaderboard());
}

function handleOnlineToggle() {
    const next = !state.onlineFeaturesEnabled;
    setOnlineFeatures(state, next);
    refreshLeaderboard();
    if (next) {
        leaderboardManager.refresh().then(refreshLeaderboard);
        leaderboardManager.submit().then(refreshLeaderboard);
    }
    saveGameState(state);
}

function openRebirth() {
    const soulGain = estimateRebirth(state);
    if (soulGain <= 0) return;
    const info = `<strong>${translate("rebirthBonus").replace("{{value}}", soulGain)}</strong><br><small>${translate("soulBonusInfo")}</small>`;
    openRebirthModal(info);
}

function confirmRebirth() {
    const soulGain = estimateRebirth(state);
    if (soulGain <= 0) return;
    beginRebirth(state, soulGain);
    stats = computeStats(state);
    closeRebirthModal();
    playSound("rebirth");
    refreshStats();
    refreshUpgrades();
    refreshSkins();
    leaderboardManager.submit().then(refreshLeaderboard);
    evaluateAchievements(state, onAchievementUnlock);
}

function onAchievementUnlock(id) {
    // Always play victory sound for achievements
    playSound("victory");
    showAchievementPopup(translate(`${id}Title`), translate(`${id}Desc`), { playAudio: true });
    refreshAchievements(); // Update achievements display
}

function ensurePlayerName() {
    if (state.playerNameSet && state.playerName) {
        leaderboardManager.submit();
        return;
    }
    promptForPlayerName(translate, value => {
        state.playerName = value;
        state.playerNameSet = true;
        leaderboardManager.submit().then(refreshLeaderboard);
        saveGameState(state);
    });
}

function initLeaderboard() {
    if (!elements.leaderboardContainer) {
        return;
    }
    refreshLeaderboard();
    leaderboardManager.refresh().then(() => refreshLeaderboard());
    setInterval(() => leaderboardManager.submit().then(refreshLeaderboard), leaderboardOptions.autoSubmitInterval);
    setInterval(() => leaderboardManager.refresh().then(refreshLeaderboard), leaderboardOptions.autoRefreshInterval);
}

function initUI() {
    refreshTranslations();
    refreshStats();
    refreshUpgrades();
    refreshSoulUpgrades();
    refreshAchievements();
    refreshSkins();
    refreshLeaderboard();
    
    // Setup upgrade tabs
    if (elements.regularUpgradesTab) {
        elements.regularUpgradesTab.addEventListener("click", () => {
            showRegularUpgrades();
            refreshUpgrades();
        });
    }
    
    if (elements.soulUpgradesTab) {
        elements.soulUpgradesTab.addEventListener("click", () => {
            showSoulUpgrades();
            refreshSoulUpgrades();
        });
    }
    
    if (elements.achievementsTab) {
        elements.achievementsTab.addEventListener("click", () => {
            showAchievements();
            refreshAchievements();
        });
    }

    bindBottle({
        getClickPower: () => calculateClickPower(state),
        onClick: value => {
            registerClick(state, value);
            stats = computeStats(state);
            refreshStats();
            evaluateAchievements(state, onAchievementUnlock);
        },
        formatValue: formatNumber
    });

    elements.languageToggle.addEventListener("click", handleLanguageToggle);
    if (elements.upgradesTab) {
        elements.upgradesTab.addEventListener("click", () => {
            showUpgrades();
            refreshUpgrades();
        });
    }
    if (elements.leaderboardTab) {
        elements.leaderboardTab.addEventListener("click", () => {
            showLeaderboard();
            refreshLeaderboard();
        });
    }
    if (elements.leaderboardTabs) {
        elements.leaderboardTabs.addEventListener("click", handleLeaderboardTab);
    }
    elements.rebirthButton.addEventListener("click", openRebirth);
    if (elements.onlineToggleBtn) {
        elements.onlineToggleBtn.addEventListener("click", handleOnlineToggle);
    }
    elements.confirmRebirth.addEventListener("click", confirmRebirth);
    elements.cancelRebirth.addEventListener("click", closeRebirthModal);
    if (elements.submitScoreBtn) {
        elements.submitScoreBtn.addEventListener("click", handleSubmitScore);
    }

    window.addEventListener("beforeunload", () => saveGameState(state));
}

function startLoops() {
    const loop = createGameLoop(state, {
        onTick: ({ stats: loopStats }) => {
            stats = loopStats;
            refreshStats();
        },
        onSecond: () => {
            evaluateAchievements(state, onAchievementUnlock);
            refreshUpgrades();
            refreshSkins();
        }
    });
    loop.start();
    autoSaver.start();
}

function ensureFullyLoaded() {
    return new Promise((resolve) => {
        // Sprawdź czy CSS jest załadowany poprzez sprawdzenie czy style dla .click-effect są dostępne
        const testElement = document.createElement('div');
        testElement.className = 'click-effect';
        testElement.style.visibility = 'hidden';
        document.body.appendChild(testElement);
        
        const computedStyle = window.getComputedStyle(testElement);
        const isStylesLoaded = computedStyle.position === 'fixed';
        
        document.body.removeChild(testElement);
        
        if (isStylesLoaded) {
            console.log('✅ CSS styles are fully loaded');
            resolve();
        } else {
            console.log('⏳ Waiting for CSS styles to load...');
            setTimeout(() => ensureFullyLoaded().then(resolve), 50);
        }
    });
}

function bootstrap() {
    console.log('🚀 Starting bootstrap process...');
    
    // Najpierw ukryj ekran ładowania, żeby nie blokował interakcji
    hideLoadingScreen();
    
    // Poczekaj na pełne załadowanie CSS i elementów DOM
    ensureFullyLoaded().then(() => {
        console.log('✅ All resources loaded, initializing UI...');
        
        initUI();
        // ensurePlayerName(); // Removed - nie potrzebujemy modala z nickiem
        // initLeaderboard(); // Removed - wyłączamy leaderboard
        startLoops();
        // refreshLeaderboard(); // Removed - wyłączamy leaderboard
        
        // Debug: sprawdź czy bottle jest właściwie zainicjalizowany
        console.log('🚀 Bootstrap completed - bottle should be ready for clicks');
        
        // Test kliknięcia po inicjalizacji
        setTimeout(() => {
            console.log('🧪 Running post-init test click...');
            const bottle = document.getElementById('bottle');
            if (bottle) {
                console.log('✅ Bottle found, testing click effect system...');
                // Symuluj click na środku bottle'a dla testu
                const rect = bottle.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                // Import spawnClickEffect function for testing
                import('./ui/effects_helio.js').then(effects => {
                    effects.spawnClickEffect(centerX, centerY, 'TEST', 100);
                    console.log('🧪 Test effect spawned');
                });
            }
        }, 500);
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootstrap);
} else {
    bootstrap();
}
