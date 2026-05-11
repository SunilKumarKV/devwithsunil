const videoModel = require("../models/videoModel");

exports.getFeaturedVideos = async (req, res, next) => {
  try {
    const result = await videoModel.findFeatured();
    return res.json({ videos: result.rows });
  } catch (err) {
    next(err);
  }
};
