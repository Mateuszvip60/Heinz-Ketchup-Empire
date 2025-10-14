# 🎮 Heinz Ketchup Empire – Podgląd rozgrywki

## 1. Start gry
- **Ekran ładowania** – pulsująca butelka na ciemnym tle (1 sekunda).
- **Modal z nickiem** – gracz wpisuje nazwę, zanim trafi do rankingu.

## 2. Główny interfejs
```
┌────────────────────────────┬────────────────────────────┬────────────────────────────┐
│     Statystyki na żywo     │      Obszar klikania        │  Ulepszenia / Ranking      │
│ Krople, DPS, Kliknięcia    │ Animowana butelka + skórki  │ Zakładki + lista upgrade'ów│
└────────────────────────────┴────────────────────────────┴────────────────────────────┘
```
- Panel statystyk aktualizuje się w czasie rzeczywistym.
- Środkowa kolumna to butelka + selector skórek (emoji lub grafika PNG).
- Trzecia kolumna umożliwia przełączanie między listą ulepszeń a rankingiem.

## 3. Pętla rozgrywki
1. **Kliknij butelkę** – animacja, dźwięk „squish”, cząsteczki, licznik rośnie.
2. **Kup ulepszenia** – zwiększ power kliknięcia, generuj krople pasywnie.
3. **Odblokuj skórki** – każda zmienia wygląd butelki; wybór zapisuje się w stanie gry.
4. **Osiągaj kamienie milowe** – wyskakujące powiadomienia, bonusy do mocy.
5. **Odrodzenie** – po 1e12 kropli zdobądź Punkty Duszy i zacznij z premią.

## 4. Efekty i oprawa
- **Wizualne**: glassmorphism, gradieny, ekranowe wstrząsy, liczby unoszące się przy kliknięciu.
- **Audio** (opcjonalne): kliknięcia, ulepszenia, fanfary za osiągnięcia, efekt rebirth.
- **Losowe wydarzenia**: deszcz ketchupu (premia kropli) albo podwojenie mocy kliknięć na 30s.

## 5. Ranking
- Zakładka „Ranking” zawiera tabelę w 4 kategoriach.
- Nad tabelą widoczny status synchronizacji (lokalnie / JSONSilo) oraz przycisk przełączania funkcji online.
- Własny wynik jest wyróżniony złotą ramką.
- Dane wysyłane automatycznie co 15 sekund lub ręcznie przyciskiem „Dodaj do Rankingu”.

## 6. Responsywność
- **Desktop** – trzy kolumny obok siebie.
- **Tablet** – kolumny układają się pionowo (statystyki → gra → panele).
- **Mobile** – przyciski i panele wypełniają pełną szerokość, kliknięcia są dotykowe.

## 7. Dłuższa sesja
- Po kilku minutach pojawiają się skórki premium i nowe osiągnięcia.
- Po przekroczeniu wymaganego progu możliwe jest odrodzenie i zbieranie Punktów Duszy.
- System autosave gwarantuje, że stan gry odtworzy się przy kolejnym wejściu.

Miłej zabawy podczas prezentacji projektu lub testowania nowych pomysłów! 🍅
