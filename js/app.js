const weekTitle = document.getElementById("weekTitle");
const scheduleGrid = document.getElementById("scheduleGrid");
const searchInput = document.getElementById("searchInput");

let currentWeekStart = getSunday(new Date());
let scheduleData = [];
let viewMode = "week";

function getSunday(date) {
  const d = new Date(date);
  d.setDate(d.getDate() - d.getDay());
  return d;
}

function formatWeek(date) {
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "numeric",
    day: "numeric",
    year: "2-digit"
  });
}

function updateWeekTitle() {
  weekTitle.textContent = `Schedule for Week of ${formatWeek(currentWeekStart)}`;
}

async function loadSchedule() {
  const response = await fetch("data/schedule.json");
  scheduleData = await response.json();
  buildGrid();
}

function categoryClass(category) {
  const c = category.toLowerCase();

  if (c.includes("music")) return "cat-music";
  if (c.includes("affairs")) return "cat-affairs";
  if (c.includes("news")) return "cat-news";
  if (c.includes("talk")) return "cat-talk";
  if (c.includes("health")) return "cat-health";
  if (c.includes("special")) return "cat-special";

  return "";
}

function getVisibleDays() {
  const allDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  if (viewMode === "today") {
    return [allDays[new Date().getDay()]];
  }

  return allDays;
}

function buildGrid() {
  const visibleDays = getVisibleDays();
  const days = ["Time", ...visibleDays];
  const times = [
  "5:00 AM", "6:00 AM", "7:00 AM", "8:00 AM", "9:00 AM", "10:00 AM",
  "11:00 AM", "Noon", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM",
  "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM",
  "10:00 PM", "11:00 PM"
];
  const query = searchInput.value.toLowerCase();

  scheduleGrid.style.gridTemplateColumns =
    viewMode === "today"
      ? "100px minmax(260px, 1fr)"
      : "100px repeat(7, minmax(180px, 1fr))";

  scheduleGrid.innerHTML = "";

  days.forEach(day => {
    const cell = document.createElement("div");
    cell.className = "cell header-cell";
    cell.textContent = day;
    scheduleGrid.appendChild(cell);
  });

  times.forEach(time => {
    const timeCell = document.createElement("div");
    timeCell.className = "cell time-cell";
    timeCell.textContent = time;
    scheduleGrid.appendChild(timeCell);

    visibleDays.forEach(day => {
      const program = scheduleData.find(item =>
        item.day === day &&
        item.time === time &&
        (
          item.title.toLowerCase().includes(query) ||
          item.host.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query)
        )
      );

      const cell = document.createElement("div");
      cell.className = "cell";

      if (program) {
        cell.classList.add(categoryClass(program.category));

        cell.innerHTML = `
          <button class="program-card" aria-label="View details for ${program.title}">
            <span class="program-title">${program.title}</span>
            <span class="host">${program.host}</span>
            <span class="category">${program.category}</span>
          </button>
        `;

        cell.querySelector(".program-card").addEventListener("click", (event) => {
  showDetails(program, day, time);
  showMobilePopover(program, day, time, event.currentTarget);
});
      }

      scheduleGrid.appendChild(cell);
    });
  });
}

function showDetails(program, day, time) {
  document.getElementById("detailTitle").textContent = program.title;
  document.getElementById("detailTime").textContent = `${day} at ${time}`;
  document.getElementById("detailHost").textContent = `Host: ${program.host}`;
  document.getElementById("detailCategory").textContent = `Category: ${program.category}`;
  document.getElementById("detailDescription").textContent = program.description;
}
function showMobilePopover(program, day, time, button) {
  if (window.innerWidth > 700) return;

  let popover = document.getElementById("mobilePopover");

  if (!popover) {
    popover = document.createElement("div");
    popover.id = "mobilePopover";
    popover.className = "mobile-popover";
    document.body.appendChild(popover);
  }

  popover.innerHTML = `
    <button class="mobile-popover-close" aria-label="Close">×</button>
    <h3>${program.title}</h3>
    <p><strong>${day}</strong> at ${time}</p>
    <p><strong>Host:</strong> ${program.host}</p>
    <p><strong>Category:</strong> ${program.category}</p>
    <p>${program.description}</p>
  `;

  const rect = button.getBoundingClientRect();

  popover.style.display = "block";

  const popoverWidth = 300;
  const left = Math.min(
    window.innerWidth - popoverWidth - 12,
    Math.max(12, rect.left)
  );

  const top = rect.bottom + window.scrollY + 8;

  popover.style.left = `${left}px`;
  popover.style.top = `${top}px`;

  popover.querySelector(".mobile-popover-close").addEventListener("click", () => {
    popover.style.display = "none";
  });
}
document.getElementById("prevWeek").addEventListener("click", () => {
  currentWeekStart.setDate(currentWeekStart.getDate() - 7);
  updateWeekTitle();
});

document.getElementById("nextWeek").addEventListener("click", () => {
  currentWeekStart.setDate(currentWeekStart.getDate() + 7);
  updateWeekTitle();
});

document.getElementById("currentWeek").addEventListener("click", () => {
  currentWeekStart = getSunday(new Date());
  updateWeekTitle();
});

document.getElementById("weekView").addEventListener("click", () => {
  viewMode = "week";
  buildGrid();
});

document.getElementById("todayView").addEventListener("click", () => {
  viewMode = "today";
  buildGrid();
});

searchInput.addEventListener("input", buildGrid);

updateWeekTitle();
loadSchedule();