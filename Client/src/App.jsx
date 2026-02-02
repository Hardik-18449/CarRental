import React from 'react';

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from './Components/Navbar/Navbar';
import Home from './pages/Home/Home';
import LandingPage from './pages/LandingPage/landing';
import Register from './pages/Register/register';
import Footer from './Components/Footer/Footer';
import Login from './pages/Login/Login';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import User from './pages/User/User';
import Admin from './pages/AdminPanel/Admin';
import Menu from './pages/MobileMenu/menu';

const PrivateRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!token) return <Navigate to="/login" />;
  if (role && userRole !== role) return <Navigate to="/login" />;

  return children;
};

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} /> 
         <Route path="/register" element={<Register/>}/>        
         <Route path="/login" element={<Login/>}/>        
        <Route path="/admin"element={<PrivateRoute role="admin"> <Admin /> </PrivateRoute> }/>      
        <Route path="/user"element={<PrivateRoute role="user"> <User /> </PrivateRoute> }/>      
         <Route path="/menu" element={<Menu/>}/>        
         <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
       <Footer/>

    </div>
  );
}

export default App;



