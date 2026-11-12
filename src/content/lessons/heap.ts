import type { Lesson } from "@/lib/types";

const siftUpCode = [
  {
    code: "public class CacaoHeap {",
    what: "Array tabanlı bir max-heap sınıfı (en büyük değer her zaman tepede).",
    why: "Heap, aslında bir binary tree'dir ama bir array içinde saklanır — ekstra referans (left/right) gerekmez.",
  },
  {
    code: "    private int[] heap; private int n;",
    what: "heap: değerleri tutan dizi; n: şu anki eleman sayısı.",
    why: "Bir düğümün index'i i ise, ebeveyni (i-1)/2, çocukları 2i+1 ve 2i+2'dir — bu matematik, ağacı array içinde temsil etmemizi sağlar.",
  },
  {
    code: "    public void insert(int value) {",
    what: "Heap'e yeni bir değer ekler.",
    why: "—",
  },
  {
    code: "        heap[n] = value;",
    what: "Yeni değer, dizinin sonuna (bir sonraki boş yaprak konumuna) eklenir.",
    why: "Heap'in şekil kuralı (her zaman tam/neredeyse-tam bir ağaç olması) korunur.",
  },
  {
    code: "        n++;",
    what: "Eleman sayısı artırılır.",
    why: "—",
  },
  {
    code: "        siftUp(n - 1);",
    what: "'Sift up' (yüzeye çıkarma) işlemi başlatılır: yeni eleman, heap kuralını sağlayana kadar yukarı taşınır.",
    why: "Yeni eklenen değer ebeveynden büyükse, heap kuralı (ebeveyn ≥ çocuk) bozulmuştur ve düzeltilmelidir.",
  },
  {
    code: "    }",
    what: "insert metodunun sonu.",
    why: "—",
  },
  {
    code: "    private void siftUp(int i) {",
    what: "i konumundaki elemanı, gerektiği kadar yukarı taşıyan recursive/iterative metod.",
    why: "—",
  },
  {
    code: "        int parent = (i - 1) / 2;",
    what: "i'nin ebeveyninin index'i hesaplanır.",
    why: "Array-tabanlı heap'in temel formülü: parent = (i-1)/2.",
    commonMistake: "Formülü i/2 sanmak: doğru formül (i-1)/2'dir, çünkü index 0'dan başlar.",
  },
  {
    code: "        if (i > 0 && heap[i] > heap[parent]) {",
    what: "Eğer kök değilsek VE mevcut eleman ebeveynden büyükse, heap kuralı bozulmuş demektir.",
    why: "—",
  },
  {
    code: "            swap(i, parent);",
    what: "Eleman ile ebeveyni yer değiştirir.",
    why: "—",
  },
  {
    code: "            siftUp(parent);",
    what: "Artık ebeveyn konumunda olan eleman için işlem tekrar edilir (recursive).",
    why: "Eleman, doğru konumunu bulana (kök olana ya da kendinden büyük bir ebeveyne ulaşana) kadar yükselmeye devam eder.",
  },
  {
    code: "        }",
    what: "if bloğunun sonu.",
    why: "—",
  },
  {
    code: "    }",
    what: "siftUp metodunun sonu.",
    why: "—",
  },
  {
    code: "}",
    what: "Sınıfın sonu.",
    why: "—",
  },
];

export const heapLesson: Lesson = {
  id: "heap",
  moduleNumber: 9,
  title: "Heap",
  isExamScope: false,
  structureKind: "sequence",
  chocolateAnalogy: {
    setup:
      "Çikolataları boyutlarına göre gevşekçe dizdiğini düşün: en büyüğü her zaman en üstte, ama altındakiler TAM sıralı değil — sadece her bir çikolata, kendi altındakilerden büyük.",
    whereItEnds:
      "Benzetme burada bitiyor: heap'te sadece 'ebeveyn ≥ çocuk' kuralı garanti edilir, tam bir sıralama yoktur. Ayrıca gerçek bir heap, bir ağaç GİBİ DAVRANSA da aslında düz bir array içinde saklanır — fiziksel çikolata yığınının aksine, index matematiğiyle çalışır.",
  },
  intro:
    "Heap, 'heap özelliği'ni (heap property) koruyan bir binary tree'dir: max-heap'te her ebeveyn, çocuklarından büyük ya da eşittir (min-heap'te tam tersi). Heap genelde bir array içinde saklanır — i. düğümün ebeveyni (i-1)/2, çocukları 2i+1 ve 2i+2'dedir. insert() sırasında 'sift up' (yeni elemanı yukarı taşıma), çıkarma sırasında 'sift down' (kökü aşağı taşıma) uygulanır. Heap, priority queue'nun standart implementasyonudur.",
  codeBlocks: [{ id: "sift-up", title: "insert() ve siftUp() — array ile heap", lines: siftUpCode }],
  traces: [
    {
      id: "siftup-trace",
      title: "insert(90) — mevcut heap: [80, 70, 60]",
      codeBlockId: "sift-up",
      steps: [
        {
          highlightLine: 3,
          structure: { nodes: ["80", "70", "60"], top: "80" },
          explanation: "heap[3] = 90 ile yeni değer dizinin sonuna (index 3) eklenir.",
          consoleOutput: "dizi: [80, 70, 60, 90]",
        },
        {
          highlightLine: 9,
          structure: { nodes: ["80", "70", "60", "90"], top: "90", pending: "parent(90) = index 1 → 70" },
          explanation: "siftUp(3) çağrılır. parent = (3-1)/2 = 1, yani heap[1] = 70.",
        },
        {
          highlightLine: 11,
          structure: { nodes: ["80", "90", "60", "70"], top: "90" },
          explanation: "90 > 70 olduğu için swap yapılır: index 1 ve 3 yer değiştirir. Dizi artık [80, 90, 60, 70].",
        },
        {
          highlightLine: 9,
          structure: { nodes: ["90", "80", "60", "70"], top: "90" },
          explanation: "siftUp(1) tekrar çağrılır. parent = (1-1)/2 = 0, heap[0] = 80. 90 > 80 olduğu için tekrar swap: 90 köke çıkar.",
          consoleOutput: "insert(90) sonrası: [90, 80, 60, 70] — heap kuralı korundu",
        },
      ],
    },
  ],
  playground: {
    kind: "sequence",
    addOp: "insert",
    removeOp: "extractMax",
    addSide: "end",
    removeSide: "end",
    pointerLabel: "son eleman (sift noktası)",
    initialItems: ["80", "70", "60"],
  },
  exercises: [
    {
      id: "hp1",
      type: "predict-output",
      prompt: "Index 5'teki bir elemanın EBEVEYNİNİN index'i nedir? (formül: (i-1)/2, tam sayı bölmesi)",
      code: "parent(5) = (5 - 1) / 2",
      answer: "2",
      hint: "(5-1)/2 = 4/2 = 2",
      explanationCorrect: "Doğru! (5-1)/2 = 2.",
      explanationIncorrect: "Formül (i-1)/2'dir (tam sayı bölmesi): (5-1)/2 = 4/2 = 2.",
    },
    {
      id: "hp2",
      type: "multiple-choice",
      prompt: "Max-heap'teki kök (root) elemanı her zaman neyi temsil eder?",
      options: ["En küçük değeri", "En büyük değeri", "Ortanca değeri", "Rastgele bir değeri"],
      correctIndex: 1,
      hint: "'Max' heap isminden yola çık.",
      explanationCorrect: "Doğru! Max-heap kuralı gereği, kök her zaman heap'teki en büyük değerdir.",
      explanationIncorrect: "Max-heap'te ebeveyn her zaman çocuklarından büyük ya da eşittir; bu kural kökten yapraklara kadar zincirleme uygulanır, bu yüzden kök en büyük değerdir.",
    },
    {
      id: "hp3",
      type: "find-bug",
      prompt: "Bu siftUp() metodunda ebeveyn hesaplama formülü yanlış yazılmış. Hangi satır?",
      buggyCode: "private void siftUp(int i) {\n    int parent = i / 2;\n    if (i > 0 && heap[i] > heap[parent]) {\n        swap(i, parent);\n        siftUp(parent);\n    }\n}",
      buggyLine: 1,
      fixedLine: "int parent = (i - 1) / 2; olmalı, i / 2 değil.",
      hint: "Index 0'dan başladığı için formülde bir düzeltme (-1) gerekir.",
      explanationCorrect: "Doğru! Doğru formül (i-1)/2'dir. i/2 formülü, index 1 ve 2 için aynı ebeveynmiş gibi yanlış sonuç verebilir.",
      explanationIncorrect: "Ebeveyn formülü (i-1)/2 olmalı. i/2 formülü, 0-index'li array'lerde yanlış ebeveyn hesaplar (ör. i=1 ve i=2 farklı ebeveynlere sahip olmalı).",
    },
    {
      id: "hp4",
      type: "fill-blank",
      prompt: "insert() metodunda, yeni değeri dizinin sonuna ekleyen satırı yaz.",
      codeBefore: "public void insert(int value) {",
      codeAfter: "    n++;\n    siftUp(n - 1);\n}",
      answer: "heap[n] = value;",
      hint: "n, şu anki eleman sayısıdır — yani bir sonraki boş index.",
      explanationCorrect: "Doğru! heap[n] = value; ile yeni değer dizinin ilk boş konumuna yazılır.",
      explanationIncorrect: "Eksik satır: heap[n] = value; — n, henüz dolu olmayan ilk index'i gösterir.",
    },
    {
      id: "hp5",
      type: "bigo-match",
      prompt: "Heap işlemlerini doğru karmaşıklıkla eşleştir.",
      pairs: [
        { operation: "insert(value) — siftUp ile", complexity: "O(log n)" },
        { operation: "extractMax() — siftDown ile", complexity: "O(log n)" },
        { operation: "peek (kökü okumak, çıkarmadan)", complexity: "O(1)" },
        { operation: "n elemanlı array'den heap oluşturmak (heapify)", complexity: "O(n)" },
      ],
      hint: "siftUp/siftDown, ağacın yüksekliği kadar (log n) adım atar; kök her zaman index 0'dadır.",
      explanationCorrect: "siftUp ve siftDown, ağacın yüksekliği (log n) kadar sürer. Köke bakmak sabit zamanlıdır (O(1)). Heapify ise akıllı bir algoritma ile O(n)'de yapılabilir (n kere insert yapmaktan daha hızlı).",
      explanationIncorrect: "siftUp/siftDown O(log n)'dir (ağaç yüksekliği kadar). peek O(1)'dir (kök her zaman index 0). Heapify özel bir algoritma ile O(n)'de tamamlanabilir.",
    },
    {
      id: "hp6",
      type: "reorder-lines",
      prompt: "siftUp(i) metodunun if bloğu içindeki iki satırı doğru sıraya diz.",
      shuffledLines: ["siftUp(parent);", "swap(i, parent);"],
      correctOrder: [1, 0],
      hint: "Önce yer değiştirme yapılır, sonra yeni konumdan devam edilir.",
      explanationCorrect: "Doğru sıra: önce swap(i, parent), sonra siftUp(parent) ile işlemin yeni konumdan devamı.",
      explanationIncorrect: "Önce swap ile elemanlar yer değiştirmeli, SONRA siftUp(parent) ile eleman artık bulunduğu yeni konumdan yukarı taşınmaya devam etmeli.",
    },
  ],
  miniBoss: [
    {
      id: "hpmb1",
      prompt: "Max-heap'in temel kuralı nedir?",
      options: [
        "Her düğüm, çocuklarından küçük olmalı",
        "Her düğüm (ebeveyn), çocuklarından büyük ya da eşit olmalı",
        "Tüm düğümler sıralı olmalı",
        "Sadece kök büyük olmalı, diğerleri önemsiz",
      ],
      correctIndex: 1,
      explanation: "Max-heap özelliği: her ebeveyn, kendi çocuklarından büyük ya da onlara eşittir — bu kural ağacın her seviyesinde geçerlidir.",
    },
    {
      id: "hpmb2",
      prompt: "Bir heap genellikle hangi veri yapısında saklanır?",
      options: ["Bağlı liste", "Array", "Hash table", "Graph"],
      correctIndex: 1,
      explanation: "Heap, bir binary tree gibi davranır ama index matematiği (parent/children formülleri) sayesinde bir array içinde verimli şekilde saklanır.",
    },
    {
      id: "hpmb3",
      prompt: "i. index'teki bir düğümün sol çocuğunun index'i nedir?",
      options: ["i/2", "i-1", "2i + 1", "2i - 1"],
      correctIndex: 2,
      explanation: "Array-tabanlı heap'te sol çocuğun formülü 2i + 1'dir (sağ çocuk ise 2i + 2).",
    },
    {
      id: "hpmb4",
      prompt: "insert() sırasında yeni eleman, heap kuralını sağlamak için ne yapar?",
      options: [
        "Her zaman köke yerleşir",
        "Dizinin sonuna eklenir ve gerektiği kadar yukarı taşınır (sift up)",
        "Rastgele bir konuma yerleşir",
        "Hiçbir yere eklenmez",
      ],
      correctIndex: 1,
      explanation: "Yeni eleman önce dizinin sonuna (bir sonraki boş yaprak konumuna) eklenir, sonra heap kuralı sağlanana kadar siftUp ile yukarı taşınır.",
    },
    {
      id: "hpmb5",
      prompt: "Heap, hangi veri yapısının standart implementasyonudur?",
      options: ["Stack", "Queue", "Priority queue", "Hash table"],
      correctIndex: 2,
      explanation: "Priority queue, en yüksek (ya da en düşük) öncelikli elemana O(log n) sürede erişim sağlamak için genellikle heap ile implemente edilir.",
    },
  ],
  summary: [
    "Heap, 'ebeveyn ≥ çocuk' (max-heap) ya da 'ebeveyn ≤ çocuk' (min-heap) kuralını koruyan bir binary tree'dir.",
    "Heap, bir array içinde saklanır: ebeveyn = (i-1)/2, sol çocuk = 2i+1, sağ çocuk = 2i+2.",
    "insert(), yeni elemanı dizinin sonuna ekler ve 'sift up' ile yukarı taşır — O(log n).",
    "extractMax/extractMin, kökü çıkarır ve son elemanı köke taşıyıp 'sift down' ile aşağı iter — O(log n).",
    "Heap, priority queue'nun standart ve en verimli implementasyonudur.",
  ],
};
