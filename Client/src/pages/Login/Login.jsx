import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(""); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await API.post("/auth/login", formData);
    console.log("Login Success:", res.data);

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", res.data.user.role);

    window.dispatchEvent(new Event("authChange"));

    alert(res.data.message || "Login successful");

   
    if (res.data.user.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/user");
    }
  } catch (err) {
    console.error(err);
    setError(err.response?.data?.message || "Login failed");
  }
};


  return (
    <div className="login-page">
      <div className="auth-container">
        <h2>Login</h2>

        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {error && <p className="error-msg">{error}</p>}

          <p className="auth-footer">
            Don’t have an account?{" "}
            <span
              className="login-link"
              onClick={() => navigate("/register")}
            >
              Register
            </span>
          </p>

          <button type="submit" className="auth-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
