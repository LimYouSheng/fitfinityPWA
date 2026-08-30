# Fitfinity Staff PWA — v0.36 Couple Onboarding + iPad Polish

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

## v0.34 mobile polish
Upcoming Renewals on the Owner Dashboard now uses the same compact mobile density as Requests.


## v0.36 prototype changes
- iPad Requests and Upcoming Renewals now use matching density and one-row records.
- Removed the duplicated Session Calendar subtitle from the Owner Dashboard.
- Couple onboarding now has a visually separated General Information section with Client 1 / Client 2 tabs and a clear second-client completion cue.
- Both Couple members collect full personal/contact/emergency/health information before shared PT package settings.
- Couple Overview displays Client 1 and Client 2 separately rather than as one `&` information record.
- Couple Health / Limitation Notes are stored and shown separately; Remarks remain shared.
- Client Details, Health / Limitation Notes, Remarks and Trainer Rates show Cancel only while editing.
