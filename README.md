# Temple Obert

Lloc web de **Temple Obert**, l'espai de projectes compartits de l'Institut
Escola Temple (Tortosa), i portal d'entrada als portals d'aula de Biologia i
Geologia de 3r i 4t d'ESO.

🌐 **<https://templeobert.cat>**

Temple Obert no és un repositori de materials tancat: és un espai de servei
públic perquè altres docents puguin **usar, adaptar i fer créixer** els
projectes. Aquest repositori existeix precisament per fer-ho possible. Si ets
docent d'un altre centre i vols quedar-te qualsevol part d'això, endavant —hi
ha una secció més avall que t'explica com.

---

## Què hi ha publicat, i des d'on

| URL | Què és | Repositori |
|---|---|---|
| `templeobert.cat/` | Temple Obert (aquest repositori) | `ietemple/web` |
| `templeobert.cat/cami-circular` | Projecte del camí circular | `ietemple/web` |
| `templeobert.cat/bio-3r` | Portal d'aula de Bio i Geo 3r ESO | `ietemple/bioigeo3r` |
| `templeobert.cat/bio-4t` | Portal d'aula de Bio i Geo 4t ESO | `ietemple/bioigeo4t` |

Són **tres repositoris independents**. Cadascun es desplega sol i funciona sol.
Aquest, a més, els recull i els publica junts sota el domini comú (vegeu
[Com es desplega](#com-es-desplega)).

Ho hem fet així a propòsit: si vols el portal de Bio 3r per al teu centre,
clones **només** `bioigeo3r` i no t'endus res més.

---

## Aquest repositori

HTML, CSS i JavaScript estàtics. **Sense build, sense npm, sense framework.**
Obres un fitxer `.html` al navegador i ja el veus.

```
index.html                    Portada
projectes.html                Índex de projectes
cami-circular.html            El camí circular  ← el projecte principal
joves.html                    Projecte "Joves"
caixes-aprenentatge.html      Caixes d'aprenentatge
el-sentit-del-projecte.html   Sobre Temple Obert
assets/                       Logotip i imatges
CNAME                         Domini personalitzat de GitHub Pages
_historic/                    Scripts antics, documentats i NO executables
.github/workflows/deploy.yml  Desplegament automàtic
```

Tailwind es carrega des del CDN amb la configuració incrustada al `<head>` de
cada pàgina. No cal compilar res, però sí que cal connexió a internet per
veure els estils.

### Fer-lo córrer en local

No cal servidor per a res, però si vols que les rutes es comportin com en
producció:

```bash
python3 -m http.server 8000
```

I obre <http://localhost:8000>.

---

## Com es desplega

Cada `git push` a `main` dispara
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), que:

1. Copia aquest repositori a l'arrel de la carpeta de publicació.
2. Descarrega i construeix `bioigeo3r` i `bioigeo4t` (`npm ci && npm run build`).
3. Col·loca els seus `dist/` a `/bio-3r` i `/bio-4t`.
4. Ho publica tot a GitHub Pages.

Quan es publica contingut nou als portals de bio, els seus workflows criden
aquest amb un event `repository_dispatch` de tipus `portal-actualitzat`, de
manera que el domini s'actualitza sol. **No hi ha cap pas manual.**

La posada en marxa (organització, GitHub Pages, DNS, token) està documentada
pas a pas a **[DESPLEGAMENT.md](DESPLEGAMENT.md)**.

Si aquest workflow es trenca, els tres llocs segueixen vius a les seves URL de
GitHub Pages respectives. El desplegament conjunt és additiu, no un punt únic
de fallada.

---

## Per a docents d'altres centres

### Quedar-te només un portal d'aula

Els portals de Bio 3r i 4t són aplicacions React + Vite pensades per funcionar
sota qualsevol subcarpeta. Fes fork del repositori que t'interessi, activa
GitHub Pages a *Settings → Pages → Source: GitHub Actions* i ja el tindràs
publicat a `elteucompte.github.io/bioigeo3r`. Els seus README expliquen com
canviar-ne els continguts.

### Quedar-te aquest lloc

1. Fes fork d'aquest repositori.
2. **Esborra el fitxer `CNAME`** (o posa-hi el teu domini). Si no ho fas,
   GitHub intentarà reclamar `templeobert.cat` i el desplegament fallarà.
3. Al workflow, esborra els passos «Descarregar Bio 3r/4t», «Construir Bio
   3r/4t» i «Col·locar els portals» si no vols publicar portals d'aula, o
   canvia'ls pels teus repositoris.
4. Substitueix `assets/logo.png` pel logotip del teu centre, i esborra les
   referències a l'IE Temple del text.

### Canviar els colors i les tipografies

La identitat visual és tota a la configuració de Tailwind del `<head>` de cada
pàgina:

```js
colors: {
  primary: '#c084fc',
  pastel: { pink:'#f1a7a7', purple:'#c084fc', yellow:'#f9dc5c', teal:'#81c3c3', grey:'#e5e7eb' },
  school: { orange:'#f9b264', dark:'#4a3f3f' },
  surface:'#fdfafb', onsurface:'#4a3f3f', muted:'#6b5e5e'
},
fontFamily: { display:['Fredoka','sans-serif'], body:['Quicksand','sans-serif'] }
```

Cal canviar-la **a les sis pàgines**. `cami-circular.html` continua tenint una
configuració pròpia i més curta que la de les altres cinc (hi manquen, per
exemple, `boxShadow.float` i `borderRadius.4xl`), però ja comparteix les
variables de color i les classes de component que fa servir la capçalera.
Si hi afegeixes marcatge nou, comprova que les classes que utilitzis hi
estiguin definides.

### El menú de navegació

La capçalera de les sis pàgines es comporta en tres trams:

| Amplada | Què es veu |
|---|---|
| < 768 px | Un botó de menú que desplega el panell `#menu-mobil` amb les sis destinacions |
| 768–1023 px | La navegació horitzontal de sempre (quatre enllaços) |
| ≥ 1024 px | La navegació horitzontal més la pastilla «Bio 3r · Bio 4t» |

Els enllaços als dos portals d'aula són al peu de pàgina de totes les pàgines,
i per tant són accessibles a qualsevol amplada. El panell mòbil el mou un
script de vint línies al final de cada fitxer: no hi ha cap dependència.
Si hi afegeixes una pàgina nova, l'has d'afegir a tres llocs de cada fitxer:
la navegació d'escriptori, el panell `#menu-mobil` i el peu.

---

## Privacitat i dades

Cap dels tres blocs té base de dades d'usuaris, ni login, ni emmagatzematge de
dades d'alumnes al servidor. És una decisió d'arquitectura, no una casualitat:

- Els portals d'aula desen les preferències (idioma d'ajuda, nivell) al
  `localStorage` del navegador de l'alumne. No surten del seu dispositiu.
- Els tiquets de sortida s'envien obrint una finestra de redacció de Gmail amb
  el text ja escrit: **és l'alumne qui envia el correu des del seu propi
  compte**. El lloc no rep ni desa res.
- L'autoavaluació es resol íntegrament al navegador.

L'única crida a un servei extern amb estat és un comptador de visites de pàgina
a `cami-circular.html` (Supabase). Registra un número, no persones.

---

## Llicències

- **Codi** (HTML, CSS, JS, workflows): [MIT](LICENSE).
- **Continguts educatius**: [CC BY-NC 4.0](LICENSE-CONTINGUTS.md).

La separació és deliberada. Volem que la maquinària es pugui reutilitzar sense
fricció legal, i que els materials didàctics conservin el reconeixement d'autoria
i la clàusula no comercial.

---

## Contacte

Albert Pahissa · Institut Escola Temple, Tortosa
