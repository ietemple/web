/* Temple Vidre · dades comunes de les SA de Joves.
   Una sola font per a dues peces:
   - sa-esquelet.js: el bloc comú de cada proposta (repte · seqüència · avaluació · diversitat · per a l'aula)
   - sa-docent.js: la vista docent de la presentació (què fa l'alumne a la fitxa en cada diapositiva + comentaris)
   slides[n] = {ex: número d'exercici | "meta" | "obj" | 0, fa: què fa l'alumne en aquell moment}
   fitxa: plantilla amb {v} = versió (C, B, A, AC) */
window.SA_DADES = {

bio: {
  lang:"ca", m:"bio", k:"#2E7D5B", kp:"#D5EFE2",
  mat:"Biologia i Geologia", curs:"3r ESO", titol:"El nostre cos en marxa",
  proposta:"sequencia.html", pres:"cor-presentacio.html", cami:"cami-bio.html",
  fitxa:"fitxes/cor-{v}.html", versions:["C","B","A"], presSessio:4,
  repte:"Dos enigmes a la paret des del primer dia: per què la freqüència cardíaca de la Mercè puja de pressa i baixa a poc a poc, i per què l'anèmia del Marc el deixa sense forces a mitja cursa.",
  producte:"Informe en parelles que resol els dos enigmes seguint una sola cadena: nutrients → digestió → sang → cor → respiració → control.",
  sessions:[
    {n:1,f:"ini",t:"Nutrients: el combustible del cos",ex:"Fitxa S1 · test del iode"},
    {n:2,f:"des",t:"El sistema digestiu",ex:"Fitxa S2"},
    {n:3,f:"des",t:"El sistema circulatori i la sang",ex:"Fitxa S3 · analítica del Marc"},
    {n:4,f:"des",t:"El cor per dins (dissecció)",sl:"1–12",ex:"Seccions 0–5 · tiquet"},
    {n:5,f:"des",t:"Respiració i esforç: el pols",ex:"Fitxa S5"},
    {n:6,f:"des",t:"Control i equilibri intern",ex:"Fitxa S6"},
    {n:7,f:"est",t:"Tanquem els dos enigmes",ex:"Informe en parelles"},
    {n:8,f:"apl",t:"Assaig amb un cas nou i prova",ex:"Autoavaluació i prova"}],
  aval:{
    ini:"Les dues gràfiques de la paret i la predicció de cada sessió (no puntuen).",
    form:["Un tiquet de sortida per sessió","Autoavaluació amb un cas nou abans de la prova"],
    fin:"Informe en parelles (40 %) i prova escrita (40 %); els tiquets formatius compten un 20 %.",
    inst:"Escala NA · AS · AN · AE a cada instrument; estructura d'avaluació per a Additio.",
    crit:"1.1 · 1.2 · 1.5 · 1.8 · 2.4 · 3.1 · 3.3 · 3.4 · 3.5 · 4.1 · 4.2 · 4.5 · 5.3 · 6.8 · 7.5 · 8.5"},
  div:"Cada sessió té fitxa a tres nivells (C suport · B base · A ampliació) i un laboratori virtual per a qui falta.",
  salta:[["repte","Repte"],["sessions","Sessions"],["mapa","Mapa d'avaluació"],["additio","Additio"]],
  slides:{
    1:{ex:".oa-title",fa:"Abans de començar: llegeix els objectius d'avui a la capçalera de la fitxa."},
    2:{ex:0,fa:"Secció 0 · dibuixa com creus que és el cor per dins i vota les dues preguntes."},
    3:{ex:1,fa:"Mira el model 3D i gira'l. A la secció 1 hi anotaràs els vasos que trobis al cor real."},
    4:{ex:1,fa:"Secció 1 · posa nom als 4 vasos grans i anota si la paret és tova o ferma."},
    5:{ex:2,fa:"Secció 2 · marca les cavitats que veus en obrir el cor."},
    6:{ex:2,fa:"Secció 2 · escriu cap a on s'obren les vàlvules i què impedeixen."},
    7:{ex:3,fa:"Secció 3 · escriu les mesures de les dues parets i del septe."},
    8:{ex:3,fa:"Secció 3 · numera les dues voltes de la sang en ordre."},
    9:{ex:0,fa:"Torna a la secció 0 i corregeix la predicció amb un altre color."},
    10:{ex:4,fa:"Secció 4 · en parella, tria un cas clínic i explica'n el mecanisme."},
    11:{ex:5,fa:"Secció 5 · escriu la resposta de la classe: per què 4 cavitats i no 2."},
    12:{ex:".meta-oa-title",fa:"Tiquet de sortida, sol o sola, i marca els objectius que has assolit."}}
},

gih: {
  lang:"ca", m:"soc", k:"#8A4B14", kp:"#F6DFC6",
  mat:"Geografia i Història", curs:"2n ESO", titol:"Qui té veu?",
  proposta:"gih-medieval.html", pres:"medieval-presentacio.html", cami:"cami-gih-medieval.html",
  fitxa:"medieval-fitxa.html#{v}", versions:["C","B","A","AC"],
  repte:"Com es guanya una veu quan no tens seient on es decideix? Els remences del segle XV ho van aconseguir; nosaltres ho provem a l'escola.",
  producte:"Memorial de greuges 2026 en grup, presentat de debò al consell de delegats.",
  sessions:[
    {n:1,f:"ini",t:"Qui decideix aquí? Per què es queixaven?",sl:"1–5",ex:"Ex. 1–4 · text inicial"},
    {n:2,f:"des",t:"Les Corts de l'aula",sl:"6–8",ex:"Ex. 5–6 · acta del rol"},
    {n:3,f:"est",t:"Què va passar de debò? I avui?",sl:"9–11",ex:"Ex. 7–9 · memorial remença"},
    {n:4,f:"apl",t:"Escrivim el memorial 2026",sl:"12–13",ex:"Ex. 10–11 · text final"}],
  aval:{
    ini:"Text inicial (ex. 2) i escala «qui decideix» (ex. 1). No puntuen: es rellegeixen l'últim dia.",
    form:["S2 · acta del meu rol a les Corts (ex. 6)","S3 · memorial remença individual (ex. 9)","S4 · revisió creuada entre grups amb la rúbrica"],
    fin:"Memorial de greuges 2026 (ex. 10) i text final comparat amb l'inicial (ex. 11). La metacognició no puntua.",
    inst:"Rúbrica del memorial, la mateixa per als grups i per a la docent; acta de les Corts.",
    crit:"2.2 · 2.5 · 3.2 · 3.4 · 3.5 · 5.1 · 5.2 · 6.2 · 6.3"},
  div:"Quatre versions del full amb les mateixes preguntes: C suport, B base, A ampliació i AC acollida amb pictogrames. Els rols retallables donen a cada alumne una veu a les Corts.",
  salta:[["context","Context i repte"],["sessions","Sessions"],["objectius","Criteris"],["diversitat","Diversitat"],["avaluacio","Avaluació"]],
  slides:{
    1:{ex:"obj",fa:"Fitxa a la taula. Nom, grup i data; llegeix l'objectiu de la pàgina 1."},
    2:{ex:1,fa:"Ex. 1 · marca qui decideix cada cosa a l'escola mentre la classe mou les decisions."},
    3:{ex:3,fa:"Ex. 3 · primer què hi veus, després què en dedueixes: qui hi és i qui no."},
    4:{ex:2,fa:"Ex. 2 · text inicial, sol/a i sense ajuda. No es puntua."},
    5:{ex:4,fa:"Ex. 4 · llegeix la font de Pere Albert i el mapa: què vol dir ser «home del senyor»."},
    6:{ex:5,fa:"Ex. 5 · per a cada mal ús, a qui afecta. Fixa't en els dos que afecten sobretot les dones."},
    7:{ex:6,fa:"Ex. 6 · amb el teu grup de rol: tres arguments, una demanda i què acceptaríeu."},
    8:{ex:6,fa:"Ex. 6 · anota què ha votat cada braç i com t'has sentit amb el teu rol."},
    9:{ex:7,fa:"Ex. 7 · completa la línia del temps de 1348 a 1486."},
    10:{ex:8,fa:"Ex. 8 · què va guanyar i què va perdre cada grup. Després, l'ex. 9 com a tiquet de sortida."},
    11:{ex:10,fa:"Ex. 10 · en grup, apunta el greuge triat i els criteris que compleix."},
    12:{ex:10,fa:"Ex. 10 · escriviu el memorial: greuge, prova, petició i aliats."},
    13:{ex:11,fa:"Ex. 11 · text final: rellegeix l'inicial i escriu què ha canviat. Metacognició al final."}}
},

cid: {
  lang:"es", m:"cas", k:"#8E2C7A", kp:"#F4D6EC",
  mat:"Lengua castellana y literatura", curs:"3.º ESO", titol:"El destierro",
  proposta:"lcl-cid.html", pres:"cid-presentacio.html", cami:"cami-lcl-cid.html",
  fitxa:"cid-fitxa.html#{v}", versions:["C","B","A","AC"],
  repte:"Un hombre sale de su casa sin poder volver. Leemos como juglares los primeros versos del Cantar y les robamos los trucos.",
  producte:"Un cantar propio escrito a mano sobre una despedida, recitado en compañías de juglares.",
  sessions:[
    {n:1,f:"ini",t:"Leer como un juglar",sl:"1–9",ex:"Ej. 1–7 · texto inicial"},
    {n:2,f:"apl",t:"Escribo mi cantar y lo recito",sl:"10–12",ex:"Ej. 8–13 · copia final"}],
  aval:{
    ini:"Texto inicial (ej. 1), a mano y sin nota: se relee al final.",
    form:["S1 · preguntas de lectura de la antología (ej. 3–7)","S2 · plan y borrador fechados, revisión entre iguales (ej. 8–11)"],
    fin:"Copia final del cantar, recitación y comparación del texto inicial con el final (ej. 13). La metacognición no puntúa.",
    inst:"Rúbrica de escritura, rúbrica de recitación y tabla de coevaluación (en la guía).",
    crit:"3.1 · 3.2 · 4.1 · 5.1 · 5.2 · 7.2 · 8.1 · 8.2 · 8.3 · 9.1"},
  div:"Cuatro versiones con las mismas preguntas: C apoyo, B base, A ampliación y AC acogida. Nadie está obligado a contar su historia: vale un personaje inventado.",
  salta:[["context","Contexto y reto"],["sessions","Sesiones"],["objectius","Criterios"],["diversitat","Medidas"],["avaluacio","Evaluación"]],
  slides:{
    1:{ex:"obj",fa:"Ficha en la mesa. Nombre y fecha; lee el objetivo de la página 1."},
    2:{ex:1,fa:"Ej. 1 · texto inicial, a mano y solo/a. No cuenta para nota."},
    3:{ex:2,fa:"Ej. 2 · observa la miniatura y compara los juglares con quien cuenta historias hoy."},
    4:{ex:"obj",fa:"Lee el reto y los criterios del objetivo de la página 1."},
    5:{ex:3,fa:"Ej. 3 · qué ve el Cid, en qué orden y a quién culpa."},
    6:{ex:4,fa:"Ej. 4 · preguntas de la antología sobre Burgos y la niña de nueve años."},
    7:{ex:5,fa:"Ej. 5 · inventa tu epíteto: que diga algo verdadero de ti."},
    8:{ex:6,fa:"Ej. 6 · marca las vocales que riman y la cesura de cada verso."},
    9:{ex:7,fa:"Ej. 7 · busca cómo el juglar llama al público y copia el verso."},
    10:{ex:8,fa:"Ej. 8 · plan de seis filas; después, borrador a mano (ej. 9)."},
    11:{ex:12,fa:"Ej. 12 · coevaluación de cuatro casillas mientras recitan las compañías."},
    12:{ex:13,fa:"Ej. 13 · texto final: relee el inicial y escribe qué ha cambiado. Metacognición."}}
},

mat2: {
  lang:"ca", m:"mat", k:"#2A55B0", kp:"#CFE0FF",
  mat:"Matemàtiques", curs:"2n ESO", titol:"La balança no menteix",
  proposta:"mates-2n.html", pres:"mates-2n-presentacio.html", cami:"cami-mates-2n.html",
  fitxa:"mates-2n-fitxa.html#{v}", versions:["C","B","A","AC"], presSessio:2,
  repte:"Quant pesa el sac sense obrir-lo? Les mateixes pesades es resolen per dos camins: la balança i l'equació.",
  producte:"La parada del mercat: cada parella inventa una pesada amb solució comprovada i la passa a una altra parella.",
  sessions:[
    {n:1,f:"ini",t:"Pesem a cegues",ex:"Tempteig"},
    {n:2,f:"des",t:"La balança no menteix",sl:"1–8",ex:"Ex. 1–6 · tiquet"},
    {n:3,f:"est",t:"Sacs a banda i banda",ex:"2x + 1 = x + 6"},
    {n:4,f:"apl",t:"La parada del mercat",ex:"Pesada pròpia · autoavaluació"}],
  aval:{
    ini:"Les estratègies de tempteig de la sessió 1 (no puntuen): diuen qui aïlla i qui encara no multiplica amb fluïdesa.",
    form:["S2 · tiquet de sortida: un pas igual en els dos camins","S2 · llista d'observació (treu el mateix pes dels dos plats, fa servir la caixa)"],
    fin:"S4 · pesada pròpia amb solució comprovada, resolta per una altra parella, i autoavaluació.",
    inst:"Llista d'observació, tiquet de sortida i rúbrica de la parada del mercat.",
    crit:"1.2 · 1.4 · 2.1 · 5.1 · 7.1 · 7.3 · 8.2 · 8.3 · 9.1 · 9.2 · 9.4"},
  div:"Quatre versions amb les mateixes cinc pesades: C amb els dos camins guiats i la caixa dibuixada, B base, A amb eines escrites i un repte, AC amb banc de paraules en tres llengües.",
  salta:[],
  slides:{
    1:{ex:"obj",fa:"Fitxa a la taula i parelles mixtes. Llegeix l'objectiu de la pàgina 1."},
    2:{ex:1,fa:"Ex. 1 · escriu quant creus que pesa el sac abans de tocar la balança."},
    3:{ex:2,fa:"Ex. 2 · fes al paper el mateix que es fa a la balança: treure i repartir."},
    4:{ex:3,fa:"Ex. 3 · un/a omple el camí balança i l'altre/a el camí equació."},
    5:{ex:5,fa:"Ex. 5 · dibuixa la caixa de multiplicar per repartir el pes en grups."},
    6:{ex:6,fa:"Ex. 6 · uneix cada pas del camí balança amb el de l'equació."},
    7:{ex:4,fa:"Ex. 4 · resol 3x + 4 = 19 pel camí que vulguis i comprova-ho a la pantalla."},
    8:{ex:"meta",fa:"Metacognició · marca el camí que has fet servir i escriu un pas en els dos idiomes."}}
},

menjador: {
  lang:"ca", m:"cat", k:"#B0452E", kp:"#F8DCD2",
  mat:"Català", curs:"3r ESO", titol:"El menjador ideal",
  proposta:"llengues-menjador.html", pres:"menjador-presentacio.html", cami:"cami-menjador.html",
  fitxa:"menjador-fitxa.html#{v}", versions:["C","B","A","AC"],
  repte:"Si poguéssim canviar una cosa del menjador de l'institut, quina seria? I com convenceríem la direcció?",
  producte:"Una carta argumentativa a la direcció, amb la proposta que guanyi la votació de la classe.",
  sessions:[
    {n:1,f:"ini",t:"Català · Safates del món, fet o opinió",sl:"1–4",ex:"Pàg. 1"},
    {n:2,f:"ini",t:"Anglès · Food words i listening",ex:"Page 1"},
    {n:3,f:"des",t:"Català · L'hamburguesa i els connectors",sl:"5–8",ex:"Pàg. 2"},
    {n:4,f:"est",t:"Anglès · El menú i les raons",ex:"Page 2"},
    {n:5,f:"apl",t:"Català · Escrivim la carta",sl:"9–10",ex:"Pàg. 3"}],
  aval:{
    ini:"Què hi ha a la safata i fet o opinió (pàg. 1): diu d'on parteix cadascú.",
    form:["Planificador de l'hamburguesa revisat en parella (pàg. 2)","«Com ho porto?» al final de cada sessió"],
    fin:"La carta a la direcció (pàg. 3) i la lectura en veu alta de divendres.",
    inst:"Llista de control de la carta, la mateixa per a l'alumne i per a la docent.",
    crit:"Català 5.1 · 5.2 · 3.1 · Anglès 1.2 · 2.1 · 3.3 · 5.2"},
  div:"Quatre versions de la fitxa (C · B · A · AC). L'alumnat d'acollida ensenya a la classe una paraula en la seva llengua: entra al grup com a expert.",
  salta:[["aula","Per a l'aula"],["sessions","Sessions"],["nivells","Versions"],["acollida","Acollida"],["criteris","Criteris"]],
  slides:{
    1:{ex:"obj",fa:"Fitxa a la taula. Llegeix l'objectiu de la pàgina 1."},
    2:{ex:1,fa:"Ex. 1 · mira i compara: tria dues safates i escriu què hi veus."},
    3:{ex:1,fa:"Ex. 1 · fes servir les paraules noves per completar la comparació."},
    4:{ex:2,fa:"Ex. 2 · marca si cada frase és un fet o una opinió."},
    5:{ex:4,fa:"Ex. 4 · planifica la carta a l'hamburguesa: tesi, tres arguments i conclusió."},
    6:{ex:3,fa:"Ex. 3 · classifica els connectors per la seva funció."},
    7:{ex:4,fa:"Ex. 4 · converteix la queixa en argument: opinió → concreta → raó."},
    8:{ex:4,fa:"Ex. 4 · escriu a dalt de l'hamburguesa la proposta guanyadora: és la tesi."},
    9:{ex:6,fa:"Ex. 6 · escriu la carta; tria abans els connectors a l'ex. 5."},
    10:{ex:7,fa:"Ex. 7 · revisa la carta amb la llista i digues la teva frase en veu alta."}}
},

menu: {
  lang:"ca", m:"ang", k:"#1F6F8B", kp:"#D3ECF5",
  mat:"Anglès", curs:"3r ESO", titol:"My weekly menu",
  proposta:"llengues-menjador.html#en", pres:"menu-presentacio.html", cami:"cami-menu.html",
  fitxa:"menu-fitxa.html#{v}", versions:["C","B","A","AC"],
  repte:"What would you like for lunch at school this week? And why? Mateix menjador que a Català, ara en anglès.",
  producte:"El menú setmanal de la classe, dit en veu alta amb «I'd like… because…».",
  sessions:[
    {n:1,f:"ini",t:"Food words, a/an/some i listening",sl:"1–7",ex:"Page 1"},
    {n:2,f:"apl",t:"I'd like… because… i el menú",sl:"8–10",ex:"Page 2"}],
  aval:{
    ini:"Food words: quines paraules ja saben (no puntua).",
    form:["Listening de l'Amira (ex. 3)","«How am I doing?» al final de cada sessió"],
    fin:"El menú setmanal amb les raons (ex. 4–5) i la frase dita en veu alta.",
    inst:"Check (ex. 6) i observació de l'oral amb la mateixa llista per a tothom.",
    crit:"1.2 · 2.1 · 3.3 · 5.2"},
  div:"Quatre versions (C · B · A · AC) amb pictogrames i àudio a la pantalla; traducció a la llengua de cada alumne.",
  salta:[["aula","Per a l'aula"],["sessions","Sessions"],["nivells","Versions"],["criteris","Criteris"]],
  slides:{
    1:{ex:"obj",fa:"Fitxa a la taula. Llegeix el «Learning goal» de la pàgina 1."},
    2:{ex:1,fa:"Ex. 1 · label the food: escriu el nom sota cada dibuix."},
    3:{ex:1,fa:"Ex. 1 · comprova les etiquetes amb el joc d'escoltar."},
    4:{ex:2,fa:"Ex. 2 · a, an or some? Completa cada frase."},
    5:{ex:0,fa:"Fitxa tancada: parla. «I can see some rice and…»"},
    6:{ex:4,fa:"Mira el plat sa: el faràs servir per fer el menú de l'ex. 4."},
    7:{ex:3,fa:"Ex. 3 · listening: marca què tria l'Amira, primer sense text."},
    8:{ex:5,fa:"Ex. 5 · Why? Escriu dues frases amb «I'd like… because…»."},
    9:{ex:4,fa:"Ex. 4 · copia el menú de la classe, un plat per dia."},
    10:{ex:6,fa:"Ex. 6 · Check: marca el que ja saps dir."}}
}
};
