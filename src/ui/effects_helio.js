/*
 * → Developed by: @Mateuszvip60
 * → HELIO G99 OPTIMIZED VERSION - 120fps performance
 * → Zachowuje oryginalny wygląd, optymalizuje tylko wydajność
 */

import { elements } from "./elements.js";

// Ultra-high performance detection for Helio G99
const reduceMotion = typeof window !== "undefined" && typeof window.matchMedia === "function"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

// Optimized device detection with caching
let deviceCache = null;
function getDeviceInfo() {
    if (deviceCache) return deviceCache;
    
    const width = window.innerWidth;
    const ua = navigator.userAgent.toLowerCase();
    const isHelio = ua.includes('helio') || ua.includes('mt') || ua.includes('mediatek');
    
    deviceCache = {
        isMobile: width <= 768,
        isTablet: width > 768 && width <= 1024,
        isDesktop: width > 1024,
        isHelio: isHelio,
        performanceProfile: isHelio ? 'ultra' : width <= 768 ? 'mobile' : 'desktop'
    };
    
    return deviceCache;
}

// Clear cache on resize
window.addEventListener('resize', () => {
    deviceCache = null;
}, { passive: true });

export function playSound(name) {
    const sound = elements.audio[name];
    if (!sound) return;
    // Reset to beginning and play - works better for rapid clicking
    sound.currentTime = 0;
    sound.play().catch(() => {});
}

export function spawnParticle(x, y) {
    if (reduceMotion) return;
    
    const device = getDeviceInfo();
    // Disable particles on mobile for Helio G99 120fps performance
    if (device.isMobile) return;

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

// ULTRA-OPTIMIZED CLICK EFFECT FOR HELIO G99 120FPS
export function spawnClickEffect(x, y, value, speed = 500) {
    console.log('🎨 spawnClickEffect called:', { x, y, value, speed });
    const device = getDeviceInfo();
    
    const effect = document.createElement("div");
    effect.className = "click-effect";
    effect.textContent = `+${value}`;
    console.log('🎨 Effect element created:', effect);
    
    // Ultra-optimized positioning for 120fps
    effect.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
        user-select: none;
        z-index: 100;
        font-weight: 700;
        white-space: nowrap;
        will-change: transform;
        backface-visibility: hidden;
        transform: translate3d(-50%, -50%, 0);
    `;

    // Responsive font sizing optimized for Helio G99
    let fontSize;
    if (device.performanceProfile === 'ultra') {
        // Helio G99 optimized sizes
        fontSize = device.isMobile ? 1.6 : 2.2;
    } else if (device.isMobile) {
        fontSize = 1.4;
    } else if (device.isTablet) {
        fontSize = 1.8;
    } else {
        fontSize = 2;
    }

    // Speed-based colors (same logic, optimized)
    let color, sizeMultiplier;
    if (speed < 100) {
        color = "#FFD700"; // Gold
        sizeMultiplier = 1.5;
    } else if (speed < 200) {
        color = "#00FF00"; // Green
        sizeMultiplier = 1.3;
    } else if (speed < 300) {
        color = "#00FFFF"; // Cyan
        sizeMultiplier = 1.2;
    } else if (speed < 500) {
        color = "#FF6B6B"; // Red
        sizeMultiplier = 1;
    } else {
        color = "#FFFFFF"; // White
        sizeMultiplier = 0.9;
    }

    const finalSize = fontSize * sizeMultiplier;
    
    // Apply optimized styles
    effect.style.color = color;
    effect.style.fontSize = `${finalSize}rem`;
    effect.style.textShadow = `0 0 10px ${color}`;

    document.body.appendChild(effect);
    console.log('🎨 Effect added to DOM at position:', { x, y });

    // Ultra-smooth animation optimized for 120fps on Helio G99
    requestAnimationFrame(() => {
        const duration = device.performanceProfile === 'ultra' ? 500 : 
                        device.isMobile ? 600 : 1000;
        const distance = device.performanceProfile === 'ultra' ? -50 :
                        device.isMobile ? -60 : -100;
        const scale = device.performanceProfile === 'ultra' ? 1.3 :
                     device.isMobile ? 1.2 : 1.5;

        // Use transform3d for hardware acceleration on Helio G99
        effect.style.transition = `transform ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity ${duration}ms ease-out`;
        effect.style.transform = `translate3d(-50%, ${distance}px, 0) scale(${scale})`;
        effect.style.opacity = "0";
    });

    // Optimized cleanup timing
    const lifetime = device.performanceProfile === 'ultra' ? 550 : 
                    device.isMobile ? 650 : 1050;
    setTimeout(() => {
        if (effect.parentNode) {
            effect.remove();
        }
    }, lifetime);
}

export function shakeScreen() {
    if (reduceMotion) return;
    const device = getDeviceInfo();
    
    // Reduced shake on mobile for better performance
    if (device.isMobile && device.performanceProfile !== 'ultra') return;
    
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