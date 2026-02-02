import { IoClose } from "react-icons/io5";
import "./menu.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const MobileMenu = () => {
  const navigate = useNavigate();

  const [state, setState] = useState("closed"); // closed | open | closing

  useEffect(() => {
    // allow browser to paint first, then open
    requestAnimationFrame(() => {
      setState("open");
    });
  }, []);

  const closeMenu = () => {
    setState("closing");

    setTimeout(() => {
      if (window.history.length > 1) {
        navigate(-1);
      } else {
        navigate("/");
      }
    }, 300);
  };

  return (
    <div className={`mobile-menu ${state}`}>
      <button className="close-btn" onClick={closeMenu}>
        <IoClose size={28} />
      </button>

      <ul className="menu-links">
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
        <li><a href="/login">Login</a></li>
      </ul>
    </div>
  );
};

export default MobileMenu;
