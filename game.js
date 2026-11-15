/* ============================================================
   GECE DEVRİYESİ — motor
   Park Yuna, 27. Seul Gece 4. Bitiş yok.
   ============================================================ */
(function () {
  "use strict";

  const WARDROBE = window.WARDROBE;
  const STORY = window.STORY_EVENTS || [];
  const PROC = window.PROC_EVENTS || [];
  const ALL_EVENTS = STORY.concat(PROC);
  const EVENT_MAP = Object.fromEntries(ALL_EVENTS.map((e) => [e.id, e]));
  const SOCK_MAP = Object.fromEntries(WARDROBE.socks.map((s) => [s.id, s]));
  const SHOE_MAP = Object.fromEntries(WARDROBE.shoes.map((s) => [s.id, s]));
  const SAVE_KEY = "gece-devriyesi-save-v1";
  const SHIFT_END = 480; // 21:00 → 05:00
  const START_MIN = 21 * 60;
  const OPENERS = ["bulvar", "sokak-bakisi", "han-nehri", "liman", "pazar", "itaewon", "metro", "karakol", "ruzgar"];
  const FILLERS = ["proc-sarhos", "proc-turist", "proc-kedi-araba", "proc-yagmur", "proc-isik", "proc-gazete"];
  const WEATHERS = [
    { key: "rain", label: "İnce yağmur" },
    { key: "fog", label: "Sis" },
    { key: "clear", label: "Ayaz" },
    { key: "heavy", label: "Sağanak" },
    { key: "clear", label: "Bulutsuz" },
    { key: "snow", label: "Kar" },
    { key: "fog", label: "Nemli" }
  ];
  const STAT_LABELS = {
    sinir: "Sinir",
    konfor: "Konfor",
    temizlik: "Temizlik",
    enerji: "Enerji",
    itibar: "İtibar",
    nem: "Nem",
    kum: "Kum",
    koku: "Koku",
    tutuklama: "Tutuklama",
    kurtarma: "Kurtarma",
    gozyasi: "Gözyaşı"
  };
  const BAD_WHEN_UP = new Set(["nem", "kum", "koku", "gozyasi"]);
  const COUNTER_KEYS = new Set(["tutuklama", "kurtarma", "gozyasi"]);

  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  function clamp(n, min = 0, max = 100) {
    n = Number(n);
    if (!Number.isFinite(n)) n = min;
    return Math.max(min, Math.min(max, n));
  }

  function pick(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  function esc(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function signed(n) {
    const v = Math.round(n * 10) / 10;
    return (v > 0 ? "+" : "") + (Number.isInteger(v) ? v : v.toFixed(1));
  }

  function fmtClock(elapsed, start) {
    const base = start == null ? START_MIN : start;
    let m = Math.round(base + elapsed) % 1440;
    if (m < 0) m += 1440;
    return String(Math.floor(m / 60)).padStart(2, "0") + ":" + String(m % 60).padStart(2, "0");
  }

  function weatherFor(day) {
    return WEATHERS[(Math.max(1, day) - 1) % WEATHERS.length];
  }

  function sockOf(state) {
    return SOCK_MAP[state.sockId] || SOCK_MAP["ten-kulotlu"];
  }

  function shoeOf(state) {
    return SHOE_MAP[state.shoeId] || SHOE_MAP["siyah-babet"];
  }

  function makeContext() {
    return {
      day: state.day,
      stats: state.stats,
      counters: state.counters,
      sock: sockOf(state),
      shoe: shoeOf(state),
      elapsed: state.elapsed
    };
  }

  function resolve(value) {
    return typeof value === "function" ? value(makeContext()) : value;
  }

  function resolveText(raw) {
    const v = resolve(raw);
    return (Array.isArray(v) ? v : [v]).filter(Boolean).map((p) => String(p));
  }

  /* ---------------- State ---------------- */
  function freshState() {
    return {
      v: 1,
      day: 1,
      phase: "wardrobe",
      nodeId: "gece-baslangic",
      elapsed: 0,
      scenes: 0,
      stats: { sinir: 32, konfor: 58, temizlik: 88, nem: 8, kum: 3, koku: 7, enerji: 74, itibar: 48 },
      counters: { tutuklama: 0, kurtarma: 0, gozyasi: 0 },
      shiftStart: { tutuklama: 0, kurtarma: 0, gozyasi: 0 },
      sockId: "ten-kulotlu",
      shoeId: "siyah-babet",
      prep: 2,
      usedClean: false,
      usedDry: false,
      queue: [],
      currentTriggered: false,
      lastOutcome: null,
      autoCry: false,
      autoSmell: false,
      log: [],
      visitCount: {},
      recent: [],
      flags: {},
      sound: false,
      report: null
    };
  }

  function loadSave() {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (!parsed || parsed.v !== 1) return null;
      const base = freshState();
      const merged = Object.assign(base, parsed);
      merged.stats = Object.assign(base.stats, parsed.stats || {});
      merged.counters = Object.assign(base.counters, parsed.counters || {});
      merged.shiftStart = Object.assign(base.shiftStart, parsed.shiftStart || {});
      merged.queue = Array.isArray(parsed.queue) ? parsed.queue.slice(0, 3) : [];
      merged.log = Array.isArray(parsed.log) ? parsed.log.slice(-30) : [];
      merged.recent = Array.isArray(parsed.recent) ? parsed.recent.slice(-8) : [];
      merged.visitCount = parsed.visitCount || {};
      merged.flags = parsed.flags || {};
      if (!SOCK_MAP[merged.sockId]) merged.sockId = "ten-kulotlu";
      if (!SHOE_MAP[merged.shoeId]) merged.shoeId = "siyah-babet";
      if (!["wardrobe", "story", "report"].includes(merged.phase)) merged.phase = "wardrobe";
      if (!EVENT_MAP[merged.nodeId]) merged.nodeId = "gece-baslangic";
      if (merged.phase === "report" && !merged.report) merged.phase = "wardrobe";
      return merged;
    } catch (err) {
      return null;
    }
  }

  function save() {
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(state));
    } catch (err) {
      /* sessizce geç: oyun çalışmaya devam eder */
    }
  }

  function hasSave() {
    return !!loadSave();
  }

  function totalBaseComfort(s) {
    const stats = (s || state).stats;
    const sock = sockOf(s || state);
    const shoe = shoeOf(s || state);
    return clamp(44 + sock.comfort + shoe.comfort * 0.9 - shoe.heel * 3.05 - 7 - stats.nem * 0.1 - stats.kum * 0.06, 12, 96);
  }

  function outfitRisks() {
    const sock = sockOf(state);
    const shoe = shoeOf(state);
    const water = Math.round(clamp((sock.water + shoe.water) * 3.9, 0, 100));
    const sand = Math.round(clamp((sock.sand + shoe.sand) * 3.9, 0, 100));
    const fresh = Math.round(clamp((sock.fresh + shoe.fresh) * 4.2, 0, 100));
    return { comfort: Math.round(totalBaseComfort()), water, sand, fresh };
  }

  function conditionLabel(s) {
    const st = (s || state).stats;
    if (st.koku >= 58) return "deniz kokuyor";
    if (st.nem >= 52) return "içi ıslak";
    if (st.kum >= 48) return "içi kumlu";
    if (st.temizlik < 38) return "tozlu";
    if (st.nem >= 24 || st.kum >= 20) return "hafif nemli";
    return "kuru ve temiz";
  }

  function shiftArrests(s) {
    return Math.max(0, s.counters.tutuklama - (s.shiftStart.tutuklama || 0));
  }
  function shiftRescues(s) {
    return Math.max(0, s.counters.kurtarma - (s.shiftStart.kurtarma || 0));
  }
  function shiftTears(s) {
    return Math.max(0, s.counters.gozyasi - (s.shiftStart.gozyasi || 0));
  }

  /* ---------------- Effects ---------------- */
  function applyEffects(fx) {
    if (!fx) return [];
    const out = [];
    const sock = sockOf(state);
    const shoe = shoeOf(state);
    const waterMul = 0.62 + (sock.water + shoe.water) / 30;
    const sandMul = 0.62 + (sock.sand + shoe.sand) / 30;
    const scentMul = 1.15 - (sock.fresh + shoe.fresh) / 60;

    Object.keys(fx).forEach((key) => {
      const raw = fx[key];
      if (key === "flags") {
        if (raw && typeof raw === "object") Object.assign(state.flags, raw);
        return;
      }
      if (key === "risk") return;
      if (COUNTER_KEYS.has(key)) {
        const d = Math.round(Number(raw) || 0);
        if (!d) return;
        state.counters[key] = Math.max(0, (state.counters[key] || 0) + d);
        out.push({ key, delta: d });
        return;
      }
      if (!(key in state.stats)) return;
      let value = Number(raw) || 0;
      if (key === "nem" && value > 0) value *= waterMul;
      if (key === "kum" && value > 0) value *= sandMul;
      if (key === "koku" && value > 0) value *= scentMul;
      if (key === "konfor" && value < 0 && shoe.heel > 5) value *= 1.2;
      const before = state.stats[key];
      state.stats[key] = clamp(before + value, 0, 100);
      const actual = Math.round((state.stats[key] - before) * 10) / 10;
      if (Math.abs(actual) >= 0.1) out.push({ key, delta: actual });
    });
    return out;
  }

  function applyPassiveWear() {
    const shoe = shoeOf(state);
    if (shoe.heel > 2) state.stats.konfor = clamp(state.stats.konfor - shoe.heel * 0.16, 0, 100);
    state.stats.temizlik = clamp(state.stats.temizlik - 0.3, 0, 100);
    state.stats.koku = clamp(state.stats.koku + state.stats.nem * 0.006 + state.stats.kum * 0.004, 0, 100);
  }

  /* ---------------- Audio ---------------- */
  const AudioEngine = {
    ctx: null,
    master: null,
    nodes: [],
    on: false,
    ensure() {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return false;
      if (!this.ctx) {
        this.ctx = new AC();
        this.master = this.ctx.createGain();
        this.master.gain.value = 0;
        this.master.connect(this.ctx.destination);
      }
      if (this.ctx.state === "suspended") this.ctx.resume().catch(() => {});
      return true;
    },
    start() {
      if (this.on || !this.ensure()) return;
      const ctx = this.ctx;
      const now = ctx.currentTime;
      const master = this.master;

      // Rain: filtered noise loop.
      const len = Math.floor(ctx.sampleRate * 3);
      const buffer = ctx.createBuffer(1, len, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * 0.55;
      const src = ctx.createBufferSource();
      src.buffer = buffer;
      src.loop = true;
      const lp = ctx.createBiquadFilter();
      lp.type = "lowpass";
      lp.frequency.value = 1400;
      lp.Q.value = 0.3;
      const hp = ctx.createBiquadFilter();
      hp.type = "highpass";
      hp.frequency.value = 320;
      const rainGain = ctx.createGain();
      rainGain.gain.value = 0.22;
      src.connect(hp).connect(lp).connect(rainGain).connect(master);
      src.start();

      // Slow, low pad.
      const padGain = ctx.createGain();
      padGain.gain.value = 0.06;
      const padFilter = ctx.createBiquadFilter();
      padFilter.type = "lowpass";
      padFilter.frequency.value = 520;
      padFilter.connect(padGain).connect(master);
      [110, 164.81, 220].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        osc.type = "sine";
        osc.frequency.value = freq;
        const g = ctx.createGain();
        g.gain.value = i === 0 ? 0.5 : 0.22;
        osc.connect(g).connect(padFilter);
        osc.start();
        this.nodes.push(osc);
      });

      this.nodes.push(src);
      master.gain.cancelScheduledValues(now);
      master.gain.setValueAtTime(master.gain.value, now);
      master.gain.linearRampToValueAtTime(0.72, now + 1.1);
      this.on = true;
    },
    stop() {
      if (!this.ctx || !this.on) return;
      const now = this.ctx.currentTime;
      this.master.gain.cancelScheduledValues(now);
      this.master.gain.setValueAtTime(this.master.gain.value, now);
      this.master.gain.linearRampToValueAtTime(0, now + 0.45);
      const old = this.nodes.slice();
      this.nodes = [];
      setTimeout(() => {
        old.forEach((n) => {
          try { n.stop(); } catch (err) { /* noop */ }
        });
      }, 600);
      this.on = false;
    },
    click() {
      if (!this.ctx || !this.on) return;
      const ctx = this.ctx;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(760, now + 0.055);
      g.gain.setValueAtTime(0.0001, now);
      g.gain.exponentialRampToValueAtTime(0.05, now + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);
      osc.connect(g).connect(this.master);
      osc.start(now);
      osc.stop(now + 0.1);
    }
  };

  function toggleSound() {
    state.sound = !state.sound;
    if (state.sound) AudioEngine.start();
    else AudioEngine.stop();
    updateSoundButtons();
    save();
    if (state.sound) showToast("Gece sesi açık. Yağmur ve şehir.");
  }

  function updateSoundButtons() {
    $$("[id^='sound']").forEach((btn) => {
      btn.classList.toggle("is-muted", !state.sound);
      btn.setAttribute("aria-label", state.sound ? "Sesi kapat" : "Sesi aç");
      btn.setAttribute("aria-pressed", state.sound ? "true" : "false");
    });
  }

  function haptic() {
    try {
      if (navigator.vibrate) navigator.vibrate(8);
    } catch (err) { /* noop */ }
  }

  /* ---------------- UI scaffolding state ---------------- */
  let state = freshState();

  const ui = {
    screen: "home",
    tab: "socks",
    filter: "all",
    busy: false,
    toastTimer: null,
    tearsTimer: null,
    homeRendered: false,
    resetArmed: false,
    resetTimer: null,
    lastNode: null,
    sheet: null
  };

  const app = $("#app");
  const screens = {
    home: $("#screen-home"),
    wardrobe: $("#screen-wardrobe"),
    story: $("#screen-story"),
    report: $("#screen-report")
  };

  function setScreen(name) {
    ui.screen = name;
    Object.keys(screens).forEach((key) => {
      screens[key].classList.toggle("is-active", key === name);
    });
    closeSheets();
    if (name === "home") renderHome();
    if (name === "wardrobe") renderWardrobe();
    if (name === "story") renderStory();
    if (name === "report") renderReport();
    const app = $("#app");
    if (app) app.scrollTop = 0;
    window.scrollTo(0, 0);
  }

  function showToast(message, ms) {
    const toast = $("#toast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(ui.toastTimer);
    ui.toastTimer = setTimeout(() => toast.classList.remove("is-visible"), ms || 2400);
  }

  function showTears(ms) {
    const tears = $("#tears");
    if (!tears) return;
    tears.classList.add("is-active");
    app.classList.add("is-crying");
    clearTimeout(ui.tearsTimer);
    ui.tearsTimer = setTimeout(() => {
      tears.classList.remove("is-active");
      app.classList.remove("is-crying");
    }, ms || 4600);
  }

  /* ---------------- Home ---------------- */
  function renderHome() {
    const saved = loadSave();
    const start = $("#btnStart");
    const cont = $("#btnContinue");
    const reset = $("#btnHomeReset");
    if (saved) {
      start.classList.add("hidden");
      cont.classList.remove("hidden");
      reset.classList.remove("hidden");
      let meta = "GECE " + saved.day;
      if (saved.phase === "story") meta = "GECE " + saved.day + " · " + fmtClock(saved.elapsed);
      else if (saved.phase === "wardrobe") meta = "GECE " + saved.day + " · HAZIRLIK";
      else if (saved.phase === "report") meta = "GECE " + saved.day + " · ŞAFAK";
      $("#continueMeta").textContent = meta;
    } else {
      start.classList.remove("hidden");
      cont.classList.add("hidden");
      reset.classList.add("hidden");
    }
    const homeArt = $("#homeArt");
    if (!ui.homeRendered || !homeArt.innerHTML.trim()) {
      const day = saved ? saved.day : 1;
      homeArt.className = "home-art" + (weatherFor(day).key === "rain" || weatherFor(day).key === "heavy" ? " is-rain" : "");
      homeArt.innerHTML = window.GameArt.hero(weatherFor(day).key);
      ui.homeRendered = true;
    }
    updateSoundButtons();
  }

  function startNewGame() {
    if (hasSave() && !window.confirm("Kayıtlı bir gecen var. Silip yeni bir devriye başlatmak istiyor musun?")) return;
    state = freshState();
    save();
    ui.lastNode = null;
    ui.tab = "socks";
    ui.filter = "all";
    setScreen("wardrobe");
    if (state.sound) AudioEngine.start();
    showToast("Gece 1. Gardırobun seni bekliyor.");
  }

  function continueGame() {
    const saved = loadSave();
    if (!saved) {
      startNewGame();
      return;
    }
    state = saved;
    if (state.phase === "story" && !EVENT_MAP[state.nodeId]) state.phase = "wardrobe";
    if (state.phase === "report" && !state.report) state.phase = "wardrobe";
    ui.lastNode = null;
    setScreen(state.phase);
    if (state.sound) AudioEngine.start();
    showToast("Kaldığın yerden devam ediyorsun.");
  }

  /* ---------------- Wardrobe ---------------- */
  const SOCK_FILTERS = [
    { id: "all", label: "Tümü" },
    { id: "Külotlu", label: "Külotlu" },
    { id: "Dizaltı", label: "Dizaltı" },
    { id: "Soket", label: "Soket" },
    { id: "Kısa", label: "Kısa" },
    { id: "Uzun", label: "Uzun" }
  ];
  const SHOE_FILTERS = [
    { id: "all", label: "Tümü" },
    { id: "Babet", label: "Babet" },
    { id: "Topuklu", label: "Topuklu" },
    { id: "Platform", label: "Platform" },
    { id: "Bot", label: "Bot" },
    { id: "Loafer", label: "Loafer" },
    { id: "Sneaker", label: "Sneaker" },
    { id: "Sandalet", label: "Sandalet" }
  ];

  function riskChip(label, value, mode) {
    let cls = "";
    if (mode === "goodHigh") {
      cls = value >= 58 ? "risk-chip--good" : value >= 36 ? "risk-chip--mid" : "risk-chip--bad";
    } else if (mode === "badHigh") {
      cls = value >= 62 ? "risk-chip--bad" : value >= 38 ? "risk-chip--mid" : "risk-chip--good";
    }
    return `<span class="risk-chip ${cls}"><i></i>${esc(label)} ${Math.round(value)}</span>`;
  }

  function condBar(value, invert) {
    const v = clamp(value);
    let cls = "";
    if (invert) cls = v >= 60 ? "is-bad" : v >= 34 ? "is-mid" : "";
    else cls = v <= 36 ? "is-bad" : v <= 60 ? "is-mid" : "";
    return `<div class="cond-bar"><i class="${cls}" style="width:${v}%"></i></div>`;
  }

  function condGrid() {
    const st = state.stats;
    return `<div class="cond-grid">
      <div class="cond-stat"><div class="cond-stat__top"><span>Temiz</span><span>${Math.round(st.temizlik)}</span></div>${condBar(st.temizlik, false)}</div>
      <div class="cond-stat"><div class="cond-stat__top"><span>Nem</span><span>${Math.round(st.nem)}</span></div>${condBar(st.nem, true)}</div>
      <div class="cond-stat"><div class="cond-stat__top"><span>Kum</span><span>${Math.round(st.kum)}</span></div>${condBar(st.kum, true)}</div>
      <div class="cond-stat"><div class="cond-stat__top"><span>Koku</span><span>${Math.round(st.koku)}</span></div>${condBar(st.koku, true)}</div>
    </div>`;
  }

  function renderConditionCard() {
    const card = $("#conditionCard");
    if (!card) return;
    const st = state.stats;
    let warn = "Temiz";
    let warnClass = "condition-warn--ok";
    if (st.koku >= 50) { warn = "Koku yüksek"; warnClass = ""; }
    else if (st.nem >= 50) { warn = "Ayakkabı ıslak"; warnClass = ""; }
    else if (st.kum >= 48) { warn = "İçinde kum var"; warnClass = ""; }
    const noTokens = state.prep <= 0;
    let hint = "Ayakkabı şu an fena değil. Yine de gece uzun; temizlik bir hazırlık hakkı ister.";
    if (st.koku >= 50) hint = "Deniz kokusu geçmiyor. Sabun olmadan bu gece her adımda duyacaksın.";
    else if (st.nem >= 50) hint = "İçi hâlâ ıslak. Kurutmazsan gece boyunca ayakların üşür ve koku yapar.";
    else if (st.kum >= 45) hint = "Tabanın içinde kum var. Her adımda seni hatırlatacak.";
    card.innerHTML = `
      <div class="condition-head">
        <span>AYAKKABI DURUMU · ${esc(shoeOf(state).short.toUpperCase())}</span>
        <span class="condition-warn ${warnClass}">${esc(warn)}</span>
      </div>
      ${condGrid()}
      <div class="condition-actions">
        <button class="cond-btn" type="button" data-clean ${state.usedClean || noTokens ? "disabled" : ""}>${state.usedClean ? "Silindi ✓" : "Sil · 1 hak"}</button>
        <button class="cond-btn" type="button" data-dry ${state.usedDry || noTokens ? "disabled" : ""}>${state.usedDry ? "Kurudu ✓" : "Kurut · 1 hak"}</button>
      </div>
      <p class="condition-hint">${esc(hint)} Her gece 2 hazırlık hakkın var.</p>
    `;
  }

  function renderOutfit() {
    const sock = sockOf(state);
    const shoe = shoeOf(state);
    $("#outfitPreview").innerHTML = window.GameArt.outfit(sock, shoe);
    $("#outfitSockName").textContent = sock.name;
    $("#outfitShoeName").textContent = shoe.name + (shoe.heel ? ` · ${shoe.heel} cm` : " · düz taban");
    const risks = outfitRisks();
    $("#outfitChips").innerHTML =
      riskChip("Konfor", risks.comfort, "goodHigh") +
      riskChip("Su", risks.water, "badHigh") +
      riskChip("Kum", risks.sand, "badHigh") +
      riskChip("Tazelik", risks.fresh, "goodHigh");
  }

  function renderPrepTokens() {
    const el = $("#prepTokens");
    if (!el) return;
    el.innerHTML = [0, 1].map((i) => `<i class="${i < state.prep ? "" : "is-spent"}"></i>`).join("");
  }

  function renderFilters() {
    const filters = ui.tab === "socks" ? SOCK_FILTERS : SHOE_FILTERS;
    const el = $("#wardrobeFilters");
    el.innerHTML = filters.map((f) =>
      `<button class="filter ${ui.filter === f.id ? "is-active" : ""}" type="button" data-filter="${esc(f.id)}">${esc(f.label)}</button>`
    ).join("");
  }

  function itemStats(list, item) {
    if (list === "socks") {
      return [
        { v: clamp(item.comfort / 12 * 100, 0, 100), c: "var(--green)" },
        { v: clamp(item.water / 9 * 100, 0, 100), c: "var(--danger)" },
        { v: clamp(item.fresh / 9 * 100, 0, 100), c: "var(--cyan)" }
      ];
    }
    return [
      { v: clamp(item.comfort / 24 * 100, 0, 100), c: "var(--green)" },
      { v: clamp(item.water / 15 * 100, 0, 100), c: "var(--danger)" },
      { v: clamp(item.fresh / 15 * 100, 0, 100), c: "var(--cyan)" }
    ];
  }

  function renderItemGrid() {
    const grid = $("#itemGrid");
    if (!grid) return;
    const isSocks = ui.tab === "socks";
    const list = isSocks ? WARDROBE.socks : WARDROBE.shoes;
    const selectedId = isSocks ? state.sockId : state.shoeId;
    const filtered = list.filter((item) => ui.filter === "all" || item.type === ui.filter);
    grid.innerHTML = filtered.map((item) => {
      const bars = itemStats(ui.tab, item).map((b) => `<i style="--v:${b.v}%;--c:${b.c}"></i>`).join("");
      const sub = isSocks ? item.type : `${item.heel ? item.heel + " cm" : "düz"} · ${item.type}`;
      const icon = isSocks ? window.GameArt.sockIcon(item) : window.GameArt.shoeIcon(item);
      return `<button class="item-card ${selectedId === item.id ? "is-selected" : ""}" type="button" data-id="${esc(item.id)}" data-kind="${isSocks ? "sock" : "shoe"}" aria-pressed="${selectedId === item.id}" title="${esc(item.desc)}">
        <span class="item-icon">${icon}</span>
        <span class="item-name">${esc(item.short)}</span>
        <span class="item-sub">${esc(sub)}</span>
        <span class="item-bars" aria-hidden="true">${bars}</span>
      </button>`;
    }).join("");
  }

  function renderWardrobe() {
    const scroll = $("#wardrobeScroll");
    const oldTop = scroll ? scroll.scrollTop : 0;
    $("#wardrobeKicker").textContent = `GECE ${state.day} · HAZIRLIK`;
    $("#wardrobeClock").textContent = "21:00";
    $("#tabSocks").classList.toggle("is-active", ui.tab === "socks");
    $("#tabShoes").classList.toggle("is-active", ui.tab === "shoes");
    $("#tabSocks").setAttribute("aria-selected", ui.tab === "socks" ? "true" : "false");
    $("#tabShoes").setAttribute("aria-selected", ui.tab === "shoes" ? "true" : "false");
    renderOutfit();
    renderConditionCard();
    renderFilters();
    renderItemGrid();
    renderPrepTokens();
    updateSoundButtons();
    if (scroll) requestAnimationFrame(() => { scroll.scrollTop = oldTop; });
  }

  function selectItem(id, kind) {
    if (kind === "sock" && SOCK_MAP[id]) state.sockId = id;
    if (kind === "shoe" && SHOE_MAP[id]) state.shoeId = id;
    save();
    haptic();
    AudioEngine.click();
    renderWardrobe();
  }

  function cleanShoe() {
    if (state.usedClean) return;
    if (state.prep <= 0) {
      showToast("Hazırlık hakkın kalmadı. Bu gece temizleyemezsin.");
      return;
    }
    state.prep -= 1;
    state.usedClean = true;
    state.stats.temizlik = clamp(state.stats.temizlik + 26);
    state.stats.nem = clamp(Math.round(state.stats.nem * 0.18));
    state.stats.kum = clamp(Math.round(state.stats.kum * 0.12));
    state.stats.koku = clamp(Math.round(state.stats.koku * 0.45));
    save();
    renderWardrobe();
    haptic();
    AudioEngine.click();
    showToast("Ayakkabıyı sabunla ovaladın. İçi yeniden kuru.");
  }

  function dryShoe() {
    if (state.usedDry) return;
    if (state.prep <= 0) {
      showToast("Hazırlık hakkın kalmadı. Bu gece kurutamazsın.");
      return;
    }
    state.prep -= 1;
    state.usedDry = true;
    state.stats.nem = clamp(Math.round(state.stats.nem * 0.32));
    state.stats.koku = clamp(state.stats.koku - 3);
    state.stats.temizlik = clamp(state.stats.temizlik + 2);
    save();
    renderWardrobe();
    haptic();
    AudioEngine.click();
    showToast("Ayakkabıyı kuruttun. Hafifledi.");
  }

  function shuffleOutfit() {
    state.sockId = pick(WARDROBE.socks).id;
    state.shoeId = pick(WARDROBE.shoes).id;
    save();
    renderWardrobe();
    haptic();
    AudioEngine.click();
    showToast("Şansına bıraktın. " + sockOf(state).short + " + " + shoeOf(state).short + ".");
  }

  function pickOpener() {
    const options = OPENERS.filter((id) => EVENT_MAP[id] && !state.recent.slice(-2).includes(id));
    return pick(options.length ? options : OPENERS);
  }

  function goPatrol() {
    state.stats.konfor = totalBaseComfort();
    state.stats.enerji = clamp(Math.max(state.stats.enerji, 58), 30, 100);
    state.phase = "story";
    state.nodeId = state.day === 1 ? "gece-baslangic" : pickOpener();
    state.elapsed = 0;
    state.scenes = 0;
    state.queue = [];
    state.currentTriggered = false;
    state.lastOutcome = null;
    state.autoCry = false;
    state.autoSmell = false;
    state.shiftStart = { ...state.counters };
    state.recent = [state.nodeId];
    state.visitCount[state.nodeId] = (state.visitCount[state.nodeId] || 0) + 1;
    ui.lastNode = null;
    save();
    setScreen("story");
    haptic();
    AudioEngine.click();
    showToast(`Gece ${state.day} başladı. Siyah tayt, ${sockOf(state).short.toLowerCase()}, ${shoeOf(state).short.toLowerCase()}.`);
  }

  /* ---------------- Story ---------------- */
  function currentEvent() {
    return EVENT_MAP[state.nodeId] || EVENT_MAP["gece-baslangic"];
  }

  function weatherClass() {
    const key = weatherFor(state.day).key;
    if (key === "rain" || key === "heavy") return " is-rain";
    if (key === "snow") return " is-snow";
    if (key === "fog") return " is-fog";
    return "";
  }

  function choiceTags(c) {
    const tags = [];
    const fx = c.fx || {};
    if (c.trigger) tags.push({ t: "ZİNCİR", k: "choice-tag--chain" });
    if (fx.gozyasi) tags.push({ t: "AĞLARSIN", k: "choice-tag--bad" });
    if ((fx.risk || 0) > 0) tags.push({ t: "RİSK", k: "choice-tag--bad" });
    if ((fx.nem || 0) >= 6) tags.push({ t: "ISLANIR", k: "choice-tag--bad" });
    if ((fx.kum || 0) >= 5) tags.push({ t: "KUMLANIR", k: "choice-tag--bad" });
    if ((fx.koku || 0) >= 6) tags.push({ t: "KOKU", k: "choice-tag--bad" });
    if ((fx.itibar || 0) >= 5) tags.push({ t: "+İTİBAR", k: "choice-tag--good" });
    if ((fx.sinir || 0) >= 6) tags.push({ t: "NEFES", k: "choice-tag--good" });
    return tags.slice(0, 2);
  }

  function deltaChips(deltas) {
    return deltas.map((d) => {
      const label = STAT_LABELS[d.key] || d.key;
      let cls = "";
      if (COUNTER_KEYS.has(d.key)) cls = "delta-chip--chain";
      else if (BAD_WHEN_UP.has(d.key)) cls = d.delta > 0 ? "delta-chip--bad" : "delta-chip--good";
      else cls = d.delta > 0 ? "delta-chip--good" : "delta-chip--bad";
      return `<span class="delta-chip ${cls}">${esc(label)} ${signed(d.delta)}</span>`;
    }).join("");
  }

  function moodLine() {
    const st = state.stats;
    if (st.koku >= 55) return "Ayakkabından deniz kokusu geliyor. Kimse söylemiyor; sen her adımda duyuyorsun.";
    if (st.nem >= 48) return "Her adımda ayakkabının içinde küçük bir su sesi var.";
    if (st.kum >= 40) return "Bir kum tanesi, ayağının altında inatla duruyor.";
    if (st.sinir <= 26) return "Nefesin sığ. Gözlerin, olmayacak bir şeye dolmaya hazır.";
    const w = weatherFor(state.day).key;
    if (w === "rain" || w === "heavy") return "Yağmur, asfaltın üstünde ince bir film gibi duruyor.";
    if (w === "fog") return "Sis, sokak lambalarının etrafında ağır ağır dönüyor.";
    if (w === "snow") return "Kar, şehrin seslerini yutuyor. Kendi adımlarını bile zor duyuyorsun.";
    return "Şehir uyumuyor. Sen de uyuyamıyorsun.";
  }

  function vital(label, value) {
    const v = clamp(value);
    const cls = v <= 32 ? "is-bad" : v <= 58 ? "is-mid" : "";
    return `<div class="vital">
      <div class="vital__top"><span>${esc(label)}</span><strong>${Math.round(v)}</strong></div>
      <div class="vital__track"><i class="${cls}" style="width:${v}%"></i></div>
    </div>`;
  }

  function renderStory() {
    const ev = currentEvent();
    const sock = sockOf(state);
    const shoe = shoeOf(state);

    $("#storyDay").textContent = `GECE ${state.day}`;
    $("#storyClock").textContent = fmtClock(Math.min(state.elapsed, SHIFT_END));
    $("#shiftProgress").style.width = clamp((state.elapsed / SHIFT_END) * 100) + "%";

    const art = $("#sceneArt");
    art.className = "scene-art" + weatherClass();
    art.innerHTML = window.GameArt.scene(ev.art || "street", weatherFor(state.day).key, ev.id);

    $("#scenePlace").textContent = ev.place;
    $("#sceneChain").classList.toggle("hidden", !state.chained);
    $("#sceneTitle").textContent = ev.title;
    $("#sceneText").innerHTML = resolveText(ev.text).map((p) => `<p>${esc(p)}</p>`).join("");

    const progress = Math.round((state.elapsed / SHIFT_END) * 100);
    $("#footline").innerHTML =
      `<b>${esc(sock.short)}</b><span class="dot"></span>` +
      `<b>${esc(shoe.short)}</b><span class="dot"></span>` +
      `${esc(conditionLabel())}<span class="dot"></span>vardiya %${clamp(progress, 0, 100)}`;

    $("#sceneVitals").innerHTML =
      vital("Sinir", state.stats.sinir) +
      vital("Konfor", state.stats.konfor) +
      vital("Enerji", state.stats.enerji);
    $("#sceneMood").textContent = moodLine();

    const outcome = $("#outcome");
    const choices = $("#choices");

    if (state.pendingOutcome) {
      outcome.classList.remove("hidden");
      $("#outcomeText").textContent = state.pendingOutcome.text;
      $("#outcomeDeltas").innerHTML = deltaChips(state.pendingOutcome.deltas);
      choices.innerHTML =
        `<button class="btn btn--primary" type="button" data-continue="1">` +
        `<span>Devam et</span><span class="btn__arrow">→</span></button>`;
      $("#chainLabel").textContent = "SEÇİMİN İZİ · SONRAKİ OLAY";
    } else {
      outcome.classList.add("hidden");
      $("#outcomeDeltas").innerHTML = "";
      choices.innerHTML = ev.choices.map((c, i) => {
        const tags = choiceTags(c);
        return `<button class="choice" type="button" data-choice="${i}">
          <span class="choice__num">${i + 1}</span>
          <span class="choice__body">
            <span class="choice__label">${esc(c.label)}</span>
            <span class="choice__tags">${tags.map((t) => `<span class="choice-tag ${t.k}"><i></i>${esc(t.t)}</span>`).join("")}</span>
          </span>
          <span class="choice__chev">›</span>
        </button>`;
      }).join("");
      $("#chainLabel").textContent = "4 SEÇİM · HER BİRİ BAŞKA YOL";
    }

    const scroll = $("#storyScroll");
    if (scroll) scroll.scrollTop = 0;
  }

  function logLine(text) {
    state.log.push({ t: fmtClock(state.elapsed), text });
    if (state.log.length > 40) state.log.shift();
  }

  function queueAutoEvents() {
    if (!state.autoCry && state.stats.sinir <= 20) {
      state.autoCry = true;
      if (!state.recent.slice(-1).includes("gozyasi")) state.queue.unshift("gozyasi");
      showTears(5200);
    }
    if (!state.autoSmell && state.stats.koku >= 62) {
      state.autoSmell = true;
      if (!state.recent.slice(-1).includes("koku")) state.queue.unshift("koku");
      showToast("Ayakkabından deniz kokusu yükseliyor. Kimse söylemiyor.");
    }
  }

  function choose(index) {
    if (ui.busy || state.pendingOutcome) return;
    const ev = currentEvent();
    const c = ev.choices[index];
    if (!c) return;

    ui.busy = true;
    AudioEngine.click();
    haptic();

    const deltas = applyEffects(c.fx);
    state.elapsed += 18 + (state.scenes % 5) * 2 + Math.floor(Math.random() * 7);
    state.scenes += 1;

    if (c.trigger && EVENT_MAP[c.trigger] && !state.recent.slice(-2).includes(c.trigger)) {
      state.queue.unshift(c.trigger);
    }

    state.pendingOutcome = { label: c.label, text: c.result, deltas };
    state.pendingNext = c.next;

    logLine(`“${c.label}” — ${sockOf(state).short}, ${conditionLabel()}`);
    queueAutoEvents();

    if (c.fx && c.fx.gozyasi) showTears(5200);
    save();
    renderStory();
    ui.busy = false;
  }

  function advance() {
    if (ui.busy || !state.pendingOutcome) return;
    ui.busy = true;

    let nextId = null;
    let chained = false;

    while (state.queue.length) {
      const q = state.queue.shift();
      if (!EVENT_MAP[q]) continue;
      if (state.recent.slice(-3).includes(q)) continue;
      nextId = q;
      chained = true;
      break;
    }

    if (!nextId) nextId = state.pendingNext;
    if (!nextId || !EVENT_MAP[nextId]) nextId = pickOpener();
    if (state.recent.slice(-2).includes(nextId)) nextId = pickOpener();

    // Devriye döngüsü: dallanan olayların arasına rastgele sokak karşılaşmaları girer.
    if (!chained && Math.random() < 0.34) {
      const filler = pick(FILLERS.filter((id) => EVENT_MAP[id] && !state.recent.slice(-4).includes(id)));
      if (filler) nextId = filler;
    }

    if (!EVENT_MAP[nextId]) nextId = "bulvar";

    state.nodeId = nextId;
    state.chained = chained;
    state.pendingOutcome = null;
    state.pendingNext = null;
    state.visitCount[nextId] = (state.visitCount[nextId] || 0) + 1;
    state.recent.push(nextId);
    if (state.recent.length > 10) state.recent.shift();

    applyPassiveWear();
    AudioEngine.click();
    save();

    if (state.elapsed >= SHIFT_END) {
      endShift();
      ui.busy = false;
      return;
    }

    renderStory();
    ui.busy = false;
  }

  /* ---------------- Shift end / report ---------------- */
  function reportFlavour(ctx) {
    if (ctx.tears >= 3) {
      return {
        title: "Tuzlu Bir Şafak",
        lead: "Bu gece üç kez ağladın ve üç kez yeniden ayağa kalktın. Şafak, gözyaşını kurutmakla meşgul.",
        note: "Kaptan Oh sabah raporuna “insani” diye bir sütun eklemeyi önerdi. Kimse gülmedi. Herkes anladı."
      };
    }
    if (ctx.koku >= 62) {
      return {
        title: "Deniz Kokan Bir Sabah",
        lead: "Ayakkabıların hâlâ ıslak. İçindeki kum, lavaboya dökülünce küçük bir plaj bıraktı. Temizlemedin.",
        note: "“Yarın temizlerim” dedin. Yarına dair hiçbir şey bilmiyorsun; ama bir gece daha var."
      };
    }
    if (ctx.rescues >= 2) {
      return {
        title: "Şafak, Bir Hayat Daha",
        lead: "Bu gece iki kişi, senin durduğun yerde durmaya karar verdi. Bu, tutanaklara geçmeyecek.",
        note: "Min-ho bir çay uzattı. “Bugün iyi iş çıkardın,” dedi. Sen de ilk kez inandın."
      };
    }
    if (ctx.arrests >= 2) {
      return {
        title: "Kâğıtların Ağırlığı",
        lead: "İki tutuklama, üç tutanak, bir de sen. Şehir sabaha karşı biraz daha sessiz.",
        note: "Kaptan Oh dosyayı kapattı: “Rakamlar iyi.” Sonra ekledi: “Sen de iyi ol.”"
      };
    }
    if (ctx.temizlik >= 78 && ctx.koku <= 24) {
      return {
        title: "Temiz Bir Gece",
        lead: "Ayakkabıların kuru, çorabın düzgün, taytın hâlâ iki beden küçük. En azından kontrol edebildiğin şeyler yerinde.",
        note: "Sabah aynası, sana bugün daha az yorgun baktı. Belki de sadece ışıktı."
      };
    }
    return {
      title: "Şafak, Yine de Geliyor",
      lead: "Vardiya bitti. Şehir, bir sonraki gece için nefesini topluyor. Sen de.",
      note: "Ayakkabılarını çıkarıyorsun. İçinden küçük bir kum tanesi düşüyor. Nereden geldiğini bilmiyorsun."
    };
  }

  function endShift() {
    const ctx = {
      day: state.day,
      scenes: state.scenes,
      arrests: shiftArrests(state),
      rescues: shiftRescues(state),
      tears: shiftTears(state),
      temizlik: Math.round(state.stats.temizlik),
      nem: Math.round(state.stats.nem),
      kum: Math.round(state.stats.kum),
      koku: Math.round(state.stats.koku),
      sinir: Math.round(state.stats.sinir),
      itibar: Math.round(state.stats.itibar),
      sockId: state.sockId,
      shoeId: state.shoeId
    };
    const flavour = reportFlavour(ctx);
    state.report = Object.assign({}, ctx, flavour);
    state.phase = "report";
    state.pendingOutcome = null;
    state.pendingNext = null;
    save();
    setScreen("report");
    showToast("Şafak geldi. Vardiya kapandı.");
  }

  function renderReport() {
    const r = state.report;
    if (!r) {
      setScreen("wardrobe");
      return;
    }
    $("#reportDay").textContent = String(r.day);
    $("#reportTitle").textContent = r.title;
    $("#reportLead").textContent = r.lead;

    $("#reportArt").innerHTML = window.GameArt.scene("beach", "dawn", "report");

    const grid = [
      { label: "Bölüm", value: r.scenes, sub: "olay" },
      { label: "Tutuklama", value: r.arrests, sub: "bu gece" },
      { label: "Kurtarma", value: r.rescues, sub: "bu gece" },
      { label: "Gözyaşı", value: r.tears, sub: "kriz" },
      { label: "Temizlik", value: r.temizlik, sub: "/ 100" },
      { label: "Koku", value: r.koku, sub: "/ 100" }
    ];
    $("#reportGrid").innerHTML = grid.map((g) =>
      `<div class="report-stat"><span>${esc(g.label)}</span><strong>${g.value}<em> ${esc(g.sub)}</em></strong></div>`
    ).join("");

    $("#reportNote").textContent = r.note;

    const shoe = SHOE_MAP[r.shoeId] || SHOE_MAP["siyah-babet"];
    const sock = SOCK_MAP[r.sockId] || SOCK_MAP["ten-kulotlu"];
    let warning = "Ayakkabı yarına hazır görünüyor.";
    if (r.koku >= 55) warning = "Deniz kokusu kalıcı hâle geliyor. Yarın sabun şart.";
    else if (r.nem >= 48) warning = "İçi hâlâ nemli. Gece boyunca kurumazsa koku yapar.";
    else if (r.kum >= 40) warning = "Tabanın içinde kum var. Her adımda hatırlayacaksın.";

    $("#reportShoe").innerHTML = `
      <div class="report-shoe__head">
        <strong>${esc(shoe.short)} · ${esc(sock.short)}</strong>
        <span>${r.nem > 40 ? "nemli" : "kuruyor"}</span>
      </div>
      <div class="cond-grid">
        <div class="cond-stat"><div class="cond-stat__top"><span>Temiz</span><span>${r.temizlik}</span></div>${condBar(r.temizlik, false)}</div>
        <div class="cond-stat"><div class="cond-stat__top"><span>Nem</span><span>${r.nem}</span></div>${condBar(r.nem, true)}</div>
        <div class="cond-stat"><div class="cond-stat__top"><span>Kum</span><span>${r.kum}</span></div>${condBar(r.kum, true)}</div>
        <div class="cond-stat"><div class="cond-stat__top"><span>Koku</span><span>${r.koku}</span></div>${condBar(r.koku, true)}</div>
      </div>
      <p class="condition-warning">${esc(warning)}</p>
    `;
  }

  function nextNight() {
    const st = state.stats;
    state.day += 1;
    state.phase = "wardrobe";
    state.nodeId = "gece-baslangic";
    state.elapsed = 0;
    state.scenes = 0;
    state.prep = 2;
    state.usedClean = false;
    state.usedDry = false;
    state.queue = [];
    state.recent = [];
    state.pendingOutcome = null;
    state.pendingNext = null;
    state.currentTriggered = false;
    state.chained = false;
    state.autoCry = false;
    state.autoSmell = false;
    state.report = null;

    st.enerji = clamp(Math.max(66, st.enerji + 18));
    st.sinir = clamp(st.sinir + 16);
    st.nem = clamp(st.nem - 9);
    st.kum = clamp(st.kum - 4);
    st.koku = clamp(st.koku + (st.nem > 26 ? 3 : -5));
    st.temizlik = clamp(st.temizlik - 2);

    save();
    setScreen("wardrobe");
    AudioEngine.click();
    showToast(`Gece ${state.day}. Hava: ${weatherFor(state.day).label.toLowerCase()}.`);
  }

  /* ---------------- Status sheet ---------------- */
  function meter(label, value, invert) {
    const v = clamp(value);
    let cls = "";
    if (invert) cls = v >= 60 ? "is-bad" : v >= 34 ? "is-mid" : "";
    else cls = v <= 32 ? "is-bad" : v <= 58 ? "is-mid" : "";
    return `<div class="meter">
      <span class="meter__label">${esc(label)}</span>
      <span class="meter__track"><i class="meter__fill ${cls}" style="width:${v}%"></i></span>
      <span class="meter__value">${Math.round(v)}</span>
    </div>`;
  }

  function renderStatus() {
    const st = state.stats;
    const sock = sockOf(state);
    const shoe = shoeOf(state);
    const weather = weatherFor(state.day);

    const recentLog = state.log.slice(-6).reverse();

    $("#statusContent").innerHTML = `
      <div class="status-top">
        <div>
          <strong>Park Yuna</strong>
          <span>Gece 4 · 3 yıl 4 ay</span>
        </div>
        <span class="status-weather">${esc(weather.label.toUpperCase())}</span>
      </div>

      <div class="meters">
        ${meter("Sinir", st.sinir, false)}
        ${meter("Konfor", st.konfor, false)}
        ${meter("Temizlik", st.temizlik, false)}
        ${meter("Enerji", st.enerji, false)}
        ${meter("İtibar", st.itibar, false)}
      </div>

      <p class="status-section-title">Ayakkabının İçi</p>
      <div class="status-shoe">
        <div class="status-shoe__icon">${window.GameArt.outfit(sock, shoe)}</div>
        <div class="status-shoe__body">
          <strong>${esc(shoe.name)}</strong>
          <span>${esc(sock.name)} · <b>${esc(conditionLabel())}</b></span>
          <span>Nem ${Math.round(st.nem)} · Kum ${Math.round(st.kum)} · Koku ${Math.round(st.koku)}</span>
        </div>
      </div>

      <p class="status-section-title">Bu Gece</p>
      <div class="status-counters">
        <div class="status-counter"><strong>${shiftArrests(state)}</strong><span>Tutuklama</span></div>
        <div class="status-counter"><strong>${shiftRescues(state)}</strong><span>Kurtarma</span></div>
        <div class="status-counter"><strong>${shiftTears(state)}</strong><span>Gözyaşı</span></div>
      </div>

      <p class="status-section-title">Kısa Kayıt</p>
      <div class="status-log">
        ${recentLog.length
          ? recentLog.map((l) => `<div class="status-log__row"><span class="status-log__time">${esc(l.t)}</span><span class="status-log__text">${esc(l.text)}</span></div>`).join("")
          : `<p class="status-empty">Henüz bir şey yazmadın. Gece yeni başlıyor.</p>`}
      </div>

      <p class="status-note"><b>Siyah tayt:</b> iki beden küçük, dizlerinin arkasını ısırıyor. Çıkaramıyorsun. <b>Sinir dayanımı:</b> %${Math.round(st.sinir)} — ${st.sinir <= 22 ? "bir kibrit çöpü" : st.sinir <= 48 ? "ince bir çizgi" : "bu gece sağlam"}.</p>
    `;
  }

  /* ---------------- Sheets ---------------- */
  function openSheet(id) {
    closeSheets();
    const sheet = document.getElementById(id);
    if (!sheet) return;
    if (id === "sheetStatus") renderStatus();
    sheet.classList.add("is-open");
    $("#sheetScrim").classList.add("is-open");
    ui.sheet = id;
  }

  function closeSheets() {
    $$(".sheet").forEach((s) => s.classList.remove("is-open"));
    $("#sheetScrim").classList.remove("is-open");
    ui.sheet = null;
  }

  /* ---------------- Input ---------------- */
  function armReset() {
    const btn = $("#btnHomeReset");
    if (!btn) return;
    if (!ui.resetArmed) {
      ui.resetArmed = true;
      btn.textContent = "Emin misin? Tekrar dokun.";
      clearTimeout(ui.resetTimer);
      ui.resetTimer = setTimeout(() => {
        ui.resetArmed = false;
        btn.textContent = "Kaydı sil";
      }, 3800);
      return;
    }
    clearTimeout(ui.resetTimer);
    ui.resetArmed = false;
    try {
      localStorage.removeItem(SAVE_KEY);
    } catch (err) { /* noop */ }
    state = freshState();
    ui.homeRendered = false;
    renderHome();
    showToast("Kayıt silindi. Yeni bir gece bekliyor.");
  }

  function bindEvents() {
    $("#btnStart").addEventListener("click", startNewGame);
    $("#btnContinue").addEventListener("click", continueGame);
    $("#btnHomeHelp").addEventListener("click", () => openSheet("sheetHelp"));
    $("#btnHomeReset").addEventListener("click", armReset);

    ["soundHome", "soundWardrobe", "soundStory"].forEach((id) => {
      const btn = document.getElementById(id);
      if (btn) btn.addEventListener("click", toggleSound);
    });

    $("#btnWardrobeHome").addEventListener("click", () => {
      state.phase = "wardrobe";
      save();
      setScreen("home");
    });
    $("#btnShuffle").addEventListener("click", shuffleOutfit);
    $("#btnGoPatrol").addEventListener("click", goPatrol);

    $("#tabSocks").addEventListener("click", () => {
      ui.tab = "socks";
      ui.filter = "all";
      renderWardrobe();
    });
    $("#tabShoes").addEventListener("click", () => {
      ui.tab = "shoes";
      ui.filter = "all";
      renderWardrobe();
    });

    $("#wardrobeFilters").addEventListener("click", (e) => {
      const btn = e.target.closest("[data-filter]");
      if (!btn) return;
      ui.filter = btn.dataset.filter;
      renderWardrobe();
    });

    $("#itemGrid").addEventListener("click", (e) => {
      const btn = e.target.closest("[data-id]");
      if (!btn) return;
      selectItem(btn.dataset.id, btn.dataset.kind);
    });

    $("#conditionCard").addEventListener("click", (e) => {
      if (e.target.closest("[data-clean]")) cleanShoe();
      else if (e.target.closest("[data-dry]")) dryShoe();
    });

    $("#btnStatus").addEventListener("click", () => openSheet("sheetStatus"));
    $("#sheetScrim").addEventListener("click", closeSheets);
    $$("[data-close-sheet]").forEach((btn) => btn.addEventListener("click", closeSheets));

    $("#choices").addEventListener("click", (e) => {
      const cont = e.target.closest("[data-continue]");
      if (cont) {
        advance();
        return;
      }
      const btn = e.target.closest("[data-choice]");
      if (!btn) return;
      choose(Number(btn.dataset.choice));
    });

    $("#btnNextNight").addEventListener("click", nextNight);

    document.addEventListener("keydown", (e) => {
      if (ui.screen === "story") {
        if (e.key >= "1" && e.key <= "4") {
          const i = Number(e.key) - 1;
          const ev = currentEvent();
          if (!state.pendingOutcome && ev.choices[i]) choose(i);
        } else if (e.key === "Enter" || e.key === " ") {
          if (state.pendingOutcome) {
            e.preventDefault();
            advance();
          }
        }
      } else if (e.key === "Escape") {
        closeSheets();
      }
    });
  }

  function init() {
    const saved = loadSave();
    state = saved || freshState();
    if (saved && state.sound) {
      // Kullanıcı etkileşimi olmadan ses başlatılamaz; ilk dokunuşta açılır.
      const resume = () => {
        if (state.sound) AudioEngine.start();
        document.removeEventListener("pointerdown", resume);
      };
      document.addEventListener("pointerdown", resume, { once: true });
    }
    bindEvents();
    setScreen("home");
    updateSoundButtons();
  }

  init();
})();
