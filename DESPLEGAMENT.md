# Posada en marxa: GitHub Pages + DNS a Nominalia

Guia dels passos que **cal fer a mà** una sola vegada. Tot el que ve després és
automàtic.

> L'organització de GitHub es diu **`ietemple`** (les organitzacions no admeten
> espais al nom). El nom visible «IE Temple» es posa després a
> *Settings → Organization display name*.

---

## 0. Abans de pujar res: revisar el Supabase

`cami-circular.html` porta la URL del projecte de Supabase i la clau
*publishable* al codi font. **Això és normal i està pensat així** —és una clau
pública de client—, però en un repositori públic queda a la vista de tothom, i
és la clau que fa servir el comptador de visites.

Abans del primer `git push`, entra al panell de Supabase, taula
`project_views`, *Authentication → Policies*, i comprova que:

- [ ] La **RLS està activada** a la taula.
- [ ] Hi ha una política de **SELECT** oberta al rol `anon` (cal, per llegir el
      comptador).
- [ ] La política d'**UPDATE** del rol `anon` només permet incrementar aquesta
      fila i **cap altra taula del projecte és accessible** amb aquesta clau.
- [ ] No hi ha cap altra taula del mateix projecte amb dades reals i RLS
      desactivada.

Si el projecte de Supabase només conté aquesta taula de comptatge, no hi ha res
a fer. Si conté res més, val la pena moure el comptador a un projecte propi.

## 1. L'organització i els repositoris

> **Fet el 4 de setembre de 2026.** Es documenta com ha quedat, no com fer-ho.

1. L'organització `ietemple` existeix (pla **Free**), amb el nom visible
   «IE Temple» i el correu de contacte `apahiss3@xtec.cat`.
2. **Els portals de bio NO s'han transferit**, i no cal fer-ho. Segueixen a
   `apahiss3-xtec/bioigeo3r` i `apahiss3-xtec/bioigeo4t`, que és on tenen les
   URL de GitHub Pages que ja circulen entre l'alumnat. El workflow els
   descarrega d'allà gràcies a la variable `PORTALS_OWNER` (vegeu el pas 3).

   Transferir-los seria possible i conservaria historial, issues i estrelles,
   però canviaria les seves URL de `apahiss3-xtec.github.io/...` a
   `ietemple.github.io/...`. No hi ha cap motiu tècnic per fer-ho.
3. El repositori `ietemple/web` (públic) conté aquest lloc.

### Pendent: els Termes de Servei corporatius

L'organització es va crear amb els Termes **estàndard** (compte personal). Per
passar-la a **Corporate**, que és el que li correspon a un centre educatiu:

*Settings → General → Terms of Service → Accept terms*

Demana el nom legal del centre, l'adreça postal completa i la declaració que
qui ho signa hi està autoritzat. Ho ha de fer una persona amb aquesta
autorització; no és un pas tècnic.

## 2. Pujar aquest repositori

> **Fet.** El repositori local és a `Temple Obert/web`, amb el remot
> `https://github.com/ietemple/web.git` i la branca `main`.

Per replicar-ho en un altre centre:

```bash
git init -b main
git add .
git commit -m "Primera publicació"
git remote add origin https://github.com/EL-TEU-COMPTE/web.git
git push -u origin main
```

## 3. GitHub Pages i les dues variables

> **Fet.** *Settings → Pages → Source: **GitHub Actions***.

A *Settings → Secrets and variables → Actions → Variables* hi ha d'haver:

| Variable | Valor | Quan cal tocar-la |
|---|---|---|
| `PORTALS_OWNER` | `apahiss3-xtec` | Només si es transfereixen els portals de bio a l'organització: llavors s'esborra. |
| `DOMINI_ACTIU` | *(sense definir)* | Es posa a `1` el dia que es canvia el DNS (pas 6). |

**Per què existeix `DOMINI_ACTIU`:** el fitxer `CNAME` del repositori declara
`templeobert.cat`. Si s'apliqués abans de canviar el DNS, GitHub redirigiria
`ietemple.github.io/web` cap a un domini que encara no apunta a GitHub i no es
podria verificar res. Mentre la variable no valgui `1`, el build esborra el
`CNAME` i el lloc es publica a la URL de `github.io`.

**Encara no marquis «Enforce HTTPS»**: no es pot fins que el DNS apunti a
GitHub i el certificat estigui emès.

## 4. Verificar abans de tocar el DNS

El primer desplegament publicarà a `https://ietemple.github.io/web/`. Comprova-hi:

- [ ] La portada es veu bé i el menú mostra la pastilla «Bio i Geo 3r / Bio i Geo 4t».
- [ ] `/cami-circular` carrega, la línia de temps funciona i el comptador de
      visites suma.
- [ ] Els enllaços a Google Drive del camí circular obren.
- [ ] `/bio-geo-3r` i `/bio-geo-4t` carreguen, es navega entre sessions, es veuen
      imatges i vídeos, i el botó del tiquet de sortida obre Gmail amb el text.

Fins aquí, `templeobert.cat` i `templeobert.netlify.app` segueixen intactes.

## 5. Token per al desplegament encadenat

> El job ja és als dos portals de bio (`avisar-templeobert`, al final de
> `.github/workflows/deploy.yml`). **Falta només el token**, que has de crear
> tu: ningú més l'ha de veure.

Mentre el secret no existeixi, el job diu «no avisem ningú», acaba bé i **no
marca el desplegament com a fallit**. L'única conseqüència és que la còpia sota
el domini no es refresca sola quan publiques als portals.

1. GitHub → *Settings → Developer settings → Personal access tokens →
   Fine-grained tokens* → **Generate new token**.
   - *Resource owner*: `ietemple`
   - *Repository access*: **Only select repositories** → `ietemple/web`
   - *Permissions → Repository permissions → Contents*: **Read and write**
   - Caducitat: la màxima que et deixi; apunta-te-la al calendari.
2. Copia el token. A `apahiss3-xtec/bioigeo3r` **i** `apahiss3-xtec/bioigeo4t`:
   *Settings → Secrets and variables → Actions → New repository secret*
   - Nom: `DISPATCH_TEMPLEOBERT`
   - Valor: el token.
3. Comprova-ho: fes qualsevol `push` a un dels portals i mira que el job
   `avisar-templeobert` digui `HTTP 204` i que a `ietemple/web` hi aparegui una
   execució nova amb l'event `repository_dispatch`.

Si el token caduca, aquest pas fallarà però **el portal de bio s'haurà publicat
igualment**: només quedarà desactualitzada la còpia sota el domini, fins al
següent desplegament manual (*Actions → Desplegar a GitHub Pages → Run workflow*).

## 6. Canviar el DNS a Nominalia

Estat actual comprovat: `templeobert.cat` resol a `81.88.48.71` (hosting de
Nominalia) i serveix una pàgina de cortesia amb un certificat HTTPS caducat i
amb el nom equivocat. **A la pràctica el domini no serveix el lloc avui**; el
públic hi arriba per `templeobert.netlify.app`.

Al panell de Nominalia, *Domini → Gestió de DNS*:

**Esborra** els registres `A` i `CNAME` actuals de `@` i de `www`. Després crea:

| Tipus | Nom | Valor | TTL |
|---|---|---|---|
| A | `@` | `185.199.108.153` | 3600 |
| A | `@` | `185.199.109.153` | 3600 |
| A | `@` | `185.199.110.153` | 3600 |
| A | `@` | `185.199.111.153` | 3600 |
| CNAME | `www` | `ietemple.github.io.` | 3600 |

Els quatre registres `A` han de coexistir: són els quatre servidors de GitHub
Pages i cal tenir-los tots per redundància.

**No donis de baixa el hosting de Nominalia encara.** Canviar el DNS ja deixa
d'utilitzar-lo sense esborrar-ne res; deixa passar unes setmanes amb el lloc nou
funcionant abans de cancel·lar-lo.

## 7. Tancar la configuració

1. Espera que el DNS propagui (de minuts a 24 h). Comprova-ho amb:

   ```bash
   nslookup templeobert.cat
   ```

   Ha de retornar les IP `185.199.1xx.153`.
2. A `ietemple/web` → *Settings → Secrets and variables → Actions →
   Variables*: posa **`DOMINI_ACTIU` = `1`** i torna a executar el workflow
   (*Actions → Desplegar a GitHub Pages → Run workflow*). Sense aquest pas el
   domini propi no s'aplica mai.
3. A `ietemple/web` → *Settings → Pages*: el camp *Custom domain* ha de mostrar
   `templeobert.cat` amb un ✅ *DNS check successful*.
4. Espera que aparegui la casella **Enforce HTTPS** activable (GitHub emet el
   certificat de Let's Encrypt tot sol, sol trigar entre minuts i una hora) i
   **marca-la**.
5. Comprova que `https://templeobert.cat` i `https://www.templeobert.cat`
   carreguen les dues, i que `/cami-circular`, `/bio-geo-3r` i `/bio-geo-4t` també.

## 8. Redirigir Netlify

Al panell de Netlify del lloc `templeobert`, substitueix el contingut publicat
per un únic fitxer `_redirects`:

```
/*  https://templeobert.cat/:splat  301!
```

Així, qui tingui guardat un enllaç de `templeobert.netlify.app/cami-circular`
acaba a `templeobert.cat/cami-circular`. Mantén el lloc de Netlify viu
indefinidament: no costa res i preserva els enllaços ja repartits.

---

## Resum de qui fa què a partir d'ara

| Acció | Efecte |
|---|---|
| `git push` a `ietemple/web` | Es republica tot el domini |
| `git push` a `ietemple/bioigeo3r` | Es republica el portal **i** el domini |
| `git push` a `ietemple/bioigeo4t` | Igual |
| *Actions → Run workflow* a `ietemple/web` | Republicació manual, per si de cas |

Cap pas manual més. Netlify Drop queda jubilat.
