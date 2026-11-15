/* GECE DEVRİYESİ — devriye hattı.
   Ana hikâye döngüye girdiğinde devreye giren küçük, tek gecelik olaylar. */
(function () {
  "use strict";

  const events = [
    {
      id: "proc-sarhos",
      title: "Şarkı Söyleyen Adam",
      place: "Hongdae · Köşe Başı",
      art: "street",
      kicker: "DEVRİYE HATTI · GECE",
      text: [
        "Bir adam, boş bir meydanın ortasında, kendine ait olmayan bir şarkıyı söylüyor. Ayakkabıları elinde. Gözyaşları, gülümsemesinin içinden geçiyor.",
        "\"Memur hanım,\" diyor, \"beni evime götürür müsünüz? Karım beni bekliyor.\" Karısı üç yıl önce ölmüş. Bunu bilmiyor. Ya da biliyor."
      ],
      choices: [
        {
          label: "Adresini sor, evine götür.",
          fx: { itibar: 4, sinir: -2, enerji: -4, kurtarma: 1 },
          min: 58,
          result: "Adamı arabaya bindiriyorsun. Yol boyunca şarkı söylüyor. Evinin önünde susuyor. \"Burası,\" diyor. \"Ama o yok.\" Sen de susuyorsun.",
          next: "firin"
        },
        {
          label: "Yanına otur, şarkıyı dinle.",
          fx: { sinir: 6, enerji: 1, gozyasi: 1 },
          min: 50,
          result: "Yanına oturuyorsun. Şarkı, tanıdık bir melodi. Adamın sesi çatlıyor; seninkine karışıyor. Kimse geç kalmıyor.",
          next: "ruzgar"
        },
        {
          label: "Telsizle sağlık ekibi çağır.",
          fx: { itibar: 3, sinir: 1, enerji: -2 },
          min: 46,
          result: "Sağlık ekibi on dakika sonra geliyor. Adam sedyeye yatarken sana el sallıyor. El sallıyorsun. Gece, küçük bir vedayla kapanıyor.",
          next: "karakol"
        },
        {
          label: "Onu karakola götür, güvenli bir köşe bul.",
          fx: { itibar: 2, sinir: 3, enerji: -3 },
          min: 52,
          result: "Karakolda bir bank. Adam uyuyor. Sabaha kadar şarkı söylemiyor. Sen nöbet masasında, onun nefesini dinliyorsun.",
          next: "kaptan"
        }
      ]
    },

    {
      id: "proc-turist",
      title: "Kaybolmuş Bir Yabancı",
      place: "Myeongdong · Katedral Yanı",
      art: "market",
      kicker: "DEVRİYE HATTI · GECE",
      text: [
        "Elinde telefonu, başında şapkası, gözlerinde panik olan bir turist. Haritada bir yer arıyor. Haritada olmayan bir yer.",
        "\"Hotel... blue door?\" diyor. Telefonunu uzatıyor. Ekranda, gece çekilmiş bulanık bir fotoğraf: mavi bir kapı."
      ],
      choices: [
        {
          label: "Fotoğrafı incele, yolu tarif et.",
          fx: { itibar: 4, sinir: 4, enerji: -2 },
          min: 48,
          result: "Fotoğraftaki sokak lambasını tanıyorsun. Yolu tarif ediyorsun. Turist anlamıyor; sen yürümeye başlıyorsun. O da peşinden geliyor.",
          next: "itaewon"
        },
        {
          label: "Arabanın navigasyonundan ara.",
          fx: { itibar: 3, sinir: 3, enerji: 1 },
          min: 42,
          result: "Navigasyon, mavi kapıyı buluyor. Turist sevinçle bağırıyor. Bagajına vuruyor. Bir yabancının sevinci, geceyi ısıtıyor.",
          next: "pazar"
        },
        {
          label: "Karakoldan bir memur çağır, İngilizce bilen.",
          fx: { itibar: 5, sinir: 2, enerji: -1 },
          min: 50,
          result: "İngilizce bilen memur geliyor. Turist rahatlıyor. Sen kenara çekiliyorsun. Bazen yardım etmek, geri çekilmeyi de bilmek.",
          next: "metro"
        },
        {
          label: "Ona kendi telefonundan haritayı göster.",
          fx: { sinir: 5, itibar: 2, konfor: -1 },
          min: 40,
          result: "Haritayı gösteriyorsun. Turist başını sallıyor. \"Thank you.\" El sıkışıyorsunuz. Eli sıcak. Bir an, dünya küçülüyor.",
          next: "partner"
        }
      ]
    },

    {
      id: "proc-kedi-araba",
      title: "Motorun İçindeki Ses",
      place: "Euljiro · Park Yeri",
      art: "alley",
      kicker: "DEVRİYE HATTI · GECE",
      text: [
        "Park halindeki bir arabanın motor kaputundan ince bir miyav geliyor. Kaput sıcak. Kedi, sıcak bir yer bulmuş. Şimdi çıkamıyor.",
        "Arabanın sahibi yok. Kedi ise çok küçük. Elini uzatıyorsun; tırmalıyor. Sonra tekrar miyavlıyor."
      ],
      choices: [
        {
          label: "Kaputu dikkatlice aç, kediyi çıkar.",
          fx: { sinir: 7, temizlik: -4, konfor: -2, kurtarma: 1 },
          min: 54,
          result: "Kaput açılıyor. Kedi, yağlı bir köşeye sıkışmış. Eldivenlerinle alıyorsun. Küçük kalbi, avucunda hızlı hızlı atıyor.",
          next: "kedi"
        },
        {
          label: "Arabanın sahibini bul.",
          fx: { itibar: 4, enerji: -4, sinir: 2 },
          min: 56,
          result: "Plakadan sahibine ulaşıyorsun. Adam anahtarı getiriyor. Kedi, kaput açılınca kendiliğinden atlıyor. Teşekkür ediyor; sen kediyi izliyorsun.",
          next: "lastik"
        },
        {
          label: "İtfaiyeyi ara, bekle.",
          fx: { itibar: 3, sinir: 4, enerji: 2 },
          min: 48,
          result: "İtfaiye gelene kadar kediyi sakinleştirmeye çalışıyorsun. Sonunda çıkarıyorlar. Kedi, senin ayakkabının yanına sürtünüyor.",
          next: "otopark"
        },
        {
          label: "Kendi hâline bırak, gürültü yapar.",
          fx: { sinir: -4, itibar: -2 },
          min: 36,
          result: "Uzaklaşıyorsun. Miyav sesi arkanda kalıyor. Bir sokak sonra duruyorsun. Geri dönüyorsun. Ama araba artık yok.",
          next: "karakol"
        }
      ]
    },

    {
      id: "proc-yagmur",
      title: "Birden Bastıran",
      place: "Seul · Yağmur",
      art: "street",
      kicker: "DEVRİYE HATTI · SAĞANAK",
      text: (s) => [
        "Yağmur, bir anda. Gökyüzü bir kova devirmiş gibi. İnsanlar tentelerin altına kaçıyor. Sen ise ortadasın.",
        `Su, ${s.shoe.name.toLowerCase()}in üstünden akıyor. ${s.sock.name} çoktan ıslandı. Ayakkabının içinde küçük bir nehir var.`
      ],
      choices: [
        {
          label: "Bir tente altına gir, bekle.",
          fx: { nem: 6, sinir: 5, enerji: 2 },
          min: 46,
          result: "Tentenin altında üç kişi var. Bir kadın sana yer açıyor. Yağmuru birlikte izliyorsunuz. Kimse konuşmuyor. İyi geliyor.",
          next: "temizlik"
        },
        {
          label: "Yağmurun altında yürümeye devam et.",
          fx: { nem: 14, kum: 3, konfor: -4, sinir: 4, itibar: 1 },
          min: 50,
          result: "Yürüyorsun. Üniforma ağırlaşıyor. Ayakkabının içinde su, her adımda şapırdıyor. Ama gökyüzü, en azından açık.",
          next: "ruzgar"
        },
        {
          label: "Arabanın içine dön, silecekleri izle.",
          fx: { sinir: 6, enerji: 3, nem: 2 },
          min: 44,
          result: "Camda su çizgileri. Silecekler ritmik. Min-ho radyoyu açıyor. Şehir, camın ardında bir akvaryum.",
          next: "firin"
        },
        {
          label: "Islak ayakkabıyı çıkar, çorabı sık.",
          fx: { nem: -4, konfor: 4, temizlik: -2, sinir: 3 },
          min: 42,
          result: "Ayakkabıyı çıkarıyorsun. Su, kaldırıma damlıyor. Ayakların ıslak; ama en azından bir süre daha rahat. Sonra tekrar giyiyorsun.",
          next: "metro"
        }
      ]
    },

    {
      id: "proc-isik",
      title: "Kırmızı Işık",
      place: "Gangnam · Kavşak",
      art: "street",
      kicker: "DEVRİYE HATTI · SESSİZLİK",
      text: [
        "Kırmızı ışık. Uzun. Motor rölantide. Min-ho direksiyona yaslanmış, gözleri yarı kapalı. Radyoda bir piyano parçası.",
        "Yanındaki arabanın içinde bir kadın, direksiyonda ağlıyor. Işık değişene kadar. Sonra gidiyor. Kimse bir şey söylemiyor."
      ],
      choices: [
        {
          label: "Min-ho'ya sessizce bak.",
          fx: { sinir: 6, enerji: 2, itibar: 1 },
          min: 40,
          result: "Min-ho gözlerini açıyor. \"Ne?\" diyor. \"Hiç,\" diyorsun. Gülümsüyor. Işık yeşile dönüyor.",
          next: "ruzgar"
        },
        {
          label: "Yanındaki kadına el salla.",
          fx: { sinir: 5, itibar: 2, enerji: 1 },
          min: 38,
          result: "Kadın başını kaldırıyor. Şaşırıyor. Sonra el sallıyor. Gözyaşları içinde küçük bir gülümseme. Işık değişiyor. İkiniz de gidiyorsunuz.",
          next: "telefon"
        },
        {
          label: "Telsizden bir sonraki görevi öğren.",
          fx: { itibar: 4, sinir: -2, enerji: 1 },
          min: 42,
          result: "\"Gece 4, bir sonraki adres.\" Not alıyorsun. Görev, bir başka hayat. Ama önce bu kırmızı ışık bitmeli.",
          next: "karakol"
        },
        {
          label: "Radyonun sesini aç.",
          fx: { sinir: 4, enerji: 2 },
          min: 36,
          result: "Piyano, arabanın içini dolduruyor. Min-ho başını sallıyor. İkiniz de müziği sevmiyorsunuz. Ama susmaktan iyi.",
          next: "bulvar"
        }
      ]
    },

    {
      id: "proc-gazete",
      title: "Gazete Bayii",
      place: "Jongno · Kaldırım",
      art: "street",
      kicker: "DEVRİYE HATTI · KÂĞIT",
      text: [
        "Gazete bayii, bu saatte kapalı. Ama tezgâhta bir gazete var; ıslanmış, başlıkları dağılmış. Bir başlık: \"Gece polisleri tükeniyor.\"",
        "Yanında bir not: \"Lütfen bir tane alın. Parasını kutuya bırakın.\" Kutu yarı dolu. Şehir, küçük bir dürüstlük sınavı veriyor."
      ],
      choices: [
        {
          label: "Bir gazete al, parayı kutuya bırak.",
          fx: { itibar: 4, sinir: 4, enerji: 1 },
          min: 38,
          result: "Gazeteyi alıyorsun. Başlık, seni anlatıyor gibi. Kutuya para bırakıyorsun. Küçük bir işlem, geceyi biraz daha taşınabilir kılıyor.",
          next: "karakol"
        },
        {
          label: "Başlığı oku, gülümse.",
          fx: { sinir: 5, itibar: -1, enerji: 1 },
          min: 36,
          result: "\"Tükeniyor\" yazıyor. Sen tükenmedin. Henüz. Gazeteyi katlayıp cebine koyuyorsun. Kanıt olarak.",
          next: "kayip-cuzdan"
        },
        {
          label: "Notu düzelt: \"Hâlâ buradayız.\"",
          fx: { sinir: 7, itibar: 2, enerji: 1 },
          min: 40,
          result: "Kaleminle notun altına yazıyorsun: \"Hâlâ buradayız.\" Yazı, ıslak kâğıtta dağılıyor. Ama okunuyor.",
          next: "kaptan"
        },
        {
          label: "Hiçbir şey alma, devam et.",
          fx: { sinir: 1, itibar: 1, enerji: 2 },
          min: 32,
          result: "Geçiyorsun. Gazete, tezgâhta kalıyor. Arkanda, şehrin küçük bir suç ortaklığı gibi. Belki yarın alırsın.",
          next: "firin"
        }
      ]
    }
  ];

  window.PROC_EVENTS = events;
})();
