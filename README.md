# IBM Product Synergies Map

An interactive map of IBM product cross-sell opportunities across six strategic plays. Available at
**https://arrow-ojhj.github.io/synergies-map/** (GitHub Pages, deployed from `main`).

The old address, arrow-synergies-map.com, now shows only a notice pointing to the new one and will
be retired.

## Repo contents

| Path | Purpose |
| --- | --- |
| `index.html` | The entire application — HTML, CSS, JS, and the English content (the master copy). |
| `i18n/` | One file per translation (`fr.js`, `pl.js`, ...), loaded only when that language is picked. |
| `tools/check_i18n.py` | Checks every translation against the English in `index.html`. |
| `fonts/` | Self-hosted IBM Plex Sans and Mono (OFL): latin, plus latin-ext and cyrillic subsets that load only when a page shows those characters — no external font requests. |
| `moved/` | The "this map has moved" notice served on the old domain, with its Cloudflare security headers. |
| `wrangler.jsonc` | Cloudflare Workers config for the old domain — serves `moved/` for every path. |

## Updating content

All content lives in clearly labelled JavaScript constant blocks near the top of the `<script>`
section of `index.html`.

| Constant | What it controls |
| --- | --- |
| `const SITE` | Page title |
| `const UI_EN` | Every interface label (buttons, headings, counts) |
| `const PLAYS` | Strategic play names, short names, and display order |
| `const CATEGORIES` | Horizontal lane labels and their associated play |
| `const PRODUCTS` | All 48 products — descriptions, questions, competitors, differentiators |
| `const CONNECTIONS` | Cross-sell connection relationships between products |

No build step — edit `index.html` and push. GitHub Pages redeploys in about a minute.

## Languages

The language menu in the header offers English plus Bulgarian, Czech, Danish, German, Spanish,
French, Croatian, Hungarian, Polish, Portuguese (Portugal), Slovak, Slovenian, Swedish and
Ukrainian. The choice is remembered per browser, and a link can open the map in a language
directly: `https://arrow-ojhj.github.io/synergies-map/?lang=pl`.

- **English in `index.html` is the master.** Each `i18n/<code>.js` mirrors its structure:
  interface labels, play and lane names, each product's description, value proposition,
  discovery questions and differentiators, the generic competitor entries, and every connection
  sentence (keyed `from>to`). Anything missing from a translation falls back to English.
- **Never translated:** IBM product names, competitor brand names, and IBM brand terms.
- **After any content change**, update every `i18n/*.js` to match, then run
  `python tools/check_i18n.py`. It fails on missing or extra entries, lost `{n}` placeholders,
  missing plural forms, HTML, and product or brand names that were translated or dropped.
- To add a language: create `i18n/<code>.js` in the same format, add the code to `LANGS` in
  `index.html` and to `PLURALS` in `tools/check_i18n.py`, and check the font subsets cover its
  alphabet.

The translations were machine-produced (October 2026). They have not yet been reviewed by
native speakers; have a colleague check a language before relying on it with customers.

## License

IBM product names and trademarks are the property of IBM Corporation. IBM Plex is licensed under the SIL Open Font License.
