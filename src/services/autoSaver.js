/*
 * → Developed by: @Mateuszvip60
 * → Uruchamia okresowy zapis stanu gry.
 */

export function createAutoSaver(state, saveFn, interval = 5000) {
    let timer = null;

    function start() {
        if (timer) return;
        timer = setInterval(() => saveFn(state), interval);
    }

    function stop() {
        if (!timer) return;
        clearInterval(timer);
        timer = null;
    }

    return { start, stop };
}
