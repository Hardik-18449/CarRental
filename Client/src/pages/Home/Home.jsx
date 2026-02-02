import React, { useRef } from "react";
import "./HomePage.css";
import MainCar from "../../assets/main_car.png";
import car1 from "../../assets/car_image1.png";
import car2 from "../../assets/car_image2.png";
import car3 from "../../assets/car_image3.png";
import car4 from "../../assets/car_image4.png";

const HomePage = () => {
  const fleetRef = useRef(null);

  const scrollToFleet = () => {
    fleetRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      {/* HERO SECTION */}
      <section
        className="hero"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${MainCar})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="hero-content">
          <h1>Rent Your Dream Car Today</h1>
          <p>Affordable, fast, and reliable car rentals for every occasion.</p>
          <button className="cta-btn" onClick={scrollToFleet}>
            Book Now
          </button>
        </div>
      </section>

      {/* OUR FLEET SECTION */}
      <section className="gallery" ref={fleetRef}>
        <h2>Our Fleet</h2>

        <div className="gallery-grid">
          <div className="car-card">
            <img src={car1} alt="Car 1" />
            <div className="car-details">
              <h3>Toyota Corolla</h3>
              <p>Seats: 5 | Automatic | $40/day</p>
            </div>
          </div>

          <div className="car-card">
            <img src={car2} alt="Car 2" />
            <div className="car-details">
              <h3>Honda Civic</h3>
              <p>Seats: 5 | Manual | $38/day</p>
            </div>
          </div>

          <div className="car-card">
            <img src={car3} alt="Car 3" />
            <div className="car-details">
              <h3>Ford Mustang</h3>
              <p>Seats: 4 | Automatic | $70/day</p>
            </div>
          </div>

          <div className="car-card">
            <img src={car4} alt="Car 4" />
            <div className="car-details">
              <h3>Chevrolet Camaro</h3>
              <p>Seats: 4 | Manual | $65/day</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
