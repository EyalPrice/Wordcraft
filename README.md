# Wordcraft
English learning game, by Avigail Price

**יוצרים עם מילים באנגלית** – מעצבים חדרים ועולמות ולומדים אנגלית תוך כדי.

Play in the browser: https://eyalprice.github.io/Wordcraft/

## What it is

A free browser game (computer or phone, no sign-up) where you design places — a bedroom, your own characters, a park, a race track, and 11 more worlds that open as you earn points. Every item you add opens a small English task. Changing an item (its color, what a person is doing, how the character feels) needs a full English sentence, typed or spoken.

The full product spec is in [SPEC.md](SPEC.md).

## Files

| Path | What it holds |
| --- | --- |
| `index.html` | Landing page: logo, start button, screenshots, Hebrew/English switch |
| `play.html` | The game |
| `js/game.js` | Screens, scene, dragging, toolbars, windows |
| `js/tasks.js` | Word and sentence tasks, tries, hints, easier fallback |
| `js/state.js` | Saving in the browser, hidden placement, levels, points, ranks |
| `js/data.js` | Places, items, colors, actions, ranks (add new items here) |
| `js/art.js` | Drawings for the first four places, people and the character studio, as SVG |
| `js/art-worlds.js` | Drawings for the 11 extra worlds, extra items, and the coloring pages |
| `js/art-kids.js` | The first, cute drawings, kept for the little-kids coloring world |
| `js/i18n.js` | Interface text in Hebrew and English |
| `js/sound.js`, `js/speech.js` | Sound effects; speaking and listening |
| `js/logo.js` | The sticker logo |
| `sw.js` | Offline support |
| `fonts/` | Fredoka font (SIL Open Font License) |

## Run it locally

Any static file server works, for example:

```
python3 -m http.server 8000
```

Then open http://localhost:8000.

Test mode (all worlds and prizes open in your browser): `play.html?test=wordcraft-team`. Turn it off with `play.html?test=off` or in Settings.

Demo scenes (used for the screenshots, nothing is saved): `play.html?demo=bedroom`, `?demo=park`, `?demo=track`, `?demo=dressup`.
