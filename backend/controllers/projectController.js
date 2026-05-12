const { validationResult } = require('express-validator');
const xss = require('xss');
const projectModel = require('../models/projectModel');

exports.getProjects = async (req, res, next) => {
  try {
    const result = await projectModel.findFeatured();
    return res.json({ projects: result.rows });
  } catch (err) {
    next(err);
  }
};

exports.getAdminProjects = async (req, res, next) => {
  try {
    const result = await projectModel.findAllForAdmin({ search: req.query.search || '' });
    return res.json({ status: 'success', data: result.rows });
  } catch (err) {
    next(err);
  }
};

exports.createProject = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: 'error', message: 'Validation failed', errors: errors.array() });
    }

    const { title, slug, description, tech_stack = [], github_url = null, live_url = null, featured = true } = req.body;
    const result = await projectModel.create({
      title: xss(title),
      slug,
      description: xss(description),
      tech_stack,
      github_url: github_url || null,
      live_url: live_url || null,
      featured: Boolean(featured),
    });

    return res.status(201).json({ status: 'success', data: result.rows[0] });
  } catch (err) {
    next(err);
  }
};

exports.deleteProject = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) return res.status(400).json({ status: 'error', message: 'Invalid project ID' });
    const result = await projectModel.delete(id);
    if (!result.rows.length) return res.status(404).json({ status: 'error', message: 'Project not found' });
    return res.json({ status: 'success', message: 'Project deleted' });
  } catch (err) {
    next(err);
  }
};
