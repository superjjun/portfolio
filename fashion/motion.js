/* KIM JUNSEO / DESIGN IN MOTION */
(function(){
'use strict';
const root=document.documentElement,body=document.body;
const q=(s,p=document)=>p.querySelector(s), qa=(s,p=document)=>Array.from(p.querySelectorAll(s));
const reduce=matchMedia('(prefers-reduced-motion: reduce)');
const mobile=matchMedia('(pointer:coarse)');
const safe=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const projects=[
 {id:'soundcloud',cover:'./assets/figma-original/soundcloud-figma.png?v=source20261110',posterAspect:'portrait',n:'01',title:'SOUNDCLOUD',kind:'WEB / PROMOTION',short:'새로운 음악을 발견하고 직접 참여하는 프로모션 경험.',color:'#f9a875',shade:'#f2c6ae',back:'#f7e9de',img:'./assets/figma-original/soundcloud-figma.png?v=source20261110',fallback:'./assets/work-soundcloud.png',mode:'desktop',movie:'soundcloud',isDemo:false,sub:'SoundCloud Promotion',challenge:'새로운 아티스트를 발견하기 어렵고, 관련 프로모션의 참여 방법도 한눈에 파악하기 어려웠습니다.',solution:'DISCOVER DROP으로 음악 탐색을 돕고, Hidden Stage와 FIRST LISTENER 배지로 프로모션 참여 정보를 명확하게 전달했습니다.'},
 {id:'lostlink',cover:'./assets/figma-original/lostlink-figma.png?v=source20261110',posterAspect:'portrait',n:'02',title:'LOST LINK',kind:'UI/UX / MOBILE APP',short:'잃어버린 물건을 다시 연결하는 디자인.',color:'#b4c6f8',shade:'#b5caff',back:'#e5eafa',img:'./assets/figma-original/lostlink-figma.png?v=source20261110',fallback:'./assets/work-lostlink.png',mode:'mobile',movie:null,isDemo:true,sub:'Lost & Found Matching App',challenge:'수많은 게시글 속에서 물건을 직접 찾아야 하는 불편함을 줄이고자 했습니다.',solution:'물건의 특징, 장소, 시간을 연결하여 등록부터 매칭 결과 확인까지 단계별로 설계했습니다.'},
 {id:'voltup',cover:'./assets/figma-original/voltup-figma.png?v=source20261110',posterAspect:'portrait',n:'03',title:'VOLT-UP',kind:'VISUAL / CAMPAIGN',short:'운동 전 10초, 텐션을 깨우는 나만의 에너지 브랜드.',color:'#d2ef61',shade:'#d2ee84',back:'#e9f2ce',img:'./assets/figma-original/voltup-figma.png?v=source20261110',fallback:'../assets/hd/volt-up.jpg',mode:'desktop',movie:null,isDemo:false,sub:'Original Energy Booster Brand',challenge:'브랜드의 에너지와 스틱형 패키지의 편리함을 표현하는 것이 목표였습니다.',solution:'블랙·형광 라임, 제품 화보, 운동 전 10초 카피로 브랜드 정체성을 구축했습니다.'},
 {id:'junggonara',cover:'./assets/figma-original/junggonara-figma-hires.png?v=20261111-real-hires1',posterAspect:'portrait',n:'04',title:'JUNGGO NARA',kind:'UI/UX / REDESIGN',short:'새로운 홈 디자인과 후기·검수·안전결제로 신뢰를 더하다.',color:'#b2e6bb',shade:'#a9d6b4',back:'#e6f1e4',img:'./assets/submitted/junggonara-poster.webp?hq=20261110b',fallback:'./assets/work-junggonara.png',mode:'mobile',movie:'junggonara',isDemo:true,sub:'Secondhand Commerce Redesign',challenge:'기존 홈 디자인이 오래된 느낌이고 후기·상품 검수·안전결제 기능이 부족해 거래를 신뢰하기 어려웠습니다.',solution:'홈 화면을 현대적으로 리디자인하고 판매자 후기, 상품 검수, 안전결제, 거래 진행현황 확인 기능을 새롭게 도입했습니다.'},
 {id:'ppomppu',cover:'./assets/figma-original/ppomppu-figma.png?v=source20261110',posterAspect:'landscape',n:'05',title:'PPOMPPU',kind:'RESPONSIVE / WEB',short:'복잡한 커뮤니티를 쉽고 빠르게.',color:'#dfc7ff',shade:'#d2c4ee',back:'#f0e9f6',img:'./assets/figma-original/ppomppu-figma.png?v=source20261110',fallback:'./assets/work-ppomppu.png',mode:'desktop',movie:'ppomppu',isDemo:true,sub:'Community Website Redesign',challenge:'커뮤니티 정보와 게시판 구조의 우선순위가 명확하지 않았습니다.',solution:'카테고리, 검색, 인기 정보의 위계를 재설계하여 정보 탐색을 간편하게 만들었습니다.'},
 {id:'roundlab',cover:'./assets/figma-original/roundlab-figma-hires.png?v=20261111-real-hires1',posterAspect:'portrait',n:'06',title:'ROUND LAB',kind:'VISUAL / DETAIL PAGE',short:'촉촉함을 시각적인 경험으로 전달하다.',color:'#b1dff1',shade:'#b8e5e9',back:'#e3f2f4',img:'./assets/submitted/roundlab-poster.webp?hq=20261110b',fallback:'./assets/work-roundlab-screen.png',mode:'mobile',movie:'roundlab',isDemo:false,sub:'Birch Juice Sunscreen',challenge:'수분감과 산뜻함을 설명보다 감각적인 이미지로 전달하고자 했습니다.',solution:'블루·화이트, 물방울, 제품 컷을 결합한 스크롤형 상세페이지를 제작했습니다.'}
];
// User-supplied presentation posters become the focal artwork; original aspect ratios are preserved.

function projectHTML(p){
 const format=p.posterAspect==='landscape'?'landscape':'portrait';
 return '<section class="story-project" id="work-'+p.id+'" data-project="'+p.id+'" data-format="'+format+'" aria-label="'+safe(p.title)+' 프로젝트">'+
   '<div class="story-shell">'+
     '<div class="story-copy">'+
       '<p class="story-eyebrow">PROJECT '+p.n+' / 06 &nbsp;·&nbsp; '+p.kind+'</p>'+
       '<h2 class="story-title">'+p.title+'</h2>'+
       '<p class="story-sub">'+safe(p.short)+'</p>'+
       '<button type="button" class="story-action" data-open="'+p.id+'" aria-label="'+safe(p.title)+' 상세와 영상 보기"><span>VIEW PROJECT</span><span class="action-arrow" aria-hidden="true"></span></button>'+
     '</div>'+
     '<button class="story-picture" type="button" data-open="'+p.id+'" aria-label="'+safe(p.title)+' 실제 대표 사진 크게 보기">'+
       '<img src="'+p.cover+'" data-fallback="'+p.fallback+'" loading="eager" decoding="async" alt="'+safe(p.title)+' 디자인 작품 전체 포스터">'+
     '</button>'+
   '</div>'+
   '<span class="nature-leaf leaf-one" aria-hidden="true"></span><span class="nature-leaf leaf-two" aria-hidden="true"></span><span class="nature-leaf leaf-three" aria-hidden="true"></span>'+
   '<span class="story-corner">KIM JUNSEO / 2026</span>'+
   '<span class="story-scroll">SCROLL TO EXPLORE ↓</span>'+
 '</section>';
}
q('#project-list').innerHTML=projects.map(projectHTML).join('');
bindFallback(document);
function bindFallback(area){
 qa('img[data-fallback]',area).forEach(img=>img.addEventListener('error',()=>{
  if(!img.dataset.failed){img.dataset.failed='yes';img.src=img.dataset.fallback;}
 },{once:true}));
}

// The hero is rendered live in WebGL. Its shape refracts colour and morphs over time.
// Hero stays lightweight: its forest form uses CSS; real WebGL runs only when 3D works are reached.
const canvas=q('#liquid-canvas'),gl=null;
let glReady=!!gl,shaderProgram,uniforms={},pointer=[.5,.5],started=performance.now();
if(glReady){
 try{
 const vertexSource='attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}';
 const fragmentSource=[
 'precision highp float; uniform vec2 r;uniform float t;uniform vec2 m;',
 'float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}',
 'float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1.,0.)),f.x),mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),f.x),f.y);}',
 'void main(){vec2 uv=(gl_FragCoord.xy-.5*r)/min(r.x,r.y);uv-=(m-.5)*.057;',
 'float a=atan(uv.y,uv.x),rad=length(uv),s=t*.32;',
 'float edge=.337+.021*sin(a*4.+s)+.018*sin(a*7.-s*.72)+.012*cos(a*11.+s*.9);',
 'float sd=rad-edge,mask=1.-smoothstep(-.006,.006,sd);',
 'float h=sqrt(max(0.,1.-pow(min(rad/edge,1.),2.)));',
 'vec3 n=normalize(vec3(uv/max(edge,.001),h*1.25));vec3 l=normalize(vec3(-.45,.75,1.));',
 'float lit=max(dot(n,l),0.),fres=pow(1.-max(n.z,0.),2.3);',
 'float sw=sin(a*3.2+t*.5+rad*14.);float no=noise(uv*8.+vec2(t*.18,-t*.21));',
 'vec3 col=mix(vec3(.45,.82,.68),vec3(.66,.72,.99),smoothstep(-.8,.7,sw+no*.6));',
 'col=mix(col,vec3(.98,.95,.74),smoothstep(.55,.98,noise(uv*11.-t*.25))*.64);',
 'col=col*(.44+lit*.53)+vec3(.19,.22,.22)*h;',
 'col+=vec3(.93,.98,.92)*pow(max(dot(reflect(-l,n),vec3(0.,0.,1.)),0.),22.)*1.25;',
 'col+=vec3(.74,.83,.98)*fres*.72;',
 'col+=vec3(.88,.96,1.)*exp(-abs(sd)*160.)*.48;',
 'float glow=exp(-max(sd,0.)*32.)*.09*(1.-mask);',
 'gl_FragColor=vec4(mix(vec3(.5,.85,.7),col,mask),clamp(mask+glow,0.,1.));}'
 ].join('');
 const makeShader=(type,text)=>{const sh=gl.createShader(type);gl.shaderSource(sh,text);gl.compileShader(sh);if(!gl.getShaderParameter(sh,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(sh));return sh;};
 shaderProgram=gl.createProgram();gl.attachShader(shaderProgram,makeShader(gl.VERTEX_SHADER,vertexSource));gl.attachShader(shaderProgram,makeShader(gl.FRAGMENT_SHADER,fragmentSource));gl.linkProgram(shaderProgram);
 if(!gl.getProgramParameter(shaderProgram,gl.LINK_STATUS))throw Error('Shader link failed');
 gl.useProgram(shaderProgram);
 const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
 const attr=gl.getAttribLocation(shaderProgram,'a');gl.enableVertexAttribArray(attr);gl.vertexAttribPointer(attr,2,gl.FLOAT,false,0,0);
 uniforms={r:gl.getUniformLocation(shaderProgram,'r'),t:gl.getUniformLocation(shaderProgram,'t'),m:gl.getUniformLocation(shaderProgram,'m')};
 }catch(error){console.warn('CSS liquid fallback:',error);glReady=false;canvas.hidden=true;}
}
function resize(){if(!glReady)return;const b=canvas.getBoundingClientRect(),d=Math.min(devicePixelRatio||1,1.1);canvas.width=Math.max(1,Math.round(b.width*d));canvas.height=Math.max(1,Math.round(b.height*d));gl.viewport(0,0,canvas.width,canvas.height);}
resize();addEventListener('resize',resize,{passive:true});
const object=q('#liquid-object');
object.addEventListener('pointermove',e=>{const b=object.getBoundingClientRect();pointer=[(e.clientX-b.left)/Math.max(b.width,1),1-(e.clientY-b.top)/Math.max(b.height,1)];},{passive:true});
object.addEventListener('pointerleave',()=>pointer=[.5,.5]);
let animationFrame,lastWebglFrame=-1000;
function draw(t){if(entered){animationFrame=0;return;}if(glReady&&!document.hidden&&!body.classList.contains('entering')&&!entered&&t-lastWebglFrame>=85){lastWebglFrame=t;gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT);gl.useProgram(shaderProgram);gl.uniform2f(uniforms.r,canvas.width,canvas.height);gl.uniform1f(uniforms.t,(t-started)*.001);gl.uniform2f(uniforms.m,pointer[0],pointer[1]);gl.drawArrays(gl.TRIANGLES,0,6);}animationFrame=requestAnimationFrame(draw);}
if(glReady){animationFrame=requestAnimationFrame(draw);if(reduce.matches){setTimeout(()=>cancelAnimationFrame(animationFrame),100);}}

// No scroll before a deliberate entrance click. The iris animation is staged, not skipped.
let entered=false,busy=false;
root.classList.add('is-locked');
if('scrollRestoration' in history)history.scrollRestoration='manual';
try{history.replaceState(null,'',location.pathname+location.search);}catch(e){}
scrollTo(0,0);
function completeEntrance(){entered=true;body.classList.remove('is-locked','entering');root.classList.remove('is-locked');q('#about').scrollIntoView({behavior:'instant',block:'start'});try{history.replaceState(null,'',location.pathname+location.search+'#about');}catch(e){}}
function enter(){
 if(entered||busy)return;busy=true;
 if(reduce.matches){completeEntrance();busy=false;return;}
 body.classList.add('entering');const overlay=q('#transition');overlay.classList.add('arming');overlay.offsetWidth;
 requestAnimationFrame(()=>overlay.classList.add('opening'));
 setTimeout(()=>{completeEntrance();overlay.classList.add('fading');},900);
 setTimeout(()=>{overlay.classList.remove('arming','opening','fading');busy=false;},1250);
}
q('#enter').addEventListener('click',enter);object.addEventListener('click',enter);
q('#top').addEventListener('click',e=>{if(!entered&&!e.target.closest('a,button'))enter();});
const prevent=e=>{if(!entered&&e.cancelable)e.preventDefault();};
addEventListener('wheel',prevent,{passive:false});addEventListener('touchmove',prevent,{passive:false});
document.addEventListener('keydown',e=>{if(!entered&&['ArrowDown','ArrowUp','PageDown','PageUp','Home','End',' '].includes(e.key))e.preventDefault();});
document.addEventListener('click',e=>{if(!entered&&e.target.closest('a[href^="#"]')){e.preventDefault();enter();}},true);

// One full chapter per work; each poster appears as the user scrolls into view.
const works=q('#works'),stories=qa('.story-project'),reveals=qa('.reveal'),progress=q('#reading-progress');
if('IntersectionObserver' in window){
 const appear=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting){
   entry.target.classList.add(entry.target.classList.contains('story-project')?'is-visible':'visible');
  }
 }),{threshold:.14,rootMargin:'0px 0px -8% 0px'});
 stories.concat(reveals).forEach(el=>appear.observe(el));
}else{
 stories.forEach(el=>el.classList.add('is-visible'));
 reveals.forEach(el=>el.classList.add('visible'));
}
let pending=false;
function onScroll(){
 const y=window.scrollY,max=root.scrollHeight-innerHeight;
 progress.style.width=(max>0?Math.min(100,100*y/max):0)+'%';
 // Real scroll-linked depth and organic motion, not an automatic slideshow.
 if(!reduce.matches)stories.forEach(section=>{
  const rect=section.getBoundingClientRect();
  if(rect.bottom<0||rect.top>innerHeight)return;
  const t=Math.max(0,Math.min(1,(innerHeight-rect.top)/(innerHeight+rect.height)));
  const near=(t-.5)*2;
  section.style.setProperty('--scene',t.toFixed(4));
  section.style.setProperty('--drift',(-near*37).toFixed(2));
  section.style.setProperty('--roll',(near*2.1).toFixed(3));
  section.style.setProperty('--zoom',(1.025-Math.abs(near)*.036).toFixed(4));
  section.style.setProperty('--leaf-drift',(near*92).toFixed(2));
  section.style.setProperty('--parallax-copy',(-near*19).toFixed(2));
 });
 pending=false;
}
addEventListener('scroll',()=>{if(!pending){pending=true;requestAnimationFrame(onScroll);}},{passive:true});
onScroll();

// Project detail is a sheet that physically expands from the clicked project artwork.
const detail=q('#detail');let active=null,origin=null,cover=null;
const vuSlides=[{"src":"./assets/voltup/cardnews-01/01.webp","fallback":"./assets/instagram/voltup-captured-1.jpg","caption":"매일 피곤한 현대인 특징"},{"src":"./assets/voltup/cardnews-01/02.webp","fallback":"./assets/instagram/voltup-captured-2.jpg","caption":"자도 자도 피곤함"},{"src":"./assets/voltup/cardnews-01/03.webp","fallback":"./assets/instagram/voltup-captured-1.jpg","caption":"아침에 일어나기가 너무 힘듦"},{"src":"./assets/voltup/cardnews-01/04.webp","fallback":"./assets/instagram/voltup-captured-2.jpg","caption":"커피 없이는 하루 시작이 안 됨"},{"src":"./assets/voltup/cardnews-01/05.webp","fallback":"./assets/instagram/voltup-captured-1.jpg","caption":"퇴근하고 아무것도 하기 싫음"},{"src":"./assets/voltup/cardnews-01/06.webp","fallback":"./assets/instagram/voltup-captured-2.jpg","caption":"에너지가 부족한 일상"},{"src":"./assets/voltup/cardnews-01/07.webp","fallback":"./assets/instagram/voltup-captured-1.jpg","caption":"근데 다 해결해주는 게 있다던데?"},{"src":"./assets/voltup/cardnews-01/08.webp","fallback":"./assets/instagram/voltup-captured-2.jpg","caption":"VOLT-UP — 운동 전 10초"},{"src":"./assets/voltup/cardnews-01/09.webp","fallback":"./assets/instagram/voltup-captured-1.jpg","caption":"VOLT-UP 에너지 부스터"},{"src":"./assets/voltup/cardnews-01/10.webp","fallback":"./assets/instagram/voltup-captured-2.jpg","caption":"VOLT-UP 특별 혜택"}];
const vuSlides2=[{"src":"./assets/voltup/cardnews-02/01.webp","fallback":"./assets/voltup/cardnews-02/01.webp","caption":"요즘 현대인들의 공감 이야기"},{"src":"./assets/voltup/cardnews-02/02.webp","fallback":"./assets/voltup/cardnews-02/02.webp","caption":"게으름에 지배된 현대인"},{"src":"./assets/voltup/cardnews-02/03.webp","fallback":"./assets/voltup/cardnews-02/03.webp","caption":"운동을 미루는 사람들의 모습"},{"src":"./assets/voltup/cardnews-02/04.webp","fallback":"./assets/voltup/cardnews-02/04.webp","caption":"운동을 시작하기 어려운 이유"},{"src":"./assets/voltup/cardnews-02/05.webp","fallback":"./assets/voltup/cardnews-02/05.webp","caption":"의지보다 먼저 필요한 시작"},{"src":"./assets/voltup/cardnews-02/06.webp","fallback":"./assets/voltup/cardnews-02/06.webp","caption":"운동 전 준비 루틴"},{"src":"./assets/voltup/cardnews-02/07.webp","fallback":"./assets/voltup/cardnews-02/07.webp","caption":"VOLT-UP으로 시작하는 변화"},{"src":"./assets/voltup/cardnews-02/08.webp","fallback":"./assets/voltup/cardnews-02/08.webp","caption":"가볍게 챙기는 운동 전 루틴"},{"src":"./assets/voltup/cardnews-02/09.webp","fallback":"./assets/voltup/cardnews-02/09.webp","caption":"운동 전 10초, VOLT-UP"}];
function detailHTML(p){
 const voltupGallery=p.id==='voltup' ?
 '<section class="voltup-gallery" data-voltup-gallery data-index="0" aria-label="VOLT-UP 카드뉴스 10장">'+
 '<div class="voltup-gallery-header"><strong>카드뉴스</strong></div>'+
 '<p class="vu-gallery-description">일상의 피로에 대한 공감부터 브랜드 소개까지 이어지는 10장의 카드뉴스입니다.</p>'+
 '<div class="voltup-gallery-stage"><button class="voltup-gallery-arrow" type="button" data-vu-step="-1" aria-label="이전 카드뉴스">‹</button>'+
 '<div class="voltup-gallery-artwork"><img data-vu-image src="./assets/voltup/cardnews-01/01.webp" data-fallback="./assets/instagram/voltup-captured-1.jpg" alt="VOLT-UP 카드뉴스 1 / 10" loading="lazy" decoding="async"></div>'+
 '<button class="voltup-gallery-arrow" type="button" data-vu-step="1" aria-label="다음 카드뉴스">›</button></div>'+
 '<div class="voltup-gallery-footer"><span class="voltup-gallery-page" data-vu-counter aria-live="polite">01 / 10</span>'+
 '<div class="voltup-gallery-dots" aria-label="카드뉴스 선택">'+
 vuSlides.map((item,i)=>'<button class="voltup-gallery-dot" data-vu-go="'+i+'" type="button" aria-current="'+(i===0?'true':'false')+'" aria-label="'+(i+1)+'번째 카드뉴스"></button>').join('')+'</div></div>'+
 '<p class="voltup-gallery-caption" data-vu-caption>'+vuSlides[0].caption+'</p>'+
 '<div class="voltup-gallery-photos">'+
 vuSlides.map((item,i)=>'<button class="voltup-gallery-thumb" data-vu-go="'+i+'" type="button" aria-current="'+(i===0?'true':'false')+'" aria-label="'+(i+1)+'번째 카드뉴스 보기"><img src="'+item.src+'" data-fallback="'+item.fallback+'" loading="lazy" alt="" onerror="if(!this.dataset.failed){this.dataset.failed=1;this.src=this.dataset.fallback;}"></button>').join('')+'</div>'+
 '</section>' : '';
 const voltupGallery2=p.id==='voltup' ?
 '<section class="voltup-gallery voltup-gallery-2" data-voltup-gallery data-series="2" data-index="0" aria-label="VOLT-UP 카드뉴스 2, 9장">'+
 '<div class="voltup-gallery-header"><strong>카드뉴스 2</strong></div>'+
 '<p class="vu-gallery-description">운동을 미루는 일상에 대한 공감부터 VOLT-UP과 함께하는 운동 전 루틴까지, 9장의 카드뉴스로 구성했습니다.</p>'+
 '<div class="voltup-gallery-stage"><button class="voltup-gallery-arrow" type="button" data-vu-step="-1" aria-label="이전 카드뉴스">‹</button>'+
 '<div class="voltup-gallery-artwork"><img data-vu-image src="./assets/voltup/cardnews-02/01.webp" alt="VOLT-UP 카드뉴스 2 · 1 / 9" loading="lazy" decoding="async"></div>'+
 '<button class="voltup-gallery-arrow" type="button" data-vu-step="1" aria-label="다음 카드뉴스">›</button></div>'+
 '<div class="voltup-gallery-footer"><span class="voltup-gallery-page" data-vu-counter aria-live="polite">01 / 09</span>'+
 '<div class="voltup-gallery-dots" aria-label="카드뉴스 2 선택">'+
 vuSlides2.map((item,i)=>'<button class="voltup-gallery-dot" data-vu-go="'+i+'" type="button" aria-current="'+(i===0?'true':'false')+'" aria-label="카드뉴스 2 - '+(i+1)+'번째"></button>').join('')+'</div></div>'+
 '<p class="voltup-gallery-caption" data-vu-caption>'+vuSlides2[0].caption+'</p>'+
 '<div class="voltup-gallery-photos">'+
 vuSlides2.map((item,i)=>'<button class="voltup-gallery-thumb" data-vu-go="'+i+'" type="button" aria-current="'+(i===0?'true':'false')+'" aria-label="카드뉴스 2 - '+(i+1)+'번째 보기"><img src="'+item.src+'" loading="lazy" alt="" decoding="async"></button>').join('')+'</div>'+
 '</section>' : '';
 const hasVideo=!!p.movie;
 const clip=hasVideo
 ? '<div class="detail-screen"><div class="detail-screen-top"><span>PROTOTYPE / MOTION</span><span>'+(p.mode==='mobile'?'MOBILE':'DESKTOP')+'</span></div>'+
   '<div class="detail-video '+(p.mode==='mobile'?'phone':'')+'">'+
   '<div class="detail-video-fallback"><img src="./assets/demos/'+p.movie+'.gif" alt="'+p.title+' 영상 미리보기"></div>'+
   '<video muted autoplay loop playsinline controls preload="metadata" aria-label="'+p.title+' 시연 영상">'+
   (p.id==='soundcloud'?'<source src="./assets/demos/soundcloud-user-recording.mp4?v=20261113-user-recording16" type="video/mp4">':'')+
   (p.id==='junggonara'?'<source src="./assets/demos/junggonara-user-recording.mp4?v=20261113-user-recording17" type="video/mp4">':'')+
   (['lostlink','ppomppu','roundlab'].includes(p.movie)?'<source src="./assets/demos/'+p.movie+'-figma.webm?v=20261111-webm-live4" type="video/webm">':'')+
   (['lostlink','ppomppu','roundlab'].includes(p.movie)?'<source src="./assets/demos/'+p.movie+'-figma.mp4?v=20261111-cropped2" type="video/mp4">':'')+
   (['lostlink','ppomppu'].includes(p.movie)?'<source src="./assets/demos/'+p.movie+'-real.mp4?v=20261111-real1" type="video/mp4">':'')+
   '</video></div></div>'+
   '<p class="detail-tip" data-demo-status>화면녹화 영상을 불러오는 중입니다.</p>'
 : '';

 // Only link to actual GitHub-hosted functional demos. Non-app visual projects use an interactive design viewer.
 const experiences={
  soundcloud:{href:'https://www.figma.com/proto/Du9eyttPUlEndS0eOmXVkk?page-id=0%3A1&amp;node-id=6-2&amp;starting-point-node-id=6%3A2&amp;scaling=scale-down&amp;content-scaling=fixed',label:'리뉴얼된 SoundCloud 체험하기',copy:'새로운 음악 탐색과 프로모션 참여 화면을 직접 경험해 보세요.',type:'SOUNDCLOUD REDESIGN'},
  lostlink:{href:'https://superjjun.github.io/portfolio/lostlink/',label:'어플 체험해보기',copy:'분실물 등록, AI 매칭, 습득자 채팅을 직접 체험해 보세요.',type:'INTERACTIVE APP'},
  voltup:{href:'./visual-preview.html?project=voltup',label:'카드뉴스 체험하기',copy:'VOLT-UP 캠페인의 실제 카드뉴스를 넘겨보세요.',type:'CAMPAIGN VIEWER'},
  junggonara:{href:'https://superjjun.github.io/portfolio/junggonara/',label:'어플 체험해보기',copy:'상품 탐색부터 검수, 안전결제, 배송까지 직접 체험해 보세요.',type:'INTERACTIVE APP'},
  ppomppu:{href:'https://superjjun.github.io/portfolio/ppomppu/',label:'웹사이트 체험해보기',copy:'카테고리, 검색, 커뮤니티 탐색 기능을 직접 이용해 보세요.',type:'LIVE WEB PROTOTYPE'},
  roundlab:{href:'./visual-preview.html?project=roundlab',label:'상세페이지 체험하기',copy:'실제 상세페이지 디자인을 스크롤하며 살펴보세요.',type:'PRODUCT DETAIL VIEWER'}
 };
 const e=experiences[p.id];
 const source='<details class="detail-poster" aria-label="'+safe(p.title)+' 디자인 전체 보기">'+
 '<summary><span class="detail-poster-copy"><small>COMPLETE ARTWORK / '+p.n+' — 06</small>'+
 '<strong>'+safe(p.title)+' 작품 전체 보기</strong><em>전체 디자인을 원본 비율로 펼쳐서 확인할 수 있습니다.</em></span>'+
 '<span class="detail-poster-toggle" aria-hidden="true">↓</span></summary>'+
 '<div class="detail-original"><img src="'+p.img+'" data-fallback="'+p.fallback+'" loading="lazy" alt="'+safe(p.title)+' 전체 디자인 화면"><span>COMPLETE DESIGN / '+p.n+' — 06</span></div></details>';
 const experienceLink='<a class="detail-experience" href="'+e.href+'" target="_blank" rel="noopener noreferrer" aria-label="'+safe(p.title)+' '+e.label+' 새 창에서 열기">'+
 '<span class="detail-experience-copy"><small>'+e.type+' / '+safe(p.title)+'</small><strong>'+e.label+'</strong><em>'+e.copy+'</em></span>'+
 '<span class="detail-experience-arrow" aria-hidden="true">↗</span></a>';
 return '<div class="detail-main" data-project-detail="'+safe(p.id)+'" role="dialog" aria-modal="true" aria-label="'+safe(p.title)+' 프로젝트 상세" tabindex="-1">'+
 '<div class="detail-top"><span>KIM JUNSEO / '+p.n+' / 06</span><button class="detail-close" data-close type="button">CLOSE <b>×</b></button></div>'+
 '<div class="detail-content"><div class="detail-headerline">'+p.kind+' / 2026</div><h2>'+p.title+'</h2><p class="detail-sub">'+safe(p.short)+'</p>'+
 clip+voltupGallery+voltupGallery2+source+experienceLink+
 '<button class="detail-back" type="button" data-close>← BACK TO WORKS</button></div></div>';
}
function removeCover(){if(cover){cover.remove();cover=null;}}
function open(id,button){
 if(active)return;const p=projects.find(x=>x.id===id);if(!p)return;active=p;origin=button;
 const scene=button.closest('.story-picture')||button;const b=scene.getBoundingClientRect();
 detail.innerHTML=detailHTML(p);detail.hidden=false;body.classList.add('detail-open');bindFallback(detail);
 const main=q('.detail-main',detail),video=q('video',detail);
 if(video){
  const note=q('[data-demo-status]',detail);
  const label=()=>{
   if(video.readyState>=2){
    video.style.opacity='1';
    const fromUserRecording=video.currentSrc.includes('soundcloud-user-recording.mp4');
    const junggoUserRecording=video.currentSrc.includes('junggonara-user-recording.mp4');
    const fromFigma=video.currentSrc.includes('-figma.');
    const fromWebsite=video.currentSrc.includes('-real.mp4');
    note.textContent=junggoUserRecording?'직접 제공한 중고나라 앱 실행 영상입니다.':
      (fromUserRecording?'직접 제공한 SoundCloud 화면 녹화 영상입니다.':
      (fromFigma?'실제 Figma 프로토타입에서 버튼을 클릭하거나 화면을 스크롤하며 녹화한 영상입니다.':
      (fromWebsite?'실제 웹 프로토타입에서 버튼을 조작하며 녹화한 영상입니다.':
      (p.isDemo?'기존 인터랙션 시연 미리보기입니다.':'이 영상은 디자인 이미지의 모션 프리뷰로, 실제 버튼 조작 영상이 아닙니다.'))));
   }
  };
  video.addEventListener('loadeddata',label);
  video.addEventListener('playing',label);
  video.addEventListener('error',()=>{note.textContent='실제 Figma 녹화본을 재생할 수 없습니다. 원본 작품 이미지를 펼쳐 확인해 주세요.';});
  video.play().catch(()=>{note.textContent='화면을 눌러 영상 재생을 시작해 주세요.';});
  setTimeout(()=>{if(active===p&&video.readyState<2)note.textContent='로딩이 길어지고 있습니다. 잠시 뒤 재생을 눌러 주세요.';},6500);
 }

 if(reduce.matches){detail.classList.add('open');main.focus({preventScroll:true});return;}
 main.style.visibility='hidden';
 cover=document.createElement('div');cover.className='detail-cover';cover.style.setProperty('--theme',p.back);
 Object.assign(cover.style,{left:b.left+'px',top:b.top+'px',width:b.width+'px',height:b.height+'px',borderRadius:'20px'});
 cover.innerHTML='<img src="'+p.cover+'" alt="'+p.title+' 대표 작품"><span class="detail-cover-num">'+p.n+' / 06</span>';body.appendChild(cover);
 const anim=cover.animate([
 {left:b.left+'px',top:b.top+'px',width:b.width+'px',height:b.height+'px',borderRadius:'20px',transform:'rotate(-3deg)'},
 {left:'0px',top:'0px',width:innerWidth+'px',height:innerHeight+'px',borderRadius:'0px',transform:'rotate(0deg)'}
 ],{duration:900,easing:'cubic-bezier(.16,1,.3,1)',fill:'forwards'});
 anim.finished.catch(()=>{}).then(()=>{if(active!==p)return;main.style.visibility='visible';detail.classList.add('open');main.focus({preventScroll:true});removeCover();});
}
function close(){
 if(!active)return;active=null;const v=q('video',detail);if(v)v.pause();detail.classList.remove('open');body.classList.remove('detail-open');removeCover();
 const old=origin;origin=null;
 if(reduce.matches){detail.hidden=true;detail.innerHTML='';old?.focus?.({preventScroll:true});return;}
 setTimeout(()=>{if(active)return;detail.hidden=true;detail.innerHTML='';old?.focus?.({preventScroll:true});},630);
}
// Both VOLT-UP card-news series use independent navigation and image indexes.
function switchVoltup(index,gallery){
 if(!gallery)return;
 const slides=gallery.dataset.series==='2'?vuSlides2:vuSlides;
 const i=((index%slides.length)+slides.length)%slides.length;
 const current=slides[i];
 gallery.dataset.index=String(i);
 const picture=q('[data-vu-image]',gallery);
 if(!picture)return;
 picture.classList.add('is-changing');
 picture.dataset.failed='';picture.dataset.fallback=current.fallback||current.src;
 if(picture.getAttribute('src')!==current.src)picture.src=current.src;
 picture.alt='VOLT-UP 카드뉴스 '+(gallery.dataset.series==='2'?'2':'1')+' '+String(i+1)+' / '+slides.length+' · '+current.caption;
 const counter=q('[data-vu-counter]',gallery);
 if(counter)counter.textContent=String(i+1).padStart(2,'0')+' / '+String(slides.length).padStart(2,'0');
 const caption=q('[data-vu-caption]',gallery);if(caption)caption.textContent=current.caption;
 qa('[data-vu-go]',gallery).forEach(btn=>btn.setAttribute('aria-current',String(Number(btn.dataset.vuGo)===i)));
 if(reduce.matches)picture.classList.remove('is-changing');
 else setTimeout(()=>picture.classList.remove('is-changing'),150);
}
let recentVoltupGallery=null,voltupTouchX=null;
document.addEventListener('click',e=>{
 const go=e.target.closest('[data-vu-go]');
 if(go){const gallery=go.closest('[data-voltup-gallery]');recentVoltupGallery=gallery;switchVoltup(Number(go.dataset.vuGo),gallery);return;}
 const move=e.target.closest('[data-vu-step]');
 if(move){const gallery=move.closest('[data-voltup-gallery]');recentVoltupGallery=gallery;switchVoltup(Number(gallery.dataset.index)+Number(move.dataset.vuStep),gallery);}
});
document.addEventListener('touchstart',e=>{
 const gallery=e.target.closest('[data-voltup-gallery]');
 if(gallery){recentVoltupGallery=gallery;voltupTouchX=e.touches[0]?.clientX??null;}
},{passive:true});
document.addEventListener('touchend',e=>{
 if(voltupTouchX===null)return;
 const gallery=e.target.closest('[data-voltup-gallery]');
 if(gallery){recentVoltupGallery=gallery;const dx=e.changedTouches[0].clientX-voltupTouchX;
  if(Math.abs(dx)>45)switchVoltup(Number(gallery.dataset.index)+(dx<0?1:-1),gallery);}
 voltupTouchX=null;
},{passive:true});
document.addEventListener('keydown',e=>{
 if(!active||active.id!=='voltup'||(e.key!=='ArrowLeft'&&e.key!=='ArrowRight'))return;
 if(['INPUT','TEXTAREA'].includes(document.activeElement?.tagName))return;
 const gallery=(recentVoltupGallery&&detail.contains(recentVoltupGallery))?recentVoltupGallery:q('[data-voltup-gallery]',detail);
 if(!gallery)return;
 e.preventDefault();switchVoltup(Number(gallery.dataset.index)+(e.key==='ArrowRight'?1:-1),gallery);
});
document.addEventListener('click',e=>{const b=e.target.closest('[data-open]');if(b){open(b.dataset.open,b);return;}if(e.target.closest('[data-close]'))close();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&active)close();});
})();