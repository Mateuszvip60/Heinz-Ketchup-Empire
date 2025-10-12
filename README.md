# 🍅 Heinz Ketchup Empire - Ultimate Clicker Game

## 📋 Instrukcje Instalacji

### 1. Struktura Plików
```
heinz_ketchup_empire.html
skins/
├── classic.png
├── golden.png
├── halloween.png
├── futuristic.png
└── rainbow.png
sounds/
├── squish.mp3
├── upgrade.mp3
├── victory.mp3
└── rebirth.mp3
```

### 2. Obrazy Skinów (200x200px, okrągłe)
Umieść następujące obrazy w folderze `skins/`:

- **classic.png** - Klasyczna czerwona butelka Heinz Ketchup
- **golden.png** - Złota edycja (odblokowana za 10,000 kropli)
- **halloween.png** - Halloweenowa wersja (odblokowana za 50,000 kropli) 
- **futuristic.png** - Futurystyczna chromowana butelka (odblokowana za 250,000 kropli)
- **rainbow.png** - Tęczowa deluxe edycja (odblokowana za 1,000,000 kropli)

### 3. Pliki Dźwiękowe
Umieść następujące pliki audio w folderze `sounds/`:

- **squish.mp3** - Dźwięk kliknięcia butelki
- **upgrade.mp3** - Dźwięk zakupu ulepszenia
- **victory.mp3** - Dźwięk osiągnięcia
- **rebirth.mp3** - Epicki dźwięk odrodzenia

### 4. Uruchomienie Gry
1. Pobierz lub skopiuj plik `heinz_ketchup_empire.html`
2. Stwórz foldery `skins/` i `sounds/` w tym samym katalogu
3. Dodaj odpowiednie pliki obrazów i dźwięków
4. Otwórz plik HTML w przeglądarce internetowej

## 🎮 Mechaniki Gry

### Podstawowe Funkcje:
- **Klikanie Butelki**: Każde kliknięcie daje Krople Ketchupu
- **Ulepszenia**: 7 różnych typów ulepszeń zwiększających produkcję
- **Skórki**: 5 odblokowywalnych skinów dla butelki
- **System Odrodzenia**: Resetuj postęp za permanentne bonusy
- **Osiągnięcia**: 7 osiągnięć z nagrodami
- **Ranking/Topka**: Tabela najlepszych graczy w 4 kategoriach
- **Wielojęzyczność**: Przełącznik polskiego i angielskiego

### Ulepszenia:
1. **Click Power / Moc Kliknięcia** - Zwiększa siłę kliknięć
2. **Factory Workers / Robotnicy Fabryki** - Automatyczna produkcja
3. **Bigger Bottle / Większa Butelka** - Mnoży moc kliknięć
4. **Sauce Helpers / Pomocnicy Sosowi** - Więcej automatycznej produkcji
5. **Ketchup Factory / Fabryka Ketchupu** - Masowa produkcja
6. **Global Domination / Globalna Dominacja** - Mnoży całą produkcję
7. **Mega Factory / Mega Fabryka** - Najwyższa produkcja

### Specjalne Efekty:
- **Animacje cząsteczek** przy każdym kliknięciu
- **Losowe boosty** (10% szans na podwójne krople)
- **Trzęsienie ekranu** przy ważnych eventach
- **Tęczowe teksty** dla specjalnych funkcji
- **Glassmorphism UI** z przezroczystymi panelami

## 🔧 Techniczne Szczegóły

### Funkcje Zapisu:
- Automatyczny zapis co 5 sekund
- localStorage do przechowywania postępu
- Zapis przy zamknięciu strony

### Responsywność:
- Pełna obsługa urządzeń mobilnych
- Adaptacyjny layout dla różnych rozmiarów ekranu
- Touch-friendly interface

### Optymalizacja:
- Vanilla JavaScript bez zależności
- Efektywne animacje CSS
- Minimalne zużycie zasobów

## 🏆 Osiągnięcia

1. **First Drop / Pierwsza Kropla** - Pierwsze kliknięcie
2. **Getting Started / Początek** - 100 kropli
3. **Ketchup Addict / Maniak Ketchupu** - 1,000 kropli
4. **First Upgrade / Pierwsze Ulepszenie** - Zakup ulepszenia
5. **Click Master / Mistrz Klikania** - 100 kliknięć
6. **Millionaire / Milioner** - 1,000,000 kropli
7. **Reborn / Odrodzony** - Pierwsze odrodzenie

## 🏆 System Rankingu

### 4 Kategorie Konkursu:
1. **Total Drops / Suma Kropli** - Największa ilość zebranych kropli
2. **Rebirths / Odrodzenia** - Najwięcej ukończonych odrodzeń
3. **Max DPS** - Najwyższa produkcja kropli na sekundę
4. **Playtime / Czas Gry** - Najdłuższy czas gry

### Funkcje Rankingu:
- **Top 10** graczy w każdej kategorii
- **Lokalny ranking** (zapisany w przeglądarce)
- **Automatyczne dodawanie** wyników do topki
- **Podświetlenie własnego wyniku** złotym kolorem
- **Przełączanie kategorii** za pomocą tabów
- **Wielojęzyczne opisy** (PL/EN)

## 🎨 Personalizacja

Możesz łatwo dostosować grę poprzez:
- Zmianę kolorów w zmiennych CSS `:root`
- Dodanie nowych skinów (wystarczy dodać obraz i wpis w `skinDefinitions`)
- Modyfikację mechanik w sekcji JavaScript
- Dodanie nowych języków w obiekcie `translations`

## 🚀 Zaawansowane Funkcje

### System Punktów Duszy:
- Odrodzenie za 1e12 kropli daje punkty duszy
- Każdy punkt duszy = +1% do całej produkcji
- Permanentne bonusy między odrodzeními

### Losowe Eventy:
- "Ketchup Rain" - bonus kropli co minutę
- Tymczasowe bonusy do siły kliknięć
- Specjalne efekty wizualne

---

**Autor**: MiniMax Agent  
**Wersja**: 1.0  
**Kompatybilność**: Wszystkie nowoczesne przeglądarki  
**Licencja**: Open Source
