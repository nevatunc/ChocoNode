import type { Lesson } from "@/lib/types";

const ufCode = [
  {
    code: "public class ShopNetwork {",
    what: "Quick-Find yaklaşımıyla yazılmış basit bir Union-Find (Disjoint Set) sınıfı.",
    why: "Hangi dükkânların aynı 'bağlantılı grup'ta (connected component) olduğunu takip etmek için kullanılır.",
  },
  {
    code: "    private int[] id;",
    what: "Her dükkânın (index) hangi grup kimliğine (id) sahip olduğunu tutan dizi.",
    why: "Quick-Find'da her eleman, kendi grubunun 'temsilci' id'sini doğrudan saklar.",
  },
  {
    code: "    public ShopNetwork(int n) {",
    what: "n dükkân ile başlar, her dükkân başlangıçta kendi grubundadır.",
    why: "—",
  },
  {
    code: "        id = new int[n];",
    what: "id dizisi oluşturulur.",
    why: "—",
  },
  {
    code: "        for (int i = 0; i < n; i++) id[i] = i;",
    what: "Her dükkân, başlangıçta kendi index'ini grup id'si olarak alır.",
    why: "Henüz hiçbir dükkân birbirine bağlanmadığı için her biri kendi başına bir gruptur.",
  },
  {
    code: "    }",
    what: "Constructor'ın sonu.",
    why: "—",
  },
  {
    code: "    public boolean connected(int p, int q) {",
    what: "p ve q dükkânlarının aynı grupta olup olmadığını kontrol eder.",
    why: "—",
  },
  {
    code: "        return id[p] == id[q];",
    what: "İki dükkânın grup id'leri eşitse, aynı gruptadırlar.",
    why: "Quick-Find'da bu kontrol O(1)'dir — en büyük avantajı budur.",
  },
  {
    code: "    }",
    what: "connected metodunun sonu.",
    why: "—",
  },
  {
    code: "    public void union(int p, int q) {",
    what: "p ve q dükkânlarını aynı gruba birleştirir.",
    why: "—",
  },
  {
    code: "        int pid = id[p], qid = id[q];",
    what: "p ve q'nun mevcut grup id'leri saklanır.",
    why: "—",
  },
  {
    code: "        for (int i = 0; i < id.length; i++)",
    what: "Tüm dükkânlar taranır.",
    why: "Quick-Find'ın zayıf noktası budur: union işlemi O(n) sürer çünkü pid grubundaki HERKESİN id'si güncellenmelidir.",
    commonMistake: "union'ın O(1) olacağını sanmak: aslında tüm diziyi taradığı için O(n)'dir — bu yüzden 'weighted union' gibi iyileştirmeler geliştirilmiştir.",
  },
  {
    code: "            if (id[i] == pid) id[i] = qid;",
    what: "pid grubundaki her dükkânın id'si qid olarak güncellenir.",
    why: "Böylece p'nin eski grubundaki herkes artık q'nun grubuna ait olur.",
  },
  {
    code: "    }",
    what: "union metodunun sonu.",
    why: "—",
  },
  {
    code: "}",
    what: "Sınıfın sonu.",
    why: "—",
  },
];

export const unionFindLesson: Lesson = {
  id: "union-find",
  moduleNumber: 7,
  title: "Union-Find (Disjoint Set)",
  isExamScope: true,
  structureKind: "sequence",
  chocolateAnalogy: {
    setup:
      "Şehirdeki çikolata dükkânlarını birbirine bağlayan yolları düşün: bazı dükkânlar aynı 'bölgeye' (gruba) ait, bazıları değil. İki dükkânın aynı bölgede olup olmadığını hızlıca söylemek istiyoruz.",
    whereItEnds:
      "Benzetme burada bitiyor: Union-Find aslında bir yol haritası çizmez, sadece her dükkânın hangi 'grubun temsilcisine' bağlı olduğunu bir dizi ile takip eder — gerçek bir harita değil, soyut bir gruplama yapısıdır.",
  },
  intro:
    "Union-Find (Disjoint Set), elemanları ayrık gruplara (connected components) ayırıp iki temel soruyu hızlıca cevaplayan bir veri yapısıdır: connected(p, q) — p ve q aynı grupta mı? ve union(p, q) — p ve q'nun gruplarını birleştir. Quick-Find yaklaşımında connected() O(1) iken union() O(n) sürer; bu derste bu basit (ama union'da yavaş) yaklaşımı inceliyoruz.",
  codeBlocks: [{ id: "union-find", title: "ShopNetwork — Quick-Find yaklaşımı", lines: ufCode }],
  traces: [
    {
      id: "union-trace",
      title: "union(1, 3) adım adım — 5 dükkân (0-4)",
      codeBlockId: "union-find",
      steps: [
        {
          highlightLine: 10,
          structure: { nodes: ["id[0]=0", "id[1]=1", "id[2]=2", "id[3]=3", "id[4]=4"], top: "id[1]=1" },
          explanation: "Başlangıçta her dükkân kendi grubunda: id[1]=1, id[3]=3.",
        },
        {
          highlightLine: 12,
          structure: { nodes: ["id[0]=0", "id[1]=1", "id[2]=2", "id[3]=3", "id[4]=4"], top: "id[1]=1", pending: "pid=1, qid=3" },
          explanation: "pid = id[1] = 1, qid = id[3] = 3 olarak saklanır.",
        },
        {
          highlightLine: 13,
          structure: { nodes: ["id[0]=0", "id[1]=3", "id[2]=2", "id[3]=3", "id[4]=4"], top: "id[1]=3" },
          explanation: "Tüm dizi taranır: id[i] == pid (yani 1) olan her yer qid (3) ile değiştirilir. Sadece id[1] değişti çünkü sadece o pid=1'e eşitti.",
          consoleOutput: "union(1, 3) sonrası: connected(1, 3) == true",
        },
      ],
    },
  ],
  exercises: [
    {
      id: "uf1",
      type: "predict-output",
      prompt: "5 dükkânlık bir ShopNetwork'te union(0,1) ve union(1,2) çağrıldıktan sonra, connected(0, 2) ne döner (true/false)?",
      code: "union(0, 1); union(1, 2); connected(0, 2);",
      answer: "true",
      hint: "union(0,1) sonrası 0 ve 1 aynı grupta. union(1,2) bu grubu 2 ile birleştirir mi?",
      explanationCorrect: "Doğru! union(0,1)'den sonra 0 ve 1 aynı id'ye sahip. union(1,2) çağrıldığında, 1'in id'sine sahip olan (0 dahil) herkes 2'nin id'sine güncellenir. Sonuç: 0, 1, 2 hepsi aynı grupta.",
      explanationIncorrect: "union(0,1) sonrası 0 ve 1 aynı gruptadır. union(1,2), 1'in (ve dolayısıyla 0'ın da) id'sini 2'ninkiyle değiştirir — bu yüzden 0 ve 2 de aynı grupta olur: true.",
    },
    {
      id: "uf2",
      type: "find-bug",
      prompt: "Bir öğrenci connected() metodunu şöyle yazmış. Neden yanlış (ya da en azından yetersiz)?",
      buggyCode: "public boolean connected(int p, int q) {\n    return p == q;\n}",
      buggyLine: 1,
      fixedLine: "return id[p] == id[q]; olmalı — p ve q'nun kendileri değil, GRUP id'leri karşılaştırılmalı.",
      hint: "p ve q farklı dükkanlar olsa da aynı grupta olabilirler. Hangi değer gruplamayı temsil ediyor?",
      explanationCorrect: "Doğru! p == q sadece aynı dükkan mı diye bakar. Oysa connected(), FARKLI dükkanların aynı GRUPTA olup olmadığını sormalı — bunun için id[p] == id[q] gerekir.",
      explanationIncorrect: "p == q, iki dükkanın birebir aynı olup olmadığını kontrol eder — ama biz farklı dükkanların AYNI GRUPTA olup olmadığını sormak istiyoruz: id[p] == id[q] gerekir.",
    },
    {
      id: "uf3",
      type: "fill-blank",
      prompt: "Constructor'da her dükkânı kendi grubuna atayan döngüyü yaz.",
      codeBefore: "id = new int[n];",
      codeAfter: "",
      answer: "for (int i = 0; i < n; i++) id[i] = i;",
      hint: "Her dükkân, başlangıçta KENDİ index'ini grup id'si olarak alır.",
      explanationCorrect: "Doğru! Her i için id[i] = i; atanarak her dükkan kendi başına bir grup olur.",
      explanationIncorrect: "Eksik döngü: for (int i = 0; i < n; i++) id[i] = i; — her dükkân başlangıçta kendi grubundadır.",
    },
    {
      id: "uf4",
      type: "multiple-choice",
      prompt: "Quick-Find yaklaşımında union() metodu neden O(n) sürer?",
      options: [
        "Çünkü recursive bir metoddur",
        "Çünkü pid grubundaki TÜM elemanların id'sini güncellemek için tüm diziyi taramak gerekir",
        "Çünkü connected() çağrısı yapılır",
        "Aslında O(1)'dir, bu bir yanılgıdır",
      ],
      correctIndex: 1,
      hint: "union metodundaki for döngüsüne bak — kaç kere çalışıyor?",
      explanationCorrect: "Doğru! union(), pid grubundaki her elemanı güncellemek için 0'dan n'e kadar tüm diziyi taramak zorundadır: O(n).",
      explanationIncorrect: "union() içindeki for döngüsü her zaman n kez çalışır (tüm dükkanları tarar) — bu yüzden O(n)'dir.",
    },
    {
      id: "uf5",
      type: "bigo-match",
      prompt: "Quick-Find Union-Find işlemlerini doğru karmaşıklıkla eşleştir.",
      pairs: [
        { operation: "connected(p, q)", complexity: "O(1)" },
        { operation: "union(p, q)", complexity: "O(n)" },
        { operation: "n eleman için başlangıç (constructor)", complexity: "O(n)" },
        { operation: "m tane union çağrısı", complexity: "O(n·m)" },
      ],
      hint: "Her union çağrısı O(n) sürüyorsa, m tane union toplamda ne kadar sürer?",
      explanationCorrect: "connected() tek karşılaştırma yaptığı için O(1). union() tüm diziyi taradığı için O(n). m tane union çağrısı toplamda O(n·m) sürer — bu Quick-Find'ın en büyük zayıflığıdır.",
      explanationIncorrect: "connected() O(1)'dir (tek karşılaştırma). union() tüm diziyi taradığı için O(n)'dir. m kere union çağrılırsa toplam maliyet O(n·m) olur.",
    },
    {
      id: "uf6",
      type: "reorder-lines",
      prompt: "union(p, q) metodunun gövdesini doğru sıraya diz.",
      shuffledLines: ["for (int i = 0; i < id.length; i++)", "    if (id[i] == pid) id[i] = qid;", "int pid = id[p], qid = id[q];"],
      correctOrder: [2, 0, 1],
      hint: "Önce eski id'ler saklanır, sonra diziyi tarayıp güncelleme yapılır.",
      explanationCorrect: "Doğru sıra: önce pid/qid saklanır, sonra tüm dizi taranıp eşleşenler güncellenir.",
      explanationIncorrect: "pid ve qid, döngüden ÖNCE saklanmalı — yoksa döngü içinde id[p] zaten değişmiş olabilir ve yanlış karşılaştırma yapılır.",
    },
  ],
  miniBoss: [
    {
      id: "ufmb1",
      prompt: "Union-Find veri yapısı hangi iki temel soruyu cevaplar?",
      options: [
        "Sıralama ve arama",
        "connected(p,q) — aynı grupta mı? ve union(p,q) — grupları birleştir",
        "push ve pop",
        "enqueue ve dequeue",
      ],
      correctIndex: 1,
      explanation: "Union-Find, elemanları gruplara ayırıp bu iki soruyu verimli cevaplamak için tasarlanmıştır.",
    },
    {
      id: "ufmb2",
      prompt: "Quick-Find yaklaşımında connected() neden hızlıdır (O(1))?",
      options: [
        "Çünkü dizi sıralıdır",
        "Çünkü sadece iki elemanın grup id'sini karşılaştırmak yeterlidir",
        "Çünkü recursive çağrı yapılır",
        "Çünkü hash table kullanılır",
      ],
      correctIndex: 1,
      explanation: "Her eleman kendi grup id'sini doğrudan sakladığı için, karşılaştırma tek bir adımda yapılır.",
    },
    {
      id: "ufmb3",
      prompt: "Quick-Find'ın en büyük zayıflığı nedir?",
      options: [
        "connected() çok yavaştır",
        "union() işlemi, bir grubun TÜM üyelerini güncellemek için tüm diziyi taramalıdır (O(n))",
        "Bellek kullanımı çok fazladır",
        "Sadece sayılarla çalışır",
      ],
      correctIndex: 1,
      explanation: "union() her çağrıldığında, etkilenen grubun tüm üyeleri güncellenmelidir — bu da O(n) maliyete yol açar.",
    },
    {
      id: "ufmb4",
      prompt: "Union-Find, hangi tür gerçek dünya probleminde kullanılır?",
      options: [
        "Metin düzenleme (undo/redo)",
        "Ağdaki bağlı bileşenleri (connected components) bulma, ör. Kruskal'ın minimum spanning tree algoritması",
        "Sözlük sıralama",
        "Fonksiyon çağrılarını takip etme",
      ],
      correctIndex: 1,
      explanation: "Union-Find, graph algoritmalarında (özellikle Kruskal'ın MST algoritmasında) ve ağ bağlantısı problemlerinde yaygın kullanılır.",
    },
    {
      id: "ufmb5",
      prompt: "'Weighted union' gibi iyileştirmeler neyi amaçlar?",
      options: [
        "connected()'ı daha da hızlandırmayı",
        "union() maliyetini azaltmayı (küçük grubu büyük gruba bağlayarak)",
        "Belleği azaltmayı",
        "Kodu kısaltmayı",
      ],
      correctIndex: 1,
      explanation: "Weighted union, her zaman küçük grubu büyük gruba bağlayarak union maliyetini önemli ölçüde azaltır (bu ders kapsamı dışında, ama Quick-Find'ın doğal bir devamıdır).",
    },
  ],
  summary: [
    "Union-Find, elemanları gruplara ayırıp connected(p,q) ve union(p,q) sorularını cevaplayan bir veri yapısıdır.",
    "Quick-Find yaklaşımında her eleman kendi grup id'sini doğrudan saklar.",
    "connected(p,q), sadece iki id'yi karşılaştırdığı için O(1)'dir.",
    "union(p,q), etkilenen grubun tüm üyelerini güncellemek için tüm diziyi taradığından O(n)'dir.",
    "m tane union çağrısının toplam maliyeti O(n·m) olabilir — bu, daha hızlı yaklaşımların (weighted union, path compression) geliştirilmesinin nedenidir.",
  ],
};
