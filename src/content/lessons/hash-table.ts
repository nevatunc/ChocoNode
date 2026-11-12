import type { Lesson } from "@/lib/types";

const hashCode = [
  {
    code: "public class LabeledDrawer<Value> {",
    what: "Chaining (zincirleme) ile çarpışma çözen basit bir hash table sınıfı.",
    why: "—",
  },
  {
    code: "    private LinkedList<Value>[] buckets;",
    what: "Her 'çekmece' (bucket), bir bağlı liste tutar — aynı çekmeceye düşen birden fazla eleman burada zincirlenir.",
    why: "Chaining: iki farklı anahtar aynı index'e hash'lenirse (çarpışma/collision), ikisi de aynı bağlı listede tutulur.",
  },
  {
    code: "    private int hash(String key) {",
    what: "Bir String anahtarı, bucket index'ine dönüştüren hash fonksiyonu.",
    why: "—",
  },
  {
    code: "        return Math.abs(key.hashCode()) % buckets.length;",
    what: "Java'nın yerleşik hashCode()'unu alıp bucket sayısına göre mod alır.",
    why: "Mod işlemi, hangi değer gelirse gelsin sonucu 0 ile buckets.length-1 arasına sıkıştırır.",
    commonMistake: "Math.abs() kullanmamak: hashCode() negatif olabilir, negatif bir index ile array erişimi hataya yol açar.",
  },
  {
    code: "    }",
    what: "hash metodunun sonu.",
    why: "—",
  },
  {
    code: "    public void put(String key, Value value) {",
    what: "Bir anahtar-değer çiftini hash table'a ekler.",
    why: "—",
  },
  {
    code: "        int i = hash(key);",
    what: "Anahtarın hangi çekmeceye (bucket) gideceği hesaplanır.",
    why: "—",
  },
  {
    code: "        buckets[i].add(key, value);",
    what: "Çift, o çekmecenin bağlı listesine eklenir.",
    why: "Eğer o çekmecede zaten başka anahtarlar varsa (çarpışma), yeni çift listeye eklenir — hiçbir veri kaybolmaz.",
  },
  {
    code: "    }",
    what: "put metodunun sonu.",
    why: "—",
  },
  {
    code: "}",
    what: "Sınıfın sonu.",
    why: "—",
  },
];

export const hashTableLesson: Lesson = {
  id: "hash-table",
  moduleNumber: 10,
  title: "Hash Table",
  isExamScope: false,
  structureKind: "hash",
  chocolateAnalogy: {
    setup:
      "Etiketli çekmeceli bir dolap düşün: her çikolatanın ismine bakıp (ör. 'bitter') bir formülle hangi çekmeceye konacağına karar verirsin. Aynı isimdeki çikolataları aramak için tüm dolabı değil, sadece o çekmeceyi kontrol edersin.",
    whereItEnds:
      "Benzetme burada bitiyor: bazen iki farklı isim AYNI çekmeceye düşebilir (çarpışma/collision) — gerçek bir dolapta bu bir sorun olurdu, ama hash table'da chaining (zincirleme) gibi tekniklerle bu durum zarifçe çözülür.",
  },
  intro:
    "Hash table, bir anahtarı (key) bir hash fonksiyonu ile bir bucket index'ine dönüştürüp, değeri (value) o bucket'ta saklayan bir veri yapısıdır. Doğru çalışan bir hash fonksiyonu ve yeterli bucket sayısıyla, ortalama durumda get/put işlemleri O(1) sürer. İki farklı anahtar aynı bucket'a düşerse buna collision (çarpışma) denir; en yaygın çözüm yöntemi chaining'dir (her bucket'ı bir bağlı liste yapmak).",
  codeBlocks: [{ id: "hash-put", title: "put() — hash fonksiyonu ve chaining", lines: hashCode }],
  traces: [
    {
      id: "hash-trace",
      title: "put(\"nane\", ...) ve çarpışma durumu",
      codeBlockId: "hash-put",
      steps: [
        {
          highlightLine: 6,
          structure: { buckets: [["bitter"], [], ["sütlü"], []], highlightBucket: undefined },
          explanation: "Mevcut durum: 4 bucket var. 'bitter' bucket 0'da, 'sütlü' bucket 2'de.",
        },
        {
          highlightLine: 6,
          structure: { buckets: [["bitter"], [], ["sütlü"], []], highlightBucket: 0, pending: "nane" },
          explanation: "hash(\"nane\") hesaplanıyor ve sonucun 0 olduğu bulunuyor — bu, 'bitter' ile AYNI bucket! Bir çarpışma (collision) oluşacak.",
        },
        {
          highlightLine: 7,
          structure: { buckets: [["bitter", "nane"], [], ["sütlü"], []], highlightBucket: 0 },
          explanation: "Chaining sayesinde 'nane', bucket 0'ın bağlı listesine EKLENİR, üzerine yazılmaz. 'bitter' hâlâ kayıtlı.",
          consoleOutput: "put(\"nane\", ...) → bucket 0: [bitter, nane]",
        },
      ],
    },
  ],
  exercises: [
    {
      id: "ht1",
      type: "multiple-choice",
      prompt: "İki farklı anahtar aynı bucket index'ine hash'lenirse buna ne denir?",
      options: ["Hash table hatası", "Collision (çarpışma)", "Overflow", "Underflow"],
      correctIndex: 1,
      hint: "İngilizce terim, 'çarpışmak' fiilinin karşılığıdır.",
      explanationCorrect: "Doğru! Bu duruma collision (çarpışma) denir ve chaining ya da open addressing gibi tekniklerle çözülür.",
      explanationIncorrect: "Bu duruma 'collision' (çarpışma) denir — bir hata değildir, hash table'ların doğal bir parçasıdır ve chaining gibi tekniklerle çözülür.",
    },
    {
      id: "ht2",
      type: "find-bug",
      prompt: "Bu hash() metodu bazen negatif index üretip ArrayIndexOutOfBoundsException fırlatıyor. Hangi kısım eksik?",
      buggyCode: "private int hash(String key) {\n    return key.hashCode() % buckets.length;\n}",
      buggyLine: 1,
      fixedLine: "Math.abs(key.hashCode()) % buckets.length; olmalı — Math.abs() eksik.",
      hint: "hashCode() her zaman pozitif bir sayı mı döndürür?",
      explanationCorrect: "Doğru! hashCode() negatif değer döndürebilir; mod işleminden sonra da sonuç negatif kalabilir. Math.abs() bunu önler.",
      explanationIncorrect: "hashCode() negatif olabilir, bu durumda % işlemi de negatif bir sonuç verebilir. Math.abs() ile bu düzeltilmeli: Math.abs(key.hashCode()) % buckets.length.",
    },
    {
      id: "ht3",
      type: "fill-blank",
      prompt: "put() metodunda, anahtarın hangi bucket'a gideceğini hesaplayan satırı yaz.",
      codeBefore: "public void put(String key, Value value) {",
      codeAfter: "    buckets[i].add(key, value);\n}",
      answer: "int i = hash(key);",
      hint: "Daha önce tanımlanan hash() metodunu çağırman gerekiyor.",
      explanationCorrect: "Doğru! int i = hash(key); ile anahtarın gideceği bucket index'i hesaplanır.",
      explanationIncorrect: "Eksik satır: int i = hash(key); — bu, anahtarı hangi bucket'a yerleştireceğimizi belirler.",
    },
    {
      id: "ht4",
      type: "predict-output",
      prompt: "4 bucket'lı bir hash table'da hash(\"a\") = 2 ve hash(\"b\") = 2 ise, put(\"a\",1) ve put(\"b\",2) çağrıldıktan sonra bucket 2'de kaç eleman olur?",
      code: 'put("a", 1); put("b", 2); // ikisi de bucket 2\'ye hash\'leniyor',
      answer: "2",
      hint: "Chaining, çarpışan elemanları ÜZERİNE YAZMAZ, aynı bucket'ın listesine ekler.",
      explanationCorrect: "Doğru! Chaining sayesinde ikisi de aynı bucket'ta (bağlı liste içinde) saklanır, biri diğerinin üzerine yazılmaz.",
      explanationIncorrect: "Chaining ile çarpışan elemanlar bucket'ın bağlı listesine EKLENİR, üzerine yazılmaz — bucket 2'de hem 'a' hem 'b' bulunur, toplam 2 eleman.",
    },
    {
      id: "ht5",
      type: "bigo-match",
      prompt: "Hash table işlemlerini doğru karmaşıklıkla eşleştir (iyi dağılmış hash fonksiyonu varsayımıyla).",
      pairs: [
        { operation: "put(key, value) — ortalama durum", complexity: "O(1)" },
        { operation: "get(key) — ortalama durum", complexity: "O(1)" },
        { operation: "get(key) — tüm anahtarlar aynı bucket'a düşerse (kötü hash fonksiyonu)", complexity: "O(n)" },
        { operation: "Tüm anahtar-değer çiftlerini gezmek", complexity: "O(n)" },
      ],
      hint: "İyi bir hash fonksiyonu elemanları eşit dağıtır; kötü bir fonksiyon herkesi tek bir bucket'a (bağlı listeye) yığabilir.",
      explanationCorrect: "İyi dağılım varsayımıyla put/get ortalama O(1)'dir. Ama kötü bir hash fonksiyonu herkesi tek bucket'a yığarsa, o bucket'taki bağlı liste n elemanlı olur ve arama O(n)'ye düşer.",
      explanationIncorrect: "Normal şartlarda put/get O(1)'dir (iyi dağılım varsayımıyla). Kötü bir hash fonksiyonu, tüm elemanları tek bucket'a yığarsa performans O(n)'ye düşer.",
    },
    {
      id: "ht6",
      type: "reorder-lines",
      prompt: "put() metodunun gövdesini doğru sıraya diz.",
      shuffledLines: ["buckets[i].add(key, value);", "int i = hash(key);"],
      correctOrder: [1, 0],
      hint: "Önce bucket index'i hesaplanır, sonra o bucket'a ekleme yapılır.",
      explanationCorrect: "Doğru sıra: önce hash(key) ile index hesaplanır, sonra o index'teki bucket'a eleman eklenir.",
      explanationIncorrect: "Bucket index'i (i) önce hesaplanmalı, çünkü ekleme işlemi bu index'i (buckets[i]) kullanıyor.",
    },
  ],
  miniBoss: [
    {
      id: "htmb1",
      prompt: "Hash table'ın temel fikri nedir?",
      options: [
        "Elemanları sıralı tutmak",
        "Bir anahtarı hash fonksiyonu ile bir bucket index'ine dönüştürüp orada saklamak",
        "Her elemanı ikili ağaçta tutmak",
        "Elemanları her zaman array'in başına eklemek",
      ],
      correctIndex: 1,
      explanation: "Hash table, hash fonksiyonu sayesinde bir anahtarı doğrudan bir bucket index'ine eşler — bu da ortalama O(1) erişim sağlar.",
    },
    {
      id: "htmb2",
      prompt: "Collision (çarpışma) ne zaman oluşur?",
      options: [
        "Hash table boşken",
        "İki farklı anahtar aynı bucket index'ine hash'lendiğinde",
        "Sadece String anahtarlarda",
        "Hiçbir zaman oluşmaz",
      ],
      correctIndex: 1,
      explanation: "Farklı anahtarların aynı bucket'a düşmesi, hash table'ların doğal ve beklenen bir durumudur.",
    },
    {
      id: "htmb3",
      prompt: "Chaining, çarpışmayı nasıl çözer?",
      options: [
        "Çarpışan elemanı siler",
        "Her bucket'ı bir bağlı liste yaparak, çarpışan tüm elemanları aynı listede tutar",
        "Hash table'ı yeniden boyutlandırır",
        "Hata fırlatır",
      ],
      correctIndex: 1,
      explanation: "Chaining, her bucket'a birden fazla eleman sığdırmak için bir bağlı liste kullanır — hiçbir veri kaybolmaz.",
    },
    {
      id: "htmb4",
      prompt: "İyi bir hash fonksiyonunun özelliği nedir?",
      options: [
        "Her zaman aynı bucket'ı döndürmesi",
        "Elemanları bucket'lara olabildiğince eşit (düzgün) dağıtması",
        "Sadece sayılarla çalışması",
        "Yavaş olması",
      ],
      correctIndex: 1,
      explanation: "İyi bir hash fonksiyonu, farklı anahtarları mümkün olduğunca eşit şekilde bucket'lara dağıtarak çarpışmaları ve uzun zincirleri azaltır.",
    },
    {
      id: "htmb5",
      prompt: "Java'nın HashMap sınıfı hangi veri yapısının bir implementasyonudur?",
      options: ["Stack", "Binary tree", "Hash table", "Queue"],
      correctIndex: 2,
      explanation: "java.util.HashMap, chaining (ve belirli koşullarda red-black tree) kullanan bir hash table implementasyonudur.",
    },
  ],
  summary: [
    "Hash table, bir anahtarı hash fonksiyonu ile bucket index'ine dönüştürüp değeri orada saklar.",
    "İyi dağılmış bir hash fonksiyonuyla put/get işlemleri ortalama O(1) sürer.",
    "Collision (çarpışma), iki farklı anahtarın aynı bucket'a düşmesidir — doğal ve beklenen bir durumdur.",
    "Chaining, her bucket'ı bir bağlı liste yaparak çarpışan elemanları kayıpsız saklar.",
    "Kötü bir hash fonksiyonu tüm elemanları tek bucket'a yığarsa, performans O(n)'ye düşebilir.",
  ],
};
