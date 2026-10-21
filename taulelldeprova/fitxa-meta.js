/* Injecta l'objectiu d'aprenentatge (pàgina 1) i la metacognició (pàgina indicada) a cada versió */
(function(){
"use strict";
var C=window.FX_META;if(!C)return;
var ico='<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.4"/></svg>';
var bulb='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/></svg>';
Object.keys(C.v).forEach(function(k){
  var s=document.getElementById("v-"+k),d=C.v[k];if(!s)return;
  var pgs=s.querySelectorAll(".pg"),who=pgs[0].querySelector(".who");
  var o=document.createElement("div");o.className="obj";
  o.innerHTML=ico+'<div><b>'+C.objT+'</b>'+d.obj+'<small>'+d.ok+'</small></div>';
  who.after(o);
  var p=pgs[d.pg==null?pgs.length-1:d.pg],m=document.createElement("div");m.className="meta";
  var sem=d.ticks?'<div class="sem"><b style="font-weight:600">'+d.semL+'</b>'+d.ticks.map(function(t){return '<span><i class="bx"></i>'+t+'</span>'}).join("")+'</div>'
    :'<div class="sem"><b style="font-weight:600">'+d.semL+'</b><span><i class="g"></i>'+C.sem[0]+'</span><span><i class="y"></i>'+C.sem[1]+'</span><span><i class="rr"></i>'+C.sem[2]+'</span></div>';
  m.innerHTML='<h2>'+bulb+C.metaT+'</h2>'+sem+'<div class="q">'+d.q.map(function(q){return '<span>'+q+'</span><div class="ln"></div>'}).join("")+'</div>';
  p.insertBefore(m,p.querySelector(".pg-foot"));
});
})();
