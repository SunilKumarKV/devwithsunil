const pool = require('../config/db');

exports.findFeatured = () =>
  pool.query(
    `SELECT id, title, slug, description, tech_stack AS "techStack", github_url AS "githubUrl", live_url AS "liveUrl", featured, created_at AS "createdAt"
       FROM projects
      WHERE featured = true
      ORDER BY created_at DESC`,
  );

exports.create = ({ title, slug, description, tech_stack = [], github_url = null, live_url = null, featured = true }) =>
  pool.query(
    `INSERT INTO projects (title, slug, description, tech_stack, github_url, live_url, featured)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING id, title, slug, description, tech_stack AS "techStack", github_url AS "githubUrl", live_url AS "liveUrl", featured`,
    [title, slug, description, tech_stack, github_url, live_url, featured],
  );
