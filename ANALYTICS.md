# IBM Synergies Map - Analytics Guide

## Overview

This project uses **GoatCounter** for privacy-friendly web analytics. GoatCounter provides:
- **Privacy-focused**: No cookies, GDPR compliant by default
- **Comprehensive**: Page views, referrers, browsers, countries, screen sizes
- **Free**: No cost for personal/non-commercial use
- **Dashboard**: Beautiful, real-time analytics dashboard

---

## What is Tracked

- **Page views** - Total visits and unique visitors
- **Referrers** - Where visitors come from
- **Browsers & Devices** - What visitors use
- **Countries** - Geographic distribution (country-level only)
- **Screen sizes** - For responsive design insights

**No personal data** - No IP addresses stored, no user identification, no tracking across sites.

---

## Viewing Analytics Dashboard

**Access your dashboard**: https://YOURCODE.goatcounter.com

Replace `YOURCODE` with your actual GoatCounter site code (see setup instructions below).

The dashboard shows:
- Real-time page views
- Visitor trends over time
- Top pages and referrers
- Browser and device statistics
- Geographic distribution

---

## Setup Instructions

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

---

## For New Deployments

If you're setting up your own version of this project:

1. **Sign up** at https://www.goatcounter.com/signup (free for non-commercial use)
2. **Choose your site code** (e.g., `my-synergies-map`)
3. **Add the tracking script** to your HTML before `</body>`:
   ```html
   <script data-goatcounter="https://YOUR-SITE-CODE.goatcounter.com/count" async src="//gc.zgo.at/count.js"></script>
   ```
4. **Access your dashboard** at `https://YOUR-SITE-CODE.goatcounter.com`

---

## Privacy & Compliance

✅ **No cookies** - No data stored on user devices
✅ **No personal data** - IP addresses anonymized, no user identification
✅ **GDPR compliant** - Privacy-friendly by design
✅ **No consent required** - Operational analytics exemption applies
✅ **Open source** - Transparent, auditable code
✅ **Data ownership** - You own your data, can export anytime

---

## Additional Resources

- **GoatCounter Website**: https://www.goatcounter.com
- **GoatCounter Documentation**: https://www.goatcounter.com/help
- **Privacy Policy**: https://www.goatcounter.com/help/privacy
- **GitHub Repository**: https://github.com/arp242/goatcounter

---

**Last Updated**: 2026-06-22  
**Maintained by**: Arrow ECS UK  
**Questions?** Contact the repository maintainers