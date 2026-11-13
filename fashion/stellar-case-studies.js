/* KIM JUNSEO / FOREST CASE STUDIES 2026
   Portfolio artwork, existing Figma videos, About profile and original user files
   remain unchanged. Adds a cinematic selected-work stage and project storytelling.
*/
(() => {
'use strict';
const studies={
 soundcloud:{
  group:'PROMOTION · EXPERIENCE DESIGN',scope:'새로운 음악 발견과 사용자 참여를 높이기 위한 프로모션 UX 디자인',
  issues:[
   ['새로운 아티스트를 접할 기회가 적다','인기곡 위주의 탐색에서는 잘 알려지지 않은 아티스트와 신곡을 발견하기 어렵습니다.','DISCOVER DROP을 통해 덜 알려진 아티스트와 신곡을 쉽게 발견할 수 있도록 했습니다.','DISCOVERY'],
   ['프로모션 참여 방법이 눈에 띄지 않는다','새로운 음악을 발견해도 관련 이벤트와 혜택을 어디서 확인해야 하는지 알기 어렵습니다.','Hidden Stage 이벤트를 눈에 띄게 배치하고 FIRST LISTENER 배지로 참여 경험을 직관적으로 보여줬습니다.','PARTICIPATION']
  ],
  result:'새로운 아티스트와 음악을 발견하고, 관련 프로모션까지 쉽게 참여할 수 있도록 구성했습니다.'
 },
 lostlink:{
  group:'NEW SERVICE · APP UX',scope:'분실자와 습득자의 물건 특징을 AI로 비교하고 1:1 채팅으로 연결하는 분실물 찾기 서비스 설계',
  issues:[
   ['분실물 찾기 과정이 막막하다','분실 장소와 시간, 물건의 특징이 각각 다른 게시물에 흩어져 있으면 단서를 비교하기 어렵습니다.','종류·위치·시간·특징을 입력하는 구조화된 분실물 등록 화면을 설계했습니다.','REGISTRATION'],
   ['찾은 물건인지 판단하기 어렵다','비슷한 물건이 여러 개 발견될 때 사진만으로 내 물건인지 확신하기 어렵습니다.','특징·장소·시간을 비교해 높은 일치도의 물건을 추천하고, 습득자와 직접 채팅하도록 연결했습니다.','MATCH RESULT']
  ],
  result:'분실자와 습득자가 입력한 물건의 색상·형태·스티커·흠집 등 특징을 AI로 비교합니다. 분실 시간과 장소를 함께 고려해 유사도가 높은 후보를 추천하고, 습득자와의 1:1 채팅으로 물건이 맞는지 확인하도록 설계했습니다.'
 },
 voltup:{
  group:'ORIGINAL BRAND · CAMPAIGN',scope:'에너지 부스터 제품의 패키지와 캠페인 비주얼 디자인',
  issues:[
   ['제품의 첫인상이 약하면 기억되지 않는다','에너지 제품 특유의 강렬함과 차별점을 한 장의 이미지에 담는 것이 핵심 디자인 과제였습니다.','블랙과 형광 라임을 결합해 제품·패키지의 주목도를 높이는 방향으로 시각화했습니다.','VISUAL IMPACT'],
   ['메시지가 복잡하면 전달력이 떨어진다','짧은 SNS 콘텐츠에서는 제품 설명보다 먼저 핵심 문구가 이해되어야 합니다.','「운동 전 10초」라는 짧은 메시지를 중심으로 카드뉴스의 정보 우선순위를 정리했습니다.','MESSAGE']
  ],
  result:'패키지, 제품 연출, SNS 카드뉴스까지 하나의 시각 언어로 연결했습니다.'
 },
 junggonara:{
  group:'EXISTING SERVICE · UI/UX REDESIGN',scope:'중고거래 서비스의 탐색 구조와 거래 신뢰 경험 개선',
  issues:[
   ['원하는 상품까지 탐색 단계가 많다','기존 거래형 서비스에서 다양한 품목과 정보를 한꺼번에 노출하면 상품을 찾는 과정이 복잡해질 수 있습니다.','상품·브랜드 중심의 탐색 구조와 빠른 카테고리 진입을 설계했습니다.','PRODUCT DISCOVERY'],
   ['안전거래 정보를 판단하기 어렵다','상품 사진만 강조되면 검수, 판매자 후기, 결제 안전성 같은 신뢰 정보가 충분히 드러나지 않을 수 있습니다.','상품 상세에서 후기·검수·안전결제 정보를 함께 확인하도록 재구성했습니다.','TRUST & SAFETY']
  ],
  result:'상품 발견에서 상세 확인, 안전결제까지 연결되는 흐름을 제안했습니다.'
 },
 ppomppu:{
  group:'EXISTING SERVICE · WEB REDESIGN',scope:'정보 커뮤니티의 복잡한 홈 화면과 탐색 동선 재설계',
  issues:[
   ['정보 밀도가 높아 우선순위가 흐려진다','카테고리와 게시물, 알림, 광고성 영역이 한 화면에서 경쟁하면 사용자는 중요 정보를 빠르게 찾기 어렵습니다.','메인 홈에 빠른 카테고리와 인기 검색어, 베스트 정보를 명확한 위계로 배치했습니다.','INFORMATION HIERARCHY'],
   ['필요한 메뉴로 이동하기 어렵다','복잡한 분류와 분산된 탐색 요소는 원하는 게시판으로 이동하는 데 추가적인 탐색을 요구합니다.','간단한 상단 내비게이션과 주요 카테고리, 개인화 메뉴를 정리했습니다.','NAVIGATION']
  ],
  result:'불필요한 시각적 경쟁을 줄이고, 필요한 커뮤니티 정보에 빠르게 접근하는 화면을 만들었습니다.'
 },
 roundlab:{
  group:'PRODUCT DETAIL · VISUAL DESIGN',scope:'자작나무 수분 선크림의 특징을 전달하는 상세페이지 제작',
  issues:[
   ['제품의 촉촉함을 이미지로 표현하기 어렵다','성분과 효능을 단순한 설명만으로 전달하면 제품이 주는 산뜻한 사용감을 떠올리기 어렵습니다.','물방울과 블루·화이트 톤으로 수분감을 직관적으로 표현했습니다.','MOISTURE'],
   ['효능이 길게 나열되면 읽기 어렵다','상세페이지에서 기능 정보가 연속되면 핵심 효능을 빠르게 파악하기 어렵습니다.','강조 문구와 아이콘, 시각 요소를 사용해 주요 특징을 단계적으로 보여주었습니다.','BENEFITS']
  ],
  result:'제품 연출과 핵심 효능 설명을 연결한 스크롤형 제품 상세페이지를 제작했습니다.'
 }
};
const safe=s=>String(s).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
// Original artwork sources, not synthetic or repeated hero posters.
// Each chapter uses a different existing file from the author's own portfolio assets.
const artwork={
 soundcloud:['./assets/submitted/soundcloud-poster.webp','./assets/figma/soundcloud-figma-cover.png','./assets/work-soundcloud.png','./assets/figma-original/soundcloud-figma.png'],
 lostlink:['./assets/submitted/lostlink-poster.webp','./assets/figma/lostlink-figma-cover.png','./assets/work-lostlink.png','./assets/figma-original/lostlink-figma.png'],
 voltup:['./assets/submitted/voltup-poster.webp','./assets/instagram/voltup-captured-1.jpg','./assets/instagram/voltup-captured-2.jpg','./assets/figma-original/voltup-figma.png'],
 junggonara:['./assets/submitted/junggonara-poster.webp','./assets/figma/junggonara-figma-cover.png','./assets/work-junggonara.png','./assets/figma-original/junggonara-figma-hires.png'],
 ppomppu:['./assets/submitted/ppomppu-poster.webp','./assets/figma/ppomppu-figma-cover.png','./assets/work-ppomppu.png','./assets/figma-original/ppomppu-figma.png'],
 roundlab:['./assets/submitted/roundlab-poster.webp','./assets/figma/roundlab-figma-cover.png','./assets/work-roundlab-screen.png','./assets/figma-original/roundlab-figma-hires.png']
};
// Add distinct, light CSS-native orbital art; the author's real project poster remains visible and clickable.
document.querySelectorAll('.story-project').forEach((section,index)=>{
 const art=section.querySelector('.story-picture');
 if(!art)return;
 const decorative=document.createElement('span');
 decorative.className='stellar-orbit-art';
 decorative.setAttribute('aria-hidden','true');
 decorative.innerHTML='<span class="forest-frond forest-frond-a"></span><span class="forest-frond forest-frond-b"></span><span class="forest-frond forest-frond-c"></span>';
 art.insertBefore(decorative,art.firstChild);
 const copy=section.querySelector('.story-copy');
 if(copy){const label=document.createElement('span');label.className='stellar-work-index';label.textContent=String(index+1).padStart(2,'0')+' / 06  —  SELECTED WORKS';copy.prepend(label);}
});
function issueMarkup(issue,index,total,p){
 const [title,before,after,tag]=issue;
 const num=String(index+1).padStart(2,'0');
 const shot=artwork[p.id]?.[index+1]||p.cover;
 return '<section class="case-chapter case-issue" data-case-reveal aria-labelledby="issue-'+p.id+'-'+num+'">'+
 '<div class="case-chapter-inner">'+
 '<div class="case-side"><figure class="case-evidence"><div class="case-evidence-window">'+
 '<img src="'+safe(shot)+'" alt="'+safe(p.title)+' 실제 작업 화면 '+num+'" loading="lazy" decoding="async"></div></figure></div>'+
 '<div class="case-body"><span class="case-tag">PROBLEM '+num+' / '+safe(tag)+'</span>'+
 '<h3 id="issue-'+p.id+'-'+num+'">'+safe(title)+'</h3>'+
 '<p class="case-lead">'+safe(before)+'</p>'+
 '<div class="case-beforeafter"><div><small>BEFORE · 문제 정의</small><strong>'+safe(title)+'</strong></div>'+
 '<div><small>AFTER · 개선 방향</small><strong>'+safe(after)+'</strong></div></div>'+
 '</div></div></section>';
}
function caseMarkup(p){
 const d=studies[p.id];if(!d)return '';
 const sources=artwork[p.id]||[p.cover,p.cover,p.cover,p.cover];
 if(p.id==='lostlink'){
 const screens=[
  {number:'01',eng:'REGISTER',heading:'분실 정보 등록',description:'분실자는 색상·형태·스티커·흠집 같은 물건의 특징과 분실 장소 및 시간을 입력합니다.',src:'./assets/figma-lostlink/lostlink-location-clean.png',alt:'실제 LOST LINK 앱 분실 장소와 시간 등록 화면'},
  {number:'02',eng:'AI MATCHING',heading:'AI로 특징 비교',description:'AI가 분실자의 설명과 습득자의 등록 정보를 비교해 특징·장소·시간이 유사한 물건을 일치도 순으로 제시합니다.',src:'./assets/figma-lostlink/lostlink-match-clean.png',alt:'실제 LOST LINK 앱 93% MATCH 매칭 결과 화면'},
  {number:'03',eng:'DIRECT CHAT',heading:'습득자와 1:1 채팅',description:'높은 일치도의 물건을 발견하면 습득자와 채팅하며 스티커나 흠집 등 세부 특징을 직접 확인하도록 설계했습니다.',src:'./assets/figma-lostlink/lostlink-chat.png',alt:'피그마 원본 로스트 링크 습득자 일대일 채팅 화면'}
 ];
 return '<div class="case-story" data-project-case="lostlink">'+
 '<section class="case-intro case-chapter" data-case-reveal><div class="case-intro-copy"><span class="case-kicker">PROJECT '+p.n+'</span><h3>IDEA TO<br><em>EXPERIENCE.</em></h3><p>'+safe(d.scope)+'</p></div>'+
 '<div class="case-intro-image"><img src="'+safe(sources[0])+'" alt="LOST LINK 대표 디자인" loading="lazy" decoding="async"></div></section>'+
 d.issues.map((a,i)=>issueMarkup(a,i,d.issues.length,p)).join('')+
 '<section class="case-chapter ll-final" data-case-reveal aria-label="로스트 링크 AI 특징 비교부터 채팅까지">'+
 '<div class="ll-final-head"><div><span class="case-kicker">DESIGN SOLUTION / LOST LINK</span>'+
 '<h3>단서를 비교해,<br><em>사람을 연결하다.</em></h3></div>'+
 '<p>분실자와 습득자가 등록한 <strong>물건의 특징을 AI로 분석</strong>하고, 높은 일치도의 물건을 찾으면 <strong>습득자와 1:1 채팅</strong>으로 직접 확인할 수 있도록 설계했습니다.</p></div>'+
 '<div class="ll-final-grid">'+screens.map(step=>'<article class="ll-final-card"><div class="ll-final-label"><b>'+step.number+' / 03</b><small>'+step.eng+'</small></div>'+
 '<div class="ll-final-image"><img src="'+step.src+'" alt="'+step.alt+'" loading="lazy" decoding="async"></div>'+
 '<h4>'+step.heading+'</h4><p>'+step.description+'</p></article>').join('')+'</div>'+
 '<div class="ll-final-note"><strong>LOST LINK</strong><span>특징 등록 → AI 일치도 분석 → 습득자 채팅</span></div></section></div>';
 }
 return '<div class="case-story" data-project-case="'+p.id+'">'+
 '<section class="case-intro case-chapter" data-case-reveal>'+
  '<div class="case-intro-copy"><span class="case-kicker">PROJECT '+p.n+'</span>'+
  '<h3>IDEA TO<br><em>EXPERIENCE.</em></h3>'+
  '<p>'+safe(d.scope)+'</p></div>'+
  '<div class="case-intro-image"><img src="'+safe(sources[0])+'" alt="'+safe(p.title)+' 포트폴리오 제출 대표 이미지" loading="lazy" decoding="async"></div>'+
 '</section>'+
 d.issues.map((a,i)=>issueMarkup(a,i,d.issues.length,p)).join('')+
 '<section class="case-chapter case-result" data-case-reveal>'+
  '<div class="case-result-text"><span class="case-kicker">DESIGN RESULT</span><h3>THE<br>RESULT<span>.</span></h3>'+
  '<p>'+safe(d.result)+'</p></div>'+
  '<div class="case-result-art"><img src="'+safe(sources[3])+'" alt="'+safe(p.title)+' 실제 완성 디자인 이미지" loading="lazy" decoding="async"></div>'+
 '</section>'+
 '</div>';
}
let caseObserver=null,videoObserver=null;
function enhanceDetail(p){
 const detail=document.querySelector('#detail');
 if(!detail||detail.hidden)return;
 const content=detail.querySelector('.detail-content');
 if(!content||content.querySelector('.case-story'))return;
 const sub=content.querySelector('.detail-sub');
 if(!sub)return;
 sub.insertAdjacentHTML('afterend',caseMarkup(p));
 const main=detail.querySelector('.detail-main');
 if(caseObserver)caseObserver.disconnect();
 caseObserver=new IntersectionObserver(entries=>{
  for(const ent of entries){if(ent.isIntersecting)ent.target.classList.add('case-in');}
 },{root:main,threshold:.13,rootMargin:'0px 0px -8% 0px'});
 content.querySelectorAll('[data-case-reveal]').forEach(el=>caseObserver.observe(el));
 // Playback only when the user reaches the demonstration; avoids stutter while reading problems.
 const video=content.querySelector('video');
 if(video){
  video.pause();video.removeAttribute('autoplay');video.loop=false;video.preload='metadata';
  if(videoObserver)videoObserver.disconnect();
  videoObserver=new IntersectionObserver(entries=>{
   entries.forEach(entry=>{
    if(!detail.hidden&&entry.isIntersecting){video.play().catch(()=>{});}
    else video.pause();
   });
  },{root:main,threshold:.25});
  videoObserver.observe(video);
 }
}
document.addEventListener('click',event=>{
 const opener=event.target.closest('[data-open]');
 if(opener){
  const project=studies[opener.dataset.open];
  if(project){
   const fake={...project,id:opener.dataset.open};
   const sec=document.querySelector('.story-project[data-project="'+opener.dataset.open+'"]');
   if(sec){
    fake.cover=sec.querySelector('.story-picture img')?.getAttribute('src')||'';
    fake.n=String([...document.querySelectorAll('.story-project')].indexOf(sec)+1).padStart(2,'0');
    fake.title=sec.querySelector('.story-title')?.getAttribute('aria-label')||sec.querySelector('.story-title')?.textContent||'PROJECT';
   }
   enhanceDetail(fake);
  }
 }
 if(event.target.closest('[data-close]')){
  caseObserver?.disconnect();videoObserver?.disconnect();
 }
});
})();
