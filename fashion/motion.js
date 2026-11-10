/* KIM JUNSEO / DESIGN IN MOTION */
(function(){
'use strict';
const root=document.documentElement,body=document.body;
const q=(s,p=document)=>p.querySelector(s), qa=(s,p=document)=>Array.from(p.querySelectorAll(s));
const reduce=matchMedia('(prefers-reduced-motion: reduce)');
const mobile=matchMedia('(pointer:coarse)');
const safe=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const projects=[
 {id:'soundcloud',cover:'./assets/submitted/soundcloud-poster.webp',posterAspect:'portrait',n:'01',title:'SOUNDCLOUD',kind:'WEB / PROMOTION',short:'음악 발견과 참여를 연결하는 새로운 경험.',color:'#f9a875',shade:'#f2c6ae',back:'#f7e9de',img:'./assets/submitted/soundcloud-poster.webp',fallback:'./assets/work-soundcloud.png',mode:'desktop',movie:'soundcloud',isDemo:false,sub:'SoundCloud Promotion',challenge:'음악 재생을 넘어 아티스트와 사용자가 만나는 새로운 접점이 필요했습니다.',solution:'음악을 발견하고 감상하며 참여와 보상으로 이어지는 프로모션 흐름을 기획했습니다.'},
 {id:'lostlink',cover:'./assets/submitted/lostlink-poster.webp',posterAspect:'portrait',n:'02',title:'LOST LINK',kind:'UI/UX / MOBILE APP',short:'잃어버린 물건을 다시 연결하는 디자인.',color:'#b4c6f8',shade:'#b5caff',back:'#e5eafa',img:'./assets/submitted/lostlink-poster.webp',fallback:'./assets/work-lostlink.png',mode:'mobile',movie:'lostlink',isDemo:true,sub:'Lost & Found Matching App',challenge:'수많은 게시글 속에서 물건을 직접 찾아야 하는 불편함을 줄이고자 했습니다.',solution:'물건의 특징, 장소, 시간을 연결하여 등록부터 매칭 결과 확인까지 단계별로 설계했습니다.'},
 {id:'voltup',cover:'./assets/submitted/voltup-poster.webp',posterAspect:'portrait',n:'03',title:'VOLT-UP',kind:'VISUAL / CAMPAIGN',short:'운동 전 10초, 오늘의 텐션을 켜다.',color:'#d2ef61',shade:'#d2ee84',back:'#e9f2ce',img:'./assets/submitted/voltup-poster.webp',fallback:'../assets/hd/volt-up.jpg',mode:'desktop',movie:null,isDemo:false,sub:'Energy Supplement Campaign',challenge:'에너지 부스터의 특징을 짧고 강렬한 시각 경험으로 전달하는 것이 목표였습니다.',solution:'블랙·라임 컬러와 역동적인 제품 연출로 패키지와 카드뉴스 캠페인을 제작했습니다.'},
 {id:'junggonara',cover:'./assets/submitted/junggonara-poster.webp',posterAspect:'portrait',n:'04',title:'JUNGGO NARA',kind:'UI/UX / REDESIGN',short:'상품 탐색부터 안전거래까지, 더 직관적으로.',color:'#b2e6bb',shade:'#a9d6b4',back:'#e6f1e4',img:'./assets/submitted/junggonara-poster.webp',fallback:'./assets/work-junggonara.png',mode:'mobile',movie:'junggonara',isDemo:true,sub:'Secondhand Commerce Redesign',challenge:'복잡한 탐색 구조와 중고 거래의 신뢰도를 함께 개선하고 싶었습니다.',solution:'브랜드 탐색, 검수, 후기, 안전결제를 하나의 자연스러운 사용자 흐름으로 연결했습니다.'},
 {id:'ppomppu',cover:'./assets/submitted/ppomppu-poster.webp',posterAspect:'landscape',n:'05',title:'PPOMPPU',kind:'RESPONSIVE / WEB',short:'복잡한 커뮤니티를 쉽고 빠르게.',color:'#dfc7ff',shade:'#d2c4ee',back:'#f0e9f6',img:'./assets/submitted/ppomppu-poster.webp',fallback:'./assets/work-ppomppu.png',mode:'desktop',movie:'ppomppu',isDemo:true,sub:'Community Website Redesign',challenge:'커뮤니티 정보와 게시판 구조의 우선순위가 명확하지 않았습니다.',solution:'카테고리, 검색, 인기 정보의 위계를 재설계하여 정보 탐색을 간편하게 만들었습니다.'},
 {id:'roundlab',cover:'./assets/submitted/roundlab-poster.webp',posterAspect:'portrait',n:'06',title:'ROUND LAB',kind:'VISUAL / DETAIL PAGE',short:'촉촉함을 시각적인 경험으로 전달하다.',color:'#b1dff1',shade:'#b8e5e9',back:'#e3f2f4',img:'./assets/submitted/roundlab-poster.webp',fallback:'./assets/work-roundlab-screen.png',mode:'mobile',movie:'roundlab',isDemo:false,sub:'Birch Juice Sunscreen',challenge:'수분감과 산뜻함을 설명보다 감각적인 이미지로 전달하고자 했습니다.',solution:'블루·화이트, 물방울, 제품 컷을 결합한 스크롤형 상세페이지를 제작했습니다.'}
];
// User-supplied presentation posters become the focal artwork; original aspect ratios are preserved.
function projectHTML(p){
 return '<button class="work-card work-artwork" id="card-'+p.id+'" data-open="'+p.id+'" data-active="false" data-aspect="'+p.mode+'" '+
   'style="--card:'+p.back+';--shade:'+p.shade+'" type="button" aria-label="'+p.title+' 대표 작품 보기">'+
   '<span class="artwork-surface"><img class="artwork-image" src="'+p.cover+'" data-fallback="'+p.fallback+'" alt="'+safe(p.title)+' 피그마 실제 대표 이미지" loading="lazy"></span>'+
   '<span class="work-caption"><span class="work-number">'+p.n+' / 06</span><strong class="work-name">'+p.title+'</strong><span class="work-role">'+p.kind+' · VIEW WORK ↗</span></span>'+
 '</button>';
}
q('#project-list').innerHTML=projects.map(projectHTML).join('');
bindFallback(document);
function bindFallback(area){qa('img[data-fallback]',area).forEach(img=>img.addEventListener('error',()=>{if(!img.dataset.failed){img.dataset.failed='yes';img.src=img.dataset.fallback;}},{once:true}));}

// The hero is rendered live in WebGL. Its shape refracts colour and morphs over time.
const canvas=q('#liquid-canvas'),gl=canvas.getContext('webgl',{alpha:true,premultipliedAlpha:false})||canvas.getContext('experimental-webgl');
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
function draw(t){if(glReady&&!document.hidden&&!body.classList.contains('entering')&&!entered&&t-lastWebglFrame>=40){lastWebglFrame=t;gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT);gl.useProgram(shaderProgram);gl.uniform2f(uniforms.r,canvas.width,canvas.height);gl.uniform1f(uniforms.t,(t-started)*.001);gl.uniform2f(uniforms.m,pointer[0],pointer[1]);gl.drawArrays(gl.TRIANGLES,0,6);}animationFrame=requestAnimationFrame(draw);}
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
 setTimeout(()=>{completeEntrance();overlay.classList.add('fading');},2630);
 setTimeout(()=>{overlay.classList.remove('arming','opening','fading');busy=false;},3400);
}
q('#enter').addEventListener('click',enter);object.addEventListener('click',enter);
q('#top').addEventListener('click',e=>{if(!entered&&!e.target.closest('a,button'))enter();});
const prevent=e=>{if(!entered&&e.cancelable)e.preventDefault();};
addEventListener('wheel',prevent,{passive:false});addEventListener('touchmove',prevent,{passive:false});
document.addEventListener('keydown',e=>{if(!entered&&['ArrowDown','ArrowUp','PageDown','PageUp','Home','End',' '].includes(e.key))e.preventDefault();});
document.addEventListener('click',e=>{if(!entered&&e.target.closest('a[href^="#"]')){e.preventDefault();enter();}},true);

// Scroll position rotates the fan of five no-image folders, with optional arrow navigation.
const works=q('#works'),cards=qa('.work-card'),reveals=qa('.reveal'),counter=q('#deck-count');
const prev=q('#deck-prev'),next=q('#deck-next'),progress=q('#reading-progress');
let activeIndex=0,pending=false;
if('IntersectionObserver' in window){
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting)entry.target.classList.add('visible');
 }),{threshold:.12,rootMargin:'0px 0px -7% 0px'});
 reveals.forEach(el=>observer.observe(el));
}else reveals.forEach(el=>el.classList.add('visible'));
function layoutDeck(){
 const w=innerWidth,h=innerHeight;
 cards.forEach((card,index)=>{
  const diff=index-activeIndex,abs=Math.abs(diff);
  const left=diff<0?-1:1;
  const scale=abs===0?1:abs===1?.50:abs===2?.32:.24;
  const x=abs===0?0: left*w*(abs===1?.35:abs===2?.48:.58);
  const y=abs===0?0:abs===1?left*h*.055:abs===2?-left*h*.18:h*.25;
  const rot=abs===0?-1.5:abs===1?left*13:abs===2?-left*18:left*25;
  const visible=abs<=2?1:.08;
  card.style.setProperty('--x',x.toFixed(1)+'px');
  card.style.setProperty('--y',y.toFixed(1)+'px');
  card.style.setProperty('--angle',rot.toFixed(1)+'deg');
  card.style.setProperty('--scale',String(scale));
  card.style.setProperty('--opacity',String(visible));
  card.style.zIndex=String(20-abs);
  card.dataset.active=String(abs===0);
  card.tabIndex=abs<=2?0:-1;
  card.setAttribute('aria-label',projects[index].title+' 작품 상세 보기');
 });
 counter.textContent=String(activeIndex+1).padStart(2,'0')+' / 06';
 prev.disabled=activeIndex===0;next.disabled=activeIndex===cards.length-1;
}
function scrollToCard(i){
 const n=Math.max(0,Math.min(cards.length-1,i));
 const length=Math.max(1,works.offsetHeight-innerHeight);
 scrollTo({top:works.offsetTop+length*n/(cards.length-1),behavior:reduce.matches?'auto':'smooth'});
}
function setActive(i){
 const n=Math.max(0,Math.min(cards.length-1,i));
 if(n===activeIndex)return;
 activeIndex=n;layoutDeck();
}
function onScroll(){
 const y=scrollY,max=root.scrollHeight-innerHeight;
 progress.style.width=(max>0?Math.min(100,100*y/max):0)+'%';
 const available=Math.max(1,works.offsetHeight-innerHeight);
 const fraction=Math.max(0,Math.min(1,(y-works.offsetTop)/available));
 setActive(Math.round(fraction*(cards.length-1)));
 pending=false;
}
addEventListener('scroll',()=>{if(!pending){pending=true;requestAnimationFrame(onScroll);}},{passive:true});
addEventListener('resize',()=>{layoutDeck();onScroll();},{passive:true});
prev.addEventListener('click',()=>scrollToCard(activeIndex-1));
next.addEventListener('click',()=>scrollToCard(activeIndex+1));
let startX=null,startY=null;
works.addEventListener('pointerdown',e=>{if(!e.target.closest('.work-card'))return;startX=e.clientX;startY=e.clientY;},{passive:true});
works.addEventListener('pointerup',e=>{
 if(startX===null)return;
 const dx=e.clientX-startX,dy=e.clientY-startY;
 startX=null;startY=null;
 if(Math.abs(dx)>70&&Math.abs(dx)>Math.abs(dy)*1.25)scrollToCard(activeIndex+(dx<0?1:-1));
},{passive:true});
layoutDeck();onScroll();

// Project detail is a sheet that physically expands from the clicked project artwork.
const detail=q('#detail');let active=null,origin=null,cover=null;
function detailHTML(p){
 const recording=p.movie
 ? '<div class="detail-video '+(p.mode==='mobile'?'phone':'')+'">'+
   '<div class="detail-video-fallback"><img src="./assets/demos/'+p.movie+'.gif" alt="'+p.title+' 움직이는 작업 화면"><a href="./assets/demos/'+p.movie+'.mp4" target="_blank" rel="noopener noreferrer">WATCH VIDEO ↗</a></div>'+
   '<video muted autoplay loop playsinline controls preload="metadata" aria-label="'+p.title+' 시연 영상"><source src="./assets/demos/'+p.movie+'.webm" type="video/webm"><source src="./assets/demos/'+p.movie+'.mp4" type="video/mp4"></video></div>'+
   '<p class="detail-tip">'+(p.isDemo?'실제 GitHub 웹 프로토타입을 조작하며 화면 녹화한 영상입니다.':'디자인 이미지를 활용한 무빙 프리뷰입니다. 실제 피그마 조작 영상은 아닙니다.')+'</p>'
 : '';
 return '<div class="detail-main" role="dialog" aria-modal="true" aria-label="'+safe(p.title)+' 프로젝트 상세" tabindex="-1">'+
 '<div class="detail-top"><span>KIM JUNSEO / PROJECT '+p.n+' / 06</span><button class="detail-close" data-close type="button">CLOSE <b>×</b></button></div>'+
 '<div class="detail-content"><div class="detail-headerline">'+p.kind+' / 2026</div><h2>'+p.title+'</h2><p class="detail-sub">'+safe(p.short)+'</p>'+
 '<div class="detail-original"><img src="'+p.cover+'" data-fallback="'+p.fallback+'" alt="'+p.title+' 사용자가 제공한 실제 작품 이미지 전체"><span>ORIGINAL PROJECT ARTWORK / '+p.n+' OF 06</span></div>'+
 recording+
 '<div class="detail-columns"><section><span>01 / THE CHALLENGE</span><h3>문제와 목표</h3><p>'+safe(p.challenge)+'</p></section><section><span>02 / MY APPROACH</span><h3>디자인 접근</h3><p>'+safe(p.solution)+'</p></section></div>'+
 '<button class="detail-back" type="button" data-close>← BACK TO WORKS</button></div></div>';
}
function removeCover(){if(cover){cover.remove();cover=null;}}
function open(id,button){
 if(active)return;const p=projects.find(x=>x.id===id);if(!p)return;active=p;origin=button;
 const scene=button.closest('.work-card')||button;const b=scene.getBoundingClientRect();
 detail.innerHTML=detailHTML(p);detail.hidden=false;body.classList.add('detail-open');bindFallback(detail);
 const main=q('.detail-main',detail),video=q('video',detail);
 if(video){
  video.addEventListener('loadeddata',()=>{if(video.readyState>=2)video.style.opacity='1';});
  video.addEventListener('playing',()=>{if(video.readyState>=2)video.style.opacity='1';});
  video.addEventListener('error',()=>{video.hidden=true;});
  video.play().catch(()=>{video.hidden=true;});
  setTimeout(()=>{if(active===p&&video.readyState<2)video.hidden=true;},5000);
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
document.addEventListener('click',e=>{const b=e.target.closest('[data-open]');if(b){open(b.dataset.open,b);return;}if(e.target.closest('[data-close]'))close();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&active)close();});
})();