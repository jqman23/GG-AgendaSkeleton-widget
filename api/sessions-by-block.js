import { neon } from '@neondatabase/serverless';

// Curated photo overrides for speakers whose image is not present (or is stale)
// in the source speaker table. Keys match the API's "First Last" name format.
const SPEAKER_PHOTO_OVERRIDE = {
  'Kevin Campbell': 'https://custom.cvent.com/AE944F71438646268B70FF5BF3772347/files/event/e7d15afcf2b14901ab0272ce8a401899/4f8028ce76df443cbc87d270e0fa4163.jpg',
  'Gregory Smith': 'https://custom.cvent.com/AE944F71438646268B70FF5BF3772347/files/event/e7d15afcf2b14901ab0272ce8a401899/7981d8bf37054b68adef8956f30a7cb5.jpg',
  'Dorothy Roberts': 'https://custom.cvent.com/AE944F71438646268B70FF5BF3772347/files/event/e7d15afcf2b14901ab0272ce8a401899/3eaba35523a14ca7b582aeb7bbfb79c4.jpg',
  'Joyce McMillan': 'https://custom.cvent.com/AE944F71438646268B70FF5BF3772347/files/event/e7d15afcf2b14901ab0272ce8a401899/b6d0e0d14c394dcd83a2a1d6c2c2f8f8.jpg',
  'Anna Stromberg': 'https://custom.cvent.com/AE944F71438646268B70FF5BF3772347/files/event/e7d15afcf2b14901ab0272ce8a401899/7c8acaed800f46d0891374256f5d10af.jpg',
  'Anna Strömberg': 'https://custom.cvent.com/AE944F71438646268B70FF5BF3772347/files/event/e7d15afcf2b14901ab0272ce8a401899/7c8acaed800f46d0891374256f5d10af.jpg',
};

// The backend planner's sync currently pulls the raw cell formula for photo
// URLs instead of the resolved link (e.g. `=HYPERLINK("https://...jpg", "Image")`
// rather than the plain URL). Extract the real URL out of that formula text so
// speaker photos still render; if the value is already a plain URL (once the
// sync is fixed upstream) or anything else unrecognized, this leaves it as-is.
function resolvePhotoUrl(raw) {
  if (!raw) return raw;
  const match = /^=HYPERLINK\(\s*"([^"]+)"/i.exec(raw.trim());
  return match ? match[1] : raw;
}

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const sql  = neon(process.env.DATABASE_URL);
    // Defensive: the column is normally added by the backend planner's next
    // CSV sync (lib/agenda-sync-core.js), but that's a separate deploy/
    // upload this repo doesn't control the timing of — guard here too so
    // this query can never fail on a missing column regardless of order.
    await sql`ALTER TABLE sessions ADD COLUMN IF NOT EXISTS display_on_agenda boolean NOT NULL DEFAULT true`;
    const rows = await sql`
      SELECT
        s.session_start,
        s.session_end,
        s.session_name,
        s.session_code,
        s.presentation_type,
        s.category,
        s.description,
        s.tags,
        COALESCE(
          ARRAY_AGG(
            CASE WHEN sp.speaker_code IS NOT NULL
            THEN jsonb_build_object(
              'name',  TRIM(sp.first_name || ' ' || sp.last_name),
              'title', COALESCE(sp.title, ''),
              'org',   COALESCE(sp.org, ''),
              'bio',   COALESCE(sp.biography, ''),
              'photo', sp.photo_url
            ) END
            ORDER BY sp.last_name, sp.first_name
          ) FILTER (WHERE sp.speaker_code IS NOT NULL),
          ARRAY[]::jsonb[]
        ) AS speakers
      FROM sessions s
      LEFT JOIN session_speakers ss ON s.session_id = ss.session_id
      LEFT JOIN speakers sp ON ss.speaker_code = sp.speaker_code
      WHERE s.session_start IS NOT NULL AND s.session_start <> ''
        AND s.display_on_agenda IS NOT FALSE
      GROUP BY s.session_id, s.session_start, s.session_end, s.session_name,
               s.session_code, s.presentation_type, s.category, s.description, s.tags
      ORDER BY s.session_start, s.session_name
    `;

    const sessionsByBlock = {};
    for (const row of rows) {
      const key = row.session_start;
      if (!sessionsByBlock[key]) sessionsByBlock[key] = [];
      sessionsByBlock[key].push({
        name:        row.session_name,
        code:        row.session_code,
        type:        row.presentation_type || '',
        theme:       row.category          || '',
        endTime:     row.session_end        || '',
        tags:        row.tags ? row.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
        description: row.description        || '',
        speakers:    (row.speakers || []).map(sp => {
          const photo = SPEAKER_PHOTO_OVERRIDE[sp.name] || resolvePhotoUrl(sp.photo);
          return {
            name:  sp.name  || '',
            title: sp.title || '',
            org:   sp.org   || '',
            bio:   sp.bio   || '',
            ...(photo ? { photo } : {}),
          };
        }),
      });
    }

    res.setHeader('Cache-Control', 'no-store, max-age=0');
    return res.status(200).json(sessionsByBlock);
  } catch (err) {
    console.error('sessions-by-block error:', err);
    return res.status(500).json({ error: 'Failed to load session data.' });
  }
}
