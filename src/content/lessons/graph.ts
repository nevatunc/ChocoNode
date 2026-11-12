import type { Lesson } from "@/lib/types";

const bfsCode = [
  {
    code: "public class ShopMap {",
    what: "Dükkânları birbirine bağlayan bir graph (çizge) üzerinde BFS yapan sınıf.",
    why: "—",
  },
  {
    code: "    private Map<String, List<String>> adjacency;",
    what: "Her dükkânın (düğüm) hangi dükkânlara doğrudan bağlı olduğunu tutan komşuluk listesi.",
    why: "Graph'ı temsil etmenin en yaygın yollarından biri budur (diğeri: adjacency matrix).",
  },
  {
    code: "    public List<String> bfs(String start) {",
    what: "start düğümünden başlayarak BFS (Breadth-First Search, genişlik öncelikli arama) yapar.",
    why: "—",
  },
  {
    code: "        Queue<String> frontier = new LinkedList<>();",
    what: "Ziyaret edilecek düğümleri tutan bir Queue (kuyruk) oluşturulur.",
    why: "BFS'nin 'katman katman' ilerlemesinin sırrı budur: FIFO sırasıyla, en yakın düğümler önce işlenir.",
    commonMistake: "Queue yerine Stack kullanmak: bu durumda algoritma BFS değil DFS olur, katman katman değil derinlemesine ilerler.",
  },
  {
    code: "        Set<String> visited = new HashSet<>();",
    what: "Ziyaret edilen düğümleri takip eden bir küme.",
    why: "Aynı düğümü tekrar tekrar ziyaret etmemek (ve sonsuz döngüye girmemek) için şarttır.",
  },
  {
    code: "        frontier.add(start); visited.add(start);",
    what: "Başlangıç düğümü kuyruğa eklenir ve ziyaret edildi olarak işaretlenir.",
    why: "—",
  },
  {
    code: "        while (!frontier.isEmpty()) {",
    what: "Kuyruk boşalana kadar devam eder.",
    why: "—",
  },
  {
    code: "            String current = frontier.remove();",
    what: "Kuyruğun önündeki düğüm çıkarılır (dequeue) ve işlenir.",
    why: "FIFO sırası, en önce eklenen düğümün önce işlenmesini garanti eder — bu da 'katman katman' gezinmeyi sağlar.",
  },
  {
    code: "            for (String neighbor : adjacency.get(current)) {",
    what: "current düğümünün tüm komşuları gezilir.",
    why: "—",
  },
  {
    code: "                if (!visited.contains(neighbor)) {",
    what: "Komşu daha önce ziyaret edilmediyse devam edilir.",
    why: "—",
  },
  {
    code: "                    visited.add(neighbor); frontier.add(neighbor);",
    what: "Komşu ziyaret edildi olarak işaretlenir ve kuyruğa eklenir.",
    why: "Böylece bir sonraki 'katmanda' bu komşu da işlenecektir.",
  },
  {
    code: "                }",
    what: "if bloğunun sonu.",
    why: "—",
  },
  {
    code: "            }",
    what: "for döngüsünün sonu.",
    why: "—",
  },
  {
    code: "        }",
    what: "while döngüsünün sonu.",
    why: "—",
  },
  {
    code: "    }",
    what: "bfs metodunun sonu.",
    why: "—",
  },
  {
    code: "}",
    what: "Sınıfın sonu.",
    why: "—",
  },
];

export const graphLesson: Lesson = {
  id: "graph",
  moduleNumber: 11,
  title: "Graph: BFS ve DFS",
  isExamScope: false,
  structureKind: "graph",
  chocolateAnalogy: {
    setup:
      "Şehirdeki dükkânları birbirine bağlayan yolları düşün: bazı dükkânlar doğrudan komşu, bazılarına ancak başka dükkânlar üzerinden ulaşılır. BFS, en yakın dükkânlardan başlayıp halka halka genişleyerek keşfeder; DFS ise bir yolu sonuna kadar takip edip öyle geri döner.",
    whereItEnds:
      "Benzetme burada bitiyor: graph'ta 'yol' kavramı fiziksel bir mesafe değil, sadece bir bağlantı (edge) listesidir — iki dükkân haritada çok uzak görünse de graph'ta 'komşu' olabilir.",
  },
  intro:
    "Graph (çizge), düğümlerin (vertex) kenarlarla (edge) birbirine bağlandığı genel bir veri yapısıdır — tree'nin daha esnek bir genellemesidir (döngüler içerebilir, kök yoktur). BFS (Breadth-First Search), bir Queue kullanarak düğümleri katman katman (en yakından en uzağa) gezer. DFS (Depth-First Search), bir Stack (ya da recursion, ki o da call stack kullanır) ile bir yolu sonuna kadar takip edip geri döner. İkisi de her düğümü tam olarak bir kez ziyaret eder.",
  codeBlocks: [{ id: "bfs", title: "bfs() — Queue ile genişlik öncelikli arama", lines: bfsCode }],
  traces: [
    {
      id: "bfs-trace",
      title: "bfs(\"A\") adım adım — A-B, A-C, B-D komşulukları",
      codeBlockId: "bfs",
      steps: [
        {
          highlightLine: 5,
          structure: { adjacency: { A: ["B", "C"], B: ["A", "D"], C: ["A"], D: ["B"] }, visited: ["A"], frontier: ["A"], current: undefined, frontierLabel: "kuyruk (BFS)" },
          explanation: "A kuyruğa eklenir ve ziyaret edildi olarak işaretlenir.",
        },
        {
          highlightLine: 7,
          structure: { adjacency: { A: ["B", "C"], B: ["A", "D"], C: ["A"], D: ["B"] }, visited: ["A"], frontier: ["A"], current: "A", frontierLabel: "kuyruk (BFS)" },
          explanation: "A kuyruktan çıkarılır (dequeue) ve işlenir. Komşuları (B, C) kontrol edilecek.",
        },
        {
          highlightLine: 11,
          structure: { adjacency: { A: ["B", "C"], B: ["A", "D"], C: ["A"], D: ["B"] }, visited: ["A", "B", "C"], frontier: ["B", "C"], current: "A", frontierLabel: "kuyruk (BFS)" },
          explanation: "B ve C ziyaret edilmemiş, ikisi de ziyaret edildi işaretlenir ve kuyruğa eklenir.",
        },
        {
          highlightLine: 7,
          structure: { adjacency: { A: ["B", "C"], B: ["A", "D"], C: ["A"], D: ["B"] }, visited: ["A", "B", "C"], frontier: ["C"], current: "B", frontierLabel: "kuyruk (BFS)" },
          explanation: "B kuyruktan çıkarılır. B'nin komşuları: A (ziyaret edildi, atlanır) ve D (yeni).",
        },
        {
          highlightLine: 11,
          structure: { adjacency: { A: ["B", "C"], B: ["A", "D"], C: ["A"], D: ["B"] }, visited: ["A", "B", "C", "D"], frontier: ["C", "D"], current: "B", frontierLabel: "kuyruk (BFS)" },
          explanation: "D ziyaret edildi işaretlenir ve kuyruğa eklenir.",
          consoleOutput: "Ziyaret sırası: A, B, C, D",
        },
      ],
    },
  ],
  exercises: [
    {
      id: "gr1",
      type: "multiple-choice",
      prompt: "BFS, hangi veri yapısını kullanarak düğümleri 'katman katman' gezer?",
      options: ["Stack", "Queue", "Hash table", "Binary tree"],
      correctIndex: 1,
      hint: "FIFO sırası, en yakın düğümlerin önce işlenmesini sağlar.",
      explanationCorrect: "Doğru! Queue'nun FIFO (ilk giren ilk çıkar) davranışı, BFS'nin katman katman ilerlemesini doğal olarak sağlar.",
      explanationIncorrect: "BFS bir Queue kullanır — FIFO sırası sayesinde en yakın (en önce keşfedilen) düğümler önce işlenir, bu da katman katman gezinmeyi sağlar.",
    },
    {
      id: "gr2",
      type: "find-bug",
      prompt: "Bir öğrenci BFS yazarken Queue yerine Stack kullanmış. Bu ne değiştirir?",
      buggyCode: "Stack<String> frontier = new Stack<>();\n// ... frontier.push(start);\n// ... String current = frontier.pop();",
      buggyLine: 0,
      fixedLine: "Queue<String> frontier = new LinkedList<>(); olmalı — Stack kullanmak algoritmayı DFS'e çevirir (LIFO sırası).",
      hint: "Stack LIFO çalışır, Queue FIFO. Bu, ziyaret sırasını nasıl etkiler?",
      explanationCorrect: "Doğru! Stack kullanmak, algoritmayı BFS'den DFS'e çevirir — artık en son eklenen düğüm önce işlenir, katman katman değil derinlemesine ilerleme olur.",
      explanationIncorrect: "Stack (LIFO) kullanmak, algoritmanın davranışını değiştirir: artık BFS değil DFS olur, çünkü en son eklenen komşu önce işlenir.",
    },
    {
      id: "gr3",
      type: "fill-blank",
      prompt: "BFS döngüsünde, kuyruğun önündeki düğümü çıkarıp işleyen satırı yaz.",
      codeBefore: "while (!frontier.isEmpty()) {",
      codeAfter: "    for (String neighbor : adjacency.get(current)) {",
      answer: "String current = frontier.remove();",
      hint: "Queue'dan eleman çıkarma metodu hangisiydi?",
      explanationCorrect: "Doğru! frontier.remove() (dequeue), kuyruğun önündeki elemanı çıkarır.",
      explanationIncorrect: "Eksik satır: String current = frontier.remove(); — bu, kuyruğun önündeki (en eski eklenen) düğümü çıkarır ve işler.",
    },
    {
      id: "gr4",
      type: "predict-output",
      prompt: "A düğümünden BFS başlatılıyor; A'nın komşuları B ve C, B'nin komşusu D. Ziyaret sırası (A'dan sonra) ne olur?",
      code: "A -> [B, C], B -> [D]. bfs(\"A\")",
      answer: "A, B, C, D",
      hint: "BFS önce A'nın TÜM komşularını (B, C) bitirir, sonra onların komşularına (D) geçer.",
      explanationCorrect: "Doğru! BFS katman katman ilerler: önce A, sonra A'nın komşuları (B, C), sonra onların yeni komşuları (D).",
      explanationIncorrect: "BFS, bir düğümün TÜM komşularını bitirmeden bir sonraki katmana geçmez: A → B, C (A'nın komşuları) → D (B'nin komşusu).",
    },
    {
      id: "gr5",
      type: "bigo-match",
      prompt: "Graph algoritmalarını doğru karmaşıklıkla eşleştir (V: düğüm sayısı, E: kenar sayısı).",
      pairs: [
        { operation: "BFS (komşuluk listesi ile)", complexity: "O(V + E)" },
        { operation: "DFS (komşuluk listesi ile)", complexity: "O(V + E)" },
        { operation: "Bir düğümün tüm komşularını listelemek", complexity: "O(derece)" },
        { operation: "İki düğüm arasında kenar olup olmadığını komşuluk MATRİSİYLE kontrol etmek", complexity: "O(1)" },
      ],
      hint: "Her düğüm bir kez, her kenar bir (ya da iki) kez ziyaret edilir; bu yüzden V+E terimi ortaya çıkar.",
      explanationCorrect: "BFS ve DFS, her düğümü ve her kenarı sabit sayıda ziyaret ettiği için O(V+E)'dir. Bir düğümün komşularını listelemek o düğümün derecesi kadar sürer. Komşuluk matrisinde kenar kontrolü ise doğrudan index erişimiyle O(1)'dir.",
      explanationIncorrect: "BFS/DFS toplamda her düğüm ve kenarı bir kez işlediği için O(V+E)'dir. Komşuluk matrisi, belirli bir kenarı O(1)'de kontrol edebilir ama O(V²) bellek gerektirir.",
    },
    {
      id: "gr6",
      type: "multiple-choice",
      prompt: "DFS (Depth-First Search) tipik olarak hangi veri yapısıyla (ya da tekniğiyle) implemente edilir?",
      options: ["Sadece Queue ile", "Stack ile (ya da recursion/call stack ile)", "Hash table ile", "Heap ile"],
      correctIndex: 1,
      hint: "DFS, bir yolu sonuna kadar takip edip GERİ DÖNER — bu LIFO davranışına benzemiyor mu?",
      explanationCorrect: "Doğru! DFS, bir Stack (açıkça ya da recursion'ın örtük call stack'i aracılığıyla) kullanarak bir yolu sonuna kadar takip edip geri döner.",
      explanationIncorrect: "DFS, LIFO (son giren ilk çıkar) mantığıyla çalışır — bu da Stack (ya da recursion'ın call stack'i) ile doğal olarak eşleşir.",
    },
  ],
  miniBoss: [
    {
      id: "grmb1",
      prompt: "Graph, tree'den nasıl farklıdır?",
      options: [
        "Graph'ta düğüm olamaz",
        "Graph döngü içerebilir ve kök (root) kavramı zorunlu değildir",
        "Graph sadece sayılarla çalışır",
        "Aralarında hiç fark yoktur",
      ],
      correctIndex: 1,
      explanation: "Tree, döngüsüz ve kökü olan özel bir graph türüdür; genel graph'larda döngüler olabilir ve belirgin bir kök yoktur.",
    },
    {
      id: "grmb2",
      prompt: "BFS hangi veri yapısını, DFS hangisini kullanır?",
      options: ["BFS: Stack, DFS: Queue", "BFS: Queue, DFS: Stack", "İkisi de Queue kullanır", "İkisi de Stack kullanır"],
      correctIndex: 1,
      explanation: "BFS, FIFO sırası için Queue kullanır; DFS, LIFO sırası için Stack (ya da recursion'ın call stack'i) kullanır.",
    },
    {
      id: "grmb3",
      prompt: "BFS/DFS algoritmalarında 'visited' (ziyaret edilenler) kümesi neden gereklidir?",
      options: [
        "Performansı yavaşlatmak için",
        "Aynı düğümü tekrar tekrar ziyaret edip sonsuz döngüye girmemek için",
        "Sadece debug amaçlı",
        "Gerekli değildir, isteğe bağlıdır",
      ],
      correctIndex: 1,
      explanation: "Graph'ta döngüler olabileceği için, ziyaret edilen düğümleri takip etmezsek algoritma sonsuz döngüye girebilir.",
    },
    {
      id: "grmb4",
      prompt: "BFS'nin pratik bir kullanım alanı nedir?",
      options: [
        "Bir dizinin sıralanması",
        "Ağırlıksız bir graph'ta iki düğüm arasındaki en kısa yolu bulmak",
        "Bir sayının asal olup olmadığını kontrol etmek",
        "String arama",
      ],
      correctIndex: 1,
      explanation: "BFS, katman katman ilerlediği için, ağırlıksız bir graph'ta en kısa yolu garanti eder.",
    },
    {
      id: "grmb5",
      prompt: "O(V + E) karmaşıklığındaki V ve E neyi temsil eder?",
      options: ["V: ziyaret, E: eleman", "V: düğüm (vertex) sayısı, E: kenar (edge) sayısı", "V: değer, E: hata", "İkisi de aynı şeyi temsil eder"],
      correctIndex: 1,
      explanation: "V (vertex) düğüm sayısını, E (edge) kenar sayısını temsil eder; BFS/DFS her ikisini de sabit sayıda ziyaret eder.",
    },
  ],
  summary: [
    "Graph, düğümlerin (vertex) kenarlarla (edge) bağlandığı, döngü içerebilen genel bir veri yapısıdır.",
    "BFS (Breadth-First Search), bir Queue kullanarak düğümleri katman katman gezer ve ağırlıksız graph'ta en kısa yolu garanti eder.",
    "DFS (Depth-First Search), bir Stack (ya da recursion) kullanarak bir yolu sonuna kadar takip edip geri döner.",
    "Her iki algoritma da her düğümü ve kenarı sabit sayıda ziyaret eder: O(V + E).",
    "'visited' kümesi, döngülerde sonsuz tekrara girmemek için her iki algoritmada da zorunludur.",
  ],
};
