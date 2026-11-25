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
  road: ['asphalt', 'dirt', 'checks'],
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
    id: 'dressup', he: 'דמות להלבשה', en: 'Dress-up',
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

// Places that come later. Shown with a lock on the place screen.
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

export const RANKS = [
  { points: 0, he: 'מתחילים', en: 'Starter' },
  { points: 60, he: 'סקרנים', en: 'Explorer', prize: 'parrot' },
  { points: 150, he: 'מעצבים', en: 'Designer', prize: 'crown' },
  { points: 280, he: 'יוצרים', en: 'Creator', prize: 'fountain' },
  { points: 450, he: 'אמנים', en: 'Artist', prize: 'unicorn' },
  { points: 700, he: 'מומחים', en: 'Expert', prize: 'rocket' },
  { points: 1000, he: 'אגדות', en: 'Legend' },
];

const inPlace = (it, placeId) => it.place === placeId || (Array.isArray(it.place) && it.place.includes(placeId)) || (it.place === '*' && placeId !== 'dressup');
export function itemsFor(placeId) { return ITEMS.filter((it) => inPlace(it, placeId)); }
export function catOf(it, placeId) {
  if (!Array.isArray(it.cat)) return it.cat;
  const i = Array.isArray(it.place) ? it.place.indexOf(placeId) : 0;
  return it.cat[Math.max(0, i)];
}
export const itemById = (id) => ITEMS.find((it) => it.id === id);
export const placeById = (id) => PLACES.find((p) => p.id === id);
