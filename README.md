# Fitfinity Staff PWA — v0.30 Final

Final compiled UI/interaction batch after v0.29. This remains a front-end prototype with in-memory demo data; no GitHub push and no production backend are included.

## Main changes

- Requests: full current-vs-requested availability blocks, session date/time context, View Session link, compact top-3 dashboard view.
- Trainer Session Details: Request Time Change / Request Trainer Change workflow fixed end-to-end.
- Client onboarding: availability reset only resets availability/matching; default From/To is one hour apart; possible days are one row with From/To/Add Time below; PT Package + Start Date share a row; Paid is a full-width checkbox; country code selectors default to +65.
- Tablet/iPad: lower duplicate page headers removed, exercise camera pinned to the far-right, exercise edit mode tidied, Acknowledge Session / WhatsApp Client span the full section width, remuneration View alignment/status tags retained.
- Trainer Client Details: all client edit controls are removed in trainer view.
- Exercise plan: Interval remains removed.
- Owner remuneration: all currency values stay masked until the eye button is pressed.
- Zoom: viewport + touch handling prevents pinch/double-tap zoom inside the staff PWA.
- Calendar: derives Today from the device/browser local date.
- Trainer/profile tab controls match Client tab sizing at phone and iPad widths.

See `WIRING_AUDIT.md` for the interaction checks performed.
