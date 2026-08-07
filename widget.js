// ─── CALENDAR SVG ICONS ──────────────────────────────────────────────────────
// Using Google's favicon service (stable) and Microsoft's CDN icon (stable)
const SVG_GCAL    = `<img src="https://custom.cvent.com/AE944F71438646268B70FF5BF3772347/files/event/e7d15afcf2b14901ab0272ce8a401899/18455c8f54504314847defa08b8dcda2.png" width="16" height="16" alt="Google Calendar" style="display:block;">`;
const SVG_OUTLOOK = `<img src="https://custom.cvent.com/AE944F71438646268B70FF5BF3772347/files/event/e7d15afcf2b14901ab0272ce8a401899/17c86dcff13d41a386d3607a4f6fd948.png" width="16" height="16" alt="Outlook Calendar" style="display:block;">`;
const SVG_LINKEDIN = `<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`;
const SESSION_LOCATION = "All sessions are accessed via Attendee Hub";

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

let sessionsByBlock = {};
const sessionMap = {};

function buildSessionMap() {
  for (const [blockKey, sessions] of Object.entries(sessionsByBlock)) {
    for (const s of sessions) {
      sessionMap[s.code] = { ...s, blockKey };
    }
  }
}

// ─── TAB GROUPS ───────────────────────────────────────────────────────────────
// Two kinds of content:
//   • Skill Building Institutes (day1) — always live on ONE dedicated tab, even
//     if the selected timezone splits them across two calendar dates. That tab's
//     label becomes a date range (e.g. "Oct 6/7 • Skill Building Institutes").
//   • The Global Gathering (day2 + day3) — sessions are filed onto the tab that
//     matches their LOCAL START DATE in the selected timezone. Tabs are generated
//     dynamically: one per distinct local date, in chronological order. So a
//     far-east timezone may add an "Oct 9" tab, and a far-west one may merge two
//     event days onto a single date.
const INSTITUTE_BLOCKS = (data.day1 || []).slice();
const GG_BLOCKS        = [...(data.day2 || []), ...(data.day3 || [])];

// Format a "YYYY-MM-DD" string as "Oct 6" (parsed as a fixed wall-clock date,
// independent of the viewer's machine timezone).
function formatTabDate(dateStr) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short", day: "numeric", timeZone: "UTC"
  }).format(new Date(dateStr + "T12:00:00Z"));
}

// Compact range label for the Institutes tab: "Oct 6", "Oct 6/7", or, across a
// month boundary, "Oct 31/Nov 1".
function formatTabDateRange(dateStrs) {
  const sorted = [...new Set(dateStrs)].sort();
  if (sorted.length === 1) return formatTabDate(sorted[0]);
  const months = new Set(sorted.map(d => d.slice(0, 7)));
  if (months.size === 1) {
    const month = formatTabDate(sorted[0]).split(" ")[0];
    const days  = sorted.map(d => formatTabDate(d).split(" ")[1]);
    return `${month} ${days.join("/")}`;
  }
  return sorted.map(formatTabDate).join("/");
}

// Build the ordered list of tab descriptors for a given timezone.
// Each: { id, kind:"institute"|"gg", date, label, blocks:[...] }.
function computeTabs(zone) {
  const tabs = [];

  // Institutes tab — always present, always leftmost.
  if (INSTITUTE_BLOCKS.length) {
    const localDates = INSTITUTE_BLOCKS.map(([sd, st]) =>
      getLocalDateString(easternToUtc(sd, st), zone));
    tabs.push({
      id:     "institute",
      kind:   "institute",
      date:   localDates.slice().sort()[0],
      label:  `${formatTabDateRange(localDates)} • Skill Building Institutes`,
      blocks: INSTITUTE_BLOCKS.slice().sort((a, b) =>
        easternToUtc(a[0], a[1]) - easternToUtc(b[0], b[1]))
    });
  }

  // Global Gathering — bucket by local start date.
  const byDate = new Map();
  for (const block of GG_BLOCKS) {
    const localDate = getLocalDateString(easternToUtc(block[0], block[1]), zone);
    if (!byDate.has(localDate)) byDate.set(localDate, []);
    byDate.get(localDate).push(block);
  }
  [...byDate.keys()].sort().forEach(date => {
    tabs.push({
      id:     "gg|" + date,
      kind:   "gg",
      date,
      label:  `${formatTabDate(date)} • The Global Gathering`,
      blocks: byDate.get(date).sort((a, b) =>
        easternToUtc(a[0], a[1]) - easternToUtc(b[0], b[1]))
    });
  });

  return tabs;
}

// Returns the tab id that owns a given "date|time" block key in the current set.
function tabIdForBlockKey(blockKey) {
  for (const tab of currentTabs) {
    if (tab.blocks.some(b => `${b[0]}|${b[1]}` === blockKey)) return tab.id;
  }
  return null;
}

let currentTabs = [];
let activeTabId = null;

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
let parentViewportW  = 0;
let hasParentMetrics = false;
let modalAnchorEl    = null; // element the open modal is anchored to (a speaker card)
let searchOverlayAnchorEl = null; // element the open search popup is anchored to
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
  positionSearchOverlay();             // keep the search popup pinned too
  positionLinkedInOverlay();           // keep the share popup pinned too
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

  if (modal) {
    modal.style.top = anchorY + "px";
    // Clamp vertically so the box stays within the visible viewport instead of
    // hanging off the top/bottom edge — important on short (mobile) screens where
    // a card near an edge would otherwise push the modal partly out of view.
    const standalone = window.parent === window;
    if (standalone || hasParentMetrics) {
      const viewTop = hasParentMetrics ? parentScrollTop : window.scrollY;
      const half = modal.getBoundingClientRect().height / 2;
      const pad = 20;
      const minY = viewTop + half + pad;
      const maxY = viewTop + vh - half - pad;
      // If the modal is taller than the viewport, just center it (internal scroll
      // handles the overflow); otherwise keep the chosen anchor in [minY, maxY].
      modal.style.top = (minY > maxY ? viewTop + vh / 2
                                     : Math.min(Math.max(anchorY, minY), maxY)) + "px";
    }
  }
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
// Sessions are filed onto the tab matching their LOCAL START DATE, so a block
// always starts on its tab's date. The only qualifier we normally need is when
// the session's local END date falls on the following day ("ends next day").
//
// showDate prefixes the block's local start date (e.g. "Oct 6 · 5:00 PM – …").
// We turn it on only for the Skill Building Institutes tab when a timezone has
// split those blocks across two calendar dates, so each row says which day it is.
function buildTimeLabel(startUtc, endUtc, timezone, showDate) {
  const startDateStr = getLocalDateString(startUtc, timezone);
  const endDateStr   = getLocalDateString(endUtc, timezone);
  const startTimeStr = formatInTimezone(startUtc, timezone);
  const endTimeStr   = formatInTimezone(endUtc, timezone);

  const prefix = showDate ? `${formatTabDate(startDateStr)} · ` : "";
  if (startDateStr < endDateStr) {
    return `${prefix}${startTimeStr} – ${endTimeStr} next day`;
  }
  return `${prefix}${startTimeStr} – ${endTimeStr}`;
}

// True when a tab's blocks land on more than one local date in the given zone —
// i.e. the per-row time labels need an explicit date to stay unambiguous.
function tabSpansMultipleDates(tab, zone) {
  const dates = new Set(tab.blocks.map(b =>
    getLocalDateString(easternToUtc(b[0], b[1]), zone)));
  return dates.size > 1;
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

// orderedZones is built further down, once tzFlags (the country grouping key) is
// defined — detected zone first, then all zones grouped by country.

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

// Detected zone always first, then every zone grouped by country (flag) so a
// country's zones stay adjacent. Country groups are ordered by their earliest
// zone's UTC offset, and zones within a country by offset — so a group may sit a
// couple of hours "off" from a strict global sort, but it stays together.
const zoneGroups = new Map();
for (const z of allZones) {
  const key = tzFlags[z] || z; // fall back to the zone id for any flagless zone
  if (!zoneGroups.has(key)) zoneGroups.set(key, []);
  zoneGroups.get(key).push(z);
}
for (const arr of zoneGroups.values()) {
  arr.sort((a, b) => getUtcOffsetMinutes(a) - getUtcOffsetMinutes(b));
}
const groupsByOffset = [...zoneGroups.values()]
  .sort((a, b) => getUtcOffsetMinutes(a[0]) - getUtcOffsetMinutes(b[0]));

const orderedZones = [];
const placedZones  = new Set();
const pushZone = z => {
  if (z && !placedZones.has(z) && allZones.includes(z)) {
    placedZones.add(z);
    orderedZones.push(z);
  }
};
pushZone(browserZone); // detected zone always first
groupsByOffset.forEach(group => group.forEach(pushZone));

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
    + "&details=" + encodeURIComponent(desc)
    + "&location=" + encodeURIComponent(SESSION_LOCATION);

  // Outlook: ISO with -06:00 offset + Windows timezone ID
  const fmtOutlook = (date, time) => date + "T" + time + ":00-06:00";
  const outlook = "https://outlook.live.com/calendar/deeplink/compose?subject="
    + encodeURIComponent(s.name)
    + "&startdt=" + encodeURIComponent(fmtOutlook(sd, st))
    + "&enddt=" + encodeURIComponent(fmtOutlook(sd, endTime))
    + "&timeZone=" + encodeURIComponent("Mountain Standard Time")
    + "&body=" + encodeURIComponent(desc)
    + "&location=" + encodeURIComponent(SESSION_LOCATION);

  return { gcal, outlook };
}

function buildSessionActualTimeHtml(s, blockKey) {
  const info = blockTimeMap[blockKey];
  if (!info) return "";

  const [blockStartDate, blockStartTime, blockEndDate, blockEndTime] = info;
  const startDate = s.startDate || blockStartDate;
  const startTime = s.startTime || blockStartTime;
  const endDate   = s.endDate || blockEndDate || startDate;
  const endTime   = s.endTime || blockEndTime;

  if (!startDate || !startTime || !endDate || !endTime) return "";

  const startUtc = easternToUtc(startDate, startTime);
  const endUtc   = easternToUtc(endDate, endTime);
  const label    = buildTimeLabel(startUtc, endUtc, timezoneSelect.value);
  const tzAbbr   = getTzAbbreviation(timezoneSelect.value);

  return `<div class="sessionActualTime">${esc(label)}${tzAbbr ? ` <span>${esc(tzAbbr)}</span>` : ""}</div>`;
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
  const safeLocation = SESSION_LOCATION.replace(/[\\;,]/g, "\\$&").replace(/\n/g, "\\n");
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
    "LOCATION:" + safeLocation,
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
          entry.sessions.push({ code: s.code, name: s.name, type: s.type, blockKey });
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
  // Default view (before the user picks a sort control): last name A→Z, but
  // with speakers who have a photo grouped first, then those without —
  // both sub-groups keeping the A→Z order. Choosing any sort control
  // switches back to plain sorting regardless of photos.
  if (by === "lastaz" && speakerGroupByImage) {
    const withPhoto = speakers.filter(sp => sp.photo);
    const withoutPhoto = speakers.filter(sp => !sp.photo);
    return [...withPhoto, ...withoutPhoto];
  }
  return speakers;
}

let cachedSpeakers = [];
let currentSort = "lastaz";
let speakerGroupByImage = true;

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
  speakerGroupByImage = false;
  renderSpeakerView();
  queueWidgetHeightPost();
}

// True when the widget is rendered at the mobile breakpoint.
function isMobileView() {
  const ownNarrow = !!(window.matchMedia && window.matchMedia("(max-width: 700px)").matches);
  const parentNarrow = !!(hasParentMetrics && parentViewportW && parentViewportW <= 700);
  return !!(ownNarrow || parentNarrow);
}

let speakerModalSlug = null; // slug of the speaker currently shown in the modal

// Renders just the speaker's bio + session list into the modal body. Split out
// so the "back" button of the mobile session-overview can restore it in place.
function renderSpeakerModalBody(slug) {
  const sp = cachedSpeakers.find(s => speakerSlug(s.name) === slug);
  if (!sp) return;
  const initials = sp.name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();
  const avatar = sp.photo
    ? `<img class="spModalPhoto" src="${esc(sp.photo)}" alt="${esc(sp.name)}">`
    : `<div class="spModalInitials">${initials}</div>`;

  const sessionButtons = sp.sessions.map(sess =>
    `<button type="button" class="spModalSession" aria-expanded="false" data-block="${esc(sess.blockKey)}" data-code="${esc(sess.code)}" onclick="onSpeakerSessionClick('${esc(sess.blockKey)}','${esc(sess.code)}', event)">${esc(sess.name)}</button>`
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
}

function openSpeakerModal(slug, ev) {
  const sp = cachedSpeakers.find(s => speakerSlug(s.name) === slug);
  if (!sp) return;
  speakerModalSlug = slug;
  renderSpeakerModalBody(slug);

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

// Speaker-modal session click.
// Desktop keeps original behavior: jump to the session in the agenda.
// Mobile expands/collapses details inline inside the speaker popup.
function onSpeakerSessionClick(blockKey, code, ev) {
  if (ev) { ev.preventDefault(); ev.stopPropagation(); }

  if (isMobileView()) {
    const triggerEl = ev && ev.currentTarget
      ? ev.currentTarget
      : document.querySelector(`.spModalSession[data-code="${CSS.escape(String(code))}"]`);

    toggleSpeakerModalInlineSession(blockKey, code, triggerEl);
    return;
  }

  navigateToSession(blockKey, code);
}
function getSpeakerModalSessionInlineHTML(blockKey, code) {
  const sessions = (typeof sessionsByBlock !== "undefined" && sessionsByBlock[blockKey]) || [];
  const s = sessionMap[code] || sessions.find(x => String(x.code) === String(code));

  if (!s) {
    return `<div class="searchSessionInline speakerModalSessionInline"><div class="searchEmpty">Session details could not be found.</div></div>`;
  }

  const prefix = "spmodal-" + String(code).replace(/[^a-zA-Z0-9_-]/g, "-") + "-";

  return `<div class="searchSessionInline speakerModalSessionInline" data-code="${esc(code)}" data-block="${esc(blockKey)}">
    <div class="sessionOverview">${buildSessionCardHTML(s, blockKey, prefix)}</div>
  </div>`;
}

function closeSpeakerModalInlineSessions() {
  const modalBody = document.getElementById("spModalBody");
  if (!modalBody) return;

  modalBody.querySelectorAll(".speakerModalSessionInline").forEach(el => {
    const prevBtn = el.previousElementSibling;
    if (prevBtn) prevBtn.setAttribute("aria-expanded", "false");
    el.remove();
  });
}

function toggleSpeakerModalInlineSession(blockKey, code, triggerEl) {
  const modalBody = document.getElementById("spModalBody");
  if (!modalBody) return;

  const existing = triggerEl && triggerEl.nextElementSibling &&
    triggerEl.nextElementSibling.classList.contains("speakerModalSessionInline") &&
    triggerEl.nextElementSibling.dataset.code === String(code)
      ? triggerEl.nextElementSibling
      : null;

  if (existing) {
    existing.remove();
    triggerEl.setAttribute("aria-expanded", "false");
    positionModalOverlay(modalAnchorEl);
    requestParentMetrics();
    queueWidgetHeightPost();
    return;
  }

  closeSpeakerModalInlineSessions();

  if (triggerEl) {
    triggerEl.insertAdjacentHTML("afterend", getSpeakerModalSessionInlineHTML(blockKey, code));
    triggerEl.setAttribute("aria-expanded", "true");
  } else {
    modalBody.insertAdjacentHTML("beforeend", getSpeakerModalSessionInlineHTML(blockKey, code));
  }

  const inlinePanel = triggerEl
    ? triggerEl.nextElementSibling
    : modalBody.querySelector(".speakerModalSessionInline:last-child");

  window.requestAnimationFrame(() => {
    if (inlinePanel && inlinePanel.scrollIntoView) {
      inlinePanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    positionModalOverlay(modalAnchorEl);
    requestParentMetrics();
    queueWidgetHeightPost();
  });
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
    // Re-highlight the active tab and restore the Institutes note if applicable
    setActiveTab(activeTabId);
  }
  queueWidgetHeightPost();
}

function navigateToSession(blockKey, sessionCode) {
  closeSpeakerModal();
  // Find which tab owns this block in the current (timezone-dependent) tab set
  const targetTab = tabIdForBlockKey(blockKey);
  if (!targetTab) return;

  // Switch out of speaker view
  if (inSpeakerView) toggleSpeakerView();

  // Switch to correct day tab
  setActiveTab(targetTab);

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

      // When coming from a session card or search, the parent-page viewport
      // metrics can still describe the old agenda position (or be missing
      // entirely). Anchor the modal to the newly revealed speaker card instead,
      // matching the behavior of clicking a speaker directly inside speaker view.
      openSpeakerModal(slug, card);
      return;
    }
    // Fallback for unexpected missing cards: use parent metrics if available.
    openSpeakerModal(slug);
  });
  queueWidgetHeightPost();
}

// Jump to a speaker's tile in the speaker view and highlight it (no modal).
function navigateToSpeakerTile(name) {
  if (!inSpeakerView) toggleSpeakerView();
  const slug = speakerSlug(name);
  requestAnimationFrame(() => {
    const card = document.getElementById("sp-" + slug);
    if (card) {
      card.scrollIntoView({ behavior: "smooth", block: "center" });
      card.classList.remove("highlighted");
      void card.offsetWidth;
      card.classList.add("highlighted");
      setTimeout(() => card.classList.remove("highlighted"), 2800);
    }
    queueWidgetHeightPost();
  });
}

// ─── SEARCH ───────────────────────────────────────────────────────────────────
// A global typeahead popup over all sessions and speakers. Selecting a result
// jumps to that session; selecting a speaker shows more info inside search.
let _searchIndex = null;

function getSearchIndex() {
  if (_searchIndex) return _searchIndex;
  const items = [];
  if (typeof sessionMap !== "undefined") {
    for (const code in sessionMap) {
      const s = sessionMap[code];
      const spk = (s.speakers || []).map(sp => [sp.name, sp.title, sp.org].filter(Boolean).join(" ")).join(" · ");
      const hay = [s.name, s.theme, (s.tags || []).join(" "), s.description, getSessionLabel(s.type), spk]
        .filter(Boolean).join("  ").toLowerCase();
      items.push({
        kind: "session", code: s.code, blockKey: s.blockKey, name: s.name,
        type: s.type, theme: s.theme, speakers: (s.speakers || []).map(x => x.name), hay
      });
    }
  }
  for (const sp of buildSpeakerIndex()) {
    const hay = [sp.name, sp.title, sp.org, sp.bio].filter(Boolean).join("  ").toLowerCase();
    items.push({
      kind: "speaker", name: sp.name, title: sp.title, org: sp.org, bio: sp.bio, photo: sp.photo, sessions: sp.sessions || [], sessionCount: (sp.sessions || []).length, hay
    });
  }
  _searchIndex = items;
  return items;
}

function searchDateTimeLabel(blockKey) {
  const info = blockTimeMap[blockKey];
  if (!info) return "";
  const startUtc = easternToUtc(info[0], info[1]);
  const endUtc   = easternToUtc(info[0], info[3]);
  // Date prefix reflects the local start date in the selected timezone, matching
  // the day tab the session now lives on.
  const localDate = getLocalDateString(startUtc, timezoneSelect.value);
  return formatTabDate(localDate) + " · " + buildTimeLabel(startUtc, endUtc, timezoneSelect.value);
}

function runSearch(query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const tokens = q.split(/\s+/).filter(Boolean);
  const scored = [];
  for (const it of getSearchIndex()) {
    if (!tokens.every(t => it.hay.includes(t))) continue;
    const nameLc = it.name.toLowerCase();
    let score = 0;
    if (nameLc === q) score += 100;
    if (nameLc.startsWith(q)) score += 50;
    if (nameLc.includes(q)) score += 25;
    score += tokens.filter(t => nameLc.includes(t)).length * 5;
    if (it.kind === "session") score += 1; // tiny tie-break favoring sessions
    scored.push({ it, score });
  }
  scored.sort((a, b) => b.score - a.score || a.it.name.localeCompare(b.it.name));
  return scored.slice(0, 30).map(r => r.it);
}

function highlightSearch(text, tokens) {
  const raw = String(text || "");
  if (!tokens || !tokens.length) return esc(raw);
  const pattern = tokens.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).filter(Boolean).join("|");
  if (!pattern) return esc(raw);

  let re;
  try { re = new RegExp(pattern, "gi"); } catch (e) { return esc(raw); }

  // Match on the RAW string and escape each slice independently, so a token can
  // never land inside an HTML entity (e.g. the "&"/"amp" of "&amp;") and split
  // it — which made ampersands render literally as "&amp;".
  let out = "", last = 0, m;
  while ((m = re.exec(raw)) !== null) {
    out += esc(raw.slice(last, m.index));
    out += `<mark class="searchHl">${esc(m[0])}</mark>`;
    last = m.index + m[0].length;
    if (m.index === re.lastIndex) re.lastIndex++; // guard against zero-width matches
  }
  out += esc(raw.slice(last));
  return out;
}

function renderSearchResults() {
  const input   = document.getElementById("searchInput");
  const results = document.getElementById("searchResults");
  if (!input || !results) return;
  const query = input.value;
  const tokens = query.trim().toLowerCase().split(/\s+/).filter(Boolean);

  if (!tokens.length) {
    results.innerHTML = `<div class="searchHint">Search by session title, topic, theme, or speaker —<br>across all three days and the speaker directory.</div>`;
    return;
  }

  const matches = runSearch(query);
  if (!matches.length) {
    results.innerHTML = `<div class="searchEmpty">No matches for “${esc(query.trim())}”.</div>`;
    return;
  }

  const rows = matches.map(it => {
    if (it.kind === "session") {
      const typeLabel = getSessionLabel(it.type);
      const metaBits = [searchDateTimeLabel(it.blockKey), typeLabel, it.theme].filter(Boolean).join(" · ");
      const spk = it.speakers && it.speakers.length ? it.speakers.join(", ") : "";
      return `<button class="searchResult" data-kind="session" data-block="${esc(it.blockKey)}" data-code="${esc(it.code)}" aria-expanded="false">
        <span class="srKind srKind--session">Session</span>
        <span class="srMain">
          <span class="srTitle">${highlightSearch(it.name, tokens)}</span>
          <span class="srMeta">${esc(metaBits)}</span>
          ${spk ? `<span class="srSub">${highlightSearch(spk, tokens)}</span>` : ""}
        </span>
      </button>`;
    }
    const initials = esc(it.name.split(/\s+/).map(w => w[0]).slice(0, 2).join("").toUpperCase());
    const avatar = it.photo
      ? `<span class="srAvatar"><img src="${esc(it.photo)}" alt=""></span>`
      : `<span class="srAvatar">${initials}</span>`;
    const meta = [it.title, it.org].filter(Boolean).join(" · ");
    const sub  = it.sessionCount ? `${it.sessionCount} session${it.sessionCount > 1 ? "s" : ""}` : "";
    const speakerLabel = (it.sessions || []).some(s => String(s.type || "").toLowerCase() === "keynote") ? "Keynoter" : "Speaker";
    return `<button class="searchResult" data-kind="speaker" data-name="${esc(it.name)}">
      ${avatar}
      <span class="srMain">
         <span class="srTitle">${highlightSearch(it.name, tokens)}<span class="srKind srKind--speaker">${speakerLabel}</span></span>
        ${meta ? `<span class="srMeta">${highlightSearch(meta, tokens)}</span>` : ""}
        ${sub ? `<span class="srSub">${sub}</span>` : ""}
      </span>
    </button>`;
  }).join("");

  results.innerHTML = `<div class="searchCount">${matches.length} result${matches.length > 1 ? "s" : ""}</div>${rows}`;
}

const SEARCH_MODAL_TOP_OFFSET = 76;
const SEARCH_MODAL_BOTTOM_PAD = 28;

function getSearchViewportHeight() {
  return (hasParentMetrics && parentViewportH)
    ? parentViewportH
    : (window.parent === window ? window.innerHeight : 640);
}

function getSearchViewportTop() {
  if (hasParentMetrics) return parentScrollTop || 0;
  if (window.parent === window) return window.scrollY || 0;
  return 0;
}

function positionSearchOverlay(options) {
  options = options || {};

  const overlay = document.getElementById("searchOverlay");
  if (!overlay || overlay.style.display !== "block") return;

  const modal = overlay.querySelector(".searchModal");
  if (!modal) return;

  // In the Cvent iframe, wait for fresh parent metrics when possible.
  // This prevents the first stale positioning pass from showing in a wrong place.
  const needsParentMetrics = window.parent !== window;
  if (needsParentMetrics && !hasParentMetrics && !options.allowFallback) return;

  const vh = getSearchViewportHeight();
  const viewTop = getSearchViewportTop();

  // One rule for every state: visible viewport top + fixed offset.
  // Does not depend on active tab, speaker view, expanded blocks, content height,
  // or the Search button's position.
  const top = viewTop + SEARCH_MODAL_TOP_OFFSET;
  const maxHeight = Math.max(240, vh - SEARCH_MODAL_TOP_OFFSET - SEARCH_MODAL_BOTTOM_PAD);

  modal.style.top = top + "px";
  modal.style.maxHeight = maxHeight + "px";
  modal.style.visibility = "visible";

  overlay.style.height = Math.max(
    getDocumentHeight(),
    top + maxHeight + 90,
    viewTop + vh + 90
  ) + "px";
}
function resetTimeFilterForSearch() {
  if (!showFiltered) return;

  showFiltered = false;

  const filterBtn = document.getElementById("timeFilterBtn");
  if (filterBtn) {
    filterBtn.classList.remove("active");
    filterBtn.textContent = "Show daytime & evening hours";
  }

  if (!inSpeakerView) {
    if (activeTabId) render(activeTabId);
  }
}
function openSearch(ev) {
  resetTimeFilterForSearch();

  const overlay = document.getElementById("searchOverlay");
  const input   = document.getElementById("searchInput");
  if (!overlay || !input) return;

  searchOverlayAnchorEl = null;

  overlay.style.display = "block";

  const modal = overlay.querySelector(".searchModal");
  if (modal) modal.style.visibility = "hidden";

  renderSearchResults();

  const showAndFocus = () => {
    positionSearchOverlay({ allowFallback: true });
    input.focus();
    input.select();
  };

  if (window.parent !== window) {
    requestParentMetrics(showAndFocus);

    // Fallback if the embed does not respond quickly.
    setTimeout(() => {
      if (!modal || modal.style.visibility !== "visible") showAndFocus();
    }, 120);
  } else {
    showAndFocus();
  }
}
function closeSearch() {
  const overlay = document.getElementById("searchOverlay");
  if (!overlay) return;
  overlay.style.display = "none";
  const input = document.getElementById("searchInput");
  if (input) input.value = "";
  renderSearchResults();
}

function selectSearchSession(blockKey, code, triggerEl) {
  if (isMobileView()) {
    toggleSearchInlineSession(blockKey, code, triggerEl);
    return;
  }
  closeSearch();
  navigateToSession(blockKey, code);
}

function getSearchSessionInlineHTML(blockKey, code) {
  const s = sessionMap[code];
  if (!s) {
    return `<div class="searchSessionInline"><div class="searchEmpty">Session details could not be found.</div></div>`;
  }

  const prefix = "search-" + String(code).replace(/[^a-zA-Z0-9_-]/g, "-") + "-";

  return `<div class="searchSessionInline" data-code="${esc(code)}" data-block="${esc(blockKey)}">
    <div class="sessionOverview">${buildSessionCardHTML(s, blockKey, prefix)}</div>
  </div>`;
}

function closeSearchInlineSessions() {
  document.querySelectorAll(".searchSessionInline").forEach(el => {
    const prevBtn = el.previousElementSibling;
    if (prevBtn) prevBtn.setAttribute("aria-expanded", "false");
    el.remove();
  });
}

function toggleSearchInlineSession(blockKey, code, triggerEl) {
  if (!triggerEl) return;

  const existing = triggerEl.nextElementSibling;
  if (existing && existing.classList.contains("searchSessionInline") && existing.dataset.code === String(code)) {
    existing.remove();
    triggerEl.setAttribute("aria-expanded", "false");
    positionSearchOverlay();
    queueWidgetHeightPost();
    return;
  }

  closeSearchInlineSessions();
  triggerEl.insertAdjacentHTML("afterend", getSearchSessionInlineHTML(blockKey, code));
  triggerEl.setAttribute("aria-expanded", "true");
  positionSearchOverlay();
  queueWidgetHeightPost();
}

function toggleSearchSpeakerSession(ev, btn, blockKey, code) {
  if (ev) { ev.preventDefault(); ev.stopPropagation(); }

  if (isMobileView()) {
    toggleSearchInlineSession(blockKey, code, btn);
    return;
  }

  closeSearch();
  navigateToSession(blockKey, code);
}

function renderSearchSpeakerDetails(name) {
  const results = document.getElementById("searchResults");
  if (!results) return;

  const sp = getSpeakerDetailsByName(name);
  if (!sp) {
    results.innerHTML = `<div class="searchEmpty">Speaker details could not be found.</div>`;
    return;
  }

  const initials = esc(sp.name.split(/\s+/).map(w => w[0]).slice(0, 2).join("").toUpperCase());
  const avatar = sp.photo
    ? `<img class="searchSpeakerPhoto" src="${esc(sp.photo)}" alt="${esc(sp.name)}">`
    : `<div class="searchSpeakerInitials">${initials}</div>`;

  const sessionRows = (sp.sessions || []).map(sess => {
    const s = sessionMap[sess.code];
    const meta = [
      searchDateTimeLabel(sess.blockKey),
      s ? getSessionLabel(s.type) : ""
    ].filter(Boolean).join(" · ");

    return `<button type="button" class="searchSpeakerSession" onclick="toggleSearchSpeakerSession(event,this,'${esc(sess.blockKey)}','${esc(sess.code)}')" aria-expanded="false">
      <div class="searchSpeakerSessionName">${esc(sess.name)}</div>
      ${meta ? `<div class="searchSpeakerSessionMeta">${esc(meta)}</div>` : ""}
    </button>`;
  }).join("");

  results.innerHTML = `
    <div class="searchSpeakerDetail">
      <button type="button" class="searchBackBtn" onclick="renderSearchResults()">← Back to results</button>
      <div class="searchSpeakerHeader">
        ${avatar}
        <div>
          <div class="searchSpeakerName">${esc(sp.name)}</div>
          ${sp.title ? `<div class="searchSpeakerTitle">${esc(sp.title)}</div>` : ""}
          ${sp.org ? `<div class="searchSpeakerOrg">${esc(sp.org)}</div>` : ""}
        </div>
      </div>
      ${sp.bio ? `<p class="searchSpeakerBio">${esc(sp.bio)}</p>` : `<p class="searchSpeakerBio searchSpeakerBioEmpty">More speaker information coming soon.</p>`}
      ${sessionRows ? `<div class="searchSpeakerSessionsLabel">Sessions</div>${sessionRows}` : ""}
    </div>
  `;

  positionSearchOverlay();
  queueWidgetHeightPost();
}

function selectSearchSpeaker(name) {
  renderSearchSpeakerDetails(name);
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
  if (ev) { ev.preventDefault(); ev.stopPropagation(); }
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
  if (ev) { ev.preventDefault(); ev.stopPropagation(); }
  if (isSpeakerTooltipPinned(chip)) return;
  resetSessionSpeakerTooltip(chip);
  if (activeSpeakerTooltipChip === chip) activeSpeakerTooltipChip = null;
  queueWidgetHeightPost();
}

function toggleSpeakerTooltipPin(ev, chip) {
  if (ev) { ev.preventDefault(); ev.stopPropagation(); }
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
  if (ev) { ev.preventDefault(); ev.stopPropagation(); }
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
const TBD_BLOCKS = {
  "2026-10-07|12:00": true,
  "2026-10-08|15:00": true
};

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

// Builds one session card. idPrefix keeps the description element id unique when
// the same card is rendered outside the agenda grid (e.g. the mobile session
// overview popup), so the "View full details" toggle targets the right copy.
function buildSessionCardHTML(s, blockKey, idPrefix) {
  idPrefix = idPrefix || "";
  const descId = `${idPrefix}desc-${esc(s.code)}`;
  const calLinks = buildCalUrls(s, blockKey);
  const shareBtnHtml = `<button class="linkedin-btn" onclick="event.stopPropagation();shareLinkedIn('${esc(s.code)}', this)" title="Share on LinkedIn">${SVG_LINKEDIN}Share</button>`;
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
                    ${buildSessionActualTimeHtml(s, blockKey)}
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
}

function buildSessionsHTML(blockKey) {
  const sessions = (typeof sessionsByBlock !== "undefined" && sessionsByBlock[blockKey]) || [];
  if (!sessions.length) return "";

  return `<div class="sessionPanel" hidden>
    <div class="sessionGrid">
      ${sessions.map(s => buildSessionCardHTML(s, blockKey)).join("")}
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


let linkedInOverlayAnchorEl = null;

function positionLinkedInOverlay(anchorEl) {
  const overlay = document.querySelector(".li-modal-overlay");
  if (!overlay) return;

  const modal = overlay.querySelector(".li-modal");
  if (!modal) return;

  const docH = getDocumentHeight();
  overlay.style.height = docH + "px";

  const vh = (hasParentMetrics && parentViewportH)
    ? parentViewportH
    : (window.parent === window ? window.innerHeight : 640);

  modal.style.maxHeight = Math.max(240, vh - 40) + "px";

  // Anchor to the clicked Share button first.
  // Parent viewport metrics are only used to keep it visible, not to recenter it far away.
  const effectiveAnchor = anchorEl || linkedInOverlayAnchorEl;

  if (effectiveAnchor) {
    const r = effectiveAnchor.getBoundingClientRect();
    const modalW = modal.offsetWidth || Math.min(480, window.innerWidth * 0.92);
    const modalH = modal.offsetHeight || 360;

    const visibleTop = hasParentMetrics ? parentScrollTop : 0;
    const visibleBottom = hasParentMetrics ? parentScrollTop + vh : docH;

    let top = r.bottom + 12;

    // If opening below the Share button would run off the visible screen, open above it.
    if (top + modalH > visibleBottom - 12) {
      top = r.top - modalH - 12;
    }

    // If above would be too high, clamp inside the visible part of the iframe.
    if (top < visibleTop + 12) {
      top = visibleTop + 12;
    }

    let left = r.left + r.width / 2;
    const minLeft = modalW / 2 + 12;
    const maxLeft = Math.max(minLeft, window.innerWidth - modalW / 2 - 12);
    left = Math.min(Math.max(left, minLeft), maxLeft);

    modal.style.left = left + "px";
    modal.style.top = top + "px";
    modal.style.transform = "translateX(-50%)";
  } else {
    const top = (hasParentMetrics ? parentScrollTop : window.scrollY) + vh / 2;
    modal.style.left = "50%";
    modal.style.top = top + "px";
    modal.style.transform = "translate(-50%, -50%)";
  }

  if (anchorEl) linkedInOverlayAnchorEl = anchorEl;
}

// ─── LINKEDIN SHARE ───────────────────────────────────────────────────────────
// Opens a modal with an editable, pre-written LinkedIn post for the session.
// LinkedIn's public share URL can't pre-fill post body text, so we let the user
// copy the text and open LinkedIn's composer with the event URL attached.
function shareLinkedIn(code, triggerEl) {
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
  linkedInOverlayAnchorEl = triggerEl || null;
  positionLinkedInOverlay(triggerEl || null);
  requestParentMetrics(positionLinkedInOverlay);

  const ta       = overlay.querySelector("#li-post-text");
  const copyBtn  = overlay.querySelector("#li-copy-btn");
  const openBtn  = overlay.querySelector("#li-open-btn");
  const closeBtn = overlay.querySelector("#li-close-btn");
  ta.value = post; // set via value (not innerHTML) so special chars are safe

  const doClose = () => { try { document.body.removeChild(overlay); } catch (e) {} linkedInOverlayAnchorEl = null; document.removeEventListener("keydown", onKey); };
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


// Hosted cover page (letter, 612×792pt). It becomes page 1 of the export, with
// the timezone note drawn on top in Montserrat, white, anchored bottom-right.
const PDF_COVER_URL = "https://custom.cvent.com/AE944F71438646268B70FF5BF3772347/files/event/e7d15afcf2b14901ab0272ce8a401899/91a9cf22b19c4793b69e31d85d32eeca.pdf";
const PDF_COVER_TZ_SIZE   = 12;             // font size in pt
const PDF_COVER_TZ_RGB    = [1, 1, 1];      // white
const PDF_COVER_TZ_MARGIN = { right: 48, bottom: 44 }; // pt from the bottom-right corner
const PDFLIB_SRC     = "https://cdnjs.cloudflare.com/ajax/libs/pdf-lib/1.17.1/pdf-lib.min.js";
const FONTKIT_SRC    = "https://cdn.jsdelivr.net/npm/@pdf-lib/fontkit@1.1.1/dist/fontkit.umd.min.js";
const MONTSERRAT_TTF = "https://cdn.jsdelivr.net/gh/JulietaUla/Montserrat/fonts/ttf/Montserrat-Regular.ttf";
const HTML2CANVAS_SRC = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";

const PDF_TYPE_LABEL = {
  workshop: "Workshop",
  strategy: "Strategy Session",
  creative: "Creative Space",
  keynote:  "Keynote",
  skill:    "Skill Building Institute",
  intl:     "International Exchange"
};

// Small square icon per theme, shown inline to the right of the theme label.
const PDF_THEME_CDN = "https://custom.cvent.com/AE944F71438646268B70FF5BF3772347/files/event/e7d15afcf2b14901ab0272ce8a401899/";
const PDF_THEME_ICON = {
  "Reimagining Child, Youth, and Family Well-Being":    PDF_THEME_CDN + "26ec9f049f4b409caee019522f91cd11.png",
  "Truth, Justice, and Healing Systems":                PDF_THEME_CDN + "13f67dfc298e405d9130b2afc9e19528.png",
  "Communities as Catalysts for Well-Being":            PDF_THEME_CDN + "abd0baa32e3e4a778a05dfcb896e591b.png",
  "Rights, Advocacy, and Family Power":                 PDF_THEME_CDN + "af3c92ab14fa476aa7e3e6560adad717.png",
  "Systems Innovation and the Architecture of Change":  PDF_THEME_CDN + "4e78e990be124081814b75abe40816ae.png",
  "Inner Restoration and Reflective Leadership":        PDF_THEME_CDN + "bc146420b48f4e1099723e10643fbee8.png",
  "The Future Workforce: Thriving, Connected, Equipped": PDF_THEME_CDN + "227efe329cd048bd98252795c4471757.png"
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

function pdfSpeakersHTML(speakers, withPhotos) {
  const list = (speakers || []).filter(sp => (sp.name || "").trim());
  if (!list.length) return "";

  // Skill institutes: circular headshot to the left of each speaker.
  if (withPhotos) {
    const rows = list.map(sp => {
      const meta = [sp.title, sp.org].map(x => (x || "").trim()).filter(Boolean).join(", ");
      const initials = pdfEsc((sp.name || "?").split(/\s+/).map(w => w[0]).slice(0, 2).join("").toUpperCase());
      const avatar = sp.photo
        ? `<img class="aSpkPhoto" src="${sp.photo}" crossorigin="anonymous" alt="">`
        : `<span class="aSpkInitials">${initials}</span>`;
      return `<div class="aSpkRow">${avatar}<div class="aSpkText"><span class="aSpkName">${pdfEsc(sp.name)}</span>${meta ? `<span class="aSpkMeta">${pdfEsc(meta)}</span>` : ""}</div></div>`;
    }).join("");
    return `<div class="aSpk aSpk--photos">${rows}</div>`;
  }

  const lines = list.map(sp => {
    const parts = [sp.name, sp.title, sp.org].map(x => (x || "").trim()).filter(Boolean);
    return `<div class="aSpkLine">${pdfEsc(parts.join(", "))}</div>`;
  });
  return `<div class="aSpk">${lines.join("")}</div>`;
}

function buildAgendaPdfDoc(selectedZone) {
  const tzAbbr = getTzAbbreviation(selectedZone);
  const tzNote = tzAbbr ? `All times shown in ${tzAbbr}` : "Times shown in your selected time zone";
  const generated = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  // Mirror the on-screen tabs: Institutes on one section (date range), and the
  // Global Gathering split into one section per local date in the selected zone.
  const longDate = d => new Date(d + "T12:00:00")
    .toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });

  const daysHtml = computeTabs(selectedZone).map(tab => {
    const meta = tab.kind === "institute"
      ? { label: "Skill Building Institutes" }
      : { label: "The Global Gathering" };
    const dates = [...new Set(tab.blocks.map(b =>
      getLocalDateString(easternToUtc(b[0], b[1]), selectedZone)))].sort();
    const dateLabel = dates.map(longDate).join("  /  ");
    // When the Institutes section spans two local dates, prefix each row's time
    // with its date so it's clear which day each block belongs to.
    const showDate = tab.kind === "institute" && dates.length > 1;

    const rows = [];
    tab.blocks.forEach(([sd, st, ed, et, types]) => {
      const blockKey = `${sd}|${st}`;
      const sessions = (typeof sessionsByBlock !== "undefined" && sessionsByBlock[blockKey]) || [];

      if (isTbdBlock(blockKey)) {
        const startUtc = easternToUtc(sd, st), endUtc = easternToUtc(ed, et);
        const timeLabel = buildTimeLabel(startUtc, endUtc, selectedZone, showDate);
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
        const timeLabel = buildTimeLabel(startUtc, endUtc, selectedZone, showDate);
        const themeIcon = PDF_THEME_ICON[(s.theme || "").trim()];
        const themeHtml = s.theme
          ? `<div class="aTheme"><span>${pdfEsc(s.theme)}</span>${themeIcon ? `<img class="aThemeIcon" src="${themeIcon}" crossorigin="anonymous" alt="">` : ""}</div>`
          : "";
        const descHtml  = s.description ? `<p class="aDesc">${pdfEsc(s.description)}</p>` : "";
        rows.push(`<article class="aRow">
          <div class="aTime">${pdfEsc(timeLabel)}${tzAbbr ? `<div class="aTz">${tzAbbr}</div>` : ""}</div>
          <div class="aMain">
            <div class="aHead"><h3>${pdfEsc(s.name)}</h3>${pdfTypePill(sType)}</div>
            ${themeHtml}
            ${pdfSpeakersHTML(s.speakers, sType === "skill")}
            ${descHtml}
          </div>
        </article>`);
      });
    });

    // The Institutes label links out to the info page; the clickable annotation
    // is added after rasterization (see mergeCoverAndAgenda).
    const labelHtml = tab.kind === "institute"
      ? `<span id="aSkillLink" class="aDayLink">${pdfEsc(meta.label)}<span class="aDayLinkIcon">&#8599;</span></span>`
      : `<span>${pdfEsc(meta.label)}</span>`;

    return `<section class="aDay">
      <div class="aDayHeader"><h2>${pdfEsc(dateLabel)}</h2>${labelHtml}</div>
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
  .aDayLink{text-decoration:underline;}
  .aDayLinkIcon{font-size:9px;margin-left:2px;text-decoration:none;display:inline-block;}
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
  .aTheme{color:#7c4dbd;font-size:8.5px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;margin:0 0 5px;display:inline-flex;align-items:center;gap:6px;}
  .aThemeIcon{width:14px;height:14px;border-radius:3px;object-fit:cover;display:inline-block;flex:0 0 14px;}
  .aSpk{margin:0 0 6px;color:#187089;font-size:9.5px;line-height:1.4;font-weight:700;}
  .aSpkLine{margin:0 0 2px;}
  .aSpkLine:last-child{margin-bottom:0;}
  .aSpk--photos{display:flex;flex-direction:column;gap:6px;}
  .aSpkRow{display:flex;align-items:center;gap:8px;}
  .aSpkPhoto{width:26px;height:26px;border-radius:50%;object-fit:cover;flex:0 0 26px;border:1.5px solid #e8eaed;}
  .aSpkInitials{width:26px;height:26px;border-radius:50%;flex:0 0 26px;background:#e8eaed;color:#7a8699;font-size:9px;font-weight:800;display:flex;align-items:center;justify-content:center;}
  .aSpkText{display:flex;flex-direction:column;line-height:1.32;}
  .aSpkName{color:#122345;font-weight:800;}
  .aSpkMeta{color:#187089;font-weight:600;}
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

    let linkRect = null;
    Promise.all(imgReady)
      .then(() => new Promise(r => setTimeout(r, 400)))
      .then(() => {
        // Measure the "Skill Building Institutes" link in HTML px (the iframe never
        // scrolls, so getBoundingClientRect is the document position) before raster.
        const el = iDoc.getElementById("aSkillLink");
        if (el) {
          const r = el.getBoundingClientRect();
          linkRect = { left: r.left, top: r.top, width: r.width, height: r.height };
        }
        return new Promise((res, rej) => {
          const sc = iDoc.createElement("script");
          sc.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
          sc.onload = res; sc.onerror = rej;
          iDoc.head.appendChild(sc);
        });
      })
      .then(() => iframe.contentWindow.html2pdf().set({
        margin: 0,
        image: { type: "jpeg", quality: 0.92 },
        html2canvas: { scale: 2, useCORS: true, backgroundColor: "#ffffff", width: 816, windowWidth: 816 },
        jsPDF: { unit: "pt", format: [612, 792], orientation: "portrait", compress: true },
        pagebreak: { mode: ["legacy"], avoid: [".aRow", ".aDayHeader"] }
      }).from(iDoc.body).outputPdf("arraybuffer"))
      // The buffer is created in the iframe's realm; copy it into the main realm
      // BEFORE the iframe is removed, or it becomes detached during the merge.
      .then(buf => { const copy = new Uint8Array(buf).slice(); cleanup(); resolve({ bytes: copy, linkRect }); })
      .catch(err => { cleanup(); reject(err); });
  });
}

// Prepend the hosted cover (with the timezone note drawn on it) to the agenda
// pages and return the merged PDF bytes.
const PDF_SKILL_LINK_URL = "https://cvent.me/Xmd3Oo";

async function mergeCoverAndAgenda(agendaBytes, tzNote, linkRect) {
  await Promise.all([loadScriptOnce(PDFLIB_SRC), loadScriptOnce(FONTKIT_SRC)]);
  const [coverResp, fontResp] = await Promise.all([fetch(PDF_COVER_URL), fetch(MONTSERRAT_TTF)]);
  if (!coverResp.ok) throw new Error("Cover fetch failed: " + coverResp.status);
  const coverBytes = await coverResp.arrayBuffer();
  const fontBytes  = await fontResp.arrayBuffer();

  const { PDFDocument, PDFName, PDFString, rgb } = window.PDFLib;
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

  // Make the day-1 "Skill Building Institutes" label a clickable link. The agenda
  // is rasterized (no live links), so add a Link annotation at the measured spot.
  if (linkRect && linkRect.width) {
    const SCALE = 612 / 816;            // html px → pt (content 816px → 612pt page)
    const PAGE_H_PX = 792 / SCALE;      // one page = 1056 html px tall
    const pageIdx = Math.max(0, Math.floor(linkRect.top / PAGE_H_PX));
    const yInPage = linkRect.top - pageIdx * PAGE_H_PX;
    const x1 = linkRect.left * SCALE;
    const x2 = (linkRect.left + linkRect.width) * SCALE;
    const yTopPt = yInPage * SCALE;
    const hPt = linkRect.height * SCALE;
    const target = coverDoc.getPage(pageIdx + 1); // +1 for the cover page
    if (target) {
      const ph = target.getSize().height;
      const ctx = coverDoc.context;
      const annot = ctx.obj({
        Type: "Annot", Subtype: "Link",
        Rect: [x1, ph - yTopPt - hPt, x2, ph - yTopPt],
        Border: [0, 0, 0],
        A: ctx.obj({ Type: "Action", S: "URI", URI: PDFString.of(PDF_SKILL_LINK_URL) })
      });
      const ref = ctx.register(annot);
      const existing = target.node.Annots();
      if (existing) existing.push(ref);
      else target.node.set(PDFName.of("Annots"), ctx.obj([ref]));
    }
  }

  return coverDoc.save();
}

// ─── MOBILE PDF PATH ──────────────────────────────────────────────────────────
// On phones/tablets the agenda (≈20 letter pages) is too tall to rasterize as
// the single canvas html2pdf builds: at scale 2 it is ~1632×40000px, which blows
// past iOS Safari's ~16.7-megapixel canvas-area cap and Android Chrome's
// ~16384px max dimension, so the canvas comes back blank → blank PDF pages.
// Instead we rasterize one canvas PER PAGE (each ≈1632×2112px, safely small) at
// full scale, then assemble cover + pages with pdf-lib.

// Touch / small-viewport devices where the giant single canvas fails. Desktop
// (no coarse pointer, wider than a tablet) keeps the original html2pdf path.
function isCanvasConstrained() {
  return !!(window.matchMedia && (
    window.matchMedia("(max-width: 820px)").matches ||
    window.matchMedia("(pointer: coarse)").matches
  ));
}

function buildMobileAgendaPdfBytes(selectedZone, tzNote, onProgress) {
  const report = (done, total) => { try { onProgress && onProgress(done, total); } catch (e) {} };
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
      .then(() => {
        let linkRect = null;
        const el = iDoc.getElementById("aSkillLink");
        if (el) {
          const r = el.getBoundingClientRect();
          linkRect = { left: r.left, top: r.top, width: r.width, height: r.height };
        }
        return new Promise((res, rej) => {
          const sc = iDoc.createElement("script");
          sc.src = HTML2CANVAS_SRC;
          sc.onload = () => res(linkRect);
          sc.onerror = rej;
          iDoc.head.appendChild(sc);
        });
      })
      .then(async (linkRect) => {
        const h2c = iframe.contentWindow.html2canvas;
        const W = 816, SCALE = 1.5;                      // ≈144 DPI; keeps chunks small
        const PX_PER_PT = W / 612;                       // 1.3333 px per pt
        const PAGE_H_PX = Math.round(792 * PX_PER_PT);   // 1056px content per page
        const totalH = Math.max(iDoc.body.scrollHeight, iDoc.documentElement.scrollHeight);

        // 1) Page breaks at row / header boundaries (never split a row).
        const bodyTop = iDoc.body.getBoundingClientRect().top;
        const units = Array.from(iDoc.querySelectorAll(".aDayHeader, .aRow, .aFooter"))
          .map(elm => {
            const r = elm.getBoundingClientRect();
            return { top: r.top - bodyTop, bottom: r.bottom - bodyTop };
          })
          .sort((a, b) => a.top - b.top);
        const pageTops = [0];
        for (const u of units) {
          const start = pageTops[pageTops.length - 1];
          if (u.bottom - start > PAGE_H_PX && u.top > start) pageTops.push(u.top);
        }
        const pages = pageTops.map((top, i) => ({
          top,
          height: (i + 1 < pageTops.length ? pageTops[i + 1] : totalH) - top
        }));

        // 2) Render in chunks that each stay within mobile canvas limits, then
        //    slice each chunk into its page images locally (cheap canvas copy).
        //    At scale 1.5 a 8000px-tall chunk is ≈1224×12000px ≈ 14.7MP — under
        //    iOS's ~16.7MP area cap and Android's ~16384px dimension cap.
        const MAX_CHUNK_PX = 8000;
        const pageImages = [];
        let i = 0;
        while (i < pages.length) {
          const chunkTop = pages[i].top;
          let j = i + 1;
          while (j < pages.length &&
                 (pages[j].top + pages[j].height - chunkTop) <= MAX_CHUNK_PX) j++;
          const chunkBottom = pages[j - 1].top + pages[j - 1].height;
          const chunkCanvas = await h2c(iDoc.body, {
            scale: SCALE, backgroundColor: "#ffffff", useCORS: true, logging: false,
            width: W, height: chunkBottom - chunkTop, x: 0, y: chunkTop,
            windowWidth: W, windowHeight: totalH
          });
          for (let k = i; k < j; k++) {
            const p = pages[k];
            const sy = Math.round((p.top - chunkTop) * SCALE);
            const sh = Math.round(p.height * SCALE);
            const pc = document.createElement("canvas");
            pc.width = Math.round(W * SCALE);
            pc.height = sh;
            pc.getContext("2d").drawImage(chunkCanvas, 0, sy, pc.width, sh, 0, 0, pc.width, sh);
            pageImages.push({ dataURL: pc.toDataURL("image/jpeg", 0.85), heightPx: p.height });
            report(pageImages.length, pages.length);
          }
          i = j;
        }
        cleanup();
        return assembleMobileAgendaPdf(pageImages, pages, tzNote, linkRect);
      })
      .then(resolve)
      .catch(err => { cleanup(); reject(err); });
  });
}

// Builds the final PDF (hosted cover + per-page agenda images) with pdf-lib,
// mirroring mergeCoverAndAgenda's cover note and clickable-skill-link logic.
async function assembleMobileAgendaPdf(pageImages, pages, tzNote, linkRect) {
  await Promise.all([loadScriptOnce(PDFLIB_SRC), loadScriptOnce(FONTKIT_SRC)]);
  const [coverResp, fontResp] = await Promise.all([fetch(PDF_COVER_URL), fetch(MONTSERRAT_TTF)]);
  if (!coverResp.ok) throw new Error("Cover fetch failed: " + coverResp.status);
  const coverBytes = await coverResp.arrayBuffer();
  const fontBytes  = await fontResp.arrayBuffer();

  const { PDFDocument, PDFName, PDFString, rgb } = window.PDFLib;
  const doc = await PDFDocument.load(coverBytes);
  doc.registerFontkit(window.fontkit);

  // Timezone note on the cover, bottom-right (same as the desktop path).
  const font = await doc.embedFont(fontBytes);
  const cover = doc.getPage(0);
  const coverW = cover.getSize().width;
  const noteSize = PDF_COVER_TZ_SIZE;
  const textW = font.widthOfTextAtSize(tzNote, noteSize);
  cover.drawText(tzNote, {
    x: coverW - PDF_COVER_TZ_MARGIN.right - textW,
    y: PDF_COVER_TZ_MARGIN.bottom,
    size: noteSize, font,
    color: rgb(PDF_COVER_TZ_RGB[0], PDF_COVER_TZ_RGB[1], PDF_COVER_TZ_RGB[2])
  });

  const PAGE_W_PT = 612, PAGE_H_PT = 792, SCALE = 612 / 816; // px → pt
  for (const pg of pageImages) {
    const b64 = pg.dataURL.split(",")[1];
    const bytes = Uint8Array.from(atob(b64), c => c.charCodeAt(0));
    const jpg = await doc.embedJpg(bytes);
    const page = doc.addPage([PAGE_W_PT, PAGE_H_PT]);
    const hPt = Math.min(PAGE_H_PT, pg.heightPx * SCALE);
    page.drawImage(jpg, { x: 0, y: PAGE_H_PT - hPt, width: PAGE_W_PT, height: hPt });
  }

  // Clickable "Skill Building Institutes" link on whichever agenda page holds it.
  if (linkRect && linkRect.width) {
    let p = 0;
    for (let idx = 0; idx < pages.length; idx++) {
      if (linkRect.top >= pages[idx].top &&
          linkRect.top < pages[idx].top + pages[idx].height) { p = idx; break; }
    }
    const yInPage = linkRect.top - pages[p].top;
    const x1 = linkRect.left * SCALE;
    const x2 = (linkRect.left + linkRect.width) * SCALE;
    const yTopPt = yInPage * SCALE;
    const hPt = linkRect.height * SCALE;
    const target = doc.getPage(p + 1); // +1 for the cover
    if (target) {
      const ph = target.getSize().height;
      const ctx = doc.context;
      const annot = ctx.obj({
        Type: "Annot", Subtype: "Link",
        Rect: [x1, ph - yTopPt - hPt, x2, ph - yTopPt],
        Border: [0, 0, 0],
        A: ctx.obj({ Type: "Action", S: "URI", URI: PDFString.of(PDF_SKILL_LINK_URL) })
      });
      const ref = ctx.register(annot);
      const existing = target.node.Annots();
      if (existing) existing.push(ref);
      else target.node.set(PDFName.of("Annots"), ctx.obj([ref]));
    }
  }

  return doc.save();
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

  // Mobile/tablet: rasterize page-by-page to dodge the canvas-size limit that
  // otherwise yields blank pages. Desktop: original single-pass html2pdf path.
  const onProgress = (done, total) => {
    if (label) label.textContent = `Preparing PDF… ${Math.round((done / total) * 100)}%`;
  };
  const pdfWork = isCanvasConstrained()
    ? buildMobileAgendaPdfBytes(selectedZone, tzNote, onProgress)
    : renderAgendaPagesBytes(selectedZone)
        .then(({ bytes, linkRect }) => mergeCoverAndAgenda(bytes, tzNote, linkRect));

  pdfWork
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
function render(tabId) {
  const grid         = document.getElementById("agendaGrid");
  const selectedZone = timezoneSelect.value;
  grid.innerHTML     = "";
  openBlockEl        = null;
  allExpanded        = false;
  const toggleBtn = document.getElementById("toggleAllBtn");
  if (toggleBtn) toggleBtn.textContent = "Expand all";

  const tab = currentTabs.find(t => t.id === tabId) || currentTabs[0];
  if (!tab) return;

  const skillNote = document.getElementById("skillNote");
  skillNote.style.display = tab.kind === "institute" ? "" : "none";

  // Only the Institutes tab can hold blocks from two local dates; show the date
  // on each time label when that happens.
  const showDate = tab.kind === "institute" && tabSpansMultipleDates(tab, selectedZone);

  tab.blocks.forEach(([startDate, startTime, endDate, endTime, types]) => {
    const startUtc = easternToUtc(startDate, startTime);
    const endUtc   = easternToUtc(endDate, endTime);

    const category = getTimeCategory(startUtc, endUtc, selectedZone);
    if (showFiltered && category === "neutral") return;

    const evening     = category === "evening";
    const comfortable = category === "daytime";
    const neutral     = category === "neutral";

    const timeLabel = buildTimeLabel(startUtc, endUtc, selectedZone, showDate);
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

// ─── TAB BAR ──────────────────────────────────────────────────────────────────
// Switch to a tab: highlight its button, render it, and (when leaving speaker
// view) restore the agenda layout. Safe to call with a stale/missing id — it
// falls back to the first available tab.
function setActiveTab(tabId) {
  const tab = currentTabs.find(t => t.id === tabId) || currentTabs[0];
  if (!tab) return;
  activeTabId = tab.id;
  document.querySelectorAll(".dayBtn").forEach(b =>
    b.classList.toggle("active", b.dataset.tab === tab.id));

  if (!inSpeakerView) render(tab.id);
}

// (Re)build the tab buttons for the current timezone, preserving the user's
// place where possible: stay on the Institutes tab if that was active, else try
// to keep the same local date, else fall back to the first tab.
function renderTabs() {
  const zone = timezoneSelect.value;
  const prevTab = currentTabs.find(t => t.id === activeTabId);
  currentTabs = computeTabs(zone);

  let nextId = currentTabs[0] && currentTabs[0].id;
  if (prevTab) {
    const match = currentTabs.find(t => t.id === prevTab.id)
      || (prevTab.kind === "institute" && currentTabs.find(t => t.kind === "institute"))
      || currentTabs.find(t => t.date === prevTab.date);
    if (match) nextId = match.id;
  }

  const container = document.getElementById("dayBtns");
  container.innerHTML = currentTabs.map(t =>
    `<button class="dayBtn" data-tab="${t.id}">${t.label}</button>`).join("");
  container.querySelectorAll(".dayBtn").forEach(btn => {
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
      setActiveTab(btn.dataset.tab);
    });
  });

  activeTabId = nextId;
  if (!inSpeakerView) setActiveTab(nextId);
  else document.querySelectorAll(".dayBtn").forEach(b => b.classList.remove("active"));
}

// ─── EVENT LISTENERS ──────────────────────────────────────────────────────────
timezoneSelect.addEventListener("change", () => {
  // The local dates of sessions shift with the zone, so rebuild the whole tab set.
  renderTabs();
});

const filterBtn = document.getElementById("timeFilterBtn");

filterBtn.addEventListener("click", () => {
  showFiltered = !showFiltered;
  filterBtn.classList.toggle("active");
  filterBtn.textContent = showFiltered ? "Showing daytime & evening hours" : "Show daytime & evening hours";
  if (activeTabId) render(activeTabId);
});

let allExpanded = false;

document.getElementById("toggleAllBtn").addEventListener("click", () => {
  allExpanded = !allExpanded;
  document.querySelectorAll(".blockWrap").forEach(bw => togglePanel(bw, allExpanded));
  document.getElementById("toggleAllBtn").textContent = allExpanded ? "Collapse all" : "Expand all";
});

document.getElementById("speakerViewBtn").addEventListener("click", toggleSpeakerView);

document.getElementById("downloadPdfBtn").addEventListener("click", downloadAgendaPDF);

// ─── SEARCH LISTENERS ─────────────────────────────────────────────────────────
document.getElementById("searchOpenBtn").addEventListener("click", ev => openSearch(ev));
document.getElementById("searchInput").addEventListener("input", renderSearchResults);
document.getElementById("searchResults").addEventListener("click", e => {
  const btn = e.target.closest(".searchResult");
  if (!btn) return;
  if (btn.dataset.kind === "session") selectSearchSession(btn.dataset.block, btn.dataset.code, btn);
  else selectSearchSpeaker(btn.dataset.name);
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && document.getElementById("searchOverlay").style.display === "block") {
    closeSearch();
  }
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
async function init() {
  const grid = document.getElementById("agendaGrid");
  if (grid) grid.innerHTML = '<p style="padding:2rem;text-align:center;color:#666;font-family:Montserrat,sans-serif;font-size:0.95rem">Loading agenda…</p>';
  try {
    const res = await fetch(`/api/sessions-by-block?v=${Date.now()}`, { cache: "no-store" });
    if (res.ok) sessionsByBlock = await res.json();
  } catch (e) {
    console.warn("Failed to load session data:", e);
  }
  buildSessionMap();
  renderTabs();
}

init();
