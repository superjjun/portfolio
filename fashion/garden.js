/* KIM JUNSEO / LITTLE GARDEN — motion & portal story */
(function(){
'use strict';
const intro=document.querySelector('.screen-intro');
const portal=document.querySelector('#garden-gateway');
const opening=document.querySelector('#garden-transition');
const about=document.querySelector('#about');
const nav=document.querySelector('.site-nav');
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
const fine=window.matchMedia('(hover:hover) and (pointer:fine)');
if(!intro||!portal||!opening||!about)return;

let seed=20261110;
function rnd(){seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;}

// Decorative leaves float independently instead of repeating a static background.
const petals=document.querySelector('#garden-petals');
if(petals){
 for(let i=0;i<24;i++){
  const el=document.createElement('i');el.className='petal';
  el.style.cssText=[
   '--x:'+Math.round(rnd()*97)+'%',
   '--y:'+Math.round(7+rnd()*87)+'%',
   '--size:'+Math.round(9+rnd()*16)+'px',
   '--rotation:'+Math.round(-100+rnd()*220)+'deg',
   '--dur:'+(4+rnd()*8).toFixed(2)+'s',
   '--delay:'+(-rnd()*8).toFixed(2)+'s',
   '--color:'+['#f8deae','#f7ebcd','#f7cbbd','#b8d59e','#fffce3'][i%5]
  ].join(';');
  petals.append(el);
 }
}

// Tiny animated fireflies create depth around the gateway.
const canvas=document.createElement('canvas');
canvas.className='garden-fireflies';canvas.setAttribute('aria-hidden','true');
intro.append(canvas);
const ctx=canvas.getContext('2d',{alpha:true});
let width=0,height=0,particles=[],playing=true,entered=false;
let mouse={x:.64,y:.46,active:false};
function fit(){
 const b=intro.getBoundingClientRect();width=Math.max(1,Math.round(b.width));height=Math.max(1,Math.round(b.height));
 if(ctx){const dpr=Math.min(window.devicePixelRatio||1,1.6);canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);canvas.style.width=width+'px';canvas.style.height=height+'px';ctx.setTransform(dpr,0,0,dpr,0,0);}
 if(!particles.length){
 for(let i=0;i<51;i++)particles.push({x:rnd(),y:rnd(),size:.6+rnd()*2.8,phase:rnd()*Math.PI*2,speed:.00008+rnd()*.00023,drift:(rnd()-.5)*.00005,bright:rnd()*.5+.4});
 }
}
fit();
window.addEventListener('resize',fit,{passive:true});
function renderFireflies(t){
 if(!ctx)return;
 ctx.clearRect(0,0,width,height);
 if(!playing)return;
 const tm=t||0;
 for(const p of particles){
  const yy=((p.y+tm*p.speed)%1+1)%1;
  let x=p.x*width+Math.sin(tm*.0006+p.phase)*14;
  let y=(1-yy)*height+Math.sin(tm*.0009+p.phase*3)*8;
  if(mouse.active && !entered){
   const dx=mouse.x*width-x,dy=mouse.y*height-y,dist=Math.hypot(dx,dy);
   if(dist<170){x-=dx*.035;y-=dy*.035;}
  }
  const flicker=.46+.54*Math.sin(tm*.002+p.phase);
  const opacity=(.19+Math.max(0,flicker)*.58)*p.bright;
  ctx.beginPath();ctx.fillStyle='rgba(255,250,213,'+opacity.toFixed(3)+')';
  ctx.arc(x,y,p.size*(.85+.16*flicker),0,Math.PI*2);ctx.fill();
  if(p.size>2.3){
   ctx.beginPath();ctx.fillStyle='rgba(249,255,223,'+(opacity*.14).toFixed(3)+')';
   ctx.arc(x,y,p.size*4.5,0,Math.PI*2);ctx.fill();
  }
 }
}
let last=0;
function loop(t){
 if(!playing)return;
 if(t-last>28 || reduced.matches){renderFireflies(t);last=t;}
 if(!reduced.matches)requestAnimationFrame(loop);
}
if(reduced.matches)renderFireflies(0);else requestAnimationFrame(loop);
const introWatch=new IntersectionObserver(entries=>{
 const visible=entries[0]&&entries[0].isIntersecting;
 if(!visible){canvas.style.opacity='0';}else{canvas.style.opacity='.8';}
},{threshold:0});
introWatch.observe(intro);
document.addEventListener('visibilitychange',()=>{
 if(document.hidden){playing=false;if(ctx)ctx.clearRect(0,0,width,height);}
 else if(!playing){playing=true;if(reduced.matches)renderFireflies(0);else requestAnimationFrame(loop);}
});

// Subtle parallax follows mouse; natural movements, no aggressive wobble.
if(fine.matches&&!reduced.matches){
 intro.addEventListener('pointermove',e=>{
  const b=intro.getBoundingClientRect();
  const nx=Math.min(1,Math.max(0,(e.clientX-b.left)/b.width));
  const ny=Math.min(1,Math.max(0,(e.clientY-b.top)/b.height));
  mouse={x:nx,y:ny,active:true};
  const px=(nx-.5)*13,py=(ny-.5)*10;
  const scene=intro.querySelector('.garden-scenery');
  if(scene){scene.style.translate=(-px*.65).toFixed(2)+'px '+(-py*.65).toFixed(2)+'px';}
  if(!entered){portal.style.translate=(-px*.45).toFixed(2)+'px '+(-py*.65).toFixed(2)+'px';}
 },{passive:true});
 intro.addEventListener('pointerleave',()=>{
  mouse.active=false;portal.style.translate='0 0';
  const scene=intro.querySelector('.garden-scenery');if(scene)scene.style.translate='0 0';
 },{passive:true});
}

// The main gesture: dive through the sprout's enchanted garden.
// Capture phase intentionally overrides the old immediate-scroll handler.
let portalBusy=false;
function enterGarden(){
 if(portalBusy)return;
 if(reduced.matches){
  document.body.classList.add('garden-entered');
  about.scrollIntoView({behavior:'auto',block:'start'});
  return;
 }
 portalBusy=true;entered=true;
 const body=document.body;
 opening.classList.remove('closing','opening');
 opening.offsetWidth; // ensure the initial circle has layout before expanding
 body.classList.add('garden-entering');
 opening.classList.add('opening');
 // Teleport to the second chapter when the portal has filled the viewport.
 window.setTimeout(()=>{
  about.scrollIntoView({behavior:'instant',block:'start'});
  history.replaceState(history.state,'',window.location.pathname+window.location.search+'#about');
  body.classList.add('garden-entered');
 },1370);
 window.setTimeout(()=>{
  opening.classList.add('closing');
  body.classList.remove('garden-entering');
 },1840);
 window.setTimeout(()=>{
  opening.classList.remove('closing','opening');
  portal.style.translate='0 0';
  portalBusy=false;
 },2850);
}
document.addEventListener('click',e=>{
 const target=e.target.closest('#enter-portfolio,#garden-gateway');
 if(!target)return;
 e.preventDefault();e.stopImmediatePropagation();enterGarden();
},true);


// Leaves spiral past the viewer during the zoom, giving a sense of depth.
const tunnelArt=opening.querySelector('.tunnel-art');
if(tunnelArt){
 const colors=['#c7e3ae','#f1dd9f','#d4f0c2','#a3cea6','#f6edc6','#9fcaad'];
 for(let i=0;i<15;i++){
  const el=document.createElement('i');el.className='tunnel-leaf';
  const ang=rnd()*Math.PI*2,dist=12+rnd()*26;
  el.style.cssText='--lx:'+(15+rnd()*72).toFixed(1)+'%;--ly:'+(10+rnd()*80).toFixed(1)+'%;--dx:'+(Math.cos(ang)*dist).toFixed(1)+'vw;--dy:'+(Math.sin(ang)*dist).toFixed(1)+'vh;--angle:'+Math.round(ang*57.3)+'deg;--delay:'+(rnd()*.35).toFixed(2)+'s;--leafcolor:'+colors[i%colors.length]+';';
  tunnelArt.append(el);
 }
}

// About flower, scroll sections and decorations.
const aboutSection=document.querySelector('.screen-about');
if(aboutSection){
 const mark=document.createElement('span');mark.className='about-sparkle';mark.setAttribute('aria-hidden','true');mark.textContent='✳';aboutSection.append(mark);
}
const works=[...document.querySelectorAll('.work-panel')];
const flowerSymbols=['✿','✻','✽','✺','✼'];
works.forEach((panel,i)=>{
 panel.style.setProperty('--story-i',i+1);
 const field=document.createElement('div');field.className='story-doodle';field.setAttribute('aria-hidden','true');
 for(let n=0;n<6;n++){
  const item=document.createElement('span');
  item.className=n%2?'mini-leaf':'mini-flower';
  item.textContent=n%2?'':flowerSymbols[(i+n)%flowerSymbols.length];
  item.style.cssText='--x:'+(3+rnd()*92).toFixed(1)+'%;--y:'+(6+rnd()*86).toFixed(1)+'%;--angle:'+Math.round(rnd()*130-65)+'deg;--time:'+(4+rnd()*5).toFixed(2)+'s;--c:'+['#f1c7a7','#d1d1ec','#d8e0ab','#b9daef','#e4c8de'][i]+';';
  field.append(item);
 }
 panel.insertBefore(field,panel.firstChild);
 const visual=panel.querySelector('.work-visual');
 if(visual){
  visual.addEventListener('pointermove',e=>{
   if(!fine.matches||reduced.matches)return;
   const b=visual.getBoundingClientRect(),x=(e.clientX-b.left)/b.width-.5,y=(e.clientY-b.top)/b.height-.5;
   visual.style.transform='perspective(1100px) rotateX('+(-y*4).toFixed(2)+'deg) rotateY('+(x*5).toFixed(2)+'deg) translateY(-6px)';
  },{passive:true});
  visual.addEventListener('pointerleave',()=>{visual.style.transform='';},{passive:true});
 }
});
const gardenCounter=document.createElement('nav');
gardenCounter.className='garden-counter';gardenCounter.setAttribute('aria-label','프로젝트 빠른 이동');
gardenCounter.innerHTML='<span class="counter-label">MY WORKS</span>'+works.map((panel,i)=>'<a href="#'+panel.id+'" title="'+(panel.querySelector('h3')?.textContent||'WORK')+'" aria-label="'+(i+1)+'번째 프로젝트"></a>').join('');
document.body.append(gardenCounter);
const dots=[...gardenCounter.querySelectorAll('a')];
const watching=new IntersectionObserver(entries=>{
 entries.forEach(entry=>{
  if(!entry.isIntersecting)return;
  const index=works.indexOf(entry.target);
  if(index>=0){
   works.forEach(p=>p.classList.toggle('is-active',p===entry.target));
   dots.forEach((d,i)=>{d.classList.toggle('current',i===index);if(i===index)d.setAttribute('aria-current','location');else d.removeAttribute('aria-current');});
  }
 });
},{threshold:.4});
works.forEach(p=>watching.observe(p));
function onScroll(){
 const y=window.scrollY;
 nav.classList.toggle('is-scrolled',y>80);
 const start=document.querySelector('#works').offsetTop-180, end=document.querySelector('#contact').offsetTop;
 gardenCounter.classList.toggle('visible',y>start&&y<end);
 if(reduced.matches)return;
 const viewport=innerHeight;
 for(const panel of works){
  const b=panel.getBoundingClientRect();
  if(b.bottom<0||b.top>viewport)continue;
  const ratio=Math.max(-1,Math.min(1,(b.top+b.height/2-viewport/2)/viewport));
  panel.style.setProperty('--float-y',(-ratio*9).toFixed(2)+'px');
  panel.style.setProperty('--float-rot',(ratio*1.25).toFixed(2)+'deg');
 }
}
let scheduled=false;
window.addEventListener('scroll',()=>{
 if(scheduled)return;
 scheduled=true;requestAnimationFrame(()=>{onScroll();scheduled=false;});
},{passive:true});
onScroll();

// A playful follower appears on interactive objects, never replacing the default pointer.
if(fine.matches&&!reduced.matches){
 const cur=document.createElement('div');
 cur.className='garden-cursor';cur.setAttribute('aria-hidden','true');cur.innerHTML='<span>✿</span>';
 document.body.append(cur);
 let targetX=-100,targetY=-100,x=-100,y=-100;
 document.addEventListener('pointermove',e=>{targetX=e.clientX;targetY=e.clientY;},{passive:true});
 document.addEventListener('pointerover',e=>{cur.classList.toggle('active',!!e.target.closest('.intro-trigger,.garden-gateway,.work-visual,.work-open,.about-next'));});
 document.addEventListener('pointerout',e=>{if(!e.relatedTarget?.closest?.('.intro-trigger,.garden-gateway,.work-visual,.work-open,.about-next'))cur.classList.remove('active');});
 (function tick(){
  x+=(targetX-x)*.2;y+=(targetY-y)*.2;
  cur.style.transform='translate3d('+(x+20).toFixed(1)+'px,'+(y+18).toFixed(1)+'px,0)';
  requestAnimationFrame(tick);
 })();
}

// If navigated directly to Works or About, content must be usable without entering portal.
if(location.hash&&location.hash!=='#top')document.body.classList.add('garden-entered');
})();
