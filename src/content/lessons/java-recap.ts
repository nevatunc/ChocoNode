import type { Lesson } from "@/lib/types";

const classCode = [
  {
    code: "public class ChocolateBar {",
    what: "Bir sınıf (class) tanımlar — kendi veri tipimizi oluştururuz.",
    why: "Java'da her şey bir sınıfın içinde yaşar; nesne yönelimli programlamanın temel birimi budur.",
  },
  {
    code: "    private String flavor;",
    what: "Sınıfın bir alanı (field/instance variable).",
    why: "private olması, flavor'a sadece bu sınıfın içinden erişilebileceği anlamına gelir — encapsulation (kapsülleme).",
    commonMistake: "Tüm alanları public yapmak: dışarıdan istenmeyen değişikliklere açık hale getirir.",
  },
  {
    code: "    public ChocolateBar(String flavor) {",
    what: "Constructor (kurucu metod) — sınıf adıyla aynı isimde, dönüş tipi yok.",
    why: "Yeni bir nesne oluşturulurken alanların ilk değerlerini ayarlamak için kullanılır.",
  },
  {
    code: "        this.flavor = flavor;",
    what: "Parametre olarak gelen flavor'ı, nesnenin kendi alanına atar.",
    why: "this, 'bu nesnenin kendisi' demektir; parametre ile alan aynı isimde olduğunda ayrım yapmak gerekir.",
    commonMistake: "this olmadan flavor = flavor; yazmak: bu sadece parametreyi kendine atar, alanı hiç etkilemez.",
  },
  {
    code: "    }",
    what: "Constructor'ın sonu.",
    why: "—",
  },
  {
    code: "    public String getFlavor() {",
    what: "Getter metodu — flavor alanının değerini dışarı verir.",
    why: "private alanlara kontrollü erişim sağlamanın standart yolu budur.",
  },
  {
    code: "        return flavor;",
    what: "flavor değerini döndürür.",
    why: "—",
  },
  {
    code: "    }",
    what: "getFlavor metodunun sonu.",
    why: "—",
  },
  {
    code: "}",
    what: "Sınıfın sonu.",
    why: "—",
  },
];

const genericsCode = [
  {
    code: "public class ChocolateBox<T> {",
    what: "Generic (jenerik) bir sınıf — T, kullanım anında belirlenecek bir tip parametresidir.",
    why: "Aynı kutu sınıfını hem String hem Integer hem başka bir nesne türü için yeniden yazmadan kullanabilmek için.",
  },
  {
    code: "    private T content;",
    what: "Kutunun içeriği, T tipinde.",
    why: "Derleme zamanında hangi tipin kullanılacağı T ile garanti altına alınır.",
  },
  {
    code: "    public void put(T item) { this.content = item; }",
    what: "Kutuya bir eleman koyar.",
    why: "T parametre tipi sayesinde yanlış tipte bir eleman konulursa derleyici hemen hata verir.",
    commonMistake: "T yerine Object kullanmak: o zaman her erişimde cast (tip dönüşümü) gerekir ve run-time hatası riski doğar.",
  },
  {
    code: "    public T get() { return content; }",
    what: "Kutudaki elemanı döndürür, cast gerekmez.",
    why: "Generics'in asıl kazancı budur: tip güvenliği + cast'siz kullanım.",
  },
  {
    code: "}",
    what: "Sınıfın sonu.",
    why: "—",
  },
];

export const javaRecapLesson: Lesson = {
  id: "java-recap",
  moduleNumber: 0,
  title: "Java Hızlı Tekrar",
  isExamScope: false,
  structureKind: "none",
  chocolateAnalogy: {
    setup:
      "Bir çikolata dükkânı açmadan önce temel ekipmanı tanımak gerekir: kalıplar (sınıflar), tarifler (metodlar) ve her boyutta kutu kullanabilen genel kutu tasarımları (generics).",
    whereItEnds:
      "Benzetme burada bitiyor: Java'da sınıflar fiziksel kalıplar değil, veri + davranışı bir arada tutan soyut yapılardır.",
  },
  intro:
    "Bu derste, ileride veri yapıları (data structures) yazarken sürekli kullanacağımız Java temellerini hızlıca gözden geçiriyoruz: class (sınıf), constructor (kurucu metod), encapsulation (kapsülleme) ve generics (jenerikler). Zaten Java biliyorsan bu modülü hızlıca geçebilirsin.",
  codeBlocks: [
    { id: "class-basics", title: "Sınıf, constructor, encapsulation", lines: classCode },
    { id: "generics-basics", title: "Generics ile tip güvenliği", lines: genericsCode },
  ],
  traces: [],
  exercises: [
    {
      id: "jr1",
      type: "multiple-choice",
      prompt: "private bir alana dışarıdan nasıl kontrollü erişim sağlanır?",
      options: ["Alanı public yaparak", "Getter/setter metodları yazarak", "static anahtar kelimesiyle", "final anahtar kelimesiyle"],
      correctIndex: 1,
      hint: "Encapsulation'ın standart aracı hangisidir?",
      explanationCorrect: "Doğru. getFlavor() gibi public metodlar, private alana kontrollü bir 'kapı' açar.",
      explanationIncorrect: "private alana doğrudan erişilemez; dışarıya açmak için public getter/setter metodları yazılır.",
    },
    {
      id: "jr2",
      type: "find-bug",
      prompt: "Bu constructor'da bir hata var. Hangi satır eksik/yanlış?",
      buggyCode: "public ChocolateBar(String flavor) {\n    flavor = flavor;\n}",
      buggyLine: 1,
      fixedLine: "this.flavor = flavor; olmalı.",
      hint: "Parametre adı ile alan adı aynıysa, alana nasıl ayrım yapılır?",
      explanationCorrect: "Doğru. this.flavor = flavor; olmadan, satır sadece parametreyi kendine atar; nesnenin alanı hiç güncellenmez.",
      explanationIncorrect: "flavor = flavor; satırı aslında hiçbir şey yapmaz (parametre kendine atanır). this.flavor = flavor; gerekir.",
    },
    {
      id: "jr3",
      type: "fill-blank",
      prompt: "Generic bir sınıfın tip parametresini tanımlayan eksik kısmı yaz.",
      codeBefore: "public class ChocolateBox",
      codeAfter: "{\n    private T content;\n}",
      answer: "<T>",
      hint: "Köşeli parantez değil, açılı parantez kullanılır.",
      explanationCorrect: "Doğru, <T> sınıfın generic tip parametresini tanımlar.",
      explanationIncorrect: "Generic tip parametresi <T> şeklinde açılı parantezle yazılır (örn. ChocolateBox<T>).",
    },
    {
      id: "jr4",
      type: "predict-output",
      prompt: "Aşağıdaki kod ne yazdırır?\nChocolateBar bar = new ChocolateBar(\"bitter\");\nSystem.out.println(bar.getFlavor());",
      code: 'ChocolateBar bar = new ChocolateBar("bitter");\nSystem.out.println(bar.getFlavor());',
      answer: "bitter",
      hint: "Constructor flavor'ı nereye atıyor, getFlavor() neyi döndürüyor?",
      explanationCorrect: "Doğru! Constructor this.flavor = flavor; ile 'bitter'ı saklar, getFlavor() da onu döndürür.",
      explanationIncorrect: "Constructor'daki this.flavor = flavor; satırı 'bitter' değerini nesneye kaydeder; getFlavor() bu değeri döndürür.",
    },
    {
      id: "jr5",
      type: "reorder-lines",
      prompt: "Bir generic kutunun get() metodunu doğru sıraya diz (tek satırlık gövde parçaları).",
      shuffledLines: ["public T get() {", "return content;", "}"],
      correctOrder: [0, 1, 2],
      hint: "Metod imzası, gövde, kapanış parantezi sırası her zaman böyledir.",
      explanationCorrect: "Doğru sıra: önce metod imzası, sonra gövde (return), en son kapanış.",
      explanationIncorrect: "Bir metod her zaman imza → gövde → kapanış parantezi sırasıyla yazılır.",
    },
    {
      id: "jr6",
      type: "multiple-choice",
      prompt: "Object tipini generic yerine kullanmanın temel dezavantajı nedir?",
      options: [
        "Object daha fazla bellek kullanır",
        "Her erişimde cast gerekir ve yanlış tip hatası run-time'da ortaya çıkar",
        "Object ile metod yazılamaz",
        "Object sadece String'lerle çalışır",
      ],
      correctIndex: 1,
      hint: "Generics dersindeki 'derleme zamanı hatası vs. çalışma zamanı hatası' ayrımını hatırla.",
      explanationCorrect: "Doğru. Object kullanınca cast gerekir; yanlış tipte cast run-time'da ClassCastException fırlatır — generics bunu derleme zamanına taşır.",
      explanationIncorrect: "Asıl sorun bellek değil: Object tipi her yerde cast gerektirir ve tip hataları ancak programı çalıştırınca ortaya çıkar.",
    },
  ],
  miniBoss: [
    {
      id: "jrmb1",
      prompt: "Constructor'ın görevi nedir?",
      options: ["Nesneyi silmek", "Nesne oluşturulurken alanları ilklendirmek", "Statik metod çağırmak", "Interface uygulamak"],
      correctIndex: 1,
      explanation: "Constructor, new ile nesne oluşturulduğunda çağrılır ve alanların ilk değerlerini ayarlar.",
    },
    {
      id: "jrmb2",
      prompt: "this anahtar kelimesi neyi ifade eder?",
      options: ["Üst sınıfı", "Statik bir değişkeni", "Metodun çağrıldığı nesnenin kendisini", "Bir interface'i"],
      correctIndex: 2,
      explanation: "this, metodun veya constructor'ın çalıştığı nesnenin kendisine referanstır.",
    },
    {
      id: "jrmb3",
      prompt: "private bir alanın amacı nedir?",
      options: [
        "Programı hızlandırmak",
        "Alanı sadece sınıfın içinden erişilebilir yaparak encapsulation sağlamak",
        "Belleği azaltmak",
        "Sınıfı generic yapmak",
      ],
      correctIndex: 1,
      explanation: "private, alanın dışarıdan doğrudan değiştirilmesini engeller — kontrollü erişim (getter/setter) teşvik edilir.",
    },
    {
      id: "jrmb4",
      prompt: "Stack<Item> ifadesindeki Item neyi temsil eder?",
      options: ["Bir metod adı", "Generic tip parametresi", "Statik bir sabit", "Bir paket adı"],
      correctIndex: 1,
      explanation: "Item, Stack sınıfının generic tip parametresidir; kullanım anında String, Integer vb. ile doldurulur.",
    },
    {
      id: "jrmb5",
      prompt: "Autoboxing nedir?",
      options: [
        "İki sınıfı birleştirmek",
        "İlkel (primitive) tip ile onun wrapper (sarmalayıcı) tipi arasındaki otomatik dönüşüm",
        "Bir metodu override etmek",
        "Generic sınıf yaratmak",
      ],
      correctIndex: 1,
      explanation: "Autoboxing, örneğin int ile Integer arasında Java'nın otomatik yaptığı dönüşümdür (ör. Stack<Integer>.push(5)).",
    },
  ],
  summary: [
    "Bir Java sınıfı, alanlar (state) ve metodlar (davranış) birlikte tutar.",
    "Constructor, nesne oluşturulduğunda alanları ilklendirir; this ile parametre-alan çakışması çözülür.",
    "private alanlar + public getter/setter = encapsulation.",
    "Generics (<T>) sayesinde aynı sınıf farklı tipler için yeniden yazılmadan, tip güvenli şekilde kullanılabilir.",
    "Autoboxing, ilkel tiplerle generic yapıları (ör. Stack<Integer>) sorunsuz kullanmayı sağlar.",
  ],
};
