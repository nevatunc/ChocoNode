import type { Lesson } from "@/lib/types";

const pushCode = [
  {
    code: "public class LinkedStack<Item> {",
    what: "Generic (jenerik) bir Stack sınıfı tanımlar.",
    why: "Item tip parametresi sayesinde aynı sınıf String, Integer, herhangi bir nesne için yeniden yazılmadan kullanılabilir.",
    commonMistake: "Generic yerine Object kullanmak: derleme zamanında değil çalışma zamanında hata verir.",
  },
  {
    code: "    private Node topOfStack;",
    what: "Yığının en üstündeki düğüme referans tutar.",
    why: "Stack'te tek bir uca (üst) erişim yeterli; bu yüzden tek referans yeterlidir.",
  },
  {
    code: "    private int count;",
    what: "Yığındaki eleman sayısını tutar.",
    why: "size() metodunu O(1) yapmak için her push/pop'ta güncellenir; yoksa listeyi baştan sona saymak gerekirdi.",
  },
  {
    code: "    private class Node {",
    what: "Yığının her bir halkasını (çikolata karesini) temsil eden iç sınıf.",
    why: "private inner class olduğu için dışarıdan erişilemez — stack'in iç yapısı client'tan gizlenir (encapsulation).",
  },
  {
    code: "        Item item;",
    what: "Düğümün tuttuğu değer.",
    why: "Her çikolata karesi kendi değerini taşır.",
  },
  {
    code: "        Node next;",
    what: "Bir alttaki düğüme referans.",
    why: "Zincirleme (linked) yapı bu referansla kurulur; next olmadan liste değil, tek bir eleman olurdu.",
  },
  {
    code: "    }",
    what: "Node iç sınıfının sonu.",
    why: "—",
  },
  {
    code: "    public void push(Item item) {",
    what: "Yeni bir elemanı yığının en üstüne ekler.",
    why: "LIFO (Last In, First Out) kuralı gereği her zaman üste ekleriz — tezgâhtaki marshmallow yığınına yenisini en üste koymak gibi.",
  },
  {
    code: "        Node newNode = new Node();",
    what: "Yeni bir düğüm nesnesi oluşturur.",
    why: "Her push işlemi, zincire eklenecek yeni bir halka gerektirir.",
  },
  {
    code: "        newNode.item = item;",
    what: "Yeni düğümün değerini ayarlar.",
    why: "Önce içeriği, sonra bağlantıyı kurmak hataları önler.",
    commonMistake: "newNode.next'i item'dan önce ayarlamaya çalışıp eski topOfStack'i kaybetmek.",
  },
  {
    code: "        newNode.next = topOfStack;",
    what: "Yeni düğümü, eski en üst düğüme bağlar.",
    why: "Eski üst artık yeni düğümün 'altı' olur — zincir kopmadan büyür.",
    commonMistake: "Bu satırı topOfStack = newNode'dan SONRA yazmak: bu durumda eski topOfStack referansı kaybolur ve zincir kopar.",
  },
  {
    code: "        topOfStack = newNode;",
    what: "Yığının tepesini yeni düğüme taşır.",
    why: "Artık 'en son eklenen' newNode olduğu için tepe göstericisi ona işaret etmeli.",
  },
  {
    code: "        count++;",
    what: "Eleman sayacını bir artırır.",
    why: "size() metodunun doğru kalması için.",
  },
  {
    code: "    }",
    what: "push metodunun sonu.",
    why: "—",
  },
];

const popCode = [
  {
    code: "    public Item pop() {",
    what: "Yığının en üstündeki elemanı çıkarır ve döndürür.",
    why: "LIFO kuralı: en son eklenen, ilk çıkan olur.",
  },
  {
    code: "        if (isEmpty()) throw new RuntimeException(\"Stack boş!\");",
    what: "Boş yığından pop çağrılırsa hata fırlatır.",
    why: "'Underflow' durumunu sessizce geçmek yerine açıkça bildirmek, hataları erken yakalamayı sağlar.",
    commonMistake: "Bu kontrolü atlamak: topOfStack null iken topOfStack.item çağırmak NullPointerException fırlatır — ama anlaşılması daha zor bir hatadır.",
  },
  {
    code: "        Item item = topOfStack.item;",
    what: "Döndürülecek değeri önce bir değişkende saklar.",
    why: "topOfStack ileride değişeceği için değeri şimdi kaydetmek gerekir.",
  },
  {
    code: "        topOfStack = topOfStack.next;",
    what: "Yığının tepesini bir alt düğüme kaydırır.",
    why: "Eski tepe düğüm artık zincirden çıkarılmış olur; bir sonraki eleman yeni tepe olur.",
    commonMistake: "Bu satırı item'ı okumadan ÖNCE çalıştırmak: topOfStack değiştiği için eski değere erişim kaybolur.",
  },
  {
    code: "        count--;",
    what: "Eleman sayacını bir azaltır.",
    why: "size() tutarlılığını korumak için.",
  },
  {
    code: "        return item;",
    what: "Saklanan değeri çağırana döndürür.",
    why: "Client, çıkarılan elemanı kullanabilsin diye.",
  },
  {
    code: "    }",
    what: "pop metodunun sonu.",
    why: "—",
  },
];

export const stackLesson: Lesson = {
  id: "stack",
  moduleNumber: 4,
  title: "Stack (Yığın)",
  isExamScope: true,
  structureKind: "sequence",
  chocolateAnalogy: {
    setup:
      "Tezgâhın üzerinde üst üste dizilmiş marshmallow'ları düşün: her zaman en üstekini alırsın, en üstekini koyarsın. Hiçbir zaman ortadan bir tane çekip çıkarmazsın.",
    whereItEnds:
      "Benzetme burada bitiyor: gerçek bir stack elemanları fiziksel olarak 'sallamaz', sadece en üstteki eleman (top) üzerinden push/pop işlemi yapar — her işlem O(1) sürede, sabit zamanda gerçekleşir.",
  },
  intro:
    "Stack (yığın), elemanların LIFO (Last In, First Out — son giren ilk çıkar) kuralına göre tutulduğu bir veri yapısıdır (data structure). İki temel işlemi vardır: push (ekleme) ve pop (çıkarma). Tarayıcının geri butonu, bir kelime işlemcinin 'geri al' özelliği ve fonksiyon çağrılarının takip edilmesi hep stack ile çalışır.",
  codeBlocks: [
    { id: "push", title: "push() — Bağlı Liste ile", lines: pushCode },
    { id: "pop", title: "pop() — Bağlı Liste ile", lines: popCode },
  ],
  traces: [
    {
      id: "push-trace",
      title: "push(\"kakao\") adım adım",
      codeBlockId: "push",
      steps: [
        {
          highlightLine: 8,
          structure: { nodes: ["süt", "şeker"], top: "süt" },
          explanation: "Önce boş bir Node nesnesi oluşturulur. Henüz zincire bağlı değil.",
        },
        {
          highlightLine: 9,
          structure: { nodes: ["süt", "şeker"], top: "süt", pending: "kakao" },
          explanation: "Yeni düğümün item alanına 'kakao' yazılır.",
        },
        {
          highlightLine: 10,
          structure: { nodes: ["kakao", "süt", "şeker"], top: "süt", pending: "kakao" },
          explanation: "Yeni düğümün next'i, eski tepe olan 'süt' düğümüne bağlanır. Zincir artık kakao → süt → şeker şeklinde, ama tepe göstericisi henüz güncellenmedi.",
        },
        {
          highlightLine: 11,
          structure: { nodes: ["kakao", "süt", "şeker"], top: "kakao" },
          explanation: "topOfStack artık 'kakao' düğümünü gösteriyor. push işlemi tamamlandı.",
          consoleOutput: "push(\"kakao\") → yığın: [kakao, süt, şeker]",
        },
      ],
    },
    {
      id: "pop-trace",
      title: "pop() adım adım",
      codeBlockId: "pop",
      steps: [
        {
          highlightLine: 1,
          structure: { nodes: ["kakao", "süt", "şeker"], top: "kakao" },
          explanation: "isEmpty() kontrolü yapılır; yığın boş değilse devam edilir.",
        },
        {
          highlightLine: 2,
          structure: { nodes: ["kakao", "süt", "şeker"], top: "kakao", saved: "kakao" },
          explanation: "Döndürülecek değer ('kakao') bir değişkende saklanır.",
        },
        {
          highlightLine: 3,
          structure: { nodes: ["süt", "şeker"], top: "süt", saved: "kakao" },
          explanation: "topOfStack, next alanı sayesinde bir alt düğüme ('süt') kayar. 'kakao' düğümü artık zincirden kopmuştur.",
        },
        {
          highlightLine: 5,
          structure: { nodes: ["süt", "şeker"], top: "süt" },
          explanation: "Saklanan değer çağırana döndürülür.",
          consoleOutput: "pop() → \"kakao\" döndü, yığın: [süt, şeker]",
        },
      ],
    },
  ],
  playground: {
    kind: "sequence",
    addOp: "push",
    removeOp: "pop",
    addSide: "end",
    removeSide: "end",
    pointerLabel: "top",
    initialItems: ["süt", "şeker"],
  },
  exercises: [
    {
      id: "ex1",
      type: "predict-output",
      prompt:
        "Aşağıdaki işlemler sırayla uygulanıyor: push(\"a\"); push(\"b\"); pop(); push(\"c\"); pop(); pop();\nSon pop() çağrısı ne döndürür?",
      code: 'push("a"); push("b"); pop(); push("c"); pop(); pop();',
      answer: "a",
      hint: "Her push'u ve pop'u sırayla bir kağıda yığın olarak çiz. En son kalan eleman neydi?",
      explanationCorrect: "b push edilip hemen pop edildi (b çıktı). Sonra c push edilip pop edildi (c çıktı). Geriye sadece a kaldı, son pop() onu döndürür.",
      explanationIncorrect: "İşlemleri bir yığın çizerek sırayla takip et: push('a') → [a]. push('b') → [a,b]. pop() → b çıkar, [a]. push('c') → [a,c]. pop() → c çıkar, [a]. pop() → a çıkar.",
    },
    {
      id: "ex2",
      type: "fill-blank",
      prompt: "push() metodunda eksik olan satırı yaz: yeni düğümü eski tepeye bağlayan satır hangisi?",
      codeBefore: "Node newNode = new Node();\nnewNode.item = item;",
      codeAfter: "topOfStack = newNode;\ncount++;",
      answer: "newNode.next = topOfStack;",
      hint: "Yeni düğümün 'next'i neyi göstermeli? Hâlâ tepe olan eski düğümü.",
      explanationCorrect: "Doğru! newNode.next = topOfStack; satırı, zinciri koparmadan yeni düğümü eski tepeye bağlar.",
      explanationIncorrect: "topOfStack henüz güncellenmeden önce, newNode'un next alanının eski topOfStack'i göstermesi gerekir: newNode.next = topOfStack;",
    },
    {
      id: "ex3",
      type: "find-bug",
      prompt: "Bu pop() implementasyonunda bir hata var. Hangi satır yanlış sırada?",
      buggyCode:
        "public Item pop() {\n    topOfStack = topOfStack.next;\n    Item item = topOfStack.item;\n    count--;\n    return item;\n}",
      buggyLine: 2,
      fixedLine: "Item item = topOfStack.item; satırı topOfStack = topOfStack.next;'ten ÖNCE gelmeli.",
      hint: "topOfStack'i güncellemeden önce mi, sonra mı eski değeri okumalıyız?",
      explanationCorrect: "Doğru tespit! topOfStack güncellendikten sonra topOfStack.item okunursa, artık BİR ALTTAKİ elemanın değeri okunur — bu da yanlış elemanın döndürülmesine yol açar.",
      explanationIncorrect: "topOfStack = topOfStack.next; satırı çalıştıktan sonra topOfStack artık farklı bir düğümü gösterir. Item'ı önce okumak gerekir.",
    },
    {
      id: "ex4",
      type: "reorder-lines",
      prompt: "push() metodunun gövdesini doğru sıraya diz.",
      shuffledLines: [
        "topOfStack = newNode;",
        "newNode.item = item;",
        "Node newNode = new Node();",
        "newNode.next = topOfStack;",
      ],
      correctOrder: [2, 1, 3, 0],
      hint: "Önce nesne yaratılır, sonra içeriği doldurulur, sonra zincire bağlanır, en son tepe taşınır.",
      explanationCorrect: "Doğru sıra: önce Node oluştur, içeriğini (item) doldur, next ile eski tepeye bağla, en son topOfStack'i yeni düğüme taşı.",
      explanationIncorrect: "topOfStack'i güncellemeden önce yeni düğümün eski tepeye bağlanmış olması gerekir, yoksa eski tepeye giden referansı kaybedersin.",
    },
    {
      id: "ex5",
      type: "multiple-choice",
      prompt: "Bir stack'i array yerine bağlı liste (linked list) ile implemente etmenin en büyük avantajı nedir?",
      options: [
        "Her zaman daha az bellek kullanır.",
        "push/pop işlemleri her zaman sabit zamanda (worst-case O(1)) çalışır, resize gerekmez.",
        "Elemanlara index ile erişim sağlar.",
        "Kod daha kısa olur.",
      ],
      correctIndex: 1,
      hint: "Array tabanlı stack'te bazen 'resize' (büyütme/küçültme) gerekir; bu işlem ne zaman pahalı olur?",
      explanationCorrect: "Doğru. Bağlı liste implementasyonunda her push/pop sabit sayıda işlemle (yeni node oluştur, referans değiştir) biter; array'de ise dolma anında resize maliyeti N olabilir (amortized O(1) olsa da worst-case'te değil).",
      explanationIncorrect: "Bağlı liste genelde array'den DAHA FAZLA bellek kullanır (her node için next referansı + nesne overhead'i). Asıl avantaj: worst-case'te her işlem sabit zamanlıdır, resize'a gerek yoktur.",
    },
    {
      id: "ex6",
      type: "bigo-match",
      prompt: "Bağlı liste tabanlı Stack için her işlemin zaman karmaşıklığını eşleştir.",
      pairs: [
        { operation: "push(item)", complexity: "O(1)" },
        { operation: "pop()", complexity: "O(1)" },
        { operation: "isEmpty()", complexity: "O(1)" },
        { operation: "tüm elemanları yazdırmak (iterate)", complexity: "O(n)" },
      ],
      hint: "Hangi işlemler sadece tepe düğümle ilgilenir, hangisi tüm zinciri gezer?",
      explanationCorrect: "push, pop ve isEmpty sadece topOfStack referansıyla ilgilenir — sabit zaman. Tüm elemanları gezmek ise her düğümü ziyaret eder, n elemanlı yığın için O(n).",
      explanationIncorrect: "topOfStack üzerinden yapılan tekil işlemler (push, pop, isEmpty) O(1)'dir. Tüm zinciri baştan sona dolaşmak gerektiren işlemler O(n)'dir.",
    },
  ],
  miniBoss: [
    {
      id: "mb1",
      prompt: "LIFO ne anlama gelir?",
      options: ["First In, First Out", "Last In, First Out", "Last In, Last Out", "Fast In, Fast Out"],
      correctIndex: 1,
      explanation: "LIFO = Last In, First Out: en son eklenen eleman ilk çıkar.",
    },
    {
      id: "mb2",
      prompt: "push('x'); push('y'); push('z'); pop(); pop(); işleminden sonra stack'te ne kalır?",
      options: ["['x']", "['y']", "['z']", "[]"],
      correctIndex: 0,
      explanation: "z ve y sırasıyla pop edilir (LIFO), geriye sadece x kalır.",
    },
    {
      id: "mb3",
      prompt: "Boş bir stack'ten pop() çağırmak ne yapmalı?",
      options: [
        "Sessizce null döndürmeli",
        "Programı durdurmadan 0 döndürmeli",
        "Bir hata/exception fırlatmalı (underflow)",
        "Otomatik olarak bir eleman push etmeli",
      ],
      correctIndex: 2,
      explanation: "Boş stack'ten pop çağrısı 'underflow' durumudur ve açıkça bir exception fırlatılmalı — sessiz hatalar daha tehlikelidir.",
    },
    {
      id: "mb4",
      prompt: "Fonksiyon çağrıları (recursion dahil) derleyici tarafından hangi veri yapısıyla takip edilir?",
      options: ["Queue", "Stack (call stack)", "Hash table", "Tree"],
      correctIndex: 1,
      explanation: "Her fonksiyon çağrısı 'call stack'e push edilir, fonksiyon bittiğinde pop edilir — bu yüzden çok derin recursion 'stack overflow' hatası verir.",
    },
    {
      id: "mb5",
      prompt: "Bir metin editöründeki 'Geri Al' (Undo) özelliği en doğal şekilde hangi veri yapısıyla uygulanır?",
      options: ["Queue", "Stack", "Graph", "Hash table"],
      correctIndex: 1,
      explanation: "En son yapılan işlem ilk geri alınır — bu tam olarak LIFO davranışıdır, yani Stack.",
    },
  ],
  summary: [
    "Stack, LIFO (son giren ilk çıkar) kuralıyla çalışan bir veri yapısıdır.",
    "push() ve pop() işlemleri bağlı liste ile implemente edildiğinde worst-case O(1) sürer.",
    "Her Node, kendi değerini (item) ve bir sonraki düğüme referansını (next) tutar.",
    "Boş stack'ten pop çağrısı 'underflow' durumudur ve açıkça ele alınmalıdır (exception).",
    "Fonksiyon çağrıları, geri al (undo) özellikleri ve tarayıcı geçmişi gerçek dünyada stack kullanır.",
    "Array tabanlı implementasyon da mümkündür, ancak resize maliyeti nedeniyle amortized O(1) sunar; bağlı liste worst-case O(1) sunar.",
  ],
};
