import * as THREE from '../vendor/three.module.js';

// Seoul Beat — a self-contained, offline 3D night-patrol game.
const $ = id => document.getElementById(id);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(42, innerWidth / innerHeight, .1, 150);
const renderer = new THREE.WebGLRenderer({ canvas: $('scene'), antialias: true, powerPreference: 'high-performance' });

renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.7));
renderer.setSize(innerWidth, innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.12;
scene.background = new THREE.Color(0x090b1a);
scene.fog = new THREE.FogExp2(0x090b1a, .025);
scene.add(new THREE.HemisphereLight(0xbac8ff, 0x21172a, 2));
const moon = new THREE.DirectionalLight(0xb5c9ff, 2.4);
moon.position.set(-7, 18, 10); scene.add(moon);
const pinkLamp = new THREE.PointLight(0xff3189, 24, 23); pinkLamp.position.set(-8, 5, -5); scene.add(pinkLamp);
const blueLamp = new THREE.PointLight(0x24cfff, 20, 22); blueLamp.position.set(8, 4, 5); scene.add(blueLamp);

const material = (color, roughness=.76, metalness=.05, extra={}) => new THREE.MeshStandardMaterial({color, roughness, metalness, ...extra});
const boxGeo = new THREE.BoxGeometry(1,1,1);
const sphereGeo = new THREE.SphereGeometry(1,14,10);
const asphalt = material(0x171a2a,.92), curb = material(0x55576b), navy = material(0x20395f,.48,.12),
  pantsMat = material(0x111a31,.55), skinMat = material(0xe4b393,.7), hairMat = material(0x24172a,.4),
  gold = material(0xe4bd6d,.3,.45), shoeMat = material(0x101018,.3,.1);
function box(parent, mat, pos, size, shadow=true) {
  const o = new THREE.Mesh(boxGeo, mat); o.position.set(...pos); o.scale.set(...size); o.castShadow=shadow; o.receiveShadow=true; parent.add(o); return o;
}
function ball(parent, mat, pos, size) {
  const o = new THREE.Mesh(sphereGeo,mat); o.position.set(...pos); o.scale.set(...size); o.castShadow=true; parent.add(o); return o;
}
function cylinder(parent, mat, pos, radius, height, segments=12) {
  const o = new THREE.Mesh(new THREE.CylinderGeometry(radius*.82,radius,height,segments),mat); o.position.set(...pos); o.castShadow=true; parent.add(o); return o;
}
const ground = new THREE.Mesh(new THREE.PlaneGeometry(200,200), asphalt);
ground.rotation.x=-Math.PI/2; ground.position.y=-.12; ground.receiveShadow=true; scene.add(ground);
const plaza = new THREE.Group(); scene.add(plaza);
box(plaza,material(0x202338,.93),[0,-.055,0],[25,.1,29],false);
for(let x=-12;x<=12;x+=6) box(plaza,material(0x414254),[x,.005,0],[.07,.012,27],false);
for(let z=-13;z<=13;z+=6) box(plaza,material(0x414254),[0,.006,z],[24,.012,.07],false);
for(let i=-4;i<=4;i++) for(const z of [-10,10]) box(plaza,material(0xd0d0d2),[i*.72,.018,z],[.38,.025,2],false);
for(const z of [-5,5]) for(let x=-11;x<=11;x+=2.2) box(plaza,material(0xb9b5ad),[x,.018,z],[.9,.018,.065],false);
for(const z of [-14,14]) box(plaza,curb,[0,.08,z],[26,.2,.3]);
for(const x of [-12.5,12.5]) box(plaza,curb,[x,.08,0],[.3,.2,28]);

function signTexture(title, color) {
  const c=document.createElement('canvas'); c.width=512;c.height=144;
  const ctx=c.getContext('2d'); ctx.fillStyle='#0b1020';ctx.fillRect(4,4,504,136);
  ctx.strokeStyle=color;ctx.lineWidth=5;ctx.strokeRect(7,7,498,130);ctx.textAlign='center';
  ctx.shadowColor=color;ctx.shadowBlur=18;ctx.fillStyle=color;ctx.font='bold 54px sans-serif';ctx.fillText(title,256,76);
  ctx.shadowBlur=5;ctx.fillStyle='#d5def3';ctx.font='bold 20px sans-serif';ctx.fillText('서울 • SEOUL NIGHT',256,114);
  const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;return t;
}
function building(x,z,w,d,h,title,color) {
  const g=new THREE.Group();g.position.set(x,0,z);scene.add(g);
  box(g,material(0x1b1d32,.9),[0,h/2,0],[w,h,d]);
  const side=z<0?1:-1;
  for(let row=0;row<Math.floor((h-1)/1.45);row++) for(let col=0;col<Math.floor(w/1.2);col++) {
    const palette=[0x243650,0x263344,0x452a40,0x244550];const c=palette[(row*3+col*5)%palette.length];
    box(g,material(c,.3,.1,{emissive:c,emissiveIntensity:.3}),[-w/2+.5+col*1.1,1+row*1.3,side*(d/2+.02)],[.48,.65,.04],false);
  }
  const tex=signTexture(title,color), sign=new THREE.Mesh(new THREE.PlaneGeometry(Math.min(w-1,3.2),.82),new THREE.MeshBasicMaterial({map:tex,side:THREE.DoubleSide}));
  sign.position.set(0,1.5,side*(d/2+.05));g.add(sign);
  const glow=new THREE.PointLight(color==='#ff6ca8'?0xff3189:0x26cfff,7,9);glow.position.set(0,2,side*(d/2+1));g.add(glow);
}
building(-11,-15,8,5,11,'포차','#ff6ca8');building(-2,-17,7,5,14,'SEOUL','#43dfff');building(8,-15,8,5,10,'CAFE 24','#ff6ca8');
building(-12,15,7,5,12,'분식','#43dfff');building(-3,17,8,5,15,'NIGHT','#ff6ca8');building(7,15,9,5,11,'노래방','#ff6ca8');
building(-18,-5,5,8,10,'SHOP','#43dfff');building(18,-4,5,8,13,'편의점','#ff6ca8');
for(const [x,z] of [[-10,-10],[10,-10],[-10,10],[10,10],[-10,0],[10,0]]) {
  const g=new THREE.Group();g.position.set(x,0,z);scene.add(g);
  cylinder(g,material(0x393d50,.4,.4),[0,2,0],.085,4,8);box(g,material(0x393d50),[.4,3.85,0],[.9,.07,.07]);
  ball(g,material(0xffd69a,.25,.1,{emissive:0xffa43f,emissiveIntensity:1.6}),[.8,3.72,0],[.17,.12,.15]);
  const l=new THREE.PointLight(0xffc97d,9,8);l.position.set(.8,3.6,0);g.add(l);
}
for(const [x,z] of [[-11,-7],[-11,7],[11,-7],[11,7],[-7,12],[7,-12]]) {
  cylinder(scene,material(0x49362d),[x,.7,z],.17,1.4,8);
  ball(scene,material(0x1b4143),[x,1.8,z],[.75,.9,.72]);
  ball(scene,material(0x245044),[x,2.4,z],[.58,.65,.56]);
}
function neonKiosk(x,z,title) {
  const g=new THREE.Group();g.position.set(x,0,z);scene.add(g);
  box(g,material(0x292a40),[0,.72,0],[2.5,1.44,1.7]);
  box(g,material(0x33334a),[0,1.5,0],[2.75,.16,1.9]);
  box(g,material(0x36b8ca,.3,.1,{emissive:0x146d80,emissiveIntensity:.7}),[0,1,.87],[1.8,.52,.04],false);
  const t=new THREE.Mesh(new THREE.PlaneGeometry(1.3,.4),new THREE.MeshBasicMaterial({map:signTexture(title,'#ffd57b'),transparent:true}));t.position.set(0,1,.9);g.add(t);
}
neonKiosk(-7,-3,'호떡');neonKiosk(7,3,'야식');

// Yuna, an adult Seoul patrol officer in a fitted navy uniform and black flats.
function makeOfficer() {
  const root=new THREE.Group();scene.add(root);
  const body=new THREE.Group();root.add(body);
  const legs=[];
  for(const s of [-1,1]) {
    const thigh=box(body,pantsMat,[s*.17,.53,0],[.21,.68,.26]);
    const shin=box(body,pantsMat,[s*.17,.2,.03],[.17,.38,.2]);
    box(body,shoeMat,[s*.17,.075,.16],[.21,.12,.34]);
    legs.push({thigh,shin,side:s});
  }
  box(body,navy,[0,1.12,0],[.62,.73,.34]);
  box(body,navy,[0,.77,0],[.66,.2,.38]);
  const blouse=material(0xe4e9f4,.5);box(body,blouse,[0,1.36,.18],[.2,.36,.025]);
  const lapel1=box(body,blouse,[-.12,1.46,.19],[.14,.16,.03]);lapel1.rotation.z=-.42;
  const lapel2=box(body,blouse,[.12,1.46,.19],[.14,.16,.03]);lapel2.rotation.z=.42;
  box(body,material(0x11182a,.4),[0,.89,0],[.67,.1,.4]);
  box(body,gold,[.12,.89,.21],[.09,.08,.025]);box(body,gold,[-.2,1.42,.19],[.1,.07,.03]);
  box(body,material(0xdfe6f3),[.18,1.34,.2],[.14,.05,.025]);
  const armL=new THREE.Group(),armR=new THREE.Group();
  for(const [arm,s] of [[armL,-1],[armR,1]]) {
    arm.position.set(s*.35,1.42,0);body.add(arm);
    const sleeve=box(arm,navy,[s*.06,-.2,0],[.2,.44,.23]);sleeve.rotation.z=-s*.12;
    cylinder(arm,skinMat,[s*.07,-.48,.01],.075,.23,10);
    box(arm,material(0x11182a),[s*.06,-.38,0],[.21,.09,.24]);
  }
  cylinder(body,skinMat,[0,1.61,0],.11,.2,12);
  const head=new THREE.Group();head.position.set(0,1.9,.015);body.add(head);
  ball(head,skinMat,[0,0,0],[.235,.29,.21]);
  ball(head,hairMat,[0,.12,-.025],[.25,.21,.23]);
  ball(head,hairMat,[0,-.08,-.15],[.265,.23,.14]);
  ball(head,hairMat,[-.2,-.01,.035],[.07,.2,.11]);ball(head,hairMat,[.2,-.01,.035],[.07,.2,.11]);
  for(const s of [-1,1]) {
    ball(head,material(0xf7eee7),[s*.08,.02,.184],[.05,.034,.018]);
    ball(head,material(0x211920,.25),[s*.08,.018,.2],[.019,.023,.012]);
    box(head,hairMat,[s*.08,.07,.184],[.085,.016,.02]);
  }
  ball(head,skinMat,[0,-.045,.2],[.03,.04,.025]);box(head,material(0x9d4b58),[0,-.11,.186],[.065,.016,.02]);
  cylinder(head,navy,[0,.25,0],.17,.09,14);box(head,navy,[0,.3,0],[.22,.035,.16]);ball(head,gold,[0,.25,.16],[.035,.04,.02]);
  box(body,material(0x111722),[-.28,1.34,.2],[.1,.14,.08]);
  const ring=new THREE.Mesh(new THREE.RingGeometry(.45,.5,32),new THREE.MeshBasicMaterial({color:0x50e4ff,transparent:true,opacity:.32,side:THREE.DoubleSide}));
  ring.rotation.x=-Math.PI/2;ring.position.y=.02;root.add(ring);
  return {root,body,head,legs,armL,armR,walk:0};
}
function makeThief() {
  const root=new THREE.Group(),body=new THREE.Group();root.add(body);scene.add(root);
  const clothes=material([0x4b294f,0x344c50,0x59422e,0x383454][Math.floor(Math.random()*4)],.78);
  for(const s of [-1,1]) {box(body,material(0x171827),[s*.15,.45,0],[.18,.55,.23]);box(body,shoeMat,[s*.15,.07,.1],[.2,.12,.3]);}
  box(body,clothes,[0,1.02,0],[.52,.62,.32]);ball(body,material(0x141522),[0,1.53,-.01],[.24,.27,.23]);
  ball(body,skinMat,[0,1.52,.17],[.145,.15,.07]);box(body,material(0x171827),[0,1.59,.23],[.28,.075,.04]);
  for(const s of [-1,1])ball(body,material(0xf2dfd2),[s*.055,1.55,.25],[.023,.015,.01]);
  const armL=new THREE.Group(),armR=new THREE.Group();
  for(const [arm,s] of [[armL,-1],[armR,1]]) {arm.position.set(s*.3,1.27,0);body.add(arm);box(arm,clothes,[s*.05,-.2,0],[.17,.42,.2]);ball(arm,skinMat,[s*.06,-.43,.04],[.07,.07,.07]);}
  const bag=box(body,material(0x982e45),[.27,.85,-.18],[.29,.34,.15]);bag.rotation.z=-.2;
  const marker=new THREE.Group();root.add(marker);
  const halo=new THREE.Mesh(new THREE.TorusGeometry(.22,.025,7,20),new THREE.MeshBasicMaterial({color:0xff4c9a}));halo.position.y=2.15;marker.add(halo);
  box(marker,material(0xff4c9a, .4, 0, {emissive:0x9c123e}),[0,2.15,0],[.045,.28,.045]);
  return {root,body,armL,armR,bag,marker,walk:0,speed:1.55+Math.random()*.25,escape:16,alive:true};
}
const player=makeOfficer();player.root.position.set(-.6,0,1.5);
const state={mode:'menu',score:0,caught:0,lives:3,combo:0,bestCombo:1,time:100,best:Number(localStorage.getItem('seoulBeatBest')||0),enemies:[],spawnIn:1.3,elapsed:0,cooldown:0,keys:{},joy:{x:0,y:0},muted:false,audio:null};
$('bestScore').textContent=state.best;
function updateHud() {
  $('score').textContent=state.score.toLocaleString('tr-TR');
  $('timerValue').textContent=Math.ceil(state.time);
  $('timerFill').style.width=`${Math.max(0,state.time)}%`;
  $('timerFill').parentElement.classList.toggle('low',state.time<20);
  $('combo').classList.toggle('show',state.combo>1);
  $('comboText').textContent=`KOMBO ×${Math.max(1,state.combo)}`;
  document.querySelectorAll('.heart').forEach((el,i)=>el.classList.toggle('off',i>=state.lives));
  $('dashBtn').classList.toggle('cooling',state.cooldown>.12);
  $('dashBtn').classList.toggle('ready',state.cooldown<=.12);
}
function banner(text) {
  const el=$('banner');el.textContent=text;el.classList.remove('show');void el.offsetWidth;el.classList.add('show');
}
function toast(text,style='') {
  const el=document.createElement('div');el.className=`toast ${style}`;el.innerHTML=text;$('toasts').appendChild(el);
  setTimeout(()=>el.remove(),1400);
}
function sound(type='hit') {
  if(state.muted)return;
  try {
    const C=window.AudioContext||window.webkitAudioContext;if(!C)return;
    if(!state.audio)state.audio=new C();if(state.audio.state==='suspended')state.audio.resume();
    const ctx=state.audio,now=ctx.currentTime,osc=ctx.createOscillator(),gain=ctx.createGain();
    const tones={hit:[330,140,.13,'sawtooth'],catch:[590,920,.25,'triangle'],miss:[170,75,.3,'sawtooth'],slash:[280,90,.14,'triangle'],start:[420,720,.2,'sine']};
    const [a,b,d,w]=tones[type]||tones.hit;osc.type=w;osc.frequency.setValueAtTime(a,now);osc.frequency.exponentialRampToValueAtTime(b,now+d);
    gain.gain.setValueAtTime(.0001,now);gain.gain.exponentialRampToValueAtTime(.055,now+.012);gain.gain.exponentialRampToValueAtTime(.0001,now+d);
    osc.connect(gain);gain.connect(ctx.destination);osc.start(now);osc.stop(now+d+.02);
  } catch(_) {}
}
function spawnThief() {
  if(state.enemies.length>=4)return;
  const e=makeThief(),a=Math.random()*Math.PI*2,r=8.5+Math.random()*1.7;
  e.root.position.set(Math.cos(a)*r,0,Math.sin(a)*r);e.root.rotation.y=Math.atan2(-e.root.position.x,-e.root.position.z);
  e.escape=15+Math.random()*2;state.enemies.push(e);
  if(state.enemies.length===1)toast('ŞÜPHELİ GÖRÜLDÜ <small>• TAKİPTE</small>','pink');
}
function removeThief(e) {
  const i=state.enemies.indexOf(e);if(i>=0)state.enemies.splice(i,1);scene.remove(e.root);e.alive=false;
}
function catchThief(e) {
  const pos=e.root.position.clone();removeThief(e);state.combo++;state.bestCombo=Math.max(state.bestCombo,state.combo);state.caught++;
  const points=(100+Math.floor(state.time*.8))*Math.min(state.combo,5);state.score+=points;state.time=Math.min(100,state.time+2.2);
  sound('catch');toast(`+${points} <small>PUAN • ×${state.combo} KOMBO</small>`);
  if([3,5,10].includes(state.combo))banner(`${state.combo}× KOMBO!`);
  const burst=new THREE.Mesh(new THREE.RingGeometry(.2,.3,24),new THREE.MeshBasicMaterial({color:0x55eaff,transparent:true,opacity:.8,side:THREE.DoubleSide}));
  burst.rotation.x=-Math.PI/2;burst.position.copy(pos);burst.position.y=.04;scene.add(burst);
  const start=performance.now();const tick=()=>{const t=(performance.now()-start)/420;burst.scale.setScalar(1+t*3);burst.material.opacity=Math.max(0,.8*(1-t));if(t<1)requestAnimationFrame(tick);else{scene.remove(burst);burst.geometry.dispose();burst.material.dispose();}};requestAnimationFrame(tick);
}
function missThief(e) {
  removeThief(e);state.lives--;state.combo=0;state.time=Math.max(0,state.time-5);sound('miss');
  const heart=document.querySelectorAll('.heart')[state.lives];if(heart){heart.classList.add('lost');setTimeout(()=>heart.classList.remove('lost'),600);}
  toast('HIRSIZ KAÇTI <small>−1 KALP • −5 SN</small>','pink');
  if(state.lives<=0)endGame(false);
}
function strike() {
  if(state.mode!=='playing'||state.cooldown>0)return;
  state.cooldown=.7;player.armR.rotation.x=-1.05;setTimeout(()=>{player.armR.rotation.x=0;},170);sound('slash');
  let target=null,nearest=2.3;
  for(const e of state.enemies){const d=player.root.position.distanceTo(e.root.position);if(d<nearest){nearest=d;target=e;}}
  if(target)catchThief(target);
}
function resetGame() {
  for(const e of [...state.enemies])removeThief(e);
  state.score=0;state.caught=0;state.lives=3;state.combo=0;state.bestCombo=1;state.time=100;state.cooldown=0;state.spawnIn=1.1;
  player.root.position.set(0,0,2);player.root.rotation.y=0;player.walk=0;
  document.querySelectorAll('.heart').forEach(h=>h.classList.remove('off','lost'));
  $('score').textContent='0';updateHud();
}
function startGame() {
  resetGame();state.mode='playing';
  $('menu').classList.add('hidden');$('pause').classList.add('hidden');$('gameover').classList.add('hidden');
  ['hud','minimapWrap','dashBtn'].forEach(id=>$(id).classList.remove('hidden'));
  if(matchMedia('(pointer:coarse)').matches){$('stick').classList.remove('hidden');$('hints').classList.add('hidden');}
  else{$('hints').classList.remove('hidden');$('stick').classList.add('hidden');}
  banner('DEVRİYE BAŞLADI');sound('start');setTimeout(()=>{if(state.mode==='playing')spawnThief();},650);
}
function pauseGame() {
  if(state.mode==='playing'){state.mode='paused';$('pause').classList.remove('hidden');}
  else if(state.mode==='paused'){state.mode='playing';$('pause').classList.add('hidden');}
}
function endGame(timeUp) {
  if(state.mode==='gameover')return;state.mode='gameover';
  ['hud','minimapWrap','dashBtn','hints','stick'].forEach(id=>$(id).classList.add('hidden'));
  const old=state.best;if(state.score>state.best){state.best=state.score;localStorage.setItem('seoulBeatBest',String(state.best));$('bestScore').textContent=state.best;}
  $('finalScore').textContent=state.score.toLocaleString('tr-TR');$('finalCaught').textContent=state.caught;
  $('finalCombo').textContent=`×${state.bestCombo}`;$('finalBest').textContent=state.best;
  $('goKicker').textContent=timeUp?'VARDİYA TAMAMLANDI':'VARDİYA BİTTİ';
  $('goTitle').textContent=state.caught>=8?'SEOUL GÜVENDE':state.caught>=3?'İYİ İŞ, OFİSER':'DEVAM ET, YUNA';
  const rank=state.caught>=10?'SEOUL’ÜN EFSANESİ':state.caught>=6?'GECE KARTALI':state.caught>=3?'MAHALLE KORUYUCUSU':'YENİ DEVRİYE';
  $('goRank').textContent=(state.score>old?'✦ YENİ REKOR • ':'')+rank;$('gameover').classList.remove('hidden');
}
$('startBtn').addEventListener('click',startGame);$('againBtn').addEventListener('click',startGame);$('restartBtn').addEventListener('click',startGame);
$('resumeBtn').addEventListener('click',pauseGame);$('pauseBtn').addEventListener('click',pauseGame);
$('menuBtn').addEventListener('click',()=>{$('gameover').classList.add('hidden');$('menu').classList.remove('hidden');state.mode='menu';});
function toggleMute(){state.muted=!state.muted;$('muteBtn').classList.toggle('muted',state.muted);$('soundToggle').textContent=`SES: ${state.muted?'KAPALI':'AÇIK'}`;}
$('muteBtn').addEventListener('click',toggleMute);$('soundToggle').addEventListener('click',toggleMute);
window.addEventListener('keydown',e=>{
  if(['Space','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.code))e.preventDefault();state.keys[e.code]=true;
  if(e.code==='Space')strike();if(e.code==='KeyP'||e.code==='Escape')pauseGame();if(e.code==='KeyM')toggleMute();
  if(e.code==='Enter'&&(state.mode==='menu'||state.mode==='gameover'))startGame();
});
window.addEventListener('keyup',e=>state.keys[e.code]=false);
$('dashBtn').addEventListener('pointerdown',e=>{e.preventDefault();strike();});

// Touch joystick is anchored to the user's touch on the left half of the playfield.
const canvas=$('scene'),stick=$('stick'),knob=$('.stick-knob');let joyPointer=null,joyOrigin={x:0,y:0};
canvas.addEventListener('pointerdown',e=>{
  if(state.mode!=='playing'||!matchMedia('(pointer:coarse)').matches||e.clientX>innerWidth*.58)return;
  joyPointer=e.pointerId;canvas.setPointerCapture(e.pointerId);joyOrigin={x:e.clientX,y:e.clientY};
  stick.style.left=`${e.clientX}px`;stick.style.top=`${e.clientY}px`;stick.classList.add('on');moveJoy(e);
});
function moveJoy(e){if(joyPointer!==e.pointerId)return;const dx=e.clientX-joyOrigin.x,dy=e.clientY-joyOrigin.y,r=45,len=Math.hypot(dx,dy),k=len>r?r/len:1;knob.style.left=`calc(50% + ${dx*k}px)`;knob.style.top=`calc(50% + ${dy*k}px)`;state.joy.x=dx*k/r;state.joy.y=dy*k/r;}
function endJoy(e){if(joyPointer!==e.pointerId)return;joyPointer=null;state.joy.x=state.joy.y=0;stick.classList.remove('on');knob.style.left='50%';knob.style.top='50%';}
canvas.addEventListener('pointermove',moveJoy);canvas.addEventListener('pointerup',endJoy);canvas.addEventListener('pointercancel',endJoy);

const map=$('minimap'),mapCtx=map.getContext('2d');
function drawMap() {
  const w=map.width,h=map.height,c=mapCtx;c.clearRect(0,0,w,h);c.fillStyle='#090d1d';c.fillRect(0,0,w,h);
  c.strokeStyle='rgba(100,145,200,.16)';c.lineWidth=1;
  for(let x=0;x<w;x+=30){c.beginPath();c.moveTo(x,0);c.lineTo(x,h);c.stroke();}
  for(let y=0;y<h;y+=30){c.beginPath();c.moveTo(0,y);c.lineTo(w,y);c.stroke();}
  c.fillStyle='rgba(100,116,150,.25)';c.fillRect(28,12,w-56,h-24);
  const px=x=>w/2+x*7.7,py=z=>h/2+z*6.6;
  c.strokeStyle='rgba(150,170,210,.3)';c.lineWidth=2;c.strokeRect(px(-12),py(-14),24*7.7,28*6.6);
  c.fillStyle='rgba(255,255,255,.16)';
  for(let i=-4;i<=4;i++){c.fillRect(px(i*.72)-1,py(-10)-6,3,12);c.fillRect(px(i*.72)-1,py(10)-6,3,12);}
  for(const e of state.enemies){c.beginPath();c.fillStyle='#ff4d9d';c.shadowColor='#ff4d9d';c.shadowBlur=9;c.arc(px(e.root.position.x),py(e.root.position.z),4.3,0,Math.PI*2);c.fill();}
  c.beginPath();c.fillStyle='#4fe6ff';c.shadowColor='#4fe6ff';c.shadowBlur=10;c.arc(px(player.root.position.x),py(player.root.position.z),4.7,0,Math.PI*2);c.fill();c.shadowBlur=0;
}
function animate(now) {
  requestAnimationFrame(animate);
  const dt=Math.min(.04,(now-(animate.last||now))/1000);animate.last=now;state.elapsed+=dt;
  pinkLamp.intensity=23+Math.sin(state.elapsed*1.7)*3;blueLamp.intensity=19+Math.sin(state.elapsed*1.35+1)*3;
  if(state.mode==='playing') {
    state.time=Math.max(0,state.time-dt);state.cooldown=Math.max(0,state.cooldown-dt);
    if(state.time<=0){state.time=0;updateHud();endGame(true);}
    const kx=(state.keys.KeyD||state.keys.ArrowRight?1:0)-(state.keys.KeyA||state.keys.ArrowLeft?1:0);
    const kz=(state.keys.KeyS||state.keys.ArrowDown?1:0)-(state.keys.KeyW||state.keys.ArrowUp?1:0);
    let mx=kx+state.joy.x,mz=kz+state.joy.y;const len=Math.hypot(mx,mz);if(len>1){mx/=len;mz/=len;}
    if(len>.08) {
      player.root.position.x=THREE.MathUtils.clamp(player.root.position.x+mx*5.2*dt,-11.2,11.2);
      player.root.position.z=THREE.MathUtils.clamp(player.root.position.z+mz*5.2*dt,-12.1,12.1);
      player.root.rotation.y=Math.atan2(mx,mz);player.walk+=dt*11;player.body.position.y=Math.abs(Math.sin(player.walk))*.035;
      player.legs.forEach((leg,i)=>{const a=Math.sin(player.walk+i*Math.PI)*.52;leg.thigh.rotation.x=a;leg.shin.rotation.x=Math.max(0,-a)*.7;});
      player.armL.rotation.x=-Math.sin(player.walk)*.3;player.armR.rotation.x=Math.sin(player.walk)*.3;
    } else {
      player.body.position.y=Math.sin(state.elapsed*2)*.012;
      player.legs.forEach(l=>{l.thigh.rotation.x*=.82;l.shin.rotation.x*=.82;});
      player.armL.rotation.x*=.86;player.armR.rotation.x*=.86;
    }
    state.spawnIn-=dt;if(state.spawnIn<=0){spawnThief();state.spawnIn=Math.max(3,5-state.caught*.12)+Math.random();}
    for(const e of [...state.enemies]) {
      const p=e.root.position,r=Math.hypot(p.x,p.z)||1,weave=Math.sin(state.elapsed*3+e.root.id)*.2;
      const vx=p.x/r-p.z/r*weave,vz=p.z/r+p.x/r*weave,v=Math.hypot(vx,vz)||1;
      p.x+=vx/v*e.speed*dt;p.z+=vz/v*e.speed*dt;e.root.rotation.y=Math.atan2(vx,vz);
      e.walk+=dt*9;e.body.position.y=Math.abs(Math.sin(e.walk))*.04;e.body.rotation.z=Math.sin(e.walk)*.035;
      e.armL.rotation.x=Math.sin(e.walk)*.5;e.armR.rotation.x=-Math.sin(e.walk)*.5;e.bag.rotation.z=Math.sin(e.walk*1.4)*.08;
      e.escape-=dt;if(Math.hypot(p.x,p.z)>13.2||e.escape<=0)missThief(e);
    }
    const p=player.root.position;camera.position.lerp(new THREE.Vector3(p.x+10.5,13.2,p.z+15.2),1-Math.exp(-dt*3));
    camera.lookAt(p.x*.62-.4,1,p.z*.62-1.4);updateHud();drawMap();
  } else {
    const a=state.elapsed*.035;camera.position.lerp(new THREE.Vector3(11+Math.sin(a)*1.5,11,21+Math.cos(a)*1.4),1-Math.exp(-dt*1.2));
    camera.lookAt(-2,.7,0);
    if(state.mode==='menu'){player.root.position.x=-.6+Math.sin(state.elapsed*.5)*.24;player.root.position.z=1.5;player.root.rotation.y=-.3+Math.sin(state.elapsed*.4)*.12;player.body.position.y=Math.sin(state.elapsed*1.7)*.018;player.head.rotation.y=Math.sin(state.elapsed*.7)*.04;drawMap();}
  }
  renderer.render(scene,camera);
}
requestAnimationFrame(animate);
window.addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.7));renderer.setSize(innerWidth,innerHeight);});
$('loading').classList.add('done');setTimeout(()=>$('loading').remove(),650);
