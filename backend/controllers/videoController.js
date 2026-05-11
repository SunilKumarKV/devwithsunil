const { validationResult } = require('express-validator');
const xss = require('xss');
const videoModel = require('../models/videoModel');

const youtubeThumbnail = (youtubeId) => `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
const youtubeUrl = (youtubeId) => `https://www.youtube.com/watch?v=${youtubeId}`;

exports.getFeaturedVideos = async (req, res, next) => {
  try {
    const result = await videoModel.findFeatured();
    return res.json({ videos: result.rows });
  } catch (err) {
    next(err);
  }
};

exports.createVideo = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: 'error', message: 'Validation failed', errors: errors.array() });
    }

    const { youtube_id, title, description = null, thumbnail_url, video_url, published_at = null, featured = true } = req.body;
    const result = await videoModel.create({
      youtube_id,
      title: xss(title),
      description: description ? xss(description) : null,
      thumbnail_url: thumbnail_url || youtubeThumbnail(youtube_id),
      video_url: video_url || youtubeUrl(youtube_id),
      published_at,
      featured,
    });

    return res.status(201).json({ status: 'success', data: result.rows[0] });
  } catch (err) {
    next(err);
  }
};
