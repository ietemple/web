/* "Com ho veus?" — bloc de resposta del docent. Ús: <div class="tv-say" data-say></div><script src="tv-say.js"></script>
   Opcional: data-say="text d'introducció". No desa res: només confirma a la pantalla. */
(function(){
  if(!document.getElementById("tv-say-css")){
    var st=document.createElement("style");st.id="tv-say-css";
    st.textContent=
".tvs{display:flex;flex-direction:column;gap:12px;padding:18px 20px;border-radius:var(--radi-lg,22px);background:rgba(255,255,255,.62);border:1px solid rgba(255,255,255,.85);box-shadow:var(--brill-vora,none),var(--ombra-8,0 4px 12px rgba(0,0,0,.06))}"+
".tvs p{margin:0;color:var(--tinta-suau);font-size:1.05rem;line-height:1.35}"+
".tvs .tvs-row{display:flex;flex-wrap:wrap;gap:8px;align-items:center}"+
".tvs .tvs-chip{font:600 1rem var(--font-text);padding:7px 14px;border-radius:999px;border:1.5px solid rgba(0,0,0,.12);background:#fff;color:var(--tinta);cursor:pointer}"+
".tvs .tvs-chip[aria-pressed=true]{border-color:var(--cc,#555);background:var(--ct,#eee)}"+
".tvs label{font:600 1rem var(--font-text);color:var(--tinta)}"+
".tvs textarea{width:100%;box-sizing:border-box;min-height:96px;resize:vertical;padding:12px 14px;border-radius:14px;border:1.5px solid rgba(0,0,0,.14);background:#fff;font:400 1.1rem/1.4 var(--font-text);color:var(--tinta)}"+
".tvs textarea:focus{outline:3px solid var(--focus-halo,rgba(80,120,255,.3));border-color:var(--cc,#555)}"+
".tvs .tvs-done{display:flex;gap:12px;align-items:flex-start}"+
".tvs .tvs-done svg{width:26px;height:26px;flex:none;stroke:var(--cc,#2a7);fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}"+
".tvs .tvs-done b{display:block;font:700 1.15rem var(--font-display);color:var(--tinta)}"+
".tvs blockquote{margin:6px 0 0;padding:8px 12px;border-left:3px solid var(--cc,#999);background:rgba(255,255,255,.7);border-radius:0 10px 10px 0;color:var(--tinta);font-size:1.05rem;white-space:pre-wrap}"+
".tvs .tvs-why{font-size:.95rem;color:var(--tinta-suau)}"+
"@media print{.tvs{display:none!important}}";
    document.head.appendChild(st);
  }
  var OK='<svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>';
  var ED='<svg class="ico" viewBox="0 0 24 24"><path d="M4 20h4L19 9l-4-4L4 16z"/></svg>';
  var TH='<svg class="ico" viewBox="0 0 24 24"><path d="M7 11v9H4v-9zM7 11l4-7a2 2 0 0 1 3 2l-1 4h6a2 2 0 0 1 2 2.3l-1.2 6A2 2 0 0 1 17.8 20H7"/></svg>';
  var WHY=["Massa llarg","Falta una versió","Canviaria l'ordre","Altres recursos","No encaixa amb el meu grup"];
  function esc(s){return s.replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
  function init(el){
    var intro=el.getAttribute("data-say")||"Aquest material t'arriba abans que a l'aula. Digues-hi la teva i s'ajusta a temps.";
    var uid="tvs"+Math.random().toString(36).slice(2,7);
    el.classList.add("tvs");
    function start(){
      el.innerHTML='<p>'+esc(intro)+'</p><div class="tvs-row"><button type="button" class="tv-btn" data-k="ok">'+TH+'Tot bé</button><button type="button" class="tv-btn" data-k="ch">'+ED+'Ho canviaria</button></div>';
    }
    function form(mode){
      var chips=mode==="ch"?'<div class="tvs-row" role="group" aria-label="Què hi falla">'+WHY.map(function(w){return '<button type="button" class="tvs-chip" aria-pressed="false" data-w>'+w+'</button>'}).join("")+'</div>':"";
      el.innerHTML=(mode==="ch"?'<p>Què hi canviaries? Marca el que vulguis i, sobretot, explica-ho amb les teves paraules.</p>':'<p>Perfecte. Vols afegir-hi alguna indicació? (opcional)</p>')+chips+
        '<label for="'+uid+'">'+(mode==="ch"?"Escriu-ho com ho diries a un company":"Una frase, si vols")+'</label>'+
        '<textarea id="'+uid+'" placeholder="'+(mode==="ch"?"Ex.: El meu grup necessitarà més temps per a la part 2; posaria la dissecció abans del cas clínic.":"Ex.: Ho faré el dijous en lloc del dimecres.")+'"></textarea>'+
        '<div class="tvs-row"><button type="button" class="tv-btn main" data-k="send" data-m="'+mode+'">Envia</button><button type="button" class="tv-btn" data-k="back">Enrere</button></div>';
      el.querySelector("textarea").focus();
    }
    function done(mode){
      var t=el.querySelector("textarea").value.trim();
      var ws=[].slice.call(el.querySelectorAll("[data-w][aria-pressed=true]")).map(function(b){return b.textContent});
      el.innerHTML='<div class="tvs-done" role="status">'+OK+'<div><b>'+(mode==="ch"?"Rebut. Claude ho ajustarà dijous.":"Rebut, gràcies.")+'</b>'+
        (ws.length?'<span class="tvs-why">'+esc(ws.join(" · "))+'</span>':"")+(t?'<blockquote>'+esc(t)+'</blockquote>':"")+'</div></div>'+
        '<div class="tvs-row"><button type="button" class="tv-btn" data-k="redo">Afegeix-hi una altra cosa</button></div>';
    }
    el.addEventListener("click",function(e){
      var w=e.target.closest("[data-w]");if(w){w.setAttribute("aria-pressed",w.getAttribute("aria-pressed")!=="true");return}
      var b=e.target.closest("[data-k]");if(!b)return;var k=b.dataset.k;
      if(k==="ok")form("ok");else if(k==="ch")form("ch");else if(k==="send")done(b.dataset.m);else start();
    });
    start();
  }
  function all(){[].forEach.call(document.querySelectorAll("[data-say]:not(.tvs)"),init)}
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",all);else all();
})();
