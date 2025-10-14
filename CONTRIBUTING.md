# 🤝 Kontrybucje do Heinz Ketchup Empire

Dziękujemy za chęć rozwijania projektu! Poniżej znajdziesz zasady współpracy oraz minimalne wymagania dla Pull Requestów.

## 1. Zgłaszanie pomysłów i bugów
- Utwórz Issue z opisem i oczekiwanym rezultatem.
- Dodaj zrzuty ekranu lub link do demo, jeśli to możliwe.
- W przypadku błędów określ przeglądarkę i kroki odtworzenia.

## 2. Przygotowanie zmian
1. Sforkuj repozytorium i utwórz gałąź `feature/krótki-opis` lub `fix/krótki-opis`.
2. Zachowaj istniejący styl:
   - ES Modules, brak zbędnych komentarzy.
   - Logika w `src/core/` i `src/services/`, interfejs w `src/ui/`.
   - Tłumaczenia aktualizuj w `src/data/translations.js` (PL i EN).
3. Upewnij się, że gra działa lokalnie (`npx serve .`) i nie generuje błędów w konsoli.
4. Nie commituj pliku `env.js` – powinien być generowany z zmiennych środowiskowych.
5. Zaktualizuj dokumentację (README, CHANGELOG lub inne pliki), jeśli zmiana tego wymaga.

## 3. Pull Request
- Opisz krótko problem i rozwiązanie.
- Wymień pliki, które zmieniasz, oraz wpływ na gameplay.
- Dodaj wpis do `CHANGELOG.md` (sekcja „Nowe/Zmiany/Naprawy”).
- Jeżeli PR wprowadza ustawienia rankingu online, pamiętaj, aby nie udostępniać prywatnych kluczy.

## 4. Recenzja
- Zgłoszenia są sprawdzane na bieżąco.
- Możesz zostać poproszony o poprawki (styl, logika, dokumentacja).
- Po zatwierdzeniu PR zostanie scalony, a gra automatycznie dostępna na GitHub Pages.

## 5. Licencja i autorstwo
- Projekt udostępniony jest na licencji MIT – akceptując warunki, zgadzasz się na ich przestrzeganie.
- Twoje zmiany zostaną przypisane do Twojego konta GitHub i wymienione w historii git.

Dziękujemy za każdy wkład w rozwój Imperium Ketchupu! 🍅
