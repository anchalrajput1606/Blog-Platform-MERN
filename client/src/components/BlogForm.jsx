import "../styles/BlogForm.css";
import { useState, useEffect } from "react";
import API from "../services/api";

function BlogForm({ refresh, setRefresh, editingBlog, setEditingBlog }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (editingBlog) {
      setTitle(editingBlog.title);
      setContent(editingBlog.content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [editingBlog]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingBlog) {

            await API.put(`/blogs/${editingBlog._id}`, {
                title,
                content,
            });

            alert("Blog Updated Successfully!");

            setEditingBlog(null);

            } else {

            await API.post("/blogs", {
                title,
                content,
                image: "",
            });

            

        }

      

      setTitle("");
      setContent("");
      setRefresh(!refresh);

      alert("Blog Created Successfully!");
      
    } catch (error) {
      console.log(error);
      alert("Error creating blog");
    }
  };

  return (
    <div className="blog-form">

      <h2>Create Blog</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Enter Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Write your blog..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button type="submit">
            {editingBlog ? "Update Blog" : "Publish Blog"}
        </button>

      </form>

    </div>
  );
}

export default BlogForm;