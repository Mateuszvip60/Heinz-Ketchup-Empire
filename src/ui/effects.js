/*
 * → Developed by: @Mateuszvip60
 * → Obsługuje efekty wizualne i dźwiękowe.
 */

import { elements } from "./elements.js";

const reduceMotion = typeof window !== "undefined" && typeof window.matchMedia === "function"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;
const isMobileViewport = typeof window !== "undefined" && typeof window.matchMedia === "function"
    ? window.matchMedia("(max-width: 768px)").matches
    : false;
const limitEffects = reduceMotion || isMobileViewport;

export function playSound(name) {
    const sound = elements.audio[name];
    if (!sound) return;
    // Reset to beginning and play - works better for rapid clicking
    sound.currentTime = 0;
    sound.play().catch(() => {});
}

export function spawnParticle(x, y) {
    if (limitEffects) return;

    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;

    const angle = Math.random() * Math.PI * 2;
    const distance = 50 + Math.random() * 50;
    particle.style.setProperty("--dx", `${Math.cos(angle) * distance}px`);
    particle.style.setProperty("--dy", `${Math.sin(angle) * distance}px`);

    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), 800);
}

export function spawnClickEffect(x, y, value, speed = 500) {
    const effect = document.createElement("div");
    effect.className = "click-effect";
    effect.textContent = `+${value}`;
    // Use fixed positioning to prevent issues with scrolling
    effect.style.left = `${x}px`;
    effect.style.top = `${y}px`;

    let color = "#FF6B6B";
    let fontSize = limitEffects ? 1.6 : 2;

    if (!limitEffects) {
        if (speed < 100) {
            color = "#FFD700";
            fontSize = 3.5;
        } else if (speed < 200) {
            color = "#00FF00";
            fontSize = 3;
        } else if (speed < 300) {
            color = "#00FFFF";
            fontSize = 2.5;
        }
    }

    effect.style.color = color;
    effect.style.fontSize = `${fontSize}rem`;

    if (limitEffects) {
        effect.style.transition = "transform 0.5s ease-out, opacity 0.5s ease-out";
        effect.style.willChange = "transform, opacity";
    }

    document.body.appendChild(effect);

    if (limitEffects) {
        requestAnimationFrame(() => {
            effect.style.transform = "translateY(-40px)";
            effect.style.opacity = "0";
        });
    }

    const lifetime = limitEffects ? 600 : 1000;
    setTimeout(() => effect.remove(), lifetime);
}

export function shakeScreen() {
    if (limitEffects) return;
    document.body.classList.add("screen-shake");
    setTimeout(() => document.body.classList.remove("screen-shake"), 500);
}

export function hideLoadingScreen() {
    elements.loadingScreen.classList.add("hidden");
}

export function showAchievementPopup(title, description, options = {}) {
    const { playAudio = true } = options;
    elements.achievementTitle.textContent = title;
    elements.achievementDesc.textContent = description;
    elements.achievementPopup.classList.add("show");
    if (playAudio) {
        playSound("achievement");
    }
    setTimeout(() => {
        elements.achievementPopup.classList.remove("show");
    }, 4000);
}
