const express = require("express");
const { body } = require("express-validator");
const blogController = require("../controllers/blogController");
const { requireAuth, requireRole } = require("../middleware/auth");

const router = express.Router();

const blogValidators = [
  body("slug").trim().notEmpty().withMessage("Slug is required"),
  body("title").trim().notEmpty().withMessage("Title is required"),
  body("tag").trim().notEmpty().withMessage("Category/tag is required"),
  body("date").isISO8601().withMessage("Valid date is required"),
  body("excerpt").trim().notEmpty().withMessage("Excerpt is required"),
  body("content").trim().notEmpty().withMessage("Content is required"),
  body("read_time").isInt({ min: 1 }).withMessage("Read time must be an integer in minutes"),
  body("status").optional().isIn(["draft", "published"]).withMessage("Status must be draft or published"),
  body("cover_image").optional({ nullable: true, checkFalsy: true }).isURL().withMessage("Cover image must be a valid URL"),
  body("seo_title").optional({ nullable: true, checkFalsy: true }).isLength({ max: 70 }).withMessage("SEO title should be under 70 characters"),
  body("seo_description").optional({ nullable: true, checkFalsy: true }).isLength({ max: 170 }).withMessage("SEO description should be under 170 characters"),
  body("scheduled_at").optional({ nullable: true, checkFalsy: true }).isISO8601().withMessage("Schedule date must be valid"),
  body("featured").optional().isBoolean().withMessage("Featured must be true or false"),
];

router.get("/posts", blogController.getPosts);
router.get("/admin/posts", requireAuth, requireRole("admin"), blogController.getAdminPosts);
router.get("/posts/:slug", blogController.getPostBySlug);
router.post("/posts/:slug/like", blogController.likePost);
router.post("/posts", requireAuth, requireRole("admin"), blogValidators, blogController.createPost);
router.put("/posts/:id", requireAuth, requireRole("admin"), blogValidators, blogController.updatePost);
router.delete("/posts/:id", requireAuth, requireRole("admin"), blogController.deletePost);

module.exports = router;
