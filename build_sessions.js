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

const sessionsRaw = fs.readFileSync('C:/Users/kuminj/Downloads/6939031d7ebc4950bbe1bf8679588f66.csv', 'utf8');
const speakersRaw = fs.readFileSync('C:/Users/kuminj/OneDrive - The University of Colorado Denver/Documents - CTA conference/2026/Call for Presentations & Scheduling Tool/Last saved/2026-Speaker-Report.csv', 'utf8');
const sessionRows = parseCSV(sessionsRaw);
const speakerRows = parseCSV(speakersRaw);

const typeMap = {
  'Workshops': 'workshop',
  'Solution-Oriented Strategy Sessions': 'strategy',
  'Creative Spaces': 'creative',
  'Keynote': 'keynote',
  'Skill Building Institutes': 'skill',
  'International Exchange': 'intl'
};

// ── CDN base for skill institute headshots ───────────────────────────────────
const CDN = 'https://custom.cvent.com/AE944F71438646268B70FF5BF3772347/files/event/e7d15afcf2b14901ab0272ce8a401899/';

// ── Manually curated skill institute speaker overrides ───────────────────────
// Bios sourced from skillinstitute-standalonewidget; photos from Cvent CDN.
const SKILL_SPEAKER_OVERRIDE = {
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
    bio: 'Mark B. Durgin is an accomplished leader with over two decades of experience transforming organizations through strategic leadership, partnering with human service managers nationwide to build trusting, collaborative teams and achieve meaningful impact without burnout. His expertise is rooted in human services, including leading a $23M grant initiative to transform behavioral health systems, which directly informs his results-driven coaching approach. A passionate advocate for adaptive leadership, he has guided over 2,500 professionals in cross-sector communication and systemic problem-solving, grounded in person-centered service delivery that helps clients create their desired future. Mark holds a BS in Criminal Justice, is an Associate Certified Coach (ACC) through the International Coaching Federation, and is a sought-after speaker at national conferences on leadership, system change, and behavioral health.'
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
    bio: 'Michelle C. Mares, BS, MS-Organizational Leadership, PCC, CPCC, is a faculty member at the University of Colorado Anschutz Medical Campus within the Kempe Center and an international faculty member and systems coach for CRR Global, Inc. In her global faculty role, she is experienced in global relations with the intricacies of relationship systems, communication, and emergence. At the Kempe Center, Michelle leads the Foster, Kin, and Adoptive Parent Training Department for Colorado\'s Child Welfare Training System. With over 28 years of experience, Michelle\'s work sits at the intersection of neurobiology and organizational health; she is a trained Trust-Based Relational Intervention (TBRI) Practitioner, certified in Polyvagal Theory, and trained in the Co-Active Coaching model. A recipient of the Dalice Miller Hertzberg Award, Michelle is a recognized leader in the child welfare sector, dedicated to fostering equity, resilience, and excellence through coaching and systemic innovation.'
  },
  'Jude Louissaint': {
    photo: CDN + '08aa9a7aa0094bfeb36a4a41be2f5617.jpg',
    bio: 'Jude is a Management Consultant at Public Knowledge with more than 30 years of experience across local, state, and federal child welfare systems. An International Coaching Federation Certified Master Coach, he specializes in leadership development, executive coaching, and partnering with leaders to strengthen performance, align practice with values, and drive sustainable systems change. His work integrates continuous quality improvement, data-informed decision-making, and reflective supervision to build high-functioning teams and improve outcomes for children and families. Jude began his child welfare career with New York City\'s Administration for Children\'s Services, where he served as Director of Field Operations, overseeing child protective services. Before joining Public Knowledge, he served as Deputy Chief of the Unaccompanied Children Bureau. Jude holds a Master of Social Work from Fordham University.'
  },
  'Tracy Malone': {
    photo: CDN + '1674b55b6c684eda8785ab18030738e1.jpg',
    bio: 'Tracy is an experienced child welfare administrator with strong leadership and relationship-building skills. She brings 28 years of public child welfare experience, ranging from frontline worker and supervisor to regional and statewide director positions. She specializes in child welfare reform, court improvement, education and training, and continuous quality improvement (CQI). Her collaborative approach and communication skills are invaluable in building strong public and private child welfare partnerships that promote improvements in child welfare systems. A Prosci® Certified Change Practitioner, Tracy is a master\'s-level social worker with extensive leadership and project management expertise.'
  },
  'Stacey Moss': {
    photo: CDN + 'a0b234bb70834f66aedb516198806f4b.jpg',
    bio: 'Stacey Moss, JD, CWLS, PMP®, IOSM Teacher and Facilitator, is President and CEO of Public Knowledge®, bringing more than 25 years of experience across government, legal, and nonprofit sectors. A Child Welfare Law Specialist and Project Management Professional, she has represented parents, children, and agencies and now partners with states nationwide to strengthen child welfare systems. Her work spans system transformation, CCWIS planning and procurement, organizational change management, and leadership development. Stacey has delivered more than 200 trainings and presentations on leadership, procurement, and child welfare practice. She also leads the Public Knowledge® IMPACT Leadership™ Program, helping leaders navigate complex initiatives with clarity and accountability.'
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
    bio: 'Colleen Gibley-Reed (she/her) joined Illuminate Colorado in July 2024 as Director of Education, leading education strategy from curricula development through continuous quality improvement. She previously spent nearly eleven years with the Kempe Center as a Faculty Instructor and Lead County Learning Coordinator, and nineteen years with the Larimer County Department of Human Services in family preservation, ongoing child protection, foster and kinship care, staff training, and practice coaching. She also serves as adjunct faculty at the University of Denver\'s Graduate School of Social Work. Colleen believes all families deserve to thrive.'
  },
  'Anna Strömberg': {
    photo: null,
    bio: 'Anna Strömberg is a social worker with a long history of working in children\'s services, including six years in Myanmar. Committed to the idea that it takes a village to raise a child, Anna and her husband have been foster carers in Sweden for 15 years — always partnering with the children\'s parents, aunts, uncles, and grandparents from the moment the children arrive in their home.'
  },
  'Andrew Turnell AM': {
    photo: CDN + '7464efdc944f405c86ac7cab697ff19c.png',
    bio: 'Andrew Turnell AM is Social Work Professor of Practice at the University of Cumbria and principal co-creator of the Signs of Safety. He is internationally renowned for his ground-breaking work applying safety-organised practice and systemic thinking to statutory child protection. Andrew\'s work takes him around the world — he is currently working with agencies in England, Belgium, Austria, Canada, Bhutan and Sweden. More information at born2belong.com.'
  },
  // CSV name variants (non-accented / shortened forms that come out of the CSV parser)
  'Andrew Turnell': {
    photo: CDN + '7464efdc944f405c86ac7cab697ff19c.png',
    bio: null  // CSV has a bio for him — falls through to csvBio
  },
  'Bre McMullen': {
    photo: CDN + '5accc76ba6ec49db8182e06fc9c81347.png',
    bio: 'Co-founder of the PD Collective alongside Jessica Hoeper, guiding communities in recognizing and transforming Professional Dangerousness through humor, compassion, and sustainable change.'
  },
  'Anna Stromberg': {
    photo: null,
    bio: 'Anna Strömberg is a social worker with a long history of working in children\'s services, including six years in Myanmar. Committed to the idea that it takes a village to raise a child, Anna and her husband have been foster carers in Sweden for 15 years — always partnering with the children\'s parents, aunts, uncles, and grandparents from the moment the children arrive in their home.'
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
      if (nm && ph && !SKILL_SPEAKER_OVERRIDE[nm[1]]) {
        // Store as fallback for any speaker not already in override
        SKILL_SPEAKER_OVERRIDE[nm[1]] = { photo: ph[1], bio: null };
      }
    }
  }
} catch (e) { /* silent */ }

// ── Build speaker lookup by Session Code ─────────────────────────────────────
const speakersBySessionCode = {};
for (let i = 1; i < speakerRows.length; i++) {
  const r = speakerRows[i];
  if (!r || r.length < 23) continue;
  const sessionCode = (r[22] || '').trim();
  if (!sessionCode) continue;

  let fullName = (r[0] || '').trim().replace(/^﻿/, '');
  if (fullName.includes(',')) {
    const ci = fullName.indexOf(',');
    const last = fullName.substring(0, ci).trim();
    const first = fullName.substring(ci + 1).trim();
    fullName = first + ' ' + last;
  }

  const csvBio   = (r[13] || '').trim();
  const override = SKILL_SPEAKER_OVERRIDE[fullName] || {};

  const speaker = {
    name:  fullName,
    title: (r[17] || '').trim(),
    org:   (r[10] || '').trim(),
    bio:   csvBio || override.bio || '',
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
  if (!r || r.length < 18) continue;
  let name = (r[0] || '').trim().replace(/^﻿/, '');
  const code        = (r[1]  || '').trim();
  const presType    = (r[8]  || '').trim();
  const theme       = (r[3]  || '').trim();
  const startStr    = (r[4]  || '').trim();
  const endStr      = (r[5]  || '').trim();
  const description = (r[6]  || '').trim();
  const tagsRaw     = (r[35] || '').trim();

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
