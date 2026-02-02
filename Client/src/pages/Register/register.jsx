import React, { useState } from "react";
import "./register.css";
import { useNavigate } from "react-router-dom";
import API from "../../services/api"; // Use this for API calls

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Navigate to login page
  const gotoLogin = () => {
    navigate("/login");
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/register", formData);
      alert(res.data.message || "Registration successful");
      navigate("/login"); // Redirect to login after successful registration
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="register-page">
      <div className="auth-container">
        <h2>CarRental</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
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

          <p className="auth-footer">
            Already registered?{" "}
            <span className="login-link" onClick={gotoLogin}>
              Login
            </span>
          </p>

          <button type="submit" className="auth-btn">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
