import { useEffect, useState } from "react";
import API from "../services/api";
import BlogCard from "./BlogCard";

function BlogList({ refresh }) {

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, [refresh]);

  const fetchBlogs = async () => {
    try {
      const response = await API.get("/blogs");

      setBlogs(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>

      {blogs.map((blog) => (
        <BlogCard
          key={blog._id}
          blog={blog}
        />
      ))}

    </div>
  );
}

export default BlogList;