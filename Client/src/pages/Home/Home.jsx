import React, { useEffect, useRef, useState } from "react";
import "./HomePage.css";
import MainCar from "../../assets/main_car.png";
import { Link } from "react-router-dom";
import API from "../../services/api";

const HomePage = () => {
  const fleetRef = useRef(null);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  const scrollToFleet = () => {
    fleetRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
  const fetchCars = async () => {
    try {
      const res = await API.get("/cars"); 
      setCars(res.data.cars);           
    } catch (error) {
      console.error("Failed to fetch cars", error);
    } finally {
      setLoading(false);
    }
  };

  fetchCars();
}, []);


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

        {loading ? (
          <p style={{ textAlign: "center" }}>Loading cars...</p>
        ) : cars.length === 0 ? (
          <p style={{ textAlign: "center" }}>No cars available</p>
        ) : (
         <div className="gallery-grid">
  {cars.map((car) => (
    <div className="car-card" key={car._id}>
      <img
        src={`http://localhost:5000/${car.image}`}
        alt={car.carName}
      />

      <div className="car-details">
  <Link to={`/booking/${car._id}`}>
  <h3>{car.carName}</h3>
</Link>



        <p>
          Seats: {car.seats} | ₹{car.rent} / day
        </p>
      </div>
    </div>
  ))}
</div>

        )}
      </section>
    </div>
  );
};

export default HomePage;

