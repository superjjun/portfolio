/* True device-pixel export of original user-authored Figma designs.
   No AI upscaling or sharpen filters; screenshot pixels come from the rendered
   Figma prototype itself, with devicePixelRatio=3. */
const {chromium}=require('playwright');
const {PNG}=require('pngjs');
const fs=require('fs'),path=require('path');
const OUT=path.resolve('fashion/assets/figma-original');
fs.mkdirSync(OUT,{recursive:true});
const scenes=[
 {id:'junggonara',node:'122:4',w:390,h:844,path:'junggonara-figma-hires.png'},
 {id:'roundlab',node:'86:3515',w:390,h:844,path:'roundlab-figma-hires.png'}
];
async function one(browser,s){
 const ctx=await browser.newContext({viewport:{width:1200,height:1020},deviceScaleFactor:3});
 const page=await ctx.newPage();
 const url='https://www.figma.com/proto/Du9eyttPUlEndS0eOmXVkk/Portfolio?node-id='+s.node.replace(':','-')+'&page-id=0%3A1&scaling=contain&content-scaling=fixed';
 await page.goto(url,{waitUntil:'domcontentloaded',timeout:65000});
 await page.waitForFunction(()=>[...document.querySelectorAll('canvas')].some(c=>c.getBoundingClientRect().width>300),null,{timeout:26000});
 await page.waitForTimeout(3900);
 const canvas=page.locator('canvas').first(),b=await canvas.boundingBox();
 const sc=Math.min(b.width/s.w,b.height/s.h),width=s.w*sc,height=s.h*sc;
 const x=(b.width-width)/2,y=(b.height-height)/2;
 const png=PNG.sync.read(await canvas.screenshot({type:'png'})),d=3;
 const sx=Math.round(x*d),sy=Math.round(y*d),sw=Math.round(width*d),sh=Math.round(height*d);
 const dst=new PNG({width:sw,height:sh});
 PNG.bitblt(png,dst,sx,sy,sw,sh,0,0);
 const saved=path.join(OUT,s.path);fs.writeFileSync(saved,PNG.sync.write(dst));
 await ctx.close();
 if(sw<900||sh<1900||fs.statSync(saved).size<75000)throw Error('Screenshot is not high-resolution '+s.id);
 console.log('FIGMA_HIGH_RES_EXPORT',JSON.stringify({project:s.id,width:sw,height:sh,bytes:fs.statSync(saved).size,file:saved}));
}
(async()=>{
 const browser=await chromium.launch({headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});
 for(const s of scenes)await one(browser,s);
 await browser.close();
})().catch(e=>{console.error(e.stack||e);process.exit(1)});
