# Spec

## Goal
Build a UI/UX POC for an internal NIS event registration app. NIS has multiple internal events, like employee appreciation, spring picnic, Oktoberfest, and others. The app should streamline enrollment, check-in, and reminders so admins can easily manage event information.

## AI-Generated Spec Draft

### User Stories
1. As an admin, I want to see all upcoming internal events in one place so I can quickly understand registration status and event readiness.
2. As an admin, I want to open one event and review registrants, guests, dietary notes, and check-in status so I can manage event logistics.
3. As an admin, I want a simple check-in workflow so event-day staff can mark attendees as arrived without searching through messy spreadsheets.
4. As an admin, I want to draft reminders for registered employees so communication is consistent before each event.

### Functional Requirements
1. Show a dashboard with event cards/rows for multiple internal events.
2. Show event-level metrics: capacity, registered count, checked-in count, and reminder status.
3. Allow admins to select an event and view event details.
4. Show a registrant table with employee name, department, guest count, dietary notes, registration status, and check-in status.
5. Include a check-in mode with a search field and clear check-in buttons.
6. Include a reminder panel with audience, subject, message, and send/schedule controls as UI placeholders.
7. Include a simple admin task list for event setup items.
8. Use sample data only; no live backend integration in the POC.

### Out of Scope
1. Live SharePoint List connection.
2. Authentication and role permissions.
3. Real email/SMS reminder sending.
4. Final Power Apps implementation.

### Open Questions
1. Should employees self-register in this app, or is this admin-only for the first version?
2. What fields are required for registration beyond name, department, guests, and dietary notes?
3. Should check-in support QR codes later, or only name/search lookup?

## Sol Approval
☐ Approved / ☑ Revise after POC review
