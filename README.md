# IBM Synergies Map

An interactive visualisation tool for exploring IBM Software & Infrastructure cross-sell opportunities and product connections, enhanced with comprehensive product intelligence.

## 🌐 Live Application

**Access the live site**: [https://arrow-ibm-synergies-map.s3-web.eu-gb.cloud-object-storage.appdomain.cloud](https://arrow-ibm-synergies-map.s3-web.eu-gb.cloud-object-storage.appdomain.cloud)

Hosted on IBM Cloud Object Storage with automatic updates on every code change.

---

## Overview

This single-page HTML application helps Arrow ECS UK partners identify synergies between IBM products across six strategic plays. It includes detailed product descriptions, value propositions, discovery questions, competitor analysis, and connection justifications to support sales conversations.

## Features

### Interactive Product Map
- **34 IBM products** organised across 6 strategic plays
- **Visual connections** showing product relationships with detailed justifications
- **Click any product** to highlight its connections and view comprehensive information
- **Search functionality** across product names, descriptions, and discovery questions
- **Filter by play** to focus on specific strategic areas

### Product Intelligence
- **Detailed descriptions** of what each product does and its capabilities
- **Value propositions** with quantified business benefits and ROI metrics
- **Discovery questions** (4 per product) to identify customer needs and pain points
- **Competitor analysis** with comprehensive lists of competing products
- **Differentiators** highlighting key advantages versus competitors

### Design & Experience
- **IBM Carbon Design System** with official token palette
- **Light/Dark mode** toggle for comfortable viewing
- **Responsive layout** that adapts to different screen sizes
- **Optimised performance** with event delegation and efficient rendering

## Product Categories

- **Automation & Integration**: API Connect, Event Automation, webMethods, Terraform, Concert, Maximo
- **Observability & FinOps**: Instana, SevOne, Turbonomic, Apptio, Apptio Cloudability
- **Security & Governance**: Guardium, Verify, Vault
- **Data & AI Platform**: watsonx.ai, watsonx.data, watsonx.data intelligence, watsonx.data integration, watsonx.governance, watsonx Orchestrate, IBM Bob, Confluent
- **Infrastructure & Systems**: LinuxONE, Power Systems, AIX, IBM i, Linux on Power
- **Storage Solutions**: FlashSystem, Storage Control, Storage Insights, Storage Virtualize, Storage Fusion, Storage Ceph, Storage Scale

## Usage

### For Partners & Sales Teams

1. **Open the live site** using the URL above
2. **Explore products** by clicking on any node to see its connections
3. **Use search** to quickly find specific products or capabilities
4. **Filter by play** to focus on particular strategic areas
5. **Review details** in the sidebar for product information, value props, and discovery questions

### For Developers

**Local testing:**
```bash
# Simply open the HTML file in your browser
open IBM_Synergies_Map.html
```

**Making changes:**
```bash
# 1. Edit IBM_Synergies_Map.html
# 2. Test locally by opening in browser
# 3. Commit and push to main branch
git add IBM_Synergies_Map.html
git commit -m "feat: your change description"
git push origin main

# 4. GitHub Actions automatically deploys to IBM Cloud
# 5. Live site updates within 2-3 minutes
```

**First-time setup:**
- See [DEPLOYMENT.md](DEPLOYMENT.md) for complete IBM Cloud and GitHub Actions configuration

## Technical Details

- **Pure HTML/CSS/JavaScript** - no external dependencies or build process
- **IBM Plex Sans + IBM Plex Mono** typography
- **Carbon Design System** tokens with light/dark theming
- **SVG-based rendering** for smooth connection animations
- **Smart layout algorithm** for optimal product spacing
- **Event delegation** for performance
- **Production-ready** with comprehensive error handling

## Deployment

### Architecture

```
Developer → Commits to GitHub → GitHub Actions → IBM Cloud Object Storage → Live Site
```

### Automatic Deployment

Every push to the `main` branch triggers automatic deployment:
1. GitHub Actions workflow runs
2. Authenticates to IBM Cloud
3. Uploads HTML file to Object Storage
4. Live site updates in ~2 minutes

### Setup & Configuration

**For new team members or initial setup:**
- Complete step-by-step guide: [DEPLOYMENT.md](DEPLOYMENT.md)
- Covers IBM Cloud Object Storage setup, GitHub Actions configuration, and troubleshooting

**Quick reference:**
- **Hosting**: IBM Cloud Object Storage (static website hosting)
- **CI/CD**: GitHub Actions (`.github/workflows/deploy.yml`)
- **Cost**: < $1/month for typical usage
- **Region**: London (eu-gb)

## Analytics & Usage Tracking

### Overview

This project uses **GoatCounter** for privacy-friendly web analytics. GoatCounter provides:
- **Privacy-focused**: No cookies, GDPR compliant by default
- **Comprehensive**: Page views, referrers, browsers, countries, screen sizes
- **Free**: No cost for personal/non-commercial use
- **Dashboard**: Beautiful, real-time analytics dashboard

### What is Tracked

- **Page views** - Total visits and unique visitors
- **Referrers** - Where visitors come from
- **Browsers & Devices** - What visitors use
- **Countries** - Geographic distribution (country-level only)
- **Screen sizes** - For responsive design insights

**No personal data** - No IP addresses stored, no user identification, no tracking across sites.

### Viewing Analytics Dashboard

**Access your dashboard**: https://YOURCODE.goatcounter.com

Replace `YOURCODE` with your actual GoatCounter site code (see setup instructions below).

The dashboard shows:
- Real-time page views
- Visitor trends over time
- Top pages and referrers
- Browser and device statistics
- Geographic distribution

### Setup Instructions

**To enable tracking, you need to create a free GoatCounter account:**

1. **Create account**: Go to https://www.goatcounter.com/signup
2. **Choose a code**: Pick a unique site code (e.g., `arrow-synergies`)
3. **Get your tracking code**: After signup, you'll receive a script tag
4. **Update HTML file**: Replace `YOURCODE` in `IBM_Synergies_Map.html` (line 2213) with your actual code:
   ```html
   <script data-goatcounter="https://YOURCODE.goatcounter.com/count" async src="//gc.zgo.at/count.js"></script>
   ```
5. **Deploy**: Commit and push changes
6. **View dashboard**: Visit `https://YOURCODE.goatcounter.com`

### For New Deployments

If you're setting up your own version of this project:

1. **Sign up** at https://www.goatcounter.com/signup (free for non-commercial use)
2. **Choose your site code** (e.g., `my-synergies-map`)
3. **Add the tracking script** to your HTML before `</body>`:
   ```html
   <script data-goatcounter="https://YOUR-SITE-CODE.goatcounter.com/count" async src="//gc.zgo.at/count.js"></script>
   ```
4. **Access your dashboard** at `https://YOUR-SITE-CODE.goatcounter.com`

### Privacy & Compliance

✅ **No cookies** - No data stored on user devices
✅ **No personal data** - IP addresses anonymized, no user identification
✅ **GDPR compliant** - Privacy-friendly by design
✅ **No consent required** - Operational analytics exemption applies
✅ **Open source** - Transparent, auditable code
✅ **Data ownership** - You own your data, can export anytime

---

## Repository Structure

```
synergies-map/
├── .github/workflows/deploy.yml  # CI/CD pipeline
├── IBM_Synergies_Map.html        # Main application (single file)
├── README.md                     # This file
├── DEPLOYMENT.md                 # Complete deployment guide
└── .gitignore                    # Git exclusions
```

## Support

- **Deployment issues**: See [DEPLOYMENT.md](DEPLOYMENT.md) troubleshooting section
- **Feature requests**: Create an issue in this repository
- **Questions**: Contact Arrow ECS UK team

---

**Maintained by**: Arrow ECS UK
