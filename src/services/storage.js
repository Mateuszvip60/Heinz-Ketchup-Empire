/*
 * → Developed by: @Mateuszvip60
 * → Zapewnia zapis i odczyt danych z localStorage.
 */

const SAVE_KEY = "heinzKetchupEmpireV2";
const LEADERBOARD_KEY = "heinzKetchupLeaderboardV2";

export function loadGameState() {
    try {
        return localStorage.getItem(SAVE_KEY);
    } catch (error) {
        console.warn("Brak dostępu do localStorage", error);
        return null;
    }
}

export function saveGameState(state) {
    try {
        const snapshot = JSON.stringify(state);
        localStorage.setItem(SAVE_KEY, snapshot);
    } catch (error) {
        console.warn("Nie udało się zapisać stanu gry", error);
    }
}

export function loadLocalLeaderboard() {
    try {
        const data = localStorage.getItem(LEADERBOARD_KEY);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.warn("Nie udało się odczytać rankingu", error);
        return null;
    }
}

export function saveLocalLeaderboard(data) {
    try {
        localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(data));
    } catch (error) {
        console.warn("Nie udało się zapisać rankingu", error);
    }
}
