/*
 * → Developed by: @Mateuszvip60
 * → Zarządza wyborem języka i tłumaczeniami.
 */

import { translations, fallbackLanguage } from "../data/translations.js";
import { setLanguage as setStateLanguage, markDirty } from "../core/state.js";

export function createI18n(state) {
    let current = validate(state.language);
    const listeners = new Set();

    function t(key) {
        return translations[current][key] ?? translations[fallbackLanguage][key] ?? key;
    }

    function setLanguage(language) {
        current = validate(language);
        setStateLanguage(state, current);
        markDirty(state);
        listeners.forEach(listener => listener(current));
    }

    function onChange(listener) {
        listeners.add(listener);
        return () => listeners.delete(listener);
    }

    return {
        t,
        setLanguage,
        getLanguage: () => current,
        onChange
    };
}

function validate(language) {
    return translations[language] ? language : fallbackLanguage;
}

export function applyTranslationsToDom(t) {
    document.querySelectorAll("[data-i18n]").forEach(node => {
        const key = node.getAttribute("data-i18n");
        if (!key) return;
        node.textContent = t(key);
    });
}

export function applyPlaceholders(t) {
    const nicknameInput = document.getElementById("initialPlayerNameInput");
    if (nicknameInput) {
        nicknameInput.placeholder = t("nicknamePlaceholder");
    }
}
