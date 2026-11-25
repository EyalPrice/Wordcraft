// Wordcraft content: places, items, colors, actions, ranks.
// To add an item: add an entry to ITEMS (and a drawing in art.js).

export const COLORS = [
  { en: 'red', he: 'אדום', hex: '#E9463F' },
  { en: 'orange', he: 'כתום', hex: '#FF9F3F' },
  { en: 'yellow', he: 'צהוב', hex: '#FFD54F' },
  { en: 'green', he: 'ירוק', hex: '#3FB36F' },
  { en: 'blue', he: 'כחול', hex: '#1279B8' },
  { en: 'turquoise', he: 'טורקיז', hex: '#3DDBC4' },
  { en: 'purple', he: 'סגול', hex: '#8E5CD9' },
  { en: 'pink', he: 'ורוד', hex: '#FF8FB8' },
  { en: 'brown', he: 'חום', hex: '#9A6338' },
  { en: 'black', he: 'שחור', hex: '#2A2F36' },
  { en: 'white', he: 'לבן', hex: '#FFFFFF' },
  { en: 'gray', he: 'אפור', hex: '#9AA7B4' },
];

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
      { id: 'wall', en: 'wall', he: 'קיר', color: '#CDEBF5' },
      { id: 'floor', en: 'floor', he: 'רצפה', color: '#C99A6B' },
    ],
    split: 68,
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
    surfaces: [{ id: 'wall', en: 'wall', he: 'קיר', color: '#E3F4FA' }],
    split: 100,
    cats: [
      { id: 'hair', he: 'שיער', en: 'Hair' },
      { id: 'tops', he: 'חולצות ושמלות', en: 'Tops & dresses' },
      { id: 'bottoms', he: 'מכנסיים וחצאיות', en: 'Pants & skirts' },
      { id: 'shoes', he: 'נעליים', en: 'Shoes' },
      { id: 'accessories', he: 'אביזרים', en: 'Accessories' },
    ],
  },
  {
    id: 'park', he: 'פארק', en: 'Park',
    surfaces: [
      { id: 'sky', en: 'sky', he: 'שמיים', color: '#A8E0F5' },
      { id: 'grass', en: 'grass', he: 'דשא', color: '#7CCB6E' },
    ],
    split: 62,
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
      { id: 'sky', en: 'sky', he: 'שמיים', color: '#BFE6F7' },
      { id: 'road', en: 'road', he: 'כביש', color: '#5B6B7A' },
    ],
    split: 58,
    cats: [
      { id: 'vehicles', he: 'כלי רכב', en: 'Vehicles' },
      { id: 'track', he: 'מסלול', en: 'Track' },
      { id: 'people', he: 'אנשים', en: 'People' },
      { id: 'special', he: 'מיוחדים', en: 'Special' },
    ],
  },
];

// w = default width in % of the scene. rare = locked until a rank prize.
export const ITEMS = [
  // bedroom
  { id: 'bed', en: 'bed', he: 'מיטה', place: 'bedroom', cat: 'furniture', art: ['bed'], color: '#1279B8', w: 36 },
  { id: 'chair', en: 'chair', he: 'כיסא', place: 'bedroom', cat: 'furniture', art: ['chair'], color: '#3DDBC4', w: 14 },
  { id: 'table', en: 'table', he: 'שולחן', place: 'bedroom', cat: 'furniture', art: ['table'], color: '#9A6338', w: 22 },
  { id: 'desk', en: 'desk', he: 'שולחן כתיבה', place: 'bedroom', cat: 'furniture', art: ['desk'], color: '#0E8A96', w: 26 },
  { id: 'wardrobe', en: 'wardrobe', he: 'ארון בגדים', place: 'bedroom', cat: 'furniture', art: ['wardrobe'], color: '#3FB36F', w: 22 },
  { id: 'shelf', en: 'shelf', he: 'מדף', place: 'bedroom', cat: 'furniture', art: ['shelf'], color: '#9A6338', w: 18 },
  { id: 'lamp', en: 'lamp', he: 'מנורה', place: 'bedroom', cat: 'lights', art: ['lamp_floor', 'lamp_desk', 'lamp_round'], color: '#3DDBC4', w: 14 },
  { id: 'window', en: 'window', he: 'חלון', place: 'bedroom', cat: 'decor', art: ['window'], color: '#FFFFFF', w: 20 },
  { id: 'curtain', en: 'curtain', he: 'וילון', place: 'bedroom', cat: 'decor', art: ['curtain'], color: '#3FB36F', w: 26 },
  { id: 'mirror', en: 'mirror', he: 'מראה', place: 'bedroom', cat: 'decor', art: ['mirror'], color: '#FFD54F', w: 12 },
  { id: 'picture', en: 'picture', he: 'תמונה', place: 'bedroom', cat: 'decor', art: ['picture'], color: '#1279B8', w: 14 },
  { id: 'clock', en: 'clock', he: 'שעון', place: 'bedroom', cat: 'decor', art: ['clock'], color: '#FF9F3F', w: 10 },
  { id: 'rug', en: 'rug', he: 'שטיח', place: 'bedroom', cat: 'decor', art: ['rug'], color: '#8E5CD9', w: 34 },
  { id: 'plant', en: 'plant', he: 'עציץ', place: 'bedroom', cat: 'decor', art: ['plant'], color: '#E9463F', w: 11 },
  { id: 'pillow', en: 'pillow', he: 'כרית', place: 'bedroom', cat: 'things', art: ['pillow'], color: '#FFD54F', w: 12 },
  { id: 'book', en: 'book', he: 'ספר', place: 'bedroom', cat: 'things', art: ['book'], color: '#E9463F', w: 10 },
  { id: 'radio', en: 'radio', he: 'רדיו', place: 'bedroom', cat: 'things', art: ['radio'], color: '#1279B8', w: 12 },
  { id: 'record_player', en: 'record player', he: 'פטיפון', place: 'bedroom', cat: 'things', art: ['record_player'], color: '#0E8A96', w: 16 },
  { id: 'guitar', en: 'guitar', he: 'גיטרה', place: 'bedroom', cat: 'things', art: ['guitar'], color: '#FF9F3F', w: 11 },
  { id: 'teddy', en: 'teddy bear', he: 'דובי', place: 'bedroom', cat: 'things', art: ['teddy'], color: '#C98A4B', w: 10 },
  { id: 'cat', en: 'cat', he: 'חתול', place: 'bedroom', cat: 'pets', art: ['cat'], color: '#FF9F3F', w: 12, rare: true },
  { id: 'fish', en: 'fish', he: 'דג', place: 'bedroom', cat: 'pets', art: ['fish'], color: '#FF9F3F', w: 12, rare: true },

  // park
  { id: 'tree', en: 'tree', he: 'עץ', place: 'park', cat: 'nature', art: ['tree'], color: '#3FB36F', w: 26 },
  { id: 'flower', en: 'flower', he: 'פרח', place: 'park', cat: 'nature', art: ['flower'], color: '#FF8FB8', w: 8 },
  { id: 'bush', en: 'bush', he: 'שיח', place: 'park', cat: 'nature', art: ['bush'], color: '#2F9A5B', w: 16 },
  { id: 'cloud', en: 'cloud', he: 'ענן', place: 'park', cat: 'nature', art: ['cloud'], color: '#FFFFFF', w: 18 },
  { id: 'sun', en: 'sun', he: 'שמש', place: 'park', cat: 'nature', art: ['sun'], color: '#FFD54F', w: 14 },
  { id: 'swing', en: 'swing', he: 'נדנדה', place: 'park', cat: 'play', art: ['swing'], color: '#E9463F', w: 22 },
  { id: 'slide', en: 'slide', he: 'מגלשה', place: 'park', cat: 'play', art: ['slide'], color: '#3DDBC4', w: 24 },
  { id: 'bench', en: 'bench', he: 'ספסל', place: 'park', cat: 'things', art: ['bench'], color: '#9A6338', w: 22 },
  { id: 'ball', en: 'ball', he: 'כדור', place: 'park', cat: 'things', art: ['ball'], color: '#E9463F', w: 7 },
  { id: 'kite', en: 'kite', he: 'עפיפון', place: 'park', cat: 'things', art: ['kite'], color: '#8E5CD9', w: 11 },
  { id: 'bicycle', en: 'bicycle', he: 'אופניים', place: 'park', cat: 'things', art: ['bicycle'], color: '#1279B8', w: 18 },
  { id: 'streetlight', en: 'streetlight', he: 'פנס רחוב', place: 'park', cat: 'things', art: ['streetlight'], color: '#2A2F36', w: 12 },
  { id: 'trash_can', en: 'trash can', he: 'פח', place: 'park', cat: 'things', art: ['trash_can'], color: '#3FB36F', w: 9 },
  { id: 'bird', en: 'bird', he: 'ציפור', place: 'park', cat: 'animals', art: ['bird'], color: '#1279B8', w: 9 },
  { id: 'butterfly', en: 'butterfly', he: 'פרפר', place: 'park', cat: 'animals', art: ['butterfly'], color: '#FF9F3F', w: 8 },
  { id: 'dog', en: 'dog', he: 'כלב', place: 'park', cat: 'animals', art: ['dog'], color: '#C98A4B', w: 13, rare: true },
  { id: 'fountain', en: 'fountain', he: 'מזרקה', place: 'park', cat: 'things', art: ['fountain'], color: '#9AA7B4', w: 24, rare: true },

  // race track
  { id: 'car', en: 'car', he: 'מכונית', place: 'track', cat: 'vehicles', art: ['race_car', 'city_car'], color: '#E9463F', w: 24 },
  { id: 'truck', en: 'truck', he: 'משאית', place: 'track', cat: 'vehicles', art: ['truck'], color: '#1279B8', w: 26 },
  { id: 'motorcycle', en: 'motorcycle', he: 'אופנוע', place: 'track', cat: 'vehicles', art: ['motorcycle'], color: '#3DDBC4', w: 18 },
  { id: 'flag', en: 'flag', he: 'דגל', place: 'track', cat: 'track', art: ['flag'], color: '#2A2F36', w: 14 },
  { id: 'cone', en: 'cone', he: 'קונוס', place: 'track', cat: 'track', art: ['cone'], color: '#FF9F3F', w: 7 },
  { id: 'tire', en: 'tire', he: 'צמיג', place: 'track', cat: 'track', art: ['tire'], color: '#9AA7B4', w: 9 },
  { id: 'traffic_light', en: 'traffic light', he: 'רמזור', place: 'track', cat: 'track', art: ['traffic_light'], color: '#2A2F36', w: 9 },
  { id: 'helmet', en: 'helmet', he: 'קסדה', place: 'track', cat: 'track', art: ['helmet'], color: '#FFD54F', w: 9 },
  { id: 'trophy', en: 'trophy', he: 'גביע', place: 'track', cat: 'special', art: ['trophy'], color: '#FFD54F', w: 10 },
  { id: 'rocket', en: 'rocket', he: 'טיל', place: 'track', cat: 'special', art: ['rocket'], color: '#E9463F', w: 14, rare: true },

  // people (bedroom, park, track)
  { id: 'girl', en: 'girl', he: 'ילדה', place: '*', cat: 'people', person: 'girl', color: '#3FB36F', w: 11 },
  { id: 'boy', en: 'boy', he: 'ילד', place: '*', cat: 'people', person: 'boy', color: '#FF9F3F', w: 11 },
  { id: 'baby', en: 'baby', he: 'תינוק', place: '*', cat: 'people', person: 'baby', color: '#FFD54F', w: 9 },
  { id: 'doctor', en: 'doctor', he: 'רופא/ה', place: '*', cat: 'people', person: 'doctor', color: '#FFFFFF', w: 11 },
  { id: 'chef', en: 'chef', he: 'שף', place: '*', cat: 'people', person: 'chef', color: '#FFFFFF', w: 11 },
  { id: 'police_officer', en: 'police officer', he: 'שוטר/ת', place: '*', cat: 'people', person: 'police_officer', color: '#1279B8', w: 11 },
  { id: 'firefighter', en: 'firefighter', he: 'כבאי/ת', place: '*', cat: 'people', person: 'firefighter', color: '#E9463F', w: 11 },
  { id: 'driver', en: 'driver', he: 'נהג/ת', place: 'track', cat: 'people', person: 'driver', color: '#E9463F', w: 11 },
  { id: 'fan', en: 'fan', he: 'אוהד/ת', place: 'track', cat: 'people', person: 'fan', color: '#3DDBC4', w: 11 },

  // dress-up
  { id: 'hair', en: 'hair', he: 'שיער', place: 'dressup', cat: 'hair', dress: ['hair_short', 'hair_long', 'hair_curly'], color: '#5E3B25' },
  { id: 'shirt', en: 'shirt', he: 'חולצה', place: 'dressup', cat: 'tops', dress: ['shirt'], color: '#3DDBC4' },
  { id: 'dress', en: 'dress', he: 'שמלה', place: 'dressup', cat: 'tops', dress: ['dress'], color: '#8E5CD9' },
  { id: 'jacket', en: 'jacket', he: 'מעיל', place: 'dressup', cat: 'tops', dress: ['jacket'], color: '#1279B8' },
  { id: 'pants', en: 'pants', he: 'מכנסיים', place: 'dressup', cat: 'bottoms', dress: ['pants'], color: '#2D4A6B' },
  { id: 'skirt', en: 'skirt', he: 'חצאית', place: 'dressup', cat: 'bottoms', dress: ['skirt'], color: '#FF9F3F' },
  { id: 'shoes', en: 'shoes', he: 'נעליים', place: 'dressup', cat: 'shoes', dress: ['shoes'], color: '#E9463F' },
  { id: 'boots', en: 'boots', he: 'מגפיים', place: 'dressup', cat: 'shoes', dress: ['boots'], color: '#9A6338' },
  { id: 'hat', en: 'hat', he: 'כובע', place: 'dressup', cat: 'accessories', dress: ['hat'], color: '#FFD54F' },
  { id: 'cap', en: 'cap', he: 'כובע מצחייה', place: 'dressup', cat: 'accessories', dress: ['cap'], color: '#E9463F' },
  { id: 'glasses', en: 'glasses', he: 'משקפיים', place: 'dressup', cat: 'accessories', dress: ['glasses'], color: '#2A2F36' },
  { id: 'scarf', en: 'scarf', he: 'צעיף', place: 'dressup', cat: 'accessories', dress: ['scarf'], color: '#3FB36F' },
  { id: 'bag', en: 'bag', he: 'תיק', place: 'dressup', cat: 'accessories', dress: ['bag'], color: '#9A6338' },
  { id: 'crown', en: 'crown', he: 'כתר', place: 'dressup', cat: 'accessories', dress: ['crown'], color: '#FFD54F', rare: true },
];

export const RANKS = [
  { points: 0, he: 'מתחילים', en: 'Starter' },
  { points: 60, he: 'סקרנים', en: 'Explorer', prize: 'cat' },
  { points: 150, he: 'מעצבים', en: 'Designer', prize: 'dog' },
  { points: 280, he: 'יוצרים', en: 'Creator', prize: 'crown' },
  { points: 450, he: 'אמנים', en: 'Artist', prize: 'fountain' },
  { points: 700, he: 'מומחים', en: 'Expert', prize: 'fish' },
  { points: 1000, he: 'אגדות', en: 'Legend', prize: 'rocket' },
];

export function itemsFor(placeId) {
  return ITEMS.filter((it) => it.place === placeId || (it.place === '*' && placeId !== 'dressup'));
}
export const itemById = (id) => ITEMS.find((it) => it.id === id);
export const placeById = (id) => PLACES.find((p) => p.id === id);
