const {chromium}=require('playwright');
(async()=>{
 const browser=await chromium.launch({headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});
 const page=await browser.newPage({viewport:{width:1500,height:960},deviceScaleFactor:1});
 page.on('pageerror',e=>console.log('PAGE_ERR',e.message.slice(0,240)));
 const u='https://www.figma.com/proto/Du9eyttPUlEndS0eOmXVkk/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=6-2&scaling=contain&page-id=0%3A1';
 await page.goto(u,{waitUntil:'domcontentloaded',timeout:70000});
 await page.waitForTimeout(7500);
 console.log('FIGMA_URL',page.url());
 console.log('FIGMA_DOM',JSON.stringify(await page.evaluate(()=>{
  const c=[...document.querySelectorAll('canvas,svg,iframe,[role=main],[data-testid]')].map(e=>{const b=e.getBoundingClientRect();return {tag:e.tagName,testid:e.getAttribute('data-testid'),x:Math.round(b.x),y:Math.round(b.y),w:Math.round(b.width),h:Math.round(b.height)};}).filter(x=>x.w>300&&x.h>300).slice(0,25);
  return {title:document.title,text:document.body.innerText.slice(0,400),canvases:c};
 })));
 const jpg=await page.screenshot({type:'jpeg',quality:50});
 console.log('FIGMA_SCREEN_BEGIN'+jpg.toString('base64')+'FIGMA_SCREEN_END');
 await browser.close();
})().catch(e=>{console.error(e.stack||e);process.exit(1)});
