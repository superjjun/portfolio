(function(){
'use strict';
const projects=[
 {id:'soundcloud',num:'01',title:'SoundCloud',subtitle:'Promotional Website',type:'WEB / UI·UX',year:'2026',accent:'#ff753e',image:'work-soundcloud.png',aspect:'wide',videoType:'visual',summary:'듣는 경험을 넘어, 새로운 아티스트를 발견하는 방법.',problem:'기존 음악 서비스의 재생과 탐색 기능을 넘어 알려지지 않은 아티스트와 사용자가 만나는 새로운 접점이 필요했습니다.',solution:'Hidden Stage, First Listener를 중심으로 음악 발견과 참여, 보상이 연결되는 프로모션 경험을 설계했습니다.',points:['Hidden Stage','Artist Discovery','First Listener'],video:'soundcloud.mp4'},
 {id:'lostlink',num:'02',title:'Lost Link',subtitle:'Lost & Found Matching App',type:'MOBILE / INTERACTION',year:'2026',accent:'#7d9dff',image:'work-lostlink.png',aspect:'phone',videoType:'prototype',summary:'잃어버린 물건과 발견된 물건을 더 빠르고 쉽게 연결합니다.',problem:'분실물 사이트에서 수많은 게시물을 직접 확인해야 하는 불편함을 줄이고 싶었습니다.',solution:'등록, 탐색, 매칭을 하나의 흐름으로 설계하고 물건의 특징과 장소, 시간 정보를 조합해 매칭 결과를 확인하도록 했습니다.',points:['Lost / Found','Matching Flow','Notification'],video:'lostlink.mp4'},
 {id:'junggonara',num:'03',title:'Junggo Nara',subtitle:'Secondhand Commerce Redesign',type:'MOBILE / UI·UX',year:'2026',accent:'#80e0a3',image:'work-junggonara.png',aspect:'phone',videoType:'prototype',summary:'더 쉽게 찾고, 더 안심하고 거래할 수 있는 중고거래 경험.',problem:'복잡한 상품 탐색과 거래 안전성에 대한 불안감을 개선하려 했습니다.',solution:'브랜드 중심 탐색, 안전결제, 검수, 판매자 후기 시스템을 한 흐름으로 연결해 신뢰할 수 있는 거래 구조를 구성했습니다.',points:['Brand Discovery','Safe Payment','Review System'],video:'junggonara.mp4'},
 {id:'ppomppu',num:'04',title:'Ppomppu',subtitle:'Community Website Redesign',type:'RESPONSIVE / WEB',year:'2026',accent:'#f6a5cc',image:'work-ppomppu.png',aspect:'wide',videoType:'prototype',summary:'정보가 많아도 길을 잃지 않도록, 복잡한 커뮤니티를 다시 정리합니다.',problem:'여러 메뉴와 콘텐츠가 한 화면에 집중돼 필요한 정보를 빠르게 찾기 어려웠습니다.',solution:'카테고리와 주요 콘텐츠의 위계를 명확히 하고 검색, 인기 정보, 게시판을 직관적으로 탐색할 수 있는 웹을 디자인했습니다.',points:['Information Architecture','Community','Responsive Layout'],video:'ppomppu.mp4'},
 {id:'roundlab',num:'05',title:'Round Lab',subtitle:'Birch Juice Moisturizing Sunscreen',type:'VISUAL / DETAIL PAGE',year:'2026',accent:'#a4d9ff',image:'work-roundlab-screen.png',aspect:'phone',videoType:'visual',summary:'수분감과 청량함을 화면에 담은 자작나무 수분 선크림 상세페이지.',problem:'제품의 다양한 기능을 나열하기보다 핵심 사용감을 빠르게 전달하고 싶었습니다.',solution:'블루와 화이트, 물방울 모티브와 제품 컷을 사용해 수분감, 산뜻함, UV 차단이라는 세 가지 가치를 순서대로 전달했습니다.',points:['Hydration','Clean Visual','Product Story'],video:'roundlab.mp4'}
];
const $=(sel,el=document)=>el.querySelector(sel);
const img=p=>'./assets/'+p;
const escaped=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const workRoot=$('#work-list');
const root=$('#modal-root');
let active=null;
workRoot.innerHTML=projects.map((p,i)=>'<article class="work-panel" id="work-'+p.id+'" style="--accent:'+p.accent+'" aria-label="'+p.title+' 프로젝트">'+
'<div class="work-inner">'+
'<div class="work-copy"><div class="work-index"><span>SELECTED WORK / '+p.num+'</span><span>05</span></div>'+ 
'<div class="work-copy-main"><span class="work-eyebrow">'+p.type+' / '+p.year+'</span><h3>'+escaped(p.title)+'</h3><p>'+escaped(p.summary)+'</p><button class="work-open" type="button" data-project="'+p.id+'">VIEW PROJECT <span>↗</span></button></div>'+ 
'<div class="work-foot"><span>'+p.subtitle.toUpperCase()+'</span><span>'+p.num+' / 05</span></div></div>'+ 
'<button class="work-visual '+p.aspect+'" type="button" data-project="'+p.id+'" aria-label="'+p.title+' 작품 상세 보기"><span class="visual-glow"></span><span class="visual-index">'+p.num+' — PROJECT PREVIEW</span><img src="'+img(p.image)+'" loading="lazy" alt="'+escaped(p.title)+' 실제 디자인 화면"><span class="visual-cta">EXPLORE PROJECT ↗</span></button></div></article>').join('');
function modalHTML(p){
 return '<div class="modal-overlay" role="presentation" data-close="true"></div><section class="case-dialog" role="dialog" aria-modal="true" aria-label="'+escaped(p.title)+' 상세 소개" tabindex="-1" style="--accent:'+p.accent+'">'+
 '<header class="case-top"><span>KIM JUNSEO / SELECTED WORKS</span><button class="case-close" type="button" data-close="true" aria-label="작품 상세 닫기">CLOSE <strong>×</strong></button></header>'+ 
 '<div class="case-body"><div class="case-head"><div class="case-meta"><span>PROJECT '+p.num+' / 05</span><span>'+p.type+' / '+p.year+'</span></div><h2>'+escaped(p.title)+'</h2><p>'+escaped(p.subtitle)+'</p></div>'+ 
 '<div class="case-lead">'+escaped(p.summary)+'</div>'+ 
 '<div class="demo-heading"><span>01 / PROJECT WALKTHROUGH</span><span>'+(p.videoType==='prototype'?'실제 웹 구현 시연':'디자인 화면 프리뷰')+'</span></div>'+ 
 '<div class="case-player '+p.aspect+'"><video style="position:relative;z-index:2;opacity:0;" controls autoplay muted loop playsinline preload="metadata" poster="'+img(p.image)+'" aria-label="'+escaped(p.title)+' 작품 시연 영상"><source src="./assets/demos/'+p.video.replace('.mp4','.webm')+'" type="video/webm"><source src="./assets/demos/'+p.video+'" type="video/mp4"></video><div class="video-fallback" style="z-index:1"><img src="./assets/demos/'+p.video.replace('.mp4','.gif')+'" alt="'+escaped(p.title)+' 화면 녹화의 움직이는 미리보기"><p>화면 녹화 미리보기입니다. <a style="color:white;border-bottom:1px solid white" href="./assets/demos/'+p.video+'" target="_blank" rel="noopener noreferrer">원본 영상 직접 보기 ↗</a></p></div></div>'+ 
 '<div class="demo-note">'+(p.videoType==='prototype'?'실제 제작된 웹 구현 화면을 녹화한 영상입니다.':'실제 작업물 이미지를 활용한 화면 미리보기입니다. 피그마 프로토타입 녹화 영상은 아닙니다.')+'</div>'+ 
 '<div class="case-notes"><div><div class="note-label">02 / THE CHALLENGE</div><h3>어떤 문제에서 시작했나요?</h3><p>'+escaped(p.problem)+'</p></div><div><div class="note-label">03 / DESIGN SOLUTION</div><h3>어떻게 풀어냈나요?</h3><p>'+escaped(p.solution)+'</p></div></div>'+ 
 '<div class="case-points"><span>KEYWORDS</span>'+p.points.map(x=>'<span>'+escaped(x)+'</span>').join('')+'</div>'+ 
 '<div class="case-image"><img src="'+img(p.image)+'" loading="lazy" alt="'+escaped(p.title)+' 최종 디자인 결과물"><small>FINAL DESIGN / '+p.num+' — 2026</small></div>'+ 
 '<button type="button" class="case-back" data-close="true">← BACK TO WORKS</button></div></section>';
}
function openProject(id){const p=projects.find(x=>x.id===id);if(!p)return;active=id;root.innerHTML=modalHTML(p);root.hidden=false;document.body.classList.add('modal-open');const dialog=$('.case-dialog',root);dialog.focus({preventScroll:true});const video=$('video',root);const reveal=()=>{if(video.readyState>=2)video.style.opacity='1';};video.addEventListener('loadeddata',reveal);video.addEventListener('playing',reveal);video.addEventListener('error',()=>{video.hidden=true;});video.play().catch(()=>{});if(video.readyState>=2)reveal();setTimeout(()=>{if(active===id&&video.readyState<2)video.hidden=true;},5000);}
function closeProject(){if(!active)return;const id=active;active=null;const v=$('video',root);if(v)v.pause();root.hidden=true;root.innerHTML='';document.body.classList.remove('modal-open');const opener=$('[data-project="'+id+'"]');if(opener)opener.focus({preventScroll:true});}
document.addEventListener('click',e=>{const open=e.target.closest('[data-project]');if(open){openProject(open.dataset.project);return;}const close=e.target.closest('[data-close]');if(close){closeProject();return;}});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeProject();});
const enter=$('#enter-portfolio');enter.addEventListener('click',()=>{document.body.classList.add('entered');$('#about').scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});});
const reveal=[...document.querySelectorAll('.reveal,.work-panel')];if('IntersectionObserver' in window){const io=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');io.unobserve(entry.target);}})},{threshold:.12});reveal.forEach(el=>io.observe(el));}else reveal.forEach(el=>el.classList.add('visible'));
const line=$('#reading-progress');function update(){const doc=document.documentElement;line.style.width=(100*doc.scrollTop/Math.max(1,doc.scrollHeight-doc.clientHeight))+'%';}window.addEventListener('scroll',update,{passive:true});update();
})();
