/* GECE DEVRİYESİ — hikâye, bölüm C. */
(function () {
  "use strict";

  const events = [
    {
      id: "araba",
      title: "Köprüye Doğru",
      place: "Gece 4 · Devriye Aracı",
      art: "car",
      kicker: "GECE 4 · 03:10 · TAKİP",
      text: (s) => [
        "Kaçakçı minibüsü, kırmızı ışıkta geçiyor. Min-ho gaza basıyor. Motor homurdanıyor. Siren, gecenin içinde bir bıçak gibi açılıyor.",
        s.shoe.heel > 5
          ? `Ayakların pedalların üstünde. ${s.shoe.name} topuğu, paspasın üstünde kayıyor. Fren mesafesi, bir santim daha uzuyor.`
          : `Ayakların pedalların üstünde rahat. ${s.shoe.name} işini biliyor. Ama şehir, her zaman daha hızlı.`
      ],
      choices: [
        {
          label: "Gaza bas, köprüye doğru sıkıştır.",
          fx: { enerji: -8, sinir: -5, itibar: 3, risk: 1 },
          min: 62,
          result: "Araç, minibüsün tamponuna yaklaşıyor. Min-ho bağırıyor: \"Çok yakın!\" Direksiyonu kırıyorsun. Dünya, bir an yana yatıyor.",
          next: "kaza"
        },
        {
          label: "Telsizden destek iste, takip mesafesini koru.",
          fx: { itibar: 6, sinir: 2, enerji: -2 },
          min: 54,
          result: "Mesafeyi koruyorsun. Telsizde iki ekip daha var. Minibüs, köprü girişinde yavaşlıyor. Kapana giriyor.",
          next: "otopark"
        },
        {
          label: "Direksiyonu Min-ho'ya ver, sen telsizi al.",
          fx: { sinir: 4, itibar: 3, enerji: 1 },
          min: 48,
          result: "Direksiyonu bırakıyorsun. Min-ho geçiyor. Sen telsizdesin. Sesin sakin. Ellerin titriyor ama sesin sakin.",
          next: "partner"
        },
        {
          label: "Vazgeç, plakayı al.",
          fx: { itibar: -4, sinir: 3, enerji: 1 },
          min: 44,
          result: "Fren yapıyorsun. Minibüs uzaklaşıyor. Plakayı not ediyorsun. Bazen durmak, devam etmekten daha zor.",
          next: "lastik"
        }
      ]
    },

    {
      id: "kaza",
      title: "Küçük Kaza",
      place: "Köprü Girişi",
      art: "car",
      kicker: "GECE 4 · 03:24 · ÇARPIŞMA",
      text: (s) => [
        "Ön tampon demire değiyor. Metal, metal. Araba savruluyor, hava yastığı yüzüne açılıyor. Bir saniye. İki. Sonra sessizlik.",
        `Min-ho'nun sesi uzaktan geliyor. Ayakkabın, pedaldan kaymış. ${s.shoe.name} hâlâ ayağında; ama sanki başka birinin ayağındaymış gibi.`
      ],
      choices: [
        {
          label: "Önce Min-ho'ya bak.",
          fx: { sinir: -4, itibar: 5, enerji: 2, kurtarma: 1 },
          min: 56,
          result: "\"İyi misin?\" Sesin çatlıyor. Min-ho başını sallıyor. Alnında küçük bir kesik var. Elini tutuyorsun. Sıcak.",
          next: "hastane"
        },
        {
          label: "Araçtan in, şüpheliyi kontrol et.",
          fx: { enerji: -5, konfor: -4, itibar: 4, tutuklama: 1 },
          min: 58,
          result: "Kapıyı tekmeleyerek açıyorsun. Şüpheli araçtan çıkmaya çalışıyor. Bacağı sıkışmış. Kemerini kesiyorsun. Elleri titriyor; seninki de.",
          next: "silah"
        },
        {
          label: "Ellerin titriyor; ağlamamak için dudağını ısır.",
          fx: { sinir: -8, gozyasi: 1 },
          min: 48,
          result: "Dudağında kan tadı. Gözyaşları geliyor. Direksiyona yaslanıyorsun. Min-ho arabadan iniyor, sana bakıyor. Bir şey söylemiyor.",
          next: "gozyasi"
        },
        {
          label: "Telsizle merkezi ara, rapor ver.",
          fx: { itibar: 6, enerji: -2, sinir: 2 },
          min: 52,
          result: "\"Gece 4, kaza. Yaralı yok. Şüpheli araç köprü girişinde.\" Sesin, kendini bile şaşırtacak kadar sakin. Rapor bittiğinde ellerin hâlâ titriyor.",
          next: "lastik"
        }
      ]
    },

    {
      id: "lastik",
      title: "Yağmurda Lastik",
      place: "Köprü Altı · Yağmur",
      art: "street",
      kicker: "GECE 4 · 03:36 · SAĞANAK",
      text: (s) => [
        "Sol arka lastik inmiş. Yağmur, artık sadece yağmur değil; bir duvar. Bagajdan krikoyu çıkarıyorsun. Ellerin ıslak, anahtar kaygan.",
        `Eğilmek zorundasın. ${s.shoe.name} bu pozisyonda daha da acıtıyor. Siyah taytın dizi, ıslak asfalta değiyor. Soğuk, doğrudan kemiğe geçiyor.`
      ],
      choices: [
        {
          label: "Topukluları çıkar, lastiği değiştir.",
          fx: { konfor: -3, temizlik: -5, nem: 8, itibar: 6, enerji: -4 },
          min: 64,
          result: "Ayakkabıları bir kenara koyuyorsun. Çıplak ayakla asfaltta dengede duruyorsun. Lastik sonunda yerine oturuyor. Ayakların buz, ama iş bitti.",
          next: "karakol"
        },
        {
          label: "Yol yardımı çağır, bekle.",
          fx: { enerji: 3, itibar: -2, sinir: 2 },
          min: 54,
          result: "Yol yardımı yirmi dakika diyor. Arabaya biniyorsun. Silecekler çalışıyor. Yağmur, camın ardında bir perde. Nefes alıyorsun.",
          next: "ruzgar"
        },
        {
          label: "Min-ho'ya değiştirt, sen şemsiye tut.",
          fx: { sinir: 3, itibar: -1, konfor: 2 },
          min: 50,
          result: "Min-ho lastiği değiştirirken şemsiyeyi onun üstünde tutuyorsun. Kendin ıslanıyorsun. \"Neden?\" diyor. \"Sıra bende,\" diyorsun.",
          next: "partner"
        },
        {
          label: "Yağmurda otur, ağla.",
          fx: { sinir: -5, gozyasi: 1, konfor: 2, nem: 4 },
          min: 46,
          result: "Kaldırımın kenarına oturuyorsun. Yağmur, gözyaşını saklıyor. Bu, en azından bir avantaj. Bir araba geçiyor. Sonra bir tane daha.",
          next: "gozyasi"
        }
      ]
    },

    {
      id: "silah",
      title: "Karanlık Sokak",
      place: "Euljiro · Arka Sokak",
      art: "alley",
      kicker: "GECE 4 · 03:48 · GERİLİM",
      text: [
        "Sokak lambası yanmıyor. Adamın eli beline gidiyor. Senin elin de. İkiniz de nefesinizi tutuyorsunuz. Uzakta bir köpek havlıyor; sonra susuyor.",
        "\"Sakin ol,\" diyorsun. Sesin, kendi kulaklarına yabancı geliyor. \"Ellerini görebileceğim yerde tut.\" Adam kımıldamıyor."
      ],
      choices: [
        {
          label: "Silahını çek, \"Ellerini göster!\" diye bağır.",
          fx: { sinir: -6, enerji: -4, itibar: 6, tutuklama: 1 },
          min: 58,
          result: "Silah, geceye bir çizgi çiziyor. Adam donuyor. Ellerini kaldırıyor. Belinde bir telefon var; silah değil. Nefesin geri geliyor.",
          next: "otopark"
        },
        {
          label: "Geri çekil, destek çağır.",
          fx: { itibar: 5, sinir: -2, enerji: -1 },
          min: 50,
          result: "Geri adım atıyorsun. Adam da atıyor. Telsizde \"destek\" diyorsun. İki ekip geliyor. Adam hâlâ orada; elleri hâlâ belinde.",
          next: "araba"
        },
        {
          label: "Konuşarak sakinleştir.",
          fx: { sinir: -5, itibar: 8, tutuklama: 1 },
          min: 56,
          result: "\"Kızımı arıyorum,\" diyor. \"Sadece onu arıyorum.\" Telefonu çıkarıyor. Ekranda bir çocuk fotoğrafı. Silah yok. Sadece bir baba.",
          next: "kavga"
        },
        {
          label: "Min-ho'yu öne it, sen arkadan çevir.",
          fx: { itibar: 4, sinir: -3, enerji: -2, tutuklama: 1 },
          min: 54,
          result: "Min-ho öne çıkıyor. Sen arkadan dolanıyorsun. Adam, iki polisin arasında kalıyor. Kelepçe klik sesi, gecenin en net sesi.",
          next: "kaza"
        }
      ]
    },

    {
      id: "sahte-polis",
      title: "Sahte Rozet",
      place: "Dongdaemun · Arka Sokak",
      art: "market",
      kicker: "GECE 4 · 04:00 · ŞÜPHE",
      text: [
        "Adamın ceketinde bir rozet var. Ama rozetin arkasındaki numara silinmiş. \"Gece 4'tenim,\" diyor. Sen Gece 4'tesin. Onu hiç görmedin.",
        "Sahte bir polis, gerçek bir polisten daha tehlikeli olabilir. Çünkü insanlar ona güveniyor."
      ],
      choices: [
        {
          label: "Rozetini sor, numarasını kontrol et.",
          fx: { itibar: 7, sinir: -2, enerji: -1 },
          min: 54,
          result: "\"Numaran?\" diyorsun. Adam bir numara söylüyor. Telsizde sorguluyorsun. Cevap: böyle bir memur yok. Adamın gülümsemesi donuyor.",
          next: "pazar"
        },
        {
          label: "Yanına sokul, bileğini tut.",
          fx: { enerji: -4, sinir: -3, itibar: 5, tutuklama: 1 },
          min: 50,
          result: "Bileğini kavrıyorsun. Adam şaşırıyor. Kelepçe, bileğinde kapanıyor. \"Sadece yardım ediyordum,\" diyor. \"Kimse seni yardıma çağırmadı.\"",
          next: "silah"
        },
        {
          label: "Uzaktan fotoğrafını çek, ekip çağır.",
          fx: { itibar: 4, sinir: 2, enerji: -2 },
          min: 44,
          result: "Fotoğrafı çekiyorsun. Adam fark ediyor, koşmaya başlıyor. Peşinden gitmiyorsun. Fotoğraf, bazen kovalamacadan daha iyi.",
          next: "otopark"
        },
        {
          label: "Polis olduğuna inan, yardım teklif et.",
          fx: { itibar: -8, sinir: -4, enerji: -2 },
          min: 48,
          result: "Adam seni bir sokak köşesine götürüyor. Sonra aniden dönüyor. Elinde bir bıçak var. Geri çekiliyorsun. Çok yakın.",
          next: "kavga"
        }
      ]
    },

    {
      id: "muze",
      title: "Müzede Alarm",
      place: "Seul Müzesi · Gece",
      art: "museum",
      kicker: "GECE 4 · 04:08 · ALARM",
      text: [
        "Müze koridoru, mavi acil ışıklarla yıkanıyor. Alarm, duvarların içinde bir kalp gibi atıyor. Bir vitrin kırılmış. Ama içindeki eser yerinde.",
        "Kırık camın yanında bir çocuk. On altı yaşında belki. Elinde bir fotoğraf makinesi. \"Ben sadece...\" diyor. \"Sadece bir fotoğraf.\""
      ],
      choices: [
        {
          label: "Çocuğu yakala, korkut ama incitme.",
          fx: { itibar: 5, enerji: -3, sinir: -2, tutuklama: 1 },
          min: 54,
          result: "Kolunu tutuyorsun. Çocuk direnmiyor. Fotoğraf makinesi yere düşüyor. Ekranda, vitrindeki eserin fotoğrafı var. Sadece bir fotoğraf.",
          next: "karakol"
        },
        {
          label: "Önce eseri kontrol et.",
          fx: { itibar: 7, sinir: 2, enerji: -2 },
          min: 48,
          result: "Eser sağlam. Vitrinin camı kırık, ama içerideki heykel yerinde. Derin bir nefes alıyorsun. Bazen iyi haber, küçük bir şeydir.",
          next: "kaptan"
        },
        {
          label: "Çocuğun neden kaçtığını dinle.",
          fx: { sinir: 5, itibar: 3, enerji: -2 },
          min: 56,
          result: "\"Babam burada çalışıyordu,\" diyor. \"Ölmeden önce bana bu müzeden bahsederdi.\" Sesi titriyor. Sen de titriyorsun.",
          next: "cocuk"
        },
        {
          label: "Alarmı kapat, raporu sonra yaz.",
          fx: { itibar: -5, sinir: 3, enerji: -1 },
          min: 46,
          result: "Alarmı kapatıyorsun. Sessizlik, kulaklarında çınlıyor. Çocukla birlikte dışarı çıkıyorsunuz. Rapor, sabaha kalıyor.",
          next: "ruzgar"
        }
      ]
    },

    {
      id: "sahil",
      title: "Kumun Üstünde",
      place: "Mangwon · Han Nehri Kıyısı",
      art: "beach",
      kicker: "GECE 4 · 04:20 · ŞAFAK YAKIN",
      text: (s) => [
        "Nehir kıyısında ince bir kum şeridi var. Şehir, arkanı dönmüş gibi. Su, karanlıkta yavaşça hareket ediyor. Uzakta bir köprü, bir mücevher gibi parlıyor.",
        `Ayakkabılarını çıkarıp çıkarmamak, bütün gece verdiğin en zor karar gibi geliyor. ${s.shoe.name} ayağında; kum ise sadece bir adım ötede.`
      ],
      choices: [
        {
          label: "Ayakkabıları çıkar, kuma bas.",
          fx: { konfor: 8, kum: 20, nem: 5, sinir: 7, temizlik: -3 },
          min: 52,
          result: "Kum, parmaklarının arasından geçiyor. Soğuk ve yumuşak. Gözlerini kapatıyorsun. Bir an, sadece bir an, polis değilsin.",
          next: "ruzgar"
        },
        {
          label: "Sadece çorapla yürü.",
          fx: { kum: 12, temizlik: -4, sinir: 5, konfor: 2 },
          min: 48,
          result: "Çorapla kuma basıyorsun. İnce kum, kumaşın gözeneklerinden içeri giriyor. Ayakkabılar elinde. Bu, küçük bir uzlaşma.",
          next: "temizlik"
        },
        {
          label: "Ayakkabına bak, deniz kokusunu içine çek.",
          fx: { koku: 4, sinir: 4, konfor: 1 },
          min: 44,
          result: "Ayakkabılarının içine bakıyorsun. Kum, su, küçük bir yaprak. Gece boyunca taşıdığın her şey. Güzel değil. Ama senin.",
          next: "gozyasi"
        },
        {
          label: "Hiç durma, arabaya dön.",
          fx: { enerji: 3, sinir: -2, temizlik: 1 },
          min: 38,
          result: "Kuma basmıyorsun. Arabaya dönüyorsun. Dikiz aynasında kıyı, küçük bir ışık çizgisi gibi kalıyor. Sonra kayboluyor.",
          next: "karakol"
        }
      ]
    }
  ];

  window.STORY_EVENTS = (window.STORY_EVENTS || []).concat(events);
})();
