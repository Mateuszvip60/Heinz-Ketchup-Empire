# 📜 Changelog – Heinz Ketchup Empire

## 2.0.0 – Modularna wersja pod GitHub Pages (13.10.2025)
### Nowe
- Przepisywanie całej logiki na moduły ES (folder `src/`), co ułatwia edycję i rozbudowę gry.
- Adaptacyjna pętla gry z buforowaniem statystyk i algorytmem regulującym częstotliwość tików.
- Domyślne tłumaczenie na język polski oraz przełącznik na język angielski.
- Integracja rankingu z **JSONSilo** (fallback lokalny + komunikat o statusie synchronizacji).
- Przełącznik „Funkcje online” pozwalający grać w pełni offline jednym kliknięciem.
- Komentarze opisujące moduły w języku polskim zgodnie z wytycznymi autora.

### Zmiany
- Wszystkie style przeniesione do `styles/style.css`, zachowano pierwotny wygląd interfejsu.
- Odświeżona dokumentacja (README z badge'ami, demo, assets, nowe `SOURCES.md`) oraz wytyczne dla Pull Requestów.
- Odświeżony mechanizm skórek (lazy loading, ponowny render) i system osiągnięć.
- Ustawienie nowych kluczy w localStorage (`heinzKetchupEmpireV2`) z automatyczną migracją danych.

### Naprawy
- Zbalansowany mnożnik kliknięć oraz produkcji po nagrodach z osiągnięć i rebirth.
- Usunięcie starych odniesień do MiniMax, poprawa polskich opisów i labeli.
- Stabilizacja losowych zdarzeń (kontrola częstotliwości oraz wygaszanie bonusów).

---

## 1.1 – System rankingu lokalnego (12.10.2025)
### Nowe
- Tablica wyników w 4 kategoriach (Suma Kropli, Odrodzenia, Max DPS, Czas Gry).
- Zakładki Ulepszenia/Ranking, wyróżnienie własnego rekordu, modal z nickiem.

### Zmiany
- Rozszerzone statystyki gracza (suma kropli, maksymalny DPS, czas gry).
- Automatyczny zapis rankingu w localStorage.

---

## 1.0 – Pierwsze wydanie (12.10.2025)
### Zawartość
- Rdzeń gry clickerowej: 7 ulepszeń, 5 skórek, system odrodzeń i osiągnięć.
- Animacje butelki, efekty cząsteczek, glassmorphism UI i responsywność.
- Dwujęzyczność (PL/EN) oraz system autosave w localStorage.
