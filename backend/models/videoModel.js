const pool = require('../config/db');

exports.findFeatured = () =>
  pool.query(
    `SELECT youtube_id AS id,
            title,
            description,
            thumbnail_url AS "thumbnailUrl",
            video_url AS "videoUrl",
            published_at AS "publishedAt",
            featured,
            created_at AS "createdAt"
       FROM videos
      WHERE featured = true
      ORDER BY COALESCE(published_at, created_at) DESC
      LIMIT 6`,
  );

exports.findAllForAdmin = ({ search = '' } = {}) => {
  const like = `%${search}%`;
  return pool.query(
    `SELECT id,
            youtube_id,
            youtube_id AS "youtubeId",
            title,
            description,
            thumbnail_url,
            thumbnail_url AS "thumbnailUrl",
            video_url,
            video_url AS "videoUrl",
            published_at,
            published_at AS "publishedAt",
            featured,
            created_at,
            created_at AS "createdAt",
            updated_at,
            updated_at AS "updatedAt"
       FROM videos
      WHERE ($1 = '' OR title ILIKE $2 OR youtube_id ILIKE $2 OR COALESCE(description, '') ILIKE $2)
      ORDER BY COALESCE(published_at, created_at) DESC`,
    [search, like],
  );
};

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
       featured = EXCLUDED.featured,
       updated_at = now()
     RETURNING id, youtube_id, youtube_id AS "youtubeId", title, description, thumbnail_url AS "thumbnailUrl", video_url AS "videoUrl", published_at AS "publishedAt", featured, created_at AS "createdAt", updated_at AS "updatedAt"`,
    [youtube_id, title, description, thumbnail_url, video_url, published_at, featured],
  );

exports.delete = (id) =>
  pool.query('DELETE FROM videos WHERE id = $1 RETURNING id', [id]);
