/* Temple Vidre · vista docent de les presentacions.
   <script src="sa-dades.js"></script><script src="sa-docent.js" data-sa="gih" defer></script>
   - Panell lateral: diapositiva, sessió i fase, què fa l'alumne i la part de la fitxa (iframe reduït i ressaltat).
   - Demo de comentari: «Comentar» + clic a un element de la diapositiva → pin numerat i llista al panell.
   - Mode aula (tecla D o ?aula): l'alumnat només veu la presentació. */
(function(){
"use strict";
var me=document.currentScript,key=me&&me.dataset.sa,D=window.SA_DADES&&window.SA_DADES[key];
if(!D)return;
var ES=D.lang==="es";
var T=ES?{vd:"Vista docente",com:"💬 Comentar",aula:"Modo aula",ob:"Abrir ficha ↗",diap:"Diapositiva",ses:"Sesión",fa:"Lo que hace el alumnado en su ficha",
  fx:"La ficha en este momento",none:"Ficha cerrada: este momento es oral.",lc:"Comentarios para cambiar",nc:"Aún no hay ninguno.",
  pop:"¿Qué cambiarías de aquí?",ok:"Guardar",no:"Cancelar",ft:"El alumnado no ve este panel: tecla <kbd>D</kbd> o «Modo aula».",fab:"Vista docente",
  toast:"<b>Demo para docentes.</b> ¿Algo de la presentación no te convence? Pulsa <b>💬 Comentar</b> y después el elemento de la diapositiva: queda marcado con un número y en la lista del panel. (Solo se guarda en este navegador.)",
  ph:{ini:"Inicial",des:"Desarrollo",est:"Estructuración",apl:"Aplicación"},el:"elemento",img:"imagen"}
 :{vd:"Vista docent",com:"💬 Comentar",aula:"Mode aula",ob:"Obre la fitxa ↗",diap:"Diapositiva",ses:"Sessió",fa:"Què fa l'alumne a la fitxa",
  fx:"La fitxa en aquest moment",none:"Fitxa tancada: aquest moment és oral.",lc:"Comentaris per canviar",nc:"Encara no n'hi ha cap.",
  pop:"Què hi canviaries?",ok:"Desa",no:"Cancel·la",ft:"L'alumnat no veu aquest panell: tecla <kbd>D</kbd> o «Mode aula».",fab:"Vista docent",
  toast:"<b>Demo per a docents.</b> Alguna cosa de la presentació no et convenç? Toca <b>💬 Comentar</b> i després l'element de la diapositiva: queda marcat amb un número i a la llista del panell. (Només es desa en aquest navegador.)",
  ph:{ini:"Inicial",des:"Desenvolupament",est:"Estructuració",apl:"Aplicació"},el:"element",img:"imatge"};
var H=document.documentElement,slides=[].slice.call(document.querySelectorAll(".sl,.pr-slide")),N=slides.length;
var store={get:function(k,d){try{var v=localStorage.getItem(k);return v===null?d:JSON.parse(v)}catch(e){return d}},
  set:function(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
var ver=store.get("sa-ver-"+key,D.versions.indexOf("B")>=0?"B":D.versions[0]);
if(D.versions.indexOf(ver)<0)ver=D.versions[0];
var coms=store.get("sa-com-"+key,[]);
var forceAula=/[?&]aula\b/.test(location.search);
var open=!forceAula&&store.get("sa-open",true);
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}

/* ---------- panell ---------- */
var rail=document.createElement("aside");rail.className="sa-rail";rail.setAttribute("aria-label",T.vd);
rail.style.setProperty("--k",D.k);rail.style.setProperty("--kp",D.kp);
rail.innerHTML='<div class="sa-hd"><div><small>'+T.vd+' · '+esc(D.mat)+' · '+esc(D.curs)+'</small><b>'+esc(D.titol)+'</b></div>'+
  '<div class="sa-tools"><button type="button" data-a="com" aria-pressed="false">'+T.com+'</button><button type="button" data-a="aula">'+T.aula+'</button>'+
  '<a href="'+esc(D.proposta)+'">'+(ES?"Propuesta":"Proposta")+'</a></div></div>'+
  '<div class="sa-body"><div class="sa-pos"></div><div class="sa-fa"><small>'+T.fa+'</small><p></p></div>'+
  '<div class="sa-fx"><div class="sa-fx-hd"><small>'+T.fx+'</small><div class="sa-vers">'+
  D.versions.map(function(v){return '<button type="button" data-v="'+v+'">'+v+'</button>'}).join("")+'</div></div>'+
  '<a class="sa-win" target="_blank" rel="noopener"><iframe tabindex="-1" aria-hidden="true" title=""></iframe><em hidden>'+T.none+'</em></a>'+
  '<a class="sa-open" target="_blank" rel="noopener">'+T.ob+'</a></div>'+
  '<div class="sa-com"><h3>'+T.lc+'</h3><ol></ol></div></div>'+
  '<div class="sa-ft">'+T.ft+'</div>';
var fab=document.createElement("button");fab.type="button";fab.className="sa-fab";fab.textContent="📋 "+T.fab;
H.appendChild(rail);H.appendChild(fab);
var $=function(s){return rail.querySelector(s)},ifr=$("iframe"),win=$(".sa-win"),none=$(".sa-win em");

/* La presentació es redueix sencera (transform) per deixar lloc al panell: les mides en vw no canvien i res no es desquadra. */
function layout(){
  var W=innerWidth,Hh=innerHeight,narrow=W<900;
  H.classList.toggle("sa-drawer",narrow);
  var on=open&&!narrow;H.classList.toggle("sa-on",on);H.classList.toggle("sa-aula",!open);
  var b=document.body.style;
  if(on){var rw=Math.round(Math.min(400,Math.max(300,W*.26))),s=(W-rw)/W;
    H.style.setProperty("--sa-rw",rw+"px");b.transform="scale("+s+")";b.width=W+"px";b.height=(Hh/s)+"px"}
  else{H.style.removeProperty("--sa-rw");b.transform=b.width=b.height=""}
  var rwPx=rail.offsetWidth||360,k=(rwPx-30)/820,wh=Math.round(Math.max(220,Math.min(440,Hh*.44)));
  rail.style.setProperty("--sa-wh",wh+"px");
  ifr.style.transform="scale("+k+")";ifr.style.height=Math.round(wh/k)+"px";
}
function setOpen(v,save){open=v;if(save)store.set("sa-open",v);
  if(innerWidth<900)H.classList.toggle("sa-open-d",v);layout()}
fab.onclick=function(){setOpen(true,true)};
$('[data-a="aula"]').onclick=function(){setOpen(false,true);H.classList.remove("sa-open-d")};
document.addEventListener("keydown",function(e){
  if(e.target.closest&&e.target.closest("input,textarea,select,[contenteditable]"))return;
  if(e.key==="d"||e.key==="D"){setOpen(!(open&&(innerWidth>=900||H.classList.contains("sa-open-d"))),true)}
  if(e.key==="Escape"&&cm)setCm(false)});
addEventListener("resize",layout);

/* ---------- diapositiva actual ---------- */
function range(s){var m=String(s||"").split(/[–-]/);return[+m[0],+(m[1]||m[0])]}
function sessio(n){
  for(var i=0;i<D.sessions.length;i++){var r=D.sessions[i].sl&&range(D.sessions[i].sl);if(r&&n>=r[0]&&n<=r[1])return D.sessions[i]}
  return D.sessions.filter(function(s){return s.n===D.presSessio})[0]||null}
var cur=-1;
/* al mòbil algunes presentacions apilen les diapositives: llavors mana la que és al mig de la pantalla */
function stacked(){return N>1&&getComputedStyle(slides[1]).position!=="absolute"&&slides[1].offsetHeight>0}
function current(){
  if(stacked()){var mid=innerHeight/2,best=0,bd=1e9;
    for(var j=0;j<N;j++){var r=slides[j].getBoundingClientRect(),dd=r.top<=mid&&r.bottom>=mid?0:Math.min(Math.abs(r.top-mid),Math.abs(r.bottom-mid));if(dd<bd){bd=dd;best=j}}
    return best}
  for(var i=0;i<N;i++)if(slides[i].classList.contains("on"))return i;return 0}
var tick=0;addEventListener("scroll",function(){if(tick)return;tick=setTimeout(function(){tick=0;update()},150)},true);
function update(){var i=current();if(i===cur)return;cur=i;var n=i+1,d=D.slides[n]||{ex:0,fa:""},s=sessio(n);
  $(".sa-pos").innerHTML='<span>'+T.diap+' '+n+'/'+N+'</span>'+(s?'<span>'+T.ses+' '+s.n+'</span><span class="f">'+T.ph[s.f]+'</span>':"");
  $(".sa-fa p").textContent=d.fa||"—";
  point();}
new MutationObserver(update).observe(document.body,{subtree:true,attributes:true,attributeFilter:["class"]});

/* ---------- fitxa ---------- */
function fitxaUrl(v){return D.fitxa.replace("{v}",v)}
function loadFitxa(){var u=fitxaUrl(ver);
  /* el query força la recàrrega quan només canvia el hash de la versió */
  ifr.src=u.indexOf("#")>=0?u.replace("#","?sa="+ver+"#"):u;
  win.href=u;$(".sa-open").href=u;
  [].forEach.call(rail.querySelectorAll(".sa-vers button"),function(b){b.setAttribute("aria-pressed",b.dataset.v===ver)})}
rail.querySelector(".sa-vers").onclick=function(e){var b=e.target.closest("button");if(!b)return;ver=b.dataset.v;store.set("sa-ver-"+key,ver);loadFitxa()};
function target(doc,ex){
  if(typeof ex==="string"&&ex.charAt(0)===".")return doc.querySelector(ex);
  var box=doc.getElementById("v-"+ver)||doc;
  if(ex==="obj"||ex==="meta")return box.querySelector("."+ex)||doc.querySelector("."+ex);
  if(key==="bio"){var sn=doc.querySelector(".snum.n"+ex);if(!sn)return null;var h=sn.closest(".section-header")||sn,p=h.parentElement;
    return p&&p!==doc.body&&p.offsetHeight<1500?p:h}
  if(!ex)return null;
  var hs=box.querySelectorAll(".ex h2 b");
  for(var i=0;i<hs.length;i++)if(hs[i].textContent.trim()===String(ex))return hs[i].closest(".ex");
  return null}
function point(){var d=D.slides[cur+1]||{ex:0};var doc;
  try{doc=ifr.contentDocument}catch(e){return}
  if(!doc||!doc.body)return;
  if(!doc.getElementById("sa-hl-css")){var st=doc.createElement("style");st.id="sa-hl-css";
    st.textContent=".sa-hl{outline:5px solid #E8A33D!important;outline-offset:6px;border-radius:6px;box-shadow:0 0 0 6000px rgba(30,28,24,.30)!important;position:relative;z-index:5}html{scroll-behavior:auto!important}";
    doc.head.appendChild(st)}
  [].forEach.call(doc.querySelectorAll(".sa-hl"),function(x){x.classList.remove("sa-hl")});
  var el=target(doc,d.ex);
  if(!el){none.hidden=false;return}
  none.hidden=true;el.classList.add("sa-hl");
  var w=ifr.contentWindow,y=el.getBoundingClientRect().top+w.scrollY-110;w.scrollTo(0,Math.max(0,y))}
/* a la miniatura sobren les barres fixes de la fitxa (versions, imprimir) */
ifr.addEventListener("load",function(){setTimeout(function(){
  try{var dw=ifr.contentWindow;[].forEach.call(ifr.contentDocument.querySelectorAll("body *"),function(x){
    if(/fixed|sticky/.test(dw.getComputedStyle(x).position))x.style.setProperty("display","none","important")})}catch(e){}
  point()},120)});

/* ---------- comentaris (demo) ---------- */
var cm=false,hov=null,pop=null;
var cmBtn=$('[data-a="com"]');
function setCm(v){cm=v;H.classList.toggle("sa-cm",v);cmBtn.setAttribute("aria-pressed",v);if(!v){unhov();closePop()}}
cmBtn.onclick=function(){setCm(!cm)};
function unhov(){if(hov)hov.classList.remove("sa-hov");hov=null}
function slideOf(el){return el&&el.closest&&el.closest(".sl,.pr-slide")}
document.addEventListener("mouseover",function(e){if(!cm||pop)return;var s=slideOf(e.target);unhov();
  if(s&&e.target!==s){hov=e.target;hov.classList.add("sa-hov")}},true);
function label(el){if(el.tagName==="IMG")return T.img+(el.alt?" «"+el.alt.slice(0,40)+"»":"");
  var t=(el.textContent||"").replace(/\s+/g," ").trim();return t?"«"+(t.length>48?t.slice(0,46)+"…":t)+"»":T.el}
document.addEventListener("click",function(e){
  if(!cm||(pop&&pop.contains(e.target)))return;var s=slideOf(e.target);if(!s)return;
  e.preventDefault();e.stopPropagation();
  var r=s.getBoundingClientRect(),x=(e.clientX-r.left)/r.width*100,y=(e.clientY-r.top)/r.height*100;
  openPop(e.clientX,e.clientY,{s:slides.indexOf(s)+1,x:+x.toFixed(1),y:+y.toFixed(1),w:label(e.target)})},true);
function openPop(cx,cy,c){closePop();
  pop=document.createElement("div");pop.className="sa-pop";
  pop.innerHTML='<small>'+T.diap+' '+c.s+' · '+esc(c.w)+'</small><textarea aria-label="'+T.pop+'" placeholder="'+T.pop+'"></textarea><div><button type="button">'+T.no+'</button><button type="button" class="ok">'+T.ok+'</button></div>';
  H.appendChild(pop);
  pop.style.left=Math.max(8,Math.min(innerWidth-296,cx+12))+"px";pop.style.top=Math.max(8,Math.min(innerHeight-200,cy+12))+"px";
  pop.addEventListener("keydown",function(e){e.stopPropagation();if(e.key==="Escape")closePop()});
  var ta=pop.querySelector("textarea");ta.focus();
  pop.querySelector("button").onclick=closePop;
  pop.querySelector(".ok").onclick=function(){var t=ta.value.trim();if(!t){ta.focus();return}
    c.t=t;coms.push(c);store.set("sa-com-"+key,coms);closePop();unhov();pins();list()}}
function closePop(){if(pop){pop.remove();pop=null}}
function pins(){[].forEach.call(document.querySelectorAll(".sa-pin"),function(p){p.remove()});
  coms.forEach(function(c,k){var s=slides[c.s-1];if(!s)return;
    if(getComputedStyle(s).position==="static")s.style.position="relative";
    var p=document.createElement("span");p.className="sa-pin";p.textContent=k+1;p.style.left=c.x+"%";p.style.top=c.y+"%";s.appendChild(p)})}
function list(){var ol=$(".sa-com ol");
  if(!coms.length){ol.innerHTML='<p>'+T.nc+'</p>';return}
  ol.innerHTML=coms.map(function(c,k){return '<li><i>'+(k+1)+'</i><button type="button" data-go="'+c.s+'">'+T.diap+' '+c.s+' · '+esc(c.t)+'<q>'+esc(c.w)+'</q></button><button type="button" class="x" data-del="'+k+'" aria-label="×">×</button></li>'}).join("")}
$(".sa-com ol").onclick=function(e){var g=e.target.closest("[data-go]"),x=e.target.closest("[data-del]");
  if(x){coms.splice(+x.dataset.del,1);store.set("sa-com-"+key,coms);pins();list();return}
  if(g){var dot=document.querySelectorAll("#dots button")[+g.dataset.go-1];if(dot)dot.click()}};

/* ---------- avís inicial ---------- */
function toast(){var seen=false;try{seen=sessionStorage.getItem("sa-toast")==="1"}catch(e){}
  if(seen||forceAula)return;
  var t=document.createElement("div");t.className="sa-toast";t.setAttribute("role","status");
  t.innerHTML=T.toast+'<button type="button" aria-label="×">×</button>';H.appendChild(t);
  function bye(){t.remove();try{sessionStorage.setItem("sa-toast","1")}catch(e){}}
  t.querySelector("button").onclick=bye;cmBtn.addEventListener("click",bye,{once:true});setTimeout(bye,14000)}

if(forceAula)H.classList.add("sa-aula");
layout();loadFitxa();update();pins();list();toast();
})();
