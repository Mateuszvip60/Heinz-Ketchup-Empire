/*
 * → Developed by: @Mateuszvip60
 * → Definiuje konfigurację ulepszeń.
 */

export const upgrades = [
    {
        id: "clickPower",
        type: "clickFlat",
        baseCost: 10,
        costMultiplier: 1.15,
        effectPerLevel: 2  // Increased from 1
    },
    {
        id: "autoClicker",
        type: "dpsFlat",
        baseCost: 100,
        costMultiplier: 1.1,
        effectPerLevel: 3  // Increased from 1
    },
    {
        id: "biggerBottle",
        type: "clickMultiplier",
        baseCost: 500,
        costMultiplier: 1.2,
        effectPerLevel: 0.5  // Increased from 0.2
    },
    {
        id: "sauceHelpers",
        type: "dpsFlat",
        baseCost: 1000,
        costMultiplier: 1.1,
        effectPerLevel: 15  // Increased from 5
    },
    {
        id: "factory",
        type: "dpsFlat",
        baseCost: 10000,
        costMultiplier: 1.1,
        effectPerLevel: 75  // Increased from 25
    },
    {
        id: "globalDomination",
        type: "globalMultiplier",
        baseCost: 100000,
        costMultiplier: 3,  // Reduced from 4
        effectPerLevel: 1.0  // Increased from 0.5
    },
    {
        id: "megaFactory",
        type: "dpsFlat",
        baseCost: 5000000,  // Reduced from 10000000
        costMultiplier: 2.5,  // Reduced from 3.5
        effectPerLevel: 500  // Increased from 100
    },
    {
        id: "ultraFactory",
        type: "dpsFlat",
        baseCost: 100000000,
        costMultiplier: 2.2,
        effectPerLevel: 2500
    },
    {
        id: "quantumFactory",
        type: "dpsFlat",
        baseCost: 10000000000,
        costMultiplier: 2.0,
        effectPerLevel: 15000
    }
];
