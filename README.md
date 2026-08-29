# Fitfinity Staff PWA — v0.25

Mobile/tablet prototype build for UI/UX testing only. Use dummy data until the real backend authentication and database are connected.

## v0.25 changes
- Prevents simultaneous unsaved edit sections; attempting another Edit asks the user to Save or Cancel the current edit first.
- Client onboarding adds age, gender, start date, emergency contact and Female Trainer Preferred.
- Double Day automatically includes free gym membership; Single Day leaves it optional.
- Availability Reset restores the day/time controls so a new availability set can be entered.
- Client Overview adds Remarks and shows the new onboarding information.
- Trainer-side client details stay read-only.
- Client Progress removes the Completed Sessions table.
- Search fields show immediate matching suggestions as the user types.
- Session Details shows start-to-end time and package position such as 10/24.
- Ad-hoc trainer reassignment uses the trainer dropdown in Session Edit and can queue a trainer notification.
- Reassigned sessions show both Original Trainer and Reassigned Trainer; both trainers retain access to that session.
- Trainer remuneration amounts are hidden until the eye control is pressed.
- Phone/iPad exercise camera and session delivery layouts are tightened.
- Owner and Trainer month calendars show weekday + date (for example MON 24) while retaining the 7-column no-horizontal-scroll layout.
