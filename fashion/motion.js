/* KIM JUNSEO / DESIGN IN MOTION */
(function(){
'use strict';
const root=document.documentElement,body=document.body;
const q=(s,p=document)=>p.querySelector(s), qa=(s,p=document)=>Array.from(p.querySelectorAll(s));
const reduce=matchMedia('(prefers-reduced-motion: reduce)');
const mobile=matchMedia('(pointer:coarse)');
const safe=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const projects=[
 {id:'soundcloud',n:'01',title:'SOUNDCLOUD',kind:'WEB / PROMOTION',short:'음악 발견과 참여를 연결하는 새로운 경험.',color:'#f9a875',shade:'#f2c6ae',back:'#f7e9de',img:'../assets/hd/soundcloud.png',fallback:'./assets/work-soundcloud.png',mode:'desktop',movie:'soundcloud',isDemo:false,sub:'SoundCloud Promotion',challenge:'음악 재생을 넘어 아티스트와 사용자가 만나는 새로운 접점이 필요했습니다.',solution:'음악을 발견하고 감상하며 참여와 보상으로 이어지는 프로모션 흐름을 기획했습니다.'},
 {id:'lostlink',n:'02',title:'LOST LINK',kind:'UI/UX / MOBILE APP',short:'잃어버린 물건을 다시 연결하는 디자인.',color:'#b4c6f8',shade:'#b5caff',back:'#e5eafa',img:'../assets/hd/lostlink.png',fallback:'./assets/work-lostlink.png',mode:'mobile',movie:'lostlink',isDemo:true,sub:'Lost & Found Matching App',challenge:'수많은 게시글 속에서 물건을 직접 찾아야 하는 불편함을 줄이고자 했습니다.',solution:'물건의 특징, 장소, 시간을 연결하여 등록부터 매칭 결과 확인까지 단계별로 설계했습니다.'},
 {id:'junggonara',n:'03',title:'JUNGGO NARA',kind:'UI/UX / REDESIGN',short:'상품 탐색부터 안전거래까지, 더 직관적으로.',color:'#b2e6bb',shade:'#a9d6b4',back:'#e6f1e4',img:'../assets/hd/junggonara.png',fallback:'./assets/work-junggonara.png',mode:'mobile',movie:'junggonara',isDemo:true,sub:'Secondhand Commerce Redesign',challenge:'복잡한 탐색 구조와 중고 거래의 신뢰도를 함께 개선하고 싶었습니다.',solution:'브랜드 탐색, 검수, 후기, 안전결제를 하나의 자연스러운 사용자 흐름으로 연결했습니다.'},
 {id:'ppomppu',n:'04',title:'PPOMPPU',kind:'RESPONSIVE / WEB',short:'복잡한 커뮤니티를 쉽고 빠르게.',color:'#dfc7ff',shade:'#d2c4ee',back:'#f0e9f6',img:'../assets/hd/ppomppu.jpg',fallback:'./assets/work-ppomppu.png',mode:'desktop',movie:'ppomppu',isDemo:true,sub:'Community Website Redesign',challenge:'커뮤니티 정보와 게시판 구조의 우선순위가 명확하지 않았습니다.',solution:'카테고리, 검색, 인기 정보의 위계를 재설계하여 정보 탐색을 간편하게 만들었습니다.'},
 {id:'roundlab',n:'05',title:'ROUND LAB',kind:'VISUAL / DETAIL PAGE',short:'촉촉함을 시각적인 경험으로 전달하다.',color:'#b1dff1',shade:'#b8e5e9',back:'#e3f2f4',img:'../assets/hd/roundlab.jpg',fallback:'./assets/work-roundlab-screen.png',mode:'mobile',movie:'roundlab',isDemo:false,sub:'Birch Juice Sunscreen',challenge:'수분감과 산뜻함을 설명보다 감각적인 이미지로 전달하고자 했습니다.',solution:'블루·화이트, 물방울, 제품 컷을 결합한 스크롤형 상세페이지를 제작했습니다.'}
];
function projectHTML(p){
 const image='<img src="'+p.img+'" data-fallback="'+p.fallback+'" alt="'+safe(p.title)+' 실제 디자인 결과물" loading="lazy">';
 const scene=p.mode==='mobile'?'<div class="mock-phone"><div class="phone-image">'+image+'</div></div>':
 '<div class="mock-browser"><div class="browser-top"><i></i><i></i><i></i><small>'+p.title+' / DESIGN</small></div><div class="browser-image">'+image+'</div></div>';
 return '<section class="project" id="work-'+p.id+'" style="--accent:'+p.color+';--shade:'+p.shade+';--back:'+p.back+'" aria-label="'+p.title+' 프로젝트">'+
 '<div class="project-layout"><div class="project-copy"><span class="project-count">PROJECT '+p.n+' / 05</span><h3 class="project-title">'+p.title+'</h3><div class="project-kind">'+p.kind+'</div>'+
 '<button class="project-button" type="button" data-open="'+p.id+'">VIEW PROJECT <span aria-hidden="true">↗</span></button></div>'+
 '<button class="project-media" type="button" data-open="'+p.id+'" aria-label="'+p.title+' 상세 및 영상 열기"><span class="media-scene">'+scene+'</span><span class="view-indicator">VIEW<br>WORK ↗</span></button></div>'+
 '<div class="project-foot"><span>SELECTED WORK / '+p.n+'</span><span>'+p.sub.toUpperCase()+'</span></div></section>';
}
q('#project-list').innerHTML=projects.map(projectHTML).join('');
function bindFallback(area){qa('img[data-fallback]',area).forEach(img=>img.addEventListener('error',()=>{if(!img.dataset.failed){img.dataset.failed='yes';img.src=img.dataset.fallback;}},{once:true}));}
bindFallback(document);

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

// Scroll-controlled scenes, with an independent 3D tilt on every project.
const panels=qa('.project'),reveals=qa('.reveal');
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('visible');}),{threshold:.1,rootMargin:'0px 0px -8% 0px'});panels.concat(reveals).forEach(el=>observer.observe(el));}else panels.concat(reveals).forEach(el=>el.classList.add('visible'));
const progress=q('#reading-progress'),header=q('.header');
let pending=false;
function onScroll(){const y=scrollY,max=root.scrollHeight-innerHeight;progress.style.width=(max>0?Math.min(100,100*y/max):0)+'%';header.classList.toggle('on-light',entered&&y>q('#about').offsetTop-150&&y<q('#contact').offsetTop-120);
 if(!reduce.matches)panels.forEach(p=>{const b=p.getBoundingClientRect();if(b.bottom<0||b.top>innerHeight)return;const fraction=(innerHeight*.5-b.top-b.height*.5)/innerHeight;const m=q('.media-scene',p);if(m)m.style.translate='0 '+(fraction*20).toFixed(1)+'px';});pending=false;}
addEventListener('scroll',()=>{if(!pending){pending=true;requestAnimationFrame(onScroll);}},{passive:true});onScroll();
if(!mobile.matches&&!reduce.matches){
 qa('.project-media').forEach(el=>{el.addEventListener('pointermove',e=>{const b=el.getBoundingClientRect(),x=(e.clientX-b.left)/b.width-.5,y=(e.clientY-b.top)/b.height-.5;const s=q('.media-scene',el);if(s)s.style.transform='rotateY('+(x*7).toFixed(1)+'deg) rotateX('+(-y*6).toFixed(1)+'deg) translateY(-8px)';},{passive:true});el.addEventListener('pointerleave',()=>{const s=q('.media-scene',el);if(s)s.style.transform='';},{passive:true});});
 const cursor=q('#cursor');let x=-100,y=-100,tx=-100,ty=-100;
 document.addEventListener('pointermove',e=>{tx=e.clientX-28;ty=e.clientY-28;},{passive:true});
 document.addEventListener('pointerover',e=>cursor.classList.toggle('active',!!e.target.closest('.liquid-object,.project-media,.project-button,.enter')),{passive:true});
 document.addEventListener('pointerout',e=>{if(!e.relatedTarget||!e.relatedTarget.closest('.liquid-object,.project-media,.project-button,.enter'))cursor.classList.remove('active');},{passive:true});
 (function follow(){x+=(tx-x)*.22;y+=(ty-y)*.22;cursor.style.transform='translate3d('+x.toFixed(1)+'px,'+y.toFixed(1)+'px,0)';requestAnimationFrame(follow);})();
}

// Project detail is a sheet that physically expands from the clicked project artwork.
const detail=q('#detail');let active=null,origin=null,cover=null;
function detailHTML(p){
 return '<div class="detail-main" role="dialog" aria-modal="true" aria-label="'+safe(p.title)+' 프로젝트 상세" tabindex="-1">'+
 '<div class="detail-top"><span>KIM JUNSEO / PROJECT '+p.n+'</span><button class="detail-close" data-close type="button">CLOSE <b>×</b></button></div>'+
 '<div class="detail-content"><div class="detail-headerline">'+p.kind+' / 2026</div><h2>'+p.title+'</h2><p class="detail-sub">'+safe(p.short)+'</p>'+
 '<div class="detail-video '+(p.mode==='mobile'?'phone':'')+'">'+
 '<div class="detail-video-fallback"><img src="./assets/demos/'+p.movie+'.gif" alt="'+p.title+' 움직이는 작업 화면"><a href="./assets/demos/'+p.movie+'.mp4" target="_blank" rel="noopener noreferrer">WATCH VIDEO ↗</a></div>'+
 '<video muted autoplay loop playsinline controls preload="metadata" aria-label="'+p.title+' 시연 영상"><source src="./assets/demos/'+p.movie+'.webm" type="video/webm"><source src="./assets/demos/'+p.movie+'.mp4" type="video/mp4"></video></div>'+
 '<p class="detail-tip">'+(p.isDemo?'실제 GitHub 웹 프로토타입을 조작하며 화면 녹화한 영상입니다.':'디자인 이미지를 활용한 무빙 프리뷰입니다. 실제 피그마 조작 영상은 아닙니다.')+'</p>'+
 '<div class="detail-columns"><section><span>01 / THE CHALLENGE</span><h3>문제와 목표</h3><p>'+safe(p.challenge)+'</p></section><section><span>02 / MY APPROACH</span><h3>디자인 접근</h3><p>'+safe(p.solution)+'</p></section></div>'+
 '<div class="detail-image"><img src="'+p.img+'" data-fallback="'+p.fallback+'" alt="'+p.title+' 최종 디자인 작업물"></div>'+
 '<button class="detail-back" type="button" data-close>← BACK TO WORKS</button></div></div>';
}
function removeCover(){if(cover){cover.remove();cover=null;}}
function open(id,button){
 if(active)return;const p=projects.find(x=>x.id===id);if(!p)return;active=p;origin=button;
 const scene=q('.media-scene',button.closest('.project'))||button;const b=scene.getBoundingClientRect();
 detail.innerHTML=detailHTML(p);detail.hidden=false;body.classList.add('detail-open');bindFallback(detail);
 const main=q('.detail-main',detail),video=q('video',detail);
 video.addEventListener('loadeddata',()=>{if(video.readyState>=2)video.style.opacity='1';});
 video.addEventListener('playing',()=>{if(video.readyState>=2)video.style.opacity='1';});
 video.addEventListener('error',()=>video.hidden=true);video.play().catch(()=>video.hidden=true);
 setTimeout(()=>{if(active===p&&video.readyState<2)video.hidden=true;},5000);
 if(reduce.matches){detail.classList.add('open');main.focus({preventScroll:true});return;}
 main.style.visibility='hidden';
 cover=document.createElement('div');cover.className='detail-cover';cover.style.setProperty('--theme',p.back);
 Object.assign(cover.style,{left:b.left+'px',top:b.top+'px',width:b.width+'px',height:b.height+'px',borderRadius:'20px'});
 const img=document.createElement('img');img.src=p.img;img.onerror=()=>img.src=p.fallback;cover.appendChild(img);body.appendChild(cover);
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