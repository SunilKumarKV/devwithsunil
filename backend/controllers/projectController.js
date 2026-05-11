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
      github_url,
      live_url,
      featured,
    });

    return res.status(201).json({ status: 'success', data: result.rows[0] });
  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).json({ status: 'error', message: 'Project slug already exists' });
    }
    next(err);
  }
};
