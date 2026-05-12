const pool = require('../config/db');

exports.findFeatured = () =>
  pool.query(
    `SELECT id, title, slug, description, tech_stack AS "techStack", github_url AS "githubUrl", live_url AS "liveUrl", featured, created_at AS "createdAt"
       FROM projects
      WHERE featured = true
      ORDER BY created_at DESC`,
  );

exports.findAllForAdmin = ({ search = '' } = {}) => {
  const like = `%${search}%`;
  return pool.query(
    `SELECT id,
            title,
            slug,
            description,
            tech_stack,
            tech_stack AS "techStack",
            github_url,
            github_url AS "githubUrl",
            live_url,
            live_url AS "liveUrl",
            featured,
            created_at,
            created_at AS "createdAt",
            updated_at,
            updated_at AS "updatedAt"
       FROM projects
      WHERE ($1 = '' OR title ILIKE $2 OR slug ILIKE $2 OR description ILIKE $2)
      ORDER BY created_at DESC`,
    [search, like],
  );
};

exports.create = ({ title, slug, description, tech_stack = [], github_url = null, live_url = null, featured = true }) =>
  pool.query(
    `INSERT INTO projects (title, slug, description, tech_stack, github_url, live_url, featured)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     ON CONFLICT (slug)
     DO UPDATE SET
       title = EXCLUDED.title,
       description = EXCLUDED.description,
       tech_stack = EXCLUDED.tech_stack,
       github_url = EXCLUDED.github_url,
       live_url = EXCLUDED.live_url,
       featured = EXCLUDED.featured,
       updated_at = now()
     RETURNING id, title, slug, description, tech_stack AS "techStack", github_url AS "githubUrl", live_url AS "liveUrl", featured, created_at AS "createdAt", updated_at AS "updatedAt"`,
    [title, slug, description, tech_stack, github_url, live_url, featured],
  );

exports.delete = (id) =>
  pool.query('DELETE FROM projects WHERE id = $1 RETURNING id', [id]);
