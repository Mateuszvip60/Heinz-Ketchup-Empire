/*
 * → Developed by: @Mateuszvip60
 * → Fixed responsive version - improved click effects for all devices
 */

import { elements } from "./elements.js";

// Better responsive detection
const reduceMotion = typeof window !== "undefined" && typeof window.matchMedia === "function"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

// More flexible device detection
function getViewportInfo() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    return {
        isMobile: width <= 768,
        isTablet: width > 768 && width <= 1024,
        isDesktop: width > 1024,
        screenSize: width <= 480 ? 'small' : width <= 768 ? 'medium' : width <= 1024 ? 'large' : 'xlarge'
    };
}

const limitEffects = reduceMotion;

export function playSound(name) {
    const sound = elements.audio[name];
    if (!sound) return;
    // Reset to beginning and play - works better for rapid clicking
    sound.currentTime = 0;
    sound.play().catch(() => {});
}

export function spawnParticle(x, y) {
    if (limitEffects) return;
    
    const { isMobile } = getViewportInfo();
    if (isMobile) return; // Disable particles on mobile for better performance

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
    const viewport = getViewportInfo();
    
    const effect = document.createElement("div");
    effect.className = "click-effect";
    effect.textContent = `+${value}`;
    
    // Better positioning that works across all devices
    effect.style.position = "fixed";
    effect.style.left = `${x}px`;
    effect.style.top = `${y}px`;
    effect.style.pointerEvents = "none";
    effect.style.userSelect = "none";
    effect.style.zIndex = "1000";
    
    // Responsive font sizing based on viewport
    let fontSize;
    switch(viewport.screenSize) {
        case 'small':
            fontSize = 1.4;
            break;
        case 'medium':
            fontSize = 1.6;
            break;
        case 'large':
            fontSize = 1.8;
            break;
        default:
            fontSize = 2;
    }
    
    // Color and size based on speed (same logic for all devices)
    let color = "#FF6B6B";
    let sizeMultiplier = 1;
    
    if (speed < 100) {
        color = "#FFD700"; // Gold for super fast
        sizeMultiplier = 1.5;
    } else if (speed < 200) {
        color = "#00FF00"; // Green for fast
        sizeMultiplier = 1.3;
    } else if (speed < 300) {
        color = "#00FFFF"; // Cyan for medium
        sizeMultiplier = 1.2;
    } else if (speed < 500) {
        color = "#FF6B6B"; // Red for normal
        sizeMultiplier = 1;
    } else {
        color = "#FFFFFF"; // White for slow
        sizeMultiplier = 0.9;
    }
    
    const finalFontSize = fontSize * sizeMultiplier;
    
    effect.style.color = color;
    effect.style.fontSize = `${finalFontSize}rem`;
    effect.style.textShadow = `0 0 10px ${color}`;
    effect.style.fontWeight = "700";
    
    // Optimized animation for all devices
    effect.style.willChange = "transform, opacity";
    effect.style.backfaceVisibility = "hidden";
    effect.style.transform = "translateZ(0) translateX(-50%) translateY(-50%)";
    
    // Set initial state
    effect.style.opacity = "1";
    effect.style.transition = "none";
    
    document.body.appendChild(effect);
    
    // Smooth animation for all devices using requestAnimationFrame
    requestAnimationFrame(() => {
        const duration = viewport.isMobile ? 600 : 1000;
        const moveDistance = viewport.isMobile ? -60 : -100;
        const scaleEnd = viewport.isMobile ? 1.2 : 1.5;
        
        effect.style.transition = `transform ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity ${duration}ms ease-out`;
        effect.style.transform = `translateZ(0) translateX(-50%) translateY(${moveDistance}px) scale(${scaleEnd})`;
        effect.style.opacity = "0";
    });
    
    // Clean up
    const lifetime = viewport.isMobile ? 700 : 1100;
    setTimeout(() => {
        if (effect.parentNode) {
            effect.remove();
        }
    }, lifetime);
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