# Wordcraft – Product Specification

*Version 0.2 – open questions closed, first build started. Stored in the GitHub repo (EyalPrice/Wordcraft) as SPEC.md and updated with each release.*

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
| Unscramble | Puts mixed-up letters in order | 1+ |
| Listen and type | Hears the word and types it | 2+ |
| Say it | Says the word aloud (speech recognition; typing if the browser can't listen) | 2+ |
| Sentence | Says or types a full sentence to change an item, e.g. "The lamp is blue." | all |

## 6. Mistakes, hints and getting stuck

- The answer is never revealed. An item is placed only after success.
- Wrong answer: try again (2 tries).
- Still wrong: hint 1, then hint 2.
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
- The game tells the player that more places come later.
- Each starting place focuses on a different word area.
- Later places (ideas): kitchen, graffiti brick wall, magic forest, the moon, restaurant, street, garden, classroom, beach, airport.
- Multiple places are saved.

## 9. Items and customization

- A very large catalog with many variants, so players can express personal style ("a menu so big you can't leave it").
- Bedroom examples: many lamp types, mirrors, wardrobes, door handles, decorations, flowers, pictures, curtains, rugs, wall colors, wall decorations, a radio, a record player with records and a record holder, each in many colors.
- Backgrounds and floors are customizable too.
- Almost everything is available from the start. The player should not depend on the game to express their style.
- Only a few special items and new places are locked and unlocked by progress.
- Every item's color can be changed, always with an English sentence.
- Items are chosen by Claude: as many items and variants as possible in every place.

## 10. People and characters

- Adding a person teaches what they are (e.g. "policeman").
- Mainly, players give people actions with sentences (e.g. "The girl is sitting on the chair").
- A little light conversation with characters.
- Dress-up character: free choice of look, hair, facial expressions and clothes, with no gender labels.
- Future idea: create several custom characters (e.g. yourself) and move any character into any world.

## 11. Rewards and progress

- The main reward is the item itself.
- Occasional surprises every few questions.
- Ranks: a progress bar fills with points toward each rank, and each rank gives a prize.
- Rank prizes are the locked rare items (e.g. a pet, a fountain) and new places.
- Progress and prizes live in a separate window, not on the main screen. A button with a glowing indicator shows when something is waiting.

## 12. Learning extras

- Tap an item in the scene to hear its English name.
- A dictionary of all learned words.
- The main learning moment stays the task when placing an item.

## 13. Visual style and sound

- Cute cartoon drawings.
- Colors: shades of blue (blue, light blue, turquoise) and green, with fun textures such as subtle checkers.
- Sounds: short, varied, modern effects, not childish and not old-fashioned. Claude picks the first set; the team adjusts later.
- No background music.
- App main screen idea: logo on the left, category rows on the right (e.g. "Objects" opens all items).

## 14. Logo

- Name: Wordcraft, large, with the Hebrew subtitle "יוצרים עם מילים באנגלית" as part of the logo.
- Chosen design (sketch 3D, "Wordcraft – סקיצות לוגו" canvas): each letter on a slightly tilted sticker; the "o" is a record, the "f" is a lamp, a small dog peeks over the "c", the "t" is a regular letter, the subtitle sits on a tape strip, subtle checker background.

## 15. Website (landing and play)

- The website is the game itself, hosted on GitHub Pages.
- Clean design with the logo large and dominant.
- Small line under the logo: "מעצבים חדרים ועולמות ולומדים אנגלית תוך כדי".
- A large turquoise "start playing" button.
- Three screenshots, one shown at a time, swiped left or right by the user (no auto-play).
- Hebrew by default, with a switch to English.

## 16. Saving progress

- Worlds, items and level are saved in the browser and kept after closing it.
- No cross-device sync at this stage.
- Future option: a personal game code (no email or password), always visible in settings, to continue on another device. This needs a small server.

## 17. Decisions log

| Date | Decision |
| --- | --- |
| 2026-11-25 | Hidden placement phase, no level-choice screen |
| 2026-11-25 | Task types and item lists chosen by Claude; team reviews and adjusts |
| 2026-11-25 | Every item's color can be changed with a sentence |
| 2026-11-25 | Android app postponed to the far future |

## 18. Open questions

- Whether and when to add the personal game code with a server.
