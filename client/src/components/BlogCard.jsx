import "../styles/BlogCard.css";
import CommentSection from "./CommentSection";
function BlogCard({ blog, onEdit, onDelete, onLike }) {
    const userId = localStorage.getItem("userId");
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

        <button onClick={() => onDelete(blog._id)}>
            Delete
        </button>

        <button onClick={() => onLike(blog._id)}>
        ❤️ Like
        </button>
        <CommentSection blogId={blog._id} />

    </div>
  );
}

export default BlogCard;