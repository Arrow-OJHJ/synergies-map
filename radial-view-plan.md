# Radial Graph View Toggle — Implementation Plan

## Overview

Add an optional **radial graph layout** to the existing swimlane map in `index.html`. The swimlane layout remains the default and is unchanged. A single toggle button in the header bar switches between **Map view** (swimlane, default) and **Radial view** (force-directed radial). All existing interactions (click, search, play filter, sidebar, theme, node style, i18n) must work identically in both views.

The radial layout uses **no external libraries** — consistent with the project's vanilla JS/CSS approach. Node positions are computed with a pure-JS force-directed algorithm at layout time.

---

## Radial Layout Design

In radial view:
- The 6 **play categories become concentric rings** (or arcs), one ring per category, radiating outward from the centre of `#map-area`.
- Products in each category are distributed evenly around their ring.
- Connection lines are drawn with the same SVG path logic already used in `drawConnections()` — only the `_px`/`_py` coordinates change.
- A category **label** is placed at the outermost point of each ring arc (replacing the horizontal lane labels from swimlane view).
- Lane strips and lane dividers are **hidden** in radial view (they make no sense spatially).

This keeps the rendering pipeline identical — only `computeLayout()` is replaced by `computeRadialLayout()` for this mode.

---

## Sub-Tasks

---

### Sub-Task 1 — Add view-mode state and toggle button

**Intent**  
Introduce a `viewMode` variable (`'map'` | `'radial'`) and add a toggle button to the header bar (`#bar2`, next to the theme button) so the user can switch views.

**Expected Outcomes**
- A "Radial" / "Map" toggle button appears in the top bar (desktop only, hidden on mobile via CSS).
- Clicking it toggles `viewMode` and triggers a full layout + redraw.
- The `#app` element gains a `data-view` attribute (`map` or `radial`) that CSS can target.
- No visual change to the swimlane layout yet (radial layout not yet implemented).

**Todo List**
1. Add `let viewMode = 'map';` to the state block (near `selectedId`, line ~4271).
2. Add a `<button id="view-toggle-btn">` element in `#bar2` of the HTML (after the search container).
3. Write a `setViewMode(mode)` function that: sets `viewMode`, updates `#app`'s `data-view` attribute, updates the button label/icon, calls `scheduleLayoutUpdate()`.
4. Attach a click listener to `#view-toggle-btn` that calls `setViewMode`.
5. Add CSS to hide the toggle button on mobile (consistent with existing mobile hiding patterns).
6. Add a CSS rule `[data-view="radial"] .lane-strip, [data-view="radial"] .lane-divider, [data-view="radial"] .lane-label { display: none; }` to suppress swimlane decorations in radial mode.

**Relevant Context**
- Theme toggle button pattern: `index.html` lines 1352–1355 (HTML) and 5086–5093 (JS listener).
- State block: `index.html` line 4271.
- `scheduleLayoutUpdate()`: `index.html` line 5110.
- `#bar2` HTML: `index.html` lines 1358–1381.

**Status** — `[ ] pending`

---

### Sub-Task 2 — Implement `computeRadialLayout()`

**Intent**  
Write a new `computeRadialLayout()` function that assigns `_px`/`_py` coordinates to every product using a radial/concentric-ring layout. This is the core visual algorithm.

**Expected Outcomes**
- Each of the 6 categories occupies a distinct concentric ring (evenly spaced radii).
- Products within a category are distributed evenly around their ring.
- Node DOM elements are positioned absolutely using the computed coordinates (same `style.left`/`style.top` pattern used by `computeLayout()`).
- Category labels appear at the "top" (12 o'clock) of each ring (or offset to avoid overlap with node positions).
- Lane strip, lane divider, and lane label DOM elements are NOT created (they are suppressed by the CSS rule added in Sub-Task 1).

**Algorithm**
- Centre point: `cx = W/2`, `cy = H/2`.
- Inner radius (ring 0): `~H * 0.10`.
- Outer radius (ring 5): `min(W, H) * 0.46` (leaves a small outer margin).
- Ring spacing: `(outerR - innerR) / (numCategories - 1)`.
- Per ring: distribute N products at angles `2π * i / N` (offset by -π/2 to start at 12 o'clock).
- Store `p._px = cx + r * cos(angle)`, `p._py = cy + r * sin(angle)`.
- Apply same `style.left` / `style.top` pattern used in `computeLayout()`.
- Append ring arc SVG elements (thin circles or arcs) as visual guides for each ring.

**Todo List**
1. Write `computeRadialLayout()` function below `computeLayout()` in the JS.
2. Calculate centre, inner radius, outer radius, and ring spacing from `mapArea.getBoundingClientRect()`.
3. For each category (ring), compute the angle step, then loop products to set `_px`, `_py`, and `style.left`/`style.top`.
4. Add a subtle ring-guide circle for each category (thin `<circle>` SVG element in `#svg-connections`) and a category label positioned at the top of the ring arc.
5. Reset any inline `fontSize`/`padding` overrides on nodes (so they render at default size in radial view).
6. Add CSS for a `.ring-label` class (small, muted text; positioned absolutely).

**Relevant Context**
- `computeLayout()` for node positioning pattern: `index.html` lines 4517–4644.
- `_px`/`_py` usage pattern: line 4599 (`p._px = cx; p._py = y;`).
- SVG element `svgEl`: referenced at `#svg-connections`.
- `drawConnections()` already reads `p._px` and `p._py` — no changes needed there.

**Status** — `[ ] pending`

---

### Sub-Task 3 — Wire layout dispatch into the render pipeline

**Intent**  
Modify `computeLayout()`'s call sites so they call `computeRadialLayout()` instead when `viewMode === 'radial'`. This makes the toggle actually switch the visual layout.

**Expected Outcomes**
- Switching the toggle button re-renders the map in radial layout immediately.
- Switching back renders the swimlane layout.
- Resize, search, play filter, and click interactions all trigger the correct layout function automatically.
- The connection lines draw correctly in both modes (no changes to `drawConnections()` needed).

**Todo List**
1. Create a thin dispatcher function `runLayout()` that calls `computeRadialLayout()` if `viewMode === 'radial'`, otherwise `computeLayout()`.
2. Replace every direct call to `computeLayout()` in the codebase with `runLayout()`. Calls to replace are in: `applyTweaks()` (line ~5046), `scheduleLayoutUpdate()` (line ~5114), and `mobileInit()`/`mobileSearch` if any exist.
3. Verify that `drawConnections()` is always called after `runLayout()` (it already is at all call sites).

**Relevant Context**
- `computeLayout()` call sites: `index.html` lines 5046, 5114.
- `applyTweaks()` function: line ~5028.
- `scheduleLayoutUpdate()` function: line 5110.

**Status** — `[ ] pending`

---

### Sub-Task 4 — CSS polish for radial view

**Intent**  
Add the minimal CSS rules needed to make nodes and connection lines look correct in radial mode — node centering, ring labels, and ensuring the `#map-area` is ready for a centred radial layout.

**Expected Outcomes**
- Nodes in radial view are visually centred on their computed coordinates (using `transform: translate(-50%, -50%)`) rather than top-left anchored — or coordinates are adjusted in JS to compensate. Confirm which approach is used (existing swimlane uses centre-offset approach via `p._px = cx` — check exact CSS).
- Ring guide circles are subtle (low-opacity dashed or thin solid stroke).
- Ring category labels are readable but not visually dominant.
- The `#map-area` does not show a scrollbar in radial view even if nodes exceed bounds slightly.
- No regressions in swimlane view.

**Todo List**
1. Read the existing `.pnode` CSS to confirm whether it already uses `transform: translate(-50%, -50%)` or positions from top-left — and if any adjustment is needed for radial.
2. Add `.ring-guide` SVG circle styles (thin, low-opacity, dashed).
3. Add `.ring-label` CSS (small font, muted color, `position: absolute`, `transform: translate(-50%, -50%)`).
4. Verify existing node styles (tag/chip/dot) still look correct when centred on radial coordinates.
5. Test dark and light themes visually.

**Relevant Context**
- `.pnode` CSS: `index.html` lines ~446–526.
- CSS variable palette: `index.html` lines ~9–100.
- Existing lane-strip and lane-divider CSS can be referenced for how decorative elements are styled.

**Status** — `[ ] pending`

---

### Sub-Task 5 — i18n string additions

**Intent**  
Add the two new UI strings needed for the toggle button ("Map view" / "Radial view") to the English master (`UI_EN`) and to all 22 translation files. The translation files currently match the English master exactly (validated by CI), so they must be updated too.

**Expected Outcomes**
- `UI_EN` in `index.html` gains two new keys: `viewMap` and `viewRadial`.
- All 22 translation files in `i18n/` gain the same two keys (initially identical to English, to be translated later).
- `python tools/check_i18n.py` passes with no errors.
- The toggle button text is sourced via the existing `t()` helper.

**Todo List**
1. Add `"viewMap": "Map view"` and `"viewRadial": "Radial view"` to `UI_EN` in `index.html`.
2. Add the same two keys to all 22 `i18n/*.js` files (use the English values as placeholders).
3. Run `python tools/check_i18n.py` to confirm no missing keys.
4. Update the toggle button HTML (from Sub-Task 1) to use `data-i18n="viewMap"` / `data-i18n="viewRadial"` attributes, and ensure `applyLanguage()` sets the button text correctly.

**Relevant Context**
- `UI_EN` in `index.html`: line ~1528.
- i18n files: `i18n/*.js` (22 files).
- `t()` helper and `applyLanguage()` function in `index.html`.
- `check_i18n.py` in `tools/`.

**Status** — `[ ] pending`

---

## Non-Goals

- No changes to the mobile view (accordion + drawer stays as-is; radial view is desktop-only).
- No changes to the swimlane layout algorithm.
- No external libraries (no D3, no force-simulation library).
- No persistence of the radial/map preference between sessions (toggle resets on page reload).
- No animation between the two layout modes (instant switch).

---

## Implementation Order

```
Sub-Task 1 → Sub-Task 2 → Sub-Task 3 → Sub-Task 4 → Sub-Task 5
```

Each sub-task is independently reviewable. Sub-Tasks 1–3 deliver a working (if unstyled) toggle. Sub-Task 4 adds visual polish. Sub-Task 5 completes the i18n coverage.
