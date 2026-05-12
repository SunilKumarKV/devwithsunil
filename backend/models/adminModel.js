const pool = require("../config/db");

const countTable = async (tableName) => {
  try {
    const result = await pool.query(`SELECT COUNT(*)::int AS count FROM ${tableName}`);
    return result.rows[0]?.count ?? 0;
  } catch (error) {
    if (error.code === "42P01") return 0;
    throw error;
  }
};

exports.getDashboardStats = async () => {
  const [blogs, videos, subscribers, messages, projects] = await Promise.all([
    countTable("blog_posts"),
    countTable("videos"),
    countTable("subscribers"),
    countTable("contact_messages"),
    countTable("projects"),
  ]);

  return { blogs, videos, subscribers, messages, projects };
};

exports.getRecentMessages = async () => {
  try {
    return await pool.query(
      "SELECT id, name, email, message, created_at FROM contact_messages ORDER BY created_at DESC LIMIT 20",
    );
  } catch (error) {
    if (error.code === "42P01") return { rows: [] };
    throw error;
  }
};

exports.getRecentSubscribers = async () => {
  try {
    return await pool.query(
      "SELECT id, email, created_at FROM subscribers ORDER BY created_at DESC LIMIT 50",
    );
  } catch (error) {
    if (error.code === "42P01") return { rows: [] };
    throw error;
  }
};

exports.getRecentBlogs = async () => {
  try {
    return await pool.query(
      "SELECT id, title, slug, status, created_at FROM blog_posts ORDER BY created_at DESC LIMIT 20",
    );
  } catch (error) {
    if (error.code === "42P01") return { rows: [] };
    throw error;
  }
};

exports.getRecentVideos = async () => {
  try {
    return await pool.query(
      "SELECT id, youtube_id, title, video_url, featured, created_at FROM videos ORDER BY created_at DESC LIMIT 20",
    );
  } catch (error) {
    if (error.code === "42P01") return { rows: [] };
    throw error;
  }
};

exports.getRecentProjects = async () => {
  try {
    return await pool.query(
      "SELECT id, title, slug, live_url, github_url, featured, created_at FROM projects ORDER BY created_at DESC LIMIT 20",
    );
  } catch (error) {
    if (error.code === "42P01") return { rows: [] };
    throw error;
  }
};
