/*
 * → Developed by: @Mateuszvip60
 * → Definiuje ulepszenia za punkty duszy (sklep odrodzeń).
 */

export const soulUpgrades = [
    {
        id: "soulAutoClicker",
        type: "dpsFlat",
        baseCost: 10,
        costMultiplier: 2,
        effectPerLevel: 100,
        maxLevel: 50
    },
    {
        id: "soulClickPower",
        type: "clickFlat", 
        baseCost: 5,
        costMultiplier: 1.8,
        effectPerLevel: 50,
        maxLevel: 100
    },
    {
        id: "soulGlobalMultiplier",
        type: "globalMultiplier",
        baseCost: 25,
        costMultiplier: 3,
        effectPerLevel: 0.25,
        maxLevel: 20
    },
    {
        id: "soulDropMultiplier",
        type: "dropMultiplier",
        baseCost: 50,
        costMultiplier: 4,
        effectPerLevel: 0.1,
        maxLevel: 10
    },
    {
        id: "soulRebirthBonus",
        type: "rebirthBonus",
        baseCost: 100,
        costMultiplier: 10,
        effectPerLevel: 0.5,
        maxLevel: 5
    },
    {
        id: "soulOfflineProduction",
        type: "offlineProduction",
        baseCost: 75,
        costMultiplier: 5,
        effectPerLevel: 0.2,
        maxLevel: 10
    }
];