/* GECE DEVRİYESİ — hikâye, bölüm A.
   Her olayda tam olarak dört seçim var. Her seçim başka bir olaya gider. */
(function () {
  "use strict";

  const events = [
    {
      id: "gece-baslangic",
      title: "İlk Adım",
      place: "Karakol · Arka Otopark",
      art: "street",
      kicker: "GECE 4 · VARDİYA BAŞLIYOR",
      text: (s) => [
        `21:00. Yağmur, asfaltın üstünde ince bir film gibi duruyor. Siyah taytın iki beden küçük; her adımda dizlerinin arkasını hafifçe ısırıyor. Ten rengi külotlu çorabın ${s.shoe.name.toLowerCase()}in içinde kaygan bir fısıltı.`,
        `Kaptan Oh içeride. Telsizde üç dakika sonra "Gece 4, çıkıyor musunuz?" diye soracak. Gözlerin nedensizce dolmaya hazır; duygusal eşiğin bir kibrit çöpü kadar.`,
        `Babetlerin siyah, sade, tabanı kâğıt kadar ince. Şehir seni bekliyor.`
      ],
      choices: [
        {
          label: "Arabaya geç, kaloriferi aç.",
          fx: { enerji: 6, konfor: 4, sinir: 2 },
          min: 48,
          result: "Koltuk ısındıkça omuzların gevşiyor. Torpido gözünde bir paket kâğıt mendil var; az kalsın ağlıyordun.",
          next: "bulvar"
        },
        {
          label: "Babetlerin içini kontrol et, tabanları sil.",
          fx: { temizlik: 6, konfor: 3 },
          min: 52,
          result: "İçinden küçük bir kum tanesi çıkıyor. Nereden geldiğini bilmiyorsun. Onu avucuna alıp cebine koyuyorsun.",
          next: "sokak-bakisi"
        },
        {
          label: "Aynaya bak. Gözlerin zaten dolu.",
          fx: { sinir: -5, gozyasi: 1 },
          min: 44,
          result: "Aynadaki kadın sana \"iyi misin?\" diye bakıyor. Başını sallıyorsun; ikiniz de inanmıyorsunuz.",
          next: "ayna"
        },
        {
          label: "Kaptan Oh'a seslen: \"Hazırım.\"",
          fx: { itibar: 6, sinir: 3 },
          min: 50,
          result: "Sesin olması gerekenden bir ton daha ince çıkıyor. Kaptan Oh duymamış gibi yapıyor; bu onun iyilik biçimi.",
          next: "brifing"
        }
      ]
    },

    {
      id: "ayna",
      title: "Aynadaki Kadın",
      place: "Karakol · Kadınlar Tuvaleti",
      art: "station",
      kicker: "GECE 4 · 21:16",
      text: (s) => [
        "Florasan ışığı yüzünü olduğundan yorgun gösteriyor. Maskaranın alt ucu hafifçe dağılmış. Siyah taytın belini iki parmakla düzeltiyorsun; iz kalmıyor, sadece baskı.",
        s.stats.sinir < 30
          ? "Gözlerin aynada iki küçük göl gibi. Nefes alıyorsun, veriyorsun. Hâlâ buradasın."
          : "Bugün daha iyi görünüyorsun. Bunu kendine söylemek tuhaf bir şekilde zor."
      ],
      choices: [
        {
          label: "Maskarayı düzelt, kendine gülümse.",
          fx: { sinir: 5, itibar: 2 },
          min: 46,
          result: "Gülümseme biraz yapay, ama işe yarıyor. Kapıyı açtığında omuzların iki santim daha dik.",
          next: "partner"
        },
        {
          label: "Yüzüne soğuk su çarp.",
          fx: { sinir: 6, enerji: 3 },
          min: 42,
          result: "Su, ensenden içeri sızıyor. Bir an nefesin kesiliyor; sonra dünya geri geliyor.",
          next: "bulvar"
        },
        {
          label: "Annene kısa bir mesaj at: \"İyiyim.\"",
          fx: { sinir: 8, flags: { anneMesaj: true } },
          min: 40,
          result: "Üç nokta görünüyor. Sonra \"Yalan söyleme\" yazıyor. Telefonu cebine koyarken dudağını ısırıyorsun.",
          next: "corap-krizi"
        },
        {
          label: "Ağlamana izin ver. Kimse görmeden.",
          fx: { sinir: -3, gozyasi: 1, flags: { agladim: true } },
          min: 50,
          result: "Üç nefes. Dört. Gözyaşları çeneni ıslatıyor. Sonra musluğu kapatıp çıkıyorsun; hayat devam ediyor.",
          next: "gozyasi"
        }
      ]
    },

    {
      id: "brifing",
      title: "Kaptan Oh'un Dosyası",
      place: "Karakol · Brifing Odası",
      art: "station",
      kicker: "GECE 4 · 21:22",
      text: [
        "Kaptan Oh masaya bir dosya bırakıyor. İnce. Ama içindeki fotoğraflar kalın bir geceden geliyor: Incheon Limanı, üç konteyner, bir isim. \"Kaçakçılık olabilir,\" diyor. \"Belki de sadece balık.\"",
        "Bakışları senin ayakkabılarına kayıyor. Bir şey söylemiyor. Kaptan Oh her şeyi söylemez; bazı şeyleri sadece bakar."
      ],
      choices: [
        {
          label: "Dosyayı iste, detayları öğren.",
          fx: { itibar: 6, enerji: -3, sinir: 1 },
          min: 55,
          result: "Dosyayı alıyorsun. Fotoğraflardan birinde, konteynerin önünde duran bir kadın var. Yüzü bulanık. Yine de ona bakmamak elinde değil.",
          next: "liman"
        },
        {
          label: "\"Min-ho da geliyor mu?\" diye sor.",
          fx: { sinir: 5, flags: { partnerSecildi: true } },
          min: 47,
          result: "Kaptan Oh kaşını kaldırıyor. \"Geliyor. Ama senin ona değil, yola bakmanı istiyorum.\" Yüzünün ısındığını hissediyorsun.",
          next: "partner"
        },
        {
          label: "Ayakkabılarının hâlâ ıslak olduğunu fark et.",
          fx: { temizlik: -2, konfor: -3, sinir: -2 },
          min: 43,
          result: "Babetin içinde hafif bir serinlik var. Gecenin başında bunu fark etmek iyi değil. Belki de hiç fark etmemeliydin.",
          next: "koku"
        },
        {
          label: "Şaka yap: \"Kaçakçılar da gece çalışıyor demek.\"",
          fx: { itibar: -2, sinir: 5 },
          min: 49,
          result: "Kaptan Oh gülmüyor. Ama gözünün kenarı kırışıyor. Bu, onun kahkahası sayılır.",
          next: "pazar"
        }
      ]
    },

    {
      id: "bulvar",
      title: "Islak Asfalt",
      place: "Sejong Bulvarı",
      art: "street",
      kicker: "GECE 4 · 21:34 · İNCE YAĞMUR",
      text: (s) => [
        "Bulvarın ortasında bir taksi durmuş. Şoför camdan bağırıyor; yolcu şemsiyesini kapatmış, elinde bozuk paralar. İkisi de aynı anda haklı olduğuna emin.",
        `Senin ${s.shoe.name.toLowerCase()}in asfaltın üstünde ince bir ses çıkarıyor. Yağmur, ayakkabının kenarından içeri girmek için sabırla bekliyor.`
      ],
      choices: [
        {
          label: "Araya gir, tarafları ayır.",
          fx: { itibar: 6, enerji: -4, sinir: -2 },
          min: 58,
          result: "İki adamı iki adım geri çekiyorsun. Sesler düşüyor. Taksi şoförü sana küfrediyor, sonra özür diliyor. Gece böyle işliyor.",
          next: "kavga"
        },
        {
          label: "Plakayı kontrol et, uzlaştır.",
          fx: { itibar: 4, enerji: -1, sinir: 2 },
          min: 50,
          result: "Taksi plakasını not ediyorsun. Yolcu sonunda parayı ödüyor. Şoför giderken sana selam veriyor; nedenini bilmiyorsun.",
          next: "kayip-cuzdan"
        },
        {
          label: "Sadece izle. Belki kendi kendine çözülür.",
          fx: { itibar: -4, sinir: -2 },
          min: 46,
          result: "Çözülmüyor. Yolcu taksinin kapısını çarpıyor, şoför arkadan bağırıyor. Sen gaza basıyorsun. Dikiz aynasında küçülüyorlar.",
          next: "metro"
        },
        {
          label: "Yağmurun altında dur, ayakkabını düşün.",
          fx: { nem: 6, konfor: -3, sinir: 2 },
          min: 54,
          result: "Bir damla su, babetin kenarından içeri giriyor. Ten rengi çorabın üstünde küçük bir leke gibi yayılıyor. İç çekiyorsun.",
          next: "itaewon"
        }
      ]
    },

    {
      id: "sokak-bakisi",
      title: "Şemsiyesiz Kadın",
      place: "Mapo · Ara Sokak",
      art: "alley",
      kicker: "GECE 4 · 21:41 · YAĞMUR",
      text: [
        "Bir kadın, kırık bir şemsiyenin altında, bir kediyi kuru bir kartonun üstüne çekmeye çalışıyor. Kadının elleri titriyor. Kedi de titriyor. Şemsiye ikisini de korumuyor.",
        "Yaklaşırken kadın başını kaldırıyor. Gözleri seninkilerle aynı yaşta. \"Polis misiniz?\" diyor. \"Yoksa sadece ıslak mısınız?\""
      ],
      choices: [
        {
          label: "Şemsiyeni kadına ver.",
          fx: { itibar: 5, sinir: 5, konfor: -2, nem: 3 },
          min: 52,
          result: "Şemsiyeyi alıyor, yüzünde bir şey açılıyor. Sen yağmura kalıyorsun. Babetin ıslanıyor; nedense umurunda değil.",
          next: "firin"
        },
        {
          label: "Kediyi kucağına al, ceketine sar.",
          fx: { sinir: 6, temizlik: -3, flags: { kedi: true } },
          min: 48,
          result: "Kedi tüylü ve ağır. Kalbinin üstünde mırıldanıyor. Bir an, dünyanın en basit işi buymuş gibi geliyor.",
          next: "kedi"
        },
        {
          label: "Kadını evine kadar götür.",
          fx: { enerji: -5, itibar: 4, sinir: 3 },
          min: 62,
          result: "Dört kat merdiven. Kadın her basamakta özür diliyor. Kapısında sana bir mandalina veriyor; cebinde taşıyacaksın.",
          next: "cocuk"
        },
        {
          label: "Telsizi kontrol et, acele et.",
          fx: { itibar: -2, enerji: 2 },
          min: 40,
          result: "Telsizde başka bir ses var. Kadın ve kedi arkanda kalıyor. Dikiz aynasında ikisini de görüyorsun. Sonra görmüyorsun.",
          next: "han-nehri"
        }
      ]
    },

    {
      id: "partner",
      title: "Min-ho'nun Sessizliği",
      place: "Devriye Aracı · Gece 4",
      art: "car",
      kicker: "GECE 4 · 21:50",
      text: (s) => [
        "Min-ho direksiyonda. Radyoda eski bir balad, sesi kısık. İki kere sana bakıyor, iki kere vazgeçiyor. Sonunda: \"Bugün iyi misin?\" diyor. Soru, bir kapıyı aralıyor.",
        s.stats.nem > 30
          ? `Ayakkabılarının içinden hafif bir şapırtı geliyor. Min-ho duymuş gibi yapmıyor. ${s.shoe.name} artık ilk günkü gibi değil.`
          : `Ayakkabıların temiz. En azından bunu kontrol edebiliyorsun. ${s.sock.name} ayağında sıcak bir çizgi gibi duruyor.`
      ],
      choices: [
        {
          label: "Ona çocukken deniz kenarında yaşadığın bir anıyı anlat.",
          fx: { sinir: 8, itibar: 1 },
          min: 58,
          result: "Babasının seni omuzlarında taşıdığını, ayakkabılarını çıkardığını anlatıyorsun. Min-ho gülümsüyor. Arabanın içi bir an daha sıcak.",
          next: "sahil"
        },
        {
          label: "Konuyu değiştir, telsizi aç.",
          fx: { itibar: 3, sinir: -2 },
          min: 44,
          result: "Telsiz cızırdıyor. Min-ho susuyor. Sessizlik, konuşmaktan daha yüksek.",
          next: "bulvar"
        },
        {
          label: "Ayakkabını göster: \"Deniz kokuyor.\"",
          fx: { sinir: 5, itibar: 2 },
          min: 52,
          result: "Min-ho bir an bakıyor, sonra gülüyor. \"Benimki de.\" İkiniz de pencereden dışarı bakıyorsunuz. Utanç, paylaşılınca küçülüyor.",
          next: "temizlik"
        },
        {
          label: "Sessiz kal, yağmuru dinle.",
          fx: { sinir: 4, enerji: 2 },
          min: 46,
          result: "Silecekler iki yana açılıyor. Min-ho radyoyu biraz açıyor. Konuşmadan da yan yana olunabiliyor.",
          next: "ruzgar"
        }
      ]
    },

    {
      id: "han-nehri",
      title: "Köprüdeki Gölge",
      place: "Mapo Köprüsü",
      art: "river",
      kicker: "GECE 4 · 22:12 · RÜZGÂR",
      text: [
        "Köprünün korkuluğunda bir adam. Sırtı nehre dönük, elleri demirde. Yanında kimse yok. Arabanın farları onu bir sahne ışığı gibi aydınlatıyor.",
        "Telsizde \"intihar ihbarı\" diyorlar. Kelime ağzından çıkarken bile ağır. Yavaşça yaklaşman gerekiyor; kalbin çok hızlı."
      ],
      choices: [
        {
          label: "Yavaşça yaklaş, adını sor.",
          fx: { sinir: -6, itibar: 7, kurtarma: 1, flags: { kopru: true } },
          min: 62,
          result: "Adı Ji-woo. Sana bakmıyor. Ama sen konuşurken nefesinin ritmi değişiyor. Bir metre. Sadece bir metre.",
          next: "kopru-konusma"
        },
        {
          label: "Telsizle destek çağır.",
          fx: { itibar: 4, enerji: -3, sinir: -2 },
          min: 48,
          result: "Destek üç dakika uzakta. Üç dakika, burada bir ömür. Yine de sesini sakin tutuyorsun.",
          next: "partner"
        },
        {
          label: "Min-ho'yu geride tut, tek başına konuş.",
          fx: { sinir: -8, itibar: 5, kurtarma: 1 },
          min: 66,
          trigger: "kopru-konusma",
          result: "Min-ho uzaklaşıyor. Adamın omuzları titriyor. Sen de titriyorsun. İkiniz de aynı rüzgârdasınız.",
          next: "gozyasi"
        },
        {
          label: "Uzaktan izle, müdahale etme.",
          fx: { itibar: -6, sinir: -3 },
          min: 54,
          result: "Adam başını çeviriyor. Seni görüyor. Bir şey söylemiyor. Sen de söylemiyorsun. Sonra bir başka araba geliyor.",
          next: "ruzgar"
        }
      ]
    },

    {
      id: "kopru-konusma",
      title: "Bir Metre",
      place: "Mapo Köprüsü · Korkuluk",
      art: "river",
      kicker: "ZİNCİR · KÖPRÜ KONUŞMASI",
      text: [
        "Bir metre. Belki daha az. Ji-woo nehrin üstündeki ışıklara bakıyor. \"Kimseye bir şey olmasa da olur,\" diyor. \"Sadece bir gün ara vermek istiyorum.\"",
        "Sen de korkuluktaki demire dokunuyorsun. Soğuk. Bu soğuğu tanıyorsun. \"Ara vermek ile bitirmek aynı şey değil,\" diyorsun. Sesin titriyor ama düşmüyor."
      ],
      choices: [
        {
          label: "Ona kendi korkularından bahset.",
          fx: { sinir: -4, itibar: 5, kurtarma: 1 },
          min: 64,
          result: "Anlatıyorsun. Gece nöbetlerinden, ağlama krizlerinden, her sabah yeniden giyinmekten. Ji-woo dinliyor. Sonra elini demirden çekiyor.",
          next: "telefon"
        },
        {
          label: "Elini uzat, sessizce bekle.",
          fx: { sinir: -5, kurtarma: 1 },
          min: 58,
          result: "Uzun bir sessizlik. Elin havada. Ji-woo sonunda tutuyor. Avucu buz gibi; sen sıkıyorsun.",
          next: "gozyasi"
        },
        {
          label: "Nehre bak, sen de ağla.",
          fx: { sinir: -6, gozyasi: 1, kurtarma: 1 },
          min: 60,
          result: "İkiniz de ağlıyorsunuz. Komik ve korkunç ve insanca. Ji-woo korkuluktan inerken neredeyse düşüyor; yakalıyorsun.",
          next: "ruzgar"
        },
        {
          label: "Küçük bir şaka yap, havayı yumuşat.",
          fx: { sinir: 3, itibar: 2, kurtarma: 1 },
          min: 56,
          result: "\"Nehir bu saatte çok soğuk,\" diyorsun. \"Üstüne bir de ıslak ayakkabı çekilmez.\" Ji-woo önce bakıyor, sonra gülüyor. Gülüyor.",
          next: "firin"
        }
      ]
    },

    {
      id: "liman",
      title: "Tuz Kokusu",
      place: "Incheon Limanı · Rıhtım 7",
      art: "port",
      kicker: "GECE 4 · 23:20 · SİS",
      text: (s) => [
        "Konteynerlerin arasında sis, bir hayvan gibi dolaşıyor. Deniz kokusu, mazot ve ıslak beton. Uzakta bir vinç, uyuyan bir dinozor gibi duruyor.",
        `Rıhtımda su birikintileri var. ${s.shoe.name} için bu, bir uyarı değil; bir davet. Ayakkabının kenarındaki dikişler ışığı yansıtıyor.`
      ],
      choices: [
        {
          label: "Rıhtımda yürü, iz sür.",
          fx: { nem: 8, kum: 4, konfor: -4, itibar: 4, sinir: 2 },
          min: 64,
          result: "Ayak izlerin ıslak betonda kalıyor. Küçük, düzenli, biraz aceleci. Birinin seni takip ettiğini hissediyorsun; dönüp bakmıyorsun.",
          next: "iskele"
        },
        {
          label: "Araçta kal, kameraları izle.",
          fx: { itibar: 3, enerji: 2, sinir: 3 },
          min: 52,
          result: "Ekranda dört konteyner, iki forklift ve bir gölge. Gölge bir yere giriyor, çıkmıyor. Not alıyorsun.",
          next: "araba"
        },
        {
          label: "Konteyner arkasındaki hareketi gör.",
          fx: { sinir: -5, enerji: -5, nem: 4 },
          min: 58,
          result: "Konteynerin arkasında biri var. Nefesini tutuyorsun. Elin kemerindeki tokaya gidiyor. Gece, bir kapı gibi aralanıyor.",
          next: "silah"
        },
        {
          label: "Kaptan'a haber ver: \"Burada bir şey var.\"",
          fx: { itibar: 5, sinir: 2 },
          min: 48,
          result: "Kaptan Oh sesini alçaltıyor. \"Gördüğünü söyle. Yorum yapma.\" Söylüyorsun. O dinliyor. Bu, yalnız olmadığın anlamına geliyor.",
          next: "partner"
        }
      ]
    },

    {
      id: "iskele",
      title: "Su ve Kum",
      place: "Incheon Limanı · İskele",
      art: "port",
      kicker: "ZİNCİR · ISLAK AYAK",
      text: (s) => [
        `Bir adım. Su, ${s.shoe.name.toLowerCase()}in kenarından içeri sızıyor. Önce soğuk; sonra tuhaf bir kayganlık. ${s.sock.name} ıslanıyor ve tenine yapışıyor.`,
        "Rıhtımın betonu ince bir kum tabakasıyla kaplı. Her adımda ayakkabının içine birkaç tane daha giriyor. Küçük, sert, gerçek.",
        s.stats.koku > 40
          ? "Ayağını oynattığında hafif bir deniz kokusu yükseliyor. Bu gece banyo yapmayı düşünüyorsun."
          : "Şu an sadece ıslak. Ama ıslaklık, kokunun ilk adımı."
      ],
      choices: [
        {
          label: "Ayakkabıları çıkar, çorapları sık.",
          fx: { konfor: 6, temizlik: -5, nem: 8, sinir: 2, flags: { yalinayak: true } },
          min: 58,
          result: "Çorabı sıkıyorsun; su betona damlıyor. Yalınayak beton buz gibi. Ama en azından ayakkabının içi bir süre kuru kalacak.",
          next: "temizlik"
        },
        {
          label: "Aldırma, devam et.",
          fx: { nem: 16, kum: 9, koku: 8, sinir: 2 },
          min: 46,
          result: "Her adımda su, parmaklarının arasından geçiyor. Yürümeye devam ediyorsun. Bazen tek yapabildiğin bu.",
          next: "koku"
        },
        {
          label: "Kuru bir bezle sil.",
          fx: { temizlik: 5, nem: -6, konfor: 2, enerji: -1 },
          min: 50,
          result: "Bez, ayakkabının içindeki suyu alıyor. Kumun bir kısmı kalıyor. Mükemmel değil; ama yeterli.",
          next: "karakol"
        },
        {
          label: "Min-ho'ya fısılda: \"Ayakkabım deniz kokuyor.\"",
          fx: { sinir: -3, itibar: -2, nem: 3 },
          min: 48,
          result: "Min-ho bir an bakıyor. \"Benimki de,\" diyor. Sonra ikiniz de gülüyorsunuz. Deniz, ayakkabılarınızın içinde.",
          next: "partner"
        }
      ]
    },

    {
      id: "temizlik",
      title: "Lavabonun Başında",
      place: "Karakol · Lavabo",
      art: "station",
      kicker: "GECE 4 · ARA",
      text: (s) => [
        "Lavabonun soğuk mermeri, ellerinin altında. Sabun köpürüyor. Ayakkabını ters çeviriyorsun; içinden su ve kum, lavaboya dökülüyor. Küçük bir plaj.",
        `${s.shoe.name} ıslak. ${s.sock.name} ise çoktan kirlendi. Aynada, kendi yorgun yüzünü izliyorsun. Bazen temizlik, kontrolün son kalesi.`
      ],
      choices: [
        {
          label: "Sabunla ovala, iyice kurula.",
          fx: { temizlik: 16, nem: -20, kum: -15, koku: -12, enerji: -3, sinir: 4 },
          min: 56,
          result: "Ayakkabı, ilk günkü rengine yaklaşıyor. Parmağınla içini kontrol ediyorsun: kuru. Bu küçük zafer, bütün geceyi taşıyabilir.",
          next: "karakol"
        },
        {
          label: "Sadece kâğıt havluyla sil.",
          fx: { temizlik: 5, nem: -5, koku: -4 },
          min: 40,
          result: "Kâğıt havlu inceliyor, dağılıyor. Ayakkabı hâlâ nemli. Ama en azından dışarıdan bakınca temiz görünüyor.",
          next: "kaptan"
        },
        {
          label: "Çantadaki yedek çorabı giy.",
          fx: { konfor: 10, sinir: 4, temizlik: 6 },
          min: 44,
          result: "Temiz çorap, ayağına bir serinlik gibi geçiyor. Eski çorabı çantaya koyuyorsun. Islak bir hatıra.",
          next: "pazar"
        },
        {
          label: "Temizlemeyi ertele. İşe dön.",
          fx: { koku: 8, sinir: 2, enerji: 2 },
          min: 34,
          result: "Lavaboyu kapatıyorsun. Ayakkabının içinde su, lavaboda kum kalıyor. Gece seni bekliyor.",
          next: "koku"
        }
      ]
    },

    {
      id: "koku",
      title: "Asansörde",
      place: "Karakol · Asansör",
      art: "station",
      kicker: "ZİNCİR · DENİZ KOKUSU",
      text: (s) => [
        "Asansörde üç kişisiniz. Kapılar kapanıyor. Bir saniye sonra, o koku. Deniz, kum, ıslak deri ve biraz da utanç.",
        `Meslektaşın burun deliklerini hafifçe açıyor. ${s.shoe.name} ayağında, sanki suçüstü yakalanmış gibi. Gözlerini tavana kaldırıyorsun.`
      ],
      choices: [
        {
          label: "Özür dile, hemen temizlemeye git.",
          fx: { temizlik: 10, koku: -18, itibar: 3, sinir: 2 },
          min: 44,
          result: "\"Benim ayakkabım,\" diyorsun. Meslektaşın gülümsüyor. \"Benim de olabilirdi.\" Asansörden çıkıp lavaboya gidiyorsun.",
          next: "temizlik"
        },
        {
          label: "Pencereyi aç, konuyu değiştir.",
          fx: { itibar: -2, koku: -4, enerji: 1 },
          min: 36,
          result: "Pencere açılıyor. Rüzgâr kokuyu bir süre dağıtıyor. Konu değişiyor. Kimse gerçeği söylemiyor.",
          next: "karakol"
        },
        {
          label: "Kendine gül: \"Deniz benimle geldi.\"",
          fx: { sinir: 6, itibar: 2, koku: 1 },
          min: 38,
          result: "Meslektaşın önce şaşırıyor, sonra gülüyor. Asansör kapısı açılıyor. Küçük bir utanç, küçük bir şakayla hafifliyor.",
          next: "firin"
        },
        {
          label: "Sus, utançla bekle.",
          fx: { sinir: -6, gozyasi: 1 },
          min: 42,
          result: "Kat numaraları yavaş yavaş geçiyor. Gözlerin doluyor. Kapı açıldığında hızla çıkıyorsun. Kimse peşinden gelmiyor.",
          next: "gozyasi"
        }
      ]
    },

    {
      id: "pazar",
      title: "Gece Pazarı",
      place: "Dongdaemun · Gece Pazarı",
      art: "market",
      kicker: "GECE 4 · 00:10 · NEON",
      text: (s) => [
        "Dongdaemun bu saatte bile uyanık. Tezgâhlarda çorap, ipek, topuklu ayakkabı; ampullerin altında bir renk denizi. Bir satıcı \"Bunlar senin ayağına çok yakışır\" diyor.",
        `Kendi ${s.sock.name.toLowerCase()}ine bakıyorsun. Belki de haklı. Belki de sadece satmak istiyor. Fark etmiyor.`
      ],
      choices: [
        {
          label: "Çorap tezgâhına bak, yeni bir çift al.",
          fx: { sinir: 5, konfor: 3, itibar: 1, flags: { pazarCorap: true } },
          min: 50,
          result: "Elinde küçük bir paket. Satıcı \"Gece nöbetinde mi?\" diye soruyor. Başını sallıyorsun. \"Allah kolaylık versin,\" diyor. Gülümsüyorsun.",
          next: "corap-krizi"
        },
        {
          label: "Bir çığlık duy: \"Cüzdanım!\" Peşinden koş.",
          fx: { enerji: -6, itibar: 4, konfor: -3, sinir: -2 },
          min: 58,
          result: "Kalabalığın arasından geçiyorsun. Biri omzuna çarpıyor. Cüzdan yerde; adam kaçıyor. Peşindesin.",
          next: "myeongdong"
        },
        {
          label: "Yaşlı satıcıyla sohbet et.",
          fx: { sinir: 5, itibar: 2 },
          min: 46,
          result: "Kadın sana çay veriyor. Kocasının da polis olduğunu söylüyor. \"O da gece çalışırdı,\" diyor. \"Ayakkabıları hep temizdi.\" Boğazın düğümleniyor.",
          next: "gangnam"
        },
        {
          label: "Şüpheli bir adama dikkat et.",
          fx: { sinir: -3, itibar: 3 },
          min: 52,
          result: "Adamın ceketinde bir rozet var. Ama rozetin arkasındaki numara silinmiş. Göz göze geliyorsunuz. Adam gülümsüyor.",
          next: "sahte-polis"
        }
      ]
    },

    {
      id: "myeongdong",
      title: "Topuk Sesi",
      place: "Myeongdong · Ara Sokak",
      art: "market",
      kicker: "GECE 4 · 00:24 · KOŞU",
      text: (s) => [
        s.shoe.heel > 4
          ? `Topukların asfaltta takırdıyor. ${s.shoe.name} her adımda bir uyarı veriyor: dikkat, dikkat, dikkat. Ayak bileğin her inişte biraz daha bükülüyor.`
          : `Babetlerin ıslak zeminde kayıyor. ${s.shoe.name} hızlı ama sessiz; şüpheli dönüp bakmıyor. Nefesin kısa, bacakların uzun.`,
        "Şüpheli köşeyi dönüyor. Elinde bir çanta var. İçinde ne olduğunu bilmiyorsun. Ama çantanın sahibi arkanda ağlıyor."
      ],
      choices: [
        {
          label: "Kestirme sokaktan koş.",
          fx: { konfor: -8, nem: 5, kum: 3, itibar: 6, enerji: -5, sinir: -2 },
          min: 60,
          result: "Sokak daralıyor. Ayakkabının içinde su birikiyor. Tam köşede onu yakalıyorsun; ikiniz de betona yapışıyorsunuz.",
          next: "silah"
        },
        {
          label: "Telsizle önünü kes.",
          fx: { itibar: 7, enerji: -2, sinir: 2 },
          min: 48,
          result: "Min-ho, sokağın diğer ucunda beliriyor. Şüpheli iki ateş arasında kalıyor. Ellerini kaldırıyor. Bu sefer kimse düşmüyor.",
          next: "otopark"
        },
        {
          label: "Yavaşla, gözden kaybetme.",
          fx: { itibar: 2, sinir: -2, konfor: -2 },
          min: 54,
          result: "Takip mesafesini koruyorsun. Şüpheli bir binaya giriyor. Kapı kapanmadan içeri süzülüyorsun. Karanlık.",
          next: "metro"
        },
        {
          label: "Ayakkabıları eline al, çıplak ayakla koş.",
          fx: { konfor: 4, temizlik: -8, kum: 8, itibar: -3, sinir: 2 },
          min: 52,
          result: "Beton, taş, bir cam kırığı. Ayakkabılar elinde, ayakların gerçek. Daha hızlı koşuyorsun. Kimse bunu tutanağa yazmıyor.",
          next: "hastane"
        }
      ]
    },

    {
      id: "gangnam",
      title: "Siyah Araba",
      place: "Gangnam · Bulvar",
      art: "street",
      kicker: "GECE 4 · 00:40 · NEON",
      text: [
        "Siyah bir araba, yolun ortasında. Sürücü camdan el sallıyor: genç, sarhoş, pahalı saatli. Ruhsat sahibi babası, plaka bir holdinge ait.",
        "\"Memur bey,\" diyor, sonra sana bakıp düzeltiyor: \"Memur hanım.\" Cebinden bir zarf çıkarıyor. Kalın. \"Bu geceyi unutalım mı?\""
      ],
      choices: [
        {
          label: "Tutanağı yaz.",
          fx: { itibar: 8, enerji: -4, sinir: -2 },
          min: 58,
          result: "Kalemi çıkarıyorsun. Adamın gülümsemesi donuyor. Zarfı geri koyuyor. \"Baban kim bilmiyor musun?\" diyor. \"Biliyorum,\" diyorsun. \"Sen benim kim olduğumu bilmiyorsun.\"",
          next: "karakol"
        },
        {
          label: "Parayı reddet, her şeyi kayda al.",
          fx: { itibar: 10, sinir: -3, enerji: -2 },
          min: 62,
          result: "Vücut kameranın ışığı yanıyor. Adam eliyle yüzünü kapatıyor. Zarfı yere düşürüyor. Para, ıslak asfaltta dağılıyor.",
          next: "kaptan"
        },
        {
          label: "Önce arabayı çek, sonra konuş.",
          fx: { itibar: 3, konfor: -3, enerji: -2 },
          min: 54,
          result: "Arabayı kenara çekiyorsun. Adam direksiyonda sızıyor. Bu gece tutanak yazacak kadar bile ayakta değil. Belki yarın.",
          next: "otopark"
        },
        {
          label: "Gülümse: \"Benim ayakkabım seninkinden pahalı.\"",
          fx: { sinir: 4, itibar: -2 },
          min: 46,
          result: "Adam şaşırıyor. Bir an ne diyeceğini bilemiyor. Sen de bilmiyorsun. Ama gülümsemek iyi geliyor.",
          next: "firin"
        }
      ]
    },

    {
      id: "itaewon",
      title: "Kayıp Turist",
      place: "Itaewon · Bar Sokağı",
      art: "market",
      kicker: "GECE 4 · 01:05 · MÜZİK",
      text: [
        "Itaewon'da müzik, sokaktan sokağa taşıyor. Bir hostel sahibi seni durduruyor: iki gündür odasına dönmeyen bir turist. Fotoğrafta gülümseyen, kısa saçlı bir kadın.",
        "Telefonunda son sinyal, bir müzenin arka sokağından geliyor. Ama burada, neonların altında, kaybolmak çok kolay."
      ],
      choices: [
        {
          label: "Barları tek tek sor, fotoğrafı göster.",
          fx: { enerji: -5, itibar: 5, sinir: -2 },
          min: 66,
          result: "Dört bar, üç \"bilmiyorum\", bir \"dün buradaydı\". Garsonun gözleri bir an fazla kalıyor. Not alıyorsun.",
          next: "metro"
        },
        {
          label: "Çevre kameralarından son görüntüyü bul.",
          fx: { itibar: 6, sinir: -2, enerji: -3 },
          min: 58,
          result: "Görüntüde turist, siyah bir arabaya biniyor. Plaka yok. Ama arabanın kapısında küçük bir çizik var.",
          next: "otopark"
        },
        {
          label: "Turistin arkadaşını bul.",
          fx: { sinir: 4, itibar: 3, enerji: -2 },
          min: 52,
          result: "Arkadaşı ağlıyor. \"Bana kızmıştı,\" diyor. \"Belki sadece eve dönmek istedi.\" Sesi, kendi sesine benziyor.",
          next: "sahte-polis"
        },
        {
          label: "Müzeden gelen çağrıyı al.",
          fx: { enerji: -3, itibar: 4, sinir: -2 },
          min: 50,
          result: "Müzede alarm var. Bir heykel, bir kırık cam, bir çocuk. Gece, bir başka hikâyeye açılıyor.",
          next: "muze"
        }
      ]
    }
  ];

  window.STORY_EVENTS = (window.STORY_EVENTS || []).concat(events);
})();
