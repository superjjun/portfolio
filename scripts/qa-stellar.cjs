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
   return {hasOrbit:!!sec.querySelector('.stellar-orbit-art'),hasIndex:!!sec.querySelector('.stellar-work-index'),background:css.backgroundImage,color:css.color,stellarCssRules:[...document.styleSheets].filter(s=>s.href&&s.href.includes('stellar-case')).map(s=>s.href),titlesOverflow:title.scrollWidth>title.clientWidth+3,screenOverflow:document.documentElement.scrollWidth-document.documentElement.clientWidth};
  });
  await page.locator('#work-ppomppu .story-action').click();
  await page.waitForFunction(()=>!document.querySelector('#detail').hidden,null,{timeout:10000});
  const detail=await page.evaluate(()=>{
   const main=document.querySelector('#detail .detail-main');
   const story=main.querySelector('.case-story');
   return {hasStory:!!story,issueCount:main.querySelectorAll('.case-issue').length,sequence:[...main.querySelectorAll('.case-intro,.case-issue,.case-result,.detail-screen,.detail-poster')].map(x=>x.className),caseHeading:story?.querySelector('.case-intro h3')?.textContent.trim(),scrollHeight:main.scrollHeight,viewHeight:main.clientHeight,overflow:document.documentElement.scrollWidth-document.documentElement.clientWidth};
  });
  if(detail.hasStory){
   await page.locator('#detail .case-issue').nth(1).scrollIntoViewIfNeeded();
   await page.waitForTimeout(280);
   detail.issue2Shown=await page.locator('#detail .case-issue').nth(1).evaluate(e=>e.classList.contains('case-in'));
  }
  await page.locator('#detail .detail-close').click();
  await page.waitForFunction(()=>document.querySelector('#detail').hidden,null,{timeout:8000});
  console.log('STELLAR_QA '+JSON.stringify({mobile,intro,works,detail,errors}));
  await context.close();
  if(!works.hasOrbit||!works.hasIndex||works.background.includes('250, 239, 228'))throw Error('Stellar work stage not visible '+JSON.stringify(works));
  if(works.screenOverflow>5||detail.overflow>5)throw Error('Horizontal overflow '+JSON.stringify({works,detail}));
  if(!detail.hasStory||detail.issueCount!==2||!detail.sequence[0].includes('case-intro')||!detail.sequence[3].includes('case-result')||!detail.issue2Shown)throw Error('Case study sequence/animation missing '+JSON.stringify(detail));
  if(errors.length)throw Error('Browser errors '+errors.join('; '));
 }
 await check(false);
 await check(true);
 await browser.close();
})().catch(e=>{console.error(e.stack||e);process.exit(1)});
