# Wordcraft
English learning game, by Avigail Price

**יוצרים עם מילים באנגלית** – מעצבים חדרים ועולמות ולומדים אנגלית תוך כדי.

Play in the browser: https://eyalprice.github.io/Wordcraft/

## What it is

A free browser game (computer or phone, no sign-up) where you design places — a bedroom, a dress-up character, a park and a race track. Every item you add opens a small English task. Changing an item (its color, what a person is doing, how the character feels) needs a full English sentence, typed or spoken.

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
| `js/art.js` | All drawings, as SVG |
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

Demo scenes (used for the screenshots, nothing is saved): `play.html?demo=bedroom`, `?demo=park`, `?demo=track`, `?demo=dressup`.
