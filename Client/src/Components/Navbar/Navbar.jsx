import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { AuthContext } from "../../context/authContext";
import "./Navbar.css";

const Navbar = () => {
  const { isAuthenticated, role, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
   

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <img src="logo.svg" alt="logo" />
        </div>

        <div className="desktop-menu">
          <Link to="/home">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="navbar-right">
          {!isAuthenticated ? (
            <button onClick={() => navigate("/login")} className="login-btn">
              Login
            </button>
          ) : (
            <>
              <FaUserCircle
                size={28}
                onClick={() =>
                  navigate(role === "admin" ? "/admin" : "/user")
                }
                className="user-icon"
              />
              <button onClick={logout} className="logout-btn">
                Logout
              </button>
            </>
          )}
        </div>

        <button
          className="mobile-menu-btn"
          onClick={() => navigate("/menu")} 
        >
          <IoMenu size={26} />
        </button>
      </div>

      {open && (
        <div className="mobile-menu">
          <Link to="/home">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          {!isAuthenticated ? (
            <button
              onClick={() => navigate("/login")}
              className="mobile-login-btn"
            >
              Login
            </button>
          ) : (
            <span
              onClick={() =>
                navigate(role === "admin" ? "/admin" : "/user")
              }
              style={{ cursor: "pointer" }}
            >
              <FaUserCircle size={26} />
            </span>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
