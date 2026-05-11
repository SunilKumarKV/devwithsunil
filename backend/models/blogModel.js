const pool = require("../config/db");

exports.findAll = () =>
  pool.query("SELECT * FROM blog_posts WHERE status = 'published' ORDER BY date DESC, created_at DESC");

exports.findBySlug = (slug) =>
  pool.query("SELECT * FROM blog_posts WHERE slug = $1 AND status = 'published'", [slug]);

exports.findAllForAdmin = () =>
  pool.query("SELECT * FROM blog_posts ORDER BY date DESC, created_at DESC");

exports.create = ({ slug, title, tag, date, excerpt, content, read_time, status = "draft", cover_image = null }) =>
  pool.query(
    `INSERT INTO blog_posts (slug, title, tag, date, excerpt, content, read_time, status, cover_image)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
     RETURNING *`,
    [slug, title, tag, date, excerpt, content, read_time, status, cover_image],
  );
