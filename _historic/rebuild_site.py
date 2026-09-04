from pathlib import Path

root = Path('/mnt/data/temple_obert_proj')

nav = '''
<header class="sticky top-0 z-50 border-b border-stone-200/80 bg-white/90 backdrop-blur">
  <div class="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 lg:px-8">
    <a href="index.html" class="flex items-center gap-3">
      <div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-100 text-violet-700 shadow-sm ring-1 ring-violet-200">
        <span class="text-xl font-black">T</span>
      </div>
      <div>
        <div class="text-lg font-extrabold tracking-tight text-stone-900">Temple Obert</div>
        <div class="text-xs text-stone-500">Projectes compartits per a l'educació pública</div>
      </div>
    </a>
    <nav class="hidden items-center gap-6 text-sm font-medium text-stone-600 md:flex">
      <a href="index.html" class="hover:text-violet-700">Inici</a>
      <a href="projectes.html" class="hover:text-violet-700">Projectes</a>
      <a href="caixes-aprenentatge.html" class="hover:text-violet-700">Caixes d'aprenentatge</a>
      <a href="el-sentit-del-projecte.html" class="hover:text-violet-700">Sobre Temple Obert</a>
    </nav>
  </div>
</header>
'''

footer = '''
<footer class="border-t border-stone-200 bg-stone-50">
  <div class="mx-auto grid max-w-6xl gap-8 px-5 py-10 text-sm text-stone-600 lg:grid-cols-[1.5fr,1fr,1fr] lg:px-8">
    <div>
      <div class="mb-3 text-base font-bold text-stone-900">Temple Obert</div>
      <p class="max-w-md leading-6">Una web per compartir projectes, guies docents i materials transferibles amb altres centres. Obrim el que fem perquè la innovació tingui retorn públic.</p>
    </div>
    <div>
      <div class="mb-3 font-semibold text-stone-900">Navegació</div>
      <ul class="space-y-2">
        <li><a href="index.html" class="hover:text-violet-700">Inici</a></li>
        <li><a href="projectes.html" class="hover:text-violet-700">Projectes</a></li>
        <li><a href="joves.html" class="hover:text-violet-700">Joves (ESO)</a></li>
        <li><a href="caixes-aprenentatge.html" class="hover:text-violet-700">Caixes d'aprenentatge</a></li>
      </ul>
    </div>
    <div>
      <div class="mb-3 font-semibold text-stone-900">Ús docent</div>
      <p class="leading-6">Els materials es comparteixen per inspirar, adaptar i reutilitzar. Cada projecte inclou una síntesi clara i enllaços als documents de treball.</p>
    </div>
  </div>
</footer>
'''

head = '''
<!DOCTYPE html>
<html lang="ca">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{title}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {{
      theme: {{
        extend: {{
          colors: {{
            temple: {{
              ink: '#1c1917',
              sand: '#f8f5f2',
              soft: '#f2ecff',
              lilac: '#b79cff',
              plum: '#6d4aff',
              teal: '#d8f0ea',
              gold: '#f5d36b'
            }}
          }},
          boxShadow: {{
            card: '0 14px 40px rgba(30, 20, 60, 0.08)'
          }},
          fontFamily: {{
            sans: ['Inter', 'system-ui', 'sans-serif']
          }}
        }}
      }}
    }}
  </script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    .grain {{ background-image: radial-gradient(rgba(109,74,255,0.06) 1px, transparent 1px); background-size: 16px 16px; }}
    .hero-card {{ background: linear-gradient(135deg, rgba(183,156,255,0.16), rgba(216,240,234,0.42)); }}
  </style>
</head>
<body class="bg-white font-sans text-stone-900">
{nav}
<main>
'''

end = '\n</main>\n' + footer + '\n</body>\n</html>\n'

def page(title, body):
    return head.format(title=title, nav=nav) + body + end

index_body = '''
<section class="grain overflow-hidden border-b border-stone-200 bg-temple-sand">
  <div class="mx-auto grid max-w-6xl gap-12 px-5 py-16 lg:grid-cols-[1.15fr,0.85fr] lg:px-8 lg:py-24">
    <div>
      <div class="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-violet-700 shadow-sm ring-1 ring-violet-100">Temple Obert · compartim projectes reals</div>
      <h1 class="max-w-3xl text-4xl font-extrabold tracking-tight text-stone-900 sm:text-5xl lg:text-6xl">Una web oberta per compartir ABP i materials transferibles amb altres docents.</h1>
      <p class="mt-6 max-w-2xl text-lg leading-8 text-stone-600">Temple Obert recull projectes nascuts a l'aula i documentats perquè altres centres els puguin entendre, adaptar i fer créixer. No és només un aparador: és una aportació a l'educació pública des de la pràctica.</p>
      <div class="mt-8 flex flex-wrap gap-3">
        <a href="joves.html" class="rounded-2xl bg-violet-600 px-6 py-3 font-semibold text-white shadow-card transition hover:bg-violet-700">Explora Joves (ESO)</a>
        <a href="el-sentit-del-projecte.html" class="rounded-2xl border border-stone-300 bg-white px-6 py-3 font-semibold text-stone-800 transition hover:border-violet-300 hover:text-violet-700">Què és Temple Obert?</a>
      </div>
    </div>
    <div class="hero-card rounded-[2rem] p-6 shadow-card ring-1 ring-white/70 lg:p-8">
      <div class="rounded-[1.5rem] bg-white p-6 shadow-sm ring-1 ring-stone-100">
        <div class="mb-4 flex items-center justify-between">
          <div>
            <p class="text-sm font-semibold uppercase tracking-[0.18em] text-violet-700">Disponible ara</p>
            <h2 class="text-2xl font-bold tracking-tight">Joves (ESO)</h2>
          </div>
          <div class="rounded-2xl bg-violet-100 px-3 py-1 text-sm font-semibold text-violet-700">Actiu</div>
        </div>
        <p class="text-stone-600 leading-7">Projectes interdisciplinaris per a secundària amb una síntesi clara del repte, la seqüència i els materials. És la primera etapa publicada i serà el nucli inicial de la web.</p>
        <div class="mt-6 grid gap-3 text-sm text-stone-700">
          <div class="rounded-2xl bg-stone-50 p-4"><span class="font-semibold">Què hi trobaràs:</span> presentació lineal del projecte, guia docent, seqüència d'activitats i enllaços a Drive.</div>
          <div class="rounded-2xl bg-stone-50 p-4"><span class="font-semibold">Com està pensat:</span> perquè un docent entengui el projecte abans d'obrir cap document extern.</div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="mx-auto max-w-6xl px-5 py-16 lg:px-8">
  <div class="mb-8 flex items-end justify-between gap-6">
    <div>
      <p class="text-sm font-semibold uppercase tracking-[0.18em] text-violet-700">Etapes educatives</p>
      <h2 class="mt-2 text-3xl font-bold tracking-tight">Una arquitectura preparada per créixer</h2>
    </div>
    <a href="projectes.html" class="text-sm font-semibold text-violet-700 hover:text-violet-800">Veure totes les etapes →</a>
  </div>
  <div class="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
    <a href="joves.html" class="group rounded-[1.75rem] border border-violet-200 bg-white p-6 shadow-card transition hover:-translate-y-1 hover:border-violet-300">
      <div class="mb-5 inline-flex rounded-2xl bg-violet-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-violet-700">Disponible ara</div>
      <h3 class="text-2xl font-bold tracking-tight">Joves</h3>
      <p class="mt-2 text-sm text-stone-500">ESO</p>
      <p class="mt-4 text-stone-600 leading-7">Projectes interdisciplinaris amb mirada crítica, connexió amb la realitat i materials compartibles.</p>
    </a>
    <div class="rounded-[1.75rem] border border-dashed border-stone-300 bg-stone-50 p-6 opacity-90">
      <div class="mb-5 inline-flex rounded-2xl bg-stone-200 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-stone-600">En construcció</div>
      <h3 class="text-2xl font-bold tracking-tight text-stone-700">Petits</h3>
      <p class="mt-2 text-sm text-stone-500">Infantil</p>
      <p class="mt-4 text-stone-600 leading-7">Espai reservat per a projectes d'exploració, llenguatges i entorn a les primeres edats.</p>
    </div>
    <div class="rounded-[1.75rem] border border-dashed border-stone-300 bg-stone-50 p-6 opacity-90">
      <div class="mb-5 inline-flex rounded-2xl bg-stone-200 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-stone-600">En construcció</div>
      <h3 class="text-2xl font-bold tracking-tight text-stone-700">Mitjans</h3>
      <p class="mt-2 text-sm text-stone-500">1r-3r de Primària</p>
      <p class="mt-4 text-stone-600 leading-7">Projectes per començar a organitzar preguntes, recerques petites i productes compartits.</p>
    </div>
    <div class="rounded-[1.75rem] border border-dashed border-stone-300 bg-stone-50 p-6 opacity-90">
      <div class="mb-5 inline-flex rounded-2xl bg-stone-200 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-stone-600">En construcció</div>
      <h3 class="text-2xl font-bold tracking-tight text-stone-700">Grans</h3>
      <p class="mt-2 text-sm text-stone-500">4t-6è de Primària</p>
      <p class="mt-4 text-stone-600 leading-7">Espai futur per a reptes més autònoms, projectes de comunitat i treball interdisciplinari.</p>
    </div>
  </div>
</section>

<section class="bg-stone-50 py-16">
  <div class="mx-auto max-w-6xl px-5 lg:px-8">
    <div class="mb-8">
      <p class="text-sm font-semibold uppercase tracking-[0.18em] text-violet-700">Projectes destacats</p>
      <h2 class="mt-2 text-3xl font-bold tracking-tight">Comencem amb una biblioteca petita però útil</h2>
    </div>
    <div class="grid gap-6 lg:grid-cols-[1.15fr,0.85fr]">
      <a href="cami-circular.html" class="rounded-[2rem] bg-white p-7 shadow-card ring-1 ring-stone-100 transition hover:-translate-y-1">
        <div class="mb-4 flex flex-wrap items-center gap-2 text-sm">
          <span class="rounded-full bg-violet-100 px-3 py-1 font-semibold text-violet-700">Joves · 1r ESO</span>
          <span class="rounded-full bg-teal-100 px-3 py-1 font-semibold text-teal-800">ABP</span>
        </div>
        <h3 class="text-2xl font-bold tracking-tight">Camí circular</h3>
        <p class="mt-4 max-w-2xl leading-7 text-stone-600">Un projecte sobre fast fashion que connecta desigualtats globals, consum, impacte ambiental i acció transformadora. La pàgina de projecte resumeix el fil narratiu i enllaça les guies docents i les seqüències.</p>
        <div class="mt-6 grid gap-3 sm:grid-cols-3">
          <div class="rounded-2xl bg-stone-50 p-4"><div class="text-sm font-semibold text-stone-900">Àrees</div><div class="mt-1 text-sm text-stone-600">Socials, llengua, matemàtiques, naturals i arts</div></div>
          <div class="rounded-2xl bg-stone-50 p-4"><div class="text-sm font-semibold text-stone-900">Durada</div><div class="mt-1 text-sm text-stone-600">Trimestral, adaptable per fases</div></div>
          <div class="rounded-2xl bg-stone-50 p-4"><div class="text-sm font-semibold text-stone-900">Punt fort</div><div class="mt-1 text-sm text-stone-600">Repte social real i materials transferibles</div></div>
        </div>
      </a>
      <div class="rounded-[2rem] border border-stone-200 bg-white p-7 shadow-card">
        <h3 class="text-xl font-bold tracking-tight">Com està pensada la web</h3>
        <ul class="mt-5 space-y-4 text-stone-600">
          <li class="flex gap-3"><span class="mt-1 h-2.5 w-2.5 rounded-full bg-violet-500"></span><span>Cada projecte ha de ser comprensible sense haver d'obrir immediatament els documents externs.</span></li>
          <li class="flex gap-3"><span class="mt-1 h-2.5 w-2.5 rounded-full bg-violet-500"></span><span>Els enllaços a Drive i Google Docs apareixen al final com a extensió del resum, no com a substitut.</span></li>
          <li class="flex gap-3"><span class="mt-1 h-2.5 w-2.5 rounded-full bg-violet-500"></span><span>La classificació per etapes permet créixer sense perdre claredat.</span></li>
        </ul>
      </div>
    </div>
  </div>
</section>
'''

projectes_body = '''
<section class="bg-temple-sand border-b border-stone-200">
  <div class="mx-auto max-w-6xl px-5 py-16 lg:px-8">
    <p class="text-sm font-semibold uppercase tracking-[0.18em] text-violet-700">Projectes</p>
    <h1 class="mt-2 text-4xl font-extrabold tracking-tight">Catàleg per etapes educatives</h1>
    <p class="mt-4 max-w-3xl text-lg leading-8 text-stone-600">Temple Obert s'organitza primer per etapa. De moment la biblioteca publicada és la de Joves (ESO); la resta de seccions ja existeixen perquè la web pugui créixer de manera ordenada.</p>
  </div>
</section>

<section class="mx-auto max-w-6xl px-5 py-14 lg:px-8">
  <div class="grid gap-6 md:grid-cols-2">
    <div class="rounded-[2rem] border border-dashed border-stone-300 bg-stone-50 p-7">
      <div class="mb-4 inline-flex rounded-full bg-stone-200 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-stone-600">En construcció</div>
      <h2 class="text-2xl font-bold tracking-tight">Petits (Infantil)</h2>
      <p class="mt-4 leading-7 text-stone-600">Aquesta etapa recollirà projectes centrats en l'exploració, els llenguatges i la descoberta de l'entorn.</p>
    </div>
    <div class="rounded-[2rem] border border-dashed border-stone-300 bg-stone-50 p-7">
      <div class="mb-4 inline-flex rounded-full bg-stone-200 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-stone-600">En construcció</div>
      <h2 class="text-2xl font-bold tracking-tight">Mitjans (1r-3r de Primària)</h2>
      <p class="mt-4 leading-7 text-stone-600">Espai reservat per a projectes de cicle inicial amb estructures cooperatives i seqüències més pautades.</p>
    </div>
    <div class="rounded-[2rem] border border-dashed border-stone-300 bg-stone-50 p-7">
      <div class="mb-4 inline-flex rounded-full bg-stone-200 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-stone-600">En construcció</div>
      <h2 class="text-2xl font-bold tracking-tight">Grans (4t-6è de Primària)</h2>
      <p class="mt-4 leading-7 text-stone-600">Aquí hi aniran projectes de major autonomia, investigació guiada i productes finals amb projecció comunitària.</p>
    </div>
    <a href="joves.html" class="rounded-[2rem] border border-violet-200 bg-white p-7 shadow-card transition hover:-translate-y-1 hover:border-violet-300">
      <div class="mb-4 inline-flex rounded-full bg-violet-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-violet-700">Disponible ara</div>
      <h2 class="text-2xl font-bold tracking-tight">Joves (ESO)</h2>
      <p class="mt-4 leading-7 text-stone-600">Projectes ABP amb mirada crítica, connexió amb problemàtiques contemporànies i documentació útil per a altres centres.</p>
      <div class="mt-6 rounded-2xl bg-stone-50 p-4 text-sm text-stone-700">
        <span class="font-semibold">Actualment publicat:</span> biblioteca inicial de projectes d'ESO amb fitxa-resum, repte, seqüència i documents enllaçats.
      </div>
      <div class="mt-5 font-semibold text-violet-700">Entrar a l'etapa →</div>
    </a>
  </div>
</section>
'''

joves_body = '''
<section class="bg-temple-sand border-b border-stone-200">
  <div class="mx-auto max-w-6xl px-5 py-16 lg:px-8">
    <div class="mb-4 text-sm text-stone-500"><a href="index.html" class="hover:text-violet-700">Inici</a> <span class="px-1">/</span> Joves</div>
    <p class="text-sm font-semibold uppercase tracking-[0.18em] text-violet-700">Etapa disponible</p>
    <h1 class="mt-2 text-4xl font-extrabold tracking-tight">Joves (ESO)</h1>
    <p class="mt-4 max-w-3xl text-lg leading-8 text-stone-600">L'etapa Joves recull projectes per a secundària que treballen des de preguntes potents, seqüències llargues i productes amb sentit social. Cada entrada està pensada perquè un altre docent pugui veure ràpidament de què va, com s'organitza i on trobar la documentació.</p>
  </div>
</section>

<section class="mx-auto max-w-6xl px-5 py-14 lg:px-8">
  <div class="mb-8 grid gap-4 rounded-[2rem] bg-violet-50 p-6 ring-1 ring-violet-100 md:grid-cols-[1fr,auto] md:items-center">
    <div>
      <h2 class="text-xl font-bold tracking-tight">Biblioteca inicial</h2>
      <p class="mt-2 text-stone-600">Encara és una col·lecció petita. Prioritzem publicar bé els primers projectes abans d'omplir la web de fitxes buides.</p>
    </div>
    <div class="rounded-2xl bg-white px-4 py-3 text-sm text-stone-700 ring-1 ring-stone-200"><span class="font-semibold">Filtres preparats:</span> curs, àmbit, tipus de projecte</div>
  </div>

  <div class="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
    <a href="cami-circular.html" class="rounded-[2rem] border border-stone-200 bg-white p-7 shadow-card transition hover:-translate-y-1 hover:border-violet-300">
      <div class="flex flex-wrap gap-2 text-sm">
        <span class="rounded-full bg-violet-100 px-3 py-1 font-semibold text-violet-700">1r ESO</span>
        <span class="rounded-full bg-stone-100 px-3 py-1 font-semibold text-stone-700">ABP interdisciplinari</span>
        <span class="rounded-full bg-teal-100 px-3 py-1 font-semibold text-teal-800">Sostenibilitat i justícia global</span>
      </div>
      <h3 class="mt-5 text-3xl font-bold tracking-tight">Camí circular</h3>
      <p class="mt-4 leading-7 text-stone-600">Projecte llarg sobre fast fashion que connecta desigualtat global, consum, geografia, impacte ambiental i acció transformadora. L'alumnat passa de la presa de consciència personal a la comprensió de les cadenes de producció i al debat sobre alternatives.</p>
      <div class="mt-6 grid gap-4 sm:grid-cols-2">
        <div class="rounded-2xl bg-stone-50 p-4">
          <div class="text-sm font-semibold text-stone-900">Àrees implicades</div>
          <div class="mt-1 text-sm text-stone-600">Ciències socials, llengua, matemàtiques, naturals i àmbits artístics</div>
        </div>
        <div class="rounded-2xl bg-stone-50 p-4">
          <div class="text-sm font-semibold text-stone-900">Estructura</div>
          <div class="mt-1 text-sm text-stone-600">5 preguntes connectora + materials complementaris</div>
        </div>
      </div>
      <div class="mt-6 font-semibold text-violet-700">Veure projecte complet →</div>
    </a>

    <div class="rounded-[2rem] border border-stone-200 bg-white p-7 shadow-card">
      <h3 class="text-xl font-bold tracking-tight">Com llegir un projecte a Temple Obert</h3>
      <ol class="mt-5 space-y-4 text-stone-600">
        <li><span class="font-semibold text-stone-900">1.</span> Llegeix la síntesi inicial per entendre el fil del projecte.</li>
        <li><span class="font-semibold text-stone-900">2.</span> Revisa la seqüència general i els moments clau.</li>
        <li><span class="font-semibold text-stone-900">3.</span> Obre només després els documents que necessitis: guia docent, seqüència o carpeta de Drive.</li>
      </ol>
      <div class="mt-6 rounded-2xl bg-teal-50 p-4 text-sm text-stone-700 ring-1 ring-teal-100">
        La idea no és duplicar tots els documents a la web, sinó convertir la web en una porta d'entrada clara i útil.
      </div>
    </div>
  </div>
</section>
'''

cami_body = '''
<section class="bg-temple-sand border-b border-stone-200">
  <div class="mx-auto max-w-6xl px-5 py-14 lg:px-8">
    <div class="mb-4 text-sm text-stone-500"><a href="index.html" class="hover:text-violet-700">Inici</a> <span class="px-1">/</span> <a href="joves.html" class="hover:text-violet-700">Joves</a> <span class="px-1">/</span> Camí circular</div>
    <div class="flex flex-wrap gap-2 text-sm">
      <span class="rounded-full bg-violet-100 px-3 py-1 font-semibold text-violet-700">Joves · 1r ESO</span>
      <span class="rounded-full bg-stone-100 px-3 py-1 font-semibold text-stone-700">ABP interdisciplinari</span>
      <span class="rounded-full bg-teal-100 px-3 py-1 font-semibold text-teal-800">Consum i justícia global</span>
    </div>
    <h1 class="mt-5 max-w-4xl text-4xl font-extrabold tracking-tight sm:text-5xl">Camí circular</h1>
    <p class="mt-5 max-w-3xl text-lg leading-8 text-stone-600">Un projecte que parteix d'una pregunta incòmoda i propera: què té a veure la roba que portem amb la vida d'altres persones i amb l'impacte ambiental del planeta? El recorregut combina consciència personal, anàlisi global, dades i acció creativa.</p>
    <div class="mt-8 grid gap-4 md:grid-cols-4">
      <div class="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-stone-100"><div class="text-sm font-semibold text-stone-900">Durada orientativa</div><div class="mt-1 text-sm text-stone-600">Projecte llarg, adaptable per fases</div></div>
      <div class="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-stone-100"><div class="text-sm font-semibold text-stone-900">Pregunta guia</div><div class="mt-1 text-sm text-stone-600">Com afecten les nostres decisions de consum la vida dels altres?</div></div>
      <div class="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-stone-100"><div class="text-sm font-semibold text-stone-900">Producte final</div><div class="mt-1 text-sm text-stone-600">Materials expositius i accions de conscienciació</div></div>
      <div class="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-stone-100"><div class="text-sm font-semibold text-stone-900">Àrees</div><div class="mt-1 text-sm text-stone-600">Socials, llengua, mates, naturals i arts</div></div>
    </div>
  </div>
</section>

<section class="mx-auto max-w-6xl px-5 py-14 lg:px-8">
  <div class="grid gap-8 lg:grid-cols-[1.1fr,0.9fr]">
    <div class="space-y-6">
      <section class="rounded-[2rem] border border-stone-200 bg-white p-7 shadow-card">
        <h2 class="text-2xl font-bold tracking-tight">1. Context i sentit</h2>
        <p class="mt-4 leading-7 text-stone-600">Camí circular neix de la voluntat d'abordar la fast fashion no només com un contingut informatiu, sinó com una experiència de desplaçament moral: l'alumnat comença mirant-se a si mateix, després amplia la mirada al món i acaba entenent que el consum quotidià forma part d'una cadena complexa de desigualtats, impactes ambientals i alternatives possibles.</p>
      </section>

      <section class="rounded-[2rem] border border-stone-200 bg-white p-7 shadow-card">
        <h2 class="text-2xl font-bold tracking-tight">2. Fil del projecte</h2>
        <div class="mt-6 space-y-4">
          <div class="rounded-2xl bg-stone-50 p-5">
            <h3 class="font-semibold text-stone-900">PC1 · Com és la meva vida? i la dels altres?</h3>
            <p class="mt-2 text-stone-600 leading-7">Es parteix de la rutina pròpia i es genera el primer contrast amb la vida d'un infant de Bangladesh. És el moment d'activar empatia i pregunta ètica.</p>
          </div>
          <div class="rounded-2xl bg-stone-50 p-5">
            <h3 class="font-semibold text-stone-900">PC2 · Com és el món actualment?</h3>
            <p class="mt-2 text-stone-600 leading-7">L'alumnat amplia el focus: desigualtat global, ODS, imatges i notícies. S'introdueix una mirada geopolítica i mediàtica.</p>
          </div>
          <div class="rounded-2xl bg-stone-50 p-5">
            <h3 class="font-semibold text-stone-900">PC3 · Per què hi ha xiquets com jo que treballen?</h3>
            <p class="mt-2 text-stone-600 leading-7">Es treballen causes i dades de desigualtat amb estacions, càlcul de percentatges i un primer producte maker col·lectiu.</p>
          </div>
          <div class="rounded-2xl bg-stone-50 p-5">
            <h3 class="font-semibold text-stone-900">PC4 · Em beneficio de la feina que fan estos xiquets?</h3>
            <p class="mt-2 text-stone-600 leading-7">La roba deixa de ser abstracta: etiquetes, procedència, consum, Top Manta i preguntes incòmodes sobre responsabilitat i alternatives.</p>
          </div>
          <div class="rounded-2xl bg-stone-50 p-5">
            <h3 class="font-semibold text-stone-900">PC5 · Quin és l'impacte de la fast fashion?</h3>
            <p class="mt-2 text-stone-600 leading-7">El projecte es tanca amb dades ambientals, fibres, CO₂, microplàstics i una mirada científica que complementa la dimensió social.</p>
          </div>
        </div>
      </section>

      <section class="rounded-[2rem] border border-stone-200 bg-white p-7 shadow-card">
        <h2 class="text-2xl font-bold tracking-tight">3. Producte final i avaluació</h2>
        <p class="mt-4 leading-7 text-stone-600">El projecte es pensa per culminar en materials expositius i maker que facin visible allò que normalment queda amagat darrere una etiqueta. L'avaluació combina produccions escrites, activitats de síntesi, reflexió personal i evidències compartides durant el procés.</p>
      </section>
    </div>

    <aside class="space-y-6">
      <section class="rounded-[2rem] border border-violet-200 bg-violet-50 p-7 shadow-card">
        <h2 class="text-xl font-bold tracking-tight">Documents i recursos</h2>
        <p class="mt-3 text-stone-600 leading-7">Aquests accessos permeten aprofundir en la implementació concreta del projecte. Aquí és on trobaràs les versions de treball i els materials de suport.</p>
        <div class="mt-5 space-y-3 text-sm">
          <a href="#" class="block rounded-2xl bg-white px-4 py-3 font-semibold text-violet-700 ring-1 ring-violet-100 hover:bg-violet-100/40">Obre la carpeta de Drive</a>
          <a href="#" class="block rounded-2xl bg-white px-4 py-3 font-semibold text-violet-700 ring-1 ring-violet-100 hover:bg-violet-100/40">Consulta la guia docent</a>
          <a href="#" class="block rounded-2xl bg-white px-4 py-3 font-semibold text-violet-700 ring-1 ring-violet-100 hover:bg-violet-100/40">Veure seqüència d'activitats</a>
          <a href="#" class="block rounded-2xl bg-white px-4 py-3 font-semibold text-violet-700 ring-1 ring-violet-100 hover:bg-violet-100/40">Materials complementaris</a>
        </div>
      </section>

      <section class="rounded-[2rem] border border-stone-200 bg-white p-7 shadow-card">
        <h2 class="text-xl font-bold tracking-tight">Per què aquesta pàgina és útil</h2>
        <ul class="mt-5 space-y-4 text-stone-600">
          <li class="flex gap-3"><span class="mt-1 h-2.5 w-2.5 rounded-full bg-violet-500"></span><span>Resumeix el projecte sense forçar-te a obrir cinc documents d'entrada.</span></li>
          <li class="flex gap-3"><span class="mt-1 h-2.5 w-2.5 rounded-full bg-violet-500"></span><span>Permet detectar ràpidament si et pot servir per al teu context.</span></li>
          <li class="flex gap-3"><span class="mt-1 h-2.5 w-2.5 rounded-full bg-violet-500"></span><span>Fa visibles el sentit pedagògic i el fil narratiu, no només els arxius.</span></li>
        </ul>
      </section>

      <section class="rounded-[2rem] border border-stone-200 bg-white p-7 shadow-card">
        <h2 class="text-xl font-bold tracking-tight">Notes d'adaptació</h2>
        <p class="mt-4 leading-7 text-stone-600">És un projecte escalable. Es pot concentrar en menys setmanes si algunes parts preparatòries o lectures es traslladen fora de l'aula i si es prioritzen les preguntes connectora i els moments de síntesi.</p>
      </section>
    </aside>
  </div>
</section>
'''

caixes_body = '''
<section class="bg-temple-sand border-b border-stone-200">
  <div class="mx-auto max-w-6xl px-5 py-16 lg:px-8">
    <div class="mb-4 text-sm text-stone-500"><a href="index.html" class="hover:text-violet-700">Inici</a> <span class="px-1">/</span> Caixes d'aprenentatge</div>
    <p class="text-sm font-semibold uppercase tracking-[0.18em] text-violet-700">Espai futur</p>
    <h1 class="mt-2 text-4xl font-extrabold tracking-tight">Caixes d'aprenentatge</h1>
    <p class="mt-4 max-w-3xl text-lg leading-8 text-stone-600">Aquest apartat està preparat perquè, en una segona fase, Temple Obert pugui compartir materials modulars, guies i recursos de caixes d'aprenentatge. De moment preferim deixar l'espai clarament anunciat i no omplir-lo amb contingut provisional.</p>
  </div>
</section>

<section class="mx-auto max-w-6xl px-5 py-14 lg:px-8">
  <div class="rounded-[2rem] border border-dashed border-violet-200 bg-violet-50 p-8 shadow-card">
    <div class="inline-flex rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-violet-700 ring-1 ring-violet-100">En construcció</div>
    <h2 class="mt-5 text-2xl font-bold tracking-tight">Què hi haurà aquí?</h2>
    <div class="mt-5 grid gap-4 md:grid-cols-3">
      <div class="rounded-2xl bg-white p-5 ring-1 ring-stone-100">
        <h3 class="font-semibold text-stone-900">Materials modulars</h3>
        <p class="mt-2 text-sm leading-6 text-stone-600">Propostes autocontingudes, reutilitzables i fàcils d'adaptar a diferents grups.</p>
      </div>
      <div class="rounded-2xl bg-white p-5 ring-1 ring-stone-100">
        <h3 class="font-semibold text-stone-900">Guies de desplegament</h3>
        <p class="mt-2 text-sm leading-6 text-stone-600">Orientacions per implementar, adaptar i connectar els materials amb el currículum.</p>
      </div>
      <div class="rounded-2xl bg-white p-5 ring-1 ring-stone-100">
        <h3 class="font-semibold text-stone-900">Recursos descarregables</h3>
        <p class="mt-2 text-sm leading-6 text-stone-600">Fitxes, plantilles i documents llestos per obrir, revisar i portar a l'aula.</p>
      </div>
    </div>
  </div>
</section>
'''

about_body = '''
<section class="bg-temple-sand border-b border-stone-200">
  <div class="mx-auto max-w-6xl px-5 py-16 lg:px-8">
    <div class="mb-4 text-sm text-stone-500"><a href="index.html" class="hover:text-violet-700">Inici</a> <span class="px-1">/</span> Sobre Temple Obert</div>
    <p class="text-sm font-semibold uppercase tracking-[0.18em] text-violet-700">El sentit del projecte</p>
    <h1 class="mt-2 max-w-4xl text-4xl font-extrabold tracking-tight sm:text-5xl">Compartir allò que funciona, documentar allò que aprenem i retornar-ho a la comunitat educativa.</h1>
    <p class="mt-5 max-w-3xl text-lg leading-8 text-stone-600">Temple Obert neix de la idea que la innovació pedagògica només té sentit si es pot explicar, transferir i posar en circulació. La web vol fer visible el treball real de centre sense convertir-lo en una vitrina buida.</p>
  </div>
</section>

<section class="mx-auto max-w-6xl px-5 py-14 lg:px-8">
  <div class="grid gap-8 lg:grid-cols-[1fr,1fr]">
    <section class="rounded-[2rem] border border-stone-200 bg-white p-7 shadow-card">
      <h2 class="text-2xl font-bold tracking-tight">Per què existeix Temple Obert?</h2>
      <p class="mt-4 leading-7 text-stone-600">Perquè molts projectes bons queden tancats dins carpetes, equips o centres. Aquesta web vol obrir-los perquè altres docents els puguin mirar amb temps, entendre'n l'estructura i decidir si els poden adaptar al seu context.</p>
      <p class="mt-4 leading-7 text-stone-600">No pretenem oferir receptes universals. El que oferim són materials reals, una síntesi clara del seu sentit i una manera honesta de compartir pràctica docent.</p>
    </section>
    <section class="rounded-[2rem] border border-stone-200 bg-white p-7 shadow-card">
      <h2 class="text-2xl font-bold tracking-tight">Què hi trobarà un altre centre?</h2>
      <ul class="mt-5 space-y-4 text-stone-600">
        <li class="flex gap-3"><span class="mt-1 h-2.5 w-2.5 rounded-full bg-violet-500"></span><span>Una pàgina resum per entendre el projecte d'un cop d'ull.</span></li>
        <li class="flex gap-3"><span class="mt-1 h-2.5 w-2.5 rounded-full bg-violet-500"></span><span>La lògica del repte, la seqüència i el producte final.</span></li>
        <li class="flex gap-3"><span class="mt-1 h-2.5 w-2.5 rounded-full bg-violet-500"></span><span>Enllaços a guies docents, seqüències i carpetes de Drive per aprofundir.</span></li>
      </ul>
    </section>
  </div>

  <section class="mt-8 rounded-[2rem] bg-violet-50 p-8 shadow-card ring-1 ring-violet-100">
    <h2 class="text-2xl font-bold tracking-tight">Com s'organitza la web</h2>
    <div class="mt-5 grid gap-4 md:grid-cols-3">
      <div class="rounded-2xl bg-white p-5 ring-1 ring-stone-100">
        <div class="text-sm font-semibold uppercase tracking-[0.16em] text-violet-700">1</div>
        <h3 class="mt-2 font-semibold text-stone-900">Per etapes</h3>
        <p class="mt-2 text-sm leading-6 text-stone-600">Petits, Mitjans, Grans i Joves. Això permet créixer sense perdre orientació.</p>
      </div>
      <div class="rounded-2xl bg-white p-5 ring-1 ring-stone-100">
        <div class="text-sm font-semibold uppercase tracking-[0.16em] text-violet-700">2</div>
        <h3 class="mt-2 font-semibold text-stone-900">Per projectes</h3>
        <p class="mt-2 text-sm leading-6 text-stone-600">Cada projecte té la seva fitxa, el seu resum pedagògic i els seus enllaços externs.</p>
      </div>
      <div class="rounded-2xl bg-white p-5 ring-1 ring-stone-100">
        <div class="text-sm font-semibold uppercase tracking-[0.16em] text-violet-700">3</div>
        <h3 class="mt-2 font-semibold text-stone-900">Per capes d'accés</h3>
        <p class="mt-2 text-sm leading-6 text-stone-600">Primer entens, després aprofundeixes. No a l'inrevés.</p>
      </div>
    </div>
  </section>
</section>
'''

files = {
    'index.html': page('Temple Obert', index_body),
    'projectes.html': page('Temple Obert · Projectes', projectes_body),
    'joves.html': page('Temple Obert · Joves', joves_body),
    'cami-circular.html': page('Temple Obert · Camí circular', cami_body),
    'caixes-aprenentatge.html': page("Temple Obert · Caixes d'aprenentatge", caixes_body),
    'el-sentit-del-projecte.html': page('Temple Obert · Sobre Temple Obert', about_body),
}

for name, content in files.items():
    (root / name).write_text(content, encoding='utf-8')

# add readme summary
(root / 'README_Temple_Obert.txt').write_text(
    "Temple Obert - versió revisada\n\n"
    "Canvis principals:\n"
    "- navegació unificada a totes les pàgines\n"
    "- textos reescrits perquè sonin més reals i útils per a docents\n"
    "- eliminació d'imatges poc coherents; ara la web es recolza sobretot en estructura, color i contingut\n"
    "- fitxa de projecte més clara i transferible\n"
    "- estat 'En construcció' resolt de manera consistent\n",
    encoding='utf-8'
)
