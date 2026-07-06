import { neon } from '@neondatabase/serverless';

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
          ...(sp.photo ? { photo: sp.photo } : {}),
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
