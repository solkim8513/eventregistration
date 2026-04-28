# Decision Log

| Date | Decision | Rationale | Decided By |
|------|----------|-----------|------------|
| 2026-04-24 | Project initialized: event registration app | New project setup for a lightweight UI/UX POC that can later be translated into Power Apps + SharePoint Lists | Sol + Codex |
| 2026-04-24 | Built static admin UI/UX POC with dashboard, event details, registrants, check-in, reminders, and tasks | Kept the POC dependency-free and easy to inspect so a Power Apps developer can translate the workflow into SharePoint-backed screens | Codex |
| 2026-04-24 | Full rebuild: 13-screen Happy Hour end-to-end POC (8 admin + 5 attendee) | Sol approved the Happy Hour event type as the first complete E2E slice. Stack stays plain HTML/CSS/JS — no framework, no build step, open index.html in a browser to demo | Claude Code |
| 2026-04-24 | Attendee screens (invite, RSVP, confirm, edit/cancel, survey) styled as MS Forms | Attendees do not have Power Apps access; MS Forms visual pattern (purple accent, white cards, bottom-border inputs, styled radio/checkbox) is familiar and does not require any login | Claude Code |
| 2026-04-24 | Check-in screen designed for iPad landscape only | Sol confirmed landscape only; portrait shows a rotation prompt. Two-column layout: left=search+list+walk-in form, right=summary cards+no-show list. Touch targets min 44px | Claude Code |
| 2026-04-24 | Guest name is a single optional text field on the RSVP form | Happy Hour allows one guest per attendee. Field is conditionally shown when attendee selects "Yes, I will attend". Walk-in form also includes plus-one field | Claude Code |
| 2026-04-24 | View manager uses show/hide on .screen divs; two shells (adminShell / attendeeShell) toggled at top level | Single index.html, no routing library. "Preview Attendee View" button in admin sidebar switches shell. "← Admin demo view" link in attendee topbar switches back | Claude Code |
| 2026-04-24 | Sample data: 10 Happy Hour attendees with mixed statuses (Invited, Registered, Declined, Canceled, Walk-in) | Covers all registration status values defined in spec so every admin screen shows realistic data | Claude Code |
