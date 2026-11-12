import type { Lesson } from "@/lib/types";

const queueCode = [
  {
    code: "public class CustomerQueue<Item> {",
    what: "Generic bir kuyruk (queue) sınıfı.",
    why: "—",
  },
  {
    code: "    private Node front, back;",
    what: "Kuyruğun önüne (front) ve arkasına (back) referanslar.",
    why: "Stack'in aksine, queue'nun İKİ ucu da önemlidir: biri çıkarma, diğeri ekleme için.",
  },
  {
    code: "    public void enqueue(Item item) {",
    what: "Yeni bir elemanı kuyruğun ARKASINA ekler.",
    why: "FIFO (First In, First Out) kuralı: yeni gelen müşteri sıranın en arkasına geçer.",
  },
  {
    code: "        Node oldBack = back;",
    what: "Eski 'back' referansı saklanır.",
    why: "—",
  },
  {
    code: "        back = new Node();",
    what: "Yeni bir düğüm oluşturulur ve back bu düğümü gösterir.",
    why: "—",
  },
  {
    code: "        back.item = item;",
    what: "Yeni düğümün değeri ayarlanır.",
    why: "—",
  },
  {
    code: "        if (isEmpty()) front = back;",
    what: "Kuyruk boşsa, front da bu tek elemanı göstermeli.",
    why: "Boş kuyruğa ilk eleman eklendiğinde hem front hem back aynı düğümü işaret etmelidir — özel durum (edge case).",
    commonMistake: "Bu kontrolü atlamak: kuyruk boşken ilk enqueue'dan sonra front hâlâ null kalır, dequeue çağrıldığında NullPointerException oluşur.",
  },
  {
    code: "        else oldBack.next = back;",
    what: "Kuyruk boş değilse, eski son düğüm yeni düğüme bağlanır.",
    why: "Zincir kopmadan büyüsün diye.",
  },
  {
    code: "    }",
    what: "enqueue metodunun sonu.",
    why: "—",
  },
  {
    code: "    public Item dequeue() {",
    what: "Kuyruğun ÖNÜNDEKİ elemanı çıkarır ve döndürür.",
    why: "FIFO: sıraya ilk giren müşteri ilk hizmeti alır.",
  },
  {
    code: "        Item item = front.item;",
    what: "Döndürülecek değer saklanır.",
    why: "—",
  },
  {
    code: "        front = front.next;",
    what: "front bir sonraki düğüme kaydırılır.",
    why: "—",
  },
  {
    code: "        if (front == null) back = null;",
    what: "Kuyruk boşaldıysa back da null olmalı.",
    why: "Son eleman da çıkarıldıysa, hem front hem back referanslarının tutarlı (ikisi de null) olması gerekir.",
  },
  {
    code: "        return item;",
    what: "Saklanan değeri döndürür.",
    why: "—",
  },
  {
    code: "    }",
    what: "dequeue metodunun sonu.",
    why: "—",
  },
  {
    code: "}",
    what: "Sınıfın sonu.",
    why: "—",
  },
];

export const queueLesson: Lesson = {
  id: "queue",
  moduleNumber: 5,
  title: "Queue, Deque, Priority Queue",
  isExamScope: true,
  structureKind: "sequence",
  chocolateAnalogy: {
    setup:
      "Tezgâhta sıra bekleyen müşterileri düşün: ilk gelen ilk hizmet alır (FIFO — First In, First Out). Yeni gelen her zaman sıranın en arkasına eklenir.",
    whereItEnds:
      "Benzetme burada bitiyor: deque (double-ended queue) her iki uçtan da ekleme/çıkarma yapabilir — gerçek bir sırada böyle bir esneklik yoktur. Priority queue ise sıra sırasını hiç önemsemez, her zaman 'en öncelikli' müşteriyi çağırır (VIP kuyruğu gibi).",
  },
  intro:
    "Queue (kuyruk), FIFO (First In, First Out — ilk giren ilk çıkar) kuralıyla çalışır: enqueue ile arkaya eklenir, dequeue ile önden çıkarılır. Deque (double-ended queue), her iki uçtan da ekleme/çıkarmaya izin veren esnek bir versiyondur. Priority queue ise FIFO sırasını değil, her elemanın önceliğini (priority) esas alır — en yüksek (ya da en düşük) öncelikli eleman her zaman önce çıkar; genelde heap ile implemente edilir.",
  codeBlocks: [{ id: "queue-ops", title: "enqueue() ve dequeue() — bağlı liste ile", lines: queueCode }],
  traces: [
    {
      id: "enqueue-trace",
      title: "enqueue(\"kurabiye\") adım adım",
      codeBlockId: "queue-ops",
      steps: [
        {
          highlightLine: 3,
          structure: { nodes: ["marshmallow", "tarçın"], top: "marshmallow" },
          explanation: "Eski back ('tarçın') saklanır. front hâlâ 'marshmallow'u gösteriyor.",
        },
        {
          highlightLine: 7,
          structure: { nodes: ["marshmallow", "tarçın", "kurabiye"], top: "marshmallow", pending: "kurabiye" },
          explanation: "Kuyruk boş olmadığı için eski back ('tarçın'), yeni düğüme ('kurabiye') bağlanır.",
        },
        {
          highlightLine: 4,
          structure: { nodes: ["marshmallow", "tarçın", "kurabiye"], top: "marshmallow" },
          explanation: "back artık 'kurabiye'yi gösteriyor. front hâlâ değişmedi — bu enqueue'nun önemli noktası.",
          consoleOutput: "enqueue(\"kurabiye\") → kuyruk: [marshmallow(front), tarçın, kurabiye(back)]",
        },
      ],
    },
  ],
  playground: {
    kind: "sequence",
    addOp: "enqueue",
    removeOp: "dequeue",
    addSide: "end",
    removeSide: "front",
    pointerLabel: "front",
    initialItems: ["marshmallow", "tarçın"],
  },
  exercises: [
    {
      id: "qu1",
      type: "multiple-choice",
      prompt: "Queue (FIFO) ile Stack (LIFO) arasındaki temel fark nedir?",
      options: [
        "Queue array ile, Stack bağlı liste ile yazılır",
        "Queue'da ilk giren ilk çıkar, Stack'te son giren ilk çıkar",
        "Queue sadece sayılar tutabilir",
        "İkisi aynı şeydir, sadece isimleri farklıdır",
      ],
      correctIndex: 1,
      hint: "FIFO ve LIFO kısaltmalarının açılımını hatırla.",
      explanationCorrect: "Doğru! FIFO (First In, First Out) = Queue, LIFO (Last In, First Out) = Stack.",
      explanationIncorrect: "Fark implementasyonda değil, ÇIKARMA SIRASINDA: Queue en eski elemanı, Stack en yeni elemanı çıkarır.",
    },
    {
      id: "qu2",
      type: "find-bug",
      prompt: "Bu enqueue() metodunda eksik bir kontrol var. Hangi satır eksik?",
      buggyCode: "public void enqueue(Item item) {\n    Node oldBack = back;\n    back = new Node();\n    back.item = item;\n    oldBack.next = back;\n}",
      buggyLine: 4,
      fixedLine: "if (isEmpty()) front = back; else oldBack.next = back; olmalı — boş kuyruk kontrolü eksik.",
      hint: "Kuyruk boşken enqueue çağrılırsa oldBack null olur. oldBack.next = back; ne olur?",
      explanationCorrect: "Doğru! Kuyruk boşken oldBack null'dur; oldBack.next çağrısı NullPointerException fırlatır. Önce isEmpty() kontrolü yapılmalı.",
      explanationIncorrect: "Kuyruk boşken oldBack null olur ve oldBack.next = back; satırı NullPointerException fırlatır. if (isEmpty()) front = back; kontrolü eklenmeli.",
    },
    {
      id: "qu3",
      type: "fill-blank",
      prompt: "dequeue() metodunda, kuyruk tamamen boşaldığında back'i de null yapan satırı yaz.",
      codeBefore: "Item item = front.item;\nfront = front.next;",
      codeAfter: "return item;",
      answer: "if (front == null) back = null;",
      hint: "front null olduysa, kuyrukta hiç eleman kalmamış demektir; back de bunu yansıtmalı.",
      explanationCorrect: "Doğru! front null olduğunda back da null yapılmalı, yoksa back eski (artık geçersiz) bir düğümü göstermeye devam eder.",
      explanationIncorrect: "Eksik satır: if (front == null) back = null; — front null olduğunda back'in de null olması gerekir.",
    },
    {
      id: "qu4",
      type: "predict-output",
      prompt: "Boş bir kuyruğa sırayla enqueue(\"a\"); enqueue(\"b\"); dequeue(); çağrıldığında, dequeue() hangi değeri döndürür?",
      code: 'enqueue("a"); enqueue("b"); dequeue();',
      answer: "a",
      hint: "FIFO: ilk giren ilk çıkar.",
      explanationCorrect: "Doğru! 'a' önce girdiği için (FIFO), dequeue() ilk önce 'a'yı döndürür.",
      explanationIncorrect: "FIFO kuralı gereği, önce giren eleman ('a') önce çıkar — 'b' değil.",
    },
    {
      id: "qu5",
      type: "multiple-choice",
      prompt: "Priority queue, bir sonraki çıkarılacak elemanı neye göre seçer?",
      options: ["Eklenme sırasına göre (FIFO)", "Ekleme sırasının tersine göre (LIFO)", "Elemanın önceliğine (priority) göre", "Rastgele"],
      correctIndex: 2,
      hint: "İsminde geçen kelimeye dikkat et: priority (öncelik).",
      explanationCorrect: "Doğru! Priority queue, FIFO/LIFO sırasını değil, her elemanın önceliğini esas alır.",
      explanationIncorrect: "Priority queue'da sıralama giriş zamanına göre değil, elemanların önceliğine göre yapılır; genelde heap ile implemente edilir.",
    },
    {
      id: "qu6",
      type: "bigo-match",
      prompt: "Bağlı liste tabanlı queue işlemlerini doğru karmaşıklıkla eşleştir.",
      pairs: [
        { operation: "enqueue(item)", complexity: "O(1)" },
        { operation: "dequeue()", complexity: "O(1)" },
        { operation: "isEmpty()", complexity: "O(1)" },
        { operation: "priority queue'da insert (heap ile)", complexity: "O(log n)" },
      ],
      hint: "front/back referansları tutulduğu sürece queue işlemleri sabit zamanlıdır; heap tabanlı priority queue ise ağaç yüksekliği kadar sürer.",
      explanationCorrect: "front/back referansları sayesinde enqueue/dequeue/isEmpty O(1)'dir. Heap tabanlı priority queue'da insert, ağacı yeniden düzenlemek için O(log n) sürer.",
      explanationIncorrect: "Bağlı liste queue'da front/back ile tüm temel işlemler O(1)'dir. Priority queue'nun heap implementasyonunda insert O(log n)'dir (ileride Heap modülünde işlenecek).",
    },
  ],
  miniBoss: [
    {
      id: "qumb1",
      prompt: "FIFO ne anlama gelir?",
      options: ["Last In, First Out", "First In, First Out", "Fast In, Fast Out", "First In, Last Out"],
      correctIndex: 1,
      explanation: "FIFO = First In, First Out: ilk giren ilk çıkar.",
    },
    {
      id: "qumb2",
      prompt: "Bir web sunucusunda gelen istekleri sırayla işlemek için hangi veri yapısı daha uygundur?",
      options: ["Stack", "Queue", "Binary tree", "Hash table"],
      correctIndex: 1,
      explanation: "İstekler geldikleri sırayla işlenmeli — bu tam olarak FIFO davranışıdır, yani Queue.",
    },
    {
      id: "qumb3",
      prompt: "Deque'in standart queue'dan farkı nedir?",
      options: [
        "Deque sadece sayı tutabilir",
        "Deque her iki uçtan da ekleme/çıkarma yapabilir",
        "Deque LIFO çalışır",
        "Deque'de dequeue yoktur",
      ],
      correctIndex: 1,
      explanation: "Deque (double-ended queue), hem baştan hem sondan ekleme/çıkarma yapılabilen esnek bir yapıdır.",
    },
    {
      id: "qumb4",
      prompt: "Priority queue genellikle hangi veri yapısıyla implemente edilir?",
      options: ["Sıralı array", "Heap", "Hash table", "Bağlı liste"],
      correctIndex: 1,
      explanation: "Heap, en yüksek/düşük öncelikli elemana O(log n) sürede erişim ve güncelleme sağladığı için priority queue'nun standart implementasyonudur.",
    },
    {
      id: "qumb5",
      prompt: "BFS (Breadth-First Search, genişlik öncelikli arama) algoritması hangi veri yapısını kullanır?",
      options: ["Stack", "Queue", "Priority queue", "Hash table"],
      correctIndex: 1,
      explanation: "BFS, komşuları katman katman gezer; bu sıralı gezinme Queue (FIFO) ile doğal olarak sağlanır.",
    },
  ],
  summary: [
    "Queue, FIFO (ilk giren ilk çıkar) kuralıyla çalışır: enqueue arkaya ekler, dequeue önden çıkarır.",
    "front ve back referansları tutulduğunda enqueue/dequeue O(1) sürer.",
    "Boş kuyruğa ilk ekleme ve son elemanın çıkarılması, front/back'in tutarlı kalması için özel durum (edge case) olarak ele alınmalıdır.",
    "Deque, her iki uçtan da işlem yapabilen esnek bir queue türüdür.",
    "Priority queue, FIFO sırasını değil elemanların önceliğini esas alır; genelde heap ile implemente edilir (O(log n)).",
  ],
};
