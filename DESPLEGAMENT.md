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

## 1. Crear l'organització i moure els repositoris

1. GitHub → *Your organizations* → **New organization** → pla **Free**.
   Nom de l'organització: `ietemple`.
   Un cop creada: *Settings → Organization display name* → «IE Temple».
2. Transferir-hi els dos repositoris existents. A cadascun:
   *Settings → General → Danger Zone → Transfer ownership* → nova propietat `ietemple`.

   La transferència **conserva** historial, issues, forks, estrelles i deixa
   redireccions automàtiques des de les URL antigues. No cal tornar a activar
   Pages: la configuració viatja amb el repositori.
3. Actualitzar els remotes locals de les dues carpetes de treball:

   ```bash
   git -C "Biologia 3r d'ESO/web" remote set-url origin https://github.com/ietemple/bioigeo3r.git
   git -C "Biologia 4t ESO/web"  remote set-url origin https://github.com/ietemple/bioigeo4t.git
   ```

   Sense això, `git push` seguiria funcionant per la redirecció, però val més
   deixar-ho net.
4. Crear el repositori nou `ietemple/web`, **públic**, buit (sense README ni
   `.gitignore`: ja els portem).

## 2. Pujar aquest repositori

Des de la carpeta `Temple Obert/web`:

```bash
git init -b main
git add .
git commit -m "Temple Obert: primera publicació a GitHub"
git remote add origin https://github.com/ietemple/web.git
git push -u origin main
```

## 3. Activar GitHub Pages

A `ietemple/web` → *Settings → Pages*:

- **Source: GitHub Actions** (no «Deploy from a branch»).

El fitxer `CNAME` que hi ha al repositori ja declara `templeobert.cat`, de
manera que el camp *Custom domain* s'omplirà sol al primer desplegament.

**Encara no marquis «Enforce HTTPS»**: no es pot fins que el DNS apunti a
GitHub i el certificat estigui emès.

## 4. Verificar abans de tocar el DNS

El primer desplegament publicarà a `https://ietemple.github.io/web/`. Comprova-hi:

- [ ] La portada es veu bé i el menú mostra la pastilla «Bio 3r / Bio 4t».
- [ ] `/cami-circular` carrega, la línia de temps funciona i el comptador de
      visites suma.
- [ ] Els enllaços a Google Drive del camí circular obren.
- [ ] `/bio-geo-3r` i `/bio-geo-4t` carreguen, es navega entre sessions, es veuen
      imatges i vídeos, i el botó del tiquet de sortida obre Gmail amb el text.

Fins aquí, `templeobert.cat` i `templeobert.netlify.app` segueixen intactes.

## 5. Token per al desplegament encadenat

Perquè un `push` als portals de bio actualitzi també el domini:

1. GitHub → *Settings → Developer settings → Personal access tokens →
   Fine-grained tokens* → **Generate new token**.
   - *Resource owner*: `ietemple`
   - *Repository access*: només `ietemple/web`
   - *Permissions → Repository permissions → Actions*: **Read and write**
   - Caducitat: la màxima que et deixi; apunta-te-la al calendari.
2. Copia el token. A `ietemple/bioigeo3r` i `ietemple/bioigeo4t`:
   *Settings → Secrets and variables → Actions → New repository secret*
   - Nom: `DISPATCH_TEMPLEOBERT`
   - Valor: el token.
3. Afegeix aquest job al final de `.github/workflows/deploy.yml` dels **dos**
   repositoris de bio:

   ```yaml
     avisar-templeobert:
       needs: deploy
       runs-on: ubuntu-latest
       steps:
         - name: Refrescar templeobert.cat
           run: |
             curl -sSf -X POST \
               -H "Accept: application/vnd.github+json" \
               -H "Authorization: Bearer ${{ secrets.DISPATCH_TEMPLEOBERT }}" \
               https://api.github.com/repos/ietemple/web/dispatches \
               -d '{"event_type":"portal-actualitzat"}'
   ```

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
2. A `ietemple/web` → *Settings → Pages*: el camp *Custom domain* ha de mostrar
   `templeobert.cat` amb un ✅ *DNS check successful*.
3. Espera que aparegui la casella **Enforce HTTPS** activable (GitHub emet el
   certificat de Let's Encrypt tot sol, sol trigar entre minuts i una hora) i
   **marca-la**.
4. Comprova que `https://templeobert.cat` i `https://www.templeobert.cat`
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
