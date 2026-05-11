const pool = require('../config/db');

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

exports.create = ({ youtube_id, title, description = null, thumbnail_url, video_url, published_at = null, featured = true }) =>
  pool.query(
    `INSERT INTO videos (youtube_id, title, description, thumbnail_url, video_url, published_at, featured)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     ON CONFLICT (youtube_id)
     DO UPDATE SET
       title = EXCLUDED.title,
       description = EXCLUDED.description,
       thumbnail_url = EXCLUDED.thumbnail_url,
       video_url = EXCLUDED.video_url,
       published_at = EXCLUDED.published_at,
       featured = EXCLUDED.featured
     RETURNING youtube_id AS id, title, description, thumbnail_url AS "thumbnailUrl", video_url AS "videoUrl", published_at AS "publishedAt", featured`,
    [youtube_id, title, description, thumbnail_url, video_url, published_at, featured],
  );
