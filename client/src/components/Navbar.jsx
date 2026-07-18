import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    navigate("/login");
  };

  return (
    <nav className="navbar">

      <h2>📝 Blog Platform</h2>

      <button onClick={logout}>
        Logout
      </button>

    </nav>
  );
}

export default Navbar;