import React from 'react';

import ProtectedRoute from './routes/ProtectedRoutes';
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
import Booking from './pages/Booking/booking';
import ConfirmBooking from "./pages/ConfirmBooking/ConfirmBooking";





const App = () => {
  
  return (
    <div>   <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home/>} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} /> 
         <Route path="/register" element={<Register/>}/>        
         <Route path="/login" element={<Login/>}/>        
        <Route path="/booking/:carId" element={<ProtectedRoute allowedRole={"user"}><Booking/></ProtectedRoute>} /> 
       <Route path="/confirm-booking/:bookingId" element={<ProtectedRoute allowedRole="user"><ConfirmBooking /></ProtectedRoute>}/>
       <Route path="/admin"element={<ProtectedRoute allowedRole="admin"><Admin /></ProtectedRoute>}/>
       <Route path="/user"element={<ProtectedRoute allowedRole="user"><User /></ProtectedRoute>}/>   
       <Route path="/menu" element={<Menu/>}/>        
      <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
       <Footer/>

    </div>
  );
}

export default App;




