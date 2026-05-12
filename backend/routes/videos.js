const express = require('express');
const { body } = require('express-validator');
const videoController = require('../controllers/videoController');
const { requireAuth, requireRole } = require('../middleware/auth');

const router = express.Router();
const requireAdmin = [requireAuth, requireRole('admin')];

router.get('/', videoController.getFeaturedVideos);
router.get('/admin/all', requireAdmin, videoController.getAdminVideos);

router.post(
  '/',
  requireAdmin,
  [
    body('youtube_id').trim().notEmpty().withMessage('YouTube video ID is required'),
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('description').optional({ nullable: true }).isString(),
    body('thumbnail_url').optional({ nullable: true }).isURL().withMessage('Thumbnail URL must be valid'),
    body('video_url').optional({ nullable: true }).isURL().withMessage('Video URL must be valid'),
    body('published_at').optional({ nullable: true, checkFalsy: true }).isISO8601().withMessage('Published date must be valid'),
    body('featured').optional().isBoolean().withMessage('Featured must be true or false'),
  ],
  videoController.createVideo,
);

router.delete('/:id', requireAdmin, videoController.deleteVideo);

module.exports = router;
