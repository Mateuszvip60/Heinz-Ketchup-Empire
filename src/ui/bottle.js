/*
 * → Developed by: @Mateuszvip60
 * → Fixed responsive version - improved bottle interaction
 */

import { elements } from "./elements.js";
import { playSound, spawnParticle, spawnClickEffect } from "./effects.js";

// Better device detection
function getDeviceInfo() {
    const width = window.innerWidth;
    return {
        isMobile: width <= 768,
        isTouch: 'ontouchstart' in window || navigator.maxTouchPoints > 0
    };
}

export function bindBottle({ getClickPower, onClick, formatValue }) {
    const deviceInfo = getDeviceInfo();
    
    // Enhanced click handler
    function handleClick(event) {
        // Prevent any default behavior
        event.preventDefault();
        event.stopPropagation();
        
        const power = getClickPower();
        onClick(power);
        
        // Visual feedback on bottle
        elements.bottle.classList.add("clicked");
        const clickDuration = deviceInfo.isMobile ? 100 : 200;
        setTimeout(() => elements.bottle.classList.remove("clicked"), clickDuration);

        // Get bottle position for particle effect
        const rect = elements.bottle.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Spawn particle at bottle center
        spawnParticle(centerX, centerY);

        // Calculate click speed
        const now = Date.now();
        const lastClickTime = parseInt(elements.bottle.dataset.lastClickTime) || now;
        const speed = now - lastClickTime;
        
        // Get click position - use touch for mobile, mouse for desktop
        let clickX, clickY;
        
        if (deviceInfo.isTouch && event.touches && event.touches[0]) {
            // Touch event
            clickX = event.touches[0].clientX;
            clickY = event.touches[0].clientY;
        } else if (event.changedTouches && event.changedTouches[0]) {
            // Touch end event
            clickX = event.changedTouches[0].clientX;
            clickY = event.changedTouches[0].clientY;
        } else {
            // Mouse event
            clickX = event.clientX;
            clickY = event.clientY;
        }
        
        // Fallback to bottle center if coordinates are invalid
        if (!clickX || !clickY || clickX < 0 || clickY < 0) {
            clickX = centerX;
            clickY = centerY;
        }
        
        const formatted = typeof formatValue === "function" ? formatValue(power) : power;
        spawnClickEffect(clickX, clickY, formatted, speed);
        
        // Store last click time
        elements.bottle.dataset.lastClickTime = now.toString();

        // Bonus effect (reduced probability on mobile for performance)
        const bonusChance = deviceInfo.isMobile ? 0.05 : 0.1;
        if (Math.random() < bonusChance) {
            const offsetX = (Math.random() - 0.5) * 60;
            const offsetY = (Math.random() - 0.5) * 60;
            setTimeout(() => {
                spawnClickEffect(clickX + offsetX, clickY + offsetY, formatted, speed);
                onClick(power);
            }, 50);
        }

        playSound("click");
    }
    
    // Add event listeners for both mouse and touch
    elements.bottle.addEventListener("click", handleClick);
    
    // Touch events for better mobile support
    if (deviceInfo.isTouch) {
        elements.bottle.addEventListener("touchend", handleClick);
        
        // Prevent context menu on long press
        elements.bottle.addEventListener("contextmenu", event => {
            event.preventDefault();
        });
        
        // Prevent image drag
        elements.bottle.addEventListener("dragstart", event => {
            event.preventDefault();
        });
        
        // Prevent touch callout
        elements.bottle.style.webkitTouchCallout = "none";
        elements.bottle.style.webkitUserSelect = "none";
        elements.bottle.style.userSelect = "none";
    }
    
    // Prevent double-tap zoom on mobile
    if (deviceInfo.isMobile) {
        elements.bottle.addEventListener("touchstart", event => {
            event.preventDefault();
        }, { passive: false });
    }
}