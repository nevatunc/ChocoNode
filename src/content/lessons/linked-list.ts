import type { Lesson } from "@/lib/types";

const insertCode = [
  {
    code: "public class ChocolateChain {",
    what: "Tek yönlü (singly) bağlı liste sınıfı.",
    why: "—",
  },
  {
    code: "    private Node head;",
    what: "Zincirin ilk düğümüne referans.",
    why: "Bağlı listede elemanlara array gibi index ile değil, head'ten başlayıp next'leri takip ederek ulaşılır.",
  },
  {
    code: "    private class Node {",
    what: "Her bir zincir halkasını temsil eden iç sınıf.",
    why: "—",
  },
  {
    code: "        String square;",
    what: "Düğümün tuttuğu değer (bir çikolata karesi).",
    why: "—",
  },
  {
    code: "        Node next;",
    what: "Zincirdeki bir sonraki halkaya referans.",
    why: "next, bir array'deki 'bitişiklik'in yerini alır — elemanlar bellekte yan yana olmak zorunda değildir.",
  },
  {
    code: "    }",
    what: "Node iç sınıfının sonu.",
    why: "—",
  },
  {
    code: "    public void insertAtHead(String square) {",
    what: "Yeni bir elemanı zincirin BAŞINA ekler.",
    why: "Başa ekleme, next referansını ayarlamak yeterli olduğu için O(1)'dir — array'in aksine kaydırma gerekmez.",
  },
  {
    code: "        Node newNode = new Node();",
    what: "Yeni düğüm oluşturulur.",
    why: "—",
  },
  {
    code: "        newNode.square = square;",
    what: "Yeni düğümün değeri ayarlanır.",
    why: "—",
  },
  {
    code: "        newNode.next = head;",
    what: "Yeni düğüm, eski head'e bağlanır.",
    why: "Zincir kopmadan büyümesi için yeni düğüm önce eski zincire bağlanmalı.",
    commonMistake: "head = newNode; satırını bundan ÖNCE yazmak: eski head referansı kaybolur, zincirin geri kalanına erişim imkansız hale gelir.",
  },
  {
    code: "        head = newNode;",
    what: "head artık yeni düğümü gösterir.",
    why: "—",
  },
  {
    code: "    }",
    what: "insertAtHead metodunun sonu.",
    why: "—",
  },
  {
    code: "}",
    what: "Sınıfın sonu.",
    why: "—",
  },
];

export const linkedListLesson: Lesson = {
  id: "linked-list",
  moduleNumber: 3,
  title: "Linked List (Bağlı Liste)",
  isExamScope: true,
  structureKind: "sequence",
  chocolateAnalogy: {
    setup:
      "Zincirle bağlı çikolata kareleri düşün: her kare bir sonrakine ince bir zincirle bağlı. Bir kareyi bulmak için zincirin başından itibaren birer birer ilerlemen gerekir.",
    whereItEnds:
      "Benzetme burada bitiyor: gerçek bağlı listede düğümler bellekte farklı, rastgele yerlerde durabilir — fiziksel bir zincirin aksine, 'bitişiklik' sadece next referanslarıyla sağlanır.",
  },
  intro:
    "Linked list (bağlı liste), her elemanın (node/düğüm) kendi değerini ve bir sonraki elemana referansını (next) tuttuğu bir veri yapısıdır. Array'in aksine, elemanlar bellekte bitişik olmak zorunda değildir ve başa ekleme/çıkarma O(1) sürer — ama index ile doğrudan erişim yoktur, aranan elemana ulaşmak için zinciri baştan taramak gerekir (O(n)).",
  codeBlocks: [{ id: "insert", title: "insertAtHead() — başa ekleme", lines: insertCode }],
  traces: [
    {
      id: "insert-trace",
      title: "insertAtHead(\"nane\") adım adım",
      codeBlockId: "insert",
      steps: [
        {
          highlightLine: 7,
          structure: { nodes: ["bitter", "sütlü"], top: "bitter" },
          explanation: "Yeni bir Node nesnesi oluşturulur, henüz zincire bağlı değil.",
        },
        {
          highlightLine: 9,
          structure: { nodes: ["bitter", "sütlü"], top: "bitter", pending: "nane" },
          explanation: "newNode.square = \"nane\" ile değer atanır.",
        },
        {
          highlightLine: 10,
          structure: { nodes: ["nane", "bitter", "sütlü"], top: "bitter", pending: "nane" },
          explanation: "newNode.next = head ile yeni düğüm eski head'e (bitter) bağlanır. head henüz güncellenmedi.",
        },
        {
          highlightLine: 11,
          structure: { nodes: ["nane", "bitter", "sütlü"], top: "nane" },
          explanation: "head artık 'nane' düğümünü gösteriyor. Ekleme O(1) sürede tamamlandı.",
          consoleOutput: "insertAtHead(\"nane\") → zincir: nane → bitter → sütlü",
        },
      ],
    },
  ],
  playground: {
    kind: "sequence",
    addOp: "insertAtHead",
    removeOp: "removeHead",
    addSide: "front",
    removeSide: "front",
    pointerLabel: "head",
    initialItems: ["bitter", "sütlü"],
  },
  exercises: [
    {
      id: "ll1",
      type: "multiple-choice",
      prompt: "Bağlı listede başa eleman eklemek (insertAtHead) neden O(1)'dir, array'de başa eklemek ise O(n)?",
      options: [
        "Bağlı liste her zaman daha küçük olduğu için",
        "Bağlı listede sadece birkaç referans değişir; array'de ise tüm elemanlar bir sağa kaydırılmalıdır",
        "Array'ler bağlı listeden daha yavaş çalışır her zaman",
        "Bu bir yanılgı, ikisi de aynı hızdadır",
      ],
      correctIndex: 1,
      hint: "Array'de index 0'a yer açmak için diğer elemanlara ne olması gerekir?",
      explanationCorrect: "Doğru! Bağlı listede sadece yeni düğümün next'i ve head referansı değişir. Array'de ise tüm elemanlar sağa kaymalı — bu O(n).",
      explanationIncorrect: "Fark boyutla ilgili değil: bağlı listede sabit sayıda referans güncellenirken, array'de başa eklemek tüm elemanların kaydırılmasını gerektirir.",
    },
    {
      id: "ll2",
      type: "find-bug",
      prompt: "insertAtHead() metodunda bir hata var. Hangi iki satırın sırası yanlış?",
      buggyCode: "Node newNode = new Node();\nnewNode.square = square;\nhead = newNode;\nnewNode.next = head;",
      buggyLine: 2,
      fixedLine: "newNode.next = head; satırı head = newNode;'den ÖNCE gelmeli.",
      hint: "head güncellendikten sonra newNode.next = head yazılırsa, newNode kendi kendine mi bağlanır?",
      explanationCorrect: "Doğru! head = newNode satırından sonra newNode.next = head yazılırsa, newNode kendi kendisine döngü yapar ve eski zincir kaybolur.",
      explanationIncorrect: "head'i güncellemeden ÖNCE newNode.next = head yapılmalı, yoksa newNode kendine referans verir ve zincirin geri kalanı kaybolur.",
    },
    {
      id: "ll3",
      type: "fill-blank",
      prompt: "Node iç sınıfında, bir sonraki düğüme referansı tutan alanı yaz.",
      codeBefore: "private class Node {\n    String square;",
      codeAfter: "}",
      answer: "Node next;",
      hint: "Bu alanın tipi, sınıfın kendisiyle aynıdır (kendine referans veren bir yapı).",
      explanationCorrect: "Doğru, Node next; alanı zincirdeki bir sonraki düğümü gösterir.",
      explanationIncorrect: "Eksik satır: Node next; — bu alan bir sonraki düğüme referans tutar.",
    },
    {
      id: "ll4",
      type: "predict-output",
      prompt: "Boş bir zincire sırayla insertAtHead(\"a\"); insertAtHead(\"b\"); insertAtHead(\"c\"); çağrıldığında, head hangi değeri gösterir?",
      code: 'insertAtHead("a"); insertAtHead("b"); insertAtHead("c");',
      answer: "c",
      hint: "Her insertAtHead, en SON ekleneni en BAŞA koyar.",
      explanationCorrect: "Doğru! Her ekleme başa yapıldığı için en son eklenen ('c') her zaman head olur.",
      explanationIncorrect: "insertAtHead her zaman yeni elemanı başa koyar; en son çağrılan ('c') zincirin başında, yani head'te olur.",
    },
    {
      id: "ll5",
      type: "bigo-match",
      prompt: "Tek yönlü bağlı liste işlemlerini doğru karmaşıklıkla eşleştir.",
      pairs: [
        { operation: "insertAtHead(item)", complexity: "O(1)" },
        { operation: "removeHead()", complexity: "O(1)" },
        { operation: "i. indeksteki elemanı bulmak", complexity: "O(n)" },
        { operation: "Zincirin sonuna eleman eklemek (tail referansı yoksa)", complexity: "O(n)" },
      ],
      hint: "tail referansı tutulmuyorsa, sona ulaşmak için zinciri baştan sona gezmek gerekir.",
      explanationCorrect: "Baş işlemleri O(1)'dir çünkü sadece head değişir. Index ile arama ve tail referansı olmadan sona ekleme, zinciri gezmeyi gerektirdiği için O(n)'dir.",
      explanationIncorrect: "head üzerindeki işlemler (ekleme/çıkarma) O(1)'dir. Ama belirli bir indekse ya da sona ulaşmak zinciri baştan taramayı gerektirir: O(n).",
    },
    {
      id: "ll6",
      type: "reorder-lines",
      prompt: "insertAtHead() metodunun gövdesini doğru sıraya diz.",
      shuffledLines: ["head = newNode;", "newNode.square = square;", "Node newNode = new Node();", "newNode.next = head;"],
      correctOrder: [2, 1, 3, 0],
      hint: "Önce nesne oluşturulur, sonra değeri atanır, sonra eski zincire bağlanır, en son head güncellenir.",
      explanationCorrect: "Doğru sıra: oluştur → değer ata → next ile eski head'e bağla → head'i güncelle.",
      explanationIncorrect: "head'i güncellemeden önce newNode'un eski zincire (next) bağlanmış olması gerekir.",
    },
  ],
  miniBoss: [
    {
      id: "llmb1",
      prompt: "Bağlı listede bir elemana neden index ile direkt erişilemez?",
      options: [
        "Java bunu desteklemediği için",
        "Elemanlar bitişik bellekte olmadığı için, erişim ancak next referanslarını takip ederek yapılabilir",
        "Bağlı listeler her zaman çok küçük olduğu için",
        "head referansı kaybolduğu için",
      ],
      correctIndex: 1,
      explanation: "Bağlı listede elemanlar bellekte dağınık olabilir; i. elemana ulaşmak için head'ten başlayıp next'leri i kez takip etmek gerekir.",
    },
    {
      id: "llmb2",
      prompt: "insertAtHead() işlemi neden O(1)'dir?",
      options: [
        "Liste her zaman kısa olduğu için",
        "Sadece sabit sayıda referans (newNode.next, head) güncellenir, listenin uzunluğundan bağımsız",
        "Java bunu önceden hesapladığı için",
        "Aslında O(n)'dir, bu bir yanılgıdır",
      ],
      correctIndex: 1,
      explanation: "İşlem, listenin boyutundan bağımsız olarak sabit sayıda referans güncellemesi gerektirir.",
    },
    {
      id: "llmb3",
      prompt: "Bir düğümün next alanı neyi temsil eder?",
      options: ["Düğümün değerini", "Zincirdeki bir önceki düğümü", "Zincirdeki bir sonraki düğüme referansı", "Zincirin uzunluğunu"],
      correctIndex: 2,
      explanation: "next, tek yönlü bağlı listede bir sonraki düğüme işaret eden referanstır.",
    },
    {
      id: "llmb4",
      prompt: "Array ile bağlı liste arasında temel fark nedir?",
      options: [
        "Array her zaman daha yavaştır",
        "Array index ile O(1) erişim sağlar ama sabit boyutludur; bağlı liste O(1) baş-ekleme sağlar ama index erişimi O(n)'dir",
        "Bağlı liste her zaman daha az bellek kullanır",
        "İkisi arasında pratik fark yoktur",
      ],
      correctIndex: 1,
      explanation: "Her yapının kendi güçlü/zayıf yönü vardır: array hızlı index erişimi sunar, bağlı liste hızlı baş-ekleme/çıkarma sunar.",
    },
    {
      id: "llmb5",
      prompt: "Zincirin sonuna (tail) hızlı ekleme yapmak istiyorsak ne yapmalıyız?",
      options: [
        "Her seferinde zinciri baştan sona taramalıyız",
        "Ayrıca bir tail referansı tutmalıyız (çift yönlü değilse bile)",
        "Array'e geçmeliyiz",
        "Bu mümkün değildir",
      ],
      correctIndex: 1,
      explanation: "tail referansı tutmak, sona ekleme işlemini O(n)'den O(1)'e düşürür — queue implementasyonlarında bu teknik kullanılır.",
    },
  ],
  summary: [
    "Linked list, her düğümün kendi değerini ve bir sonraki düğüme referansını (next) tuttuğu bir yapıdır.",
    "Başa ekleme/çıkarma (insertAtHead/removeHead) O(1) sürer — sadece birkaç referans değişir.",
    "Index ile erişim veya arama O(n) sürer — zincirin baştan taranması gerekir.",
    "Array'in aksine elemanlar bellekte bitişik olmak zorunda değildir, bu yüzden resize gibi bir kavram yoktur.",
    "tail referansı tutulursa, sona ekleme de O(1) yapılabilir (queue implementasyonunda kullanılan teknik).",
  ],
};
