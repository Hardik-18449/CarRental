import React from "react";
import "./LandingPage.css";
import landing1 from "../../assets/landing1.jpg"
import landing2 from "../../assets/landing2.jpg"
import landing3 from "../../assets/landing3.jpg"
import landing4 from "../../assets/landing4.jpg"
import landing5 from "../../assets/landing5.jpg"
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
     
   const navigate = useNavigate();

  const gotoLogin = () => {
    navigate("/register");
  };

  return (
    <div>
      <section
        className="hero"
      >
       <div className="carousel">
        <div className="group">
          <div className="cars-slide"><img src={landing1} alt="" /></div>
          <div className="cars-slide"><img src={landing2} alt="" /></div>
          <div className="cars-slide"><img src={landing3} alt="" /></div>
          <div className="cars-slide"><img src={landing4} alt="" /></div>
          <div className="cars-slide"><img src={landing5} alt="" /></div>
      
        </div>
            <div arial-hidden  className="group">
          <div className="cars-slide"><img src={landing1} alt="" /></div>
          <div className="cars-slide"><img src={landing2} alt="" /></div>
          <div className="cars-slide"><img src={landing3} alt="" /></div>
          <div className="cars-slide"><img src={landing4} alt="" /></div>
          <div className="cars-slide"><img src={landing5} alt="" /></div>
      
        </div>
       </div>
        <div className="hero-content">
          <h1>Welcome to CarRental</h1>
          <p>Rent Cars to make your Journey safe and fast</p>
          <button onClick={gotoLogin} className="cta-btn">Get Started</button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Our Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>High Security</h3>
            <p>All cars are highly secured and well maintained, keeping your journey safe.</p>
          </div>
          <div className="feature-card">
            <h3>Low Cost</h3>
            <p>The pricing for most cars is lower than other service providers.</p>
          </div>
          <div className="feature-card">
            <h3>Flexible</h3>
            <p>The rent for cars will be flexible according to users’ demands.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
