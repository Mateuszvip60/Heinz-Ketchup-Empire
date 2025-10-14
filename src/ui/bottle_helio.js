/*
 * → Developed by: @Mateuszvip60
 * → HELIO G99 OPTIMIZED - 120fps bottle interaction
 * → Zachowuje oryginalny wygląd, maksymalna wydajność
 */

import { elements } from "./elements.js";
import { playSound, spawnParticle, spawnClickEffect } from "./effects_helio.js";

// Ultra-performance device detection with caching
let deviceCache = null;
function getDeviceInfo() {
    if (deviceCache) return deviceCache;
    
    const width = window.innerWidth;
    const ua = navigator.userAgent.toLowerCase();
    const isHelio = ua.includes('helio') || ua.includes('mt') || ua.includes('mediatek');
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    deviceCache = {
        isMobile: width <= 768,
        isTouch: isTouch,
        isHelio: isHelio,
        performanceProfile: isHelio ? 'ultra' : width <= 768 ? 'mobile' : 'desktop'
    };
    
    return deviceCache;
}

export function bindBottle({ getClickPower, onClick, formatValue }) {
    const deviceInfo = getDeviceInfo();
    
    // Ultra-optimized click handler for Helio G99 120fps
    function handleClick(event) {
        // Prevent any default behavior that might cause lag
        event.preventDefault();
        event.stopPropagation();
        
        const power = getClickPower();
        onClick(power);
        
        // Ultra-fast visual feedback optimized for 120fps
        elements.bottle.classList.add("clicked");
        const clickDuration = deviceInfo.performanceProfile === 'ultra' ? 80 : 
                             deviceInfo.isMobile ? 100 : 200;
        setTimeout(() => elements.bottle.classList.remove("clicked"), clickDuration);

        // Get bottle position for particle effect (cached for performance)
        const rect = elements.bottle.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Spawn particle at bottle center (only on desktop for 120fps on mobile)
        if (!deviceInfo.isMobile || deviceInfo.performanceProfile === 'ultra') {
            spawnParticle(centerX, centerY);
        }

        // Ultra-fast click speed calculation
        const now = performance.now(); // More precise than Date.now()
        const lastClickTime = parseFloat(elements.bottle.dataset.lastClickTime) || now;
        const speed = now - lastClickTime;
        
        // Optimized click position detection for all input types
        let clickX, clickY;
        
        if (deviceInfo.isTouch) {
            // Touch events - optimized for mobile
            if (event.touches && event.touches[0]) {
                clickX = event.touches[0].clientX;
                clickY = event.touches[0].clientY;
            } else if (event.changedTouches && event.changedTouches[0]) {
                clickX = event.changedTouches[0].clientX;
                clickY = event.changedTouches[0].clientY;
            } else {
                // Fallback to bottle center
                clickX = centerX;
                clickY = centerY;
            }
        } else {
            // Mouse events - desktop
            clickX = event.clientX || centerX;
            clickY = event.clientY || centerY;
        }
        
        // Validate coordinates (prevent NaN issues)
        if (!clickX || !clickY || clickX < 0 || clickY < 0) {
            clickX = centerX;
            clickY = centerY;
        }
        
        const formatted = typeof formatValue === "function" ? formatValue(power) : power;
        spawnClickEffect(clickX, clickY, formatted, speed);
        
        // Store last click time with high precision
        elements.bottle.dataset.lastClickTime = now.toString();

        // Bonus effect (optimized probability for performance)
        let bonusChance;
        if (deviceInfo.performanceProfile === 'ultra') {
            bonusChance = 0.08; // Slightly higher for Helio G99
        } else if (deviceInfo.isMobile) {
            bonusChance = 0.03; // Lower for other mobile devices
        } else {
            bonusChance = 0.1; // Full desktop experience
        }
        
        if (Math.random() < bonusChance) {
            const offsetX = (Math.random() - 0.5) * 60;
            const offsetY = (Math.random() - 0.5) * 60;
            
            // Use shorter timeout for better performance
            const bonusDelay = deviceInfo.performanceProfile === 'ultra' ? 30 : 50;
            setTimeout(() => {
                spawnClickEffect(clickX + offsetX, clickY + offsetY, formatted, speed);
                onClick(power);
            }, bonusDelay);
        }

        playSound("click");
    }
    
    // Event listeners optimized for different devices
    if (deviceInfo.isTouch) {
        // Touch-optimized events for mobile
        elements.bottle.addEventListener("touchend", handleClick, { passive: false });
        
        // Prevent unwanted behaviors on mobile
        elements.bottle.addEventListener("contextmenu", event => {
            event.preventDefault();
        });
        
        elements.bottle.addEventListener("dragstart", event => {
            event.preventDefault();
        });
        
        // Prevent double-tap zoom on mobile
        elements.bottle.addEventListener("touchstart", event => {
            event.preventDefault();
        }, { passive: false });
        
        // Ultra-optimized touch styles for Helio G99
        elements.bottle.style.cssText += `
            -webkit-tap-highlight-color: transparent;
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            user-select: none;
            touch-action: manipulation;
        `;
    } else {
        // Desktop mouse events
        elements.bottle.addEventListener("click", handleClick);
    }
    
    // Performance optimizations for Helio G99
    if (deviceInfo.performanceProfile === 'ultra') {
        // Enable hardware acceleration
        elements.bottle.style.transform = 'translateZ(0)';
        elements.bottle.style.willChange = 'transform';
        
        // Optimize for 120fps
        elements.bottle.style.backfaceVisibility = 'hidden';
        elements.bottle.style.perspective = '1000px';
    }
}