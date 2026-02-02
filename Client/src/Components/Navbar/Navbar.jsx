import React, { useState, useEffect } from "react";

import "./Navbar.css"; 
import car_icon from "../../assets/car_icon.svg"
import { useNavigate } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";


const Navbar = () => {


 const [isLoggedIn, setIsLoggedIn] = useState(false);

useEffect(() => {
  const checkAuth = () => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  };

  checkAuth(); // initial check

  window.addEventListener("storage", checkAuth);
  window.addEventListener("authChange", checkAuth);

  return () => {
    window.removeEventListener("storage", checkAuth);
    window.removeEventListener("authChange", checkAuth);
  };
}, []);

     
  const navigate = useNavigate();
 const gotoLogin = () => {
    navigate("/register");
  };
   
  const openMenu = ()=>{
    navigate ('/menu')
  }
     
    const [open, setOpen] = useState(false);

    return (
        <nav className="navbar">
  <div className="navbar-container">
   
    <div className="navbar-left">
      <img src="logo.svg" alt="logo" />
    </div>

    <div className="desktop-menu">
      <a href="/home">Home</a>
      <a href="/about">About</a>
      <a href="/contact">Contact</a>
    </div>
    <div className="navbar-right">
      {/* <div className="cart">
        <img  className="car_icon" src={car_icon} alt="carIcon" />

      </div> */}
        {!isLoggedIn ? (
  <button onClick={gotoLogin} className="login-btn">Login</button>
) : (
  <FaUserCircle
    size={28}
    onClick={() => navigate("/user")}
    className="user-icon"
  />
)}

    </div>

  
    <button className="mobile-menu-btn" onClick={openMenu}>
            <IoMenu size={26} />
    </button>
  </div>


  {open && (
    <div className="mobile-menu"   >
      <a href="/home">Home</a>
      <a href="/about">About</a>
      <a href="/contact">Contact</a>
      {!isLoggedIn ? (
  <button onClick={gotoLogin} className="mobile-login-btn">Login</button>
) : (
  <span onClick={() => navigate("/user")} style={{ cursor: "pointer" }}>
    <FaUserCircle size={26} />
  </span>
)}
    </div>
  )}
</nav>

    );
};

export default Navbar;
