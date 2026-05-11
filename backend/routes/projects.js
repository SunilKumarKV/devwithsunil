const express = require('express');
const { body } = require('express-validator');
const projectController = require('../controllers/projectController');
const { requireAuth, requireRole } = require('../middleware/auth');

const router = express.Router();

router.get('/', projectController.getProjects);

router.post(
  '/',
  requireAuth,
  requireRole('admin'),
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('slug').trim().matches(/^[a-zA-Z0-9_-]+$/).withMessage('Slug can only contain letters, numbers, hyphens, and underscores'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('tech_stack').optional().isArray().withMessage('Tech stack must be an array'),
    body('github_url').optional({ nullable: true }).isURL().withMessage('GitHub URL must be valid'),
    body('live_url').optional({ nullable: true }).isURL().withMessage('Live URL must be valid'),
    body('featured').optional().isBoolean().withMessage('Featured must be true or false'),
  ],
  projectController.createProject,
);

module.exports = router;
