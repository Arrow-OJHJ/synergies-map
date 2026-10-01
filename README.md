# IBM Product Synergies Map

An interactive map of IBM product cross-sell opportunities across six strategic plays. Available at **arrow-synergies-map.com** (Cloudflare
Workers) — pending migration to an officially hosted Arrow location.

## Repo contents

| Path | Purpose |
| --- | --- |
| `index.html` | The entire application — HTML, CSS, JS, and all content in one file. |
| `fonts/` | Self-hosted IBM Plex Sans and Mono (OFL, latin subset) — no external font requests. |
| `_headers` | Cloudflare security headers (CSP, X-Frame-Options, etc.), applied to every response. |
| `wrangler.jsonc` | Cloudflare Workers config — serves the repo root as a static assets Worker. |

## Updating content

All content lives in clearly labelled JavaScript constant blocks near the top of the `<script>`
section of `index.html`. 

| Constant | What it controls |
| --- | --- |
| `const SITE` | Page title, brand name, year, footer hint text |
| `const PLAYS` | Strategic play names, short names, and display order |
| `const CATEGORIES` | Horizontal lane labels and their associated play |
| `const PRODUCTS` | All 45 products — descriptions, questions, competitors, differentiators |
| `const CONNECTIONS` | Cross-sell connection relationships between products |

No build step — edit `index.html` and push. Cloudflare deploys in ~2 minutes.

## License

IBM product names and trademarks are the property of IBM Corporation. IBM Plex is licensed under the SIL Open Font License.
