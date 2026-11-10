/* Record working GitHub demos and short visual previews from real project screens. */
const {chromium}=require('playwright');
const path=require('path');
const fs=require('fs');
const cp=require('child_process');
const ROOT=path.resolve(__dirname,'..');
const OUT=path.join(ROOT,'fashion','assets','demos');
fs.mkdirSync(OUT,{recursive:true});
const demos=[
{slug:'lostlink',url:'https://superjjun.github.io/portfolio/lostlink/',width:390,height:844,kind:'website'},
{slug:'junggonara',url:'https://superjjun.github.io/portfolio/junggonara/',width:390,height:844,kind:'website'},
{slug:'ppomppu',url:'https://superjjun.github.io/portfolio/ppomppu/',width:1280,height:800,kind:'website'},
{slug:'soundcloud',local:'fashion/assets/work-soundcloud.png',width:1280,height:800,kind:'visual'},
{slug:'roundlab',local:'fashion/assets/work-roundlab-screen.png',width:650,height:850,kind:'visual'}
];
async function capture(browser,demo){
 let context, page;
 const dir=path.join(OUT,'.raw-'+demo.slug);fs.mkdirSync(dir,{recursive:true});
 try{
 context=await browser.newContext({viewport:{width:demo.width,height:demo.height},deviceScaleFactor:1,recordVideo:{dir,size:{width:demo.width,height:demo.height}},reducedMotion:'reduce'});
 page=await context.newPage();page.on('dialog', d=>d.dismiss().catch(()=>{}));
 if(demo.kind==='website'){
  await page.goto(demo.url,{waitUntil:'domcontentloaded',timeout:80000});
  await page.waitForTimeout(1600);
  for(let k=0;k<3;k++){await page.evaluate((step)=>window.scrollBy({top:step,behavior:'smooth'}),demo.height*.37);await page.waitForTimeout(1100);}
  await page.evaluate(()=>window.scrollTo({top:0,behavior:'smooth'}));
  await page.waitForTimeout(900);
  let terms=demo.slug==='lostlink'?['잃어버렸어요','분실물 등록','등록']:demo.slug==='junggonara'?['카테고리']:['커뮤니티'];
  for(const name of terms){const target=page.getByText(name,{exact:false}).first();if(await target.isVisible().catch(()=>false)){await target.click({timeout:2400}).catch(()=>{});break;}}
  await page.waitForTimeout(1800);await page.evaluate(()=>window.scrollBy({top:300,behavior:'smooth'}));await page.waitForTimeout(1300);
 }else{
  await page.goto('file://'+path.join(ROOT,demo.local));
  await page.addStyleTag({content:'html,body{background:#0b1017!important;overflow:hidden!important;}img{max-width:100%!important;max-height:100vh!important;object-fit:contain!important;transform:scale(.92);transition:transform 3.5s ease!important;}'});
  await page.waitForTimeout(1100);await page.evaluate(()=>document.querySelector('img').style.transform='scale(1.075)');
  await page.waitForTimeout(3800);await page.evaluate(()=>document.querySelector('img').style.transform='scale(.92)');await page.waitForTimeout(1300);
 }
 const video=page.video();await context.close();
 const webm=await video.path(),output=path.join(OUT,demo.slug+'.mp4'),maxWidth=demo.width>900?960:390;
 const vf='scale=min(iw\\,'+maxWidth+'):-2:flags=lanczos,fps=18,format=yuv420p';
 const cmd=['-y','-hide_banner','-loglevel','error','-i',webm,'-vf',vf,'-c:v','libx264','-preset','fast','-crf','30','-movflags','+faststart','-an',output];
 const status=cp.spawnSync('ffmpeg',cmd,{encoding:'utf8',timeout:150000});if(status.status!==0)throw new Error('ffmpeg '+status.stderr);
 console.log('CREATED',demo.slug,fs.statSync(output).size);
 }catch(error){console.error('DEMO ERROR',demo.slug,error&&error.message);if(context)await context.close().catch(()=>{});}
 finally{fs.rmSync(dir,{recursive:true,force:true});}
}
(async()=>{const browser=await chromium.launch({headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});for(const demo of demos)await capture(browser,demo);await browser.close();if(fs.readdirSync(OUT).filter(x=>x.endsWith('.mp4')).length===0)throw new Error('No demo videos generated');})();