const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  addComment,
  getComments,
  deleteComment,
} = require("../controllers/commentController");

// Add Comment
router.post("/:blogId", protect, addComment);

// Get Comments
router.get("/:blogId", getComments);

// Delete Comment
router.delete("/:id", protect, deleteComment);

module.exports = router;