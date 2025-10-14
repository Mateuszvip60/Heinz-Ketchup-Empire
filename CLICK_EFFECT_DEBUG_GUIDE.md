# 🐛 Debug Guide - Efekt Kliknięcia

## Problem
Efekt kliknięcia (+20) nie pokazuje się od razu po załadowaniu strony, ale zaczyna działać dopiero po zakupie pierwszego ulepszenia.

## Zmiany w tej wersji

### 1. ✅ Naprawiono import conflicts
- `main.js` teraz importuje z `effects_helio.js` (wcześniej był conflict)
- Wszystkie moduły używają spójnych importów

### 2. ✅ Poprawa inicjalizacji
- Ekran ładowania jest ukrywany PRZED inicjalizacją UI
- Dodano sprawdzenie czy CSS jest w pełni załadowany
- Opóźnienie inicjalizacji zapewnia pełne załadowanie zasobów

### 3. ✅ Dodano debugowanie
Otwórz konsolę deweloperską (F12) aby zobaczyć:

```
🚀 Starting bootstrap process...
✅ CSS styles are fully loaded
✅ All resources loaded, initializing UI...
🔧 bindBottle called - initializing bottle click handler
✅ Bottle element found: <div id="bottle">...
📱 Device info: {...}
✅ Bottle binding completed successfully! Click effects should work now.
🧪 Running post-init test click...
🧪 Test effect spawned
```

### 4. ✅ Test automatyczny
Po załadowaniu strony system automatycznie testuje czy efekt działa poprzez symulację kliknięcia.

## Jak przetestować

1. **Otwórz `index.html`**
2. **Otwórz konsolę (F12 → Console)**
3. **Kliknij na butelkę NATYCHMIAST po załadowaniu**
4. **Sprawdź logi w konsoli:**
   - Czy pokazuje się `🖱️ Click detected on bottle`?
   - Czy pokazuje się `🎨 spawnClickEffect called`?
   - Czy pokazuje się `🎨 Effect added to DOM`?

## Oczekiwane zachowanie

✅ **POPRAWNE**: Po pierwszym kliknięciu widać:
```
🖱️ Click detected on bottle, power: 1
🎨 Spawning click effect: {x: 640, y: 360, value: "1", speed: 45}
🎨 spawnClickEffect called: {x: 640, y: 360, value: "1", speed: 45}
🎨 Effect element created: <div class="click-effect">+1</div>
🎨 Effect added to DOM at position: {x: 640, y: 360}
```

❌ **BŁĘDNE**: Brak logów lub tylko częściowe logi

## Jeśli problem nadal występuje

1. Sprawdź czy w konsoli są błędy JavaScript
2. Sprawdź czy element `.click-effect` pojawia się w DOM (Elements tab)
3. Sprawdź czy CSS dla `.click-effect` jest załadowany (Computed styles)

## Następne kroki

Jeśli ta wersja naprawia problem, usuniemy logi debugowania i wyślemy finalną wersję.
