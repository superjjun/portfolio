/* HIDDEN STAGE — functional portfolio UI/UX prototype. Demo tracks are fictional; no licensed audio playback. */
(()=>{'use strict';
const $=id=>document.getElementById(id);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const songs=[
 [1,"ECHOES AT DAWN","Mira Vale","Electronic","Focus","#fa8b56","#58313e"],
 [2,"MIDNIGHT SIGNAL","Sole Archive","Alternative","Night","#9d75b8","#2a2757"],
 [3,"CITY IN BLUE","LOWKEY","R&B","Calm","#4aa2c1","#16495b"],
 [4,"AFTER THE RAIN","Sien","Indie","Calm","#aec18b","#41624e"],
 [5,"NEON FLOW","O-RUNE","Electronic","Energy","#ff8742","#842b42"],
 [6,"SLOW MOTION","BLOOMLINE","R&B","Night","#7d86d5","#414273"],
 [7,"SATELLITE DAYS","ORBIT TEA","Indie","Focus","#e6b66e","#a45139"],
 [8,"FIRST CONTACT","MOYA","Electronic","Energy","#eac663","#526a44"],
 [9,"SOFT FOCUS","Paper Sun","Alternative","Focus","#c58d9f","#554261"]
].map(a=>({id:a[0],title:a[1],artist:a[2],genre:a[3],mood:a[4],colors:[a[5],a[6]]}));
const pages=[["discover","DISCOVER","◈"],["stage","HIDDEN STAGE","✦"],["mood","MOOD FINDER","◉"],["liked","LIKED TRACKS","♡"],["rewards","REWARDS","✳"]];
const state={page:"discover",mood:"All",search:"",likes:new Set(),selected:songs[0],joined:false,spinning:false,reward:"",drop:0};
function nav(){
 $("sidebar").innerHTML='<div class="logo-wrap"><div class="logo-mark">♫</div><div><div class="brand-main">HIDDEN STAGE</div><div class="brand-sub">SOUNDCLOUD / PROTOTYPE</div></div></div><div class="nav-label">YOUR EXPERIENCE</div><div class="side-nav">'+
 pages.map(a=>'<button type="button" class="side-link '+(state.page===a[0]?'active':'')+'" data-page="'+a[0]+'"><span style="font-size:19px">'+a[2]+'</span>'+a[1]+'</button>').join('')+
 '</div><div class="sidebar-divider"></div><div class="nav-label">FIRST LISTENER</div><p style="font-size:11px;color:#a89fa8;margin:9px 24px;line-height:1.8">새로운 음악 발견부터 프로모션 참여까지 직접 탐색해 보세요.</p>'+
 '<div class="sidebar-bottom"><div class="sidebar-promo"><b>Hidden Stage<br>NOW OPEN</b><button data-page="stage">이벤트 살펴보기 ↗</button></div><p class="side-foot"><span class="live-dot"></span>INTERACTIVE DESIGN DEMO</p></div>';
 $("mobile-nav").innerHTML=pages.slice(0,4).map(a=>'<button data-page="'+a[0]+'">'+a[2]+'<br>'+a[1]+'</button>').join('');
}
function header(){
 $("topbar").innerHTML='<div class="topbar-search"><span style="font-size:24px">⌕</span><input type="search" id="sc-search" placeholder="아티스트, 트랙, 장르 검색" aria-label="음악 검색" value="'+esc(state.search)+'"></div><div class="topbar-right"><span class="topbar-label">DISCOVER / EXPLORE</span><button class="btn small" data-page="stage">HIDDEN STAGE ↗</button></div>';
}
function player(){
 const t=state.selected;
 $("player").innerHTML='<div class="sc-player"><div class="sc-player-cover" style="--tone:'+t.colors[0]+';--tone2:'+t.colors[1]+'">♫</div><div><b>'+esc(t.title)+'</b><small>'+esc(t.artist)+' · 선택한 시연 트랙</small></div><button class="sc-btn" data-like="'+t.id+'">'+(state.likes.has(t.id)?'♥ 저장됨':'♡ 좋아요')+'</button></div>';
}
function rail(){
 $("rail").innerHTML='<div class="sc-rail-box"><span class="sc-kicker">DISCOVER DROP</span><h3>NEW MUSIC.<br>NEW EXPERIENCE.</h3><p>새로운 음악을 발견하고 참여할 수 있는 프로모션 UX를 확인해 보세요.</p><button class="sc-btn" data-page="stage">HIDDEN STAGE ↗</button></div><div class="sc-rail-tip">01 / 신인 아티스트 탐색</div><div class="sc-rail-tip">02 / FIRST LISTENER 배지</div><div class="sc-rail-tip">03 / 참여형 프로모션</div><p style="font-size:11px;color:#938c94;margin-top:24px">포트폴리오 시연용 가상 트랙입니다. 실제 음악 재생과 외부 결제는 제공하지 않습니다.</p>';
}
function cover(t){return '<div class="sc-cover" style="--tone:'+t.colors[0]+';--tone2:'+t.colors[1]+'"><strong>'+esc(t.artist)+'</strong></div>';}
function cards(tracks){
 if(!tracks.length)return '<div class="sc-empty">검색 조건에 맞는 음악이 없습니다. 다른 키워드를 입력해 보세요.</div>';
 return '<div class="sc-grid">'+tracks.map(t=>'<article class="sc-track">'+cover(t)+'<div class="sc-track-title"><div style="min-width:0"><b>'+esc(t.title)+'</b><small>'+esc(t.artist)+' · '+t.genre+'</small></div><button class="sc-heart '+(state.likes.has(t.id)?'active':'')+'" data-like="'+t.id+'" aria-label="좋아요">'+(state.likes.has(t.id)?'♥':'♡')+'</button></div><div class="sc-track-actions"><span style="font-size:10px;color:#a79e9f">'+t.mood+' / DEMO TRACK</span><button class="sc-pick" data-select="'+t.id+'">선택하기 ↗</button></div></article>').join('')+'</div>';
}
function filtered(tracks){
 const q=state.search.toLowerCase().trim();
 return q?tracks.filter(t=>(t.title+' '+t.artist+' '+t.genre).toLowerCase().includes(q)):tracks;
}
function eventPanel(){
 return '<div class="sc-event"><div><span class="sc-kicker">02 / FIRST LISTENER EXPERIENCE</span><h2>HIDDEN STAGE<br>ON SOUNDCLOUD.</h2><p>다양한 아티스트의 음악을 발견하고 프로모션에 참여해 보세요. FIRST LISTENER 배지로 참여 경험을 기록할 수 있습니다.</p><div class="sc-buttons"><button class="sc-btn" data-join="1">'+(state.joined?'FIRST LISTENER 획득 ✓':'이벤트 참여하기 ↗')+'</button><button class="sc-btn light" data-page="rewards">참여 혜택 보기</button></div></div><div class="sc-event-symbol">✦</div></div>';
}
function discover(){
 const list=filtered(songs);
 const start=state.drop%2===0?0:3;
 return '<div class="sc-hero"><span class="sc-kicker">THE SOUND OF DISCOVERY / 2026</span><h1>NEW MUSIC.<br><em>NEW EXPERIENCE.</em></h1><p>새로운 아티스트를 찾고, 감상한 음악에서 프로모션 참여까지 이어지는 경험을 살펴보세요.</p><div class="sc-buttons"><button class="sc-btn" data-page="mood">MOOD FINDER ↗</button><button class="sc-btn light" data-page="stage">HIDDEN STAGE 보기</button></div></div>'+
 '<section class="sc-section"><h2>DISCOVER DROP</h2><p>새로운 음악을 발견하는 시연용 트랙 리스트</p>'+cards(list.slice(start,start+6))+'<button class="sc-btn light" data-drop="1">다른 음악 발견하기 ↻</button></section>'+
 '<section class="sc-section"><h2>HIDDEN STAGE</h2><p>음악 탐색에서 참여로 이어지는 경험</p>'+eventPanel()+'</section>';
}
function moodPage(){
 const moods=["All","Focus","Calm","Night","Energy"];
 const list=filtered(songs.filter(t=>state.mood==="All"||t.mood===state.mood));
 return '<div class="page-head"><div><span class="sc-kicker">MOOD FINDER / DISCOVERY</span><h1>YOUR MOOD.<br>YOUR MUSIC.</h1><p class="subcopy">지금 기분에 맞는 음악을 탐색해 보세요.</p></div></div><div class="sc-moods">'+moods.map(m=>'<button class="'+(m===state.mood?'active':'')+'" data-mood="'+m+'">'+m+'</button>').join('')+'</div>'+cards(list);
}
function likedPage(){return '<div class="page-head"><div><span class="sc-kicker">PERSONAL LIBRARY</span><h1>LIKED TRACKS.</h1><p class="subcopy">하트를 눌러 관심 있는 시연 트랙을 저장해 보세요.</p></div></div>'+cards(filtered(songs.filter(t=>state.likes.has(t.id))));}
function rewardsPage(){
 return '<div class="page-head"><div><span class="sc-kicker">PARTICIPATION / INTERACTION</span><h1>DISCOVERY SPIN.</h1><p class="subcopy">프로모션 참여 리워드를 시각적으로 경험하는 시연입니다. 실제 경품이나 쿠폰은 제공되지 않습니다.</p></div></div><div class="sc-roulette"><div class="sc-wheel '+(state.spinning?'spin':'')+'">✳</div><h2>'+(state.reward?esc(state.reward):'SPIN TO DISCOVER')+'</h2><p>참여형 프로모션의 리워드 UI를 직접 체험해 보세요.</p><button class="sc-btn" data-spin="1">'+(state.spinning?'SPINNING...':'SPIN THE WHEEL ↗')+'</button></div>';
}
function renderMain(keepPosition){
 $("main").innerHTML=state.page==="discover"?discover():state.page==="stage"?'<span class="sc-kicker">HIDDEN STAGE / LIVE EXPERIENCE</span><h1>JOIN THE STAGE.</h1><p class="subcopy">새로운 음악과 아티스트를 발견하고 FIRST LISTENER 이벤트에 참여해 보세요.</p>'+eventPanel():state.page==="mood"?moodPage():state.page==="liked"?likedPage():rewardsPage();
 if(!keepPosition)$("workspace").scrollTo({top:0,behavior:"instant"});
}
function render(keepPosition){nav();header();renderMain(keepPosition);rail();player();}
function toast(message){
 document.getElementById("sc-toast")?.remove();
 const el=document.createElement("div");el.id="sc-toast";el.className="sc-toast";el.setAttribute("role","status");el.textContent=message;document.body.appendChild(el);setTimeout(()=>el.remove(),2300);
}
$("app").addEventListener("click",e=>{
 const t=e.target.closest("[data-page],[data-mood],[data-like],[data-select],[data-join],[data-spin],[data-drop]");
 if(!t)return;
 if(t.dataset.page){state.page=t.dataset.page;state.search="";render(false);}
 else if(t.dataset.mood){state.mood=t.dataset.mood;renderMain(true);}
 else if(t.dataset.like){const id=Number(t.dataset.like);state.likes.has(id)?state.likes.delete(id):state.likes.add(id);render(true);toast("좋아요 목록이 업데이트되었습니다.");}
 else if(t.dataset.select){state.selected=songs.find(t=>t.id===Number(t.dataset.select));player();toast("시연 트랙을 선택했습니다. 실제 음원 재생은 지원하지 않습니다.");}
 else if(t.dataset.join){state.joined=true;render(true);toast("FIRST LISTENER 참여가 완료되었습니다.");}
 else if(t.dataset.drop){state.drop++;renderMain(true);toast("다른 음악을 추천합니다.");}
 else if(t.dataset.spin){if(state.spinning)return;state.spinning=true;renderMain(true);setTimeout(()=>{state.spinning=false;state.reward=["FIRST LISTENER","EARLY ACCESS","DISCOVERY PASS"][Math.floor(Math.random()*3)];renderMain(true);toast("리워드 시연이 완료되었습니다.");},1000);}
});
$("topbar").addEventListener("input",e=>{if(e.target.id==="sc-search"){state.search=e.target.value;renderMain(true);}});
render(false);
})();