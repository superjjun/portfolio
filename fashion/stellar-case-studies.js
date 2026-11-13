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
  group:'ORIGINAL BRAND · CAMPAIGN',
  scope:'운동 전 10초, 텐션을 깨우는 에너지 부스터 브랜드 VOLT-UP을 직접 기획하고 제품 패키지·비주얼·카드뉴스까지 디자인했습니다.',
  issues:[],
  result:'블랙과 형광 라임의 강한 대비, 스틱형 패키지의 휴대성, 운동 전 10초라는 메시지를 제품 연출부터 SNS 캠페인까지 일관되게 표현했습니다.'
 },
 junggonara:{
  group:'EXISTING SERVICE · UI/UX REDESIGN',scope:'오래된 홈 디자인을 개선하고 후기·검수·안전결제 기능을 도입한 중고거래 UI/UX 리디자인',
  issues:[
   ['오래된 홈 디자인으로 첫인상이 아쉽다','기존 홈 화면은 오래된 시각 스타일과 복잡한 정보 배치로 서비스의 완성도와 사용성이 아쉬웠습니다.','레이아웃·폰트·이미지·상품 카드를 새롭게 정리해 현대적이고 깔끔한 홈 화면으로 리디자인했습니다.','HOME REDESIGN'],
   ['안전한 거래를 위한 기능이 부족하다','기존 거래 화면에는 판매자 후기와 상품 검수, 안전결제 기능이 부족해 구매자가 거래를 신뢰할 만한 근거가 적었습니다.','판매자 후기 시스템과 상품 검수, 안전결제 및 거래 진행현황 확인 기능을 도입해 거래의 신뢰도를 높였습니다.','TRUST & SAFETY']
  ],
  result:'홈 화면을 현대적으로 개선하고, 후기·검수·안전결제·거래 진행현황까지 연결해 사용성과 거래 신뢰도를 함께 강화했습니다.'
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
 if(p.id==='voltup'){
 const visuals=[
  ['01','브랜드의 첫인상','강렬한 블랙과 형광 라임, 굵은 로고로 에너지 부스터의 정체성을 보여줍니다.'],
  ['02','입체적인 패키지 디자인','패키지와 스틱 제품을 함께 연출해 제품의 존재감을 강조했습니다.'],
  ['03','운동 전 10초 루틴','제품을 마시는 간단한 순간을 한 장의 키 비주얼로 표현했습니다.'],
  ['04','가볍게 가지고 다니는 에너지','스틱형 포장의 휴대성과 간편한 사용 장면을 시각화했습니다.'],
  ['05','청량한 레몬라임 콘셉트','밝고 깨끗한 제품 화보로 상쾌한 브랜드 이미지를 완성했습니다.']
 ];
 const fallbacks=['./assets/submitted/voltup-poster.webp','./assets/figma-original/voltup-figma.png','./assets/submitted/voltup-poster.webp','./assets/figma-original/voltup-figma.png','./assets/submitted/voltup-poster.webp'];
 const visualImage=i=>'<img src="./assets/voltup/brand/'+visuals[i][0]+'.webp" data-fallback="'+fallbacks[i]+'" alt="VOLT-UP '+safe(visuals[i][1])+' 제품 비주얼" loading="lazy" decoding="async" onerror="if(!this.dataset.failed){this.dataset.failed=1;this.src=this.dataset.fallback;}">';
 return '<div class="case-story vu-brand-story" data-project-case="voltup">'+
  '<section class="vu-brand-hero case-chapter case-in"><div class="vu-brand-copy"><span class="case-kicker">ORIGINAL BRAND / 2026</span>'+
  '<h3>ENERGY.<br><em>IN MOTION.</em></h3><p>'+safe(d.scope)+'</p>'+
  '<span class="vu-brand-note">BLACK × NEON LIME / PACKAGING / CAMPAIGN</span></div>'+
  '<figure class="vu-brand-main">'+visualImage(0)+'</figure></section>'+
  '<section class="vu-brand-strategy case-chapter case-in"><span class="case-kicker">BRAND STRATEGY / CREATIVE DIRECTION</span>'+
  '<h3>운동 전 10초,<br><em>텐션을 깨우다.</em></h3>'+
  '<p>기존 브랜드의 문제를 해결하는 리디자인이 아닌, 직접 만든 브랜드의 메시지를 어떻게 보여줄지 고민했습니다. 에너지의 속도감을 강한 컬러 대비와 굵은 타이포그래피로 표현하고, 실용적인 스틱형 패키지부터 제품 화보까지 일관되게 설계했습니다.</p>'+
  '<div class="vu-strategy-points"><article><b>01 / BRAND IDENTITY</b><strong>블랙 × 형광 라임</strong><span>강렬하고 기억에 남는 브랜드 인상</span></article>'+
  '<article><b>02 / PRODUCT DESIGN</b><strong>스틱형 패키지</strong><span>간편한 휴대와 빠른 섭취 경험을 시각화</span></article>'+
  '<article><b>03 / CAMPAIGN</b><strong>운동 전 10초</strong><span>짧고 직관적인 핵심 메시지</span></article></div></section>'+
  '<section class="vu-product-wrap case-chapter case-in"><span class="case-kicker">PRODUCT VISUALS / 05 SCENES</span>'+
  '<h3>보여주고 싶은<br><em>VOLT-UP의 이미지.</em></h3>'+
  '<p>하나의 제품을 다양한 상황으로 연출해 강렬함, 휴대성, 청량감을 강조했습니다.</p>'+
  '<div class="vu-product-grid">'+visuals.slice(1).map((v,i)=>'<figure class="vu-product-item">'+visualImage(i+1)+
  '<figcaption><small>'+v[0]+' / 05</small><strong>'+v[1]+'</strong><span>'+v[2]+'</span></figcaption></figure>').join('')+'</div></section>'+
  '<section class="vu-campaign-idea case-chapter case-in"><span class="case-kicker">CARD NEWS / SERIES 01</span>'+
  '<h3>공감에서 시작하는<br><em>브랜드 스토리.</em></h3>'+
  '<p>피곤함과 집중력 저하 같은 일상의 순간을 먼저 보여주고, 운동 전 에너지가 필요한 상황에 VOLT-UP을 자연스럽게 연결했습니다.</p>'+
  '<div class="vu-campaign-flow"><span>일상 속 피로</span><span>→</span><span>공감</span><span>→</span><span>제품 소개</span><span>→</span><span>브랜드 경험</span></div></section>'+
  '</div>';
 }
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
