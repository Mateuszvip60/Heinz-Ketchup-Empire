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
    let fontSize = isMobileViewport ? 1.8 : 2;

    // Apply color logic for both desktop and mobile - better UX
    if (speed < 100) {
        color = "#FFD700"; // Gold for super fast
        fontSize = isMobileViewport ? 2.2 : 3.5;
    } else if (speed < 200) {
        color = "#00FF00"; // Green for fast
        fontSize = isMobileViewport ? 2.0 : 3;
    } else if (speed < 300) {
        color = "#00FFFF"; // Cyan for medium
        fontSize = isMobileViewport ? 1.9 : 2.5;
    } else if (speed < 500) {
        color = "#FF6B6B"; // Red for normal
        fontSize = isMobileViewport ? 1.8 : 2;
    } else {
        color = "#FFFFFF"; // White for slow
        fontSize = isMobileViewport ? 1.6 : 1.8;
    }

    effect.style.color = color;
    effect.style.fontSize = `${fontSize}rem`;
    effect.style.textShadow = `0 0 10px ${color}`;

    // Better mobile animation - less resource intensive
    if (isMobileViewport) {
        effect.style.transition = "transform 0.4s ease-out, opacity 0.4s ease-out";
        effect.style.willChange = "transform, opacity";
        effect.style.transform = "translateZ(0)"; // Force hardware acceleration
    }

    document.body.appendChild(effect);

    if (isMobileViewport) {
        requestAnimationFrame(() => {
            effect.style.transform = "translateY(-50px) translateZ(0)";
            effect.style.opacity = "0";
        });
    }

    const lifetime = isMobileViewport ? 500 : 1000;
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
