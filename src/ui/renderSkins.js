/*
 * → Developed by: @Mateuszvip60
 * → Zarządza widokiem skórek i wyglądem butelki.
 */

import { elements } from "./elements.js";
import { skins } from "../data/skins.js";

const imageStatus = {}; // { id: "ok" | "fail" }

function preloadImages() {
    return Promise.all(
        skins.map(skin => new Promise(resolve => {
            const img = new Image();
            img.src = `skins/${skin.id}.png`;
            img.onload = () => { imageStatus[skin.id] = "ok"; resolve(); };
            img.onerror = () => { imageStatus[skin.id] = "fail"; resolve(); };
        }))
    );
}

export async function renderSkins(state, { onSelect }) {
    const container = elements.skinSelector;

    // wait until all images checked
    if (!Object.keys(imageStatus).length) await preloadImages();

    container.innerHTML = "";

    skins.forEach(skin => {
        const unlocked = state.skinUnlocks[skin.id] || state.drops >= skin.cost;
        const option = document.createElement("div");
        option.className = `skin-option ${skin.id === state.currentSkin ? "selected" : ""} ${unlocked ? "" : "locked"}`;
        option.title = unlocked ? skin.name : `${skin.name} (${skin.cost.toLocaleString()} 🍅)`;
        option.dataset.skin = skin.id;

        if (imageStatus[skin.id] === "ok") {
            option.style.backgroundImage = `url(skins/${skin.id}.png)`;
            option.style.backgroundSize = "cover";
            option.style.backgroundPosition = "center";
        } else {
            option.textContent = skin.emoji;
            option.style.background = skin.gradient;
        }

        if (unlocked) {
            option.addEventListener("click", e => {
                e.preventDefault();
                e.stopPropagation();
                if (typeof onSelect === "function") onSelect(skin.id);
            });
        }

        container.appendChild(option);
    });
}

export async function renderBottle(state) {
    if (!Object.keys(imageStatus).length) await preloadImages();

    const current = skins.find(skin => skin.id === state.currentSkin) || skins[0];
    if (imageStatus[current.id] === "ok") {
        elements.bottle.src = `skins/${current.id}.png`;
        elements.bottle.classList.add("has-image");
        elements.bottle.style.background = "none";
        elements.bottle.textContent = "";
    } else {
        elements.bottle.removeAttribute("src");
        elements.bottle.classList.remove("has-image");
        elements.bottle.textContent = current.emoji;
        elements.bottle.style.background = current.gradient;
    }
}
