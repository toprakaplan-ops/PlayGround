/* Gece Devriyesi — oyun motoru */
(() => {
  'use strict';

  const SAVE_KEY = 'gece-devriyesi-v1';
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));
  const clamp = (v, a = 0, b = 100) => Math.max(a, Math.min(b, v));
  const rnd = (n) => Math.floor(Math.random() * n);
  const esc = (t) => String(t).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const money = (n) => String(n).padStart(2, '0');

  const POOLS = {
    foot: ['i_su', 'i_kum', 'i_topuk', 'i_corap', 'i_tayt', 'i_koku'],
    mind: ['i_agla', 'i_ayna', 'i_arkadas', 'i_kedi', 'i_kahve'],
    street: ['i_radyo', 'i_yagmur', 'i_kaza', 'i_kahve'],
    city: ['i_ayna', 'i_kedi', 'i_yagmur', 'i_kahve'],
    talk: ['k_tanik', 'k_telefon'],
    clue: ['k_iz', 'k_tanik', 'k_kamera', 'k_telefon', 'k_dur'],
    chase: ['k_sokak', 'k_dur'],
    quiet: ['i_kahve', 'i_ayna', 'i_kedi', 'i_arkadas'],
  };

  const ROUTE_QUEUE = {
    sahil: ['i_kum', 'k_iz', 'i_su'],
    liman: ['k_kamera', 'i_koku', 'k_tanik'],
    merkez: ['i_arkadas', 'i_kahve', 'k_tanik'],
    tunel: ['i_tayt', 'k_sokak', 'i_corap'],
  };

  const TEMPERAMENTS = [
    {
      id: 'titiz', label: 'Titiz ve mesafeli', desc: 'Her şey yerinde olsun. Ayakkabı temiz, üniforma düzgün, duygular kilitli.',
      fx: { moral: 56, energy: 98, pain: 8, wet: 0, sand: 0, smell: 0 },
    },
    {
      id: 'duygusal', label: 'Duygusal ve açık', desc: 'Herkesin derdi senin derdin. Ağlamak bir zayıflık değil, sadece bir hava durumu.',
      fx: { moral: 42, energy: 100, pain: 6, wet: 1, sand: 0, smell: 0 },
    },
    {
      id: 'soguk', label: 'Buz gibi sakin', desc: 'Önce gözlem, sonra adım. Kimse senin ne hissettiğini bilmek zorunda değil.',
      fx: { moral: 68, energy: 100, pain: 10, wet: 0, sand: 0, smell: 0 },
    },
    {
      id: 'cilgin', label: 'Çılgın ve hazır', desc: 'Gece uzun, sen daha uzun. Renkli çorap, yüksek topuk, sıfır plan.',
      fx: { moral: 58, energy: 94, pain: 5, wet: 0, sand: 1, smell: 0 },
    },
  ];

  const DAWN_OPTIONS = [
    {
      icon: '≈', label: 'Sıcak sabunlu küvet', sub: 'Islak, kumlu, kokulu — hepsini temizler. Biraz yorucu.',
      run: (st) => {
        st.wet = 0; st.sand = 0; st.smell = Math.max(0, st.smell - 2);
        st.pain = clamp(st.pain - 24); st.moral = clamp(st.moral + 5); st.energy = clamp(st.energy - 4);
        return 'Ayaklarını sabunladın. Suyun rengi griye döndü; taytını çıkarırken bacağında lastik izlerini gördün.';
      },
    },
    {
      icon: '▭', label: 'Islak mendil ve kuru çorap', sub: 'Hızlı bir çözüm. Her şeyi temizlemez ama idare eder.',
      run: (st) => {
        st.wet = Math.max(0, st.wet - 1); st.sand = Math.max(0, st.sand - 1);
        st.smell = Math.max(0, st.smell - 1); st.pain = clamp(st.pain - 10);
        st.moral = clamp(st.moral + 1); st.energy = clamp(st.energy - 1);
        return 'Islak mendille ayak parmaklarının arasını sildin. Kumun bir kısmı hâlâ orada; kabul ettin.';
      },
    },
    {
      icon: '◌', label: 'Çorapları çıkar, ayaklarını havalandır', sub: 'Naylonu çıkar, tenini serbest bırak. Koku ve ağrı azalır.',
      run: (st) => {
        st.sand = Math.max(0, st.sand - 1); st.smell = Math.max(0, st.smell - 1);
        st.pain = clamp(st.pain - 14); st.moral = clamp(st.moral + 3); st.energy = clamp(st.energy + 4);
        return 'Çorapları çıkardın. Ayakların çıplak, hafif ve biraz utanmış. Pencereden gelen sabah ışığı tenini ısıttı.';
      },
    },
    {
      icon: '—', label: 'Hiçbir şey yapma, doğru yatağa', sub: 'Uyku her şeyi çözer mi? Hayır. Ama enerji verir.',
      run: (st) => {
        st.energy = clamp(st.energy + 20); st.moral = clamp(st.moral - 7);
        st.pain = clamp(st.pain - 4); st.smell = Math.min(3, st.smell + 1);
        return 'Ayakkabıları tekmeyle çıkardın, yatağa düştün. Odada ince bir deniz kokusu kaldı.';
      },
    },
  ];

  let s = null;
  let lock = false;
  const ui = { tab: 'socks', filter: 'all', wrFrom: 'title', toastTimer: null };

  /* ---------- durum ---------- */
  function newState() {
    const order = [0, 1, 2, 3, 4, 5, 6, 7];
    for (let i = order.length - 1; i > 0; i--) { const j = rnd(i + 1); [order[i], order[j]] = [order[j], order[i]]; }
    return {
      v: 1, screen: 'title', wrFrom: 'first',
      night: 1, beat: 0, current: null, queue: [],
      moral: 56, energy: 100, pain: 8, wet: 0, sand: 0, smell: 0, clues: 0,
      sock: 'k02', shoe: 'a01',
      caseIndex: order[0], caseOrder: order, route: null, minutes: 30,
      xp: 0, solved: 0, cried: 0, flags: {}, chain: 0,
      log: [], finaleLine: '', dawnDone: false, dawnLine: '', lastResult: '',
      introDone: false, seen: {}, nightDone: false,
    };
  }

  function save() {
    try {
      if (!s) return;
      if (s.log && s.log.length > 160) s.log = s.log.slice(-160);
      localStorage.setItem(SAVE_KEY, JSON.stringify(s));
    } catch (e) { /* depolama kapalı olabilir */ }
  }

  function loadSave() {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) return null;
      const data = JSON.parse(raw);
      if (!data || data.v !== 1) return null;
      data.log = data.log || [];
      data.flags = data.flags || {};
      data.seen = data.seen || {};
      data.caseOrder = data.caseOrder || [0, 1, 2, 3, 4, 5, 6, 7];
      return data;
    } catch (e) { return null; }
  }

  function hasSave() { return !!loadSave(); }

  /* ---------- yardımcılar ---------- */
  function rankName() {
    const idx = Math.floor(s.xp / 45);
    if (idx >= RANKS.length) return RANKS[RANKS.length - 1] + ' ✦' + (idx - RANKS.length + 1);
    return RANKS[idx];
  }
  function rankNext() {
    const idx = Math.floor(s.xp / 45);
    if (idx >= RANKS.length) return null;
    return 45 - (s.xp % 45);
  }
  function clockText() {
    const total = 23 * 60 + 10 + s.minutes;
    return `${money(Math.floor(total / 60) % 24)}:${money(total % 60)}`;
  }
  function comfort() { return clamp(100 - s.pain); }
  function hygiene() { return clamp(100 - (s.wet * 10 + s.sand * 10 + s.smell * 16)); }
  function footLabel() {
    if (s.smell >= 3) return 'deniz suyu kokuyor';
    if (s.smell === 2) return 'tuz kokusu var';
    if (s.wet >= 2 && s.sand >= 2) return 'ıslak ve kumlu';
    if (s.wet >= 2) return 'ıslak';
    if (s.sand >= 2) return 'kumlu';
    if (s.pain >= 65) return 'ağrılı';
    return 'iyi';
  }
  function currentCase() { return CASE(s); }

  function decoLine() {
    if (s.smell >= 2) return 'Ayakkabının içinde ince bir deniz kokusu dolaşıyor.';
    if (s.wet >= 2) return 'Çorapların hâlâ nemli. Her adımda küçük bir hatırlatma.';
    if (s.sand >= 2) return 'Ayakkabının içinde kum var; yürürken ince bir çıtırtı.';
    if (s.pain >= 60) return 'Topukların betona her basışta bir soru bırakıyor.';
    if (s.moral < 28) return 'Gözlerin dolmak üzere. Şehir bunu fark etmiyor.';
    if (s.energy < 30) return 'Vardiyanın sonuna kadar ayakta kalman gerekiyor.';
    const lines = [
      'Şehir uyumuyor; sadece sesini kısıyor.',
      'Neonlar ıslak asfaltta ikiye katlanıyor.',
      'Uzakta bir vapur, daha yakında bir martı.',
      'Gece, kimsenin okumadığı bir tutanak gibi.',
      'Her sokak lambası ayrı bir hikâye anlatıyor.',
      'Yağmur dindi; sokak hâlâ parlak.',
      'Bir yerlerde bir radyo, senin duyamadığın bir şarkı çalıyor.',
    ];
    return lines[(s.beat + s.night) % lines.length];
  }

  function updateDeco() {
    $('#decoText').textContent = decoLine();
    $('#decoOutfit').textContent = `${SOCK(s).name} · ${SHOE(s).name}`;
  }

  function footTax() {
    const so = SOCK(s), sh = SHOE(s);
    const rate = 1.1 + so.tight * 0.018 + sh.heel * 0.28 - sh.comfort * 0.025 - so.soft * 0.008;
    s.pain = clamp(s.pain + rate);
    s.energy = clamp(s.energy - 2);
    if ((s.wet > 0 && s.sand > 0) || s.wet >= 2) s.smell = Math.min(3, s.smell + 1);
  }

  /* ---------- ekran ---------- */
  function enter(name) {
    s.screen = name;
    $$('.screen').forEach((el) => el.classList.toggle('active', el.id === 'scr-' + name));
    if (name !== 'game') setTears(false);
  }

  function showToast(text) {
    const el = $('#toast');
    el.textContent = text;
    el.classList.add('show');
    clearTimeout(ui.toastTimer);
    ui.toastTimer = setTimeout(() => el.classList.remove('show'), 2300);
  }

  function setTears(on) {
    $('#scr-game').classList.toggle('teary', !!on);
    $('#tears').classList.toggle('on', !!on);
  }

  function initTears() {
    const box = $('#tears');
    if (box.childElementCount) return;
    for (let i = 0; i < 9; i++) {
      const drop = document.createElement('i');
      drop.style.left = (8 + Math.random() * 84) + '%';
      drop.style.animationDelay = (Math.random() * 2.4).toFixed(2) + 's';
      drop.style.animationDuration = (2 + Math.random() * 1.8).toFixed(2) + 's';
      drop.style.height = (8 + Math.random() * 12).toFixed(0) + 'px';
      box.appendChild(drop);
    }
  }

  /* ---------- HUD ---------- */
  function updateHUD() {
    $('#hudNight').textContent = s.night;
    $('#hudClock').textContent = clockText();
    $('#hudRank').textContent = rankName();

    const vals = {
      moral: s.moral, energy: s.energy, foot: comfort(), hygiene: hygiene(),
    };
    Object.keys(vals).forEach((key) => {
      const v = Math.round(vals[key]);
      $('#mv-' + key).textContent = v;
      $('#mb-' + key).style.width = Math.max(2, v) + '%';
      const meter = $('#mv-' + key).closest('.meter');
      meter.classList.toggle('low', v < 30);
    });

    const chips = [];
    const c = currentCase();
    if (s.route) chips.push(['Rota: ' + s.route.name, '']);
    if (s.screen === 'game' || s.screen === 'brief') chips.push([c.code, 'dim']);
    if (s.wet > 0) chips.push([`ıslak ×${s.wet}`, 'on']);
    if (s.sand > 0) chips.push([`kum ×${s.sand}`, 'on']);
    if (s.smell > 0) chips.push([s.smell >= 2 ? 'deniz kokusu' : 'hafif tuz kokusu', s.smell >= 2 ? 'warn' : '']);
    if (s.pain >= 60) chips.push(['ayak ağrısı', 'warn']);
    if (s.moral < 30) chips.push(['gözyaşı', 'warn']);
    if (s.clues > 0) chips.push([`ipucu ${s.clues}`, '']);
    if (!chips.length) chips.push(['gece sakin', 'dim']);
    $('#chips').innerHTML = chips.map(([t, cls]) => `<span class="chip ${cls}">${esc(t)}</span>`).join('');

    setTears(s.moral < 24 || (s.current === 'i_agla' && s.screen === 'game'));
  }

  /* ---------- giriş ---------- */
  function renderIntro() {
    enter('intro');
    $('#introText').innerHTML = `
      <p>Soyunma odasının floresanı bir tanesi eksik yanıyor. Metal dolabın kapağında adın yazılı: <b>Yuna Seo</b>. Altında, daha küçük: <i>Gece Devriyesi 7</i>.</p>
      <p>Üniformanı giydin. Siyah taytı her zamanki gibi çektin; lastiği belini iki parmak içeri alıyor, diz arkasında ince bir çizgi bırakıyor. Ayağında kadife babet; çantanın içinde otuz dört çorap ve otuz dört ayakkabı daha var. Seçim senin.</p>
      <p>Telsizde santral: “Yuna, gece uzun. Hazır mısın?” Aynada kendine bakıyorsun. Gözlerin parlak. Bu, hazır olmak mı, yoksa dolmak üzere olmak mı, bilmiyorsun.</p>
      <p class="kr">오늘 밤도 순찰</p>
    `;
    $('#introChoices').innerHTML = TEMPERAMENTS.map((t) => `
      <button class="dawn-choice" data-temp="${t.id}">
        <span class="di">✶</span>
        <span class="dt">${esc(t.label)}<small>${esc(t.desc)}</small></span>
      </button>
    `).join('');
    $$('#introChoices .dawn-choice').forEach((btn) => {
      btn.addEventListener('click', () => chooseTemperament(btn.dataset.temp));
    });
    save();
  }

  function chooseTemperament(id) {
    const t = TEMPERAMENTS.find((x) => x.id === id) || TEMPERAMENTS[0];
    s.moral = t.fx.moral; s.energy = t.fx.energy; s.pain = t.fx.pain;
    s.wet = t.fx.wet; s.sand = t.fx.sand; s.smell = t.fx.smell;
    s.introDone = true;
    s.log.push({ night: 1, title: 'Soyunma Odası', choice: t.label });
    ui.wrFrom = 'first';
    s.wrFrom = 'first';
    enter('wardrobe');
    renderWardrobe();
    save();
  }

  /* ---------- brifing ---------- */
  function renderBrief() {
    enter('brief');
    const c = currentCase();
    s.clues = 0;
    $('#briefKicker').textContent = `GECE ${s.night} • 22:20`;
    $('#briefCase').innerHTML = `
      <div class="cc">${esc(c.code)} • GECE İHBARI</div>
      <h3>${esc(c.title)}</h3>
      <p><b>${esc(c.subject)}</b> — ${esc(c.detail)}. Son görüldüğü yer: ${esc(c.place)}.</p>
      <span class="loc">${esc(c.district)} hattı</span>
    `;
    const so = SOCK(s), sh = SHOE(s);
    $('#briefOutfit').innerHTML = `
      <span><b>${esc(so.name)}</b><br>sıkılık ${so.tight} · acı payı</span>
      <span style="text-align:right"><b>${esc(sh.name)}</b><br>${sh.type} · ${sh.heel} cm · su ${sh.water}</span>
    `;
    $('#routeGrid').innerHTML = ROUTES.map((r) => {
      const mods = [];
      if (r.fx.clues) mods.push('+' + r.fx.clues + ' ipucu');
      if (r.fx.energy) mods.push((r.fx.energy > 0 ? '+' : '') + r.fx.energy + ' enerji');
      if (r.fx.moral) mods.push((r.fx.moral > 0 ? '+' : '') + r.fx.moral + ' duygu');
      if (r.fx.pain) mods.push('+' + r.fx.pain + ' acı');
      if (r.fx.wet) mods.push('+ıslaklık');
      if (r.fx.smell) mods.push('+koku riski');
      if (!mods.length) mods.push('dengeli');
      return `<button class="route" data-route="${r.id}">
        <span class="ri">${r.icon}</span>
        <h4>${esc(r.name)}</h4>
        <p>${esc(r.desc)}</p>
        <span class="rmods">${mods.map((m) => `<span>${esc(m)}</span>`).join('')}</span>
      </button>`;
    }).join('');
    $$('#routeGrid .route').forEach((btn) => btn.addEventListener('click', () => beginNight(btn.dataset.route)));
    updateHUD();
    save();
  }

  function beginNight(routeId) {
    const route = ROUTES.find((r) => r.id === routeId) || ROUTES[0];
    s.route = route;
    s.screen = 'game';
    s.minutes = 0;
    s.beat = 0;
    s.clues = 0;
    s.chain = 0;
    s.finaleLine = '';
    s.lastResult = '';
    s.queue = [];
    Object.entries(route.fx).forEach(([k, v]) => {
      if (['moral', 'energy', 'pain', 'wet', 'sand', 'smell', 'clues'].includes(k)) s[k] = clamp((s[k] || 0) + v, 0, k === 'wet' || k === 'sand' || k === 'smell' ? 3 : 100);
    });

    const c = currentCase();
    const mid = ROUTE_QUEUE[route.id] || ROUTE_QUEUE.merkez;
    s.queue = [c.start, mid[0], mid[1], mid[2], c.end];

    enter('game');
    updateHUD();
    nextFromQueue();
  }

  /* ---------- olay akışı ---------- */
  function nextFromQueue() {
    if (!s.queue.length) { endNight(); return; }
    const id = s.queue.shift();
    showEvent(id);
  }

  function showEvent(id) {
    const ev = EVENTS[id];
    if (!ev) { endNight(); return; }
    lock = false;
    s.current = id;
    s.seen[id] = (s.seen[id] || 0) + 1;
    s.beat += 1;
    s.minutes += 34 + rnd(22);
    enter('game');
    $('#evKicker').textContent = `OLAY ${money(s.beat)}`;
    $('#evPlace').textContent = (id.startsWith('c') && ev.cat === 'end' || ev.cat === 'start') ? currentCase().place : (ev.place || currentCase().place);
    $('#evTitle').textContent = ev.title;
    $('#evText').textContent = typeof ev.text === 'function' ? ev.text(s) : ev.text;
    $('#evOutcome').innerHTML = '';

    const choicesEl = $('#choices');
    choicesEl.innerHTML = ev.choices.map((ch, i) => {
      const risky = (ch.fx && (ch.fx.moral <= -4 || ch.fx.pain >= 5 || ch.fx.rank < 0)) ? 'risky' : ((ch.fx && (ch.fx.moral >= 4 || ch.fx.tag === 'merhamet')) ? 'soft' : '');
      return `<button class="choice ${risky}" data-i="${i}">
        <span class="k">${'ABCD'[i]}</span><span class="t">${esc(ch.label)}</span>
      </button>`;
    }).join('');
    Array.from(choicesEl.children).forEach((btn) => {
      btn.addEventListener('click', () => pick(Number(btn.dataset.i)));
    });
    $('#story').scrollTop = 0;
    updateHUD();
    updateDeco();
    save();
  }

  function resolveNext(spec) {
    if (!spec) return null;
    if (EVENTS[spec]) return spec;
    if (spec.startsWith('pool:')) {
      const key = spec.slice(5);
      const list = (POOLS[key] || POOLS.clue).filter((id) => id !== s.current);
      const unseen = list.filter((id) => !s.seen[id]);
      const arr = unseen.length && Math.random() < 0.7 ? unseen : list;
      return arr[rnd(arr.length)] || POOLS.clue[0];
    }
    return null;
  }

  function pick(index) {
    if (lock) return;
    const ev = EVENTS[s.current];
    if (!ev) return;
    const ch = ev.choices[index];
    if (!ch) return;
    lock = true;
    $$('#choices .choice').forEach((b) => (b.disabled = true));

    const fb = [];
    const beforeMoral = s.moral;
    applyEffects(ch, fb);

    if (ch.run) {
      const line = ch.run(s);
      if (line) fb.push(line);
    }
    if (ch.endLine) {
      s.finaleLine = typeof ch.endLine === 'function' ? ch.endLine(s) : ch.endLine;
    }
    footTax();

    if (ch.fx && ch.fx.moral >= 5) fb.push('İçindeki oda biraz genişledi.');
    if (ch.fx && ch.fx.moral <= -5 || s.moral < beforeMoral - 6) fb.push('Duygusal sınırın biraz daha inceldi.');
    if (ch.fx && ch.fx.clues) fb.push('Dosyada bir parça daha netleşti.');

    s.log.push({ night: s.night, title: ev.title, choice: ch.label, id: s.current });

    let nextId = ch.next ? resolveNext(ch.next) : null;

    if (nextId && s.queue.length) {
      const upcoming = s.queue[0];
      const upEv = EVENTS[upcoming];
      if ((!upEv || upEv.cat !== 'end') && !s.queue.slice(1).includes(nextId) && nextId !== s.current) {
        s.queue[0] = nextId;
      }
    }

    // olay olayı tetiklesin: kritik eşikler yeni bir sahne açar
    if (s.chain < 2 && s.queue.length) {
      let chainId = null;
      if (s.moral <= 11 && s.current !== 'i_agla') chainId = 'i_agla';
      else if (s.smell >= 3 && s.current !== 'i_koku') chainId = 'i_koku';
      else if (s.pain >= 84 && s.current !== 'i_tayt' && s.current !== 'i_topuk') chainId = 'i_tayt';
      if (chainId && !s.queue.includes(chainId) && Math.random() < 0.75) {
        s.queue.unshift(chainId);
        s.chain += 1;
      }
    }

    s.minutes += 3 + rnd(6);
    // Seçim işlendi; kayıt geri yüklenince aynı kart tekrar oynanmasın.
    s.current = null;
    updateHUD();
    save();

    // sonuçları bir sonraki kartta göster
    const pending = fb.slice(0, 3);
    setTimeout(() => {
      if (!s.queue.length) { endNight(pending); return; }
      nextFromQueue();
      if (pending.length) {
        $('#evOutcome').innerHTML = pending.map((line, i) =>
          `<div class="outcome-line ${i === 0 && (s.moral < 30) ? 'bad' : 'good'}">${esc(line)}</div>`).join('');
      }
      updateHUD();
    }, 260);
  }

  function applyEffects(ch, fb) {
    const f = ch.fx || {};
    const numericKeys = ['moral', 'energy', 'pain', 'clues', 'wet', 'sand', 'smell'];
    numericKeys.forEach((k) => {
      if (f[k] == null) return;
      const cap = (k === 'wet' || k === 'sand' || k === 'smell') ? 3 : 100;
      const prev = s[k] || 0;
      s[k] = clamp(prev + f[k], 0, cap);
      const d = s[k] - prev;
      if (k === 'wet' && d > 0) fb.push(`${SOCK(s).name} ıslandı.`);
      if (k === 'sand' && d > 0) fb.push('Ayakkabının içine kum doldu.');
      if (k === 'smell' && d > 0) fb.push('Burnuna ince bir tuz kokusu geldi.');
      if (k === 'pain' && d >= 6) fb.push('Ayakların sızlıyor.');
      if (k === 'energy' && d <= -6) fb.push('Enerjin azaldı.');
    });
    if (f.rank) {
      s.xp = Math.max(0, s.xp + (f.rank > 0 ? f.rank * 2 : f.rank * 2));
    }
    if (f.cry) s.cried += 1;
    if (f.tag) s.flags[f.tag] = (s.flags[f.tag] || 0) + 1;
    s.moral = clamp(s.moral);
  }

  /* ---------- sabah ---------- */
  function endNight(pending) {
    s.screen = 'dawn';
    const c = currentCase();
    const success = s.clues >= 2;
    if (success) s.solved += 1;
    s.xp = Math.max(0, s.xp + 4 + s.clues * 2 + (success ? 4 : 0));
    s.lastResult = success ? 'çözüldü' : (s.clues === 1 ? 'kısmen çözüldü' : 'askıda kaldı');
    s.dawnDone = false;
    s.dawnLine = '';
    s.nightDone = true;
    s.queue = [];
    s.log.push({ night: s.night, title: 'Vardiya Sonu • ' + c.title, choice: `Sonuç: ${s.lastResult}`, id: 'dawn' });
    enter('dawn');
    renderDawn(pending);
    save();
  }

  function dawnStats() {
    return [
      ['Vaka', `${currentCase().title}`],
      ['Sonuç', s.lastResult || '—'],
      ['İpucu', `${s.clues} / 3`],
      ['Ayak', footLabel()],
      ['Hijyen', `${Math.round(hygiene())} / 100`],
      ['Ağrı', `${Math.round(s.pain)} / 100`],
      ['Ağlama', `${s.cried} kez`],
      ['Rütbe', rankName()],
    ];
  }

  function renderDawn(pending) {
    $('#dawnNight').textContent = 'GECE ' + s.night;
    const rows = dawnStats();
    const warn = (label) => ['Ayak', 'Hijyen', 'Ağrı', 'Sonuç'].includes(label);
    $('#dawnReport').innerHTML = `
      <div class="r-title">SABAH RAPORU</div>
      <div class="report-grid">
        ${rows.map(([k, v]) => `
          <div class="report-item">
            <span>${esc(k)}</span>
            <b class="${warn(k) ? 'bad' : ''}">${esc(v)}</b>
          </div>`).join('')}
      </div>
    `;
    $('#dawnOutcome').textContent = s.finaleLine || (pending && pending[0]) || 'Gece bitti. Şehir sustu. Ayakların hâlâ senin.';
    $('#dawnPrompt').classList.toggle('hidden', s.dawnDone);
    $('#dawnChoices').innerHTML = DAWN_OPTIONS.map((d, i) => `
      <button class="dawn-choice" data-i="${i}" ${s.dawnDone ? 'disabled' : ''}>
        <span class="di">${d.icon}</span>
        <span class="dt">${esc(d.label)}<small>${esc(d.sub)}</small></span>
      </button>`).join('');
    $('#dawnChoices').classList.toggle('hidden', s.dawnDone);
    Array.from($('#dawnChoices').children).forEach((btn) => {
      btn.addEventListener('click', () => chooseDawn(Number(btn.dataset.i)));
    });
    const nextBtn = $('#btnDawnNext');
    nextBtn.classList.toggle('hidden', !s.dawnDone);
    $('#dawnNote').textContent = s.dawnLine || (s.smell >= 2 ? 'Ayakkabıların hâlâ nemli. Sabah temizliği önemli.' : 'Dolap seni bekliyor. Yeni gece, yeni seçim.');
    $('#dawnNote').classList.toggle('hidden', !!s.dawnLine && !s.dawnDone);
    if (s.dawnDone) {
      $('#dawnNote').textContent = s.dawnLine;
      $('#dawnNote').classList.remove('hidden');
    }
    updateHUD();
  }

  function chooseDawn(i) {
    if (s.dawnDone) return;
    const opt = DAWN_OPTIONS[i];
    if (!opt) return;
    const line = opt.run(s);
    s.dawnDone = true;
    s.dawnLine = line;
    s.log.push({ night: s.night, title: 'Sabah Temizliği', choice: opt.label });
    renderDawn();
    save();
    showToast(opt.label);
  }

  $('#btnDawnNext').addEventListener('click', () => {
    if (!s.dawnDone) return;
    s.night += 1;
    s.caseIndex = s.caseOrder[(s.night - 1) % s.caseOrder.length];
    s.clues = 0;
    s.finaleLine = '';
    s.lastResult = '';
    s.dawnDone = false;
    s.dawnLine = '';
    s.minutes = 30;
    s.beat = 0;
    s.route = null;
    ui.wrFrom = 'dawn';
    s.wrFrom = 'dawn';
    enter('wardrobe');
    renderWardrobe();
    save();
  });

  /* ---------- dolap ---------- */
  function sockTypes() {
    return [
      ['all', 'Tümü'], ['tayt', 'Tayt'], ['külotlu', 'Külotlu'], ['dizaltı', 'Dizaltı'], ['soket', 'Soket'],
    ];
  }
  function shoeTypes() {
    return [
      ['all', 'Tümü'], ['babet', 'Babet'], ['topuklu', 'Topuklu'], ['bot', 'Bot'], ['spor', 'Spor'],
    ];
  }

  function enterWardrobe(from) {
    if (from) { ui.wrFrom = from; s.wrFrom = from; }
    enter('wardrobe');
    renderWardrobe();
    save();
  }

  function renderWardrobe() {
    const isSocks = ui.tab === 'socks';
    $('#wrKicker').textContent = `GECE ${s.night} • HAZIRLIK`;
    $('#wrCount').textContent = isSocks ? '34 çorap' : '34 ayakkabı';
    $('#wrTabs').innerHTML = `
      <button class="wr-tab ${isSocks ? 'active' : ''}" data-tab="socks">Çoraplar</button>
      <button class="wr-tab ${!isSocks ? 'active' : ''}" data-tab="shoes">Ayakkabılar</button>`;
    Array.from($('#wrTabs').children).forEach((b) => b.addEventListener('click', () => {
      if (ui.tab === b.dataset.tab) return;
      ui.tab = b.dataset.tab; ui.filter = 'all'; renderWardrobe();
    }));

    const filters = isSocks ? sockTypes() : shoeTypes();
    if (!filters.some(([id]) => id === ui.filter)) ui.filter = 'all';
    $('#wrFilters').innerHTML = filters.map(([id, label]) =>
      `<button class="wr-filter ${ui.filter === id ? 'active' : ''}" data-f="${id}">${label}</button>`).join('');
    Array.from($('#wrFilters').children).forEach((b) => b.addEventListener('click', () => {
      ui.filter = b.dataset.f; renderWardrobe();
    }));

    const items = isSocks
      ? SOCKS.filter((x) => ui.filter === 'all' || x.type === ui.filter)
      : SHOES.filter((x) => ui.filter === 'all' || x.type === ui.filter);

    const grid = $('#wrGrid');
    const prevScroll = grid.scrollTop;
    grid.innerHTML = items.map((x) => {
      const sel = isSocks ? x.id === s.sock : x.id === s.shoe;
      if (isSocks) {
        return `<button class="wr-item ${sel ? 'sel' : ''}" data-kind="sock" data-id="${x.id}">
          <span class="wr-swatch" style="background:${x.color}"></span>
          <span class="wr-meta">
            <span class="wr-name">${esc(x.name)}</span>
            <span class="wr-sub">${esc(x.type)} · sıkı ${x.tight}</span>
          </span>
        </button>`;
      }
      return `<button class="wr-item ${sel ? 'sel' : ''}" data-kind="shoe" data-id="${x.id}">
        <span class="wr-swatch shoe-swatch" style="background:${x.color}"></span>
        <span class="wr-meta">
          <span class="wr-name">${esc(x.name)}</span>
          <span class="wr-sub">${esc(x.type)} · ${x.heel} cm · konfor ${x.comfort}</span>
        </span>
      </button>`;
    }).join('');
    Array.from(grid.children).forEach((btn) => btn.addEventListener('click', () => {
      if (btn.dataset.kind === 'sock') s.sock = btn.dataset.id;
      else s.shoe = btn.dataset.id;
      save();
      renderWardrobe();
      grid.scrollTop = prevScroll;
    }));

    updatePreview();
  }

  function updatePreview() {
    const so = SOCK(s), sh = SHOE(s);
    $('#preview').innerHTML = previewSVG(so, sh);
    $('#wrLookName').innerHTML = `${esc(so.name)}<small>${esc(sh.name)} · ${sh.type} · ${sh.heel} cm topuk</small>`;
    const stats = [
      ['SIKI', so.tight, so.tight > 85],
      ['YUMUŞAK', so.soft, false],
      ['SU', sh.water, sh.water < 35],
      ['KUM', sh.sand, sh.sand < 35],
    ];
    $('#wrStats').innerHTML = stats.map(([label, val, warn]) => `
      <div class="wr-stat ${warn ? 'warn' : ''}"><span>${label}</span><i><b style="width:${val}%"></b></i></div>
    `).join('');
  }

  function previewSVG(so, sh) {
    const pat = patternDef(so);
    const shoeColor = sh.color || '#222';
    const isHeel = sh.type === 'topuklu';
    const isBoot = sh.type === 'bot';
    const isSport = sh.type === 'spor';
    const heelPx = Math.min(18, 3 + sh.heel * 1.25);
    const shine = `<linearGradient id="shine" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".38" stop-color="#fff" stop-opacity=".22"/><stop offset=".55" stop-color="#fff" stop-opacity="0"/>
    </linearGradient>`;

    const leg = (cx, mirror) => {
      const d = mirror ? 1 : -1;
      const top = isBoot ? 50 : -8;
      const legPath = `M${cx - 17} ${top} C${cx - 21} 34 ${cx - 20} 74 ${cx - 16} 106 L${cx + 16} 106 C${cx + 20} 74 ${cx + 20} 34 ${cx + 17} ${top} Z`;
      let shoeShape = '';
      if (isHeel) {
        const hx = cx - d * 6;
        shoeShape = `
          <path d="M${cx - 14} 103 L${cx + 12} 103 C${cx + d * 22} 107 ${cx + d * 38} 120 ${cx + d * 43} 128 C${cx + d * 36} 135 ${cx + d * 6} 136 ${cx - 11} 133 Z" fill="${shoeColor}"/>
          <path d="M${hx - 2.5} 130 L${hx - 1.5} ${130 + heelPx} L${hx + 2.5} ${130 + heelPx} L${hx + 4.5} 130 Z" fill="${shoeColor}"/>
          <path d="M${cx - 16} 132 Q${cx + d * 10} 138 ${cx + d * 41} 129" fill="none" stroke="rgba(255,255,255,.5)" stroke-width="1.4"/>
          <path d="M${cx - 6} 112 Q${cx + d * 4} 108 ${cx + d * 12} 113" fill="none" stroke="rgba(255,255,255,.22)" stroke-width="1.2"/>`;
      } else if (isSport) {
        shoeShape = `
          <path d="M${cx - 16} 102 L${cx + 14} 102 C${cx + d * 28} 106 ${cx + d * 42} 120 ${cx + d * 43} 129 C${cx + d * 38} 136 ${cx + d * 8} 137 ${cx - 18} 134 Z" fill="${shoeColor}"/>
          <rect x="${cx - 20}" y="131" width="58" height="4.5" rx="2" fill="rgba(255,255,255,.55)" transform="translate(${d < 0 ? -14 : 0} 0)"/>
          <path d="M${cx - 10} 110 Q${cx + d * 6} 106 ${cx + d * 22} 114" fill="none" stroke="rgba(255,255,255,.3)" stroke-width="1.4"/>`;
      } else if (isBoot) {
        shoeShape = `
          <path d="M${cx - 19} 50 L${cx + 19} 50 L${cx + 18} 112 C${cx + 18} 124 ${cx + d * 30} 132 ${cx + d * 30} 136 L${cx - 20} 136 C${cx - 24} 120 ${cx - 22} 86 ${cx - 19} 50 Z" fill="${shoeColor}"/>
          <rect x="${cx - 19}" y="96" width="38" height="2" fill="rgba(255,255,255,.3)"/>
          <path d="M${cx - 20} 134 Q${cx} 139 ${cx + d * 28} 133" fill="none" stroke="rgba(255,255,255,.5)" stroke-width="2"/>`;
      } else {
        shoeShape = `
          <path d="M${cx - 14} 103 L${cx + 13} 103 C${cx + d * 27} 107 ${cx + d * 41} 120 ${cx + d * 42} 128 C${cx + d * 36} 135 ${cx + d * 8} 136 ${cx - 13} 133 C${cx - 18} 121 ${cx - 18} 112 ${cx - 14} 103 Z" fill="${shoeColor}"/>
          <ellipse cx="${cx + d * 12}" cy="132" rx="22" ry="2.4" fill="rgba(255,255,255,.32)"/>
          <circle cx="${cx + d * 15}" cy="113" r="2.4" fill="${so.accent}" opacity=".9"/>`;
      }
      return `
        <g>
          <ellipse cx="${cx}" cy="142" rx="32" ry="4" fill="rgba(0,0,0,.45)"/>
          <path d="${legPath}" fill="url(#${pat.id})"/>
          <path d="${legPath}" fill="url(#shine)"/>
          <path d="M${cx - 15} 6 C${cx - 11} 38 ${cx - 11} 76 ${cx - 13} 104" stroke="rgba(255,255,255,.16)" stroke-width="1.2" fill="none"/>
          <rect x="${cx - 17}" y="${isBoot ? 48 : 0}" width="34" height="4" fill="${so.accent}" opacity=".6"/>
          ${shoeShape}
        </g>`;
    };

    return `<svg viewBox="0 0 240 150" preserveAspectRatio="xMidYMax meet" xmlns="http://www.w3.org/2000/svg">
      <defs>${shine}${pat.def}</defs>
      <g opacity=".35" stroke="rgba(255,255,255,.06)" stroke-width=".5">
        ${Array.from({ length: 8 }, (_, i) => `<line x1="0" y1="${i * 19}" x2="240" y2="${i * 19}"/>`).join('')}
        ${Array.from({ length: 9 }, (_, i) => `<line x1="${i * 30}" y1="0" x2="${i * 30}" y2="150"/>`).join('')}
      </g>
      <ellipse cx="120" cy="142" rx="76" ry="6" fill="rgba(255,92,138,.14)"/>
      ${leg(78, false)}
      ${leg(162, true)}
    </svg>`;
  }

  function patternDef(so) {
    const id = 'sockpat';
    const c = so.color, a = so.accent;
    let inner = `<rect width="12" height="12" fill="${c}"/>`;
    switch (so.pattern) {
      case 'stripe':
        inner += `<rect y="2" width="12" height="3" fill="${a}" opacity=".72"/><rect y="8" width="12" height="1.5" fill="${a}" opacity=".5"/>`;
        break;
      case 'dot':
        inner += `<circle cx="3" cy="3" r="1.1" fill="${a}"/><circle cx="9" cy="9" r="1.1" fill="${a}"/>`;
        break;
      case 'fishnet':
        inner = `<rect width="12" height="12" fill="${c}"/>` +
          `<path d="M0 0L12 12M12 0L0 12" stroke="${a}" stroke-width="1.1" opacity=".8"/>`;
        break;
      case 'glitter':
        inner += `<circle cx="2" cy="4" r=".8" fill="${a}"/><circle cx="8" cy="2" r=".6" fill="#fff" opacity=".8"/><circle cx="6" cy="8" r=".9" fill="${a}"/><circle cx="11" cy="10" r=".5" fill="#fff"/>`;
        break;
      case 'zebra':
        inner += `<path d="M0 3 Q6 0 12 4 L12 6 Q6 2 0 5 Z" fill="${a}" opacity=".85"/><path d="M0 9 Q6 6 12 10 L12 12 Q6 8 0 11 Z" fill="${a}" opacity=".85"/>`;
        break;
      case 'rib':
        inner += `<path d="M3 0V12M9 0V12" stroke="${a}" stroke-width="1" opacity=".35"/>`;
        break;
      case 'lace':
        inner += `<path d="M0 11 Q3 7 6 11 Q9 7 12 11" fill="none" stroke="${a}" stroke-width="1.1"/>`;
        break;
      case 'velvet':
        inner += `<rect width="12" height="12" fill="url(#velvet)"/>`;
        return {
          id,
          def: `<pattern id="${id}" width="12" height="12" patternUnits="userSpaceOnUse">${inner}</pattern>
            <radialGradient id="velvet"><stop offset="0" stop-color="#fff" stop-opacity=".18"/><stop offset="1" stop-color="#000" stop-opacity=".18"/></radialGradient>`,
        };
      case 'sheer':
        return {
          id,
          def: `<pattern id="${id}" width="12" height="12" patternUnits="userSpaceOnUse"><rect width="12" height="12" fill="${c}"/><rect width="12" height="12" fill="#000" opacity=".22"/></pattern>`,
        };
      default:
        return { id, def: `<pattern id="${id}" width="12" height="12" patternUnits="userSpaceOnUse">${inner}${so.pattern === 'shine' ? '<rect width="12" height="12" fill="url(#gloss)"/>' : ''}</pattern><linearGradient id="gloss" x1="0" y1="0" x2="1" y2="0"><stop offset=".2" stop-color="#fff" stop-opacity=".18"/><stop offset=".6" stop-color="#fff" stop-opacity="0"/></linearGradient>` };
    }
    return { id, def: `<pattern id="${id}" width="12" height="12" patternUnits="userSpaceOnUse">${inner}</pattern>` };
  }

  /* ---------- modal ---------- */
  function openModal(title, html) {
    $('#modalTitle').textContent = title;
    $('#modalBody').innerHTML = html;
    $('#modal').classList.remove('hidden');
  }
  function closeModal() { $('#modal').classList.add('hidden'); }
  $('#btnModalClose').addEventListener('click', closeModal);
  $('#modal').addEventListener('click', (e) => { if (e.target === $('#modal')) closeModal(); });

  function helpHTML() {
    return `
      <h4>Nasıl oynanır?</h4>
      <p>Gece Devriyesi, Haesong'da gece devriyesi atan Koreli polis memuru <b>Yuna Seo</b>'nun sonsuz vardiyasıdır. Oyunun bir sonu yok; her sabah yeni bir gece başlar.</p>
      <ul>
        <li>Her sahnede <b>4 seçim</b> vardır. Her seçim farklı bir olaya, farklı bir sokağa götürür.</li>
        <li>Bazı olaylar başka olayları tetikler: gözyaşların taşarsa, ayakların çok acırsa veya deniz kokusu yükselirse araya yeni sahneler girer.</li>
        <li><b>DUYGU</b> düştükçe ağlama krizleri gelir. <b>ENERJİ</b> azalınca seçimler zorlaşır.</li>
        <li><b>AYAK</b> ve <b>HİJYEN</b>: ıslaklık, kum ve tuz kokusu ayakkabının içinde birikir. Sabah temizliği yapmazsan koku sonraki geceye taşınır.</li>
        <li>Her sabah <b>34 çoraptan</b> ve <b>34 ayakkabıdan</b> istediğini seçebilirsin. Sıkı taytlar acıtır, babetler rahattır, topuklular dikkat çeker.</li>
        <li>Rota seçimin geceyi değiştirir: Sahil (kum/su), Liman (ipucu/koku), Merkez (insan/duygu), Arka Sokaklar (acı/risk).</li>
      </ul>
      <h4>İpucu</h4>
      <p>Gece boyunca topladığın ipuçları vaka sonucunu belirler. 2 ve üzeri ipucu çözüm demektir. Ama bazı geceler sadece ayakta kalmak da bir başarıdır.</p>
      <p style="color:var(--dim-2);font-size:10.5px">Bu oyun kurgusaldır. Haesong ve Yuna Seo hayal ürünüdür.</p>
    `;
  }

  function logHTML() {
    const entries = s.log.slice(-44).reverse();
    const flags = Object.entries(s.flags).sort((a, b) => b[1] - a[1]).slice(0, 3)
      .map(([k, v]) => `${k} ${v}`).join(' · ') || 'henüz iz yok';
    return `
      <div class="log-entry">
        <div class="log-night">GECE ${s.night} • DURUM</div>
        <p><b>${esc(SOCK(s).name)}</b> + <b>${esc(SHOE(s).name)}</b><br>
        ${rankName()} · ${s.solved} çözülen vaka · ${s.cried} ağlama<br>
        <span style="color:var(--dim-2);font-size:10.5px">Eğilimler: ${esc(flags)}</span></p>
      </div>
      <h4>Gece Günlüğü</h4>
      ${entries.map((e) => `
        <div class="log-entry">
          <div class="log-night">GECE ${e.night}${e.place ? ' • ' + esc(e.place) : ''}</div>
          <div class="log-title">${esc(e.title)}</div>
          ${e.choice ? `<div class="log-choice">${esc(e.choice)}</div>` : ''}
        </div>`).join('') || '<p>Henüz bir şey yaşanmadı.</p>'}
      <h4>Yardım</h4>
      <p>Her sahnede 4 seçenek var. Seçimlerin ayaklarını, gözyaşlarını ve dosyayı etkiler. Sabah temizliği ve dolap seçimi ertesi geceyi değiştirir.</p>
    `;
  }

  /* ---------- başlık / yeni oyun ---------- */
  function refreshTitle() {
    enter('title');
    $('#btnContinue').classList.toggle('hidden', !hasSave());
    updateHUD();
  }

  $('#btnNew').addEventListener('click', () => {
    if (hasSave() && !confirm('Kayıtlı gece silinsin ve yeni bir gece başlasın mı?')) return;
    s = newState();
    s.introDone = false;
    try { localStorage.removeItem(SAVE_KEY); } catch (e) {}
    renderIntro();
  });

  $('#btnContinue').addEventListener('click', () => {
    const data = loadSave();
    if (!data) { refreshTitle(); return; }
    s = data;
    resume();
  });

  $('#btnHelp').addEventListener('click', () => openModal('Nasıl oynanır?', helpHTML()));
  $('#btnLog').addEventListener('click', () => openModal('Günlük', logHTML()));
  $('#btnIntroSkip').addEventListener('click', () => {
    if (s && !s.introDone) chooseTemperament('titiz');
  });

  function resume() {
    lock = false;
    if (!s) return refreshTitle();
    switch (s.screen) {
      case 'game':
        if (!s.current || !EVENTS[s.current]) { nextFromQueue(); break; }
        enter('game');
        renderResumedEvent();
        break;
      case 'brief': renderBrief(); break;
      case 'dawn': renderDawn(); break;
      case 'wardrobe': ui.wrFrom = s.wrFrom || 'dawn'; enter('wardrobe'); renderWardrobe(); break;
      case 'intro': renderIntro(); break;
      default: refreshTitle();
    }
  }

  function renderResumedEvent() {
    const ev = EVENTS[s.current];
    if (!ev) { nextFromQueue(); return; }
    enter('game');
    $('#evKicker').textContent = `OLAY ${money(s.beat)}`;
    $('#evPlace').textContent = ev.place || currentCase().place;
    $('#evTitle').textContent = ev.title;
    $('#evText').textContent = typeof ev.text === 'function' ? ev.text(s) : ev.text;
    $('#evOutcome').innerHTML = '';
    $('#choices').innerHTML = ev.choices.map((ch, i) =>
      `<button class="choice" data-i="${i}"><span class="k">${'ABCD'[i]}</span><span class="t">${esc(ch.label)}</span></button>`).join('');
    Array.from($('#choices').children).forEach((btn) =>
      btn.addEventListener('click', () => pick(Number(btn.dataset.i))));
    updateHUD();
    updateDeco();
  }

  /* ---------- dolap düğmeleri ---------- */
  $('#btnBriefWardrobe').addEventListener('click', () => enterWardrobe('brief'));
  $('#btnWrBack').addEventListener('click', () => {
    if (ui.wrFrom === 'brief' || s.wrFrom === 'brief') { renderBrief(); return; }
    refreshTitle();
  });
  $('#btnStartNight').addEventListener('click', () => {
    s.screen = 'brief';
    renderBrief();
    save();
  });

  /* ---------- klavye ---------- */
  document.addEventListener('keydown', (e) => {
    if (!s || s.screen !== 'game') return;
    const n = Number(e.key);
    if (n >= 1 && n <= 4) {
      const btn = document.querySelector(`#choices .choice[data-i="${n - 1}"]`);
      if (btn && !btn.disabled) btn.click();
    }
  });

  /* ---------- başlat ---------- */
  function boot() {
    initTears();
    s = newState();
    refreshTitle();
    updateHUD();
    // Kayıt varsa başlıktaki "Devam Et" düğmesi localStorage'dan yükler.
  }

  boot();
})();
