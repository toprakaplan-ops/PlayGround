const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const missionText = document.getElementById('missionText');
const missionLog = document.getElementById('missionLog');
const heelValue = document.getElementById('heelValue');
const energyValue = document.getElementById('energyValue');
const heelBar = document.getElementById('heelBar');
const energyBar = document.getElementById('energyBar');
const moneyText = document.getElementById('moneyText');
const messageBox = document.getElementById('messageBox');
const restartBtn = document.getElementById('restartBtn');
const interactBtn = document.getElementById('interactBtn');

const world = { width: 2200, height: 2200 };
const keys = {};
const activePointers = new Map();
let viewportWidth = 1200;
let viewportHeight = 720;

function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  viewportWidth = rect.width;
  viewportHeight = rect.height;
  canvas.width = Math.round(rect.width * pixelRatio);
  canvas.height = Math.round(rect.height * pixelRatio);
  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
const markerRadius = 30;
const buildingRects = [
  { x: 300, y: 230, w: 280, h: 180, color: '#1d3557' },
  { x: 760, y: 210, w: 340, h: 220, color: '#2b446d' },
  { x: 1260, y: 190, w: 340, h: 260, color: '#243e59' },
  { x: 1700, y: 250, w: 260, h: 200, color: '#223d53' },
  { x: 220, y: 720, w: 260, h: 220, color: '#1b2d47' },
  { x: 650, y: 760, w: 330, h: 200, color: '#254266' },
  { x: 1200, y: 760, w: 370, h: 240, color: '#1f3f5e' },
  { x: 1740, y: 760, w: 260, h: 220, color: '#1d3b4d' },
  { x: 260, y: 1280, w: 320, h: 220, color: '#2d4055' },
  { x: 760, y: 1280, w: 340, h: 220, color: '#24375f' },
  { x: 1280, y: 1250, w: 340, h: 220, color: '#22415b' },
  { x: 1770, y: 1280, w: 250, h: 220, color: '#1e3746' },
  { x: 430, y: 1760, w: 360, h: 180, color: '#304d67' },
  { x: 1020, y: 1780, w: 360, h: 170, color: '#213d52' },
  { x: 1510, y: 1770, w: 340, h: 190, color: '#214966' }
];

const shop = { x: 1080, y: 550, radius: 90 };

const suspectSpawns = [
  { x: 490, y: 510, radius: 18, name: 'Çatı hırsızı' },
  { x: 1520, y: 420, radius: 18, name: 'Bisiklet hırsızları çetesi' },
  { x: 980, y: 1480, radius: 18, name: 'Sahte yüzük çetesi' },
  { x: 1820, y: 990, radius: 18, name: 'Bakkal kundakçısı' },
  { x: 650, y: 1800, radius: 18, name: 'Gasp çetesi' }
];

const evidenceSpawns = [
  { x: 340, y: 930, radius: 14, type: 'para izi' },
  { x: 820, y: 470, radius: 14, type: 'telefon sinyali' },
  { x: 1490, y: 1010, radius: 14, type: 'maymuncuk takımı' },
  { x: 1810, y: 1650, radius: 14, type: 'çalınmış fatura' },
  { x: 1120, y: 1950, radius: 14, type: 'takip cihazlı çanta' }
];

const game = {
  lastTime: 0,
  active: true,
  time: 0,
  worldShiftX: 0,
  worldShiftY: 0,
  money: Infinity,
  missionIndex: 0,
  objectivesCleared: 0,
  currentMessage: '',
  messageTimer: 0,
  missionState: 'Şehirde devriye gez'
};

const player = {
  x: 1080,
  y: 540,
  radius: 18,
  speed: 220,
  energy: 100,
  heelIntegrity: 100,
  direction: 0,
  invulnerable: 0,
  canMove: true,
  attire: 'Siyah topuklu ayakkabılar'
};

const worldState = {
  suspects: suspectSpawns.map((item) => ({ ...item, captured: false })),
  evidence: evidenceSpawns.map((item) => ({ ...item, collected: false })),
  objectiveText: 'Dilekçe konvoyuna eşlik et ve tüm olay noktalarını kontrol et.'
};

const camera = { x: 0, y: 0 };

restartBtn.addEventListener('click', resetGame);

document.addEventListener('keydown', (event) => {
  keys[event.key.toLowerCase()] = true;
  if (event.key === 'e' || event.key === 'E') handleInteraction();
  if (event.key === ' ') {
    event.preventDefault();
    handleInteraction();
  }
});

document.addEventListener('keyup', (event) => {
  keys[event.key.toLowerCase()] = false;
});

function clearTouchInputs() {
  for (const key of activePointers.values()) keys[key] = false;
  activePointers.clear();
}

document.querySelectorAll('.direction-button').forEach((button) => {
  button.addEventListener('pointerdown', (event) => {
    event.preventDefault();
    const key = button.dataset.key;
    activePointers.set(event.pointerId, key);
    keys[key] = true;
    try {
      button.setPointerCapture(event.pointerId);
    } catch (error) {
      // Synthetic pointer events used by tests do not have a capturable pointer.
    }
  });

  const release = (event) => {
    const key = activePointers.get(event.pointerId);
    if (!key) return;
    keys[key] = false;
    activePointers.delete(event.pointerId);
  };

  button.addEventListener('pointerup', release);
  button.addEventListener('pointercancel', release);
  button.addEventListener('lostpointercapture', release);
});

interactBtn.addEventListener('pointerdown', (event) => {
  event.preventDefault();
  handleInteraction();
});

window.addEventListener('blur', clearTouchInputs);
document.addEventListener('visibilitychange', () => {
  if (document.hidden) clearTouchInputs();
});

function resetGame() {
  player.x = 1080;
  player.y = 540;
  player.energy = 100;
  player.heelIntegrity = 100;
  player.canMove = true;
  game.active = true;
  game.time = 0;
  game.missionIndex = 0;
  game.objectivesCleared = 0;
  messageBox.classList.add('hidden');
  restartBtn.classList.add('hidden');
  worldState.suspects = suspectSpawns.map((item) => ({ ...item, captured: false }));
  worldState.evidence = evidenceSpawns.map((item) => ({ ...item, collected: false }));
  updateMissionText('Şehirde devriye gez');
  updateLog('Şehir merkezinde hareketlilik var. Topuklarını sağlam tut, şehri güvende tut.');
  setMessage('Vardiya başladı. Harekete geç.');
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function distance(aX, aY, bX, bY) {
  return Math.hypot(aX - bX, aY - bY);
}

function setMessage(msg) {
  messageBox.textContent = msg;
  messageBox.classList.remove('hidden');
  game.messageTimer = 2.4;
}

function updateMissionText(text) {
  missionText.textContent = text;
}

function updateLog(text) {
  missionLog.innerHTML = `<div class="log-title">Merkez</div><p>${text}</p>`;
}

function handleInteraction() {
  if (distance(player.x, player.y, shop.x, shop.y) < shop.radius + 26) {
    if (player.heelIntegrity < 100 || player.energy < 100) {
      player.heelIntegrity = 100;
      player.energy = 100;
      setMessage('Yeni topuklu ayakkabılarını giydin. Devriyeye hazırsın.');
      updateLog('Ayakkabı mağazası stoklarını yeniledi. Yeni bir ihbar gelmeden topukların değiştirildi.');
      return;
    }

    setMessage('Topukların ve enerjin zaten tamamen dolu.');
    return;
  }

  const suspect = worldState.suspects.find((s) => !s.captured && distance(player.x, player.y, s.x, s.y) < 42);
  if (suspect) {
    suspect.captured = true;
    game.objectivesCleared += 1;
    setMessage(`Şüpheli yakalandı: ${suspect.name}.`);
    updateLog(`${suspect.name} etkisiz hâle getirildi. Devriye güzergâhı güvende.`);
    checkCompletion();
  }

  const evidence = worldState.evidence.find((e) => !e.collected && distance(player.x, player.y, e.x, e.y) < 34);
  if (evidence) {
    evidence.collected = true;
    setMessage(`Delil güvenceye alındı: ${evidence.type}.`);
    updateLog(`${evidence.type} bulundu. Her ipucu davayı güçlendiriyor.`);
    checkCompletion();
  }
}

function checkCompletion() {
  const allSuspectsCaught = worldState.suspects.every((s) => s.captured);
  const allEvidenceCollected = worldState.evidence.every((e) => e.collected);

  if (allSuspectsCaught && allEvidenceCollected) {
    updateMissionText('Vardiya tamamlandı');
    updateLog('Şehir güvence altında. Tüm şüpheliler yakalandı ve delil zinciri tamamlandı.');
    setMessage('Görev tamamlandı. Bu gece şehir güvende.');
    game.active = false;
    restartBtn.classList.remove('hidden');
  }
}

function updatePlayer(dt) {
  if (!player.canMove) return;

  let moveX = 0;
  let moveY = 0;

  if (keys['w'] || keys['arrowup']) moveY -= 1;
  if (keys['s'] || keys['arrowdown']) moveY += 1;
  if (keys['a'] || keys['arrowleft']) moveX -= 1;
  if (keys['d'] || keys['arrowright']) moveX += 1;

  const length = Math.hypot(moveX, moveY) || 1;
  if (moveX !== 0 || moveY !== 0) {
    const heelPace = player.heelIntegrity <= 0 ? 0.45 : 1;
    const adjustedSpeed = player.speed * (player.energy > 15 ? 1 : 0.65) * heelPace;
    const dx = (moveX / length) * adjustedSpeed * dt;
    const dy = (moveY / length) * adjustedSpeed * dt;

    player.x += dx;
    player.y += dy;
    player.direction = Math.atan2(moveY, moveX);

    player.energy = clamp(player.energy - dt * 2.8, 0, 100);
  } else {
    player.energy = clamp(player.energy + dt * 3.8, 0, 100);
  }

  player.x = clamp(player.x, 45, world.width - 45);
  player.y = clamp(player.y, 45, world.height - 45);

  const touchingBuilding = buildingRects.some((rect) =>
    player.x + player.radius > rect.x &&
    player.x - player.radius < rect.x + rect.w &&
    player.y + player.radius > rect.y &&
    player.y - player.radius < rect.y + rect.h
  );

  if (touchingBuilding) {
    if (player.invulnerable <= 0) {
      player.heelIntegrity = clamp(player.heelIntegrity - 7, 0, 100);
      player.invulnerable = 0.4;
    }
    player.x = clamp(player.x - Math.cos(player.direction || 0) * 25, 50, world.width - 50);
    player.y = clamp(player.y - Math.sin(player.direction || 0) * 25, 50, world.height - 50);
  }

  if (player.heelIntegrity <= 0) {
    // Keep a slow limp available so a broken heel never soft-locks the shift.
    player.canMove = true;
    setMessage('Topukların hasar gördü. Onarmak için ayakkabı mağazasına git.');
    updateLog('Sol topuğun kırıldı. Takibe devam etmek için mağazada onarım gerekiyor.');
  }

  if (player.energy <= 0) {
    player.energy = 0;
    player.speed = 120;
  } else {
    player.speed = 220;
  }

  if (player.invulnerable > 0) {
    player.invulnerable -= dt;
  }

  if (player.heelIntegrity > 0 && distance(player.x, player.y, shop.x, shop.y) < shop.radius + 40) {
    player.canMove = true;
  }
}

function updateCamera() {
  camera.x = clamp(player.x - viewportWidth / 2, 0, world.width - viewportWidth);
  camera.y = clamp(player.y - viewportHeight / 2, 0, world.height - viewportHeight);
}

function drawBackground() {
  ctx.fillStyle = '#0b1720';
  ctx.fillRect(0, 0, viewportWidth, viewportHeight);

  ctx.save();
  ctx.translate(-camera.x, -camera.y);

  for (let x = 0; x < world.width; x += 80) {
    for (let y = 0; y < world.height; y += 80) {
      ctx.fillStyle = (x + y) % 160 === 0 ? '#101d2b' : '#0f1a26';
      ctx.fillRect(x, y, 80, 80);
    }
  }

  ctx.strokeStyle = 'rgba(160, 200, 255, 0.22)';
  ctx.lineWidth = 2;
  for (let i = 0; i < 6; i++) {
    const x = 220 + i * 330;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, world.height);
    ctx.stroke();
  }

  for (let i = 0; i < 6; i++) {
    const y = 150 + i * 340;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(world.width, y);
    ctx.stroke();
  }

  for (const rect of buildingRects) {
    ctx.fillStyle = rect.color;
    ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
    ctx.fillStyle = 'rgba(255,255,255,0.06)';
    ctx.fillRect(rect.x + 25, rect.y + 24, rect.w - 50, 18);
    ctx.fillRect(rect.x + 25, rect.y + rect.h - 34, rect.w - 50, 12);
  }

  ctx.fillStyle = '#5ce7d9';
  ctx.beginPath();
  ctx.arc(shop.x, shop.y, shop.radius, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#12475c';
  ctx.fillRect(shop.x - 32, shop.y - 14, 64, 28);
  ctx.fillStyle = '#d9f9ff';
  ctx.fillRect(shop.x - 18, shop.y - 26, 10, 20);
  ctx.fillRect(shop.x + 8, shop.y - 26, 10, 20);

  for (const suspect of worldState.suspects) {
    if (suspect.captured) continue;
    ctx.fillStyle = '#ff646e';
    ctx.beginPath();
    ctx.arc(suspect.x, suspect.y, suspect.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffd7dd';
    ctx.fillRect(suspect.x - 12, suspect.y - 26, 24, 10);
  }

  for (const item of worldState.evidence) {
    if (item.collected) continue;
    ctx.fillStyle = '#f7d85c';
    ctx.beginPath();
    ctx.arc(item.x, item.y, item.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#533f00';
    ctx.fillRect(item.x - 2, item.y - 20, 4, 40);
    ctx.fillRect(item.x - 16, item.y - 2, 32, 4);
  }

  ctx.restore();
}

function drawPlayer() {
  const x = player.x - camera.x;
  const y = player.y - camera.y;

  ctx.save();
  ctx.translate(x, y);

  ctx.fillStyle = 'rgba(0,0,0,0.18)';
  ctx.beginPath();
  ctx.ellipse(0, 26, 18, 8, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#f6d3d6';
  ctx.beginPath();
  ctx.arc(0, -30, 18, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#0a0b12';
  ctx.beginPath();
  ctx.arc(-5, -34, 3.5, 0, Math.PI * 2);
  ctx.arc(5, -34, 3.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = '#3b261d';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(-8, -16);
  ctx.lineTo(-4, 6);
  ctx.moveTo(8, -16);
  ctx.lineTo(4, 6);
  ctx.stroke();

  ctx.fillStyle = '#1c1d20';
  ctx.fillRect(-16, -8, 32, 30);

  ctx.strokeStyle = '#d6b9ff';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(-10, 22);
  ctx.lineTo(-2, 38);
  ctx.moveTo(10, 22);
  ctx.lineTo(2, 38);
  ctx.stroke();

  ctx.fillStyle = '#0d0b12';
  ctx.fillRect(-15, 24, 6, 20);
  ctx.fillRect(9, 24, 6, 20);

  ctx.restore();
}

function drawWorldMarkers() {
  ctx.save();
  ctx.translate(-camera.x, -camera.y);

  const target = worldState.suspects.find((s) => !s.captured) || worldState.evidence.find((e) => !e.collected);
  const markerTarget = target || { x: shop.x, y: shop.y };

  ctx.strokeStyle = 'rgba(147, 226, 255, 0.8)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(markerTarget.x, markerTarget.y, markerRadius, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = 'rgba(147, 226, 255, 0.18)';
  ctx.beginPath();
  ctx.arc(markerTarget.x, markerTarget.y, markerRadius - 8, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function drawHudEffects() {
  const viewX = player.x - camera.x;
  const viewY = player.y - camera.y;

  if (player.invulnerable > 0) {
    ctx.strokeStyle = 'rgba(255, 123, 149, 0.7)';
    ctx.beginPath();
    ctx.arc(viewX, viewY, player.radius + 10, 0, Math.PI * 2);
    ctx.stroke();
  }

  const shopDist = distance(player.x, player.y, shop.x, shop.y);
  if (shopDist < shop.radius + 40) {
    ctx.fillStyle = 'rgba(96, 255, 217, 0.16)';
    ctx.beginPath();
    ctx.arc(shop.x - camera.x, shop.y - camera.y, 92, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#99ffeb';
    ctx.font = '18px sans-serif';
    ctx.fillText("Onarmak için Etkileşim'e bas (E)", shop.x - camera.x - 120, shop.y - camera.y - 95);
  }
}

function updateUi() {
  const heelPct = Math.max(0, player.heelIntegrity);
  const energyPct = Math.max(0, player.energy);

  heelValue.textContent = `${Math.round(heelPct)}%`;
  energyValue.textContent = `${Math.round(energyPct)}%`;
  heelBar.style.width = `${heelPct}%`;
  energyBar.style.width = `${energyPct}%`;
  moneyText.textContent = '∞';

  if (player.heelIntegrity <= 30) {
    heelBar.style.background = 'linear-gradient(90deg, #ff9f6e, #ff5d73)';
  } else {
    heelBar.style.background = 'linear-gradient(90deg, #ff8bd7, #d67cff, #a777ff)';
  }
}

function update(dt) {
  if (game.messageTimer > 0) {
    game.messageTimer -= dt;
    if (game.messageTimer <= 0) {
      messageBox.classList.add('hidden');
    }
  }

  if (game.active) {
    updatePlayer(dt);
  }

  updateCamera();
  updateUi();
}

function render() {
  drawBackground();
  drawWorldMarkers();
  drawPlayer();
  drawHudEffects();
}

let lastFrame = 0;
function tick(timestamp) {
  const dt = Math.min((timestamp - lastFrame) / 1000 || 0.016, 0.033);
  lastFrame = timestamp;
  game.time += dt;
  update(dt);
  render();
  requestAnimationFrame(tick);
}

resetGame();
requestAnimationFrame(tick);
