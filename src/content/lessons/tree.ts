import type { Lesson } from "@/lib/types";

const insertCode = [
  {
    code: "public class CacaoTree {",
    what: "Binary Search Tree (BST) sınıfı.",
    why: "—",
  },
  {
    code: "    private Node root;",
    what: "Ağacın kök düğümüne referans.",
    why: "Tüm ağaca root üzerinden erişilir.",
  },
  {
    code: "    private class Node {",
    what: "Her ağaç düğümünü temsil eden iç sınıf.",
    why: "—",
  },
  {
    code: "        int key; Node left, right;",
    what: "Düğümün değeri (key) ve sol/sağ çocuklarına referansları.",
    why: "BST'nin temel kuralı: left alt ağacındaki her key, bu düğümden KÜÇÜK; right alt ağacındaki her key BÜYÜK olmalı.",
  },
  {
    code: "    }",
    what: "Node iç sınıfının sonu.",
    why: "—",
  },
  {
    code: "    public void insert(int key) {",
    what: "Yeni bir değeri ağaca ekler.",
    why: "—",
  },
  {
    code: "        root = insertHelper(root, key);",
    what: "Recursive yardımcı metodu root'tan başlatır.",
    why: "BST işlemleri doğal olarak recursive yazılır — her alt ağaç da kendi başına bir BST'dir.",
  },
  {
    code: "    }",
    what: "insert metodunun sonu.",
    why: "—",
  },
  {
    code: "    private Node insertHelper(Node node, int key) {",
    what: "Doğru konumu bulup yeni düğümü ekleyen recursive yardımcı metod.",
    why: "—",
  },
  {
    code: "        if (node == null) return new Node(key);",
    what: "Base case: boş bir yere ulaşıldıysa, yeni düğüm burada oluşturulur.",
    why: "BST'de her yeni eleman her zaman bir YAPRAK olarak eklenir.",
  },
  {
    code: "        if (key < node.key) node.left = insertHelper(node.left, key);",
    what: "key küçükse, sol alt ağaca recursive olarak devam edilir.",
    why: "BST kuralını korumak için.",
  },
  {
    code: "        else if (key > node.key) node.right = insertHelper(node.right, key);",
    what: "key büyükse, sağ alt ağaca recursive olarak devam edilir.",
    why: "—",
    commonMistake: "key == node.key durumunu unutup her zaman eklemeye çalışmak: genelde duplicate (tekrarlı) değerler yoksayılır.",
  },
  {
    code: "        return node;",
    what: "Güncellenmiş alt ağacın kökünü döndürür.",
    why: "Her recursive çağrı, bir üstteki left/right referansını güncellemek için bu değeri kullanır.",
  },
  {
    code: "    }",
    what: "insertHelper metodunun sonu.",
    why: "—",
  },
  {
    code: "}",
    what: "Sınıfın sonu.",
    why: "—",
  },
];

export const treeLesson: Lesson = {
  id: "tree",
  moduleNumber: 8,
  title: "Tree ve Binary Search Tree",
  isExamScope: false,
  structureKind: "tree",
  chocolateAnalogy: {
    setup:
      "Bir kakao ağacını düşün: kökten başlar, dallara ayrılır, her dal da kendi dallarına ayrılabilir. Binary tree'de her dal en fazla İKİ alt dala ayrılır.",
    whereItEnds:
      "Benzetme burada bitiyor: Binary Search Tree'de (BST) dalların yönü rastgele değil, bir KURALA bağlıdır — sol taraf her zaman küçük değerleri, sağ taraf her zaman büyük değerleri tutar. Gerçek bir ağaçta böyle bir sıralama kuralı yoktur.",
  },
  intro:
    "Tree (ağaç), düğümlerin hiyerarşik olarak bağlı olduğu bir veri yapısıdır; her düğümün bir ebeveyni ve sıfır veya daha fazla çocuğu vardır. Binary tree, her düğümün en fazla iki çocuğu (left, right) olduğu özel bir ağaçtır. Binary Search Tree (BST) ise ek bir kural getirir: her düğümün sol alt ağacındaki tüm değerler ondan küçük, sağ alt ağacındaki tüm değerler ondan büyük olmalıdır. Bu kural sayesinde arama, ekleme ve silme ortalama O(log n) sürede yapılabilir.",
  codeBlocks: [{ id: "insert", title: "insert() — BST'ye recursive ekleme", lines: insertCode }],
  traces: [
    {
      id: "insert-trace",
      title: "insert(35) adım adım — mevcut ağaç: 50, 30, 70, 20",
      codeBlockId: "insert",
      steps: [
        {
          highlightLine: 10,
          structure: {
            treeNodes: [
              { id: "50", value: "50", x: 140, y: 30 },
              { id: "30", value: "30", x: 80, y: 90 },
              { id: "70", value: "70", x: 200, y: 90 },
              { id: "20", value: "20", x: 50, y: 150 },
            ],
            edges: [
              ["50", "30"],
              ["50", "70"],
              ["30", "20"],
            ],
            highlight: "50",
          },
          explanation: "insert(35), root (50) ile karşılaştırılır. 35 < 50 olduğu için sol alt ağaca gidilir.",
        },
        {
          highlightLine: 10,
          structure: {
            treeNodes: [
              { id: "50", value: "50", x: 140, y: 30 },
              { id: "30", value: "30", x: 80, y: 90 },
              { id: "70", value: "70", x: 200, y: 90 },
              { id: "20", value: "20", x: 50, y: 150 },
            ],
            edges: [
              ["50", "30"],
              ["50", "70"],
              ["30", "20"],
            ],
            highlight: "30",
          },
          explanation: "35, 30 ile karşılaştırılır. 35 > 30 olduğu için sağ alt ağaca gidilmeli — ama 30'un sağ çocuğu yok (null).",
        },
        {
          highlightLine: 9,
          structure: {
            treeNodes: [
              { id: "50", value: "50", x: 140, y: 30 },
              { id: "30", value: "30", x: 80, y: 90 },
              { id: "70", value: "70", x: 200, y: 90 },
              { id: "20", value: "20", x: 50, y: 150 },
              { id: "35", value: "35", x: 110, y: 150 },
            ],
            edges: [
              ["50", "30"],
              ["50", "70"],
              ["30", "20"],
              ["30", "35"],
            ],
            highlight: "35",
            found: "35",
          },
          explanation: "node == null olduğu için base case tetiklenir: yeni Node(35) oluşturulur ve 30'un sağ çocuğu olarak bağlanır.",
          consoleOutput: "insert(35) → 35, 30'un sağ çocuğu olarak eklendi",
        },
      ],
    },
  ],
  exercises: [
    {
      id: "tr1",
      type: "multiple-choice",
      prompt: "Bir BST'de 45 değeri aranıyor ve root 50. Bir sonraki adımda hangi yöne gidilir?",
      options: ["Sağ alt ağaca, çünkü 45 < 50", "Sol alt ağaca, çünkü 45 < 50", "Hiçbir yöne, 45 bulunamaz", "Doğrudan root'a eklenir"],
      correctIndex: 1,
      hint: "BST kuralı: küçük değerler hangi tarafta?",
      explanationCorrect: "Doğru! 45 < 50 olduğu için BST kuralı gereği SOL alt ağaca gidilir.",
      explanationIncorrect: "BST kuralı: aranan değer kökten küçükse SOL alt ağaca, büyükse SAĞ alt ağaca gidilir. 45 < 50 olduğu için sola gidilmeli.",
    },
    {
      id: "tr2",
      type: "find-bug",
      prompt: "Bu insertHelper() metodunda eksik bir satır var. Hangisi?",
      buggyCode: "private Node insertHelper(Node node, int key) {\n    if (key < node.key) node.left = insertHelper(node.left, key);\n    else if (key > node.key) node.right = insertHelper(node.right, key);\n    return node;\n}",
      buggyLine: 0,
      fixedLine: "if (node == null) return new Node(key); base case'i eksik — ilk satırda olmalı.",
      hint: "node null olduğunda (boş bir yere ulaşıldığında) ne yapılmalı?",
      explanationCorrect: "Doğru! Base case olmadan, node null olduğunda node.key'e erişmeye çalışılır ve NullPointerException oluşur.",
      explanationIncorrect: "Eksik satır: if (node == null) return new Node(key); — bu, boş bir yere ulaşıldığında yeni düğümü oluşturan base case'tir, metodun en başında olmalı.",
    },
    {
      id: "tr3",
      type: "predict-output",
      prompt: "Boş bir BST'ye sırayla insert(50), insert(30), insert(70), insert(20) çağrıldıktan sonra, root'un SOL çocuğunun değeri nedir?",
      code: "insert(50); insert(30); insert(70); insert(20);",
      answer: "30",
      hint: "İlk eklenen değer (50) her zaman root olur; sonraki her ekleme BST kuralına göre yerleşir.",
      explanationCorrect: "Doğru! 50 root olur. 30 < 50 olduğu için sol çocuk olur. 70 > 50 olduğu için sağ çocuk olur. 20 < 50 ve < 30 olduğu için 30'un sol çocuğu olur — ama root'un sol çocuğu yine 30'dur.",
      explanationIncorrect: "50 ilk eklendiği için root olur. 30, 50'den küçük olduğu için root'un SOL çocuğu olur (20 ise 30'un altına yerleşir, root'un doğrudan çocuğu değildir).",
    },
    {
      id: "tr4",
      type: "fill-blank",
      prompt: "insertHelper() metodunun, key küçükse sol alt ağaca recursive devam eden satırını yaz.",
      codeBefore: "if (node == null) return new Node(key);",
      codeAfter: "else if (key > node.key) node.right = insertHelper(node.right, key);\nreturn node;",
      answer: "if (key < node.key) node.left = insertHelper(node.left, key);",
      hint: "key küçükse hangi alt ağaca gidilmeli, ve sonucu hangi referansa atamak gerekir?",
      explanationCorrect: "Doğru! key < node.key ise node.left = insertHelper(node.left, key); ile sol alt ağaca recursive devam edilir.",
      explanationIncorrect: "Eksik satır: if (key < node.key) node.left = insertHelper(node.left, key); — küçük değerler sol alt ağaca recursive olarak eklenir.",
    },
    {
      id: "tr5",
      type: "bigo-match",
      prompt: "Dengeli (balanced) bir BST'de işlemleri doğru karmaşıklıkla eşleştir.",
      pairs: [
        { operation: "insert(key) — dengeli ağaçta", complexity: "O(log n)" },
        { operation: "search(key) — dengeli ağaçta", complexity: "O(log n)" },
        { operation: "insert(key) — dengesiz (tek yönlü zincir) ağaçta", complexity: "O(n)" },
        { operation: "Tüm düğümleri gezmek (traversal)", complexity: "O(n)" },
      ],
      hint: "Dengeli bir ağacın yüksekliği log n'dir; dengesiz bir ağaç ise bağlı listeye dönüşebilir.",
      explanationCorrect: "Dengeli bir BST'de yükseklik log n olduğu için insert/search O(log n)'dir. Ama sıralı veriyle oluşturulan dengesiz bir BST, tek yönlü bir zincire dönüşüp O(n) olabilir. Tüm düğümleri gezmek her zaman O(n)'dir.",
      explanationIncorrect: "Dengeli ağaçta yükseklik log n'dir (insert/search O(log n)). Dengesiz (ör. sıralı veri eklenmiş) bir ağaç, bağlı liste gibi davranıp O(n)'ye düşebilir.",
    },
    {
      id: "tr6",
      type: "multiple-choice",
      prompt: "Bir BST'yi 'inorder' (sırayla: sol, kök, sağ) gezersek ne elde ederiz?",
      options: ["Rastgele sıralı değerler", "Değerlerin KÜÇÜKTEN BÜYÜĞE sıralı hali", "Sadece yaprak düğümler", "Ağacın tersten hali"],
      correctIndex: 1,
      hint: "BST kuralını (sol < kök < sağ) inorder gezinmeyle birleştir.",
      explanationCorrect: "Doğru! Inorder traversal (sol-kök-sağ), bir BST'nin BST özelliği sayesinde her zaman değerleri küçükten büyüğe sıralı verir.",
      explanationIncorrect: "BST kuralı (sol < kök < sağ) sayesinde, inorder gezinme (önce sol, sonra kök, sonra sağ) her zaman sıralı bir dizi üretir.",
    },
  ],
  miniBoss: [
    {
      id: "trmb1",
      prompt: "Bir BST'nin temel kuralı nedir?",
      options: [
        "Her düğümün en fazla 3 çocuğu olabilir",
        "Sol alt ağaçtaki her değer küçük, sağ alt ağaçtaki her değer büyük olmalı",
        "Tüm yapraklar aynı derinlikte olmalı",
        "Kök her zaman en küçük değer olmalı",
      ],
      correctIndex: 1,
      explanation: "BST kuralı, her düğüm için sol alt ağacın küçük, sağ alt ağacın büyük değerleri tutmasını garanti eder.",
    },
    {
      id: "trmb2",
      prompt: "Dengeli bir BST'de arama işleminin karmaşıklığı nedir?",
      options: ["O(n)", "O(log n)", "O(1)", "O(n²)"],
      correctIndex: 1,
      explanation: "Dengeli bir ağacın yüksekliği log n olduğu için, her adımda arama alanı yarıya indiği gibi arama O(log n) sürer.",
    },
    {
      id: "trmb3",
      prompt: "BST işlemleri genellikle hangi teknikle yazılır?",
      options: ["Sadece döngülerle", "Recursion ile", "Sadece hash fonksiyonlarıyla", "Sıralama algoritmalarıyla"],
      correctIndex: 1,
      explanation: "Her alt ağaç kendi başına bir BST olduğu için, insert/search/delete gibi işlemler doğal olarak recursive yazılır.",
    },
    {
      id: "trmb4",
      prompt: "Sıralı bir veri dizisi (ör. 1,2,3,4,5) bir BST'ye sırayla eklenirse ne olur?",
      options: [
        "Mükemmel dengeli bir ağaç oluşur",
        "Ağaç, tek yönlü bir zincire dönüşür ve işlemler O(n) olur",
        "Hata fırlatılır",
        "Ağaç otomatik olarak dengelenir",
      ],
      correctIndex: 1,
      explanation: "Sıralı veri eklendiğinde her yeni eleman bir öncekinin sağına (ya da solunda) eklenir, bu da bağlı liste gibi dengesiz bir yapı oluşturur.",
    },
    {
      id: "trmb5",
      prompt: "Inorder traversal (sol-kök-sağ) bir BST'de ne üretir?",
      options: ["Rastgele sıra", "Küçükten büyüğe sıralı değerler", "Büyükten küçüğe sıralı değerler", "Sadece kök değeri"],
      correctIndex: 1,
      explanation: "BST'nin sol<kök<sağ kuralı sayesinde inorder gezinme her zaman sıralı bir çıktı üretir.",
    },
  ],
  summary: [
    "Tree, düğümlerin hiyerarşik bağlı olduğu bir veri yapısıdır; binary tree'de her düğümün en fazla iki çocuğu vardır.",
    "BST kuralı: sol alt ağaçtaki her değer küçük, sağ alt ağaçtaki her değer büyük olmalıdır.",
    "insert/search gibi işlemler, dengeli bir BST'de O(log n), dengesiz (zincir gibi) bir BST'de O(n) sürer.",
    "BST işlemleri doğal olarak recursive yazılır — her alt ağaç kendi başına bir BST'dir.",
    "Inorder traversal (sol-kök-sağ), bir BST'de her zaman küçükten büyüğe sıralı değerler üretir.",
  ],
};
