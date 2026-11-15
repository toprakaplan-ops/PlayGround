/* GECE DEVRİYESİ — SVG illüstrasyonlar.
   Şehir, nehir, liman, pazar, araba, istasyon, çatı, sahil... */
(function () {
  "use strict";

  let artSeq = 0;

  function rng(seed) {
    let s = seed >>> 0;
    return function () {
      s = (s * 1664525 + 1013904223) >>> 0;
      return s / 4294967296;
    };
  }

  function hash(str) {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  const PALETTES = {
    street: { sky: ["#080e20", "#131b35", "#281b36"], moon: "#ffe8cf", accent: "#ff5f8f", accent2: "#6ee7f2", ground: "#060810" },
    river: { sky: ["#071022", "#11213c", "#1c2d4a"], moon: "#fff0d6", accent: "#6ee7f2", accent2: "#ff9ab6", ground: "#050a14" },
    port: { sky: ["#08131f", "#132130", "#25303a"], moon: "#ffe4bf", accent: "#ffb36b", accent2: "#6ee7f2", ground: "#05090f" },
    market: { sky: ["#140a1a", "#28112a", "#3c1930"], moon: "#ffd6a3", accent: "#ffd27d", accent2: "#ff5f8f", ground: "#09060c" },
    car: { sky: ["#040815", "#0a1327", "#14213c"], moon: "#dceeff", accent: "#6ee7f2", accent2: "#ff5f8f", ground: "#03050b" },
    station: { sky: ["#0a1418", "#101f26", "#172b30"], moon: "#d8fff4", accent: "#9ef0d7", accent2: "#ffd27d", ground: "#050a0c" },
    alley: { sky: ["#0a0910", "#171323", "#241f33"], moon: "#ffe4bf", accent: "#ffb36b", accent2: "#ff5f8f", ground: "#05040a" },
    roof: { sky: ["#050b19", "#0c1730", "#1a2442"], moon: "#ffe9c9", accent: "#6ee7f2", accent2: "#ffd27d", ground: "#040711" },
    hospital: { sky: ["#081317", "#112329", "#19343a"], moon: "#e5fff9", accent: "#9ef0d7", accent2: "#ffffff", ground: "#050b0e" },
    beach: { sky: ["#171126", "#38203a", "#71414d"], moon: "#ffd8a8", accent: "#ffb36b", accent2: "#ff9ab6", ground: "#0b0810" },
    museum: { sky: ["#0b0e18", "#151a2a", "#252c42"], moon: "#ffe9bf", accent: "#ffd27d", accent2: "#6ee7f2", ground: "#060810" },
    subway: { sky: ["#070a14", "#0d1324", "#18213a"], moon: "#ffcf6e", accent: "#ffcf6e", accent2: "#6ee7f2", ground: "#03060c" }
  };

  function defs(uid, p, dawn) {
    const top = dawn ? "#19142c" : p.sky[0];
    const mid = dawn ? "#6f3648" : p.sky[1];
    const bot = dawn ? "#e39a63" : p.sky[2];
    return `
      <defs>
        <linearGradient id="${uid}-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="${top}"/>
          <stop offset=".55" stop-color="${mid}"/>
          <stop offset="1" stop-color="${bot}"/>
        </linearGradient>
        <linearGradient id="${uid}-ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="${p.ground}"/>
          <stop offset="1" stop-color="#020308"/>
        </linearGradient>
        <radialGradient id="${uid}-moon">
          <stop offset="0" stop-color="#fff8e8"/>
          <stop offset=".7" stop-color="${p.moon}" stop-opacity=".55"/>
          <stop offset="1" stop-color="${p.moon}" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="${uid}-neon">
          <stop offset="0" stop-color="${p.accent}" stop-opacity=".85"/>
          <stop offset=".5" stop-color="${p.accent}" stop-opacity=".18"/>
          <stop offset="1" stop-color="${p.accent}" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="${uid}-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="${p.sky[2]}" stop-opacity=".55"/>
          <stop offset="1" stop-color="#03060d"/>
        </linearGradient>
        <filter id="${uid}-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="3" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="${uid}-soft" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="8"/>
        </filter>
      </defs>`;
  }

  function stars(uid, r, count, maxY, color) {
    let out = "";
    for (let i = 0; i < count; i++) {
      const x = Math.round(r() * 440);
      const y = Math.round(r() * maxY);
      const rad = r() < 0.9 ? 0.7 : 1.4;
      out += `<circle cx="${x}" cy="${y}" r="${rad}" fill="${color}" opacity="${(0.2 + r() * 0.7).toFixed(2)}"/>`;
    }
    return out;
  }

  function skyline(uid, r, baseY, color, count, litColor, opacity) {
    let out = "";
    let x = -12;
    for (let i = 0; i < count; i++) {
      const w = 12 + r() * 34;
      const h = 18 + r() * 78;
      const y = baseY - h;
      out += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${w.toFixed(1)}" height="${h.toFixed(1)}" fill="${color}" opacity="${opacity}"/>`;
      if (r() > 0.35) {
        out += `<rect x="${(x + 2).toFixed(1)}" y="${(y - 4).toFixed(1)}" width="${(w * 0.4).toFixed(1)}" height="3" fill="${color}" opacity="${opacity}"/>`;
      }
      const cols = Math.max(1, Math.floor(w / 8));
      const rows = Math.max(2, Math.floor(h / 10));
      for (let c = 0; c < cols; c++) {
        for (let row = 0; row < rows; row++) {
          if (r() > 0.72) {
            out += `<rect x="${(x + 3 + c * (w - 5) / cols).toFixed(1)}" y="${(y + 5 + row * 9).toFixed(1)}" width="2.5" height="3" fill="${litColor}" opacity="${(0.22 + r() * 0.55).toFixed(2)}"/>`;
          }
        }
      }
      x += w + 2 + r() * 5;
    }
    return out;
  }

  function neon(uid, x, y, text, color, size) {
    const w = Math.max(22, text.length * size * 0.62 + 10);
    return `
      <g transform="translate(${x} ${y})">
        <rect x="0" y="0" width="${w.toFixed(1)}" height="${(size + 6).toFixed(1)}" rx="2" fill="#05070d" stroke="${color}" stroke-opacity=".35"/>
        <text x="${(w / 2).toFixed(1)}" y="${(size + 1).toFixed(1)}" text-anchor="middle" font-family="Manrope, Arial, sans-serif" font-size="${size}" font-weight="800" letter-spacing="1.4" fill="${color}" filter="url(#${uid}-glow)">${text}</text>
      </g>`;
  }

  function figure(x, y, scale, accent) {
    return `
      <g transform="translate(${x} ${y}) scale(${scale})" opacity=".96">
        <ellipse cx="0" cy="58" rx="16" ry="3.4" fill="#000" opacity=".5"/>
        <path d="M-7 2 Q-10 20 -8 36 L-8 57 L-1 57 L0 39 L2 57 L9 57 L8 36 Q11 19 8 2 Z" fill="#06070c"/>
        <path d="M-8 2 Q0 -3 8 2 L9 14 Q0 10 -9 14 Z" fill="#0c0e17"/>
        <path d="M-8 17 Q0 20 8 17" fill="none" stroke="${accent}" stroke-width="1.2" opacity=".55"/>
        <path d="M-7 36 Q0 38 7 36" fill="none" stroke="${accent}" stroke-width=".8" opacity=".32"/>
        <circle cx="0" cy="-3" r="6" fill="#0b0d15"/>
        <path d="M-7 -6 Q0 -12 7 -6 L6 -2 Q0 -5 -6 -2 Z" fill="#181b26"/>
        <path d="M4 -8 Q11 -4 8 6" stroke="#0b0d15" stroke-width="3" fill="none" stroke-linecap="round"/>
        <path d="M-7 41 L-8 48 M7 41 L8 48" stroke="${accent}" stroke-width=".7" opacity=".45"/>
      </g>`;
  }

  function water(uid, p, y, height, r) {
    let out = `<rect x="0" y="${y}" width="440" height="${height}" fill="url(#${uid}-water)"/>`;
    for (let i = 0; i < 20; i++) {
      const wy = y + 3 + r() * (height - 6);
      const wx = r() * 400;
      const w = 8 + r() * 46;
      out += `<rect x="${wx.toFixed(1)}" y="${wy.toFixed(1)}" width="${w.toFixed(1)}" height="0.8" fill="${p.accent2}" opacity="${(0.08 + r() * 0.2).toFixed(2)}"/>`;
    }
    out += `<rect x="304" y="${y}" width="18" height="${height}" fill="${p.moon}" opacity=".08" filter="url(#${uid}-soft)"/>`;
    return out;
  }

  function road(p, y) {
    return `
      <rect x="0" y="${y}" width="440" height="${220 - y}" fill="#05070c"/>
      <rect x="0" y="${y}" width="440" height="2" fill="${p.accent2}" opacity=".18"/>
      <path d="M20 ${y + 13} H420" stroke="#dce6ff" stroke-opacity=".1" stroke-width="1" stroke-dasharray="18 20"/>
      <path d="M40 ${y + 29} H430" stroke="#dce6ff" stroke-opacity=".05" stroke-width="1" stroke-dasharray="32 38"/>
      <rect x="58" y="${y + 6}" width="62" height="3" fill="${p.accent}" opacity=".14"/>`;
  }

  function scene(kind, weather, variant) {
    const uid = "a" + (++artSeq);
    const p = PALETTES[kind] || PALETTES.street;
    const dawn = weather === "dawn" || variant === "report" || variant === "dawn";
    const r = rng(hash(kind + weather + variant + artSeq));
    let body = "";

    const sky = `
      <rect width="440" height="220" fill="url(#${uid}-sky)"/>
      ${stars(uid, r, 30, dawn ? 80 : 120, dawn ? "#ffe8c4" : "#dbe7ff")}
      <circle cx="${dawn ? 322 : 338}" cy="${dawn ? 128 : 42}" r="${dawn ? 54 : 44}" fill="url(#${uid}-moon)" opacity=".7"/>
      <circle cx="${dawn ? 322 : 338}" cy="${dawn ? 128 : 42}" r="${dawn ? 12 : 16}" fill="${p.moon}" opacity="${dawn ? ".92" : ".82"}"/>`;

    if (kind === "street" || kind === "market" || kind === "alley" || kind === "roof" || kind === "beach") {
      body += skyline(uid, r, kind === "roof" ? 176 : 166, "#080d1c", 14, p.accent2, kind === "roof" ? 0.62 : 0.78);
    }

    if (kind === "street") {
      body += `
        <rect x="0" y="88" width="72" height="84" fill="#0b101e"/>
        <rect x="84" y="72" width="92" height="100" fill="#0a0e1b"/>
        <rect x="190" y="96" width="78" height="76" fill="#0b101e"/>
        <rect x="282" y="64" width="94" height="108" fill="#090d19"/>
        <rect x="388" y="102" width="52" height="70" fill="#0a0e1b"/>
        ${neon(uid, 20, 108, "24H", p.accent2, 7)}
        ${neon(uid, 96, 92, "CHICKEN", p.accent, 7)}
        ${neon(uid, 296, 86, "HOTEL", "#f7c6d7", 7)}
        ${neon(uid, 206, 116, "SEOUL", p.accent2, 6)}
        <circle cx="58" cy="142" r="4" fill="${p.moon}" opacity=".6"/>
        <circle cx="58" cy="142" r="24" fill="url(#${uid}-neon)" opacity=".3"/>
        <rect x="56" y="144" width="3" height="30" fill="#0a0d14"/>
        ${road(p, 170)}
        <g opacity=".55">
          <path d="M70 206 h34 M120 206 h34 M170 206 h34 M220 206 h34 M270 206 h34 M320 206 h34" stroke="#dbe6ff" stroke-width="7" stroke-opacity=".3"/>
        </g>
        <ellipse cx="118" cy="193" rx="26" ry="3" fill="${p.accent}" opacity=".2" filter="url(#${uid}-soft)"/>
        <ellipse cx="300" cy="200" rx="34" ry="3" fill="${p.accent2}" opacity=".16" filter="url(#${uid}-soft)"/>
        ${figure(365, 144, 1.02, p.accent)}
      `;
    } else if (kind === "river") {
      body += `
        ${skyline(uid, r, 150, "#070c19", 15, p.accent2, 0.7)}
        <g opacity=".95">
          <rect x="0" y="146" width="440" height="8" fill="#0a0e18"/>
          <path d="M0 146 H440" stroke="${p.accent2}" stroke-width="1" opacity=".3"/>
          <path d="M78 150 V92 M340 150 V92" stroke="#0b0f1b" stroke-width="7"/>
          <path d="M78 96 Q210 128 340 96" fill="none" stroke="${p.accent2}" stroke-width="1" opacity=".36"/>
          <path d="M78 104 Q210 148 340 104" fill="none" stroke="#cfd9ef" stroke-width=".8" opacity=".2"/>
          <path d="M78 112 Q210 166 340 112" fill="none" stroke="#cfd9ef" stroke-width=".8" opacity=".16"/>
          <path d="M78 120 Q210 184 340 120" fill="none" stroke="#cfd9ef" stroke-width=".8" opacity=".12"/>
          ${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(i => `<rect x="${24 + i * 35}" y="140" width="2" height="9" fill="#0b0f1b"/>`).join("")}
          <rect x="0" y="138" width="440" height="2" fill="#cfd9ef" opacity=".28"/>
        </g>
        <g opacity=".9">${figure(242, 96, .9, p.accent2)}</g>
        ${water(uid, p, 154, 66, r)}
        <path d="M254 156 h12 M250 164 h20 M256 174 h8" stroke="${p.moon}" stroke-opacity=".3" stroke-width="1"/>
      `;
    } else if (kind === "port") {
      body += `
        ${skyline(uid, r, 150, "#070d15", 10, p.accent2, 0.45)}
        ${water(uid, p, 160, 60, r)}
        <g opacity=".95">
          <rect x="18" y="116" width="68" height="44" fill="#15202b" stroke="#31414d" stroke-width="1"/>
          <rect x="26" y="124" width="52" height="3" fill="#3f5360" opacity=".6"/>
          <rect x="26" y="134" width="52" height="3" fill="#3f5360" opacity=".45"/>
          <rect x="94" y="126" width="48" height="34" fill="#1f2a35" stroke="#3c4b56"/>
          <rect x="102" y="134" width="32" height="2.5" fill="#536670" opacity=".5"/>
          <rect x="150" y="108" width="56" height="52" fill="#1a262f" stroke="#36454f"/>
          <rect x="158" y="116" width="40" height="2.5" fill="#587079" opacity=".45"/>
          <rect x="158" y="126" width="40" height="2.5" fill="#587079" opacity=".35"/>
          <path d="M272 160 V82 M272 86 H338 M338 86 V102" stroke="#2a3540" stroke-width="3" fill="none"/>
          <path d="M296 86 V112 M316 86 V104" stroke="#2a3540" stroke-width="2"/>
          <rect x="318" y="102" width="22" height="10" fill="#26343f" stroke="#43545f"/>
          <path d="M0 178 H440" stroke="${p.accent}" stroke-width="1" opacity=".14"/>
          <circle cx="380" cy="154" r="3" fill="${p.moon}" opacity=".75"/>
          <circle cx="380" cy="154" r="18" fill="url(#${uid}-neon)" opacity=".28"/>
          <rect x="379" y="156" width="2" height="18" fill="#0a0f14"/>
        </g>
        <g opacity=".18" fill="#b9d4e8">
          <rect x="0" y="118" width="180" height="6" rx="3"/>
          <rect x="210" y="126" width="150" height="4" rx="2"/>
        </g>
        ${figure(398, 132, .95, p.accent)}
      `;
    } else if (kind === "market") {
      body += `
        <rect x="0" y="74" width="128" height="96" fill="#170d1a"/>
        <rect x="300" y="84" width="140" height="86" fill="#180e1b"/>
        ${neon(uid, 14, 92, "NIGHT", p.accent, 7)}
        ${neon(uid, 316, 100, "SALE", p.accent2, 7)}
        <g transform="translate(0 112)">
          <path d="M0 0 H125 L116 22 H8 Z" fill="#6b1f38" opacity=".85"/>
          ${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `<rect x="${i * 16}" y="0" width="8" height="22" fill="${i % 2 ? "#d9607d" : "#f1c3ce"}" opacity=".28"/>`).join("")}
        </g>
        <g transform="translate(300 120)">
          <path d="M0 0 H140 L130 20 H10 Z" fill="#264b57" opacity=".9"/>
          ${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `<rect x="${i * 18}" y="0" width="9" height="20" fill="${i % 2 ? "#6ee7f2" : "#d9f7fa"}" opacity=".2"/>`).join("")}
        </g>
        ${[36, 76, 118, 152, 198, 246, 292, 334, 382].map((x, i) => `<g><circle cx="${x}" cy="${64 + (i % 3) * 9}" r="2.4" fill="${p.accent}" opacity=".8" filter="url(#${uid}-glow)"/><path d="M${x} ${64 + (i % 3) * 9} V56" stroke="#2a3140" stroke-width=".8"/></g>`).join("")}
        <g opacity=".86">
          <path d="M8 170 H432" stroke="#cfd9ef" stroke-opacity=".12"/>
          <rect x="26" y="154" width="70" height="12" fill="#0c0e16"/>
          <rect x="112" y="158" width="44" height="8" fill="#0c0e16"/>
          <rect x="278" y="152" width="86" height="14" fill="#0c0e16"/>
          ${[48, 84, 138, 170, 206, 238, 320, 352].map((x, i) => `<g><circle cx="${x}" cy="${145 - (i % 2) * 4}" r="7" fill="#080a11"/><path d="M${x - 7} ${150 - (i % 2) * 4} q7 -22 14 0" fill="#080a11"/></g>`).join("")}
        </g>
        <ellipse cx="140" cy="194" rx="38" ry="3" fill="${p.accent}" opacity=".16" filter="url(#${uid}-soft)"/>
        ${figure(412, 166, .9, p.accent2)}
      `;
    } else if (kind === "car") {
      body += `
        <rect x="26" y="18" width="388" height="142" rx="18" fill="#060a14" stroke="#1a2438"/>
        <g clip-path="url(#${uid}-wind)">
          <clipPath id="${uid}-wind"><rect x="30" y="22" width="380" height="134" rx="14"/></clipPath>
          <rect x="30" y="22" width="380" height="134" fill="url(#${uid}-sky)"/>
          ${skyline(uid, r, 128, "#060b17", 12, p.accent2, 0.6)}
          <path d="M30 150 Q210 110 410 150 V156 H30 Z" fill="#03060b"/>
          <path d="M190 150 L210 92 L230 150 Z" fill="#0a1220" opacity=".8"/>
          <path d="M206 148 L210 104 L214 148 Z" fill="#dbe6ff" opacity=".25"/>
          ${[80, 130, 180, 250, 300, 350].map((x, i) => `<circle cx="${x}" cy="${132 - Math.abs(210 - x) * .18}" r="1.6" fill="${p.accent}" opacity=".8"/><circle cx="${x}" cy="${132 - Math.abs(210 - x) * .18}" r="8" fill="url(#${uid}-neon)" opacity=".22"/>`).join("")}
          <g opacity=".3" fill="#dbe6ff">
            ${[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => `<circle cx="${52 + r() * 330}" cy="${32 + r() * 86}" r="${1 + r() * 1.6}"/>`).join("")}
          </g>
        </g>
        <path d="M62 150 L28 46" stroke="#151d2c" stroke-width="3" stroke-linecap="round"/>
        <path d="M62 150 L420 38" stroke="#151d2c" stroke-width="3" stroke-linecap="round" opacity=".8"/>
        <rect x="26" y="160" width="388" height="46" rx="12" fill="#080b13" stroke="#1a2233"/>
        <rect x="52" y="172" width="100" height="9" rx="4" fill="#111b2c" stroke="${p.accent2}" stroke-opacity=".22"/>
        <circle cx="82" cy="192" r="7" fill="#0b0f18" stroke="${p.accent2}" stroke-opacity=".35"/>
        <circle cx="358" cy="192" r="7" fill="#0b0f18" stroke="${p.accent}" stroke-opacity=".3"/>
        <rect x="198" y="168" width="44" height="4" rx="2" fill="${p.accent}" opacity=".5"/>
        <rect x="286" y="168" width="26" height="4" rx="2" fill="${p.accent2}" opacity=".35"/>
      `;
    } else if (kind === "station") {
      body += `
        <rect x="0" y="0" width="440" height="220" fill="url(#${uid}-sky)"/>
        <path d="M0 72 H440" stroke="#d8fff4" stroke-opacity=".12"/>
        <rect x="34" y="0" width="372" height="220" fill="#0a1417" opacity=".5"/>
        <g>
          <rect x="42" y="18" width="94" height="5" rx="2" fill="#d8fff4" opacity=".55" filter="url(#${uid}-glow)"/>
          <rect x="166" y="18" width="94" height="5" rx="2" fill="#d8fff4" opacity=".38" filter="url(#${uid}-glow)"/>
          <rect x="290" y="18" width="94" height="5" rx="2" fill="#d8fff4" opacity=".5" filter="url(#${uid}-glow)"/>
        </g>
        <path d="M0 164 H440" stroke="#203438"/>
        <rect x="0" y="166" width="440" height="54" fill="#071012"/>
        <path d="M0 184 H440 M0 207 H440" stroke="#d8fff4" stroke-opacity=".05"/>
        <rect x="46" y="96" width="110" height="54" rx="3" fill="#0d1a1d" stroke="#284043"/>
        <rect x="54" y="104" width="94" height="4" fill="#9ef0d7" opacity=".22"/>
        <rect x="54" y="114" width="70" height="3" fill="#9ef0d7" opacity=".14"/>
        <rect x="54" y="122" width="82" height="3" fill="#9ef0d7" opacity=".1"/>
        <rect x="308" y="86" width="58" height="80" rx="3" fill="#102126" stroke="#2a4448"/>
        <rect x="316" y="95" width="42" height="48" rx="2" fill="#18333a"/>
        <circle cx="337" cy="102" r="3" fill="#ffd27d" opacity=".7"/>
        <rect x="198" y="118" width="72" height="34" rx="5" fill="#0b1619" stroke="#243b3f"/>
        <rect x="198" y="112" width="72" height="7" rx="2" fill="#122327"/>
        <circle cx="352" cy="66" r="18" fill="#0c171a" stroke="#2c4448"/>
        <path d="M352 66 V55 M352 66 L361 72" stroke="#d8fff4" stroke-width="1.3" opacity=".8"/>
        <circle cx="96" cy="58" r="8" fill="#0b1518" stroke="${p.accent}" stroke-opacity=".3"/>
        <path d="M96 58 V51 M96 58 L102 62" stroke="${p.accent}" stroke-width="1.2" opacity=".7"/>
        <ellipse cx="360" cy="186" rx="54" ry="8" fill="#9ef0d7" opacity=".04" filter="url(#${uid}-soft)"/>
        ${figure(274, 118, 1.05, p.accent)}
        <rect x="0" y="0" width="440" height="220" fill="#061014" opacity=".07"/>
      `;
    } else if (kind === "alley") {
      body += `
        <rect x="0" y="0" width="440" height="220" fill="url(#${uid}-sky)"/>
        <path d="M0 0 L162 76 L162 220 L0 220 Z" fill="#0b0a13"/>
        <path d="M440 0 L278 76 L278 220 L440 220 Z" fill="#0a0912"/>
        <path d="M162 76 L278 76 L278 220 L162 220 Z" fill="#08070d"/>
        <path d="M162 76 L278 76" stroke="#3b3547" stroke-width="1"/>
        <path d="M178 76 V220 M262 76 V220" stroke="#1b1826" stroke-width="1"/>
        <circle cx="220" cy="48" r="3" fill="${p.moon}" opacity=".7"/>
        <circle cx="220" cy="48" r="22" fill="url(#${uid}-neon)" opacity=".32"/>
        <path d="M220 50 V70" stroke="#0a0912" stroke-width="1.4"/>
        <rect x="214" y="67" width="12" height="3" rx="1" fill="${p.accent}" opacity=".55"/>
        <circle cx="220" cy="70" r="3" fill="${p.accent}" opacity=".9" filter="url(#${uid}-glow)"/>
        <g stroke="#262133" stroke-width="2" opacity=".7">
          <path d="M0 120 H47 V220 M440 132 H390 V220"/>
          <path d="M28 118 V160 M380 118 V154"/>
        </g>
        <rect x="0" y="181" width="440" height="39" fill="#05040a"/>
        <ellipse cx="220" cy="202" rx="43" ry="7" fill="${p.accent}" opacity=".13" filter="url(#${uid}-soft)"/>
        <path d="M208 202 h12 M214 208 h10" stroke="${p.accent}" stroke-width="1" opacity=".3"/>
        ${figure(318, 142, 1.02, p.accent)}
        <path d="M0 0 H440 V220 H0 Z" fill="none" stroke="#000" stroke-opacity=".25"/>
      `;
    } else if (kind === "roof") {
      body += `
        ${skyline(uid, r, 180, "#070c18", 18, p.accent2, 0.55)}
        <rect x="0" y="168" width="440" height="52" fill="#05070d"/>
        <path d="M0 168 H440" stroke="#cfd9ef" stroke-opacity=".1"/>
        <g stroke="#1e2638" stroke-width="2">
          <path d="M0 154 H440"/>
          <path d="M18 154 V130 M72 154 V130 M126 154 V130 M180 154 V130 M234 154 V130 M288 154 V130 M342 154 V130 M396 154 V130"/>
        </g>
        <path d="M18 132 H414" stroke="#1e2638" stroke-width="1.4"/>
        <path d="M0 186 H440" stroke="${p.accent2}" stroke-opacity=".08"/>
        <g opacity=".55">
          <path d="M24 118 q34 -8 68 0" stroke="${p.accent2}" stroke-width=".8" opacity=".28" fill="none"/>
          <path d="M292 110 q38 -7 72 0" stroke="${p.accent2}" stroke-width=".8" opacity=".2" fill="none"/>
        </g>
        ${figure(214, 104, 1.08, p.accent)}
      `;
    } else if (kind === "hospital") {
      body += `
        <rect x="0" y="0" width="440" height="220" fill="url(#${uid}-sky)"/>
        <path d="M0 0 L138 62 V220 H0 Z" fill="#0a171a"/>
        <path d="M440 0 L302 62 V220 H440 Z" fill="#0a1619"/>
        <path d="M138 62 H302 V220 H138 Z" fill="#0c1c20"/>
        <rect x="0" y="0" width="440" height="12" fill="#d8fff4" opacity=".14"/>
        <g>
          <rect x="154" y="28" width="32" height="3" rx="1.5" fill="#e5fff9" opacity=".7" filter="url(#${uid}-glow)"/>
          <rect x="204" y="28" width="32" height="3" rx="1.5" fill="#e5fff9" opacity=".7" filter="url(#${uid}-glow)"/>
          <rect x="254" y="28" width="32" height="3" rx="1.5" fill="#e5fff9" opacity=".7" filter="url(#${uid}-glow)"/>
        </g>
        <path d="M138 62 L302 62 M138 220 L302 220" stroke="#2a4a4c" stroke-width="1"/>
        <path d="M0 184 H440" stroke="#d8fff4" stroke-opacity=".08"/>
        <rect x="36" y="112" width="54" height="72" rx="2" fill="#0d2024" stroke="#2c4d50"/>
        <rect x="352" y="112" width="54" height="72" rx="2" fill="#0d2024" stroke="#2c4d50"/>
        <path d="M63 132 v20 M53 142 h20" stroke="#9ef0d7" stroke-width="3" opacity=".7"/>
        <rect x="204" y="126" width="32" height="58" rx="2" fill="#0f2529" stroke="#2d4f52"/>
        <circle cx="230" cy="156" r="2" fill="#9ef0d7" opacity=".7"/>
        <path d="M0 220 L138 174 M440 220 L302 174" stroke="#9ef0d7" stroke-opacity=".06" stroke-width="2"/>
        <ellipse cx="220" cy="190" rx="70" ry="7" fill="#9ef0d7" opacity=".04" filter="url(#${uid}-soft)"/>
        ${figure(220, 98, 1.02, p.accent)}
      `;
    } else if (kind === "beach") {
      body += `
        <circle cx="322" cy="${dawn ? 118 : 60}" r="${dawn ? 26 : 18}" fill="${dawn ? "#ffd2a3" : p.moon}" opacity=".85"/>
        <circle cx="322" cy="${dawn ? 118 : 60}" r="${dawn ? 80 : 52}" fill="${dawn ? "#ffb36b" : p.moon}" opacity=".14" filter="url(#${uid}-soft)"/>
        ${water(uid, p, 128, 44, r)}
        <rect x="0" y="166" width="440" height="54" fill="#17111b"/>
        <path d="M0 166 Q110 158 220 166 T440 164 V220 H0 Z" fill="#211721"/>
        <path d="M0 174 Q120 166 240 176 T440 172" stroke="#e7c7a2" stroke-opacity=".15" fill="none"/>
        <path d="M0 186 Q150 178 270 188 T440 184" stroke="#e7c7a2" stroke-opacity=".08" fill="none"/>
        <g opacity=".4">
          <path d="M160 212 q8 -6 18 0 q8 6 16 0" stroke="${p.accent2}" stroke-width="1" fill="none" opacity=".5"/>
          <path d="M86 198 q7 -5 15 0 q7 5 14 0" stroke="${p.accent2}" stroke-width="1" fill="none" opacity=".3"/>
        </g>
        <g opacity=".8">${figure(366, 138, .92, p.accent)}</g>
        <ellipse cx="366" cy="203" rx="26" ry="3" fill="#000" opacity=".3"/>
      `;
    } else if (kind === "museum") {
      body += `
        <rect x="0" y="0" width="440" height="220" fill="url(#${uid}-sky)"/>
        <rect x="0" y="0" width="440" height="18" fill="#070a12"/>
        ${[36, 108, 180, 252, 324, 396].map(x => `<rect x="${x}" y="22" width="14" height="150" fill="#131827" stroke="#2a3145"/>`).join("")}
        <path d="M0 172 H440" stroke="#6b7288" stroke-opacity=".2"/>
        <rect x="0" y="174" width="440" height="46" fill="#080b13"/>
        <path d="M0 192 H440 M0 210 H440" stroke="#cfd9ef" stroke-opacity=".04"/>
        <g>
          <rect x="176" y="104" width="88" height="66" rx="2" fill="#172032" stroke="#ffd27d" stroke-opacity=".35"/>
          <rect x="184" y="112" width="72" height="50" fill="#0b1220" stroke="#ffd27d" stroke-opacity=".2"/>
          <path d="M220 124 l14 25 h-28 Z" fill="#ffd27d" opacity=".5"/>
          <circle cx="220" cy="120" r="6" fill="#ffd27d" opacity=".5"/>
          <circle cx="220" cy="136" r="54" fill="#ffd27d" opacity=".07" filter="url(#${uid}-soft)"/>
        </g>
        <g opacity=".5" fill="#d9e6ff">
          <path d="M300 170 l6 -8 4 9 -7 5 Z" opacity=".4"/>
          <path d="M128 174 l5 -7 3 7 -6 4 Z" opacity=".3"/>
          <path d="M314 178 l4 -5 3 6 -5 3 Z" opacity=".25"/>
        </g>
        <circle cx="80" cy="34" r="4" fill="#ff7474" opacity=".8" filter="url(#${uid}-glow)"/>
        <circle cx="80" cy="34" r="15" fill="#ff7474" opacity=".18" filter="url(#${uid}-soft)"/>
        <path d="M112 54 L138 120 M328 54 L302 120" stroke="#ffe9bf" stroke-opacity=".12" stroke-width="18" filter="url(#${uid}-soft)"/>
        ${figure(376, 126, 1.02, p.accent)}
      `;
    } else if (kind === "subway") {
      body += `
        <rect x="0" y="0" width="440" height="220" fill="url(#${uid}-sky)"/>
        <path d="M0 0 L176 82 V220 H0 Z" fill="#080b14"/>
        <path d="M440 0 L264 82 V220 H440 Z" fill="#070a12"/>
        <path d="M176 82 H264 V220 H176 Z" fill="#0c1120"/>
        <g>
          <rect x="188" y="46" width="22" height="3" rx="1.5" fill="#ffcf6e" opacity=".7" filter="url(#${uid}-glow)"/>
          <rect x="218" y="46" width="22" height="3" rx="1.5" fill="#ffcf6e" opacity=".7" filter="url(#${uid}-glow)"/>
          <rect x="248" y="46" width="22" height="3" rx="1.5" fill="#ffcf6e" opacity=".7" filter="url(#${uid}-glow)"/>
        </g>
        <rect x="0" y="142" width="440" height="20" fill="#111522"/>
        <rect x="0" y="160" width="440" height="60" fill="#05070d"/>
        <path d="M0 142 H440" stroke="#dbe6ff" stroke-opacity=".1"/>
        <path d="M0 166 H440" stroke="#ffcf6e" stroke-opacity=".3" stroke-width="2"/>
        <g stroke="#2a3244" stroke-width="2">
          <path d="M0 182 H440 M0 196 H440"/>
          <path d="M40 182 V196 M96 182 V196 M152 182 V196 M208 182 V196 M264 182 V196 M320 182 V196 M376 182 V196"/>
        </g>
        <rect x="0" y="74" width="198" height="68" fill="#0b1220" stroke="#26314a"/>
        <rect x="242" y="74" width="198" height="68" fill="#0b1220" stroke="#26314a"/>
        <g fill="#6ee7f2" opacity=".25">
          ${[12, 46, 80, 114, 148, 264, 298, 332, 366, 400].map(x => `<rect x="${x}" y="84" width="18" height="30" rx="2"/>`).join("")}
        </g>
        <path d="M220 62 V120" stroke="#1c2436" stroke-width="2"/>
        <circle cx="220" cy="58" r="4" fill="#ffcf6e" opacity=".5"/>
        <ellipse cx="220" cy="190" rx="80" ry="8" fill="#ffcf6e" opacity=".04" filter="url(#${uid}-soft)"/>
        ${figure(220, 110, 1.02, p.accent)}
      `;
    } else {
      body += skyline(uid, r, 166, "#080d1c", 15, p.accent2, 0.7);
      body += road(p, 170);
      body += figure(360, 142, 1, p.accent);
    }

    const vignette = `
      <rect width="440" height="220" fill="none"/>
      <rect width="440" height="220" fill="url(#${uid}-vig)"/>
      <defs>
        <radialGradient id="${uid}-vig" cx="50%" cy="45%" r="72%">
          <stop offset="55%" stop-color="#000" stop-opacity="0"/>
          <stop offset="100%" stop-color="#000" stop-opacity=".55"/>
        </radialGradient>
      </defs>`;

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 440 220" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${defs(uid, p, dawn)}${sky}${body}${vignette}</svg>`;
  }

  function sockPath() {
    return "M15 9 H27 V27 Q27 35 36 37 L36 44 H21 Q15 44 15 37 Z";
  }

  function sockIcon(sock) {
    const uid = "s" + (++artSeq);
    const pattern = sock.pattern;
    let detail = "";
    if (pattern === "stripe") {
      detail = `<path d="M15 15 H27 M15 19 H27" stroke="${sock.color2}" stroke-width="1.4" opacity=".7"/>`;
    } else if (pattern === "dot") {
      detail = `<circle cx="20" cy="17" r="1" fill="${sock.color2}"/><circle cx="24" cy="22" r="1" fill="${sock.color2}"/><circle cx="20" cy="27" r="1" fill="${sock.color2}"/>`;
    } else if (pattern === "fishnet") {
      detail = `<path d="M17 12 l8 8 M25 12 l-8 8 M17 24 l8 8 M25 24 l-8 8" stroke="${sock.color2}" stroke-width=".6" opacity=".55"/>`;
    } else if (pattern === "rib") {
      detail = `<path d="M18 10 V38 M21 10 V38 M24 10 V38 M27 10 V38" stroke="#000" stroke-width=".35" opacity=".18"/>`;
    } else if (pattern === "lace") {
      detail = `<path d="M15 11 H27" stroke="${sock.color2}" stroke-width="2" stroke-dasharray="1 1.6" opacity=".85"/>`;
    } else if (pattern === "shine") {
      detail = `<path d="M17 13 Q18 26 23 35" stroke="#fff" stroke-width="1" opacity=".28"/>`;
    }
    return `<svg viewBox="0 0 44 44" aria-hidden="true"><defs><linearGradient id="${uid}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${sock.color2}"/><stop offset="1" stop-color="${sock.color}"/></linearGradient></defs><circle cx="23" cy="26" r="19" fill="${sock.color2}" opacity=".09"/><path d="${sockPath()}" fill="url(#${uid})" opacity="${sock.pattern === "sheer" ? ".82" : "1"}"/><path d="${sockPath()}" fill="none" stroke="#000" stroke-opacity=".25" stroke-width=".7"/>${detail}<path d="M15 9 H27" stroke="#fff" stroke-opacity=".3" stroke-width=".8"/></svg>`;
  }

  function shoeIcon(shoe) {
    const uid = "h" + (++artSeq);
    const h = Math.min(11, shoe.heel * 0.85);
    return `<svg viewBox="0 0 44 44" aria-hidden="true">
      <defs><linearGradient id="${uid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${shoe.color2}"/><stop offset="1" stop-color="${shoe.color}"/></linearGradient></defs>
      <ellipse cx="22" cy="39" rx="15" ry="2.4" fill="#000" opacity=".4"/>
      <ellipse cx="23" cy="31" rx="17" ry="8" fill="${shoe.color2}" opacity=".13"/>
      <path d="M5 34 Q5 27 13 26 L19 25 Q25 17 31 19 L35 26 L38 28 Q40 29 40 32 L40 34 Z" fill="url(#${uid})" stroke="#000" stroke-opacity=".28" stroke-width=".7"/>
      ${h > 0.5 ? `<path d="M34 34 l${(h * 0.18).toFixed(1)} ${h.toFixed(1)} h2.2 l${(h * 0.1).toFixed(1)} -${h.toFixed(1)} Z" fill="${shoe.color}" stroke="#000" stroke-opacity=".25" stroke-width=".5"/>` : ""}
      <path d="M8 30 Q17 27 25 26" stroke="#fff" stroke-opacity=".2" stroke-width="1" fill="none"/>
      <path d="M5 34 H40" stroke="#000" stroke-opacity=".45" stroke-width="1.4"/>
      ${shoe.heel > 4 ? `<path d="M37 29 l1 -4" stroke="${shoe.color2}" stroke-width=".8" opacity=".6"/>` : ""}
    </svg>`;
  }

  function outfit(sock, shoe) {
    const uid = "o" + (++artSeq);
    const type = sock.type;
    const cover = type === "Külotlu" || type === "Uzun" ? 8 : type === "Dizaltı" ? 50 : 76;
    const h = Math.min(34, shoe.heel * 3.1);
    let pattern = "";
    if (sock.pattern === "dot") {
      pattern = `<pattern id="${uid}-pat" width="5" height="5" patternUnits="userSpaceOnUse"><circle cx="2.5" cy="2.5" r=".75" fill="${sock.color2}" opacity=".8"/></pattern>`;
    } else if (sock.pattern === "stripe") {
      pattern = `<pattern id="${uid}-pat" width="6" height="5" patternUnits="userSpaceOnUse"><rect width="6" height="1.5" fill="${sock.color2}" opacity=".6"/></pattern>`;
    } else if (sock.pattern === "fishnet") {
      pattern = `<pattern id="${uid}-pat" width="5" height="5" patternUnits="userSpaceOnUse"><path d="M0 0 L5 5 M5 0 L0 5" stroke="${sock.color2}" stroke-width=".5" opacity=".7"/></pattern>`;
    } else if (sock.pattern === "rib") {
      pattern = `<pattern id="${uid}-pat" width="3" height="3" patternUnits="userSpaceOnUse"><path d="M0 0 V3" stroke="#000" stroke-width=".4" opacity=".16"/></pattern>`;
    } else if (sock.pattern === "lace") {
      pattern = `<pattern id="${uid}-pat" width="6" height="6" patternUnits="userSpaceOnUse"><path d="M0 3 Q1.5 1 3 3 T6 3" stroke="${sock.color2}" stroke-width=".5" fill="none" opacity=".6"/></pattern>`;
    } else if (sock.pattern === "shine") {
      pattern = `<pattern id="${uid}-pat" width="6" height="8" patternUnits="userSpaceOnUse"><path d="M1 8 Q2 -1 4 8" stroke="#fff" stroke-width=".5" fill="none" opacity=".2"/></pattern>`;
    }
    const showSheer = sock.pattern === "sheer";
    const sockOpacity = showSheer ? 0.52 : 0.95;

    return `<svg viewBox="0 0 106 140" aria-hidden="true">
      <defs>
        <linearGradient id="${uid}-tight" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#14141c"/><stop offset="1" stop-color="#07070c"/></linearGradient>
        <linearGradient id="${uid}-sock" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${sock.color2}"/><stop offset="1" stop-color="${sock.color}"/></linearGradient>
        <linearGradient id="${uid}-shoe" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${shoe.color2}"/><stop offset="1" stop-color="${shoe.color}"/></linearGradient>
        <clipPath id="${uid}-clip"><rect x="0" y="${cover}" width="106" height="${140 - cover}"/></clipPath>
        <radialGradient id="${uid}-glow"><stop offset="0" stop-color="${sock.color}" stop-opacity=".3"/><stop offset="1" stop-color="${sock.color}" stop-opacity="0"/></radialGradient>
      </defs>
      <rect width="106" height="140" fill="none"/>
      <ellipse cx="53" cy="132" rx="31" ry="4" fill="#000" opacity=".55"/>
      <circle cx="53" cy="64" r="52" fill="url(#${uid}-glow)" opacity=".28"/>
      <path d="M32 11 C27 35 25 56 28 77 L27 105 L37 105 L40 77 C41 55 40 32 39 11 Z" fill="url(#${uid}-tight)"/>
      <path d="M53 11 C51 32 50 54 53 77 L52 105 L62 105 L65 77 C66 55 64 31 63 11 Z" fill="url(#${uid}-tight)"/>
      <g clip-path="url(#${uid}-clip)" opacity="${sockOpacity}">
        <path d="M32 11 C27 35 25 56 28 77 L27 105 L37 105 L40 77 C41 55 40 32 39 11 Z" fill="url(#${uid}-sock)"/>
        <path d="M53 11 C51 32 50 54 53 77 L52 105 L62 105 L65 77 C66 55 64 31 63 11 Z" fill="url(#${uid}-sock)"/>
        ${pattern ? `<path d="M32 11 C27 35 25 56 28 77 L27 105 L37 105 L40 77 C41 55 40 32 39 11 Z" fill="url(#${uid}-pat)"/><path d="M53 11 C51 32 50 54 53 77 L52 105 L62 105 L65 77 C66 55 64 31 63 11 Z" fill="url(#${uid}-pat)"/>` : ""}
      </g>
      <path d="M32 11 C27 35 25 56 28 77 L27 105 L37 105 L40 77 C41 55 40 32 39 11 Z" fill="none" stroke="#000" stroke-opacity=".25" stroke-width=".7"/>
      <path d="M53 11 C51 32 50 54 53 77 L52 105 L62 105 L65 77 C66 55 64 31 63 11 Z" fill="none" stroke="#000" stroke-opacity=".25" stroke-width=".7"/>
      <path d="M17 106 Q17 123 33 125 L48 125 Q57 124 59 113 L59 106 Z" fill="url(#${uid}-shoe)" stroke="#000" stroke-opacity=".35" stroke-width=".7"/>
      <path d="M48 106 Q48 123 64 125 L77 125 Q86 124 88 113 L88 106 Z" fill="url(#${uid}-shoe)" stroke="#000" stroke-opacity=".35" stroke-width=".7"/>
      ${h > 0.5 ? `
        <path d="M51 125 l${(h * 0.18).toFixed(1)} ${h.toFixed(1)} h3.2 l${(h * 0.1).toFixed(1)} -${h.toFixed(1)} Z" fill="${shoe.color}" stroke="#000" stroke-opacity=".3" stroke-width=".6"/>
        <path d="M80 125 l${(h * 0.18).toFixed(1)} ${h.toFixed(1)} h3.2 l${(h * 0.1).toFixed(1)} -${h.toFixed(1)} Z" fill="${shoe.color}" stroke="#000" stroke-opacity=".3" stroke-width=".6"/>` : ""}
      <path d="M19 112 Q31 108 44 111" stroke="#fff" stroke-opacity=".2" stroke-width="1" fill="none"/>
      <path d="M50 112 Q62 108 75 111" stroke="#fff" stroke-opacity=".2" stroke-width="1" fill="none"/>
      <path d="M17 106 H59 M48 106 H88" stroke="#000" stroke-opacity=".4" stroke-width="1.1"/>
      <g fill="${sock.color2}" opacity=".6">
        <circle cx="18" cy="38" r=".8"/><circle cx="88" cy="50" r=".6"/><circle cx="90" cy="70" r=".9"/>
      </g>
    </svg>`;
  }

  function hero(weather) {
    const uid = "hero" + (++artSeq);
    const r = rng(hash("hero" + weather + artSeq));
    const rain = weather === "rain" || weather === "heavy";

    let far = "";
    let x = -18;
    for (let i = 0; i < 13; i++) {
      const w = 16 + r() * 36;
      const h = 28 + r() * 74;
      far += `<rect x="${x.toFixed(1)}" y="${(322 - h).toFixed(1)}" width="${w.toFixed(1)}" height="${h.toFixed(1)}" fill="#070b16"/>`;
      for (let c = 0; c < Math.floor(w / 9); c++) {
        for (let row = 0; row < Math.floor(h / 12); row++) {
          if (r() > 0.74) {
            far += `<rect x="${(x + 3 + c * 8).toFixed(1)}" y="${(322 - h + 6 + row * 11).toFixed(1)}" width="2.4" height="3" fill="${r() > 0.5 ? "#6ee7f2" : "#ff5f8f"}" opacity="${(0.2 + r() * 0.5).toFixed(2)}"/>`;
          }
        }
      }
      x += w + 3 + r() * 6;
    }

    const blocks = [
      { x: -22, y: 176, w: 96, h: 148, c: "#0a0e1a" },
      { x: 66, y: 214, w: 74, h: 110, c: "#090d18" },
      { x: 262, y: 140, w: 78, h: 184, c: "#0b0f1c" },
      { x: 330, y: 206, w: 84, h: 118, c: "#090d18" }
    ];
    let mid = "";
    blocks.forEach((b, bi) => {
      mid += `<rect x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}" fill="${b.c}" stroke="#141b2b" stroke-width="1"/>`;
      mid += `<rect x="${b.x}" y="${b.y - 5}" width="${b.w}" height="5" fill="#101725"/>`;
      const cols = Math.floor(b.w / 16);
      const rows = Math.floor((b.h - 20) / 18);
      for (let c = 0; c < cols; c++) {
        for (let row = 0; row < rows; row++) {
          const lit = r() > 0.68;
          const wx = b.x + 8 + c * 15;
          const wy = b.y + 14 + row * 17;
          if (wx > b.x + b.w - 10) continue;
          mid += `<rect x="${wx.toFixed(1)}" y="${wy.toFixed(1)}" width="7" height="10" rx="1" fill="${lit ? (r() > 0.55 ? "#ffd27d" : "#6ee7f2") : "#111827"}" opacity="${lit ? (0.3 + r() * 0.45).toFixed(2) : 0.7}"/>`;
        }
      }
      if (bi === 0) {
        mid += `<rect x="${b.x + 10}" y="${b.y + 40}" width="52" height="22" rx="2" fill="#05070d" stroke="#ff5f8f" stroke-opacity=".35"/>` +
          `<text x="${b.x + 36}" y="${b.y + 55}" text-anchor="middle" font-family="Manrope, Arial, sans-serif" font-size="10" font-weight="800" letter-spacing="2" fill="#ff5f8f" filter="url(#${uid}-glow)">24H</text>`;
      }
      if (bi === 2) {
        mid += `<rect x="${b.x + 10}" y="${b.y + 28}" width="56" height="20" rx="2" fill="#05070d" stroke="#6ee7f2" stroke-opacity=".32"/>` +
          `<text x="${b.x + 38}" y="${b.y + 42}" text-anchor="middle" font-family="Manrope, Arial, sans-serif" font-size="9" font-weight="800" letter-spacing="1.6" fill="#6ee7f2" filter="url(#${uid}-glow)">HOTEL</text>`;
        mid += `<rect x="${b.x + 12}" y="${b.y + 62}" width="48" height="17" rx="2" fill="#05070d" stroke="#ffd27d" stroke-opacity=".3"/>` +
          `<text x="${b.x + 36}" y="${b.y + 74}" text-anchor="middle" font-family="Manrope, Arial, sans-serif" font-size="8" font-weight="800" letter-spacing="1.6" fill="#ffd27d">PC</text>`;
      }
    });

    const street = `
      <rect x="0" y="324" width="390" height="106" fill="#04060c"/>
      <path d="M0 324 H390" stroke="#cfd9ef" stroke-opacity=".1"/>
      <path d="M0 342 H390" stroke="#ff5f8f" stroke-opacity=".06"/>
      <path d="M120 326 L92 430 M270 326 L298 430" stroke="#cfd9ef" stroke-opacity=".05" stroke-width="1"/>
      <path d="M-20 360 H410" stroke="#dbe6ff" stroke-opacity=".06" stroke-dasharray="26 30" stroke-width="2"/>
      <path d="M-30 392 H420" stroke="#dbe6ff" stroke-opacity=".04" stroke-dasharray="40 46" stroke-width="2"/>
      <ellipse cx="88" cy="404" rx="58" ry="9" fill="#ff5f8f" opacity=".12" filter="url(#${uid}-soft)"/>
      <ellipse cx="296" cy="414" rx="52" ry="8" fill="#6ee7f2" opacity=".1" filter="url(#${uid}-soft)"/>
      <ellipse cx="48" cy="380" rx="30" ry="4" fill="#ff5f8f" opacity=".1" filter="url(#${uid}-soft)"/>
      <path d="M56 330 q4 34 -2 62" stroke="#ff5f8f" stroke-opacity=".14" stroke-width="2"/>
      <path d="M306 330 q-3 40 2 70" stroke="#6ee7f2" stroke-opacity=".11" stroke-width="2"/>
      <path d="M0 418 H390" stroke="#6ee7f2" stroke-opacity=".05" stroke-width="2"/>
    `;

    const drops = rain
      ? Array.from({ length: 46 }, () => {
        const dx = (r() * 390).toFixed(1);
        const dy = (r() * 400).toFixed(1);
        const len = (8 + r() * 22).toFixed(1);
        return `<path d="M${dx} ${dy} l-2 ${len}" stroke="#cfe6ff" stroke-opacity="${(0.06 + r() * 0.16).toFixed(2)}" stroke-width=".8"/>`;
      }).join("")
      : "";

    const person = "";

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 390 430" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <defs>
        <linearGradient id="${uid}-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#04060e"/>
          <stop offset=".34" stop-color="#0b1226"/>
          <stop offset=".62" stop-color="#1a1730"/>
          <stop offset=".85" stop-color="#3a2038"/>
          <stop offset="1" stop-color="#120c18"/>
        </linearGradient>
        <radialGradient id="${uid}-moon">
          <stop offset="0" stop-color="#fff6e4"/>
          <stop offset=".45" stop-color="#ffe3c2" stop-opacity=".92"/>
          <stop offset=".72" stop-color="#ffbd8a" stop-opacity=".28"/>
          <stop offset="1" stop-color="#ff9ab6" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="${uid}-vig" cx="50%" cy="42%" r="74%">
          <stop offset="52%" stop-color="#000" stop-opacity="0"/>
          <stop offset="100%" stop-color="#000" stop-opacity=".62"/>
        </radialGradient>
        <filter id="${uid}-glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="2.6" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="${uid}-soft" x="-120%" y="-120%" width="340%" height="340%">
          <feGaussianBlur stdDeviation="9"/>
        </filter>
      </defs>
      <rect width="390" height="430" fill="url(#${uid}-sky)"/>
      ${stars(uid, r, 54, 250, "#dbe7ff")}
      <circle cx="300" cy="92" r="86" fill="url(#${uid}-moon)" opacity=".9"/>
      <circle cx="300" cy="92" r="34" fill="#fff1d8" opacity=".9"/>
      <circle cx="300" cy="92" r="18" fill="#fffaf0" opacity=".55"/>
      <g opacity=".22" fill="#8fa3c9">
        <ellipse cx="120" cy="118" rx="82" ry="9"/>
        <ellipse cx="250" cy="150" rx="60" ry="6"/>
        <ellipse cx="60" cy="172" rx="46" ry="5"/>
      </g>
      ${far}
      ${mid}
      ${street}
      ${person}
      ${drops}
      <rect width="390" height="430" fill="url(#${uid}-vig)"/>
    </svg>`;
  }

  window.GameArt = { scene, hero, outfit, sockIcon, shoeIcon };
})();
