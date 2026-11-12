import type { Lesson } from "@/lib/types";

const resizeCode = [
  {
    code: "public class DynamicBonbonBox {",
    what: "Kendi boyutunu otomatik büyüten bir array sarmalayıcı sınıf.",
    why: "Java'nın kendi ArrayList'inin arkasındaki mantığı göstermek için basitleştirilmiş bir örnek.",
  },
  {
    code: "    private String[] items;",
    what: "Elemanları tutan sabit boyutlu dizi (array).",
    why: "Java array'leri oluşturulduktan sonra boyut değiştiremez; bu yüzden gerektiğinde YENİ bir array oluşturup kopyalamamız gerekir.",
  },
  {
    code: "    private int count;",
    what: "Dizide gerçekten kaç eleman olduğunu tutar (items.length'ten farklı olabilir).",
    why: "items.length kapasiteyi gösterir, count ise dolu eleman sayısını — ikisini karıştırmak yaygın bir hatadır.",
  },
  {
    code: "    public void add(String item) {",
    what: "Diziye yeni bir eleman ekler.",
    why: "—",
  },
  {
    code: "        if (count == items.length) resize(items.length * 2);",
    what: "Dizi doluysa, kapasiteyi iki katına çıkarır.",
    why: "'Repeated doubling' (tekrarlı ikiye katlama): nadir ama büyük kopyalamalar yapmak, sık ama küçük kopyalamalardan daha verimlidir (amortized O(1)).",
    commonMistake: "Her add'de 1 artırarak resize yapmak: bu, her ekleme işlemini O(n) yapar, toplamda O(n²) olur.",
  },
  {
    code: "        items[count] = item;",
    what: "Yeni elemanı count indeksine yerleştirir.",
    why: "—",
  },
  {
    code: "        count++;",
    what: "Dolu eleman sayısını bir artırır.",
    why: "—",
  },
  {
    code: "    }",
    what: "add metodunun sonu.",
    why: "—",
  },
  {
    code: "    private void resize(int newCapacity) {",
    what: "Daha büyük kapasiteli yeni bir array oluşturup eski elemanları kopyalar.",
    why: "Array'ler sabit boyutlu olduğu için büyütme ancak yeni bir array ile mümkündür.",
  },
  {
    code: "        String[] copy = new String[newCapacity];",
    what: "Yeni, daha büyük array oluşturur.",
    why: "—",
  },
  {
    code: "        for (int i = 0; i < count; i++) copy[i] = items[i];",
    what: "Eski elemanları yeni array'e tek tek kopyalar.",
    why: "Bu kopyalama O(n) sürer, ama bu işlem her eleman eklemede değil, seyrek olarak gerçekleşir.",
  },
  {
    code: "        items = copy;",
    what: "items referansını yeni array'e günceller.",
    why: "Eski (küçük) array artık kullanılmaz ve garbage collector tarafından temizlenebilir.",
  },
  {
    code: "    }",
    what: "resize metodunun sonu.",
    why: "—",
  },
  {
    code: "}",
    what: "Sınıfın sonu.",
    why: "—",
  },
];

export const arrayLesson: Lesson = {
  id: "array",
  moduleNumber: 2,
  title: "Array ve Dynamic Array",
  isExamScope: true,
  structureKind: "sequence",
  chocolateAnalogy: {
    setup:
      "Numaralı bonbon kutusu düşün: her bonbon sabit bir numaralı yuvada durur (index). İstediğin bonbona, numarasını bilerek direkt elini uzatıp ulaşabilirsin.",
    whereItEnds:
      "Benzetme burada bitiyor: gerçek bir array sabit boyutludur; kutu dolduğunda yeni bonbon eklemek için bütün bonbonları DAHA BÜYÜK bir kutuya taşımak (resize) gerekir — fiziksel kutularda böyle bir 'büyüme' yoktur.",
  },
  intro:
    "Array (dizi), elemanların bitişik bellek konumlarında, sabit boyutlu ve index (indeks) ile erişilebilir şekilde tutulduğu en temel veri yapısıdır. Dynamic array (ArrayList'in temeli), sabit boyut sınırını 'repeated doubling' (tekrarlı ikiye katlama) tekniğiyle aşar: dizi dolunca iki katı büyüklükte yeni bir dizi oluşturulup elemanlar kopyalanır.",
  codeBlocks: [{ id: "resize", title: "Dynamic array: add() ve resize()", lines: resizeCode }],
  traces: [
    {
      id: "resize-trace",
      title: "add(\"nane\") — kapasite dolu, resize tetikleniyor",
      codeBlockId: "resize",
      steps: [
        {
          highlightLine: 4,
          structure: { nodes: ["süt", "bitter"], top: "bitter" },
          explanation: "items dizisinin kapasitesi 2, count da 2 — dizi dolu. resize koşulu true olur.",
        },
        {
          highlightLine: 9,
          structure: { nodes: ["süt", "bitter", "nane"], top: "nane", pending: "nane" },
          explanation: "resize(4) çağrılır: yeni, 4 kapasiteli bir dizi oluşturulur ve eski elemanlar kopyalanır.",
        },
        {
          highlightLine: 6,
          structure: { nodes: ["süt", "bitter", "nane"], top: "nane" },
          explanation: "Artık 'nane' count indeksine (2) yerleştirilir.",
          consoleOutput: "add(\"nane\") → dizi: [süt, bitter, nane], kapasite: 4",
        },
      ],
    },
  ],
  playground: {
    kind: "sequence",
    addOp: "add",
    removeOp: "removeLast",
    addSide: "end",
    removeSide: "end",
    pointerLabel: "count-1",
    initialItems: ["süt", "bitter"],
  },
  exercises: [
    {
      id: "ar1",
      type: "multiple-choice",
      prompt: "arr[i] ile bir array elemanına erişmek neden O(1) sürer?",
      options: [
        "Java bu işlemi önceden hesaplayıp önbelleğe aldığı için",
        "Elemanlar bitişik bellekte olduğu için, i indeksinin bellek adresi doğrudan hesaplanabilir",
        "Array'ler her zaman küçük olduğu için",
        "Index'ler sıralı arama ile bulunduğu için",
      ],
      correctIndex: 1,
      hint: "Bellekteki adres = başlangıç adresi + i * eleman boyutu. Bu formül için arama yapmaya gerek var mı?",
      explanationCorrect: "Doğru! Bitişik bellek sayesinde adres doğrudan hesaplanır, arama yapılmaz — bu yüzden O(1).",
      explanationIncorrect: "O(1) olmasının sebebi önbellekleme değil: elemanlar bitişik olduğu için adres matematiksel olarak hesaplanır, arama gerekmez.",
    },
    {
      id: "ar2",
      type: "find-bug",
      prompt: "Bu add() metodu bazen ArrayIndexOutOfBoundsException fırlatıyor. Hangi satır eksik?",
      buggyCode: "public void add(String item) {\n    items[count] = item;\n    count++;\n}",
      buggyLine: 1,
      fixedLine: "items[count] = item; satırından ÖNCE if (count == items.length) resize(...); kontrolü eklenmeli.",
      hint: "Dizi dolduğunda ne yapılması gerekiyordu?",
      explanationCorrect: "Doğru tespit! Kapasite kontrolü ve resize çağrısı olmadan, dizi dolduğunda items[count] sınırların dışına taşar.",
      explanationIncorrect: "items.length'e ulaşıldığında resize çağrılmazsa, bir sonraki items[count] atama satırı array sınırlarını aşar.",
    },
    {
      id: "ar3",
      type: "fill-blank",
      prompt: "resize() metodunda eski elemanları yeni diziye taşıyan döngü satırını yaz.",
      codeBefore: "String[] copy = new String[newCapacity];",
      codeAfter: "items = copy;",
      answer: "for (int i = 0; i < count; i++) copy[i] = items[i];",
      hint: "Sadece count kadar elemanı kopyalamak yeterli — tüm kapasiteyi değil.",
      explanationCorrect: "Doğru! count kadar eleman tek tek yeni diziye kopyalanır.",
      explanationIncorrect: "Döngü, 0'dan count'a kadar (count dahil değil) her elemanı yeni diziye kopyalamalı: for (int i = 0; i < count; i++) copy[i] = items[i];",
    },
    {
      id: "ar4",
      type: "predict-output",
      prompt:
        "Kapasitesi 2 olan boş bir dynamic array'e sırayla 'a', 'b', 'c' eklendiğinde, 'c' eklendikten sonra dizinin KAPASİTESİ kaç olur?",
      code: 'add("a"); add("b"); add("c"); // başlangıç kapasitesi: 2',
      answer: "4",
      hint: "'c' eklenirken dizi doluydu (2/2); repeated doubling kuralını uygula.",
      explanationCorrect: "Doğru! 'c' eklenirken dizi doluydu, resize(2*2) çağrıldı, kapasite 4 oldu.",
      explanationIncorrect: "'a' ve 'b' eklenince kapasite (2) dolar. 'c' eklenmeden önce resize tetiklenir ve kapasite 2*2=4 olur.",
    },
    {
      id: "ar5",
      type: "bigo-match",
      prompt: "Dynamic array işlemlerini doğru karmaşıklıkla eşleştir.",
      pairs: [
        { operation: "arr[i] ile erişim", complexity: "O(1)" },
        { operation: "add() (amortized)", complexity: "O(1)" },
        { operation: "add() (worst-case, resize anında)", complexity: "O(n)" },
        { operation: "arr'ın ortasına eleman eklemek (kaydırma gerekir)", complexity: "O(n)" },
      ],
      hint: "Resize nadir olsa da, tam o anda gerçekleşirse O(n) sürer; amortized analiz bunu diziye yayar.",
      explanationCorrect: "Index erişimi her zaman O(1). add() genelde O(1) ama resize anında O(n); amortized olarak yine O(1) sayılır. Ortaya eleman eklemek, sonrakileri kaydırmayı gerektirdiği için O(n).",
      explanationIncorrect: "Index erişimi O(1)'dir. add() amortized O(1) olsa da, resize'ın gerçekleştiği o tek an O(n)'dir. Ortaya ekleme de kaydırma nedeniyle O(n)'dir.",
    },
    {
      id: "ar6",
      type: "reorder-lines",
      prompt: "add() metodunun gövdesini doğru sıraya diz.",
      shuffledLines: ["count++;", "if (count == items.length) resize(items.length * 2);", "items[count] = item;"],
      correctOrder: [1, 2, 0],
      hint: "Önce yer var mı kontrol edilir, sonra eleman konur, en son sayaç artırılır.",
      explanationCorrect: "Doğru sıra: önce kapasite kontrolü/resize, sonra eleman yerleştirme, en son sayaç artırma.",
      explanationIncorrect: "count++ en son gelmeli; önce yer kontrolü (resize gerekiyorsa) ve eleman yerleştirme yapılmalı.",
    },
  ],
  miniBoss: [
    {
      id: "armb1",
      prompt: "Array'de index ile erişim neden hızlıdır?",
      options: ["Elemanlar sıralı olduğu için", "Bitişik bellek + matematiksel adres hesaplama", "Her zaman küçük olduğu için", "Java otomatik önbellekleme yaptığı için"],
      correctIndex: 1,
      explanation: "Bitişik bellek düzeni sayesinde adres doğrudan hesaplanır, arama gerekmez: O(1).",
    },
    {
      id: "armb2",
      prompt: "Dynamic array kapasitesi dolduğunda ne olur?",
      options: ["Program hata verir", "Yeni, daha büyük bir dizi oluşturulup elemanlar kopyalanır", "Eski elemanlar silinir", "Kapasite otomatik sınırsız olur"],
      correctIndex: 1,
      explanation: "Repeated doubling: kapasite iki katına çıkarılır, eski elemanlar yeni diziye kopyalanır.",
    },
    {
      id: "armb3",
      prompt: "Amortized O(1) ne demektir?",
      options: [
        "Her işlem tam olarak 1 saniye sürer",
        "Ortalama olarak, her işlem sabit zaman alır (bazı nadir pahalı işlemler olsa bile)",
        "Her zaman en kötü durum O(1)'dir",
        "Sadece ilk işlem hızlıdır",
      ],
      correctIndex: 1,
      explanation: "Amortized analiz, nadir resize maliyetini tüm add() çağrılarına yayar; ortalama maliyet O(1) çıkar.",
    },
    {
      id: "armb4",
      prompt: "Bir array'in ortasına eleman eklemek neden O(n) sürer?",
      options: [
        "Java bunu desteklemediği için",
        "Ekleme noktasından sonraki tüm elemanları bir sağa kaydırmak gerektiği için",
        "Array'ler sıralı tutulmak zorunda olduğu için",
        "Her zaman resize tetiklendiği için",
      ],
      correctIndex: 1,
      explanation: "Yeni elemana yer açmak için ondan sonraki tüm elemanlar kaydırılmalıdır — bu da n'e bağlı bir maliyettir.",
    },
    {
      id: "armb5",
      prompt: "items.length ile count arasındaki fark nedir?",
      options: [
        "İkisi de aynı şeydir",
        "items.length toplam kapasite, count ise gerçekten dolu olan eleman sayısıdır",
        "count her zaman items.length'ten büyüktür",
        "items.length sadece debug amaçlıdır",
      ],
      correctIndex: 1,
      explanation: "items.length dizinin ayrılmış toplam kapasitesidir; count ise şu anda kaç elemanın gerçekten kullanıldığını gösterir.",
    },
  ],
  summary: [
    "Array, elemanları bitişik bellekte tutar; index ile erişim her zaman O(1)'dir.",
    "Java array'leri sabit boyutludur — büyütmek için yeni bir array oluşturup kopyalamak gerekir.",
    "Dynamic array (ArrayList'in temeli), 'repeated doubling' ile kapasiteyi ikiye katlayarak add() işlemini amortized O(1) yapar.",
    "items.length (kapasite) ile count (dolu eleman sayısı) farklı kavramlardır, karıştırılmamalı.",
    "Array'in ortasına ekleme/silme, kaydırma gerektirdiği için O(n) sürer.",
  ],
};
