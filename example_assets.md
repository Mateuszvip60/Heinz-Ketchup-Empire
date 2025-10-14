# 🎨 Assety dla Heinz Ketchup Empire

## 1. Skórki butelek (PNG 200×200)
| Nazwa        | Opis kolorystyki              | Koszt w grze |
|--------------|-------------------------------|--------------|
| classic.png  | Gradient 🍅 #E4002B → #FF6B6B | 0 kropli     |
| golden.png   | Złoto 👑 #FFD700 → #FFA500    | 10 000 kropli|
| halloween.png| Jesień 🎃 #FF4500 → #8B0000   | 50 000 kropli|
| futuristic.png| Chrom 🔮 #C0C0C0 → #4169E1  | 250 000 kropli|
| rainbow.png  | Tęcza 🌈 wielokolorowa        | 1 000 000 kropli|

### Jak przygotować grafikę
1. Utwórz dokument 200×200 px z przezroczystym tłem.
2. Wyrenderuj butelkę lub okrągły token z gradientem.
3. Dodaj delikatny cień, efekt połysku.
4. Eksportuj jako PNG i zachowaj nazwę pliku zgodną z powyższą tabelą.
5. Umieść pliki w folderze `skins/`.

> Brak własnych grafik? Gra użyje emoji i gradientów jako fallbacku.

## 2. Efekty audio (MP3)
| Plik          | Rekomendowany charakter | Długość |
|---------------|-------------------------|---------|
| squish.mp3    | Miękki „squish/pop”     | 0.2–0.5 s |
| upgrade.mp3   | Pozytywny dzwonek       | 0.5–1.0 s |
| victory.mp3   | Krótka fanfara          | 1–2 s     |
| rebirth.mp3   | Kosmiczny „whoosh”      | 2–3 s     |

### Skąd pobrać
- [Freesound.org](https://freesound.org)
- [YouTube Audio Library](https://studio.youtube.com/channel/UC/music)
- [OpenGameArt.org](https://opengameart.org)

### Edycja krok po kroku (Audacity)
1. Importuj dźwięk.
2. Przytnij do wymaganego czasu.
3. Wyrównaj głośność (`Effect → Normalize`).
4. Eksportuj jako MP3, umieść w folderze `sounds/`.

## 3. Testowanie assetów
1. Dodaj nowe pliki do odpowiednich katalogów.
2. Odśwież stronę w przeglądarce.
3. Sprawdź konsolę (F12), czy nie pojawiają się błędy ładowania.
4. W razie problemów upewnij się, że nazwy plików są identyczne jak w kodzie.

## 4. Wskazówki
- Zachowaj spójny styl – najlepiej płaskie gradienty i jasne kolory.
- Kompresuj PNG (np. TinyPNG), aby zmniejszyć czas ładowania.
- Używaj krótkich efektów audio (<100 KB), by gra szybko się wczytywała.
- Dodaj `alt` w HTML, jeśli podmieniasz pliki na własne grafiki.

Dzięki temu repozytorium pozostanie lekkie, a personalizacja gry pozostanie banalnie prosta. 🎯
