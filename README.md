# IBM Product Synergies Map

An interactive map of IBM product cross-sell opportunities across six strategic plays. Available at
**https://arrow-ojhj.github.io/synergies-map/** (GitHub Pages, deployed from `main`).

The old address, arrow-synergies-map.com, now shows only a notice pointing to the new one and will
be retired.

## Repo contents

| Path | Purpose |
| --- | --- |
| `index.html` | The entire application — HTML, CSS, JS, and all content in one file. |
| `fonts/` | Self-hosted IBM Plex Sans and Mono (OFL, latin subset) — no external font requests. |
| `moved/` | The "this map has moved" notice served on the old domain, with its Cloudflare security headers. |
| `wrangler.jsonc` | Cloudflare Workers config for the old domain — serves `moved/` for every path. |

## Updating content

All content lives in clearly labelled JavaScript constant blocks near the top of the `<script>`
section of `index.html`.

| Constant | What it controls |
| --- | --- |
| `const SITE` | Page title, brand name, year, footer hint text |
| `const PLAYS` | Strategic play names, short names, and display order |
| `const CATEGORIES` | Horizontal lane labels and their associated play |
| `const PRODUCTS` | All 48 products — descriptions, questions, competitors, differentiators |
| `const CONNECTIONS` | Cross-sell connection relationships between products |

No build step — edit `index.html` and push. GitHub Pages redeploys in about a minute.

## License

IBM product names and trademarks are the property of IBM Corporation. IBM Plex is licensed under the SIL Open Font License.
