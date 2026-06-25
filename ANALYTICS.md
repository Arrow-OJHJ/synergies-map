# Analytics

The project uses [GoatCounter](https://www.goatcounter.com) for privacy-friendly analytics — no cookies, no personal data, GDPR compliant by default.

## Setup

1. Create a free account at https://www.goatcounter.com/signup and choose a site code
2. In `IBM_Synergies_Map.html`, update the tracking script near the bottom of the file:
   ```html
   <script data-goatcounter="https://YOUR-SITE-CODE.goatcounter.com/count" async src="//gc.zgo.at/count.js"></script>
   ```
3. Commit and push — the dashboard will be live at `https://YOUR-SITE-CODE.goatcounter.com`

The current deployment uses site code `arrow-ollie`.
