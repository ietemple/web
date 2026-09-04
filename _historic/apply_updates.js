const fs = require('fs');
const glob = require('fs').promises; // wait, glob is not natively fs, I'll use fs.readdirSync
const path = require('path');

const dir = __dirname;
const files = [
    'index.html', 
    'projectes.html', 
    'joves.html', 
    'cami-circular.html', 
    'caixes-aprenentatge.html', 
    'el-sentit-del-projecte.html'
];

const tailwindConfigStr = `
<script>
  tailwind.config = {
    darkMode: 'class',
    theme: {
      extend: {
        colors: {
          primary: '#c084fc',
          pastel: { pink: '#f1a7a7', purple: '#c084fc', yellow: '#f9dc5c', teal: '#81c3c3', grey: '#e5e7eb' },
          school: { orange: '#f9b264', dark: '#4a3f3f' }
        },
        fontFamily: { display: ['Fredoka', 'sans-serif'], body: ['Quicksand', 'sans-serif'] },
        borderRadius: { DEFAULT: '1.5rem', xl: '2rem', full: '9999px' },
      }
    }
  };
</script>
<style type='text/tailwindcss'>
   .hand-drawn-shape { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
   .organic-1 { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
   .organic-2 { border-radius: 50% 50% 20% 80% / 25% 80% 20% 75%; }
   .organic-3 { border-radius: 80% 20% 50% 50% / 50% 50% 50% 50%; }
   .card-hover:hover { transform: scale(1.05) rotate(1deg); }
   
   body { font-family: 'Quicksand', sans-serif; }
   h1, h2, h3, h4, h5, h6 { font-family: 'Fredoka', sans-serif; }
</style>
<link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@300..700&family=Quicksand:wght@300..700&display=swap" rel="stylesheet"/>
`;

const logoImg = `<img src="https://lh3.googleusercontent.com/aida/ADBb0uilOCVpZpKPPl5rQZHF1Q4v-nUZbOWm75-ddS-TbqB063pn7LhyQ_GHxgfTkigtuiTYx665v8nqNjXQNbm0WzKTnPt6e1jWILeByNlWoSOJfoljl3Kft0Avqkia4tpBBPePCtxhA-HyDIqkzbAxEAYHFu0PmrlhWJZtL65ang-hAdsTXszJnHVyw6Qj8zPBG24PleVLZlSLIrUYv-I-0Nku70ILbGuBFThwElkgPVsy7O_8OuCu6UF27fXy7Lj7V3TuULGRtC2ZJQ" alt="Logotip IE Temple" class="h-10 w-auto object-contain" />`;

for (let file of files) {
  let filepath = path.join(dir, file);
  if (!fs.existsSync(filepath)) continue;
  
  let content = fs.readFileSync(filepath, 'utf8');
  
  // Replace Tailwind Config script block
  content = content.replace(/<script id="tailwind-config">[\s\S]*?<\/script>/, tailwindConfigStr);
  
  // Add styling links
  content = content.replace(/<link href="[^"]*Lexend[^"]*" rel="stylesheet"\/>/g, '');
  
  // Replace generic text logo "Temple Obert" with the image at the top
  // Look for "Temple Obert" inside a prominent span near top or any Temple Obert text inside an a tag
  content = content.replace(/>\s*Temple Obert\s*<\/a>/i, `>${logoImg}</a>`);
  content = content.replace(/>\s*Temple Obert\s*<\/span>/i, `>${logoImg}</span>`);
  content = content.replace(/<span[^>]*class="[^"]*font-bold[^"]*"[^>]*>\s*Temple Obert\s*<\/span>/, logoImg);
  
  // Relink
  content = content.replace(/href="[^"]*"/g, (match) => {
    // try replacing specific text within A tag. This regex is too broad to easily connect.
    // simpler hack: do global replaces.
    return match; // skip for a second
  });
  
  // Relink specific nav links
  content = content.replace(/>Inici<\/a>/g, ` href="index.html">Inici</a>`);
  content = content.replace(/>Projectes<\/a>/g, ` href="projectes.html">Projectes</a>`);
  content = content.replace(/>Caixes d'aprenentatge<\/a>/g, ` href="caixes-aprenentatge.html">Caixes d'aprenentatge</a>`);
  content = content.replace(/>Sobre Temple Obert<\/a>/g, ` href="el-sentit-del-projecte.html">Sobre Temple Obert</a>`);
  
  // General cleanup of previous href="#" since we appended href="x" above
  content = content.replace(/href="#"\s+href="/g, `href="`);
  content = content.replace(/href=""\s+href="/g, `href="`);
  
  // Joves and projects linking
  content = content.replace(/>Joves \(ESO\)<\/a>/g, ` href="joves.html">Joves (ESO)</a>`);
  content = content.replace(/>Projecte ADN[^<]*<\/a>/g, ` href="cami-circular.html">Camí Circular</a>`);
  content = content.replace(/>Veure projecte<\/a>/g, ` href="cami-circular.html">Veure projecte</a>`);
  
  // Modify Camí Circular text directly in the file
  if(file === 'cami-circular.html') {
      content = content.replace(/Projecte ADN(: El misteri)?/gi, 'Camí Circular');
      content = content.replace(/3r ESO/g, "1r d'ESO");
      content = content.replace(/Ciències i Tecnologia/g, "Desigualtat · Fast Fashion");
      content = content.replace(/4 setmanes/g, "~35h + Fase Maker");
      
      const newSequence = `
      <div class="space-y-4 text-gray-800">
        <h3 class="font-bold text-xl text-primary">Part 1: Investigació i Indignació Ètica</h3>
        <ul class="list-decimal pl-5 space-y-2">
            <li><strong>Com és la meva vida i la dels altres?</strong> (Empatia i comparativa nord-sud). Fita: Vídeo-presentació.</li>
            <li><strong>Com és el món actualment?</strong> (Desigualtat global i ODS). Fita: Fotomuntatge físic.</li>
            <li><strong>Per què hi ha xiquets com jo que treballen?</strong> (Percentatges i Desigualtat). Fita: PlayDecide rol laboral.</li>
            <li><strong>Em beneficio de la feina que fan aquests xiquets?</strong> (Connexió personal i Fast Fashion). Fita: Vídeo reflexió.</li>
            <li><strong>Quin és l'impacte de la fast fashion?</strong> (CO2, microplàstics i economia circular). Fita: Eco-etiqueta individual.</li>
        </ul>
        <h3 class="font-bold text-xl text-primary mt-6">Mètode Lombard</h3>
        <p>Arrencada de la fase maker: Design Thinking · Prototipatge ràpid · Pitch.</p>
        <h3 class="font-bold text-xl text-primary mt-6">Part 2: Fase Maker</h3>
        <p>A partir del prototip Lombard: Testar, iterar, documentar i comunicar el producte final col·laborant amb Càritas Tortosa. Fira del centre.</p>
      </div>
      `;
      // We brutally replace the "Seqüència general" area
      content = content.replace(/<h3[^>]*>Seqüència general<\/h3>[\s\S]*?(?=<h3|$)/i, newSequence);
      content = content.replace(/https:\/\/drive\.google\.com[^\s"']*/, 'https://drive.google.com/drive/folders/1tFOtc92oqlXs9P52P2QrvmvJQKPS3bAG?usp=sharing');
  }

  // Adding organic aesthetic touches to generic bg-blue classes if any exist
  content = content.replace(/bg-blue-600/g, 'bg-primary organic-1 card-hover');
  content = content.replace(/bg-[#137fec]/g, 'bg-primary');
  content = content.replace(/text-[#137fec]/g, 'text-primary');
  content = content.replace(/rounded-xl/g, 'rounded-3xl');
  content = content.replace(/rounded-lg/g, 'rounded-3xl');

  fs.writeFileSync(filepath, content, 'utf8');
}

console.log("Updates applied successfully.");
