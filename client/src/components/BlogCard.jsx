function BlogCard({ blog }) {
  return (
    <div className="blog-card">

      <h2>{blog.title}</h2>

      <p>{blog.content}</p>

      <p>
        By <strong>{blog.author?.name}</strong>
      </p>

      <p>❤️ {blog.likes?.length || 0} Likes</p>s

      <button>Read More</button>

    </div>
  );
}

export default BlogCard;