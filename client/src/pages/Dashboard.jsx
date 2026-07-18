import { useState } from "react";
import Navbar from "../components/Navbar";
import BlogForm from "../components/BlogForm";
import BlogList from "../components/BlogList";

function Dashboard() {

  const [refresh, setRefresh] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);

  return (
    <>
      <Navbar />

      <div className="dashboard">

        <BlogForm
          refresh={refresh}
          setRefresh={setRefresh}
          editingBlog={editingBlog}
          setEditingBlog={setEditingBlog}
        />

        <BlogList
          refresh={refresh}
          setRefresh={setRefresh}
          setEditingBlog={setEditingBlog}
        />

      </div>
    </>
  );
}

export default Dashboard;