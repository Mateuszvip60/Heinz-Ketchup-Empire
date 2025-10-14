/*
 * → Developed by: @Mateuszvip60
 * → Ułatwia ustawienie nicku gracza.
 */

import { elements } from "./elements.js";
import { showModal, hideModal } from "./modals.js";

export function promptForPlayerName(translate, onSave) {
    showModal(elements.playerNameModal);
    elements.initialPlayerNameInput.value = "";
    elements.initialPlayerNameInput.placeholder = translate("nicknamePlaceholder");

    const handler = () => {
        const value = elements.initialPlayerNameInput.value.trim();
        if (!value) {
            alert(translate("nameRequired"));
            return;
        }
        hideModal(elements.playerNameModal);
        if (typeof onSave === "function") {
            onSave(value);
        }
        cleanup();
    };

    function cleanup() {
        elements.savePlayerNameBtn.removeEventListener("click", handler);
        elements.initialPlayerNameInput.removeEventListener("keypress", keypress);
    }

    function keypress(event) {
        if (event.key === "Enter") {
            handler();
        }
    }

    elements.savePlayerNameBtn.addEventListener("click", handler);
    elements.initialPlayerNameInput.addEventListener("keypress", keypress);
}
