// Wordcraft content: places, items, colors, textures, actions, ranks.
// To add an item: add an entry to ITEMS (and a drawing in art.js).

// 12 base colors. Each has light / dark shades; shade words are only asked at level 3.
const BASE = [
  { en: 'red', he: 'אדום', hex: '#E0453B' },
  { en: 'orange', he: 'כתום', hex: '#F08A2E' },
  { en: 'yellow', he: 'צהוב', hex: '#F2C230' },
  { en: 'green', he: 'ירוק', hex: '#3FA66A' },
  { en: 'turquoise', he: 'טורקיז', hex: '#2EC4B6' },
  { en: 'blue', he: 'כחול', hex: '#2F7BC0' },
  { en: 'purple', he: 'סגול', hex: '#8A5CC8' },
  { en: 'pink', he: 'ורוד', hex: '#EE7BAA' },
  { en: 'brown', he: 'חום', hex: '#9A6338' },
  { en: 'gray', he: 'אפור', hex: '#8E9AA6' },
  { en: 'black', he: 'שחור', hex: '#26292E' },
  { en: 'white', he: 'לבן', hex: '#F7F6F2' },
];
function mix(hex, amt) {
  const n = parseInt(hex.slice(1), 16);
  const f = (v) => Math.max(0, Math.min(255, Math.round(v + (amt / 100) * 255)));
  return '#' + ((1 << 24) | (f((n >> 16) & 255) << 16) | (f((n >> 8) & 255) << 8) | f(n & 255)).toString(16).slice(1);
}
// Palette rows: light, base, dark for each color (no "light white" / "dark black").
export const COLORS = [];
for (const b of BASE) {
  if (b.en !== 'white') COLORS.push({ base: b.en, en: (b.en === 'black' ? 'dark gray' : 'light ' + b.en), he: b.en === 'black' ? 'אפור כהה' : b.he + ' בהיר', hex: b.en === 'black' ? '#4A5058' : mix(b.hex, 22), shade: 'light' });
  COLORS.push({ base: b.en, en: b.en, he: b.he, hex: b.hex, shade: '' });
  if (b.en !== 'black') COLORS.push({ base: b.en, en: (b.en === 'white' ? 'light gray' : 'dark ' + b.en), he: b.en === 'white' ? 'אפור בהיר' : b.he + ' כהה', hex: b.en === 'white' ? '#D8DCE0' : mix(b.hex, -20), shade: 'dark' });
}
// "dark gray"/"light gray" rows belong to gray when the word is checked at low levels.
for (const c of COLORS) if (c.en === 'dark gray' || c.en === 'light gray') c.base = 'gray';

// Surface textures (walls, floors, grass, sky, road). Free to choose; colors need a sentence.
export const TEXTURES = {
  wall: ['plain', 'stripes', 'dots', 'bricks', 'wood', 'checks', 'flowers', 'waves'],
  floor: ['wood', 'tiles', 'checks', 'carpet', 'stone', 'plain'],
  sky: ['plain', 'sunset', 'night', 'clouds'],
  grass: ['plain', 'flowers', 'stripes', 'sand'],
  road: ['asphalt', 'dirt', 'checks', 'stone'],
  ground: ['asphalt', 'stone', 'dirt', 'plain', 'checks'],
  sand: ['sand', 'plain', 'stone'],
};
export const TEXTURE_NAMES = {
  plain: 'חלק', stripes: 'פסים', dots: 'נקודות', bricks: 'לבנים', wood: 'עץ', checks: 'משבצות', flowers: 'פרחים', waves: 'גלים',
  tiles: 'אריחים', carpet: 'שטיח מקיר לקיר', stone: 'אבן', sunset: 'שקיעה', night: 'לילה', clouds: 'עננים', sand: 'חול', asphalt: 'אספלט', dirt: 'עפר',
};

export const ACTIONS = [
  { en: 'sitting', he: 'יושב/ת', cls: 'act-sit' },
  { en: 'standing', he: 'עומד/ת', cls: '' },
  { en: 'dancing', he: 'רוקד/ת', cls: 'act-dance' },
  { en: 'jumping', he: 'קופץ/ת', cls: 'act-jump' },
  { en: 'sleeping', he: 'ישן/ה', cls: 'act-sleep' },
  { en: 'waving', he: 'מנופף/ת', cls: 'act-wave' },
];

export const FEELINGS = [
  { en: 'happy', he: 'שמח/ה' },
  { en: 'sad', he: 'עצוב/ה' },
  { en: 'surprised', he: 'מופתע/ת' },
  { en: 'angry', he: 'כועס/ת' },
  { en: 'sleepy', he: 'עייף/ה' },
];

export const PLACES = [
  {
    id: 'bedroom', he: 'חדר שינה', en: 'Bedroom',
    surfaces: [
      { id: 'wall', en: 'wall', he: 'קיר', color: '#CFE6EE', tex: 'plain' },
      { id: 'floor', en: 'floor', he: 'רצפה', color: '#C99A6B', tex: 'wood' },
    ],
    split: 66,
    cats: [
      { id: 'furniture', he: 'רהיטים', en: 'Furniture' },
      { id: 'lights', he: 'תאורה', en: 'Lights' },
      { id: 'decor', he: 'קישוטים', en: 'Decorations' },
      { id: 'things', he: 'חפצים', en: 'Things' },
      { id: 'people', he: 'אנשים', en: 'People' },
      { id: 'pets', he: 'חיות', en: 'Pets' },
    ],
  },
  {
    id: 'dressup', he: 'סטודיו דמויות', en: 'Character studio',
    surfaces: [{ id: 'wall', en: 'wall', he: 'קיר', color: '#E3F0F4', tex: 'plain' }],
    split: 100,
    cats: [
      { id: 'hair', he: 'שיער', en: 'Hair' },
      { id: 'tops', he: 'חולצות', en: 'Tops' },
      { id: 'outer', he: 'מעילים ושמלות', en: 'Coats & dresses' },
      { id: 'bottoms', he: 'מכנסיים וחצאיות', en: 'Pants & skirts' },
      { id: 'shoes', he: 'נעליים', en: 'Shoes' },
      { id: 'accessories', he: 'אביזרים', en: 'Accessories' },
    ],
  },
  {
    id: 'park', he: 'פארק', en: 'Park',
    surfaces: [
      { id: 'sky', en: 'sky', he: 'שמיים', color: '#A9DDF3', tex: 'plain' },
      { id: 'grass', en: 'grass', he: 'דשא', color: '#78BF6A', tex: 'plain' },
    ],
    split: 60,
    cats: [
      { id: 'nature', he: 'טבע', en: 'Nature' },
      { id: 'play', he: 'מתקנים', en: 'Playground' },
      { id: 'things', he: 'חפצים', en: 'Things' },
      { id: 'people', he: 'אנשים', en: 'People' },
      { id: 'animals', he: 'חיות', en: 'Animals' },
    ],
  },
  {
    id: 'track', he: 'מסלול מרוצים', en: 'Race track',
    surfaces: [
      { id: 'sky', en: 'sky', he: 'שמיים', color: '#BFE4F5', tex: 'plain' },
      { id: 'road', en: 'road', he: 'כביש', color: '#56636F', tex: 'asphalt' },
    ],
    split: 56,
    cats: [
      { id: 'vehicles', he: 'כלי רכב', en: 'Vehicles' },
      { id: 'track', he: 'מסלול', en: 'Track' },
      { id: 'people', he: 'אנשים', en: 'People' },
      { id: 'special', he: 'מיוחדים', en: 'Special' },
    ],
  },
];

// More worlds. Players unlock them by points (see RANKS); test mode opens everything.
const W = (id, he, en, surfaces, split, cats) => ({ id, he, en, surfaces, split, cats, locked: true });
const S = (id, en, he, color, tex) => ({ id, en, he, color, tex });
const C = (id, he, en) => ({ id, he, en });
PLACES.push(
  { id: 'coloring', he: 'עולם הצביעה לקטנים', en: 'Coloring for little kids', coloring: true, locked: false, surfaces: [], cats: [] },
  W('garden', 'גינה', 'Garden', [S('sky', 'sky', 'שמיים', '#B5E2F5', 'plain'), S('grass', 'grass', 'דשא', '#6FB85F', 'stripes')], 58,
    [C('plants', 'צמחים', 'Plants'), C('tools', 'כלים', 'Tools'), C('animals', 'חיות', 'Animals'), C('people', 'אנשים', 'People')]),
  W('kitchen', 'מטבח', 'Kitchen', [S('wall', 'wall', 'קיר', '#F4F2EC', 'tiles'), S('floor', 'floor', 'רצפה', '#9AA7B4', 'checks')], 64,
    [C('appliances', 'מכשירים', 'Appliances'), C('furniture', 'רהיטים', 'Furniture'), C('dishes', 'כלים', 'Dishes'), C('food', 'אוכל', 'Food'), C('people', 'אנשים', 'People')]),
  W('beach', 'חוף ים', 'Beach', [S('sky', 'sky', 'שמיים', '#9FD8F2', 'plain'), S('sand', 'sand', 'חול', '#E8D29A', 'sand')], 52,
    [C('beach', 'חוף', 'Beach'), C('sea', 'ים', 'Sea'), C('animals', 'חיות', 'Animals'), C('people', 'אנשים', 'People')]),
  W('street', 'רחוב', 'Street', [S('sky', 'sky', 'שמיים', '#B5E2F5', 'plain'), S('road', 'road', 'כביש', '#6E7A86', 'asphalt')], 60,
    [C('buildings', 'בניינים', 'Buildings'), C('signs', 'שלטים', 'Signs'), C('vehicles', 'כלי רכב', 'Vehicles'), C('people', 'אנשים', 'People')]),
  W('restaurant', 'מסעדה', 'Restaurant', [S('wall', 'wall', 'קיר', '#F2D9C4', 'stripes'), S('floor', 'floor', 'רצפה', '#B98653', 'wood')], 62,
    [C('furniture', 'רהיטים', 'Furniture'), C('food', 'אוכל', 'Food'), C('dishes', 'כלים', 'Dishes'), C('people', 'אנשים', 'People')]),
  W('classroom', 'כיתה', 'Classroom', [S('wall', 'wall', 'קיר', '#DDEFE0', 'plain'), S('floor', 'floor', 'רצפה', '#C99A6B', 'wood')], 64,
    [C('furniture', 'רהיטים', 'Furniture'), C('school', 'ציוד', 'School things'), C('people', 'אנשים', 'People')]),
  W('airport', 'שדה תעופה', 'Airport', [S('sky', 'sky', 'שמיים', '#A9DDF3', 'clouds'), S('road', 'runway', 'מסלול', '#5B6772', 'asphalt')], 56,
    [C('vehicles', 'כלי טיס ורכב', 'Vehicles'), C('things', 'חפצים', 'Things'), C('people', 'אנשים', 'People')]),
  W('forest', 'יער קסום', 'Magic forest', [S('sky', 'sky', 'שמיים', '#4E3F86', 'night'), S('grass', 'grass', 'דשא', '#3F8F56', 'flowers')], 56,
    [C('magic', 'קסם', 'Magic'), C('nature', 'טבע', 'Nature'), C('animals', 'חיות', 'Animals'), C('people', 'אנשים', 'People')]),
  W('graffiti', 'קיר גרפיטי', 'Graffiti wall', [S('wall', 'wall', 'קיר', '#B5574F', 'bricks'), S('ground', 'ground', 'רצפה', '#6E7A86', 'asphalt')], 78,
    [C('art', 'ציורים', 'Art'), C('words', 'מילים', 'Words'), C('tools', 'כלים', 'Tools'), C('people', 'אנשים', 'People')]),
  W('moon', 'הירח', 'The moon', [S('sky', 'sky', 'שמיים', '#101C3A', 'night'), S('ground', 'ground', 'קרקע', '#AEB6BF', 'stone')], 60,
    [C('space', 'חלל', 'Space'), C('vehicles', 'כלי רכב', 'Vehicles'), C('people', 'אנשים', 'People')]),
);

// (kept for reference: the old list of coming places)
export const FUTURE_PLACES = [
  { id: 'coloring', he: 'עולם הצביעה לקטנים', en: 'Coloring for little kids' },
  { id: 'kitchen', he: 'מטבח', en: 'Kitchen' },
  { id: 'graffiti', he: 'קיר גרפיטי', en: 'Graffiti wall' },
  { id: 'forest', he: 'יער קסום', en: 'Magic forest' },
  { id: 'moon', he: 'הירח', en: 'The moon' },
  { id: 'restaurant', he: 'מסעדה', en: 'Restaurant' },
  { id: 'street', he: 'רחוב', en: 'Street' },
  { id: 'classroom', he: 'כיתה', en: 'Classroom' },
  { id: 'beach', he: 'חוף ים', en: 'Beach' },
  { id: 'airport', he: 'שדה תעופה', en: 'Airport' },
  { id: 'garden', he: 'גינה', en: 'Garden' },
];

// w = default width in % of the scene. rare = locked until a rank prize.
// place can be one place id, a list of ids, or '*' (all scene places).
export const ITEMS = [
  // bedroom furniture
  { id: 'bed', en: 'bed', he: 'מיטה', place: 'bedroom', cat: 'furniture', art: ['bed_single', 'bed_double', 'bed_bunk'], color: '#2F7BC0', w: 36 },
  { id: 'chair', en: 'chair', he: 'כיסא', place: 'bedroom', cat: 'furniture', art: ['chair_wood', 'office_chair'], color: '#2EC4B6', w: 13 },
  { id: 'armchair', en: 'armchair', he: 'כורסה', place: 'bedroom', cat: 'furniture', art: ['armchair'], color: '#8A5CC8', w: 20 },
  { id: 'sofa', en: 'sofa', he: 'ספה', place: 'bedroom', cat: 'furniture', art: ['sofa'], color: '#3FA66A', w: 32 },
  { id: 'table', en: 'table', he: 'שולחן', place: 'bedroom', cat: 'furniture', art: ['table_wood', 'table_round'], color: '#B98653', w: 22 },
  { id: 'desk', en: 'desk', he: 'שולחן כתיבה', place: 'bedroom', cat: 'furniture', art: ['desk'], color: '#E9E4DA', w: 28 },
  { id: 'nightstand', en: 'nightstand', he: 'שידה', place: 'bedroom', cat: 'furniture', art: ['nightstand'], color: '#F7F6F2', w: 12 },
  { id: 'wardrobe', en: 'wardrobe', he: 'ארון בגדים', place: 'bedroom', cat: 'furniture', art: ['wardrobe', 'wardrobe_mirror'], color: '#EDE8DE', w: 22 },
  { id: 'shelf', en: 'shelf', he: 'מדף', place: 'bedroom', cat: 'furniture', art: ['shelf', 'shelf_wall'], color: '#B98653', w: 20 },
  // lights
  { id: 'lamp', en: 'lamp', he: 'מנורה', place: 'bedroom', cat: 'lights', art: ['lamp_floor', 'lamp_desk', 'lamp_globe', 'lamp_bedside'], color: '#2EC4B6', w: 13 },
  // decor
  { id: 'window', en: 'window', he: 'חלון', place: 'bedroom', cat: 'decor', art: ['window', 'window_tall'], color: '#F7F6F2', w: 20 },
  { id: 'curtain', en: 'curtain', he: 'וילון', place: 'bedroom', cat: 'decor', art: ['curtain', 'blinds'], color: '#3FA66A', w: 26 },
  { id: 'mirror', en: 'mirror', he: 'מראה', place: 'bedroom', cat: 'decor', art: ['mirror', 'mirror_round'], color: '#D8B25A', w: 12 },
  { id: 'picture', en: 'picture', he: 'תמונה', place: 'bedroom', cat: 'decor', art: ['picture', 'photos'], color: '#2B3440', w: 15 },
  { id: 'poster', en: 'poster', he: 'פוסטר', place: 'bedroom', cat: 'decor', art: ['poster'], color: '#EE7BAA', w: 12 },
  { id: 'clock', en: 'clock', he: 'שעון', place: 'bedroom', cat: 'decor', art: ['clock', 'alarm_clock'], color: '#F08A2E', w: 9 },
  { id: 'rug', en: 'rug', he: 'שטיח', place: 'bedroom', cat: 'decor', art: ['rug', 'rug_striped', 'rug_fluffy'], color: '#8A5CC8', w: 34 },
  { id: 'plant', en: 'plant', he: 'עציץ', place: 'bedroom', cat: 'decor', art: ['plant', 'cactus', 'plant_hanging'], color: '#E9E4DA', w: 11 },
  { id: 'vase', en: 'vase', he: 'אגרטל', place: 'bedroom', cat: 'decor', art: ['vase'], color: '#2F7BC0', w: 8 },
  // things
  { id: 'pillow', en: 'pillow', he: 'כרית', place: 'bedroom', cat: 'things', art: ['pillow', 'pillow_round'], color: '#F2C230', w: 12 },
  { id: 'book', en: 'book', he: 'ספר', place: 'bedroom', cat: 'things', art: ['book', 'book_open'], color: '#E0453B', w: 10 },
  { id: 'laptop', en: 'laptop', he: 'מחשב נייד', place: 'bedroom', cat: 'things', art: ['laptop'], color: '#8E9AA6', w: 12 },
  { id: 'headphones', en: 'headphones', he: 'אוזניות', place: 'bedroom', cat: 'things', art: ['headphones'], color: '#26292E', w: 9 },
  { id: 'radio', en: 'radio', he: 'רדיו', place: 'bedroom', cat: 'things', art: ['radio'], color: '#2F7BC0', w: 12 },
  { id: 'record_player', en: 'record player', he: 'פטיפון', place: 'bedroom', cat: 'things', art: ['record_player'], color: '#2EC4B6', w: 16 },
  { id: 'guitar', en: 'guitar', he: 'גיטרה', place: 'bedroom', cat: 'things', art: ['guitar', 'guitar_electric'], color: '#D98E43', w: 11 },
  { id: 'teddy', en: 'teddy bear', he: 'דובי', place: 'bedroom', cat: 'things', art: ['teddy'], color: '#C08A55', w: 10 },
  // pets
  { id: 'cat', en: 'cat', he: 'חתול', place: 'bedroom', cat: 'pets', art: ['cat_sit', 'cat_lie'], color: '#E59A4A', w: 12 },
  { id: 'dog', en: 'dog', he: 'כלב', place: ['bedroom', 'park'], cat: ['pets', 'animals'], art: ['dog_sit', 'dog_small'], color: '#C9965E', w: 13 },
  { id: 'rabbit', en: 'rabbit', he: 'ארנב', place: ['bedroom', 'park'], cat: ['pets', 'animals'], art: ['rabbit'], color: '#D9D2C8', w: 11 },
  { id: 'hamster', en: 'hamster', he: 'אוגר', place: 'bedroom', cat: 'pets', art: ['hamster'], color: '#E2A867', w: 8 },
  { id: 'turtle', en: 'turtle', he: 'צב', place: ['bedroom', 'park'], cat: ['pets', 'animals'], art: ['turtle'], color: '#6E8F4A', w: 12 },
  { id: 'fish', en: 'fish', he: 'דג', place: 'bedroom', cat: 'pets', art: ['aquarium'], color: '#F08A2E', w: 18 },
  { id: 'parrot', en: 'parrot', he: 'תוכי', place: ['bedroom', 'park'], cat: ['pets', 'animals'], art: ['parrot'], color: '#3FA66A', w: 9, rare: true },

  // park
  { id: 'tree', en: 'tree', he: 'עץ', place: 'park', cat: 'nature', art: ['tree', 'tree_pine', 'tree_palm'], color: '#4FA35E', w: 26 },
  { id: 'flower', en: 'flower', he: 'פרח', place: 'park', cat: 'nature', art: ['flower', 'daisy'], color: '#EE7BAA', w: 7 },
  { id: 'bush', en: 'bush', he: 'שיח', place: 'park', cat: 'nature', art: ['bush'], color: '#3F8F56', w: 16 },
  { id: 'cloud', en: 'cloud', he: 'ענן', place: 'park', cat: 'nature', art: ['cloud'], color: '#FFFFFF', w: 18 },
  { id: 'sun', en: 'sun', he: 'שמש', place: 'park', cat: 'nature', art: ['sun'], color: '#F7C948', w: 14 },
  { id: 'swing', en: 'swing', he: 'נדנדה', place: 'park', cat: 'play', art: ['swing'], color: '#E0453B', w: 22 },
  { id: 'slide', en: 'slide', he: 'מגלשה', place: 'park', cat: 'play', art: ['slide'], color: '#2EC4B6', w: 24 },
  { id: 'seesaw', en: 'seesaw', he: 'נדנדת שקל', place: 'park', cat: 'play', art: ['seesaw'], color: '#F2C230', w: 24 },
  { id: 'bench', en: 'bench', he: 'ספסל', place: 'park', cat: 'things', art: ['bench'], color: '#9A6338', w: 22 },
  { id: 'ball', en: 'ball', he: 'כדור', place: 'park', cat: 'things', art: ['ball'], color: '#E0453B', w: 6 },
  { id: 'kite', en: 'kite', he: 'עפיפון', place: 'park', cat: 'things', art: ['kite'], color: '#8A5CC8', w: 11 },
  { id: 'bicycle', en: 'bicycle', he: 'אופניים', place: 'park', cat: 'things', art: ['bicycle'], color: '#2F7BC0', w: 18 },
  { id: 'skateboard', en: 'skateboard', he: 'סקייטבורד', place: 'park', cat: 'things', art: ['skateboard'], color: '#E0453B', w: 12 },
  { id: 'streetlight', en: 'streetlight', he: 'פנס רחוב', place: 'park', cat: 'things', art: ['streetlight'], color: '#3A4652', w: 12 },
  { id: 'trash_can', en: 'trash can', he: 'פח', place: 'park', cat: 'things', art: ['trash_can'], color: '#3FA66A', w: 9 },
  { id: 'bird', en: 'bird', he: 'ציפור', place: 'park', cat: 'animals', art: ['bird'], color: '#2F7BC0', w: 8 },
  { id: 'butterfly', en: 'butterfly', he: 'פרפר', place: 'park', cat: 'animals', art: ['butterfly'], color: '#F08A2E', w: 7 },
  { id: 'duck', en: 'duck', he: 'ברווז', place: 'park', cat: 'animals', art: ['duck'], color: '#F2C230', w: 9 },
  { id: 'squirrel', en: 'squirrel', he: 'סנאי', place: 'park', cat: 'animals', art: ['squirrel'], color: '#B5672E', w: 8 },
  { id: 'horse', en: 'horse', he: 'סוס', place: 'park', cat: 'animals', art: ['horse'], color: '#8C5A34', w: 26 },
  { id: 'unicorn', en: 'unicorn', he: 'חד-קרן', place: 'park', cat: 'animals', art: ['unicorn'], color: '#B98BE0', w: 26, rare: true },
  { id: 'fountain', en: 'fountain', he: 'מזרקה', place: 'park', cat: 'things', art: ['fountain'], color: '#A8B4BF', w: 24, rare: true },

  // race track
  { id: 'car', en: 'car', he: 'מכונית', place: 'track', cat: 'vehicles', art: ['race_car', 'city_car', 'sports_car'], color: '#E0453B', w: 24 },
  { id: 'truck', en: 'truck', he: 'משאית', place: 'track', cat: 'vehicles', art: ['truck'], color: '#2F7BC0', w: 26 },
  { id: 'bus', en: 'bus', he: 'אוטובוס', place: 'track', cat: 'vehicles', art: ['bus'], color: '#F2C230', w: 28 },
  { id: 'motorcycle', en: 'motorcycle', he: 'אופנוע', place: 'track', cat: 'vehicles', art: ['motorcycle'], color: '#2EC4B6', w: 17 },
  { id: 'flag', en: 'flag', he: 'דגל', place: 'track', cat: 'track', art: ['flag'], color: '#26292E', w: 13 },
  { id: 'cone', en: 'cone', he: 'קונוס', place: 'track', cat: 'track', art: ['cone'], color: '#F08A2E', w: 6 },
  { id: 'tire', en: 'tire', he: 'צמיג', place: 'track', cat: 'track', art: ['tire'], color: '#8E9AA6', w: 10 },
  { id: 'traffic_light', en: 'traffic light', he: 'רמזור', place: 'track', cat: 'track', art: ['traffic_light'], color: '#2B3440', w: 8 },
  { id: 'helmet', en: 'helmet', he: 'קסדה', place: 'track', cat: 'track', art: ['helmet'], color: '#F2C230', w: 8 },
  { id: 'trophy', en: 'trophy', he: 'גביע', place: 'track', cat: 'special', art: ['trophy'], color: '#E6B43C', w: 9 },
  { id: 'rocket', en: 'rocket', he: 'טיל', place: 'track', cat: 'special', art: ['rocket'], color: '#E0453B', w: 14, rare: true },

  // people (bedroom, park, track)
  { id: 'girl', en: 'girl', he: 'נערה', place: '*', cat: 'people', person: 'girl', color: '#3FA66A', w: 10 },
  { id: 'boy', en: 'boy', he: 'נער', place: '*', cat: 'people', person: 'boy', color: '#F08A2E', w: 10 },
  { id: 'teenager', en: 'teenager', he: 'בן/בת נוער', place: '*', cat: 'people', person: 'teen', color: '#8A5CC8', w: 10 },
  { id: 'baby', en: 'baby', he: 'תינוק', place: '*', cat: 'people', person: 'baby', color: '#F2C230', w: 8 },
  { id: 'teacher', en: 'teacher', he: 'מורה', place: '*', cat: 'people', person: 'teacher', color: '#2F7BC0', w: 10 },
  { id: 'doctor', en: 'doctor', he: 'רופא/ה', place: '*', cat: 'people', person: 'doctor', color: '#2EC4B6', w: 10 },
  { id: 'chef', en: 'chef', he: 'שף', place: '*', cat: 'people', person: 'chef', color: '#E0453B', w: 10 },
  { id: 'police_officer', en: 'police officer', he: 'שוטר/ת', place: '*', cat: 'people', person: 'police_officer', color: '#2F5F9A', w: 10 },
  { id: 'firefighter', en: 'firefighter', he: 'כבאי/ת', place: '*', cat: 'people', person: 'firefighter', color: '#E0453B', w: 10 },
  { id: 'driver', en: 'driver', he: 'נהג/ת', place: 'track', cat: 'people', person: 'driver', color: '#E0453B', w: 10 },
  { id: 'fan', en: 'fan', he: 'אוהד/ת', place: 'track', cat: 'people', person: 'fan', color: '#2EC4B6', w: 10 },

  // dress-up: hair (slot), clothes (slots), accessories (free)
  { id: 'hair', en: 'hair', he: 'שיער', place: 'dressup', cat: 'hair', dress: ['hair_short', 'hair_side', 'hair_buzz', 'hair_long', 'hair_wavy', 'hair_bob', 'hair_ponytail', 'hair_bun', 'hair_curly', 'hair_afro', 'hair_braids', 'hair_mohawk'], color: '#5E3B25' },
  { id: 'shirt', en: 'shirt', he: 'חולצה', place: 'dressup', cat: 'tops', dress: ['tshirt', 'longsleeve', 'tank'], color: '#2EC4B6' },
  { id: 'hoodie', en: 'hoodie', he: 'קפוצ׳ון', place: 'dressup', cat: 'tops', dress: ['hoodie'], color: '#8E9AA6' },
  { id: 'jacket', en: 'jacket', he: 'מעיל', place: 'dressup', cat: 'outer', dress: ['jacket', 'puffer'], color: '#2F7BC0' },
  { id: 'dress', en: 'dress', he: 'שמלה', place: 'dressup', cat: 'outer', dress: ['dress', 'dress_long'], color: '#8A5CC8' },
  { id: 'jeans', en: 'jeans', he: 'ג׳ינס', place: 'dressup', cat: 'bottoms', dress: ['jeans'], color: '#3E5C8A' },
  { id: 'shorts', en: 'shorts', he: 'מכנסיים קצרים', place: 'dressup', cat: 'bottoms', dress: ['shorts'], color: '#B98653' },
  { id: 'pants', en: 'pants', he: 'מכנסיים', place: 'dressup', cat: 'bottoms', dress: ['sweatpants'], color: '#2B3440' },
  { id: 'skirt', en: 'skirt', he: 'חצאית', place: 'dressup', cat: 'bottoms', dress: ['skirt', 'skirt_long'], color: '#F08A2E' },
  { id: 'sneakers', en: 'sneakers', he: 'נעלי ספורט', place: 'dressup', cat: 'shoes', dress: ['sneakers'], color: '#F7F6F2' },
  { id: 'shoes', en: 'shoes', he: 'נעליים', place: 'dressup', cat: 'shoes', dress: ['shoes'], color: '#26292E' },
  { id: 'boots', en: 'boots', he: 'מגפיים', place: 'dressup', cat: 'shoes', dress: ['boots'], color: '#9A6338' },
  { id: 'scarf', en: 'scarf', he: 'צעיף', place: 'dressup', cat: 'accessories', dress: ['scarf'], color: '#3FA66A' },
  { id: 'hat', en: 'hat', he: 'כובע', place: 'dressup', cat: 'accessories', acc: ['beanie', 'sunhat'], color: '#F2C230' },
  { id: 'cap', en: 'cap', he: 'כובע מצחייה', place: 'dressup', cat: 'accessories', acc: ['cap'], color: '#E0453B' },
  { id: 'glasses', en: 'glasses', he: 'משקפיים', place: 'dressup', cat: 'accessories', acc: ['glasses'], color: '#26292E' },
  { id: 'sunglasses', en: 'sunglasses', he: 'משקפי שמש', place: 'dressup', cat: 'accessories', acc: ['sunglasses'], color: '#26292E' },
  { id: 'earrings', en: 'earrings', he: 'עגילים', place: 'dressup', cat: 'accessories', acc: ['earrings'], color: '#E6B43C' },
  { id: 'necklace', en: 'necklace', he: 'שרשרת', place: 'dressup', cat: 'accessories', acc: ['necklace'], color: '#E6B43C' },
  { id: 'watch', en: 'watch', he: 'שעון יד', place: 'dressup', cat: 'accessories', acc: ['watch'], color: '#26292E' },
  { id: 'bow', en: 'bow', he: 'פפיון', place: 'dressup', cat: 'accessories', acc: ['bow'], color: '#E0453B' },
  { id: 'bag', en: 'bag', he: 'תיק', place: 'dressup', cat: 'accessories', acc: ['bag', 'backpack'], color: '#9A6338' },
  { id: 'dress_headphones', en: 'headphones', he: 'אוזניות', place: 'dressup', cat: 'accessories', acc: ['headphones'], color: '#2EC4B6' },
  { id: 'crown', en: 'crown', he: 'כתר', place: 'dressup', cat: 'accessories', acc: ['crown'], color: '#E6B43C', rare: true },
];


// ---------- more items (feedback round 2) ----------
const IT = (id, en, he, place, cat, art, color, w, extra = {}) => ({ id, en, he, place, cat, art, color, w, ...extra });
ITEMS.push(
  // bedroom extras
  IT('tv', 'TV', 'טלוויזיה', 'bedroom', 'things', ['tv'], '#2B3440', 26),
  IT('computer', 'computer', 'מחשב', ['bedroom', 'classroom'], ['things', 'school'], ['computer'], '#E2E7EC', 18),
  IT('phone', 'phone', 'טלפון', 'bedroom', 'things', ['phone'], '#2F7BC0', 6),
  IT('toy_box', 'toy box', 'ארגז צעצועים', 'bedroom', 'things', ['toy_box'], '#8A5CC8', 20),
  IT('beanbag', 'beanbag', 'פוף', 'bedroom', 'furniture', ['beanbag'], '#F08A2E', 18),
  IT('basket', 'basket', 'סל', ['bedroom', 'kitchen'], ['things', 'dishes'], ['basket'], '#C08A55', 12),
  IT('candle', 'candle', 'נר', ['bedroom', 'restaurant'], ['lights', 'furniture'], ['candle'], '#F7F6F2', 5),
  // park extras
  IT('picnic_table', 'picnic table', 'שולחן פיקניק', 'park', 'things', ['picnic_table'], '#9A6338', 30),
  IT('sandbox', 'sandbox', 'ארגז חול', 'park', 'play', ['sandbox'], '#B98653', 30),
  IT('balloon', 'balloon', 'בלון', ['park', 'restaurant'], ['things', 'furniture'], ['balloon'], '#E0453B', 8),
  IT('ice_cream_cart', 'ice cream cart', 'עגלת גלידה', 'park', 'things', ['ice_cream_cart'], '#2EC4B6', 22),
  // track extras
  IT('grandstand', 'grandstand', 'יציע', 'track', 'track', ['grandstand'], '#2F7BC0', 44),
  IT('podium', 'podium', 'פודיום', 'track', 'special', ['podium'], '#E2E7EC', 22),
  IT('fuel_pump', 'fuel pump', 'משאבת דלק', 'track', 'track', ['fuel_pump'], '#E0453B', 10),
  IT('garage', 'garage', 'מוסך', 'track', 'track', ['garage'], '#E9E4DA', 30),
  // garden
  IT('sunflower', 'sunflower', 'חמנייה', 'garden', 'plants', ['sunflower'], '#F2C230', 10),
  IT('tulip', 'tulip', 'צבעוני', 'garden', 'plants', ['tulip'], '#E0453B', 6),
  IT('garden_flower', 'flower', 'פרח', 'garden', 'plants', ['daisy', 'flower'], '#F7F6F2', 6),
  IT('garden_tree', 'tree', 'עץ', 'garden', 'plants', ['tree', 'tree_pine'], '#4FA35E', 26),
  IT('garden_bush', 'bush', 'שיח', 'garden', 'plants', ['bush'], '#3F8F56', 16),
  IT('carrot', 'carrot', 'גזר', 'garden', 'plants', ['carrot'], '#F08A2E', 7),
  IT('pumpkin', 'pumpkin', 'דלעת', 'garden', 'plants', ['pumpkin'], '#F08A2E', 14),
  IT('tomato', 'tomato', 'עגבנייה', 'garden', 'plants', ['tomato_plant'], '#E0453B', 12),
  IT('watering_can', 'watering can', 'משפך', 'garden', 'tools', ['watering_can'], '#3FA66A', 12),
  IT('shovel', 'shovel', 'את חפירה', 'garden', 'tools', ['shovel'], '#8E9AA6', 8),
  IT('wheelbarrow', 'wheelbarrow', 'מריצה', 'garden', 'tools', ['wheelbarrow'], '#E0453B', 22),
  IT('birdhouse', 'birdhouse', 'בית ציפורים', 'garden', 'tools', ['birdhouse'], '#2EC4B6', 10),
  IT('fence', 'fence', 'גדר', 'garden', 'tools', ['fence'], '#F7F6F2', 30),
  IT('gnome', 'gnome', 'גמד גינה', 'garden', 'tools', ['gnome'], '#E0453B', 8),
  IT('bee', 'bee', 'דבורה', 'garden', 'animals', ['bee'], '#F2C230', 6),
  IT('ladybug', 'ladybug', 'פרת משה רבנו', 'garden', 'animals', ['ladybug'], '#E0453B', 6),
  IT('snail', 'snail', 'חילזון', 'garden', 'animals', ['snail'], '#C08A55', 9),
  IT('garden_butterfly', 'butterfly', 'פרפר', 'garden', 'animals', ['butterfly'], '#8A5CC8', 7),
  IT('garden_bird', 'bird', 'ציפור', 'garden', 'animals', ['bird'], '#E0453B', 8),
  // kitchen
  IT('fridge', 'fridge', 'מקרר', 'kitchen', 'appliances', ['fridge'], '#E2E7EC', 22),
  IT('stove', 'stove', 'כיריים', 'kitchen', 'appliances', ['stove'], '#F7F6F2', 24),
  IT('sink', 'sink', 'כיור', 'kitchen', 'appliances', ['sink'], '#2EC4B6', 26),
  IT('microwave', 'microwave', 'מיקרוגל', 'kitchen', 'appliances', ['microwave'], '#8E9AA6', 16),
  IT('kettle', 'kettle', 'קומקום', 'kitchen', 'appliances', ['kettle'], '#E0453B', 9),
  IT('toaster', 'toaster', 'טוסטר', 'kitchen', 'appliances', ['toaster'], '#B7C3CE', 11),
  IT('cabinet', 'cabinet', 'ארון מטבח', 'kitchen', 'furniture', ['cabinet'], '#3FA66A', 30),
  IT('kitchen_table', 'table', 'שולחן', ['kitchen', 'restaurant'], 'furniture', ['table_wood', 'table_round'], '#B98653', 24),
  IT('kitchen_chair', 'chair', 'כיסא', ['kitchen', 'restaurant', 'classroom'], 'furniture', ['chair_wood'], '#2EC4B6', 12),
  IT('pot', 'pot', 'סיר', 'kitchen', 'dishes', ['pot'], '#8E9AA6', 12),
  IT('pan', 'pan', 'מחבת', 'kitchen', 'dishes', ['pan'], '#2B3440', 14),
  IT('plate', 'plate', 'צלחת', ['kitchen', 'restaurant'], 'dishes', ['plate'], '#F7F6F2', 10),
  IT('cup', 'cup', 'כוס', ['kitchen', 'restaurant'], 'dishes', ['cup'], '#2F7BC0', 7),
  IT('bowl', 'bowl', 'קערה', 'kitchen', 'dishes', ['bowl'], '#F7F6F2', 11),
  IT('apple', 'apple', 'תפוח', ['kitchen', 'classroom'], ['food', 'school'], ['apple'], '#E0453B', 6),
  IT('banana', 'banana', 'בננה', 'kitchen', 'food', ['banana'], '#F2C230', 8),
  IT('bread', 'bread', 'לחם', 'kitchen', 'food', ['bread'], '#D9A65B', 10),
  IT('cake', 'cake', 'עוגה', ['kitchen', 'restaurant'], 'food', ['cake'], '#EE7BAA', 12),
  // beach
  IT('beach_umbrella', 'umbrella', 'שמשייה', 'beach', 'beach', ['beach_umbrella'], '#E0453B', 24),
  IT('towel', 'towel', 'מגבת', 'beach', 'beach', ['towel'], '#2F7BC0', 24),
  IT('sandcastle', 'sandcastle', 'ארמון חול', 'beach', 'beach', ['sandcastle'], '#E2C27E', 22),
  IT('sand_bucket', 'bucket', 'דלי', 'beach', 'beach', ['sand_bucket'], '#2EC4B6', 10),
  IT('beach_ball', 'ball', 'כדור', 'beach', 'beach', ['ball'], '#F2C230', 7),
  IT('palm_tree', 'palm tree', 'עץ דקל', 'beach', 'beach', ['tree_palm'], '#3FA66A', 24),
  IT('surfboard', 'surfboard', 'גלשן', 'beach', 'sea', ['surfboard'], '#2EC4B6', 8),
  IT('boat', 'boat', 'סירה', 'beach', 'sea', ['boat'], '#E0453B', 24),
  IT('sea', 'sea', 'ים', 'beach', 'sea', ['sea'], '#2F9BD0', 60),
  IT('shell', 'shell', 'צדף', 'beach', 'animals', ['shell'], '#F7B9B0', 6),
  IT('starfish', 'starfish', 'כוכב ים', 'beach', 'animals', ['starfish'], '#F08A2E', 7),
  IT('crab', 'crab', 'סרטן', 'beach', 'animals', ['crab'], '#E0453B', 9),
  IT('beach_fish', 'fish', 'דג', 'beach', 'animals', ['aquarium'], '#F08A2E', 14),
  // street
  IT('house', 'house', 'בית', 'street', 'buildings', ['house'], '#F2D9C4', 30),
  IT('shop', 'shop', 'חנות', 'street', 'buildings', ['shop'], '#2EC4B6', 30),
  IT('building', 'building', 'בניין', 'street', 'buildings', ['building'], '#8E9AA6', 26),
  IT('mailbox', 'mailbox', 'תיבת דואר', 'street', 'signs', ['mailbox'], '#2F7BC0', 8),
  IT('stop_sign', 'stop sign', 'תמרור עצור', 'street', 'signs', ['stop_sign'], '#E0453B', 8),
  IT('fire_hydrant', 'fire hydrant', 'ברז כיבוי', 'street', 'signs', ['fire_hydrant'], '#E0453B', 7),
  IT('bus_stop', 'bus stop', 'תחנת אוטובוס', 'street', 'signs', ['bus_stop'], '#2F7BC0', 30),
  IT('street_light', 'streetlight', 'פנס רחוב', 'street', 'signs', ['streetlight'], '#3A4652', 10),
  IT('street_traffic_light', 'traffic light', 'רמזור', 'street', 'signs', ['traffic_light'], '#2B3440', 7),
  IT('street_car', 'car', 'מכונית', 'street', 'vehicles', ['city_car', 'sports_car'], '#2F7BC0', 22),
  IT('street_bus', 'bus', 'אוטובוס', 'street', 'vehicles', ['bus'], '#F2C230', 26),
  IT('street_bike', 'bicycle', 'אופניים', 'street', 'vehicles', ['bicycle'], '#E0453B', 16),
  IT('street_tree', 'tree', 'עץ', 'street', 'buildings', ['tree'], '#4FA35E', 20),
  IT('street_bench', 'bench', 'ספסל', 'street', 'signs', ['bench'], '#3A4652', 20),
  // restaurant
  IT('menu', 'menu', 'תפריט', 'restaurant', 'furniture', ['menu'], '#2B3440', 12),
  IT('sign_open', 'sign', 'שלט', 'restaurant', 'furniture', ['sign_open'], '#E0453B', 18),
  IT('pizza', 'pizza', 'פיצה', 'restaurant', 'food', ['pizza'], '#E2B84A', 14),
  IT('burger', 'burger', 'המבורגר', 'restaurant', 'food', ['burger'], '#7A4A2A', 10),
  IT('ice_cream', 'ice cream', 'גלידה', 'restaurant', 'food', ['ice_cream'], '#F7B9D0', 6),
  IT('salad', 'salad', 'סלט', 'restaurant', 'food', ['salad'], '#F7F6F2', 11),
  IT('juice', 'juice', 'מיץ', 'restaurant', 'food', ['juice'], '#F08A2E', 6),
  IT('restaurant_plant', 'plant', 'עציץ', 'restaurant', 'furniture', ['plant'], '#E9E4DA', 10),
  // classroom
  IT('blackboard', 'blackboard', 'לוח', 'classroom', 'furniture', ['blackboard'], '#2F6B4F', 40),
  IT('school_desk', 'desk', 'שולחן', 'classroom', 'furniture', ['school_desk'], '#B98653', 22),
  IT('globe', 'globe', 'גלובוס', 'classroom', 'school', ['globe'], '#3FA66A', 10),
  IT('pencil', 'pencil', 'עיפרון', 'classroom', 'school', ['pencil'], '#F2C230', 8),
  IT('ruler', 'ruler', 'סרגל', 'classroom', 'school', ['ruler'], '#2EC4B6', 12),
  IT('scissors', 'scissors', 'מספריים', 'classroom', 'school', ['scissors'], '#E0453B', 8),
  IT('crayons', 'crayons', 'צבעים', 'classroom', 'school', ['crayons'], '#2F7BC0', 10),
  IT('map', 'map', 'מפה', 'classroom', 'school', ['map'], '#3FA66A', 22),
  IT('class_book', 'book', 'ספר', 'classroom', 'school', ['book', 'book_open'], '#E0453B', 9),
  IT('class_clock', 'clock', 'שעון', 'classroom', 'furniture', ['clock'], '#F7F6F2', 8),
  // airport
  IT('airplane', 'airplane', 'מטוס', 'airport', 'vehicles', ['airplane'], '#2F7BC0', 44),
  IT('helicopter', 'helicopter', 'מסוק', 'airport', 'vehicles', ['helicopter'], '#E0453B', 24),
  IT('airport_truck', 'truck', 'משאית', 'airport', 'vehicles', ['truck'], '#F2C230', 22),
  IT('control_tower', 'control tower', 'מגדל פיקוח', 'airport', 'things', ['control_tower'], '#E2E7EC', 18),
  IT('suitcase', 'suitcase', 'מזוודה', 'airport', 'things', ['suitcase'], '#8A5CC8', 9),
  IT('windsock', 'windsock', 'שק רוח', 'airport', 'things', ['windsock'], '#F08A2E', 14),
  IT('airport_cone', 'cone', 'קונוס', 'airport', 'things', ['cone'], '#F08A2E', 6),
  // magic forest
  IT('mushroom', 'mushroom', 'פטרייה', 'forest', 'magic', ['mushroom'], '#E0453B', 12),
  IT('castle', 'castle', 'טירה', 'forest', 'magic', ['castle'], '#B7C3CE', 40),
  IT('wand', 'wand', 'שרביט', 'forest', 'magic', ['wand'], '#F2C230', 10),
  IT('crystal', 'crystal', 'קריסטל', 'forest', 'magic', ['crystal'], '#8A5CC8', 12),
  IT('fairy_house', 'fairy house', 'בית פיות', 'forest', 'magic', ['fairy_house'], '#8A5CC8', 18),
  IT('rainbow', 'rainbow', 'קשת', ['forest', 'graffiti'], ['magic', 'art'], ['rainbow'], '#FFFFFF', 36),
  IT('forest_tree', 'tree', 'עץ', 'forest', 'nature', ['tree', 'tree_pine'], '#2F7D4A', 26),
  IT('forest_flower', 'flower', 'פרח', 'forest', 'nature', ['flower', 'daisy'], '#2EC4B6', 7),
  IT('owl', 'owl', 'ינשוף', 'forest', 'animals', ['owl'], '#9A6338', 10),
  IT('fox', 'fox', 'שועל', 'forest', 'animals', ['fox'], '#F08A2E', 14),
  IT('deer', 'deer', 'אייל', 'forest', 'animals', ['deer'], '#B5784A', 18),
  IT('forest_rabbit', 'rabbit', 'ארנב', 'forest', 'animals', ['rabbit'], '#D9D2C8', 10),
  IT('dragon', 'dragon', 'דרקון', 'forest', 'animals', ['dragon'], '#3FA66A', 26, { rare: true }),
  IT('forest_unicorn', 'unicorn', 'חד-קרן', 'forest', 'animals', ['unicorn'], '#B98BE0', 24),
  // graffiti wall
  IT('spray_can', 'spray can', 'ספריי', 'graffiti', 'tools', ['spray_can'], '#2EC4B6', 8),
  IT('ladder', 'ladder', 'סולם', 'graffiti', 'tools', ['ladder'], '#B7C3CE', 14),
  IT('paint_bucket', 'paint', 'צבע', 'graffiti', 'tools', ['paint_bucket'], '#8A5CC8', 10),
  IT('star', 'star', 'כוכב', ['graffiti', 'moon'], ['art', 'space'], ['star'], '#F2C230', 12),
  IT('heart', 'heart', 'לב', 'graffiti', 'art', ['heart'], '#E0453B', 12),
  IT('lightning', 'lightning', 'ברק', 'graffiti', 'art', ['lightning'], '#F2C230', 12),
  IT('arrow', 'arrow', 'חץ', 'graffiti', 'art', ['arrow'], '#2EC4B6', 18),
  IT('smiley', 'smiley', 'סמיילי', 'graffiti', 'art', ['smiley'], '#F2C230', 12),
  IT('splash', 'splash', 'כתם', 'graffiti', 'art', ['splash'], '#8A5CC8', 16),
  IT('crown_sign', 'crown', 'כתר', 'graffiti', 'art', ['crown_sign'], '#E6B43C', 16),
  IT('tag_wow', 'wow', 'וואו', 'graffiti', 'words', ['tag_wow'], '#EE7BAA', 26),
  IT('tag_hi', 'hi', 'היי', 'graffiti', 'words', ['tag_hi'], '#2F7BC0', 20),
  IT('tag_cool', 'cool', 'מגניב', 'graffiti', 'words', ['tag_cool'], '#3FA66A', 26),
  // moon
  IT('planet', 'planet', 'כוכב לכת', 'moon', 'space', ['planet'], '#E59A4A', 18),
  IT('earth', 'Earth', 'כדור הארץ', 'moon', 'space', ['earth'], '#3FA66A', 18),
  IT('satellite', 'satellite', 'לוויין', 'moon', 'space', ['satellite'], '#E2E7EC', 20),
  IT('shooting_star', 'shooting star', 'כוכב נופל', 'moon', 'space', ['shooting_star'], '#F2C230', 16),
  IT('crater', 'crater', 'מכתש', 'moon', 'space', ['crater'], '#AEB6BF', 26),
  IT('alien', 'alien', 'חייזר', 'moon', 'space', ['alien'], '#56B870', 10),
  IT('moon_rocket', 'rocket', 'טיל', 'moon', 'vehicles', ['rocket'], '#2F7BC0', 16),
  IT('moon_rover', 'moon rover', 'רכב ירח', 'moon', 'vehicles', ['moon_rover'], '#E2E7EC', 22),
  IT('moon_flag', 'flag', 'דגל', 'moon', 'space', ['flag'], '#2F7BC0', 12),
  IT('ufo', 'UFO', 'עב"ם', 'moon', 'vehicles', ['ufo'], '#8A5CC8', 22, { rare: true }),
  // people for the new worlds
  IT('waiter', 'waiter', 'מלצר/ית', 'restaurant', 'people', null, '#E0453B', 10, { person: 'waiter' }),
  IT('student', 'student', 'תלמיד/ה', 'classroom', 'people', null, '#2F7BC0', 10, { person: 'student' }),
  IT('astronaut', 'astronaut', 'אסטרונאוט/ית', 'moon', 'people', null, '#2F7BC0', 11, { person: 'astronaut' }),
  IT('pilot', 'pilot', 'טייס/ת', 'airport', 'people', null, '#1C2430', 10, { person: 'pilot' }),
  IT('lifeguard', 'lifeguard', 'מציל/ה', 'beach', 'people', null, '#E0453B', 10, { person: 'lifeguard' }),
  IT('gardener', 'gardener', 'גנן/ית', 'garden', 'people', null, '#3FA66A', 10, { person: 'gardener' }),
  IT('wizard', 'wizard', 'קוסם/ת', 'forest', 'people', null, '#4E3F86', 11, { person: 'wizard' }),
  IT('shopkeeper', 'shopkeeper', 'מוכר/ת', 'street', 'people', null, '#2EC4B6', 10, { person: 'shopkeeper' }),
  IT('artist', 'artist', 'אמן/ית', 'graffiti', 'people', null, '#F08A2E', 10, { person: 'teen' }),
  // dress-up extras
  { id: 'sweater', en: 'sweater', he: 'סוודר', place: 'dressup', cat: 'tops', dress: ['sweater'], color: '#E0453B' },
  { id: 'coat', en: 'coat', he: 'מעיל ארוך', place: 'dressup', cat: 'outer', dress: ['coat_long'], color: '#9A6338' },
  { id: 'overalls', en: 'overalls', he: 'אוברול', place: 'dressup', cat: 'outer', dress: ['overalls'], color: '#3E5C8A' },
  { id: 'sandals', en: 'sandals', he: 'סנדלים', place: 'dressup', cat: 'shoes', dress: ['sandals'], color: '#9A6338' },
  { id: 'bracelet', en: 'bracelet', he: 'צמיד', place: 'dressup', cat: 'accessories', acc: ['bracelet'], color: '#E6B43C' },
  { id: 'hairclip', en: 'hair clip', he: 'סיכת שיער', place: 'dressup', cat: 'accessories', acc: ['hairclip'], color: '#EE7BAA' },
  { id: 'wings', en: 'wings', he: 'כנפיים', place: 'dressup', cat: 'accessories', acc: ['wings'], color: '#B5E2F5', rare: true },
);

// Ranks: every rank gives a sticker, and many give a special item and/or open a new world.
export const RANKS = [
  { points: 0, he: 'מתחילים', en: 'Starter', icon: 'seed', color: '#3FA66A' },
  { points: 40, he: 'סקרנים', en: 'Explorer', icon: 'magnifier', color: '#2EC4B6' },
  { points: 90, he: 'צבעונים', en: 'Colorful', icon: 'brush', color: '#F08A2E', world: 'garden', prize: 'parrot' },
  { points: 150, he: 'מעצבים', en: 'Designer', icon: 'star', color: '#2F7BC0', world: 'kitchen', prize: 'crown' },
  { points: 220, he: 'שוחים', en: 'Swimmer', icon: 'wave', color: '#2F9BD0', world: 'beach', prize: 'fountain' },
  { points: 300, he: 'עירוניים', en: 'City kid', icon: 'house', color: '#8E9AA6', world: 'street', prize: 'wings' },
  { points: 390, he: 'שפים', en: 'Chef', icon: 'heart', color: '#E0453B', world: 'restaurant', prize: 'unicorn' },
  { points: 490, he: 'חכמים', en: 'Smart', icon: 'book', color: '#3FA66A', world: 'classroom' },
  { points: 600, he: 'טייסים', en: 'Pilot', icon: 'plane', color: '#5A7BD8', world: 'airport', prize: 'rocket' },
  { points: 720, he: 'קוסמים', en: 'Wizard', icon: 'wand', color: '#8A5CC8', world: 'forest', prize: 'dragon' },
  { points: 850, he: 'אמנים', en: 'Artist', icon: 'spray', color: '#EE7BAA', world: 'graffiti' },
  { points: 1000, he: 'אסטרונאוטים', en: 'Astronaut', icon: 'rocket', color: '#26292E', world: 'moon', prize: 'ufo' },
  { points: 1200, he: 'מומחים', en: 'Expert', icon: 'trophy', color: '#E6B43C' },
  { points: 1450, he: 'כוכבים', en: 'Superstar', icon: 'star', color: '#F2C230' },
  { points: 1750, he: 'אגדות', en: 'Legend', icon: 'crown', color: '#E6B43C' },
];

const inPlace = (it, placeId) => it.place === placeId || (Array.isArray(it.place) && it.place.includes(placeId)) || (it.place === '*' && !['dressup', 'coloring', 'moon'].includes(placeId));
export function itemsFor(placeId) { return ITEMS.filter((it) => inPlace(it, placeId)); }
export function catOf(it, placeId) {
  if (!Array.isArray(it.cat)) return it.cat;
  const i = Array.isArray(it.place) ? it.place.indexOf(placeId) : 0;
  return it.cat[Math.min(it.cat.length - 1, Math.max(0, i))];
}
export const itemById = (id) => ITEMS.find((it) => it.id === id);
export const placeById = (id) => PLACES.find((p) => p.id === id);
export const worldRank = (id) => RANKS.findIndex((r) => r.world === id);
