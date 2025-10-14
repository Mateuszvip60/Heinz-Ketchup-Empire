/*
 * → Developed by: @Mateuszvip60
 * → Definiuje osiągnięcia i nagrody.
 */

export const achievements = [
    {
        id: "firstDrop",
        condition: state => state.totalClicks >= 1,
        reward: state => {
            state.baseClickPower += 0.5;
        }
    },
    {
        id: "hundredDrops",
        condition: state => state.drops >= 100,
        reward: state => {
            state.baseClickPower += 1;
        }
    },
    {
        id: "thousandDrops",
        condition: state => state.drops >= 1000,
        reward: state => {
            state.baseClickPower *= 1.5;
        }
    },
    {
        id: "firstUpgrade",
        condition: state => Object.values(state.upgrades).some(level => level > 0),
        reward: state => {
            state.drops += 500;
        }
    },
    {
        id: "clickMaster",
        condition: state => state.totalClicks >= 100,
        reward: state => {
            state.baseClickPower += 2;
        }
    },
    {
        id: "speedClicker",
        condition: state => state.totalClicks >= 500,
        reward: state => {
            state.baseClickPower += 5;
        }
    },
    {
        id: "tenThousandDrops",
        condition: state => state.drops >= 10000,
        reward: state => {
            state.baseClickPower *= 1.25;
        }
    },
    {
        id: "hundredThousandDrops",
        condition: state => state.drops >= 100000,
        reward: state => {
            state.baseClickPower *= 1.5;
        }
    },
    {
        id: "millionDrops",
        condition: state => state.drops >= 1000000,
        reward: state => {
            state.baseClickPower *= 2;
        }
    },
    {
        id: "billionDrops",
        condition: state => state.drops >= 1000000000,
        reward: state => {
            state.baseClickPower *= 3;
        }
    },
    {
        id: "trillionDrops",
        condition: state => state.drops >= 1000000000000,
        reward: state => {
            state.baseClickPower *= 5;
        }
    },
    {
        id: "firstRebirth",
        condition: state => state.rebirthCount >= 1,
        reward: state => {
            state.baseClickPower *= 3;
        }
    },
    {
        id: "multipleRebirths",
        condition: state => state.rebirthCount >= 5,
        reward: state => {
            state.globalMultiplierBonus *= 1.5;
        }
    },
    {
        id: "rebirthMaster",
        condition: state => state.rebirthCount >= 10,
        reward: state => {
            state.globalMultiplierBonus *= 2;
        }
    },
    {
        id: "dedicatedClicker",
        condition: state => state.totalClicks >= 1000,
        reward: state => {
            state.clickMultiplierBonus *= 1.5;
        }
    },
    {
        id: "soulCollector",
        condition: state => state.soulPoints >= 100,
        reward: state => {
            state.globalMultiplierBonus *= 1.25;
        }
    }
];
