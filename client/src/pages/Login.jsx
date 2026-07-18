import "../styles/Login.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.user.id);
      alert("Login Successful!");

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      alert("Invalid Email or Password");
    }
  };

  return (
    <div className="login-container">

      <div className="login-card">

        <h1>Blog Platform</h1>

        <p>Welcome Back 👋</p>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">
            Login
          </button>

        </form>

        <Link to="/register">
          Don't have an account? Register
        </Link>

      </div>

    </div>
  );
}

export default Login;