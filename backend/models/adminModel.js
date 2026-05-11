const pool = require("../config/db");

exports.getDashboardStats = async () => {
  const [blogs, videos, subscribers, messages, projects] = await Promise.all([
    pool.query("SELECT COUNT(*)::int AS count FROM blog_posts"),
    pool.query("SELECT COUNT(*)::int AS count FROM videos"),
    pool.query("SELECT COUNT(*)::int AS count FROM subscribers"),
    pool.query("SELECT COUNT(*)::int AS count FROM contact_messages"),
    pool.query("SELECT COUNT(*)::int AS count FROM projects"),
  ]);

  return {
    blogs: blogs.rows[0].count,
    videos: videos.rows[0].count,
    subscribers: subscribers.rows[0].count,
    messages: messages.rows[0].count,
    projects: projects.rows[0].count,
  };
};

exports.getRecentMessages = () =>
  pool.query(
    "SELECT id, name, email, message, created_at FROM contact_messages ORDER BY created_at DESC LIMIT 20",
  );

exports.getRecentSubscribers = () =>
  pool.query(
    "SELECT id, email, created_at FROM subscribers ORDER BY created_at DESC LIMIT 50",
  );
