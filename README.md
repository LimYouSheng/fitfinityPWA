# Fitfinity Staff PWA — v0.31 Refactored

This is a **refactor-only** release based on v0.30 Final. The objective is to preserve the approved UI and interactions while making the prototype safer to continue editing.

## Structural changes

- `index.html` now contains markup plus external CSS/JS references instead of the implementation being embedded in one file.
- 53 embedded JPEG occurrences were deduplicated into 22 named files under `assets/images/`.
- CSS was extracted to `assets/css/`; older cumulative overrides are isolated under `assets/css/patches/`.
- JavaScript was extracted to `assets/js/`; older cumulative compatibility layers are isolated under `assets/js/patches/`.
- Script and stylesheet ordering is deliberately unchanged to preserve v0.30 behavior.
- A confirmed-dead `approveAvailability()` legacy helper (two definitions, zero callers) was removed.
- Service-worker cache version was bumped to `v31-refactored`.

## Editing rule from v0.31 onward

Do **not** add new `<style>` or inline `<script>` patch blocks to `index.html`. Put new work in the appropriate current file, then migrate a feature into a dedicated module when it is next substantially changed.

The `patches/` folders are compatibility history, not the preferred location for new features. Remove/merge a patch only after its affected owner and trainer routes have been regression-tested.

See `REFACTOR_GUIDE.md` and `WIRING_AUDIT.md`.
