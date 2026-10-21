/* El menjador ideal · dades compartides (presentacions i fitxes de Català i Anglès) */
window.MJ = (function(){
 /* id = fitxer a img/picto/; ca amb article; en; traduccions per a l'aula d'acollida */
 var W = [
  ["pa","el pa","bread","el pan","الخبز","pâinea","روٹی","面包"],
  ["arros","l'arròs","rice","el arroz","الأرز","orezul","چاول","米饭"],
  ["pasta","la pasta","pasta","la pasta","المعكرونة","pastele","پاستا","意大利面"],
  ["peix","el peix","fish","el pescado","السمك","peștele","مچھلی","鱼"],
  ["pollastre","el pollastre","chicken","el pollo","الدجاج","puiul","مرغی","鸡肉"],
  ["carn","la carn","meat","la carne","اللحم","carnea","گوشت","肉"],
  ["ou","l'ou","egg","el huevo","البيضة","oul","انڈا","鸡蛋"],
  ["llenties","les llenties","lentils","las lentejas","العدس","lintea","دال","扁豆"],
  ["amanida","l'amanida","salad","la ensalada","السلطة","salata","سلاد","沙拉"],
  ["verdura","la verdura","vegetables","la verdura","الخضار","legumele","سبزی","蔬菜"],
  ["tomaquet","el tomàquet","tomato","el tomate","الطماطم","roșia","ٹماٹر","西红柿"],
  ["patata","la patata","potato","la patata","البطاطا","cartoful","آلو","土豆"],
  ["sopa","la sopa","soup","la sopa","الحساء","supa","سوپ","汤"],
  ["fruita","la fruita","fruit","la fruta","الفاكهة","fructele","پھل","水果"],
  ["poma","la poma","apple","la manzana","التفاحة","mărul","سیب","苹果"],
  ["platan","el plàtan","banana","el plátano","الموز","banana","کیلا","香蕉"],
  ["iogurt","el iogurt","yoghurt","el yogur","الزبادي","iaurtul","دہی","酸奶"],
  ["llet","la llet","milk","la leche","الحليب","laptele","دودھ","牛奶"],
  ["aigua","l'aigua","water","el agua","الماء","apa","پانی","水"],
  ["suc","el suc","juice","el zumo","العصير","sucul","جوس","果汁"],
  ["hamburguesa","l'hamburguesa","burger","la hamburguesa","البرغر","hamburgerul","برگر","汉堡"],
  ["pizza","la pizza","pizza","la pizza","البيتزا","pizza","پیزا","比萨"],
  ["safata","la safata","tray","la bandeja","الصينية","tava","ٹرے","餐盘"],
  ["menjador","el menjador","canteen","el comedor","المقصف","cantina","کینٹین","食堂"],
  ["taula","la taula","table","la mesa","الطاولة","masa","میز","桌子"],
  ["cuiner","el cuiner, la cuinera","cook","el cocinero","الطباخ","bucătarul","باورچی","厨师"],
  ["soroll","el soroll","noise","el ruido","الضجيج","zgomotul","شور","噪音"],
  ["rellotge","el temps","time","el tiempo","الوقت","timpul","وقت","时间"],
  ["plastic","el plàstic","plastic","el plástico","البلاستيك","plasticul","پلاسٹک","塑料"],
  ["magrada","m'agrada","I like","me gusta","يعجبني","îmi place","مجھے پسند ہے","我喜欢"],
  ["nomagrada","no m'agrada","I don't like","no me gusta","لا يعجبني","nu-mi place","مجھے پسند نہیں","我不喜欢"]
 ];
 var LANGS = [["en","English","ltr"],["es","Español","ltr"],["ar","العربية","rtl"],["ro","Română","ltr"],["ur","اردو","rtl"],["zh","中文","ltr"]];
 var words = W.map(function(r){return {id:r[0],ca:r[1],en:r[2],es:r[3],ar:r[4],ro:r[5],ur:r[6],zh:r[7]}});
 var byId = {}; words.forEach(function(w){byId[w.id]=w});

 /* Fotos reals (Wikimedia Commons). ca/en = què s'hi veu */
 var PHOTOS = [
  {id:"japo",ca:"Japó",en:"Japan",flag:"🇯🇵",
   dca:"Arròs, sopa de miso, verdura saltada amb carn i un brick de llet. Es menja amb bastonets.",
   den:"Rice, miso soup, stir-fried vegetables with meat and a carton of milk. Students eat with chopsticks.",
   cr:"Douglas P Perkins · CC BY 3.0",url:"https://commons.wikimedia.org/wiki/File:Japanese_school_lunch.jpg"},
  {id:"corea",ca:"Corea del Sud",en:"South Korea",flag:"🇰🇷",
   dca:"Safata d'acer amb arròs, kimchi (col fermentada i picant), porc saltat, cogombre i sopa d'algues.",
   den:"A metal tray with rice, kimchi (spicy cabbage), stir-fried pork, cucumber and seaweed soup.",
   cr:"570cjk · CC BY-SA 3.0",url:"https://commons.wikimedia.org/wiki/File:A_South_Korean_school_lunch.jpg"},
  {id:"finlandia",ca:"Finlàndia",en:"Finland",flag:"🇫🇮",
   dca:"Sopa de peix amb patata, pa de sègol, cogombre i llet. A Finlàndia el dinar escolar és gratuït des de 1948.",
   den:"Fish soup with potatoes, rye bread, cucumber and milk. School lunch in Finland has been free since 1948.",
   cr:"Jukajuha · CC0",url:"https://commons.wikimedia.org/wiki/File:School_lunch_in_yl%C3%A4st%C3%B6_school.jpg"},
  {id:"eua",ca:"Estats Units",en:"United States",flag:"🇺🇸",
   dca:"Hamburguesa amb enciam i formatge, fruita tallada, mongetes amb tomàquet i llet desnatada.",
   den:"A burger with lettuce and cheese, fresh fruit, beans in tomato sauce and low-fat milk.",
   cr:"USDA · domini públic",url:"https://commons.wikimedia.org/wiki/File:School_lunch_tray_MyPlate_20210810-FNS-UNC-0015.jpg"},
  {id:"brasil",ca:"Brasil",en:"Brazil",flag:"🇧🇷",
   dca:"Una cuinera serveix el guisat del dia. Al Brasil, part del menjar escolar ha de venir de pagesos de la zona.",
   den:"A cook serves the stew of the day. In Brazil, part of school food must come from local farmers.",
   cr:"Fotos GOVBA · CC BY 2.0",url:"https://commons.wikimedia.org/wiki/File:Merenda_Escolar_(6120503213).jpg"},
  {id:"india",ca:"Índia",en:"India",flag:"🇮🇳",
   dca:"Dinar de migdia al pati, asseguts a terra, amb plats metàl·lics d'arròs i dal (llenties).",
   den:"Mid-day meal in the yard. Students sit on the ground with metal plates of rice and dal (lentils).",
   cr:"Archies2804 · CC BY-SA 4.0",url:"https://commons.wikimedia.org/wiki/File:Mid-day_meal_at_government_school.jpg"},
  {id:"kenya",ca:"Kenya",en:"Kenya",flag:"🇰🇪",
   dca:"Arròs amb guisat en un plat gran per compartir entre companys.",
   den:"Rice and stew on one big plate that classmates share.",
   cr:"Vincent25 Oduor · CC BY-SA 4.0",url:"https://commons.wikimedia.org/wiki/File:Meals_in_primary_school.jpg"},
  {id:"xina",ca:"Xina",en:"China",flag:"🇨🇳",
   dca:"Bols metàl·lics d'arròs amb verdura i carn. Es menja amb bastonets, amb l'uniforme de l'escola.",
   den:"Metal bowls of rice with vegetables and meat, eaten with chopsticks in school uniform.",
   cr:"Frontierofficial · CC BY 2.0",url:"https://commons.wikimedia.org/wiki/File:School_lunch_in_Yangshuo,_Guangxi,_2012.jpg"}
 ];
 var COVER = {cr:"Agostina · domini públic",url:"https://commons.wikimedia.org/wiki/File:Comedor_escolar.jpg"};
 var ARASAAC = "Pictogrames: Sergio Palao. Origen: ARASAAC (arasaac.org). Llicència CC BY-NC-SA 4.0. Propietat: Govern d'Aragó.";

 /* veu: ca-ES o en-GB; retorna false si el navegador no en té */
 function say(text, lang){
  try{
   if(!("speechSynthesis" in window))return false;
   var u=new SpeechSynthesisUtterance(text);u.lang=lang;u.rate=lang.indexOf("en")===0?.9:.95;
   var vs=speechSynthesis.getVoices().filter(function(v){return v.lang.replace("_","-").toLowerCase().indexOf(lang.slice(0,2).toLowerCase())===0});
   var exact=vs.filter(function(v){return v.lang.replace("_","-").toLowerCase()===lang.toLowerCase()});
   if(exact.length)u.voice=exact[0];else if(vs.length)u.voice=vs[0];
   speechSynthesis.cancel();speechSynthesis.speak(u);return true;
  }catch(e){return false}
 }
 return {words:words,byId:byId,LANGS:LANGS,PHOTOS:PHOTOS,COVER:COVER,ARASAAC:ARASAAC,say:say,
  pic:function(id){return "img/picto/"+id+".webp"},photo:function(id){return "img/menjador/"+id+".webp"}};
})();
