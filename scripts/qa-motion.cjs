const {chromium}=require('playwright');
(async()=>{
 const browser=await chromium.launch({headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});
 const url='https://superjjun.github.io/portfolio/fashion/?qa=six-submitted-posters-20261110';
 const context=await browser.newContext({viewport:{width:1440,height:900},reducedMotion:'no-preference'});
 const page=await context.newPage(),errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto(url,{waitUntil:'domcontentloaded',timeout:65000});
 await page.waitForFunction(()=>!!document.querySelector('.profile-sheet')&&document.querySelectorAll('.work-card').length===6,{timeout:8000}).catch(()=>{});
 await page.waitForFunction(()=>document.querySelectorAll('.work-card').length===6,null,{timeout:60000});
 const initial=await page.evaluate(()=>({
   hero:document.querySelector('.hero h1')?.innerText,
   locked:document.body.classList.contains('is-locked'),
   noMenu:!document.querySelector('nav.nav')&&!document.querySelector('header.header'),
   noFooter:!document.querySelector('footer')&&!document.querySelector('#contact'),
   noBigTitle:!document.querySelector('.works-heading'),
   cards:document.querySelectorAll('.work-card').length,
   cardImages:document.querySelectorAll('.work-card img').length,
   coverPaths:[...document.querySelectorAll('.work-card img')].map(n=>n.getAttribute('src'))
 }));
 await page.mouse.wheel(0,1100);await page.waitForTimeout(300);
 const beforeEntryScroll=await page.evaluate(()=>scrollY);
 await page.locator('#enter').click();
 await page.waitForFunction(()=>!document.body.classList.contains('is-locked'),null,{timeout:20000});
 await page.waitForTimeout(450);
 const about=await page.evaluate(()=>({
  scroll:scrollY,
  portrait:document.querySelector('#profile-photo')?.naturalWidth,
  hasContact:!!document.querySelector('.profile-facts a[href^="tel:"]')&&!!document.querySelector('.profile-facts a[href^="mailto:"]'),
  noMenu:!document.querySelector('header.header'),
  noFooter:!document.querySelector('footer')
 }));
 await page.evaluate(()=>{const w=document.querySelector('#works');scrollTo({top:w.offsetTop+(w.offsetHeight-innerHeight)*.5,behavior:'instant'});});
 await page.waitForTimeout(750);
 const mid=await page.evaluate(()=>({
  current:document.querySelector('.work-card[data-active="true"]')?.getAttribute('data-open'),
  cards:document.querySelectorAll('.work-card').length,
  visible:document.querySelector('.deck-stage').getBoundingClientRect().top<=1
 }));
 const galleryLayout=await page.evaluate(()=>{
  const card=document.querySelector('.work-card[data-active="true"]');
  const img=card.querySelector('img');
  const b=img.getBoundingClientRect(),c=card.getBoundingClientRect(),stage=document.querySelector('.deck-stage').getBoundingClientRect();
  const cx=b.left+b.width/2,cy=b.top+b.height/2,hit=document.elementFromPoint(cx,cy);
  return {active:card.id,imageRect:{x:b.x,y:b.y,width:b.width,height:b.height},cardRect:{x:c.x,y:c.y,width:c.width,height:c.height},stageRect:{top:stage.top,height:stage.height},imageStyle:{display:getComputedStyle(img).display,opacity:getComputedStyle(img).opacity,visibility:getComputedStyle(img).visibility},topElement:hit?.tagName,topClass:hit?.className?.toString().slice(0,100),onscreen:cx>=0&&cx<innerWidth&&cy>=0&&cy<innerHeight};
 });
 const screenshotData=(await page.screenshot({type:'jpeg',quality:49})).toString('base64');
 console.log('GALLERY_JPG_BEGIN'+screenshotData+'GALLERY_JPG_END');
 const imageTests=[];
 for(const card of await page.locator('.work-card').all()){
   await card.evaluate(n=>n.querySelector('img').loading='eager');
   imageTests.push(await card.evaluate(async n=>{const img=n.querySelector('img');if(!img.complete)await new Promise(resolve=>{img.addEventListener('load',resolve,{once:true});img.addEventListener('error',resolve,{once:true});setTimeout(resolve,7000)});return {id:n.id,src:img.currentSrc,loaded:img.naturalWidth>0};}));
 }
 await page.locator('.work-card[data-active="true"]').click();
 await page.waitForFunction(()=>document.querySelector('#detail')?.classList.contains('open'),null,{timeout:10000});
 const detail=await page.evaluate(()=>({
  opened:!document.querySelector('#detail').hidden,
  title:document.querySelector('#detail h2')?.textContent,
  hasVideo:!!document.querySelector('#detail video'),
  hasProjectImage:!!document.querySelector('#detail .detail-original img')
 }));
 await page.locator('#detail [data-close]').first().click();
 await page.waitForFunction(()=>document.querySelector('#detail').hidden,null,{timeout:8000});
 // VOLT-UP has user-provided full poster but no fabricated prototype video.
 await page.locator('[data-open="voltup"]').evaluate(e=>e.click());
 await page.waitForFunction(()=>document.querySelector('#detail')?.classList.contains('open'),null,{timeout:10000});
 const voltup=await page.evaluate(()=>({
  title:document.querySelector('#detail h2')?.textContent,
  poster:document.querySelector('#detail .detail-original img')?.getAttribute('src'),
  hasFakeVideo:!!document.querySelector('#detail video')
 }));
 await page.locator('#detail [data-close]').first().click();
 await page.waitForFunction(()=>document.querySelector('#detail').hidden,null,{timeout:8000});

 const mobile=await browser.newContext({viewport:{width:390,height:800},isMobile:true,hasTouch:true,deviceScaleFactor:1,reducedMotion:'reduce'});
 const m=await mobile.newPage(),mobileErrors=[];
 m.on('pageerror',e=>mobileErrors.push(e.message));
 await m.goto(url+'&mobile=1',{waitUntil:'domcontentloaded',timeout:65000});
 await m.waitForFunction(()=>document.querySelectorAll('.work-card').length===6,null,{timeout:60000});
 const mbefore=await m.evaluate(()=>({buttonVisible:(()=>{const b=document.querySelector('#enter').getBoundingClientRect();return b.top>=0&&b.left>=0&&b.right<=innerWidth&&b.bottom<=innerHeight})(),overflow:document.documentElement.scrollWidth-innerWidth}));
 await m.locator('#enter').click();await m.waitForFunction(()=>!document.body.classList.contains('is-locked'),null,{timeout:10000});
 const mafter=await m.evaluate(()=>({profileContact:!!document.querySelector('.profile-facts a[href^="tel:"]'),horizontalOverflow:document.documentElement.scrollWidth-innerWidth}));
 console.log('CLEAN_PORTFOLIO_QA '+JSON.stringify({initial,beforeEntryScroll,about,mid,galleryLayout,imageTests,detail,voltup,mbefore,mafter,errors,mobileErrors},null,2));
 await mobile.close();await context.close();await browser.close();
 if(!initial.locked||beforeEntryScroll>5)throw Error('Intro lock broken');
 if(!initial.noMenu||!initial.noFooter||!initial.noBigTitle||initial.cardImages!==6||initial.cards!==6)throw Error('Menu/footer/title or artwork gallery not correct');
 if(!about.hasContact||!about.portrait)throw Error('About contact or portrait missing');
 if(mid.current!=='junggonara')throw Error('Scroll-driven card activation failed');
 if(!galleryLayout.onscreen||galleryLayout.imageRect.height<100||galleryLayout.imageRect.width<100)throw Error('Focused gallery artwork invisible');
 if(imageTests.some(x=>!x.loaded))throw Error('Submitted artwork loading failed: '+JSON.stringify(imageTests));
 if(!detail.opened||!detail.hasVideo||!detail.hasProjectImage)throw Error('Details failed to open');
 if(voltup.title!=='VOLT-UP'||voltup.hasFakeVideo||!voltup.poster?.includes('voltup-poster.webp'))throw Error('VoltUp poster detail invalid');
 if(!mbefore.buttonVisible||mbefore.overflow>3||mafter.horizontalOverflow>3||!mafter.profileContact)throw Error('Mobile layout/contact failed');
 if(errors.length||mobileErrors.length)throw Error('JS page errors: '+errors.concat(mobileErrors).join(' | '));
})().catch(e=>{console.error(e.stack||e);process.exit(1)});
