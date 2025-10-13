/*
 * → Developed by: @Mateuszvip60
 * → Aktualizuje tabelę rankingu i zakładki.
 */

import { elements } from "./elements.js";
import { formatNumber, formatTime } from "../utils/number.js";

export function renderLeaderboard({ state, data, category, translate, syncEnabled, onlineEnabled }) {
    const tbody = elements.leaderboardBody;
    tbody.innerHTML = "";

    const rows = data?.[category] || [];

    if (elements.leaderboardStatus) {
        elements.leaderboardStatus.textContent = translate(syncEnabled ? "leaderboardSyncEnabled" : "leaderboardSyncDisabled");
    }

    if (elements.onlineToggleBtn) {
        elements.onlineToggleBtn.textContent = translate(onlineEnabled ? "onlineToggleOn" : "onlineToggleOff");
    }
    if (!rows.length) {
        const emptyRow = document.createElement("tr");
        emptyRow.innerHTML = `<td colspan="3" style="text-align:center; color: var(--text-secondary);">${translate("leaderboardEmpty")}</td>`;
        tbody.appendChild(emptyRow);
    } else {
        rows.forEach((entry, index) => {
            const row = document.createElement("tr");
            if (entry.name === state.playerName) {
                row.classList.add("current-player");
            }

            let scoreValue = entry.score;
            if (category === "playtime") {
                scoreValue = formatTime(entry.score);
            } else {
                scoreValue = formatNumber(entry.score);
            }

            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${entry.name}</td>
                <td>${scoreValue}</td>
            `;
            tbody.appendChild(row);
        });
    }

    Array.from(elements.leaderboardTabs.querySelectorAll(".tab-button")).forEach(button => {
        if (button.dataset.category === category) {
            button.classList.add("active");
        } else {
            button.classList.remove("active");
        }
        button.textContent = translate(button.dataset.category);
    });
}
