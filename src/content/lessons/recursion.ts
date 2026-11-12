import type { Lesson } from "@/lib/types";

const factorialCode = [
  {
    code: "public static int factorial(int n) {",
    what: "n! (n faktöriyel) hesaplayan recursive (kendini çağıran) bir metod.",
    why: "—",
  },
  {
    code: "    if (n == 0) return 1;",
    what: "Base case (temel durum): n=0 ise doğrudan 1 döner, daha fazla çağrı yapılmaz.",
    why: "Her recursive fonksiyonun bir base case'i olmalı, yoksa çağrılar sonsuza kadar sürer (stack overflow).",
    commonMistake: "Base case'i unutmak: fonksiyon hiç durmadan kendini çağırır ve StackOverflowError fırlatılır.",
  },
  {
    code: "    return n * factorial(n - 1);",
    what: "Recursive case: n! = n * (n-1)!, fonksiyon kendini daha küçük bir girdiyle çağırır.",
    why: "Her çağrı, problemi bir adım küçültüp aynı yapıdaki alt probleme devreder — bu da call stack'te birikir.",
  },
  {
    code: "}",
    what: "Metodun sonu.",
    why: "—",
  },
];

export const recursionLesson: Lesson = {
  id: "recursion",
  moduleNumber: 6,
  title: "Recursion (Özyineleme)",
  isExamScope: true,
  structureKind: "sequence",
  chocolateAnalogy: {
    setup:
      "Bir kakao ağacının dallarını düşün: her dal, kendisinden daha küçük dallara ayrılır, ta ki artık dallanamayan en küçük uca (yaprağa) ulaşana kadar.",
    whereItEnds:
      "Benzetme burada bitiyor: recursion'da her çağrı, Java'nın 'call stack'ine (fonksiyon çağrı yığınına) eklenir — fiziksel bir dal gibi değil, gerçek bir Stack veri yapısı kullanılır; çok derin recursion gerçek bellek sınırına çarpar (StackOverflowError).",
  },
  intro:
    "Recursion (özyineleme), bir fonksiyonun kendisini çağırmasıdır. Her recursive fonksiyonun mutlaka bir base case'i (temel durum — çağrıların durduğu nokta) ve bir recursive case'i (problemi küçültüp kendini tekrar çağırdığı kısım) olmalıdır. Derleyici, her çağrıyı call stack adlı bir Stack veri yapısına push eder; fonksiyon bittiğinde pop edilir — bu yüzden Stack modülüyle doğrudan bağlantılıdır.",
  codeBlocks: [{ id: "factorial", title: "factorial(n) — recursive hesaplama", lines: factorialCode }],
  traces: [
    {
      id: "factorial-trace",
      title: "factorial(3) çağrıldığında call stack",
      codeBlockId: "factorial",
      steps: [
        {
          highlightLine: 2,
          structure: { nodes: ["factorial(3)"], top: "factorial(3)" },
          explanation: "factorial(3) çağrılır, call stack'e push edilir. n=0 olmadığı için recursive case'e geçilir.",
        },
        {
          highlightLine: 2,
          structure: { nodes: ["factorial(3)", "factorial(2)"], top: "factorial(2)" },
          explanation: "factorial(3), factorial(2)'yi çağırır. İkisi de şimdi call stack'te.",
        },
        {
          highlightLine: 2,
          structure: { nodes: ["factorial(3)", "factorial(2)", "factorial(1)"], top: "factorial(1)" },
          explanation: "factorial(2), factorial(1)'i çağırır.",
        },
        {
          highlightLine: 1,
          structure: { nodes: ["factorial(3)", "factorial(2)", "factorial(1)", "factorial(0)"], top: "factorial(0)" },
          explanation: "factorial(1), factorial(0)'ı çağırır. n=0 olduğu için base case'e ulaşıldı: 1 döner.",
          consoleOutput: "factorial(0) → 1 (base case)",
        },
        {
          highlightLine: 2,
          structure: { nodes: ["factorial(3)", "factorial(2)"], top: "factorial(2)", saved: "factorial(1) = 1" },
          explanation: "factorial(1) = 1 * factorial(0) = 1 * 1 = 1. factorial(1) call stack'ten pop edilir (döner).",
        },
        {
          highlightLine: 2,
          structure: { nodes: ["factorial(3)"], top: "factorial(3)", saved: "factorial(2) = 2" },
          explanation: "factorial(2) = 2 * factorial(1) = 2 * 1 = 2. factorial(2) pop edilir.",
        },
        {
          highlightLine: 2,
          structure: { nodes: [], top: "" },
          explanation: "factorial(3) = 3 * factorial(2) = 3 * 2 = 6. factorial(3) pop edilir, call stack boşalır.",
          consoleOutput: "factorial(3) → 6",
        },
      ],
    },
  ],
  exercises: [
    {
      id: "rc1",
      type: "find-bug",
      prompt: "Bu recursive metod StackOverflowError fırlatıyor. Hangi satır eksik?",
      buggyCode: "public static int factorial(int n) {\n    return n * factorial(n - 1);\n}",
      buggyLine: 1,
      fixedLine: "if (n == 0) return 1; base case'i eksik.",
      hint: "Çağrılar ne zaman durmalı?",
      explanationCorrect: "Doğru! Base case olmadan fonksiyon sonsuza kadar kendini çağırır (n negatife gider), call stack taşar.",
      explanationIncorrect: "Base case eksik: if (n == 0) return 1; olmadan recursion hiç durmaz ve StackOverflowError oluşur.",
    },
    {
      id: "rc2",
      type: "predict-output",
      prompt: "factorial(4) çağrısı hangi değeri döndürür?",
      code: "factorial(4) // 4 * 3 * 2 * 1 * factorial(0)",
      answer: "24",
      hint: "4! = 4 × 3 × 2 × 1",
      explanationCorrect: "Doğru! 4! = 4×3×2×1 = 24.",
      explanationIncorrect: "4! = 4 × 3 × 2 × 1 × 1(base case) = 24.",
    },
    {
      id: "rc3",
      type: "multiple-choice",
      prompt: "Recursive bir fonksiyon çok derin çağrı yaparsa (ör. factorial(100000)) ne olur?",
      options: [
        "Program otomatik olarak iterative hale gelir",
        "StackOverflowError fırlatılır — call stack belleği taşar",
        "Java bu durumu sessizce optimize eder",
        "Sonuç her zaman 0 olur",
      ],
      correctIndex: 1,
      hint: "Her çağrı call stack'e push edilir; stack'in de bir boyut sınırı vardır.",
      explanationCorrect: "Doğru! Call stack'in sınırlı bir boyutu vardır; çok derin recursion bu sınırı aşarsa StackOverflowError oluşur.",
      explanationIncorrect: "Java bazı durumlarda 'tail call optimization' yapmaz; çok derin recursion gerçekten call stack'i taşırıp StackOverflowError fırlatır.",
    },
    {
      id: "rc4",
      type: "fill-blank",
      prompt: "Fibonacci sayılarını hesaplayan recursive metodun base case'ini yaz (n=0 → 0, n=1 → 1).",
      codeBefore: "public static int fib(int n) {",
      codeAfter: "    return fib(n-1) + fib(n-2);\n}",
      answer: "if (n <= 1) return n;",
      hint: "n=0 için 0, n=1 için 1 dönmeli — tek satırda ikisini de karşılayan bir koşul yaz.",
      explanationCorrect: "Doğru! if (n <= 1) return n; hem n=0 hem n=1 durumunu tek satırda karşılar.",
      explanationIncorrect: "Base case: if (n <= 1) return n; — n 0 veya 1 ise doğrudan n döner, daha fazla çağrı yapılmaz.",
    },
    {
      id: "rc5",
      type: "reorder-lines",
      prompt: "factorial(n) metodunun gövdesini doğru sıraya diz.",
      shuffledLines: ["return n * factorial(n - 1);", "if (n == 0) return 1;"],
      correctOrder: [1, 0],
      hint: "Base case her zaman recursive case'ten ÖNCE kontrol edilmelidir.",
      explanationCorrect: "Doğru sıra: önce base case kontrolü, sonra recursive case.",
      explanationIncorrect: "Base case kontrolü (if n==0) her zaman recursive çağrıdan önce gelmelidir, yoksa hiç kontrol edilmeden sonsuz çağrı başlar.",
    },
    {
      id: "rc6",
      type: "multiple-choice",
      prompt: "Her recursive algoritma, stack kullanarak iterative (döngüsel) hale getirilebilir mi?",
      options: [
        "Hayır, bazı algoritmalar sadece recursive yazılabilir",
        "Evet, bir explicit (açık) Stack veri yapısı kullanarak her recursion iterative hale getirilebilir",
        "Sadece factorial gibi basit örnekler için mümkündür",
        "Bu, sadece Java'da mümkün değildir",
      ],
      correctIndex: 1,
      hint: "Derleyici zaten call stack kullanıyor — biz de kendi Stack'imizi kullanabiliriz.",
      explanationCorrect: "Doğru! Derleyicinin örtük olarak yaptığı call stack işlemini, kendi Stack veri yapımızla açıkça (explicit) taklit edebiliriz.",
      explanationIncorrect: "Her recursive algoritma, kendi Stack'imizi kullanarak iterative hale getirilebilir — derleyici zaten arka planda bunu yapıyor.",
    },
  ],
  miniBoss: [
    {
      id: "rcmb1",
      prompt: "Her recursive fonksiyonun mutlaka sahip olması gereken şey nedir?",
      options: ["Bir döngü", "Bir base case (temel durum)", "Bir array parametresi", "Bir static değişken"],
      correctIndex: 1,
      explanation: "Base case olmadan recursion asla durmaz ve StackOverflowError oluşur.",
    },
    {
      id: "rcmb2",
      prompt: "Derleyici, her fonksiyon çağrısını nereye kaydeder?",
      options: ["Heap'e", "Call stack'e (bir Stack veri yapısı)", "Bir Queue'ya", "Bir HashMap'e"],
      correctIndex: 1,
      explanation: "Her fonksiyon çağrısı call stack'e push edilir; fonksiyon bittiğinde pop edilir — LIFO davranışı.",
    },
    {
      id: "rcmb3",
      prompt: "Çok derin recursion hangi hataya yol açabilir?",
      options: ["NullPointerException", "StackOverflowError", "ArrayIndexOutOfBoundsException", "ClassCastException"],
      correctIndex: 1,
      explanation: "Call stack'in boyutu sınırlıdır; çok derin recursion bu sınırı aşarsa StackOverflowError fırlatılır.",
    },
    {
      id: "rcmb4",
      prompt: "factorial(5) çağrısı, factorial(4)'ü çağırdıktan sonra sonucu nasıl hesaplar?",
      options: [
        "factorial(4)'ün sonucunu görmezden gelir",
        "5 * factorial(4)'ün sonucu şeklinde çarpar",
        "factorial(4) ile toplar",
        "Hiçbir hesap yapmaz, direkt döner",
      ],
      correctIndex: 1,
      explanation: "Recursive case: n! = n * (n-1)!. factorial(5), factorial(4)'ün dönüş değerini bekler ve 5 ile çarpar.",
    },
    {
      id: "rcmb5",
      prompt: "Recursive bir algoritma her zaman iterative bir algoritmadan daha mı yavaştır?",
      options: [
        "Evet, her zaman",
        "Hayır, tam tersine her zaman daha hızlıdır",
        "Değişir; recursion ekstra call stack overhead'i getirir ama bazı problemler (ör. tree traversal) recursive yazıldığında çok daha okunaklıdır",
        "İkisi arasında hiç performans farkı olmaz",
      ],
      correctIndex: 2,
      explanation: "Recursion genelde biraz overhead getirir (her çağrı stack'e eklenir), ama bazı problemler için (ağaç gezme gibi) çok daha doğal ve okunaklıdır.",
    },
  ],
  summary: [
    "Recursion, bir fonksiyonun kendisini çağırmasıdır; her zaman bir base case ve bir recursive case içermelidir.",
    "Base case olmadan recursion durmaz ve StackOverflowError oluşur.",
    "Her fonksiyon çağrısı, derleyici tarafından call stack'e (bir Stack veri yapısı) push edilir, bittiğinde pop edilir.",
    "Call stack'in boyutu sınırlıdır; çok derin recursion bu sınırı aşabilir.",
    "Her recursive algoritma, kendi (explicit) Stack veri yapımızı kullanarak iterative hale getirilebilir.",
  ],
};
