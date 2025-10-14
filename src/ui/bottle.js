/*
 * → Developed by: @Mateuszvip60
 * → Obsługuje interakcję z butelką i efekty kliknięć.
 */

import { elements } from "./elements.js";
import { playSound, spawnParticle, spawnClickEffect } from "./effects.js";

const reduceVisuals = typeof window !== "undefined" && typeof window.matchMedia === "function"
    ? window.matchMedia("(max-width: 768px)").matches
    : false;

const isMobile = typeof window !== "undefined" && typeof window.matchMedia === "function"
    ? window.matchMedia("(max-width: 768px)").matches
    : false;

export function bindBottle({ getClickPower, onClick, formatValue }) {
    elements.bottle.addEventListener("click", event => {
        // Prevent any default behavior that might cause scrolling
        event.preventDefault();
        event.stopPropagation();
        
        const power = getClickPower();
        onClick(power);
        elements.bottle.classList.add("clicked");
        setTimeout(() => elements.bottle.classList.remove("clicked"), isMobile ? 100 : 200);

        const rect = elements.bottle.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        spawnParticle(x, y);

        const speed = Date.now() - (elements.bottle.dataset.lastClickTime || Date.now());
        const formatted = typeof formatValue === "function" ? formatValue(power) : power;
        spawnClickEffect(event.clientX, event.clientY, formatted, speed);
        elements.bottle.dataset.lastClickTime = Date.now();

        if (!reduceVisuals && Math.random() < 0.1) {
            spawnClickEffect(event.clientX + 30, event.clientY - 30, formatted, speed);
            onClick(power);
        }

        playSound("click");
    });
    
    // Add only essential mobile optimizations
    if (isMobile) {
        // Prevent context menu on long press
        elements.bottle.addEventListener("contextmenu", event => {
            event.preventDefault();
        });
        
        // Prevent image drag
        elements.bottle.addEventListener("dragstart", event => {
            event.preventDefault();
        });
    }
}
