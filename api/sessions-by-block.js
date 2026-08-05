import { neon } from '@neondatabase/serverless';

// Curated photo overrides for speakers whose image is not present (or is stale)
// in the source speaker table. Keys match the API's "First Last" name format.
const SPEAKER_PHOTO_OVERRIDE = {
  'Kevin Campbell': 'https://custom.cvent.com/AE944F71438646268B70FF5BF3772347/files/event/e7d15afcf2b14901ab0272ce8a401899/4f8028ce76df443cbc87d270e0fa4163.jpg',
  'Gregory Smith': 'https://custom.cvent.com/AE944F71438646268B70FF5BF3772347/files/event/e7d15afcf2b14901ab0272ce8a401899/7981d8bf37054b68adef8956f30a7cb5.jpg',
  'Dorothy Roberts': 'https://custom.cvent.com/AE944F71438646268B70FF5BF3772347/files/event/e7d15afcf2b14901ab0272ce8a401899/3eaba35523a14ca7b582aeb7bbfb79c4.jpg',
  'Joyce McMillan': 'https://custom.cvent.com/AE944F71438646268B70FF5BF3772347/files/event/e7d15afcf2b14901ab0272ce8a401899/b6d0e0d14c394dcd83a2a1d6c2c2f8f8.jpg',
};

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const sql  = neon(process.env.DATABASE_URL);
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
        speakers:    (row.speakers || []).map(sp => ({
          name:  sp.name  || '',
          title: sp.title || '',
          org:   sp.org   || '',
          bio:   sp.bio   || '',
          ...(SPEAKER_PHOTO_OVERRIDE[sp.name] || sp.photo
            ? { photo: SPEAKER_PHOTO_OVERRIDE[sp.name] || sp.photo }
            : {}),
        })),
      });
    }

    res.setHeader('Cache-Control', 'no-store, max-age=0');
    return res.status(200).json(sessionsByBlock);
  } catch (err) {
    console.error('sessions-by-block error:', err);
    return res.status(500).json({ error: 'Failed to load session data.' });
  }
}
