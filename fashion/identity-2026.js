/* Meaningful project preview layer — interactive index of the designer's actual work.
   The existing motion.js project modal remains the single source of truth. */
(() => {
 "use strict";
 const shell=document.getElementById("archive-shell");
 const preview=document.getElementById("archive-preview");
 const image=document.getElementById("archive-selected-image");
 if(!shell||!preview||!image)return;
 const rows=[...shell.querySelectorAll("[data-archive-select]")];
 const title=document.getElementById("archive-title");
 const kind=document.getElementById("archive-kind");
 const summary=document.getElementById("archive-summary");
 const top=document.getElementById("archive-top-label");
 let selected="soundcloud";
 let generation=0;
 function select(row){
   if(!row||selected===row.dataset.archiveSelect)return;
   selected=row.dataset.archiveSelect;
   const id=selected;
   rows.forEach(item=>{
      const active=item===row;
      item.classList.toggle("is-selected",active);
      if(active)item.setAttribute("aria-current","true");
      else item.removeAttribute("aria-current");
   });
   shell.style.setProperty("--archive-accent",row.dataset.accent);
   shell.style.setProperty("--archive-tone",row.dataset.tone);
   title.textContent=row.querySelector("strong")?.textContent||id;
   kind.textContent=row.dataset.kind||"";
   summary.textContent=row.dataset.summary||"";
   top.textContent=(rows.indexOf(row)+1).toString().padStart(2,"0")+" / 06 — "+title.textContent;
   preview.dataset.open=id;
   preview.setAttribute("aria-label",title.textContent+" 프로젝트 상세 보기");
   image.alt=title.textContent+" 실제 제작 포트폴리오 작업물";
   image.dataset.fallback=row.dataset.fallback;
   const target=row.dataset.art;
   if(!target)return;
   const ticket=++generation;
   preview.classList.add("is-swapping");
   const candidate=new Image();
   candidate.decoding="async";
   candidate.onload=()=>{
      if(ticket!==generation)return;
      image.src=target;
      preview.classList.remove("is-swapping");
   };
   candidate.onerror=()=>{
      if(ticket!==generation)return;
      image.src=row.dataset.fallback||target;
      preview.classList.remove("is-swapping");
   };
   candidate.src=target;
 }
 rows.forEach(row=>{
   row.addEventListener("pointerenter",()=>select(row),{passive:true});
   row.addEventListener("focus",()=>select(row),{passive:true});
 });
 image.addEventListener("error",()=>{
   const fallback=image.dataset.fallback;
   if(fallback&&!image.src.endsWith(fallback))image.src=fallback;
 });
 // Keyboard navigation changes the preview without opening a case study until Enter/Space.
 shell.querySelector(".archive-index")?.addEventListener("keydown",event=>{
   if(!["ArrowDown","ArrowUp","ArrowLeft","ArrowRight"].includes(event.key))return;
   event.preventDefault();
   const current=rows.findIndex(r=>r.dataset.archiveSelect===selected);
   const next=(current+(["ArrowDown","ArrowRight"].includes(event.key)?1:-1)+rows.length)%rows.length;
   rows[next].focus({preventScroll:true});
   select(rows[next]);
 });
})();
