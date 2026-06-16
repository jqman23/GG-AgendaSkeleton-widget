// ─── CALENDAR SVG ICONS ──────────────────────────────────────────────────────
// Using Google's favicon service (stable) and Microsoft's CDN icon (stable)
const SVG_GCAL    = `<img src="https://custom.cvent.com/AE944F71438646268B70FF5BF3772347/files/event/e7d15afcf2b14901ab0272ce8a401899/18455c8f54504314847defa08b8dcda2.png" width="16" height="16" alt="Google Calendar" style="display:block;">`;
const SVG_OUTLOOK = `<img src="https://custom.cvent.com/AE944F71438646268B70FF5BF3772347/files/event/e7d15afcf2b14901ab0272ce8a401899/17c86dcff13d41a386d3607a4f6fd948.png" width="16" height="16" alt="Outlook Calendar" style="display:block;">`;
const SVG_LINKEDIN = `<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`;

// ─── ICONS ───────────────────────────────────────────────────────────────────
const icons = {
  workshop: "https://custom.cvent.com/AE944F71438646268B70FF5BF3772347/files/event/e7d15afcf2b14901ab0272ce8a401899/7fa5436c0536426fa7e85842cf7aad5d.png",
  strategy: "https://custom.cvent.com/AE944F71438646268B70FF5BF3772347/files/event/e7d15afcf2b14901ab0272ce8a401899/bdcbe9d6fe544ef4a202b854ca33e3f6.png",
  creative: "https://custom.cvent.com/AE944F71438646268B70FF5BF3772347/files/event/e7d15afcf2b14901ab0272ce8a401899/3a8caa515267422f9438e166ed096908.png",
  keynote: "https://custom.cvent.com/AE944F71438646268B70FF5BF3772347/files/event/e7d15afcf2b14901ab0272ce8a401899/70e651e949504943907244bd4cfef35e.png",
  skill:   "https://custom.cvent.com/AE944F71438646268B70FF5BF3772347/files/event/e7d15afcf2b14901ab0272ce8a401899/8230f92e454c40c49550e623915ee73e.png",
  intl:    "https://custom.cvent.com/AE944F71438646268B70FF5BF3772347/files/event/e7d15afcf2b14901ab0272ce8a401899/39810669375140269fd67c96d9a86f41.png"
};
let showFiltered = false;


// ─── SESSION DATA (all times in MDT = UTC−6) ────────────────────────────────
const data = {
  day1: [
    ["2026-10-06", "03:00", "2026-10-06", "06:30", ["skill"]],
    ["2026-10-06", "07:00", "2026-10-06", "10:30", ["skill"]],
    ["2026-10-06", "09:00", "2026-10-06", "12:30", ["skill"]],
    ["2026-10-06", "11:00", "2026-10-06", "14:30", ["skill"]],
    ["2026-10-06", "13:00", "2026-10-06", "16:30", ["skill"]],
    ["2026-10-06", "19:00", "2026-10-06", "22:30", ["skill"]]
  ],
  day2: [
    ["2026-10-07", "03:00", "2026-10-07", "04:00", ["workshop"]],
    ["2026-10-07", "04:15", "2026-10-07", "05:30", ["workshop"]],
    ["2026-10-07", "05:45", "2026-10-07", "07:15", ["strategy", "intl"]],
    ["2026-10-07", "07:30", "2026-10-07", "08:45", ["workshop"]],
    ["2026-10-07", "09:00", "2026-10-07", "10:30", ["strategy"]],
    ["2026-10-07", "10:45", "2026-10-07", "11:45", ["workshop"]],
    ["2026-10-07", "12:00", "2026-10-07", "13:00", ["keynote"]],
    ["2026-10-07", "13:15", "2026-10-07", "14:45", ["strategy", "workshop"]],
    ["2026-10-07", "15:00", "2026-10-07", "16:15", ["workshop"]],
    ["2026-10-07", "16:30", "2026-10-07", "17:30", ["workshop"]],
    ["2026-10-07", "17:45", "2026-10-07", "19:00", ["workshop"]],
    ["2026-10-07", "19:15", "2026-10-07", "20:45", ["strategy"]]
  ],
  day3: [
    ["2026-10-08", "03:00", "2026-10-08", "04:00", ["workshop"]],
    ["2026-10-08", "04:15", "2026-10-08", "05:30", ["workshop"]],
    ["2026-10-08", "05:45", "2026-10-08", "07:15", ["strategy", "workshop"]],
    ["2026-10-08", "07:30", "2026-10-08", "08:45", ["workshop"]],
    ["2026-10-08", "09:00", "2026-10-08", "10:30", ["strategy"]],
    ["2026-10-08", "10:45", "2026-10-08", "11:45", ["workshop"]],
    ["2026-10-08", "12:00", "2026-10-08", "13:00", ["workshop"]],
    ["2026-10-08", "13:15", "2026-10-08", "14:45", ["workshop", "strategy"]],
    ["2026-10-08", "15:00", "2026-10-08", "15:45", ["keynote"]],
    ["2026-10-08", "16:00", "2026-10-08", "17:00", ["workshop"]],
    ["2026-10-08", "17:15", "2026-10-08", "18:30", ["workshop"]],
    ["2026-10-08", "18:45", "2026-10-08", "20:15", ["creative", "intl"]]
  ]
};

// ─── LOOKUP MAPS (built once on load) ────────────────────────────────────────
const blockTimeMap = {};
for (const [, blocks] of Object.entries(data)) {
  for (const [sd, st, ed, et] of blocks) {
    blockTimeMap[`${sd}|${st}`] = [sd, st, ed, et];
  }
}

const sessionMap = {};
if (typeof sessionsByBlock !== "undefined") {
  for (const [blockKey, sessions] of Object.entries(sessionsByBlock)) {
    for (const s of sessions) {
      sessionMap[s.code] = { ...s, blockKey };
    }
  }
}

// ─── SESSION TYPE LABELS ──────────────────────────────────────────────────────
function getSessionLabel(type) {
  const labels = {
    workshop: "Workshops",
    strategy: "Strategy Sessions",
    creative: "Creative Space",
    keynote:  "Keynote",
    skill:    "Skill Building Institutes",
    intl:     "International Exchanges"
  };
  return labels[type] || type;
}

function getSessionTypeTag(type) {
  const tags = {
    workshop: "Workshop",
    strategy: "Strategy",
    creative: "Creative",
    keynote:  "Keynote",
    skill:    "Institute",
    intl:     "Intl. Exchange"
  };
  return tags[type] || type;
}

function getSessionSub(type) {
  const subs = {
    skill:    "Extended, hands-on learning to build practical skills",
    workshop: "Interactive sessions with discussion and Q&A",
    strategy: "Panels and collaborative discussions on complex challenges",
    creative: "Poetry, storytelling, and creative expression",
    keynote:  "Engaging talks from global leaders and practitioners",
    intl:     "World leaders convening to examine emerging issues shaping child and family well-being worldwide"
  };
  return subs[type] || "";
}

// ─── PARENT VIEWPORT TRACKING ────────────────────────────────────────────────
// This widget runs in a cross-origin iframe (Vercel) embedded in Cvent. Because
// the iframe is scrolling="no" and sized to its full content height, the iframe
// has NO viewport of its own — `position:fixed` and `vh` units resolve against
// the entire document, not the visible screen. So we can't center a modal on
// our own. The parent page posts the visible region on every scroll/resize:
//   ggScrollTop      = pixels from the iframe's top edge down to where the
//                      visible viewport begins (in iframe-document coords)
//   ggViewportHeight = height of the visible viewport in pixels
// We use these to lay the modal overlay exactly over what the user can see.
let parentScrollTop  = 0;
let parentViewportH  = 0;
let hasParentMetrics = false;
let modalAnchorEl    = null; // element the open modal is anchored to (a speaker card)
let pendingMetricsCallbacks = [];

function requestParentMetrics(onMetrics) {
  if (typeof onMetrics === "function") {
    pendingMetricsCallbacks.push(onMetrics);
  }

  if (window.parent !== window) {
    window.parent.postMessage({ ggRequestMetrics: true }, "*");
  } else if (typeof onMetrics === "function") {
    window.requestAnimationFrame(onMetrics);
  }
}

window.addEventListener("message", function(e) {
  if (!e.data || typeof e.data.ggScrollTop !== "number") return;
  parentScrollTop = e.data.ggScrollTop;
  if (typeof e.data.ggViewportHeight === "number" && e.data.ggViewportHeight > 0) {
    parentViewportH = e.data.ggViewportHeight;
  }
  hasParentMetrics = true;

  const callbacks = pendingMetricsCallbacks;
  pendingMetricsCallbacks = [];
  callbacks.forEach(cb => cb());

  positionModalOverlay(modalAnchorEl); // keep an open modal pinned while scrolling
});

// Position the speaker modal. The dark backdrop covers the whole widget document;
// the modal box is placed at a vertical anchor (document coords):
//   • anchorEl given (a speaker card the user clicked or navigated to) → center
//     on that card. The card and modal move together as the parent scrolls, so
//     this does not depend on possibly stale parent viewport metrics.
//   • no anchorEl (fallback) → center on the visible viewport reported by the
//     parent.
function positionModalOverlay(anchorEl) {
  const overlay = document.getElementById("spModalOverlay");
  if (!overlay || overlay.style.display === "none" || overlay.style.display === "") return;
  const modal = overlay.querySelector(".spModal");

  // Backdrop spans the entire widget document so the visible area is always dimmed.
  overlay.style.height = getDocumentHeight() + "px";

  // Best estimate of the visible viewport height (for capping the modal's height).
  const vh = (hasParentMetrics && parentViewportH)
    ? parentViewportH
    : (window.parent === window ? window.innerHeight : 640);
  if (modal) modal.style.maxHeight = Math.max(240, vh - 40) + "px";

  let anchorY;
  if (anchorEl) {
    // iframe has no scroll of its own, so getBoundingClientRect().top IS the doc-Y
    const r = anchorEl.getBoundingClientRect();
    anchorY = r.top + r.height / 2;
  } else if (hasParentMetrics) {
    anchorY = parentScrollTop + vh / 2;
  } else {
    anchorY = window.scrollY + window.innerHeight / 2;
  }

  if (modal) modal.style.top = anchorY + "px";
  modalAnchorEl = anchorEl || null;
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
// Oct 6–8, 2026 is during Mountain Daylight Time (MDT = UTC−6)
function easternToUtc(dateStr, timeStr) {
  const [year, month, day] = dateStr.split("-").map(Number);
  const [hour, minute]     = timeStr.split(":").map(Number);
  return new Date(Date.UTC(year, month - 1, day, hour + 6, minute));
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

// ─── SPEAKER VIEW STATE ───────────────────────────────────────────────────────
let inSpeakerView = false;

// ─── SESSION PANEL HELPERS ────────────────────────────────────────────────────
function esc(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function speakerSlug(name) {
  return name.toLowerCase()
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function buildCalUrls(s, blockKey) {
  const info = blockTimeMap[blockKey];
  if (!info) return null;
  const [sd, st] = info;
  const endTime = s.endTime || info[3];
  const desc = (s.description || "").slice(0, 300);

  // Google Calendar: MDT local times (no Z) + explicit timezone
  const fmtGcal = (date, time) => date.replace(/-/g, "") + "T" + time.replace(":", "") + "00";
  const gcal = "https://calendar.google.com/calendar/render?action=TEMPLATE"
    + "&text=" + encodeURIComponent(s.name)
    + "&dates=" + fmtGcal(sd, st) + "/" + fmtGcal(sd, endTime)
    + "&ctz=America%2FDenver"
    + "&details=" + encodeURIComponent(desc);

  // Outlook: ISO with -06:00 offset + Windows timezone ID
  const fmtOutlook = (date, time) => date + "T" + time + ":00-06:00";
  const outlook = "https://outlook.live.com/calendar/deeplink/compose?subject="
    + encodeURIComponent(s.name)
    + "&startdt=" + encodeURIComponent(fmtOutlook(sd, st))
    + "&enddt=" + encodeURIComponent(fmtOutlook(sd, endTime))
    + "&timeZone=" + encodeURIComponent("Mountain Standard Time")
    + "&body=" + encodeURIComponent(desc);

  return { gcal, outlook };
}

function downloadICS(code) {
  const s = sessionMap[code];
  if (!s) return;
  const info = blockTimeMap[s.blockKey];
  if (!info) return;
  const [sd, st] = info;
  const endTime = s.endTime || info[3];
  const startUtc = easternToUtc(sd, st);
  const endUtc   = easternToUtc(sd, endTime);
  const fmt      = dt => dt.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const safeName = s.name.replace(/[\\;,]/g, "\\$&");
  const safeDesc = (s.description || "").replace(/[\\;,]/g, "\\$&").replace(/\n/g, "\\n").slice(0, 500);
  const ics = [
    "BEGIN:VCALENDAR", "VERSION:2.0",
    "PRODID:-//Global Gathering 2026//EN",
    "CALSCALE:GREGORIAN", "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    "UID:" + code + "@globalgathering2026",
    "DTSTAMP:" + fmt(new Date()),
    "DTSTART:" + fmt(startUtc),
    "DTEND:" + fmt(endUtc),
    "SUMMARY:" + safeName,
    "DESCRIPTION:" + safeDesc,
    "END:VEVENT", "END:VCALENDAR"
  ].join("\r\n");
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href = url; a.download = code + "-GG2026.ics";
  document.body.appendChild(a); a.click();
  document.body.removeChild(a); URL.revokeObjectURL(url);
}

function buildSpeakerIndex(sortBy) {
  if (typeof sessionsByBlock === "undefined") return [];
  const map = new Map();
  for (const [blockKey, sessions] of Object.entries(sessionsByBlock)) {
    for (const s of sessions) {
      for (const sp of (s.speakers || [])) {
        const key = speakerSlug(sp.name);
        if (!map.has(key)) {
          map.set(key, { ...sp, sessions: [] });
        }
        const entry = map.get(key);
        if (!entry.bio && sp.bio) entry.bio = sp.bio;
        if (!entry.photo && sp.photo) entry.photo = sp.photo;
        if (!entry.title && sp.title) entry.title = sp.title;
        if (!entry.org && sp.org) entry.org = sp.org;
        if (!entry.sessions.find(x => x.code === s.code)) {
          entry.sessions.push({ code: s.code, name: s.name, blockKey });
        }
      }
    }
  }
  const speakers = [...map.values()];
  const by = sortBy || currentSort || "lastaz";
  if (by === "lastza") {
    speakers.sort((a, b) => b.name.trim().split(" ").pop().toLowerCase().localeCompare(a.name.trim().split(" ").pop().toLowerCase()));
  } else if (by === "firstaz") {
    speakers.sort((a, b) => a.name.trim().split(" ")[0].toLowerCase().localeCompare(b.name.trim().split(" ")[0].toLowerCase()));
  } else if (by === "firstza") {
    speakers.sort((a, b) => b.name.trim().split(" ")[0].toLowerCase().localeCompare(a.name.trim().split(" ")[0].toLowerCase()));
  } else {
    speakers.sort((a, b) => a.name.trim().split(" ").pop().toLowerCase().localeCompare(b.name.trim().split(" ").pop().toLowerCase()));
  }
  return speakers;
}

let cachedSpeakers = [];
let currentSort = "lastaz";

function renderSpeakerView() {
  cachedSpeakers = buildSpeakerIndex(currentSort);

  const grid = document.getElementById("speakerGrid");

  const cards = cachedSpeakers.map(sp => {
    const slug = speakerSlug(sp.name);
    const initials = sp.name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();
    const avatar = sp.photo
      ? `<img class="spAvatar" src="${esc(sp.photo)}" alt="${esc(sp.name)}" loading="lazy">`
      : `<div class="spAvatarInitials">${initials}</div>`;

    return `
      <div class="spCard" id="sp-${slug}" onclick="openSpeakerModal('${slug}', event)">
        ${avatar}
        <div class="spCardName">${esc(sp.name)}</div>
        ${sp.title ? `<div class="spCardTitle">${esc(sp.title)}</div>` : ""}
        ${sp.org ? `<div class="spCardOrg">${esc(sp.org)}</div>` : ""}
      </div>`;
  }).join("");

  grid.innerHTML = `
    <div class="spControls">
      <div class="spSortGroup">
        <span class="spSortLabel">Last name:</span>
        <button class="spSortBtn${currentSort === "lastaz" ? " active" : ""}" onclick="setSpeakerSort('lastaz')">A→Z</button>
        <button class="spSortBtn${currentSort === "lastza" ? " active" : ""}" onclick="setSpeakerSort('lastza')">Z→A</button>
        <span class="spSortDiv">|</span>
        <span class="spSortLabel">First name:</span>
        <button class="spSortBtn${currentSort === "firstaz" ? " active" : ""}" onclick="setSpeakerSort('firstaz')">A→Z</button>
        <button class="spSortBtn${currentSort === "firstza" ? " active" : ""}" onclick="setSpeakerSort('firstza')">Z→A</button>
      </div>
    </div>
    <div class="spCards">${cards}</div>
  `;
}

function setSpeakerSort(dir) {
  currentSort = dir;
  renderSpeakerView();
  queueWidgetHeightPost();
}

function openSpeakerModal(slug, ev) {
  const sp = cachedSpeakers.find(s => speakerSlug(s.name) === slug);
  if (!sp) return;
  const initials = sp.name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();
  const avatar = sp.photo
    ? `<img class="spModalPhoto" src="${esc(sp.photo)}" alt="${esc(sp.name)}">`
    : `<div class="spModalInitials">${initials}</div>`;

  const sessionButtons = sp.sessions.map(sess =>
    `<button class="spModalSession" onclick="navigateToSession('${esc(sess.blockKey)}','${esc(sess.code)}')">${esc(sess.name)}</button>`
  ).join("");

  document.getElementById("spModalBody").innerHTML = `
    <div class="spModalHeader">
      ${avatar}
      <div>
        <div class="spModalName">${esc(sp.name)}</div>
        ${sp.title ? `<div class="spModalTitle">${esc(sp.title)}</div>` : ""}
        ${sp.org ? `<div class="spModalOrg">${esc(sp.org)}</div>` : ""}
      </div>
    </div>
    ${sp.bio ? `<p class="spModalBio">${esc(sp.bio)}</p>` : ""}
    ${sp.sessions.length ? `<div class="spModalSessionsLabel">Sessions</div>${sessionButtons}` : ""}
  `;

  const overlay = document.getElementById("spModalOverlay");
  overlay.style.display = "block";
  // anchorEl can be an Event (speaker-card click), an Element, or null
  // (unknown). In all cases we want a DOM element to anchor to when available.
  let anchorEl;
  if (ev instanceof Element) {
    anchorEl = ev;
  } else {
    anchorEl = ev ? document.getElementById("sp-" + slug) : null;
  }
  positionModalOverlay(anchorEl);
  // Ask the parent for fresh viewport metrics in case nothing has scrolled yet;
  // the response arrives via postMessage and re-runs positionModalOverlay().
  requestParentMetrics();
  queueWidgetHeightPost();
}

function closeSpeakerModal() {
  document.getElementById("spModalOverlay").style.display = "none";
  queueWidgetHeightPost();
}

function toggleSpeakerView() {
  inSpeakerView = !inSpeakerView;
  const agendaGrid     = document.getElementById("agendaGrid");
  const speakerGrid    = document.getElementById("speakerGrid");
  const btn            = document.getElementById("speakerViewBtn");
  const expandControls = document.getElementById("expandControls");
  const skillNote      = document.getElementById("skillNote");
  const filterBtn      = document.querySelector(".filterToggle button");

  if (inSpeakerView) {
    agendaGrid.style.display     = "none";
    expandControls.style.display = "none";
    skillNote.style.display      = "none";
    speakerGrid.style.display    = "";
    btn.classList.add("active");
    // Deselect all day tabs
    document.querySelectorAll(".dayBtn").forEach(b => b.classList.remove("active"));
    // Disable filter toggle
    if (filterBtn) { filterBtn.disabled = true; filterBtn.classList.add("disabled"); }
    renderSpeakerView();
  } else {
    speakerGrid.style.display    = "none";
    agendaGrid.style.display     = "";
    expandControls.style.display = "";
    btn.classList.remove("active");
    if (filterBtn) { filterBtn.disabled = false; filterBtn.classList.remove("disabled"); }
    const activeDay = document.querySelector(".dayBtn.active")?.dataset.day;
    if (activeDay === "day1") skillNote.style.display = "";
  }
  queueWidgetHeightPost();
}

function navigateToSession(blockKey, sessionCode) {
  closeSpeakerModal();
  // Find which day owns this block
  const [blockDate, blockTime] = blockKey.split("|");
  let targetDay = null;
  for (const [day, blocks] of Object.entries(data)) {
    for (const [sd, st] of blocks) {
      if (sd === blockDate && st === blockTime) { targetDay = day; break; }
    }
    if (targetDay) break;
  }
  if (!targetDay) return;

  // Switch out of speaker view
  if (inSpeakerView) toggleSpeakerView();

  // Switch to correct day tab
  document.querySelectorAll(".dayBtn").forEach(b => b.classList.remove("active"));
  document.querySelector(`.dayBtn[data-day="${targetDay}"]`).classList.add("active");
  render(targetDay);

  // Find and open the block, then highlight the session card
  requestAnimationFrame(() => {
    const wrap = document.querySelector(`.blockWrap[data-block="${blockKey}"]`);
    if (!wrap) return;
    openBlockEl = null;
    togglePanel(wrap);
    requestAnimationFrame(() => {
      const card = wrap.querySelector(`.sessionCard[data-code="${sessionCode}"]`);
      if (card) {
        card.scrollIntoView({ behavior: "smooth", block: "center" });
        card.classList.remove("highlighted");
        void card.offsetWidth;
        card.classList.add("highlighted");
        setTimeout(() => card.classList.remove("highlighted"), 2800);
      } else {
        wrap.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

function navigateToSpeaker(name) {
  if (!inSpeakerView) toggleSpeakerView();
  const slug = speakerSlug(name);

  requestAnimationFrame(() => {
    const card = document.getElementById(`sp-${slug}`);
    if (card) {
card.scrollIntoView({ behavior: "smooth", block: "center" });
card.classList.remove("highlighted");
void card.offsetWidth;
card.classList.add("highlighted");
setTimeout(() => card.classList.remove("highlighted"), 2800);

// When coming from a session card, the parent-page viewport metrics can
// still describe the old agenda position (or be missing entirely). Anchor
// the modal to the newly revealed speaker card instead, matching the
// behavior of clicking a speaker directly inside speaker view.
openSpeakerModal(slug, card);
return;
    }
    // Fallback for unexpected missing cards: use parent metrics if available.
    openSpeakerModal(slug);
  });
  queueWidgetHeightPost();
}

let activeSpeakerTooltipChip = null;

function getSpeakerDetailsByName(name) {
  const slug = speakerSlug(name || "");
  return buildSpeakerIndex(currentSort).find(sp => speakerSlug(sp.name) === slug) || null;
}

function buildSpeakerTooltipHTML(sp) {
  if (!sp) return "";
  return `
    <div class="speakerTooltip" onclick="event.stopPropagation()">
      <strong>${esc(sp.name)}</strong>
      ${sp.title ? `<span class="ttTitle">${esc(sp.title)}</span>` : ""}
      ${sp.org ? `<span class="ttOrg">${esc(sp.org)}</span>` : ""}
      ${sp.bio ? `<p class="ttBio">${esc(sp.bio)}</p><button type="button" class="ttMoreBtn" aria-expanded="false" hidden onclick="expandSpeakerTooltip(event,this)">See more info</button>` : `<p class="ttBio ttBioEmpty">More speaker information coming soon.</p>`}
    </div>`;
}

function updateSpeakerTooltipMoreButton(tooltip) {
  const bio = tooltip?.querySelector(".ttBio:not(.ttBioEmpty)");
  const btn = tooltip?.querySelector(".ttMoreBtn");
  if (!bio || !btn) return;

  const styles = window.getComputedStyle(bio);
  const lineHeight = parseFloat(styles.lineHeight) || 12;
  const isClipped = bio.scrollHeight - bio.clientHeight > Math.max(2, lineHeight * 0.35);
  btn.hidden = !isClipped;
}

function isSpeakerTooltipPinned(chip) {
  return chip?.dataset.tooltipPinned === "true";
}

function resetSessionSpeakerTooltip(chip) {
  if (!chip) return;
  chip.classList.remove("tooltipOpen");
  chip.setAttribute("aria-expanded", "false");
  chip.dataset.tooltipPinned = "false";
  chip.querySelector(".speakerTooltip")?.remove();
}

function closeSessionSpeakerTooltips(exceptChip, includePinned = false) {
  if (
    activeSpeakerTooltipChip &&
    activeSpeakerTooltipChip !== exceptChip &&
    (includePinned || !isSpeakerTooltipPinned(activeSpeakerTooltipChip))
  ) {
    resetSessionSpeakerTooltip(activeSpeakerTooltipChip);
    activeSpeakerTooltipChip = null;
  }

  document.querySelectorAll(".speakerChip.tooltipOpen").forEach(chip => {
    if (chip === exceptChip) return;
    if (!includePinned && isSpeakerTooltipPinned(chip)) return;
    resetSessionSpeakerTooltip(chip);
  });

  queueWidgetHeightPost();
}

function showSpeakerTooltip(ev, chip) {
  if (ev) ev.stopPropagation();
  if (!chip) return;

  closeSessionSpeakerTooltips(chip, false);
  if (!chip.querySelector(".speakerTooltip")) {
    const sp = getSpeakerDetailsByName(chip.dataset.speakerName);
    chip.insertAdjacentHTML("beforeend", buildSpeakerTooltipHTML(sp));
  }

  chip.classList.add("tooltipOpen");
  chip.setAttribute("aria-expanded", "true");
  activeSpeakerTooltipChip = chip;

  window.requestAnimationFrame(() => {
    if (chip.classList.contains("tooltipOpen")) {
      updateSpeakerTooltipMoreButton(chip.querySelector(".speakerTooltip"));
      queueWidgetHeightPost();
    }
  });

  queueWidgetHeightPost();
}

function resetSpeakerTooltipsIn(root) {
  root?.querySelectorAll(".speakerChip.tooltipOpen").forEach(chip => {
    resetSessionSpeakerTooltip(chip);
    if (activeSpeakerTooltipChip === chip) activeSpeakerTooltipChip = null;
  });
}

function hideSpeakerTooltip(ev, chip) {
  if (ev) ev.stopPropagation();
  if (isSpeakerTooltipPinned(chip)) return;
  resetSessionSpeakerTooltip(chip);
  if (activeSpeakerTooltipChip === chip) activeSpeakerTooltipChip = null;
  queueWidgetHeightPost();
}

function toggleSpeakerTooltipPin(ev, chip) {
  if (ev) ev.stopPropagation();
  if (!chip) return;

  if (isSpeakerTooltipPinned(chip)) {
    resetSessionSpeakerTooltip(chip);
    if (activeSpeakerTooltipChip === chip) activeSpeakerTooltipChip = null;
    queueWidgetHeightPost();
    return;
  }

  showSpeakerTooltip(ev, chip);
  chip.dataset.tooltipPinned = "true";
}

function handleSpeakerTooltipFocusOut(ev, chip) {
  if (isSpeakerTooltipPinned(chip)) return;
  if (chip?.contains(ev.relatedTarget)) return;
  hideSpeakerTooltip(ev, chip);
}

function toggleSpeakerTooltipFromKeyboard(ev, chip) {
  if (ev.key !== "Enter" && ev.key !== " ") return;
  ev.preventDefault();
  toggleSpeakerTooltipPin(ev, chip);
}

function expandSpeakerTooltip(ev, btn) {
  if (ev) ev.stopPropagation();
  const tooltip = btn?.closest(".speakerTooltip");
  const chip = btn?.closest(".speakerChip");
  if (!tooltip || !btn) return;

  tooltip.classList.toggle("tooltipExpanded");
  const isExpanded = tooltip.classList.contains("tooltipExpanded");
  btn.textContent = isExpanded ? "Show less" : "See more info";
  btn.setAttribute("aria-expanded", isExpanded ? "true" : "false");

  if (chip) {
    chip.classList.add("tooltipOpen");
    chip.setAttribute("aria-expanded", "true");
    activeSpeakerTooltipChip = chip;
  }
  queueWidgetHeightPost();
}

document.addEventListener("click", () => closeSessionSpeakerTooltips());
document.addEventListener("keydown", (ev) => {
  if (ev.key === "Escape") closeSessionSpeakerTooltips(null, true);
});

// ─── TBD BLOCKS ───────────────────────────────────────────────────────────────
// Blocks whose programming has been scheduled but not yet announced. They are
// still expandable, but the panel shows a "details coming soon" message instead
// of session cards.
const TBD_BLOCKS = { "2026-10-08|15:00": true };

function isTbdBlock(blockKey) {
  return !!TBD_BLOCKS[blockKey];
}

function buildTbdPanelHTML() {
  return `<div class="sessionPanel" hidden>
    <div class="tbdPanel">
      <div class="tbdPanelTitle">Speaker &amp; session details coming soon</div>
      <p class="tbdPanelText">This keynote is still being finalized — check back as we get closer to the event. To be the first to know when we announce, sign up for the <a href="https://lp.constantcontactpages.com/sl/JptLr3F/globalgathering" target="_blank" rel="noopener">Global Gathering newsletter</a>.</p>
    </div>
  </div>`;
}

function buildSessionsHTML(blockKey) {
  const sessions = (typeof sessionsByBlock !== "undefined" && sessionsByBlock[blockKey]) || [];
  if (!sessions.length) return "";

  return `<div class="sessionPanel" hidden>
    <div class="sessionGrid">
      ${sessions.map(s => {
        const descId = `desc-${esc(s.code)}`;
        const calLinks = buildCalUrls(s, blockKey);
        const shareBtnHtml = `<button class="linkedin-btn" onclick="event.stopPropagation();shareLinkedIn('${esc(s.code)}')" title="Share on LinkedIn">${SVG_LINKEDIN}Share</button>`;
        const calBtnsHtml = `<div class="calBtns">
          ${calLinks ? `<a class="calBtn calGcal" href="${esc(calLinks.gcal)}" target="_blank" rel="noopener" title="Add to Google Calendar">${SVG_GCAL}</a>
          <a class="calBtn calOutlook" href="${esc(calLinks.outlook)}" target="_blank" rel="noopener" title="Add to Outlook Calendar">${SVG_OUTLOOK}</a>
          <button class="calBtn calIcs" onclick="event.stopPropagation();downloadICS('${esc(s.code)}')" title="Download .ics">&#8595;</button>` : ""}
          ${shareBtnHtml}
        </div>`;
        const tagsHtml = (s.tags && s.tags.length)
          ? `<div class="sessionTagLine">${s.tags.map(t => esc(t)).join(" · ")}</div>`
          : "";
        return `
        <div class="sessionCard" data-code="${esc(s.code)}">
          <div class="sessionTags">
            ${s.theme ? `<span class="sessionTheme">${esc(s.theme)}</span>` : ""}
          </div>
          <div class="sessionCardTitle">${esc(s.name)}</div>
          ${tagsHtml}
          ${s.description ? `<p class="sessionDesc" id="${descId}">${esc(s.description)}</p>
          <div class="sessionCardActions">
            <button class="descExpandBtn" onclick="toggleDesc(this,'${descId}')" aria-expanded="false">View full details <span class="descExpandIcon">&#9660;</span></button>
            ${calBtnsHtml}
          </div>` : calBtnsHtml ? `<div class="sessionCardActions" style="justify-content:flex-end">${calBtnsHtml}</div>` : ""}
          ${s.speakers.length ? `
            <div class="speakerRow">
              ${s.speakers.map(sp => {
                const initials = esc(sp.name.split(" ").map(w => w[0]).slice(0,2).join(""));
                const avatar = sp.photo
                  ? `<img class="speakerInitials speakerPhoto" src="${esc(sp.photo)}" alt="${esc(sp.name)}">`
                  : `<div class="speakerInitials">${initials}</div>`;
                return `
                <div class="speakerChip" tabindex="0" data-speaker-name="${esc(sp.name)}" onmouseenter="showSpeakerTooltip(event,this)" onmouseleave="hideSpeakerTooltip(event,this)" onclick="toggleSpeakerTooltipPin(event,this)" onfocus="showSpeakerTooltip(event,this)" onfocusout="handleSpeakerTooltipFocusOut(event,this)" onkeydown="toggleSpeakerTooltipFromKeyboard(event,this)" aria-expanded="false" title="Hover for speaker info">
                  ${avatar}
                  <div class="speakerChipInfo">
                    <span class="speakerChipName">${esc(sp.name)}</span>
                    ${sp.title || sp.org ? `<span class="speakerChipMeta">${esc([sp.title, sp.org].filter(Boolean).join(" · "))}</span>` : ""}
                  </div>
                </div>`;
              }).join("")}
            </div>` : ""}
        </div>`;
      }).join("")}
    </div>
  </div>`;
}

function toggleDesc(btn, descId) {
  const desc = document.getElementById(descId);
  if (!desc) return;
  const isExpanded = btn.getAttribute("aria-expanded") === "true";
  if (isExpanded) {
    desc.classList.remove("sessionDesc--expanded");
    btn.setAttribute("aria-expanded", "false");
    btn.firstChild.textContent = "View full details ";
    btn.querySelector(".descExpandIcon").style.transform = "";
  } else {
    desc.classList.add("sessionDesc--expanded");
    btn.setAttribute("aria-expanded", "true");
    btn.firstChild.textContent = "View less ";
    btn.querySelector(".descExpandIcon").style.transform = "rotate(180deg)";
  }
  queueWidgetHeightPost();
}

// ─── LINKEDIN SHARE ───────────────────────────────────────────────────────────
// Opens a modal with an editable, pre-written LinkedIn post for the session.
// LinkedIn's public share URL can't pre-fill post body text, so we let the user
// copy the text and open LinkedIn's composer with the event URL attached.
function shareLinkedIn(code) {
  const s = (typeof sessionMap !== "undefined" && sessionMap[code]) || null;
  if (!s) return;

  const tz      = timezoneSelect.value;
  const tzAbbr  = getTzAbbreviation(tz);
  const info    = blockTimeMap[s.blockKey] || [];
  const sd      = info[0];
  const st      = info[1];
  const endTime = s.endTime || info[3];
  const startUtc = easternToUtc(sd, st);
  const endUtc   = easternToUtc(sd, endTime);

  const dateStr = startUtc.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric", timeZone: tz });
  const timeStr = formatInTimezone(startUtc, tz) + " – " + formatInTimezone(endUtc, tz) + (tzAbbr ? " " + tzAbbr : "");

  const typeLabel = PDF_TYPE_LABEL[s.type] || getSessionLabel(s.type) || "session";
  const article   = /^[aeiou]/i.test(typeLabel) ? "an" : "a";
  const descText  = (s.description || "").replace(/<[^>]*>/g, "").trim();
  const tagStr    = (s.tags || []).map(t => "#" + t.replace(/[^A-Za-z0-9]/g, "")).filter(t => t.length > 1).join(" ");
  const fixedTags = "#FutureOfChildWelfare #ChildWelfare #SocialWork";

  const post = `I'm excited to be joining "${s.name}" — ${article} ${typeLabel} at the 2026 Global Gathering for the Future of Child Welfare! 🌟`
    + (descText ? `\n\n${descText}` : "")
    + `\n\n📅 ${dateStr}\n⏰ ${timeStr}`
    + `\n\nLearn more and register: https://www.futureofchildwelfare.org`
    + `\n\n${tagStr ? tagStr + " " : ""}${fixedTags}`;

  const overlay = document.createElement("div");
  overlay.className = "li-modal-overlay";
  overlay.innerHTML = `
    <div class="li-modal" role="dialog" aria-modal="true">
      <div class="li-modal-header">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="#0A66C2" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
        Share on LinkedIn
      </div>
      <textarea id="li-post-text" spellcheck="false"></textarea>
      <div class="li-modal-hint">Edit if you like, copy the text, then click Open LinkedIn to paste and post.</div>
      <div class="li-modal-actions">
        <button class="li-modal-close" id="li-close-btn">Cancel</button>
        <button class="li-modal-copy" id="li-copy-btn">Copy Text</button>
        <button class="li-modal-open" id="li-open-btn">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          Open LinkedIn
        </button>
      </div>
    </div>`;
  document.body.appendChild(overlay);

  const ta       = overlay.querySelector("#li-post-text");
  const copyBtn  = overlay.querySelector("#li-copy-btn");
  const openBtn  = overlay.querySelector("#li-open-btn");
  const closeBtn = overlay.querySelector("#li-close-btn");
  ta.value = post; // set via value (not innerHTML) so special chars are safe

  const doClose = () => { try { document.body.removeChild(overlay); } catch (e) {} document.removeEventListener("keydown", onKey); };
  const onKey = e => { if (e.key === "Escape") doClose(); };
  document.addEventListener("keydown", onKey);
  overlay.addEventListener("click", e => { if (e.target === overlay) doClose(); });
  closeBtn.addEventListener("click", doClose);

  const doCopy = () => {
    const text = ta.value;
    ta.select();
    try { document.execCommand("copy"); } catch (e) {}
    if (navigator.clipboard) navigator.clipboard.writeText(text).catch(() => {});
    copyBtn.textContent = "Copied!";
    copyBtn.style.background = "#e6f4ea";
    copyBtn.style.borderColor = "#2e7d32";
    copyBtn.style.color = "#2e7d32";
    setTimeout(() => {
      copyBtn.textContent = "Copy Text";
      copyBtn.style.background = "";
      copyBtn.style.borderColor = "";
      copyBtn.style.color = "";
    }, 2000);
  };
  copyBtn.addEventListener("click", doCopy);

  openBtn.addEventListener("click", () => {
    doCopy();
    const liUrl = "https://www.linkedin.com/shareArticle?mini=true&url=" + encodeURIComponent("https://www.futureofchildwelfare.org");
    setTimeout(() => window.open(liUrl, "_blank", "width=600,height=600,noopener,noreferrer"), 300);
  });
}

let openBlockEl = null;

function togglePanel(blockWrap, forceOpen) {
  const panel = blockWrap.querySelector(".sessionPanel");
  const chevron = blockWrap.querySelector(".chevron");
  if (!panel) return;

  const willOpen = forceOpen !== undefined ? forceOpen : panel.hidden;

  if (willOpen) {
    // Only enforce single-open when user clicks a block (not expand/collapse all)
    if (forceOpen === undefined && openBlockEl && openBlockEl !== blockWrap) {
      const prev = openBlockEl.querySelector(".sessionPanel");
      const prevChev = openBlockEl.querySelector(".chevron");
      if (prev) prev.hidden = true;
      if (prevChev) prevChev.classList.remove("open");
      resetSpeakerTooltipsIn(openBlockEl);
      openBlockEl.querySelector(".timeRow")?.classList.remove("block--open");
    }
    panel.hidden = false;
    chevron?.classList.add("open");
    blockWrap.querySelector(".timeRow")?.classList.add("block--open");
    if (forceOpen === undefined) openBlockEl = blockWrap;
  } else {
    panel.hidden = true;
    chevron?.classList.remove("open");
    resetSpeakerTooltipsIn(blockWrap);
    blockWrap.querySelector(".timeRow")?.classList.remove("block--open");
    if (openBlockEl === blockWrap) openBlockEl = null;
  }
  queueWidgetHeightPost();
}

// ─── AGENDA PDF EXPORT ───────────────────────────────────────────────────────
// Builds a polished, multi-page PDF of the FULL agenda (all three days, every
// session) in the currently selected timezone. Renders a standalone HTML doc
// inside a hidden same-origin iframe, then runs html2pdf on it. Layout is
// modeled on the GG backend-scheduler export: full-page gradient cover, a
// time-column grid, colored type pills with icons, per-session speakers and
// full descriptions.

const PDF_DAY_META = {
  day1: { label: "Skill Building Institutes", date: "2026-10-06" },
  day2: { label: "The Global Gathering",      date: "2026-10-07" },
  day3: { label: "The Global Gathering",      date: "2026-10-08" }
};

// Hosted cover page (letter, 612×792pt). It becomes page 1 of the export, with
// the timezone note drawn on top in Montserrat, white, anchored bottom-right.
const PDF_COVER_URL = "https://custom.cvent.com/AE944F71438646268B70FF5BF3772347/files/event/e7d15afcf2b14901ab0272ce8a401899/91a9cf22b19c4793b69e31d85d32eeca.pdf";
const PDF_COVER_TZ_SIZE   = 12;             // font size in pt
const PDF_COVER_TZ_RGB    = [1, 1, 1];      // white
const PDF_COVER_TZ_MARGIN = { right: 48, bottom: 44 }; // pt from the bottom-right corner
const PDFLIB_SRC     = "https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js";
const FONTKIT_SRC    = "https://cdn.jsdelivr.net/npm/@pdf-lib/fontkit@1.1.1/dist/fontkit.umd.min.js";
const MONTSERRAT_TTF = "https://cdn.jsdelivr.net/gh/JulietaUla/Montserrat/fonts/ttf/Montserrat-Regular.ttf";

const PDF_TYPE_LABEL = {
  workshop: "Workshop",
  strategy: "Strategy Session",
  creative: "Creative Space",
  keynote:  "Keynote",
  skill:    "Skill Building Institute",
  intl:     "International Exchange"
};

// Pill palette per session type: [background, text, border]
const PDF_TYPE_PILL = {
  workshop: ["#eaf4f7", "#187089", "#b9dce5"],
  strategy: ["#fff1df", "#8a4307", "#fed7aa"],
  creative: ["#f4eeee", "#b04239", "#e8c8c5"],
  keynote:  ["#edf0f7", "#122345", "#cbd5e1"],
  skill:    ["#f1f5d8", "#4b5563", "#d7d99c"],
  intl:     ["#e7f0fb", "#1565c0", "#bcd6f5"]
};

function pdfEsc(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function pdfTypePill(type) {
  const label = PDF_TYPE_LABEL[type] || getSessionLabel(type);
  const [bg, color, border] = PDF_TYPE_PILL[type] || ["#eef1f5", "#475569", "#d6deea"];
  const icon = icons[type];
  const iconHtml = icon
    ? `<span class="aType-ic"><img src="${icon}" crossorigin="anonymous" alt=""></span>`
    : "";
  return `<span class="aType" style="background:${bg};color:${color};border-color:${border};">${iconHtml}<span>${pdfEsc(label)}</span></span>`;
}

function pdfSpeakersHTML(speakers) {
  const lines = (speakers || []).map(sp => {
    const parts = [sp.name, sp.title, sp.org].map(x => (x || "").trim()).filter(Boolean);
    return parts.length ? `<div class="aSpkLine">${pdfEsc(parts.join(", "))}</div>` : "";
  }).filter(Boolean);
  if (!lines.length) return "";
  return `<div class="aSpk">${lines.join("")}</div>`;
}

function buildAgendaPdfDoc(selectedZone) {
  const tzAbbr = getTzAbbreviation(selectedZone);
  const tzNote = tzAbbr ? `All times shown in ${tzAbbr}` : "Times shown in your selected time zone";
  const generated = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  const daysHtml = Object.entries(PDF_DAY_META).map(([day, meta]) => {
    const dateObj = new Date(meta.date + "T12:00:00");
    const dateLabel = dateObj.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });

    const rows = [];
    (data[day] || []).forEach(([sd, st, ed, et, types]) => {
      const blockKey = `${sd}|${st}`;
      const sessions = (typeof sessionsByBlock !== "undefined" && sessionsByBlock[blockKey]) || [];

      if (isTbdBlock(blockKey)) {
        const startUtc = easternToUtc(sd, st), endUtc = easternToUtc(ed, et);
        const timeLabel = buildTimeLabel(startUtc, endUtc, selectedZone, day);
        rows.push(`<article class="aRow">
          <div class="aTime">${pdfEsc(timeLabel)}${tzAbbr ? `<div class="aTz">${tzAbbr}</div>` : ""}</div>
          <div class="aMain">
            <div class="aHead"><h3>Keynote — to be announced</h3>${pdfTypePill("keynote")}</div>
            <p class="aDesc aDesc-tbd">Speaker &amp; session details are still being finalized. Check back closer to the event, or sign up for the Global Gathering newsletter to be notified when we announce.</p>
          </div>
        </article>`);
        return;
      }

      sessions.forEach(s => {
        const sType = s.type || (types && types[0]) || "workshop";
        const startUtc = easternToUtc(sd, st);
        const endUtc   = easternToUtc(sd, s.endTime || et);
        const timeLabel = buildTimeLabel(startUtc, endUtc, selectedZone, day);
        const themeHtml = s.theme ? `<div class="aTheme">${pdfEsc(s.theme)}</div>` : "";
        const descHtml  = s.description ? `<p class="aDesc">${pdfEsc(s.description)}</p>` : "";
        rows.push(`<article class="aRow">
          <div class="aTime">${pdfEsc(timeLabel)}${tzAbbr ? `<div class="aTz">${tzAbbr}</div>` : ""}</div>
          <div class="aMain">
            <div class="aHead"><h3>${pdfEsc(s.name)}</h3>${pdfTypePill(sType)}</div>
            ${themeHtml}
            ${pdfSpeakersHTML(s.speakers)}
            ${descHtml}
          </div>
        </article>`);
      });
    });

    return `<section class="aDay">
      <div class="aDayHeader"><h2>${pdfEsc(dateLabel)}</h2><span>${pdfEsc(meta.label)}</span></div>
      <div class="aRows">${rows.join("")}</div>
    </section>`;
  }).join("");

  return `<!DOCTYPE html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
<style>
  *{box-sizing:border-box;margin:0;padding:0;}
  body{font-family:'Montserrat',Arial,sans-serif;background:#fff;width:816px;color:#172033;letter-spacing:-.01em;}
  .aContent{width:816px;box-sizing:border-box;padding:56px 64px 60px;background:#fff;}
  .aDay{margin-top:26px;page-break-inside:auto;}
  .aDay:first-of-type{margin-top:0;}
  .aDayHeader{page-break-after:avoid;margin:0 0 10px;padding-bottom:8px;border-bottom:2px solid #122345;display:flex;align-items:baseline;gap:12px;}
  .aDayHeader h2{margin:0;color:#122345;font-size:18px;line-height:1.1;font-weight:800;}
  .aDayHeader span{color:#187089;font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:.07em;}
  .aRows{width:100%;}
  .aRow{page-break-inside:avoid;display:grid;grid-template-columns:1.05in minmax(0,1fr);gap:18px;padding:14px 0 15px;border-bottom:1px solid #e6edf3;}
  .aRow:last-child{border-bottom:0;}
  .aTime{color:#122345;font-size:10.5px;font-weight:800;line-height:1.3;padding-top:2px;}
  .aTz{color:#94a3b8;font-size:8px;font-weight:700;margin-top:2px;}
  .aMain{min-width:0;}
  .aHead{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:5px;}
  .aHead h3{margin:0;color:#122345;font-size:13.5px;line-height:1.28;font-weight:800;}
  .aType{flex:0 0 auto;border-radius:999px;padding:3px 9px 3px 4px;font-size:7.4px;line-height:1;font-weight:800;text-transform:uppercase;letter-spacing:.04em;white-space:nowrap;border:1px solid transparent;display:inline-flex;align-items:center;gap:5px;min-height:22px;}
  .aType-ic{width:16px;height:16px;border-radius:999px;display:inline-flex;align-items:center;justify-content:center;flex:0 0 16px;background:rgba(255,255,255,.85);border:1px solid rgba(18,35,69,.08);overflow:hidden;}
  .aType-ic img{width:12px;height:12px;object-fit:contain;display:block;}
  .aTheme{color:#7c4dbd;font-size:8.5px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;margin:0 0 5px;}
  .aSpk{margin:0 0 6px;color:#187089;font-size:9.5px;line-height:1.4;font-weight:700;}
  .aSpkLine{margin:0 0 2px;}
  .aSpkLine:last-child{margin-bottom:0;}
  .aDesc{margin:0;color:#334155;font-size:9.4px;line-height:1.5;font-weight:400;white-space:pre-line;}
  .aDesc-tbd{font-style:italic;color:#64748b;}
  .aFooter{margin-top:26px;padding-top:10px;border-top:1px solid #dbe3ee;display:flex;justify-content:space-between;gap:14px;color:#64748b;font-size:7.6px;font-weight:700;}
</style></head><body>
  <main class="aContent">
    ${daysHtml}
    <div class="aFooter">
      <span>Global Gathering agenda as of ${pdfEsc(generated)}</span>
      <span>${pdfEsc(tzNote)} &middot; Subject to change</span>
    </div>
  </main>
</body></html>`;
}

let pdfInFlight = false;

// Lazily load a script into the main window once, caching the promise.
const _scriptCache = {};
function loadScriptOnce(src) {
  if (_scriptCache[src]) return _scriptCache[src];
  _scriptCache[src] = new Promise((res, rej) => {
    const sc = document.createElement("script");
    sc.src = src; sc.onload = res; sc.onerror = () => rej(new Error("Failed to load " + src));
    document.head.appendChild(sc);
  });
  return _scriptCache[src];
}

// Render the agenda content (no cover) to a PDF and return its bytes.
function renderAgendaPagesBytes(selectedZone) {
  return new Promise((resolve, reject) => {
    const iframe = document.createElement("iframe");
    iframe.style.cssText = "position:fixed;top:0;left:0;width:816px;height:1100px;border:none;opacity:0.01;pointer-events:none;z-index:-1;";
    document.body.appendChild(iframe);
    const cleanup = () => setTimeout(() => { try { document.body.removeChild(iframe); } catch (e) {} }, 1500);

    const iDoc = iframe.contentDocument || iframe.contentWindow.document;
    iDoc.open();
    iDoc.write(buildAgendaPdfDoc(selectedZone));
    iDoc.close();

    const imgEls = Array.from(iDoc.querySelectorAll("img"));
    const imgReady = imgEls.map(img => img.complete
      ? Promise.resolve()
      : new Promise(r => { img.onload = r; img.onerror = r; }));

    Promise.all(imgReady)
      .then(() => new Promise(r => setTimeout(r, 400)))
      .then(() => new Promise((res, rej) => {
        const sc = iDoc.createElement("script");
        sc.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
        sc.onload = res; sc.onerror = rej;
        iDoc.head.appendChild(sc);
      }))
      .then(() => iframe.contentWindow.html2pdf().set({
        margin: 0,
        image: { type: "jpeg", quality: 0.92 },
        html2canvas: { scale: 2, useCORS: true, backgroundColor: "#ffffff", width: 816, windowWidth: 816 },
        jsPDF: { unit: "pt", format: [612, 792], orientation: "portrait", compress: true },
        pagebreak: { mode: ["legacy"], avoid: [".aRow", ".aDayHeader"] }
      }).from(iDoc.body).outputPdf("arraybuffer"))
      // The buffer is created in the iframe's realm; copy it into the main realm
      // BEFORE the iframe is removed, or it becomes detached during the merge.
      .then(buf => { const copy = new Uint8Array(buf).slice(); cleanup(); resolve(copy); })
      .catch(err => { cleanup(); reject(err); });
  });
}

// Prepend the hosted cover (with the timezone note drawn on it) to the agenda
// pages and return the merged PDF bytes.
async function mergeCoverAndAgenda(agendaBytes, tzNote) {
  await Promise.all([loadScriptOnce(PDFLIB_SRC), loadScriptOnce(FONTKIT_SRC)]);
  const [coverResp, fontResp] = await Promise.all([fetch(PDF_COVER_URL), fetch(MONTSERRAT_TTF)]);
  if (!coverResp.ok) throw new Error("Cover fetch failed: " + coverResp.status);
  const coverBytes = await coverResp.arrayBuffer();
  const fontBytes  = await fontResp.arrayBuffer();

  const { PDFDocument, rgb } = window.PDFLib;
  const coverDoc  = await PDFDocument.load(coverBytes);
  coverDoc.registerFontkit(window.fontkit);
  const agendaDoc = await PDFDocument.load(agendaBytes);

  // Draw the timezone note onto the cover in Montserrat, anchored bottom-right.
  const font = await coverDoc.embedFont(fontBytes);
  const page = coverDoc.getPage(0);
  const { width } = page.getSize();
  const size  = PDF_COVER_TZ_SIZE;
  const textW = font.widthOfTextAtSize(tzNote, size);
  page.drawText(tzNote, {
    x: width - PDF_COVER_TZ_MARGIN.right - textW,
    y: PDF_COVER_TZ_MARGIN.bottom,
    size, font,
    color: rgb(PDF_COVER_TZ_RGB[0], PDF_COVER_TZ_RGB[1], PDF_COVER_TZ_RGB[2])
  });

  // Append the agenda pages after the cover.
  const copied = await coverDoc.copyPages(agendaDoc, agendaDoc.getPageIndices());
  copied.forEach(p => coverDoc.addPage(p));

  return coverDoc.save();
}

function downloadAgendaPDF() {
  if (pdfInFlight) return;
  pdfInFlight = true;

  const btn   = document.getElementById("downloadPdfBtn");
  const label = btn ? btn.querySelector(".pdfBtnLabel") : null;
  const prevLabel = label ? label.textContent : "";
  if (btn)   btn.classList.add("is-loading");
  if (label) label.textContent = "Preparing PDF…";

  const selectedZone = timezoneSelect.value;
  const tzAbbr   = getTzAbbreviation(selectedZone);
  const tzNote   = tzAbbr ? `All times shown in ${tzAbbr}` : "Times shown in your selected time zone";
  const filename = `global-gathering-agenda-${(tzAbbr || "agenda").toLowerCase()}.pdf`;

  const restore = () => {
    if (btn)   btn.classList.remove("is-loading");
    if (label) label.textContent = prevLabel || "Download full agenda (PDF)";
    pdfInFlight = false;
  };

  renderAgendaPagesBytes(selectedZone)
    .then(agendaBytes => mergeCoverAndAgenda(agendaBytes, tzNote))
    .then(mergedBytes => {
      const blob = new Blob([mergedBytes], { type: "application/pdf" });
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement("a");
      a.href = url; a.download = filename;
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 4000);
    })
    .catch(err => { console.error("Agenda PDF failed:", err); alert("Sorry — the PDF could not be generated. Please try again."); })
    .finally(restore);
}

// ─── RENDER ───────────────────────────────────────────────────────────────────
function render(day) {
  const grid         = document.getElementById("agendaGrid");
  const selectedZone = timezoneSelect.value;
  grid.innerHTML     = "";
  openBlockEl        = null;
  allExpanded        = false;
  const toggleBtn = document.getElementById("toggleAllBtn");
  if (toggleBtn) toggleBtn.textContent = "Expand all";

  const skillNote = document.getElementById("skillNote");
  skillNote.style.display = day === "day1" ? "" : "none";

  data[day].forEach(([startDate, startTime, endDate, endTime, types]) => {
    const startUtc = easternToUtc(startDate, startTime);
    const endUtc   = easternToUtc(endDate, endTime);

    const category = getTimeCategory(startUtc, endUtc, selectedZone);
    if (showFiltered && category === "neutral") return;

    const evening     = category === "evening";
    const comfortable = category === "daytime";
    const neutral     = category === "neutral";

    const timeLabel = buildTimeLabel(startUtc, endUtc, selectedZone, day);
    const tzAbbr    = getTzAbbreviation(selectedZone);
    const primary   = types[0];
    const blockKey  = `${startDate}|${startTime}`;
    const hasSessions = typeof sessionsByBlock !== "undefined" && (sessionsByBlock[blockKey] || []).length > 0;
    const tbd         = isTbdBlock(blockKey);
    const expandable  = hasSessions || tbd;

    const typeContent = types.map((t, i) => `
      <div class="sessionTypeRow${i > 0 ? " sessionTypeRow--extra" : ""}">
        <img class="icon" src="${icons[t]}" alt="">
        <div>
          <div class="sessionType">${getSessionLabel(t)}</div>
          ${getSessionSub(t) ? `<div class="sessionSub">${getSessionSub(t)}</div>` : ""}
        </div>
      </div>
    `).join("");

    const blockWrap = document.createElement("div");
    blockWrap.className = "blockWrap";
    blockWrap.dataset.block = blockKey;
    blockWrap.innerHTML = `
      <div class="timeRow${expandable ? " timeRow--clickable" : ""}">
        <div class="timeLabel">${timeLabel}</div>
        <div class="sessionBlock${comfortable ? " comfortable" : ""}${evening ? " evening" : ""}">
          <div class="sessionTypes">${typeContent}</div>
          <div class="sessionMeta">
            ${comfortable ? `<div class="comfortLabel">${tzAbbr} daytime hours</div>` : ""}
            ${evening ? `<div class="eveningLabel">${tzAbbr} evening hours</div>` : ""}
            ${neutral && primary !== "skill" ? `<div class="neutralLabel">The majority of sessions are recorded</div>` : ""}
          </div>
        </div>
        ${expandable ? `<span class="chevron" aria-hidden="true"></span>` : ""}
      </div>
      ${hasSessions ? buildSessionsHTML(blockKey) : tbd ? buildTbdPanelHTML() : ""}
    `;

    if (expandable) {
      blockWrap.querySelector(".timeRow").addEventListener("click", () => togglePanel(blockWrap));
    }

    grid.appendChild(blockWrap);
  });

  queueWidgetHeightPost();
}

// ─── EVENT LISTENERS ──────────────────────────────────────────────────────────
document.querySelectorAll(".dayBtn").forEach(btn => {
  btn.addEventListener("click", () => {
    // Exit speaker view if active
    if (inSpeakerView) {
      inSpeakerView = false;
      document.getElementById("speakerGrid").style.display = "none";
      document.getElementById("agendaGrid").style.display = "";
      document.getElementById("expandControls").style.display = "";
      document.getElementById("speakerViewBtn").classList.remove("active");
      const fb = document.querySelector(".filterToggle button");
      if (fb) { fb.disabled = false; fb.classList.remove("disabled"); }
    }
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
  filterBtn.textContent = showFiltered ? "Showing daytime & evening hours" : "Show daytime & evening hours";
  const activeDay = document.querySelector(".dayBtn.active").dataset.day;
  render(activeDay);
});

let allExpanded = false;

document.getElementById("toggleAllBtn").addEventListener("click", () => {
  allExpanded = !allExpanded;
  document.querySelectorAll(".blockWrap").forEach(bw => togglePanel(bw, allExpanded));
  document.getElementById("toggleAllBtn").textContent = allExpanded ? "Collapse all" : "Expand all";
});

document.getElementById("speakerViewBtn").addEventListener("click", toggleSpeakerView);

document.getElementById("downloadPdfBtn").addEventListener("click", downloadAgendaPDF);

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
