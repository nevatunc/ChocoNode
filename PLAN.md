# ChocoNode — Plan

Java ile Data Structures öğreten, sıcak çikolata dükkânı temalı etkileşimli öğrenme sitesi. GitHub Pages'te yayınlanacak statik bir Vite + React + TypeScript uygulaması.

## Kaynak materyal analizi

`./source-material:/` (not: klasör adının sonunda gerçekten `:` var — macOS'un eski Mac Roman yol ayracı kalıntısı, dokunulmadı) içinde Princeton "Algorithms, 4th ed." (Sedgewick & Wayne) tabanlı bir CE 201 Data Structures dersinin slaytları, ödevleri ve demo videoları var:

- `00_Intro_week00_DATA STRUCTURES.pdf` — ders tanıtımı, değerlendirme: Ödev+Proje %20, Lab %10, Vize %30, Final %40. Kitap: *Algorithms, 4th Edition*.
- `13StacksAndQueues.pdf/pptx` + "Stacks and Queues - In-Class Exercises.docx" + "Stacks and Queues - Homework.pdf" — stack/queue, resizing array, linked list, generics, iterators, uygulamalar (ifade değerlendirme, fonksiyon çağrıları).
- `14AnalysisOfAlgorithms.pdf`, `14DemoBinarySearch.pdf`, "Exercise Hour Review Analysis of Algorithms" — Big-O, binary search.
- `15UnionFind.pdf` + `UF.java` + `tinyUF.txt` + Quick Find/Union/Weighted demo videoları — union-find (bonus/graph-adjacent konu, kaynakta var).
- `course_book.pdf` — tam ders kitabı (Algorithms 4th ed.), referans kaynak.

Kaynakta **tree, heap, hash table, graph BFS/DFS, sorting** slaytları bu oturumda derinlemesine okunmadı (zaman kısıtı); bu modüller standart Sedgewick & Wayne sırasına göre varsayılan müfredatla yazılacak ve kaynak dosyalar proje ilerledikçe gözden geçirilecek. **Union-Find**, kaynakta güçlü şekilde yer aldığı için müfredata 11.5 olarak eklendi (kullanıcının orijinal listesinde yoktu, kaynak onu içerdiği için eklendi).

## Müfredat (nihai sıra)

0. Java hızlı tekrar
1. Complexity / Big-O — kaynakla eşleşiyor (14AnalysisOfAlgorithms)
2. Array & dynamic array
3. Linked list
4. Stack **[Vize Kapsamı]** — kaynakla birebir eşleşiyor (13StacksAndQueues)
5. Queue, deque, priority queue **[Vize Kapsamı]** — kaynakla eşleşiyor
6. Recursion
7. Union-Find **[Vize Kapsamı]** — kaynakla eşleşiyor (15UnionFind), kullanıcı listesinde yoktu, kaynaktan eklendi
8. Trees: binary tree, traversals, BST
9. Heap
10. Hash table
11. Graphs: BFS, DFS
12. Sorting & searching (binary search kaynakla eşleşiyor — 14DemoBinarySearch)

Vize kapsamı tahmini: 1–7 (ders akışına göre; kesin aralık hoca materyalinde açık belirtilmemiş, varsayım).

## Teknik mimari

- **Vite + React + TypeScript**, Tailwind CSS.
- İçerik: `src/content/lessons/<id>.ts` — her ders kendi dosyasında (başlık, giriş, kod blokları + satır açıklamaları, trace adımları, alıştırmalar, mini-boss soruları). Yeni ders = yeni dosya + `src/content/index.ts`'e kayıt.
- Görselleştirme: SVG + CSS transitions / Framer Motion; hand-authored adım listeleri (`VisualizationStep[]`) içerik dosyalarında.
- Kod vurgulama: Shiki.
- İlerleme: `localStorage` (try/catch sarmalı), export/import/reset.
- Java kod doğrulama: `scripts/verify-java.mjs` — kod bloklarını `.java` dosyasına yazar, `javac`+`java` ile çalıştırır, çıktıyı karşılaştırır. CI'da ve yerelde çalışır; Java yoksa README'de kurulum talimatı.
- Deploy: `.github/workflows/deploy.yml` — build + GitHub Pages.

## Tasarım yönü

- **Tema**: Sıcak Çikolata Dükkânı. Koyu tema "bitter çikolata" (kahve #2b1810 tonları), açık tema "sütlü çikolata/krem" (#f5e6d3 tonları). Vurgu: karamel #c17a3d, pudra pembesi #e8b4bc, nane yeşili #a8d5ba.
- **Maskot adı** (3 alternatif, varsayılan seçili → ❶):
  1. **Kakao** ❶ (varsayılan — kısa, sevimli, "kakao" kelimesi zaten Türkçe ve İngilizce'de tanıdık)
  2. Fincan (Fıncı)
  3. Marsel (marshmallow'dan esinli)
- **Yardımcılar**: Tarçın (ipucu/çubuk), Kurabiye (hata dedektifi), Marshmallow (kutlama).
- **Slogan** (3 alternatif, varsayılan ❶):
  1. "Veri yapılarını, bir fincan sıcak çikolatayla öğren." ❶
  2. "Her düğüm bir çikolata karesi."
  3. "Algoritmaları pişirmenin en tatlı yolu."
- **Logo**: "ChocoNode" eriyen çikolata yazısı, SVG + feGaussianBlur/feColorMatrix gooey efekti, "oo" harfleri bağlı düğüm gibi. 3 taslak `src/assets/logo-drafts/` altında hazırlanacak; varsayılan taslak A kullanılacak, kullanıcı seçene kadar.

## Çalışma sırası

1. ✅ PLAN.md (bu dosya)
2. Proje iskeleti + tasarım sistemi (renkler, tipografi, logo, maskot SVG)
3. Dikey dilim: **Modül 4 — Stack** tam özellikli (satır satır kod, görselleştirme, playground, 6 alıştırma, mini boss, özet kartı)
4. Aynı kalıpla diğer modüller
5. Java doğrulama scripti + testler her modülde
6. README (TR), deploy workflow, lisans notu

## Varsayımlar (belirsizlik durumunda)

- Vize kapsamı sınırı kaynakta net değil → 1–7 arası varsayıldı, slayt tarihleri netleşirse güncellenecek.
- Union-Find kullanıcı müfredatında yoktu ama kaynakta güçlü yer aldığı için eklendi (kural: "kaynakta olup bu listede olmayanları ekle").
- Tree/Heap/Hash/Graph/Sorting slaytları bu turda derinlemesine okunmadı; standart Sedgewick sırası varsayıldı, ilerleyen modüllerde kaynak dosyalar tekrar kontrol edilecek.
