/*
 * → Developed by: @Mateuszvip60
 * → Obsługuje efekty wizualne i dźwiękowe.
 */

import { elements } from "./elements.js";

export function playSound(name) {
    const sound = elements.audio[name];
    if (!sound) return;
    sound.currentTime = 0;
    sound.play().catch(() => {});
}

export function spawnParticle(x, y) {
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
    effect.style.left = `${x}px`;
    effect.style.top = `${y}px`;

    let color = "#FF6B6B";
    let fontSize = 2;

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

    effect.style.color = color;
    effect.style.fontSize = `${fontSize}rem`;

    document.body.appendChild(effect);
    setTimeout(() => effect.remove(), 1000);
}

export function shakeScreen() {
    document.body.classList.add("screen-shake");
    setTimeout(() => document.body.classList.remove("screen-shake"), 500);
}

export function hideLoadingScreen() {
    elements.loadingScreen.classList.add("hidden");
}

export function showAchievementPopup(title, description) {
    elements.achievementTitle.textContent = title;
    elements.achievementDesc.textContent = description;
    elements.achievementPopup.classList.add("show");
    playSound("achievement");
    setTimeout(() => {
        elements.achievementPopup.classList.remove("show");
    }, 4000);
}
