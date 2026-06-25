# IBM Synergies Map

An interactive visualisation tool for exploring IBM product cross-sell opportunities and connections across six strategic plays, built for Arrow ECS UK.

**Live site**: [https://arrow-ibm-synergies-map.s3-web.eu-gb.cloud-object-storage.appdomain.cloud](https://arrow-ibm-synergies-map.s3-web.eu-gb.cloud-object-storage.appdomain.cloud)

---

## Overview

Single-page application covering 34 IBM products across Automation & Integration, Observability & FinOps, Security & Governance, Data & AI, Infrastructure, and Storage. Each product includes a description, value proposition, discovery questions, competitor analysis, and connection justifications.

On desktop the products are laid out as an interactive node map with animated SVG connection lines. On mobile (≤768px) the same data is presented as a collapsible accordion with a slide-up bottom drawer for product detail.

## Deployment

```
GitHub (main) → GitHub Actions → IBM Cloud Object Storage → Live Site
```

Every push to `main` triggers automatic deployment; the live site updates in ~2 minutes.

- **Hosting**: IBM Cloud Object Storage (static website hosting, eu-gb)
- **CI/CD**: `.github/workflows/deploy.yml`
- **Cost**: < $1/month

For initial setup or re-configuration see [DEPLOYMENT.md](DEPLOYMENT.md).

## Analytics

See [ANALYTICS.md](ANALYTICS.md).
