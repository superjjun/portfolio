const { chromium } = require('playwright');
(async () => {
 const browser = await chromium.launch({headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});
 const u='https://superjjun.github.io/portfolio/fashion/?qa=stellar-20261112-check2';
 async function check(mobile=false){
  const context=await browser.newContext({viewport:mobile?{width:390,height:800}:{width:1440,height:900},reducedMotion:'reduce',isMobile:mobile,hasTouch:mobile,deviceScaleFactor:1});
  const page=await context.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('response',r=>{if(r.url().includes('stellar-case-studies')&&r.status()>=400)errors.push(r.url()+' STATUS '+r.status());});
  await page.goto(u+'&m='+mobile,{waitUntil:'domcontentloaded',timeout:60000});
  await page.waitForFunction(()=>document.querySelectorAll('.story-project').length===6,null,{timeout:14000});
  const intro=await page.evaluate(()=>({addonSrc:[...document.scripts].map(s=>s.src).filter(x=>x.includes('stellar-case')),cssSrc:[...document.querySelectorAll('link[rel=stylesheet]')].map(s=>s.href).filter(x=>x.includes('stellar-case'))}));
  await page.locator('#enter').click();
  await page.waitForFunction(()=>!document.body.classList.contains('is-locked'),null,{timeout:10000});
  await page.locator('#work-ppomppu').scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  const works=await page.evaluate(()=>{
   const sec=document.querySelector('#work-ppomppu');
   const title=sec.querySelector('.story-title');
   const css=getComputedStyle(sec);
   const hud=document.querySelector('.voyage-hud');
   return {hasOrbit:!!sec.querySelector('.stellar-orbit-art'),hasIndex:!!sec.querySelector('.stellar-work-index'),background:css.backgroundImage,color:css.color,stellarCssRules:[...document.styleSheets].filter(s=>s.href&&s.href.includes('stellar-case')).map(s=>s.href),voyageHud:!!hud,orbitProgressCount:hud?.querySelectorAll('[data-voyage-go]').length,activeVoyage:document.body.classList.contains('voyage-active'),planetDepth:sec.style.getPropertyValue('--voyage-img-scale'),titlesOverflow:title.scrollWidth>title.clientWidth+3,screenOverflow:document.documentElement.scrollWidth-document.documentElement.clientWidth};
  });
  await page.waitForTimeout(220);
  if(!mobile){
    await page.locator('.voyage-stop[data-voyage-go="2"]').hover();
    await page.waitForTimeout(240);
    const waypointState=await page.evaluate(()=>{const p=document.querySelector('.voyage-waypoint-preview');return {found:!!p,visible:p?.classList.contains('is-visible'),src:p?.querySelector('img')?.src,complete:p?.querySelector('img')?.complete,width:p?.querySelector('img')?.naturalWidth,bodyActive:document.body.classList.contains('voyage-active'),pointer:matchMedia('(pointer:coarse)').matches};});
    console.log('VOYAGE_HOVER_DIAGNOSTIC '+JSON.stringify(waypointState));
    await page.waitForFunction(()=>{const p=document.querySelector('.voyage-waypoint-preview');return p?.classList.contains('is-visible')&&p.querySelector('img')?.naturalWidth>0;},null,{timeout:14000});
    const preview=await page.evaluate(()=>({title:document.querySelector('.voyage-waypoint-preview strong').textContent,imageWidth:document.querySelector('.voyage-waypoint-preview img').naturalWidth}));
    if(preview.title!=='VOLT-UP'||preview.imageWidth<100)throw Error('Artwork hover preview failed '+JSON.stringify(preview));
    await page.mouse.move(755,700);
  }
  if(!mobile){
    const workShot=(await page.screenshot({type:'jpeg',quality:49})).toString('base64');
    console.log('VOYAGE_WORK_DESKTOP_BEGIN'+workShot+'VOYAGE_WORK_DESKTOP_END');
  }else{
    const workShot=(await page.screenshot({type:'jpeg',quality:55})).toString('base64');
    console.log('VOYAGE_WORK_MOBILE_BEGIN'+workShot+'VOYAGE_WORK_MOBILE_END');
  }
  await page.locator('#work-ppomppu .story-action').click();
  await page.waitForFunction(()=>!document.querySelector('#detail').hidden,null,{timeout:10000});
  const detail=await page.evaluate(()=>{
   const main=document.querySelector('#detail .detail-main');
   const story=main.querySelector('.case-story');
   return {hasStory:!!story,issueCount:main.querySelectorAll('.case-issue').length,sequence:[...main.querySelectorAll('.case-intro,.case-issue,.case-result,.detail-screen,.detail-poster')].map(x=>x.className),caseHeading:story?.querySelector('.case-intro h3')?.textContent.trim(),caseNavCount:document.querySelectorAll('#detail .voyage-case-steps [data-voyage-chapter]').length,scrollHeight:main.scrollHeight,viewHeight:main.clientHeight,overflow:document.documentElement.scrollWidth-document.documentElement.clientWidth};
  });
  if(detail.hasStory){
   await page.locator('#detail [data-voyage-chapter="2"]').click();
   await page.waitForTimeout(200);
   detail.chapterNavWorked=await page.evaluate(()=>{const m=document.querySelector('#detail .detail-main'),i=document.querySelectorAll('#detail .case-issue')[1];return Math.abs(i.getBoundingClientRect().top-m.getBoundingClientRect().top)<100;});
   await page.locator('#detail .case-issue').nth(1).scrollIntoViewIfNeeded();
   await page.waitForTimeout(280);
   detail.issue2Shown=await page.locator('#detail .case-issue').nth(1).evaluate(e=>e.classList.contains('case-in'));
  }
  if(!mobile){
    const caseShot=(await page.screenshot({type:'jpeg',quality:48})).toString('base64');
    console.log('VOYAGE_CASE_DESKTOP_BEGIN'+caseShot+'VOYAGE_CASE_DESKTOP_END');
  }
  await page.locator('#detail .detail-close').click();
  await page.waitForFunction(()=>document.querySelector('#detail').hidden,null,{timeout:8000});
  console.log('STELLAR_QA '+JSON.stringify({mobile,intro,works,detail,errors}));
  await context.close();
  if(!works.hasOrbit||!works.hasIndex||!works.voyageHud||works.orbitProgressCount!==6||!works.activeVoyage||works.background.includes('250, 239, 228'))throw Error('Stellar work stage not visible '+JSON.stringify(works));
  if(works.screenOverflow>5||detail.overflow>5)throw Error('Horizontal overflow '+JSON.stringify({works,detail}));
  if(!detail.hasStory||detail.issueCount!==2||!detail.sequence[0].includes('case-intro')||!detail.sequence[3].includes('case-result')||!detail.issue2Shown||detail.caseNavCount!==5||!detail.chapterNavWorked)throw Error('Case study sequence/animation missing '+JSON.stringify(detail));
  if(errors.length)throw Error('Browser errors '+errors.join('; '));
 }
 await check(false);
 await check(true);
 await browser.close();
})().catch(e=>{console.error(e.stack||e);process.exit(1)});
