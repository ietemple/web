/* Temple Vidre · esquelet comú de les propostes de Joves.
   <div id="sa-esquelet" data-sa="gih"></div> … <script src="sa-dades.js"></script><script src="sa-esquelet.js" defer></script>
   Totes les matèries mostren els mateixos blocs i en el mateix ordre:
   repte i producte · seqüència en quatre fases · avaluació (inicial, formativa, final) · diversitat · per a l'aula. */
(function(){
"use strict";
var host=document.getElementById("sa-esquelet");
if(!host||!window.SA_DADES)return;
var css=".sae{margin:22px 0;display:grid;gap:14px}"+
".sae-card{background:var(--glass,#fff);border:1px solid var(--vidre-vora,#E2D9C8);border-radius:var(--r-lg,16px);padding:clamp(16px,2.4vw,26px);box-shadow:var(--ombra-16,0 8px 24px rgba(0,0,0,.06))}"+
".sae-kick{font:700 12px/1.2 var(--font-text,system-ui);letter-spacing:.14em;text-transform:uppercase;color:var(--k);margin:0 0 4px}"+
".sae h2{margin:0 0 4px;font-size:clamp(22px,2.4vw,30px);line-height:1.15}"+
".sae-sub{margin:0;color:var(--tinta-suau,#5B554B)}"+
".sae-nav{display:flex;flex-wrap:wrap;gap:6px;margin-top:12px}"+
".sae-nav a{font-size:14px;font-weight:600;padding:5px 11px;border-radius:999px;background:var(--kp);color:var(--k);text-decoration:none}"+
".sae-two{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr));gap:12px;margin-top:14px}"+
".sae-box{border-radius:12px;padding:12px 14px;background:var(--kp)}"+
".sae-box b{display:block;font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:var(--k);margin-bottom:4px}"+
".sae-box p{margin:0}"+
".sae h3{margin:0 0 10px;font-size:18px;display:flex;align-items:center;gap:8px}"+
".sae h3 i{font-style:normal;width:26px;height:26px;border-radius:50%;background:var(--k);color:#fff;font-size:13px;display:grid;place-items:center}"+
".sae-fases{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}"+
".sae-f{border-top:5px solid var(--k);border-radius:10px;background:rgba(255,255,255,.6);padding:10px 12px;display:grid;gap:8px;align-content:start}"+
".sae-f>b{font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:var(--k)}"+
".sae-s{display:grid;gap:2px;font-size:15px;line-height:1.3}"+
".sae-s span{font-size:12.5px;color:var(--tinta-suau,#5B554B)}"+
".sae-f em{font-size:13px;color:var(--tinta-suau,#8B8478)}"+
".sae-av{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}"+
".sae-av>div{border:1px solid var(--vidre-vora,#E2D9C8);border-radius:10px;padding:10px 12px;background:rgba(255,255,255,.6)}"+
".sae-av b{display:block;font-size:13px;letter-spacing:.06em;text-transform:uppercase;color:var(--k);margin-bottom:4px}"+
".sae-av ul{margin:0;padding-left:18px}.sae-av p{margin:0}"+
".sae-meta{margin:10px 0 0;font-size:15px}.sae-meta b{color:var(--k)}"+
".sae-aula{display:flex;flex-wrap:wrap;gap:10px;margin-top:4px}"+
".sae .sae-aula a{display:inline-flex;align-items:center;gap:6px;min-height:44px;padding:0 16px;border-radius:999px;border:1px solid var(--vidre-vora,#D6CDBB);background:#fff;color:inherit;font-weight:600;text-decoration:none}"+
".sae .sae-aula a.main{background:var(--k);border-color:var(--k);color:#fff}"+
".sae-note{margin:10px 0 0;font-size:14.5px;color:var(--tinta-suau,#5B554B)}"+
".sae-v{display:inline-flex;gap:4px;margin-left:6px}.sae-v span{font-size:12px;font-weight:700;padding:2px 7px;border-radius:6px;background:var(--kp);color:var(--k)}"+
"@media (max-width:760px){.sae-fases{grid-template-columns:1fr 1fr}.sae-av{grid-template-columns:1fr}}"+
"@media (max-width:420px){.sae-fases{grid-template-columns:1fr}}"+
"@media print{.sae-aula,.sae-nav{display:none}}";
var st=document.createElement("style");st.textContent=css;document.head.appendChild(st);
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
var FASES=["ini","des","est","apl"];
function render(key){var D=window.SA_DADES[key];if(!D)return"";var ES=D.lang==="es";
  var L=ES?{k:"Estructura común de la situación de aprendizaje",ses:"sesiones",salta:"Salta a",rep:"Reto",prod:"Producto final",seq:"Secuencia didáctica",
    ph:{ini:"Inicial",des:"Desarrollo",est:"Estructuración",apl:"Aplicación"},none:"Integrada en las otras sesiones",diap:"Diap.",aval:"Evaluación",
    ini:"Inicial",form:"Formativa",fin:"Final",inst:"Instrumentos",crit:"Criterios (Decreto 175/2022)",meta:"La metacognición de cada ficha no puntúa: sirve para que el alumnado mire cómo aprende.",
    div:"Diversidad",ver:"Versiones",aula:"Para el aula",pres:"Presentación con vista docente",fx:"Ficha",cami:"Camino",
    note:"En la presentación, el panel lateral muestra en cada diapositiva qué hace el alumnado en su ficha (con la parte de la ficha resaltada) y permite comentar lo que cambiarías. Tecla D o «Modo aula» para proyectar sin panel."}
   :{k:"Estructura comuna de la situació d'aprenentatge",ses:"sessions",salta:"Salta a",rep:"Repte",prod:"Producte final",seq:"Seqüència didàctica",
    ph:{ini:"Inicial",des:"Desenvolupament",est:"Estructuració",apl:"Aplicació"},none:"Integrada a les altres sessions",diap:"Diap.",aval:"Avaluació",
    ini:"Inicial",form:"Formativa",fin:"Final",inst:"Instruments",crit:"Criteris (Decret 175/2022)",meta:"La metacognició de cada fitxa no puntua: serveix perquè l'alumne miri com aprèn.",
    div:"Diversitat",ver:"Versions",aula:"Per a l'aula",pres:"Presentació amb vista docent",fx:"Fitxa",cami:"Camí",
    note:"A la presentació, el panell lateral mostra a cada diapositiva què fa l'alumne a la fitxa (amb la part de la fitxa ressaltada) i deixa comentar què hi canviaries. Tecla D o «Mode aula» per projectar sense panell."};
  var fx=D.fitxa.replace("{v}","B").replace("#B","");
  var h='<div class="sae" style="--k:'+D.k+';--kp:'+D.kp+'">'+
   '<div class="sae-card"><p class="sae-kick">'+L.k+'</p><h2>'+esc(D.mat)+' · '+esc(D.titol)+'</h2>'+
   '<p class="sae-sub">'+esc(D.curs)+' · '+D.sessions.length+' '+L.ses+'</p>'+
   (D.salta&&D.salta.length?'<nav class="sae-nav" aria-label="'+L.salta+'">'+D.salta.map(function(s){return '<a href="#'+s[0]+'">'+esc(s[1])+'</a>'}).join("")+'</nav>':"")+
   '<div class="sae-two"><div class="sae-box"><b>'+L.rep+'</b><p>'+esc(D.repte)+'</p></div><div class="sae-box"><b>'+L.prod+'</b><p>'+esc(D.producte)+'</p></div></div></div>'+
   '<div class="sae-card"><h3><i>1</i>'+L.seq+'</h3><div class="sae-fases">'+FASES.map(function(f){
     var ss=D.sessions.filter(function(s){return s.f===f});
     return '<div class="sae-f"><b>'+L.ph[f]+'</b>'+(ss.length?ss.map(function(s){
       return '<div class="sae-s"><strong>S'+s.n+' · '+esc(s.t)+'</strong><span>'+(s.sl?L.diap+' '+s.sl+' · ':"")+esc(s.ex)+'</span></div>'}).join(""):'<em>'+L.none+'</em>')+'</div>'}).join("")+'</div></div>'+
   '<div class="sae-card"><h3><i>2</i>'+L.aval+'</h3><div class="sae-av">'+
   '<div><b>'+L.ini+'</b><p>'+esc(D.aval.ini)+'</p></div>'+
   '<div><b>'+L.form+'</b><ul>'+D.aval.form.map(function(x){return '<li>'+esc(x)+'</li>'}).join("")+'</ul></div>'+
   '<div><b>'+L.fin+'</b><p>'+esc(D.aval.fin)+'</p></div></div>'+
   '<p class="sae-meta"><b>'+L.inst+':</b> '+esc(D.aval.inst)+'</p>'+
   '<p class="sae-meta"><b>'+L.crit+':</b> '+esc(D.aval.crit)+'</p>'+
   '<p class="sae-meta">'+L.meta+'</p></div>'+
   '<div class="sae-card"><h3><i>3</i>'+L.div+'<span class="sae-v">'+D.versions.map(function(v){return '<span>'+v+'</span>'}).join("")+'</span></h3><p style="margin:0">'+esc(D.div)+'</p></div>'+
   '<div class="sae-card"><h3><i>4</i>'+L.aula+'</h3><div class="sae-aula">'+
   '<a class="main" href="'+esc(D.pres)+'">▶ '+L.pres+'</a><a href="'+esc(fx)+'">'+L.fx+'</a><a href="'+esc(D.cami)+'">'+L.cami+'</a></div>'+
   '<p class="sae-note">'+L.note+'</p></div></div>';
  return h}
host.innerHTML=(host.dataset.sa||"").split(",").map(function(k){return render(k.trim())}).join("");
})();
