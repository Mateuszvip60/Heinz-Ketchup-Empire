/*
 * → Developed by: @Mateuszvip60
 * → Koordynuje modal potwierdzenia odrodzenia.
 */

import { elements } from "./elements.js";
import { showModal, hideModal } from "./modals.js";

export function openRebirthModal(content) {
    if (content) {
        elements.rebirthBonusInfo.innerHTML = content;
    }
    showModal(elements.rebirthModal);
}

export function closeRebirthModal() {
    hideModal(elements.rebirthModal);
}
