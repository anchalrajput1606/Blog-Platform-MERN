function BlogCard({ blog, onEdit }) {
  return (
    <div className="blog-card">

      <h2>{blog.title}</h2>

      <p>{blog.content}</p>

      <p>
        By <strong>{blog.author?.name}</strong>
      </p>

      <p>❤️ {blog.likes?.length || 0} Likes</p>

      <button>Read More</button>
      <button onClick={onEdit}>
            Edit
        </button>

    </div>
  );
}

export default BlogCard;