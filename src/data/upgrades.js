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
        effectPerLevel: 1
    },
    {
        id: "autoClicker",
        type: "dpsFlat",
        baseCost: 100,
        costMultiplier: 1.1,
        effectPerLevel: 1
    },
    {
        id: "biggerBottle",
        type: "clickMultiplier",
        baseCost: 500,
        costMultiplier: 1.2,
        effectPerLevel: 0.2
    },
    {
        id: "sauceHelpers",
        type: "dpsFlat",
        baseCost: 1000,
        costMultiplier: 1.1,
        effectPerLevel: 5
    },
    {
        id: "factory",
        type: "dpsFlat",
        baseCost: 10000,
        costMultiplier: 1.1,
        effectPerLevel: 25
    },
    {
        id: "globalDomination",
        type: "globalMultiplier",
        baseCost: 100000,
        costMultiplier: 4,
        effectPerLevel: 0.5
    },
    {
        id: "megaFactory",
        type: "dpsFlat",
        baseCost: 10000000,
        costMultiplier: 3.5,
        effectPerLevel: 100
    }
];
