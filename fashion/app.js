/* RAGSAINT Figma-to-code prototype. No payments, login or orders are processed. */
(function(){
'use strict';
const A=function(name){return name.startsWith('../')||name.startsWith('https://')?name:'./assets/'+name+(name.endsWith('.webp')||name.endsWith('.png')?'':'.png');};
const goods={
 hoodie:{key:'hoodie',name:'DISTRESSED CHECKER HOODIE',price:198000,category:'top',image:'hoodie',photos:['hoodie','hoodie2','hoodie3','hoodie4'],sizes:['S','M','L','XL']},
 outer:{key:'outer',name:'BLACK LEATHER BOMBER',price:328000,category:'outer',image:'outer-main',photos:['outer-1','outer-main','outer-2','outer-3'],sizes:['S','M','L','XL']},
 denim:{key:'denim',name:'WASHED BLACK DENIM',price:148000,category:'bottom',image:'denim-main',photos:['denim-1','denim-main','denim-2'],sizes:['S','M','L','XL']},
 cargo:{key:'cargo',name:'QUILTED POCKET PANTS',price:148000,category:'bottom',image:'cargo-main',photos:['cargo-1','cargo-main','cargo-2'],sizes:['S','M','L','XL']},
 acc:{key:'acc',name:'SILVER HARDWARE CHAIN',price:68000,category:'acc',image:'acc-main',photos:['acc-1','acc-main','acc-2'],sizes:['ONE SIZE']}
};
const cats=['outer','top','bottom','acc'];
const portfolioWorks=[{"id":"soundcloud","title":"SOUNDCLOUD","url":"https://www.figma.com/proto/Du9eyttPUlEndS0eOmXVkk/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=6-2&page-id=0%3A1&starting-point-node-id=6%3A2&content-scaling=fixed&scaling=scale-down","image":"work-soundcloud.png","number":"01","kind":"WEB / UI·UX"},{"id":"lostlink","title":"LOST LINK","url":"https://www.figma.com/proto/Du9eyttPUlEndS0eOmXVkk/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=65-45&page-id=0%3A1&starting-point-node-id=65%3A45&content-scaling=fixed&scaling=scale-down","image":"work-lostlink.png","number":"02","kind":"APP / INTERACTION"},{"id":"junggonara","title":"JUNGGO NARA","url":"https://www.figma.com/proto/Du9eyttPUlEndS0eOmXVkk/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=122-4&page-id=0%3A1&starting-point-node-id=122%3A4&content-scaling=fixed&scaling=scale-down","image":"work-junggonara.png","number":"03","kind":"MOBILE / UX"},{"id":"ppomppu","title":"PPOMPPU","url":"https://www.figma.com/proto/Du9eyttPUlEndS0eOmXVkk/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=10-167&page-id=0%3A1&starting-point-node-id=10%3A167&content-scaling=fixed&scaling=scale-down","image":"work-ppomppu.png","number":"04","kind":"WEB / REDESIGN"},{"id":"roundlab","title":"ROUND LAB BIRCH JUICE MOISTURIZING SUNSCREEN","url":"https://www.figma.com/proto/Du9eyttPUlEndS0eOmXVkk/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=86-3515&page-id=0%3A1&starting-point-node-id=86%3A3515&content-scaling=fixed&scaling=scale-down","image":"work-roundlab-screen.png","number":"05","kind":"DETAIL PAGE / VISUAL"}];

const projectCopy={"soundcloud":{"id":"soundcloud","title":"SOUNDCLOUD","date":"2026.05 — 06","category":"WEB UI/UX / PROMOTION","description":"음악을 듣는 경험에서 한 걸음 더 나아가, 알려지지 않은 아티스트를 발견하고 참여하도록 설계한 프로모션 웹사이트.","problem":"기존 사운드클라우드는 음악을 재생하고 탐색하는 기능에 집중되어 있습니다. 아직 알려지지 않은 아티스트와 사용자가 만날 수 있는 새로운 접점에 주목했습니다.","change":"‘Hidden Stage’와 ‘First Listener’ 콘셉트를 적용해 아티스트 발견에서 음악 감상, 참여와 보상까지 이어지는 경험을 구성했습니다. 프로모션 영역과 콘텐츠의 시각적 위계도 새롭게 정리했습니다.","details":["HIDDEN STAGE","DISCOVERY","PARTICIPATION"],"preview":"./assets/work-soundcloud.png"},"lostlink":{"id":"lostlink","title":"LOST LINK","date":"2026.09 — 10","category":"MOBILE UI/UX / INTERACTION","description":"잃어버린 물건과 습득된 물건을 더 쉽고 빠르게 연결하는 분실물 매칭 서비스.","problem":"기존 LOST112는 이용자가 많은 게시글을 직접 살펴보면서 자신의 물건을 찾아야 합니다. 검색만으로는 놓치기 쉬운 장소와 시간의 단서에 주목했습니다.","change":"분실물과 습득물의 등록 흐름을 구분하고, 장소·시간·사진·카테고리를 바탕으로 일치 가능성이 높은 항목을 보여주는 구조를 제안했습니다. 선택 상태와 단계별 행동을 명확하게 설계했습니다.","details":["LOST / FOUND","MATCHING","USER FLOW"],"preview":"./assets/work-lostlink.png"},"junggonara":{"id":"junggonara","title":"JUNGGO NARA","date":"2026.05","category":"MOBILE UI/UX / REDESIGN","description":"상품을 발견하는 순간부터 거래가 끝나는 순간까지, 탐색과 신뢰를 함께 개선한 중고거래 앱.","problem":"기존 중고나라의 복잡한 상품 정보와 다양한 광고 요소 속에서 원하는 제품을 빠르게 찾기 어렵다는 점에 집중했습니다. 안전한 거래 여부를 판단하기도 쉽지 않았습니다.","change":"브랜드와 카테고리를 중심으로 상품 탐색을 단순화하고, 검수 서비스·안전결제·판매자 후기·포인트 시스템을 거래 과정에 연결했습니다. 패션 커머스처럼 간결한 시각 언어로 차별화했습니다.","details":["DISCOVERY","SAFE PAYMENT","TRUST SYSTEM"],"preview":"./assets/work-junggonara.png"},"ppomppu":{"id":"ppomppu","title":"PPOMPPU","date":"2026.03 — 04","category":"RESPONSIVE WEB / REDESIGN","description":"복잡한 커뮤니티의 정보 구조를 재정리해, 보고 싶은 콘텐츠에 더 빠르게 도달할 수 있도록 만든 웹 리디자인.","problem":"기존 뽐뿌는 다양한 게시판과 정보가 한 화면에 집중되어 있어 콘텐츠의 우선순위가 불분명했습니다. 사용자가 길을 잃지 않는 탐색 구조가 필요했습니다.","change":"정보·커뮤니티·포럼·갤러리·장터의 메뉴 구조를 분명하게 나누고, 카드형 콘텐츠와 통일된 타이포그래피로 정보의 위계를 재설계했습니다. 게시글 상세와 검색으로 이어지는 동선도 정리했습니다.","details":["INFORMATION ARCHITECTURE","COMMUNITY","RESPONSIVE"],"preview":"./assets/work-ppomppu.png"},"roundlab":{"id":"roundlab","title":"ROUND LAB BIRCH JUICE MOISTURIZING SUNSCREEN","date":"2026.05 — 06","category":"DETAIL PAGE / VISUAL DESIGN","description":"라운드랩 자작나무 수분 선크림의 청량한 사용감을 시각적으로 풀어낸 상세페이지 리디자인.","problem":"제품의 기능을 단순히 나열하는 방식에서 벗어나, 수분감·산뜻함·자외선 차단이라는 핵심 가치를 첫눈에 이해할 수 있는 구성에 집중했습니다.","change":"블루와 화이트를 기본으로 제품 컷과 물방울 그래픽, 짧은 메시지를 조합했습니다. 정보별 강약을 조절하고 스크롤에 따라 자연스럽게 제품의 특징을 이해하도록 구성했습니다.","details":["HYDRATION","BRAND VISUAL","DETAIL PAGE"],"preview":"./assets/work-roundlab-screen.png"}};
let state={page:'home',menu:false,search:false,pid:'hoodie',pic:0,size:'',drawer:false,accordion:'',searchText:'',accepted:false,cart:[],infoPanel:null,workMenu:false,activeProject:null};
try{const saved=JSON.parse(localStorage.getItem('ragsaint-figma-cart')||'[]');if(Array.isArray(saved))state.cart=saved.filter(x=>goods[x.key]&&x.qty>0);}catch(e){}
const root=document.getElementById('app');
const money=n=>'₩'+Number(n).toLocaleString('ko-KR');
const bagCount=()=>state.cart.reduce((a,x)=>a+x.qty,0);
const bagTotal=()=>state.cart.reduce((a,x)=>a+x.qty*goods[x.key].price,0);
const currentProduct=()=>goods[state.pid]||goods.hoodie;
const img=(name,cl='',alt='')=>'<img loading="lazy" class="'+cl+'" src="'+A(name)+'" alt="'+alt+'">';
const go=function(page){state.page=page;state.menu=false;state.search=false;state.infoPanel=null;state.workMenu=false;state.activeProject=null;state.drawer=false;state.accordion='';state.pic=0;state.size='';history.replaceState(null,'','#'+encodeURIComponent(page));window.scrollTo({top:0,behavior:'instant'});render();};
function chrome(){
 const ico=(body)=>'<svg viewBox="0 0 20 20" aria-hidden="true" width="17" height="17" fill="none" stroke="#85878d" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">'+body+'</svg>';
 const back=ico('<path d="m12.5 4.5-5.5 5.5 5.5 5.5"/>');
 const forward=ico('<path d="m7.5 4.5 5.5 5.5-5.5 5.5"/>');
 const sidebar=ico('<rect x="2.5" y="3" width="15" height="14" rx="1"/><path d="M8.3 3v14"/>');
 const share=ico('<rect x="4" y="8" width="12" height="9" rx="1.5"/><path d="M10 12V2m0 0L6.8 5.2M10 2l3.2 3.2"/>');
 const tabs=ico('<rect x="7" y="3" width="11" height="12" rx="1.5"/><path d="M4.5 6H3v11h11v-1.5"/>');
 const plus=ico('<path d="M10 4v12M4 10h12"/>');
 return '<div class="browser safari-chrome" aria-hidden="true">'+
 '<div class="lights"><i></i><i></i><i></i></div>'+
 '<div class="safari-left"><span class="safari-tool safari-back">'+back+'</span><span class="safari-tool safari-forward">'+forward+'</span><span class="safari-tool safari-sidebar">'+sidebar+'</span></div>'+
 '<div class="url"><span class="safari-lock">♙</span><span>portfolio / fashion</span></div>'+
 '<div class="safari-right"><span class="safari-tool">'+share+'</span><span class="safari-tool">'+tabs+'</span><span class="safari-tool">'+plus+'</span></div>'+
 '</div>';
}
function header(){
 return '<header class="header"><div class="nav-side">'+
 '<button class="nav-action works-navigation" type="button" data-action="works" aria-expanded="'+(state.workMenu?'true':'false')+'" aria-controls="work-menu">'+(state.workMenu?'<span class="works-close-symbol">×</span> CLOSE':'<span class="burger works-icon"><b></b><b></b><b></b></span> WORKS')+'</button></div>'+
 '<button class="wordmark nav-action" data-go="home" aria-label="Portfolio home">Portfolio</button>'+
 '<nav class="nav-side right" aria-label="Portfolio navigation">'+
 '<button class="nav-action" type="button" data-action="about">ABOUT</button>'+
 '<button class="nav-action" type="button" data-action="contact">CONTACT <span class="small-arrow">↗</span></button>'+
 '</nav></header>';
}
function home(){
 return '<main class="portfolio-home"><section class="hero" aria-label="Fashion portfolio campaign">'+
 '<div class="hero-img hero-photo-static">'+img('heroLeft','', 'Fashion portfolio campaign image 01')+'</div>'+
 '<div class="hero-img hero-photo-static">'+img('heroRight','','Fashion portfolio campaign image 02')+'</div></section>'+
 '<section class="portfolio-works" id="works" aria-label="Selected design projects">'+
 '<div class="portfolio-works-caption"><span>SELECTED WORKS / 2026</span><span>05 PROJECTS</span></div>'+
 '<div class="category-pair">'+workTile(portfolioWorks[0])+workTile(portfolioWorks[1])+'</div>'+
 '<div class="category-pair">'+workTile(portfolioWorks[2])+workTile(portfolioWorks[3])+'</div>'+
 '<div class="category-pair work-featured-row">'+workTile(portfolioWorks[4],true)+'<div class="work-empty-panel" aria-hidden="true"></div></div>'+
 '<footer class="portfolio-foot"><span>KIM JUNSEO © 2026</span><span>FROM IMAGINATION TO REALITY</span></footer>'+
 '</section></main>';
}
function workTile(p,wide){
 return '<button type="button" class="category-tile work-tile'+(wide?' work-featured':'')+'" data-project="'+p.id+'" aria-label="Explore '+p.title+' project">'+
 '<span class="work-screen-glow" aria-hidden="true" style="background-image:url('+A(p.image)+')"></span>'+img(p.image,'work-screen-capture',p.title+' actual Figma design screen')+
 '<span class="work-tile-meta">'+p.number+' / '+p.kind+'</span>'+
 '<span class="work-tile-label"><strong>'+p.title+'</strong><small>VIEW PROJECT ↗</small></span>'+
 '</button>';
}
function projectDetail(){
 if(!state.activeProject)return '';
 const p=portfolioWorks.find(x=>x.id===state.activeProject);
 const d=projectCopy[state.activeProject];
 if(!p||!d)return '';
 const tags=d.details.map(x=>'<span>'+x+'</span>').join('');
 return '<div class="project-modal-wrap" role="presentation">'+
 '<button type="button" class="project-modal-backdrop" data-action="close-project" aria-label="Close project details"></button>'+
 '<section class="project-modal" role="dialog" aria-modal="true" aria-label="'+p.title+' project details">'+
 '<div class="project-modal-top"><span>KIM JUNSEO / SELECTED WORKS</span><button type="button" data-action="close-project">CLOSE <span aria-hidden="true">×</span></button></div>'+
 '<div class="project-modal-content"><div class="project-modal-media">'+img(d.preview,'',p.title+' prototype preview')+
 '<div class="project-modal-media-label">'+p.number+' / '+d.category+'</div></div>'+
 '<div class="project-modal-body"><div class="project-modal-index"><span>PROJECT '+p.number+' / 05</span><span>'+d.date+'</span></div>'+
 '<h1>'+d.title+'</h1><p class="project-modal-category">'+d.category+'</p>'+
 '<p class="project-lead">'+d.description+'</p>'+
 '<div class="project-essay"><div><span>01 / BACKGROUND</span><p>'+d.problem+'</p></div>'+
 '<div><span>02 / DESIGN APPROACH</span><p>'+d.change+'</p></div></div>'+
 '<div class="project-modal-tags">'+tags+'</div>'+
 '<a class="prototype-cta" href="'+p.url+'" target="_blank" rel="noopener noreferrer"><span>VIEW FIGMA PROTOTYPE</span><span>↗</span></a>'+
 '<p class="project-modal-hint">INTERACTIVE PROTOTYPE / OPENS IN A NEW TAB</p>'+
 '</div></div></section></div>';
}
function portfolioWorksMenu(){
 if(!state.workMenu)return '';
 return '<div class="works-menu-layer" id="work-menu" role="presentation">'+
 '<button type="button" class="works-menu-backdrop" aria-label="Close works menu" data-action="close-works"></button>'+
 '<div class="works-menu-layout"><aside class="works-menu-panel" role="navigation" aria-label="Portfolio projects">'+
 '<div class="works-menu-list">'+portfolioWorks.map((p)=>'<button type="button" data-project="'+p.id+'" aria-label="Explore '+p.title+' project">'+p.title+'</button>').join('')+'</div>'+
 '<div class="works-menu-bottom"><span>SELECTED WORKS [ 05 ]</span><span>KIM JUNSEO / 2026</span></div>'+
 '</aside></div></div>';
}
function portfolioInfo(){
 if(!state.infoPanel)return '';
 if(state.infoPanel==='about')return '<div class="portfolio-info-shade" role="presentation"><section class="portfolio-info-dialog" role="dialog" aria-modal="true" aria-label="About Kim Junseo">'+
 '<div class="portfolio-info-top"><span>KIM JUNSEO® / 2026</span><button data-action="close-info" aria-label="Close About">CLOSE ×</button></div>'+
 '<div class="portfolio-info-body"><span class="info-eyebrow">01 / ABOUT</span><h1>IMAGINE.<br>DESIGN.<br><em>REALIZE.</em></h1>'+
 '<div class="portfolio-info-bottom"><p>상상한 것을 실현하는 디자이너.<br>패션에서 쌓은 시각적 감각을 웹·UI·비주얼 디자인으로 연결합니다.</p>'+
 '<div><span>WEB / UI · UX / VISUAL</span><span>SEOUL, KR</span></div><button data-action="works">VIEW PROJECTS ↗</button></div></div></section></div>';
 return '<div class="portfolio-info-shade" role="presentation"><section class="portfolio-info-dialog" role="dialog" aria-modal="true" aria-label="Contact Kim Junseo">'+
 '<div class="portfolio-info-top"><span>KIM JUNSEO® / 2026</span><button data-action="close-info" aria-label="Close Contact">CLOSE ×</button></div>'+
 '<div class="portfolio-info-body"><span class="info-eyebrow">02 / CONTACT</span>'+
 '<h1>LET’S MAKE<br><em>IT REAL.</em></h1><p class="info-intro">상상 속 아이디어를 현실의 디자인으로.<br>프로젝트와 협업에 대한 이야기를 기다립니다.</p>'+
 '<div class="info-contacts"><a href="mailto:mingjjun123@naver.com"><span>01 / EMAIL</span>mingjjun123@naver.com ↗</a>'+
 '<a href="tel:01089865740"><span>02 / PHONE</span>010 · 8986 · 5740 ↗</a>'+
 '<a href="https://github.com/superjjun" target="_blank" rel="noopener noreferrer"><span>03 / GITHUB</span>github.com/superjjun ↗</a></div>'+
 '</div></section></div>';
}
function overlay(){
 const search=state.search;
 return '<main class="overlay-content"><aside class="overlay-side">'+(search?
 '<div class="search-line"><span class="search-mark"></span><input type="search" id="query" placeholder="TYPE HERE" autocomplete="off" value="'+state.searchText.replace(/[&<>"]/g,'')+'"></div>'+
 '<div class="suggestions"><b>SUGGESTED SEARCH</b><button data-go="home">HOME PAGE</button><button data-go="detail:hoodie">DISTRESSED CHECKER HOODIE</button><button data-go="category:outer">OUTER</button></div>':
 '<nav class="overlay-nav">'+cats.map(x=>'<button data-go="category:'+x+'">'+x.toUpperCase()+'</button>').join('')+'</nav><div class="overlay-footer"><button data-go="wishlist">WISHLIST [ 0 ]</button><button>KOR / ENG</button></div>')+
 '</aside><div class="overlay-art">'+img('heroLeft')+img('heroRight')+'</div></main>';
}
function catalog(cat){
 const picks=cat==='bottom'?['denim','cargo']:cat==='top'?['hoodie']:cat==='outer'?['outer']:['acc'];
 return '<main class="catalog-screen"><div class="catalog-layout">'+picks.map((key,i)=>
 '<button class="catalog-product" data-go="detail:'+key+'">'+img(goods[key].image,'',goods[key].name)+'<span class="count">'+String(i+1).padStart(2,'0')+'</span></button>'
 ).join('')+'</div><span class="catalog-title">'+cat.toUpperCase()+'</span></main>';
}
function detail(){
 const p=currentProduct(), photos=p.photos;
 return '<main class="detail-layout"><div class="product-gallery"><div class="main-image">'+img(photos[state.pic]||photos[0],'',p.name)+'</div>'+
 '<div class="thumbs">'+photos.map((name,i)=>'<button aria-label="View product photo '+(i+1)+'" data-pic="'+i+'" class="'+(state.pic===i?'selected':'')+'">'+img(name)+'</button>').join('')+'</div></div>'+
 '<div class="detail-info"><div class="title-price"><h1>'+p.name+'</h1><span class="price">'+money(p.price)+'</span></div>'+
 '<label class="sr-only" for="size-picker">SELECT SIZE</label><select id="size-picker" class="size-selector">'+
 '<option value="">'+(p.key==='acc'?'ONE SIZE':'SELECT SIZE')+'</option>'+
 p.sizes.map(x=>'<option value="'+x+'" '+(state.size===x?'selected':'')+'>'+x+'</option>').join('')+'</select>'+
 '<p class="size-subtitle">'+(p.key==='acc'?'ONE SIZE / ADJUSTABLE LENGTH':'MODEL IS 1.86 WEARING SIZE LARGE')+'</p>'+
 '<button class="outline-action" data-action="add">ADD TO CART</button>'+
 '<p class="payment-note">Secure payment with Paypal, Apple Pay,<br>Klarna or Credit Card (Visa, Mastercard)</p>'+
 ['PRODUCT DETAILS','SIZE AND FIT','MATERIAL AND CARE','SHIPPING AND RETURNS'].map((s,i)=>'<div class="accordion"><button data-accordion="'+i+'"><span>'+s+'</span><span>'+(state.accordion===String(i)?'−':'⌄')+'</span></button>'+
 (state.accordion===String(i)?'<div class="panel">'+(i===0?'Fashion collection / '+p.name:i===1?'Unisex fit. Select your usual size.':i===2?'Carefully selected textiles. Follow care label.':'Demo shop: no purchases are processed.')+'</div>':'')+'</div>').join('')+
 '<p class="faq">Need more help? Check FAQ</p></div></main>';
}
function drawCart(){
 let x=state.cart[0]; if(!x)return '<div class="cart-layer"><div class="cart-drawer"><div class="cart-drawer-top">YOUR CART<button data-action="close-drawer">×</button></div><p>YOUR BAG IS CURRENTLY EMPTY.</p><button class="solid-btn" data-go="home">CONTINUE SHOPPING</button></div></div>';
 let p=goods[x.key];
 return '<div class="cart-layer"><div class="cart-drawer"><div class="cart-drawer-top">ITEM ADDED TO CART<button data-action="close-drawer" aria-label="Close cart">×</button></div><h2>YOUR CART &nbsp;&nbsp; '+String(bagCount()).padStart(2,'0')+'</h2>'+
 '<div class="drawer-item">'+img(p.image,'',p.name)+'<div><h3>'+p.name+'</h3><p>'+money(p.price)+'</p><p>SIZE: '+x.size+'</p>'+
 '<div class="qty-control"><span>QUANTITY:</span><button data-qty="-1" data-key="'+x.key+'">−</button><span>'+x.qty+'</span><button data-qty="1" data-key="'+x.key+'">+</button></div>'+
 '<p><button class="link-button" data-remove="'+x.key+'">Remove</button></p></div></div>'+
 '<div class="drawer-bottom"><p>ESTIMATED TOTAL <b>'+money(bagTotal())+'</b></p><button class="solid-btn" data-go="bag">VIEW BAG →</button></div></div></div>';
}
function qtyActions(x,compact){return '<span class="qty-control"><button data-qty="-1" data-key="'+x.key+'">−</button><span>'+x.qty+'</span><button data-qty="1" data-key="'+x.key+'">+</button></span>';}
function bag(){
 if(!state.cart.length)return '<main class="bag-page"><div class="bag-left"><h1>BAG &nbsp; │ &nbsp; INFORMATION &nbsp; │ &nbsp; SHIPPING &nbsp; │ &nbsp; PAYMENT</h1><p>YOUR BAG IS CURRENTLY EMPTY.</p><button class="solid-btn" data-go="home">CONTINUE SHOPPING</button></div><div class="bag-summary"><h2>ORDER SUMMARY <span>0</span></h2>'+summaryRows()+'<button class="solid-btn" data-go="home">CONTINUE SHOPPING</button></div></main>';
 return '<main class="bag-page"><section class="bag-left"><h1>BAG</h1><div class="bag-table-head"><span>PRODUCT</span><span>PRICE</span><span>QUANTITY</span><span>TOTAL</span></div>'+
 state.cart.map(x=>{let p=goods[x.key];return '<div class="bag-row"><div class="bag-item">'+img(p.image,'',p.name)+'<div><strong>'+p.name+'</strong><p>SIZE: '+x.size+'<br>COLOR: BLACK<br>QUANTITY: '+x.qty+'</p><button class="link-button" data-remove="'+x.key+'">× &nbsp; REMOVE</button></div></div><div>'+money(p.price)+'</div><div>'+qtyActions(x)+'</div><div>'+money(p.price*x.qty)+'</div></div>';}).join('')+
 '<div class="recommendations"><h3>YOU MAY ALSO LIKE</h3><div class="rec-grid">'+['cargo','hoodie'].map(key=>'<button class="rec" data-go="detail:'+key+'">'+img(goods[key].image)+'<span><b>'+goods[key].name+'</b><small>'+goods[key].category.toUpperCase()+'</small><small>VIEW PRODUCT &nbsp; +</small></span></button>').join('')+'</div></div></section>'+
 '<aside class="bag-summary"><h2>ORDER SUMMARY <span>'+String(bagCount()).padStart(2,'0')+'</span></h2>'+summaryRows()+
 '<label class="agree"><input id="agree-check" type="checkbox" '+(state.accepted?'checked':'')+' />I HAVE READ AND ACCEPT THE PRIVACY POLICY AND THE TERMS AND CONDITIONS</label>'+
 '<button class="solid-btn" data-action="checkout"><span>CHECKOUT</span><span>'+money(bagTotal())+'</span></button><div class="pay-methods">VISA &nbsp; Mastercard &nbsp; PayPal &nbsp; Apple Pay &nbsp; Google Pay<br><br>DEMONSTRATION SITE — NO ACTUAL PAYMENTS</div></aside></main>';
}
function summaryRows(){
 return '<div class="summary-row"><span>SUBTOTAL</span><span>'+money(bagTotal())+'</span></div><div class="summary-row"><span>SHIPPING</span><span>CALCULATED AT CHECKOUT</span></div><div class="summary-row total"><span>TOTAL</span><span>'+money(bagTotal())+'</span></div>';
}
function checkoutSummary(){
 let p=state.cart.length?goods[state.cart[0].key]:goods.hoodie;
 return '<aside class="checkout-right"><div class="checkout-item">'+img(p.image)+'<div><b>'+p.name+'</b><p>SIZE '+(state.cart[0]?.size||'L')+'</p></div><strong>'+money(bagTotal()||p.price)+'</strong></div>'+
 '<div class="form-row"><input placeholder="Discount code" aria-label="Discount code"><button class="solid-btn" type="button">Apply</button></div><div class="checkout-summary"><p>Subtotal <span>'+money(bagTotal())+'</span></p><p>Shipping <span class="muted">Enter shipping address</span></p><p class="total">Total <span>'+money(bagTotal())+'</span></p><p class="muted">Tax and shipping calculated at checkout</p></div></aside>';
}
function checkout(){
 const step=state.page.split(':')[1]||'contact';
 let left='';
 if(step==='contact')left='<h2>Contact</h2><input type="email" placeholder="Email" aria-label="Email"><label class="check-row"><input type="checkbox"> Email me with news and offers</label>'+
 '<label class="check-row"><input type="checkbox"> I have read and agree to the shipping & refund policy.</label>'+
 '<h3>Delivery</h3><p>Please ensure every field in the shipping address contains only valid Latin characters.</p>'+
 '<select aria-label="Country"><option>South Korea</option></select>'+
 '<div class="form-row"><input placeholder="First name"><input placeholder="Last name"></div>'+
 '<div class="form-row"><input placeholder="Address"></div><div class="form-row"><input placeholder="Apartment, suite, etc. (optional)"></div>'+
 '<div class="form-row"><input placeholder="Postal code"><input placeholder="City"><select aria-label="Province"><option>Province</option><option>Seoul</option><option>Gyeonggi</option></select></div>'+
 '<div class="form-row"><input placeholder="Phone"></div><button class="continue" data-go="checkout:shipping">CONTINUE TO SHIPPING &nbsp; →</button>';
 else if(step==='shipping')left='<p>DELIVERY &nbsp; / &nbsp; SHIPPING &nbsp; / &nbsp; PAYMENT</p><h2>Shipping method</h2>'+
 '<p>Enter your shipping address to view available shipping methods.</p><div class="pay-option">STANDARD SHIPPING <span>Calculated at checkout</span></div><h3>Payment</h3>'+
 '<p>All transactions are secure and encrypted.</p><p>This is an interactive design prototype. No information is submitted or processed.</p>'+
 '<button class="continue" data-go="checkout:payment">CONTINUE TO PAYMENT &nbsp; →</button>';
 else left='<p>DELIVERY &nbsp; / &nbsp; SHIPPING &nbsp; / &nbsp; PAYMENT</p><h2>Payment options</h2>'+
 ['Credit card','PayPal','Pay with Klarna','Bank transfer'].map((x,i)=>'<label class="pay-option"><span><input type="radio" name="pay" '+(i===0?'checked':'')+'> '+x+'</span><span>'+(i===0?'VISA • MC':x)+'</span></label>').join('')+
 '<h3>Save your information</h3><p>Save your information for a faster checkout next time.</p>'+
 '<p class="muted">Portfolio demonstration only — do not enter payment details.</p><button class="solid-btn" style="width:100%;margin-top:26px" data-go="complete">PAY NOW (DEMO)</button>'+
 '<p class="muted" style="margin-top:24px">Refund policy &nbsp;&nbsp; Shipping &nbsp;&nbsp; Privacy policy &nbsp;&nbsp; Terms of service</p>';
 return '<main class="checkout"><section class="checkout-left">'+left+'</section>'+checkoutSummary()+'</main>';
}
function login(){return '<main class="login-page"><form class="login-form" id="login-form"><h1>LOGIN</h1><label>EMAIL *</label><input type="email" required placeholder="EMAIL"><label>PASSWORD *</label><input type="password" required placeholder="PASSWORD"><button class="solid-btn" type="submit">LOGIN</button><p>YOU DON’T HAVE AN ACCOUNT?<br>CLICK THE BUTTON BELOW AND CREATE AN ACCOUNT.</p><button type="button" class="link-button">CREATE ACCOUNT →</button><p class="muted">Demo design: account login is not connected.</p></form><div class="login-footer">KOR / ENG &nbsp;&nbsp;&nbsp;&nbsp; NEWSLETTER &nbsp;&nbsp;&nbsp;&nbsp; CUSTOMER CARE &nbsp;&nbsp;&nbsp;&nbsp; RETURNS &nbsp;&nbsp;&nbsp;&nbsp; SOCIAL &nbsp;&nbsp;&nbsp;&nbsp; ACCESSIBILITY</div></main>';}
function wishlist(){return '<main class="wishlist-screen"><h1>YOUR WISHLIST</h1><p>SEE THE PRODUCTS YOU LIKED AND PURCHASE THEM</p><div class="wishlist-line"><span>PRODUCTS</span><span>[ 0 ]</span></div><p>THERE ARE NO PRODUCTS IN YOUR WISHLIST</p></main>';}
function complete(){return '<main class="step-complete"><h1>ORDER COMPLETE</h1><p>This is a portfolio prototype. No real purchase has been made.</p><button class="solid-btn" data-go="home">BACK TO HOME</button></main>';}
function render(){
 let page=state.page;
 if(page.indexOf('detail:')===0){state.pid=page.split(':')[1] in goods?page.split(':')[1]:'hoodie';}
 let main=state.menu||state.search?overlay():page==='home'?home():page.indexOf('category:')===0?catalog(page.split(':')[1]):page.indexOf('detail:')===0?detail():page==='bag'?bag():page.indexOf('checkout:')===0?checkout():page==='login'?login():page==='wishlist'?wishlist():page==='complete'?complete():home();
 root.innerHTML='<div class="site">'+chrome()+header()+main+'</div>'+(state.drawer?drawCart():'')+portfolioWorksMenu()+portfolioInfo()+projectDetail();
 if(state.search){const q=document.getElementById('query');if(q){q.focus();q.setSelectionRange(q.value.length,q.value.length);}}
}
function updateCart(){try{localStorage.setItem('ragsaint-figma-cart',JSON.stringify(state.cart));}catch(e){}}
document.addEventListener('click',function(e){
 const t=e.target.closest('button,[data-go],[data-project]');
 if(!t)return;
 if(t.dataset.go){go(t.dataset.go);return;}
 if(t.dataset.project){state.activeProject=t.dataset.project;state.workMenu=false;state.infoPanel=null;render();document.querySelector('.project-modal [data-action="close-project"]')?.focus();return;}
 const action=t.dataset.action;
 if(action==='works'){state.infoPanel=null;state.menu=false;state.search=false;if(state.page!=='home'){state.page='home';history.replaceState(null,'','#home');window.scrollTo({top:0,behavior:'instant'});state.workMenu=true;}else{state.workMenu=!state.workMenu;}render();return;}
 if(action==='close-works'){state.workMenu=false;render();return;}
 if(action==='about'||action==='contact'){state.infoPanel=action;state.workMenu=false;render();document.querySelector('[data-action="close-info"]')?.focus();return;}
 if(action==='close-info'){state.infoPanel=null;render();return;}
 if(action==='close-project'){state.activeProject=null;render();return;}
 if(action==='menu'){state.menu=!state.menu;state.search=false;render();return;}
 if(action==='search'){state.search=!state.search;state.menu=false;render();return;}
 if(action==='close-drawer'){state.drawer=false;render();return;}
 if(action==='add'){
   const p=currentProduct();const size=state.size||p.sizes[p.key==='acc'?0:1];
   const existing=state.cart.find(x=>x.key===p.key&&x.size===size);
   if(existing)existing.qty++;else state.cart.push({key:p.key,size,qty:1});
   updateCart();state.drawer=true;render();return;
 }
 if(action==='checkout'){let a=document.getElementById('agree-check');if(a&&!a.checked){a.focus();alert('Please accept the terms and conditions for this demo.');return;}go('checkout:contact');return;}
 if(t.dataset.pic!==undefined){state.pic=Number(t.dataset.pic)||0;render();return;}
 if(t.dataset.accordion!==undefined){state.accordion=state.accordion===t.dataset.accordion?'':t.dataset.accordion;render();return;}
 if(t.dataset.qty){const x=state.cart.find(y=>y.key===t.dataset.key);if(x){x.qty+=Number(t.dataset.qty);state.cart=state.cart.filter(y=>y.qty>0);updateCart();render();}return;}
 if(t.dataset.remove){state.cart=state.cart.filter(y=>y.key!==t.dataset.remove);updateCart();render();return;}
});
document.addEventListener('change',function(e){if(e.target.id==='size-picker')state.size=e.target.value;if(e.target.id==='agree-check')state.accepted=e.target.checked;});
document.addEventListener('input',function(e){if(e.target.id==='query')state.searchText=e.target.value;});
document.addEventListener('submit',function(e){if(e.target.id==='login-form'){e.preventDefault();alert('This is a visual portfolio prototype; no real login is provided.');}});
document.addEventListener('keydown',function(e){if(e.key==='Escape'&&(state.infoPanel||state.workMenu||state.activeProject)){state.infoPanel=null;state.workMenu=false;state.activeProject=null;render();}});
window.addEventListener('hashchange',function(){const n=decodeURIComponent(location.hash.slice(1));if(n&&n!==state.page){state.page=n;state.menu=false;state.search=false;state.drawer=false;render();}});
const start=decodeURIComponent(location.hash.slice(1));if(start&&/^(home|bag|wishlist|login|complete|category:|detail:|checkout:)/.test(start))state.page=start;
render();
})();
