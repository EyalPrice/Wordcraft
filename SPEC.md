# Wordcraft – Product Specification

*Version 0.4 – feedback round 2 applied (character studio, all 15 worlds built, prize wall, many more items). Stored in the GitHub repo (EyalPrice/Wordcraft) as SPEC.md and updated with each release.*

## 1. Overview

Wordcraft (Hebrew subtitle: "יוצרים עם מילים באנגלית") is a browser game for learning English by designing places. The player starts with an empty scene and fills it with furniture, objects, people and decorations. Every item has to be earned by completing a short English task, so the player learns the words for exactly the things they care about. Design comes first; learning happens along the way.

## 2. Goals

- Make learning English feel like a creative game, not homework.
- Teach vocabulary first (item names), then full sentences (describing, coloring and placing items, giving people actions).
- Keep players coming back through creativity, personal style, surprises and steady progress.
- Work for all ages, from kindergarten to adults, with teens as the main audience.

## 3. Target audience

- Primary: Hebrew-speaking teens learning English.
- Secondary: anyone from young children to adults.
- Tone: modern, fun, not childish and not old-fashioned.
- Gender-inclusive: no "blue for boys, pink for girls", no separate worlds or items by gender, non-binary friendly. Any character can wear any clothing (for example, a boy character in a dress is fine).

## 4. Platform and hosting

- A web app played in a browser (e.g. Chrome) on computer or phone.
- Hosted on GitHub Pages from the repo EyalPrice/Wordcraft.
- An installable Android app is a far-future option, not planned for now.
- No sign-up, no login, no email. Open the site and play.
- Anyone with the link can play.
- Works offline by default after loading. When online, speech checking may be better (browser speech recognition).

## 5. Core gameplay loop

1. The player picks an item to add (e.g. a table).
2. The game gives a task that teaches the item's English word.
3. On success, the item is placed in the scene (items are placed, not bought).
4. To change an item (e.g. make the table red), the player must say or type a full English sentence, such as "The table is red".
5. Sentences can be both spoken and typed.
6. Task types vary each time to keep it fresh.

### Task types (first version, chosen by Claude, the team adjusts later)

| Task | What the player does | Level |
| --- | --- | --- |
| Pick the word | Sees the item and picks its English word from 2–4 options | 1+ |
| Unscramble | Puts mixed-up letters in order; a speaker button plays the word (only in this task) | 1+ |
| Listen and type | Hears the word and types it | 2+ |
| Say it | Says the word aloud (speech recognition; typing if the browser can't listen) | 2+ |
| Sentence | Says or types a full sentence to change an item, e.g. "The lamp is blue." | all |

## 6. Mistakes, hints and getting stuck

- The answer is never revealed. An item is placed only after success.
- Wrong answer: try again (2 tries).
- Still wrong: hint 1 (a regular hint), then hint 2. The last hint always includes a "hear the answer" button; the player hears it and goes straight back to the same task to complete it.
- Still wrong after 2 hints: the game quietly switches to an easier question, then returns to the hard one later.
- The goal is to avoid frustration before the player wants to quit, without making it too easy.

## 7. Levels and adaptive difficulty

- Same items, worlds and styles at every level. Only the English level rises (e.g. "red table" at first, "The big red table is next to the window" later).
- The game silently adjusts difficulty per topic, and sometimes gives a slightly harder challenge question.
- Decided: there is no level-choice screen. Every player starts at the easiest level, and the first tasks are a hidden placement phase that is never called a test.
- The placement moves fast: a player who answers the first tasks correctly and quickly jumps up a level or more, so a strong player does not get bored.
- The level is not shown on the main screen. It is visible only in an inner menu, where the player can also change it.
- Instructions are in Hebrew. At an advanced level the game asks whether the player wants to switch instructions to English, and the player decides.

## 8. Worlds and places

- At the start the player chooses one of four places:
  1. Bedroom
  2. Dress-up character (clothing vocabulary)
  3. Park
  4. Race track
- 15 worlds are built. 4 are open from the start: bedroom, character studio, park, race track.
- The other 11 open one by one as the player earns points (see Rewards): coloring world for little kids, garden, kitchen, beach, street, restaurant, classroom, airport, magic forest, graffiti wall, the moon. Locked worlds show a lock and the rank that opens them.
- Test mode for the team: open `play.html?test=wordcraft-team` once and every world and prize is open in that browser. `play.html?test=off` (or the button in Settings) turns it off.
- Each starting place focuses on a different word area.
- Each world has its own surfaces, categories and items (about 250 items in all), and its own people (e.g. waiter, astronaut, pilot, lifeguard, gardener, wizard).
- Multiple places are saved.

## 9. Items and customization

- A very large catalog with many variants, so players can express personal style ("a menu so big you can't leave it").
- Bedroom examples: many lamp types, mirrors, wardrobes, door handles, decorations, flowers, pictures, curtains, rugs, wall colors, wall decorations, a radio, a record player with records and a record holder, each in many colors.
- Surfaces have textures as well as colors, everywhere: walls (plain, stripes, dots, bricks, wood, checks, flowers, waves), floors (wood, tiles, checks, carpet, stone), sky (plain, sunset, night, clouds), grass (plain, flowers, stripes, sand), road (asphalt, dirt, checks). Textures are free to choose; changing a color needs a sentence.
- Many animals, each with variants: cat, dog, rabbit, hamster, turtle, fish (aquarium), parrot, bird, butterfly, duck, squirrel, horse, unicorn.
- Every placed item can be moved, resized, rotated, flipped and brought to the front.
- Almost everything is available from the start. The player should not depend on the game to express their style.
- Only a few special items and new places are locked and unlocked by progress.
- Every item's color can be changed, always with an English sentence.
- The color palette has many shades: 12 base colors, each with a light and a dark shade.
- Color words follow the level: at levels 1–2 the basic color is enough ("The table is blue" for light blue); at level 3 the shade is required ("The table is light blue").
- Every sentence task shows two chips, each with a speaker button: the thing (e.g. "wall", "floor", "lamp") and the new value (e.g. "yellow"), so the player can hear both English words.
- Items are chosen by Claude: as many items and variants as possible in every place.

## 10. People and characters

- Adding a person teaches what they are (e.g. "policeman").
- Mainly, players give people actions with sentences (e.g. "The girl is sitting on the chair").
- A little light conversation with characters.
- Character studio (was "dress-up"): pages 1, 2, 3… with a + button; each page holds one character the player designs. A character can be deleted (it then leaves every room too).
- "Put in a room" places the character in any open world. My characters also appear at the top of the People category in every room.
- It is the same character everywhere: a change in the studio shows in every room it stands in, and one character can stand in many rooms at once.
- In a room, a character can get actions with a sentence ("The character is dancing"), be resized, rotated, flipped, removed, or opened in the studio for editing.
- Character design: one connected, realistic body (not separate parts), with teen proportions. Free choice of skin tone, feeling, 12 hairstyles and many clothes, with no gender labels.
- Clothes (hair, tops, coats and dresses, pants and skirts, shoes, scarf) are worn on the body. The worn item shows its English word and a speaker button, like items in the rooms.
- Accessories (hats, cap, glasses, sunglasses, earrings, necklace, watch, bow, bags, headphones, crown) are free: move, resize, rotate and flip them.
- The character always wears a plain base layer, so it is never shown without clothes.
- Future idea: create several custom characters (e.g. yourself) and move any character into any world.

## 11. Rewards and progress

- The main reward is the item itself.
- Occasional surprises every few questions.
- 15 ranks. A progress bar fills with points toward the next rank.
- Every rank gives a sticker. Most ranks also give a special item (parrot, crown, fountain, wings, unicorn, rocket, dragon, UFO) and/or open a new world.
- The prize wall (in the Progress window) shows every rank as a big row: the sticker, the rank name and points, and next to it what you got (or a lock and "?" if not yet). The current rank is highlighted.
- Progress and prizes live in a separate window, not on the main screen. A button with a glowing indicator shows when something is waiting.

## 12. Learning extras

- Tapping an item only selects it. Its English name is heard with the speaker button in the item toolbar (not on every tap).
- A dictionary of all learned words.
- The main learning moment stays the task when placing an item.

## 13. Visual style and sound

- Teens: a modern, more realistic flat style with soft shading and depth, real proportions, and characters that look like teens (reference feel: modern design-play apps; our own drawings, not copied).
- Little kids: the first cute cartoon style is kept (js/art-kids.js) for the coming coloring world.
- Colors: shades of blue (blue, light blue, turquoise) and green, with fun textures such as subtle checkers.
- Sounds: short, varied, modern effects, not childish and not old-fashioned. Claude picks the first set; the team adjusts later.
- No background music.
- Game screen: scene on the left, panel on the right. Categories are compact chips at the top of the panel so the items are always visible.
- The whole game screen fits a laptop screen (e.g. 1366×768): the scene shrinks to leave room for the item toolbar below it.
- Background layers (walls, floors, the race track's red-white curb) are always behind the items.
- Hebrew text is always shown right-to-left, including inside the scene.

## 14. Logo

- Name: Wordcraft, large, with the Hebrew subtitle "יוצרים עם מילים באנגלית" as part of the logo.
- Chosen design (sketch 3D, "Wordcraft – סקיצות לוגו" canvas): each letter on a slightly tilted sticker; the "o" is a record, the "f" is a lamp, a small dog peeks over the "c", the "t" is a regular letter, the subtitle sits on a tape strip, subtle checker background.

## 15. Website (landing and play)

- The website is the game itself, hosted on GitHub Pages.
- Clean design with the logo large and dominant.
- Small line under the logo: "מעצבים חדרים ועולמות ולומדים אנגלית תוך כדי".
- A large turquoise "start playing" button.
- Three screenshots, one shown at a time, swiped left or right by the user (no auto-play). They are sized to fit the screen height.
- The screenshots loop: after the last one, the first comes in from the right (no rewind).
- Footer: "משחק מאת אביגיל פרייס" and "כל הזכויות שמורות 2026 ©".
- Hebrew by default, with a switch to English.

## 16. Saving progress

- Worlds, items and level are saved in the browser and kept after closing it.
- No cross-device sync at this stage.
- Save format v2 (from version 0.3): older v1 saves are not loaded, because the items changed.
- Future option: a personal game code (no email or password), always visible in settings, to continue on another device. This needs a small server.

## 17. Decisions log

| Date | Decision |
| --- | --- |
| 2026-11-25 | Hidden placement phase, no level-choice screen |
| 2026-11-25 | Task types and item lists chosen by Claude; team reviews and adjusts |
| 2026-11-25 | Every item's color can be changed with a sentence |
| 2026-11-25 | Android app postponed to the far future |
| 2026-11-25 | Feedback round 1: realistic teen art; cute art kept for little kids |
| 2026-11-25 | Textures for all surfaces; palette with shades; shade words only at level 3 |
| 2026-11-25 | Dress-up rebuilt: connected body, 12 hairstyles, free accessories |
| 2026-11-25 | Tap selects only; speaker button to hear words; hear buttons in unscramble and color sentences; last hint = hear the answer |
| 2026-11-25 | Feedback round 2: character studio with pages; same character in many rooms, updates everywhere |
| 2026-11-25 | All 11 extra worlds built; locked by points for players; test mode address for the team |
| 2026-11-25 | Prize wall with big stickers and prizes per rank; 15 ranks |
| 2026-11-25 | Sentence tasks: hear buttons for both the thing and the value |

### Coloring world for little kids (built in 0.4)

- 12 outline pictures of animals (lion, elephant, hippo, cat, dog, fish, bird, butterfly, frog, pig, cow, bear) in the first, cute style.
- The child picks a picture. The first time, they hear the English word and say it (speech recognition; an "I said it!" button when the browser can't listen, or after two tries).
- To pick a color, the child hears and says the color word. Then they color the picture by hand, area by area. To change color, they pick and say another color.
- Words the child said are shown on the picture and color buttons. Colored pictures are saved.

## 18. Planned next (approved, not built yet)

- Smart repetition of hard words.
- Photo mode to share a saved world.
- Daily challenge with a special item.
- "My Words" collection with pictures and a hear button.
- A short parent screen showing the words little kids learned.

## 19. Open questions

- Whether and when to add the personal game code with a server.
