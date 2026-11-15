/* GECE DEVRİYESİ — hikâye, bölüm B. */
(function () {
  "use strict";

  const events = [
    {
      id: "karakol",
      title: "Kâğıtların Arasında",
      place: "Karakol · Nöbet Masası",
      art: "station",
      kicker: "GECE 4 · MOLA",
      text: (s) => [
        "Nöbet masasında üç tutanak, bir soğumuş çay ve bir fincan kahve var. Radyo, dışarıdaki yağmuru haber veriyor. Klavyenin tuşları parmaklarının altında yumuşak.",
        s.stats.nem > 35
          ? `Ayakkabılarını çıkarmamak için kendini zor tutuyorsun. ${s.shoe.name} hâlâ nemli; her hareketinde hafif bir şapırtı.`
          : `Ayakkabıların kuru. ${s.sock.name} ayağında temiz bir çizgi gibi. Bu küçük düzen, kâğıtların arasında işe yarıyor.`
      ],
      choices: [
        {
          label: "Raporu yaz, imzala.",
          fx: { itibar: 6, enerji: -3, sinir: -1 },
          min: 58,
          result: "Cümleler kısa, tarih doğru. İmzanı atarken elin titriyor; ama imza düzgün çıkıyor. Bazen bu yeterli.",
          next: "kaptan"
        },
        {
          label: "Kahve al, pencerenin kenarına otur.",
          fx: { enerji: 7, konfor: 2, sinir: 4 },
          min: 46,
          result: "Kahve fazla sıcak. İlk yudumda dilin yanıyor. Acı, geceyi bir süre daha taşınabilir kılıyor.",
          next: "firin"
        },
        {
          label: "Çatıya çık, hava al.",
          fx: { sinir: 6, enerji: 2, konfor: -1 },
          min: 42,
          result: "Çatıda yağmur yüzüne çarpıyor. Şehrin ışıkları, suyun içinde eriyor. İki dakika kimse seni aramıyor.",
          next: "ruzgar"
        },
        {
          label: "Tuvalete gir, ağla.",
          fx: { sinir: -4, gozyasi: 1, enerji: 2 },
          min: 44,
          result: "Kapıyı kilitliyorsun. Sırtını duvara yaslıyorsun. Ağlamak, bir rapor yazmaktan daha kolay. Sonra musluğu açıp çıkıyorsun.",
          next: "gozyasi"
        }
      ]
    },

    {
      id: "otopark",
      title: "Betonun Altında",
      place: "Gangnam · Yeraltı Otoparkı",
      art: "alley",
      kicker: "GECE 4 · 01:30 · BETON",
      text: (s) => [
        "Yeraltı otoparkında hava ağır. Tavandan su damlıyor. Her damla, boş betonda bir adım gibi yankılanıyor. Arabanın kapılarını kilitliyorsun.",
        s.shoe.heel > 4
          ? `Topuklarının sesi, kendi adımlarından önce geliyor. ${s.shoe.name} burada bir davul gibi. Keşke daha sessiz bir ayakkabı seçseydin.`
          : `Babetlerin betonda neredeyse sessiz. ${s.shoe.name} bu iş için iyi. Ama sessizlik de bir tür korku.`
      ],
      choices: [
        {
          label: "El fenerini yak, sesin geldiği yere yürü.",
          fx: { sinir: -6, enerji: -4, itibar: 3 },
          min: 60,
          result: "Işık, kolonların arasında geziyor. Bir gölge kıpırdıyor. Elini kemerine götürüyorsun. Gece, nefesini tutuyor.",
          next: "silah"
        },
        {
          label: "Arabaya dön, kapıları kilitle.",
          fx: { sinir: -2, itibar: 2, enerji: 1 },
          min: 44,
          result: "Kapıyı kilitliyorsun. Dışarıda bir gölge, camın önünden geçiyor. Yüzünü görmüyorsun. Görmek istemiyorsun.",
          next: "araba"
        },
        {
          label: "Telsizle plaka sorgula.",
          fx: { itibar: 5, sinir: 2 },
          min: 48,
          result: "Plaka temiz çıkıyor. Ama aracın sahibi üç yıl önce kayıp. Bilgi, korkuyu azaltmıyor; sadece başka bir korkuya dönüştürüyor.",
          next: "sahte-polis"
        },
        {
          label: "Korkunu yen, yüksek sesle şarkı söyle.",
          fx: { sinir: 5, itibar: -1, enerji: 2 },
          min: 40,
          result: "Sesin betonda yankılanıyor. Gölge duruyor. Sen devam ediyorsun. Şarkının sözlerini yarısında unutuyorsun; önemli değil.",
          next: "ruzgar"
        }
      ]
    },

    {
      id: "metro",
      title: "Son Tren",
      place: "Seul Metro · Son Tren",
      art: "subway",
      kicker: "GECE 4 · 01:52 · SON SEFER",
      text: [
        "Son trenin vagonunda beş kişi var. Üç adam, bir kadın, bir de sen. Adamlardan biri kadına fazla yakın duruyor. Kadının omuzları, bir kuş gibi kapanmış.",
        "Tren tünele giriyor. Işıklar bir an titriyor. Senin ayakkabıların, boş vagonda küçük bir ses bırakıyor."
      ],
      choices: [
        {
          label: "Araya gir, kimlikleri kontrol et.",
          fx: { itibar: 7, enerji: -4, sinir: -2, tutuklama: 1 },
          min: 60,
          result: "Adamlar homurdanıyor ama kimliklerini çıkarıyor. Kadın başını kaldırıp sana bakıyor. Teşekkür etmiyor; etmesine gerek yok.",
          next: "kavga"
        },
        {
          label: "Kadını yanına al, başka vagona geç.",
          fx: { sinir: 5, itibar: 5, enerji: -2 },
          min: 52,
          result: "Kadının koluna hafifçe dokunuyorsun. Birlikte yürüyorsunuz. Arkanda adamların bakışını hissediyorsun; dönmüyorsun.",
          next: "hastane"
        },
        {
          label: "Telsizle destek çağır, bekle.",
          fx: { itibar: 3, sinir: -2, enerji: 1 },
          min: 48,
          result: "Destek bir sonraki istasyonda olacak. O zamana kadar gözlerini ayırmıyorsun. Beklemek de bir iştir.",
          next: "otopark"
        },
        {
          label: "Kulaklığını tak, duymamış gibi yap.",
          fx: { itibar: -8, sinir: -6, gozyasi: 1 },
          min: 46,
          result: "Müzik başlıyor. Ama sesler geçmiyor. Kadın bir sonraki durakta iniyor. Sen yerinde kalıyorsun. Tren boşalıyor.",
          next: "gozyasi"
        }
      ]
    },

    {
      id: "hastane",
      title: "Beyaz Koridor",
      place: "Seul Merkez Hastanesi · Acil",
      art: "hospital",
      kicker: "GECE 4 · 02:10 · FLORASAN",
      text: (s) => [
        "Acil koridorunda antiseptik ve kahve kokusu. Sedye, bir tutuklu, iki polis. Adamın alnında bir sıyrık var; senin ayakkabında ise küçük bir kan lekesi.",
        `${s.shoe.name} açık renkliyse leke hemen göze çarpıyor. Koyu renkliyse sadece sen biliyorsun. İkisi de aynı derecede rahatsız edici.`
      ],
      choices: [
        {
          label: "Eldiven giy, yarasını sar.",
          fx: { itibar: 7, temizlik: -5, sinir: 2 },
          min: 56,
          result: "Eldivenler eline yapışıyor. Adamın yarası derin değil. Sargıyı bağlarken ona bakmıyorsun. O da sana bakmıyor.",
          next: "karakol"
        },
        {
          label: "Ayakkabındaki kana bak, miden bulanıyor.",
          fx: { sinir: -5, temizlik: -7, gozyasi: 1, konfor: -2 },
          min: 46,
          result: "Küçük kırmızı leke, ayakkabının kenarında. Bir anda bütün gece gözlerinin önünden geçiyor. Duvara yaslanıyorsun.",
          next: "temizlik"
        },
        {
          label: "Nöbetçi doktorla konuş.",
          fx: { itibar: 4, enerji: -2, sinir: 3 },
          min: 50,
          result: "Doktor yorgun ama nazik. \"Bu gece çok kişi geldi,\" diyor. \"Siz de dinlenin.\" Gülümsüyorsun; dinlenmek, başka bir vardiyaya benziyor.",
          next: "kaptan"
        },
        {
          label: "Koridorda bir kahve al.",
          fx: { enerji: 6, konfor: 2, sinir: 4 },
          min: 42,
          result: "Otomatın kahvesi kötü. Ama sıcak. Ellerini fincanın etrafında sarıyorsun. Koridor, bir an daha az beyaz görünüyor.",
          next: "firin"
        }
      ]
    },

    {
      id: "firin",
      title: "Sıcak Ekmek",
      place: "24 Saat Fırın · Ara Sokak",
      art: "market",
      kicker: "GECE 4 · 02:30 · SICAK",
      text: [
        "Fırının camı buğulu. İçeride, tezgâhın arkasında uyuklayan bir fırıncı ve tepsi tepsi sıcak ekmek var. Kapıyı açtığında çan çalıyor; dünya bir an yumuşuyor.",
        "Vitrinde kremalı ekmekler var. Çocukken annen, ağladığında sana bir tane alırdı. Bunu hatırlamak, gözlerini yakıyor."
      ],
      choices: [
        {
          label: "Bir kremalı ekmek al, ilk ısırıkta ağla.",
          fx: { sinir: 8, enerji: 6, gozyasi: 1, konfor: 1 },
          min: 48,
          result: "Krem, dudağının kenarına bulaşıyor. Ağzında tatlı bir şey var. Gözyaşı, ekmekle karışıyor. Fırıncı görmüyor; ya da görmezden geliyor.",
          next: "ruzgar"
        },
        {
          label: "Sadece kahve al, ayakta iç.",
          fx: { enerji: 7, sinir: 2, konfor: 1 },
          min: 40,
          result: "Kahveyi ayakta içiyorsun. Sıcaklık boğazından geçiyor. Vitrindeki ekmeklere bakmamaya çalışıyorsun. Çalışmıyor.",
          next: "bulvar"
        },
        {
          label: "Fırıncıya geceyi sor.",
          fx: { sinir: 4, itibar: 2, enerji: 2 },
          min: 46,
          result: "\"Her gece aynı,\" diyor. \"Ekmek, uyku, biraz da korku.\" Gülüyorsun. \"Polislik de öyle.\" İkiniz de gülüyorsunuz.",
          next: "kayip-cuzdan"
        },
        {
          label: "Vitrindeki çörekleri say, oyalan.",
          fx: { sinir: 3, enerji: 3 },
          min: 38,
          result: "Yedi çörek. Üç simit. Bir tepsi bilinmeyen. Saymak, zihnini başka bir yere götürüyor. Sonra kapı açılıyor; geri dönüyorsun.",
          next: "corap-krizi"
        }
      ]
    },

    {
      id: "kedi",
      title: "Kedi ve Kadın",
      place: "Mapo · Park Kenarı",
      art: "alley",
      kicker: "GECE 4 · 02:44 · MIRILTI",
      text: [
        "Kedi, bir arabanın motor kaputunun üstünde oturuyor. Islak, küçük, inatçı. Sen yaklaşınca kaçmıyor. Sadece bakıyor. Gözleri, sarı bir sokak lambası gibi.",
        "Kucağına alıyorsun. Ağırlığı, bütün geceyi dengeliyor. Ceketinin önü ıslanıyor. Umurunda değil."
      ],
      choices: [
        {
          label: "Kediyi çıkar, ceketine sar.",
          fx: { sinir: 7, temizlik: -3, konfor: 2 },
          min: 46,
          result: "Kedi ceketinin içinde küçük bir motor gibi mırıldanıyor. Bir süre hiçbir yere gitmiyorsunuz. Gece, sizinle birlikte bekliyor.",
          next: "cocuk"
        },
        {
          label: "Karakola götür, sıcak bir köşe bul.",
          fx: { itibar: 3, sinir: 3, enerji: -2 },
          min: 50,
          result: "Kedi karakolun arka odasında bir karton kutunun içine yerleşiyor. Kaptan Oh görüyor, bir şey söylemiyor. Bu, onay sayılır.",
          next: "firin"
        },
        {
          label: "Kendi hâline bırak. O alışkın.",
          fx: { sinir: -3, itibar: 1 },
          min: 38,
          result: "Kedi çatıya atlıyor. Bir an dönüp bakıyor. Sonra karanlığa karışıyor. Sen de gidiyorsun. İçinde küçük bir boşluk kalıyor.",
          next: "ruzgar"
        },
        {
          label: "Min-ho'yu çağır, birlikte bakın.",
          fx: { sinir: 5, itibar: -1 },
          min: 44,
          result: "Min-ho kediyi görünce yüzü değişiyor. \"Bunu nereden buldun?\" diyor. \"Senin gibi,\" diyorsun. \"Sokakta.\" Gülüyor.",
          next: "sahil"
        }
      ]
    },

    {
      id: "cocuk",
      title: "Otobüs Durağı",
      place: "Euljiro · Otobüs Durağı",
      art: "street",
      kicker: "GECE 4 · 03:02 · SOĞUK",
      text: [
        "Durakta tek başına oturan bir çocuk. Bir ayağında ayakkabı var, diğerinde sadece çorap. Elinde bir oyuncak araba. Gözleri, gelen her otobüsün farlarında büyüyor.",
        "Yanına oturuyorsun. Bank, ıslak. Çocuk kımıldamıyor. \"Annem gelecek,\" diyor. \"Sadece biraz gecikti.\""
      ],
      choices: [
        {
          label: "Çömel, göz hizasına in.",
          fx: { sinir: 6, konfor: -2, itibar: 3 },
          min: 50,
          result: "Göz hizasına iniyorsun. Çocuk, ayakkabısız ayağını diğerinin arkasına saklıyor. \"Üşüyor musun?\" diye soruyorsun. Başını sallıyor. Sonra gülümsüyor.",
          next: "firin"
        },
        {
          label: "Ceketini sırtına ver.",
          fx: { sinir: 5, itibar: 4, konfor: -2 },
          min: 48,
          result: "Ceket çocuğun omuzlarından aşağı kayıyor. Gülüyor. Sen de gülüyorsun. Bir çocuk, bir ceket, bir otobüs durağı.",
          next: "karakol"
        },
        {
          label: "Annesini bulmak için çevreyi tara.",
          fx: { enerji: -5, itibar: 5, sinir: -1 },
          min: 62,
          result: "İki sokak ötede bir kadın, telefonuna bakarak koşuyor. Çocuğu görünce dizleri çözülüyor. Sana teşekkür ediyor; sen duymuyorsun.",
          next: "pazar"
        },
        {
          label: "Ona bir şarkı mırıldan.",
          fx: { sinir: 8, gozyasi: 1, enerji: -1 },
          min: 44,
          result: "Annenin sana söylediği şarkıyı mırıldanıyorsun. Çocuk başını omzuna yaslıyor. Sen şarkıyı bitirmeden uyuyor. Sen de gözlerini kapatıyorsun.",
          next: "ruzgar"
        }
      ]
    }
  ];

  window.STORY_EVENTS = (window.STORY_EVENTS || []).concat(events);
})();
