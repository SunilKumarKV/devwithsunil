const { validationResult } = require("express-validator");
const xss = require("xss");
const blogModel = require("../models/blogModel");

const normalizeTags = (tags) => {
  if (Array.isArray(tags)) return tags.map((tag) => String(tag).trim()).filter(Boolean);
  if (typeof tags === "string") return tags.split(",").map((tag) => tag.trim()).filter(Boolean);
  return [];
};

const validateBody = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ status: "error", message: "Validation failed", errors: errors.array() });
    return false;
  }
  return true;
};

const buildPayload = (body) => {
  const {
    slug,
    title,
    tag,
    tags,
    date,
    excerpt,
    content,
    read_time,
    status = "draft",
    cover_image = null,
    seo_title = null,
    seo_description = null,
    scheduled_at = null,
    featured = false,
  } = body;

  return {
    slug,
    title: xss(title),
    tag: xss(tag),
    tags: normalizeTags(tags).map((tagValue) => xss(tagValue)),
    date,
    excerpt: xss(excerpt),
    content: xss(content),
    read_time: Number(read_time || 3),
    status,
    cover_image: cover_image || null,
    seo_title: seo_title ? xss(seo_title) : null,
    seo_description: seo_description ? xss(seo_description) : null,
    scheduled_at: scheduled_at || null,
    featured: Boolean(featured),
  };
};

exports.getPosts = async (req, res, next) => {
  try {
    const result = await blogModel.findAll({ search: req.query.search || "" });
    return res.json({ posts: result.rows });
  } catch (err) {
    next(err);
  }
};

exports.getAdminPosts = async (req, res, next) => {
  try {
    const result = await blogModel.findAllForAdmin({ search: req.query.search || "", status: req.query.status || "all" });
    return res.json({ status: "success", data: result.rows });
  } catch (err) {
    next(err);
  }
};

exports.getPostBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    if (!/^[a-zA-Z0-9_-]+$/.test(slug)) {
      return res.status(400).json({ status: "error", message: "Invalid slug format" });
    }

    const result = await blogModel.findBySlug(slug);
    if (result.rows.length === 0) {
      return res.status(404).json({ status: "error", message: "Post not found" });
    }

    await blogModel.incrementView(slug).catch(() => null);
    return res.json({ post: { ...result.rows[0], view_count: Number(result.rows[0].view_count || 0) + 1 } });
  } catch (err) {
    next(err);
  }
};

exports.createPost = async (req, res, next) => {
  try {
    if (!validateBody(req, res)) return;
    const payload = buildPayload(req.body);

    if (payload.content.length < 10) return res.status(400).json({ status: "error", message: "Content must be at least 10 characters long" });
    if (payload.content.length > 50000) return res.status(400).json({ status: "error", message: "Content must be less than 50,000 characters" });
    if (!/^[a-zA-Z0-9_-]+$/.test(payload.slug)) return res.status(400).json({ status: "error", message: "Slug can only contain letters, numbers, hyphens, and underscores" });

    const existing = await blogModel.findBySlugAnyStatus(payload.slug);
    if (existing.rows.length) return res.status(409).json({ status: "error", message: "Slug already exists" });

    const result = await blogModel.create(payload);
    return res.status(201).json({ status: "success", data: result.rows[0] });
  } catch (err) {
    next(err);
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    if (!validateBody(req, res)) return;
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) return res.status(400).json({ status: "error", message: "Invalid blog ID" });

    const payload = buildPayload(req.body);
    const existing = await blogModel.findBySlugAnyStatus(payload.slug);
    if (existing.rows.length && Number(existing.rows[0].id) !== id) {
      return res.status(409).json({ status: "error", message: "Slug already exists" });
    }

    const result = await blogModel.update(id, payload);
    if (!result.rows.length) return res.status(404).json({ status: "error", message: "Blog post not found" });
    return res.json({ status: "success", data: result.rows[0] });
  } catch (err) {
    next(err);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) return res.status(400).json({ status: "error", message: "Invalid blog ID" });
    const result = await blogModel.delete(id);
    if (!result.rows.length) return res.status(404).json({ status: "error", message: "Blog post not found" });
    return res.json({ status: "success", message: "Blog post deleted" });
  } catch (err) {
    next(err);
  }
};

exports.likePost = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const result = await blogModel.like(slug);
    if (!result.rows.length) return res.status(404).json({ status: "error", message: "Blog post not found" });
    return res.json({ status: "success", like_count: result.rows[0].like_count });
  } catch (err) {
    next(err);
  }
};
