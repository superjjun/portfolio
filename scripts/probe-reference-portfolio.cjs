const {chromium}=require('playwright');
(async()=>{
 const browser=await chromium.launch({headless:true,args:['--no-sandbox','--disable-dev-shm-usage','--enable-webgl','--use-gl=angle','--enable-unsafe-swiftshader','--autoplay-policy=no-user-gesture-required']});
 const page=await browser.newPage({viewport:{width:1440,height:1024},deviceScaleFactor:1, reducedMotion:'reduce'});
 const errs=[];page.on('pageerror',e=>errs.push(e.message.slice(0,140)));
 await page.goto('https://suhan998.github.io/Web-Portfolio/',{waitUntil:'domcontentloaded',timeout:70000});
 const snap=async label=>{
  const x=await page.evaluate(()=>{
   const names=['profile','explore','orbit-project-detail','orbit-detail-scroll'];
   const visible=id=>{const e=document.getElementById(id);return e?{hidden:e.hidden,cls:e.className,scrollTop:e.scrollTop,scrollHeight:e.scrollHeight,rect:e.getBoundingClientRect().toJSON().width}:null};
   return {state:window.__CLEAR_ORBIT_STATE,profile:visible('profile'),explore:visible('explore'),detail:visible('orbit-project-detail'),stage:document.querySelector('#stage')?.className,planetCount:document.querySelectorAll('.orbit-planet').length,activePlanets:[...document.querySelectorAll('.orbit-planet')].filter(e=>{const r=e.getBoundingClientRect();return r.width>5&&r.left>=0&&r.left<innerWidth&&r.top>=0&&r.top<innerHeight}).slice(0,10).map(e=>({text:e.innerText.slice(0,65),rect:e.getBoundingClientRect().toJSON(),pointer:getComputedStyle(e).pointerEvents})),detailSections:[...document.querySelectorAll('#orbit-detail-scroll [data-section]')].slice(0,12).map(e=>({text:e.getAttribute('data-section'),cls:e.className})),route:location.href};
  });console.log('REFERENCE_STAGE '+JSON.stringify({label,...x}));return x;
 };
 await snap('intro');
 await page.locator('#star-hit').click({timeout:12000});
 await page.waitForTimeout(5500);
 await snap('after_enter');
 // Profile requires one wheel turn to enter 3D explore, not ArrowDown/End.
 await page.mouse.move(700,540);
 for(let i=0;i<10;i++){await page.mouse.wheel(0,600);await page.waitForTimeout(640);const state=await page.evaluate(()=>window.__CLEAR_ORBIT_STATE);if(state==='EXPLORE'||state==='PROJECT_APPROACH')break;}
 await page.waitForTimeout(1800);let state=await snap('after_wheel_enter_explore');
 if(state.state!=='EXPLORE'){console.log('WARNING EXPLORE NOT ENTERED');}
 for(let i=0;i<6;i++){
  await page.mouse.wheel(0,370);await page.waitForTimeout(350);
  if(i===2||i===5)await snap('travel_'+i);
 }
 let buttons=page.locator('.orbit-planet');
 const cnt=await buttons.count();console.log('REF_PLANET_BUTTONS '+cnt);
 if(cnt){let clicked=false;
  for(let i=0;i<cnt;i++){
   const b=buttons.nth(i);const box=await b.boundingBox();
   if(box&&box.width>20&&box.height>20&&box.x>0&&box.x+box.width<1440&&box.y>30&&box.y+box.height<1024){
    await b.hover({timeout:4000}).catch(()=>{});await snap('hover_planet_'+i);
    await b.click({timeout:7000,force:true}).catch(e=>console.log('CLICK_REF_ERROR '+e.message.slice(0,120)));
    clicked=true;break;
   }
  }
  if(!clicked){await buttons.first().evaluate(b=>b.click());console.log('FALLBACK_PROGRAMMATIC_PLANET_CLICK');}
 }
 await page.waitForTimeout(2600);state=await snap('after_project_click');
 if(state.detail?.hidden){await page.waitForTimeout(4000);state=await snap('after_detail_animation');}
 let stages=[];
 if(!state.detail?.hidden){
  for(let i=0;i<7;i++){
   await page.locator('#orbit-detail-scroll').hover({force:true,timeout:3000}).catch(()=>{});
   await page.mouse.wheel(0,760);await page.waitForTimeout(400);
   stages.push(await snap('detail_scroll_'+i));
  }
  const back=page.locator('#orbit-detail-close');
  if(await back.count()){await back.click({force:true});await page.waitForTimeout(1700);await snap('returned_to_explore');}
 }
 console.log('REFERENCE_SUMMARY '+JSON.stringify({errors:errs,sectionsObserved:stages.map(s=>s.detailSections.filter(x=>x.cls.includes('current')).map(x=>x.text)),buttons:cnt}));
 await browser.close();
})().catch(e=>{console.error('REFERENCE_QA_FAILED '+(e.stack||e));process.exit(1)});
