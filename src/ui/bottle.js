/*
 * → Developed by: @Mateuszvip60
 * → Obsługuje interakcję z butelką i efekty kliknięć.
 */

import { elements } from "./elements.js";
import { playSound, spawnParticle, spawnClickEffect } from "./effects.js";

export function bindBottle({ getClickPower, onClick, formatValue }) {
    elements.bottle.addEventListener("click", event => {
        const power = getClickPower();
        onClick(power);
        elements.bottle.classList.add("clicked");
        setTimeout(() => elements.bottle.classList.remove("clicked"), 200);

        const rect = elements.bottle.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        spawnParticle(x, y);

        const speed = Date.now() - (elements.bottle.dataset.lastClickTime || Date.now());
        const formatted = typeof formatValue === "function" ? formatValue(power) : power;
        spawnClickEffect(event.clientX, event.clientY, formatted, speed);
        elements.bottle.dataset.lastClickTime = Date.now();

        if (Math.random() < 0.1) {
            spawnClickEffect(event.clientX + 30, event.clientY - 30, formatted, speed);
            onClick(power);
        }

        playSound("click");
    });
}
