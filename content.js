/* Gece Devriyesi — içerik dosyası
   Yuna Seo, Haesong Gece Devriyesi. Sonsuz gece vardiyası. */

const sock = (id, name, type, color, accent, pattern, tight, soft, odor, note) =>
  ({ id, name, type, color, accent, pattern, tight, soft, odor, note });
const shoe = (id, name, type, color, heel, comfort, water, sand, noise, grip, note) =>
  ({ id, name, type, color, heel, comfort, water, sand, noise, grip, note });

const SOCKS = [
  sock('k01', 'Acıtan Siyah', 'tayt', '#101014', '#2b2b36', 'solid', 100, 12, 82, 'Her akşam bacaklarını mühürler. Lastiği belini iki parmak içeri çeker.'),
  sock('k02', 'Gece Orak', 'tayt', '#0c0c10', '#242432', 'shine', 97, 18, 78, 'Mat siyah, diz arkasında ince bir orak gibi parlıyor.'),
  sock('k03', 'Külotlu Sis', 'külotlu', '#1b1b24', '#3a3a4c', 'sheer', 90, 24, 60, 'İnce, dumanlı. Neon ışıkta bacağında bir sis gibi duruyor.'),
  sock('k04', 'Neon Şeftali', 'külotlu', '#ff8b6b', '#ffd0b8', 'shine', 84, 36, 44, 'Turuncuya çalan şeftali. Gece devriyesinde bile bir yaz gibi.'),
  sock('k05', 'Asit Yeşili', 'külotlu', '#a8ff3e', '#3f6b00', 'solid', 88, 30, 48, 'Rengi bir uyarı levhası gibi. Şüpheliler seni uzaktan görüyor.'),
  sock('k06', 'Elektrik Moru', 'tayt', '#9b5cff', '#e0c8ff', 'shine', 92, 26, 52, 'Morun en yüksek sesi. Taytın dikişleri ışıkta mor bir çizgi bırakıyor.'),
  sock('k07', 'Bebek Pembesi', 'külotlu', '#ffb6cf', '#ff6fa5', 'solid', 74, 58, 40, 'Yumuşak, utangaç bir pembe. Üniformanın altında saklı bir sır.'),
  sock('k08', 'Kan Kırmızısı', 'tayt', '#a80f24', '#ff4d63', 'shine', 95, 16, 66, 'Kırmızı, acıtacak kadar sıkı. Bacaklarını bir çizgi gibi tutuyor.'),
  sock('k09', 'Süt Beyazı', 'külotlu', '#f2eee9', '#d8cfc4', 'sheer', 70, 54, 58, 'Beyaz naylon her lekeyi gösterir. Yağmurda bir hatıra defteri gibi.'),
  sock('k10', 'Lacivert Gece', 'tayt', '#1e2a52', '#46588c', 'solid', 90, 30, 70, 'Üniformayla neredeyse aynı lacivert. Kaybolmak için birebir.'),
  sock('k11', 'Hardal Sarısı', 'külotlu', '#d8a01a', '#6e4d00', 'solid', 80, 38, 48, 'Sıcak, eski bir sokak lambası rengi.'),
  sock('k12', 'Çingene Pembesi', 'tayt', '#d81b60', '#ff8ab5', 'stripe', 86, 34, 50, 'Koyu pembe üstüne ince açık çizgiler. Hareket ettikçe dönüyor.'),
  sock('k13', 'Turkuaz Fırtına', 'külotlu', '#17c3b2', '#0a5f59', 'shine', 82, 40, 42, 'Denizin gece rengi. Yağmurda ayaklarına yansıyor.'),
  sock('k14', 'Gümüş Simli', 'külotlu', '#c9ccd6', '#f5f7ff', 'glitter', 76, 52, 46, 'Her adımda minik bir yıldız bırakıyor gibi.'),
  sock('k15', 'Bakır Parlak', 'tayt', '#b87333', '#f0c088', 'shine', 88, 30, 52, 'Eski bir madeni para gibi sıcak.'),
  sock('k16', 'Balıkçı Ağı', 'tayt', '#14141a', '#3b3b4a', 'fishnet', 78, 20, 36, 'Ağ gibi. Gece kulübü değil, devriye; ama sen giydin.'),
  sock('k17', 'Çizgili Şeker', 'dizaltı', '#f4f0e8', '#ff4f6d', 'stripe', 64, 70, 34, 'Diz altında pembe çizgiler. Üniforma eteğinin altından sadece bir şerit.'),
  sock('k18', 'Puantiye Yağmuru', 'dizaltı', '#22222c', '#ffb703', 'dot', 62, 68, 38, 'Siyah zemin, sarı puantiyeler. Yağmur damlaları gibi dağılmış.'),
  sock('k19', 'Dantelli Kenar', 'dizaltı', '#f7e8ef', '#c98ba8', 'lace', 58, 74, 36, 'Kenarı dantel. Kimse görmez; sen bilirsin.'),
  sock('k20', 'Kadife Siyah', 'tayt', '#1a1a20', '#34343f', 'velvet', 84, 46, 72, 'Kadife gibi yumuşak ama lastiği kararlı.'),
  sock('k21', 'Kül Grisi', 'külotlu', '#6b6b75', '#a7a7b2', 'sheer', 72, 50, 52, 'Şehrin beton rengi. Gözden kaçmak için iyi.'),
  sock('k22', 'Zümrüt', 'tayt', '#0f7a4d', '#7dffc4', 'shine', 89, 28, 54, 'Koyu yeşil, ışıkta cam gibi.'),
  sock('k23', 'Menekşe', 'külotlu', '#6a3d9a', '#c9a7ff', 'solid', 80, 42, 44, 'Morun daha sakin, daha derin hali.'),
  sock('k24', 'Kobalt Mavi', 'tayt', '#1240ab', '#5f8bff', 'shine', 91, 26, 50, 'Elektrik mavisi. Gece boyunca bir neon tabela gibi.'),
  sock('k25', 'Somon', 'külotlu', '#ff9a86', '#ffd6cc', 'sheer', 68, 58, 46, 'Yumuşak somon. Teninle neredeyse karışıyor.'),
  sock('k26', 'Limonata', 'dizaltı', '#fff3a3', '#e0b400', 'stripe', 60, 72, 32, 'Sarı-beyaz çizgiler. Ruh halini bir derece kaldırıyor.'),
  sock('k27', 'Kar Beyazı Dizaltı', 'dizaltı', '#fbf9f4', '#ded7cc', 'rib', 66, 78, 42, 'Kalın, temiz, neredeyse masum.'),
  sock('k28', 'Okul Çizgili', 'dizaltı', '#1d1d2b', '#e8e8f0', 'stripe', 63, 70, 38, 'Koyu lacivert üstüne ince beyaz çizgiler.'),
  sock('k29', 'Yün Soket', 'soket', '#8b8b86', '#c8c8c0', 'rib', 52, 88, 46, 'Kalın yün. Taytın altına giyilince ayak bileğini sarıyor.'),
  sock('k30', 'Polar Soket', 'soket', '#efe9df', '#c4b8a8', 'rib', 48, 94, 40, 'Yumuşak polar. Ayakların gece boyunca bir yastıkta gibi.'),
  sock('k31', 'Şeffaf Külotlu', 'külotlu', '#2a2a34', '#4a4a5a', 'sheer', 82, 34, 30, 'Neredeyse görünmez. Sadece ışıkta bir parıltı.'),
  sock('k32', 'Yıldız Tozu', 'külotlu', '#2b2140', '#ffd166', 'glitter', 74, 48, 42, 'Koyu mor üstüne altın toz. Her adımda bir yıldız kayıyor.'),
  sock('k33', 'Zebra', 'tayt', '#f4f4f4', '#141414', 'zebra', 85, 32, 44, 'Siyah-beyaz çizgiler. Kalabalıkta gözler üzerinde.'),
  sock('k34', 'Kiraz Çiçeği', 'külotlu', '#ffc2d1', '#b34a6d', 'dot', 72, 56, 38, 'Pembe üstüne küçük beyaz çiçekler. Bahar, gece yarısı.'),
];

const SHOES = [
  shoe('a01', 'Kadife Babet', 'babet', '#7a2b3a', 1, 88, 30, 34, 18, 66, 'Yumuşak kadife. Ayak parmaklarını sıkmıyor ama yağmuru da sevmiyor.'),
  shoe('a02', 'Deniz Babeti', 'babet', '#2f6f6a', 1.5, 82, 72, 58, 22, 72, 'Kauçuk tabanlı, suya dayanıklı babet. Sahil devriyesinin klasiği.'),
  shoe('a03', 'Kore Babeti', 'babet', '#1b1b22', 1, 80, 34, 40, 20, 68, 'Sivri burunlu, ince deri. Şık ama taşlı yolda acımasız.'),
  shoe('a04', 'Balerin Pembe', 'babet', '#e8a0b4', 1, 86, 24, 30, 16, 60, 'Pembe balerin. İçinde dans etme isteği uyandırıyor.'),
  shoe('a05', 'Deri Babet', 'babet', '#5a3a26', 1.5, 84, 48, 46, 24, 70, 'Kahverengi deri. Zamanla ayağının şeklini alır.'),
  shoe('a06', 'Hasır Babet', 'babet', '#c9a66b', 1, 74, 18, 12, 30, 58, 'Hasır. Kumu içine davet eder, sonra da saklar.'),
  shoe('a07', 'Saten Babet', 'babet', '#d9c7b8', 1, 78, 22, 26, 18, 54, 'Saten. Bir damla su bile iz bırakır.'),
  shoe('a08', 'Kauçuk Babet', 'babet', '#30343a', 1.5, 72, 94, 80, 28, 82, 'Yağmur için yapılmış. Hiç şık değil, hiç üzmez.'),
  shoe('a09', 'Stiletto Siyah', 'topuklu', '#101014', 11, 38, 20, 24, 78, 44, 'İnce, uzun, acımasız. Her adımda betona bir soru soruyor.'),
  shoe('a10', 'Kırmızı Stiletto', 'topuklu', '#c1122f', 10, 42, 22, 26, 84, 46, 'Kırmızı deri. Gece boyunca bir uyarı ışığı gibi.'),
  shoe('a11', 'Gümüş İnce Topuk', 'topuklu', '#c3c8d2', 11, 36, 18, 22, 80, 42, 'Gümüş. Işıkta ayaklarının altında bir çizgi.'),
  shoe('a12', 'Platform Siyah', 'topuklu', '#15151c', 12, 48, 26, 34, 70, 50, 'Kalın platform. Yüksek ama stiletto kadar acıtmıyor.'),
  shoe('a13', 'Blok Topuk Krem', 'topuklu', '#e8dfcf', 7, 66, 32, 40, 52, 58, 'Geniş topuk. Uzun devriyede en dengeli topuklu.'),
  shoe('a14', 'Kedi Topuk', 'topuklu', '#3a2a22', 6, 62, 38, 42, 58, 62, 'Kısa, kıvrık topuk. Koşmaya bir şans bırakıyor.'),
  shoe('a15', 'PVC Şeffaf Topuk', 'topuklu', '#b9c4c9', 10, 32, 60, 54, 82, 40, 'Şeffaf PVC. İçindeki çorabı herkes görür.'),
  shoe('a16', 'Bağcıklı Topuklu', 'topuklu', '#5b2c3a', 9, 50, 30, 38, 66, 54, 'Bilekten bağcıklı. Ayakta sıkı durur, ama bağlaması zaman alır.'),
  shoe('a17', 'Kovboy Topuk', 'topuklu', '#8a5a2b', 6, 58, 44, 48, 74, 64, 'Deri, kalın topuk. Her adımda tok bir ses.'),
  shoe('a18', 'Dolgu Topuk Kadife', 'topuklu', '#4a1f35', 8, 60, 28, 36, 48, 52, 'Kadife kaplı dolgu topuk. Yumuşak ama suyu sever.'),
  shoe('a19', 'Sivri Burun Topuklu', 'topuklu', '#241a1a', 10, 40, 26, 30, 72, 48, 'Sivri burun. Parmaklarını gece boyunca bir arada tutar.'),
  shoe('a20', 'Bantlı Topuklu', 'topuklu', '#d6b47a', 9, 46, 24, 30, 68, 46, 'Ayak bileğinde ince bir bant. Her adımda bir tık.'),
  shoe('a21', 'Gece Mavisi Topuklu', 'topuklu', '#1c2a56', 11, 40, 22, 26, 76, 44, 'Lacivert deri. Üniformaya en yakın topuklu.'),
  shoe('a22', 'Zümrüt Topuklu', 'topuklu', '#0e5c3d', 10, 42, 24, 28, 74, 44, 'Zümrüt yeşili. Işıkta neredeyse siyah görünüyor.'),
  shoe('a23', 'Simli Topuklu', 'topuklu', '#9f8f6a', 8, 44, 20, 26, 82, 40, 'Simli yüzey. Her adımda yere bir kıvılcım bırakıyor.'),
  shoe('a24', 'Yılan Desenli Topuklu', 'topuklu', '#6b5a37', 10, 38, 26, 30, 70, 42, 'Yılan deseni. Şüphelilerin gözü ister istemez ayaklarına kayıyor.'),
  shoe('a25', 'Kiraz Topuklu', 'topuklu', '#b02a3a', 7, 56, 28, 34, 60, 50, 'Kiraz kırmızısı, kısa topuk. Sevimli ama ciddi.'),
  shoe('a26', 'Platform Spor', 'spor', '#2b2b33', 5, 82, 55, 58, 30, 78, 'Kalın tabanlı spor. Gizli bir yükseklik.'),
  shoe('a27', 'Koşu Ayakkabısı', 'spor', '#e8e8ea', 3, 94, 48, 62, 20, 88, 'Beyaz koşu ayakkabısı. Üniformayla tuhaf, kovalamacada mükemmel.'),
  shoe('a28', 'Keten Espadril', 'babet', '#d7c2a1', 3, 76, 20, 16, 34, 56, 'Keten. Kum ve toz için bir mıknatıs.'),
  shoe('a29', 'Yağmur Çizmesi', 'bot', '#2c3a3a', 4, 70, 96, 88, 46, 84, 'Lastik çizme. Suya ve kuma karşı bir kale.'),
  shoe('a30', 'Deri Bot', 'bot', '#3a2b22', 5, 66, 72, 76, 62, 76, 'Bağcıklı deri bot. Bileği sarar, gece boyunca güvende tutar.'),
  shoe('a31', 'Chelsea Bot', 'bot', '#20202a', 4, 74, 58, 64, 44, 72, 'Yanları lastikli, giyip çıkarması kolay.'),
  shoe('a32', 'Askeri Bot', 'bot', '#4b4f3a', 3, 60, 76, 82, 68, 86, 'Ağır, sağlam, neredeyse bir silah kadar ciddi.'),
  shoe('a33', 'Sandalet Topuklu', 'topuklu', '#b58b5a', 9, 34, 12, 8, 64, 38, 'İnce bantlar. Her kum tanesi içeri girmek için sıraya girer.'),
  shoe('a34', 'Terlik Babet', 'babet', '#7fa6a1', 1, 90, 30, 22, 40, 46, 'Ev terliği rahatlığında. Devriye için cesur bir seçim.'),
];

const CASES = [
  {
    id: 'c1', code: 'HA-114', title: 'Fenerin Altında',
    place: 'Deniz Feneri Yolu', district: 'Sahil',
    subject: 'yedi yaşındaki Min-ho', detail: 'annesinin elini bırakıp fener merdivenlerine koşmuş',
    clue: 'küçük bir spor ayakkabı izi', suspect: 'fener bekçisi',
    start: 'c1_start', end: 'c1_end',
  },
  {
    id: 'c2', code: 'HA-207', title: 'Plakasız Taksi',
    place: 'Gümüş Sokak', district: 'Merkez',
    subject: 'gece vardiyasından çıkan bir hemşire', detail: 'plakasız siyah bir taksiye binmiş',
    clue: 'yağmurda silinmiş bir lastik izi', suspect: 'taksi şoförü',
    start: 'c2_start', end: 'c2_end',
  },
  {
    id: 'c3', code: 'HA-318', title: 'Sahil Yolu Yarışı',
    place: 'Sahil Yolu', district: 'Sahil',
    subject: 'iki modifiyeli araba', detail: 'her gece 02:00’de ışıklarda yarışıyor',
    clue: 'asfaltta taze bir fren izi', suspect: 'genç sürücü',
    start: 'c3_start', end: 'c3_end',
  },
  {
    id: 'c4', code: 'HA-422', title: 'Boş Dairede Müzik',
    place: 'Hane Apartmanı', district: 'Merkez',
    subject: 'on ikinci kattaki boş daire', detail: 'içinde kimse yokken her gece aynı şarkı çalıyor',
    clue: 'kapı altından sızan turuncu ışık', suspect: 'emlakçı',
    start: 'c4_start', end: 'c4_end',
  },
  {
    id: 'c5', code: 'HA-509', title: 'Liman’da Sahte Rozet',
    place: 'Doğu Limanı', district: 'Liman',
    subject: 'sahte üniformalı bir adam', detail: 'kamyonları yanlış kapıya yönlendiriyor',
    clue: 'yağ lekesi içinde bir ayak izi', suspect: 'sahte memur',
    start: 'c5_start', end: 'c5_end',
  },
  {
    id: 'c6', code: 'HA-613', title: 'Gece Pazarında Kayıp Çanta',
    place: 'Haesong Gece Pazarı', district: 'Merkez',
    subject: 'bir teyzenin düğün yüzüğü', detail: 'çantasıyla birlikte kaybolmuş',
    clue: 'ıslak betonda pembe bir çanta izi', suspect: 'seyyar satıcı',
    start: 'c6_start', end: 'c6_end',
  },
  {
    id: 'c7', code: 'HA-704', title: 'Buhar Sokağında Çığlık',
    place: 'Buhar Sokağı', district: 'Eski Şehir',
    subject: 'hamam çıkışında düşen bir teyze', detail: 'kalçasını incitmiş, kimse duymamış',
    clue: 'ıslak mermerde kaymış bir terlik', suspect: 'hamam görevlisi',
    start: 'c7_start', end: 'c7_end',
  },
  {
    id: 'c8', code: 'HA-811', title: 'Kıyıya Vuran Boş Kayık',
    place: 'Kum Burnu', district: 'Sahil',
    subject: 'içinde kimse olmayan bir kayık', detail: 'motoru hâlâ sıcak, kürekleri kayıp',
    clue: 'kumda derin bir çizme izi', suspect: 'kaçakçı',
    start: 'c8_start', end: 'c8_end',
  },
];

/* --- kısayollar --- */
const SOCK = (s) => SOCKS.find(x => x.id === s.sock) || SOCKS[0];
const SHOE = (s) => SHOES.find(x => x.id === s.shoe) || SHOES[0];
const CASE = (s) => CASES[(s.caseIndex || 0) % CASES.length];
const pickList = (arr) => arr[Math.floor(Math.random() * arr.length)];

const soak = (s, n) => {
  const prot = SHOE(s).water / 100;
  const add = Math.max(1, Math.round(n * (1 - prot * 0.85)));
  s.wet = Math.min(3, s.wet + add);
  return SHOE(s).water > 60
    ? `${SHOE(s).name} suyu büyük ölçüde savuşturdu. Yine de içi nemli.`
    : `${SHOE(s).name} suyu içine çekti. ${SOCK(s).name} bacağına yapıştı.`;
};
const sandy = (s, n) => {
  const prot = SHOE(s).sand / 100;
  const add = Math.max(1, Math.round(n * (1 - prot * 0.85)));
  s.sand = Math.min(3, s.sand + add);
  return SHOE(s).sand > 65
    ? `${SHOE(s).name} kumun çoğunu dışarıda tuttu. Yine de tabanda bir çıtırtı var.`
    : `Kum ${SHOE(s).name} içine doldu. Her adımda minik bir çıtırtı.`;
};
const smellOf = (s) => Math.min(3, Math.max(0, s.smell));

/* --- olay kütüphanesi --- */
const EVENTS = {

  /* ============ VAKA AÇILIŞLARI ============ */
  c1_start: {
    cat: 'start', title: 'Fenerin Altında', place: 'Deniz Feneri Yolu',
    text: (s) => `Saat 23:10. Deniz fenerinin soğuk taş merdivenleri ay ışığında ıslak parlıyor. Annesi bankta, elleri dizlerinde; “Min-ho sadece bir dakika önce buradaydı,” diyor. Telsizde santral: “Yuna, deniz tarafını da tara.” ${SOCK(s).name} diz arkasını kesiyor, ${SHOE(s).name} taşlarda hafifçe kayıyor. Rüzgâr tuz kokuyor.`,
    choices: [
      { label: 'Merdivenleri tırman, fenerin tepesine bak', fx: { energy: -6, pain: 5, clues: 1 }, next: 'k_iz' },
      { label: 'Kıyıya in, ıslak kumda iz ara', fx: { energy: -3 }, run: (s) => sandy(s, 1), next: 'i_kum' },
      { label: 'Anneyi sakinleştir, en son nerede gördüğünü sor', fx: { moral: 6, clues: 1, tag: 'merhamet' }, next: 'k_tanik' },
      { label: 'Aracı sahile çevir, farlarla kıyıyı tara', fx: { energy: 2, clues: 1 }, next: 'i_radyo' },
    ],
  },
  c2_start: {
    cat: 'start', title: 'Plakasız Taksi', place: 'Gümüş Sokak',
    text: (s) => `Gümüş Sokak’ta neonlar yağmurda eriyor. Bir hemşire, saat 23:20’de plakasız siyah bir taksiye binmiş. Tanık, aracın arka camında mavi bir ışık gördüğünü söylüyor. Sen köşede duruyorsun; ${SHOE(s).heel > 5 ? 'topukların ıslak asfaltta her saniye biraz daha batıyor' : 'babetlerin suyu çoktan içine almış'}, ${SOCK(s).name} ise bacağını ince bir zarla kaplıyor. Uzaktan bir motor sesi.`,
    choices: [
      { label: 'Motor sesini takip et, ara sokağa gir', fx: { energy: -5, pain: 3 }, next: 'k_sokak' },
      { label: 'Sokaktaki büfenin kamerasını sor', fx: { energy: -2 }, next: 'k_kamera' },
      { label: 'Hemşirenin arkadaşına ulaş, telefonunu al', fx: { moral: 2, clues: 1 }, next: 'k_telefon' },
      { label: 'Yağmurda iz sür, lastik izini bul', run: (s) => soak(s, 1), fx: { clues: 1, energy: -3 }, next: 'k_iz' },
    ],
  },
  c3_start: {
    cat: 'start', title: 'Sahil Yolu Yarışı', place: 'Sahil Yolu',
    text: (s) => `Sahil Yolu’nda iki araba ışıklarda bekliyor. Egzoz sesi geceyi ikiye bölüyor. İhbar: her gece aynı saatte yarışıyorlar, biri kırmızı ışıkta geçip bir kuryeyi düşürmüş. Sen devriye aracında, cam açık; rüzgâr ${SOCK(s).name} üzerinden geçiyor. ${SHOE(s).heel > 6 ? 'Gaz pedalına basmak için topuğunla pedala uzanman gerekiyor.' : 'Ayakların pedallara rahatça uzanıyor.'} Telsiz: “Müdahale et, ama dikkatli.”`,
    choices: [
      { label: 'Sirenleri aç, aralarına gir', fx: { energy: -4, pain: 2, clues: 1 }, next: 'i_kaza' },
      { label: 'Işıklarda dur, ehliyet kontrolü yap', fx: { clues: 1, rank: 1 }, next: 'k_dur' },
      { label: 'Yan yola sap, kestirme sokaktan önlerini kes', fx: { energy: -6, pain: 3, clues: 1 }, next: 'k_sokak' },
      { label: 'Santralden plakaları istet', fx: { energy: 3, clues: 1 }, next: 'i_radyo' },
    ],
  },
  c4_start: {
    cat: 'start', title: 'Boş Dairede Müzik', place: 'Hane Apartmanı',
    text: (s) => `Hane Apartmanı’nın on ikinci katında, boş olduğu söylenen daireden her gece aynı şarkı geliyor. Asansör aynasında kendini görüyorsun: üniforma, ${SOCK(s).name}, ${SHOE(s).name}. Onuncu katta asansör sarsılıyor. Kapı açıldığında koridor lambası yanıp sönüyor; müzik, kapının altından turuncu bir ışıkla sızıyor.`,
    choices: [
      { label: 'Merdivenlerden çık, daireyi arkadan çevir', fx: { energy: -5, pain: 4 }, next: 'k_sokak' },
      { label: 'Komşuya sor, bu dairede kim yaşamış', fx: { moral: 3, clues: 1 }, next: 'k_tanik' },
      { label: 'Emlakçının numarasını ara', fx: { clues: 1, energy: -2 }, next: 'k_telefon' },
      { label: 'Asansör aynasında bir şey fark et', fx: { moral: -4, clues: 1 }, next: 'i_ayna' },
    ],
  },
  c5_start: {
    cat: 'start', title: 'Liman’da Sahte Rozet', place: 'Doğu Limanı',
    text: (s) => `Doğu Limanı’nda yağmur, konteynerlerin üstünde teneke sesi çıkarıyor. Sahte üniformalı bir adam kamyonları yanlış kapıya yönlendiriyor. Yaklaştığında rozetini görüyorsun: plastik, parlak, üstünde olmayan bir birimin adı. Ayaklarının altında ince bir yağ tabakası var; ${SHOE(s).name} her adımda kayıyor. ${SOCK(s).name} bileklerine yapışmış durumda.`,
    choices: [
      { label: 'Rozetini göster, kimliğini sor', fx: { rank: 2, clues: 1 }, next: 'k_dur' },
      { label: 'Kamyon şoförüne ne söylediğini sor', fx: { moral: 2, clues: 1 }, next: 'k_tanik' },
      { label: 'Liman kameralarını izle', fx: { energy: -3 }, next: 'k_kamera' },
      { label: 'Yağın içinden geç, arkasından sokul', fx: { pain: 3, clues: 1 }, run: (s) => `${soak(s, 1)} Yağ, ${SHOE(s).name} yüzeyini kayganlaştırdı.`, next: 'k_sokak' },
    ],
  },
  c6_start: {
    cat: 'start', title: 'Gece Pazarında Kayıp Çanta', place: 'Haesong Gece Pazarı',
    text: (s) => `Gece pazarı hâlâ kalabalık. Bir teyze, düğün yüzüğünün olduğu çantayı kaybetmiş; elleri titriyor. Tezgahlar arasında ıslak beton, dökülmüş balık suyu ve ayak izleri. ${SHOE(s).name} kalabalıkta eziliyor, ${SOCK(s).name} ise nemi tutmuş. Teyze koluna giriyor: “Kızım, o yüzük kırk yıllık.”`,
    choices: [
      { label: 'Tezgah sahiplerine tek tek sor', fx: { energy: -4, moral: 2, clues: 1 }, next: 'k_tanik' },
      { label: 'Çantanın izini sür, ara sokaklara bak', fx: { energy: -3 }, next: 'k_iz' },
      { label: 'Pazarın güvenlik kamerasına bak', fx: { clues: 1 }, next: 'k_kamera' },
      { label: 'Su birikintisinden geç, çıkışa koş', run: (s) => soak(s, 2), fx: { energy: -5, clues: 1 }, next: 'k_sokak' },
    ],
  },
  c7_start: {
    cat: 'start', title: 'Buhar Sokağında Çığlık', place: 'Buhar Sokağı',
    text: (s) => `Buhar Sokağı’nın hamam çıkışında bir çığlık. Yaşlı bir teyze ıslak mermerde düşmüş, kalçasını tutuyor. Buhar gözlüğünü buğulandırıyor. Yerdeki su, ${SHOE(s).name} içine sızıyor; ${SOCK(s).name} sıcak nemle bacağına yapışıyor. Hamam görevlisi panikle “Ben bir şey yapmadım!” diyor.`,
    choices: [
      { label: 'Dizlerinin yanına çök, teyzeyi sabit tut', fx: { moral: 5, pain: 3, tag: 'merhamet' }, run: (s) => soak(s, 1), next: 'k_tanik' },
      { label: 'Ambulans çağır, görevliyi sorgula', fx: { energy: -2, clues: 1 }, next: 'k_telefon' },
      { label: 'Kaymış terliğin izini takip et', fx: { clues: 1, energy: -3 }, next: 'k_iz' },
      { label: 'Teyzeyi kucaklayıp dışarı taşı', fx: { energy: -8, pain: 6, moral: 6 }, next: 'i_topuk' },
    ],
  },
  c8_start: {
    cat: 'start', title: 'Kıyıya Vuran Boş Kayık', place: 'Kum Burnu',
    text: (s) => `Kum Burnu’nda içi boş bir kayık kıyıya vurmuş. Motoru hâlâ sıcak. Kürekler yok. Kumda derin bir çizme izi var; iz, denize doğru gidiyor. ${SHOE(s).name} kuma gömülüyor, ${SOCK(s).name} içine ince kum taneleri sızıyor. Telsizde rüzgâr ve uzak bir vapur düdüğü.`,
    choices: [
      { label: 'Kayığa bin, içini kontrol et', fx: { energy: -4, pain: 3 }, run: (s) => sandy(s, 1), next: 'k_iz' },
      { label: 'Sahil güvenliğini ara, kayığı bildir', fx: { rank: 1, energy: 2, clues: 1 }, next: 'i_radyo' },
      { label: 'İzi fotoğrafla, kumda ölç', fx: { clues: 1, energy: -2 }, next: 'k_kamera' },
      { label: 'Kayığı geri it, motoru dinle', fx: { clues: 1, energy: -5 }, run: (s) => sandy(s, 1), next: 'i_kum' },
    ],
  },

  /* ============ GENEL İPUÇLARI ============ */
  k_iz: {
    cat: 'clue', title: 'Islak İz', place: 'İz Sürme',
    text: (s) => {
      const c = CASE(s);
      return `Yağmur yeni dindi. ${c.place} çevresinde ıslak asfalta karışmış ${c.clue} var. Eğilip bakmak için dizlerini bükmek ${SOCK(s).name} daha da geriyor. ${SHOE(s).name} burnu su birikintisinin kenarında duruyor. İz, karanlık bir geçide doğru devam ediyor; orada ${c.suspect} olduğunu düşünüyorsun.`;
    },
    choices: [
      { label: 'İzi takip et, su birikintisinin içinden geç', fx: { clues: 1, pain: 4, energy: -3 }, run: (s) => soak(s, 2), next: 'k_sokak' },
      { label: 'İzi fotoğrafla, yayaya gönder', fx: { clues: 1, energy: -2 }, next: 'k_telefon' },
      { label: 'Yakındaki dükkâna sor, izi göster', fx: { moral: 2 }, next: 'k_tanik' },
      { label: 'Telsizden ekip çağır, izi koru', fx: { rank: 2, energy: 2 }, next: 'i_radyo' },
    ],
  },
  k_tanik: {
    cat: 'clue', title: 'Tanık', place: 'Bir Çay Bardağı',
    text: (s) => {
      const c = CASE(s);
      return `Buhar kokan küçük bir dükkânda yaşlı bir teyze, ${c.subject} hakkında bir şeyler mırıldanıyor. Elinde sıcak çay, gözleri kapıda. “Ben bir şey görmedim,” diyor ama sesi görmediğine inanmıyor. ${SHOE(s).name} eşiğe takılıyor; ${SOCK(s).name} bacağında ıslak bir çizgi bırakmış.`;
    },
    choices: [
      { label: 'Çömeldiğini fark etmeden dinle, çayı kabul et', fx: { moral: 6, energy: 3, tag: 'merhamet' }, next: 'i_kahve' },
      { label: 'Sert sorular sor, gözünü kaçırmasını bekleme', fx: { clues: 1, moral: -6, tag: 'sert' }, next: 'k_dur' },
      { label: 'Not al, teyzenin elini tut', fx: { clues: 1, moral: 3, tag: 'merhamet' }, next: 'i_ayna' },
      { label: 'Sözünü kes, arabaya dön', fx: { energy: 3, moral: -3 }, next: 'i_radyo' },
    ],
  },
  k_kamera: {
    cat: 'clue', title: 'Büfenin Monitörü', place: 'CCTV Odası',
    text: (s) => {
      const c = CASE(s);
      return `Büfenin arkasındaki eski monitörde dört gri kare var. Birinde ${c.clue} görünüyor, sonra ekran karıncalanıyor. Büfeci omzunun üstünden bakıyor. ${SOCK(s).name} sandalyenin kenarına sürtünmüş; ${SHOE(s).name} altında ıslak bir iz bırakmış.`;
    },
    choices: [
      { label: 'Kaydı hızlı sar, zaman damgasını bul', fx: { energy: -4, clues: 1 }, next: 'k_telefon' },
      { label: 'Plakayı zoomla, netleştir', fx: { clues: 1 }, next: 'k_dur' },
      { label: 'Büfeciye kahve söyle, sabırla izle', fx: { moral: 4, energy: 3 }, next: 'i_kahve' },
      { label: 'Camdaki yansımada birini fark et', fx: { clues: 2, moral: -4, tag: 'risk' }, next: 'k_sokak' },
    ],
  },
  k_sokak: {
    cat: 'clue', title: 'Arka Sokak', place: 'Dar Geçit',
    text: (s) => {
      const c = CASE(s);
      return `${c.place} arkasındaki dar geçitte topuk seslerin duvarlarda yankılanıyor. ${SHOE(s).heel > 5 ? 'Her adımda betona ince bir çivi gibi basıyorsun.' : 'Babetlerin ıslak taşta sessiz ama kaygan.'} Köşede ${c.suspect} duruyor; seni gördü. ${SOCK(s).name} bacaklarını sıkıyor, koşmaya hazır değilmiş gibi.`;
    },
    choices: [
      { label: 'Koş, köşeyi kestir', fx: { clues: 1, energy: -8, pain: 8 }, next: 'k_dur' },
      { label: 'Ayakkabıları çıkar, çıplak ayak koş', fx: { clues: 1, pain: -2, energy: -6, moral: -2 }, run: (s) => sandy(s, 1), next: 'k_dur' },
      { label: 'Su birikintisinden kestir', fx: { clues: 1, energy: -4 }, run: (s) => soak(s, 2), next: 'i_su' },
      { label: 'Telsizden destek iste, köşeyi tut', fx: { energy: 2, rank: 2 }, next: 'i_radyo' },
    ],
  },
  k_telefon: {
    cat: 'clue', title: 'Ekrandaki Numara', place: 'Telsiz Odası',
    text: (s) => {
      const c = CASE(s);
      return `${c.suspect} adına kayıtlı bir numara var; ekranda ${c.detail} notu duruyor. Araç içi lamba sarı, ${SOCK(s).name} dizinde bir parıltı bırakıyor. Telefonu eline alıyorsun. Parmakların soğuk.`;
    },
    choices: [
      { label: 'Hemen ara, sesini sakın belli etme', fx: { moral: -2, clues: 1 }, next: 'i_radyo' },
      { label: 'Operatörden sinyal aldır', fx: { clues: 1, energy: -3 }, next: 'k_kamera' },
      { label: 'Min-ji’ye yolla, o daha iyi anlar', fx: { moral: 3, clues: 1, tag: 'ekip' }, next: 'i_arkadas' },
      { label: 'Telefonu kapat, sessizce bekle', fx: { energy: 2, pain: 2 }, next: 'k_sokak' },
    ],
  },
  k_dur: {
    cat: 'clue', title: 'Köşede Kıstırma', place: 'Karanlık Köşe',
    text: (s) => {
      const c = CASE(s);
      return `Şüpheliyi köşeye kıstırdın. Nefes nefese, elleri ceplerinde. ${c.suspect} olduğunu düşünüyorsun ama emin değilsin. ${SHOE(s).heel > 6 ? 'Topukların betonda titriyor; dengede kalmak için dizlerini kilitlemen gerekiyor.' : 'Ayakların yere sağlam basıyor.'} ${SOCK(s).name} üzerinde ıslak bir leke var.`;
    },
    choices: [
      { label: 'Rozetini göster, sakin konuş', fx: { moral: 4, clues: 1, rank: 1, tag: 'sakin' }, next: 'k_tanik' },
      { label: 'Kolundan tut, kelepçeyi hazırla', fx: { pain: 3, clues: 1, moral: -4, rank: -1, tag: 'sert' }, next: 'k_sokak' },
      { label: 'Önce ayakkabılarına bak, kaçmaya hazır mı?', fx: { clues: 1, energy: -2 }, next: 'i_ayna' },
      { label: 'Bırak, takip et', fx: { energy: -5, clues: 1, tag: 'risk' }, next: 'k_iz' },
    ],
  },

  /* ============ ARA OLAYLAR ============ */
  i_su: {
    cat: 'foot', title: 'Taşan Oluk', place: 'Sokak Köşesi',
    text: (s) => `Yağmur oluğu taşmış; su, kaldırımın yarısını kaplamış. ${SHOE(s).name} kenarda bekliyor. ${SHOE(s).water > 60 ? 'Suya dayanıklı olduğunu biliyorsun ama yine de içgüdüsel olarak duruyorsun.' : 'İncecik tabanı suya değdiğinde ne olacağını ikiniz de biliyorsunuz.'} ${SOCK(s).name} bacağında, sanki suyu bekliyor.`,
    choices: [
      { label: 'Atla, karşıya geç', fx: { energy: -3, pain: 3 }, next: 'i_topuk' },
      { label: 'Bas ve geç, önemli değil', run: (s) => soak(s, 2), fx: { moral: -1 }, next: 'i_koku' },
      { label: 'Yoldan dolan, kuru kalmayı seç', fx: { energy: -5, moral: 1 }, next: 'i_kahve' },
      { label: 'Min-ji’nin elini tut, birlikte atla', fx: { moral: 5, energy: -2, tag: 'ekip' }, next: 'i_arkadas' },
    ],
  },
  i_kum: {
    cat: 'foot', title: 'Ayakkabıda Kum', place: 'Kumlu Kıyı',
    text: (s) => {
      const c = CASE(s);
      return `${c.place} kıyısında kum ince ve ıslak. ${SHOE(s).name} her adımda biraz daha gömülüyor. ${SOCK(s).name} içine ince taneler sızıyor; parmaklarının arasında bir çıtırtı başlıyor. Deniz birkaç metre ötede, sabırla.`;
    },
    choices: [
      { label: 'Silk, devam et', run: (s) => sandy(s, 1), fx: { energy: -2 }, next: 'i_su' },
      { label: 'Çıkar, ters çevir, silk', fx: { sand: -2, moral: 2, energy: -3 }, next: 'i_corap' },
      { label: 'Umursama, işe odaklan', fx: { moral: -2 }, run: (s) => sandy(s, 2), next: 'i_koku' },
      { label: 'Parmak uçlarında yürü', fx: { pain: 5, energy: -2 }, next: 'i_tayt' },
    ],
  },
  i_topuk: {
    cat: 'foot', title: 'Topuk Kırıldı', place: 'Beton Zemin',
    text: (s) => {
      const sh = SHOE(s);
      return sh.heel > 5
        ? `Bir çatırtı. ${sh.name} sağ ayağının topuğu betonda kaldı. Şimdi bir ayağın ${Math.round(sh.heel)} cm havada, diğeri yerde. ${SOCK(s).name} bacağını dengede tutmaya çalışıyor. Şehir sana bakıyor gibi.`
        : `Bir dikiş sesi. ${sh.name} yan tarafından ayrıldı; yürüdükçe ayağın ayakkabının içinde kayıyor. ${SOCK(s).name} ıslak, ayakkabı ise artık bir çorap kadar ince.`;
    },
    choices: [
      { label: 'Diğer topuğu da kır, eşitle', fx: { moral: 3, pain: 2, energy: -2 }, next: 'i_ayna' },
      { label: 'Bagajdan yedek babet al', fx: { energy: -4, moral: 2, pain: -3 }, next: 'i_kahve' },
      { label: 'Tek ayakla devam et, iş bitmeden olmaz', fx: { pain: 8, moral: -2, clues: 1 }, next: 'k_sokak' },
      { label: 'Otur, gözyaşlarını tut', fx: { moral: -3 }, next: 'i_agla' },
    ],
  },
  i_corap: {
    cat: 'foot', title: 'Çorap Kaçtı', place: 'Araç İçi',
    text: (s) => `${SOCK(s).name} diz arkasında bir ilmek attı. Naylonun o küçük sesi, koca geceyi deliyor. Kaçık her adımda biraz daha büyüyor. ${SHOE(s).name} içinde ayağın kayıyor. Torpidoda bir oje şişesi var; biri daha önce burada bırakmış.`,
    choices: [
      { label: 'Oje ile durdur, tırnağınla bastır', fx: { moral: 3, energy: -3 }, next: 'i_ayna' },
      { label: 'Görmezden gel, büyürse büyüsün', fx: { moral: -2, pain: 2 }, next: 'i_tayt' },
      { label: 'Min-ji’den yedek çorap iste', fx: { moral: 2 }, next: 'i_arkadas' },
      { label: 'Yırt, kurtul', fx: { moral: -4, pain: -2, energy: 2 }, next: 'i_su' },
    ],
  },
  i_agla: {
    cat: 'mind', title: 'Gözyaşları', place: 'Issız Köşe',
    text: (s) => `Gözlerin doldu. Nedenini tam bilmiyorsun: belki topuk, belki teyzenin elleri, belki sadece gece. ${SOCK(s).name} bacağında ıslak bir çizgi gibi duruyor, ${SHOE(s).name} ise seni ayakta tutmaya çalışıyor. Derin bir nefes alıyorsun; göğsün titriyor.`,
    choices: [
      { label: 'Bırak ağla, kimse görmüyor', fx: { moral: 9, energy: -3, cry: 1 }, next: 'i_ayna' },
      { label: 'Derin nefes al, ona kadar say', fx: { moral: 4, energy: -2 }, next: 'i_kahve' },
      { label: 'Arabaya saklan, camları kapat', fx: { energy: 4, moral: 2 }, next: 'i_radyo' },
      { label: 'Gözyaşını sil, devam et', fx: { moral: -3, pain: 2, tag: 'sert' }, next: 'k_sokak' },
    ],
  },
  i_koku: {
    cat: 'foot', title: 'Deniz Suyu Kokusu', place: 'Devriye Aracı',
    text: (s) => `${SHOE(s).name} içinden ince bir deniz kokusu yükseliyor. Islak kum, naylon ve tuz. ${SOCK(s).name} bacağına yapışmış; ayakkabıyı çıkarmadan geçmeyeceğini biliyorsun. Torpidoda ıslak mendil, bir de yedek çorap var.`,
    choices: [
      { label: 'Islak mendille iyice sil', fx: { smell: -1, wet: -1, energy: -2 }, next: 'i_corap' },
      { label: 'Yedek çorap giy, eskisini poşete koy', fx: { smell: -2, pain: -3, moral: 2 }, next: 'i_ayna' },
      { label: 'Parfüm sık, kokuyu bastır', fx: { smell: -1, moral: 1 }, next: 'i_kahve' },
      { label: 'Umursama, kokarsa kokar', fx: { moral: -4 }, next: 'i_agla' },
    ],
  },
  i_tayt: {
    cat: 'foot', title: 'Tayt Sıkıyor', place: 'Yürüyüş',
    text: (s) => `${SOCK(s).name} belini iki parmak içeri çekmiş; her adımda nefesini biraz daha kısıyor. Diz arkasında ince bir baskı, ayak bileğinde bir iz. ${SHOE(s).heel > 5 ? 'Topuklar bu baskıyı ikiye katlıyor.' : 'Babetler bile bu kadar sıkı bir taytla rahat değil.'} Yürürken kendini kasmışsın.`,
    choices: [
      { label: 'Bel lastiğini ayarla, bir nefeslik boşluk yarat', fx: { pain: -4, moral: 2 }, next: 'i_ayna' },
      { label: 'Nefes al, omuzlarını gevşet', fx: { pain: -2, moral: 3, energy: 2 }, next: 'i_kahve' },
      { label: 'Arabada değiştir, bagajda yedek var', fx: { energy: -3, pain: -5 }, next: 'i_corap' },
      { label: 'Dişini sık, gece bitmek üzere', fx: { pain: 4, moral: -3 }, next: 'i_agla' },
    ],
  },
  i_kaza: {
    cat: 'car', title: 'Küçük Kaza', place: 'Sahil Yolu',
    text: (s) => {
      const c = CASE(s);
      return `Direksiyonda, ${c.place} kavşağında park halindeki bir scooter’a sürttün. Aynada scooter’ın yan yattığını görüyorsun. Kimse yok. Kalbin hızla çarpıyor; ${SOCK(s).name} bacağında titreyen bir çizgi. ${SHOE(s).name} pedaldan kayıyor.`;
    },
    choices: [
      { label: 'İn, hasarı kontrol et, not bırak', fx: { energy: -3, moral: 2, rank: 1 }, next: 'i_ayna' },
      { label: 'Telsizden bildir, tutanak tut', fx: { rank: 2, moral: 1, energy: -2 }, next: 'i_radyo' },
      { label: 'Bas, uzaklaş; kimse görmedi', fx: { moral: -8, rank: -2, tag: 'risk' }, next: 'i_agla' },
      { label: 'Direksiyona yaslan, bir dakika nefes al', fx: { moral: -2, energy: 3 }, next: 'i_agla' },
    ],
  },
  i_radyo: {
    cat: 'car', title: 'Telsiz', place: 'Devriye Aracı',
    text: (s) => `Telsiz cızırdıyor: “Gece devriyesi 7, duyuyor musun?” Santraldeki ses yorgun. Torpido lambası ${SOCK(s).name} rengini alıyor. ${SHOE(s).heel > 5 ? 'Topuklarını paspasa sürtüyorsun.' : 'Babetlerini paspasa bastırıyorsun.'} Cevap vermek için düğmeye uzanıyorsun.`,
    choices: [
      { label: 'Profesyonel cevap ver, durumu bildir', fx: { rank: 2, energy: -1 }, next: 'k_telefon' },
      { label: 'Yardım iste, yalnız devam etme', fx: { energy: 3, moral: 2, tag: 'ekip' }, next: 'i_arkadas' },
      { label: 'Sesi kıs, biraz sessizlik istiyorsun', fx: { moral: -3, energy: 2 }, next: 'i_ayna' },
      { label: 'Duygularını paylaş; santral de bir insan', fx: { moral: 5, rank: -1 }, next: 'i_kahve' },
    ],
  },
  i_yagmur: {
    cat: 'city', title: 'Ani Yağmur', place: 'Açık Alan',
    text: (s) => `Yağmur aniden bastırdı. Damlalar ${SOCK(s).name} üzerinde küçük izler bırakıyor. ${SHOE(s).name} suya karşı ${SHOE(s).water > 60 ? 'dayanıklı görünüyor' : 'hiç şansı yok'}. Kaldırımda şemsiyesiz insanlar koşuşuyor; biri sana bakıp gülümsüyor.`,
    choices: [
      { label: 'Şemsiyeyi aç, tempoyu koru', fx: { moral: 2, energy: -1 }, next: 'i_ayna' },
      { label: 'Bir tente altına gir, geçmesini bekle', fx: { energy: 3, moral: 1 }, next: 'i_kahve' },
      { label: 'Yürümeye devam et, ıslanacaksa ıslansın', run: (s) => soak(s, 2), fx: { energy: -2 }, next: 'i_su' },
      { label: 'Yağmurda birkaç saniye dans et', fx: { moral: 8, energy: 2 }, run: (s) => soak(s, 1), next: 'i_kedi' },
    ],
  },
  i_kedi: {
    cat: 'mind', title: 'Kaldırımda Kedi', place: 'Sokak',
    text: (s) => `Kaldırımda ıslak bir kedi oturuyor. Sana bakıyor, kuyruğunu ${SHOE(s).name} burnuna sürtüyor. Gece boyunca ilk kez kimse senden bir şey istemiyor. ${SOCK(s).name} bacağında yağmur izleri; kedi sıcak.`,
    choices: [
      { label: 'Çantadaki kuru mamayı ver', fx: { moral: 5, energy: -1 }, next: 'i_kahve' },
      { label: 'Birkaç saniye sev', fx: { moral: 3 }, next: 'i_ayna' },
      { label: 'Arabaya al, ısınsın', fx: { moral: 6, energy: -2 }, next: 'i_radyo' },
      { label: 'Yoluna devam et; vardiya bitmedi', fx: { moral: -2 }, next: 'i_agla' },
    ],
  },
  i_ayna: {
    cat: 'mind', title: 'Vitrin Aynası', place: 'Kapalı Vitrin',
    text: (s) => `Kapalı bir vitrinin önünden geçiyorsun. Camda kendini görüyorsun: üniforma, ${SOCK(s).name}, ${SHOE(s).name}. Saçın nemli, gözlerinin altı mor. Bir an bu kadını tanımıyormuş gibi oluyorsun. Sonra o da sana bakıyor.`,
    choices: [
      { label: 'Üniformayı düzelt, rozetini parlat', fx: { moral: 3, rank: 1 }, next: 'i_radyo' },
      { label: 'Çorabın kaçığını kontrol et', fx: { moral: -1, pain: 1 }, next: 'i_corap' },
      { label: 'Gözlerini kaçır, yürümeye devam et', fx: { moral: -3 }, next: 'i_agla' },
      { label: 'Kendine komik bir yüz yap', fx: { moral: 5, energy: 2 }, next: 'i_kedi' },
    ],
  },
  i_arkadas: {
    cat: 'mind', title: 'Min-ji Arıyor', place: 'Telefon',
    text: (s) => `Telefonun titriyor. Min-ji. “Yuna, sesin… iyi misin? Telsizde nefesini duydum.” Arka planda bir çaydanlık sesi. Min-ji gece vardiyasında ama hâlâ seni düşünüyor. ${SOCK(s).name} bacağında, telefon ışığı küçük bir kare.`,
    choices: [
      { label: 'Dürüst ol, bugün zor geçti de', fx: { moral: 6, energy: 2, tag: 'ekip' }, next: 'i_kahve' },
      { label: 'Şaka yap, onu güldür', fx: { moral: 4, energy: 1 }, next: 'i_kedi' },
      { label: 'Sadece yorgunum de, kapat', fx: { energy: 3, moral: -1 }, next: 'i_ayna' },
      { label: 'Kapat, sesini duymak istemiyorsun', fx: { moral: -4 }, next: 'i_agla' },
    ],
  },
  i_kahve: {
    cat: 'city', title: '24 Saat Kahve', place: 'Köşe Kafe',
    text: (s) => `Köşedeki kafe hâlâ açık. Buhar, camda bir daire çiziyor. Sıcak latte kokusu ${SOCK(s).name} üzerindeki yağmur kokusunu bir an bastırıyor. Tezgahta uyuklayan kedi, radyoda eski bir balad. ${SHOE(s).name} kapıdaki paspasa takılıyor.`,
    choices: [
      { label: 'Sıcak latte al, birkaç yudum iç', fx: { energy: 8, moral: 2 }, next: 'i_yagmur' },
      { label: 'Üstüne dök, panik yapma', fx: { moral: -3, energy: 2, pain: 1 }, next: 'i_su' },
      { label: 'Min-ji’ye de bir tane al', fx: { moral: 3, energy: 3, tag: 'ekip' }, next: 'i_arkadas' },
      { label: 'Sadece su iç, ayakta kal', fx: { energy: 3, moral: 1 }, next: 'i_ayna' },
    ],
  },

  /* ============ VAKA KAPANIŞLARI ============ */
  c1_end: {
    cat: 'end', title: 'Fenerin Tepesi', place: 'Deniz Feneri',
    text: (s) => {
      const c = CASE(s); const ok = s.clues >= 2;
      return ok
        ? `Min-ho’yu fenerin arkasındaki taş nişte buldun. Dizleri kum içinde, elleriyle denizi sayıyor. “Annem kızmadı mı?” diye soruyor. ${SOCK(s).name} dizlerinde ıslak bir iz, ${SHOE(s).name} taşta kayıyor. Aşağıda annesinin sesi.`
        : `Fenerin çevresini saatlerce aradın. Min-ho’yu sonunda iskelenin altında, uyuyakalmış halde buldun; ıslak, üşümüş ama sağ. ${c.subject} sana “geldin” diyor. ${SOCK(s).name} bacağında kum, ${SHOE(s).name} su dolu.`;
    },
    choices: [
      { label: 'Ceketini sar, kucağına al', fx: { moral: 8, pain: 3, energy: -4, rank: 3, tag: 'merhamet' }, endLine: 'Min-ho ceketinin içinde uyuyakaldı. Annesi merdivenlerde seni bekliyordu.' },
      { label: 'Annesini çağır, ikisini buluştur', fx: { moral: 6, rank: 2, tag: 'sakin' }, endLine: 'Annesiyle çocuğu merdivenlerde buluştu. Kimse konuşmadı; gerek yoktu.' },
      { label: 'Çocuğa neden kaçtığını sor', fx: { clues: 1, moral: 2, rank: 1, tag: 'sert' }, endLine: 'Min-ho omuz silkti. Sonra “denizi sayıyordum” dedi. Buna bir cevabın yoktu.' },
      { label: 'Kenara otur, ikisi sarılırken sen de ağla', fx: { moral: 10, energy: -2, rank: 2, tag: 'merhamet' }, endLine: 'Sen de ağladın. Annesi sana bir mendil uzattı; mendil çiçek kokuyordu.' },
    ],
  },
  c2_end: {
    cat: 'end', title: 'Taksinin Bagajı', place: 'Gümüş Sokak',
    text: (s) => {
      const ok = s.clues >= 2;
      return ok
        ? `Plakasız taksiyi ara sokakta köşeye sıkıştırdın. Bagajda, hemşirenin çantası ve bir dizi sahte plaka var. Şoför direksiyona yaslanmış, sigara yakmak istiyor. ${SOCK(s).name} soğuktan bacağına yapışmış; ${SHOE(s).name} pedala basmayı bekliyor.`
        : `Taksiyi buldun ama bagaj boştu. Hemşireyi birkaç sokak ötede, yürürken buldun; korkmuş ama iyi. Şoför ise kayıplarda. ${SOCK(s).name} bu geceyi hatırlayacak; ${SHOE(s).name} ise artık su dolu.`;
    },
    choices: [
      { label: 'Şoförü kelepçele, hakkını oku', fx: { rank: 3, clues: 1, energy: -3, tag: 'sert' }, endLine: 'Şoförü kelepçelerken bileğinin titrediğini fark etti. “İlk kez mi?” diye sordu. Cevap vermedin.' },
      { label: 'Hemşireyi ara, iyi olduğunu söyle', fx: { moral: 6, rank: 1, tag: 'merhamet' }, endLine: 'Hemşire telefonda ağladı. Sen de ağladın; telsiz açıktı.' },
      { label: 'Uyarı ver, şoförü bırak, plakaları al', fx: { clues: 1, moral: -2, rank: -1, tag: 'risk' }, endLine: 'Şoför gitti. Plakalar sende. Arkanda mavi bir ışık kaldı.' },
      { label: 'Bagajı boşalt, her şeyi kanıt poşetle', fx: { rank: 2, clues: 1, energy: -4, tag: 'sakin' }, endLine: 'Kanıt poşetlerini bagaja yerleştirdin. Hemşirenin çantası hâlâ ıslaktı.' },
    ],
  },
  c3_end: {
    cat: 'end', title: 'Işıklarda', place: 'Sahil Yolu',
    text: (s) => {
      const ok = s.clues >= 2;
      return ok
        ? `Yarış arabasını sahil yolunda durdurdun. Genç sürücü camı indiriyor, müzik hâlâ açık. Ehliyeti yok. “Bir kere,” diyor. “Sadece bir kere.” ${SHOE(s).heel > 5 ? `Topukların asfaltta, dizlerin hafifçe bükük.` : `Babetlerin asfaltta sağlam.`} ${SOCK(s).name} rüzgârda.`
        : `Araçlardan biri kaçtı; diğerini bir benzinlikte buldun. Sürücü “ben yarışmıyordum” diyor. Kanıt zayıf. ${SOCK(s).name} bacağında gergin, ${SHOE(s).name} yorgun.`;
    },
    choices: [
      { label: 'Ehliyetsiz sürücüyü araca al', fx: { rank: 3, clues: 1, moral: -2, tag: 'sert' }, endLine: 'Arabanın arka koltuğunda sessizce oturdu. Müziği kapatmadın; belki ihtiyacı vardı.' },
      { label: 'Ona bir ders ver: bir tur da sen kullan', fx: { moral: 7, energy: -2, rank: -1, tag: 'risk' }, endLine: 'Bir tur attın. Sürücü hayatında bu kadar hızlı gitmediğini söyledi. Ehliyeti hâlâ yoktu.' },
      { label: 'Ceza yaz, ailesini ara', fx: { rank: 2, moral: 3, energy: -3, tag: 'sakin' }, endLine: 'Annesi geldi. Çocuk ağlamadı; sen ağladın. Ceza makbuzu ıslandı.' },
      { label: 'Bırak, ama bir daha görürsen kefaletle bırakmayacağını söyle', fx: { moral: 2, rank: -1, tag: 'merhamet' }, endLine: 'Gitti. Egzoz sesi sahil boyunca uzadı. Sen orada, ışıklarda kaldın.' },
    ],
  },
  c4_end: {
    cat: 'end', title: 'On İkinci Kat', place: 'Hane Apartmanı',
    text: (s) => {
      const ok = s.clues >= 2;
      return ok
        ? `Dairenin kapısını açtığında müzik kesildi. İçeride kimse yok; sadece eski bir radyo, bir zamanlayıcıya bağlı. Emlakçı, daireyi göstermek için her gece müziği açık bırakıyormuş. ${SOCK(s).name} koridor lambasının turuncusunda parlıyor.`
        : `Kapıyı açtığında müzik hâlâ çalıyordu, sonra kendi kendine durdu. Dairede kimse yok. Radyo eski, tozlu. ${SHOE(s).name} eşikte, ${SOCK(s).name} bacağında. Koridor lambası son kez yanıp söndü.`;
    },
    choices: [
      { label: 'Radyoyu kapat, fişini çek', fx: { clues: 1, energy: -2, rank: 1, tag: 'sakin' }, endLine: 'Müzik bittiğinde koridor fazla sessiz kaldı. Kendi nefesini duydun.' },
      { label: 'Emlakçıyı ara, hesap sor', fx: { rank: 2, moral: 2, tag: 'sert' }, endLine: 'Emlakçı özür diledi. “Müşteri çekiyor,” dedi. Seni ikna etmedi.' },
      { label: 'Radyoyu kanıt poşetine al', fx: { clues: 1, energy: -3, rank: 1 }, endLine: 'Radyoyu poşete koydun. İçinden hâlâ hafif bir melodi geliyordu; belki sadece hayal ettin.' },
      { label: 'Yere otur, şarkının bitmesini dinle', fx: { moral: 7, energy: 2, pain: -2, tag: 'merhamet' }, endLine: 'Şarkı bitene kadar oturdun. ${SOCK(s).name} tozlandı. Kimse gelmedi; iyiydi.' },
    ],
  },
  c5_end: {
    cat: 'end', title: 'Yanlış Kapı', place: 'Doğu Limanı',
    text: (s) => {
      const ok = s.clues >= 2;
      return ok
        ? `Sahte memuru konteynerlerin arasında köşeye sıkıştırdın. Üniforması çıkarınca altından sıradan bir liman işçisi çıktı. Kamyonları, rüşvet aldığı bir depoya yönlendiriyormuş. ${SHOE(s).name} yağ içinde, ${SOCK(s).name} ıslak.`
        : `Sahte memur kaçtı. Geride sadece plastik bir rozet ve yanlış yönlendirilmiş üç kamyon kaldı. ${SOCK(s).name} bacağında yağ lekesi; ${SHOE(s).name} her adımda kayıyor.`;
    },
    choices: [
      { label: 'Kelepçeyi tak, hakkını oku', fx: { rank: 3, clues: 1, energy: -2, tag: 'sert' }, endLine: 'Plastik rozeti cebine koydun. Gerçek olanı hâlâ göğsünde.' },
      { label: 'Depoyu kontrol ettir, ekibi çağır', fx: { rank: 2, clues: 1, energy: -3, tag: 'ekip' }, endLine: 'Ekip depoyu mühürledi. İçeride binlerce etiketlenmemiş kutu vardı.' },
      { label: 'Sahte rozetle selfie çek, delil say', fx: { moral: 5, rank: -2, clues: 1, tag: 'risk' }, endLine: 'Fotoğrafı delil klasörüne attın. Sonra kendine bakıp güldün.' },
      { label: 'Onu dinle, neden yaptığını sor', fx: { moral: 4, clues: 1, tag: 'merhamet' }, endLine: '“Çocuğum hasta,” dedi. Yalan mıydı bilmiyorsun. Yine de dinledin.' },
    ],
  },
  c6_end: {
    cat: 'end', title: 'Yüzüğün Peşinde', place: 'Gece Pazarı',
    text: (s) => {
      const ok = s.clues >= 2;
      return ok
        ? `Çantayı bir seyyar satıcının tezgah altında buldun. İçinde düğün yüzüğü, bir de kırk yıllık fotoğraf. Teyze ağlıyor; sen de gözlerinin dolduğunu fark ediyorsun. ${SHOE(s).name} ıslak betonda, ${SOCK(s).name} bacağında.`
        : `Çantayı bulamadın ama teyzeyi evine kadar götürdün. Yolda ona kendi çayını ısmarladın. Yüzük hâlâ kayıp. ${SOCK(s).name} bacağında pazarın kokusu, ${SHOE(s).name} yorgun.`;
    },
    choices: [
      { label: 'Çantayı teyzeye uzat, yüzüğü kendi eliyle açsın', fx: { moral: 9, rank: 2, tag: 'merhamet' }, endLine: 'Teyze yüzüğü taktı, sonra sana sarıldı. Ceketinin yakası ıslandı.' },
      { label: 'Parayı say, tutanak için kaydet', fx: { clues: 1, rank: 1, energy: -2, tag: 'sakin' }, endLine: 'Parayı saydın. Teyze “sen iyi bir kızsın” dedi. Bir tutanağa bu cümle yazılmadı.' },
      { label: 'Yüzüğü parmağına tak, kendini bir an gelin gibi hisset', fx: { moral: 6, energy: 1, rank: -1 }, endLine: 'Yüzük parmağına olmadı. Yine de bir an orada, pazarın ışığında durdun.' },
      { label: 'Teyzeyle birlikte ağla', fx: { moral: 10, energy: -2, tag: 'merhamet' }, endLine: 'İkiniz de ağladınız. Satıcı size iki bardak çay verdi; para almadı.' },
    ],
  },
  c7_end: {
    cat: 'end', title: 'Buharın İçinde', place: 'Buhar Sokağı',
    text: (s) => {
      const ok = s.clues >= 2;
      return ok
        ? `Teyzenin kalçası kırılmamış ama zorlanmış. Hamam görevlisi, ıslak mermeri temizlemediğini itiraf etti. Ambulans gelene kadar teyzenin elini tuttun. ${SOCK(s).name} buhar yüzünden bacağına yapışmış; ${SHOE(s).name} su içinde.`
        : `Ambulans geldi ama görevli olay yerinden ayrılmış. Teyze “kimse suçlu değil” dedi. Sen suçluyu bulamadın. ${SHOE(s).name} hâlâ ıslak, ${SOCK(s).name} hâlâ sıcak.`;
    },
    choices: [
      { label: 'Teyzenin elini tut, ambulansa kadar yanında yürü', fx: { moral: 8, pain: 2, tag: 'merhamet' }, endLine: 'Teyze sedyede bile elini bırakmadı. “Sen benim kızımsın,” dedi. Bunu unutmadın.' },
      { label: 'Görevliye tutanak tut, sorumluluğu belirle', fx: { rank: 3, clues: 1, energy: -3, tag: 'sakin' }, endLine: 'Tutanak imzalandı. Görevli başını öne eğdi. Islak mermer sonunda silindi.' },
      { label: 'Teyzeyi kucağında arabaya taşı', fx: { pain: 8, energy: -5, moral: 6, rank: 2 }, endLine: 'Ağırlığı beklediğinden fazlaydı. ${SOCK(s).name} dizinde bir iz bıraktı; teyze “güçlü kızsın” dedi.' },
      { label: 'Buharın içinde otur, nefeslen', fx: { energy: 6, moral: 2, wet: 1 }, endLine: 'Birkaç dakika buharın içinde oturdun. Gözlüğün buğulandı; dünya bir süre yumuşadı.' },
    ],
  },
  c8_end: {
    cat: 'end', title: 'Kayığın Sahibi', place: 'Kum Burnu',
    text: (s) => {
      const ok = s.clues >= 2;
      return ok
        ? `Kayığın sahibini, kıyıdaki terk edilmiş balıkçı barakasında buldun. Motoru tamir ederken kayığı fırtınada kaçırmış. İçinde kaçak yük yok; sadece ıslak bir battaniye ve bir termos. ${SOCK(s).name} kumlu, ${SHOE(s).name} su içinde.`
        : `Kayığın sahibi bulunamadı. Sahil güvenlik kayığı çekti. Kumda kalan çizme izi, sabah dalgalarla silindi. ${SHOE(s).name} hâlâ kumlu; ${SOCK(s).name} bacağında deniz kokusu.`;
    },
    choices: [
      { label: 'Balıkçıya yardım et, motoru birlikte çalıştır', fx: { moral: 7, energy: -5, pain: 2, tag: 'merhamet' }, endLine: 'Motor çalıştığında balıkçı güldü. Sana bir termos çay verdi; tuzlu ve sıcaktı.' },
      { label: 'Kaçakçılık ihtimalini bildir, kayığı incelet', fx: { rank: 3, clues: 1, energy: -2, tag: 'sakin' }, endLine: 'Sahil güvenlik kayığı inceledi. Kaçak yük yoktu; sadece yalnız bir adamın battaniyesi.' },
      { label: 'Kayığın içine otur, denizi dinle', fx: { moral: 6, energy: 3, pain: -2 }, endLine: 'Bir süre kayığın içinde oturdun. Şehir arkanda, deniz önünde; ikisi de seni çağırmadı.' },
      { label: 'İzi fotoğrafla, dalgalar silmeden kaydet', fx: { clues: 1, energy: -2, rank: 1 }, endLine: 'Fotoğrafı arşive yükledin. Kumda kalan tek iz artık sensin.' },
    ],
  },
};

const ROUTES = [
  {
    id: 'sahil', name: 'Sahil Yolu', icon: '≈',
    desc: 'Islak kum, tuzlu rüzgâr, ıssız fener. Ayakkabıların için en riskli, hikâye için en açık hat.',
    tags: ['su', 'kum', 'fener'],
    fx: { moral: 2, energy: -4, wet: 1 },
    pool: 'sahil',
  },
  {
    id: 'liman', name: 'Doğu Limanı', icon: '⚓',
    desc: 'Konteyner labirenti, yağ lekeleri, sahte rozetler. İpucu bol, ayak kokusu daha bol.',
    tags: ['liman', 'ipucu', 'koku'],
    fx: { clues: 1, pain: 2, smell: 1 },
    pool: 'liman',
  },
  {
    id: 'merkez', name: 'Şehir Merkezi', icon: '✶',
    desc: 'Neon, kalabalık, gece pazarı. İnsanlarla dolu; duygusal sınırların için tehlikeli.',
    tags: ['insan', 'isik', 'pazar'],
    fx: { moral: -3, energy: 2, rank: 1 },
    pool: 'merkez',
  },
  {
    id: 'tunel', name: 'Arka Sokaklar', icon: '⌁',
    desc: 'Dar geçitler, kırık asfalt, kestirme yollar. Hızlı sonuç, yüksek acı.',
    tags: ['karanlik', 'kosu', 'risk'],
    fx: { pain: 4, energy: -2, clues: 1 },
    pool: 'tunel',
  },
];

const RANKS = ['Aday Memur', 'Devriye Memuru', 'Kıdemli Memur', 'Gece Komiseri', 'Başkomiser', 'Haesong Efsanesi'];
