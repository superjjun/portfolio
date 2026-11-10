/* Capture REAL clicks in the user's publicly accessible Figma prototypes.
 * This script only saves videos when the actual Figma screen visibly changes.
 * No slide show, simulated UI states or fake interactions.
 */
const {chromium}=require('playwright');
const {PNG}=require('pngjs');
const fs=require('fs'),path=require('path'),cp=require('child_process');
const OUT=path.resolve('fashion/assets/demos'),RAW=path.resolve('.record-figma-raw');
fs.mkdirSync(OUT,{recursive:true});fs.mkdirSync(RAW,{recursive:true});
const KEY='Du9eyttPUlEndS0eOmXVkk';
const pause=ms=>new Promise(r=>setTimeout(r,ms));
const scenarios=[
 {name:'soundcloud',screen:[1240,800],viewport:[1500,960],start:'6:2',moves:[
  ['6:2',263,79,'Charts'],['6:4',366,79,'New and hot'],['6:6',480,79,'For you'],['6:8',174,79,'Discover'],['6:2',258,403,'Hidden Stage'],['6:10',277,515,'Listen to stage'],['6:12',708,508,'Follow'],
  ['6:2',465,582,'First Listener'],['6:14',285,507,'Join listener'],['6:12',315,22,'Home'],['6:2',753,23,'Search'] ]},
 {name:'lostlink',screen:[390,844],viewport:[1000,940],start:'317:1462',moves:[
  ['317:1462',105,326,'Lost item'],['317:1608',105,295,'Earbuds'],['317:1608',148,804,'AI Matching'],['317:1909',195,371,'93 percent match'],['317:2039',195,730,'Match confirmation'],
  ['317:1462',285,326,'Found item'],['317:3151',105,516,'Found earbuds'],
  ['317:1462',351,84,'My page'],['317:2324',195,345,'Settings'],['317:2324',195,537,'Support'],['317:1462',338,804,'Saved items'],['317:2265',195,302,'Saved matching'] ]},
 {name:'junggonara',screen:[390,844],viewport:[1000,940],start:'122:4',moves:[
  ['122:4',195,250,'Deal radar'],['122:209',104,713,'AirPods detail'],['122:475',195,646,'Inspection'],['122:513',195,805,'Continue to payment'],['122:556',195,805,'Safe payment'],['122:597',195,805,'Review'],['122:640',195,805,'Earn reward'],
  ['122:4',46,425,'Category'],['122:4',286,425,'Wishlist'],['122:677',355,805,'My info'],['122:757',205,805,'Sell item'],['122:4',150,692,'iPhone detail'] ]},
 {name:'ppomppu',screen:[1440,900],viewport:[1600,1000],start:'10:167',moves:[
  ['10:167',325,107,'Info'],['11:286',501,107,'Community'],['11:415',677,107,'Forum'],['11:544',1030,107,'Gallery'],['11:802',1199,107,'Marketplace'],['11:931',1086,42,'Search'],
  ['10:167',1304,43,'Login overlay'],['10:167',501,107,'Community'],['11:415',196,369,'Popular posts'],['10:167',132,364,'Political category'],
  ['10:167',1086,42,'Search results'] ]},
 {name:'roundlab',screen:[390,844],viewport:[1000,940],start:'86:3515',scroll:true,moves:[]}
];
function url(node){return 'https://www.figma.com/proto/'+KEY+'/Portfolio?node-id='+node.replace(':','-')+'&page-id=0%3A1&scaling=contain&content-scaling=fixed';}
function pctChange(a,b){
 try{
  const A=PNG.sync.read(a), B=PNG.sync.read(b);if(A.width!==B.width||A.height!==B.height)return 1;
  let total=0, changed=0;
  for(let y=70;y<A.height-35;y+=14)for(let x=35;x<A.width-35;x+=14){
   const k=(y*A.width+x)*4;let d=0;for(let c=0;c<3;c++)d+=Math.abs(A.data[k+c]-B.data[k+c]);
   total++;if(d>98)changed++;
  }
  return changed/Math.max(total,1);
 }catch(e){return 0;}
}
async function appBox(page,sz){
 const b=await page.evaluate(()=>{
  const all=[...document.querySelectorAll('canvas')].map(x=>{const r=x.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height};});
  return all.filter(x=>x.width>320&&x.height>320).sort((a,b)=>b.width*b.height-a.width*a.height)[0];
 });
 if(!b)return null;
 const scale=Math.min(b.width/sz[0],b.height/sz[1]);
 const width=sz[0]*scale,height=sz[1]*scale;
 return {x:b.x+(b.width-width)/2,y:b.y+(b.height-height)/2,width,height,scale};
}
async function go(page,node,sz){
 await page.goto(url(node),{waitUntil:'domcontentloaded',timeout:75000});
 await page.waitForFunction(()=>[...document.querySelectorAll('canvas')].some(c=>c.getBoundingClientRect().width>300),null,{timeout:28000});
 await pause(2300);
 return appBox(page,sz);
}
async function record(browser,scene){
 const dir=path.join(RAW,scene.name);fs.mkdirSync(dir,{recursive:true});
 const ctx=await browser.newContext({viewport:{width:scene.viewport[0],height:scene.viewport[1]},deviceScaleFactor:1,recordVideo:{dir,size:{width:scene.viewport[0],height:scene.viewport[1]}},reducedMotion:'no-preference'});
 const page=await ctx.newPage();page.on('pageerror',err=>console.log('FIGMA_PAGE_ERROR',scene.name,err.message.slice(0,120)));
 let count=0,attempts=0,current=scene.start,box=await go(page,current,scene.screen);
 if(!box)throw Error('No genuine Figma canvas for '+scene.name);
 console.log('FIGMA_OPEN',JSON.stringify({scene:scene.name,url:page.url(),screen:box}));
 if(scene.scroll){
  for(let i=0;i<10;i++){
   const before=await page.screenshot({type:'png'});await page.mouse.move(box.x+box.width/2,box.y+box.height/2);
   await page.mouse.wheel(0,265);await pause(1100);
   const after=await page.screenshot({type:'png'});
   const difference=pctChange(before,after);
   console.log('FIGMA_SCROLL',JSON.stringify({i,difference}));
   if(difference>.018)count++;
  }
 }else{
  for(const [from,x,y,label] of scene.moves){
   if(current!==from){box=await go(page,from,scene.screen);current=from;}
   if(!box)continue;
   const clickX=box.x+x*box.scale,clickY=box.y+y*box.scale;
   if(clickX<0||clickY<0||clickX>scene.viewport[0]||clickY>scene.viewport[1])continue;
   const before=await page.screenshot({type:'png'});
   await page.mouse.move(clickX-40,clickY-15);await pause(200);
   await page.mouse.move(clickX,clickY,{steps:12});await pause(120);
   await page.mouse.click(clickX,clickY);await pause(1350);
   const after=await page.screenshot({type:'png'});
   const difference=pctChange(before,after);
   const urlNow=page.url(),query=new URL(urlNow).searchParams.get('node-id');
   const changed=(difference>.032)||(query&&query!==from.replace(':','-'));
   console.log('FIGMA_REAL_CLICK',JSON.stringify({scene:scene.name,label,from,to:query,difference,changed}));
   attempts++;if(changed){count++;current=query?query.replace('-',':'):'unknown';}else current=from;
  }
 }
 await pause(950);
 const vid=page.video();
 await ctx.close();
 const raw=await vid.path(),outfile=path.join(OUT,scene.name+'-figma.mp4');
 if(count<2){console.log('FIGMA_SKIP',JSON.stringify({name:scene.name,reason:'No verified prototype transitions',count,attempts}));return;}
 cp.execFileSync('ffmpeg',['-y','-hide_banner','-loglevel','error','-i',raw,'-vf','fps=20,scale=trunc(iw/2)*2:trunc(ih/2)*2','-c:v','libx264','-crf','24','-preset','veryfast','-movflags','+faststart','-pix_fmt','yuv420p','-an',outfile],{timeout:180000,stdio:'pipe'});
 const bytes=fs.statSync(outfile).size;
 if(bytes<18000){fs.unlinkSync(outfile);return;}
 console.log('FIGMA_VIDEO_SAVED',JSON.stringify({name:scene.name,verifiedTransitions:count,steps:attempts,bytes,path:outfile}));
}
(async()=>{
 const browser=await chromium.launch({headless:true,args:['--no-sandbox','--disable-dev-shm-usage','--use-gl=angle','--enable-webgl']});
 for(const scene of scenarios){
  try{await record(browser,scene);}catch(e){console.error('RECORDING_FAILED',scene.name,e.stack||e);}
 }
 await browser.close();
 const files=fs.readdirSync(OUT).filter(x=>x.endsWith('-figma.mp4'));
 console.log('RECORDED_FIGMA_FILES',JSON.stringify(files));
 if(!files.length)throw Error('Figma frames did not actually respond: no fake video has been saved');
})().catch(e=>{console.error(e);process.exit(1)});
