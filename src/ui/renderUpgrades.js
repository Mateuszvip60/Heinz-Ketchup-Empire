/*
 * → Developed by: @Mateuszvip60
 * → Renderuje listę ulepszeń z aktualnymi kosztami.
 */

import { elements } from "./elements.js";
import { upgrades } from "../data/upgrades.js";
import { formatNumber } from "../utils/number.js";
import { canAffordUpgrade, getUpgradeCost, getUpgradeLevel } from "../core/calculations.js";

export function renderUpgrades(state, translate, { onBuy }) {
    const container = elements.upgradesContainer;
    container.innerHTML = "";

    upgrades.forEach(upgrade => {
        const level = getUpgradeLevel(state, upgrade.id);
        const cost = getUpgradeCost(state, upgrade.id);
        const affordable = canAffordUpgrade(state, upgrade.id);

        const item = document.createElement("div");
        item.className = `glass-panel upgrade-item ${affordable ? "affordable" : ""}`;
        item.dataset.upgrade = upgrade.id;
        item.innerHTML = `
            <div class="upgrade-header">
                <span class="upgrade-name">${translate(`${upgrade.id}Name`)}</span>
                <span class="upgrade-cost">${formatNumber(cost)} 🍅</span>
            </div>
            <div class="upgrade-description">${translate(`${upgrade.id}Desc`)}</div>
            <div class="upgrade-level">${translate("levelLabel")}: ${level}</div>
        `;

        item.addEventListener("click", () => {
            if (typeof onBuy === "function") {
                onBuy(upgrade.id);
            }
        });

        container.appendChild(item);
    });
}
