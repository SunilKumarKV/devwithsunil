const adminModel = require("../models/adminModel");

exports.dashboard = async (req, res, next) => {
  try {
    const [stats, messages, subscribers, blogs, videos, projects] = await Promise.all([
      adminModel.getDashboardStats(),
      adminModel.getRecentMessages(),
      adminModel.getRecentSubscribers(),
      adminModel.getRecentBlogs(),
      adminModel.getRecentVideos(),
      adminModel.getRecentProjects(),
    ]);

    return res.json({
      status: "success",
      data: {
        stats,
        recentMessages: messages.rows,
        recentSubscribers: subscribers.rows,
        recentBlogs: blogs.rows,
        recentVideos: videos.rows,
        recentProjects: projects.rows,
      },
    });
  } catch (err) {
    next(err);
  }
};
