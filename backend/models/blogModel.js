const pool = require("../config/db");

const publicSelect = `
  SELECT * FROM blog_posts
  WHERE status = 'published'
    AND (scheduled_at IS NULL OR scheduled_at <= now())
  ORDER BY featured DESC, COALESCE(scheduled_at, date::timestamptz, created_at) DESC, created_at DESC
`;

exports.findAll = ({ search = "", status = "published", featured } = {}) => {
  const values = [];
  const conditions = [];

  if (status === "published") {
    conditions.push("status = 'published'");
    conditions.push("(scheduled_at IS NULL OR scheduled_at <= now())");
  }

  if (search) {
    values.push(`%${search}%`);
    conditions.push(`(title ILIKE $${values.length} OR excerpt ILIKE $${values.length} OR content ILIKE $${values.length} OR tag ILIKE $${values.length})`);
  }

  if (typeof featured === "boolean") {
    values.push(featured);
    conditions.push(`featured = $${values.length}`);
  }

  const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
  return pool.query(`${publicSelect.replace(/WHERE[\s\S]*?ORDER BY/, `${where} ORDER BY`)}`, values);
};

exports.findBySlug = (slug) =>
  pool.query(
    `SELECT * FROM blog_posts
     WHERE slug = $1 AND status = 'published' AND (scheduled_at IS NULL OR scheduled_at <= now())`,
    [slug],
  );

exports.findBySlugAnyStatus = (slug) => pool.query("SELECT * FROM blog_posts WHERE slug = $1", [slug]);

exports.findAllForAdmin = ({ search = "", status = "all" } = {}) => {
  const values = [];
  const conditions = [];

  if (status !== "all") {
    values.push(status);
    conditions.push(`status = $${values.length}`);
  }

  if (search) {
    values.push(`%${search}%`);
    conditions.push(`(title ILIKE $${values.length} OR slug ILIKE $${values.length} OR tag ILIKE $${values.length})`);
  }

  const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
  return pool.query(`SELECT * FROM blog_posts ${where} ORDER BY created_at DESC`, values);
};

exports.create = ({
  slug,
  title,
  tag,
  tags = [],
  date,
  excerpt,
  content,
  read_time,
  status = "draft",
  cover_image = null,
  seo_title = null,
  seo_description = null,
  scheduled_at = null,
  featured = false,
}) =>
  pool.query(
    `INSERT INTO blog_posts (
      slug, title, tag, tags, date, excerpt, content, read_time, status, cover_image,
      seo_title, seo_description, scheduled_at, featured
    )
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
     RETURNING *`,
    [slug, title, tag, tags, date, excerpt, content, read_time, status, cover_image, seo_title, seo_description, scheduled_at, featured],
  );

exports.update = (id, {
  slug,
  title,
  tag,
  tags = [],
  date,
  excerpt,
  content,
  read_time,
  status = "draft",
  cover_image = null,
  seo_title = null,
  seo_description = null,
  scheduled_at = null,
  featured = false,
}) =>
  pool.query(
    `UPDATE blog_posts
     SET slug = $1,
         title = $2,
         tag = $3,
         tags = $4,
         date = $5,
         excerpt = $6,
         content = $7,
         read_time = $8,
         status = $9,
         cover_image = $10,
         seo_title = $11,
         seo_description = $12,
         scheduled_at = $13,
         featured = $14,
         updated_at = now()
     WHERE id = $15
     RETURNING *`,
    [slug, title, tag, tags, date, excerpt, content, read_time, status, cover_image, seo_title, seo_description, scheduled_at, featured, id],
  );

exports.delete = (id) => pool.query("DELETE FROM blog_posts WHERE id = $1 RETURNING *", [id]);

exports.incrementView = (slug) =>
  pool.query(
    `UPDATE blog_posts SET view_count = COALESCE(view_count, 0) + 1 WHERE slug = $1 RETURNING view_count`,
    [slug],
  );

exports.like = (slug) =>
  pool.query(
    `UPDATE blog_posts SET like_count = COALESCE(like_count, 0) + 1 WHERE slug = $1 RETURNING like_count`,
    [slug],
  );
