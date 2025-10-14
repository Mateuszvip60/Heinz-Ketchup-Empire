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
        id: "millionDrops",
        condition: state => state.drops >= 1000000,
        reward: state => {
            state.baseClickPower *= 2;
        }
    },
    {
        id: "firstRebirth",
        condition: state => state.rebirthCount >= 1,
        reward: state => {
            state.baseClickPower *= 3;
        }
    }
];
