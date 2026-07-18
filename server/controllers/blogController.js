const Blog = require("../models/Blog");

// Create Blog
const createBlog = async (req, res) => {
  try {
    const { title, content, image } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: "Title and Content are required",
      });
    }

    const blog = await Blog.create({
      title,
      content,
      image,
      author: req.user._id,
    });

    return res.status(201).json({
      message: "Blog Created Successfully",
      blog,
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Blogs
const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate("author", "_id name email")
      .sort({ createdAt: -1 });

    return res.status(200).json(blogs);

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Get Single Blog
const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate("author", "_id name email")

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    return res.status(200).json(blog);

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Update Blog
const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findOne({
      _id: req.params.id,
      author: req.user._id,
    });

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    blog.title = req.body.title || blog.title;
    blog.content = req.body.content || blog.content;
    blog.image = req.body.image || blog.image;

    const updatedBlog = await blog.save();

    return res.status(200).json({
      message: "Blog Updated Successfully",
      blog: updatedBlog,
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Blog
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findOne({
      _id: req.params.id,
      author: req.user._id,
    });

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    await Blog.deleteOne({
      _id: req.params.id,
    });

    return res.status(200).json({
      message: "Blog Deleted Successfully",
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const likeUnlikeBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    const alreadyLiked = blog.likes.includes(req.user._id);

    if (alreadyLiked) {
      blog.likes.pull(req.user._id);

      await blog.save();

      return res.status(200).json({
        message: "Blog Unliked",
        likes: blog.likes.length,
      });
    }

    blog.likes.push(req.user._id);

    await blog.save();

    return res.status(200).json({
      message: "Blog Liked",
      likes: blog.likes.length,
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  likeUnlikeBlog,
};