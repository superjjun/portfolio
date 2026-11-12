const {chromium}=require('playwright');
(async()=>{
 const browser=await chromium.launch({headless:true,args:['--no-sandbox','--disable-dev-shm-usage','--enable-webgl','--use-gl=angle','--enable-unsafe-swiftshader','--autoplay-policy=no-user-gesture-required']});
 const page=await browser.newPage({viewport:{width:1440,height:1024},deviceScaleFactor:1,reducedMotion:'reduce'});
 const errors=[];page.on('pageerror',e=>errors.push(e.message.slice(0,200)));
 await page.goto('https://suhan998.github.io/Web-Portfolio/',{waitUntil:'domcontentloaded',timeout:65000});
 console.log('REFERENCE_INTRO '+JSON.stringify(await page.evaluate(()=>({title:document.title,button:!!document.querySelector('#star-hit'),state:window.__CLEAR_ORBIT_STATE}))));
 await page.locator('#star-hit').click({timeout:15000});
 await page.waitForTimeout(5500);
 const profile=await page.evaluate(()=>({visible:!document.querySelector('#profile')?.hidden,details:document.querySelector('#profile-more')?.getAttribute('class'),state:window.__CLEAR_ORBIT_STATE}));
 console.log('REFERENCE_PROFILE '+JSON.stringify(profile));
 await page.mouse.move(680,490);
 for(let i=0;i<8;i++){await page.mouse.wheel(0,680);await page.waitForTimeout(460);if(await page.evaluate(()=>window.__CLEAR_ORBIT_STATE)==='EXPLORE')break;}
 await page.waitForTimeout(1000);
 console.log('REFERENCE_EXPLORE '+JSON.stringify(await page.evaluate(()=>({state:window.__CLEAR_ORBIT_STATE,visible:!document.querySelector('#explore').hidden,projectNames:[...document.querySelectorAll('.orbit-planet')].map(x=>x.textContent.trim().replace(/\s+/g,' ').slice(0,58)),hud:document.querySelector('#orbit-hud-name')?.textContent}))));
 for(let i=0;i<9;i++){await page.mouse.wheel(0,420);await page.waitForTimeout(300);}
 await page.waitForTimeout(800);
 const available=await page.evaluate(()=>[...document.querySelectorAll('.orbit-planet')].map((e,i)=>({i,txt:e.textContent.trim().replace(/\s+/g,' ').slice(0,36),front:e.classList.contains('is-frontmost'),pointer:getComputedStyle(e).pointerEvents,width:e.getBoundingClientRect().width})));
 console.log('REFERENCE_PLANETS '+JSON.stringify(available));
 const index=available.find(x=>x.front&&x.pointer==='auto'&&x.width>25)?.i??available.find(x=>x.pointer==='auto')?.i??0;
 const target=page.locator('.orbit-planet').nth(index);
 await target.hover({force:true,timeout:5000}).catch(()=>{});
 const preview=await page.evaluate(()=>({visible:!!document.querySelector('.orbit-planet-preview.is-visible'),url:document.querySelector('.orbit-planet-preview img')?.currentSrc}));
 console.log('REFERENCE_HOVER '+JSON.stringify(preview));
 // Native click event via the real DOM element (not navigation to an invented page).
 await target.evaluate(x=>x.click());
 await page.waitForTimeout(900);
 const chosen=await page.evaluate(()=>({state:window.__CLEAR_ORBIT_STATE,visible:!document.querySelector('#orbit-project-detail').hidden}));
 console.log('REFERENCE_CHOSEN '+JSON.stringify(chosen));
 let authenticDetail=false;
 try{await page.waitForFunction(()=>!document.querySelector('#orbit-project-detail').hidden,null,{timeout:25000});authenticDetail=true;}catch(e){}
 // GPU software renderer may not complete camera easing in headless CI:
 // fallback invokes the SAME internal focus-complete notification after a genuine pick,
 // only for examining the rendered chapters. It does not claim a completed camera animation.
 if(!authenticDetail && chosen.state==='PROJECT_APPROACH'){
  const key=await page.evaluate(i=>['bugs','naver','aladin','seven','hwalok','gta'][i],index);
  await page.evaluate(key=>window.dispatchEvent(new CustomEvent('orbit:project-focus-complete',{detail:{project:key}})),key);
  await page.waitForTimeout(1100);
 }
 const detail=await page.evaluate(()=>({visible:!document.querySelector('#orbit-project-detail').hidden,project:document.querySelector('#orbit-project-detail').dataset.project,navLabels:[...document.querySelectorAll('#orbit-detail-nav button')].map(x=>x.innerText.trim()),chapters:[...document.querySelectorAll('#orbit-detail-scroll .orbit-detail-section')].map(x=>({key:x.dataset.section,height:x.getBoundingClientRect().height}))}));
 console.log('REFERENCE_DETAIL '+JSON.stringify({authenticDetail,...detail}));
 const observations=[];
 if(detail.visible){
  const scroll=page.locator('#orbit-detail-scroll');
  for(let i=0;i<6;i++){
   await page.mouse.move(800,560);await page.mouse.wheel(0,760);await page.waitForTimeout(360);
   observations.push(await page.evaluate(()=>({state:window.__CLEAR_ORBIT_STATE,scroll:document.querySelector('#orbit-detail-scroll').scrollTop,active:[...document.querySelectorAll('#orbit-detail-nav button')].findIndex(x=>x.classList.contains('is-active')),text:document.querySelector('#orbit-detail-nav [aria-current]')?.textContent?.trim()})));
  }
  for(let i=0;i<5;i++){
   try{await page.locator('#orbit-detail-nav button').nth(i).click({force:true,timeout:3000});await page.waitForTimeout(450);}catch(e){}
   const x=await page.evaluate(()=>({selected:[...document.querySelectorAll('#orbit-detail-nav button')].findIndex(x=>x.classList.contains('is-active')),scroll:document.querySelector('#orbit-detail-scroll').scrollTop}));
   observations.push({click:i,...x});
  }
  console.log('REFERENCE_CHAPTERS '+JSON.stringify(observations));
  await page.locator('#orbit-detail-close').evaluate(el=>el.click()).catch(e=>console.log('CLOSE_ERROR '+e.message));
  await page.waitForTimeout(800);
 }
 if(!observations.length)console.log('REFERENCE_CHAPTERS []');
 console.log('REFERENCE_RETURN '+JSON.stringify(await page.evaluate(()=>({detailHidden:document.querySelector('#orbit-project-detail').hidden,exploreVisible:!document.querySelector('#explore').hidden,state:window.__CLEAR_ORBIT_STATE}))));
 console.log('REFERENCE_END '+JSON.stringify({errors,authenticDetail,chapterCount:detail.chapters?.length||0,visited:observations.length}));
 await browser.close();
 if(!detail.visible||detail.chapters.length!==5||observations.length<6)throw Error('Could not fully inspect reference case navigation');
})().catch(e=>{console.error('REFERENCE_PROBE_FAILED '+(e.stack||e));process.exit(1)});
