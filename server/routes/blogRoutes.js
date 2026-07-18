const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  likeUnlikeBlog,
} = require("../controllers/blogController");

// Create Blog
router.post("/", protect, createBlog);

// Get All Blogs
router.get("/", getBlogs);

// Get Single Blog
router.get("/:id", getBlogById);

// Update Blog
router.put("/:id", protect, updateBlog);

// Delete Blog
router.delete("/:id", protect, deleteBlog);

// Like/Unlike Blog
router.put("/:id/like", protect, likeUnlikeBlog);

module.exports = router;