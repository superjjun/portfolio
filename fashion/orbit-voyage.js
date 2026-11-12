/* KIM JUNSEO / ORBIT VOYAGE
   Reference-informed interaction study: real scroll-depth, orbital focus,
   hover signals, progress waypoints, focus-to-case transition.
   All artwork, prototype videos and project content remain the author's own.
   No expensive 60fps WebGL or wheel interception. */
(()=>{'use strict';
const works=document.getElementById('works');
const sections=[...document.querySelectorAll('.story-project')];
if(!works||sections.length!==6)return;
const detail=document.getElementById('detail');
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const coarse=matchMedia('(pointer:coarse)').matches;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const labels=sections.map(s=>s.querySelector('.story-title')?.getAttribute('aria-label')||s.querySelector('.story-title')?.textContent?.trim()||'PROJECT');
let active=-1, scheduled=false, visible=false, chapterObserver=null, lastChapter=-1;
const hud=document.createElement('nav');
hud.className='voyage-hud';
hud.setAttribute('aria-label','작품 탐색 위치와 빠른 이동');
hud.innerHTML='<div class="voyage-hud-header"><span>SELECTED WORKS</span><strong data-voyage-count>01 / 06</strong></div>'+
 '<div class="voyage-hud-rail"><span class="voyage-hud-line" aria-hidden="true"></span>'+
 sections.map((s,i)=>'<button type="button" class="voyage-stop" data-voyage-go="'+i+'" aria-label="'+labels[i]+' 작품으로 이동" title="'+labels[i]+'"><span class="voyage-stop-node"></span><span class="voyage-stop-label">'+labels[i]+'</span></button>').join('')+
 '</div><div class="voyage-hud-footer">SCROLL TO TRAVEL <span aria-hidden="true">↓</span></div>';
document.body.appendChild(hud);
const count=hud.querySelector('[data-voyage-count]');
const stops=[...hud.querySelectorAll('.voyage-stop')];
const line=hud.querySelector('.voyage-hud-line');
const waypointPreview=document.createElement('div');
waypointPreview.className='voyage-waypoint-preview';
waypointPreview.setAttribute('aria-hidden','true');
waypointPreview.innerHTML='<img alt="" loading="lazy" decoding="async"><div><span>PROJECT PREVIEW</span><strong></strong><small>CLICK TO EXPLORE ↗</small></div>';
hud.appendChild(waypointPreview);
const waypointImage=waypointPreview.querySelector('img'),waypointTitle=waypointPreview.querySelector('strong');
const waypointThumbs=['soundcloud','lostlink','voltup','junggonara','ppomppu','roundlab'].map(id=>'./assets/submitted/'+id+'-poster.webp');
waypointImage.addEventListener('error',()=>{
 const i=Number(waypointPreview.dataset.index||0),original=sections[i]?.querySelector('.story-picture img');
 if(original && waypointImage.dataset.failed!=='1'){waypointImage.dataset.failed='1';waypointImage.src=original.currentSrc||original.src;}
});
const showWaypoint=i=>{
 const img=sections[i]?.querySelector('.story-picture img');if(!img)return;
 waypointPreview.dataset.index=String(i);
 waypointImage.dataset.failed='0';
 waypointImage.src=waypointThumbs[i];
 waypointTitle.textContent=labels[i];
 waypointPreview.classList.add('is-visible');
};
const hideWaypoint=()=>waypointPreview.classList.remove('is-visible');
stops.forEach((button,i)=>{
 button.addEventListener('pointerenter',()=>{if(!coarse)showWaypoint(i);});
 button.addEventListener('pointerleave',hideWaypoint);
 button.addEventListener('focus',()=>showWaypoint(i));
 button.addEventListener('blur',hideWaypoint);
});

hud.addEventListener('click',e=>{
 const b=e.target.closest('[data-voyage-go]');
 if(!b)return;
 const i=Number(b.dataset.voyageGo);
 sections[i]?.scrollIntoView({behavior:reduced?'instant':'smooth',block:'start'});
});
sections.forEach((section,i)=>{
 section.style.setProperty('--voyage-planet-color',[
  '#b17a52','#718bd3','#cde754','#79c7a8','#a6b9e6','#8edbf0'
 ][i]);
 const picture=section.querySelector('.story-picture');
 if(!picture)return;
 const hint=document.createElement('span');
 hint.className='voyage-portal-hint';hint.setAttribute('aria-hidden','true');
 hint.innerHTML='<span class="voyage-portal-glyph">↗</span><strong>EXPLORE PROJECT</strong><small>CLICK TO ENTER</small>';
 picture.appendChild(hint);
 picture.addEventListener('pointerenter',()=>{if(!coarse)section.classList.add('voyage-hovered');});
 picture.addEventListener('pointerleave',()=>section.classList.remove('voyage-hovered'));
 picture.addEventListener('focus',()=>section.classList.add('voyage-hovered'));
 picture.addEventListener('blur',()=>section.classList.remove('voyage-hovered'));
 const code=document.createElement('span');code.className='voyage-planet-number';code.textContent=String(i+1).padStart(2,'0');
 picture.querySelector('.stellar-orbit-art')?.appendChild(code);
});
function update(){
 scheduled=false;
 const h=innerHeight,wh=works.getBoundingClientRect();
 visible=wh.top<h*.68&&wh.bottom>h*.32&&!document.body.classList.contains('detail-open');
 document.body.classList.toggle('voyage-active',visible);
 if(!visible)return;
 let closest=Infinity,which=0;
 sections.forEach((s,i)=>{
  const b=s.getBoundingClientRect();
  const delta=(b.top+b.height*.5)-h*.5;
  const normalized=clamp(delta/(h*.88),-1.6,1.6);
  const distance=Math.abs(delta);
  if(distance<closest){closest=distance;which=i;}
  if(b.bottom< -h*.3||b.top>h*1.3)return;
  const focus=clamp(1-Math.abs(normalized)*.22,.74,1);
  s.style.setProperty('--voyage-img-y',(clamp(normalized*-28,-36,36)).toFixed(1)+'px');
  s.style.setProperty('--voyage-img-rot',((i%2?-4:4)+normalized*2.4).toFixed(2)+'deg');
  s.style.setProperty('--voyage-img-scale',focus.toFixed(3));
  s.style.setProperty('--voyage-orb-y',(clamp(normalized*95,-155,155)).toFixed(1)+'px');
  s.style.setProperty('--voyage-orb-rot',(normalized*9).toFixed(2)+'deg');
  s.style.setProperty('--voyage-orb-scale',(1.02-Math.abs(normalized)*.17).toFixed(3));
  s.style.setProperty('--voyage-light-opacity',focus.toFixed(2));
 });
 if(which!==active){
  active=which;
  count.textContent=String(which+1).padStart(2,'0')+' / 06';
  stops.forEach((b,i)=>{const on=i===which;b.classList.toggle('is-active',on);b.setAttribute('aria-current',on?'step':'false');});
 }
 const whole=clamp((h*.5-wh.top)/Math.max(1,wh.height),0,1);
 line.style.height=(whole*100).toFixed(2)+'%';
 hud.style.setProperty('--voyage-mobile-progress',(whole*100).toFixed(2));
}
function requestUpdate(){if(scheduled)return;scheduled=true;requestAnimationFrame(update);}
addEventListener('scroll',requestUpdate,{passive:true});
addEventListener('resize',requestUpdate,{passive:true});
requestAnimationFrame(update);
document.addEventListener('visibilitychange',()=>{if(!document.hidden)requestUpdate();});
const chapterLabels=['OVERVIEW','ISSUE 01','ISSUE 02','RESULT','PROTOTYPE'];
function setupChapterNavigation(){
 if(detail.hidden||detail.querySelector('.voyage-case-steps'))return;
 const main=detail.querySelector('.detail-main');
 if(!main)return;
 const targets=[main.querySelector('.case-intro'),...main.querySelectorAll('.case-issue'),main.querySelector('.case-result'),main.querySelector('.detail-screen, .detail-no-video, .voltup-gallery')];
 if(targets.some(t=>!t))return;
 const nav=document.createElement('nav');
 nav.className='voyage-case-steps';nav.setAttribute('aria-label','프로젝트 상세 목차');
 nav.innerHTML='<div class="voyage-case-heading">CASE STUDY</div>'+
 targets.map((t,i)=>'<button type="button" data-voyage-chapter="'+i+'" aria-label="'+chapterLabels[i]+' 섹션으로 이동"><span>'+String(i+1).padStart(2,'0')+'</span><b>'+chapterLabels[i]+'</b></button>').join('')+
 '<div class="voyage-case-progress"><i data-voyage-case-progress></i></div>';
 detail.appendChild(nav);
 const buttons=[...nav.querySelectorAll('[data-voyage-chapter]')];
 const fill=nav.querySelector('[data-voyage-case-progress]');
 nav.addEventListener('click',e=>{
  const btn=e.target.closest('[data-voyage-chapter]');if(!btn)return;
  const idx=Number(btn.dataset.voyageChapter);
  const t=targets[idx],b=main.getBoundingClientRect(),r=t.getBoundingClientRect();
  main.scrollTo({top:main.scrollTop+r.top-b.top-24,behavior:reduced?'instant':'smooth'});
 });
 let pending=false;
 function updateCase(){
  pending=false;
  if(detail.hidden||!nav.isConnected)return;
  const anchor=main.getBoundingClientRect().top+main.clientHeight*.4;
  let nearest=0,shortest=Infinity;
  targets.forEach((t,i)=>{const r=t.getBoundingClientRect();const d=Math.abs((r.top+r.bottom)*.5-anchor);if(d<shortest){shortest=d;nearest=i;}});
  if(nearest!==lastChapter){lastChapter=nearest;buttons.forEach((b,i)=>{b.classList.toggle('is-active',i===nearest);b.setAttribute('aria-current',i===nearest?'step':'false');});}
  fill.style.width=String(((nearest+1)/targets.length*100).toFixed(1))+'%';
 }
 function onCaseScroll(){if(!pending){pending=true;requestAnimationFrame(updateCase);}}
 main.addEventListener('scroll',onCaseScroll,{passive:true});
 requestAnimationFrame(updateCase);
 chapterObserver={disconnect(){main.removeEventListener('scroll',onCaseScroll);}};
}
// Original project handler inserts all detail content synchronously; we enrich after it.
document.addEventListener('click',e=>{
 const opener=e.target.closest('[data-open]');
 if(opener){
  const r=opener.getBoundingClientRect();
  const wave=document.createElement('span');wave.className='voyage-warp';
  wave.style.setProperty('--warp-x',((r.left+r.width/2)/innerWidth*100).toFixed(2)+'%');
  wave.style.setProperty('--warp-y',((r.top+r.height/2)/innerHeight*100).toFixed(2)+'%');
  wave.setAttribute('aria-hidden','true');
  document.body.appendChild(wave);
  setTimeout(()=>wave.remove(),980);
  queueMicrotask(()=>{lastChapter=-1;setupChapterNavigation();requestUpdate();});
 }
 if(e.target.closest('[data-close]')){
  chapterObserver?.disconnect();chapterObserver=null;
  lastChapter=-1;requestUpdate();
 }
});
addEventListener('keydown',e=>{
 if(e.altKey||e.ctrlKey||e.metaKey||document.body.classList.contains('detail-open'))return;
 if(!visible||e.target.closest('input,textarea,select'))return;
 if(e.key==='ArrowRight'||e.key==='ArrowLeft'){
  e.preventDefault();sections[clamp(active+(e.key==='ArrowRight'?1:-1),0,sections.length-1)]?.scrollIntoView({behavior:reduced?'instant':'smooth',block:'start'});
 }
});
})();
