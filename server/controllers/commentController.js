const Comment = require("../models/Comment");

// Add Comment
const addComment = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        message: "Comment is required",
      });
    }

    const comment = await Comment.create({
      text,
      blog: req.params.blogId,
      user: req.user._id,
    });

    return res.status(201).json({
      message: "Comment Added Successfully",
      comment,
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Get Comments of a Blog
const getComments = async (req, res) => {
  try {

    const comments = await Comment.find({
      blog: req.params.blogId,
    }).populate("user", "name");

    return res.status(200).json(comments);

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Comment
const deleteComment = async (req, res) => {
  try {

    const comment = await Comment.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    await Comment.deleteOne({
      _id: req.params.id,
    });

    return res.status(200).json({
      message: "Comment Deleted Successfully",
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addComment,
  getComments,
  deleteComment,
};