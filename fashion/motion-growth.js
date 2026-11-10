/* 6 chapters, a single scroll-drawn botanical motif. Driven only by scroll. */
(() => {
  'use strict';
  const projects=[...document.querySelectorAll('.story-project')];
  if(!projects.length)return;
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduced)return;
  const seed=[[8,30,9,.8,33],[16,75,6,-.6,66],[38,14,5,.5,90],[62,79,10,.9,64],[81,30,6,-.8,70],[94,72,7,.6,35]];
  for(const [i,scene] of projects.entries()){
    const title=scene.querySelector('.story-title');
    if(title&&!title.querySelector('.glyph')){
      const text=title.textContent;
      title.setAttribute('aria-label',text);
      title.textContent='';
      [...text].forEach((letter,n)=>{
        if(letter===' '){title.appendChild(document.createTextNode(' '));return;}
        const outer=document.createElement('span');outer.className='glyph-outer';outer.setAttribute('aria-hidden','true');
        const inner=document.createElement('span');inner.className='glyph';inner.style.setProperty('--glyph',String(n));inner.textContent=letter;
        outer.appendChild(inner);title.appendChild(outer);
      });
    }
    const world=document.createElement('div');world.className='growth-world';world.setAttribute('aria-hidden','true');
    const orb=document.createElement('div');orb.className='growth-orb';world.appendChild(orb);
    const halo=document.createElement('div');halo.className='growth-halo';world.appendChild(halo);
    const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('viewBox','0 0 1600 900');svg.setAttribute('preserveAspectRatio','xMidYMid slice');
    svg.innerHTML='<path class="growth-stem" d="M-70 790 C205 810,218 450,489 540 C770 634,776 187,1090 276 C1325 333,1369 52,1690 0"/><path class="growth-stem alt" d="M-80 970 C354 814,344 704,665 769 C922 821,1021 560,1275 613 C1531 655,1575 440,1681 346"/>';
    world.appendChild(svg);
    for(const [j,vals] of seed.entries()){
      const [x,y,d,m,t]=vals;
      const e=document.createElement('span');e.className='growth-seed';
      e.style.setProperty('--seed-x',x+'%');e.style.setProperty('--seed-y',y+'%');
      e.style.setProperty('--diameter',d+'px');e.style.setProperty('--seed-mult',String(m));
      e.style.setProperty('--seed-travel',String(t+i*4));world.appendChild(e);
    }
    scene.prepend(world);
  }
  let y=scrollY,target=scrollY,frame=0;
  const clamp=(v,a,b)=>Math.min(b,Math.max(a,v));
  function tick(){
    target=scrollY;y+=(target-y)*.17;
    const h=innerHeight;
    let active=null,closest=1e6;
    for(const [i,scene] of projects.entries()){
      const rect=scene.getBoundingClientRect();
      if(rect.bottom< -h*.2||rect.top>h*1.4)continue;
      const t=clamp((h-rect.top)/(h+rect.height),0,1);
      const grow=clamp(t*1.7,0,1);
      const focus=Math.abs(rect.top+rect.height*.5-h*.5);
      if(focus<closest){closest=focus;active=scene;}
      scene.style.setProperty('--growth',grow.toFixed(4));
      scene.style.setProperty('--light-shift',((t-.5)*74).toFixed(2));
    }
    for(const scene of projects)scene.classList.toggle('growth-active',scene===active);
    frame=requestAnimationFrame(tick);
  }
  frame=requestAnimationFrame(tick);
  document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(frame);}else frame=requestAnimationFrame(tick)});
})();
