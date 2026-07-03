# IBM Synergies Map

An interactive visualisation tool for exploring IBM product cross-sell opportunities and connections across six strategic plays, built for Arrow ECS UK.

**Live site**: [https://arrow-ibm-synergies-map.s3-web.eu-gb.cloud-object-storage.appdomain.cloud](https://arrow-ibm-synergies-map.s3-web.eu-gb.cloud-object-storage.appdomain.cloud)

---

## Overview

Single-page application covering IBM products across Automation & Integration, Observability & FinOps, Security & Governance, Data & AI, Infrastructure, and Storage. Each product includes a description, value proposition, discovery questions, competitor analysis, and connection justifications.

On desktop the products are laid out as an interactive node map with animated SVG connection lines. On mobile (≤768px) the same data is presented as a collapsible accordion with a slide-up bottom drawer for product detail.

## How it's put together

```
data.yaml  +  template.html  →  build.py  →  dist/index.html
```

- **[data.yaml](data.yaml)** — all content: plays, categories, products, connections, site text. **This is the only file you edit to change the map** — see [CONTENT-EDITING.md](CONTENT-EDITING.md). Counts (products, plays) shown on the site are computed from the data automatically.
- **[template.html](template.html)** — the presentation layer (layout, styling, interaction). Contains no content; not viewable on its own.
- **[build.py](build.py)** — validates `data.yaml` (broken content can never deploy) and injects it into the template, producing `dist/index.html`.

To build locally:

```bash
pip install pyyaml
python build.py     # writes dist/index.html — open it in a browser
```

## Deployment

```
GitHub (main) → GitHub Actions → build.py → IBM Cloud Object Storage → Live Site
```

Every push to `main` validates and builds the site, then deploys it; the live site updates in ~2 minutes. Pull requests and pushes to other branches run the validation only, so content mistakes show up as a red X before they can be merged.

- **Hosting**: IBM Cloud Object Storage (static website hosting, eu-gb)
- **CI/CD**: `.github/workflows/deploy.yml` (deploy) and `.github/workflows/validate.yml` (content checks)
- **Cost**: < $1/month

For initial setup or re-configuration see [DEPLOYMENT.md](DEPLOYMENT.md).
