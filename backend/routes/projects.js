const express = require('express');
const { body } = require('express-validator');
const projectController = require('../controllers/projectController');
const { requireAuth, requireRole } = require('../middleware/auth');

const router = express.Router();
const requireAdmin = [requireAuth, requireRole('admin')];

router.get('/', projectController.getProjects);
router.get('/admin/all', requireAdmin, projectController.getAdminProjects);

router.post(
  '/',
  requireAdmin,
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('slug').trim().matches(/^[a-zA-Z0-9_-]+$/).withMessage('Slug can only contain letters, numbers, hyphens, and underscores'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('tech_stack').optional().isArray().withMessage('Tech stack must be an array'),
    body('github_url').optional({ nullable: true, checkFalsy: true }).isURL().withMessage('GitHub URL must be valid'),
    body('live_url').optional({ nullable: true, checkFalsy: true }).isURL().withMessage('Live URL must be valid'),
    body('featured').optional().isBoolean().withMessage('Featured must be true or false'),
  ],
  projectController.createProject,
);

router.delete('/:id', requireAdmin, projectController.deleteProject);

module.exports = router;
