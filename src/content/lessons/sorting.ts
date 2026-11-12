import type { Lesson } from "@/lib/types";

const insertionSortCode = [
  {
    code: "public static void insertionSort(int[] bars) {",
    what: "Insertion sort (eklemeli sıralama): diziyi, her elemanı doğru konumuna 'ekleyerek' sıralar.",
    why: "Boyutlarına göre dizilecek çikolata çubuklarını, elindeki her yeni çubuğu zaten sıralı olan kısma doğru yere sokan bir çırak gibi düşün.",
  },
  {
    code: "    for (int i = 1; i < bars.length; i++) {",
    what: "Dizinin 2. elemanından (index 1) başlanır; ilk eleman zaten 'sıralı' sayılır.",
    why: "—",
  },
  {
    code: "        int current = bars[i];",
    what: "Şu an yerleştirilecek eleman saklanır.",
    why: "—",
  },
  {
    code: "        int j = i - 1;",
    what: "Sol taraftaki (zaten sıralı) kısımda, karşılaştırma yapılacak index.",
    why: "—",
  },
  {
    code: "        while (j >= 0 && bars[j] > current) {",
    what: "Sol taraftaki eleman, current'tan büyükse devam edilir.",
    why: "Büyük elemanlar sağa kaydırılarak current için yer açılır.",
    commonMistake: "j >= 0 kontrolünü unutmak: bu durumda dizinin başına ulaşıldığında ArrayIndexOutOfBoundsException oluşur.",
  },
  {
    code: "            bars[j + 1] = bars[j];",
    what: "Büyük eleman bir sağa kaydırılır.",
    why: "—",
  },
  {
    code: "            j--;",
    what: "Bir sola kayarak karşılaştırmaya devam edilir.",
    why: "—",
  },
  {
    code: "        }",
    what: "while döngüsünün sonu.",
    why: "—",
  },
  {
    code: "        bars[j + 1] = current;",
    what: "current, artık doğru konumuna (j+1) yerleştirilir.",
    why: "Döngü durduğunda j+1, current'ın yerleştirileceği doğru boşluktur.",
  },
  {
    code: "    }",
    what: "for döngüsünün sonu.",
    why: "Toplam karmaşıklık: en kötü durumda (ters sıralı dizi) O(n²).",
  },
  {
    code: "}",
    what: "Metodun sonu.",
    why: "—",
  },
];

export const sortingLesson: Lesson = {
  id: "sorting",
  moduleNumber: 12,
  title: "Sıralama ve Arama Algoritmaları",
  isExamScope: false,
  structureKind: "sequence",
  chocolateAnalogy: {
    setup:
      "Boyutlarına göre çikolataları dizen bir çırak düşün: elindeki her yeni çikolatayı, zaten sıralı duran sıraya DOĞRU YERİNE sokuyor — bu insertion sort'un ta kendisi.",
    whereItEnds:
      "Benzetme burada bitiyor: gerçek bir çırak sezgisel davranır, ama algoritma her zaman AYNI adımları (karşılaştır, kaydır, yerleştir) tekrarlar — hız farkı da buradan gelir: bubble/selection/insertion sort O(n²), merge/quick/heap sort ise O(n log n) garantiler.",
  },
  intro:
    "Bu modül, temel sıralama algoritmalarını (bubble, selection, insertion — hepsi O(n²); merge, quick, heap — hepsi ortalama O(n log n)) ve arama algoritmalarını (linear search O(n), binary search O(log n), ama SADECE sıralı veride) karşılaştırmalı olarak ele alır. Insertion sort'u detaylı inceliyoruz çünkü küçük dizilerde pratikte oldukça hızlıdır ve anlaşılması en kolay olanıdır.",
  codeBlocks: [{ id: "insertion-sort", title: "insertionSort() — eklemeli sıralama", lines: insertionSortCode }],
  traces: [
    {
      id: "insertion-trace",
      title: "insertionSort([40, 10, 30, 20]) — ilk iki adım",
      codeBlockId: "insertion-sort",
      steps: [
        {
          highlightLine: 2,
          structure: { nodes: ["40", "10", "30", "20"], top: "10" },
          explanation: "i=1: current = bars[1] = 10. j = 0 ile sola doğru karşılaştırma başlar.",
        },
        {
          highlightLine: 5,
          structure: { nodes: ["40", "40", "30", "20"], top: "40", pending: "10" },
          explanation: "bars[0]=40 > current(10) olduğu için 40, bir sağa kaydırılır (bars[1]=40). j=-1 olur, döngü durur.",
        },
        {
          highlightLine: 8,
          structure: { nodes: ["10", "40", "30", "20"], top: "10" },
          explanation: "bars[j+1] = bars[0] = 10 ile current yerleştirilir. Dizi artık: [10, 40, 30, 20] — ilk iki eleman sıralı.",
          consoleOutput: "i=1 sonrası: [10, 40, 30, 20]",
        },
        {
          highlightLine: 2,
          structure: { nodes: ["10", "40", "30", "20"], top: "30" },
          explanation: "i=2: current = bars[2] = 30. j=1'den sola doğru karşılaştırma başlar.",
        },
        {
          highlightLine: 5,
          structure: { nodes: ["10", "40", "40", "20"], top: "40", pending: "30" },
          explanation: "bars[1]=40 > 30 olduğu için 40 sağa kaydırılır. bars[0]=10, 30'dan küçük olduğu için döngü durur (j=0).",
        },
        {
          highlightLine: 8,
          structure: { nodes: ["10", "30", "40", "20"], top: "30" },
          explanation: "current (30), j+1=1 konumuna yerleştirilir. Dizi: [10, 30, 40, 20] — ilk üç eleman sıralı.",
          consoleOutput: "i=2 sonrası: [10, 30, 40, 20]",
        },
      ],
    },
  ],
  exercises: [
    {
      id: "so1",
      type: "bigo-match",
      prompt: "Sıralama algoritmalarını worst-case karmaşıklıklarıyla eşleştir.",
      pairs: [
        { operation: "Bubble sort", complexity: "O(n²)" },
        { operation: "Selection sort", complexity: "O(n²)" },
        { operation: "Insertion sort", complexity: "O(n²)" },
        { operation: "Merge sort", complexity: "O(n log n)" },
      ],
      hint: "İlk üçü, karşılaştırma tabanlı 'basit' algoritmalardır; merge sort böl-ve-yönet (divide and conquer) kullanır.",
      explanationCorrect: "Bubble, selection ve insertion sort hepsi worst-case O(n²)'dir. Merge sort, böl-ve-yönet stratejisiyle her zaman O(n log n) garantiler.",
      explanationIncorrect: "Basit karşılaştırma tabanlı sıralamalar (bubble, selection, insertion) worst-case O(n²)'dir. Merge sort ise böl-ve-yönet sayesinde her zaman O(n log n)'dir.",
    },
    {
      id: "so2",
      type: "multiple-choice",
      prompt: "Binary search hangi ön koşulu gerektirir?",
      options: ["Dizinin tersten sıralı olması", "Dizinin SIRALI (sorted) olması", "Dizinin tekrarsız elemanlardan oluşması", "Dizinin en az 10 eleman içermesi"],
      correctIndex: 1,
      hint: "Algoritma her adımda 'ortadaki değerden büyük mü küçük mü' diye sorar — bu soru ancak sıralı veride anlamlıdır.",
      explanationCorrect: "Doğru! Binary search, sıralı olmayan bir dizide ÇALIŞMAZ — arama alanını yarıya indirme mantığı sıralılığa dayanır.",
      explanationIncorrect: "Binary search, dizinin SIRALI olmasını gerektirir; aksi halde 'orta değerden büyük/küçük' karşılaştırması anlamsızlaşır ve yanlış sonuç verir.",
    },
    {
      id: "so3",
      type: "find-bug",
      prompt: "Bu insertionSort kodunda bir hata var. Hangi satır eksik/yanlış?",
      buggyCode: "for (int i = 1; i < bars.length; i++) {\n    int current = bars[i];\n    int j = i - 1;\n    while (bars[j] > current) {\n        bars[j + 1] = bars[j];\n        j--;\n    }\n    bars[j + 1] = current;\n}",
      buggyLine: 3,
      fixedLine: "while (j >= 0 && bars[j] > current) olmalı — j >= 0 kontrolü eksik.",
      hint: "j azalırken, dizinin başına (j=-1) ulaşırsa bars[j] ne olur?",
      explanationCorrect: "Doğru! j >= 0 kontrolü olmadan, j=-1 olduğunda bars[-1] erişimi ArrayIndexOutOfBoundsException fırlatır.",
      explanationIncorrect: "while koşuluna j >= 0 && eklenmeli; yoksa j dizinin dışına (-1) çıktığında bars[j] erişimi hataya yol açar.",
    },
    {
      id: "so4",
      type: "predict-output",
      prompt: "Binary search ile 16 elemanlı sıralı bir dizide arama yapılıyor. En kötü durumda kaç karşılaştırma gerekir? (log2(16) kullan)",
      code: "binarySearch(sortedArray16, target); // worst case kaç karşılaştırma?",
      answer: "4",
      hint: "log2(16) = 4, çünkü 2^4 = 16.",
      explanationCorrect: "Doğru! log2(16) = 4 — her karşılaştırmada arama alanı yarıya iner: 16→8→4→2→1.",
      explanationIncorrect: "Binary search'te worst-case karşılaştırma sayısı log2(n)'dir. log2(16) = 4, çünkü 2^4 = 16.",
    },
    {
      id: "so5",
      type: "fill-blank",
      prompt: "insertionSort'ta, current'ı doğru konumuna yerleştiren son satırı yaz.",
      codeBefore: "while (j >= 0 && bars[j] > current) {\n    bars[j + 1] = bars[j];\n    j--;\n}",
      codeAfter: "",
      answer: "bars[j + 1] = current;",
      hint: "Döngü durduğunda j+1, current için açılmış doğru boşluktur.",
      explanationCorrect: "Doğru! bars[j + 1] = current; ile current artık doğru, boşaltılmış konumuna yerleşir.",
      explanationIncorrect: "Eksik satır: bars[j + 1] = current; — döngüden çıkıldığında j+1 konumu current için boşaltılmış durumdadır.",
    },
    {
      id: "so6",
      type: "multiple-choice",
      prompt: "Linear search (doğrusal arama), binary search'e göre ne zaman tercih edilir?",
      options: [
        "Her zaman, çünkü daha basittir",
        "Dizi SIRALI DEĞİLSE, çünkü binary search sıralı veri gerektirir",
        "Dizi çok büyükse",
        "Asla tercih edilmez",
      ],
      correctIndex: 1,
      hint: "Binary search'ün ön koşulunu hatırla.",
      explanationCorrect: "Doğru! Dizi sıralı değilse binary search uygulanamaz (ya da önce sıralama maliyeti eklenmesi gerekir); bu durumda linear search tek seçenek olabilir.",
      explanationIncorrect: "Linear search, dizi sıralı DEĞİLSE tercih edilir (ya da küçük dizilerde basitlik için) — binary search sıralı veri olmadan doğru çalışmaz.",
    },
  ],
  miniBoss: [
    {
      id: "somb1",
      prompt: "Insertion sort'un worst-case karmaşıklığı nedir?",
      options: ["O(n)", "O(log n)", "O(n²)", "O(n log n)"],
      correctIndex: 2,
      explanation: "Ters sıralı bir dizide, her yeni eleman tüm sıralı kısmı kaydırmayı gerektirebilir — bu da O(n²) toplam işlem demektir.",
    },
    {
      id: "somb2",
      prompt: "Binary search çalışabilmesi için dizinin hangi özelliğe sahip olması gerekir?",
      options: ["Tekrarsız elemanlar", "Sıralı (sorted) olması", "Pozitif sayılardan oluşması", "Sabit boyutlu olması"],
      correctIndex: 1,
      explanation: "Binary search, her adımda 'büyük mü küçük mü' karşılaştırmasıyla arama alanını yarıya indirir; bu ancak sıralı veride anlamlıdır.",
    },
    {
      id: "somb3",
      prompt: "Merge sort, bubble/selection/insertion sort'tan hangi açıdan üstündür?",
      options: [
        "Daha az bellek kullanır her zaman",
        "Worst-case'te O(n log n) garantiler, onlar ise O(n²)'dir",
        "Daha az kod satırı gerektirir",
        "Sadece sayılarla çalışır",
      ],
      correctIndex: 1,
      explanation: "Merge sort, böl-ve-yönet stratejisiyle her zaman O(n log n) garanti eder; basit sıralamalar ise worst-case'te O(n²)'ye düşer.",
    },
    {
      id: "somb4",
      prompt: "Binary search'te her karşılaştırmadan sonra ne olur?",
      options: [
        "Dizi yeniden sıralanır",
        "Arama alanı yarıya iner",
        "Bir eleman silinir",
        "Dizi tersine çevrilir",
      ],
      correctIndex: 1,
      explanation: "Binary search'ün temel mantığı budur: her karşılaştırma, geri kalan arama alanını yarıya indirir, bu da O(log n) sağlar.",
    },
    {
      id: "somb5",
      prompt: "Insertion sort, küçük ya da neredeyse sıralı dizilerde neden pratikte hızlıdır?",
      options: [
        "Her zaman O(1)'dir",
        "Az sayıda kaydırma gerektiği için gerçek çalışma süresi teorik worst-case'e yakın olmaz",
        "Binary search kullandığı için",
        "Recursive olduğu için",
      ],
      correctIndex: 1,
      explanation: "Neredeyse sıralı bir dizide, her yeni eleman için çok az kaydırma gerekir — bu da insertion sort'u pratikte oldukça hızlı yapar, worst-case O(n²) olsa bile.",
    },
  ],
  summary: [
    "Bubble, selection ve insertion sort basit ama worst-case O(n²) algoritmalardır.",
    "Insertion sort, her elemanı zaten sıralı olan kısma doğru konumuna 'ekleyerek' çalışır.",
    "Merge, quick ve heap sort, böl-ve-yönet (divide and conquer) ya da heap kullanarak ortalama/worst-case O(n log n) sağlar.",
    "Linear search O(n) sürer ve her dizide çalışır; binary search O(log n) sürer ama SADECE sıralı dizide çalışır.",
    "Insertion sort, küçük ya da neredeyse sıralı dizilerde pratikte oldukça verimlidir.",
  ],
};
