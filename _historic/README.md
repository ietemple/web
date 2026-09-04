# Scripts jubilats — NO ELS EXECUTIS

Aquests dos fitxers formaven part del flux de treball anterior, quan el lloc
s'editava en local i es pujava a Netlify arrossegant la carpeta. Es conserven
com a documentació del que es feia abans, no com a eines vives.

**Cap dels dos s'executa al desplegament.** El workflow de GitHub Actions els
exclou explícitament de la carpeta publicada.

## `rebuild_site.py`

Regenerava les sis pàgines HTML senceres a partir de plantilles incrustades al
propi script.

**Per què està jubilat:** les plantilles que conté són de la **versió anterior
del disseny** —paleta pedra/violeta, tipografia Inter, Tailwind sense la
configuració pastel— és a dir, anteriors a la identitat Fredoka/Quicksand que
el lloc té ara. A més, apunta a una ruta que no existeix en aquesta màquina:

```python
root = Path('/mnt/data/temple_obert_proj')
```

Si algú el fes córrer després de corregir aquesta ruta, **sobreescriuria les
sis pàgines amb el disseny antic**. Aquesta és la raó principal per la qual és
aquí i no a l'arrel.

## `apply_updates.js`

Substituïa la configuració de Tailwind i la capçalera a totes les pàgines
alhora, buscant un bloc `<script id="tailwind-config">`.

**Per què està jubilat:** les pàgines actuals ja no tenen aquest `id`, de
manera que totes les seves substitucions són silenciosament inofensives —no
fan res. També injectava el logotip des d'una URL temporal de
`lh3.googleusercontent.com` que caduca; el lloc ja fa servir `assets/logo.png`.

## I si torna a caldre editar la capçalera de totes les pàgines alhora?

Ara mateix són sis fitxers HTML amb una capçalera idèntica. Editar-les a mà és
perfectament viable i és el que fa el projecte. Si algun dia són vint, val més
introduir un pas de build senzill (per exemple Eleventy amb un layout comú) que
no pas ressuscitar un script que regenera HTML des de plantilles enganxades al
codi font: el problema d'aquests dos scripts no és que fossin lents, és que la
plantilla i la pàgina publicada es van desincronitzar sense que ningú se
n'adonés.
