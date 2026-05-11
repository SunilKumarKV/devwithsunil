const express = require('express');
const { body } = require('express-validator');
const videoController = require('../controllers/videoController');
const { requireAuth, requireRole } = require('../middleware/auth');

const router = express.Router();

router.get('/', videoController.getFeaturedVideos);

router.post(
  '/',
  requireAuth,
  requireRole('admin'),
  [
    body('youtube_id').trim().notEmpty().withMessage('YouTube video ID is required'),
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('description').optional({ nullable: true }).isString(),
    body('thumbnail_url').optional({ nullable: true }).isURL().withMessage('Thumbnail URL must be valid'),
    body('video_url').optional({ nullable: true }).isURL().withMessage('Video URL must be valid'),
    body('published_at').optional({ nullable: true }).isISO8601().withMessage('Published date must be valid'),
    body('featured').optional().isBoolean().withMessage('Featured must be true or false'),
  ],
  videoController.createVideo,
);

module.exports = router;
