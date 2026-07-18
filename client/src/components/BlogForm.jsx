import { useState } from "react";
import API from "../services/api";

function BlogForm({ refresh, setRefresh }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/blogs", {
        title,
        content,
        image: "",
      });

      

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
          Publish Blog
        </button>

      </form>

    </div>
  );
}

export default BlogForm;