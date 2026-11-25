// Wordcraft art for teens: flat-modern style with soft shading, real proportions, no thick outlines.
// Every scene item is drawn in a 100x100 box, standing on the ground line (y ≈ 94).
// Each drawing function takes the item's main color and returns inner SVG markup.

export const OUT = '#0A2540';

export function shade(hex, amt) {
  let h = hex.replace('#', '');
  if (h.length === 3) h = h.split('').map((x) => x + x).join('');
  const n = parseInt(h, 16);
  const f = (v) => Math.max(0, Math.min(255, Math.round(v + (amt / 100) * 255)));
  const r = f((n >> 16) & 255), g = f((n >> 8) & 255), b = f(n & 255);
  return '#' + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
}

// Gradients are collected while a drawing is built and written into the <svg> by svg().
let DEFS = [];
let gid = 0;
const uid = () => 'wg' + (++gid).toString(36);
// vertical gradient: light top -> darker bottom
export const F = (c, top = 12, bot = -12) => {
  const id = uid();
  DEFS.push(`<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${shade(c, top)}"/><stop offset="1" stop-color="${shade(c, bot)}"/></linearGradient>`);
  return `url(#${id})`;
};
// horizontal gradient: light left -> darker right (gives a round, 3D feel)
export const FH = (c, l = 12, r = -14) => {
  const id = uid();
  DEFS.push(`<linearGradient id="${id}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${shade(c, l)}"/><stop offset="1" stop-color="${shade(c, r)}"/></linearGradient>`);
  return `url(#${id})`;
};
// radial gradient: highlight up-left
export const FR = (c) => {
  const id = uid();
  DEFS.push(`<radialGradient id="${id}" cx="0.35" cy="0.3" r="0.8"><stop offset="0" stop-color="${shade(c, 18)}"/><stop offset="0.6" stop-color="${c}"/><stop offset="1" stop-color="${shade(c, -18)}"/></radialGradient>`);
  return `url(#${id})`;
};
export const E = (c, w = 1.3) => `stroke="${shade(c, -34)}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
export const sh = (cx, cy, rx) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${Math.max(1.5, rx * 0.11)}" fill="${OUT}" opacity=".16"/>`;
const dk = (c, a = -16) => shade(c, a);
const lt = (c, a = 18) => shade(c, a);

const WOOD = '#B98653';
const WOOD_D = '#8C5E35';
const METAL = '#B7C3CE';
const DARK = '#2B3440';
const WHITE = '#F4F2EC';

export function svg(inner, box = '0 0 100 100', extra = '') {
  const d = DEFS.join('');
  DEFS = [];
  return `<svg viewBox="${box}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" ${extra}>${d ? `<defs>${d}</defs>` : ''}${inner}</svg>`;
}

// ---------------- bedroom ----------------
export const ART = {
  bed_single: (c) => `${sh(50, 94, 46)}
    <rect x="6" y="36" width="11" height="58" rx="3" fill="${F(WOOD)}" ${E(WOOD)}/>
    <rect x="86" y="62" width="8" height="32" rx="2.5" fill="${F(WOOD)}" ${E(WOOD)}/>
    <rect x="14" y="70" width="76" height="12" rx="2" fill="${F(WOOD)}" ${E(WOOD)}/>
    <rect x="16" y="58" width="72" height="14" rx="4" fill="${F(WHITE)}" ${E(WHITE)}/>
    <path d="M19 58 Q19 48 30 49 L37 50 Q41 52 40 58 Z" fill="${F('#FFFFFF')}" ${E(WHITE)}/>
    <path d="M38 52 Q60 47 86 52 Q90 53 90 58 L90 78 Q64 81 38 76 Z" fill="${F(c)}" ${E(c)}/>
    <path d="M46 56 Q64 53 84 56 M44 66 Q64 64 86 67" fill="none" stroke="${lt(c, 14)}" stroke-width="1.6" stroke-linecap="round"/>`,
  bed_double: (c) => `${sh(50, 94, 47)}
    <path d="M5 26 Q5 18 13 18 L30 18 Q38 18 38 26 L38 94 L5 94 Z" fill="${F(c, 16, -6)}" ${E(c)}/>
    <path d="M12 26 L12 60 M21 24 L21 60 M30 26 L30 60" stroke="${dk(c, -8)}" stroke-width="1.4"/>
    <rect x="8" y="74" width="88" height="14" rx="3" fill="${F(dk(c, -10))}" ${E(c)}/>
    <rect x="10" y="60" width="86" height="16" rx="5" fill="${F(WHITE)}" ${E(WHITE)}/>
    <path d="M14 60 Q14 49 26 50 L34 51 Q38 54 36 60 Z M26 60 Q26 50 38 51 L46 52 Q50 55 48 60 Z" fill="${F('#FFFFFF')}" ${E(WHITE)}/>
    <path d="M44 54 Q70 50 92 55 Q96 56 96 61 L96 80 Q70 83 44 79 Z" fill="${F(lt(c, 10))}" ${E(c)}/>
    <path d="M44 66 L96 68" stroke="${dk(c, -6)}" stroke-width="5" opacity=".35"/>
    <rect x="12" y="88" width="5" height="6" fill="${DARK}"/><rect x="88" y="88" width="5" height="6" fill="${DARK}"/>`,
  bed_bunk: (c) => `${sh(50, 94, 44)}
    <rect x="8" y="8" width="6" height="86" rx="2" fill="${F(WOOD)}" ${E(WOOD)}/>
    <rect x="86" y="8" width="6" height="86" rx="2" fill="${F(WOOD)}" ${E(WOOD)}/>
    <rect x="12" y="34" width="76" height="6" rx="2" fill="${F(WOOD)}" ${E(WOOD)}/>
    <rect x="12" y="80" width="76" height="6" rx="2" fill="${F(WOOD)}" ${E(WOOD)}/>
    <rect x="14" y="26" width="72" height="9" rx="3" fill="${F(c)}" ${E(c)}/>
    <rect x="14" y="72" width="72" height="9" rx="3" fill="${F(lt(c, 12))}" ${E(c)}/>
    <rect x="16" y="20" width="16" height="7" rx="3" fill="${WHITE}" ${E(WHITE)}/><rect x="16" y="66" width="16" height="7" rx="3" fill="${WHITE}" ${E(WHITE)}/>
    <path d="M12 14 L88 14" stroke="${WOOD_D}" stroke-width="3"/>
    <path d="M70 34 L70 80 M80 34 L80 80 M70 46 L80 46 M70 58 L80 58 M70 70 L80 70" stroke="${WOOD_D}" stroke-width="2.4"/>`,
  chair_wood: (c) => `${sh(50, 94, 24)}
    <path d="M32 94 L34 62 M66 94 L64 62 M42 90 L43 64 M58 90 L57 64" stroke="${dk(c, -20)}" stroke-width="4" stroke-linecap="round"/>
    <path d="M30 12 Q30 8 34 8 L40 8 L40 60 L30 60 Z" fill="${F(c)}" ${E(c)}/>
    <path d="M33 16 L37 16 M33 26 L37 26 M33 36 L37 36" stroke="${lt(c)}" stroke-width="1.5"/>
    <path d="M28 56 L72 56 Q74 56 74 59 L74 64 L28 64 Z" fill="${F(c, 20, -4)}" ${E(c)}/>`,
  armchair: (c) => `${sh(50, 94, 44)}
    <path d="M18 34 Q18 14 50 14 Q82 14 82 34 L82 66 L18 66 Z" fill="${F(c)}" ${E(c)}/>
    <rect x="22" y="58" width="56" height="18" rx="6" fill="${F(lt(c, 10))}" ${E(c)}/>
    <path d="M6 48 Q6 40 14 40 L22 40 L22 84 L10 84 Q6 84 6 80 Z M94 48 Q94 40 86 40 L78 40 L78 84 L90 84 Q94 84 94 80 Z" fill="${FH(c)}" ${E(c)}/>
    <rect x="18" y="76" width="64" height="10" rx="2" fill="${dk(c, -12)}"/>
    <rect x="14" y="86" width="5" height="8" rx="1" fill="${WOOD_D}"/><rect x="81" y="86" width="5" height="8" rx="1" fill="${WOOD_D}"/>`,
  office_chair: (c) => `${sh(50, 95, 26)}
    <path d="M50 70 L50 86 M30 92 L50 86 L70 92 M50 86 L50 94" stroke="${DARK}" stroke-width="3.5" stroke-linecap="round"/>
    <circle cx="30" cy="93" r="2.6" fill="${DARK}"/><circle cx="70" cy="93" r="2.6" fill="${DARK}"/><circle cx="50" cy="95" r="2.6" fill="${DARK}"/>
    <rect x="32" y="8" width="36" height="46" rx="12" fill="${F(c)}" ${E(c)}/>
    <rect x="28" y="56" width="44" height="14" rx="6" fill="${F(c, 16, -6)}" ${E(c)}/>
    <path d="M26 48 L26 60 M74 48 L74 60" stroke="${DARK}" stroke-width="3" stroke-linecap="round"/>`,
  sofa: (c) => `${sh(50, 94, 48)}
    <rect x="10" y="40" width="80" height="30" rx="8" fill="${F(c)}" ${E(c)}/>
    <rect x="14" y="60" width="35" height="16" rx="5" fill="${F(lt(c, 10))}" ${E(c)}/><rect x="51" y="60" width="35" height="16" rx="5" fill="${F(lt(c, 10))}" ${E(c)}/>
    <rect x="3" y="52" width="14" height="32" rx="6" fill="${FH(c)}" ${E(c)}/><rect x="83" y="52" width="14" height="32" rx="6" fill="${FH(c)}" ${E(c)}/>
    <rect x="12" y="76" width="76" height="9" rx="2" fill="${dk(c, -14)}"/>
    <rect x="12" y="85" width="4" height="9" fill="${WOOD_D}"/><rect x="84" y="85" width="4" height="9" fill="${WOOD_D}"/>`,
  table_wood: (c) => `${sh(50, 94, 42)}
    <rect x="14" y="48" width="6" height="46" rx="1.5" fill="${F(dk(c))}"/>
    <rect x="80" y="48" width="6" height="46" rx="1.5" fill="${F(dk(c))}"/>
    <rect x="26" y="48" width="5" height="40" fill="${dk(c, -28)}"/><rect x="69" y="48" width="5" height="40" fill="${dk(c, -28)}"/>
    <path d="M6 40 L94 40 L92 50 L8 50 Z" fill="${F(c, 14, -2)}" ${E(c)}/>
    <path d="M8 50 L92 50" stroke="${dk(c, -20)}" stroke-width="2"/>`,
  table_round: (c) => `${sh(50, 94, 26)}
    <rect x="46" y="48" width="8" height="40" fill="${FH(c)}"/>
    <ellipse cx="50" cy="92" rx="20" ry="4" fill="${dk(c, -20)}"/>
    <ellipse cx="50" cy="46" rx="42" ry="8" fill="${F(c, 16, -6)}" ${E(c)}/>
    <path d="M8 46 Q50 60 92 46" fill="none" stroke="${dk(c, -18)}" stroke-width="2.5"/>`,
  desk: (c) => `${sh(50, 94, 46)}
    <rect x="8" y="44" width="6" height="50" fill="${F(dk(c))}"/>
    <rect x="56" y="44" width="36" height="50" rx="2" fill="${F(c)}" ${E(c)}/>
    <rect x="59" y="48" width="30" height="13" rx="1.5" fill="${lt(c, 6)}" ${E(c, 1)}/><rect x="59" y="64" width="30" height="13" rx="1.5" fill="${lt(c, 6)}" ${E(c, 1)}/><rect x="59" y="80" width="30" height="11" rx="1.5" fill="${lt(c, 6)}" ${E(c, 1)}/>
    <rect x="70" y="53" width="8" height="2.4" rx="1.2" fill="${DARK}"/><rect x="70" y="69" width="8" height="2.4" rx="1.2" fill="${DARK}"/><rect x="70" y="84" width="8" height="2.4" rx="1.2" fill="${DARK}"/>
    <rect x="4" y="38" width="92" height="7" rx="1.5" fill="${F(lt(c, 10))}" ${E(c)}/>`,
  nightstand: (c) => `${sh(50, 94, 26)}
    <rect x="24" y="44" width="52" height="44" rx="3" fill="${F(c)}" ${E(c)}/>
    <rect x="28" y="49" width="44" height="16" rx="2" fill="${lt(c, 6)}" ${E(c, 1)}/><rect x="28" y="68" width="44" height="16" rx="2" fill="${lt(c, 6)}" ${E(c, 1)}/>
    <circle cx="50" cy="57" r="2" fill="${DARK}"/><circle cx="50" cy="76" r="2" fill="${DARK}"/>
    <rect x="22" y="40" width="56" height="6" rx="2" fill="${F(lt(c, 10))}" ${E(c)}/>
    <rect x="27" y="88" width="4" height="6" fill="${DARK}"/><rect x="69" y="88" width="4" height="6" fill="${DARK}"/>`,
  wardrobe: (c) => `${sh(50, 94, 32)}
    <rect x="20" y="6" width="60" height="84" rx="3" fill="${F(c)}" ${E(c)}/>
    <rect x="24" y="10" width="25" height="76" rx="2" fill="none" stroke="${dk(c, -10)}" stroke-width="1.5"/><rect x="51" y="10" width="25" height="76" rx="2" fill="none" stroke="${dk(c, -10)}" stroke-width="1.5"/>
    <rect x="45" y="40" width="2.4" height="12" rx="1.2" fill="${METAL}"/><rect x="53" y="40" width="2.4" height="12" rx="1.2" fill="${METAL}"/>
    <rect x="18" y="4" width="64" height="5" rx="1.5" fill="${dk(c, -8)}"/>
    <rect x="24" y="90" width="5" height="4" fill="${DARK}"/><rect x="71" y="90" width="5" height="4" fill="${DARK}"/>`,
  wardrobe_mirror: (c) => `${sh(50, 94, 32)}
    <rect x="20" y="6" width="60" height="84" rx="3" fill="${F(c)}" ${E(c)}/>
    <rect x="24" y="10" width="25" height="76" rx="2" fill="${F('#CFE9F3', 10, -6)}" stroke="${dk(c, -10)}" stroke-width="1.5"/>
    <path d="M28 22 L40 14 M28 34 L44 22" stroke="#FFFFFF" stroke-width="2" opacity=".7"/>
    <rect x="51" y="10" width="25" height="76" rx="2" fill="none" stroke="${dk(c, -10)}" stroke-width="1.5"/>
    <rect x="53" y="40" width="2.4" height="12" rx="1.2" fill="${METAL}"/>
    <rect x="24" y="90" width="5" height="4" fill="${DARK}"/><rect x="71" y="90" width="5" height="4" fill="${DARK}"/>`,
  shelf: (c) => `${sh(50, 94, 30)}
    <rect x="18" y="6" width="64" height="88" rx="2" fill="${F(c)}" ${E(c)}/>
    <rect x="22" y="10" width="56" height="80" fill="${dk(c, -14)}"/>
    <rect x="22" y="34" width="56" height="3" fill="${c}"/><rect x="22" y="60" width="56" height="3" fill="${c}"/>
    <rect x="26" y="16" width="5" height="18" fill="#E25C4F"/><rect x="32" y="18" width="5" height="16" fill="#3DB8C9"/><rect x="38" y="15" width="4" height="19" fill="#F2C14E"/>
    <rect x="44" y="20" width="5" height="14" fill="#5A7BD8" transform="rotate(12 46 27)"/>
    <circle cx="66" cy="28" r="5.5" fill="#56B870"/><rect x="62" y="28" width="8" height="6" fill="#D9825B"/>
    <rect x="26" y="44" width="16" height="16" rx="2" fill="#F4F2EC"/><rect x="48" y="42" width="5" height="18" fill="#8E5CD9"/><rect x="54" y="44" width="5" height="16" fill="#3FB36F"/><rect x="60" y="41" width="5" height="19" fill="#E9463F"/>
    <rect x="28" y="72" width="22" height="18" rx="2" fill="${lt(c, 8)}"/><circle cx="64" cy="82" r="7" fill="#F4F2EC"/>`,
  shelf_wall: (c) => `
    <rect x="12" y="40" width="76" height="5" rx="1.5" fill="${F(c)}" ${E(c)}/>
    <rect x="12" y="74" width="76" height="5" rx="1.5" fill="${F(c)}" ${E(c)}/>
    <path d="M20 45 L20 50 L26 45 M80 45 L80 50 L74 45 M20 79 L20 84 L26 79 M80 79 L80 84 L74 79" fill="${DARK}" stroke="${DARK}" stroke-width="1.5"/>
    <rect x="18" y="24" width="5" height="16" fill="#E25C4F"/><rect x="24" y="26" width="5" height="14" fill="#3DB8C9"/><rect x="30" y="22" width="5" height="18" fill="#F2C14E"/>
    <path d="M62 40 Q56 30 60 22 Q66 30 64 40 Z M66 40 Q70 28 78 26 Q76 36 68 40 Z" fill="#4CAF6A"/><rect x="58" y="32" width="14" height="8" rx="1.5" fill="#E0E5EA"/>
    <rect x="44" y="60" width="14" height="14" rx="1.5" fill="#F4F2EC" stroke="#C9D0D6"/><circle cx="51" cy="67" r="3" fill="#3DB8C9"/>
    <rect x="24" y="62" width="10" height="12" rx="5" fill="#8E5CD9"/>`,
  lamp_floor: (c) => `${sh(50, 94, 14)}
    <path d="M50 92 L40 94 M50 92 L60 94 M50 92 L50 30" stroke="${DARK}" stroke-width="2.4" stroke-linecap="round"/>
    <path d="M34 30 L66 30 L60 8 L40 8 Z" fill="${F(c, 16, -8)}" ${E(c)}/>
    <ellipse cx="50" cy="31" rx="16" ry="2.4" fill="#FFE9A8"/>
    <path d="M50 30 Q42 60 30 92" stroke="#FFE9A8" stroke-width="12" opacity=".12" fill="none"/>`,
  lamp_desk: (c) => `${sh(30, 94, 16)}
    <ellipse cx="30" cy="91" rx="15" ry="3.6" fill="${F(c)}" ${E(c)}/>
    <path d="M30 90 L30 58 L58 40" fill="none" stroke="${DARK}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="30" cy="58" r="3" fill="${dk(c)}"/>
    <path d="M50 30 Q66 22 76 32 L80 46 L58 52 Z" fill="${F(c)}" ${E(c)}/>
    <ellipse cx="70" cy="50" rx="11" ry="3" fill="#FFE9A8" transform="rotate(-14 70 50)"/>`,
  lamp_globe: (c) => `${sh(50, 94, 14)}
    <rect x="47" y="58" width="6" height="34" rx="2" fill="${FH(METAL)}"/>
    <ellipse cx="50" cy="92" rx="14" ry="3.2" fill="${DARK}"/>
    <circle cx="50" cy="38" r="24" fill="${FR(c)}"/>
    <circle cx="50" cy="38" r="24" fill="none" stroke="${dk(c, -20)}" stroke-width="1.2"/>
    <ellipse cx="42" cy="28" rx="7" ry="4" fill="#FFFFFF" opacity=".45" transform="rotate(-30 42 28)"/>`,
  lamp_bedside: (c) => `${sh(50, 94, 16)}
    <path d="M38 94 Q30 80 40 66 L60 66 Q70 80 62 94 Z" fill="${FH(c)}" ${E(c)}/>
    <rect x="48" y="52" width="4" height="14" fill="${METAL}"/>
    <path d="M30 54 L70 54 L64 28 L36 28 Z" fill="${F(WHITE, 4, -10)}" ${E(WHITE)}/>
    <ellipse cx="50" cy="55" rx="20" ry="2" fill="#FFE9A8"/>`,
  window: (c) => `
    <rect x="14" y="8" width="72" height="78" rx="2" fill="${F(c, 8, -8)}" ${E(c)}/>
    <rect x="20" y="14" width="60" height="66" fill="${F('#9FD6EE', 10, -2)}"/>
    <path d="M20 62 Q40 52 56 60 Q70 54 80 58 L80 80 L20 80 Z" fill="#7FC88A"/>
    <circle cx="66" cy="28" r="6" fill="#FFF3C4"/>
    <path d="M50 14 L50 80 M20 47 L80 47" stroke="${c}" stroke-width="4"/>
    <path d="M26 22 L38 16 M24 34 L42 22" stroke="#FFFFFF" stroke-width="2" opacity=".55"/>
    <rect x="10" y="84" width="80" height="6" rx="1.5" fill="${F(lt(c, 6))}" ${E(c)}/>`,
  window_tall: (c) => `
    <path d="M24 90 L24 30 Q24 8 50 8 Q76 8 76 30 L76 90 Z" fill="${F(c, 8, -8)}" ${E(c)}/>
    <path d="M30 86 L30 32 Q30 14 50 14 Q70 14 70 32 L70 86 Z" fill="${F('#9FD6EE', 10, -2)}"/>
    <path d="M30 68 Q48 60 70 66 L70 86 L30 86 Z" fill="#7FC88A"/>
    <path d="M50 14 L50 86 M30 44 L70 44 M30 66 L70 66" stroke="${c}" stroke-width="3"/>
    <rect x="20" y="88" width="60" height="5" rx="1.5" fill="${F(lt(c, 6))}"/>`,
  curtain: (c) => `
    <rect x="4" y="8" width="92" height="3" rx="1.5" fill="${DARK}"/>
    <circle cx="5" cy="9.5" r="3" fill="${DARK}"/><circle cx="95" cy="9.5" r="3" fill="${DARK}"/>
    <path d="M8 11 L40 11 Q34 36 28 48 Q36 66 42 94 L8 94 Z" fill="${FH(c, 14, -10)}" ${E(c)}/>
    <path d="M92 11 L60 11 Q66 36 72 48 Q64 66 58 94 L92 94 Z" fill="${FH(c, -10, 14)}" ${E(c)}/>
    <path d="M16 12 L16 92 M24 12 Q22 50 28 92 M84 12 L84 92 M76 12 Q78 50 72 92" stroke="${dk(c, -8)}" stroke-width="1.4" fill="none"/>
    <rect x="22" y="45" width="12" height="5" rx="2.5" fill="${dk(c, -18)}"/><rect x="66" y="45" width="12" height="5" rx="2.5" fill="${dk(c, -18)}"/>`,
  blinds: (c) => `
    <rect x="12" y="8" width="76" height="5" rx="1.5" fill="${DARK}"/>
    ${Array.from({ length: 11 }, (_, i) => `<rect x="14" y="${15 + i * 6.6}" width="72" height="5" rx="1.2" fill="${F(c, 10, -10)}"/>`).join('')}
    <path d="M82 13 L82 90" stroke="${DARK}" stroke-width="1"/><circle cx="82" cy="91" r="1.8" fill="${DARK}"/>`,
  mirror: (c) => `${sh(50, 95, 20)}
    <path d="M32 94 L42 72 M68 94 L58 72" stroke="${dk(c, -14)}" stroke-width="3" stroke-linecap="round"/>
    <ellipse cx="50" cy="44" rx="22" ry="38" fill="${F(c)}" ${E(c)}/>
    <ellipse cx="50" cy="44" rx="17" ry="33" fill="${F('#D6EEF6', 8, -8)}"/>
    <path d="M40 24 L52 14 M38 36 L58 18" stroke="#FFFFFF" stroke-width="2.5" opacity=".65" stroke-linecap="round"/>`,
  mirror_round: (c) => `
    <circle cx="50" cy="48" r="38" fill="${FR(c)}"/>
    <circle cx="50" cy="48" r="31" fill="${F('#D6EEF6', 8, -8)}"/>
    <path d="M32 36 L46 24 M32 48 L56 26" stroke="#FFFFFF" stroke-width="3" opacity=".6" stroke-linecap="round"/>
    <path d="M50 10 L50 4" stroke="${DARK}" stroke-width="1.5"/>`,
  picture: (c) => `
    <path d="M38 14 L50 5 L62 14" fill="none" stroke="${DARK}" stroke-width="1.2"/>
    <rect x="12" y="14" width="76" height="60" rx="1.5" fill="${F(c)}" ${E(c)}/>
    <rect x="18" y="20" width="64" height="48" fill="${F('#A9DCF0', 8, -4)}"/>
    <path d="M18 68 L38 42 L50 54 L62 40 L82 68 Z" fill="#4E9E6B"/>
    <path d="M56 46 L62 40 L68 48" fill="#FFFFFF" opacity=".7"/>
    <circle cx="70" cy="30" r="5" fill="#FFE18A"/>`,
  poster: (c) => `
    <rect x="18" y="8" width="64" height="84" rx="1" fill="${WHITE}" ${E(WHITE)}/>
    <rect x="24" y="14" width="52" height="56" fill="${F(c, 10, -10)}"/>
    <circle cx="44" cy="40" r="14" fill="${lt(c, 30)}" opacity=".85"/>
    <rect x="50" y="34" width="20" height="30" fill="${dk(c, -24)}" opacity=".8"/>
    <rect x="24" y="76" width="34" height="4" rx="1" fill="${DARK}"/><rect x="24" y="83" width="22" height="3" rx="1" fill="${METAL}"/>
    <circle cx="50" cy="10" r="1.8" fill="#E25C4F"/>`,
  photos: (c) => `
    <path d="M6 20 Q50 30 94 20" fill="none" stroke="${DARK}" stroke-width="1"/>
    <g transform="rotate(-6 24 46)"><rect x="12" y="24" width="24" height="30" fill="#FFFFFF" ${E(WHITE)}/><rect x="15" y="27" width="18" height="18" fill="${c}"/></g>
    <g transform="rotate(4 50 48)"><rect x="38" y="26" width="24" height="30" fill="#FFFFFF" ${E(WHITE)}/><rect x="41" y="29" width="18" height="18" fill="${lt(c, 18)}"/></g>
    <g transform="rotate(-3 76 44)"><rect x="64" y="22" width="24" height="30" fill="#FFFFFF" ${E(WHITE)}/><rect x="67" y="25" width="18" height="18" fill="${dk(c, -14)}"/></g>
    <circle cx="24" cy="24" r="2" fill="#F2C14E"/><circle cx="50" cy="27" r="2" fill="#F2C14E"/><circle cx="76" cy="23" r="2" fill="#F2C14E"/>`,
  clock: (c) => `
    <circle cx="50" cy="50" r="36" fill="${FR(c)}"/>
    <circle cx="50" cy="50" r="30" fill="${F(WHITE, 6, -6)}"/>
    ${[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((a) => `<rect x="49" y="22" width="2" height="${a % 90 ? 3 : 6}" fill="${DARK}" transform="rotate(${a} 50 50)"/>`).join('')}
    <path d="M50 50 L50 30 M50 50 L64 57" stroke="${DARK}" stroke-width="3" stroke-linecap="round"/>
    <path d="M50 50 L40 72" stroke="#E25C4F" stroke-width="1.2"/><circle cx="50" cy="50" r="2.6" fill="${DARK}"/>`,
  alarm_clock: (c) => `${sh(50, 94, 24)}
    <circle cx="30" cy="22" r="9" fill="${F(c)}" ${E(c)}/><circle cx="70" cy="22" r="9" fill="${F(c)}" ${E(c)}/>
    <path d="M34 86 L28 94 M66 86 L72 94" stroke="${DARK}" stroke-width="3" stroke-linecap="round"/>
    <circle cx="50" cy="56" r="32" fill="${FR(c)}"/>
    <circle cx="50" cy="56" r="25" fill="${WHITE}"/>
    <path d="M50 56 L50 40 M50 56 L62 62" stroke="${DARK}" stroke-width="3" stroke-linecap="round"/><circle cx="50" cy="56" r="2.4" fill="${DARK}"/>`,
  rug: (c) => `
    <ellipse cx="50" cy="74" rx="48" ry="16" fill="${F(c, 10, -10)}"/>
    <ellipse cx="50" cy="74" rx="38" ry="11" fill="none" stroke="${lt(c, 22)}" stroke-width="2"/>
    <ellipse cx="50" cy="74" rx="20" ry="5" fill="${dk(c, -10)}"/>`,
  rug_striped: (c) => `
    <path d="M14 62 L86 62 L98 88 L2 88 Z" fill="${F(c, 8, -8)}"/>
    <path d="M12 67 L88 67 M8 74 L92 74 M5 81 L95 81" stroke="${lt(c, 24)}" stroke-width="3"/>
    <path d="M2 88 L2 92 M8 88 L8 92 M14 88 L14 92 M20 88 L20 92 M80 88 L80 92 M86 88 L86 92 M92 88 L92 92 M98 88 L98 92" stroke="${lt(c, 24)}" stroke-width="1.5"/>`,
  rug_fluffy: (c) => `
    <path d="M6 76 Q4 64 24 61 Q50 56 76 61 Q96 64 94 76 Q96 88 76 90 Q50 94 24 90 Q4 88 6 76 Z" fill="${F(lt(c, 10), 10, -12)}"/>
    ${Array.from({ length: 22 }, (_, i) => `<path d="M${8 + i * 4} ${66 + (i % 3) * 7} q1 -3 2 0" stroke="${lt(c, 30)}" stroke-width="1.2" fill="none"/>`).join('')}`,
  plant: (c) => `${sh(50, 94, 16)}
    <path d="M50 64 Q34 52 20 28 Q38 32 48 54 Z" fill="${F('#3F9E5E', 10, -10)}"/>
    <path d="M50 64 Q66 50 82 30 Q64 30 52 54 Z" fill="${F('#4CAF6A', 10, -10)}"/>
    <path d="M50 64 Q44 34 54 10 Q62 36 52 64 Z" fill="${F('#5BBF78', 10, -10)}"/>
    <path d="M30 36 L36 44 M70 38 L64 46" stroke="#2F7D4A" stroke-width="1"/>
    <path d="M32 62 L68 62 L62 94 L38 94 Z" fill="${FH(c)}" ${E(c)}/>
    <rect x="30" y="60" width="40" height="6" rx="1.5" fill="${lt(c, 10)}"/>`,
  cactus: (c) => `${sh(50, 94, 14)}
    <path d="M46 66 L46 24 Q50 16 54 24 L54 66 Z" fill="${FH('#4CAF6A')}"/>
    <path d="M46 46 L36 46 Q32 46 32 40 L32 30 Q36 26 38 30 L38 40 L46 40 Z M54 50 L62 50 L62 38 Q66 34 68 38 L68 52 Q68 56 64 56 L54 56 Z" fill="${FH('#45A462')}"/>
    <path d="M38 64 L62 64 L58 94 L42 94 Z" fill="${FH(c)}" ${E(c)}/>
    <circle cx="50" cy="20" r="3" fill="#FF8FB8"/>`,
  plant_hanging: (c) => `
    <path d="M50 2 L36 40 M50 2 L64 40" stroke="${DARK}" stroke-width="1"/>
    <path d="M32 40 Q32 58 50 58 Q68 58 68 40 Z" fill="${FH(c)}" ${E(c)}/>
    <path d="M36 42 Q26 60 30 84 M44 46 Q40 70 46 92 M58 46 Q62 66 56 86 M64 42 Q76 58 70 78" stroke="#3F9E5E" stroke-width="2" fill="none"/>
    ${[[30, 56], [29, 70], [32, 82], [42, 62], [44, 78], [46, 90], [60, 60], [58, 74], [57, 84], [68, 54], [72, 66], [70, 76]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="3.5" ry="2.2" fill="#56B870" transform="rotate(30 ${x} ${y})"/>`).join('')}`,
  vase: (c) => `${sh(50, 94, 12)}
    <path d="M50 50 Q40 30 34 16 M50 50 Q52 26 50 12 M50 50 Q60 32 68 20" stroke="#3F9E5E" stroke-width="1.8" fill="none"/>
    <circle cx="34" cy="14" r="6" fill="#FF8FB8"/><circle cx="50" cy="10" r="6" fill="#F2C14E"/><circle cx="68" cy="18" r="6" fill="#E25C4F"/>
    <circle cx="34" cy="14" r="2" fill="#FFFFFF"/><circle cx="50" cy="10" r="2" fill="#FFFFFF"/><circle cx="68" cy="18" r="2" fill="#FFFFFF"/>
    <path d="M42 48 L58 48 Q58 56 64 66 Q70 80 62 94 L38 94 Q30 80 36 66 Q42 56 42 48 Z" fill="${FH(c)}" ${E(c)}/>`,
  pillow: (c) => `${sh(50, 86, 38)}
    <path d="M12 46 Q50 36 88 46 Q94 62 88 78 Q50 88 12 78 Q6 62 12 46 Z" fill="${F(c, 16, -10)}" ${E(c)}/>
    <path d="M28 52 Q50 46 72 52" fill="none" stroke="${lt(c, 20)}" stroke-width="2" stroke-linecap="round"/>`,
  pillow_round: (c) => `${sh(50, 88, 30)}
    <circle cx="50" cy="60" r="28" fill="${FR(c)}"/>
    ${[0, 45, 90, 135].map((a) => `<path d="M50 34 L50 86" stroke="${dk(c, -10)}" stroke-width="1" transform="rotate(${a} 50 60)"/>`).join('')}
    <circle cx="50" cy="60" r="4" fill="${dk(c, -16)}"/>`,
  book: (c) => `${sh(50, 94, 34)}
    <rect x="16" y="78" width="68" height="14" rx="1.5" fill="${F(c)}"/><rect x="18" y="80" width="62" height="10" fill="${WHITE}"/><rect x="16" y="78" width="6" height="14" fill="${dk(c, -10)}"/>
    <rect x="22" y="64" width="60" height="14" rx="1.5" fill="${F('#3DB8C9')}"/><rect x="24" y="66" width="54" height="10" fill="${WHITE}"/><rect x="22" y="64" width="6" height="14" fill="#2A8F9D"/>
    <rect x="18" y="50" width="62" height="14" rx="1.5" fill="${F(lt(c, 16))}" transform="rotate(-4 50 57)"/>`,
  book_open: (c) => `${sh(50, 90, 40)}
    <path d="M8 82 L8 40 Q30 34 50 42 Q70 34 92 40 L92 82 Q70 76 50 84 Q30 76 8 82 Z" fill="${F(c)}"/>
    <path d="M12 78 L12 38 Q30 32 50 40 L50 80 Q30 72 12 78 Z M88 78 L88 38 Q70 32 50 40 L50 80 Q70 72 88 78 Z" fill="${F(WHITE, 4, -6)}"/>
    <path d="M18 46 L42 48 M18 54 L42 56 M18 62 L40 64 M58 48 L82 46 M58 56 L82 54 M58 64 L80 62" stroke="${METAL}" stroke-width="1.4"/>`,
  radio: (c) => `${sh(50, 92, 38)}
    <path d="M28 38 L70 10" stroke="${METAL}" stroke-width="2" stroke-linecap="round"/>
    <rect x="10" y="36" width="80" height="52" rx="8" fill="${F(c)}" ${E(c)}/>
    <circle cx="32" cy="62" r="15" fill="${dk(c, -26)}"/>
    ${[0, 1, 2, 3, 4].map((i) => `<path d="M${22 + i * 5} ${50} L${22 + i * 5} 74" stroke="${dk(c, -40)}" stroke-width="1.4"/>`).join('')}
    <rect x="54" y="46" width="28" height="12" rx="2" fill="#F5E9C8"/><path d="M60 46 L60 58" stroke="#E25C4F" stroke-width="1.5"/>
    <circle cx="60" cy="72" r="5" fill="${WHITE}"/><circle cx="76" cy="72" r="5" fill="${WHITE}"/>`,
  record_player: (c) => `${sh(50, 92, 44)}
    <rect x="6" y="50" width="88" height="36" rx="5" fill="${F(c)}" ${E(c)}/>
    <rect x="6" y="80" width="88" height="6" rx="2" fill="${dk(c, -14)}"/>
    <ellipse cx="42" cy="50" rx="32" ry="8" fill="#1C2430"/>
    <ellipse cx="42" cy="50" rx="24" ry="6" fill="none" stroke="#3A4656" stroke-width="1"/><ellipse cx="42" cy="50" rx="16" ry="4" fill="none" stroke="#3A4656" stroke-width="1"/>
    <ellipse cx="42" cy="50" rx="7" ry="2" fill="#3DDBC4"/>
    <path d="M86 44 L84 34 L62 47" fill="none" stroke="${METAL}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="84" cy="66" r="4" fill="${METAL}"/><circle cx="72" cy="66" r="4" fill="${METAL}"/>`,
  guitar: (c) => `${sh(50, 94, 16)}
    <rect x="47" y="6" width="6" height="46" rx="1" fill="#6B4528"/>
    <rect x="44" y="2" width="12" height="10" rx="2" fill="#4A2F1C"/>
    <path d="M50 48 Q34 48 34 60 Q34 66 38 68 Q30 72 30 80 Q30 94 50 94 Q70 94 70 80 Q70 72 62 68 Q66 66 66 60 Q66 48 50 48 Z" fill="${FH(c)}" ${E(c)}/>
    <circle cx="50" cy="66" r="6" fill="#2B1B10"/><rect x="42" y="80" width="16" height="3" rx="1" fill="#4A2F1C"/>`,
  guitar_electric: (c) => `${sh(50, 94, 16)}
    <rect x="47" y="4" width="6" height="50" rx="1" fill="#D9B98C"/>
    <rect x="44" y="0" width="12" height="9" rx="2" fill="${DARK}"/>
    <path d="M42 50 Q30 42 30 56 Q30 64 36 68 Q28 76 32 86 Q38 96 54 92 Q72 88 68 74 Q74 66 68 58 Q62 52 58 54 L58 48 Z" fill="${FH(c)}" ${E(c)}/>
    <rect x="42" y="64" width="16" height="4" rx="1" fill="${DARK}"/><rect x="42" y="74" width="16" height="4" rx="1" fill="${DARK}"/>
    <path d="M38 60 Q44 56 48 60" stroke="${WHITE}" stroke-width="1.4" fill="none"/>`,
  teddy: (c) => `${sh(50, 94, 22)}
    <circle cx="33" cy="22" r="8" fill="${FR(c)}"/><circle cx="67" cy="22" r="8" fill="${FR(c)}"/>
    <circle cx="33" cy="22" r="4" fill="${lt(c, 14)}"/><circle cx="67" cy="22" r="4" fill="${lt(c, 14)}"/>
    <ellipse cx="34" cy="86" rx="10" ry="8" fill="${FR(c)}"/><ellipse cx="66" cy="86" rx="10" ry="8" fill="${FR(c)}"/>
    <ellipse cx="50" cy="68" rx="22" ry="22" fill="${FR(c)}"/>
    <ellipse cx="26" cy="62" rx="7" ry="11" fill="${FR(c)}" transform="rotate(20 26 62)"/><ellipse cx="74" cy="62" rx="7" ry="11" fill="${FR(c)}" transform="rotate(-20 74 62)"/>
    <circle cx="50" cy="36" r="19" fill="${FR(c)}"/>
    <ellipse cx="50" cy="44" rx="8" ry="6" fill="${lt(c, 16)}"/>
    <circle cx="43" cy="33" r="2.2" fill="${DARK}"/><circle cx="57" cy="33" r="2.2" fill="${DARK}"/><ellipse cx="50" cy="41" rx="2.8" ry="2" fill="${DARK}"/>
    <path d="M42 54 L58 54" stroke="#E25C4F" stroke-width="3" stroke-linecap="round"/>`,
  laptop: (c) => `${sh(50, 92, 40)}
    <path d="M18 24 Q18 20 22 20 L78 20 Q82 20 82 24 L82 74 L18 74 Z" fill="${F(c)}" ${E(c)}/>
    <rect x="22" y="24" width="56" height="46" fill="#1C2430"/>
    <rect x="26" y="30" width="30" height="4" rx="1" fill="#3DDBC4"/><rect x="26" y="38" width="44" height="3" rx="1" fill="#4F6378"/><rect x="26" y="44" width="38" height="3" rx="1" fill="#4F6378"/>
    <path d="M8 74 L92 74 L96 84 Q96 86 94 86 L6 86 Q4 86 4 84 Z" fill="${F(lt(c, 10))}" ${E(c)}/>
    <rect x="40" y="76" width="20" height="3" rx="1.5" fill="${dk(c, -10)}"/>`,
  headphones: (c) => `${sh(50, 92, 26)}
    <path d="M22 66 L22 50 Q22 18 50 18 Q78 18 78 50 L78 66" fill="none" stroke="${dk(c, -12)}" stroke-width="6" stroke-linecap="round"/>
    <rect x="12" y="56" width="20" height="32" rx="9" fill="${FH(c)}" ${E(c)}/>
    <rect x="68" y="56" width="20" height="32" rx="9" fill="${FH(c)}" ${E(c)}/>
    <rect x="26" y="60" width="6" height="24" rx="3" fill="${DARK}"/><rect x="68" y="60" width="6" height="24" rx="3" fill="${DARK}"/>`,

  // ---------------- animals ----------------
  cat_sit: (c) => `${sh(50, 94, 22)}
    <path d="M68 90 Q90 88 86 66 Q84 58 78 60" fill="none" stroke="${dk(c, -8)}" stroke-width="6" stroke-linecap="round"/>
    <path d="M30 94 Q26 64 42 52 L58 52 Q74 64 70 94 Z" fill="${FH(c)}"/>
    <path d="M40 72 Q50 78 60 72" stroke="${dk(c, -14)}" stroke-width="1.6" fill="none"/>
    <path d="M32 22 L36 4 L46 16 Z M68 22 L64 4 L54 16 Z" fill="${dk(c)}"/><path d="M36 18 L37 10 L42 16 Z M64 18 L63 10 L58 16 Z" fill="#F7B9B0"/>
    <ellipse cx="50" cy="32" rx="21" ry="19" fill="${FR(c)}"/>
    <path d="M38 24 L46 26 M38 30 L44 30 M62 24 L54 26" stroke="${dk(c, -18)}" stroke-width="1.6" stroke-linecap="round"/>
    <ellipse cx="42" cy="34" rx="3" ry="3.6" fill="#3F7D4E"/><ellipse cx="58" cy="34" rx="3" ry="3.6" fill="#3F7D4E"/>
    <ellipse cx="42" cy="34" rx="1.2" ry="3" fill="${DARK}"/><ellipse cx="58" cy="34" rx="1.2" ry="3" fill="${DARK}"/>
    <path d="M48 41 L52 41 L50 43 Z" fill="#E88C86"/><path d="M50 43 Q47 46 45 45 M50 43 Q53 46 55 45" stroke="${DARK}" stroke-width="1" fill="none"/>
    <path d="M30 40 L40 41 M30 44 L40 43 M70 40 L60 41 M70 44 L60 43" stroke="${WHITE}" stroke-width=".8"/>`,
  cat_lie: (c) => `${sh(50, 94, 40)}
    <path d="M84 84 Q98 78 92 66" fill="none" stroke="${dk(c, -8)}" stroke-width="6" stroke-linecap="round"/>
    <ellipse cx="58" cy="80" rx="32" ry="14" fill="${FH(c)}"/>
    <ellipse cx="34" cy="88" rx="10" ry="5" fill="${lt(c, 10)}"/>
    <path d="M14 62 L16 46 L26 56 Z M38 58 L38 44 L30 54 Z" fill="${dk(c)}"/>
    <ellipse cx="26" cy="70" rx="17" ry="15" fill="${FR(c)}"/>
    <path d="M18 70 Q21 73 24 70 M28 70 Q31 73 34 70" stroke="${DARK}" stroke-width="1.4" fill="none"/>
    <path d="M24 76 L28 76 L26 78 Z" fill="#E88C86"/>`,
  dog_sit: (c) => `${sh(50, 94, 24)}
    <path d="M70 86 Q86 80 82 68" fill="none" stroke="${dk(c, -6)}" stroke-width="6" stroke-linecap="round"/>
    <path d="M30 94 Q28 62 44 54 L58 54 Q74 62 72 94 Z" fill="${FH(c)}"/>
    <ellipse cx="50" cy="70" rx="8" ry="12" fill="${lt(c, 16)}"/>
    <ellipse cx="40" cy="92" rx="7" ry="4" fill="${lt(c, 10)}"/><ellipse cx="60" cy="92" rx="7" ry="4" fill="${lt(c, 10)}"/>
    <ellipse cx="50" cy="34" rx="18" ry="19" fill="${FR(c)}"/>
    <ellipse cx="30" cy="36" rx="7" ry="15" fill="${dk(c, -14)}" transform="rotate(14 30 36)"/><ellipse cx="70" cy="36" rx="7" ry="15" fill="${dk(c, -14)}" transform="rotate(-14 70 36)"/>
    <ellipse cx="50" cy="44" rx="10" ry="8" fill="${lt(c, 18)}"/>
    <circle cx="43" cy="32" r="2.4" fill="${DARK}"/><circle cx="57" cy="32" r="2.4" fill="${DARK}"/>
    <ellipse cx="50" cy="40" rx="3.6" ry="2.6" fill="${DARK}"/><path d="M50 43 L50 46 Q46 49 44 47 M50 46 Q54 49 56 47" stroke="${DARK}" stroke-width="1" fill="none"/>
    <path d="M40 54 L60 54" stroke="#E25C4F" stroke-width="3.5" stroke-linecap="round"/><circle cx="50" cy="57" r="2.4" fill="#F2C14E"/>`,
  dog_small: (c) => `${sh(50, 94, 30)}
    <path d="M76 66 Q86 58 84 50" fill="none" stroke="${dk(c, -6)}" stroke-width="4" stroke-linecap="round"/>
    <ellipse cx="56" cy="72" rx="24" ry="13" fill="${FH(c)}"/>
    <rect x="38" y="78" width="6" height="16" rx="3" fill="${dk(c)}"/><rect x="48" y="80" width="6" height="14" rx="3" fill="${c}"/><rect x="64" y="78" width="6" height="16" rx="3" fill="${dk(c)}"/><rect x="72" y="80" width="6" height="14" rx="3" fill="${c}"/>
    <path d="M18 40 L24 24 L32 38 Z M38 38 L44 24 L48 40 Z" fill="${dk(c, -10)}"/>
    <ellipse cx="33" cy="52" rx="16" ry="14" fill="${FR(c)}"/>
    <ellipse cx="24" cy="58" rx="8" ry="6" fill="${lt(c, 16)}"/>
    <circle cx="28" cy="49" r="2.2" fill="${DARK}"/><circle cx="38" cy="49" r="2.2" fill="${DARK}"/><circle cx="20" cy="56" r="2.6" fill="${DARK}"/>`,
  rabbit: (c) => `${sh(50, 94, 26)}
    <ellipse cx="38" cy="16" rx="6" ry="17" fill="${FH(c)}" transform="rotate(-10 38 16)"/><ellipse cx="56" cy="16" rx="6" ry="17" fill="${FH(c)}" transform="rotate(10 56 16)"/>
    <ellipse cx="38" cy="16" rx="2.6" ry="12" fill="#F7B9B0" transform="rotate(-10 38 16)"/><ellipse cx="56" cy="16" rx="2.6" ry="12" fill="#F7B9B0" transform="rotate(10 56 16)"/>
    <ellipse cx="56" cy="74" rx="26" ry="20" fill="${FR(c)}"/>
    <circle cx="80" cy="70" r="7" fill="${WHITE}"/>
    <ellipse cx="44" cy="90" rx="10" ry="4" fill="${lt(c, 10)}"/>
    <ellipse cx="46" cy="44" rx="16" ry="15" fill="${FR(c)}"/>
    <circle cx="40" cy="42" r="2.4" fill="${DARK}"/><circle cx="52" cy="42" r="2.4" fill="${DARK}"/>
    <path d="M44 49 L48 49 L46 51 Z" fill="#E88C86"/>`,
  hamster: (c) => `${sh(50, 92, 28)}
    <ellipse cx="50" cy="70" rx="30" ry="22" fill="${FR(c)}"/>
    <ellipse cx="50" cy="78" rx="18" ry="12" fill="${WHITE}" opacity=".85"/>
    <circle cx="30" cy="50" r="7" fill="${dk(c)}"/><circle cx="70" cy="50" r="7" fill="${dk(c)}"/>
    <circle cx="30" cy="50" r="3.5" fill="#F7B9B0"/><circle cx="70" cy="50" r="3.5" fill="#F7B9B0"/>
    <circle cx="40" cy="62" r="3" fill="${DARK}"/><circle cx="60" cy="62" r="3" fill="${DARK}"/>
    <ellipse cx="50" cy="69" rx="3" ry="2" fill="#E88C86"/>
    <ellipse cx="34" cy="72" rx="6" ry="4" fill="#F7B9B0" opacity=".5"/><ellipse cx="66" cy="72" rx="6" ry="4" fill="#F7B9B0" opacity=".5"/>`,
  turtle: (c) => `${sh(50, 92, 38)}
    <ellipse cx="22" cy="76" rx="10" ry="8" fill="#8BBF6A"/><circle cx="18" cy="74" r="1.8" fill="${DARK}"/>
    <rect x="30" y="80" width="10" height="12" rx="4" fill="#7AAE5B"/><rect x="62" y="80" width="10" height="12" rx="4" fill="#7AAE5B"/>
    <path d="M28 82 Q28 50 54 50 Q80 50 80 82 Z" fill="${FR(c)}"/>
    <path d="M42 56 L48 68 L60 68 L66 56 M48 68 L44 82 M60 68 L64 82 M34 70 L48 68 M74 70 L60 68" stroke="${dk(c, -18)}" stroke-width="1.6" fill="none"/>
    <path d="M80 80 L90 84 L80 86 Z" fill="#7AAE5B"/>`,
  aquarium: (c) => `${sh(50, 94, 40)}
    <rect x="8" y="30" width="84" height="60" rx="3" fill="${F('#9EDBEF', 6, -10)}" opacity=".9"/>
    <rect x="8" y="80" width="84" height="10" fill="#D9C38F"/>
    <path d="M20 80 Q18 64 24 52 M26 80 Q30 66 26 56 M76 80 Q72 62 80 50" stroke="#3F9E5E" stroke-width="2.4" fill="none"/>
    <path d="M40 56 Q52 46 62 56 Q52 66 40 56 Z" fill="${FH(c)}"/><path d="M62 56 L70 50 L70 62 Z" fill="${c}"/><circle cx="45" cy="55" r="1.4" fill="${DARK}"/>
    <path d="M30 70 Q36 66 42 70 Q36 74 30 70 Z" fill="${lt(c, 20)}"/>
    <circle cx="56" cy="40" r="1.6" fill="none" stroke="#FFFFFF"/><circle cx="58" cy="34" r="1.2" fill="none" stroke="#FFFFFF"/>
    <rect x="6" y="26" width="88" height="5" rx="1.5" fill="${DARK}"/><rect x="6" y="90" width="88" height="4" fill="${DARK}"/>`,
  parrot: (c) => `${sh(50, 94, 14)}
    <path d="M44 66 L38 96 L48 92 L52 66 Z" fill="${F(dk(c, -10))}"/>
    <ellipse cx="50" cy="52" rx="16" ry="24" fill="${FH(c)}"/>
    <path d="M40 48 Q34 64 42 76 Q50 66 48 50 Z" fill="${dk(c, -14)}"/>
    <circle cx="54" cy="28" r="14" fill="${FR(c)}"/>
    <path d="M64 26 Q74 28 70 40 Q66 34 62 34 Z" fill="${DARK}"/>
    <circle cx="58" cy="24" r="4" fill="${WHITE}"/><circle cx="58" cy="24" r="2" fill="${DARK}"/>
    <path d="M40 78 L36 84 M56 78 L60 84" stroke="#8C8C8C" stroke-width="2"/>`,

  // ---------------- park ----------------
  tree: (c) => `${sh(50, 94, 26)}
    <path d="M44 94 L46 58 Q40 52 34 50 L46 54 L48 46 L54 46 L54 56 Q62 50 66 50 L56 60 L58 94 Z" fill="${FH('#8C5E35')}"/>
    <circle cx="32" cy="42" r="20" fill="${FR(c)}"/><circle cx="68" cy="42" r="20" fill="${FR(c)}"/>
    <circle cx="50" cy="26" r="24" fill="${FR(lt(c, 6))}"/><circle cx="50" cy="48" r="18" fill="${FR(dk(c, -4))}"/>`,
  tree_pine: (c) => `${sh(50, 94, 20)}
    <rect x="46" y="78" width="8" height="16" fill="${FH('#8C5E35')}"/>
    <path d="M50 4 L72 36 L62 36 L80 60 L66 60 L86 82 L14 82 L34 60 L20 60 L38 36 L28 36 Z" fill="${FH(c, 8, -18)}"/>`,
  tree_palm: (c) => `${sh(50, 94, 18)}
    <path d="M48 94 Q44 62 54 30 L60 30 Q52 62 56 94 Z" fill="${FH('#B98653')}"/>
    <path d="M56 30 Q34 18 14 32 Q34 24 56 34 Z M56 30 Q78 16 94 30 Q76 24 58 34 Z M56 30 Q46 8 26 6 Q44 14 56 32 Z M58 30 Q66 8 84 6 Q68 16 58 32 Z M56 32 Q40 40 30 58 Q46 42 58 34 Z M58 32 Q74 40 82 56 Q68 42 58 34 Z" fill="${FH(c)}"/>
    <circle cx="52" cy="34" r="4" fill="#7A5230"/><circle cx="60" cy="35" r="4" fill="#7A5230"/>`,
  flower: (c) => `${sh(50, 94, 10)}
    <path d="M50 94 Q48 70 50 44" stroke="#3F9E5E" stroke-width="2.6" fill="none"/>
    <path d="M50 78 Q36 70 32 76 Q40 84 50 80 Z M50 68 Q62 60 68 64 Q62 72 50 70 Z" fill="#56B870"/>
    <path d="M40 30 Q38 14 50 14 Q62 14 60 30 Q60 46 50 46 Q40 46 40 30 Z" fill="${FH(c)}"/>
    <path d="M40 22 L44 30 L50 16 L56 30 L60 22" fill="${dk(c, -10)}" opacity=".6"/>`,
  daisy: (c) => `${sh(50, 94, 10)}
    <path d="M50 94 L50 40" stroke="#3F9E5E" stroke-width="2.6"/>
    <path d="M50 74 Q38 66 34 72 Q40 80 50 76 Z" fill="#56B870"/>
    ${[0, 40, 80, 120, 160, 200, 240, 280, 320].map((a) => `<ellipse cx="50" cy="20" rx="5" ry="11" fill="${c}" transform="rotate(${a} 50 31)"/>`).join('')}
    <circle cx="50" cy="31" r="7" fill="#F2B632"/>`,
  bush: (c) => `${sh(50, 92, 44)}
    <circle cx="24" cy="70" r="20" fill="${FR(c)}"/><circle cx="76" cy="70" r="20" fill="${FR(c)}"/>
    <circle cx="50" cy="56" r="26" fill="${FR(lt(c, 6))}"/>
    <rect x="8" y="72" width="84" height="20" rx="8" fill="${F(dk(c, -4))}"/>
    <circle cx="38" cy="50" r="2.2" fill="#FFFFFF"/><circle cx="62" cy="62" r="2.2" fill="#FFFFFF"/><circle cx="28" cy="70" r="2.2" fill="#FFFFFF"/><circle cx="72" cy="78" r="2.2" fill="#FFFFFF"/>`,
  cloud: (c) => `
    <path d="M18 72 Q4 72 6 58 Q8 46 22 48 Q24 30 44 32 Q56 18 72 30 Q92 30 90 50 Q98 62 86 72 Z" fill="${F(c, 4, -10)}"/>
    <path d="M24 52 Q30 42 42 44" stroke="#FFFFFF" stroke-width="3" fill="none" stroke-linecap="round" opacity=".8"/>`,
  sun: (c) => `
    <circle cx="50" cy="50" r="40" fill="${c}" opacity=".18"/>
    <circle cx="50" cy="50" r="31" fill="${c}" opacity=".3"/>
    <circle cx="50" cy="50" r="23" fill="${FR(c)}"/>`,
  swing: (c) => `${sh(50, 94, 46)}
    <path d="M8 94 L24 8 M40 94 L24 8 M92 94 L76 8 M60 94 L76 8 M20 8 L80 8" stroke="${FH(METAL)}" stroke-width="4" stroke-linecap="round"/>
    <path d="M20 8 L80 8" stroke="#8A97A3" stroke-width="4" stroke-linecap="round"/>
    <path d="M40 9 L40 68 M60 9 L60 68" stroke="${DARK}" stroke-width="1.4"/>
    <rect x="34" y="66" width="32" height="6" rx="2" fill="${F(c)}" ${E(c)}/>`,
  slide: (c) => `${sh(52, 94, 44)}
    <path d="M20 94 L20 24 M34 94 L34 24" stroke="#8A97A3" stroke-width="3.4" stroke-linecap="round"/>
    <path d="M20 40 L34 40 M20 54 L34 54 M20 68 L34 68 M20 82 L34 82" stroke="#8A97A3" stroke-width="2.4"/>
    <rect x="16" y="20" width="24" height="6" rx="2" fill="${F(dk(c, -10))}"/>
    <path d="M36 22 Q58 22 70 58 Q78 82 96 90 L94 94 Q74 88 64 62 Q54 32 36 30 Z" fill="${FH(c)}" ${E(c)}/>`,
  seesaw: (c) => `${sh(50, 94, 44)}
    <path d="M42 94 L50 70 L58 94 Z" fill="${F(METAL)}"/>
    <rect x="6" y="66" width="88" height="6" rx="3" fill="${F(c)}" transform="rotate(-10 50 69)" ${E(c)}/>
    <path d="M14 70 L14 60 M86 58 L86 48" stroke="${DARK}" stroke-width="3" stroke-linecap="round" transform="rotate(-10 50 69)"/>`,
  bench: (c) => `${sh(50, 94, 46)}
    <rect x="8" y="24" width="84" height="8" rx="2" fill="${F(c)}" ${E(c)}/>
    <rect x="8" y="35" width="84" height="8" rx="2" fill="${F(c)}" ${E(c)}/>
    <rect x="6" y="58" width="88" height="8" rx="2" fill="${F(lt(c, 8))}" ${E(c)}/>
    <path d="M16 30 L16 94 M84 30 L84 94 M16 66 L10 94 M84 66 L90 94" stroke="${DARK}" stroke-width="3" stroke-linecap="round"/>`,
  ball: (c) => `${sh(50, 92, 22)}
    <circle cx="50" cy="66" r="25" fill="${FR(c)}"/>
    <path d="M26 58 Q50 72 74 58" fill="none" stroke="#FFFFFF" stroke-width="5"/>
    <path d="M50 41 Q38 64 50 91" fill="none" stroke="#FFFFFF" stroke-width="3" opacity=".7"/>`,
  kite: (c) => `
    <path d="M50 6 L80 36 L50 72 L20 36 Z" fill="${FH(c)}"/>
    <path d="M50 6 L50 72 L20 36 Z" fill="${lt(c, 14)}" opacity=".5"/>
    <path d="M50 6 L50 72 M20 36 L80 36" stroke="${dk(c, -20)}" stroke-width="1.4"/>
    <path d="M50 72 Q40 82 52 88 Q62 94 50 100" fill="none" stroke="${DARK}" stroke-width="1.2"/>
    <path d="M44 82 L52 78 L50 86 Z M48 94 L56 92 L52 98 Z" fill="${lt(c, 20)}"/>`,
  bicycle: (c) => `${sh(50, 94, 44)}
    <circle cx="24" cy="74" r="18" fill="none" stroke="${DARK}" stroke-width="3.4"/><circle cx="76" cy="74" r="18" fill="none" stroke="${DARK}" stroke-width="3.4"/>
    <circle cx="24" cy="74" r="2.4" fill="${METAL}"/><circle cx="76" cy="74" r="2.4" fill="${METAL}"/>
    <path d="M24 74 L42 46 L68 46 L76 74 M42 46 L50 74 L68 46 M50 74 L24 74" fill="none" stroke="${c}" stroke-width="3.6" stroke-linejoin="round" stroke-linecap="round"/>
    <path d="M38 40 L48 40" stroke="${DARK}" stroke-width="4" stroke-linecap="round"/>
    <path d="M68 46 L64 34 L74 32" fill="none" stroke="${DARK}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="50" cy="74" r="4" fill="${DARK}"/>`,
  skateboard: (c) => `${sh(50, 94, 42)}
    <path d="M8 76 Q6 70 12 70 L88 70 Q94 70 92 76 Q90 80 84 80 L16 80 Q10 80 8 76 Z" fill="${F(c)}" ${E(c)}/>
    <rect x="22" y="80" width="10" height="4" fill="${METAL}"/><rect x="68" y="80" width="10" height="4" fill="${METAL}"/>
    <circle cx="22" cy="88" r="5" fill="#F2C14E"/><circle cx="32" cy="88" r="5" fill="#F2C14E"/><circle cx="68" cy="88" r="5" fill="#F2C14E"/><circle cx="78" cy="88" r="5" fill="#F2C14E"/>`,
  streetlight: (c) => `${sh(50, 94, 12)}
    <rect x="46" y="22" width="7" height="72" rx="2" fill="${FH(c)}"/>
    <rect x="40" y="88" width="19" height="6" rx="1.5" fill="${dk(c, -12)}"/>
    <path d="M49 24 Q49 8 66 10" fill="none" stroke="${c}" stroke-width="4" stroke-linecap="round"/>
    <path d="M58 10 L76 10 L80 20 L54 20 Z" fill="${F(dk(c, -10))}"/>
    <ellipse cx="67" cy="22" rx="10" ry="3" fill="#FFE9A8"/>
    <path d="M67 22 L50 80 L84 80 Z" fill="#FFE9A8" opacity=".14"/>`,
  trash_can: (c) => `${sh(50, 94, 20)}
    <path d="M28 32 L72 32 L68 92 L32 92 Z" fill="${FH(c)}"/>
    <rect x="24" y="24" width="52" height="9" rx="2" fill="${F(dk(c, -10))}"/>
    <rect x="42" y="18" width="16" height="6" rx="2" fill="${dk(c, -10)}"/>
    <path d="M40 42 L41 84 M50 42 L50 84 M60 42 L59 84" stroke="${dk(c, -12)}" stroke-width="2" stroke-linecap="round"/>`,
  bird: (c) => `
    <path d="M22 54 L6 48 L12 60 Z" fill="${dk(c, -10)}"/>
    <ellipse cx="44" cy="58" rx="24" ry="16" fill="${FR(c)}"/>
    <ellipse cx="46" cy="64" rx="14" ry="8" fill="${lt(c, 20)}"/>
    <circle cx="64" cy="42" r="13" fill="${FR(c)}"/>
    <path d="M76 40 L88 44 L76 47 Z" fill="#F2A33A"/>
    <circle cx="67" cy="39" r="2.4" fill="${DARK}"/>
    <path d="M30 54 Q42 44 54 54 Q42 62 30 54" fill="${dk(c, -12)}"/>
    <path d="M40 74 L38 86 M50 74 L52 86" stroke="#8A6A4A" stroke-width="2"/>`,
  butterfly: (c) => `
    <path d="M48 46 Q30 14 14 26 Q6 40 24 50 Q34 54 48 50 Z" fill="${FH(c)}"/>
    <path d="M52 46 Q70 14 86 26 Q94 40 76 50 Q66 54 52 50 Z" fill="${FH(c, -10, 12)}"/>
    <path d="M48 52 Q30 56 26 70 Q36 78 48 60 Z" fill="${lt(c, 14)}"/><path d="M52 52 Q70 56 74 70 Q64 78 52 60 Z" fill="${lt(c, 14)}"/>
    <circle cx="26" cy="34" r="4" fill="#FFFFFF" opacity=".6"/><circle cx="74" cy="34" r="4" fill="#FFFFFF" opacity=".6"/>
    <rect x="47.5" y="36" width="5" height="34" rx="2.5" fill="${DARK}"/>
    <path d="M49 36 Q44 24 40 22 M51 36 Q56 24 60 22" stroke="${DARK}" stroke-width="1.2" fill="none"/>`,
  duck: (c) => `${sh(50, 94, 26)}
    <path d="M20 66 Q18 90 50 90 Q82 90 84 68 Q72 74 60 70 Q40 62 20 66 Z" fill="${FH(c)}"/>
    <path d="M40 72 Q56 64 72 74 Q58 82 40 72 Z" fill="${dk(c, -10)}"/>
    <circle cx="30" cy="48" r="14" fill="${FR(c)}"/>
    <path d="M16 50 L4 54 L16 56 Z" fill="#F2A33A"/>
    <circle cx="26" cy="45" r="2.2" fill="${DARK}"/>`,
  squirrel: (c) => `${sh(50, 94, 22)}
    <path d="M60 90 Q96 86 90 50 Q86 30 70 34 Q84 46 76 64 Q70 80 60 82 Z" fill="${FH(c, 6, -16)}"/>
    <ellipse cx="46" cy="76" rx="16" ry="18" fill="${FR(c)}"/>
    <ellipse cx="44" cy="82" rx="8" ry="10" fill="${lt(c, 20)}"/>
    <circle cx="40" cy="48" r="13" fill="${FR(c)}"/>
    <path d="M32 38 L32 28 L38 36 Z M46 36 L48 26 L50 38 Z" fill="${dk(c)}"/>
    <circle cx="36" cy="46" r="2" fill="${DARK}"/><circle cx="28" cy="52" r="2" fill="${DARK}"/>`,
  horse: (c) => `${sh(50, 94, 40)}
    <path d="M24 60 Q22 44 40 44 L68 44 Q80 44 82 56 L82 64 Q80 70 70 70 L32 70 Q24 70 24 60 Z" fill="${FH(c)}"/>
    <rect x="28" y="66" width="6" height="28" rx="2" fill="${dk(c)}"/><rect x="38" y="66" width="6" height="28" rx="2" fill="${c}"/>
    <rect x="66" y="66" width="6" height="28" rx="2" fill="${dk(c)}"/><rect x="76" y="64" width="6" height="30" rx="2" fill="${c}"/>
    <path d="M76 50 Q82 24 88 18 Q96 20 96 30 Q94 40 86 44 L84 56 Z" fill="${FH(c)}"/>
    <path d="M78 22 Q72 30 74 46 L80 46 Q80 32 86 22 Z" fill="#4A2F1C"/>
    <path d="M24 52 Q10 56 12 76 Q18 66 24 62 Z" fill="#4A2F1C"/>
    <circle cx="90" cy="28" r="1.8" fill="${DARK}"/>`,
  unicorn: (c) => `${sh(50, 94, 40)}
    <path d="M24 60 Q22 44 40 44 L68 44 Q80 44 82 56 L82 64 Q80 70 70 70 L32 70 Q24 70 24 60 Z" fill="${FH('#F7F4FA')}"/>
    <rect x="28" y="66" width="6" height="28" rx="2" fill="#E6E0EE"/><rect x="38" y="66" width="6" height="28" rx="2" fill="#F7F4FA"/>
    <rect x="66" y="66" width="6" height="28" rx="2" fill="#E6E0EE"/><rect x="76" y="64" width="6" height="30" rx="2" fill="#F7F4FA"/>
    <path d="M76 50 Q82 24 88 18 Q96 20 96 30 Q94 40 86 44 L84 56 Z" fill="${FH('#F7F4FA')}"/>
    <path d="M88 18 L94 2 L92 20 Z" fill="#F2C14E"/>
    <path d="M78 22 Q72 30 74 46 L80 46 Q80 32 86 22 Z M24 52 Q10 56 12 76 Q18 66 24 62 Z" fill="${FH(c)}"/>
    <circle cx="90" cy="28" r="1.8" fill="${DARK}"/>`,
  fountain: (c) => `${sh(50, 94, 44)}
    <path d="M50 30 Q34 6 20 34 M50 30 Q66 6 80 34" fill="none" stroke="#7FD3F0" stroke-width="3" stroke-linecap="round"/>
    <path d="M50 26 L50 10" stroke="#7FD3F0" stroke-width="3" stroke-linecap="round"/>
    <rect x="44" y="30" width="12" height="36" rx="2" fill="${FH(c)}"/>
    <ellipse cx="50" cy="30" rx="16" ry="5" fill="${F(c)}"/>
    <path d="M8 66 L92 66 L86 92 L14 92 Z" fill="${FH(c)}"/>
    <ellipse cx="50" cy="66" rx="42" ry="8" fill="${F('#8FD7EE')}"/>`,

  // ---------------- race track ----------------
  race_car: (c) => `${sh(50, 92, 46)}
    <path d="M4 76 L8 64 Q12 58 22 58 L36 56 L44 46 L64 46 L72 56 L90 58 Q96 60 96 66 L96 76 Z" fill="${F(c, 14, -10)}"/>
    <path d="M47 49 L62 49 L67 56 L44 56 Z" fill="${F('#22303D', 20, 0)}"/>
    <rect x="84" y="48" width="12" height="4" rx="1" fill="${DARK}"/><path d="M88 52 L88 58" stroke="${DARK}" stroke-width="2"/>
    <circle cx="30" cy="66" r="6" fill="#FFFFFF"/><text x="30" y="69" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="700" font-size="8" fill="${DARK}">7</text>
    <path d="M4 70 L96 70" stroke="${lt(c, 20)}" stroke-width="2"/>
    <circle cx="24" cy="80" r="10" fill="#1C2430"/><circle cx="24" cy="80" r="4" fill="${METAL}"/>
    <circle cx="78" cy="80" r="10" fill="#1C2430"/><circle cx="78" cy="80" r="4" fill="${METAL}"/>`,
  city_car: (c) => `${sh(50, 92, 46)}
    <path d="M6 78 L6 64 Q8 56 18 56 L28 56 L38 40 Q40 38 44 38 L66 38 Q70 38 72 40 L80 56 L88 57 Q96 58 96 66 L96 78 Z" fill="${F(c, 14, -10)}"/>
    <path d="M42 42 L54 42 L54 56 L33 56 Z M58 42 L68 42 L76 56 L58 56 Z" fill="${F('#9ED2EA', 14, -4)}"/>
    <rect x="90" y="62" width="6" height="4" rx="1" fill="#FFE9A8"/><rect x="6" y="62" width="4" height="4" rx="1" fill="#E25C4F"/>
    <circle cx="26" cy="80" r="9" fill="#1C2430"/><circle cx="26" cy="80" r="3.5" fill="${METAL}"/>
    <circle cx="76" cy="80" r="9" fill="#1C2430"/><circle cx="76" cy="80" r="3.5" fill="${METAL}"/>`,
  sports_car: (c) => `${sh(50, 92, 46)}
    <path d="M4 78 L6 66 Q10 60 24 58 L40 50 Q48 46 60 46 L72 48 L88 58 Q96 60 96 68 L96 78 Z" fill="${F(c, 18, -12)}"/>
    <path d="M44 52 Q52 49 60 49 L70 50 L80 58 L38 58 Z" fill="${F('#22303D', 20, 0)}"/>
    <path d="M14 66 L88 66" stroke="${dk(c, -16)}" stroke-width="1.5"/>
    <circle cx="24" cy="80" r="9" fill="#1C2430"/><circle cx="24" cy="80" r="4" fill="${METAL}"/>
    <circle cx="78" cy="80" r="9" fill="#1C2430"/><circle cx="78" cy="80" r="4" fill="${METAL}"/>`,
  truck: (c) => `${sh(50, 92, 46)}
    <rect x="4" y="30" width="58" height="48" rx="2" fill="${F(c, 10, -10)}"/>
    <path d="M62 44 L82 44 Q86 44 88 48 L96 60 L96 78 L62 78 Z" fill="${F(dk(c, -10))}"/>
    <path d="M68 48 L82 48 L88 58 L68 58 Z" fill="${F('#9ED2EA', 14, -4)}"/>
    <path d="M10 40 L56 40" stroke="${lt(c, 16)}" stroke-width="2"/>
    <circle cx="22" cy="80" r="9" fill="#1C2430"/><circle cx="22" cy="80" r="3.5" fill="${METAL}"/>
    <circle cx="80" cy="80" r="9" fill="#1C2430"/><circle cx="80" cy="80" r="3.5" fill="${METAL}"/>`,
  bus: (c) => `${sh(50, 92, 46)}
    <rect x="4" y="30" width="92" height="50" rx="7" fill="${F(c, 10, -10)}"/>
    ${[12, 30, 48, 66].map((x) => `<rect x="${x}" y="38" width="14" height="16" rx="2" fill="#9ED2EA"/>`).join('')}
    <rect x="82" y="38" width="10" height="34" rx="2" fill="#9ED2EA"/>
    <path d="M4 62 L82 62" stroke="${lt(c, 20)}" stroke-width="3"/>
    <circle cx="24" cy="82" r="8" fill="#1C2430"/><circle cx="76" cy="82" r="8" fill="#1C2430"/>`,
  motorcycle: (c) => `${sh(50, 92, 44)}
    <circle cx="20" cy="76" r="15" fill="#1C2430"/><circle cx="20" cy="76" r="6" fill="${METAL}"/>
    <circle cx="80" cy="76" r="15" fill="#1C2430"/><circle cx="80" cy="76" r="6" fill="${METAL}"/>
    <path d="M20 76 L40 56 L66 56 L80 76" fill="none" stroke="${METAL}" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M34 54 Q48 42 66 48 L64 62 L40 64 Z" fill="${F(c, 16, -10)}"/>
    <path d="M26 50 L44 48" stroke="${DARK}" stroke-width="5" stroke-linecap="round"/>
    <path d="M66 50 L72 34 L80 34" fill="none" stroke="${DARK}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`,
  flag: (c) => `${sh(20, 95, 8)}
    <path d="M20 95 L20 6" stroke="${METAL}" stroke-width="3" stroke-linecap="round"/>
    <path d="M21 8 Q50 2 84 10 L84 54 Q50 46 21 52 Z" fill="#FFFFFF"/>
    <clipPath id="fc${gid}"><path d="M21 8 Q50 2 84 10 L84 54 Q50 46 21 52 Z"/></clipPath>
    <g clip-path="url(#fc${gid})" fill="${c}">${[0, 1, 2, 3, 4, 5].map((i) => [0, 1, 2, 3].map((j) => ((i + j) % 2 ? '' : `<rect x="${21 + i * 11}" y="${4 + j * 12}" width="11" height="12"/>`)).join('')).join('')}</g>`,
  cone: (c) => `${sh(50, 92, 28)}
    <path d="M42 12 L58 12 L74 84 L26 84 Z" fill="${FH(c)}"/>
    <path d="M37 36 L63 36 L67 54 L33 54 Z" fill="#FFFFFF" opacity=".92"/>
    <rect x="16" y="82" width="68" height="8" rx="2" fill="${F(dk(c, -12))}"/>`,
  tire: (c) => `${sh(50, 94, 40)}
    <ellipse cx="50" cy="80" rx="38" ry="12" fill="#1C2430"/>
    <ellipse cx="50" cy="64" rx="38" ry="12" fill="#2A3440"/>
    <ellipse cx="50" cy="48" rx="38" ry="12" fill="#1C2430"/>
    <ellipse cx="50" cy="48" rx="18" ry="5" fill="${c}"/>
    <path d="M12 48 L12 80 M88 48 L88 80" stroke="#0F151C" stroke-width="1"/>`,
  traffic_light: (c) => `${sh(50, 94, 12)}
    <rect x="46" y="70" width="8" height="24" fill="${FH(c)}"/>
    <rect x="32" y="6" width="36" height="66" rx="8" fill="${F(c, 8, -10)}"/>
    <circle cx="50" cy="22" r="8" fill="#E9463F"/><circle cx="50" cy="40" r="8" fill="#6B5A2E"/><circle cx="50" cy="58" r="8" fill="#1F5A3A"/>
    <circle cx="47" cy="19" r="2.4" fill="#FFFFFF" opacity=".6"/>`,
  helmet: (c) => `${sh(50, 92, 36)}
    <path d="M14 70 Q12 22 52 20 Q88 20 88 58 L88 74 L22 74 Q14 74 14 70 Z" fill="${FR(c)}"/>
    <path d="M44 42 L88 42 L88 60 L52 60 Q42 52 44 42 Z" fill="${F('#22303D', 18, -4)}"/>
    <path d="M54 46 L82 46" stroke="#5FB8E8" stroke-width="2" stroke-linecap="round"/>
    <path d="M20 36 Q34 26 46 26" stroke="${lt(c, 30)}" stroke-width="4" stroke-linecap="round" fill="none"/>`,
  trophy: (c) => `${sh(50, 94, 22)}
    <path d="M30 12 L70 12 L68 42 Q66 60 50 62 Q34 60 32 42 Z" fill="${FH(c, 20, -16)}"/>
    <path d="M30 18 Q14 18 18 32 Q22 42 32 42 M70 18 Q86 18 82 32 Q78 42 68 42" fill="none" stroke="${dk(c, -10)}" stroke-width="3"/>
    <rect x="45" y="62" width="10" height="14" fill="${FH(c)}"/>
    <rect x="30" y="76" width="40" height="16" rx="2" fill="${F('#2B3440')}"/>
    <rect x="38" y="81" width="24" height="5" rx="1" fill="${c}"/>`,
  rocket: (c) => `${sh(50, 96, 20)}
    <path d="M50 4 Q72 24 70 66 L30 66 Q28 24 50 4 Z" fill="${FH('#F4F6F8', 6, -16)}"/>
    <circle cx="50" cy="34" r="9" fill="${F('#5FB8E8')}" stroke="${METAL}" stroke-width="2.5"/>
    <path d="M30 48 L12 74 L30 70 Z M70 48 L88 74 L70 70 Z" fill="${FH(c)}"/>
    <path d="M38 66 L62 66 L58 74 L42 74 Z" fill="${dk(c, -10)}"/>
    <path d="M42 74 Q50 100 58 74 Z" fill="#F2A33A"/><path d="M46 74 Q50 90 54 74 Z" fill="#FFE18A"/>`,
};

// ---------------- people (teen proportions, 100x100 box, feet at y≈96) ----------------
export const SKINS = ['#FDE0C6', '#F3C9A0', '#DDA878', '#B9805A', '#8D5A3A', '#5C3A24'];
export const HAIR_COLORS = ['#2B1B10', '#5E3B25', '#A46A3B', '#D9A65B', '#1C1C1C', '#B5483B'];

// A standing person: one connected body. top = torso color, legs = pants color.
function person(c, skin, o = {}) {
  const hair = o.hairColor || '#2B1B10';
  const legs = o.legs || '#2E4A6B';
  const shoes = o.shoes || '#F4F2EC';
  const skinS = shade(skin, -14);
  return `${sh(50, 96, 14)}
    ${o.back || ''}
    <path d="M44 66 L43 92 M56 66 L57 92" stroke="${legs}" stroke-width="7" stroke-linecap="round"/>
    <path d="M38 95 Q38 91 43 91 L46 91 L46 96 L38 96 Z M62 95 Q62 91 57 91 L54 91 L54 96 L62 96 Z" fill="${shoes}"/>
    <path d="M38 41 Q34 52 33 64" stroke="${skin}" stroke-width="5" stroke-linecap="round" fill="none"/>
    <path d="M62 41 Q66 52 67 64" stroke="${skin}" stroke-width="5" stroke-linecap="round" fill="none"/>
    <path d="M40 38 Q50 34 60 38 Q63 40 63 44 L61 68 L39 68 L37 44 Q37 40 40 38 Z" fill="${F(c, 10, -10)}"/>
    <path d="M37 40 Q34 48 34 54 M63 40 Q66 48 66 54" stroke="${c}" stroke-width="5.5" stroke-linecap="round" fill="none"/>
    ${o.top || ''}
    <rect x="47" y="30" width="6" height="7" fill="${skinS}"/>
    <ellipse cx="50" cy="22" rx="9" ry="10.5" fill="${skin}"/>
    <ellipse cx="41.5" cy="23" rx="1.6" ry="2.4" fill="${skinS}"/><ellipse cx="58.5" cy="23" rx="1.6" ry="2.4" fill="${skinS}"/>
    ${o.hair ? o.hair(hair) : `<path d="M41 21 Q40 10 50 10 Q60 10 59 21 Q56 15 50 15 Q44 15 41 21 Z" fill="${hair}"/>`}
    <circle cx="46.5" cy="23" r="1.1" fill="${DARK}"/><circle cx="53.5" cy="23" r="1.1" fill="${DARK}"/>
    <path d="M47.5 27.5 Q50 29 52.5 27.5" stroke="${shade(skin, -30)}" stroke-width=".9" fill="none" stroke-linecap="round"/>
    ${o.hat || ''}${o.front || ''}`;
}
const longHair = (h) => `<path d="M40 22 Q38 9 50 9 Q62 9 60 22 L61 38 Q56 40 56 30 Q55 18 50 16 Q45 18 44 30 Q44 40 39 38 Z" fill="${h}"/>`;
const bunHair = (h) => `<circle cx="50" cy="8" r="5" fill="${h}"/><path d="M41 21 Q40 11 50 11 Q60 11 59 21 Q56 16 50 16 Q44 16 41 21 Z" fill="${h}"/>`;
const curlyHair = (h) => [[42, 14], [47, 11], [53, 11], [58, 14], [41, 19], [59, 19]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4.2" fill="${h}"/>`).join('');

export const PEOPLE_ART = {
  girl: (c, skin, hc) => person(c, skin, { hairColor: hc, hair: longHair, legs: '#3E5C8A' }),
  boy: (c, skin, hc) => person(c, skin, { hairColor: hc, legs: '#5B6B7A' }),
  teen: (c, skin, hc) => person(c, skin, { hairColor: hc, hair: curlyHair, legs: '#2B3440' }),
  baby: (c, skin) => `${sh(50, 96, 14)}
    <ellipse cx="50" cy="80" rx="15" ry="14" fill="${F(c)}"/>
    <path d="M38 76 Q30 72 28 66 M62 76 Q70 72 72 66" stroke="${skin}" stroke-width="5" stroke-linecap="round" fill="none"/>
    <ellipse cx="42" cy="94" rx="6" ry="3.4" fill="${skin}"/><ellipse cx="58" cy="94" rx="6" ry="3.4" fill="${skin}"/>
    <circle cx="50" cy="56" r="14" fill="${skin}"/>
    <path d="M48 42 Q52 38 54 43" stroke="#5E3B25" stroke-width="2" fill="none" stroke-linecap="round"/>
    <circle cx="45" cy="56" r="1.4" fill="${DARK}"/><circle cx="55" cy="56" r="1.4" fill="${DARK}"/>
    <ellipse cx="43" cy="60" rx="2.6" ry="1.6" fill="#F7A9A0" opacity=".6"/><ellipse cx="57" cy="60" rx="2.6" ry="1.6" fill="#F7A9A0" opacity=".6"/>`,
  doctor: (c, skin, hc) => person('#FFFFFF', skin, {
    hairColor: hc, legs: c,
    top: `<path d="M39 40 L39 74 L61 74 L61 40" fill="${F('#FFFFFF', 0, -10)}"/><path d="M50 38 L50 74" stroke="#D5DCE2" stroke-width="1"/>
      <path d="M45 38 Q44 50 50 52 Q56 50 55 38" stroke="#4F6378" stroke-width="1.2" fill="none"/><circle cx="50" cy="52" r="1.6" fill="#4F6378"/>
      <rect x="53" y="44" width="5" height="4" fill="${c}"/>`,
  }),
  chef: (c, skin, hc) => person('#FFFFFF', skin, {
    hairColor: hc, legs: '#2B3440',
    top: `<rect x="40" y="52" width="20" height="16" rx="2" fill="${c}"/><circle cx="47" cy="44" r="1" fill="${DARK}"/><circle cx="53" cy="44" r="1" fill="${DARK}"/>`,
    hat: `<path d="M41 14 Q36 4 43 3 Q46 -2 52 2 Q60 0 60 7 Q64 10 59 14 Z" fill="#FFFFFF" stroke="#D5DCE2" stroke-width=".8"/><rect x="41" y="12" width="18" height="4" fill="#FFFFFF" stroke="#D5DCE2" stroke-width=".8"/>`,
  }),
  police_officer: (c, skin, hc) => person(c, skin, {
    hairColor: hc, legs: shade(c, -24),
    hat: `<path d="M40 15 Q50 6 60 15 L60 17 L40 17 Z" fill="${shade(c, -26)}"/><rect x="38" y="16" width="24" height="2.6" rx="1.2" fill="${DARK}"/><circle cx="50" cy="12" r="1.6" fill="#F2C14E"/>`,
    front: `<path d="M54 44 L57 43 L58 46 L55 48 Z" fill="#F2C14E"/>`,
  }),
  firefighter: (c, skin, hc) => person(c, skin, {
    hairColor: hc, legs: shade(c, -20),
    top: `<path d="M39 58 L61 58 M39 62 L61 62" stroke="#F2E27A" stroke-width="1.6"/>`,
    hat: `<path d="M40 18 Q40 6 50 6 Q60 6 60 18 Z" fill="${F(c)}"/><path d="M37 18 L63 18" stroke="${DARK}" stroke-width="2.4" stroke-linecap="round"/><rect x="47.5" y="7" width="5" height="7" rx="1" fill="#F2C14E"/>`,
  }),
  driver: (c, skin, hc) => person(c, skin, {
    hairColor: hc, legs: c,
    top: `<path d="M50 38 L50 68" stroke="#FFFFFF" stroke-width="2"/>`,
    hat: `<path d="M40 24 Q39 8 50 8 Q61 8 60 24 Z" fill="${F(c)}"/><rect x="44" y="17" width="16" height="5" rx="2" fill="#22303D"/>`,
  }),
  fan: (c, skin, hc) => person(c, skin, {
    hairColor: hc, hair: curlyHair, legs: '#3E5C8A',
    front: `<path d="M67 62 L80 36" stroke="${DARK}" stroke-width="1.4"/><path d="M80 36 L68 32 L74 46 Z" fill="${c}"/>`,
  }),
  teacher: (c, skin, hc) => person(c, skin, {
    hairColor: hc, hair: bunHair, legs: '#5B6B7A',
    front: `<circle cx="46.5" cy="23" r="2.6" fill="none" stroke="${DARK}" stroke-width=".8"/><circle cx="53.5" cy="23" r="2.6" fill="none" stroke="${DARK}" stroke-width=".8"/>
      <rect x="64" y="54" width="9" height="12" rx="1" fill="#3DB8C9"/>`,
  }),
};

Object.assign(PEOPLE_ART, {
  waiter: (c, skin, hc) => person('#FFFFFF', skin, { hairColor: hc, legs: '#1C2430', top: `<path d="M46 38 L50 42 L54 38" fill="${c}"/><rect x="40" y="54" width="20" height="14" fill="${c}"/>` }),
  student: (c, skin, hc) => person(c, skin, { hairColor: hc, hair: bunHair, legs: '#3E5C8A', back: `<rect x="58" y="40" width="12" height="20" rx="3" fill="${shade(c, -24)}"/>` }),
  astronaut: (c, skin) => `${sh(50, 96, 16)}
    <rect x="40" y="62" width="9" height="32" rx="4" fill="#F4F6F8"/><rect x="51" y="62" width="9" height="32" rx="4" fill="#E2E7EC"/>
    <rect x="36" y="36" width="28" height="32" rx="8" fill="${F('#F4F6F8', 4, -12)}"/><rect x="44" y="46" width="12" height="8" rx="2" fill="${c}"/>
    <path d="M36 42 Q28 50 30 62 M64 42 Q72 50 70 62" stroke="#E2E7EC" stroke-width="7" stroke-linecap="round" fill="none"/>
    <circle cx="50" cy="22" r="15" fill="${F('#F4F6F8', 4, -10)}"/><ellipse cx="50" cy="23" rx="10" ry="8" fill="${F('#22303D', 20, 0)}"/>
    <ellipse cx="46" cy="20" rx="3" ry="2" fill="#FFFFFF" opacity=".5"/>`,
  pilot: (c, skin, hc) => person('#FFFFFF', skin, { hairColor: hc, legs: '#1C2430',
    top: `<rect x="37" y="40" width="26" height="4" fill="${c}"/><path d="M40 46 L46 46 M54 46 L60 46" stroke="#F2C14E" stroke-width="1.6"/>`,
    hat: `<path d="M40 14 Q50 6 60 14 L60 17 L40 17 Z" fill="${c}"/><rect x="38" y="16" width="24" height="2.6" rx="1.2" fill="${DARK}"/><circle cx="50" cy="12" r="1.6" fill="#F2C14E"/>` }),
  lifeguard: (c, skin, hc) => person(c, skin, { hairColor: hc, legs: c, front: `<path d="M44 46 L56 46" stroke="#FFFFFF" stroke-width="2"/><path d="M66 60 L74 52" stroke="${DARK}" stroke-width="1"/><circle cx="76" cy="50" r="3" fill="#F2C14E"/>` }),
  gardener: (c, skin, hc) => person(c, skin, { hairColor: hc, legs: '#3E5C8A',
    top: `<path d="M40 50 L60 50 L60 68 L40 68 Z" fill="${shade(c, -14)}"/>`,
    hat: `<ellipse cx="50" cy="15" rx="16" ry="3.4" fill="#E8D29A"/><path d="M42 15 Q42 6 50 6 Q58 6 58 15 Z" fill="#E8D29A"/>` }),
  wizard: (c, skin) => `${sh(50, 96, 16)}
    <path d="M36 40 L32 94 L68 94 L64 40 Z" fill="${F(c, 8, -12)}"/>
    <path d="M36 42 Q28 52 30 64 M64 42 Q72 52 70 64" stroke="${c}" stroke-width="6" stroke-linecap="round" fill="none"/>
    <ellipse cx="50" cy="26" rx="9" ry="10" fill="${skin}"/>
    <path d="M42 30 Q50 50 58 30 Q54 34 50 34 Q46 34 42 30 Z" fill="#E9E4DA"/>
    <circle cx="46.5" cy="24" r="1.1" fill="${DARK}"/><circle cx="53.5" cy="24" r="1.1" fill="${DARK}"/>
    <path d="M36 18 L50 -6 L64 18 Z" fill="${F(c, 12, -6)}"/><ellipse cx="50" cy="18" rx="17" ry="3.4" fill="${shade(c, -16)}"/>
    <path d="M70 64 L80 30" stroke="#8C5E35" stroke-width="2.4"/><circle cx="80" cy="29" r="3" fill="#F2C14E"/>`,
  shopkeeper: (c, skin, hc) => person(c, skin, { hairColor: hc, hair: bunHair, legs: '#5B6B7A', top: `<path d="M41 46 L59 46 L60 70 L40 70 Z" fill="#FFFFFF"/>` }),
});

// ---------------- dress-up character (box 0 0 200 420) ----------------
// One connected body: the skin silhouette is a single path, so there are no separate parts.
export const DRESS_SLOTS = ['hairBack', 'bottom', 'feet', 'top', 'dress', 'outer', 'neck'];

export function characterBase(skin, feeling = 'happy') {
  const s2 = shade(skin, -12);
  const body = `
    <path d="M90 96 L110 96 L111 112 Q132 114 140 124 Q146 132 148 150 L156 232 Q158 244 152 250 Q146 254 143 246 L134 168 L132 214 Q136 222 134 232 L128 392 Q128 400 120 400 Q113 400 112 392 L104 252 L96 252 L88 392 Q87 400 80 400 Q72 400 72 392 L66 232 Q64 222 68 214 L66 168 L57 246 Q54 254 48 250 Q42 244 44 232 L52 150 Q54 132 60 124 Q68 114 89 112 Z" fill="${FH(skin, 6, -8)}"/>
    <path d="M112 392 L112 404 Q112 410 120 410 L132 410 Q134 404 128 398 Z M88 392 L88 404 Q88 410 80 410 L68 410 Q66 404 72 398 Z" fill="${s2}"/>
    <path d="M80 114 L88 113 Q100 124 112 113 L120 114 L128 134 L133 214 L67 214 L72 134 Z" fill="#E4E8EC"/>
    <path d="M67 210 L133 210 L134 262 L104 262 L100 246 L96 262 L66 262 Z" fill="#C9D1D9"/>`;
  const head = `
    <ellipse cx="100" cy="62" rx="27" ry="33" fill="${F(skin, 6, -6)}"/>
    <ellipse cx="73" cy="66" rx="4.5" ry="7" fill="${s2}"/><ellipse cx="127" cy="66" rx="4.5" ry="7" fill="${s2}"/>
    ${eyes(feeling)}
    <path d="M98 68 Q100 74 103 72" stroke="${shade(skin, -24)}" stroke-width="1.6" fill="none" stroke-linecap="round"/>
    <ellipse cx="84" cy="76" rx="5" ry="3" fill="#F2928A" opacity=".3"/><ellipse cx="116" cy="76" rx="5" ry="3" fill="#F2928A" opacity=".3"/>
    ${MOUTHS[feeling] || MOUTHS.happy}`;
  return { body, head };
}
function eyes(feeling) {
  if (feeling === 'sleepy') return `<path d="M83 62 Q88 65 93 62 M107 62 Q112 65 117 62" stroke="${DARK}" stroke-width="2" fill="none" stroke-linecap="round"/>`;
  const brows = feeling === 'angry' ? `<path d="M82 50 L94 54 M118 50 L106 54" stroke="${DARK}" stroke-width="2.4" stroke-linecap="round"/>`
    : feeling === 'sad' ? `<path d="M82 54 L94 50 M118 54 L106 50" stroke="${DARK}" stroke-width="2" stroke-linecap="round"/>`
    : feeling === 'surprised' ? `<path d="M82 48 Q88 44 94 48 M106 48 Q112 44 118 48" stroke="${DARK}" stroke-width="2" fill="none" stroke-linecap="round"/>`
    : `<path d="M82 51 Q88 48 94 51 M106 51 Q112 48 118 51" stroke="${DARK}" stroke-width="2" fill="none" stroke-linecap="round"/>`;
  return `${brows}<ellipse cx="88" cy="61" rx="4" ry="4.6" fill="#FFFFFF"/><ellipse cx="112" cy="61" rx="4" ry="4.6" fill="#FFFFFF"/>
    <circle cx="88.5" cy="61.5" r="2.8" fill="#3B2A1E"/><circle cx="112.5" cy="61.5" r="2.8" fill="#3B2A1E"/>
    <circle cx="89.5" cy="60.2" r=".9" fill="#FFFFFF"/><circle cx="113.5" cy="60.2" r=".9" fill="#FFFFFF"/>`;
}
const MOUTHS = {
  happy: `<path d="M91 81 Q100 89 109 81" stroke="#B5574F" stroke-width="2.2" fill="none" stroke-linecap="round"/>`,
  sad: `<path d="M92 86 Q100 80 108 86" stroke="#B5574F" stroke-width="2.2" fill="none" stroke-linecap="round"/>`,
  surprised: `<ellipse cx="100" cy="84" rx="4" ry="5" fill="#8C3B35"/>`,
  angry: `<path d="M92 84 L108 84" stroke="#B5574F" stroke-width="2.2" stroke-linecap="round"/>`,
  sleepy: `<path d="M95 84 Q100 86 105 84" stroke="#B5574F" stroke-width="2" fill="none" stroke-linecap="round"/>`,
};

const HAIRS = {
  hair_short: { d: (c) => `<path d="M72 62 Q70 26 100 26 Q130 26 128 62 Q124 42 112 40 Q100 46 86 40 Q76 44 72 62 Z" fill="${F(c, 10, -8)}"/>` },
  hair_buzz: { d: (c) => `<path d="M74 58 Q72 30 100 29 Q128 30 126 58 Q122 40 100 38 Q78 40 74 58 Z" fill="${c}" opacity=".85"/>` },
  hair_side: { d: (c) => `<path d="M72 66 Q66 26 100 25 Q134 26 129 60 Q118 36 92 42 Q80 46 72 66 Z" fill="${F(c, 10, -8)}"/><path d="M92 30 Q110 32 124 46" stroke="${shade(c, 14)}" stroke-width="2" fill="none"/>` },
  hair_long: {
    back: (c) => `<path d="M70 58 Q64 140 80 168 L120 168 Q136 140 130 58 Z" fill="${F(c, 0, -14)}"/>`,
    d: (c) => `<path d="M71 74 Q66 26 100 26 Q134 26 129 74 Q124 46 106 40 Q100 46 94 40 Q76 46 71 74 Z" fill="${F(c, 10, -8)}"/>`,
  },
  hair_wavy: {
    back: (c) => `<path d="M70 58 Q60 100 70 130 Q62 150 76 170 Q90 160 100 166 Q110 160 124 170 Q138 150 130 130 Q140 100 130 58 Z" fill="${F(c, 0, -14)}"/>`,
    d: (c) => `<path d="M71 72 Q66 26 100 26 Q134 26 129 72 Q120 40 100 42 Q80 40 71 72 Z" fill="${F(c, 10, -8)}"/>`,
  },
  hair_bob: { d: (c) => `<path d="M70 98 Q62 30 100 26 Q138 30 130 98 L120 98 Q124 50 100 44 Q76 50 80 98 Z" fill="${F(c, 10, -10)}"/>` },
  hair_ponytail: {
    back: (c) => `<path d="M118 40 Q150 50 146 100 Q142 130 132 140 Q136 100 124 66 Z" fill="${F(c, 6, -14)}"/>`,
    d: (c) => `<path d="M72 64 Q68 26 100 26 Q132 26 128 64 Q122 42 100 40 Q78 42 72 64 Z" fill="${F(c, 10, -8)}"/><circle cx="124" cy="40" r="5" fill="#3DDBC4"/>`,
  },
  hair_bun: { d: (c) => `<circle cx="100" cy="20" r="15" fill="${F(c, 10, -8)}"/><path d="M72 64 Q68 30 100 30 Q132 30 128 64 Q122 42 100 42 Q78 42 72 64 Z" fill="${F(c, 10, -8)}"/>` },
  hair_curly: { d: (c) => [[76, 50], [82, 36], [94, 28], [106, 28], [118, 36], [124, 50], [72, 66], [128, 66], [88, 40], [112, 40]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="12" fill="${FR(c)}"/>`).join('') },
  hair_afro: { back: (c) => `<circle cx="100" cy="52" r="46" fill="${FR(c)}"/>`, d: (c) => `<path d="M74 42 Q78 26 100 26 Q122 26 126 42 Q118 34 100 34 Q82 34 74 42 Z" fill="${shade(c, -8)}"/>` },
  hair_braids: {
    back: (c) => `${[0, 1, 2, 3, 4, 5].map((i) => `<ellipse cx="78" cy="${100 + i * 13}" rx="6" ry="7.5" fill="${shade(c, i % 2 ? -6 : 4)}"/><ellipse cx="122" cy="${100 + i * 13}" rx="6" ry="7.5" fill="${shade(c, i % 2 ? -6 : 4)}"/>`).join('')}`,
    d: (c) => `<path d="M72 70 Q68 26 100 26 Q132 26 128 70 Q122 42 100 40 Q78 42 72 70 Z" fill="${F(c, 10, -8)}"/><path d="M100 28 L100 42" stroke="${shade(c, -16)}" stroke-width="1.6"/>`,
  },
  hair_mohawk: { d: (c) => `<path d="M90 44 Q88 8 100 4 Q112 8 110 44 Z" fill="${F(c, 10, -8)}"/><path d="M74 58 Q74 40 90 38 M126 58 Q126 40 110 38" stroke="${c}" stroke-width="3" opacity=".5" fill="none"/>` },
};

// Clothes are drawn to fit the body above.
const CLOTHES = {
  tshirt: { slot: 'top', d: (c) => `<path d="M89 110 Q100 118 111 110 Q134 114 142 126 L156 160 L138 168 L134 156 L134 214 L66 214 L66 156 L62 168 L44 160 L58 126 Q66 114 89 110 Z" fill="${F(c, 10, -10)}"/><path d="M89 110 Q100 120 111 110" stroke="${shade(c, -20)}" stroke-width="2.4" fill="none"/>` },
  longsleeve: { slot: 'top', d: (c) => `<path d="M89 110 Q100 118 111 110 Q134 114 142 126 Q148 140 150 160 L158 234 L144 236 L134 170 L134 214 L66 214 L66 170 L56 236 L42 234 L50 160 Q52 140 58 126 Q66 114 89 110 Z" fill="${F(c, 10, -10)}"/><path d="M144 228 L158 226 M56 228 L42 226" stroke="${shade(c, -18)}" stroke-width="3"/>` },
  hoodie: { slot: 'top', d: (c) => `<path d="M80 112 Q78 96 100 94 Q122 96 120 112 Q136 116 142 126 Q148 140 150 160 L158 234 L144 236 L134 170 L134 222 L66 222 L66 170 L56 236 L42 234 L50 160 Q52 140 58 126 Q64 116 80 112 Z" fill="${F(c, 10, -12)}"/><path d="M80 112 Q100 128 120 112" stroke="${shade(c, -22)}" stroke-width="3" fill="none"/><path d="M76 180 L124 180 L118 206 L82 206 Z" fill="none" stroke="${shade(c, -18)}" stroke-width="2"/><path d="M95 118 L94 146 M105 118 L106 146" stroke="#F4F2EC" stroke-width="2"/>` },
  tank: { slot: 'top', d: (c) => `<path d="M80 112 L88 112 Q100 128 112 112 L120 112 L128 134 L134 214 L66 214 L72 134 Z" fill="${F(c, 10, -10)}"/>` },
  jacket: { slot: 'outer', d: (c) => `<path d="M88 110 L96 220 L64 220 L64 170 L55 238 L41 236 L50 158 Q52 136 58 126 Q68 114 88 110 Z M112 110 L104 220 L136 220 L136 170 L145 238 L159 236 L150 158 Q148 136 142 126 Q132 114 112 110 Z" fill="${F(c, 10, -12)}"/><path d="M88 110 L82 140 L94 136 M112 110 L118 140 L106 136" fill="${shade(c, -14)}"/><circle cx="96" cy="170" r="2.4" fill="${DARK}"/><circle cx="96" cy="196" r="2.4" fill="${DARK}"/>` },
  puffer: { slot: 'outer', d: (c) => `<path d="M86 106 Q100 100 114 106 Q138 112 144 128 Q150 144 152 162 L160 236 L142 238 L136 176 L138 226 L62 226 L64 176 L58 238 L40 236 L48 162 Q50 144 56 128 Q62 112 86 106 Z" fill="${F(c, 12, -12)}"/>${[134, 156, 178, 200].map((y) => `<path d="M64 ${y} Q100 ${y + 6} 136 ${y}" stroke="${shade(c, -16)}" stroke-width="2" fill="none"/>`).join('')}<path d="M100 104 L100 226" stroke="${shade(c, -24)}" stroke-width="2"/>` },
  dress: { slot: 'dress', d: (c) => `<path d="M84 112 Q100 122 116 112 L124 120 L130 200 L162 300 Q100 316 38 300 L70 200 L76 120 Z" fill="${F(c, 10, -14)}"/><path d="M70 200 Q100 210 130 200" stroke="${shade(c, -20)}" stroke-width="4" fill="none"/>` },
  dress_long: { slot: 'dress', d: (c) => `<path d="M80 112 L88 112 Q100 126 112 112 L120 112 L128 140 L130 200 L150 380 Q100 392 50 380 L70 200 L72 140 Z" fill="${F(c, 10, -14)}"/><path d="M90 220 L80 376 M110 220 L120 376" stroke="${shade(c, -12)}" stroke-width="1.6"/>` },
  jeans: { slot: 'bottom', d: (c) => `<path d="M66 208 L134 208 L134 228 L128 392 L112 392 L102 252 L98 252 L88 392 L72 392 L66 228 Z" fill="${F(c, 8, -12)}"/><path d="M100 212 L100 250 M70 216 L130 216" stroke="${shade(c, -18)}" stroke-width="1.6"/><path d="M72 220 Q80 232 90 224 M128 220 Q120 232 110 224" stroke="#E2B84A" stroke-width="1" fill="none"/>` },
  shorts: { slot: 'bottom', d: (c) => `<path d="M66 208 L134 208 L136 232 L134 280 L106 282 L100 250 L94 282 L66 280 L64 232 Z" fill="${F(c, 8, -12)}"/><path d="M100 212 L100 250" stroke="${shade(c, -18)}" stroke-width="1.6"/>` },
  sweatpants: { slot: 'bottom', d: (c) => `<path d="M64 206 L136 206 L136 232 L130 380 L110 384 L102 254 L98 254 L90 384 L70 380 L64 232 Z" fill="${F(c, 8, -12)}"/><rect x="68" y="374" width="22" height="12" rx="4" fill="${shade(c, -14)}"/><rect x="110" y="374" width="22" height="12" rx="4" fill="${shade(c, -14)}"/><path d="M96 210 L94 228 M104 210 L106 228" stroke="#F4F2EC" stroke-width="1.6"/>` },
  skirt: { slot: 'bottom', d: (c) => `<path d="M68 206 L132 206 L156 290 Q100 302 44 290 Z" fill="${F(c, 8, -14)}"/><path d="M82 214 L72 290 M100 214 L100 296 M118 214 L128 290" stroke="${shade(c, -14)}" stroke-width="2"/>` },
  skirt_long: { slot: 'bottom', d: (c) => `<path d="M68 206 L132 206 L146 380 Q100 390 54 380 Z" fill="${F(c, 8, -14)}"/><path d="M86 220 L78 380 M114 220 L122 380" stroke="${shade(c, -12)}" stroke-width="1.6"/>` },
  sneakers: { slot: 'feet', d: (c) => `<path d="M66 392 Q66 384 74 384 L90 384 L92 412 L60 412 Q58 404 66 400 Z M134 392 Q134 384 126 384 L110 384 L108 412 L140 412 Q142 404 134 400 Z" fill="${F(c, 10, -10)}"/><path d="M58 410 L92 410 M108 410 L142 410" stroke="#FFFFFF" stroke-width="4"/>` },
  shoes: { slot: 'feet', d: (c) => `<path d="M64 402 Q64 392 76 392 L90 392 L90 412 L58 412 Q58 406 64 402 Z M136 402 Q136 392 124 392 L110 392 L110 412 L142 412 Q142 406 136 402 Z" fill="${F(c, 14, -10)}"/>` },
  boots: { slot: 'feet', d: (c) => `<path d="M70 344 L92 344 L92 412 L60 412 Q58 400 70 396 Z M130 344 L108 344 L108 412 L140 412 Q142 400 130 396 Z" fill="${F(c, 8, -12)}"/><path d="M70 352 L92 352 M108 352 L130 352" stroke="${shade(c, -20)}" stroke-width="3"/>` },
  sweater: { slot: 'top', d: (c) => `<path d="M86 108 Q100 116 114 108 Q134 114 142 126 Q148 140 150 160 L158 234 L144 236 L134 170 L134 218 L66 218 L66 170 L56 236 L42 234 L50 160 Q52 140 58 126 Q66 114 86 108 Z" fill="${F(c, 10, -12)}"/><path d="M86 108 Q100 120 114 108" stroke="${shade(c, -20)}" stroke-width="5" fill="none"/><path d="M66 210 L134 210 M56 226 L42 224 M144 226 L158 224" stroke="${shade(c, -16)}" stroke-width="5"/>${[140, 160, 180].map((y) => `<path d="M72 ${y} L128 ${y}" stroke="${shade(c, 14)}" stroke-width="2" stroke-dasharray="4 4"/>`).join('')}` },
  coat_long: { slot: 'outer', d: (c) => `<path d="M86 108 L96 330 L60 330 L64 172 L55 238 L41 236 L50 158 Q52 136 58 126 Q68 114 86 108 Z M114 108 L104 330 L140 330 L136 172 L145 238 L159 236 L150 158 Q148 136 142 126 Q132 114 114 108 Z" fill="${F(c, 10, -14)}"/><path d="M68 214 L132 214" stroke="${shade(c, -20)}" stroke-width="6"/><circle cx="94" cy="160" r="3" fill="${DARK}"/><circle cx="94" cy="190" r="3" fill="${DARK}"/>` },
  overalls: { slot: 'dress', d: (c) => `<path d="M82 112 L88 112 L92 150 L108 150 L112 112 L118 112 L124 150 L134 210 L134 228 L128 392 L112 392 L102 252 L98 252 L88 392 L72 392 L66 228 L66 210 L76 150 Z" fill="${F(c, 8, -12)}"/><rect x="86" y="160" width="28" height="22" rx="3" fill="${shade(c, -10)}"/><circle cx="84" cy="152" r="3" fill="#E6B43C"/><circle cx="116" cy="152" r="3" fill="#E6B43C"/>` },
  sandals: { slot: 'feet', d: (c) => `<path d="M62 408 L92 408 L92 412 L60 412 Z M108 408 L140 408 L140 412 L108 412 Z" fill="${shade(c, -20)}"/><path d="M72 396 L88 404 M72 404 L88 396 M112 396 L128 404 M112 404 L128 396" stroke="${c}" stroke-width="4" stroke-linecap="round"/>` },
  scarf: { slot: 'neck', d: (c) => `<path d="M84 104 Q100 118 116 104 L118 118 Q100 132 82 118 Z" fill="${F(c, 10, -10)}"/><path d="M106 122 L118 196 L102 198 L96 126 Z" fill="${F(c, 6, -14)}"/>` },
};

// Accessories can be moved, resized, rotated and flipped freely on the dress-up screen.
// box = where they sit on the 200x420 character by default.
export const ACCESSORIES = {
  beanie: { box: [70, 18, 60, 34], d: (c) => `<path d="M2 32 Q0 2 30 2 Q60 2 58 32 Z" fill="${F(c)}"/><rect x="0" y="26" width="60" height="9" rx="3" fill="${shade(c, -14)}"/>` },
  sunhat: { box: [50, 12, 100, 40], d: (c) => `<ellipse cx="50" cy="30" rx="50" ry="10" fill="${F(c)}"/><path d="M24 30 Q24 2 50 2 Q76 2 76 30 Z" fill="${F(c, 14, -6)}"/><path d="M24 24 L76 24" stroke="${shade(c, -26)}" stroke-width="5"/>` },
  cap: { box: [70, 20, 80, 30], d: (c) => `<path d="M4 28 Q4 2 32 2 Q60 2 60 28 Z" fill="${F(c)}"/><path d="M56 26 Q74 22 80 28 L58 30 Z" fill="${shade(c, -18)}"/>` },
  crown: { box: [74, 6, 52, 32], d: (c) => `<path d="M4 30 L2 4 L14 16 L26 0 L38 16 L50 4 L48 30 Z" fill="${FH(c, 18, -14)}"/><circle cx="26" cy="20" r="3.4" fill="#3DDBC4"/><circle cx="12" cy="24" r="2.6" fill="#E9463F"/><circle cx="40" cy="24" r="2.6" fill="#E9463F"/>` },
  glasses: { box: [76, 52, 48, 18], d: (c) => `<circle cx="11" cy="9" r="8" fill="#FFFFFF" fill-opacity=".25" stroke="${c}" stroke-width="2.6"/><circle cx="37" cy="9" r="8" fill="#FFFFFF" fill-opacity=".25" stroke="${c}" stroke-width="2.6"/><path d="M19 9 L29 9" stroke="${c}" stroke-width="2"/>` },
  sunglasses: { box: [74, 52, 52, 18], d: (c) => `<path d="M2 4 L22 4 Q22 16 12 16 Q2 16 2 4 Z M30 4 L50 4 Q50 16 40 16 Q30 16 30 4 Z" fill="${F(c, 20, -10)}"/><path d="M22 6 L30 6" stroke="${DARK}" stroke-width="2"/>` },
  earrings: { box: [68, 70, 64, 16], d: (c) => `<circle cx="4" cy="8" r="4" fill="none" stroke="${c}" stroke-width="2"/><circle cx="60" cy="8" r="4" fill="none" stroke="${c}" stroke-width="2"/>` },
  necklace: { box: [80, 104, 40, 30], d: (c) => `<path d="M2 2 Q20 30 38 2" fill="none" stroke="${c}" stroke-width="2"/><circle cx="20" cy="24" r="4" fill="${FR(c)}"/>` },
  watch: { box: [140, 214, 20, 18], d: (c) => `<rect x="0" y="5" width="20" height="8" rx="2" fill="${c}"/><circle cx="10" cy="9" r="6" fill="#F4F2EC" stroke="${DARK}" stroke-width="1.4"/>` },
  backpack: { box: [130, 120, 48, 80], d: (c) => `<rect x="4" y="10" width="40" height="66" rx="12" fill="${F(c)}"/><rect x="10" y="44" width="28" height="22" rx="5" fill="${shade(c, -10)}"/><path d="M14 10 Q24 0 34 10" stroke="${shade(c, -20)}" stroke-width="3" fill="none"/>` },
  bag: { box: [120, 120, 60, 120], d: (c) => `<path d="M2 2 L44 92" stroke="${shade(c, -20)}" stroke-width="3"/><rect x="30" y="86" width="30" height="28" rx="6" fill="${F(c)}"/><rect x="30" y="94" width="30" height="4" fill="${shade(c, -16)}"/>` },
  headphones: { box: [64, 24, 72, 60], d: (c) => `<path d="M8 42 L8 30 Q8 4 36 4 Q64 4 64 30 L64 42" fill="none" stroke="${shade(c, -10)}" stroke-width="5"/><rect x="0" y="36" width="14" height="22" rx="6" fill="${F(c)}"/><rect x="58" y="36" width="14" height="22" rx="6" fill="${F(c)}"/>` },
  bracelet: { box: [42, 226, 18, 10], d: (c) => `<ellipse cx="9" cy="5" rx="8" ry="4" fill="none" stroke="${c}" stroke-width="3"/>` },
  hairclip: { box: [76, 34, 22, 10], d: (c) => `<rect x="1" y="1" width="20" height="8" rx="4" fill="${F(c)}"/><circle cx="6" cy="5" r="1.6" fill="#FFFFFF"/>` },
  wings: { box: [20, 100, 160, 140], d: (c) => `<path d="M80 40 Q40 -10 6 20 Q0 60 40 70 Q10 100 30 130 Q60 130 78 70 Z M80 40 Q120 -10 154 20 Q160 60 120 70 Q150 100 130 130 Q100 130 82 70 Z" fill="${c}" opacity=".7"/><path d="M80 40 Q40 10 14 26 M80 40 Q120 10 146 26" stroke="#FFFFFF" stroke-width="2" fill="none" opacity=".8"/>` },
  bow: { box: [110, 22, 34, 20], d: (c) => `<path d="M17 10 L2 2 L2 18 Z M17 10 L32 2 L32 18 Z" fill="${F(c)}"/><circle cx="17" cy="10" r="4" fill="${shade(c, -14)}"/>` },
};

export const DRESS_ART = {};
for (const [k, v] of Object.entries(HAIRS)) DRESS_ART[k] = { slot: 'hair', box: '60 0 80 180', ...v };
for (const [k, v] of Object.entries(CLOTHES)) DRESS_ART[k] = { box: v.slot === 'feet' ? '50 330 100 90' : v.slot === 'neck' ? '70 96 60 110' : v.slot === 'top' || v.slot === 'outer' ? '36 90 128 152' : v.slot === 'dress' ? '30 100 140 290' : '40 200 120 200', ...v };
for (const [k, v] of Object.entries(ACCESSORIES)) DRESS_ART[k] = { ...v, acc: true, at: v.box, box: `0 0 ${v.box[2]} ${v.box[3]}` };
