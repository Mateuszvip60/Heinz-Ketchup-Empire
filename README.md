# 🍅 Heinz Ketchup Empire

![Status](https://img.shields.io/badge/Status-Aktywny-brightgreen)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-ready-blue?logo=github)
![API](https://img.shields.io/badge/API-JSONSilo-orange)
![JavaScript](https://img.shields.io/badge/Made%20with-JavaScript-yellow?logo=javascript)

> Modularny clicker o szklanym interfejsie, gotowy do natychmiastowego wdrożenia na GitHub Pages i synchronizacji z usługą JSONSilo.

![Podgląd klasycznej skórki](skins/classic.png) ![Podgląd złotej skórki](skins/golden.png)

## 🌐 Języki interfejsu
- 🇵🇱 **Polski** – domyślny język wszystkich komunikatów.
- 🇬🇧 **English** – przełącznik języka dostępny w prawym górnym rogu UI.

## 🚀 Najważniejsze funkcje
- Dynamiczne kliknięcia z efektami cząsteczek, wibracją ekranu i dźwiękami.
- Adaptacyjna pętla gry, która zwiększa częstotliwość aktualizacji podczas aktywnej gry i usypia przy bezczynności.
- Rozbudowany system ulepszeń, osiągnięć, rebirth oraz skórek z automatycznym zapisem w `localStorage`.
- Ranking lokalny z opcjonalną synchronizacją w **JSONSilo** oraz przełącznikiem „Funkcje online”.
- Autosave, migracja zapisów i zabezpieczenie przed utratą danych przy aktualizacjach.

## 🧠 Algorytmy skuteczności
- Buforowanie kliknięć i DPS – obliczenia wykonywane tylko po zmianach.
- Adaptacyjne taktowanie pętli gry (`50–250 ms`) zależnie od aktywności gracza i DPS.
- Kontrolowane zdarzenia losowe (boost kliknięć, deszcz ketchupu) z wygaszaniem efektów.
- Migracja save’ów do wersji `v2` – brak utraty postępów przy aktualizacji kodu.

## 🗂️ Struktura projektu
```
.
├── index.html          # Stały layout, import modułu głównego
├── styles/style.css    # Wszystkie style wizualne (glassmorphism, responsywność)
├── src/
│   ├── core/           # Logika gry, pętla, zarządzanie stanem
│   ├── data/           # Konfiguracje (ulepszenia, tłumaczenia, skórki)
│   ├── services/       # JSONSilo, localStorage, i18n, autosave
│   ├── ui/             # Renderowanie i obsługa interfejsu
│   └── utils/          # Formatowanie liczb, losowość
├── skins/              # Skiny PNG
├── sounds/             # Efekty audio MP3
├── env.template.js     # Wzór pliku z danymi środowiskowymi
└── env.js              # Generowany w trakcie wdrożenia (ignorowany w repozytorium)
```

## 🌍 Funkcje online
- Nad tabelą rankingu widoczny jest status synchronizacji (lokalnie / JSONSilo).
- Przycisk **„Funkcje online”** pozwala w locie przełączyć tryb online/offline.
- Przy braku konfiguracji API gra działa w pełni lokalnie, a ranking zapisuje się w przeglądarce.

## 🔐 Zmienne środowiskowe (GitHub)
Użyj poniższych zmiennych w ustawieniach repozytorium (**Settings → Secrets and variables → Actions → Variables**):

| Nazwa | Wartość | Opis |
|-------|---------|------|
| `JSONSILO_KEY` | `TWÓJ_KLUCZ_JSONSILO` | Klucz API nagłówka `X-SILO-KEY`. |
| `JSONSILO_FILE_ID` | `82305321-d682-411d-b028-83640c37fc14` | Identyfikator pliku (UUID) przechowującego ranking. |
| `JSONSILO_BASE_URL` | `https://api.jsonsilo.com` | Adres bazowy dla zapytań API. |
| `JSONSILO_REGION` | `api` | Kod regionu (serwer w Düsseldorfie). |
| `ONLINE_FEATURES_ENABLED` | `true` | Domyślne ustawienie przełącznika funkcji online (`false` = start offline). |

> Wszystkie wartości możesz nadpisać – podane powyżej są gotowe do użycia w obecnym projekcie.

## ⚙️ Konfiguracja JSONSilo i `env.js`
1. Skopiuj `env.template.js` do `env.js` (lokalnie) **lub** wygeneruj plik w CI na podstawie zmiennych środowiskowych.
2. Struktura oczekiwana przez grę:
   ```js
   window.__ENV__ = {
       JSONSILO_KEY: "...",
       JSONSILO_FILE_ID: "...",
       JSONSILO_BASE_URL: "https://api.jsonsilo.com",
       JSONSILO_REGION: "api",
       ONLINE_FEATURES_ENABLED: "true"
   };
   ```
3. Plik `env.js` jest ignorowany przez Git (`.gitignore`).
4. Przykładowy fragment workflow GitHub Actions tworzący plik przed publikacją:
   ```yaml
   - name: Generuj env.js
     run: |
       cat <<'EOF' > env.js
       window.__ENV__ = {
         JSONSILO_KEY: "${{ vars.JSONSILO_KEY }}",
         JSONSILO_FILE_ID: "${{ vars.JSONSILO_FILE_ID }}",
         JSONSILO_BASE_URL: "${{ vars.JSONSILO_BASE_URL }}",
         JSONSILO_REGION: "${{ vars.JSONSILO_REGION }}",
         ONLINE_FEATURES_ENABLED: "${{ vars.ONLINE_FEATURES_ENABLED }}"
       };
       EOF
   ```

## ▶️ Uruchomienie lokalne
1. Sklonuj repozytorium lub pobierz ZIP.
2. Skopiuj `env.template.js` do `env.js` i uzupełnij wartości (lub pozostaw domyślne, aby gra działała lokalnie).
3. Otwórz `index.html` w przeglądarce **lub** uruchom prosty serwer HTTP:
   ```bash
   npx serve .
   ```
4. Wpisz swój nick (modal poprosi o nazwę) i rozpocznij rozgrywkę.

## 🌍 Publikacja na GitHub Pages
1. Ustaw zmienne środowiskowe w repozytorium (sekcja powyżej).
2. W workflow (lub ręcznie) wygeneruj plik `env.js` przed publikacją.
3. W **Settings → Pages** wybierz gałąź `main` i katalog `/` (root).
4. Po kilku minutach gra będzie dostępna pod `https://nazwa_uzytkownika.github.io/Heinz-Ketchup-Empire/`.

## 👥 Jak zgłaszać aktualizacje (Pull Requests)
1. Sforkuj repozytorium i utwórz gałąź `feature/...` lub `fix/...`.
2. Zachowaj modułową strukturę (logika w `core/` i `services/`, UI w `ui/`).
3. Zaktualizuj tłumaczenia w `translations.js` dla obu języków.
4. Dodaj wpis do `CHANGELOG.md` i – w razie potrzeby – uzupełnij `SOURCES.md` nowymi źródłami.
5. Otwórz Pull Request – zmiany są weryfikowane na bieżąco.

## 📚 Dodatkowe materiały
- [`CHANGELOG.md`](CHANGELOG.md) – historia wydań.
- [`demo_preview.md`](demo_preview.md) – opis doświadczenia gracza krok po kroku.
- [`example_assets.md`](example_assets.md) – wskazówki dotyczące assetów.
- [`CONTRIBUTING.md`](CONTRIBUTING.md) – zasady kontrybucji.
- [`SOURCES.md`](SOURCES.md) – lista wykorzystanych zasobów, bibliotek i odnośników.

## 📄 Licencja
Projekt udostępniony na licencji [MIT](LICENSE). Zgłaszanie usprawnień przez Pull Requesty jest mile widziane – każda dobra zmiana trafia do głównej wersji gry.

Miłego klikania! 💪🍅
