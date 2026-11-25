// Wordcraft art for the new worlds, and extra items for the first four places.
// Same style as art.js: 100x100 box, ground line around y 94, soft shading.
import { F, FH, FR, E, shade, sh, OUT } from './art.js';

const DARK = '#2B3440';
const METAL = '#B7C3CE';
const WHITE = '#F4F2EC';
const WOOD = '#B98653';
const dk = (c, a = -16) => shade(c, a);
const lt = (c, a = 18) => shade(c, a);

export const WORLD_ART = {
  // ---------------- extra bedroom ----------------
  tv: (c) => `${sh(50, 94, 30)}
    <rect x="30" y="80" width="40" height="14" rx="2" fill="${F(WOOD)}"/>
    <rect x="46" y="72" width="8" height="9" fill="${DARK}"/>
    <rect x="8" y="24" width="84" height="50" rx="3" fill="${F(c, 8, -10)}"/>
    <rect x="12" y="28" width="76" height="42" fill="${F('#22303D', 14, -4)}"/>
    <path d="M18 64 L40 40 L52 52 L64 42 L82 64 Z" fill="#3DB8C9" opacity=".5"/>`,
  computer: (c) => `${sh(50, 94, 34)}
    <rect x="14" y="14" width="72" height="50" rx="4" fill="${F(c, 8, -10)}"/>
    <rect x="18" y="18" width="64" height="40" fill="#1C2430"/>
    <rect x="22" y="22" width="24" height="16" rx="2" fill="#3DDBC4"/><rect x="50" y="22" width="28" height="4" rx="1" fill="#4F6378"/><rect x="50" y="30" width="20" height="4" rx="1" fill="#4F6378"/>
    <path d="M44 64 L40 82 L60 82 L56 64 Z" fill="${dk(c)}"/>
    <rect x="16" y="86" width="56" height="8" rx="2" fill="${F(lt(c))}"/><ellipse cx="82" cy="90" rx="6" ry="4" fill="${F(lt(c))}"/>`,
  phone: (c) => `${sh(50, 94, 14)}
    <rect x="34" y="16" width="32" height="76" rx="7" fill="${F(c)}"/>
    <rect x="37" y="22" width="26" height="62" rx="3" fill="${F('#22303D', 18, 0)}"/>
    <rect x="40" y="28" width="9" height="9" rx="2" fill="#3DDBC4"/><rect x="51" y="28" width="9" height="9" rx="2" fill="#F2C14E"/><rect x="40" y="40" width="9" height="9" rx="2" fill="#E25C4F"/><rect x="51" y="40" width="9" height="9" rx="2" fill="#5A7BD8"/>`,
  toy_box: (c) => `${sh(50, 94, 36)}
    <rect x="14" y="48" width="72" height="46" rx="4" fill="${F(c)}"/>
    <path d="M14 48 Q50 34 86 48" fill="${dk(c)}"/>
    <circle cx="30" cy="44" r="8" fill="#E25C4F"/><rect x="44" y="34" width="12" height="16" rx="2" fill="#F2C14E" transform="rotate(-12 50 42)"/>
    <path d="M66 46 L74 30 L80 46 Z" fill="#3DB8C9"/>
    <rect x="40" y="62" width="20" height="8" rx="4" fill="${lt(c, 22)}"/>`,
  beanbag: (c) => `${sh(50, 94, 40)}
    <path d="M10 88 Q6 60 30 46 Q50 34 70 46 Q94 60 90 88 Q50 98 10 88 Z" fill="${FR(c)}"/>
    <path d="M30 60 Q46 68 64 58" stroke="${dk(c, -10)}" stroke-width="2" fill="none"/>`,
  basket: (c) => `${sh(50, 94, 28)}
    <path d="M22 50 L78 50 L70 92 L30 92 Z" fill="${FH(c)}"/>
    ${[56, 64, 72, 80, 88].map((y) => `<path d="M${24 + (y - 50) * 0.18} ${y} L${76 - (y - 50) * 0.18} ${y}" stroke="${dk(c, -14)}" stroke-width="1.4"/>`).join('')}
    <path d="M30 50 Q50 20 70 50" fill="none" stroke="${dk(c, -10)}" stroke-width="3"/>`,
  candle: (c) => `${sh(50, 94, 12)}
    <rect x="42" y="50" width="16" height="44" rx="2" fill="${FH(c)}"/>
    <path d="M50 50 L50 44" stroke="${DARK}" stroke-width="1.4"/>
    <path d="M50 26 Q42 36 46 42 Q50 46 54 42 Q58 36 50 26 Z" fill="#F7B733"/><path d="M50 34 Q47 39 49 42 Q50 43 51 42 Q53 39 50 34 Z" fill="#FFF1B0"/>`,
  // ---------------- extra park ----------------
  picnic_table: (c) => `${sh(50, 94, 46)}
    <rect x="6" y="46" width="88" height="7" rx="2" fill="${F(c)}"/>
    <rect x="2" y="66" width="96" height="6" rx="2" fill="${F(dk(c))}"/>
    <path d="M20 53 L12 94 M80 53 L88 94 M24 53 L32 94 M76 53 L68 94" stroke="${dk(c, -22)}" stroke-width="3.4" stroke-linecap="round"/>`,
  sandbox: (c) => `${sh(50, 94, 46)}
    <path d="M6 74 L94 74 L94 92 L6 92 Z" fill="${F(c)}"/>
    <path d="M10 76 Q30 66 50 72 Q70 66 90 76 L90 80 L10 80 Z" fill="#E8D29A"/>
    <path d="M30 70 L36 56 L42 70 Z" fill="#E25C4F"/><rect x="60" y="62" width="12" height="10" rx="2" fill="#3DB8C9"/>`,
  balloon: (c) => `
    <path d="M50 64 Q44 80 52 96" stroke="${DARK}" stroke-width="1.2" fill="none"/>
    <ellipse cx="50" cy="38" rx="20" ry="25" fill="${FR(c)}"/>
    <path d="M47 63 L53 63 L50 67 Z" fill="${dk(c)}"/><ellipse cx="43" cy="28" rx="4" ry="7" fill="#FFFFFF" opacity=".45"/>`,
  ice_cream_cart: (c) => `${sh(50, 94, 42)}
    <rect x="14" y="46" width="62" height="34" rx="4" fill="${F(c)}"/>
    <path d="M10 46 L80 46 L74 30 L16 30 Z" fill="${F('#FFFFFF', 0, -10)}"/>
    <path d="M28 30 L28 46 M44 30 L44 46 M60 30 L60 46" stroke="${c}" stroke-width="4"/>
    <circle cx="26" cy="86" r="8" fill="#1C2430"/><circle cx="64" cy="86" r="8" fill="#1C2430"/>
    <path d="M76 52 L92 44" stroke="${DARK}" stroke-width="3" stroke-linecap="round"/>
    <path d="M40 62 L44 74 L48 62 Z" fill="#D9A65B"/><circle cx="44" cy="60" r="4" fill="#F7B9D0"/>`,
  // ---------------- extra track ----------------
  grandstand: (c) => `${sh(50, 94, 48)}
    <path d="M4 94 L4 54 L96 30 L96 94 Z" fill="${F(c, 6, -12)}"/>
    ${[0, 1, 2, 3].map((i) => `<path d="M4 ${62 + i * 9} L96 ${38 + i * 9}" stroke="${dk(c, -18)}" stroke-width="2"/>`).join('')}
    ${[14, 26, 40, 54, 68, 82].map((x, i) => `<circle cx="${x}" cy="${60 - x * 0.24 + (i % 2) * 8}" r="3.4" fill="${['#E25C4F', '#F2C14E', '#3DB8C9', '#5A7BD8', '#8E5CD9', '#56B870'][i]}"/>`).join('')}
    <path d="M2 54 L98 28 L98 22 L2 48 Z" fill="${DARK}"/>`,
  podium: (c) => `${sh(50, 94, 46)}
    <rect x="36" y="44" width="28" height="50" fill="${F('#E6B43C')}"/><rect x="8" y="58" width="28" height="36" fill="${F(METAL)}"/><rect x="64" y="68" width="28" height="26" fill="${F('#C98A4B')}"/>
    <text x="50" y="72" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="700" font-size="16" fill="#FFFFFF">1</text>
    <text x="22" y="80" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="700" font-size="14" fill="#FFFFFF">2</text>
    <text x="78" y="86" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="700" font-size="12" fill="#FFFFFF">3</text>`,
  fuel_pump: (c) => `${sh(50, 94, 20)}
    <rect x="30" y="20" width="36" height="74" rx="4" fill="${F(c)}"/>
    <rect x="35" y="27" width="26" height="18" rx="2" fill="#1C2430"/><rect x="38" y="31" width="20" height="4" fill="#3DDBC4"/>
    <path d="M66 52 Q78 52 78 64 L78 80 Q78 84 74 84" stroke="${DARK}" stroke-width="3" fill="none"/>
    <rect x="70" y="40" width="8" height="14" rx="2" fill="${DARK}"/>`,
  garage: (c) => `${sh(50, 94, 46)}
    <path d="M4 40 L50 12 L96 40 L96 94 L4 94 Z" fill="${F(c, 8, -10)}"/>
    <rect x="18" y="46" width="64" height="48" fill="${F('#8E9AA6', 6, -10)}"/>
    ${[54, 62, 70, 78, 86].map((y) => `<path d="M18 ${y} L82 ${y}" stroke="#6E7A86" stroke-width="1.4"/>`).join('')}`,
  // ---------------- kitchen ----------------
  fridge: (c) => `${sh(50, 94, 24)}
    <rect x="26" y="6" width="48" height="88" rx="5" fill="${FH(c, 10, -10)}"/>
    <path d="M26 38 L74 38" stroke="${dk(c, -14)}" stroke-width="2"/>
    <rect x="64" y="16" width="3.4" height="14" rx="1.7" fill="${METAL}"/><rect x="64" y="46" width="3.4" height="22" rx="1.7" fill="${METAL}"/>
    <circle cx="36" cy="20" r="3" fill="#E25C4F"/><rect x="40" y="50" width="10" height="12" rx="1" fill="#F2C14E" transform="rotate(-8 45 56)"/>`,
  stove: (c) => `${sh(50, 94, 30)}
    <rect x="18" y="36" width="64" height="58" rx="3" fill="${F(c, 8, -10)}"/>
    <rect x="18" y="30" width="64" height="8" rx="2" fill="${F(DARK, 10, 0)}"/>
    <ellipse cx="34" cy="31" rx="8" ry="2" fill="#E25C4F" opacity=".7"/><ellipse cx="66" cy="31" rx="8" ry="2" fill="#4F6378"/>
    <rect x="26" y="50" width="48" height="34" rx="3" fill="#22303D"/><rect x="30" y="54" width="40" height="5" rx="2" fill="#4F6378"/>
    ${[30, 42, 58, 70].map((x) => `<circle cx="${x}" cy="44" r="2.4" fill="${DARK}"/>`).join('')}`,
  sink: (c) => `${sh(50, 94, 36)}
    <rect x="12" y="44" width="76" height="50" rx="3" fill="${F(c, 6, -10)}"/>
    <path d="M12 56 L88 56 M50 56 L50 94" stroke="${dk(c, -12)}" stroke-width="1.6"/>
    <rect x="10" y="38" width="80" height="8" rx="2" fill="${F(WHITE)}"/>
    <path d="M50 38 L50 22 Q50 16 58 16 L62 16" fill="none" stroke="${METAL}" stroke-width="4" stroke-linecap="round"/>
    <rect x="42" y="61" width="4" height="10" rx="2" fill="${METAL}"/><rect x="54" y="61" width="4" height="10" rx="2" fill="${METAL}"/>`,
  cabinet: (c) => `
    <rect x="8" y="20" width="84" height="44" rx="3" fill="${F(c, 8, -10)}"/>
    <rect x="12" y="24" width="36" height="36" rx="2" fill="none" stroke="${dk(c, -10)}" stroke-width="1.6"/><rect x="52" y="24" width="36" height="36" rx="2" fill="none" stroke="${dk(c, -10)}" stroke-width="1.6"/>
    <rect x="40" y="48" width="3" height="8" rx="1.5" fill="${METAL}"/><rect x="57" y="48" width="3" height="8" rx="1.5" fill="${METAL}"/>`,
  microwave: (c) => `${sh(50, 92, 36)}
    <rect x="12" y="44" width="76" height="46" rx="4" fill="${F(c, 8, -10)}"/>
    <rect x="17" y="49" width="48" height="36" rx="2" fill="#22303D"/>
    <rect x="70" y="50" width="13" height="8" rx="1" fill="#3DDBC4"/>
    ${[64, 72, 80].map((y) => `<circle cx="76.5" cy="${y}" r="2.2" fill="${dk(c, -20)}"/>`).join('')}`,
  kettle: (c) => `${sh(50, 92, 24)}
    <path d="M28 90 Q24 56 34 46 L66 46 Q76 56 72 90 Z" fill="${FH(c)}"/>
    <path d="M34 46 Q36 34 50 34 Q64 34 66 46 Z" fill="${dk(c)}"/><rect x="46" y="28" width="8" height="6" rx="2" fill="${DARK}"/>
    <path d="M72 54 Q86 56 82 76 Q80 84 72 82" fill="none" stroke="${DARK}" stroke-width="4"/>
    <path d="M28 58 L16 50 L18 58 Z" fill="${dk(c)}"/>`,
  toaster: (c) => `${sh(50, 92, 30)}
    <rect x="18" y="50" width="64" height="40" rx="10" fill="${FH(c)}"/>
    <rect x="30" y="40" width="16" height="14" rx="2" fill="#D9A65B"/><rect x="54" y="40" width="16" height="14" rx="2" fill="#D9A65B"/>
    <rect x="30" y="52" width="16" height="3" fill="${dk(c, -20)}"/><rect x="54" y="52" width="16" height="3" fill="${dk(c, -20)}"/>
    <rect x="82" y="62" width="6" height="12" rx="2" fill="${DARK}"/>`,
  pot: (c) => `${sh(50, 92, 32)}
    <path d="M18 50 L82 50 L78 88 Q50 94 22 88 Z" fill="${FH(c)}"/>
    <rect x="14" y="44" width="72" height="8" rx="3" fill="${F(dk(c))}"/>
    <rect x="44" y="36" width="12" height="8" rx="3" fill="${DARK}"/>
    <path d="M18 56 L8 56 M82 56 L92 56" stroke="${DARK}" stroke-width="5" stroke-linecap="round"/>`,
  pan: (c) => `${sh(42, 88, 30)}
    <ellipse cx="42" cy="76" rx="32" ry="10" fill="${F(c, 0, -16)}"/>
    <ellipse cx="42" cy="73" rx="27" ry="7" fill="${F('#2B3440', 10, 0)}"/>
    <path d="M72 72 L96 64" stroke="${DARK}" stroke-width="6" stroke-linecap="round"/>
    <ellipse cx="38" cy="73" rx="8" ry="3.5" fill="#FFFFFF"/><ellipse cx="38" cy="73" rx="3.4" ry="2" fill="#F2B632"/>`,
  plate: (c) => `${sh(50, 86, 34)}
    <ellipse cx="50" cy="74" rx="36" ry="12" fill="${F(c, 6, -10)}"/>
    <ellipse cx="50" cy="72" rx="24" ry="7" fill="${lt(c, 10)}"/>`,
  cup: (c) => `${sh(46, 92, 18)}
    <path d="M28 50 L64 50 L60 90 Q46 94 32 90 Z" fill="${FH(c)}"/>
    <path d="M62 58 Q78 58 74 72 Q72 80 60 80" fill="none" stroke="${c}" stroke-width="5"/>
    <ellipse cx="46" cy="50" rx="18" ry="4" fill="#6B4528"/>
    <path d="M40 40 Q36 32 42 26 M50 40 Q46 30 52 22" stroke="#C9D0D6" stroke-width="2" fill="none" stroke-linecap="round"/>`,
  bowl: (c) => `${sh(50, 92, 30)}
    <path d="M14 58 L86 58 Q84 88 50 90 Q16 88 14 58 Z" fill="${FH(c)}"/>
    <ellipse cx="50" cy="58" rx="36" ry="7" fill="${dk(c, -10)}"/>
    <circle cx="38" cy="54" r="7" fill="#E25C4F"/><circle cx="54" cy="52" r="8" fill="#F2C14E"/><circle cx="66" cy="56" r="6" fill="#56B870"/>`,
  apple: (c) => `${sh(50, 92, 22)}
    <path d="M50 38 Q30 26 20 46 Q12 70 30 86 Q42 94 50 88 Q58 94 70 86 Q88 70 80 46 Q70 26 50 38 Z" fill="${FR(c)}"/>
    <path d="M50 38 Q48 26 54 18" stroke="#6B4528" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M54 26 Q66 16 74 24 Q64 32 54 26 Z" fill="#56B870"/>`,
  banana: (c) => `${sh(50, 90, 34)}
    <path d="M16 54 Q24 86 62 84 Q86 82 92 64 Q78 74 58 72 Q30 70 22 50 Z" fill="${FH(c)}"/>
    <path d="M16 54 L12 48 L20 48 Z M92 64 L96 60" fill="#6B4528" stroke="#6B4528" stroke-width="2"/>`,
  bread: (c) => `${sh(50, 92, 36)}
    <path d="M14 66 Q12 44 30 40 Q50 34 70 40 Q88 44 86 66 L84 88 L16 88 Z" fill="${F(c, 14, -14)}"/>
    <path d="M30 48 L36 58 M46 44 L52 56 M62 46 L68 58" stroke="${dk(c, -14)}" stroke-width="2.4" stroke-linecap="round"/>`,
  cake: (c) => `${sh(50, 92, 36)}
    <rect x="16" y="56" width="68" height="34" rx="4" fill="${F(c)}"/>
    <path d="M16 62 Q22 70 28 62 Q34 70 40 62 Q46 70 52 62 Q58 70 64 62 Q70 70 76 62 Q80 68 84 62 L84 56 L16 56 Z" fill="#FFFFFF"/>
    <rect x="16" y="74" width="68" height="4" fill="${lt(c, 20)}"/>
    <rect x="46" y="38" width="8" height="18" rx="2" fill="#5A7BD8"/><path d="M50 26 Q45 32 48 37 Q50 39 52 37 Q55 32 50 26 Z" fill="#F7B733"/>`,
  pizza: (c) => `${sh(50, 88, 38)}
    <ellipse cx="50" cy="70" rx="42" ry="16" fill="${F('#D9A65B')}"/>
    <ellipse cx="50" cy="68" rx="36" ry="12" fill="${F(c)}"/>
    ${[[34, 66], [50, 62], [64, 68], [44, 74], [60, 74]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="4.4" ry="2.6" fill="#B5342C"/>`).join('')}
    <path d="M30 62 L36 60 M56 72 L62 70" stroke="#3F9E5E" stroke-width="2"/>`,
  burger: (c) => `${sh(50, 92, 34)}
    <path d="M16 58 Q16 32 50 32 Q84 32 84 58 Z" fill="${F('#D9A65B', 12, -8)}"/>
    <circle cx="36" cy="42" r="1.4" fill="#FFF3C4"/><circle cx="52" cy="38" r="1.4" fill="#FFF3C4"/><circle cx="64" cy="44" r="1.4" fill="#FFF3C4"/>
    <path d="M12 60 Q30 54 50 60 Q70 54 88 60 L88 64 L12 64 Z" fill="#56B870"/>
    <rect x="14" y="62" width="72" height="10" rx="5" fill="${F(c)}"/>
    <path d="M18 72 L82 72 L76 78 L68 74 L60 80 L52 74 L44 80 L36 74 L28 78 Z" fill="#F2C14E"/>
    <path d="M16 78 L84 78 Q84 90 50 90 Q16 90 16 78 Z" fill="${F('#D9A65B', 6, -12)}"/>`,
  ice_cream: (c) => `${sh(50, 94, 10)}
    <path d="M36 54 L64 54 L50 94 Z" fill="${F('#D9A65B')}"/>
    <path d="M40 60 L56 76 M60 60 L46 76" stroke="#B5844A" stroke-width="1.4"/>
    <circle cx="50" cy="44" r="16" fill="${FR(c)}"/><circle cx="50" cy="26" r="12" fill="${FR(lt(c, 10))}"/>
    <circle cx="52" cy="14" r="4" fill="#E25C4F"/>`,
  salad: (c) => `${sh(50, 92, 32)}
    <path d="M14 62 L86 62 Q84 88 50 90 Q16 88 14 62 Z" fill="${FH(c)}"/>
    <path d="M18 62 Q24 46 34 54 Q38 42 50 50 Q58 40 66 52 Q76 44 82 62 Z" fill="#56B870"/>
    <circle cx="40" cy="56" r="5" fill="#E25C4F"/><circle cx="60" cy="56" r="4" fill="#E25C4F"/><path d="M48 54 L54 58" stroke="#F2C14E" stroke-width="3" stroke-linecap="round"/>`,
  juice: (c) => `${sh(50, 94, 14)}
    <path d="M34 34 L66 34 L62 94 L38 94 Z" fill="#FFFFFF" opacity=".6" stroke="#C9D0D6"/>
    <path d="M36 50 L64 50 L61 92 L39 92 Z" fill="${F(c)}"/>
    <path d="M56 34 L64 10" stroke="#E25C4F" stroke-width="3" stroke-linecap="round"/>
    <circle cx="66" cy="36" r="8" fill="#F2C14E" stroke="#E6A92A" stroke-width="1.4"/>`,
  // ---------------- graffiti wall ----------------
  spray_can: (c) => `${sh(50, 94, 14)}
    <rect x="36" y="30" width="28" height="64" rx="6" fill="${FH(c)}"/>
    <rect x="40" y="20" width="20" height="12" rx="3" fill="${METAL}"/><rect x="46" y="14" width="8" height="7" rx="2" fill="${DARK}"/>
    <rect x="36" y="50" width="28" height="20" fill="${WHITE}" opacity=".85"/><path d="M40 60 L60 60" stroke="${c}" stroke-width="3"/>
    <circle cx="68" cy="16" r="2" fill="${c}"/><circle cx="74" cy="12" r="1.4" fill="${c}"/><circle cx="72" cy="20" r="1.6" fill="${c}"/>`,
  tag_wow: (c) => `<text x="50" y="66" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="700" font-size="40" fill="${c}" stroke="${DARK}" stroke-width="3" paint-order="stroke" transform="rotate(-8 50 56)">WOW</text>
    <path d="M14 76 Q50 90 86 70" stroke="${lt(c, 20)}" stroke-width="3" fill="none"/>`,
  tag_hi: (c) => `<text x="50" y="72" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="700" font-size="54" fill="${c}" stroke="#FFFFFF" stroke-width="4" paint-order="stroke">HI!</text>`,
  tag_cool: (c) => `<text x="50" y="62" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="700" font-size="30" fill="${c}" stroke="${DARK}" stroke-width="2.4" paint-order="stroke" transform="rotate(6 50 56)">COOL</text>
    <path d="M18 70 L82 70" stroke="${DARK}" stroke-width="2" stroke-dasharray="6 4"/>`,
  star: (c) => `<path d="M50 6 L62 36 L94 38 L69 58 L78 90 L50 72 L22 90 L31 58 L6 38 L38 36 Z" fill="${FR(c)}"/>`,
  heart: (c) => `<path d="M50 88 Q10 60 12 34 Q14 14 32 14 Q44 14 50 28 Q56 14 68 14 Q86 14 88 34 Q90 60 50 88 Z" fill="${FR(c)}"/>
    <ellipse cx="30" cy="32" rx="6" ry="9" fill="#FFFFFF" opacity=".4" transform="rotate(-30 30 32)"/>`,
  lightning: (c) => `<path d="M58 4 L22 54 L46 54 L36 96 L78 40 L54 40 Z" fill="${F(c, 14, -10)}" stroke="${DARK}" stroke-width="2" stroke-linejoin="round"/>`,
  arrow: (c) => `<path d="M6 42 L60 42 L60 24 L94 50 L60 76 L60 58 L6 58 Z" fill="${FH(c)}" stroke="${DARK}" stroke-width="2" stroke-linejoin="round"/>`,
  rainbow: (c) => `
    ${['#E25C4F', '#F08A2E', '#F2C230', '#3FA66A', '#2F7BC0', '#8A5CC8'].map((col, i) => `<path d="M${8 + i * 6} 80 A${42 - i * 6} ${42 - i * 6} 0 0 1 ${92 - i * 6} 80" stroke="${col}" stroke-width="6" fill="none"/>`).join('')}
    <ellipse cx="14" cy="82" rx="12" ry="6" fill="${c}"/><ellipse cx="86" cy="82" rx="12" ry="6" fill="${c}"/>`,
  smiley: (c) => `<circle cx="50" cy="50" r="40" fill="${FR(c)}"/><circle cx="36" cy="40" r="5" fill="${DARK}"/><circle cx="64" cy="40" r="5" fill="${DARK}"/>
    <path d="M30 58 Q50 80 70 58" stroke="${DARK}" stroke-width="5" fill="none" stroke-linecap="round"/>`,
  splash: (c) => `<path d="M50 14 Q58 30 70 22 Q66 38 86 40 Q72 50 84 66 Q64 62 62 82 Q52 68 40 84 Q38 64 18 66 Q30 52 14 40 Q34 38 30 22 Q42 30 50 14 Z" fill="${FR(c)}"/>
    <circle cx="88" cy="22" r="4" fill="${c}"/><circle cx="14" cy="82" r="3" fill="${c}"/>`,
  crown_sign: (c) => `<path d="M10 76 L6 24 L30 46 L50 14 L70 46 L94 24 L90 76 Z" fill="${FH(c, 18, -14)}" stroke="${DARK}" stroke-width="2" stroke-linejoin="round"/>
    <circle cx="50" cy="56" r="6" fill="#FFFFFF"/>`,
  ladder: (c) => `${sh(50, 95, 22)}
    <path d="M30 94 L40 6 M70 94 L60 6" stroke="${c}" stroke-width="5" stroke-linecap="round"/>
    ${[20, 36, 52, 68, 84].map((y) => `<path d="M${39 - (y - 6) * 0.11} ${y} L${61 + (y - 6) * 0.11} ${y}" stroke="${dk(c)}" stroke-width="4" stroke-linecap="round"/>`).join('')}`,
  paint_bucket: (c) => `${sh(50, 94, 22)}
    <path d="M28 44 L72 44 L68 92 L32 92 Z" fill="${FH(METAL)}"/>
    <ellipse cx="50" cy="44" rx="22" ry="6" fill="${F(c)}"/>
    <path d="M28 52 Q36 60 40 52 L40 66 Q44 70 46 62 L46 52" fill="${c}"/>
    <path d="M28 44 Q50 18 72 44" fill="none" stroke="${DARK}" stroke-width="2"/>`,
  // ---------------- magic forest ----------------
  mushroom: (c) => `${sh(50, 94, 22)}
    <path d="M40 92 Q38 64 44 56 L56 56 Q62 64 60 92 Z" fill="${FH('#F4EEDC')}"/>
    <path d="M10 58 Q12 18 50 18 Q88 18 90 58 Q50 66 10 58 Z" fill="${FR(c)}"/>
    <circle cx="34" cy="38" r="6" fill="#FFFFFF"/><circle cx="60" cy="30" r="7" fill="#FFFFFF"/><circle cx="74" cy="46" r="5" fill="#FFFFFF"/><circle cx="50" cy="48" r="4" fill="#FFFFFF"/>`,
  castle: (c) => `${sh(50, 94, 46)}
    <rect x="22" y="40" width="56" height="54" fill="${F(c, 8, -10)}"/>
    <rect x="6" y="28" width="20" height="66" fill="${F(c, 10, -8)}"/><rect x="74" y="28" width="20" height="66" fill="${F(c, 10, -8)}"/>
    <path d="M4 28 L16 6 L28 28 Z M72 28 L84 6 L96 28 Z" fill="#8A5CC8"/>
    ${[22, 34, 46, 58, 70].map((x) => `<rect x="${x}" y="34" width="7" height="7" fill="${c}"/>`).join('')}
    <path d="M40 94 L40 70 Q50 58 60 70 L60 94 Z" fill="#6B4528"/>
    <rect x="12" y="44" width="8" height="12" rx="4" fill="#22303D"/><rect x="80" y="44" width="8" height="12" rx="4" fill="#22303D"/>
    <path d="M16 6 L16 0 L24 2 L16 4" fill="#E25C4F"/>`,
  owl: (c) => `${sh(50, 94, 20)}
    <path d="M28 30 L32 14 L42 26 Z M72 30 L68 14 L58 26 Z" fill="${dk(c)}"/>
    <ellipse cx="50" cy="58" rx="26" ry="34" fill="${FH(c)}"/>
    <ellipse cx="50" cy="66" rx="16" ry="20" fill="${lt(c, 20)}"/>
    <circle cx="40" cy="40" r="10" fill="#FFFFFF"/><circle cx="60" cy="40" r="10" fill="#FFFFFF"/>
    <circle cx="40" cy="40" r="5" fill="${DARK}"/><circle cx="60" cy="40" r="5" fill="${DARK}"/>
    <path d="M46 50 L54 50 L50 58 Z" fill="#F2A33A"/>`,
  fox: (c) => `${sh(50, 94, 34)}
    <path d="M72 84 Q98 82 94 56 Q90 46 80 52 Q86 66 72 72 Z" fill="${FH(c)}"/><path d="M90 52 Q96 56 94 62 Q88 58 90 52 Z" fill="#FFFFFF"/>
    <ellipse cx="54" cy="74" rx="24" ry="18" fill="${FH(c)}"/>
    <path d="M18 30 L24 12 L34 28 Z M46 28 L52 12 L56 30 Z" fill="${dk(c)}"/>
    <path d="M14 34 Q36 20 58 34 L40 60 Z" fill="${FR(c)}"/>
    <path d="M20 38 Q36 50 40 60 Q44 50 52 38 Q40 44 36 44 Q30 44 20 38 Z" fill="#FFFFFF"/>
    <circle cx="28" cy="38" r="2.2" fill="${DARK}"/><circle cx="46" cy="38" r="2.2" fill="${DARK}"/><circle cx="40" cy="58" r="2.4" fill="${DARK}"/>`,
  deer: (c) => `${sh(50, 94, 32)}
    <ellipse cx="56" cy="58" rx="26" ry="14" fill="${FH(c)}"/>
    <rect x="36" y="64" width="5" height="30" rx="2" fill="${dk(c)}"/><rect x="46" y="66" width="5" height="28" rx="2" fill="${c}"/><rect x="64" y="64" width="5" height="30" rx="2" fill="${dk(c)}"/><rect x="74" y="64" width="5" height="30" rx="2" fill="${c}"/>
    <circle cx="48" cy="54" r="2" fill="#FFFFFF"/><circle cx="60" cy="52" r="2" fill="#FFFFFF"/><circle cx="70" cy="56" r="2" fill="#FFFFFF"/>
    <path d="M30 50 L34 30 L42 30 L40 52 Z" fill="${FH(c)}"/>
    <ellipse cx="34" cy="26" rx="10" ry="8" fill="${FR(c)}"/>
    <path d="M30 20 L24 6 M26 12 L20 10 M38 20 L42 6 M40 12 L46 10" stroke="#8C5E35" stroke-width="2" stroke-linecap="round"/>
    <circle cx="30" cy="25" r="1.6" fill="${DARK}"/><circle cx="25" cy="29" r="1.8" fill="${DARK}"/>`,
  wand: (c) => `
    <path d="M20 88 L64 36" stroke="${DARK}" stroke-width="5" stroke-linecap="round"/>
    <path d="M66 14 L71 28 L86 28 L74 37 L78 52 L66 43 L54 52 L58 37 L46 28 L61 28 Z" fill="${FR(c)}"/>
    <circle cx="84" cy="10" r="2" fill="${c}"/><circle cx="90" cy="44" r="1.6" fill="${c}"/><circle cx="44" cy="18" r="1.6" fill="${c}"/>`,
  crystal: (c) => `${sh(50, 94, 26)}
    <path d="M50 8 L64 34 L58 92 L42 92 L36 34 Z" fill="${FH(c, 24, -10)}"/>
    <path d="M30 40 L38 56 L34 92 L24 92 L22 54 Z M70 40 L78 54 L76 92 L66 92 L62 56 Z" fill="${FH(lt(c, 10), 20, -12)}"/>
    <path d="M50 8 L50 92" stroke="#FFFFFF" stroke-width="1.4" opacity=".6"/>`,
  dragon: (c) => `${sh(50, 94, 40)}
    <path d="M70 70 Q96 72 94 48 Q90 40 84 44 Q88 60 70 60 Z" fill="${FH(c)}"/>
    <path d="M30 40 Q50 6 70 36 Q56 30 50 44 Z" fill="${lt(c, 14)}"/>
    <ellipse cx="54" cy="66" rx="24" ry="18" fill="${FH(c)}"/>
    <ellipse cx="54" cy="72" rx="14" ry="10" fill="#F2C14E"/>
    <rect x="38" y="76" width="7" height="18" rx="3" fill="${dk(c)}"/><rect x="62" y="76" width="7" height="18" rx="3" fill="${dk(c)}"/>
    <path d="M36 52 Q22 50 18 40 Q16 28 28 26 Q40 26 40 40 Z" fill="${FR(c)}"/>
    <path d="M20 24 L18 14 L26 22 M30 22 L32 12 L36 22" stroke="${dk(c)}" stroke-width="3" fill="none" stroke-linecap="round"/>
    <circle cx="26" cy="32" r="2.4" fill="${DARK}"/><circle cx="16" cy="38" r="1.4" fill="${DARK}"/>`,
  fairy_house: (c) => `${sh(50, 94, 30)}
    <path d="M24 94 L24 56 Q24 44 36 44 L64 44 Q76 44 76 56 L76 94 Z" fill="${FH('#F4EEDC')}"/>
    <path d="M14 50 Q16 10 50 10 Q84 10 86 50 Q50 58 14 50 Z" fill="${FR(c)}"/>
    <circle cx="34" cy="32" r="5" fill="#FFFFFF"/><circle cx="62" cy="24" r="6" fill="#FFFFFF"/>
    <path d="M42 94 L42 74 Q50 64 58 74 L58 94 Z" fill="#8C5E35"/><circle cx="66" cy="66" r="5" fill="#9ED2EA" stroke="#8C5E35" stroke-width="2"/>`,
  // ---------------- moon ----------------
  planet: (c) => `<circle cx="50" cy="50" r="28" fill="${FR(c)}"/>
    <ellipse cx="50" cy="52" rx="46" ry="10" fill="none" stroke="${lt(c, 24)}" stroke-width="4" transform="rotate(-14 50 52)"/>
    <path d="M30 40 Q50 36 70 42" stroke="${dk(c, -10)}" stroke-width="3" fill="none" opacity=".6"/>`,
  earth: (c) => `<circle cx="50" cy="50" r="38" fill="${FR('#2F7BC0')}"/>
    <path d="M28 30 Q40 22 48 32 Q44 44 34 42 Q26 40 28 30 Z M54 52 Q68 46 74 58 Q70 74 58 70 Q50 62 54 52 Z M36 62 Q44 60 44 70 Q38 76 34 70 Z" fill="${c}"/>
    <ellipse cx="38" cy="30" rx="8" ry="4" fill="#FFFFFF" opacity=".3"/>`,
  satellite: (c) => `
    <rect x="4" y="38" width="30" height="20" fill="${F('#2F5F9A')}"/><rect x="66" y="38" width="30" height="20" fill="${F('#2F5F9A')}"/>
    <path d="M4 48 L34 48 M19 38 L19 58 M66 48 L96 48 M81 38 L81 58" stroke="#9ED2EA" stroke-width="1"/>
    <path d="M34 48 L40 48 M60 48 L66 48" stroke="${METAL}" stroke-width="3"/>
    <rect x="40" y="34" width="20" height="28" rx="3" fill="${FH(c)}"/>
    <path d="M50 34 L50 22" stroke="${METAL}" stroke-width="2"/><circle cx="50" cy="20" r="4" fill="${c}"/>`,
  alien: (c) => `${sh(50, 94, 18)}
    <path d="M38 94 L40 66 M62 94 L60 66" stroke="${c}" stroke-width="7" stroke-linecap="round"/>
    <ellipse cx="50" cy="66" rx="16" ry="14" fill="${FH(c)}"/>
    <ellipse cx="50" cy="36" rx="22" ry="20" fill="${FR(c)}"/>
    <path d="M38 18 L32 4 M62 18 L68 4" stroke="${c}" stroke-width="3" stroke-linecap="round"/><circle cx="32" cy="4" r="3.4" fill="#F2C14E"/><circle cx="68" cy="4" r="3.4" fill="#F2C14E"/>
    <ellipse cx="42" cy="36" rx="6" ry="8" fill="#1C2430"/><ellipse cx="58" cy="36" rx="6" ry="8" fill="#1C2430"/>
    <path d="M44 48 Q50 52 56 48" stroke="#1C2430" stroke-width="2" fill="none" stroke-linecap="round"/>`,
  ufo: (c) => `
    <path d="M30 60 L20 86 M70 60 L80 86" stroke="#F7E58A" stroke-width="2" opacity=".6"/>
    <path d="M34 46 Q34 24 50 24 Q66 24 66 46 Z" fill="#9ED2EA" opacity=".9"/>
    <ellipse cx="50" cy="50" rx="44" ry="14" fill="${FH(c)}"/>
    ${[18, 34, 50, 66, 82].map((x) => `<circle cx="${x}" cy="54" r="3" fill="#F2C14E"/>`).join('')}`,
  moon_rover: (c) => `${sh(50, 94, 44)}
    <rect x="14" y="52" width="72" height="20" rx="4" fill="${F(c)}"/>
    <rect x="30" y="34" width="28" height="18" rx="3" fill="${F('#9ED2EA', 10, -6)}"/>
    <path d="M70 52 L74 30 M66 30 L84 26" stroke="${METAL}" stroke-width="2.4" stroke-linecap="round"/>
    ${[22, 50, 78].map((x) => `<circle cx="${x}" cy="82" r="11" fill="#1C2430"/><circle cx="${x}" cy="82" r="4" fill="${METAL}"/>`).join('')}`,
  crater: (c) => `<ellipse cx="50" cy="74" rx="44" ry="14" fill="${F(c, -6, 8)}"/><ellipse cx="50" cy="72" rx="32" ry="8" fill="${dk(c, -14)}"/>`,
  shooting_star: (c) => `<path d="M10 80 L60 30" stroke="${c}" stroke-width="5" stroke-linecap="round" opacity=".4"/><path d="M24 70 L60 30" stroke="${c}" stroke-width="3" stroke-linecap="round" opacity=".6"/>
    <path d="M68 10 L74 24 L90 26 L78 36 L82 52 L68 44 L54 52 L58 36 L46 26 L62 24 Z" fill="${FR(c)}"/>`,
  // ---------------- restaurant ----------------
  menu: (c) => `${sh(50, 94, 18)}
    <path d="M30 94 L40 60 M70 94 L60 60" stroke="${DARK}" stroke-width="3"/>
    <rect x="24" y="14" width="52" height="66" rx="3" fill="${F(c)}"/>
    <rect x="30" y="20" width="40" height="54" fill="${WHITE}"/>
    <text x="50" y="32" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="700" font-size="9" fill="${DARK}">MENU</text>
    ${[40, 48, 56, 64].map((y) => `<path d="M34 ${y} L58 ${y} M62 ${y} L66 ${y}" stroke="${METAL}" stroke-width="2"/>`).join('')}`,
  sign_open: (c) => `
    <path d="M50 6 L30 30 M50 6 L70 30" stroke="${DARK}" stroke-width="1.4"/>
    <rect x="10" y="30" width="80" height="40" rx="8" fill="${F(c)}"/>
    <text x="50" y="58" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="700" font-size="22" fill="#FFFFFF">OPEN</text>`,
  // ---------------- street ----------------
  house: (c) => `${sh(50, 94, 46)}
    <rect x="12" y="44" width="76" height="50" fill="${F(c, 8, -10)}"/>
    <path d="M4 48 L50 10 L96 48 Z" fill="${F('#B5483B', 8, -10)}"/>
    <rect x="66" y="16" width="10" height="20" fill="#8C5E35"/>
    <path d="M42 94 L42 66 Q50 60 58 66 L58 94 Z" fill="#8C5E35"/>
    <rect x="18" y="56" width="18" height="16" fill="#9ED2EA" stroke="#FFFFFF" stroke-width="2"/><rect x="64" y="56" width="18" height="16" fill="#9ED2EA" stroke="#FFFFFF" stroke-width="2"/>`,
  shop: (c) => `${sh(50, 94, 46)}
    <rect x="8" y="30" width="84" height="64" fill="${F('#F4EEDC', 4, -8)}"/>
    <path d="M4 30 L96 30 L92 44 L8 44 Z" fill="${c}"/>
    ${[0, 1, 2, 3, 4, 5].map((i) => `<path d="M${8 + i * 14} 44 Q${15 + i * 14} 52 ${22 + i * 14} 44" fill="${i % 2 ? '#FFFFFF' : c}"/>`).join('')}
    <rect x="14" y="56" width="40" height="28" fill="#9ED2EA"/><rect x="62" y="56" width="22" height="38" fill="#8C5E35"/>
    <rect x="20" y="18" width="60" height="10" rx="2" fill="${DARK}"/><text x="50" y="26" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="700" font-size="8" fill="#FFFFFF">SHOP</text>`,
  building: (c) => `${sh(50, 94, 32)}
    <rect x="18" y="4" width="64" height="90" fill="${FH(c, 8, -12)}"/>
    ${[0, 1, 2, 3, 4, 5, 6].map((r) => [0, 1, 2].map((k) => `<rect x="${24 + k * 20}" y="${10 + r * 11}" width="12" height="7" fill="${(r + k) % 3 ? '#9ED2EA' : '#FFE9A8'}"/>`).join('')).join('')}
    <rect x="42" y="84" width="16" height="10" fill="#22303D"/>`,
  mailbox: (c) => `${sh(50, 94, 14)}
    <rect x="46" y="54" width="8" height="40" fill="${DARK}"/>
    <path d="M28 56 L28 36 Q28 22 50 22 Q72 22 72 36 L72 56 Z" fill="${FH(c)}"/>
    <rect x="36" y="34" width="22" height="4" rx="2" fill="${DARK}"/><path d="M72 34 L82 34 L82 24 L76 24" fill="#F2C14E" stroke="#F2C14E"/>`,
  stop_sign: (c) => `${sh(50, 95, 10)}
    <rect x="47" y="50" width="6" height="45" fill="${METAL}"/>
    <path d="M36 6 L64 6 L84 26 L84 54 L64 74 L36 74 L16 54 L16 26 Z" fill="${F(c)}" stroke="#FFFFFF" stroke-width="3"/>
    <text x="50" y="47" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="700" font-size="18" fill="#FFFFFF">STOP</text>`,
  fire_hydrant: (c) => `${sh(50, 94, 18)}
    <rect x="34" y="40" width="32" height="50" rx="4" fill="${FH(c)}"/>
    <path d="M34 40 Q34 22 50 22 Q66 22 66 40 Z" fill="${F(c)}"/><rect x="46" y="14" width="8" height="8" rx="2" fill="${dk(c)}"/>
    <rect x="22" y="52" width="12" height="12" rx="3" fill="${dk(c)}"/><rect x="66" y="52" width="12" height="12" rx="3" fill="${dk(c)}"/>
    <rect x="28" y="88" width="44" height="6" rx="2" fill="${dk(c, -20)}"/>`,
  bus_stop: (c) => `${sh(50, 94, 44)}
    <rect x="8" y="16" width="84" height="8" rx="2" fill="${F(c)}"/>
    <path d="M12 24 L12 94 M88 24 L88 94" stroke="${METAL}" stroke-width="3"/>
    <rect x="14" y="26" width="34" height="50" fill="#9ED2EA" opacity=".5"/>
    <rect x="54" y="62" width="32" height="6" rx="2" fill="${dk(c)}"/><path d="M58 68 L58 80 M82 68 L82 80" stroke="${DARK}" stroke-width="2.4"/>
    <circle cx="80" cy="36" r="8" fill="${c}"/><text x="80" y="40" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="700" font-size="9" fill="#FFFFFF">BUS</text>`,
  // ---------------- classroom ----------------
  blackboard: (c) => `
    <rect x="4" y="14" width="92" height="60" rx="3" fill="${F('#8C5E35')}"/>
    <rect x="8" y="18" width="84" height="52" fill="${F(c, 6, -6)}"/>
    <text x="16" y="36" font-family="Fredoka, sans-serif" font-size="11" fill="#FFFFFF">ABC</text>
    <text x="16" y="56" font-family="Fredoka, sans-serif" font-size="10" fill="#FFFFFF">1 + 2 = 3</text>
    <path d="M60 30 Q70 22 80 30 Q70 40 60 30 Z" fill="none" stroke="#FFFFFF" stroke-width="1.4"/>
    <rect x="30" y="72" width="40" height="4" rx="1" fill="#8C5E35"/><rect x="36" y="69" width="8" height="3" fill="#FFFFFF"/>`,
  school_desk: (c) => `${sh(50, 94, 40)}
    <rect x="10" y="40" width="80" height="8" rx="2" fill="${F(c)}"/>
    <path d="M18 48 L18 94 M82 48 L82 94" stroke="${METAL}" stroke-width="4" stroke-linecap="round"/>
    <rect x="18" y="52" width="64" height="12" fill="${dk(c, -10)}"/>
    <rect x="58" y="34" width="20" height="6" rx="1" fill="#E25C4F"/><path d="M26 38 L44 34" stroke="#F2C14E" stroke-width="3" stroke-linecap="round"/>`,
  globe: (c) => `${sh(50, 94, 18)}
    <rect x="36" y="86" width="28" height="8" rx="2" fill="${DARK}"/><rect x="47" y="72" width="6" height="16" fill="${METAL}"/>
    <path d="M24 30 Q24 74 50 76" fill="none" stroke="${METAL}" stroke-width="3"/>
    <circle cx="52" cy="42" r="28" fill="${FR('#2F7BC0')}"/>
    <path d="M36 28 Q46 22 52 30 Q48 40 40 38 Z M58 44 Q70 40 74 50 Q70 62 60 58 Z" fill="${c}"/>`,
  pencil: (c) => `
    <path d="M14 82 L70 26 L82 38 L26 94 Z" fill="${FH(c)}"/>
    <path d="M14 82 L26 94 L8 98 Z" fill="#F4D7A8"/><path d="M8 98 L11 90 L16 95 Z" fill="${DARK}"/>
    <path d="M70 26 L76 20 Q80 16 84 20 L88 24 Q92 28 88 32 L82 38 Z" fill="#F2A3B0"/>`,
  ruler: (c) => `<rect x="4" y="38" width="92" height="22" rx="2" fill="${F(c)}"/>
    ${Array.from({ length: 18 }, (_, i) => `<path d="M${10 + i * 5} 38 L${10 + i * 5} ${i % 2 ? 44 : 48}" stroke="${DARK}" stroke-width="1"/>`).join('')}`,
  scissors: (c) => `
    <path d="M44 54 L86 14 M56 54 L14 14" stroke="${METAL}" stroke-width="6" stroke-linecap="round"/>
    <circle cx="34" cy="72" r="13" fill="none" stroke="${c}" stroke-width="7"/><circle cx="66" cy="72" r="13" fill="none" stroke="${c}" stroke-width="7"/>`,
  crayons: (c) => `${sh(50, 92, 32)}
    ${['#E25C4F', '#F2C230', '#3FA66A', '#2F7BC0', '#8A5CC8'].map((col, i) => `<rect x="${24 + i * 10}" y="${30 + (i % 2) * 6}" width="8" height="40" fill="${col}"/><path d="M${24 + i * 10} ${30 + (i % 2) * 6} L${28 + i * 10} ${20 + (i % 2) * 6} L${32 + i * 10} ${30 + (i % 2) * 6} Z" fill="${col}"/>`).join('')}
    <rect x="18" y="52" width="64" height="40" rx="3" fill="${F(c)}"/><text x="50" y="76" text-anchor="middle" font-family="Fredoka, sans-serif" font-weight="700" font-size="10" fill="#FFFFFF">COLORS</text>`,
  map: (c) => `
    <path d="M8 18 L34 10 L66 20 L92 12 L92 82 L66 90 L34 80 L8 88 Z" fill="${F('#F4EEDC', 4, -6)}" stroke="#C9B48A" stroke-width="1.4"/>
    <path d="M34 10 L34 80 M66 20 L66 90" stroke="#C9B48A" stroke-width="1.2"/>
    <path d="M16 34 Q26 26 32 36 Q28 48 18 44 Z M44 50 Q56 42 62 54 Q58 66 48 62 Z M72 30 Q82 28 86 38 L80 46 Q72 44 72 30 Z" fill="${c}"/>
    <path d="M20 70 Q40 60 54 74 Q66 84 84 68" stroke="#E25C4F" stroke-width="2" stroke-dasharray="4 3" fill="none"/>`,
  // ---------------- beach ----------------
  beach_umbrella: (c) => `${sh(50, 94, 30)}
    <path d="M50 30 L56 94" stroke="${METAL}" stroke-width="3"/>
    <path d="M8 40 Q12 8 50 6 Q88 8 92 40 Q80 34 70 40 Q60 32 50 40 Q40 32 30 40 Q20 34 8 40 Z" fill="${FH(c)}"/>
    <path d="M30 40 Q34 14 50 6 Q66 14 70 40 Q60 32 50 40 Q40 32 30 40 Z" fill="#FFFFFF" opacity=".85"/>`,
  towel: (c) => `
    <path d="M4 76 L86 66 L96 82 L14 92 Z" fill="${F(c)}"/>
    <path d="M24 74 L34 90 M44 72 L54 88 M64 70 L74 86" stroke="#FFFFFF" stroke-width="4"/>`,
  sandcastle: (c) => `${sh(50, 94, 40)}
    <rect x="18" y="56" width="64" height="38" fill="${F(c, 8, -10)}"/>
    <rect x="10" y="42" width="20" height="52" fill="${F(c, 10, -8)}"/><rect x="70" y="42" width="20" height="52" fill="${F(c, 10, -8)}"/>
    ${[10, 18, 26, 70, 78, 86].map((x) => `<rect x="${x - 2}" y="36" width="6" height="7" fill="${c}"/>`).join('')}
    <path d="M42 94 L42 76 Q50 68 58 76 L58 94 Z" fill="${dk(c, -18)}"/>
    <path d="M80 36 L80 18 L92 22 L80 26" stroke="${DARK}" stroke-width="1.4" fill="#E25C4F"/>`,
  sand_bucket: (c) => `${sh(50, 94, 22)}
    <path d="M28 46 L72 46 L66 92 L34 92 Z" fill="${FH(c)}"/>
    <path d="M28 46 Q50 16 72 46" fill="none" stroke="${dk(c)}" stroke-width="2.4"/>
    <path d="M74 92 L88 50" stroke="#F2C230" stroke-width="4" stroke-linecap="round"/><path d="M84 52 Q90 40 96 46 Q94 56 86 56 Z" fill="#F2C230"/>`,
  shell: (c) => `${sh(50, 90, 26)}
    <path d="M50 86 L22 46 Q20 26 50 22 Q80 26 78 46 Z" fill="${FH(c)}"/>
    ${[30, 40, 50, 60, 70].map((x) => `<path d="M50 84 L${x} 28" stroke="${dk(c, -14)}" stroke-width="1.6"/>`).join('')}
    <path d="M40 86 L60 86 L54 92 L46 92 Z" fill="${dk(c)}"/>`,
  starfish: (c) => `<path d="M50 10 Q56 34 64 38 Q86 36 90 44 Q72 54 70 60 Q78 84 72 90 Q56 76 50 74 Q44 76 28 90 Q22 84 30 60 Q28 54 10 44 Q14 36 36 38 Q44 34 50 10 Z" fill="${FR(c)}"/>
    ${[[50, 30], [50, 44], [36, 48], [64, 48], [42, 64], [58, 64]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2" fill="${lt(c, 24)}"/>`).join('')}`,
  crab: (c) => `${sh(50, 92, 34)}
    <path d="M22 72 L8 78 M24 80 L12 88 M78 72 L92 78 M76 80 L88 88" stroke="${dk(c)}" stroke-width="3.4" stroke-linecap="round"/>
    <ellipse cx="50" cy="70" rx="28" ry="18" fill="${FR(c)}"/>
    <path d="M30 58 Q18 44 22 32 M70 58 Q82 44 78 32" stroke="${c}" stroke-width="5" fill="none" stroke-linecap="round"/>
    <path d="M14 30 Q18 18 28 24 L22 32 Q26 36 18 38 Q10 38 14 30 Z M86 30 Q82 18 72 24 L78 32 Q74 36 82 38 Q90 38 86 30 Z" fill="${FR(c)}"/>
    <path d="M42 54 L40 44 M58 54 L60 44" stroke="${DARK}" stroke-width="1.6"/><circle cx="40" cy="42" r="4" fill="#FFFFFF"/><circle cx="60" cy="42" r="4" fill="#FFFFFF"/><circle cx="40" cy="42" r="2" fill="${DARK}"/><circle cx="60" cy="42" r="2" fill="${DARK}"/>`,
  boat: (c) => `
    <path d="M10 64 L90 64 L76 86 L24 86 Z" fill="${F(c)}"/>
    <path d="M50 62 L50 10" stroke="#8C5E35" stroke-width="3"/>
    <path d="M52 12 L84 56 L52 56 Z" fill="${F('#FFFFFF', 0, -10)}"/><path d="M48 18 L22 56 L48 56 Z" fill="${F(lt(c, 30), 0, -10)}"/>
    <path d="M4 88 Q20 82 36 88 T68 88 T100 88" stroke="#7FC6E6" stroke-width="3" fill="none"/>`,
  surfboard: (c) => `${sh(50, 95, 14)}
    <path d="M50 4 Q68 30 64 70 Q60 94 50 94 Q40 94 36 70 Q32 30 50 4 Z" fill="${FH(c)}"/>
    <path d="M50 8 L50 90" stroke="#FFFFFF" stroke-width="3"/>`,
  sea: (c) => `<path d="M0 40 Q12 32 25 40 T50 40 T75 40 T100 40 L100 96 L0 96 Z" fill="${F(c, 10, -14)}"/>
    <path d="M0 52 Q12 46 25 52 T50 52 T75 52 T100 52" stroke="#FFFFFF" stroke-width="2" fill="none" opacity=".7"/>
    <path d="M0 70 Q12 64 25 70 T50 70 T75 70 T100 70" stroke="#FFFFFF" stroke-width="1.6" fill="none" opacity=".5"/>`,
  // ---------------- airport ----------------
  airplane: (c) => `${sh(50, 90, 44)}
    <path d="M6 58 Q6 48 20 48 L84 48 Q96 50 98 58 Q96 66 84 66 L20 66 Q6 66 6 58 Z" fill="${F('#F4F6F8', 6, -12)}"/>
    <path d="M40 54 L60 54 L36 86 L26 86 Z" fill="${F(c)}"/><path d="M40 52 L56 52 L40 30 L32 30 Z" fill="${dk(c)}"/>
    <path d="M10 48 L4 30 L14 30 L24 48 Z" fill="${F(c)}"/>
    ${[54, 62, 70, 78].map((x) => `<circle cx="${x}" cy="56" r="2.4" fill="#5FB8E8"/>`).join('')}
    <path d="M86 52 Q92 52 94 56 L86 56 Z" fill="#22303D"/>`,
  helicopter: (c) => `${sh(50, 92, 34)}
    <path d="M10 22 L90 22" stroke="${DARK}" stroke-width="3" stroke-linecap="round"/><rect x="47" y="22" width="6" height="12" fill="${DARK}"/>
    <path d="M22 50 Q22 34 44 34 L60 34 Q76 34 76 52 Q76 66 58 66 L36 66 Q22 66 22 50 Z" fill="${FH(c)}"/>
    <path d="M58 38 Q72 40 72 52 L58 52 Z" fill="#9ED2EA"/>
    <path d="M22 50 L4 46 L2 36 L8 36 L12 44" stroke="${c}" stroke-width="4" fill="none" stroke-linejoin="round"/>
    <path d="M32 66 L28 80 M64 66 L68 80 M20 82 L80 82" stroke="${DARK}" stroke-width="3" stroke-linecap="round"/>`,
  control_tower: (c) => `${sh(50, 94, 20)}
    <path d="M40 94 L42 40 L58 40 L60 94 Z" fill="${FH(c)}"/>
    <path d="M28 40 L72 40 L66 18 L34 18 Z" fill="${F('#9ED2EA', 10, -6)}" stroke="${DARK}" stroke-width="1.6"/>
    <rect x="30" y="12" width="40" height="7" rx="2" fill="${DARK}"/><path d="M50 12 L50 2" stroke="${DARK}" stroke-width="2"/><circle cx="50" cy="2" r="2" fill="#E25C4F"/>`,
  suitcase: (c) => `${sh(50, 94, 22)}
    <rect x="26" y="34" width="48" height="56" rx="6" fill="${FH(c)}"/>
    <path d="M40 34 L40 22 L60 22 L60 34" fill="none" stroke="${DARK}" stroke-width="3"/>
    <path d="M38 40 L38 84 M62 40 L62 84" stroke="${dk(c, -14)}" stroke-width="2"/>
    <circle cx="34" cy="92" r="3" fill="${DARK}"/><circle cx="66" cy="92" r="3" fill="${DARK}"/>`,
  windsock: (c) => `${sh(20, 95, 8)}
    <path d="M20 95 L20 10" stroke="${METAL}" stroke-width="3"/>
    <path d="M20 12 L86 22 L84 34 L20 36 Z" fill="${c}"/>
    <path d="M36 14 L36 35 M52 17 L52 34 M68 19 L68 34" stroke="#FFFFFF" stroke-width="6"/>`,
  // ---------------- garden ----------------
  sunflower: (c) => `${sh(50, 94, 10)}
    <path d="M50 94 L50 40" stroke="#3F9E5E" stroke-width="3.4"/>
    <path d="M50 70 Q34 58 28 66 Q36 76 50 72 Z M50 60 Q66 50 72 56 Q64 66 50 62 Z" fill="#56B870"/>
    ${Array.from({ length: 12 }, (_, i) => `<ellipse cx="50" cy="12" rx="5" ry="11" fill="${c}" transform="rotate(${i * 30} 50 26)"/>`).join('')}
    <circle cx="50" cy="26" r="10" fill="#6B4528"/>`,
  tulip: (c) => `${sh(50, 94, 10)}
    <path d="M50 94 Q48 70 50 46" stroke="#3F9E5E" stroke-width="3"/>
    <path d="M50 80 Q30 70 34 54 Q44 66 50 78 Z" fill="#56B870"/>
    <path d="M36 26 L42 36 L50 22 L58 36 L64 26 L64 40 Q64 52 50 52 Q36 52 36 40 Z" fill="${FH(c)}"/>`,
  carrot: (c) => `${sh(50, 94, 16)}
    <path d="M38 30 Q50 26 62 30 L52 92 Q50 96 48 92 Z" fill="${FH(c)}"/>
    <path d="M44 44 L50 46 M46 60 L52 62 M48 76 L52 77" stroke="${dk(c, -14)}" stroke-width="1.6"/>
    <path d="M50 30 Q40 10 34 8 M50 30 Q50 8 54 4 M50 30 Q62 12 68 12" stroke="#3F9E5E" stroke-width="3" fill="none" stroke-linecap="round"/>`,
  pumpkin: (c) => `${sh(50, 92, 36)}
    <ellipse cx="34" cy="64" rx="20" ry="26" fill="${FH(c)}"/><ellipse cx="66" cy="64" rx="20" ry="26" fill="${FH(c)}"/>
    <ellipse cx="50" cy="64" rx="18" ry="28" fill="${FH(lt(c, 6))}"/>
    <path d="M50 38 Q48 26 56 20" stroke="#6B4528" stroke-width="4" fill="none" stroke-linecap="round"/>`,
  tomato_plant: (c) => `${sh(50, 94, 20)}
    <path d="M50 94 L50 20 M50 50 Q36 44 30 30 M50 66 Q64 58 70 44" stroke="#3F9E5E" stroke-width="3" fill="none"/>
    <path d="M42 94 L58 94 L60 80 L40 80 Z" fill="#B5672E"/>
    <circle cx="30" cy="38" r="7" fill="${FR(c)}"/><circle cx="70" cy="52" r="7" fill="${FR(c)}"/><circle cx="54" cy="30" r="6" fill="${FR(c)}"/>
    <path d="M40 24 Q34 16 42 12 Q46 20 40 24 Z M60 40 Q68 34 72 40 Q66 44 60 40 Z" fill="#56B870"/>`,
  watering_can: (c) => `${sh(50, 92, 30)}
    <path d="M24 50 L66 50 L62 90 L28 90 Z" fill="${FH(c)}"/>
    <path d="M66 58 L90 34" stroke="${c}" stroke-width="6" stroke-linecap="round"/><path d="M86 28 L96 38 L92 42 L82 32 Z" fill="${dk(c)}"/>
    <path d="M28 50 Q46 26 62 50" fill="none" stroke="${dk(c)}" stroke-width="4"/>`,
  shovel: (c) => `${sh(50, 95, 14)}
    <path d="M50 8 L50 62" stroke="#8C5E35" stroke-width="5" stroke-linecap="round"/><path d="M42 8 L58 8" stroke="#8C5E35" stroke-width="5" stroke-linecap="round"/>
    <path d="M36 62 L64 62 L62 84 Q50 96 38 84 Z" fill="${F(c)}"/>`,
  wheelbarrow: (c) => `${sh(50, 94, 40)}
    <path d="M10 46 L72 46 L64 74 L24 74 Z" fill="${F(c)}"/>
    <path d="M64 70 L92 82 M30 74 L26 94 M58 74 L62 86" stroke="${DARK}" stroke-width="3.4" stroke-linecap="round"/>
    <circle cx="78" cy="84" r="10" fill="#1C2430"/><circle cx="78" cy="84" r="4" fill="${METAL}"/>
    <path d="M14 46 Q30 36 44 42 Q56 34 68 46 Z" fill="#8C5E35"/>`,
  birdhouse: (c) => `${sh(50, 95, 10)}
    <rect x="46" y="64" width="8" height="31" fill="#8C5E35"/>
    <rect x="28" y="30" width="44" height="36" fill="${F(c)}"/><path d="M22 34 L50 10 L78 34 Z" fill="${F(dk(c, -20))}"/>
    <circle cx="50" cy="46" r="7" fill="#22303D"/><rect x="48" y="56" width="4" height="8" fill="#8C5E35"/>`,
  fence: (c) => `
    ${[6, 26, 46, 66, 86].map((x) => `<path d="M${x} 94 L${x} 40 L${x + 4} 34 L${x + 8} 40 L${x + 8} 94 Z" fill="${FH(c)}"/>`).join('')}
    <rect x="0" y="50" width="100" height="6" fill="${dk(c, -8)}"/><rect x="0" y="74" width="100" height="6" fill="${dk(c, -8)}"/>`,
  bee: (c) => `
    <ellipse cx="38" cy="38" rx="12" ry="16" fill="#E9F6FC" opacity=".9" transform="rotate(-24 38 38)"/><ellipse cx="58" cy="36" rx="12" ry="16" fill="#E9F6FC" opacity=".9" transform="rotate(24 58 36)"/>
    <ellipse cx="50" cy="60" rx="26" ry="18" fill="${FH(c)}"/>
    <path d="M40 44 L40 76 M54 42 L54 78" stroke="${DARK}" stroke-width="6"/>
    <circle cx="74" cy="56" r="3" fill="${DARK}"/><path d="M24 60 L16 62" stroke="${DARK}" stroke-width="3"/>`,
  ladybug: (c) => `${sh(50, 90, 26)}
    <circle cx="50" cy="38" r="12" fill="${DARK}"/>
    <ellipse cx="50" cy="64" rx="28" ry="24" fill="${FR(c)}"/>
    <path d="M50 42 L50 88" stroke="${DARK}" stroke-width="2.4"/>
    ${[[36, 56], [62, 54], [38, 74], [64, 76], [50, 66]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5" fill="${DARK}"/>`).join('')}`,
  snail: (c) => `${sh(50, 92, 34)}
    <path d="M10 88 Q30 82 74 86 Q88 86 90 76 L88 66 Q80 74 70 72 L16 80 Q8 84 10 88 Z" fill="#C9B48A"/>
    <path d="M84 70 L88 52 M88 72 L96 56" stroke="#C9B48A" stroke-width="3" stroke-linecap="round"/><circle cx="88" cy="52" r="3" fill="${DARK}"/><circle cx="96" cy="56" r="3" fill="${DARK}"/>
    <circle cx="44" cy="58" r="26" fill="${FR(c)}"/>
    <path d="M44 58 m-4 0 a4 4 0 1 1 8 0 a10 10 0 1 1 -20 0 a16 16 0 1 1 32 0" stroke="${dk(c, -18)}" stroke-width="2.4" fill="none"/>`,
  gnome: (c) => `${sh(50, 94, 18)}
    <path d="M32 94 L36 62 L64 62 L68 94 Z" fill="${FH('#2F7BC0')}"/>
    <path d="M36 62 Q50 84 64 62 L58 56 L42 56 Z" fill="#FFFFFF"/>
    <circle cx="50" cy="48" r="10" fill="#F3C9A0"/><circle cx="50" cy="52" r="3" fill="#E89A8A"/>
    <path d="M36 44 Q50 0 64 44 Z" fill="${FH(c)}"/>`,
};

// ---------------- kids coloring pages (outline drawings with separate areas to color) ----------------
// Each area is a shape with data-area; the page starts white and the child colors each area.
const O = 'stroke="#2B3440" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round"';
const A = (i, d, extra = '') => `<path data-area="${i}" d="${d}" fill="#FFFFFF" ${O} ${extra}/>`;
const AC = (i, cx, cy, r) => `<circle data-area="${i}" cx="${cx}" cy="${cy}" r="${r}" fill="#FFFFFF" ${O}/>`;
const AE = (i, cx, cy, rx, ry, rot = 0) => `<ellipse data-area="${i}" cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" ${rot ? `transform="rotate(${rot} ${cx} ${cy})"` : ''} fill="#FFFFFF" ${O}/>`;
const EYE = (x, y) => `<circle cx="${x}" cy="${y}" r="3.4" fill="#2B3440"/><circle cx="${x + 1.2}" cy="${y - 1.2}" r="1" fill="#FFFFFF"/>`;

export const COLORING = {
  lion: `${Array.from({ length: 14 }, (_, i) => { const a = (i / 14) * Math.PI * 2; return AC(0, (50 + Math.cos(a) * 26).toFixed(1), (40 + Math.sin(a) * 26).toFixed(1), 11); }).join('')}
    ${AE(1, 50, 78, 20, 18)}${AC(2, 50, 40, 22)}${AC(3, 34, 22, 6)}${AC(3, 66, 22, 6)}
    ${EYE(42, 36)}${EYE(58, 36)}${A(4, 'M45 46 L55 46 L50 52 Z')}<path d="M50 52 Q44 58 40 54 M50 52 Q56 58 60 54" stroke="#2B3440" stroke-width="2" fill="none"/>`,
  elephant: `${AE(0, 26, 46, 18, 22)}${AE(0, 74, 46, 18, 22)}${AE(1, 50, 74, 26, 18)}${A(2, 'M30 92 L30 80 L40 80 L40 92 Z M60 92 L60 80 L70 80 L70 92 Z')}
    ${AC(3, 50, 44, 22)}${A(4, 'M44 56 Q42 76 50 84 Q56 86 56 80 Q52 76 54 56 Z')}${EYE(41, 40)}${EYE(59, 40)}`,
  hippo: `${AE(0, 50, 72, 34, 20)}${A(1, 'M24 92 L24 82 L34 82 L34 92 Z M66 92 L66 82 L76 82 L76 92 Z')}
    ${AE(2, 50, 38, 24, 22)}${AE(3, 50, 54, 22, 14)}${AC(4, 32, 20, 6)}${AC(4, 68, 20, 6)}${EYE(41, 32)}${EYE(59, 32)}
    <circle cx="44" cy="54" r="2.4" fill="#2B3440"/><circle cx="56" cy="54" r="2.4" fill="#2B3440"/>`,
  cat: `${A(0, 'M72 86 Q94 84 88 62')}${AE(1, 52, 72, 22, 18)}${A(2, 'M30 30 L34 10 L44 22 Z M70 30 L66 10 L56 22 Z')}${AC(3, 50, 38, 20)}
    ${EYE(43, 36)}${EYE(57, 36)}${A(4, 'M47 44 L53 44 L50 48 Z')}`,
  dog: `${AE(0, 56, 72, 24, 16)}${A(1, 'M38 80 L38 92 L46 92 L46 82 Z M64 80 L64 92 L72 92 L72 82 Z')}${A(2, 'M78 66 Q92 58 88 48')}
    ${AE(3, 22, 40, 7, 14, 18)}${AC(4, 34, 42, 18)}${AE(3, 46, 40, 7, 14, -18)}${EYE(29, 40)}${EYE(40, 40)}${AE(5, 34, 50, 5, 3.4)}`,
  fish: `${A(0, 'M70 50 L94 32 L94 68 Z')}${AE(1, 44, 50, 32, 22)}${A(2, 'M30 30 Q44 18 58 30')}${A(3, 'M40 70 Q48 80 56 70')}
    ${EYE(28, 46)}<path d="M50 32 Q58 50 50 68 M60 34 Q68 50 60 66" stroke="#2B3440" stroke-width="2" fill="none"/>`,
  bird: `${A(0, 'M24 54 L6 46 L12 62 Z')}${AE(1, 46, 58, 26, 18)}${AC(2, 66, 40, 14)}${A(3, 'M78 38 L92 42 L78 46 Z')}${A(4, 'M32 56 Q44 44 56 58 Q44 66 32 56 Z')}
    ${EYE(69, 37)}<path d="M40 76 L38 88 M52 76 L54 88" stroke="#2B3440" stroke-width="2.6"/>`,
  butterfly: `${AE(0, 32, 36, 20, 18)}${AE(0, 68, 36, 20, 18)}${AE(1, 34, 66, 14, 12)}${AE(1, 66, 66, 14, 12)}${AC(2, 32, 36, 7)}${AC(2, 68, 36, 7)}
    ${AE(3, 50, 52, 5, 26)}<path d="M48 26 Q42 14 38 12 M52 26 Q58 14 62 12" stroke="#2B3440" stroke-width="2" fill="none"/>`,
  frog: `${AE(0, 50, 66, 34, 24)}${AC(1, 32, 36, 12)}${AC(1, 68, 36, 12)}${AE(2, 30, 90, 14, 6)}${AE(2, 70, 90, 14, 6)}${AE(3, 50, 70, 18, 12)}
    ${EYE(32, 36)}${EYE(68, 36)}<path d="M34 54 Q50 64 66 54" stroke="#2B3440" stroke-width="2.4" fill="none"/>`,
  pig: `${AE(0, 50, 68, 32, 22)}${A(1, 'M28 90 L28 80 L38 80 L38 90 Z M62 90 L62 80 L72 80 L72 90 Z')}${AC(2, 50, 40, 22)}${A(3, 'M32 24 L30 10 L42 20 Z M68 24 L70 10 L58 20 Z')}
    ${AE(4, 50, 46, 9, 7)}<circle cx="47" cy="46" r="1.8" fill="#2B3440"/><circle cx="53" cy="46" r="1.8" fill="#2B3440"/>${EYE(41, 34)}${EYE(59, 34)}`,
  cow: `${AE(0, 50, 66, 34, 20)}${A(1, 'M26 90 L26 80 L36 80 L36 90 Z M64 90 L64 80 L74 80 L74 90 Z')}${AE(2, 40, 60, 9, 7)}${AE(2, 62, 70, 8, 6)}
    ${AE(3, 50, 38, 18, 20)}${AE(4, 50, 50, 14, 9)}${A(5, 'M34 22 Q26 14 30 8 Q36 14 38 20 Z M66 22 Q74 14 70 8 Q64 14 62 20 Z')}${EYE(43, 34)}${EYE(57, 34)}`,
  bear: `${AC(0, 30, 22, 9)}${AC(0, 70, 22, 9)}${AE(1, 50, 70, 24, 22)}${AE(2, 50, 72, 13, 12)}${AC(3, 50, 38, 20)}${AE(4, 50, 46, 9, 6)}
    ${EYE(43, 34)}${EYE(57, 34)}<ellipse cx="50" cy="43" rx="3" ry="2" fill="#2B3440"/>`,
};
