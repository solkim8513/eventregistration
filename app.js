// ── Sample data ────────────────────────────────────────────────────────────

const happyHour = {
  id: "happy-hour",
  title: "Happy Hour",
  type: "Happy Hour",
  date: "Friday, May 16, 2026",
  time: "5:00 PM - 7:00 PM",
  location: "The Rooftop Bar & Lounge",
  status: "Open",        // Event status: Draft | Open | Closed | Completed | Archived
  capacity: 80,
  rsvpDeadline: "May 9, 2026",
  owner: "Rebecca Bunch",
  surveySent: false,
  attendees: [
    // regStatus:        Invited | Registered | Declined | Canceled
    // attendanceStatus: Not Checked In | Checked In | Walk-in | No-show | —
    { id: 1,  firstName: "Sarah",   lastName: "Chen",     contract: "NIS Employee",           department: "IT",            regStatus: "Registered", guestName: "Tom Chen",  dietary: "",            attendanceStatus: "Checked In",     remindersSent: 0, respondedAt: "Apr 28" },
    { id: 2,  firstName: "Marcus",  lastName: "Johnson",  contract: "NIS Employee",           department: "Finance",       regStatus: "Registered", guestName: "",          dietary: "Vegetarian",  attendanceStatus: "Not Checked In", remindersSent: 0, respondedAt: "Apr 30" },
    { id: 3,  firstName: "Priya",   lastName: "Patel",    contract: "Contractor - SAIC",      department: "HR",            regStatus: "Registered", guestName: "Raj Patel", dietary: "",            attendanceStatus: "Not Checked In", remindersSent: 1, respondedAt: "May 1"  },
    { id: 4,  firstName: "David",   lastName: "Kim",      contract: "NIS Employee",           department: "Operations",    regStatus: "Declined",   guestName: "",          dietary: "",            attendanceStatus: "—",              remindersSent: 0, respondedAt: "Apr 29" },
    { id: 5,  firstName: "Emily",   lastName: "Torres",   contract: "NIS Employee",           department: "Marketing",     regStatus: "Registered", guestName: "",          dietary: "Gluten-free", attendanceStatus: "Checked In",     remindersSent: 0, respondedAt: "Apr 27" },
    { id: 6,  firstName: "James",   lastName: "Wright",   contract: "Contractor - Leidos",    department: "Legal",         regStatus: "Invited",    guestName: "",          dietary: "",            attendanceStatus: "—",              remindersSent: 2, respondedAt: ""       },
    { id: 7,  firstName: "Lisa",    lastName: "Park",     contract: "NIS Employee",           department: "Customer Care", regStatus: "Canceled",   guestName: "",          dietary: "",            attendanceStatus: "—",              remindersSent: 0, respondedAt: "May 2"  },
    { id: 8,  firstName: "Robert",  lastName: "Chen",     contract: "Contractor - Booz Allen",department: "Compliance",    regStatus: "Registered", guestName: "Nina Chen", dietary: "No pork",     attendanceStatus: "Not Checked In", remindersSent: 1, respondedAt: "Apr 30" },
    { id: 9,  firstName: "Amanda",  lastName: "Rivera",   contract: "NIS Employee",           department: "Sales",         regStatus: "Invited",    guestName: "",          dietary: "",            attendanceStatus: "—",              remindersSent: 2, respondedAt: ""       },
    { id: 10, firstName: "Michael", lastName: "Thompson", contract: "NIS Employee",           department: "Facilities",    regStatus: "Registered", guestName: "",          dietary: "",            attendanceStatus: "Walk-in",        remindersSent: 0, respondedAt: "Walk-in"},
  ],
};

const otherEvents = [
  { id: "employee-appreciation", title: "Employee Appreciation Lunch", date: "May 17, 2026",   location: "Main Office Cafe",        status: "Open",  capacity: 120, registered: 4, checkedIn: 1 },
  { id: "spring-picnic",         title: "Spring Picnic",               date: "June 8, 2026",    location: "Riverside Park Pavilion", status: "Draft", capacity: 220, registered: 3, checkedIn: 0 },
  { id: "oktoberfest",           title: "Oktoberfest",                 date: "October 3, 2026", location: "NIS Event Hall",          status: "Draft", capacity: 180, registered: 4, checkedIn: 1 },
];

const auditLog = [
  { timestamp: "May 2, 2026 10:14 AM",  attendee: "Lisa Park",   change: "Registration status: Registered → Canceled", changedBy: "Rebecca Bunch"      },
  { timestamp: "May 1, 2026 2:30 PM",   attendee: "Priya Patel", change: "Guest name added: Raj Patel",                     changedBy: "Priya Patel (self)" },
  { timestamp: "Apr 30, 2026 11:00 AM", attendee: "Robert Chen", change: "Dietary note added: No pork",                     changedBy: "Robert Chen (self)" },
];

const reminderSchedule = [
  { date: "Apr 20, 2026", audience: "All invited (10)",    type: "Initial invitation",      status: "Sent"      },
  { date: "Apr 27, 2026", audience: "Non-respondents (4)", type: "Weekly reminder",         status: "Sent"      },
  { date: "May 4, 2026",  audience: "Non-respondents (2)", type: "Weekly reminder",         status: "Scheduled" },
  { date: "May 11, 2026", audience: "Non-respondents",     type: "Final week — reminder 1", status: "Scheduled" },
  { date: "May 13, 2026", audience: "Non-respondents",     type: "Final week — reminder 2", status: "Scheduled" },
  { date: "May 15, 2026", audience: "Non-respondents",     type: "Final week — reminder 3", status: "Scheduled" },
];

const uploadPreviewData = [
  { row: 1, firstName: "Sarah",  lastName: "Chen",    email: "sarah.chen@nw-its.com",    contract: "NIS Employee",      department: "IT"        },
  { row: 2, firstName: "Marcus", lastName: "Johnson",  email: "marcus.johnson@nw-its.com",contract: "NIS Employee",      department: "Finance"   },
  { row: 3, firstName: "Priya",  lastName: "Patel",   email: "priya.patel@nw-its.com",   contract: "Contractor - SAIC", department: "HR"        },
  { row: 4, firstName: "David",  lastName: "Kim",     email: "david.kim@nw-its.com",     contract: "NIS Employee",      department: "Operations"},
  { row: 5, firstName: "Emily",  lastName: "Torres",  email: "emily.torres@nw-its.com",  contract: "NIS Employee",      department: "Marketing" },
];

// ── State ──────────────────────────────────────────────────────────────────

var selectedEventId = "happy-hour";
var rsvpState       = null;
var rsvpCanceled    = false;

// ── Helpers ────────────────────────────────────────────────────────────────

function hh() { return happyHour.attendees; }

function fullName(a) { return a.firstName + " " + a.lastName; }

function badgeClass(status) {
  if (["Open", "Registered", "Checked In", "Sent", "Completed"].indexOf(status) !== -1) return "green";
  if (["Draft", "Invited", "Scheduled", "Walk-in", "Not Checked In"].indexOf(status) !== -1) return "amber";
  if (["Declined", "Canceled", "No-show", "Closed", "Archived"].indexOf(status) !== -1) return "red";
  return "";
}

function statBox(label, value, colorClass) {
  return '<div class="stat-box"><span>' + label + '</span><strong class="' + (colorClass || "") + '">' + value + "</strong></div>";
}

function eventStatusPill(status) {
  return '<span class="event-status-pill status-' + status.toLowerCase().replace(/\s/g, "-") + '">' + status + "</span>";
}

// ── Toast ──────────────────────────────────────────────────────────────────

function showToast(msg, isError) {
  var prev = document.querySelector(".toast");
  if (prev) prev.remove();
  var el = document.createElement("div");
  el.className = "toast" + (isError ? " toast-error" : "");
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(function() { el.classList.add("visible"); }, 10);
  setTimeout(function() {
    el.classList.remove("visible");
    setTimeout(function() { if (el.parentNode) el.parentNode.removeChild(el); }, 300);
  }, 3200);
}

// ── View manager ───────────────────────────────────────────────────────────

function showShell(shell, screenId) {
  document.getElementById("adminShell").classList.toggle("hidden", shell !== "admin");
  document.getElementById("attendeeShell").classList.toggle("hidden", shell !== "attendee");
  if (screenId) showScreen(screenId);
}

function showScreen(id) {
  document.querySelectorAll(".screen").forEach(function(s) { s.classList.add("hidden"); });
  var target = document.getElementById(id);
  if (target) target.classList.remove("hidden");

  document.querySelectorAll(".nav-item[data-screen]").forEach(function(btn) {
    btn.classList.toggle("active", btn.dataset.screen === id);
  });

  if (id === "screen-dashboard")     renderDashboard();
  if (id === "screen-setup")         renderSetupStatus();
  if (id === "screen-upload")        renderUploadPreview();
  if (id === "screen-monitoring")    renderMonitoring();
  if (id === "screen-attendee-mgmt") renderAttendeeMgmt();
  if (id === "screen-closed")        renderClosed();
  if (id === "screen-checkin")       renderCheckin();
  if (id === "screen-export")        renderExport();
  if (id === "screen-edit-rsvp")     prefillEditForm();
  if (id === "screen-invite")        renderInvitePage();
}

// ── Event status transitions ────────────────────────────────────────────────

function saveAsDraft() {
  happyHour.status = "Draft";
  showToast("Happy Hour saved as Draft.");
  showScreen("screen-dashboard");
}

function openEvent() {
  happyHour.status = "Open";
  showToast("Happy Hour is now Open. Invitations will be sent to " + hh().length + " attendees.");
  showScreen("screen-dashboard");
}

function closeRegistrationNow() {
  happyHour.status = "Closed";
  showScreen("screen-closed");
}

function sendPostEventSurvey() {
  var eligible = hh().filter(function(a) {
    return a.attendanceStatus === "Checked In" || a.attendanceStatus === "Walk-in";
  });
  happyHour.status = "Completed";
  happyHour.surveySent = true;
  renderExport();
  showToast("Post-event survey sent to " + eligible.length + " checked-in attendees.");
}

function archiveEvent() {
  happyHour.status = "Archived";
  showToast("Happy Hour has been archived.");
  showScreen("screen-dashboard");
}

function exportToExcel() {
  showToast("Downloaded: Happy_Hour_Results_2026-05-16.xlsx");
}

// ── Dashboard ──────────────────────────────────────────────────────────────

function renderDashboard() {
  var allEvents  = [happyHour].concat(otherEvents);
  var filter     = document.getElementById("statusFilter").value;
  var registered = hh().filter(function(a) { return a.regStatus === "Registered"; }).length;
  var checkedIn  = hh().filter(function(a) { return a.attendanceStatus === "Checked In"; }).length;
  var openCount  = allEvents.filter(function(e) { return e.status === "Open"; }).length;

  document.getElementById("metricEvents").textContent     = allEvents.length;
  document.getElementById("metricRegistered").textContent = registered;
  document.getElementById("metricCheckedIn").textContent  = checkedIn;
  document.getElementById("metricOpen").textContent       = openCount;

  var visible = filter === "all" ? allEvents : allEvents.filter(function(e) { return e.status === filter; });

  document.getElementById("eventList").innerHTML = visible.map(function(ev) {
    var reg = ev.id === "happy-hour" ? hh().filter(function(a) { return a.regStatus === "Registered"; }).length : (ev.registered || 0);
    var ci  = ev.id === "happy-hour" ? hh().filter(function(a) { return a.attendanceStatus === "Checked In"; }).length : (ev.checkedIn || 0);
    var loc = ev.id === "happy-hour" ? ev.date + " · " + ev.location : ev.date + " – " + ev.location;
    return '<button class="event-row ' + (ev.id === selectedEventId ? "active" : "") + '" data-event-id="' + ev.id + '" type="button">'
      + '<div class="event-row-header"><strong>' + ev.title + '</strong><span class="badge ' + badgeClass(ev.status) + '">' + ev.status + '</span></div>'
      + '<p>' + loc + '</p>'
      + '<span>' + reg + ' registered · ' + ci + ' checked in · Cap: ' + ev.capacity + '</span>'
      + '</button>';
  }).join("");

  renderEventDetail();
}

function renderEventDetail() {
  var isHH = selectedEventId === "happy-hour";
  var ev = isHH ? happyHour : otherEvents.find(function(e) { return e.id === selectedEventId; });
  if (!ev) return;

  document.getElementById("eventStatus").textContent = ev.status;
  document.getElementById("eventTitle").textContent  = ev.title;
  var reg = isHH ? hh().filter(function(a) { return a.regStatus === "Registered"; }).length : (ev.registered || 0);
  document.getElementById("eventCapacity").textContent = reg + " / " + ev.capacity + " registered";
  document.getElementById("eventMeta").textContent = isHH
    ? ev.date + " · " + ev.time + " · " + ev.location + " · Owner: " + ev.owner
    : ev.date + " · " + ev.location;

  if (isHH) {
    // Context-aware quick actions based on current event status
    var actions = "";
    if (ev.status === "Draft" || ev.status === "Open") {
      actions += '<button class="secondary-button" onclick="showScreen(\'screen-setup\')">Edit event setup</button>';
      actions += '<button class="secondary-button" onclick="showScreen(\'screen-upload\')">Upload invite list</button>';
      actions += '<button class="secondary-button" onclick="showScreen(\'screen-monitoring\')">Response monitoring</button>';
      actions += '<button class="secondary-button" onclick="showScreen(\'screen-attendee-mgmt\')">Attendee management</button>';
    }
    if (ev.status === "Open") {
      actions += '<button class="primary-button" onclick="closeRegistrationNow()">Close registration</button>';
    }
    if (ev.status === "Closed" || ev.status === "Completed") {
      actions += '<button class="secondary-button" onclick="showScreen(\'screen-attendee-mgmt\')">Attendee management</button>';
      actions += '<button class="secondary-button" onclick="showScreen(\'screen-checkin\')">Day-of check-in</button>';
      actions += '<button class="secondary-button" onclick="showScreen(\'screen-export\')">Results &amp; export</button>';
    }
    if (ev.status === "Completed" || ev.status === "Archived") {
      actions += '<button class="secondary-button" onclick="showScreen(\'screen-export\')">Results &amp; export</button>';
    }
    document.getElementById("eventQuickActions").innerHTML =
      '<div class="quick-actions-grid" style="margin-top:8px">' + actions + '</div>';
  } else {
    document.getElementById("eventQuickActions").innerHTML =
      '<p style="color:var(--muted);font-size:0.85rem;margin-top:12px">Select <strong>Happy Hour</strong> to walk through the full end-to-end demo workflow.</p>';
  }
}

// ── Event Setup ────────────────────────────────────────────────────────────

function renderSetupStatus() {
  var el = document.getElementById("setupStatusBadge");
  if (el) el.innerHTML = eventStatusPill(happyHour.status);
}

// ── Upload invite list ─────────────────────────────────────────────────────

function renderUploadPreview() {
  document.getElementById("uploadPreviewRows").innerHTML = uploadPreviewData.map(function(row) {
    return "<tr><td>" + row.row + "</td><td>" + row.firstName + "</td><td>" + row.lastName
      + "</td><td>" + row.email + "</td><td>" + row.contract + "</td><td>" + row.department
      + "</td><td><span class=\"badge green\">Valid</span></td></tr>";
  }).join("");
}

function confirmInvitees() {
  var banner = document.getElementById("uploadSuccessBanner");
  if (banner) {
    banner.classList.remove("hidden");
    banner.textContent = "✓ 10 invitees added to Happy Hour. Invitations will be sent when the event is opened.";
  }
  showToast("10 invitees confirmed for Happy Hour.");
}

// ── Response monitoring ────────────────────────────────────────────────────

function renderMonitoring() {
  var invited    = hh().filter(function(a) { return a.regStatus === "Invited";     }).length;
  var registered = hh().filter(function(a) { return a.regStatus === "Registered"; }).length;
  var declined   = hh().filter(function(a) { return a.regStatus === "Declined";   }).length;
  var canceled   = hh().filter(function(a) { return a.regStatus === "Canceled";   }).length;

  document.getElementById("monitoringStats").innerHTML =
    statBox("Invited (no response)", invited, "amber") +
    statBox("Registered",  registered, "green") +
    statBox("Declined",    declined,   "red")   +
    statBox("Canceled",    canceled,   "red")   +
    statBox("Total invited", hh().length);

  renderMonitoringTable();
  renderReminderLog();
}

function renderMonitoringTable() {
  var filter = document.getElementById("monitorFilter").value;
  var search = (document.getElementById("monitorSearch").value || "").toLowerCase();
  var rows = hh().filter(function(a) {
    if (filter !== "all" && a.regStatus !== filter) return false;
    if (search && fullName(a).toLowerCase().indexOf(search) === -1) return false;
    return true;
  });
  document.getElementById("monitoringRows").innerHTML = rows.map(function(a) {
    return "<tr>"
      + "<td><strong>" + fullName(a) + "</strong></td>"
      + "<td>" + a.contract + "</td>"
      + "<td>" + a.department + "</td>"
      + "<td><span class=\"badge " + badgeClass(a.regStatus) + "\">" + a.regStatus + "</span></td>"
      + "<td>" + (a.guestName || "—") + "</td>"
      + "<td>" + (a.respondedAt || "—") + "</td>"
      + "<td>" + a.remindersSent + "</td>"
      + "</tr>";
  }).join("");
}

function renderReminderLog() {
  document.getElementById("reminderLog").innerHTML = reminderSchedule.map(function(r) {
    return "<tr><td>" + r.date + "</td><td>" + r.audience + "</td><td>" + r.type
      + "</td><td><span class=\"badge " + badgeClass(r.status) + "\">" + r.status + "</span></td></tr>";
  }).join("");
}

function sendReminderNow() {
  var nonRespondents = hh().filter(function(a) { return a.regStatus === "Invited"; });
  if (nonRespondents.length === 0) {
    showToast("No non-respondents to remind.", true);
    return;
  }
  reminderSchedule.unshift({
    date:     "May 4, 2026 (sent now)",
    audience: "Non-respondents (" + nonRespondents.length + ")",
    type:     "Manual reminder",
    status:   "Sent",
  });
  nonRespondents.forEach(function(a) { a.remindersSent += 1; });
  renderReminderLog();
  renderMonitoringTable();
  showToast("Reminder sent to " + nonRespondents.length + " non-respondents.");
}

// ── Attendee management ────────────────────────────────────────────────────

function renderAttendeeMgmt() {
  renderMgmtTable();
  document.getElementById("auditRows").innerHTML = auditLog.map(function(e) {
    return "<tr><td>" + e.timestamp + "</td><td>" + e.attendee + "</td><td>" + e.change + "</td><td>" + e.changedBy + "</td></tr>";
  }).join("");
}

function renderMgmtTable() {
  var search = (document.getElementById("mgmtSearch").value || "").toLowerCase();
  var rows = hh().filter(function(a) {
    return !search
      || fullName(a).toLowerCase().indexOf(search) !== -1
      || a.regStatus.toLowerCase().indexOf(search) !== -1;
  });
  var regStatuses = ["Invited", "Registered", "Declined", "Canceled"];
  document.getElementById("mgmtRows").innerHTML = rows.map(function(a) {
    var opts = regStatuses.map(function(s) {
      return '<option' + (s === a.regStatus ? ' selected' : '') + '>' + s + '</option>';
    }).join("");
    return "<tr>"
      + "<td><strong>" + fullName(a) + "</strong></td>"
      + "<td>" + a.contract + "</td>"
      + "<td>" + a.department + "</td>"
      + "<td><select class=\"inline-status-select\" onchange=\"correctStatus(" + a.id + ",this.value)\">" + opts + "</select></td>"
      + "<td>" + (a.guestName || "—") + "</td>"
      + "<td>" + (a.dietary || "—") + "</td>"
      + "<td><button class=\"secondary-button\" style=\"font-size:0.8rem;min-height:28px;padding:0 8px\" onclick=\"alertSave('Status corrected for " + fullName(a) + "')\">Save</button></td>"
      + "</tr>";
  }).join("");
}

function correctStatus(id, newStatus) {
  var a = happyHour.attendees.find(function(x) { return x.id === id; });
  if (!a || a.regStatus === newStatus) return;
  var oldStatus = a.regStatus;
  a.regStatus = newStatus;
  auditLog.unshift({
    timestamp: "May 4, 2026 (now)",
    attendee:  fullName(a),
    change:    "Registration status: " + oldStatus + " → " + newStatus,
    changedBy: "Admin (manual correction)",
  });
  document.getElementById("auditRows").innerHTML = auditLog.map(function(e) {
    return "<tr><td>" + e.timestamp + "</td><td>" + e.attendee + "</td><td>" + e.change + "</td><td>" + e.changedBy + "</td></tr>";
  }).join("");
  showToast("Registration status updated: " + fullName(a) + " → " + newStatus);
}

function alertSave(msg) { showToast(msg); }

// ── Registration closed ────────────────────────────────────────────────────

function renderClosed() {
  var registered = hh().filter(function(a) { return a.regStatus === "Registered"; });
  var declined   = hh().filter(function(a) { return a.regStatus === "Declined";   }).length;
  var canceled   = hh().filter(function(a) { return a.regStatus === "Canceled";   }).length;
  var noResp     = hh().filter(function(a) { return a.regStatus === "Invited";    }).length;
  var withGuest  = registered.filter(function(a) { return a.guestName; }).length;

  document.getElementById("closedStats").innerHTML =
    statBox("Attending (registered)", registered.length, "green") +
    statBox("Bringing a guest", withGuest) +
    statBox("Declined",  declined, "red") +
    statBox("Canceled",  canceled, "red") +
    statBox("No response", noResp);

  document.getElementById("closedRows").innerHTML = hh()
    .filter(function(a) { return ["Registered", "Declined", "Canceled"].indexOf(a.regStatus) !== -1; })
    .map(function(a) {
      return "<tr>"
        + "<td><strong>" + fullName(a) + "</strong></td>"
        + "<td>" + a.contract + "</td>"
        + "<td>" + a.department + "</td>"
        + "<td><span class=\"badge " + badgeClass(a.regStatus) + "\">" + a.regStatus + "</span></td>"
        + "<td>" + (a.guestName || "—") + "</td>"
        + "<td>" + (a.dietary || "—") + "</td>"
        + "</tr>";
    }).join("");
}

// ── Day-of check-in ────────────────────────────────────────────────────────

function renderCheckin() {
  renderCheckinList();
  renderCheckinSummary();
  renderNoShowList();

  var ci     = hh().filter(function(a) { return a.attendanceStatus === "Checked In"; }).length;
  var walkin = hh().filter(function(a) { return a.attendanceStatus === "Walk-in";    }).length;
  var notIn  = hh().filter(function(a) { return a.attendanceStatus === "Not Checked In"; }).length;

  document.getElementById("checkinHeaderStats").innerHTML =
    '<div class="checkin-stat"><strong>' + (ci + walkin) + '</strong><span>Checked in</span></div>' +
    '<div class="checkin-stat"><strong>' + notIn + '</strong><span>Not yet arrived</span></div>' +
    '<div class="checkin-stat"><strong>' + walkin + '</strong><span>Walk-ins</span></div>';
}

function renderCheckinList() {
  var search = (document.getElementById("checkinSearch").value || "").toLowerCase();
  var rows = hh().filter(function(a) {
    return a.regStatus === "Registered" &&
      (!search || fullName(a).toLowerCase().indexOf(search) !== -1);
  });
  document.getElementById("checkinList").innerHTML = rows.map(function(a) {
    var isIn     = a.attendanceStatus === "Checked In";
    var isWalkin = a.attendanceStatus === "Walk-in";
    var btnClass = (isIn || isWalkin) ? "secondary-button" : "primary-button";
    var btnLabel = isIn ? "✓ Checked in" : isWalkin ? "Walk-in" : "Check in";
    var detail   = a.contract
      + (a.department ? " · " + a.department : "")
      + (a.guestName  ? " · Guest: " + a.guestName : "")
      + (a.dietary    ? " · " + a.dietary : "");
    return '<div class="checkin-item">'
      + '<div class="checkin-person"><strong>' + fullName(a) + '</strong><span>' + detail + '</span></div>'
      + '<button class="' + btnClass + '" onclick="toggleCheckinById(' + a.id + ')" type="button" style="min-height:44px;min-width:110px">'
      + btnLabel + '</button></div>';
  }).join("");
}

function toggleCheckinById(id) {
  var a = happyHour.attendees.find(function(x) { return x.id === id; });
  if (!a) return;
  var wasIn = a.attendanceStatus === "Checked In";
  a.attendanceStatus = wasIn ? "Not Checked In" : "Checked In";
  showToast(wasIn ? fullName(a) + " check-in undone." : fullName(a) + " checked in.");
  renderCheckin();
}

function renderCheckinSummary() {
  var ci     = hh().filter(function(a) { return a.attendanceStatus === "Checked In";     }).length;
  var notIn  = hh().filter(function(a) { return a.attendanceStatus === "Not Checked In"; }).length;
  var walkin = hh().filter(function(a) { return a.attendanceStatus === "Walk-in";        }).length;
  var noshow = hh().filter(function(a) { return a.attendanceStatus === "No-show";        }).length;

  document.getElementById("checkinSummaryCards").innerHTML =
    '<div class="summary-card green"><span>Checked in</span><strong>' + ci     + '</strong></div>' +
    '<div class="summary-card amber"><span>Not yet arrived</span><strong>' + notIn  + '</strong></div>' +
    '<div class="summary-card blue"><span>Walk-ins</span><strong>'  + walkin + '</strong></div>' +
    '<div class="summary-card red"><span>No-shows</span><strong>'   + noshow + '</strong></div>';
}

function renderNoShowList() {
  var pending = hh().filter(function(a) {
    return a.regStatus === "Registered" && a.attendanceStatus === "Not Checked In";
  });
  document.getElementById("noshowList").innerHTML = pending.length === 0
    ? '<p style="color:var(--muted);font-size:0.88rem">All pre-registered attendees have been accounted for.</p>'
    : pending.map(function(a) {
        return '<div class="noshow-item"><span>' + fullName(a)
          + ' <small style="color:var(--muted)">(' + a.contract + ')</small></span>'
          + '<button class="secondary-button" style="font-size:0.82rem;min-height:34px" onclick="markNoshow(' + a.id + ')" type="button">Mark no-show</button></div>';
      }).join("");
}

function markNoshow(id) {
  var a = happyHour.attendees.find(function(x) { return x.id === id; });
  if (!a) return;
  a.attendanceStatus = "No-show";
  showToast(fullName(a) + " marked as no-show.");
  renderCheckin();
}

function addWalkin() {
  var first    = document.getElementById("walkinFirst").value.trim();
  var last     = document.getElementById("walkinLast").value.trim();
  var contract = document.getElementById("walkinContract").value;
  var guest    = document.getElementById("walkinGuest").value.trim();
  if (!first || !last) {
    showToast("First name and last name are required.", true);
    return;
  }
  happyHour.attendees.push({
    id: Date.now(),
    firstName: first, lastName: last,
    contract: contract, department: "—",
    regStatus: "Walk-in",  guestName: guest,
    dietary: "",           attendanceStatus: "Walk-in",
    remindersSent: 0,      respondedAt: "Walk-in",
  });
  document.getElementById("walkinFirst").value = "";
  document.getElementById("walkinLast").value  = "";
  document.getElementById("walkinGuest").value = "";
  showToast(first + " " + last + " added as walk-in and checked in.");
  renderCheckin();
}

// ── Results & Export ───────────────────────────────────────────────────────

function renderExport() {
  var registered = hh().filter(function(a) { return a.regStatus === "Registered"; }).length;
  var ci         = hh().filter(function(a) { return a.attendanceStatus === "Checked In"; }).length;
  var walkin     = hh().filter(function(a) { return a.attendanceStatus === "Walk-in";    }).length;

  document.getElementById("exportStats").innerHTML =
    statBox("Total invited",    hh().length) +
    statBox("Registered",       registered,      "green") +
    statBox("Checked in",       ci + walkin,     "green") +
    statBox("Survey responses", happyHour.surveySent ? "3 of " + (ci + walkin) : "Not yet sent", happyHour.surveySent ? "amber" : "");

  // Registration status and attendance status shown in separate columns
  document.getElementById("exportRows").innerHTML = hh().map(function(a) {
    return "<tr>"
      + "<td><strong>" + fullName(a) + "</strong></td>"
      + "<td>" + a.contract + "</td>"
      + "<td><span class=\"badge " + badgeClass(a.regStatus) + "\">" + a.regStatus + "</span></td>"
      + "<td><span class=\"badge " + badgeClass(a.attendanceStatus) + "\">" + a.attendanceStatus + "</span></td>"
      + "<td>" + (a.guestName || "—") + "</td>"
      + "</tr>";
  }).join("");

  var surveyEl = document.getElementById("surveyResults");
  if (happyHour.surveySent) {
    surveyEl.innerHTML =
      '<div class="survey-result-row"><span>Overall rating</span><div class="survey-stars">&#9733;&#9733;&#9733;&#9733;&#9734;</div><span>4.2 avg (3 responses)</span></div>'
      + '<div class="survey-result-row"><span>Venue rating</span><div class="survey-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div><span>4.7 avg</span></div>'
      + '<div class="survey-result-row"><span>Food &amp; beverages</span><div class="survey-stars">&#9733;&#9733;&#9733;&#9733;&#9734;</div><span>4.0 avg</span></div>'
      + '<div class="survey-result-row"><span>Would recommend</span><div></div><span>3 Yes, 0 No, 0 Maybe</span></div>'
      + '<p style="margin-top:16px;font-size:0.85rem;color:var(--muted)">Survey sent to ' + (ci + walkin) + ' checked-in attendees. 3 responses received.</p>';
  } else {
    surveyEl.innerHTML = '<p style="color:var(--muted);font-size:0.88rem">Survey has not been sent yet. Use the <strong>Send post-event survey</strong> button above to send it to checked-in attendees.</p>';
  }

  // Show/hide survey button based on state
  var surveyBtn = document.getElementById("btnSendSurvey");
  if (surveyBtn) {
    surveyBtn.style.display = happyHour.surveySent ? "none" : "";
    surveyBtn.textContent   = happyHour.surveySent ? "Survey sent" : "Send post-event survey";
  }

  // Event status pill
  var statusPill = document.getElementById("exportEventStatus");
  if (statusPill) statusPill.innerHTML = "Event status: " + eventStatusPill(happyHour.status);
}

// ── Attendee invite page ────────────────────────────────────────────────────

function renderInvitePage() {
  var isClosed = ["Closed", "Completed", "Archived"].indexOf(happyHour.status) !== -1;
  var openBlock   = document.getElementById("inviteOpenBlock");
  var closedBlock = document.getElementById("inviteClosedBlock");
  if (openBlock)   openBlock.classList.toggle("hidden", isClosed);
  if (closedBlock) closedBlock.classList.toggle("hidden", !isClosed);
}

// ── RSVP form ──────────────────────────────────────────────────────────────

function toggleGuestField(radio) {
  document.getElementById("guestNameQuestion").style.display = radio.value === "yes" ? "block" : "none";
}

function submitRSVP() {
  var first    = document.getElementById("rsvpFirst").value.trim();
  var last     = document.getElementById("rsvpLast").value.trim();
  var email    = document.getElementById("rsvpEmail").value.trim();
  var contract = document.getElementById("rsvpContract").value;
  var attended = document.querySelector('input[name="rsvpAttend"]:checked');

  if (!first || !last || !email || !contract || !attended) {
    showToast("Please complete all required fields before submitting.", true);
    return;
  }

  rsvpState = {
    firstName:    first,
    lastName:     last,
    email:        email,
    contract:     contract,
    department:   document.getElementById("rsvpDept").value.trim(),
    attending:    attended.value === "yes",
    guestName:    document.getElementById("rsvpGuest").value.trim(),
    dietary:      document.getElementById("rsvpDietary").value.trim(),
    photoConsent: document.getElementById("rsvpPhoto").checked,
  };
  rsvpCanceled = false;
  showScreen("screen-confirm");
  renderConfirmation();
}

function renderConfirmation() {
  var iconEl    = document.getElementById("confirmIcon");
  var headingEl = document.getElementById("confirmHeading");
  var msgEl     = document.getElementById("confirmMessage");
  var detailEl  = document.getElementById("confirmDetails");
  var actionsEl = document.getElementById("confirmActions");

  if (rsvpCanceled) {
    iconEl.style.background = "#b42318";
    headingEl.textContent = "Your registration has been canceled.";
    msgEl.textContent = "You may re-submit your RSVP before the deadline if your plans change.";
    detailEl.innerHTML = "";
    actionsEl.innerHTML = '<button class="forms-submit-btn" onclick="showScreen(\'screen-rsvp\')">Re-submit RSVP</button>';
    return;
  }

  var s = rsvpState;
  iconEl.style.background = s.attending ? "#1f8a5b" : "#146c94";
  headingEl.textContent = s.attending
    ? "Your RSVP has been submitted!"
    : "Response received — you’ve declined.";
  msgEl.textContent = s.attending
    ? "Thank you! A confirmation has been sent to your email."
    : "Thank you for letting us know. You can update your response before the deadline.";

  if (s.attending) {
    detailEl.innerHTML = '<div class="confirm-detail-grid">'
      + '<div><span class="detail-label">Name</span><span>' + s.firstName + " " + s.lastName + "</span></div>"
      + '<div><span class="detail-label">Email</span><span>' + s.email + "</span></div>"
      + '<div><span class="detail-label">Contract</span><span>' + s.contract + "</span></div>"
      + (s.guestName ? '<div><span class="detail-label">Guest</span><span>' + s.guestName + "</span></div>" : "")
      + (s.dietary   ? '<div><span class="detail-label">Dietary / access.</span><span>' + s.dietary + "</span></div>" : "")
      + '<div><span class="detail-label">Photo consent</span><span>' + (s.photoConsent ? "Consented" : "Not consented") + "</span></div>"
      + "</div>";
    actionsEl.innerHTML =
      '<button class="forms-secondary-btn" onclick="showScreen(\'screen-edit-rsvp\')">Edit my RSVP</button>'
      + '<button class="forms-secondary-btn" onclick="showToast(\'Calendar invite downloaded\')">Add to calendar</button>'
      + '<button class="forms-text-btn" onclick="cancelRSVP()">Cancel my registration</button>';
  } else {
    detailEl.innerHTML = "";
    actionsEl.innerHTML = '<button class="forms-secondary-btn" onclick="showScreen(\'screen-edit-rsvp\')">Change my response</button>';
  }
}

function cancelRSVP() {
  if (!confirm("Cancel your registration for Happy Hour? You can re-register before the deadline.")) return;
  rsvpCanceled = true;
  showScreen("screen-confirm");
  renderConfirmation();
}

function prefillEditForm() {
  if (!rsvpState) return;
  var s = rsvpState;
  document.getElementById("editFirst").value   = s.firstName;
  document.getElementById("editLast").value    = s.lastName;
  document.getElementById("editEmail").value   = s.email;
  document.getElementById("editDept").value    = s.department;
  document.getElementById("editGuest").value   = s.guestName;
  document.getElementById("editDietary").value = s.dietary;
  document.getElementById("editPhoto").checked = s.photoConsent;
  document.querySelectorAll('input[name="editAttend"]').forEach(function(r) {
    r.checked = (r.value === "yes") === s.attending;
  });
  var sel = document.getElementById("editContract");
  for (var i = 0; i < sel.options.length; i++) {
    if (sel.options[i].text === s.contract) { sel.selectedIndex = i; break; }
  }
}

function updateRSVP() {
  var first    = document.getElementById("editFirst").value.trim();
  var last     = document.getElementById("editLast").value.trim();
  var email    = document.getElementById("editEmail").value.trim();
  var contract = document.getElementById("editContract").value;
  var attended = document.querySelector('input[name="editAttend"]:checked');

  if (!first || !last || !email || !contract || !attended) {
    showToast("Please complete all required fields.", true);
    return;
  }
  rsvpState = {
    firstName:    first,    lastName:     last,
    email:        email,    contract:     contract,
    department:   document.getElementById("editDept").value.trim(),
    attending:    attended.value === "yes",
    guestName:    document.getElementById("editGuest").value.trim(),
    dietary:      document.getElementById("editDietary").value.trim(),
    photoConsent: document.getElementById("editPhoto").checked,
  };
  rsvpCanceled = false;
  showScreen("screen-confirm");
  renderConfirmation();
}

// ── Survey ─────────────────────────────────────────────────────────────────

function setRating(containerId, val) {
  var container = document.getElementById(containerId);
  container.dataset.rating = val;
  container.querySelectorAll("button").forEach(function(btn) {
    btn.classList.toggle("selected", parseInt(btn.dataset.val) <= val);
  });
}

function submitSurvey() {
  var required = ["ratingOverall", "ratingVenue"];
  for (var i = 0; i < required.length; i++) {
    if (document.getElementById(required[i]).dataset.rating === "0") {
      showToast("Please rate the overall event and venue before submitting.", true);
      return;
    }
  }
  document.getElementById("surveySubmitRow").style.display = "none";
  document.getElementById("surveyThankYou").classList.remove("hidden");
}

// ── Event listeners ────────────────────────────────────────────────────────

document.getElementById("statusFilter").addEventListener("change", renderDashboard);

document.getElementById("eventList").addEventListener("click", function(e) {
  var row = e.target.closest("[data-event-id]");
  if (!row) return;
  selectedEventId = row.dataset.eventId;
  renderDashboard();
});

document.querySelector(".nav-list").addEventListener("click", function(e) {
  var btn = e.target.closest("[data-screen]");
  if (!btn) return;
  showScreen(btn.dataset.screen);
});

document.getElementById("btnAttendeeView").addEventListener("click", function() {
  showShell("attendee", "screen-invite");
});

// ── Init ───────────────────────────────────────────────────────────────────

showScreen("screen-dashboard");
renderDashboard();
