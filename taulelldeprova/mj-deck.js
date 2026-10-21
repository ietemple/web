/* Peces comunes de les dues presentacions: navegació, safates del món, paraules amb veu, semàfor */
window.MJD = (function(){
"use strict";
var $=function(s,r){return (r||document).querySelector(s)};
var $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
function ic(id){return '<svg class="pr-ico" aria-hidden="true"><use href="#i-'+id+'"/></svg>'}
function shuffle(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=a[i];a[i]=a[j];a[j]=t}return a}

function nav(){
  var mobile=window.matchMedia("(max-width:760px)");
  var slides=$$(".pr-slide"),cur=0,N=slides.length;
  $("#dots").innerHTML=slides.map(function(_,i){return '<button aria-label="Diapositiva '+(i+1)+'"></button>'}).join("");
  var dots=$$("#dots button");
  function go(i){
    i=Math.max(0,Math.min(N-1,i));
    slides.forEach(function(s,j){s.classList.toggle("on",j===i);s.classList.toggle("back",j<i);s.setAttribute("aria-hidden",mobile.matches?"false":String(j!==i));s.inert=!mobile.matches&&j!==i});
    dots.forEach(function(d,j){if(j===i)d.setAttribute("aria-current","step");else d.removeAttribute("aria-current");if(j<=i)d.classList.add("seen")});
    cur=i;$("#count").textContent=(i+1)+" / "+N;$("#prev").disabled=i===0;$("#next").disabled=i===N-1;
    try{speechSynthesis.cancel()}catch(e){}
  }
  dots.forEach(function(d,j){d.addEventListener("click",function(){go(j)})});
  $("#prev").addEventListener("click",function(){go(cur-1)});
  $("#next").addEventListener("click",function(){go(cur+1)});
  document.addEventListener("keydown",function(e){
    if(/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName))return;
    if(e.key==="ArrowRight"||e.key==="PageDown"){e.preventDefault();go(cur+1)}
    else if(e.key==="ArrowLeft"||e.key==="PageUp"){e.preventDefault();go(cur-1)}
    else if(e.key==="Home")go(0);else if(e.key==="End")go(N-1);
    else if(e.key==="f"||e.key==="F")fs();
  });
  function fs(){try{if(document.fullscreenElement)document.exitFullscreen();else document.documentElement.requestFullscreen().catch(function(){})}catch(e){}}
  $("#fs").addEventListener("click",fs);
  mobile.addEventListener("change",function(){go(cur)});
  go(0);
}

/* safates: lang "ca" o "en"; ours = text de la casella buida */
function world(el,lang,ours){
  var P=MJ.PHOTOS;
  el.innerHTML=P.map(function(p,i){
    return '<button class="pr-tray" aria-expanded="false"><img src="'+MJ.photo(p.id)+'" alt="'+(lang==="ca"?"Dinar escolar":"School lunch")+' '+(i+1)+'" loading="lazy"><span class="tag">'+(i+1)+'</span><span class="rev"><b>'+p.flag+' '+p[lang]+'</b>'+p["d"+lang]+'</span></button>';
  }).join("")+'<label class="pr-tray ours"><b>'+ours[0]+'</b><span>'+ours[1]+'</span><input type="file" accept="image/*" capture="environment" hidden></label>';
  $$(".pr-tray:not(.ours)",el).forEach(function(b){b.addEventListener("click",function(){var o=!b.classList.contains("open");b.classList.toggle("open",o);b.setAttribute("aria-expanded",o)})});
  var inp=$(".ours input",el);
  inp.addEventListener("change",function(){var f=inp.files&&inp.files[0];if(!f)return;var r=new FileReader();r.onload=function(){var lab=$(".ours",el);var im=$("img",lab)||document.createElement("img");im.src=r.result;im.alt=ours[0];lab.appendChild(im)};r.readAsDataURL(f)});
}

/* paraules: speak = "ca-ES" / "en-GB"; main = "ca" / "en"; tr = idiomes de traducció */
function words(grid,langBar,ids,main,speak,tr,onTap){
  var cur="";
  langBar.innerHTML='<button aria-pressed="true" data-l="">'+(main==="ca"?"Només català":"English only")+'</button>'+
    MJ.LANGS.concat([["ca","Català","ltr"]]).filter(function(l){return l[0]!==main&&tr.indexOf(l[0])>-1}).map(function(l){return '<button aria-pressed="false" data-l="'+l[0]+'" lang="'+l[0]+'">'+l[1]+'</button>'}).join("");
  function render(){
    grid.innerHTML=ids.map(function(id){var w=MJ.byId[id];var dir=(cur==="ar"||cur==="ur")?' dir="rtl"':'';
      return '<button class="pr-word" data-id="'+id+'"><img src="'+MJ.pic(id)+'" alt=""><span>'+w[main]+'</span><small'+dir+(cur?' lang="'+cur+'"':'')+'>'+(cur?w[cur]:"")+'</small></button>'}).join("");
  }
  langBar.addEventListener("click",function(e){var b=e.target.closest("button");if(!b)return;cur=b.dataset.l;$$("button",langBar).forEach(function(x){x.setAttribute("aria-pressed",x===b)});render()});
  grid.addEventListener("click",function(e){var b=e.target.closest(".pr-word");if(!b)return;
    if(onTap&&onTap(b))return;
    var w=MJ.byId[b.dataset.id];MJ.say(w[main],speak);b.classList.remove("play");void b.offsetWidth;b.classList.add("play")});
  render();
}

function sem(el,rows){
  var v=rows.map(function(){return 0});
  function r(){el.innerHTML=rows.map(function(s,i){return '<div class="r" style="--c:'+s[0]+'"><b>'+s[1]+'</b><button class="pr-btn" data-s="'+i+'" data-d="-1" aria-label="'+s[1]+': menys">'+ic("minus")+'</button><output>'+v[i]+'</output><button class="pr-btn" data-s="'+i+'" data-d="1" aria-label="'+s[1]+': més">'+ic("plus")+'</button></div>'}).join("")}
  el.addEventListener("click",function(e){var b=e.target.closest("[data-s]");if(!b)return;v[+b.dataset.s]=Math.max(0,v[+b.dataset.s]+(+b.dataset.d));r()});r();
}

/* tria una peça i després el lloc (o arrossega) */
function pickPlace(pool,targets,check,feed){
  var sel=null;
  pool.addEventListener("click",function(e){var c=e.target.closest(".pr-chip");if(!c||c.disabled)return;
    if(sel)sel.classList.remove("sel");if(sel===c){sel=null;return}sel=c;c.classList.add("sel");feed("", "Ara toca on va.")});
  targets.forEach(function(t){t.addEventListener("click",function(){if(!sel)return;
    if(check(sel,t)){sel.classList.remove("sel");sel.disabled=true;sel=null}else{sel.classList.remove("bad");void sel.offsetWidth;sel.classList.add("bad")}})});
}

return {$:$,$$:$$,ic:ic,shuffle:shuffle,nav:nav,world:world,words:words,sem:sem,pickPlace:pickPlace};
})();
