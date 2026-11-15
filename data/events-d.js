/* GECE DEVRİYESİ — hikâye, bölüm D. */
(function () {
  "use strict";

  const events = [
    {
      id: "ruzgar",
      title: "Çatıdaki Rüzgâr",
      place: "Karakol · Çatı",
      art: "roof",
      kicker: "GECE 4 · 04:30 · RÜZGÂR",
      text: (s) => [
        "Çatıda rüzgâr var. Şehrin ışıkları, ayağının altında bir devre kartı gibi uzanıyor. Araba sesleri buraya kadar incelmiş, neredeyse müzik gibi.",
        `Ayakkabılarınla betonun arasında ince bir mesafe var. ${s.shoe.name} burada bile ayağını bırakmıyor. Siyah taytın, rüzgârda soğuyor.`
      ],
      choices: [
        {
          label: "Ayakkabıları çıkar, betonun soğuğunu hisset.",
          fx: { konfor: 5, sinir: 7, temizlik: -3, enerji: 1 },
          min: 46,
          result: "Çıplak ayakla betona basıyorsun. Soğuk, önce canını yakıyor; sonra uyuşturuyor. Şehir, bir an daha az gürültülü.",
          next: "sahil"
        },
        {
          label: "Min-ho'yla sessizce otur.",
          fx: { sinir: 8, itibar: 2, enerji: 1 },
          min: 50,
          result: "Min-ho yanına oturuyor. İkiniz de konuşmuyorsunuz. Onun omzu, seninkine değiyor. Rüzgâr, aradaki boşluğu dolduruyor.",
          next: "partner"
        },
        {
          label: "Anneni ara.",
          fx: { sinir: 6, enerji: 2 },
          min: 52,
          result: "Telefon iki kez çalıyor. \"Yuna? Saat kaç?\" Sesindeki panik, seni güldürüyor. \"İyiyim anne. Sadece sesini duymak istedim.\"",
          next: "telefon"
        },
        {
          label: "Telsizi kapat, iki dakika kimse olma.",
          fx: { sinir: 10, itibar: -2, enerji: 2 },
          min: 44,
          result: "Telsizi kapatıyorsun. Dünya susuyor. İki dakika boyunca kimse seni aramıyor. Bu, bir lüks değil; bir ihtiyaç.",
          next: "gozyasi"
        }
      ]
    },

    {
      id: "telefon",
      title: "Busan'dan Arayan",
      place: "Karakol · Arka Merdiven",
      art: "station",
      kicker: "GECE 4 · 04:38 · TELEFON",
      text: [
        "Telefonunda annenin adı. Busan'dan, sabahın erken saatinde. Muhtemelen uyumadı. Muhtemelen senin de uyumadığını biliyor.",
        "\"Yuna,\" diyor. \"Sesin yorgun.\" Bir anne, bin kilometre uzaktan bile bilebiliyor."
      ],
      choices: [
        {
          label: "İyi olduğunu söyle, sesini gülümset.",
          fx: { sinir: 6, itibar: 1, enerji: 1 },
          min: 48,
          result: "\"İyiyim,\" diyorsun. \"Şehir sakin.\" Annen bir an susuyor. \"Yalan söylüyorsun,\" diyor. Ama gülümsüyor. İkiniz de biliyorsunuz.",
          next: "partner"
        },
        {
          label: "Ayakkabının kokusundan bahset, gül.",
          fx: { sinir: 8, koku: 1, enerji: 1 },
          min: 46,
          result: "\"Ayakkabım deniz kokuyor anne.\" Annen önce şaşırıyor, sonra kahkahayı basıyor. \"Kızım, ne yaptın sen?\" Anlatıyorsun. Busan'daymış gibi.",
          next: "firin"
        },
        {
          label: "Ağladığını belli etme, telefonu kapat.",
          fx: { sinir: -5, gozyasi: 1, enerji: -1 },
          min: 40,
          result: "\"İşe dönmem lazım,\" diyorsun. Annen \"Yuna\" diyor. Sen kapatıyorsun. Ekran kararıyor. Gözyaşın, ekranın üstünde bir leke.",
          next: "gozyasi"
        },
        {
          label: "Gerçeği anlat: \"Yoruldum.\"",
          fx: { sinir: 10, enerji: 2, flags: { durust: true } },
          min: 54,
          result: "Sessizlik. Sonra annen: \"Biliyorum.\" Başka bir şey söylemiyor. Söylemesine gerek yok. Omuzların gevşiyor.",
          next: "ruzgar"
        }
      ]
    },

    {
      id: "kaptan",
      title: "Dörtte Bir Değerlendirme",
      place: "Karakol · Kaptan Oh'un Odası",
      art: "station",
      kicker: "GECE 4 · 04:46 · DOSYA",
      text: [
        "Kaptan Oh, masasının arkasında. Önünde senin dosyan. Üç yıl, dört ay, iki hafta. Sayılar, bir hayatı özetlemek için çok küçük.",
        "\"Gece 4'ün en dikkatli memuru olabilirsin,\" diyor. \"Ama kendine de dikkat et.\" Gözlüklerinin üstünden bakıyor. \"Bu bir emir.\""
      ],
      choices: [
        {
          label: "Raporu dürüstçe anlat.",
          fx: { itibar: 8, sinir: -2, enerji: -1 },
          min: 56,
          result: "Her şeyi anlatıyorsun: köprüyü, kazayı, ağladığın lavaboyu. Kaptan Oh dinliyor. Not almıyor. Bu, daha da ciddi.",
          next: "sahil"
        },
        {
          label: "Duygusal olduğunu kabul et.",
          fx: { sinir: 10, itibar: 3, enerji: 1 },
          min: 52,
          result: "\"Bazen ağlıyorum,\" diyorsun. Kaptan Oh bir an bakıyor. \"Ben de,\" diyor. Sonra dosyayı kapatıyor. Konu kapanmış gibi. Ama kapanmamış.",
          next: "ruzgar"
        },
        {
          label: "Sadece rakamları söyle.",
          fx: { itibar: 5, sinir: -4, enerji: -1 },
          min: 44,
          result: "Tutuklama sayısı, devriye sayısı, rapor sayısı. Kaptan Oh başını sallıyor. \"Rakamlar iyi,\" diyor. \"Ya sen?\" Cevap vermiyorsun.",
          next: "karakol"
        },
        {
          label: "Ona çay yap.",
          fx: { itibar: 5, enerji: 3, sinir: 4 },
          min: 48,
          result: "Çayı masaya bırakıyorsun. Kaptan Oh bir yudum alıyor. \"Fazla demlemişsin,\" diyor. \"Ama fena değil.\" Bu, onun teşekkürü.",
          next: "firin"
        }
      ]
    },

    {
      id: "corap-krizi",
      title: "Kaçan İlmek",
      place: "Gece 4 · Araç İçi",
      art: "car",
      kicker: "ZİNCİR · ÇORAP KRIZİ",
      text: (s) => [
        "Kapıyı kapatırken bir ses: cırt. Taytının dizinde küçük bir ilmek kaçmış. Sonra daha büyük bir ilmek. Çorabın da bir yerinde ince bir çizgi.",
        `${s.sock.name} ve siyah tayt, artık ilk günkü gibi değil. Kimse görmez. Ama sen her adımda hissediyorsun.`
      ],
      choices: [
        {
          label: "Çantadaki yedek çorabı giy.",
          fx: { konfor: 6, sinir: 4, temizlik: 2 },
          min: 46,
          result: "Yedek çorap, bacağında temiz bir sayfa. Taytın ilmeği hâlâ orada; ama artık daha az önemli.",
          next: "karakol"
        },
        {
          label: "Şeffaf ojeyle ilmeği durdur.",
          fx: { temizlik: 2, sinir: 3, konfor: 1 },
          min: 40,
          result: "Oje, ilmeği bir mühür gibi kapatıyor. Küçük bir zafer. Ellerin ojeyle kaplanıyor; ama gece kurtuldu.",
          next: "pazar"
        },
        {
          label: "Görmezden gel, devam et.",
          fx: { konfor: -4, sinir: -2 },
          min: 36,
          result: "İlmeği görmezden geliyorsun. Her adımda biraz daha büyüyor. Gece, küçük şeylerin büyümesine izin veriyor.",
          next: "bulvar"
        },
        {
          label: "Taytı çıkar, çorabı düzelt.",
          fx: { konfor: 10, sinir: -6, itibar: -2, flags: { taytsiz: true } },
          min: 42,
          result: "Taytı çıkarıyorsun. Bacağın, üniformanın altında çıplak. Özgür ve tuhaf. Çorabı düzeltiyorsun. Kimse fark etmiyor; sen fark ediyorsun.",
          next: "ayna"
        }
      ]
    },

    {
      id: "gozyasi",
      title: "Tuzlu Su",
      place: "Gece 4 · Bir Yerde",
      art: "river",
      kicker: "ZİNCİR · GÖZYAŞI",
      text: (s) => [
        "Gözyaşları, artık tutulamıyor. Nerede olduğun önemli değil; bir arabanın içi, bir köprü, bir lavabo. Hep aynı yer.",
        `Ağlarken ayakkabılarına bakıyorsun. ${s.shoe.name}. Gece boyunca taşıdığın küçük, sessiz dünya. Gözyaşın ayakkabının burnuna düşüyor.`
      ],
      choices: [
        {
          label: "Derin nefes al, gözyaşlarını sil.",
          fx: { sinir: 9, gozyasi: 1, enerji: 1 },
          min: 44,
          result: "Üç nefes. Dört. Gözyaşları duruyor. Yüzün şiş; ama nefesin düzenli. Bu da bir şey.",
          next: "karakol"
        },
        {
          label: "Min-ho'ya sarıl.",
          fx: { sinir: 12, itibar: 2, enerji: 1 },
          min: 48,
          result: "Min-ho bir an donuyor. Sonra kollarını açıyor. Sarılma, kısa ve sıkı. \"Tamam,\" diyor. \"Tamam.\"",
          next: "partner"
        },
        {
          label: "Rimelini düzelt, aynaya bak.",
          fx: { sinir: 4, itibar: 3, enerji: 1 },
          min: 40,
          result: "Rimelini düzeltiyorsun. Aynadaki kadın hâlâ biraz dağınık; ama dışarı çıkabilir. Kapıyı açıyorsun.",
          next: "ayna"
        },
        {
          label: "Ağlamaya devam et. Yağmura karışsın.",
          fx: { sinir: -2, gozyasi: 1, enerji: 2, konfor: 1 },
          min: 50,
          result: "Ağlıyorsun. Yağmur da ağlıyor. İkiniz aynı şeyi yapıyorsunuz. Sonra yağmur duruyor; sen de duruyorsun.",
          next: "ruzgar"
        }
      ]
    },

    {
      id: "kayip-cuzdan",
      title: "Islak Cüzdan",
      place: "Sejong Bulvarı · Kaldırım",
      art: "street",
      kicker: "GECE 4 · KÜÇÜK BULUNTU",
      text: [
        "Kaldırımda ıslak bir cüzdan. İçinde bir kimlik, iki kredi kartı ve bir çocuk fotoğrafı. Fotoğraftaki çocuk, dişlerini göstermeden gülümsüyor.",
        "Cüzdanın sahibi, belki de şu an onu arıyor. Belki de hiç fark etmedi. İkisi de mümkün."
      ],
      choices: [
        {
          label: "Sahibini bul, kapısına götür.",
          fx: { itibar: 7, enerji: -3, sinir: 4 },
          min: 60,
          result: "Adresi buluyorsun. Kapıyı bir adam açıyor. Cüzdanı görünce gözleri doluyor. \"Karımın fotoğrafı,\" diyor. Sana sarılıyor. Sen izin veriyorsun.",
          next: "firin"
        },
        {
          label: "İçindekileri kontrol et, nakit say.",
          fx: { itibar: -4, sinir: -2, enerji: 1 },
          min: 44,
          result: "İçinde 30 bin won var. Sayıyorsun. Kendine neden saydığını soruyorsun. Cevap yok. Cüzdanı kapatıyorsun.",
          next: "pazar"
        },
        {
          label: "Karakola bırak.",
          fx: { itibar: 4, sinir: 2, enerji: 2 },
          min: 40,
          result: "Cüzdanı nöbet masasına bırakıyorsun. Memur kaydediyor. Küçük bir iş. Ama gece, küçük işlerden oluşuyor.",
          next: "karakol"
        },
        {
          label: "Cebine koy, sabah hallederim.",
          fx: { itibar: -6, sinir: 2, enerji: 1 },
          min: 38,
          result: "Cüzdanı cebine koyuyorsun. Ağırlığı, bacağında küçük bir suç gibi duruyor. Sabah, diyorsun. Sabah çok uzak.",
          next: "gozyasi"
        }
      ]
    },

    {
      id: "kavga",
      title: "İki Ses",
      place: "Mapo · Apartman Girişi",
      art: "alley",
      kicker: "GECE 4 · 04:55 · BAĞIRIŞ",
      text: [
        "Apartman girişinde iki ses. Bir adam, bir kadın. Kelimeler birbirine karışıyor; hangisinin ne dediğini anlamıyorsun. Ama öfkeyi anlıyorsun.",
        "Kapı aralık. İçeride bir çocuk sesi var. Sonra susuyor. Bu sessizlik, bağırıştan daha korkutucu."
      ],
      choices: [
        {
          label: "Araya gir, tarafları ayır.",
          fx: { enerji: -6, sinir: -3, itibar: 6, kurtarma: 1 },
          min: 60,
          result: "İkisini de iki adım geri çekiyorsun. Adam bağırıyor, kadın ağlıyor. Sen ortada duruyorsun. Siyah taytın, bir sınır çizgisi gibi.",
          next: "hastane"
        },
        {
          label: "Önce çocukları kontrol et.",
          fx: { sinir: -4, itibar: 5, kurtarma: 1 },
          min: 54,
          result: "İçeri giriyorsun. Küçük bir çocuk, mutfak masasının altında. Elinde bir çorap. \"Annem nerede?\" diye soruyor. \"Buradayım,\" diyorsun.",
          next: "cocuk"
        },
        {
          label: "Sakinleştirici konuş.",
          fx: { sinir: 2, itibar: 4, enerji: -2 },
          min: 52,
          result: "Sesini alçaltıyorsun. İki taraf da dinliyor. Bağırışlar, cümlelere dönüşüyor. Cümleler, sorulara. Gece, biraz daha az karanlık.",
          next: "karakol"
        },
        {
          label: "Geri çekil, destek bekle.",
          fx: { itibar: -3, sinir: -2, enerji: 1 },
          min: 46,
          result: "Geri çekiliyorsun. Destek üç dakika sonra geliyor. O üç dakika boyunca içerideki sesleri dinliyorsun. Hiçbiri susmuyor.",
          next: "otopark"
        }
      ]
    }
  ];

  window.STORY_EVENTS = (window.STORY_EVENTS || []).concat(events);
})();
