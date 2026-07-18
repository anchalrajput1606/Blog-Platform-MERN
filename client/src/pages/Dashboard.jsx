import { useState } from "react";
import Navbar from "../components/Navbar";
import BlogForm from "../components/BlogForm";
import BlogList from "../components/BlogList";

function Dashboard() {
  const [refresh, setRefresh] = useState(false);

  return (
    <>
      <Navbar />

      <div className="dashboard">
        <BlogForm
          refresh={refresh}
          setRefresh={setRefresh}
        />

        <BlogList
          refresh={refresh}
        />
      </div>
    </>
  );
}

export default Dashboard;