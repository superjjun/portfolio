/* Record TRUE Playwright interactions in the user's published HTML prototypes.
   No slideshow or fabricated click sequences. Every screen comes from a live browser,
   and every executed click is logged. */
const {chromium}=require('playwright');
const fs=require('fs');
const path=require('path');
const {execFileSync}=require('child_process');
const ROOT=path.join(process.cwd(),'fashion/assets/demos');
const RAW=path.join(process.cwd(),'.recorded-video');
fs.mkdirSync(ROOT,{recursive:true});fs.mkdirSync(RAW,{recursive:true});
const scenes=[
 {
  name:'lostlink',
  url:'https://superjjun.github.io/portfolio/lostlink/',
  w:430,h:850,
  groups:[
   [['[data-form="lost"]','[data-form="found"]'],['[data-type]'],['[data-route="home"]']],
   [['[data-item]'],['[data-save]'],['[data-request]'],['[data-close]'],['[data-back="home"]']],
   [['[data-route="matches"]'],['[data-item]'],['[data-route="home"]']],
   [['[data-route="saved"]'],['[data-route="home"]']]
  ]
 },
 {
  name:'junggonara',
  url:'https://superjjun.github.io/portfolio/junggonara/',
  w:430,h:850,
  groups:[
    [['[data-go="radar"]'],['[data-filter]'],['[data-product]'],['[data-go="inspect"]'],['[data-go="home"]']],
    [['[data-go="home"]'],['[data-go="category"]','[data-go="categories"]'],['[data-product]'],['[data-fav]'],['[data-go="home"]']],
    [['[data-go="sell"]'],['[data-go="my"]'],['[data-go="home"]']]
  ]
 },
 {
  name:'ppomppu',
  url:'https://superjjun.github.io/portfolio/ppomppu/',
  w:1366,h:850,
  groups:[
    [['[data-nav="정보"]'],['[data-side]'],['[data-post]'],['[data-back]']],
    [['[data-nav="커뮤니티"]'],['[data-side]'],['[data-post]'],['[data-back]']],
    [['[data-modal="login"]'],['[data-close]']],
    [['[data-nav="뽐뿌"]'],['[data-nav="장터"]'],['[data-side]']]
  ]
 }
];
const pause=ms=>new Promise(resolve=>setTimeout(resolve,ms));
async function clickFirst(page,selectors,delay=750){
 for(const selector of selectors){
  let loc=page.locator(selector).first();
  if(await loc.count()){
   try{
    await loc.scrollIntoViewIfNeeded({timeout:1500});
    if(await loc.isVisible()){
     const before=(await page.locator('body').innerText({timeout:3500})).slice(0,280).replace(/\s+/g,' ');
     await loc.click({timeout:2600});
     await pause(delay);
     const after=(await page.locator('body').innerText({timeout:3500})).slice(0,280).replace(/\s+/g,' ');
     console.log('REAL_CLICK',JSON.stringify({selector,changed:before!==after,url:page.url()}));
     return true;
    }
   }catch(error){console.log('CLICK_SKIP',selector,error.message.slice(0,90));}
  }
 }
 return false;
}
(async()=>{
 const browser=await chromium.launch({headless:true,args:['--no-sandbox','--disable-dev-shm-usage','--autoplay-policy=no-user-gesture-required']});
 for(const scene of scenes){
  const folder=path.join(RAW,scene.name);
  fs.mkdirSync(folder,{recursive:true});
  const context=await browser.newContext({
   viewport:{width:scene.w,height:scene.h},
   deviceScaleFactor:1.25,
   recordVideo:{dir:folder,size:{width:scene.w,height:scene.h}},
   colorScheme:'light',reducedMotion:'no-preference'
  });
  const page=await context.newPage();let clicked=0;
  page.on('pageerror',err=>console.log('PAGEERROR',scene.name,err.message));
  await page.goto(scene.url,{waitUntil:'domcontentloaded',timeout:60000});
  await page.waitForTimeout(1300);
  for(const group of scene.groups){
   for(const choices of group){
     if(await clickFirst(page,choices))clicked++;
   }
   await page.mouse.move(scene.w*.58,scene.h*.4);
   await page.mouse.wheel(0,Math.round(scene.h*.35));
   await pause(730);
  }
  await pause(1200);
  const file=page.video();
  await context.close();
  const rawPath=await file.path();
  const outfile=path.join(ROOT,scene.name+'-real.mp4');
  execFileSync('ffmpeg',['-y','-loglevel','error','-i',rawPath,'-vf','fps=20,scale=trunc(iw/2)*2:trunc(ih/2)*2','-c:v','libx264','-preset','medium','-crf','20','-pix_fmt','yuv420p','-movflags','+faststart','-an',outfile],{stdio:'pipe',timeout:120000});
  const size=fs.statSync(outfile).size;
  console.log('VIDEO_SAVED',JSON.stringify({name:scene.name,clicked,size,filepath:outfile}));
  if(clicked<3||size<15000)throw Error('No meaningful real interaction recording for '+scene.name);
 }
 await browser.close();
 console.log('SUCCESS: published prototype recordings completed');
})().catch(e=>{console.error(e.stack||e);process.exit(1)});
