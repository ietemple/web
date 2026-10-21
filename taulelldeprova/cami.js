/* Camí de la seqüència · motor comú. Dades a window.CAMI (format a _BRIEF2.md). */
(function(){
const D=window.CAMI,root=document.getElementById("cami");if(!D||!root)return;
const P=(d)=>`<svg class="ico" viewBox="0 0 24 24" aria-hidden="true">${d}</svg>`;
const I={
 spark:P('<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>'),
 eye:P('<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'),
 search:P('<circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.2-4.2"/>'),
 hand:P('<path d="M8 13V5.5a1.5 1.5 0 0 1 3 0V11M11 10V4.5a1.5 1.5 0 0 1 3 0V11M14 10.5V6a1.5 1.5 0 0 1 3 0v7c0 4-2.5 8-7 8-3 0-4.5-1.5-6-4l-1.6-2.8a1.5 1.5 0 0 1 2.6-1.5L8 14"/>'),
 cube:P('<path d="M12 3 4 7.5v9L12 21l8-4.5v-9z"/><path d="M4 7.5 12 12l8-4.5M12 12v9"/>'),
 ruler:P('<path d="M3 17 17 3l4 4L7 21z"/><path d="m7 13 2 2M10 10l2 2M13 7l2 2"/>'),
 flask:P('<path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.7 3h10.6a2 2 0 0 0 1.7-3l-5-9V3"/><path d="M7.5 15h9"/>'),
 chat:P('<path d="M4 5h16v11H9l-5 4z"/><path d="M8 10h8"/>'),
 pen:P('<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="m13.5 6.5 4 4"/>'),
 book:P('<path d="M4 5a2 2 0 0 1 2-2h13v15H6a2 2 0 0 0-2 2z"/><path d="M4 20a2 2 0 0 0 2 1h13v-3"/>'),
 link:P('<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>'),
 puzzle:P('<path d="M9 4h4v2a2 2 0 1 0 4 0V4h3v6h-2a2 2 0 1 0 0 4h2v6h-6v-2a2 2 0 1 0-4 0v2H4v-6h2a2 2 0 1 0 0-4H4V4z"/>'),
 scale:P('<path d="M12 4v16M7 20h10M5 8h14M5 8l-3 6a3 3 0 0 0 6 0zM19 8l-3 6a3 3 0 0 0 6 0z"/>'),
 chart:P('<path d="M4 20V4M4 20h16"/><path d="M8 16v-4M12 16V8M16 16v-6"/>'),
 star:P('<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9z"/>'),
 flag:P('<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>'),
 users:P('<circle cx="9" cy="8" r="3.2"/><path d="M3 20a6 6 0 0 1 12 0"/><circle cx="17" cy="9" r="2.5"/><path d="M15.5 14.2A5 5 0 0 1 21 19"/>'),
 cut:P('<circle cx="6" cy="18" r="2.5"/><circle cx="6" cy="6" r="2.5"/><path d="M8 7.5 20 17M8 16.5 20 7"/>'),
 heart:P('<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>'),
 drop:P('<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>'),
 gear:P('<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1"/>'),
 news:P('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 8h10M7 12h4M7 16h4M14 12h3v4h-3z"/>'),
 mic:P('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/>'),
 check:P('<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>'),
 map:P('<path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14M15 6v14"/>'),
 clock:P('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
 knot:P('<circle cx="8" cy="12" r="4"/><circle cx="16" cy="12" r="4"/>'),
 target:P('<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r=".8"/>'),
 blocks:P('<rect x="3" y="13" width="8" height="8" rx="1"/><rect x="13" y="13" width="8" height="8" rx="1"/><rect x="8" y="3" width="8" height="8" rx="1"/>'),
 screen:P('<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4"/>'),
 doc:P('<path d="M14 3v5h5M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8z"/><path d="M9 13h6M9 17h4"/>'),
 play:P('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M10 9.5v5l4-2.5z"/>'),
 mirror:P('<circle cx="12" cy="9" r="5"/><path d="M12 14v7M9 21h6"/>'),
 left:P('<path d="M15 6l-6 6 6 6"/>'),right:P('<path d="M9 6l6 6-6 6"/>'),back:P('<path d="M19 12H5M11 6l-6 6 6 6"/>'),
 go:P('<path d="M7 5v14l11-7z"/>'),stop:P('<rect x="7" y="7" width="10" height="10" rx="1.5"/>'),
 cal:P('<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>')
};
const F={
 activacio:{n:"Activació",g:"Desperta la pregunta",k:"var(--f-act)",p:"var(--f-act-p)",i:"spark"},
 construccio:{n:"Construcció",g:"Aprenem el que és nou",k:"var(--f-con)",p:"var(--f-con-p)",i:"blocks"},
 sintesi:{n:"Síntesi",g:"Ho lliguem i ho ordenem",k:"var(--f-sin)",p:"var(--f-sin-p)",i:"knot"},
 aplicacio:{n:"Aplicació",g:"Ho fem servir en un cas nou",k:"var(--f-apl)",p:"var(--f-apl-p)",i:"target"}
};
const EV={formativa:["check","Formativa"],observacio:["eye","Observació"],producte:["star","Producte"],auto:["mirror","Autoavaluació"],prova:["doc","Prova"]};
const LK={presentacio:"screen",fitxa:"doc",animacio:"play",lab:"flask",proposta:"book"};
const esc=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const S=D.sessions,N=S.length,ph=s=>F[s.fase]||F.construccio,phv=s=>`--k:${ph(s).k};--p:${ph(s).p}`;
const RM=matchMedia("(prefers-reduced-motion: reduce)").matches;
let sel=D.ara!=null?D.ara:0;

/* runs de fase per al ritme */
const runs=[];S.forEach((s,i)=>{const l=runs[runs.length-1];if(l&&l.f===s.fase)l.n++;else runs.push({f:s.fase,n:1,i})});
const usedEv=[...new Set(S.flatMap(s=>(s.aval||[]).map(a=>a[0])))].filter(k=>EV[k]);

root.innerHTML=
`<div class="tv-top tv-wrap"><div class="tv-glass">
  <a class="tv-back" href="${esc(D.proposta||"index.html")}">${I.back}${D.proposta?"Proposta":"Taulell"}</a>
  <span class="tv-crumb">${esc(D.crumb)}</span><span class="tv-stamp">Camí de la seqüència</span></div></div>
<main class="tv-wrap">
 <header class="tv-glass tv-head cm-head">
  <div class="tv-kicker"><span class="tv-chip"><i></i>${esc(D.crumb)}</span></div>
  <h1>${esc(D.titol)}</h1>
  ${D.pregunta?`<p class="cm-q">${esc(D.pregunta)}</p>`:""}
  <div class="cm-meta">${D.durada?`<span>${I.cal}${esc(D.durada)}</span>`:""}${D.repte?`<span>${I.flag}${esc(D.repte)}</span>`:""}</div>
  <div class="cm-legend">${Object.values(F).map(f=>`<div class="cm-ph" style="--k:${f.k};--p:${f.p}"><i>${I[f.i]}</i><span><b>${f.n}</b><small>${f.g}</small></span></div>`).join("")}</div>
  <div class="cm-rhythm" style="--n:${N}" aria-label="Ritme de la seqüència">
   <div class="cm-runs">${runs.map(r=>`<span style="grid-column:span ${r.n};--k:${F[r.f]?F[r.f].k:"#999"}">${F[r.f]?F[r.f].n:""}</span>`).join("")}</div>
   <div class="cm-cells">${S.map((s,i)=>`<button type="button" data-i="${i}" style="${phv(s)}" class="${i===D.ara?"now":""}" aria-label="Sessió ${esc(s.n)}: ${esc(s.titol)}">${esc(s.n)}</button>`).join("")}</div>
  </div>
 </header>
 <section class="cm-path-wrap" aria-label="El camí, sessió a sessió">
  <div class="cm-tools"><span class="tv-muted">Toca una sessió per veure què s'hi fa.</span>
   <button type="button" class="tv-btn" id="cmPlay">${I.go}<span>Recorre el camí</span></button></div>
  <div class="cm-path" id="cmPath"><svg id="cmSvg" aria-hidden="true"></svg>
   ${S.map((s,i)=>`<button type="button" class="cm-node" data-i="${i}" style="${phv(s)}" aria-pressed="false">
     <span class="cm-dot">${I[s.icona]||I[ph(s).i]}<span class="cm-num">${esc(s.n)}</span></span>
     <span class="cm-txt"><b>${esc(s.titol)}</b><small>${esc(s.quan||"")}</small>
     <span class="cm-ev">${(s.aval||[]).map(a=>EV[a[0]]?`<span title="${esc(EV[a[0]][1])}: ${esc(a[1])}">${I[EV[a[0]][0]]}</span>`:"").join("")}</span></span></button>`).join("")}
   ${D.ara!=null&&S[D.ara]?`<div class="cm-pin" id="cmPin"><span>Som aquí</span></div>`:""}
   <div class="cm-flag" id="cmFlag" title="${esc(D.repte||"Final")}">${I.flag}</div>
  </div>
  ${usedEv.length?`<div class="cm-ilegend"><b style="color:var(--tinta)">Avaluació al camí:</b>${usedEv.map(k=>`<span>${I[EV[k][0]]}${EV[k][1]}</span>`).join("")}</div>`:""}
 </section>
 <article class="cm-detail" id="cmDetail" aria-live="polite"></article>
</main>
<footer class="tv-foot">Institut Escola El Temple, Tortosa. Mostra amb dades d'exemple. No hi ha cap nom d'alumne; els docents apareixen pel seu rol.</footer>`;

const path=document.getElementById("cmPath"),svg=document.getElementById("cmSvg"),nodes=[...path.querySelectorAll(".cm-node")];
let pts=[],segs=[];
function layout(){
  const W=path.clientWidth,vert=W<620;path.classList.toggle("v",vert);
  pts=[];
  if(vert){const H=128;S.forEach((s,i)=>pts.push([58,70+i*H]));path.style.height=(70+(N-1)*H+90)+"px"}
  else{const max=Math.max(2,Math.floor(W/178)),rows=Math.ceil(N/max),cols=Math.ceil(N/rows),w=W/cols,H=232;
    S.forEach((s,i)=>{const r=Math.floor(i/cols);let c=i%cols;if(r%2)c=cols-1-c;pts.push([(c+.5)*w,92+r*H])});
    path.style.height=(92+(rows-1)*H+168)+"px";path.dataset.w=w}
  nodes.forEach((n,i)=>{n.style.left=pts[i][0]+"px";n.style.top=pts[i][1]+"px";
    if(!vert){n.style.width=Math.min(170,+path.dataset.w-12)+"px";n.style.right=""}else{n.style.width=""}});
  /* segments */
  const w=+path.dataset.w||120;let d="";segs=[];
  for(let i=0;i<N-1;i++){const [x1,y1]=pts[i],[x2,y2]=pts[i+1];let s;
    if(vert||Math.abs(y1-y2)<1)s=`M${x1} ${y1}L${x2} ${y2}`;
    else{const dir=x1>W/2?1:-1,b=dir*w*.5;s=`M${x1} ${y1}C${x1+b} ${y1} ${x2+b} ${y2} ${x2} ${y2}`}
    segs.push(s)}
  const last=pts[N-1],prev=pts[N-2]||[last[0]-1,last[1]];
  let fx,fy;if(vert){fx=last[0];fy=last[1]+74}else{const dx=Math.sign(last[0]-prev[0])||1;fx=Math.min(W-26,Math.max(26,last[0]+dx*(w*.5-6)));fy=last[1];if(Math.abs(fx-last[0])<50){fx=last[0];fy=last[1]-70}}
  segs.push(`M${last[0]} ${last[1]}L${fx} ${fy}`);
  const sx=vert?pts[0][0]:Math.max(24,pts[0][0]-(w*.5-6)),sy=vert?pts[0][1]-60:pts[0][1];
  segs.unshift(`M${sx} ${sy}L${pts[0][0]} ${pts[0][1]}`);
  svg.setAttribute("viewBox",`0 0 ${W} ${path.clientHeight}`);
  svg.innerHTML=`<path class="cm-track" d="${segs.join("")}"/>`+segs.map((s,i)=>{const so=S[Math.min(N-1,i)];return `<path class="cm-seg" data-s="${i}" d="${s}" style="--k:${ph(so).k}"/>`}).join("");
  const fl=document.getElementById("cmFlag");fl.style.left=fx+"px";fl.style.top=fy+"px";
  const pin=document.getElementById("cmPin");if(pin){const p=pts[D.ara];pin.style.left=(vert?p[0]+2:p[0])+"px";pin.style.top=(p[1]-54)+"px";pin.style.display=vert?"none":""}
  let st=path.querySelector(".cm-start");if(!st){st=document.createElement("span");st.className="cm-start";path.appendChild(st)}
  st.textContent="Inici";st.style.left=sx+"px";st.style.top=(vert?sy-10:sy+26)+"px";
}
function detail(){
  const s=S[sel],f=ph(s),el=document.getElementById("cmDetail");el.setAttribute("style",phv(s));
  el.innerHTML=`<div class="cm-dtop"><span class="cm-phase"><i>${I[f.i]}</i>${f.n}</span>
   <div class="cm-nav"><button type="button" data-step="-1" aria-label="Sessió anterior" ${sel?"":"disabled"}>${I.left}</button><button type="button" data-step="1" aria-label="Sessió següent" ${sel<N-1?"":"disabled"}>${I.right}</button></div></div>
   <h2>Sessió ${esc(s.n)} · ${esc(s.titol)}</h2><div class="cm-when">${esc(s.quan||"")}${sel===D.ara?" · <b>som aquí</b>":""}</div>
   ${s.fem?`<p class="cm-fem">${esc(s.fem)}</p>`:""}
   <div class="cm-cols"><ul class="cm-items">${(s.items||[]).map(t=>`<li>${esc(t)}</li>`).join("")}</ul>
   <div>${(s.aval||[]).length?`<p class="cm-sub">Avaluació</p><div class="cm-evl">${s.aval.map(a=>`<span>${I[(EV[a[0]]||EV.formativa)[0]]}${esc(a[1])}</span>`).join("")}</div>`:""}
   ${(s.links||[]).length?`<p class="cm-sub">Materials</p><div class="cm-links">${s.links.map(l=>`<a class="tv-btn${l[0]==="presentacio"?" main":""}" href="${esc(l[2])}">${I[LK[l[0]]]||I.doc}${esc(l[1])}</a>`).join("")}</div>`:""}</div></div>`;
  nodes.forEach((n,i)=>n.setAttribute("aria-pressed",i===sel));
  root.querySelectorAll(".cm-cells button").forEach((b,i)=>b.setAttribute("aria-current",i===sel));
}
function pick(i,scroll){sel=Math.max(0,Math.min(N-1,i));detail();
  if(scroll&&path.classList.contains("v"))document.getElementById("cmDetail").scrollIntoView({behavior:RM?"auto":"smooth",block:"nearest"})}
root.addEventListener("click",e=>{const b=e.target.closest("[data-i]");if(b){stopPlay();pick(+b.dataset.i,true);return}
  const st=e.target.closest("[data-step]");if(st){stopPlay();pick(sel+ +st.dataset.step)}});
document.addEventListener("keydown",e=>{if(e.target.closest("textarea,input"))return;if(e.key==="ArrowRight")pick(sel+1);if(e.key==="ArrowLeft")pick(sel-1)});

/* recorregut animat */
let timer=null;const pb=document.getElementById("cmPlay");
function stopPlay(){if(!timer)return;clearInterval(timer);timer=null;pb.innerHTML=`${I.go}<span>Recorre el camí</span>`;
  nodes.forEach(n=>n.classList.remove("dim"));svg.querySelectorAll(".cm-seg").forEach(p=>{p.style.strokeDasharray="";p.style.strokeDashoffset="";p.style.transition=""})}
function grow(k){const p=svg.querySelector(`.cm-seg[data-s="${k}"]`);if(!p)return;const L=p.getTotalLength();
  p.style.transition="none";p.style.strokeDasharray=L;p.style.strokeDashoffset=L;p.getBoundingClientRect();
  p.style.transition=RM?"none":"stroke-dashoffset .9s ease";p.style.strokeDashoffset=0}
pb.addEventListener("click",()=>{if(timer){stopPlay();return}
  pb.innerHTML=`${I.stop}<span>Atura</span>`;
  svg.querySelectorAll(".cm-seg").forEach(p=>{const L=p.getTotalLength();p.style.transition="none";p.style.strokeDasharray=L;p.style.strokeDashoffset=L});
  nodes.forEach(n=>n.classList.add("dim"));let k=0;
  const tick=()=>{if(k>=N){grow(N);setTimeout(stopPlay,1400);clearInterval(timer);return}
    grow(k);nodes[k].classList.remove("dim");pick(k);k++};
  tick();timer=setInterval(tick,RM?1600:2200)});

let rt;addEventListener("resize",()=>{clearTimeout(rt);rt=setTimeout(layout,120)});
layout();detail();
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(layout);
})();
