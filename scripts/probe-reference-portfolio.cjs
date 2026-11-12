const {chromium}=require('playwright');
(async()=>{
 const browser=await chromium.launch({headless:true,args:['--no-sandbox','--disable-dev-shm-usage','--enable-webgl','--use-gl=angle','--enable-unsafe-swiftshader','--autoplay-policy=no-user-gesture-required']});
 const page=await browser.newPage({viewport:{width:1440,height:1024},deviceScaleFactor:1,reducedMotion:'reduce'});
 const errs=[];page.on('pageerror',e=>errs.push(e.message.slice(0,110)));
 await page.goto('https://suhan998.github.io/Web-Portfolio/',{waitUntil:'domcontentloaded',timeout:75000});
 await page.locator('#star-hit').click({timeout:8000});
 await page.waitForTimeout(5500);
 await page.mouse.move(720,560);
 for(let i=0;i<8;i++){await page.mouse.wheel(0,650);await page.waitForTimeout(490);if(await page.evaluate(()=>window.__CLEAR_ORBIT_STATE)==='EXPLORE')break;}
 await page.waitForFunction(()=>window.__CLEAR_ORBIT_STATE==='EXPLORE',null,{timeout:12000});
 console.log('REF_COMPLETE_EXPLORE '+JSON.stringify(await page.evaluate(()=>({state:window.__CLEAR_ORBIT_STATE,planets:document.querySelectorAll('.orbit-planet').length}))));
 for(let i=0;i<8;i++){await page.mouse.wheel(0,340);await page.waitForTimeout(450);}
 await page.waitForTimeout(5000);
 let selected=false,key=null;
 for(let i=0;i<5;i++){
  const result=await page.evaluate(()=>{
   const b=[...document.querySelectorAll('.orbit-planet')].find(x=>x.classList.contains('is-frontmost')&&getComputedStyle(x).pointerEvents==='auto');
   if(!b)return {clicked:false,reason:'No active frontmost planet'};
   b.click();return {clicked:true,name:b.textContent.trim().slice(0,60)};
  });
  await page.waitForTimeout(700);
  const state=await page.evaluate(()=>window.__CLEAR_ORBIT_STATE);
  console.log('REF_SELECTION_ATTEMPT '+JSON.stringify({i,...result,state}));
  if(state==='PROJECT_APPROACH'){selected=true;break;}
  await page.mouse.wheel(0,260);
  await page.waitForTimeout(1500);
 }
 if(!selected)throw Error('Could not select active planet via actual page button');
 let opened=false;
 try{await page.waitForFunction(()=>!document.querySelector('#orbit-project-detail').hidden,null,{timeout:42000});opened=true;}catch(e){}
 const info=await page.evaluate(()=>({project:document.querySelector('#orbit-project-detail').dataset.project,sections:[...document.querySelectorAll('#orbit-detail-scroll .orbit-detail-section')].map(x=>x.dataset.section),nav:[...document.querySelectorAll('#orbit-detail-nav button')].map(x=>x.textContent.trim()),visible:!document.querySelector('#orbit-project-detail').hidden}));
 console.log('REF_COMPLETE_DETAILS '+JSON.stringify({opened,...info}));
 if(!opened)throw Error('Selection works but detail animation could not finish in software GPU');
 const sc=await page.screenshot({type:'jpeg',quality:46});console.log('REF_DETAIL_IMAGE_START'+sc.toString('base64')+'REF_DETAIL_IMAGE_END');
 const steps=[];
 for(let i=0;i<5;i++){
  await page.locator('#orbit-detail-nav button').nth(i).evaluate(x=>x.click());
  await page.waitForTimeout(1200);
  const d=await page.evaluate(()=>({active:[...document.querySelectorAll('#orbit-detail-nav button')].map((b,i)=>({i,active:b.classList.contains('is-active'),current:b.getAttribute('aria-current')})).filter(x=>x.active),scrollTop:document.querySelector('#orbit-detail-scroll').scrollTop,detailVisible:!document.querySelector('#orbit-project-detail').hidden}));
  steps.push({chapter:i,...d});
 }
 console.log('REF_COMPLETE_CHAPTERS '+JSON.stringify(steps));
 await page.locator('#orbit-detail-close').evaluate(x=>x.click());
 await page.waitForTimeout(800);
 console.log('REF_COMPLETE_RETURN '+JSON.stringify(await page.evaluate(()=>({hidden:document.querySelector('#orbit-project-detail').hidden,state:window.__CLEAR_ORBIT_STATE}))));
 console.log('REF_COMPLETE_END '+JSON.stringify({errors:errs,selected,opened,chapters:steps.length}));
 await browser.close();
 if(steps.length!==5||!info.visible)throw Error('Incomplete project chapter execution');
})().catch(e=>{console.error('REF_COMPLETE_ERROR '+(e.stack||e));process.exit(1)});
