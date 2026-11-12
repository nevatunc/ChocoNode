import type { Lesson } from "@/lib/types";

const loopCode = [
  {
    code: "public static int sumUpTo(int n) {",
    what: "1'den n'e kadar olan sayıların toplamını hesaplayan bir metod.",
    why: "Basit bir döngünün karmaşıklığını analiz etmek için iyi bir örnek.",
  },
  {
    code: "    int total = 0;",
    what: "Toplamı tutacak değişken, 0'dan başlar.",
    why: "—",
  },
  {
    code: "    for (int i = 1; i <= n; i++) {",
    what: "1'den n'e kadar her sayı için döngü.",
    why: "Döngü n kez çalışır — bu yüzden bu kısım O(n)'dir.",
    commonMistake: "i <= n yerine i < n yazmak: son sayıyı (n) atlar, yanlış sonuç verir.",
  },
  {
    code: "        total += i;",
    what: "Her adımda i'yi total'a ekler.",
    why: "Bu satır sabit zamanlıdır (O(1)), ama döngü içinde n kez çalışır.",
  },
  {
    code: "    }",
    what: "Döngünün sonu.",
    why: "—",
  },
  {
    code: "    return total;",
    what: "Hesaplanan toplamı döndürür.",
    why: "O(1) işlem.",
  },
  {
    code: "}",
    what: "Metodun sonu. Toplam karmaşıklık: O(n).",
    why: "n kere çalışan bir döngü + sabit zamanlı işlemler = O(n).",
  },
];

export const bigOLesson: Lesson = {
  id: "big-o",
  moduleNumber: 1,
  title: "Complexity ve Big-O",
  isExamScope: true,
  structureKind: "none",
  chocolateAnalogy: {
    setup:
      "Bir siparişi hazırlama süresi, kutudaki çikolata sayısına bağlı mı değil mi? 1 çikolatayı paketlemek sabit sürer, ama 100 farklı çeşidi tek tek kontrol etmek sipariş büyüdükçe uzar.",
    whereItEnds:
      "Benzetme burada bitiyor: Big-O gerçek saniyeleri değil, girdi büyüdükçe işlem sayısının nasıl BÜYÜDÜĞÜNÜ (büyüme mertebesini) ölçer — donanımdan bağımsız bir ölçüdür.",
  },
  intro:
    "Complexity analysis (karmaşıklık analizi), bir algoritmanın girdi boyutu (n) büyüdükçe ne kadar yavaşladığını anlamamızı sağlar. Big-O notasyonu, en kötü durumdaki (worst-case) büyüme mertebesini ifade eder: O(1) sabit, O(log n) logaritmik, O(n) doğrusal, O(n log n), O(n²) karesel gibi.",
  codeBlocks: [{ id: "loop-analysis", title: "Döngü analizi: O(n)", lines: loopCode }],
  traces: [],
  exercises: [
    {
      id: "bo1",
      type: "bigo-match",
      prompt: "Her işlemi doğru Big-O sınıfıyla eşleştir.",
      pairs: [
        { operation: "Array'de index ile erişim: arr[i]", complexity: "O(1)" },
        { operation: "Sıralı (sorted) array'de binary search", complexity: "O(log n)" },
        { operation: "Array'i baştan sona tek tek taramak", complexity: "O(n)" },
        { operation: "İç içe iki döngü ile tüm çiftleri karşılaştırmak", complexity: "O(n²)" },
      ],
      hint: "Binary search her adımda arama alanını yarıya indirir; bu logaritmik büyümenin tanımıdır.",
      explanationCorrect: "Index erişimi sabit zaman, binary search logaritmik, tek döngü doğrusal, iç içe döngü karesel büyür.",
      explanationIncorrect: "Büyüme hızına dikkat: her adımda alanı yarılayan algoritmalar O(log n); n elemanı bir kez gezen O(n); her elemanı diğer herkesle karşılaştıran O(n²)'dir.",
    },
    {
      id: "bo2",
      type: "predict-output",
      prompt:
        "sumUpTo(5) çağrıldığında döngü kaç kez çalışır (toplam total değerini değil, DÖNGÜ ÇALIŞMA SAYISINI yaz)?",
      code: "for (int i = 1; i <= n; i++) { total += i; }  // n = 5",
      answer: "5",
      hint: "i, 1'den n'e kadar (n dahil) kaç farklı değer alır?",
      explanationCorrect: "Doğru, i sırasıyla 1,2,3,4,5 değerlerini alır — toplam 5 kez çalışır, yani O(n).",
      explanationIncorrect: "i <= n koşulu, i=1'den i=n'e kadar (n dahil) toplam n defa çalışmayı sağlar. n=5 için 5 kez.",
    },
    {
      id: "bo3",
      type: "multiple-choice",
      prompt: "Aşağıdakilerden hangisi n büyüdükçe EN YAVAŞ büyür (en verimlisidir)?",
      options: ["O(n²)", "O(n log n)", "O(log n)", "O(n)"],
      correctIndex: 2,
      hint: "Büyüme hızına göre sırala: O(1) < O(log n) < O(n) < O(n log n) < O(n²).",
      explanationCorrect: "Doğru! O(log n), listelenenler arasında girdi büyüdükçe en yavaş artan (en verimli) olandır.",
      explanationIncorrect: "Büyüme sırası: O(log n) < O(n) < O(n log n) < O(n²). O(log n) burada en verimlisidir.",
    },
    {
      id: "bo4",
      type: "find-bug",
      prompt: "Bu kodun karmaşıklığını O(n) sanan bir öğrenci yanılıyor. Hangi satır asıl karmaşıklığı O(n²) yapıyor?",
      buggyCode: "for (int i = 0; i < n; i++) {\n    for (int j = 0; j < n; j++) {\n        count++;\n    }\n}",
      buggyLine: 1,
      fixedLine: "İç içe iki döngü olduğu için (satır 2), toplam çalışma n * n = O(n²)'dir.",
      hint: "Dış döngü n kez çalışıyor, ama her dış döngü adımında iç döngü de n kez çalışıyor.",
      explanationCorrect: "Doğru tespit! İç içe döngüler çarpılır: n * n = n², bu yüzden karmaşıklık O(n²)'dir, O(n) değil.",
      explanationIncorrect: "Dış döngünün her adımında iç döngü tekrar n kez çalışır: toplam n*n = O(n²).",
    },
    {
      id: "bo5",
      type: "fill-blank",
      prompt: "Bir dizinin ortasına bakıp aranan değerden büyük/küçük olduğuna göre yarısını eleyen arama algoritmasının adı nedir?",
      codeBefore: "Sıralı bir array'de aranan değeri bulmak için kullanılan,",
      codeAfter: "algoritmasının karmaşıklığı O(log n)'dir.",
      answer: "binary search",
      hint: "Türkçesi 'ikili arama'dır ama derste İngilizce terim kullanılır.",
      explanationCorrect: "Doğru, binary search (ikili arama) her adımda arama alanını yarıya indirir.",
      explanationIncorrect: "Aranan terim 'binary search' — her karşılaştırmada arama alanını yarıya indiren algoritma.",
    },
    {
      id: "bo6",
      type: "reorder-lines",
      prompt: "Büyüme mertebelerini EN HIZLI'dan EN YAVAŞ'a (yani O(1) en başta) doğru sıraya diz.",
      shuffledLines: ["O(n²)", "O(1)", "O(n log n)", "O(log n)", "O(n)"],
      correctOrder: [1, 3, 4, 2, 0],
      hint: "Sabit, logaritmik, doğrusal, doğrusal-logaritmik, karesel sırasını hatırla.",
      explanationCorrect: "Doğru sıra: O(1) < O(log n) < O(n) < O(n log n) < O(n²).",
      explanationIncorrect: "Büyüme sırası her zaman: O(1), O(log n), O(n), O(n log n), O(n²) şeklindedir.",
    },
  ],
  miniBoss: [
    {
      id: "bomb1",
      prompt: "Big-O notasyonu ne ölçer?",
      options: [
        "Programın tam çalışma süresini saniye cinsinden",
        "Girdi büyüdükçe işlem sayısının büyüme mertebesini (worst-case)",
        "Kullanılan RAM miktarını her zaman",
        "Kodun satır sayısını",
      ],
      correctIndex: 1,
      explanation: "Big-O, donanımdan bağımsız olarak, girdi (n) büyüdükçe işlem sayısının nasıl büyüdüğünü ifade eder.",
    },
    {
      id: "bomb2",
      prompt: "arr[5] ile bir array elemanına index üzerinden erişmek hangi karmaşıklıktadır?",
      options: ["O(n)", "O(log n)", "O(1)", "O(n²)"],
      correctIndex: 2,
      explanation: "Array'de index ile erişim her zaman sabit zamanlıdır: O(1).",
    },
    {
      id: "bomb3",
      prompt: "İç içe iki döngü genellikle hangi karmaşıklığı gösterir?",
      options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
      correctIndex: 2,
      explanation: "Her biri n kez çalışan iki iç içe döngü, toplamda n*n = O(n²) işlem yapar.",
    },
    {
      id: "bomb4",
      prompt: "Amortized (amortize) analiz ne anlama gelir?",
      options: [
        "Her işlemin her zaman aynı sürede çalıştığı garantisi",
        "Bir dizi işlemin ortalama maliyetinin, tek bir pahalı işlemle değil, toplam üzerinden hesaplanması",
        "Sadece en iyi durumun (best-case) analiz edilmesi",
        "Belleğin amorti edilmesi",
      ],
      correctIndex: 1,
      explanation: "Amortized analiz, resizing array gibi yapılarda nadiren pahalı olan işlemlerin maliyetini, tüm işlem dizisine yayarak ortalama bir sonuç verir.",
    },
    {
      id: "bomb5",
      prompt: "Worst-case (en kötü durum) analizi neden tercih edilir?",
      options: [
        "Her zaman en iyimser senaryoyu gösterdiği için",
        "Algoritmanın hiçbir girdi için bu sınırı aşmayacağının garantisini verdiği için",
        "Hesaplaması daha kolay olduğu için her zaman",
        "Ortalama durumdan daha hızlı olduğu için",
      ],
      correctIndex: 1,
      explanation: "Worst-case analiz, 'bu algoritma ne olursa olsun bu sınırı aşmaz' garantisini verir — bu da güvenilir performans tahmini sağlar.",
    },
  ],
  summary: [
    "Big-O, girdi (n) büyüdükçe işlem sayısının büyüme mertebesini ifade eder; gerçek saniyeleri değil.",
    "Yaygın mertebeler, hızdan yavaşa: O(1), O(log n), O(n), O(n log n), O(n²).",
    "Tek bir döngü genelde O(n), iç içe iki döngü genelde O(n²) verir.",
    "Binary search, sıralı veride arama alanını her adımda yarıya indirerek O(log n) sağlar.",
    "Amortized analiz, resizing array gibi yapılarda nadir pahalı işlemlerin maliyetini tüm diziye yayar.",
  ],
};
