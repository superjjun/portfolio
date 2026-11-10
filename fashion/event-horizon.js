/* EVENT HORIZON / KIM JUNSEO — STARFIELD, WARP & PROJECTS */
(function(){
'use strict';
const projects=[
{id:'soundcloud',num:'01',title:'SOUNDCLOUD',type:'WEB / UI·UX',accent:'#ffb184',ambient:'#90543e',image:'work-soundcloud.png',aspect:'wide',subtitle:'Promotional Website',video:'soundcloud',kind:'visual',summary:'듣는 경험을 넘어 새로운 아티스트를 발견하는 방법.',problem:'음악을 듣는 기능을 넘어 아직 알려지지 않은 아티스트와 사용자가 만나는 새로운 접점을 고민했습니다.',solution:'Hidden Stage와 First Listener를 중심으로 음악 발견과 참여, 보상이 연결되는 프로모션 웹을 설계했습니다.',tags:['ARTIST DISCOVERY','HIDDEN STAGE','PROMOTION']},
{id:'lostlink',num:'02',title:'LOST LINK',type:'MOBILE / INTERACTION',accent:'#8bb3ff',ambient:'#365eb2',image:'work-lostlink.png',aspect:'phone',subtitle:'Lost & Found Matching App',video:'lostlink',kind:'prototype',summary:'잃어버린 물건과 발견된 물건을 더 빠르고 쉽게 연결합니다.',problem:'수많은 게시글에서 분실물을 직접 찾아야 하는 불편함을 줄이고자 했습니다.',solution:'등록, 탐색, 매칭을 하나의 흐름으로 정리하고 물건의 특징과 위치, 시간 정보를 연결해 매칭 결과를 직관적으로 확인하도록 구성했습니다.',tags:['LOST / FOUND','MATCHING FLOW','MOBILE APP']},
{id:'junggonara',num:'03',title:'JUNGGO NARA',type:'MOBILE / UI·UX',accent:'#91d7c2',ambient:'#376b72',image:'work-junggonara.png',aspect:'phone',subtitle:'Secondhand Commerce Redesign',video:'junggonara',kind:'prototype',summary:'상품 탐색과 안전한 거래를 새롭게 설계한 중고나라 리디자인.',problem:'복잡한 상품 탐색 구조와 중고 거래의 안전성에 대한 불안감을 개선하고자 했습니다.',solution:'브랜드 중심 탐색, 안전결제, 검수, 후기 시스템을 정리해 상품을 발견하는 과정부터 결제까지 자연스럽게 연결했습니다.',tags:['BRAND DISCOVERY','SAFE PAYMENT','REVIEW']},
{id:'ppomppu',num:'04',title:'PPOMPPU',type:'RESPONSIVE / WEB',accent:'#d0afea',ambient:'#6e5b9e',image:'work-ppomppu.png',aspect:'wide',subtitle:'Community Website Redesign',video:'ppomppu',kind:'prototype',summary:'정보의 복잡함을 덜어내고 필요한 내용을 빠르게 찾도록.',problem:'커뮤니티 메뉴와 정보가 한 화면에 집중돼 콘텐츠 위계를 파악하기 어려웠습니다.',solution:'카테고리 구조와 주요 콘텐츠의 우선순위를 재설정하고 검색, 인기 정보, 게시판 탐색 경험을 직관적으로 정리했습니다.',tags:['INFORMATION ARCHITECTURE','COMMUNITY','RESPONSIVE']},
{id:'roundlab',num:'05',title:'ROUND LAB',type:'VISUAL / DETAIL PAGE',accent:'#a0cfea',ambient:'#2b677f',image:'work-roundlab-screen.png',aspect:'phone',subtitle:'Birch Juice Moisturizing Sunscreen',video:'roundlab',kind:'visual',summary:'자작나무 수분 선크림의 촉촉함과 청량감을 표현한 상세페이지.',problem:'제품의 특징을 복잡한 정보 나열보다 감각적인 이미지와 간결한 메시지로 전달하고 싶었습니다.',solution:'블루와 화이트를 중심으로 물방울과 제품 컷을 활용해 수분감, 산뜻함, 자외선 차단을 순서대로 보여줬습니다.',tags:['HYDRATION','CLEAN VISUAL','PRODUCT STORY']}
];
const q=(s,p=document)=>p.querySelector(s);
const qa=(s,p=document)=>Array.from(p.querySelectorAll(s));
const clean=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const reduce=window.matchMedia('(prefers-reduced-motion: reduce)');
const fine=window.matchMedia('(pointer:fine)');
const body=document.body,html=document.documentElement,root=q('#detail-root'),warp=q('#warp-screen');
let busy=false,openId=null,opener=null,warpOn=false,warpStart=0;
const entered=()=>body.classList.contains('entered');

function projectMarkup(p){
return '<article class="project-scene" id="work-'+p.id+'" style="--accent:'+p.accent+';--ambient:'+p.ambient+'" aria-label="'+p.title+' 프로젝트">'+
'<div class="scene-layout"><div class="scene-copy"><div class="scene-indicator">SELECTED WORK / '+p.num+' — 05</div><span class="scene-number" aria-hidden="true">'+p.num+'</span>'+
'<div class="scene-type">'+p.type+' / 2026</div><h3>'+p.title+'</h3>'+
'<button class="scene-enter" data-project="'+p.id+'" type="button">EXPLORE PROJECT <span aria-hidden="true">↗</span></button></div>'+
'<button class="scene-art" data-project="'+p.id+'" type="button" aria-label="'+p.title+' 상세와 시연 영상 보기">'+
'<span class="art-planet"></span><span class="art-orbit"></span><span class="art-orbit two"></span>'+
'<span class="scene-warp-star a"></span><span class="scene-warp-star b"></span><span class="scene-warp-star c"></span>'+
'<span class="art-image-shell '+p.aspect+'"><img src="./assets/'+p.image+'" loading="lazy" alt="'+clean(p.title)+' 실제 디자인 이미지"></span>'+
'<span class="art-view">VIEW<br>PROJECT ↗</span><span class="art-cross">✳</span></button></div>'+
'<div class="scene-footer"><span>'+p.num+' / FIVE SELECTED WORKS</span><span>'+p.subtitle.toUpperCase()+'</span><span>SCROLL TO CONTINUE ↓</span></div></article>';
}
q('#work-stream').innerHTML=projects.map(projectMarkup).join('');
const sceneNodes=qa('.project-scene');
const indicators=document.createElement('nav');indicators.className='scene-progress';indicators.setAttribute('aria-label','작품 바로가기');
indicators.innerHTML='<span class="progress-label">SELECTED WORKS</span>'+projects.map(p=>'<a href="#work-'+p.id+'" aria-label="'+clean(p.title)+' 작업으로 이동"></a>').join('');
body.append(indicators);
const sceneLinks=qa('a',indicators);

// Particle starfield and warp streaks (drawn live with canvas, not static images).
const stars=q('#universe-canvas'),st=stars.getContext('2d');
const warpCanvas=q('#warp-canvas'),wt=warpCanvas.getContext('2d');
let W=window.innerWidth,H=window.innerHeight,dpr=1,starsData=[],rays=[],px=.5,py=.5,last=0;
for(let i=0;i<240;i++)starsData.push({x:Math.random(),y:Math.random(),z:.16+Math.random()*.84,r:.4+Math.random()*1.6,phase:Math.random()*6.28,speed:.05+Math.random()*.24});
for(let i=0;i<280;i++)rays.push({angle:Math.random()*6.283,dist:Math.random(),speed:.6+Math.random()*2.7,length:8+Math.random()*45,bright:.3+Math.random()*.7});
function size(){
 W=window.innerWidth;H=window.innerHeight;dpr=Math.min(devicePixelRatio||1,1.6);
 [[stars,st],[warpCanvas,wt]].forEach(pair=>{if(!pair[1])return;pair[0].width=Math.round(W*dpr);pair[0].height=Math.round(H*dpr);pair[1].setTransform(dpr,0,0,dpr,0,0);});
}
size();window.addEventListener('resize',size,{passive:true});
function drawStars(t){
 if(!st)return;st.clearRect(0,0,W,H);
 const ox=(px-.5)*14,oy=(py-.5)*12,cx=W*.72,cy=H*.49;
 starsData.forEach(s=>{
  let x=s.x*W+ox*s.z,y=s.y*H+oy*s.z;
  if(!entered()){
   const dx=x-cx,dy=y-cy,dd=Math.hypot(dx,dy)+.1;
   const force=Math.pow(Math.max(0,1-dd/(Math.min(W,H)*.52)),2);
   const a=force*t*.00015*s.speed;
   x=cx+dx*Math.cos(a)-dy*Math.sin(a);y=cy+dx*Math.sin(a)+dy*Math.cos(a);
  }else{y=(y+scrollY*.012*s.z)%H;}
  const glow=.68+.32*Math.sin(t*.0014+s.phase);
  st.fillStyle='rgba(226,238,255,'+(glow*(.2+s.z*.8)).toFixed(3)+')';
  st.beginPath();st.arc(x,y,s.r*s.z,0,Math.PI*2);st.fill();
 });
}
function drawWarp(t){
 if(!wt)return;wt.clearRect(0,0,W,H);
 if(!warpOn)return;
 const p=Math.min(1,Math.max(0,(t-warpStart)/2700)),cx=W*.5,cy=H*.5,far=Math.max(W,H)*1.6;
 const gr=wt.createRadialGradient(cx,cy,10,cx,cy,far);gr.addColorStop(0,'#010209');gr.addColorStop(.2,'#060d29');gr.addColorStop(.6,'#152554');gr.addColorStop(1,'#040814');wt.fillStyle=gr;wt.fillRect(0,0,W,H);
 rays.forEach(ray=>{
  const r=((ray.dist+p*ray.speed)%1)*far,x=cx+Math.cos(ray.angle)*r,y=cy+Math.sin(ray.angle)*r,l=ray.length*(.2+3*p);
  wt.lineWidth=1.4*ray.bright;wt.strokeStyle='rgba(189,218,255,'+(.12+ray.bright*.72)*Math.sin(Math.PI*p)+')';
  wt.beginPath();wt.moveTo(x-Math.cos(ray.angle)*l,y-Math.sin(ray.angle)*l);wt.lineTo(x,y);wt.stroke();
 });
}
let raf=0;
function frame(t){
 if(t-last>24||reduce.matches){drawStars(t);drawWarp(t);last=t;}
 raf=requestAnimationFrame(frame);
}
raf=requestAnimationFrame(frame);
if(fine.matches){
 document.addEventListener('pointermove',e=>{px=e.clientX/Math.max(1,W);py=e.clientY/Math.max(1,H);},{passive:true});
 const cursor=q('#mouse-orbit');let x=-60,y=-60,tx=-60,ty=-60;
 document.addEventListener('pointermove',e=>{tx=e.clientX-12;ty=e.clientY-12;},{passive:true});
 document.addEventListener('pointerover',e=>cursor.classList.toggle('active',!!e.target.closest('button,a')));
 document.addEventListener('pointerout',e=>{if(!e.relatedTarget||!e.relatedTarget.closest('button,a'))cursor.classList.remove('active');});
 (function follow(){x+=(tx-x)*.22;y+=(ty-y)*.22;cursor.style.transform='translate3d('+x.toFixed(1)+'px,'+y.toFixed(1)+'px,0)';requestAnimationFrame(follow);})();
}

// Strict entry gate: wheel, swipe, keyboard and nav cannot reveal the portfolio.
html.classList.add('gate-locked');
if('scrollRestoration' in history)history.scrollRestoration='manual';
try{history.replaceState(null,'',location.pathname+location.search);}catch(e){}
scrollTo(0,0);
function completeEntry(){
 body.classList.remove('gate-locked','entering');html.classList.remove('gate-locked');body.classList.add('entered');warpOn=false;
 q('#about').scrollIntoView({behavior:'instant',block:'start'});
 try{history.replaceState(null,'',location.pathname+location.search+'#about');}catch(e){}
}
function beginEntry(){
 if(busy||entered())return;busy=true;
 if(reduce.matches){completeEntry();busy=false;return;}
 body.classList.add('entering');warp.classList.add('arming');warp.offsetWidth;
 warpOn=true;warpStart=performance.now();
 setTimeout(()=>warp.classList.add('warping'),45);
 setTimeout(()=>{completeEntry();warp.classList.add('fading');},2650);
 setTimeout(()=>{warp.classList.remove('arming','warping','fading');busy=false;},3450);
}
q('#enter-world').addEventListener('click',beginEntry);
q('#singularity').addEventListener('click',beginEntry);
document.addEventListener('click',e=>{
 if(entered())return;
 const link=e.target.closest('a[href^="#"]');
 if(link){e.preventDefault();beginEntry();}
},true);
const prevent=e=>{if(!entered()&&e.cancelable)e.preventDefault();};
window.addEventListener('wheel',prevent,{passive:false});window.addEventListener('touchmove',prevent,{passive:false});
document.addEventListener('keydown',e=>{if(!entered()&&['ArrowDown','ArrowUp','PageDown','PageUp',' ','Home','End'].includes(e.key))e.preventDefault();});

function detailMarkup(p){
 return '<div class="detail-shell" role="dialog" aria-modal="true" aria-label="'+clean(p.title)+' 작품 상세" tabindex="-1">'+
 '<div class="detail-header"><span>KIM JUNSEO / SELECTED WORKS / '+p.num+'</span><button class="detail-close" type="button" data-close="true">CLOSE <strong>×</strong></button></div>'+
 '<div class="detail-body"><div class="detail-meta"><span>PROJECT '+p.num+' / 05</span><span>'+p.type+' / 2026</span></div>'+
 '<h2>'+p.title+'</h2><p class="detail-subtitle">'+p.subtitle+'</p><p class="detail-lead">'+clean(p.summary)+'</p>'+
 '<div class="detail-video-label"><span>01 / PROJECT WALKTHROUGH</span><span>'+(p.kind==='prototype'?'RECORDED REAL WEB PROTOTYPE':'ANIMATED PROJECT VISUAL')+'</span></div>'+
 '<div class="detail-player '+p.aspect+'"><div class="video-fallback"><img src="./assets/demos/'+p.video+'.gif" alt="'+clean(p.title)+' 움직이는 작업 화면 미리보기"><a href="./assets/demos/'+p.video+'.mp4" target="_blank" rel="noopener noreferrer">WATCH ORIGINAL VIDEO ↗</a></div>'+
 '<video autoplay muted loop playsinline controls preload="metadata" poster="./assets/'+p.image+'"><source src="./assets/demos/'+p.video+'.webm" type="video/webm"><source src="./assets/demos/'+p.video+'.mp4" type="video/mp4"></video></div>'+
 '<p class="detail-note">'+(p.kind==='prototype'?'직접 구현한 GitHub 웹 프로토타입 작동 화면을 녹화한 영상입니다.':'작업물 이미지를 활용한 모션 프리뷰이며, 피그마 프로토타입 조작 영상은 아닙니다.')+'</p>'+
 '<div class="detail-notes"><div><small>02 / THE CHALLENGE</small><h3>어떤 문제에서 시작했나요?</h3><p>'+clean(p.problem)+'</p></div>'+
 '<div><small>03 / THE SOLUTION</small><h3>어떻게 해결했나요?</h3><p>'+clean(p.solution)+'</p></div></div>'+
 '<div class="detail-tags">'+p.tags.map(t=>'<span>'+clean(t)+'</span>').join('')+'</div>'+
 '<div class="detail-shot"><img src="./assets/'+p.image+'" alt="'+clean(p.title)+' 최종 디자인 결과"><small>FINAL OUTPUT / '+p.num+' — 2026</small></div>'+
 '<div class="detail-end"><button type="button" data-close="true">← BACK TO WORKS</button><span>'+p.num+' / 05 — KIM JUNSEO</span></div>'+
 '</div></div>';
}
function showDetail(id,button){
 const p=projects.find(x=>x.id===id);if(!p||openId)return;openId=id;opener=button;
 const b=button.getBoundingClientRect();
 root.style.setProperty('--origin-x',((b.left+b.width/2)/W*100).toFixed(2)+'%');root.style.setProperty('--origin-y',((b.top+b.height/2)/H*100).toFixed(2)+'%');
 root.innerHTML=detailMarkup(p);root.hidden=false;body.classList.add('detail-open');
 requestAnimationFrame(()=>root.classList.add('open'));q('.detail-shell',root).focus({preventScroll:true});
 const video=q('video',root);const reveal=()=>{if(video.readyState>=2)video.style.opacity='1';};
 video.addEventListener('loadeddata',reveal);video.addEventListener('playing',reveal);video.addEventListener('error',()=>video.hidden=true);
 video.play().catch(()=>{video.hidden=true;});setTimeout(()=>{if(openId===id&&video.readyState<2)video.hidden=true;},6000);
}
function closeDetail(){
 if(!openId)return;openId=null;const v=q('video',root);if(v)v.pause();root.classList.remove('open');body.classList.remove('detail-open');
 setTimeout(()=>{if(!openId){root.hidden=true;root.innerHTML='';}},850);
 if(opener)opener.focus({preventScroll:true});opener=null;
}
document.addEventListener('click',e=>{const p=e.target.closest('[data-project]');if(p){showDetail(p.dataset.project,p);return;}if(e.target.closest('[data-close]'))closeDetail();});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeDetail();});

if('IntersectionObserver' in window){
 const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in-view');if(e.target.classList.contains('project-scene')){const i=sceneNodes.indexOf(e.target);sceneLinks.forEach((link,n)=>link.classList.toggle('active',i===n));}}}),{threshold:.18});
 qa('.rise,.project-scene').forEach(el=>observer.observe(el));
}else qa('.rise,.project-scene').forEach(el=>el.classList.add('in-view'));
const nav=q('.site-nav'),progress=q('#reading-progress');let tick=false;
function onScroll(){
 const y=scrollY,max=html.scrollHeight-innerHeight;progress.style.width=(max>0?Math.min(100,y/max*100):0)+'%';
 nav.classList.toggle('scrolled',y>55);
 indicators.classList.toggle('visible',entered()&&y>q('#works').offsetTop+100&&y<q('#contact').offsetTop-100);
 if(!reduce.matches)sceneNodes.forEach(el=>{const b=el.getBoundingClientRect();if(b.bottom<0||b.top>innerHeight)return;const drift=(innerHeight*.5-(b.top+b.height*.5))/innerHeight;const planet=q('.art-planet',el);if(planet)planet.style.translate='0 '+(drift*25).toFixed(2)+'px';});
 tick=false;
}
window.addEventListener('scroll',()=>{if(!tick){tick=true;requestAnimationFrame(onScroll);}},{passive:true});onScroll();
if(fine.matches&&!reduce.matches)qa('.scene-art').forEach(el=>{
 el.addEventListener('pointermove',e=>{const b=el.getBoundingClientRect(),x=(e.clientX-b.left)/b.width-.5,y=(e.clientY-b.top)/b.height-.5;const image=q('.art-image-shell',el);if(image)image.style.transform='translateY(-10px) rotateX('+(-y*5).toFixed(2)+'deg) rotateY('+(x*8).toFixed(2)+'deg)';},{passive:true});
 el.addEventListener('pointerleave',()=>{const image=q('.art-image-shell',el);if(image)image.style.transform='';},{passive:true});
});
})();