// Sínia de cassoletes · geometria única de les peces (mm)
// Aquest mòdul és la font de tot: genera l'SVG de tall làser i la geometria 3D.
// Disseny propi (Institut Escola El Temple). Contraplacat de 3 mm.
//
// Coordenades locals de cada peça: x cap a la dreta, y cap amunt (com a matemàtiques).
// Coordenades del món (muntatge): base a y = 0, eix de la roda a (0, 125), eix z = eix de gir.

export const T = 3;            // gruix del contraplacat
export const SHEET = { w: 600, h: 400 };
export const AXLE_Y = 125;     // alçada de l'eix sobre la base
export const R_DISC = 75;      // radi dels discs de la roda
export const SLOT_IN = 57;     // fons de les ranures de la roda
export const N_SLOTS = 24;     // ranures cada 15°
export const DISC_Z = 28.5;    // centre de cada disc (cares interiors a ±27)
export const A_Z = 37;         // centre de cada suport en A
export const CUP_R = 88;       // radi on va el forat del got
export const CANAL = { x0: -115, y0: 158, ang: 20, len: 110 }; // canal: extrem alt i pendent

const D2R = Math.PI / 180;
const r2 = (v) => Math.round(v * 100) / 100;

// ---------- ajudes de geometria ----------
function arc(cx, cy, r, a0, a1, stepDeg = 4) {
  const pts = [];
  const n = Math.max(2, Math.ceil(Math.abs(a1 - a0) / stepDeg));
  for (let i = 0; i <= n; i++) {
    const a = (a0 + (a1 - a0) * i / n) * D2R;
    pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
  }
  return pts;
}
function roundRect(x0, y0, x1, y1, rr) {
  return [
    ...arc(x1 - rr, y0 + rr, rr, -90, 0, 15),
    ...arc(x1 - rr, y1 - rr, rr, 0, 90, 15),
    ...arc(x0 + rr, y1 - rr, rr, 90, 180, 15),
    ...arc(x0 + rr, y0 + rr, rr, 180, 270, 15),
  ];
}
const rect = (x0, y0, x1, y1) => [[x0, y0], [x1, y0], [x1, y1], [x0, y1]];

// quines ranures fan servir 4, 6 o 8 cassoletes (cada 90°, 60° o 45°)
export const slotsFor = (n) => {
  const step = N_SLOTS / n; // 6, 4 o 3
  return Array.from({ length: n }, (_, i) => i * step);
};

// ---------- peces ----------
// contours: polígons de tall (el primer és el contorn exterior; la resta, forats)
// circles: forats rodons {x,y,r}
// engr: gravats {t:'text'|'dot'|'tri'|'sq'|'line'|'arrow'|'dash', ...}

function pecaRoda() {
  const outer = [];
  const step = 360 / N_SLOTS;
  const half = 1.5;
  const rimD = Math.sqrt(R_DISC * R_DISC - half * half);
  const dA = Math.asin(half / R_DISC) / D2R;
  for (let k = 0; k < N_SLOTS; k++) {
    const a = k * step;
    const u = [Math.cos(a * D2R), Math.sin(a * D2R)];
    const n = [-u[1], u[0]];
    const P = (d, e) => [d * u[0] + e * n[0], d * u[1] + e * n[1]];
    outer.push(P(rimD, -half), P(SLOT_IN, -half), P(SLOT_IN, half), P(rimD, half));
    const arcPts = arc(0, 0, R_DISC, a + dA, a + step - dA, 3);
    outer.push(...arcPts.slice(1, -1));
  }
  const engr = [];
  for (let k = 0; k < N_SLOTS; k++) {
    const a = k * step * D2R;
    const at = (r) => [r * Math.cos(a), r * Math.sin(a)];
    if (k % 6 === 0) engr.push({ t: 'dot', p: at(51), s: 2.4 });
    if (k % 4 === 0) engr.push({ t: 'tri', p: at(44), s: 2.8, rot: k * step });
    if (k % 3 === 0) engr.push({ t: 'sq', p: at(37), s: 2.2, rot: k * step });
  }
  engr.push({ t: 'text', p: [0, 14], s: 13, txt: '1' });
  engr.push({ t: 'text', p: [0, -22], s: 6, txt: 'SÍNIA' });
  engr.push({ t: 'arrow', c: [0, 0], r: 27, a0: 200, a1: 330 });
  return { contours: [outer], circles: [{ x: 0, y: 0, r: 4 }], engr };
}

function pecaCassoleta() {
  // u = amplada (va de disc a disc), v = distància a l'eix
  const v0 = SLOT_IN, vt = 75, v1 = 112;
  const outer = [
    [-30, v0], [30, v0], [30, vt], [27, vt], [27, v1],
    [24, v1], [22, v1 - 4], [20, v1],
    [-20, v1], [-22, v1 - 4], [-24, v1],
    [-27, v1], [-27, vt], [-30, vt],
  ];
  return {
    contours: [outer],
    circles: [{ x: 0, y: CUP_R, r: 17 }],
    engr: [{ t: 'text', p: [0, 61.5], s: 6.5, txt: '2' }],
  };
}

function pecaSuport() {
  const outer = [
    [-90, 0], [-84, 0], [-84, -T], [-72, -T], [-72, 0], [-66, 0],
    [0, 86],
    [66, 0], [72, 0], [72, -T], [84, -T], [84, 0], [90, 0],
    ...arc(0, AXLE_Y, 22, -38, 218, 6).filter((p) => p[1] >= AXLE_Y - 18),
  ];
  // assegura que el contorn tanca net amb les rectes dels peus
  return {
    contours: [outer],
    circles: [{ x: 0, y: AXLE_Y, r: 4.3 }],
    engr: [{ t: 'text', p: [0, 97], s: 11, txt: '3' }],
  };
}

function pecaBase() {
  const outer = roundRect(-205, -50, 105, 50, 8);
  const slots = [];
  for (const zc of [A_Z, -A_Z]) {
    slots.push(rect(-84, zc - 1.5, -72, zc + 1.5), rect(72, zc - 1.5, 84, zc + 1.5));
  }
  slots.push(rect(-192, -1.5, -180, 1.5), rect(-150, -1.5, -138, 1.5));
  return {
    contours: [outer, ...slots],
    circles: [],
    engr: [
      { t: 'dash', pts: rect(-97.5, -32.5, 97.5, 32.5) },
      { t: 'text', p: [0, -4], s: 9, txt: 'AQUÍ EL BRICK' },
      { t: 'text', p: [0, -17], s: 5.5, txt: 'amb aigua fins a 4 cm' },
      { t: 'text', p: [-165, 30], s: 12, txt: '4' },
      { t: 'dot', p: [-195, -38], s: 2.4 }, { t: 'text', p: [-185, -40.2], s: 6, txt: '4' },
      { t: 'tri', p: [-172, -38], s: 2.8, rot: 90 }, { t: 'text', p: [-162, -40.2], s: 6, txt: '6' },
      { t: 'sq', p: [-149, -38], s: 2.2, rot: 0 }, { t: 'text', p: [-139, -40.2], s: 6, txt: '8' },
      { t: 'text', p: [-170, 12], s: 5, txt: 'canal' },
    ],
  };
}

function pecaManeta() {
  const outer = [...arc(55, 0, 10, -90, 90, 10), ...arc(0, 0, 10, 90, 270, 10)];
  return {
    contours: [outer],
    circles: [{ x: 0, y: 0, r: 4 }, { x: 55, y: 0, r: 4 }],
    engr: [{ t: 'text', p: [27.5, -2.5], s: 7, txt: '5' }],
  };
}

function pecaVolandera() {
  return {
    contours: [arc(0, 0, 10, 0, 360, 10).slice(0, -1)],
    circles: [{ x: 0, y: 0, r: 4.3 }],
    engr: [{ t: 'text', p: [0, 5.2], s: 4, txt: '6' }],
  };
}

function pecaCanalFons() {
  // s = llargada (0 = extrem alt), w = amplada
  const outer = rect(0, -30, CANAL.len, 30);
  const slots = [];
  for (const w of [25.5, -25.5]) {
    slots.push(rect(20, w - 1.5, 35, w + 1.5), rect(75, w - 1.5, 90, w + 1.5));
  }
  slots.push(rect(29.5, -1.5, 45.5, 1.5), rect(64.5, -1.5, 80.5, 1.5));
  return {
    contours: [outer, ...slots],
    circles: [],
    engr: [
      { t: 'text', p: [10, -4], s: 10, txt: '7' },
      { t: 'line', pts: [[52, 12], [100, 12]] },
      { t: 'line', pts: [[94, 16], [100, 12], [94, 8]] },
      { t: 'text', p: [76, 15], s: 5, txt: 'avall' },
    ],
  };
}

function pecaCanalParet() {
  const L = CANAL.len, H = 25;
  const outer = [
    [0, 0], [20, 0], [20, -T], [35, -T], [35, 0], [75, 0], [75, -T], [90, -T], [90, 0], [L, 0],
    [L, H], [0, H],
  ];
  return { contours: [outer], circles: [], engr: [{ t: 'text', p: [55, 8.5], s: 9, txt: '8' }] };
}

// punt de la cara inferior del canal a la distància s
export function canalPoint(s) {
  const a = CANAL.ang * D2R;
  return [CANAL.x0 - s * Math.cos(a), CANAL.y0 - s * Math.sin(a)];
}

function pecaPota() {
  const a = CANAL.ang * D2R;
  const n = [-Math.sin(a), Math.cos(a)];
  const P = (s, h = 0) => { const b = canalPoint(s); return [b[0] + n[0] * h, b[1] + n[1] * h]; };
  const tR = P(20), tL = P(90);
  const top = [tR, P(30), P(30, T), P(45, T), P(45), P(65), P(65, T), P(80, T), P(80), tL];
  const outer = [
    [tL[0], 0], [-192, 0], [-192, -T], [-180, -T], [-180, 0],
    [-150, 0], [-150, -T], [-138, -T], [-138, 0], [tR[0], 0],
    ...top,
  ];
  const cx = (tL[0] + tR[0]) / 2;
  return {
    contours: [outer, arc(cx, 66, 17, 0, 360, 10).slice(0, -1)],
    circles: [],
    engr: [{ t: 'text', p: [cx, 104], s: 11, txt: '9' }],
  };
}

function pecaProvador() {
  // pinta de prova del kerf: 5 ranures de 2,8 a 3,2 mm
  const outer = [[0, 0], [78, 0], [78, 26]];
  const widths = [3.2, 3.1, 3.0, 2.9, 2.8];
  let x = 74;
  const top = [];
  for (let i = 0; i < widths.length; i++) {
    const w = widths[i];
    const xc = 70 - i * 13;
    top.push([xc + w / 2, 26], [xc + w / 2, 12], [xc - w / 2, 12], [xc - w / 2, 26]);
  }
  outer.push(...top, [0, 26]);
  const engr = widths.map((w, i) => ({ t: 'text', p: [70 - i * 13, 3.5], s: 4.2, txt: w.toFixed(1).replace('.', ',') }));
  engr.push({ t: 'text', p: [7, 15], s: 6, txt: '10' });
  void x;
  return { contours: [outer], circles: [], engr };
}

// ---------- catàleg ----------
export const PIECES = [
  { id: 'roda', num: 1, nom: 'Roda', qty: 2, desc: 'Disc amb 24 ranures i marques per a 4, 6 o 8 cassoletes', ...pecaRoda() },
  { id: 'cassoleta', num: 2, nom: 'Porta-got (cassoleta)', qty: 8, desc: 'Encaixa a les ranures; s\'hi posa un got de plàstic reutilitzat', ...pecaCassoleta() },
  { id: 'suport', num: 3, nom: 'Suport en A', qty: 2, desc: 'Aguanta l\'eix; forat de 8,6 mm perquè giri lliure', ...pecaSuport() },
  { id: 'base', num: 4, nom: 'Base', qty: 1, desc: 'Ranures per als suports i la pota del canal; lloc del brick', ...pecaBase() },
  { id: 'maneta', num: 5, nom: 'Maneta', qty: 1, desc: 'Va enganxada a l\'eix; el mànec és un tros de pal de 8 mm', ...pecaManeta() },
  { id: 'volandera', num: 6, nom: 'Volandera', qty: 2, desc: 'Separa la roda dels suports', ...pecaVolandera() },
  { id: 'canalfons', num: 7, nom: 'Fons del canal', qty: 1, desc: 'Rep l\'aigua que aboquen les cassoletes', ...pecaCanalFons() },
  { id: 'canalparet', num: 8, nom: 'Paret del canal', qty: 2, desc: 'Vores del canal', ...pecaCanalParet() },
  { id: 'pota', num: 9, nom: 'Pota del canal', qty: 1, desc: 'Aguanta el canal inclinat', ...pecaPota() },
  { id: 'provador', num: 10, nom: 'Provador de ranura', qty: 1, desc: 'Per comprovar el kerf abans de tallar-ho tot', ...pecaProvador(), noAssembly: true },
];

export function bbox(piece) {
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  for (const c of piece.contours) for (const [x, y] of c) {
    x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x); y1 = Math.max(y1, y);
  }
  for (const c of piece.circles) {
    x0 = Math.min(x0, c.x - c.r); y0 = Math.min(y0, c.y - c.r); x1 = Math.max(x1, c.x + c.r); y1 = Math.max(y1, c.y + c.r);
  }
  return { x0, y0, x1, y1, w: x1 - x0, h: y1 - y0 };
}

// ---------- col·locació a la planxa de 600 × 400 mm ----------
// [id, x, y, rot]: x,y = cantonada superior esquerra de la caixa (mm, SVG); rot = 0 o 90
export const LAYOUT = [
  ['roda', 5, 5, 0], ['roda', 5, 160, 0],
  ['suport', 160, 5, 0], ['suport', 160, 160, 0],
  ['base', 345, 5, 90],
  ['pota', 450, 5, 0],
  ['cassoleta', 535, 5, 90], ['cassoleta', 535, 70, 90],
  ['cassoleta', 450, 175, 90], ['cassoleta', 510, 175, 90],
  ['cassoleta', 450, 240, 90], ['cassoleta', 510, 240, 90],
  ['cassoleta', 450, 305, 90], ['cassoleta', 510, 305, 90],
  ['maneta', 572, 140, 90],
  ['canalfons', 5, 318, 0],
  ['canalparet', 160, 318, 0], ['canalparet', 160, 352, 0],
  ['volandera', 285, 330, 0], ['volandera', 312, 330, 0],
  ['provador', 355, 322, 0],
];

function placer(piece, X, Y, rot) {
  // rotació (graus, sentit antihorari en coordenades locals), després y cap avall
  const b0 = bbox(piece);
  const cr = Math.cos(rot * D2R), sr = Math.sin(rot * D2R);
  const R = ([x, y]) => [x * cr - y * sr, x * sr + y * cr];
  const corners = [[b0.x0, b0.y0], [b0.x1, b0.y0], [b0.x1, b0.y1], [b0.x0, b0.y1]].map(R);
  const minX = Math.min(...corners.map((c) => c[0]));
  const maxY = Math.max(...corners.map((c) => c[1]));
  const f = (p) => { const q = R(p); return [r2(X + q[0] - minX), r2(Y + (maxY - q[1]))]; };
  return { f, rot };
}

const RED = 'stroke="#FF0000" stroke-width="0.1" fill="none"';
const ptsToPath = (pts) => 'M' + pts.map((p) => p.join(' ')).join(' L') + ' Z';

function engrSVG(e, f, rot) {
  const P = (p) => f(p).join(' ');
  switch (e.t) {
    case 'text': {
      const [x, y] = f(e.p);
      return `<text x="${x}" y="${y}" transform="rotate(${-rot} ${x} ${y})" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="${e.s}" text-anchor="middle" fill="#000000">${e.txt}</text>`;
    }
    case 'dot': { const [x, y] = f(e.p); return `<circle cx="${x}" cy="${y}" r="${e.s}" fill="#000000"/>`; }
    case 'tri': case 'sq': {
      const k = e.t === 'tri' ? 3 : 4;
      const pts = [];
      for (let i = 0; i < k; i++) {
        const a = ((e.rot || 0) + (e.t === 'tri' ? 0 : 45) + i * 360 / k) * D2R;
        const s = e.t === 'tri' ? e.s : e.s * Math.SQRT2;
        pts.push(f([e.p[0] + s * Math.cos(a), e.p[1] + s * Math.sin(a)]));
      }
      return `<path d="${ptsToPath(pts)}" fill="#000000"/>`;
    }
    case 'line': return `<polyline points="${e.pts.map(P).join(' ')}" stroke="#000000" stroke-width="0.6" fill="none"/>`;
    case 'dash': return `<path d="${ptsToPath(e.pts.map(f))}" stroke="#000000" stroke-width="0.5" stroke-dasharray="4 3" fill="none"/>`;
    case 'arrow': {
      const pts = arc(e.c[0], e.c[1], e.r, e.a0, e.a1, 6).map(f);
      const a = e.a1 * D2R;
      const tip = [e.c[0] + e.r * Math.cos(a), e.c[1] + e.r * Math.sin(a)];
      const t = [-Math.sin(a), Math.cos(a)], n = [Math.cos(a), Math.sin(a)];
      const h1 = f([tip[0] - 4 * t[0] + 2.5 * n[0], tip[1] - 4 * t[1] + 2.5 * n[1]]);
      const h2 = f([tip[0] - 4 * t[0] - 2.5 * n[0], tip[1] - 4 * t[1] - 2.5 * n[1]]);
      return `<polyline points="${pts.map((p) => p.join(' ')).join(' ')}" stroke="#000000" stroke-width="0.8" fill="none"/>` +
        `<polyline points="${h1.join(' ')} ${f(tip).join(' ')} ${h2.join(' ')}" stroke="#000000" stroke-width="0.8" fill="none"/>`;
    }
  }
  return '';
}

export function buildSVG() {
  const byId = Object.fromEntries(PIECES.map((p) => [p.id, p]));
  const gEngr = [], gInner = [], gOuter = [];
  for (const [id, X, Y, rot] of LAYOUT) {
    const p = byId[id];
    const { f } = placer(p, X, Y, rot);
    p.engr.forEach((e) => gEngr.push(engrSVG(e, f, rot)));
    p.contours.slice(1).forEach((c) => gInner.push(`<path d="${ptsToPath(c.map(f))}" ${RED}/>`));
    p.circles.forEach((c) => { const [x, y] = f([c.x, c.y]); gInner.push(`<circle cx="${x}" cy="${y}" r="${c.r}" ${RED}/>`); });
    gOuter.push(`<path data-peca="${p.num}" d="${ptsToPath(p.contours[0].map(f))}" ${RED}/>`);
  }
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${SHEET.w}mm" height="${SHEET.h}mm" viewBox="0 0 ${SHEET.w} ${SHEET.h}">
  <title>Sínia de cassoletes · planxa de contraplacat 3 mm (600 × 400 mm)</title>
  <desc>Disseny propi. Vermell #FF0000 0,1 mm = tall. Negre = gravat. Ranures de 3,0 mm nominals: ajusteu el kerf (uns 0,15 mm) amb la peça 10. Ordre: gravat, tall interior, tall exterior.</desc>
  <rect x="0" y="0" width="${SHEET.w}" height="${SHEET.h}" fill="none" stroke="#0000FF" stroke-width="0.1" stroke-dasharray="2 2" data-guia="planxa (no tallar)"/>
  <g id="gravat">
    ${gEngr.join('\n    ')}
  </g>
  <g id="tall-interior">
    ${gInner.join('\n    ')}
  </g>
  <g id="tall-exterior">
    ${gOuter.join('\n    ')}
  </g>
</svg>
`;
}

// caixes ocupades a la planxa (per comprovar que res no se solapa)
export function layoutBoxes() {
  const byId = Object.fromEntries(PIECES.map((p) => [p.id, p]));
  return LAYOUT.map(([id, X, Y, rot]) => {
    const b = bbox(byId[id]);
    const w = rot === 90 ? b.h : b.w, h = rot === 90 ? b.w : b.h;
    return { id, x0: X, y0: Y, x1: X + w, y1: Y + h };
  });
}
