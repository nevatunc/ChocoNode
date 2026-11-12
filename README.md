# ChocoNode 🍫

Java ile Data Structures (veri yapıları) öğreten, sıcak çikolata dükkânı temalı, etkileşimli bir öğrenme sitesi. GitHub Pages'te yayınlanmak üzere tasarlanmış, tamamen statik bir Vite + React + TypeScript uygulamasıdır.

## Durum

Tüm 13 modül (0: Java Hızlı Tekrar → 12: Sıralama ve Arama) `src/content/lessons/` altında yazıldı ve `src/content/index.ts`'e kayıtlı. Her modülde: çikolata dükkânı benzetmesi, satır satır kod açıklaması, adım adım görselleştirme (Stack/Queue/Array/Linked List/Recursion/Union-Find/Heap için doğrusal; Tree için SVG ağaç; Hash Table için bucket/chaining; Graph için BFS/DFS komşuluk+kuyruk görünümü), en az 6 alıştırma (6 farklı tip), 5 soruluk mini boss ve özet kartı bulunuyor. Java, Big-O ve Sorting modüllerinde veri yapısına özgü bir playground yok (kavramsal konular); diğerlerinde "Kendin Dene" etkileşimli playground var.

Build temiz geçiyor (`npm run build`), tüm görselleştirme tipleri tarayıcıda test edildi.

## Kurulum ve çalıştırma

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

## Yeni ders ekleme

1. `src/content/lessons/<ders-id>.ts` dosyasını oluştur, `Lesson` tipini doldur (bkz. `src/lib/types.ts` ve örnek olarak `stack.ts`).
2. `src/content/index.ts` içindeki `lessons` dizisine ekle.
3. Görselleştirme için gerekirse `src/components/Visualizer/` altına o veri yapısına özel bir bileşen ekle (örn. `StackVisualizer.tsx` kalıbını takip et).

## Java kod doğrulama

```bash
npm run verify-java
```

Bu script, ders içeriklerindeki Java kod bloklarının derlenebilirliğini kontrol etmeye çalışır. **Not:** İçerikteki kod blokları satır-satır açıklama amaçlı küçük parçalar halinde tutulduğu için (push/pop ayrı bloklar gibi), script bunları en iyi çabayla (best-effort) bir sınıfa sarmalar; tam bütünlük garantisi için ileride her ders için ayrıca "tam, çalışan" bir referans `.java` dosyası eklenmesi planlanıyor.

**Java kurulumu** (script olmadan da test etmek isterseniz):

- macOS: `brew install openjdk` (veya Oracle JDK 17+ indir)
- Windows/Linux: https://www.oracle.com/java/technologies/downloads/

Java kurulu değilse script atlanır ve uyarı verir; CI'da bu adım build'i kırmaz.

## GitHub Pages'te yayınlama

`.github/workflows/deploy.yml`, `main` dalına her push'ta otomatik build + deploy yapar. Reponuzun adı `choconode` değilse:

- `vite.config.ts` içindeki `base` değerini güncelleyin, veya
- Build sırasında `VITE_BASE=/repo-adiniz/ npm run build` kullanın.

Repo ayarlarında **Settings → Pages → Source: GitHub Actions** seçili olmalı.

## Kaynak materyal ve telif notu

`./source-material:/` klasörü, hocanın derse özel yüklediği slayt/ödev dosyalarını içerir ve **`.gitignore` ile repoya hiçbir zaman commit edilmez**. Site içeriği bu kaynaklardan esinlenerek (konu sırası, terimler, soru tarzı) özgün biçimde yazılmıştır; kaynaklardan birebir metin/kod kopyalanmamıştır. Bu proje bir üniversite dersi için kişisel çalışma materyalidir, resmî ders materyali değildir.

## Teknik yığın

- Vite + React + TypeScript + Tailwind CSS
- `react-router-dom` (HashRouter — statik hosting ile uyumlu)
- İlerleme: `localStorage` (dışa/içe aktarma ve sıfırlama destekli, bkz. `src/lib/storage.ts`)
- Kod vurgulama için `shiki` bağımlılığı eklendi (ileri modüllerde kullanılacak)

## Erişilebilirlik

- Mobil öncelikli, klavye ile kullanılabilir bileşenler
- `prefers-reduced-motion` desteği (logo animasyonları ve geçişler buna uyar)
- Koyu/açık tema (bitter çikolata / sütlü çikolata)
