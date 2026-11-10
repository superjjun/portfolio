const {chromium}=require('playwright');
(async()=>{
 const browser=await chromium.launch({headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});
 const url='https://superjjun.github.io/portfolio/fashion/?qa=motion-20261110';
 const ctx=await browser.newContext({viewport:{width:1440,height:900},reducedMotion:'no-preference'});
 const page=await ctx.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(url,{waitUntil:'domcontentloaded',timeout:60000});
 await page.waitForSelector('.liquid-object');
 await page.waitForTimeout(900);
 const before=await page.evaluate(()=>({
   hero:document.querySelector('.hero h1').textContent.trim(),
   locked:document.body.classList.contains('is-locked')&&document.documentElement.classList.contains('is-locked'),
   liquidCanvasVisible:!document.querySelector('#liquid-canvas').hidden,
   liquidFallback:!!document.querySelector('.liquid-fallback'),
   heroTextRect:document.querySelector('.hero h1').getBoundingClientRect().toJSON(),
   overflow:document.documentElement.scrollWidth-document.documentElement.clientWidth
 }));
 await page.mouse.wheel(0,900);await page.waitForTimeout(350);
 const preEntryScroll=await page.evaluate(()=>window.scrollY);
 await page.locator('#enter').click();await page.waitForTimeout(600);
 const during=await page.evaluate(()=>({
  classes:document.querySelector('#transition').className,
  clip:getComputedStyle(document.querySelector('#transition')).clipPath,
  opacity:getComputedStyle(document.querySelector('#transition')).opacity
 }));
 await page.waitForTimeout(3000);
 const after=await page.evaluate(()=>({
   unlocked:!document.body.classList.contains('is-locked'),
   hash:location.hash,
   scrollY:scrollY,
   aboutTop:document.querySelector('#about').getBoundingClientRect().top,
   imageWidth:document.querySelector('#profile-photo').naturalWidth,
   projectCount:document.querySelectorAll('.project').length
 }));
 const media=[];
 for(const p of await page.locator('.project').all()){
  await p.scrollIntoViewIfNeeded();await page.waitForTimeout(200);
  const info=await p.evaluate(e=>({id:e.id,visible:e.classList.contains('visible'),imgSrc:e.querySelector('.media-scene img')?.currentSrc,imgNaturalWidth:e.querySelector('.media-scene img')?.naturalWidth,button:e.querySelector('[data-open]')?.dataset.open}));
  media.push(info);
 }
 await page.locator('[data-open="lostlink"].project-button').click();
 await page.waitForTimeout(1150);
 const detail=await page.evaluate(()=>({
  shown:!document.querySelector('#detail').hidden,
  open:document.querySelector('#detail').classList.contains('open'),
  title:document.querySelector('#detail h2')?.textContent,
  moving:document.querySelector('#detail .detail-video-fallback img')?.getAttribute('src'),
  close:!!document.querySelector('#detail .detail-close')
 }));
 await page.locator('#detail .detail-close').click();await page.waitForTimeout(750);
 const closed=await page.evaluate(()=>document.querySelector('#detail').hidden);
 const mobile=await browser.newContext({viewport:{width:390,height:800},isMobile:true,hasTouch:true,deviceScaleFactor:1,reducedMotion:'no-preference'});
 const m=await mobile.newPage();const mErrors=[];m.on('pageerror',e=>mErrors.push(e.message));
 await m.goto(url+'&mobile=1',{waitUntil:'domcontentloaded',timeout:60000});await m.waitForTimeout(400);
 const mobileIntro=await m.evaluate(()=>({
  scrollWidth:document.documentElement.scrollWidth,viewportWidth:document.documentElement.clientWidth,
  enterButton:(()=>{let r=document.querySelector('#enter').getBoundingClientRect();return r.top>=0&&r.top<innerHeight&&r.left>=0&&r.right<=innerWidth;})(),
  heading:document.querySelector('.hero h1').textContent
 }));
 await m.locator('#enter').click();await m.waitForTimeout(3650);
 const mobileAbout=await m.evaluate(()=>({entered:!document.body.classList.contains('is-locked'),imageLoaded:document.querySelector('#profile-photo').naturalWidth>0,overflow:document.documentElement.scrollWidth-document.documentElement.clientWidth}));
 console.log('MOTION_QA '+JSON.stringify({before,preEntryScroll,during,after,media,detail,closed,mobileIntro,mobileAbout,errors,mErrors},null,2));
 await mobile.close();await ctx.close();await browser.close();
 if(!before.locked||preEntryScroll>5)throw Error('Entry gate not working');
 if(!during.classes.includes('opening')||during.opacity==='0')throw Error('Entrance morph not visible');
 if(!after.unlocked||after.projectCount!==5||after.imageWidth===0)throw Error('About, portrait, or work list failed');
 if(media.some(x=>!x.imgNaturalWidth))throw Error('Broken project image');
 if(!detail.open||!closed)throw Error('Project detail failed');
 if(!mobileIntro.enterButton||mobileIntro.scrollWidth>mobileIntro.viewportWidth+3||!mobileAbout.entered)throw Error('Mobile layout failed');
 if(errors.length||mErrors.length)throw Error('Page JS errors: '+errors.concat(mErrors).join(', '));
})().catch(e=>{console.error(e.stack||e);process.exit(1)});
