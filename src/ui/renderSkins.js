/*
 * → Developed by: @Mateuszvip60
 * → Zarządza widokiem skórek i wyglądem butelki.
 */

import { elements } from "./elements.js";
import { skins } from "../data/skins.js";

export function renderSkins(state, { onSelect }) {
    const container = elements.skinSelector;
    container.innerHTML = "";

    skins.forEach(skin => {
        const unlocked = state.skinUnlocks[skin.id] || state.drops >= skin.cost;
        const option = document.createElement("div");
        option.className = `skin-option ${skin.id === state.currentSkin ? "selected" : ""} ${unlocked ? "" : "locked"}`;
        option.title = unlocked ? skin.name : `${skin.name} (${skin.cost.toLocaleString()} 🍅)`;
        option.dataset.skin = skin.id;

        const img = new Image();
        img.onload = () => {
            option.style.backgroundImage = `url(skins/${skin.id}.png)`;
            option.style.backgroundSize = "cover";
            option.style.backgroundPosition = "center";
            option.textContent = "";
        };
        img.onerror = () => {
            option.textContent = skin.emoji;
            option.style.background = skin.gradient;
        };
        img.src = `skins/${skin.id}.png`;

        if (unlocked) {
            option.addEventListener("click", (e) => {
                // Prevent any scrolling or default behavior
                e.preventDefault();
                e.stopPropagation();
                
                if (typeof onSelect === "function") {
                    onSelect(skin.id);
                }
            });
        }

        container.appendChild(option);
    });
}

export function renderBottle(state) {
    const current = skins.find(skin => skin.id === state.currentSkin) || skins[0];
    const img = new Image();
    img.onload = () => {
        elements.bottle.src = `skins/${current.id}.png`;
        elements.bottle.classList.add("has-image");
        elements.bottle.style.background = "none";
        elements.bottle.textContent = "";
    };
    img.onerror = () => {
        elements.bottle.removeAttribute("src");
        elements.bottle.classList.remove("has-image");
        elements.bottle.textContent = current.emoji;
        elements.bottle.style.background = current.gradient;
    };
    img.src = `skins/${current.id}.png`;
}
