import { useEffect, useState } from "react";
import API from "../services/api";
import BlogCard from "./BlogCard";

function BlogList({ refresh, setRefresh, setEditingBlog }) {

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, [refresh]);

  const fetchBlogs = async () => {
    try {
      const response = await API.get("/blogs");

      setBlogs(response.data);

    } 
    catch (error) {
      console.log(error);
    }
  };

  const deleteBlog = async (id) => {
    try {

      await API.delete(`/blogs/${id}`);

        alert("Blog Deleted Successfully!");

        fetchBlogs();

    } 
      catch (error) {

        console.log(error);
        alert("Error deleting blog");

      }
    
  };

  const likeBlog = async (id) => {
    try {

      await API.put(`/blogs/${id}/like`);

      fetchBlogs();

    } catch (error) {

      console.log(error);

      alert("Error liking blog");

    }
  };

  return (
    <div>

      {blogs.map((blog) => (
        <BlogCard
          key={blog._id}
          blog={blog}
          onEdit={() => setEditingBlog(blog)}
          onDelete={deleteBlog}
          onLike={likeBlog}
        />
      ))}

    </div>
  );
}

export default BlogList;