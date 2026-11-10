const {chromium}=require('playwright');
(async()=>{
 const browser=await chromium.launch({headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});
 const url='https://superjjun.github.io/portfolio/fashion/?qa=single-stories-20261110';
 const ctx=await browser.newContext({viewport:{width:1440,height:900},reducedMotion:'no-preference'});
 const page=await ctx.newPage();const errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto(url,{waitUntil:'domcontentloaded',timeout:60000});
 await page.waitForFunction(()=>document.querySelectorAll('.story-project').length===6,null,{timeout:25000});
 const initial=await page.evaluate(()=>({
  locked:document.body.classList.contains('is-locked'),
  chapters:document.querySelectorAll('.story-project').length,
  galleryGone:!document.querySelector('.deck-stage')&&!document.querySelector('.work-card'),
  avatar:document.querySelector('#profile-photo')?.getAttribute('src'),
  noMenu:!document.querySelector('.header'),
  noFooter:!document.querySelector('#contact')
 }));
 await page.mouse.wheel(0,1250);await page.waitForTimeout(200);
 const lockedScroll=await page.evaluate(()=>scrollY);
 await page.locator('#enter').click();
 await page.waitForFunction(()=>!document.body.classList.contains('is-locked'),null,{timeout:18000});
 await page.waitForTimeout(300);
 const profile=await page.evaluate(()=>({
  photoLoaded:document.querySelector('#profile-photo').naturalWidth>0,
  info:!!document.querySelector('.profile-facts a[href^="mailto:"]')&&!!document.querySelector('.profile-facts a[href^="tel:"]'),
  src:document.querySelector('#profile-photo').currentSrc
 }));
 const shots=[];
 for(const section of await page.locator('.story-project').all()){
  await section.scrollIntoViewIfNeeded();
  await page.waitForTimeout(230);
  const d=await section.evaluate(async el=>{
   const i=el.querySelector('.story-picture img');
   i.loading='eager';
   if(!i.complete)await new Promise(resolve=>{i.addEventListener('load',resolve,{once:true});i.addEventListener('error',resolve,{once:true});setTimeout(resolve,9000)});
   const r=i.getBoundingClientRect(),natural=i.naturalWidth/i.naturalHeight;
   return {id:el.dataset.project,loaded:i.naturalWidth>0,displayRatio:i.clientWidth/i.clientHeight,naturalRatio:natural,
     visible:r.top<innerHeight&&r.bottom>0&&r.left<innerWidth&&r.right>0,
     sectionHeight:el.getBoundingClientRect().height,
     imageWidth:r.width,imageHeight:r.height};
  });
  shots.push(d);
 }
 await page.locator('[data-project="voltup"] .story-picture').click();
 await page.waitForFunction(()=>document.querySelector('#detail')?.classList.contains('open'),null,{timeout:13000});
 const voltup=await page.evaluate(()=>({title:document.querySelector('#detail h2')?.textContent,fullPoster:document.querySelector('#detail .detail-original img')?.naturalWidth>0,video:!!document.querySelector('#detail video')}));
 await page.locator('#detail [data-close]').first().click();await page.waitForFunction(()=>document.querySelector('#detail').hidden,null,{timeout:10000});
 await page.locator('[data-project="lostlink"] .story-picture').click();
 await page.waitForFunction(()=>document.querySelector('#detail')?.classList.contains('open'),null,{timeout:13000});
 const lostlink=await page.evaluate(()=>({video:!!document.querySelector('#detail video'),title:document.querySelector('#detail h2')?.textContent}));
 await page.locator('#detail [data-close]').first().click();await page.waitForFunction(()=>document.querySelector('#detail').hidden,null,{timeout:10000});
 const mobile=await browser.newContext({viewport:{width:390,height:800},isMobile:true,hasTouch:true,reducedMotion:'reduce'});
 const mp=await mobile.newPage(),mobileErrors=[];mp.on('pageerror',e=>mobileErrors.push(e.message));
 await mp.goto(url+'&mobile=1',{waitUntil:'domcontentloaded',timeout:60000});
 await mp.waitForFunction(()=>document.querySelectorAll('.story-project').length===6,null,{timeout:25000});
 const mobileIntro=await mp.evaluate(()=>{const r=document.querySelector('#enter').getBoundingClientRect();return {buttonVisible:r.top>=0&&r.bottom<=innerHeight&&r.left>=0&&r.right<=innerWidth,overflow:document.documentElement.scrollWidth-innerWidth};});
 await mp.locator('#enter').click();await mp.waitForFunction(()=>!document.body.classList.contains('is-locked'),null,{timeout:9000});
 await mp.locator('[data-project="roundlab"]').scrollIntoViewIfNeeded();
 await mp.waitForFunction(()=>{const img=document.querySelector('[data-project="roundlab"] .story-picture img');return img&&img.naturalWidth>0&&img.getBoundingClientRect().width>0},null,{timeout:11000});
 const mobileEnd=await mp.evaluate(()=>{const el=document.querySelector('[data-project="roundlab"] img');const r=el.getBoundingClientRect();return {overflow:document.documentElement.scrollWidth-innerWidth,visible:r.top<innerHeight&&r.bottom>0,width:r.width,height:r.height};});
 console.log('STORY_QA '+JSON.stringify({initial,lockedScroll,profile,shots,voltup,lostlink,mobileIntro,mobileEnd,errors,mobileErrors},null,2));
 await mobile.close();await ctx.close();await browser.close();
 if(!initial.locked||lockedScroll!==0||!initial.galleryGone||!initial.avatar?.includes('junseo-first-avatar'))throw Error('Intro/avatar/gallery change failed');
 if(!profile.photoLoaded||!profile.info)throw Error('Profile avatar/contact failed');
 if(shots.some(s=>!s.loaded||!s.visible||s.imageHeight<120||Math.abs(s.displayRatio-s.naturalRatio)>.012))throw Error('Missing, cropped, or invisible submitted artwork: '+JSON.stringify(shots));
 if(voltup.title!=='VOLT-UP'||voltup.video||!voltup.fullPoster||!lostlink.video)throw Error('Work detail failed');
 if(!mobileIntro.buttonVisible||mobileIntro.overflow>3||!mobileEnd.visible||mobileEnd.overflow>3)throw Error('Mobile layout or works failed');
 if(errors.length||mobileErrors.length)throw Error('JS errors '+errors.concat(mobileErrors).join('|'));
})().catch(e=>{console.error(e.stack||e);process.exit(1)});
