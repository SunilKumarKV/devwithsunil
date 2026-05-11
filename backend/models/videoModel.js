const pool = require("../config/db");

exports.findFeatured = () =>
  pool.query(
    `SELECT youtube_id AS id,
            title,
            description,
            thumbnail_url AS "thumbnailUrl",
            video_url AS "videoUrl",
            published_at AS "publishedAt"
       FROM videos
      WHERE featured = true
      ORDER BY COALESCE(published_at, created_at) DESC
      LIMIT 6`,
  );
