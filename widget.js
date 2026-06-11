// ─── ICONS ───────────────────────────────────────────────────────────────────
const icons = {
  workshop: "https://custom.cvent.com/AE944F71438646268B70FF5BF3772347/files/event/e7d15afcf2b14901ab0272ce8a401899/7fa5436c0536426fa7e85842cf7aad5d.png",
  strategy: "https://custom.cvent.com/AE944F71438646268B70FF5BF3772347/files/event/e7d15afcf2b14901ab0272ce8a401899/bdcbe9d6fe544ef4a202b854ca33e3f6.png",
  creative: "https://custom.cvent.com/AE944F71438646268B70FF5BF3772347/files/event/e7d15afcf2b14901ab0272ce8a401899/3a8caa515267422f9438e166ed096908.png",
  keynote: "https://custom.cvent.com/AE944F71438646268B70FF5BF3772347/files/event/e7d15afcf2b14901ab0272ce8a401899/70e651e949504943907244bd4cfef35e.png",
  skill:   "https://custom.cvent.com/AE944F71438646268B70FF5BF3772347/files/event/e7d15afcf2b14901ab0272ce8a401899/8230f92e454c40c49550e623915ee73e.png",
  intl:    "https://custom.cvent.com/AE944F71438646268B70FF5BF3772347/files/event/e7d15afcf2b14901ab0272ce8a401899/bdcbe9d6fe544ef4a202b854ca33e3f6.png"
};
let showFiltered = false;


// ─── SESSION DATA (all times in Eastern) ─────────────────────────────────────
// Corrected to match global-gathering-program-skeleton (6).csv + session export alignment.
// 5 skeleton changes applied:
//   #1  Wed 05:45–07:15  → added "intl" row (International Exchange confirmed in session export)
//   #2  Wed 13:15–14:45  → added "workshop" row (FROM4500 is a Workshop, block was Strategy-only)
//   #3  Thu 05:45–07:15  → added "workshop" row (FAMI7727 is a Workshop, block was Strategy-only)
//   #4  Thu 18:45–20:15  → added "creative" row (ECHO4815 is Creative Space, block was Strategy-only)
//   #5  Thu 13:15 block  → end time corrected 14:45 → 14:15 (all sessions in block end at 2:15 PM ET)
const data = {
  day1: [
    ["2026-10-06", "03:00", "2026-10-06", "06:30", "skill"],
    ["2026-10-06", "07:00", "2026-10-06", "10:30", "skill"],
    ["2026-10-06", "09:00", "2026-10-06", "12:30", "skill"],
    ["2026-10-06", "11:00", "2026-10-06", "14:30", "skill"],
    ["2026-10-06", "13:00", "2026-10-06", "16:30", "skill"],
    ["2026-10-06", "15:00", "2026-10-06", "18:30", "skill"],
    ["2026-10-06", "19:00", "2026-10-06", "22:30", "skill"]
  ],
  day2: [
    ["2026-10-07", "03:00", "2026-10-07", "04:00", "workshop"],
    ["2026-10-07", "04:15", "2026-10-07", "05:30", "workshop"],
    ["2026-10-07", "05:45", "2026-10-07", "07:15", "strategy"],
    ["2026-10-07", "05:45", "2026-10-07", "07:15", "intl"],      // change #1
    ["2026-10-07", "07:30", "2026-10-07", "08:45", "workshop"],
    ["2026-10-07", "09:00", "2026-10-07", "10:30", "strategy"],
    ["2026-10-07", "10:45", "2026-10-07", "11:45", "workshop"],
    ["2026-10-07", "12:00", "2026-10-07", "13:00", "keynote"],
    ["2026-10-07", "13:15", "2026-10-07", "14:45", "strategy"],
    ["2026-10-07", "13:15", "2026-10-07", "14:45", "workshop"],  // change #2
    ["2026-10-07", "15:00", "2026-10-07", "16:15", "workshop"],
    ["2026-10-07", "16:30", "2026-10-07", "17:30", "workshop"],
    ["2026-10-07", "17:45", "2026-10-07", "19:00", "workshop"],
    ["2026-10-07", "19:15", "2026-10-07", "20:45", "strategy"]
  ],
  day3: [
    ["2026-10-08", "03:00", "2026-10-08", "04:00", "workshop"],
    ["2026-10-08", "04:15", "2026-10-08", "05:30", "workshop"],
    ["2026-10-08", "05:45", "2026-10-08", "07:15", "strategy"],
    ["2026-10-08", "05:45", "2026-10-08", "07:15", "workshop"],  // change #3
    ["2026-10-08", "07:30", "2026-10-08", "08:45", "workshop"],
    ["2026-10-08", "09:00", "2026-10-08", "10:30", "strategy"],
    ["2026-10-08", "10:45", "2026-10-08", "11:45", "workshop"],
    ["2026-10-08", "12:00", "2026-10-08", "13:00", "workshop"],
    ["2026-10-08", "13:15", "2026-10-08", "14:15", "workshop"],  // change #5: end 14:45 → 14:15
    ["2026-10-08", "15:00", "2026-10-08", "15:45", "keynote"],
    ["2026-10-08", "16:00", "2026-10-08", "17:00", "workshop"],
    ["2026-10-08", "17:15", "2026-10-08", "18:30", "workshop"],
    ["2026-10-08", "18:45", "2026-10-08", "20:15", "strategy"],
    ["2026-10-08", "18:45", "2026-10-08", "20:15", "creative"]   // change #4
  ]
};

// ─── SESSION TYPE LABELS ──────────────────────────────────────────────────────
function getSessionLabel(type) {
  const labels = {
    workshop: "Workshops",
    strategy: "Strategy Sessions",
    creative: "Creative Space",
    keynote:  "Keynote",
    skill:    "Skill Building Institutes",
    intl:     "International Exchange"
  };
  return labels[type] || type;
}

function getSessionSub(type) {
  const subs = {
    skill:    "Extended, hands-on learning to build practical skills",
    workshop: "Interactive sessions with discussion and Q&A",
    strategy: "Panels and collaborative discussions on complex challenges",
    creative: "Poetry, storytelling, and creative expression",
    keynote:  "Engaging talks from global leaders and practitioners",
    intl:     "Cross-cultural perspectives and global exchange"
  };
  return subs[type] || "";
}

// ─── IFRAME HEIGHT SYNC ──────────────────────────────────────────────────────
// Cvent embeds this page in an iframe and listens for { ggWidgetHeight }.
// Send the current document height after every render and whenever assets/layout
// change so the parent iframe can grow without showing internal scrollbars.
const HEIGHT_MESSAGE_KEY = "ggWidgetHeight";
let heightSyncFrame = null;
let lastSentHeight = 0;

function getDocumentHeight() {
  const widget = document.getElementById("agendaWidget");

  if (widget) {
    const rect = widget.getBoundingClientRect();
    const styles = window.getComputedStyle(widget);
    const marginTop = parseFloat(styles.marginTop) || 0;
    const marginBottom = parseFloat(styles.marginBottom) || 0;

    return Math.ceil(rect.height + marginTop + marginBottom);
  }

  return Math.ceil(document.body.scrollHeight);
}

function postWidgetHeight() {
  heightSyncFrame = null;

  if (window.parent === window) return;

  const height = getDocumentHeight();
  if (!height || height === lastSentHeight) return;

  lastSentHeight = height;
  window.parent.postMessage({ [HEIGHT_MESSAGE_KEY]: height }, "*");
}

function queueWidgetHeightPost() {
  if (heightSyncFrame !== null) return;
  heightSyncFrame = window.requestAnimationFrame(postWidgetHeight);
}


// ─── TIME CONVERSION ──────────────────────────────────────────────────────────
// Oct 6–8, 2026 is during Eastern Daylight Time (EDT = UTC−4)
function easternToUtc(dateStr, timeStr) {
  const [year, month, day] = dateStr.split("-").map(Number);
  const [hour, minute]     = timeStr.split(":").map(Number);
  return new Date(Date.UTC(year, month - 1, day, hour + 4, minute));
}

// ─── DATE STRING HELPERS ──────────────────────────────────────────────────────
// Returns "YYYY-MM-DD" in the given timezone (ISO-style, sortable)
function getLocalDateString(dateObj, timezone) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: timezone,
    year:     "numeric",
    month:    "2-digit",
    day:      "2-digit"
  }).format(dateObj);
}

// Returns formatted time string like "9:00 AM"
function formatInTimezone(dateObj, timezone) {
  return new Intl.DateTimeFormat("en-US", {
    hour:     "numeric",
    minute:   "2-digit",
    timeZone: timezone
  }).format(dateObj);
}

// ─── TIME LABEL BUILDER ───────────────────────────────────────────────────────
// Compares session start/end local dates against the official event anchor date
// so "previous day" and "next day" are always relative to the event calendar day,
// not just relative to each other.
function buildTimeLabel(startUtc, endUtc, timezone, day) {
  const startDateStr = getLocalDateString(startUtc, timezone);
  const endDateStr   = getLocalDateString(endUtc, timezone);
  const startTimeStr = formatInTimezone(startUtc, timezone);
  const endTimeStr   = formatInTimezone(endUtc, timezone);

  // The canonical event date for each day — fixed, not derived from UTC conversion
  const eventDateMap = {
    day1: "2026-10-06",
    day2: "2026-10-07",
    day3: "2026-10-08"
  };
  const eventDateStr = eventDateMap[day];

  const isSameDay = startDateStr === endDateStr;

  if (isSameDay) {
    if (startDateStr < eventDateStr) {
      return `${startTimeStr} – ${endTimeStr} previous day`;
    } else if (startDateStr > eventDateStr) {
      return `${startTimeStr} – ${endTimeStr} next day`;
    } else {
      return `${startTimeStr} – ${endTimeStr}`;
    }
  } else if (startDateStr < endDateStr) {
    // Crosses midnight locally
    if (startDateStr < eventDateStr) {
      // e.g. starts previous day, ends on event day
      return `${startTimeStr} previous day – ${endTimeStr}`;
    } else {
      // e.g. starts on event day, ends next day
      return `${startTimeStr} – ${endTimeStr} next day`;
    }
  } else {
    // Should not occur, safe fallback
    return `${startTimeStr} – ${endTimeStr}`;
  }
}

// ─── TIMEZONE ABBREVIATION MAP ────────────────────────────────────────────────
// Hardcoded for October 2026 (DST states are known and fixed)
const tzMap = {
  // 🇺🇸 United States
  "America/New_York":               "EDT",
  "America/Chicago":                "CDT",
  "America/Denver":                 "MDT",
  "America/Los_Angeles":            "PDT",
  "America/Anchorage":              "AKDT",
  "America/Phoenix":                "MST",
  "Pacific/Honolulu":               "HST",
  // 🇨🇦 Canada
  "America/Toronto":                "EDT",
  "America/Vancouver":              "PDT",
  "America/Edmonton":               "MDT",
  "America/Winnipeg":               "CDT",
  "America/Halifax":                "ADT",
  "America/St_Johns":               "NDT",
  // 🌎 Americas
  "America/Mexico_City":            "CST",
  "America/Panama":                 "COT",
  "America/Bogota":                 "COT",
  "America/Caracas":                "VET",
  "America/Sao_Paulo":              "BRT",
  "America/Argentina/Buenos_Aires": "ART",
  "America/Santiago":               "CLST",
  // 🇬🇧🇪🇺 Europe (DST ends late October — still active Oct 6–8)
  "Europe/London":                  "BST",
  "Europe/Paris":                   "CEST",
  "Europe/Berlin":                  "CEST",
  "Europe/Rome":                    "CEST",
  "Europe/Madrid":                  "CEST",
  // 🌍 Africa
  "Africa/Lagos":                   "WAT",
  "Africa/Cairo":                   "EET",
  "Africa/Johannesburg":            "SAST",
  "Africa/Nairobi":                 "EAT",
  // 🕌 Middle East
  "Asia/Riyadh":                    "AST",
  "Asia/Dubai":                     "GST",
  // 🌏 Asia
  "Asia/Karachi":                   "PKT",
  "Asia/Kolkata":                   "IST",
  "Asia/Dhaka":                     "BDST",
  "Asia/Bangkok":                   "ICT",
  "Asia/Jakarta":                   "WIB",
  "Asia/Singapore":                 "SGT",
  "Asia/Manila":                    "PHT",
  "Asia/Shanghai":                  "CST",
  "Asia/Taipei":                    "CST",
  "Asia/Seoul":                     "KST",
  "Asia/Tokyo":                     "JST",
  // 🇦🇺 Australia
  "Australia/Perth":                "AWST",
  "Australia/Adelaide":             "ACDT",
  "Australia/Brisbane":             "AEST",
  "Australia/Sydney":               "AEDT",
  // 🇳🇿 New Zealand
  "Pacific/Auckland":               "NZDT",
  // 🌊 Pacific
  "Pacific/Fiji":                   "FJT"
};
function getTzAbbreviation(timezone) {
  return tzMap[timezone] || "";
}

// ─── TIMEZONE SELECTOR ────────────────────────────────────────────────────────
const timezoneSelect = document.getElementById("timezoneSelect");
const DEFAULT_TIMEZONE = "America/New_York";
const detectedZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

function isSupportedTimeZone(zone) {
  if (!zone) return false;

  try {
    new Intl.DateTimeFormat("en-US", { timeZone: zone }).format();
    return true;
  } catch (error) {
    return false;
  }
}

const browserZone = isSupportedTimeZone(detectedZone)
  ? detectedZone
  : DEFAULT_TIMEZONE;

function getUtcOffsetMinutes(zone) {
  const ref = new Date("2026-10-07T12:00:00Z");
  const localStr = new Intl.DateTimeFormat("en-CA", {
    timeZone: zone,
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit",
    hour12: false
  }).format(ref);
  // en-CA gives "YYYY-MM-DD, HH:MM:SS"
  const [datePart, timePart] = localStr.split(", ");
  const localUtc = new Date(`${datePart}T${timePart}Z`);
  return (localUtc - ref) / 60000; // difference in minutes
}

const allZones = [
  "America/New_York", "America/Chicago", "America/Denver", "America/Los_Angeles",
  "America/Anchorage", "America/Phoenix", "Pacific/Honolulu",
  "America/Toronto", "America/Vancouver", "America/Edmonton", "America/Winnipeg",
  "America/Halifax", "America/St_Johns",
  "America/Mexico_City", "America/Panama", "America/Bogota", "America/Caracas",
  "America/Sao_Paulo", "America/Argentina/Buenos_Aires", "America/Santiago",
  "Europe/London", "Europe/Paris", "Europe/Berlin", "Europe/Rome", "Europe/Madrid",
  "Africa/Lagos", "Africa/Cairo", "Africa/Johannesburg", "Africa/Nairobi",
  "Asia/Riyadh", "Asia/Dubai",
  "Asia/Karachi", "Asia/Kolkata", "Asia/Dhaka",
  "Asia/Bangkok", "Asia/Jakarta", "Asia/Singapore", "Asia/Manila",
  "Asia/Shanghai", "Asia/Taipei", "Asia/Seoul", "Asia/Tokyo",
  "Australia/Perth", "Australia/Adelaide", "Australia/Brisbane", "Australia/Sydney",
  "Pacific/Auckland", "Pacific/Fiji"
];

if (!allZones.includes(browserZone)) allZones.push(browserZone);

const sortedZones = allZones.slice().sort((a, b) => getUtcOffsetMinutes(a) - getUtcOffsetMinutes(b));

const orderedZones = [
  browserZone,
  ...sortedZones.filter(z => z !== browserZone)
];

const tzFlags = {
  "America/New_York":               "🇺🇸",
  "America/Chicago":                "🇺🇸",
  "America/Denver":                 "🇺🇸",
  "America/Los_Angeles":            "🇺🇸",
  "America/Anchorage":              "🇺🇸",
  "America/Phoenix":                "🇺🇸",
  "Pacific/Honolulu":               "🇺🇸",
  "America/Toronto":                "🇨🇦",
  "America/Vancouver":              "🇨🇦",
  "America/Edmonton":               "🇨🇦",
  "America/Winnipeg":               "🇨🇦",
  "America/Halifax":                "🇨🇦",
  "America/St_Johns":               "🇨🇦",
  "America/Mexico_City":            "🇲🇽",
  "America/Panama":                 "🇵🇦",
  "America/Bogota":                 "🇨🇴",
  "America/Caracas":                "🇻🇪",
  "America/Sao_Paulo":              "🇧🇷",
  "America/Argentina/Buenos_Aires": "🇦🇷",
  "America/Santiago":               "🇨🇱",
  "Europe/London":                  "🇬🇧",
  "Europe/Paris":                   "🇫🇷",
  "Europe/Berlin":                  "🇩🇪",
  "Europe/Rome":                    "🇮🇹",
  "Europe/Madrid":                  "🇪🇸",
  "Africa/Lagos":                   "🇳🇬",
  "Africa/Cairo":                   "🇪🇬",
  "Africa/Johannesburg":            "🇿🇦",
  "Africa/Nairobi":                 "🇰🇪",
  "Asia/Riyadh":                    "🇸🇦",
  "Asia/Dubai":                     "🇦🇪",
  "Asia/Karachi":                   "🇵🇰",
  "Asia/Kolkata":                   "🇮🇳",
  "Asia/Dhaka":                     "🇧🇩",
  "Asia/Bangkok":                   "🇹🇭",
  "Asia/Jakarta":                   "🇮🇩",
  "Asia/Singapore":                 "🇸🇬",
  "Asia/Manila":                    "🇵🇭",
  "Asia/Shanghai":                  "🇨🇳",
  "Asia/Taipei":                    "🇹🇼",
  "Asia/Seoul":                     "🇰🇷",
  "Asia/Tokyo":                     "🇯🇵",
  "Australia/Perth":                "🇦🇺",
  "Australia/Adelaide":             "🇦🇺",
  "Australia/Brisbane":             "🇦🇺",
  "Australia/Sydney":               "🇦🇺",
  "Pacific/Auckland":               "🇳🇿",
  "Pacific/Fiji":                   "🇫🇯"
};

orderedZones.forEach(zone => {
  const city   = zone.split("/").pop().replaceAll("_", " ");
  const abbr   = tzMap[zone] || "";
  const flag   = tzFlags[zone] || "";
  const option = document.createElement("option");
  option.value = zone;
  const label  = abbr ? `${city} (${abbr})` : city;
  if (zone === browserZone) {
    option.textContent = `${flag} ${label} — detected`;
  } else {
    option.textContent = `${flag} ${label}`;
  }
  timezoneSelect.appendChild(option);
});

// Default to browser zone, fall back to Eastern
timezoneSelect.value = browserZone;

// ─── TIME CATEGORY HELPERS ────────────────────────────────────────────────────
// Returns local minutes-since-midnight for a UTC date in a given timezone
function getLocalMinutes(dateObj, timezone) {
  const parts = new Intl.DateTimeFormat("en-US", {
    hour:     "numeric",
    minute:   "numeric",
    hour12:   false,
    timeZone: timezone
  }).formatToParts(dateObj);
  const h = parseInt(parts.find(p => p.type === "hour").value, 10);
  const m = parseInt(parts.find(p => p.type === "minute").value, 10);
  return h * 60 + m;
}

// Returns how many minutes two ranges overlap
function getOverlapMinutes(start, end, windowStart, windowEnd) {
  return Math.max(0, Math.min(end, windowEnd) - Math.max(start, windowStart));
}

// Categorizes a session as "daytime", "evening", or "neutral"
// based on which window the majority of its duration falls in
function getTimeCategory(startUtc, endUtc, timezone) {
  let start = getLocalMinutes(startUtc, timezone);
  let end   = getLocalMinutes(endUtc, timezone);

  // If end appears before start in minutes, the session crosses midnight
  if (end <= start) end += 24 * 60;

  const DAY_START     = 7  * 60;       //  7:00 AM
  const DAY_END       = 17 * 60;       //  5:00 PM
  const EVENING_START = 17 * 60;       //  5:00 PM
  const EVENING_END   = 21 * 60 + 30;  //  9:30 PM

  const totalMinutes   = end - start;
  const daytimeMinutes = getOverlapMinutes(start, end, DAY_START, DAY_END);
  const eveningMinutes = getOverlapMinutes(start, end, EVENING_START, EVENING_END);
  const outsideMinutes = totalMinutes - daytimeMinutes - eveningMinutes;

  // Majority falls outside both windows → no highlight
  if (outsideMinutes > daytimeMinutes && outsideMinutes > eveningMinutes) {
    return "neutral";
  }
  // More evening than daytime → blue
  if (eveningMinutes > daytimeMinutes) {
    return "evening";
  }
  // More daytime than evening, or a tie → green (bias toward daytime)
  return "daytime";
}

// ─── RENDER ───────────────────────────────────────────────────────────────────
function render(day) {
  const grid         = document.getElementById("agendaGrid");
  const selectedZone = timezoneSelect.value;
  grid.innerHTML     = "";

  data[day].forEach(([startDate, startTime, endDate, endTime, type]) => {
    const startUtc = easternToUtc(startDate, startTime);
    const endUtc   = easternToUtc(endDate, endTime);

    const category = getTimeCategory(startUtc, endUtc, selectedZone);
    if (showFiltered && category === "neutral") return;

    const evening     = category === "evening";
    const comfortable = category === "daytime";
    const neutral     = category === "neutral";

    const timeLabel  = buildTimeLabel(startUtc, endUtc, selectedZone, day);
    const tzAbbr     = getTzAbbreviation(selectedZone);

    const row = document.createElement("div");
    row.className = "timeRow";
    row.innerHTML = `
      <div class="timeLabel">${timeLabel}</div>
      <div class="sessionBlock${comfortable ? " comfortable" : ""}${evening ? " evening" : ""}">
        <img class="icon" src="${icons[type]}" alt="">
        <div>
          <div class="sessionType">${getSessionLabel(type)}</div>
          <div class="sessionSub">${getSessionSub(type)}</div>
          ${comfortable ? `<div class="comfortLabel">${tzAbbr} daytime hours</div>` : ""}
          ${evening ? `<div class="eveningLabel">${tzAbbr} evening hours</div>` : ""}
          ${neutral && type === "skill" ? `<div class="neutralLabel">A variety of topics will be offered across time blocks</div>` : ""}
          ${neutral && type !== "skill" ? `<div class="neutralLabel">The majority of sessions are recorded</div>` : ""}
        </div>
      </div>
    `;
    grid.appendChild(row);
  });

  queueWidgetHeightPost();
}

// ─── EVENT LISTENERS ──────────────────────────────────────────────────────────
document.querySelectorAll(".dayBtn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".dayBtn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    render(btn.dataset.day);
  });
});

timezoneSelect.addEventListener("change", () => {
  const activeDay = document.querySelector(".dayBtn.active").dataset.day;
  render(activeDay);
});

const filterBtn = document.getElementById("timeFilterBtn");

filterBtn.addEventListener("click", () => {
  showFiltered = !showFiltered;

  filterBtn.classList.toggle("active");

  filterBtn.textContent = showFiltered
    ? "Showing daytime & evening hours"
    : "Show daytime & evening hours";

  const activeDay = document.querySelector(".dayBtn.active").dataset.day;
  render(activeDay);
});

// ─── IFRAME HEIGHT LISTENERS ─────────────────────────────────────────────────
window.addEventListener("load", queueWidgetHeightPost);
window.addEventListener("resize", queueWidgetHeightPost);

if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(queueWidgetHeightPost);
}

document.addEventListener("load", event => {
  if (event.target && event.target.tagName === "IMG") {
    queueWidgetHeightPost();
  }
}, true);

if ("ResizeObserver" in window) {
  const resizeObserver = new ResizeObserver(queueWidgetHeightPost);
  const widget = document.getElementById("agendaWidget");

  if (widget) resizeObserver.observe(widget);
  resizeObserver.observe(document.body);
}

if ("MutationObserver" in window) {
  const mutationObserver = new MutationObserver(queueWidgetHeightPost);
  mutationObserver.observe(document.body, {
    attributes: true,
    childList: true,
    subtree: true
  });
}

// ─── INIT ─────────────────────────────────────────────────────────────────────
render("day1");
