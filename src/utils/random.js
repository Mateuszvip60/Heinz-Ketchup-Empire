/*
 * → Developed by: @Mateuszvip60
 * → Dostarcza generator zdarzeń losowych.
 */

export function chance(percent) {
    return Math.random() < percent;
}

export function pickRandom(array) {
    return array[Math.floor(Math.random() * array.length)];
}
