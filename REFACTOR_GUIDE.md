# v0.31 Refactor Guide

## What changed

The v0.30 prototype had grown into a 2.4 MB / ~5,956-line single HTML file with 16 actual style blocks, 19 actual script blocks and 53 embedded JPEG occurrences. v0.31 separates structure from assets without rewriting approved behavior.

## Current ownership

- `index.html` — page/modal markup and asset references.
- `assets/images/` — public-site imagery and logo.
- `assets/css/core.css` — original base styling.
- `assets/css/v030*.css` — current v0.30/final presentation fixes.
- `assets/css/patches/` — older compatibility layers retained to avoid regressions.
- `assets/js/core.js` — original data/state/rendering/navigation implementation.
- `assets/js/requests-v029.js` — request queue/workflows.
- `assets/js/v030.js` and `assets/js/v030-final.js` — newest behavior fixes.
- `assets/js/patches/` — older behavior overrides retained for compatibility.

## How to continue prototyping

1. Change existing behavior in the newest file that currently owns it.
2. If a feature needs another substantial revision, move that feature into a dedicated file such as `sessions.js`, `clients.js`, or `calendar.js` instead of creating another patch layer.
3. Never add another versioned inline style/script block to `index.html`.
4. Run the `WIRING_AUDIT.md` regression checklist after each batch.

## Deliberately retained compatibility code

Repeated functions such as `renderTrainerSelfAvailability` and `updatePortalBackButton` are later overrides, not necessarily unused duplicates. Earlier definitions are still available during earlier runtime stages, so they were retained until full route coverage proves they can be collapsed safely. This avoids turning a cleanup pass into a behavioral rewrite.
