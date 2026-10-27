# Project History

## 2025 — BeLux Branding, Language Labels and German Edition

### Decision

Michel Van der Poorten confirmed that Belgium and Luxembourg currently operate as a single Arrow entity named **Arrow ECS BeLux**. The application has been updated to reflect this confirmed branding.

### Changes made

#### fr-BE locale (`i18n/fr-BE.js`)
- Language-selector label changed from `Français (Belgique)` to **`Français (BeLux)`**.
- Brand name changed from `Arrow ECS Belgique` to **`Arrow ECS BeLux`**.

#### nl-BE locale (`i18n/nl-BE.js`)
- Language-selector label changed from `Nederlands (België)` to **`Nederlands (BeLux)`**.
- Brand name changed from `Arrow ECS België` to **`Arrow ECS BeLux`**.
- Language name retained as "Nederlands" (not "Vlaams"), per project convention.

#### German BeLux variant — new file (`i18n/de-BE.js`)
- Created as a new country variant inheriting from the standard German pack (`de`).
- Language-selector label: **`Deutsch (BeLux)`**.
- Brand name: **`Arrow ECS BeLux`**.
- German for Luxembourg is the same as standard German; no dialectal differences applied.
- Full professional German translations provided for all four BeLux-only Red Hat products:
  - Lightwell
  - Red Hat Ansible Automation Platform
  - Red Hat OpenShift
  - Red Hat OpenShift AI
- Full professional German translations provided for all 13 BeLux-gated connection strings.

#### German (Deutschland) label (`index.html`)
- The existing German variant selector label was renamed from `Deutsch` to **`Deutsch (Deutschland)`** to distinguish it from the new BeLux variant.
- Content of the German (Deutschland) variant is unchanged; it does not display BeLux-specific Red Hat products or connections.

#### Language selector ordering (`index.html`)
- All selector labels are ordered alphabetically.
- `de-BE` (`Deutsch (BeLux)`) appears before `de` (`Deutsch (Deutschland)`).
- The three BeLux variants appear as: `Deutsch (BeLux)`, `Français (BeLux)`, `Nederlands (BeLux)`.

#### Market gating (`index.html`)
- The `markets` arrays for the four BeLux-only products (`lightwell`, `rh_ansible`, `rh_openshift`, `rh_openshift_ai`) and all 13 BeLux-gated connections were extended from `["fr-BE", "nl-BE"]` to **`["fr-BE", "nl-BE", "de-BE"]`**.
- BeLux-only content remains hidden in all non-BeLux variants (including `de`, `fr`, `fr-MA`, `nl`, `en`, and all others).

#### Validation script (`tools/check_i18n.py`)
- `BELGIAN_CODES` extended from `{'fr-BE', 'nl-BE'}` to **`{'fr-BE', 'nl-BE', 'de-BE'}`**.
- The CI check now enforces that `de-BE` contains complete translations for all BeLux-gated products and connections.

### Deferred decisions

- **Luxembourgish variant**: Not added. Further guidance is pending from Ivano.
- **"BeNeLux" rename**: Not applied. Michel confirmed the current entity is "BeLux". A possible future change to "BeNeLux" (to include the Netherlands) remains unconfirmed.
