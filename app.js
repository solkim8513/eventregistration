const events = [
  {
    id: "employee-appreciation",
    title: "Employee Appreciation Lunch",
    date: "May 17, 2026",
    location: "Main Office Cafe",
    status: "Open",
    capacity: 120,
    reminder: "Draft ready",
    tasks: [
      { label: "Confirm catering headcount", done: false },
      { label: "Print check-in sheet backup", done: true },
      { label: "Send parking instructions", done: false },
    ],
    registrants: [
      { name: "Mina Park", department: "Operations", guests: 0, dietary: "Vegetarian", status: "Registered", checkedIn: true },
      { name: "James Lee", department: "Finance", guests: 1, dietary: "None", status: "Registered", checkedIn: false },
      { name: "Priya Shah", department: "HR", guests: 0, dietary: "Gluten-free", status: "Registered", checkedIn: false },
      { name: "Carlos Rivera", department: "IT", guests: 2, dietary: "None", status: "Waitlist", checkedIn: false },
    ],
  },
  {
    id: "spring-picnic",
    title: "Spring Picnic",
    date: "June 8, 2026",
    location: "Riverside Park Pavilion",
    status: "Planning",
    capacity: 220,
    reminder: "Not started",
    tasks: [
      { label: "Reserve outdoor games", done: false },
      { label: "Publish registration form", done: false },
      { label: "Confirm rain plan", done: false },
    ],
    registrants: [
      { name: "Angela Kim", department: "Sales", guests: 3, dietary: "Nut allergy", status: "Registered", checkedIn: false },
      { name: "Daniel Cho", department: "Warehouse", guests: 1, dietary: "None", status: "Registered", checkedIn: false },
      { name: "Renee Taylor", department: "Marketing", guests: 2, dietary: "Halal", status: "Registered", checkedIn: false },
    ],
  },
  {
    id: "oktoberfest",
    title: "Oktoberfest",
    date: "October 3, 2026",
    location: "NIS Event Hall",
    status: "Open",
    capacity: 180,
    reminder: "Scheduled",
    tasks: [
      { label: "Finalize drink tickets process", done: true },
      { label: "Confirm live music time", done: false },
      { label: "Review guest policy", done: true },
    ],
    registrants: [
      { name: "Sarah Nguyen", department: "Customer Care", guests: 1, dietary: "None", status: "Registered", checkedIn: false },
      { name: "Omar Hassan", department: "Compliance", guests: 0, dietary: "No pork", status: "Registered", checkedIn: false },
      { name: "Emily Brown", department: "Legal", guests: 1, dietary: "Vegetarian", status: "Registered", checkedIn: false },
      { name: "Mark Wilson", department: "Facilities", guests: 0, dietary: "None", status: "Registered", checkedIn: true },
    ],
  },
];

let selectedEventId = events[0].id;
let activeTab = "registrants";

const eventList = document.querySelector("#eventList");
const statusFilter = document.querySelector("#statusFilter");
const registrantRows = document.querySelector("#registrantRows");
const registrantSearch = document.querySelector("#registrantSearch");
const checkinSearch = document.querySelector("#checkinSearch");
const checkinList = document.querySelector("#checkinList");
const taskList = document.querySelector("#taskList");
const reminderSubject = document.querySelector("#reminderSubject");
const reminderMessage = document.querySelector("#reminderMessage");
const previewSubject = document.querySelector("#previewSubject");
const previewMessage = document.querySelector("#previewMessage");

function selectedEvent() {
  return events.find((event) => event.id === selectedEventId);
}

function renderMetrics() {
  const registered = events.reduce((total, event) => total + event.registrants.length, 0);
  const checkedIn = events.reduce(
    (total, event) => total + event.registrants.filter((person) => person.checkedIn).length,
    0
  );
  const openTasks = events.reduce(
    (total, event) => total + event.tasks.filter((task) => !task.done).length,
    0
  );

  document.querySelector("#metricEvents").textContent = events.length;
  document.querySelector("#metricRegistered").textContent = registered;
  document.querySelector("#metricCheckedIn").textContent = checkedIn;
  document.querySelector("#metricTasks").textContent = openTasks;
}

function badgeClass(value) {
  if (value === "Open" || value === "Registered" || value === "Checked in") return "green";
  if (value === "Planning" || value === "Waitlist") return "amber";
  return "red";
}

function renderEvents() {
  const filter = statusFilter.value;
  const visibleEvents = filter === "all" ? events : events.filter((event) => event.status === filter);

  eventList.innerHTML = visibleEvents
    .map((event) => {
      const checkedIn = event.registrants.filter((person) => person.checkedIn).length;
      return `
        <button class="event-row ${event.id === selectedEventId ? "active" : ""}" data-event-id="${event.id}" type="button">
          <div class="event-row-header">
            <strong>${event.title}</strong>
            <span class="badge ${badgeClass(event.status)}">${event.status}</span>
          </div>
          <p>${event.date} - ${event.location}</p>
          <span>${event.registrants.length} registered - ${checkedIn} checked in</span>
        </button>
      `;
    })
    .join("");
}

function renderEventDetail() {
  const event = selectedEvent();

  document.querySelector("#eventStatus").textContent = event.status;
  document.querySelector("#eventTitle").textContent = event.title;
  document.querySelector("#eventMeta").textContent = `${event.date} - ${event.location} - Reminder: ${event.reminder}`;
  document.querySelector("#eventCapacity").textContent = `${event.registrants.length} / ${event.capacity}`;

  reminderSubject.value = `Reminder: ${event.title}`;
  reminderMessage.value = `Hi team,\n\nThis is a reminder for ${event.title} on ${event.date} at ${event.location}.\n\nPlease update your registration if your plans change.`;
  previewSubject.textContent = reminderSubject.value;
  previewMessage.textContent = reminderMessage.value;

  renderRegistrants();
  renderCheckinList();
  renderTasks();
  renderMetrics();
}

function filteredRegistrants(searchValue) {
  const event = selectedEvent();
  const term = searchValue.trim().toLowerCase();
  if (!term) return event.registrants;

  return event.registrants.filter((person) =>
    [person.name, person.department, person.dietary, person.status].some((field) =>
      field.toLowerCase().includes(term)
    )
  );
}

function renderRegistrants() {
  const rows = filteredRegistrants(registrantSearch.value);
  registrantRows.innerHTML = rows
    .map((person) => {
      const checkLabel = person.checkedIn ? "Checked in" : "Not arrived";
      return `
        <tr>
          <td><strong>${person.name}</strong></td>
          <td>${person.department}</td>
          <td>${person.guests}</td>
          <td>${person.dietary}</td>
          <td><span class="badge ${badgeClass(person.status)}">${person.status}</span></td>
          <td><span class="badge ${badgeClass(checkLabel)}">${checkLabel}</span></td>
        </tr>
      `;
    })
    .join("");
}

function toggleCheckin(name) {
  const person = selectedEvent().registrants.find((registrant) => registrant.name === name);
  person.checkedIn = !person.checkedIn;
  renderEventDetail();
}

function renderCheckinList() {
  const rows = filteredRegistrants(checkinSearch.value);
  checkinList.innerHTML = rows
    .map((person) => {
      const action = person.checkedIn ? "Undo check-in" : "Check in";
      return `
        <div class="checkin-item">
          <div>
            <strong>${person.name}</strong>
            <p>${person.department} - Guests: ${person.guests} - ${person.dietary}</p>
          </div>
          <button class="${person.checkedIn ? "secondary-button" : "primary-button"}" data-checkin-name="${person.name}" type="button">
            ${action}
          </button>
        </div>
      `;
    })
    .join("");
}

function renderTasks() {
  taskList.innerHTML = selectedEvent().tasks
    .map((task) => {
      const status = task.done ? "Done" : "Open";
      return `
        <div class="task-item">
          <div>
            <strong>${task.label}</strong>
            <p>${status}</p>
          </div>
          <span class="badge ${task.done ? "green" : "amber"}">${status}</span>
        </div>
      `;
    })
    .join("");
}

function setActiveTab(tabName) {
  activeTab = tabName;
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.tab === activeTab);
  });
  document.querySelectorAll(".tab-panel").forEach((panel) => {
    panel.classList.toggle("active", panel.id === `${activeTab}Panel`);
  });
}

eventList.addEventListener("click", (event) => {
  const row = event.target.closest("[data-event-id]");
  if (!row) return;
  selectedEventId = row.dataset.eventId;
  renderEvents();
  renderEventDetail();
});

statusFilter.addEventListener("change", renderEvents);
registrantSearch.addEventListener("input", renderRegistrants);
checkinSearch.addEventListener("input", renderCheckinList);

checkinList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-checkin-name]");
  if (!button) return;
  toggleCheckin(button.dataset.checkinName);
});

document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => setActiveTab(tab.dataset.tab));
});

reminderSubject.addEventListener("input", () => {
  previewSubject.textContent = reminderSubject.value;
});

reminderMessage.addEventListener("input", () => {
  previewMessage.textContent = reminderMessage.value;
});

renderMetrics();
renderEvents();
renderEventDetail();
