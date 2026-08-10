const fs = require('fs');

function parseCSV(text) {
  const rows = [];
  const lines = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  let row = [];
  let field = '';
  let inQuote = false;
  for (let i = 0; i < lines.length; i++) {
    const ch = lines[i];
    if (inQuote) {
      if (ch === '"') {
        if (lines[i+1] === '"') { field += '"'; i++; }
        else inQuote = false;
      } else { field += ch; }
    } else {
      if (ch === '"') { inQuote = true; }
      else if (ch === ',') { row.push(field); field = ''; }
      else if (ch === '\n') { row.push(field); field = ''; rows.push(row); row = []; }
      else { field += ch; }
    }
  }
  if (field || row.length) { row.push(field); rows.push(row); }
  return rows;
}

// ── File paths: CLI args first, else defaults ────────────────────────────────
//   Usage: node build_sessions.js <sessions.csv> <speakers.csv>
const SESSIONS_CSV = process.argv[2] || 'C:/Users/kuminj/Downloads/6939031d7ebc4950bbe1bf8679588f66.csv';
const SPEAKERS_CSV = process.argv[3] || 'C:/Users/kuminj/OneDrive - The University of Colorado Denver/Documents - CTA conference/2026/Call for Presentations & Scheduling Tool/Last saved/2026-Speaker-Report.csv';

const sessionsRaw = fs.readFileSync(SESSIONS_CSV, 'utf8');
const speakersRaw = fs.readFileSync(SPEAKERS_CSV, 'utf8');
const sessionRows = parseCSV(sessionsRaw);
const speakerRows = parseCSV(speakersRaw);

// ── Header lookup: map columns by NAME, not position ─────────────────────────
// Order-independent. Strips BOM, trims, case-insensitive. Each field is matched
// by trying candidate header names in order, or a regex fallback.
function buildHeaderIndex(headerRow) {
  const map = {};
  headerRow.forEach((h, i) => {
    const key = (h || '').replace(/^﻿/, '').trim().toLowerCase();
    if (key && !(key in map)) map[key] = i; // first occurrence wins (e.g. two "Description" cols)
  });
  return map;
}
// Resolve a column index from candidate names (exact, case-insensitive) or a regex.
function col(headerMap, candidates, regex) {
  for (const c of candidates) {
    const k = c.trim().toLowerCase();
    if (k in headerMap) return headerMap[k];
  }
  if (regex) {
    for (const k of Object.keys(headerMap)) {
      if (regex.test(k)) return headerMap[k];
    }
  }
  return -1;
}
function cell(row, idx) {
  return idx >= 0 && row[idx] != null ? String(row[idx]) : '';
}

const sH = buildHeaderIndex(sessionRows[0] || []);
const SES = {
  name:  col(sH, ['Session Name']),
  code:  col(sH, ['Session Code']),
  theme: col(sH, ['Category']),
  start: col(sH, ['Session Start Date/Time', 'Start Date/Time']),
  end:   col(sH, ['End Date/Time', 'Session End Date/Time']),
  desc:  col(sH, ['Description']),                 // first "Description" column
  type:  col(sH, ['Presentation Type']),
  tags:  col(sH, [], /\btags\b/),                  // e.g. "2025 CTA tags", "2026 CTA tags"
};
const pH = buildHeaderIndex(speakerRows[0] || []);
const SPK = {
  name:  col(pH, ['Full Name']),
  org:   col(pH, ['Company Name', 'Organization']),
  bio:   col(pH, ['Biography', 'Bio']),
  title: col(pH, ['Title']),
  code:  col(pH, ['Session Code']),
};

// Fail loudly if a required column is missing (header renamed/dropped).
(function checkHeaders() {
  const missing = [];
  if (SES.name  < 0) missing.push('sessions: Session Name');
  if (SES.code  < 0) missing.push('sessions: Session Code');
  if (SES.start < 0) missing.push('sessions: Session Start Date/Time');
  if (SES.type  < 0) missing.push('sessions: Presentation Type');
  if (SPK.name  < 0) missing.push('speakers: Full Name');
  if (SPK.code  < 0) missing.push('speakers: Session Code');
  if (missing.length) {
    console.error('ERROR: required column(s) not found by header name:\n  - ' + missing.join('\n  - '));
    process.exit(1);
  }
})();

const typeMap = {
  'Workshops': 'workshop',
  'Solution-Oriented Strategy Sessions': 'strategy',
  'Creative Spaces': 'creative',
  'Keynote': 'keynote',
  'Skill Building Institutes': 'skill',
  'International Exchange': 'intl'
};

// ── CDN base for curated speaker assets ──────────────────────────────────────
const CDN = 'https://custom.cvent.com/AE944F71438646268B70FF5BF3772347/files/event/e7d15afcf2b14901ab0272ce8a401899/';

// ── Manually curated speaker overrides ───────────────────────────────────────
// Keyed by the normalized Full Name from the speaker CSV. Add any speaker here
// (Skill Institute or otherwise) when their photo/bio needs to be curated.
// Bios are sourced from the relevant speaker/widget data; photos from Cvent CDN.
const SPEAKER_OVERRIDE = {
  'Kevin Campbell': {
    photo: 'https://custom.cvent.com/AE944F71438646268B70FF5BF3772347/files/event/e7d15afcf2b14901ab0272ce8a401899/4f8028ce76df443cbc87d270e0fa4163.jpg'
  },
  'Gregory Smith': {
    photo: 'https://custom.cvent.com/AE944F71438646268B70FF5BF3772347/files/event/e7d15afcf2b14901ab0272ce8a401899/7981d8bf37054b68adef8956f30a7cb5.jpg'
  },
  'Dorothy Roberts': {
    photo: 'https://custom.cvent.com/AE944F71438646268B70FF5BF3772347/files/event/e7d15afcf2b14901ab0272ce8a401899/3eaba35523a14ca7b582aeb7bbfb79c4.jpg'
  },
  'Joyce McMillan': {
    photo: 'https://custom.cvent.com/AE944F71438646268B70FF5BF3772347/files/event/e7d15afcf2b14901ab0272ce8a401899/b6d0e0d14c394dcd83a2a1d6c2c2f8f8.jpg'
  },
  'Paul Nixon': {
    photo: CDN + 'c85b4588d3f04f03af1ff97dcf7c5214.png',
    bio: 'International expert with 34+ years in child protection, Family Group Conferences, and leadership; former Chief Social Worker for the Government of New Zealand. Consults with governments, NGOs, and universities across six continents.'
  },
  'Sharon Inglis': {
    photo: CDN + 'fb537cda9e16421abe5e3946c5057638.jpg',
    bio: '25+ years specializing in family group conferences and restorative approaches. Supports children\'s services in making the shift from procedural practice to true partnership.'
  },
  'Jess Hoeper': {
    photo: CDN + '5accc76ba6ec49db8182e06fc9c81347.png',
    bio: 'Co-founder of the PD Collective, bringing lived experience and reflective consultation to training on Professional Dangerousness. Creates honest, actionable learning spaces rooted in human services practice.'
  },
  'Brëanna McMullen': {
    photo: CDN + '5accc76ba6ec49db8182e06fc9c81347.png',
    bio: 'Co-founder of the PD Collective alongside Jessica Hoeper, guiding communities in recognizing and transforming Professional Dangerousness through humor, compassion, and sustainable change.'
  },
  'Mark Durgin': {
    photo: CDN + '1911c1220e974a53a533087beb213e95.png',
    bio: 'Mark B. Durgin is an accomplished leader with over two decades of experience transforming organizations through strategic leadership, partnering with human service managers nationwide to build trusting, collaborative teams and achieve meaningful impact without burnout. His expertise is rooted in human services, including leading a $23M grant initiative to transform behavioral health systems, which directly informs his results-driven coaching approach. A passionate advocate for adaptive leadership, he has guided over 2,500 professionals in cross-sector communication and systemic problem-solving, grounded in person-centered service delivery that helps clients create their desired future. Mark holds a BS in Criminal Justice, is an Associate Certified Coach (ACC) through the International Coaching Federation, and is a sought-after speaker at national conferences on leadership, system change, and behavioral health. When not coaching, he enjoys time with his family in New Freedom, PA.'
  },
  'Ellen Kagen': {
    photo: CDN + 'a9768e31b09a4054839a72b5dbce699d.png',
    bio: 'Ellen B. Kagen is an Assistant Professor at Georgetown University and founder of the Georgetown Leadership Academy, a national leadership learning and consultation effort for professionals, families, and youth in human services, health, and education. Ms. Kagen has adapted her curriculum for nonprofits, Foundations, Universities, Child Welfare networks, and over 30 states, covering topics such as Adaptive Leadership, Cultural Competence, and Systems Change. Central to her work is a focus on innovation and breakthrough strategies. She and her colleagues created Transformation Facilitation, a coaching model that strengthens leadership effectiveness in reaching organizational goals. Ms. Kagen was a founding partner of Coach Approach Partners. She holds an MSW from the University of Maryland, with leadership training from Harvard\'s Kennedy School and Executive Coaching from Georgetown University.'
  },
  'Barb Putnam': {
    photo: CDN + '92a9464813d54b3189fc61fa94b2ff0e.jpg',
    bio: 'Barb has been a leader in Washington State\'s System of Care since 1987, advancing programs across child-serving systems. She began in the Community Mental Health System designing wraparound services with the King County Interagency Staffing Team, then moved statewide as Children\'s Long-Term Inpatient Coordinator. As a supervisor in the Department of Children, Youth and Families, she collaborated across health, development, and education to address children\'s mental health needs. Focused on foster youth, Barb partnered with systems to design programs increasing service accessibility statewide. Training parents and professionals has been central to her work at every level. Barb leads with heart and integrity — tireless in her commitment to youth, championing families and building lasting connections. She is a certified trainer in the Coach Approach for Adaptive Leadership through the Kagen Leadership Group, training statewide with a team from Washington State.'
  },
  'Valerie Frost': {
    photo: CDN + '606d3b0edcdc4e16a02afda9d4ea3e23.jpg',
    bio: 'Dynamic trainer and advocate with firsthand experience navigating child welfare as a parent and a decade in early childhood education. Believes gaps in well-being are opportunities for support — not risks.'
  },
  'Michelle Mares': {
    photo: CDN + 'a3e21ea156c249bbbb07aab7866420c5.jpg',
    bio: 'Michelle C. Mares, BS, MS-Organizational Leadership, PCC, CPCC, is a faculty member at the University of Colorado Anschutz Medical Campus within the Kempe Center and an international faculty member and systems coach for CRR Global, Inc. In her global faculty role, she is experienced in global relations with the intricacies of relationship systems, communication, and emergence.At the Kempe Center, Michelle leads the Foster, Kin, and Adoptive Parent Training Department for Colorado’s Child Welfare Training System. In this capacity, she is responsible for the design, authorship, and implementation of statewide curricula serving caregivers across 64 Colorado counties. Her professional expertise is deeply informed by her ten years of experience as a foster parent, providing her with a foundational, lived understanding of the complexities inherent in the child welfare system.With over 28 years of experience, Michelle’s work sits at the intersection of neurobiology and organizational health; she is a trained Trust-Based Relational Intervention (TBRI) Practitioner, certified in Polyvagal Theory, and trained in the Co-Active Coaching model. She utilizes Organizational Relationship Systems Coaching (ORSC) to help navigate complex dynamics. A recipient of the Dalice Miller Hertzberg Award, Michelle is a recognized leader in the child welfare sector, dedicated to fostering equity, resilience, and excellence through coaching and systemic innovation.'
  },
  'Jude Louissaint': {
    photo: CDN + '08aa9a7aa0094bfeb36a4a41be2f5617.jpg',
    bio: 'Jude is a Management Consultant at Public Knowledge with more than 30 years of experience across local, state, and federal child welfare systems. An International Coaching Federation Certified Master Coach, he specializes in leadership development, executive coaching, and partnering with leaders to strengthen performance, align practice with values, and drive sustainable systems change. His work integrates continuous quality improvement, data-informed decision-making, and reflective supervision to build high-functioning teams and improve outcomes for children and families. Jude began his child welfare career with New York City’s Administration for Children’s Services, where he served as Director of Field Operations, overseeing child protective services. Before joining Public Knowledge, he served as Deputy Chief of the Unaccompanied Children Bureau. He is recognized for leading transformational initiatives, fostering collaboration, and delivering measurable improvements in program performance. Jude holds a Master of Social Work from Fordham University.'
  },
  'Tracy Malone': {
    photo: CDN + '1674b55b6c684eda8785ab18030738e1.jpg',
    bio: 'Tracy is an experienced child welfare administrator with strong leadership and relationship-building skills. She brings 28 years of public child welfare experience, ranging from frontline worker and supervisor to regional and statewide director positions. She specializes in child welfare reform, court improvement, education and training, and continuous quality improvement (CQI). Her collaborative approach and communication skills are invaluable in building strong public and private child welfare partnerships that promote improvements in child welfare systems. A Prosci® Certified Change Practitioner, Tracy is a master’s-level social worker with extensive leadership and project management expertise.'
  },
  'Stacey Moss': {
    photo: CDN + 'a0b234bb70834f66aedb516198806f4b.jpg',
    bio: 'Stacey Moss, JD, CWLS, PMP®, IOSM Teacher and Facilitator, is President and CEO of Public Knowledge®, bringing more than 25 years of experience across government, legal, and nonprofit sectors. A Child Welfare Law Specialist and Project Management Professional, she has represented parents, children, and agencies and now partners with states nationwide to strengthen child welfare systems. Her work spans system transformation, CCWIS planning and procurement, organizational change management, and leadership development.Stacey has delivered more than 200 trainings and presentations on leadership, procurement, and child welfare practice. She also leads the Public Knowledge® IMPACT LeadershipTM Program, helping leaders navigate complex initiatives with clarity and accountability.'
  },
  'Liz Wendel': {
    photo: CDN + '8000a49cebfc454c9fb103b9d946b2c9.jpg',
    bio: 'Co-author of Family Finding® and Family Seeing®; her team linked 10,000+ young people to 26,000+ lasting supports. Teaches one truth: connection is the most powerful intervention we have.'
  },
  'Dan Martin': {
    photo: CDN + '20efd7dd23744a78b7eeb2f76056a761.png',
    bio: 'Developer of the HEERO Model for resilience, belonging, and healing, with 30+ years in child welfare, mental health, and addictions across four Canadian agencies. Trains practitioners across North America and internationally.'
  },
  'Colleen Gibley-Reed': {
    photo: CDN + 'f44828c03f9949b4b8725f7f99745154.jpg',
    bio: 'Colleen Gibley-Reed (she/her) joined the Illuminate Colorado team in July of 2024 as the Director of Education. In her role, Colleen is responsible for leading the Education Strategies of Illuminate Colorado. From curricula development and implementation, through training promotion and delivery, to revision and continuous quality improvement, Colleen oversees and ensures consistency and high-quality education programming, supports communications and evaluation processes, and engages with partners at the local, state, and national level.Before joining Illuminate, Colleen spent nearly eleven years with the Kempe Center for the Prevention and Treatment of Child Abuse and Neglect as a Faculty Instructor and Lead County Learning Coordinator for the Colorado Child Welfare Training System. In this position, she was responsible for cultivating and managing effective working relationships with the eleven largest Colorado counties to respond to their professional development needs.Previous to her work at the Kempe Center, Colleen spent nineteen years with the Larimer County Department of Human Services. Her direct child welfare experience includes work in family preservation, ongoing child protection, foster and kinship care, staff training, and practice coaching.Additionally, since 2015, Colleen has served as an adjunct faculty member at the University of Denver\'s Graduate School of Social Work, teaching courses related to power, privilege and oppression and serving as a course coordinator.  Colleen believes that all families deserve to thrive, and is passionate about using her skills to help others learn how to support families so they can reach their full potential.'
  },
  'Anna Strömberg': {
    photo: CDN + '7c8acaed800f46d0891374256f5d10af.jpg',
    bio: 'Anna Strömberg is a social worker with a long history of working in children\'s services and also working for six years in Myanmar. Absolutely committed to the idea it takes a village to raise a child Anna and her husband have been foster carers in Sweden for 15 years. In all their fostering the Strombergs are committed to partnering with the parents, aunts, uncles and grandparents from the moment the children come to live in their home. Having done this with many children, their parents and relatives they know this approach to fostering makes for better outcomes for the children and a better experience for themselves and the children\'s family. With this experience Anna has a wealth of practical wisdom of how to work with the social workers and come together with them and the family to provide foster care that is focused on belonging and connection.'
  },
  'Andrew Turnell AM': {
    photo: CDN + '7464efdc944f405c86ac7cab697ff19c.png',
    bio: 'Andrew Turnell AM is Social Work Professor of Practice at the University of Cumbria and principal co-creator of the Signs of Safety. He is internationally renowned for his ground-breaking work applying safety-organised practice and systemic thinking to statutory child protection. Andrew\'s work takes him around the world — he is currently working with agencies in England, Belgium, Austria, Canada, Bhutan and Sweden. More information at born2belong.com.'
  },
  // CSV name variants (non-accented / shortened forms that come out of the CSV parser)
  'Andrew Turnell': {
    photo: CDN + '7464efdc944f405c86ac7cab697ff19c.png',
    bio: 'Andrew Turnell AM lives in Australia. Andrew is Social Work Professor of Practice at the University of Cumbria, England and principal co-creator of the Signs of Safety. Andrew is well known internationally for his ground-breaking work in applying safety-organised practice and systemic thinking to statutory child protection services publishing extensively on the Signs of Safety, the Resolutions approachs and applying solution-focused restorative practice with complex cases of torture, abuse and violence.Andrew’s work takes him around the world focusing always on child protection practice that involves everyone with natural connections to the child in building safety and belonging.  Andrew is currently working with agencies in England, Belgium, Austria, Canada, Bhutan and Sweden. Andrew has worked in partnership with Professor Eileen Munro for nearly twenty years and together they have co-authored numerous papers and reports. More information @ born2belong.com.'
  },
  'Bre McMullen': {
    photo: CDN + '5accc76ba6ec49db8182e06fc9c81347.png',
    bio: 'Co-founder of the PD Collective alongside Jessica Hoeper, guiding communities in recognizing and transforming Professional Dangerousness through humor, compassion, and sustainable change.'
  },
  'Anna Stromberg': {
    photo: CDN + '7c8acaed800f46d0891374256f5d10af.jpg',
    bio: 'Anna Strömberg is a social worker with a long history of working in children\'s services and also working for six years in Myanmar. Absolutely committed to the idea it takes a village to raise a child Anna and her husband have been foster carers in Sweden for 15 years. In all their fostering the Strombergs are committed to partnering with the parents, aunts, uncles and grandparents from the moment the children come to live in their home. Having done this with many children, their parents and relatives they know this approach to fostering makes for better outcomes for the children and a better experience for themselves and the children\'s family. With this experience Anna has a wealth of practical wisdom of how to work with the social workers and come together with them and the family to provide foster care that is focused on belonging and connection.'
  }
};

// ── Step 0: Also harvest any photos from current file not in override map ─────
try {
  const content = fs.readFileSync('./sessionsByBlock.js', 'utf8');
  const lines = content.split('\n');
  for (const line of lines) {
    if (line.includes('photo:') && line.includes('name:')) {
      const nm = line.match(/name:\s*"([^"]+)"/);
      const ph = line.match(/photo:\s*"([^"]+)"/);
      if (nm && ph && !SPEAKER_OVERRIDE[nm[1]]) {
        // Store as fallback for any speaker not already in override
        SPEAKER_OVERRIDE[nm[1]] = { photo: ph[1], bio: null };
      }
    }
  }
} catch (e) { /* silent */ }

// ── Build speaker lookup by Session Code ─────────────────────────────────────
const speakersBySessionCode = {};
for (let i = 1; i < speakerRows.length; i++) {
  const r = speakerRows[i];
  if (!r) continue;
  const sessionCode = cell(r, SPK.code).trim();
  if (!sessionCode) continue;

  let fullName = cell(r, SPK.name).trim().replace(/^﻿/, '');
  if (fullName.includes(',')) {
    const ci = fullName.indexOf(',');
    const last = fullName.substring(0, ci).trim();
    const first = fullName.substring(ci + 1).trim();
    fullName = first + ' ' + last;
  }

  const csvBio   = cell(r, SPK.bio).trim();
  const override = SPEAKER_OVERRIDE[fullName] || {};

  // A curated bio wins over the CSV when present (override.bio non-null);
  // otherwise fall back to the CSV bio. Photos always prefer the curated
  // override. This keeps manually curated speaker data stable across rebuilds.
  const speaker = {
    name:  fullName,
    title: cell(r, SPK.title).trim(),
    org:   cell(r, SPK.org).trim(),
    bio:   override.bio || csvBio || '',
    photo: override.photo || null
  };

  if (!speakersBySessionCode[sessionCode]) speakersBySessionCode[sessionCode] = [];
  speakersBySessionCode[sessionCode].push(speaker);
}

// ── Parse "MM/DD/YYYY H:MM:SS AM/PM" → { blockKey, date, time } ──────────────
function parseDateTime(dateStr) {
  if (!dateStr) return null;
  const m = dateStr.match(/(\d+)\/(\d+)\/(\d+)\s+(\d+):(\d+):\d+\s+(AM|PM)/i);
  if (!m) return null;
  let [, mo, da, yr, hr, mn, ampm] = m;
  hr = parseInt(hr);
  if (ampm.toUpperCase() === 'PM' && hr !== 12) hr += 12;
  if (ampm.toUpperCase() === 'AM' && hr === 12) hr = 0;
  const date = yr + '-' + mo.padStart(2, '0') + '-' + da.padStart(2, '0');
  const time = String(hr).padStart(2, '0') + ':' + mn;
  return { blockKey: date + '|' + time, date, time };
}

function esc(s) {
  return (s || '').replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');
}

// ── Build session blocks ──────────────────────────────────────────────────────
const blocks = {};
for (let i = 1; i < sessionRows.length; i++) {
  const r = sessionRows[i];
  if (!r) continue;
  let name = cell(r, SES.name).trim().replace(/^﻿/, '');
  const code        = cell(r, SES.code).trim();
  const presType    = cell(r, SES.type).trim();
  const theme       = cell(r, SES.theme).trim();
  const startStr    = cell(r, SES.start).trim();
  const endStr      = cell(r, SES.end).trim();
  const description = cell(r, SES.desc).trim();
  const tagsRaw     = cell(r, SES.tags).trim();

  if (!name || !startStr) continue;

  const startParsed = parseDateTime(startStr);
  if (!startParsed) continue;

  const endParsed = parseDateTime(endStr);
  const endTime   = endParsed ? endParsed.time : null;

  const tags = tagsRaw
    ? tagsRaw.split(',').map(t => t.trim()).filter(Boolean)
    : [];

  const type     = typeMap[presType] || presType.toLowerCase().replace(/\s+/g, '-');
  const speakers = speakersBySessionCode[code] || [];

  const session = { name, code, type, theme, description, endTime, tags, speakers };
  const key = startParsed.blockKey;
  if (!blocks[key]) blocks[key] = [];
  blocks[key].push(session);
}

for (const key of Object.keys(blocks)) {
  blocks[key].sort((a, b) => a.name.localeCompare(b.name));
}

const sortedKeys = Object.keys(blocks).sort();

// ── Write sessionsByBlock.js ─────────────────────────────────────────────────
let js = 'const sessionsByBlock = {\n';
for (let ki = 0; ki < sortedKeys.length; ki++) {
  const key      = sortedKeys[ki];
  const sessions = blocks[key];
  js += '  "' + key + '": [\n';
  for (let si = 0; si < sessions.length; si++) {
    const s = sessions[si];
    js += '    {\n';
    js += '      name: "' + esc(s.name) + '",\n';
    js += '      code: "' + esc(s.code) + '",\n';
    js += '      type: "' + esc(s.type) + '",\n';
    js += '      theme: "' + esc(s.theme) + '",\n';
    if (s.endTime)             js += '      endTime: "' + esc(s.endTime) + '",\n';
    if (s.tags && s.tags.length) js += '      tags: ' + JSON.stringify(s.tags) + ',\n';
    js += '      description: "' + esc(s.description) + '",\n';
    js += '      speakers: [\n';
    for (let spi = 0; spi < s.speakers.length; spi++) {
      const sp = s.speakers[spi];
      js += '        { name: "' + esc(sp.name) + '", title: "' + esc(sp.title) + '", org: "' + esc(sp.org) + '", bio: "' + esc(sp.bio) + '"';
      if (sp.photo) js += ', photo: "' + esc(sp.photo) + '"';
      js += ' }';
      js += spi < s.speakers.length - 1 ? ',\n' : '\n';
    }
    js += '      ]\n';
    js += '    }';
    js += si < sessions.length - 1 ? ',\n' : '\n';
  }
  js += '  ]';
  js += ki < sortedKeys.length - 1 ? ',\n' : '\n';
}
js += '};\n';

fs.writeFileSync('./sessionsByBlock.js', js, 'utf8');
console.log('Done. Blocks:', sortedKeys.length, '| Sessions:', Object.values(blocks).reduce((a, b) => a + b.length, 0));
