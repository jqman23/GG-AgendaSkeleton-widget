// ─── CALENDAR SVG ICONS ──────────────────────────────────────────────────────
// Using Google's favicon service (stable) and Microsoft's CDN icon (stable)
const SVG_GCAL    = `<img src="https://custom.cvent.com/AE944F71438646268B70FF5BF3772347/files/event/e7d15afcf2b14901ab0272ce8a401899/18455c8f54504314847defa08b8dcda2.png" width="16" height="16" alt="Google Calendar" style="display:block;">`;
const SVG_OUTLOOK = `<img src="https://custom.cvent.com/AE944F71438646268B70FF5BF3772347/files/event/e7d15afcf2b14901ab0272ce8a401899/17c86dcff13d41a386d3607a4f6fd948.png" width="16" height="16" alt="Outlook Calendar" style="display:block;">`;

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
    ["2026-10-08", "13:15", "2026-10-08", "14:15", ["workshop"]],
    ["2026-10-08", "16:00", "2026-10-08", "17:00", ["workshop"]],
    ["2026-10-08", "17:15", "2026-10-08", "18:30", ["workshop"]],
    ["2026-10-08", "18:45", "2026-10-08", "19:45", ["creative"]]
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

function buildSessionsHTML(blockKey) {
  const sessions = (typeof sessionsByBlock !== "undefined" && sessionsByBlock[blockKey]) || [];
  if (!sessions.length) return "";

  return `<div class="sessionPanel" hidden>
    <div class="sessionGrid">
      ${sessions.map(s => {
        const descId = `desc-${esc(s.code)}`;
        const calLinks = buildCalUrls(s, blockKey);
        const calBtnsHtml = calLinks ? `<div class="calBtns">
          <a class="calBtn calGcal" href="${esc(calLinks.gcal)}" target="_blank" rel="noopener" title="Add to Google Calendar">${SVG_GCAL}</a>
          <a class="calBtn calOutlook" href="${esc(calLinks.outlook)}" target="_blank" rel="noopener" title="Add to Outlook Calendar">${SVG_OUTLOOK}</a>
          <button class="calBtn calIcs" onclick="event.stopPropagation();downloadICS('${esc(s.code)}')" title="Download .ics">&#8595;</button>
        </div>` : "";
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

    const typeContent = types.map((t, i) => `
      <div class="sessionTypeRow${i > 0 ? " sessionTypeRow--extra" : ""}">
        <img class="icon" src="${icons[t]}" alt="">
        <div>
          <div class="sessionType">${getSessionLabel(t)}</div>
          ${i === 0 ? `<div class="sessionSub">${getSessionSub(t)}</div>` : ""}
        </div>
      </div>
    `).join("");

    const blockWrap = document.createElement("div");
    blockWrap.className = "blockWrap";
    blockWrap.dataset.block = blockKey;
    blockWrap.innerHTML = `
      <div class="timeRow${hasSessions ? " timeRow--clickable" : ""}">
        <div class="timeLabel">${timeLabel}</div>
        <div class="sessionBlock${comfortable ? " comfortable" : ""}${evening ? " evening" : ""}">
          <div class="sessionTypes">${typeContent}</div>
          <div class="sessionMeta">
            ${comfortable ? `<div class="comfortLabel">${tzAbbr} daytime hours</div>` : ""}
            ${evening ? `<div class="eveningLabel">${tzAbbr} evening hours</div>` : ""}
            ${neutral && primary !== "skill" ? `<div class="neutralLabel">The majority of sessions are recorded</div>` : ""}
          </div>
        </div>
        ${hasSessions ? `<span class="chevron" aria-hidden="true"></span>` : ""}
      </div>
      ${buildSessionsHTML(blockKey)}
    `;

    if (hasSessions) {
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
