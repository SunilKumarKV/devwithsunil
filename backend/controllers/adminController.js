const adminModel = require("../models/adminModel");

exports.dashboard = async (req, res, next) => {
  try {
    const stats = await adminModel.getDashboardStats();
    const [messages, subscribers] = await Promise.all([
      adminModel.getRecentMessages(),
      adminModel.getRecentSubscribers(),
    ]);

    return res.json({
      status: "success",
      data: {
        stats,
        recentMessages: messages.rows,
        recentSubscribers: subscribers.rows,
      },
    });
  } catch (err) {
    next(err);
  }
};
