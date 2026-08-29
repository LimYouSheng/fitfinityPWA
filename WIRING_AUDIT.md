# Fitfinity PWA v0.27 — targeted verification

## Added / changed
- Trainer Onboarding includes **Mobile Number** and **Gender**.
- Owner Trainer Profile displays and edits Mobile Number and Gender. Trainer name remains read-only.
- Trainer My Account displays Mobile Number and Gender.
- Owner Client Profile main Edit now edits the full set of personal Client Information fields together: Phone, Email, Age, Gender, Emergency Contact and Start Date.
- Trainer Client Profile stays read-only.
- **Fixed Weekly Schedule** is removed from Client Information. Recurring timing remains part of scheduling/package workflow.
- New **Upcoming Sessions** tab sits beside Session History and lists all non-completed sessions for that client, with date/time, trainer, package sequence/status and View.
- Client tabs wrap into a 3-column mobile grid rather than introducing horizontal page scrolling.

## Static checks
- JavaScript syntax: PASS (all script blocks checked with Node).
- Duplicate HTML IDs: 0.
- Required new field IDs and Upcoming Sessions wiring: PASS.

## Prototype limitation
- Changes remain in browser memory only until the real backend/database is connected.
