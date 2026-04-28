# Spec

## Goal
Build a UI/UX POC for an internal NIS event registration app based on the design flow in `Event Registration App Flow 2026-04-09 v2-1.pptx`.

NIS runs multiple internal events, such as employee appreciation, spring picnic, Oktoberfest, AEAE, and anniversary events. The app should help admins create events, invite attendees, monitor registration, manage event-day check-in, send reminders, and export results. The final implementation is expected to be Power Apps plus SharePoint Lists, but this POC is for clarifying UI/UX and workflow.

## AI Draft

### Core Concept
This is a registration app, not a survey app. The experience should focus on event setup, RSVP tracking, attendee management, check-in, and export/reporting. The POC should include both attendee-facing screens and admin-facing screens. Attendee RSVP and survey screens should be mocked in an MS Forms-like style so stakeholders can understand the intended user experience without requiring real MS Forms integration.

### Primary Users
1. Admin users: Administrative Services, Rebecca, assistant/admin support, IT, and CK.
2. Invited attendees: NIS employees and configurable contractor audiences.
3. Non-NIS guests/family: handled as plus-one or guest fields, not as separate accounts.

### Attendee Flow
1. Attendee receives an invite email when the event opens.
2. Attendee opens the Event Invitation Page, likely MS Forms or linked event page.
3. Attendee submits RSVP form.
4. Attendee receives confirmation with edit/cancel options and calendar link.
5. Attendee may edit or cancel until the RSVP/cancellation deadline.
6. Non-respondents receive automated reminders.
7. On event day, attendee checks in.
8. After the event, checked-in attendees receive a post-event survey.
9. No-shows do not receive the survey.

The attendee flow should be represented in the POC step by step, including invitation, RSVP, confirmation, edit/cancel, day-of check-in, and post-event survey.

### Admin Flow
1. Admin creates an event and configures settings.
2. Admin uploads invite list.
3. Admin opens the event, which triggers invitations.
4. Admin monitors responses and reminder status.
5. Admin manages attendees, individual records, corrections, and audit history.
6. Admin closes registration at the deadline or manually.
7. Admin manages event-day check-in, including walk-ins and no-shows.
8. Admin sends post-event survey after the event.
9. Admin reviews and exports results.
10. Admin archives the event after retention/business process is complete.

The admin flow should be represented in the POC step by step, covering all admin screens from the design document rather than only a partial dashboard.

### Admin Screen Inventory
1. Event Dashboard
   - View all events.
   - Filter by event status.
   - Show response counts and high-level event health.

2. Event Setup / Edit
   - Create or modify event details.
   - Configure date, location, capacity display if needed, deadlines, form links, survey type, and event-specific questions.
   - Support event-specific fields by event type:
     - AEAE: hotel room and table number.
     - Picnic: kid number and kid name.
     - Oktoberfest: no special extra information needed.
     - Happy hour: guest name.

3. Upload Invite List
   - Bulk add invitees.
   - Support CSV/template upload.
   - Validate required fields.

4. Response Monitoring
   - Show real-time registration statistics.
   - Show status breakdown.
   - Filter by registration status, contract, department, response status, or other key fields.
   - Show reminder cadence/status for non-respondents.

5. Attendee Management
   - View and update individual attendee records.
   - Support status correction.
   - Show audit log for important changes.

6. Registration Closed
   - Show current count and closure confirmation.
   - Prevent further attendee edits after close.

7. Day-of Check-in
   - Support iPad-first check-in.
   - Allow name search.
   - Allow manual entry fallback for walk-ins.
   - Track checked-in, walk-in, and no-show statuses separately from registration status.

8. Results Export
   - Review event results and post-event survey summary.
   - Export to Excel.

### Attendee Screen Inventory
1. Event Invitation Page
   - Show event details and RSVP button.
   - If registration is closed, show: "This registration is now closed. Please contact Rebecca Bunch (rebecca.bunch@nw-its.com) if you have any questions."

2. RSVP Form
   - Collect required registration information.
   - Support event-specific questions.
   - Support photo consent.
   - Support contract dropdown with "Other" option.
   - Visually resemble an MS Forms experience.

3. Confirmation Page
   - Show success message.
   - Offer edit/cancel options.
   - Offer calendar link.
   - Send copy of registration by email.

4. Edit / Cancel RSVP
   - Allow changes until registration closes.
   - Latest submission overwrites previous response.
   - Cancellation deadline is the same as RSVP deadline.

5. Post-event Survey
   - Sent only to checked-in attendees.
   - Use survey questions and rating scales.
   - Visually resemble an MS Forms experience.

### Status Definitions
Registration status tracks pre-event RSVP activity:
1. Invited: attendee is included in invite list but has not responded.
2. Registered: attendee submitted RSVP indicating attendance.
3. Declined: attendee submitted RSVP indicating they will not attend.
4. Canceled: attendee registered, then canceled before the deadline.

Attendance status tracks event-day attendance and is independent from registration status:
1. Not Checked In: pre-registered attendee has not checked in yet.
2. Checked In: attendee arrived and checked in.
3. Walk-in: attendee was not pre-registered and was manually added.
4. No-show: pre-registered attendee did not check in by event close, with admin override if needed.

Event status tracks event lifecycle:
1. Draft / Set-up: admin is configuring the event.
2. Open Event: registration is available and invitations/reminders may be sent.
3. Registration Closed: no further responses accepted.
4. Completed: event has taken place and post-event actions may begin.
5. Archived: event is stored for reference and no further updates are allowed.

### Functional Requirements
1. Keep registration status, attendance status, and event status separate.
2. Support latest-submission-wins behavior for attendee RSVP edits.
3. Support configurable attendee audiences per event, including NIS employees and contractors.
4. Require name and email for identified users during RSVP.
5. At check-in, require first name, last name, contract, and plus-one name when applicable.
6. Do not require email during event-day check-in.
7. Handle non-NIS guests through plus-one or guest fields.
8. Support event-specific fields and simple branching logic.
9. Support multiple-choice questions, but no file uploads.
10. Do not include waitlist logic for this POC because SME decision says waitlist is not needed.
11. Support automated reminder cadence: weekly until final week, then 3 reminders in the final week.
12. Do not include PM escalation for non-respondents.
13. Include audit log concept for admin changes.
14. Retain event data for 90 days after event, then archive or remove based on final policy.
15. Support Excel export for registration/check-in/results.
16. Include both attendee-facing and admin-facing screens in the POC.
17. Design check-in screens primarily for iPad use.
18. Mock attendee forms directly in the POC instead of using external MS Forms links.
19. Include sample event configurations for AEAE, Picnic, Oktoberfest, and Happy Hour.

### Out of Scope for POC
1. Production Power Apps implementation.
2. Live SharePoint List connection.
3. Real Entra ID integration.
4. Real email sending or automation flows.
5. Real MS Forms integration.
6. QR code check-in unless Sol approves it later.
7. Waitlist and waitlist promotion.
8. File upload questions.

### POC Build Direction
1. Build simple, easy-to-debug screens that communicate the intended Power Apps experience.
2. Use sample data only.
3. Prioritize admin workflow clarity over visual polish.
4. Make the UI understandable to a developer who will later build the real Power Apps + SharePoint version.
5. Avoid unnecessary dependencies or complex architecture.
6. Build the full flow step by step so Sol can review one screen/workflow at a time.
7. Prioritize iPad usability for day-of check-in screens, including large touch targets and simple search/manual entry.

### Confirmed POC Decisions
1. Include both attendee-facing screens and admin-facing screens.
2. Cover the full design flow step by step.
3. Include sample event types:
   - AEAE with hotel room and table number.
   - Picnic with kid number and kid name.
   - Oktoberfest with no special additional fields.
   - Happy Hour with guest name.
4. Design check-in primarily for iPad.
5. Mock attendee forms so they look like MS Forms.
6. Use Rebecca Bunch as the closed-registration contact: rebecca.bunch@nw-its.com.

### Remaining Questions for Sol
1. Should the iPad check-in target landscape only, or should portrait also be supported?
2. For Picnic, should kid name allow multiple names in one field, or one row per child?
3. For AEAE, is table number assigned by admin only, or can attendee select/request it?

## Sol Approval
[ ] Approved / [ ] Revise
