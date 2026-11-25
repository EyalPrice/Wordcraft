// The Wordcraft sticker logo (design 3ד): o = record, f = lamp, a small dog peeks over the c.
// Sized with em units, so set font-size on the container to scale it.
const T = (bg, rot, inner, big = false, extra = '') =>
  `<span class="lg-tile${big ? ' big' : ''}" style="background:${bg};transform:rotate(${rot}deg)">${inner}${extra}</span>`;

const RECORD = '<svg viewBox="0 0 70 70" aria-hidden="true"><circle cx="35" cy="35" r="33" fill="#0A2540"/><circle cx="35" cy="35" r="26" fill="none" stroke="#4FB3F0" stroke-width="1.5"/><circle cx="35" cy="35" r="19" fill="none" stroke="#4FB3F0" stroke-width="1.5"/><circle cx="35" cy="35" r="10" fill="#3DDBC4"/><circle cx="35" cy="35" r="2.5" fill="#fff"/></svg>';
const LAMP = '<svg viewBox="0 0 70 100" aria-hidden="true"><path d="M22 96 L22 34 Q22 10 46 10" fill="none" stroke="#fff" stroke-width="13" stroke-linecap="round"/><path d="M8 52 L36 52" stroke="#fff" stroke-width="12" stroke-linecap="round"/><path d="M36 14 L56 14 L64 36 L28 36 Z" fill="#A8F0E4"/><circle cx="46" cy="40" r="5" fill="#FFD54F"/><path d="M58 36 L58 54" stroke="#fff" stroke-width="2"/><circle cx="58" cy="57" r="3.5" fill="#fff"/></svg>';
const DOG = '<svg class="lg-dog" viewBox="0 0 48 36" aria-hidden="true"><ellipse cx="10" cy="17" rx="6" ry="10" fill="#B9884F" transform="rotate(20 10 17)"/><ellipse cx="38" cy="17" rx="6" ry="10" fill="#B9884F" transform="rotate(-20 38 17)"/><circle cx="24" cy="18" r="13" fill="#F2C98A"/><circle cx="19" cy="16" r="2" fill="#0A2540"/><circle cx="29" cy="16" r="2" fill="#0A2540"/><ellipse cx="24" cy="22" rx="3" ry="2.2" fill="#0A2540"/><path d="M21 26 Q24 28 27 26" fill="none" stroke="#0A2540" stroke-width="1.5" stroke-linecap="round"/><ellipse cx="15" cy="32" rx="5" ry="4" fill="#F2C98A"/><ellipse cx="33" cy="32" rx="5" ry="4" fill="#F2C98A"/></svg>';

export function logoHTML({ subtitle = true } = {}) {
  return `<div class="logo" role="img" aria-label="Wordcraft – יוצרים עם מילים באנגלית">
    <div class="lg-row" dir="ltr">
      ${T('#0B4F8A', -5, 'W')}
      ${T('#1279B8', 4, RECORD, true)}
      ${T('#0E8A96', -2, 'r')}
      ${T('#12855A', 3, 'd')}
      ${T('#0B4F8A', -4, 'c', false, DOG)}
      ${T('#1279B8', 2, 'r')}
      ${T('#0E8A96', -3, 'a')}
      ${T('#12855A', 5, LAMP, true)}
      ${T('#0B4F8A', -2, 't')}
    </div>
    ${subtitle ? '<p class="lg-sub" dir="rtl">יוצרים עם מילים באנגלית</p>' : ''}
  </div>`;
}
