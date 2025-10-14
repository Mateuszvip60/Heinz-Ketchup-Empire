/*
 * → Developed by: @Mateuszvip60
 * → Renderuje sklep ulepszeń za punkty duszy.
 */

import { soulUpgrades } from "../data/soulUpgrades.js";
import { getSoulUpgradeLevel, getSoulUpgradeCost, canAffordSoulUpgrade } from "../core/calculations.js";
import { formatNumber } from "../utils/number.js";

export function renderSoulUpgrades(state, translate, { onBuy }) {
    const container = document.getElementById("soulUpgradesContainer");
    if (!container) return;

    container.innerHTML = "";

    soulUpgrades.forEach(upgrade => {
        const level = getSoulUpgradeLevel(state, upgrade.id);
        const cost = getSoulUpgradeCost(state, upgrade.id);
        const affordable = canAffordSoulUpgrade(state, upgrade.id);
        const maxed = upgrade.maxLevel && level >= upgrade.maxLevel;

        const item = document.createElement("div");
        item.className = `upgrade-item ${affordable && !maxed ? "affordable" : ""}`;
        
        if (maxed) {
            item.classList.add("maxed");
        }

        const header = document.createElement("div");
        header.className = "upgrade-header";

        const name = document.createElement("div");
        name.className = "upgrade-name";
        name.textContent = translate(`${upgrade.id}Name`) || upgrade.id;

        const costElement = document.createElement("div");
        costElement.className = "upgrade-cost";
        costElement.textContent = maxed ? "MAX" : `${formatNumber(cost)} 🔮`;

        header.appendChild(name);
        header.appendChild(costElement);

        const description = document.createElement("div");
        description.className = "upgrade-description";
        description.textContent = translate(`${upgrade.id}Desc`) || "Soul upgrade";

        const levelElement = document.createElement("div");
        levelElement.className = "upgrade-level";
        levelElement.textContent = upgrade.maxLevel 
            ? `Poziom: ${level}/${upgrade.maxLevel}`
            : `Poziom: ${level}`;

        item.appendChild(header);
        item.appendChild(description);
        item.appendChild(levelElement);

        if (!maxed && affordable) {
            item.addEventListener("click", (event) => {
                event.preventDefault();
                event.stopPropagation();
                if (typeof onBuy === "function") {
                    onBuy(upgrade.id);
                }
            });
        }

        container.appendChild(item);
    });
}