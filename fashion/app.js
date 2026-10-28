/* RAGSAINT Figma-to-code prototype. No payments, login or orders are processed. */
(function(){
'use strict';
const A=function(name){return './assets/'+name+'.png';};
const goods={
 hoodie:{key:'hoodie',name:'DISTRESSED CHECKER HOODIE',price:198000,category:'top',image:'hoodie',photos:['hoodie','hoodie2','hoodie3','hoodie4'],sizes:['S','M','L','XL']},
 outer:{key:'outer',name:'BLACK LEATHER BOMBER',price:328000,category:'outer',image:'outer-main',photos:['outer-1','outer-main','outer-2','outer-3'],sizes:['S','M','L','XL']},
 denim:{key:'denim',name:'WASHED BLACK DENIM',price:148000,category:'bottom',image:'denim-main',photos:['denim-1','denim-main','denim-2'],sizes:['S','M','L','XL']},
 cargo:{key:'cargo',name:'QUILTED POCKET PANTS',price:148000,category:'bottom',image:'cargo-main',photos:['cargo-1','cargo-main','cargo-2'],sizes:['S','M','L','XL']},
 acc:{key:'acc',name:'SILVER HARDWARE CHAIN',price:68000,category:'acc',image:'acc-main',photos:['acc-1','acc-main','acc-2'],sizes:['ONE SIZE']}
};
const cats=['outer','top','bottom','acc'];
let state={page:'home',menu:false,search:false,pid:'hoodie',pic:0,size:'',drawer:false,accordion:'',searchText:'',accepted:false,cart:[]};
try{const saved=JSON.parse(localStorage.getItem('ragsaint-figma-cart')||'[]');if(Array.isArray(saved))state.cart=saved.filter(x=>goods[x.key]&&x.qty>0);}catch(e){}
const root=document.getElementById('app');
const money=n=>'₩'+Number(n).toLocaleString('ko-KR');
const bagCount=()=>state.cart.reduce((a,x)=>a+x.qty,0);
const bagTotal=()=>state.cart.reduce((a,x)=>a+x.qty*goods[x.key].price,0);
const currentProduct=()=>goods[state.pid]||goods.hoodie;
const img=(name,cl='',alt='')=>'<img loading="lazy" class="'+cl+'" src="'+A(name)+'" alt="'+alt+'">';
const go=function(page){state.page=page;state.menu=false;state.search=false;state.drawer=false;state.accordion='';state.pic=0;state.size='';history.replaceState(null,'','#'+encodeURIComponent(page));window.scrollTo({top:0,behavior:'instant'});render();};
function chrome(){return '<div class="browser" aria-hidden="true"><div class="lights"><i></i><i></i><i></i></div><span class="browser-nav">‹ › ▣</span><div class="url">♙ &nbsp; portfolio / fashion</div><span class="browser-right">⇧ ▣ +</span></div>';}
function header(){
 const black=state.page.indexOf('category:')===0||state.page.indexOf('detail:')===0;
 return '<header class="header'+(black?' dark':'')+'">'+
 '<div class="nav-side">'+
 '<button class="nav-action" data-action="menu"><span class="burger"><b></b><b></b><b></b></span><span class="label">'+(state.menu?'CLOSE':'MENU')+'</span></button>'+
 '<button class="nav-action" data-action="search"><span class="search-mark"></span><span class="label">SEARCH</span></button>'+
 '</div><button class="wordmark nav-action" data-go="home" aria-label="Portfolio home">Portfolio</button>'+
 '<div class="nav-side right"><button class="nav-action" data-go="login"><span class="label">ACCOUNT</span></button><button class="nav-action" data-go="bag">BAG [ '+bagCount()+' ]</button></div></header>';
}
function home(){
 return '<main><section class="hero" aria-label="Fashion portfolio campaign">'+
 '<div class="hero-img hero-photo-static">'+img('heroLeft','', 'Fashion portfolio campaign image 01')+'</div>'+
 '<div class="hero-img hero-photo-static">'+img('heroRight','','Fashion portfolio campaign image 02')+'</div></section>'+
 '<section class="category-pair">'+categoryTile('outer')+categoryTile('top')+'</section>'+
 '<section class="category-pair">'+categoryTile('bottom')+categoryTile('acc')+'</section>'+
 '</main>';
}
function categoryTile(cat){return '<button class="category-tile" data-go="category:'+cat+'">'+img(cat,'',cat.toUpperCase()+' editorial')+'<strong>'+cat.toUpperCase()+'</strong></button>';}
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
 root.innerHTML='<div class="site">'+chrome()+header()+main+'</div>'+(state.drawer?drawCart():'');
 if(state.search){const q=document.getElementById('query');if(q){q.focus();q.setSelectionRange(q.value.length,q.value.length);}}
}
function updateCart(){try{localStorage.setItem('ragsaint-figma-cart',JSON.stringify(state.cart));}catch(e){}}
document.addEventListener('click',function(e){
 const t=e.target.closest('button,[data-go]');
 if(!t)return;
 if(t.dataset.go){go(t.dataset.go);return;}
 const action=t.dataset.action;
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
window.addEventListener('hashchange',function(){const n=decodeURIComponent(location.hash.slice(1));if(n&&n!==state.page){state.page=n;state.menu=false;state.search=false;state.drawer=false;render();}});
const start=decodeURIComponent(location.hash.slice(1));if(start&&/^(home|bag|wishlist|login|complete|category:|detail:|checkout:)/.test(start))state.page=start;
render();
})();
