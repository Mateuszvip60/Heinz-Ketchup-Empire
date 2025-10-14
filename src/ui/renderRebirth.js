/*
 * → Developed by: @Mateuszvip60
 * → Odświeża panel odrodzenia i komunikaty.
 */

import { elements } from "./elements.js";
import { formatNumber } from "../utils/number.js";

const REBIRTH_REQUIREMENT = 1e12;

export function renderRebirth(state, translate, soulGain) {
    const canRebirth = state.drops >= REBIRTH_REQUIREMENT;
    elements.rebirthButton.disabled = !canRebirth;

    if (canRebirth) {
        elements.rebirthText.textContent = translate("rebirthReady");
        elements.rebirthInfo.textContent = translate("rebirthBonus").replace("{{value}}", soulGain);
    } else {
        const missing = formatNumber(REBIRTH_REQUIREMENT - state.drops);
        elements.rebirthText.textContent = translate("rebirthRemaining").replace("{{value}}", missing);
        elements.rebirthInfo.textContent = "";
    }
}
