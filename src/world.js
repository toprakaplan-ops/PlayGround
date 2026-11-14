import * as THREE from 'three';

export const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
export const makeMat=(color,roughness=.8,metalness=0)=>new THREE.MeshStandardMaterial({color,roughness,metalness});
export function box(parent,name,pos,size,mat){const o=new THREE.Mesh(new THREE.BoxGeometry(...size),mat);o.name=name;o.position.set(...pos);o.castShadow=true;o.receiveShadow=true;parent.add(o);return o;}
export function cyl(parent,pos,r,h,mat,segments=12){const o=new THREE.Mesh(new THREE.CylinderGeometry(r,r,h,segments),mat);o.position.set(...pos);o.castShadow=true;o.receiveShadow=true;parent.add(o);return o;}
export function sphere(parent,pos,r,mat,segments=12){const o=new THREE.Mesh(new THREE.SphereGeometry(r,segments,segments),mat);o.position.set(...pos);o.castShadow=true;parent.add(o);return o;}
const mats={
 asphalt:makeMat('#343b45'),sidewalk:makeMat('#b5b4aa'),line:makeMat('#e9d885'),concrete:makeMat('#d4cfc5'),
 navy:makeMat('#162e4b'),navy2:makeMat('#233e60'),white:makeMat('#f5f2e9'),skin:makeMat('#efc7a8'),hair:makeMat('#201c20'),
 black:makeMat('#1b1b22'),gold:makeMat('#deb86c',.35,.35),glass:makeMat('#62a5b7',.3,.15),window:makeMat('#91c7d0',.38,.1),
 red:makeMat('#e46d63'),green:makeMat('#58b48e'),blue:makeMat('#547ca7'),sand:makeMat('#d6bf8c'),water:makeMat('#438f9a',.26,.15),
 leaf:makeMat('#477c62'),trunk:makeMat('#76553b'),pavement:makeMat('#aeb6b7')};

export function createWorld(scene){
 const colliders=[];
 scene.background=new THREE.Color('#a9c5d1');scene.fog=new THREE.Fog('#a9c5d1',58,148);
 const hemi=new THREE.HemisphereLight('#d9efff','#776e61',2.05);scene.add(hemi);
 const sun=new THREE.DirectionalLight('#fff0d6',3.15);sun.position.set(-35,60,-20);sun.castShadow=true;sun.shadow.mapSize.set(2048,2048);sun.shadow.camera.left=-90;sun.shadow.camera.right=90;sun.shadow.camera.top=90;sun.shadow.camera.bottom=-90;sun.shadow.bias=-.0002;scene.add(sun);
 const ground=box(scene,'city ground',[0,-.17,0],[150,.3,150],makeMat('#97a393'));ground.receiveShadow=true;
 // Seoul-inspired paved streets, crosswalks, and small plaza
 box(scene,'main road',[0,-.005,0],[13,.08,128],mats.asphalt);box(scene,'cross road',[0,0,-13],[130,.08,11],mats.asphalt);
 for(const x of [-7.3,7.3])box(scene,'sidewalk',[x,.04,0],[2.5,.18,128],mats.sidewalk);
 for(const z of [-19, -7])box(scene,'cross sidewalk',[0,.04,z],[130,.18,1.8],mats.sidewalk);
 for(let z=-57;z<60;z+=7){box(scene,'lane dash',[0,.055,z],[.12,.025,3.3],mats.line)}
 // zebra stripes at the central crossing
 for(let x=-5.3;x<=5.4;x+=1.35)box(scene,'crosswalk stripe',[x,.062,-13],[.75,.026,4.7],mats.white);
 // side lanes through the neighborhood
 for(const x of [-42,42]){box(scene,'side street',[x,0,0],[8,.08,130],mats.asphalt);for(const z of [-6.5,6.5])box(scene,'side walk',[x+Math.sign(x)*5.3,.04,0],[2,.16,130],mats.sidewalk)}
 // far cross street
 box(scene,'north road',[0,0,42],[125,.08,9],mats.asphalt);
 // beach and water at the south edge
 box(scene,'beach sand',[0,-.005,62],[150,.12,22],mats.sand);box(scene,'sea',[0,-.1,80],[150,.25,20],mats.water);
 // waves as foamy strips
 for(let z=70;z<81;z+=3.5){const wave=box(scene,'wave',[0,.035,z],[150,.025,.13],makeMat('#d6e5d7',.35));wave.material.transparent=true;wave.material.opacity=.45}
 // blocks of shops and apartments, randomized facade color with repeatable seed
 let seed=12;const rand=()=>{seed=(seed*16807)%2147483647;return (seed-1)/2147483646};
 const facade=['#d9bfa5','#d6d5ca','#b9c9c8','#cfaaa0','#d3c7ac','#bec9d5'].map(c=>makeMat(c));
 const addBuilding=(x,z,w,d,h,kind='apt')=>{
  colliders.push({x,z,w,d});
  const color=facade[Math.floor(rand()*facade.length)];const b=box(scene,'building',[x,h/2,z],[w,h,d],color);b.castShadow=true;
  box(scene,'roof ledge',[x,h+.12,z],[w+.35,.25,d+.35],makeMat('#8a8278'));
  if(kind==='shop'){
   box(scene,'shop fascia',[x,2.65,z+d/2+.04],[w-.2,.78,.13],makeMat(['#be6d68','#658ca0','#617d6e','#dbad59'][Math.floor(rand()*4)]));
   box(scene,'shop window',[x,1.35,z+d/2+.055],[w-.55,1.55,.09],mats.glass);
   for(let xx=x-w/2+.12;xx<x+w/2;xx+=.7)box(scene,'shop frame',[xx,1.4,z+d/2+.12],[.08,1.7,.1],makeMat('#f0dcb9'));
   box(scene,'shop door',[x+w*.31,1.18,z+d/2+.13],[.65,2.1,.12],makeMat('#6a7676'));
   const sign=box(scene,'sign',[x,3.05,z+d/2+.13],[w*.83,.45,.08],makeMat('#f1debb'));sign.userData.sign=true;
  }else{
   for(let floor=1;floor<h/3;floor++)for(let col=-1;col<=1;col++){
    const xx=x+col*w*.27, yy=floor*2.7;
    box(scene,'window',[xx,yy,z+d/2+.035],[w*.18,1.3,.08],rand()>.5?mats.window:makeMat('#778995'));
    box(scene,'window sill',[xx,yy-.73,z+d/2+.09],[w*.21,.09,.13],mats.white);
   }
   for(let floor=1;floor<h/3;floor++)box(scene,'balcony rail',[x, floor*2.7-.85,z+d/2+.2],[w*.78,.08,.28],mats.black);
  }
  return b;
 };
 // blocks: stores along the avenue, homes and cafes in walkable grid
 for(const z of [-49,-34,-1,15,32])for(const x of [-27,-15,15,27])addBuilding(x,z,10,10,10+rand()*12,Math.abs(x)===15&&z<32?'shop':'apt');
 for(const z of [-48,-32,1,16,31])for(const x of [-58,-46,46,58])addBuilding(x,z,10,11,14+rand()*15,'apt');
 for(const x of [-24,-12,12,24])addBuilding(x,49,10,8,10+rand()*8,'shop');
 // Make the boutique unmistakable: gold canopy and a glowing sign
 box(scene,'boutique awning',[15,3.25,20.22],[9.2,.35,.85],makeMat('#b78656'));
 box(scene,'boutique sign',[15,3.85,20.35],[8.2,.55,.18],makeMat('#f0dcb5'));
 const signCanvas=document.createElement('canvas');signCanvas.width=768;signCanvas.height=96;
 const signCtx=signCanvas.getContext('2d');signCtx.fillStyle='#f0dcb5';signCtx.fillRect(0,0,768,96);
 signCtx.fillStyle='#273a43';signCtx.font='bold 42px sans-serif';signCtx.textAlign='center';signCtx.textBaseline='middle';signCtx.fillText('YUNA · SHOE BOUTIQUE',384,48);
 const signTexture=new THREE.CanvasTexture(signCanvas);signTexture.colorSpace=THREE.SRGBColorSpace;
 const signText=new THREE.Mesh(new THREE.PlaneGeometry(7.7,.48),new THREE.MeshBasicMaterial({map:signTexture}));
 signText.position.set(15,3.85,20.455);scene.add(signText);
 // lamp posts and warm lights
 const lampMat=makeMat('#343a40',.35,.45), glow=new THREE.MeshStandardMaterial({color:'#fff0c1',emissive:'#ffbf69',emissiveIntensity:2});
 for(const [x,z] of [[-9,-34],[9,-34],[-9,-1],[9,-1],[-9,28],[9,28],[-39,-23],[39,-23],[-39,21],[39,21],[-9,49],[9,49]]){
  cyl(scene,[x,2.6,z],.085,5.2,lampMat);const arm=box(scene,'lamp arm',[x+Math.sign(x)*.55,5.05,z],[1.2,.08,.08],lampMat);sphere(scene,[x+Math.sign(x)*1.05,4.95,z],.2,glow);
 }
 // tree-lined sidewalks with planters
 for(const [x,z] of [[-9,-47],[9,-47],[-9,-25],[9,-25],[-9,10],[9,10],[-9,35],[9,35],[-38,-10],[38,-10],[-38,35],[38,35],[-28,44],[-15,44],[15,44],[28,44]]){
  box(scene,'planter',[x,.26,z],[1.5,.5,1.5],makeMat('#8f8878'));cyl(scene,[x,.9,z],.18,1.25,mats.trunk,8);sphere(scene,[x,1.75,z],.92,mats.leaf,10);
 }
 // city details: benches, bollards, hydrant, bus stop and street sign
 for(const z of [-23,-2,22,44]){box(scene,'bench seat',[-10,.55,z],[2,.18,.55],makeMat('#866849'));for(const x of [-10.7,-9.3])box(scene,'bench leg',[x,.27,z],[.12,.55,.12],lampMat)}
 box(scene,'bus stop post',[10,.8,-26],[.16,1.6,.16],lampMat);box(scene,'bus stop sign',[10,1.7,-26],[.75,.7,.1],makeMat('#64a7b0'));
 for(const x of [-8.7,8.7])for(const z of [-16,-10])cyl(scene,[x,.42,z],.2,.8,makeMat('#ddbb72'));
 // beach palms
 for(const x of [-48,-32,-16,16,32,48]){cyl(scene,[x,2,63],.22,4,mats.trunk,8);for(let i=0;i<5;i++){const leaf=box(scene,'palm frond',[x+Math.cos(i*1.25)*1.4,4.1,63+Math.sin(i*1.25)*1.4],[2.3,.12,.35],mats.leaf);leaf.rotation.y=i*1.25;leaf.rotation.z=-.25}}
 // Boutique and station location markers
 const marker=(x,z,color)=>{const ring=new THREE.Mesh(new THREE.RingGeometry(1.0,1.2,32),new THREE.MeshBasicMaterial({color,transparent:true,opacity:.8,side:THREE.DoubleSide}));ring.rotation.x=-Math.PI/2;ring.position.set(x,.17,z);scene.add(ring);return ring};
 return {mats,addBuilding,colliders,markers:[marker(15,22,'#f5cb70'),marker(-5,-13,'#6de0bd')],update(t){this.markers.forEach((m,i)=>{m.position.y=.18+Math.sin(t*2+i)*.12;m.rotation.z=t*.35})}};
}

export function createOfficer(scene){
 const root=new THREE.Group();root.position.set(0,0,0);scene.add(root);
 const rig=new THREE.Group();root.add(rig);
 const uniform=makeMat('#1d3655'), trim=makeMat('#b7c8d6'),skin=makeMat('#efc7a8'),hair=makeMat('#211b22'),shirt=makeMat('#f7f5ef'),gold=makeMat('#e2bd73',.35,.3),black=makeMat('#171921'),lip=makeMat('#be7775');
 // proportions: adult, stylized realistic proportions, fully uniformed
 const torso=box(rig,'uniform torso',[0,1.28,0],[.67,.76,.35],uniform);torso.castShadow=true;
 box(rig,'white shirt',[0,1.43,.19],[.24,.49,.035],shirt);
 box(rig,'belt',[0,.91,0],[.69,.105,.38],black);box(rig,'badge',[-.2,1.56,.19],[.1,.15,.035],gold);
 box(rig,'radio',[.28,1.1,.2],[.12,.18,.1],black);
 const neck=cyl(rig,[0,1.78,0],.13,.22,skin);neck.castShadow=true;
 const head=sphere(rig,[0,2.02,0],.31,skin,20);head.scale.set(.86,1.1,.82);
 // hair cap and bob, with bangs framing face
 const cap=sphere(rig,[0,2.16,-.045],.31,hair,18);cap.scale.set(.92,.9,.9);
 sphere(rig,[-.27,1.99,0],.095,hair,10).scale.set(.8,1.25,.78);sphere(rig,[.27,1.99,0],.095,hair,10).scale.set(.8,1.25,.78);
 const fringe=sphere(rig,[0,2.24,.15],.22,hair,12);fringe.scale.set(1.18,.38,.55);
 // friendly face details
 for(const x of [-.105,.105]){sphere(rig,[x,2.06,.247],.027,black,8);sphere(rig,[x-.01,2.073,.268],.008,makeMat('#fffefa'),6)}
 box(rig,'nose',[0,1.99,.285],[.05,.075,.05],skin);
 const mouth=box(rig,'smile',[0,1.91,.263],[.1,.018,.018],lip);
 // cap with police mark
 const hat=box(rig,'police cap',[0,2.39,-.015],[.52,.14,.42],uniform);hat.rotation.x=-.05;box(rig,'cap brim',[0,2.32,.19],[.48,.045,.24],uniform);sphere(rig,[0,2.4,.205],.045,gold,8);
 // arms and articulated legs
 const arms=[],legs=[];
 for(const x of [-.43,.43]){const pivot=new THREE.Group();pivot.position.set(x,1.57,0);rig.add(pivot);cyl(pivot,[0,-.28,0],.12,.57,uniform);sphere(pivot,[0,-.59,.015],.115,skin,10);arms.push(pivot)}
 for(const x of [-.19,.19]){const pivot=new THREE.Group();pivot.position.set(x,.91,0);rig.add(pivot);box(pivot,'trouser leg',[0,-.33,0],[.23,.7,.28],uniform);box(pivot,'ankle',[0,-.68,.04],[.18,.12,.23],skin);const shoe=box(pivot,'black ballet flat',[0,-.75,.1],[.22,.13,.39],black);shoe.castShadow=true;legs.push(pivot)}
 // optional garment props anchored to rig
 return {root,rig,legs,arms,torso,head,updateWalk(time,speed){const amount=Math.min(1,speed/3);legs[0].rotation.x=Math.sin(time*9)*.58*amount;legs[1].rotation.x=-Math.sin(time*9)*.58*amount;arms[0].rotation.x=-Math.sin(time*9)*.34*amount;arms[1].rotation.x=Math.sin(time*9)*.34*amount;rig.position.y=speed>.1?Math.abs(Math.sin(time*9))*.035:0;},setShoes(type){legs.forEach(l=>{const shoe=l.children.find(o=>o.name==='black ballet flat');if(!shoe)return;shoe.scale.set(type==='heels'?.85:1,type==='barefoot'?.35:.8,type==='heels'?.92:1);shoe.material=type==='heels'?makeMat('#17151c',.35):type==='barefoot'?skin:makeMat('#17151c',.45)})},setTights(color){legs.forEach(l=>{let tight=l.children.find(o=>o.name==='tights');if(tight)l.remove(tight);if(color){tight=box(l,'tights',[0,-.34,-.16],[.235,.68,.035],makeMat(color,.55));tight.castShadow=false}})}};
}

export function createPerson(scene,x,z,kind,index){
 const g=new THREE.Group();g.position.set(x,0,z);scene.add(g);
 const colors=kind==='criminal'?['#7c3d3f','#484457','#675034']:['#67979a','#bd826e','#656e91','#a9895b','#73906e'];
 const top=makeMat(kind==='criminal'?colors[index%colors.length]:colors[index%colors.length]), skin=makeMat('#d9ae91'),hair=makeMat(kind==='criminal'?'#27232b':'#3e2d27'),pants=makeMat(kind==='criminal'?'#302e36':'#3d4c59'),shoemat=makeMat('#272a31');
 cyl(g,[0,1.1,0],.23,.74,top,10);const head=sphere(g,[0,1.68,0],.19,skin,12);head.scale.set(.86,1.1,.9);sphere(g,[0,1.78,-.03],.19,hair,10).scale.set(1,.65,1);
 for(const s of [-1,1]){cyl(g,[s*.12,.48,0],.075,.6,pants,8);box(g,'shoe',[s*.12,.11,.08],[.16,.13,.28],shoemat)}
 sphere(g,[0,1.15,.24],.045,makeMat('#e9d6c1'),8);
 if(kind==='criminal'){box(g,'hood',[0,1.45,-.08],[.44,.45,.26],top);const mask=box(g,'mask',[0,1.58,.16],[.26,.11,.04],makeMat('#33323a'));}
 return {group:g,kind,speed:.7+Math.random()*.55,phase:Math.random()*6.28,home:new THREE.Vector3(x,0,z),caught:false};
}
