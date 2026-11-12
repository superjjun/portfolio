/* Bridge the real WebGL exhibition into the existing portfolio and existing project detail/film modal.
   Progressive enhancement: keep the original six work sections until WebGL actually renders. */
(() => {
  'use strict';
  const works=document.getElementById('works');
  const frame=document.getElementById('showroom-frame');
  const proxy=document.getElementById('showroom-proxy');
  if(!works || !frame || !proxy)return;
  const allowed=new Set(['soundcloud','lostlink','voltup','junggonara','ppomppu','roundlab']);
  let active=null;
  function notifyClosed(){
    if(active && !document.body.classList.contains('detail-open')){
      active=null;
      frame.contentWindow?.postMessage({type:'KJ_ATELIER_CLOSE'},location.origin);
    }
  }
  window.addEventListener('message',event=>{
    if(event.origin!==location.origin || event.source!==frame.contentWindow)return;
    const data=event.data;
    if(!data || typeof data!=='object')return;
    if(data.type==='KJ_ATELIER_READY'){
      works.classList.add('showroom-ready');
      works.setAttribute('aria-label','인터랙티브 3D 디자인 전시장 — 여섯 개의 실제 작품');
      return;
    }
    if(data.type==='KJ_ATELIER_OPEN' && allowed.has(data.project)){
      if(document.body.classList.contains('detail-open'))return;
      proxy.dataset.open=data.project;
      active=data.project;
      proxy.click(); // Existing motion.js opens the full original case study, including video.
      requestAnimationFrame(()=>{
        if(!document.body.classList.contains('detail-open'))notifyClosed();
      });
    }
  });
  new MutationObserver(notifyClosed).observe(document.body,{attributes:true,attributeFilter:['class']});
  // If embedded WebGL cannot start, the existing complete scrolling portfolio remains visible.
  frame.addEventListener('error',()=>works.classList.remove('showroom-ready'));
})();