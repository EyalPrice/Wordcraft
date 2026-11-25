// Wordcraft KIDS art (the first, cute style). Kept for the little-kids coloring world. Not loaded by the teen game.
// Each function takes the item's main color and returns the inner SVG markup.

export const OUT = '#0A2540';
const S = `stroke="${OUT}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"`;

// Darken (amt < 0) or lighten (amt > 0) a hex color.
export function shade(hex, amt) {
  let h = hex.replace('#', '');
  if (h.length === 3) h = h.split('').map((x) => x + x).join('');
  const n = parseInt(h, 16);
  const f = (v) => Math.max(0, Math.min(255, Math.round(v + (amt / 100) * 255)));
  const r = f((n >> 16) & 255), g = f((n >> 8) & 255), b = f(n & 255);
  return '#' + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
}
const dk = (c) => shade(c, -18);
const lt = (c) => shade(c, 22);

export const ART = {
  // ---------- bedroom ----------
  bed: (c) => `
    <rect x="8" y="30" width="16" height="50" rx="5" fill="${dk(c)}" ${S}/>
    <rect x="10" y="74" width="6" height="12" rx="2" fill="${dk(c)}" ${S}/>
    <rect x="84" y="74" width="6" height="12" rx="2" fill="${dk(c)}" ${S}/>
    <rect x="12" y="56" width="80" height="20" rx="6" fill="#FFFFFF" ${S}/>
    <ellipse cx="32" cy="55" rx="12" ry="6.5" fill="#FFFFFF" ${S}/>
    <path d="M44 52 L90 52 Q94 52 94 57 L94 76 L44 76 Z" fill="${c}" ${S}/>
    <path d="M52 58 L86 58" stroke="${lt(c)}" stroke-width="3" stroke-linecap="round"/>`,
  chair: (c) => `
    <rect x="26" y="12" width="13" height="52" rx="5" fill="${c}" ${S}/>
    <rect x="26" y="54" width="48" height="11" rx="5" fill="${c}" ${S}/>
    <path d="M32 65 L30 90 M68 65 L70 90" stroke="${OUT}" stroke-width="5" stroke-linecap="round"/>
    <path d="M32 65 L30 90 M68 65 L70 90" stroke="${dk(c)}" stroke-width="2" stroke-linecap="round"/>`,
  table: (c) => `
    <rect x="16" y="48" width="8" height="40" rx="3" fill="${dk(c)}" ${S}/>
    <rect x="76" y="48" width="8" height="40" rx="3" fill="${dk(c)}" ${S}/>
    <rect x="8" y="38" width="84" height="12" rx="5" fill="${c}" ${S}/>`,
  desk: (c) => `
    <rect x="12" y="46" width="7" height="42" rx="3" fill="${dk(c)}" ${S}/>
    <rect x="58" y="46" width="32" height="42" rx="4" fill="${c}" ${S}/>
    <path d="M58 66 L90 66" ${S}/>
    <circle cx="74" cy="56" r="2.5" fill="${OUT}"/><circle cx="74" cy="76" r="2.5" fill="${OUT}"/>
    <rect x="6" y="38" width="88" height="10" rx="4" fill="${lt(c)}" ${S}/>`,
  wardrobe: (c) => `
    <rect x="22" y="6" width="56" height="82" rx="6" fill="${c}" ${S}/>
    <path d="M50 8 L50 86" ${S}/>
    <circle cx="45" cy="48" r="2.8" fill="${OUT}"/><circle cx="55" cy="48" r="2.8" fill="${OUT}"/>
    <rect x="26" y="88" width="8" height="6" rx="2" fill="${dk(c)}" ${S}/>
    <rect x="66" y="88" width="8" height="6" rx="2" fill="${dk(c)}" ${S}/>`,
  shelf: (c) => `
    <rect x="18" y="8" width="64" height="84" rx="5" fill="${c}" ${S}/>
    <rect x="24" y="14" width="52" height="20" rx="2" fill="#FFFFFF" ${S}/>
    <rect x="24" y="40" width="52" height="20" rx="2" fill="#FFFFFF" ${S}/>
    <rect x="24" y="66" width="52" height="20" rx="2" fill="#FFFFFF" ${S}/>
    <rect x="28" y="17" width="6" height="17" fill="#E8734A" ${S}/><rect x="35" y="19" width="6" height="15" fill="#3DDBC4" ${S}/>
    <rect x="42" y="17" width="5" height="17" fill="#FFD54F" ${S}/>
    <rect x="58" y="44" width="6" height="16" fill="#1279B8" ${S}/><rect x="65" y="46" width="6" height="14" fill="#12855A" ${S}/>
    <circle cx="36" cy="77" r="7" fill="#9AD27A" ${S}/>`,
  lamp_floor: (c) => `
    <ellipse cx="50" cy="90" rx="16" ry="4.5" fill="${dk(c)}" ${S}/>
    <path d="M50 88 L50 32" stroke="${OUT}" stroke-width="5" stroke-linecap="round"/>
    <path d="M50 88 L50 32" stroke="#C9D6E3" stroke-width="2" stroke-linecap="round"/>
    <path d="M30 34 L70 34 L61 8 L39 8 Z" fill="${c}" ${S}/>
    <ellipse cx="50" cy="38" rx="6" ry="3" fill="#FFE68A"/>`,
  lamp_desk: (c) => `
    <ellipse cx="34" cy="88" rx="16" ry="4.5" fill="${dk(c)}" ${S}/>
    <path d="M34 86 L34 58 L60 38" fill="none" stroke="${OUT}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M34 86 L34 58 L60 38" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M52 30 L76 26 L82 50 L66 54 Z" fill="${c}" ${S}/>
    <ellipse cx="74" cy="53" rx="7" ry="3" fill="#FFE68A" transform="rotate(-14 74 53)"/>`,
  lamp_round: (c) => `
    <ellipse cx="50" cy="90" rx="14" ry="4" fill="${dk(c)}" ${S}/>
    <path d="M50 88 L50 62" stroke="${OUT}" stroke-width="4" stroke-linecap="round"/>
    <circle cx="50" cy="38" r="26" fill="${c}" ${S}/>
    <path d="M28 30 Q50 38 72 30 M26 44 Q50 52 74 44" fill="none" stroke="${lt(c)}" stroke-width="2.5"/>
    <circle cx="42" cy="28" r="5" fill="#FFFFFF" opacity=".6"/>`,
  mirror: (c) => `
    <ellipse cx="50" cy="48" rx="28" ry="40" fill="${c}" ${S}/>
    <ellipse cx="50" cy="48" rx="20" ry="31" fill="#D4F1FA" ${S}/>
    <path d="M40 30 L50 22 M38 40 L56 26" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/>`,
  rug: (c) => `
    <ellipse cx="50" cy="62" rx="46" ry="20" fill="${c}" ${S}/>
    <ellipse cx="50" cy="62" rx="34" ry="13" fill="none" stroke="#FFFFFF" stroke-width="2.5" stroke-dasharray="5 4"/>
    <ellipse cx="50" cy="62" rx="16" ry="6" fill="${lt(c)}"/>`,
  curtain: (c) => `
    <path d="M6 10 L94 10" stroke="${OUT}" stroke-width="4" stroke-linecap="round"/>
    <circle cx="6" cy="10" r="3.5" fill="${OUT}"/><circle cx="94" cy="10" r="3.5" fill="${OUT}"/>
    <path d="M10 12 L40 12 Q36 40 28 50 Q36 70 40 92 L10 92 Z" fill="${c}" ${S}/>
    <path d="M90 12 L60 12 Q64 40 72 50 Q64 70 60 92 L90 92 Z" fill="${c}" ${S}/>
    <path d="M18 14 L18 90 M82 14 L82 90" stroke="${dk(c)}" stroke-width="2"/>
    <rect x="24" y="47" width="10" height="6" rx="3" fill="#FFD54F" ${S}/><rect x="66" y="47" width="10" height="6" rx="3" fill="#FFD54F" ${S}/>`,
  picture: (c) => `
    <rect x="14" y="16" width="72" height="58" rx="3" fill="${c}" ${S}/>
    <rect x="22" y="24" width="56" height="42" fill="#D4F1FA" ${S}/>
    <path d="M22 66 L40 44 L52 56 L62 46 L78 66 Z" fill="#12855A" stroke="${OUT}" stroke-width="2" stroke-linejoin="round"/>
    <circle cx="66" cy="34" r="5" fill="#FFD54F"/>
    <path d="M44 16 L50 8 L56 16" fill="none" ${S}/>`,
  clock: (c) => `
    <circle cx="50" cy="50" r="36" fill="${c}" ${S}/>
    <circle cx="50" cy="50" r="28" fill="#FFFFFF" ${S}/>
    <path d="M50 50 L50 30 M50 50 L64 56" stroke="${OUT}" stroke-width="4" stroke-linecap="round"/>
    <circle cx="50" cy="50" r="3" fill="${OUT}"/>
    <path d="M50 24 L50 27 M76 50 L73 50 M50 76 L50 73 M24 50 L27 50" stroke="${OUT}" stroke-width="2.5" stroke-linecap="round"/>`,
  plant: (c) => `
    <path d="M50 58 Q30 40 26 22 Q44 28 50 50 Q56 28 74 22 Q70 40 50 58" fill="#3FB36F" ${S}/>
    <path d="M50 60 Q42 36 50 12 Q58 36 50 60" fill="#5CCB86" ${S}/>
    <path d="M30 58 L70 58 L64 92 L36 92 Z" fill="${c}" ${S}/>
    <rect x="27" y="54" width="46" height="9" rx="4" fill="${lt(c)}" ${S}/>`,
  pillow: (c) => `
    <path d="M14 34 Q50 24 86 34 Q92 50 86 66 Q50 76 14 66 Q8 50 14 34 Z" fill="${c}" ${S}/>
    <path d="M30 42 Q50 36 70 42" fill="none" stroke="${lt(c)}" stroke-width="3" stroke-linecap="round"/>`,
  radio: (c) => `
    <path d="M28 34 L64 10" stroke="${OUT}" stroke-width="3" stroke-linecap="round"/>
    <rect x="12" y="32" width="76" height="48" rx="9" fill="${c}" ${S}/>
    <circle cx="34" cy="56" r="13" fill="${dk(c)}" ${S}/>
    <circle cx="34" cy="56" r="5" fill="${OUT}"/>
    <rect x="54" y="42" width="26" height="12" rx="3" fill="#FFFFFF" ${S}/>
    <circle cx="60" cy="68" r="4" fill="#FFD54F" ${S}/><circle cx="74" cy="68" r="4" fill="#FFD54F" ${S}/>`,
  record_player: (c) => `
    <rect x="8" y="46" width="84" height="34" rx="6" fill="${c}" ${S}/>
    <ellipse cx="44" cy="46" rx="30" ry="9" fill="#1C2B3A" ${S}/>
    <ellipse cx="44" cy="46" rx="20" ry="6" fill="none" stroke="#4FB3F0" stroke-width="1.5"/>
    <ellipse cx="44" cy="46" rx="7" ry="2.5" fill="#3DDBC4"/>
    <path d="M84 40 L80 30 L60 42" fill="none" stroke="${OUT}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="80" cy="64" r="4" fill="#FFFFFF" ${S}/><circle cx="66" cy="64" r="4" fill="#FFFFFF" ${S}/>`,
  guitar: (c) => `
    <rect x="46" y="6" width="9" height="44" rx="3" fill="#8A5A3B" ${S}/>
    <rect x="43" y="4" width="15" height="9" rx="3" fill="#5E3B25" ${S}/>
    <circle cx="50" cy="56" r="17" fill="${c}" ${S}/>
    <circle cx="50" cy="76" r="20" fill="${c}" ${S}/>
    <circle cx="50" cy="62" r="6" fill="${OUT}"/>
    <rect x="42" y="78" width="17" height="5" rx="2" fill="#5E3B25"/>`,
  window: (c) => `
    <rect x="16" y="10" width="68" height="74" rx="4" fill="${c}" ${S}/>
    <rect x="23" y="17" width="54" height="60" fill="#BFE9F7" ${S}/>
    <path d="M50 17 L50 77 M23 47 L77 47" stroke="${c}" stroke-width="5"/>
    <path d="M50 17 L50 77 M23 47 L77 47" fill="none" stroke="${OUT}" stroke-width="1.5"/>
    <circle cx="36" cy="30" r="5" fill="#FFFFFF" opacity=".8"/>
    <rect x="12" y="82" width="76" height="7" rx="3" fill="${dk(c)}" ${S}/>`,
  book: (c) => `
    <rect x="18" y="70" width="64" height="14" rx="3" fill="${c}" ${S}/>
    <rect x="24" y="56" width="56" height="14" rx="3" fill="${shade(c, 15)}" ${S}/>
    <rect x="20" y="42" width="60" height="14" rx="3" fill="${dk(c)}" ${S}/>
    <path d="M26 76 L74 76 M32 62 L72 62 M28 48 L72 48" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>`,
  teddy: (c) => `
    <circle cx="32" cy="22" r="9" fill="${c}" ${S}/><circle cx="68" cy="22" r="9" fill="${c}" ${S}/>
    <ellipse cx="50" cy="68" rx="24" ry="22" fill="${c}" ${S}/>
    <circle cx="50" cy="36" r="20" fill="${c}" ${S}/>
    <ellipse cx="50" cy="44" rx="9" ry="6.5" fill="${lt(c)}" ${S}/>
    <circle cx="43" cy="33" r="2.5" fill="${OUT}"/><circle cx="57" cy="33" r="2.5" fill="${OUT}"/>
    <ellipse cx="50" cy="41" rx="3" ry="2" fill="${OUT}"/>
    <ellipse cx="50" cy="70" rx="12" ry="11" fill="${lt(c)}"/>`,
  cat: (c) => `
    <path d="M70 80 Q92 76 86 56" fill="none" stroke="${OUT}" stroke-width="7" stroke-linecap="round"/>
    <path d="M70 80 Q92 76 86 56" fill="none" stroke="${c}" stroke-width="3.5" stroke-linecap="round"/>
    <ellipse cx="52" cy="70" rx="22" ry="18" fill="${c}" ${S}/>
    <path d="M30 30 L34 12 L44 24 Z M70 30 L66 12 L56 24 Z" fill="${c}" ${S}/>
    <circle cx="50" cy="38" r="20" fill="${c}" ${S}/>
    <circle cx="43" cy="36" r="2.8" fill="${OUT}"/><circle cx="57" cy="36" r="2.8" fill="${OUT}"/>
    <path d="M47 44 L50 46 L53 44" fill="none" stroke="${OUT}" stroke-width="2" stroke-linecap="round"/>
    <path d="M30 42 L40 43 M30 47 L40 46 M70 42 L60 43 M70 47 L60 46" stroke="${OUT}" stroke-width="1.5"/>`,
  fish: (c) => `
    <circle cx="50" cy="52" r="38" fill="#D4F1FA" ${S}/>
    <path d="M14 62 Q50 72 86 62 L82 74 Q50 92 18 74 Z" fill="#9EDFF2"/>
    <path d="M30 48 Q44 34 60 48 Q44 62 30 48 Z" fill="${c}" ${S}/>
    <path d="M60 48 L72 40 L72 56 Z" fill="${c}" ${S}/>
    <circle cx="38" cy="46" r="2.2" fill="${OUT}"/>
    <circle cx="26" cy="32" r="3" fill="none" stroke="#FFFFFF" stroke-width="1.5"/>
    <rect x="30" y="10" width="40" height="6" rx="3" fill="#BFE9F7" ${S}/>`,

  // ---------- park ----------
  tree: (c) => `
    <rect x="44" y="56" width="12" height="36" rx="3" fill="#8A5A3B" ${S}/>
    <circle cx="34" cy="44" r="18" fill="${c}" ${S}/>
    <circle cx="66" cy="44" r="18" fill="${c}" ${S}/>
    <circle cx="50" cy="28" r="22" fill="${c}" ${S}/>
    <circle cx="44" cy="22" r="5" fill="${lt(c)}"/>`,
  bench: (c) => `
    <rect x="10" y="30" width="80" height="9" rx="3" fill="${c}" ${S}/>
    <rect x="10" y="42" width="80" height="9" rx="3" fill="${c}" ${S}/>
    <rect x="8" y="58" width="84" height="9" rx="3" fill="${c}" ${S}/>
    <path d="M18 51 L18 88 M82 51 L82 88" stroke="${OUT}" stroke-width="5" stroke-linecap="round"/>`,
  swing: (c) => `
    <path d="M8 92 L24 8 L76 8 L92 92" fill="none" stroke="${OUT}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/>
    <path d="M8 92 L24 8 L76 8 L92 92" fill="none" stroke="#9FB4C7" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M38 9 L38 66 M62 9 L62 66" stroke="${OUT}" stroke-width="2"/>
    <rect x="32" y="64" width="36" height="8" rx="3" fill="${c}" ${S}/>`,
  slide: (c) => `
    <path d="M22 92 L22 22 M38 92 L38 22" stroke="${OUT}" stroke-width="4" stroke-linecap="round"/>
    <path d="M22 40 L38 40 M22 56 L38 56 M22 72 L38 72" stroke="${OUT}" stroke-width="3"/>
    <rect x="18" y="16" width="26" height="8" rx="3" fill="${dk(c)}" ${S}/>
    <path d="M40 18 Q60 22 70 58 Q76 80 94 88 L88 94 Q70 86 62 62 Q54 32 40 28 Z" fill="${c}" ${S}/>`,
  flower: (c) => `
    <path d="M50 92 L50 48" stroke="#2F9A5B" stroke-width="5" stroke-linecap="round"/>
    <path d="M50 74 Q34 64 30 74 Q40 82 50 74" fill="#5CCB86" ${S}/>
    <circle cx="50" cy="22" r="10" fill="${c}" ${S}/><circle cx="64" cy="32" r="10" fill="${c}" ${S}/>
    <circle cx="58" cy="48" r="10" fill="${c}" ${S}/><circle cx="42" cy="48" r="10" fill="${c}" ${S}/>
    <circle cx="36" cy="32" r="10" fill="${c}" ${S}/>
    <circle cx="50" cy="36" r="8" fill="#FFD54F" ${S}/>`,
  bush: (c) => `
    <circle cx="26" cy="66" r="18" fill="${c}" ${S}/><circle cx="74" cy="66" r="18" fill="${c}" ${S}/>
    <circle cx="50" cy="52" r="24" fill="${c}" ${S}/>
    <rect x="12" y="70" width="76" height="16" fill="${c}"/>
    <path d="M10 84 L90 84" ${S}/>
    <circle cx="40" cy="48" r="3" fill="#FFFFFF"/><circle cx="62" cy="60" r="3" fill="#FFFFFF"/><circle cx="30" cy="66" r="3" fill="#FFFFFF"/>`,
  ball: (c) => `
    <circle cx="50" cy="56" r="32" fill="${c}" ${S}/>
    <path d="M20 46 Q50 60 80 46" fill="none" stroke="#FFFFFF" stroke-width="6"/>
    <path d="M20 46 Q50 60 80 46" fill="none" stroke="${OUT}" stroke-width="1.5"/>
    <circle cx="40" cy="38" r="5" fill="#FFFFFF" opacity=".6"/>`,
  kite: (c) => `
    <path d="M50 6 L80 36 L50 70 L20 36 Z" fill="${c}" ${S}/>
    <path d="M50 6 L50 70 M20 36 L80 36" stroke="${dk(c)}" stroke-width="2"/>
    <path d="M50 70 Q40 80 52 86 Q62 92 50 98" fill="none" stroke="${OUT}" stroke-width="2"/>
    <path d="M44 80 L52 76 L50 84 Z M48 92 L56 90 L52 96 Z" fill="#FFD54F" stroke="${OUT}" stroke-width="1.5"/>`,
  bird: (c) => `
    <path d="M24 52 L8 46 L14 58 Z" fill="${dk(c)}" ${S}/>
    <ellipse cx="46" cy="56" rx="26" ry="20" fill="${c}" ${S}/>
    <circle cx="66" cy="40" r="14" fill="${c}" ${S}/>
    <path d="M78 38 L90 42 L78 46 Z" fill="#FFB347" ${S}/>
    <circle cx="68" cy="37" r="2.8" fill="${OUT}"/>
    <path d="M32 54 Q44 46 54 58 Q42 64 32 54" fill="${lt(c)}" ${S}/>
    <path d="M40 76 L40 88 M52 76 L52 88" stroke="${OUT}" stroke-width="2.5" stroke-linecap="round"/>`,
  streetlight: (c) => `
    <rect x="44" y="20" width="8" height="70" rx="3" fill="${c}" ${S}/>
    <rect x="36" y="86" width="24" height="7" rx="3" fill="${dk(c)}" ${S}/>
    <path d="M48 22 Q48 8 66 10" fill="none" stroke="${OUT}" stroke-width="5" stroke-linecap="round"/>
    <path d="M58 10 L76 10 L80 22 L54 22 Z" fill="${dk(c)}" ${S}/>
    <ellipse cx="67" cy="25" rx="9" ry="3.5" fill="#FFE68A"/>`,
  bicycle: (c) => `
    <circle cx="26" cy="66" r="18" fill="none" ${S}/><circle cx="74" cy="66" r="18" fill="none" ${S}/>
    <circle cx="26" cy="66" r="3" fill="${OUT}"/><circle cx="74" cy="66" r="3" fill="${OUT}"/>
    <path d="M26 66 L42 40 L66 40 L74 66 M42 40 L50 66 L66 40 M50 66 L26 66" fill="none" stroke="${OUT}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/>
    <path d="M26 66 L42 40 L66 40 L74 66 M42 40 L50 66 L66 40 M50 66 L26 66" fill="none" stroke="${c}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>
    <path d="M38 34 L48 34 M66 40 L62 28 L70 26" fill="none" stroke="${OUT}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>`,
  cloud: (c) => `
    <path d="M22 70 Q8 70 10 56 Q12 44 26 46 Q28 28 46 30 Q58 18 72 30 Q90 30 88 48 Q96 60 84 70 Z" fill="${c}" ${S}/>
    <path d="M30 50 Q36 42 46 44" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/>`,
  sun: (c) => `
    <g stroke="${OUT}" stroke-width="4" stroke-linecap="round">
      <path d="M50 6 L50 16 M50 84 L50 94 M6 50 L16 50 M84 50 L94 50 M19 19 L26 26 M74 74 L81 81 M81 19 L74 26 M26 74 L19 81"/>
    </g>
    <circle cx="50" cy="50" r="26" fill="${c}" ${S}/>
    <circle cx="42" cy="46" r="2.8" fill="${OUT}"/><circle cx="58" cy="46" r="2.8" fill="${OUT}"/>
    <path d="M42 58 Q50 64 58 58" fill="none" stroke="${OUT}" stroke-width="2.5" stroke-linecap="round"/>`,
  butterfly: (c) => `
    <ellipse cx="32" cy="38" rx="20" ry="18" fill="${c}" ${S}/><ellipse cx="68" cy="38" rx="20" ry="18" fill="${c}" ${S}/>
    <ellipse cx="34" cy="66" rx="14" ry="12" fill="${lt(c)}" ${S}/><ellipse cx="66" cy="66" rx="14" ry="12" fill="${lt(c)}" ${S}/>
    <circle cx="32" cy="38" r="6" fill="#FFFFFF" opacity=".7"/><circle cx="68" cy="38" r="6" fill="#FFFFFF" opacity=".7"/>
    <rect x="46" y="28" width="8" height="50" rx="4" fill="${OUT}"/>
    <path d="M48 28 Q42 16 36 14 M52 28 Q58 16 64 14" fill="none" stroke="${OUT}" stroke-width="2" stroke-linecap="round"/>`,
  trash_can: (c) => `
    <path d="M24 30 L76 30 L70 90 L30 90 Z" fill="${c}" ${S}/>
    <rect x="20" y="22" width="60" height="9" rx="3" fill="${dk(c)}" ${S}/>
    <rect x="42" y="16" width="16" height="7" rx="3" fill="${dk(c)}" ${S}/>
    <path d="M40 40 L42 80 M50 40 L50 80 M60 40 L58 80" stroke="${lt(c)}" stroke-width="3" stroke-linecap="round"/>`,
  fountain: (c) => `
    <path d="M50 30 Q34 10 22 36 M50 30 Q66 10 78 36" fill="none" stroke="#6FD3F0" stroke-width="4" stroke-linecap="round"/>
    <rect x="44" y="30" width="12" height="36" rx="3" fill="${c}" ${S}/>
    <ellipse cx="50" cy="30" rx="14" ry="5" fill="${c}" ${S}/>
    <path d="M10 66 L90 66 L84 90 L16 90 Z" fill="${c}" ${S}/>
    <ellipse cx="50" cy="66" rx="40" ry="8" fill="#9EDFF2" ${S}/>`,
  dog: (c) => `
    <path d="M78 58 Q92 50 88 40" fill="none" stroke="${OUT}" stroke-width="7" stroke-linecap="round"/>
    <path d="M78 58 Q92 50 88 40" fill="none" stroke="${c}" stroke-width="3.5" stroke-linecap="round"/>
    <ellipse cx="58" cy="66" rx="24" ry="16" fill="${c}" ${S}/>
    <rect x="40" y="74" width="8" height="16" rx="4" fill="${c}" ${S}/><rect x="66" y="74" width="8" height="16" rx="4" fill="${c}" ${S}/>
    <ellipse cx="22" cy="40" rx="7" ry="13" fill="${dk(c)}" ${S} transform="rotate(18 22 40)"/>
    <circle cx="34" cy="44" r="18" fill="${c}" ${S}/>
    <ellipse cx="46" cy="40" rx="7" ry="13" fill="${dk(c)}" ${S} transform="rotate(-18 46 40)"/>
    <circle cx="29" cy="42" r="2.5" fill="${OUT}"/><circle cx="40" cy="42" r="2.5" fill="${OUT}"/>
    <ellipse cx="35" cy="50" rx="4" ry="3" fill="${OUT}"/>`,

  // ---------- race track ----------
  race_car: (c) => `
    <path d="M6 64 L14 48 L40 44 L50 34 L70 34 L76 46 L94 50 L94 66 Z" fill="${c}" ${S}/>
    <path d="M52 37 L68 37 L72 46 L48 46 Z" fill="#BFE9F7" ${S}/>
    <rect x="80" y="38" width="12" height="6" rx="2" fill="${dk(c)}" ${S}/>
    <circle cx="30" cy="54" r="8" fill="#FFFFFF" ${S}/>
    <text x="30" y="58" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="700" font-size="11" fill="${OUT}">7</text>
    <circle cx="24" cy="70" r="11" fill="#1C2B3A" ${S}/><circle cx="24" cy="70" r="4" fill="#C9D6E3"/>
    <circle cx="78" cy="70" r="11" fill="#1C2B3A" ${S}/><circle cx="78" cy="70" r="4" fill="#C9D6E3"/>`,
  city_car: (c) => `
    <path d="M8 66 L8 52 Q10 44 20 44 L30 44 L40 28 L66 28 L78 44 L88 46 Q94 48 94 56 L94 66 Z" fill="${c}" ${S}/>
    <path d="M43 32 L52 32 L52 44 L35 44 Z M56 32 L64 32 L73 44 L56 44 Z" fill="#BFE9F7" ${S}/>
    <circle cx="26" cy="68" r="10" fill="#1C2B3A" ${S}/><circle cx="26" cy="68" r="3.5" fill="#C9D6E3"/>
    <circle cx="76" cy="68" r="10" fill="#1C2B3A" ${S}/><circle cx="76" cy="68" r="3.5" fill="#C9D6E3"/>
    <rect x="88" y="50" width="6" height="5" rx="2" fill="#FFE68A"/>`,
  truck: (c) => `
    <rect x="6" y="26" width="56" height="42" rx="4" fill="${c}" ${S}/>
    <path d="M62 38 L82 38 L94 52 L94 68 L62 68 Z" fill="${dk(c)}" ${S}/>
    <path d="M68 42 L80 42 L88 52 L68 52 Z" fill="#BFE9F7" ${S}/>
    <circle cx="24" cy="72" r="10" fill="#1C2B3A" ${S}/><circle cx="24" cy="72" r="3.5" fill="#C9D6E3"/>
    <circle cx="78" cy="72" r="10" fill="#1C2B3A" ${S}/><circle cx="78" cy="72" r="3.5" fill="#C9D6E3"/>`,
  motorcycle: (c) => `
    <circle cx="22" cy="68" r="15" fill="#1C2B3A" ${S}/><circle cx="22" cy="68" r="5" fill="#C9D6E3"/>
    <circle cx="78" cy="68" r="15" fill="#1C2B3A" ${S}/><circle cx="78" cy="68" r="5" fill="#C9D6E3"/>
    <path d="M22 68 L40 48 L66 48 L78 68" fill="none" stroke="${OUT}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M36 44 Q50 34 66 42 L62 56 L40 56 Z" fill="${c}" ${S}/>
    <path d="M30 42 L46 40" stroke="${OUT}" stroke-width="5" stroke-linecap="round"/>
    <path d="M66 42 L70 28 L78 28" fill="none" stroke="${OUT}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>`,
  flag: (c) => `
    <path d="M20 94 L20 8" stroke="${OUT}" stroke-width="5" stroke-linecap="round"/>
    <rect x="22" y="10" width="64" height="44" fill="#FFFFFF" ${S}/>
    <g fill="${c}">
      <rect x="22" y="10" width="16" height="11"/><rect x="54" y="10" width="16" height="11"/>
      <rect x="38" y="21" width="16" height="11"/><rect x="70" y="21" width="16" height="11"/>
      <rect x="22" y="32" width="16" height="11"/><rect x="54" y="32" width="16" height="11"/>
      <rect x="38" y="43" width="16" height="11"/><rect x="70" y="43" width="16" height="11"/>
    </g>
    <rect x="22" y="10" width="64" height="44" fill="none" ${S}/>`,
  cone: (c) => `
    <path d="M40 14 L60 14 L76 82 L24 82 Z" fill="${c}" ${S}/>
    <path d="M35 36 L65 36 L69 52 L31 52 Z" fill="#FFFFFF" ${S}/>
    <rect x="14" y="80" width="72" height="10" rx="3" fill="${dk(c)}" ${S}/>`,
  tire: (c) => `
    <circle cx="50" cy="54" r="36" fill="#1C2B3A" ${S}/>
    <circle cx="50" cy="54" r="18" fill="${c}" ${S}/>
    <circle cx="50" cy="54" r="6" fill="${OUT}"/>
    <path d="M50 20 L50 26 M84 54 L78 54 M50 88 L50 82 M16 54 L22 54" stroke="#4A5C6E" stroke-width="4"/>`,
  helmet: (c) => `
    <path d="M14 66 Q12 20 52 18 Q88 18 88 58 L88 70 L20 70 Z" fill="${c}" ${S}/>
    <path d="M46 40 L88 40 L88 58 L52 58 Q44 50 46 40 Z" fill="#1C2B3A" ${S}/>
    <path d="M56 44 L80 44" stroke="#4FB3F0" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M20 30 Q34 22 44 22" fill="none" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round"/>`,
  trophy: (c) => `
    <path d="M30 14 L70 14 L68 44 Q66 60 50 62 Q34 60 32 44 Z" fill="${c}" ${S}/>
    <path d="M30 20 Q14 20 18 34 Q22 44 32 44 M70 20 Q86 20 82 34 Q78 44 68 44" fill="none" ${S}/>
    <rect x="44" y="62" width="12" height="14" fill="${dk(c)}" ${S}/>
    <rect x="30" y="76" width="40" height="12" rx="3" fill="#1C2B3A" ${S}/>
    <path d="M42 24 L42 46" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" opacity=".6"/>`,
  traffic_light: (c) => `
    <rect x="46" y="72" width="8" height="22" fill="#4A5C6E" ${S}/>
    <rect x="30" y="6" width="40" height="70" rx="10" fill="${c}" ${S}/>
    <circle cx="50" cy="22" r="8" fill="#FF6B5E" ${S}/><circle cx="50" cy="41" r="8" fill="#FFD54F" ${S}/>
    <circle cx="50" cy="60" r="8" fill="#3FD18A" ${S}/>`,
  rocket: (c) => `
    <path d="M50 6 Q72 26 70 64 L30 64 Q28 26 50 6 Z" fill="#F4F8FB" ${S}/>
    <circle cx="50" cy="36" r="9" fill="#BFE9F7" ${S}/>
    <path d="M30 50 L14 72 L30 68 Z M70 50 L86 72 L70 68 Z" fill="${c}" ${S}/>
    <path d="M38 64 L62 64 L58 72 L42 72 Z" fill="${c}" ${S}/>
    <path d="M42 74 Q50 98 58 74 Z" fill="#FFB347" ${S}/>`,
};

// ---------- people (full body, 100x100 box) ----------
export const SKINS = ['#FFDBB5', '#F1C27D', '#D7A16E', '#B07A4F', '#8A5A3B', '#5E3B25'];

function person(c, skin, extra = {}) {
  const hair = extra.hair || '';
  const hat = extra.hat || '';
  const body = extra.body || `<path d="M36 44 Q50 38 64 44 L66 72 L34 72 Z" fill="${c}" ${S}/>`;
  const legs = extra.legs || `<path d="M40 72 L40 92 M60 72 L60 92" stroke="${OUT}" stroke-width="7" stroke-linecap="round"/>
    <path d="M40 72 L40 92 M60 72 L60 92" stroke="#2D4A6B" stroke-width="4" stroke-linecap="round"/>`;
  return `${legs}
    <path d="M36 48 L26 66 M64 48 L74 66" stroke="${OUT}" stroke-width="7" stroke-linecap="round"/>
    <path d="M36 48 L26 66 M64 48 L74 66" stroke="${skin}" stroke-width="4" stroke-linecap="round"/>
    ${body}
    ${extra.back || ''}
    <circle cx="50" cy="26" r="15" fill="${skin}" ${S}/>
    ${hair}
    <circle cx="45" cy="26" r="2" fill="${OUT}"/><circle cx="55" cy="26" r="2" fill="${OUT}"/>
    <path d="M45 32 Q50 36 55 32" fill="none" stroke="${OUT}" stroke-width="2" stroke-linecap="round"/>
    ${hat}${extra.front || ''}`;
}

export const PEOPLE_ART = {
  girl: (c, skin) => person(c, skin, {
    back: `<path d="M35 26 Q33 46 40 50 L60 50 Q67 46 65 26" fill="#5E3B25" ${S}/>`,
    hair: `<path d="M35 26 Q36 10 50 10 Q64 10 65 26 Q56 18 42 20 Q38 22 35 26 Z" fill="#5E3B25" ${S}/>`,
  }),
  boy: (c, skin) => person(c, skin, {
    hair: `<path d="M35 24 Q36 9 52 10 Q66 12 65 24 Q60 16 50 18 Q40 16 35 24 Z" fill="#2B1B10" ${S}/>`,
  }),
  baby: (c, skin) => `
    <ellipse cx="50" cy="74" rx="20" ry="16" fill="${c}" ${S}/>
    <path d="M34 70 L24 62 M66 70 L76 62" stroke="${OUT}" stroke-width="7" stroke-linecap="round"/>
    <path d="M34 70 L24 62 M66 70 L76 62" stroke="${skin}" stroke-width="4" stroke-linecap="round"/>
    <circle cx="50" cy="42" r="20" fill="${skin}" ${S}/>
    <path d="M48 22 Q52 16 56 22" fill="none" stroke="#5E3B25" stroke-width="3" stroke-linecap="round"/>
    <circle cx="43" cy="42" r="2.2" fill="${OUT}"/><circle cx="57" cy="42" r="2.2" fill="${OUT}"/>
    <circle cx="50" cy="50" r="3" fill="${OUT}" opacity=".7"/>`,
  doctor: (c, skin) => person(c, skin, {
    hair: `<path d="M35 24 Q38 10 50 10 Q62 10 65 24 Q56 16 44 18 Z" fill="#2B1B10" ${S}/>`,
    body: `<path d="M34 44 Q50 38 66 44 L70 80 L30 80 Z" fill="${c}" ${S}/><path d="M50 42 L50 80" ${S}/>`,
    front: `<path d="M42 46 Q40 60 50 62 Q60 60 58 46" fill="none" stroke="#4A5C6E" stroke-width="2"/><circle cx="50" cy="62" r="3" fill="#4A5C6E"/>`,
  }),
  chef: (c, skin) => person(c, skin, {
    body: `<path d="M36 44 Q50 38 64 44 L66 72 L34 72 Z" fill="${c}" ${S}/><circle cx="46" cy="52" r="1.8" fill="${OUT}"/><circle cx="46" cy="60" r="1.8" fill="${OUT}"/>`,
    hat: `<path d="M38 16 Q32 4 42 4 Q46 -2 54 3 Q64 0 64 10 Q68 14 62 16 Z" fill="#FFFFFF" ${S}/><rect x="38" y="13" width="24" height="6" fill="#FFFFFF" ${S}/>`,
  }),
  police_officer: (c, skin) => person(c, skin, {
    hat: `<path d="M34 18 Q50 6 66 18 L66 21 L34 21 Z" fill="${shade(c, -25)}" ${S}/><rect x="32" y="19" width="36" height="4" rx="2" fill="${OUT}"/><circle cx="50" cy="14" r="2.5" fill="#FFD54F"/>`,
    front: `<path d="M56 52 L60 50 L62 55 L58 58 Z" fill="#FFD54F" stroke="${OUT}" stroke-width="1.5"/>`,
  }),
  firefighter: (c, skin) => person(c, skin, {
    hat: `<path d="M32 22 Q32 6 50 6 Q68 6 68 22 Z" fill="${c}" ${S}/><path d="M28 22 L72 22" stroke="${OUT}" stroke-width="4" stroke-linecap="round"/><rect x="46" y="8" width="8" height="10" rx="2" fill="#FFD54F" stroke="${OUT}" stroke-width="1.5"/>`,
    front: `<path d="M36 62 L64 62" stroke="#FFE68A" stroke-width="3"/>`,
  }),
  driver: (c, skin) => person(c, skin, {
    hat: `<path d="M33 28 Q32 8 50 8 Q68 8 67 28 Z" fill="${c}" ${S}/><rect x="40" y="20" width="22" height="8" rx="3" fill="#1C2B3A"/>`,
    body: `<path d="M36 44 Q50 38 64 44 L66 72 L34 72 Z" fill="${c}" ${S}/><path d="M50 44 L50 72" stroke="#FFFFFF" stroke-width="3"/>`,
  }),
  fan: (c, skin) => person(c, skin, {
    hair: `<circle cx="38" cy="16" r="6" fill="#B5651D" ${S}/><circle cx="50" cy="11" r="6" fill="#B5651D" ${S}/><circle cx="62" cy="16" r="6" fill="#B5651D" ${S}/>`,
    front: `<path d="M74 66 L88 40" stroke="${OUT}" stroke-width="2.5"/><path d="M88 40 L76 36 L82 50 Z" fill="${c}" ${S}/>`,
  }),
};

// ---------- dress-up character (200x400 box) ----------
export const DRESS_SLOTS = ['hairBack', 'bottom', 'feet', 'top', 'dress', 'outer', 'neck', 'side', 'hair', 'eyes', 'head'];

export const DRESS_ART = {
  hair_short: { slot: 'hair', box: '50 20 100 70', d: (c) => `<path d="M58 78 Q56 30 100 28 Q144 30 142 78 Q132 50 100 50 Q70 50 58 78 Z" fill="${c}" ${S}/>` },
  hair_long: { slot: 'hair', box: '40 20 120 200', back: (c) => `<path d="M56 70 Q50 170 70 200 L130 200 Q150 170 144 70 Z" fill="${c}" ${S}/>`,
    d: (c) => `<path d="M56 84 Q54 28 100 28 Q146 28 144 84 Q134 52 108 52 Q100 60 92 52 Q66 52 56 84 Z" fill="${c}" ${S}/>` },
  hair_curly: { slot: 'hair', box: '40 14 120 90', d: (c) => `
    <circle cx="66" cy="54" r="16" fill="${c}" ${S}/><circle cx="82" cy="38" r="16" fill="${c}" ${S}/>
    <circle cx="100" cy="32" r="16" fill="${c}" ${S}/><circle cx="118" cy="38" r="16" fill="${c}" ${S}/>
    <circle cx="134" cy="54" r="16" fill="${c}" ${S}/><circle cx="60" cy="76" r="12" fill="${c}" ${S}/><circle cx="140" cy="76" r="12" fill="${c}" ${S}/>` },
  hat: { slot: 'head', box: '30 0 140 70', d: (c) => `
    <ellipse cx="100" cy="48" rx="66" ry="12" fill="${c}" ${S}/>
    <path d="M68 48 Q66 10 100 10 Q134 10 132 48 Z" fill="${c}" ${S}/>
    <path d="M68 40 L132 40" stroke="${shade(c, -25)}" stroke-width="7"/>` },
  cap: { slot: 'head', box: '40 10 150 60', d: (c) => `
    <path d="M60 52 Q60 16 100 16 Q140 16 140 52 Z" fill="${c}" ${S}/>
    <path d="M130 50 Q168 46 176 56 L132 58 Z" fill="${shade(c, -20)}" ${S}/>
    <circle cx="100" cy="18" r="4" fill="${shade(c, -20)}" ${S}/>` },
  crown: { slot: 'head', box: '50 0 100 60', d: (c) => `
    <path d="M64 52 L60 14 L80 32 L100 8 L120 32 L140 14 L136 52 Z" fill="${c}" ${S}/>
    <circle cx="100" cy="36" r="5" fill="#3DDBC4" ${S}/><circle cx="78" cy="42" r="4" fill="#FF6B5E" ${S}/><circle cx="122" cy="42" r="4" fill="#FF6B5E" ${S}/>` },
  glasses: { slot: 'eyes', box: '60 60 80 40', d: (c) => `
    <circle cx="84" cy="80" r="13" fill="#FFFFFF" fill-opacity=".35" stroke="${c}" stroke-width="5"/>
    <circle cx="116" cy="80" r="13" fill="#FFFFFF" fill-opacity=".35" stroke="${c}" stroke-width="5"/>
    <path d="M97 80 L103 80" stroke="${c}" stroke-width="4"/>
    <circle cx="84" cy="80" r="15.5" fill="none" stroke="${OUT}" stroke-width="1.2"/><circle cx="116" cy="80" r="15.5" fill="none" stroke="${OUT}" stroke-width="1.2"/>` },
  shirt: { slot: 'top', box: '30 120 140 120', d: (c) => `
    <path d="M62 132 Q100 120 138 132 L158 176 L140 184 L134 166 L134 232 L66 232 L66 166 L60 184 L42 176 Z" fill="${c}" ${S}/>
    <path d="M86 128 Q100 142 114 128" fill="none" ${S}/>` },
  jacket: { slot: 'outer', box: '30 116 140 136', d: (c) => `
    <path d="M60 130 Q72 122 88 124 L96 240 L62 240 L62 172 L50 226 L34 222 Z" fill="${c}" ${S}/>
    <path d="M140 130 Q128 122 112 124 L104 240 L138 240 L138 172 L150 226 L166 222 Z" fill="${c}" ${S}/>
    <circle cx="90" cy="168" r="3" fill="${OUT}"/><circle cx="90" cy="196" r="3" fill="${OUT}"/>` },
  dress: { slot: 'dress', box: '24 116 152 200', d: (c) => `
    <path d="M68 128 Q100 118 132 128 L136 200 L172 300 Q100 318 28 300 L64 200 Z" fill="${c}" ${S}/>
    <path d="M64 200 Q100 210 136 200" fill="none" stroke="${shade(c, -22)}" stroke-width="5"/>
    <path d="M86 124 Q100 138 114 124" fill="none" ${S}/>` },
  skirt: { slot: 'bottom', box: '40 214 120 90', d: (c) => `
    <path d="M66 222 L134 222 L156 296 Q100 308 44 296 Z" fill="${c}" ${S}/>
    <path d="M80 230 L72 292 M100 230 L100 298 M120 230 L128 292" stroke="${shade(c, -18)}" stroke-width="3"/>` },
  pants: { slot: 'bottom', box: '56 214 88 150', d: (c) => `
    <path d="M66 222 L134 222 L136 356 L106 356 L100 262 L94 356 L64 356 Z" fill="${c}" ${S}/>
    <path d="M100 226 L100 262" ${S}/>` },
  shoes: { slot: 'feet', box: '50 340 100 40', d: (c) => `
    <path d="M60 368 Q60 352 76 352 L92 352 L94 372 L58 372 Z" fill="${c}" ${S}/>
    <path d="M140 368 Q140 352 124 352 L108 352 L106 372 L142 372 Z" fill="${c}" ${S}/>
    <path d="M58 372 L94 372 M106 372 L142 372" stroke="#FFFFFF" stroke-width="3"/>` },
  boots: { slot: 'feet', box: '50 300 100 80', d: (c) => `
    <path d="M70 310 L94 310 L94 372 L58 372 Q58 356 70 352 Z" fill="${c}" ${S}/>
    <path d="M130 310 L106 310 L106 372 L142 372 Q142 356 130 352 Z" fill="${c}" ${S}/>
    <path d="M70 322 L94 322 M106 322 L130 322" stroke="${shade(c, -22)}" stroke-width="4"/>` },
  scarf: { slot: 'neck', box: '60 110 80 110', d: (c) => `
    <path d="M70 118 Q100 136 130 118 L132 132 Q100 150 68 132 Z" fill="${c}" ${S}/>
    <path d="M110 136 L122 210 L104 212 L98 140 Z" fill="${c}" ${S}/>
    <path d="M106 204 L104 214 M114 204 L114 214 M120 202 L122 212" stroke="${OUT}" stroke-width="2"/>` },
  bag: { slot: 'side', box: '50 120 130 150', d: (c) => `
    <path d="M70 130 L150 220" stroke="${OUT}" stroke-width="7" stroke-linecap="round"/>
    <path d="M70 130 L150 220" stroke="${shade(c, -20)}" stroke-width="4" stroke-linecap="round"/>
    <rect x="132" y="210" width="44" height="40" rx="8" fill="${c}" ${S}/>
    <path d="M132 224 L176 224" ${S}/><circle cx="154" cy="232" r="3.5" fill="#FFD54F" ${S}/>` },
};

export const EXPRESSIONS = {
  happy: `<path d="M86 104 Q100 118 114 104" fill="none" stroke="${OUT}" stroke-width="3.5" stroke-linecap="round"/>`,
  sad: `<path d="M86 112 Q100 100 114 112" fill="none" stroke="${OUT}" stroke-width="3.5" stroke-linecap="round"/>`,
  surprised: `<ellipse cx="100" cy="108" rx="7" ry="9" fill="${OUT}"/>`,
  angry: `<path d="M88 108 L112 108" stroke="${OUT}" stroke-width="3.5" stroke-linecap="round"/><path d="M76 66 L92 72 M124 66 L108 72" stroke="${OUT}" stroke-width="3.5" stroke-linecap="round"/>`,
  sleepy: `<path d="M92 108 Q100 112 108 108" fill="none" stroke="${OUT}" stroke-width="3" stroke-linecap="round"/>`,
};

export function characterBase(skin, expression = 'happy') {
  const eyes = expression === 'sleepy'
    ? `<path d="M78 82 Q84 86 90 82 M110 82 Q116 86 122 82" fill="none" stroke="${OUT}" stroke-width="3" stroke-linecap="round"/>`
    : `<circle cx="84" cy="80" r="5" fill="${OUT}"/><circle cx="116" cy="80" r="5" fill="${OUT}"/><circle cx="86" cy="78" r="1.6" fill="#FFFFFF"/><circle cx="118" cy="78" r="1.6" fill="#FFFFFF"/>`;
  return {
    body: `
      <path d="M78 230 L76 360 M122 230 L124 360" stroke="${OUT}" stroke-width="24" stroke-linecap="round"/>
      <path d="M78 230 L76 360 M122 230 L124 360" stroke="${skin}" stroke-width="18" stroke-linecap="round"/>
      <path d="M68 140 L44 220 M132 140 L156 220" stroke="${OUT}" stroke-width="20" stroke-linecap="round"/>
      <path d="M68 140 L44 220 M132 140 L156 220" stroke="${skin}" stroke-width="14" stroke-linecap="round"/>
      <rect x="64" y="128" width="72" height="108" rx="26" fill="${skin}" ${S}/>
      <rect x="90" y="108" width="20" height="26" fill="${skin}" ${S}/>`,
    head: `
      <circle cx="100" cy="80" r="44" fill="${skin}" ${S}/>
      <circle cx="56" cy="86" r="8" fill="${skin}" ${S}/><circle cx="144" cy="86" r="8" fill="${skin}" ${S}/>
      ${eyes}
      <circle cx="74" cy="98" r="6" fill="#FF9A8B" opacity=".45"/><circle cx="126" cy="98" r="6" fill="#FF9A8B" opacity=".45"/>
      ${EXPRESSIONS[expression] || EXPRESSIONS.happy}`,
  };
}

export function svg(inner, box = '0 0 100 100', extra = '') {
  return `<svg viewBox="${box}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" ${extra}>${inner}</svg>`;
}
