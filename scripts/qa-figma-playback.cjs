const {chromium}=require('playwright');
(async()=>{
 const browser=await chromium.launch({headless:true,args:['--no-sandbox','--disable-dev-shm-usage','--autoplay-policy=no-user-gesture-required']});
 const page=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:'no-preference'});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('https://superjjun.github.io/portfolio/fashion/?qa=figma-video-verify-20261111',{waitUntil:'domcontentloaded',timeout:60000});
 await page.locator('#enter').click();await page.waitForFunction(()=>!document.body.classList.contains('is-locked'),null,{timeout:15000});
 const results=[];
 for(const name of ['soundcloud','lostlink','junggonara','ppomppu','roundlab']){
   await page.locator('[data-project="'+name+'"]').scrollIntoViewIfNeeded();
   await page.waitForTimeout(380);
   const section=await page.locator('[data-project="'+name+'"]').evaluate(e=>({growth:getComputedStyle(e).getPropertyValue('--growth').trim(),isVisible:e.classList.contains('is-visible'),hasGrowth:!!e.querySelector('.growth-world')}));
   await page.locator('[data-project="'+name+'"] .story-action').click();
   await page.waitForFunction(()=>document.querySelector('#detail')?.classList.contains('open'),null,{timeout:10000});
   const video=page.locator('#detail video');
   if(await video.count()!==1)throw Error('Video tag missing for '+name);
   await page.waitForFunction(()=>{const v=document.querySelector('#detail video');return v&&(v.readyState>=2||v.error);},null,{timeout:21000});
   const before=await video.evaluate(v=>({src:v.currentSrc,ready:v.readyState,width:v.videoWidth,height:v.videoHeight,error:v.error?.message||null,time:v.currentTime}));
   await page.waitForTimeout(1100);
   const after=await video.evaluate(v=>({time:v.currentTime,paused:v.paused}));
   results.push({name,section,before,after});
   await page.locator('#detail [data-close]').first().click();
   await page.waitForFunction(()=>document.querySelector('#detail').hidden,null,{timeout:8000});
 }
 console.log('FIGMA_VIDEO_QA',JSON.stringify({results,errors},null,2));
 await browser.close();
 if(errors.length)throw Error('JS errors '+errors.join('|'));
 if(results.some(x=>!x.section.hasGrowth||!x.section.isVisible))throw Error('Natural animation missing');
 if(results.some(x=>!x.before.src.includes(x.name+'-figma.mp4')||x.before.width===0||x.before.ready<2))throw Error('Figma clip failed to load');
 if(results.some(x=>x.after.time<=x.before.time))throw Error('Figma clip not playing');
})().catch(e=>{console.error(e.stack||e);process.exit(1)});
