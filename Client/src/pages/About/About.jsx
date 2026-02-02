import React from "react";
import "./About.css";
import landing1 from "../../assets/landing1.jpg"
import BookingImg from "../../assets/Booking.jpg";
import SafetyImg from "../../assets/Safety1.jpg";
import Supports from "../../assets/Supports.jpg";

const About = () => {
  return (
    <div className="about-page">
      <section className="about-hero">
        <img src={landing1} alt="About CarRental" />
        <div className="about-hero-text">
          <h1>About CarRental</h1>
          <p>
            CarRental is a modern car rental platform designed to make
            transportation simple, affordable, and reliable for everyone.
          </p>
        </div>
      </section>

      <section className="about-section">
        <h2>Who We Are</h2>
        <p>
          CarRental is a customer-focused car rental service that aims to
          simplify the way people rent vehicles. Our platform allows users
          to browse available cars, compare prices, and book vehicles within
          minutes. We focus on transparency, affordability, and user safety.
        </p>
        <p>
          Whether you are planning a family trip, a business journey, or
          simply need a car for daily use, CarRental provides flexible
          rental options to meet your needs.
        </p>
      </section>

   
      <section className="about-section image-left">
        <img src={Supports} alt="Car Fleet" />
        <div>
          <h2>Our Vehicle Fleet</h2>
          <p>
            We offer a wide range of vehicles including hatchbacks, sedans,
            SUVs, and luxury cars. All vehicles are regularly serviced and
            maintained to ensure comfort and safety.
          </p>
          <p>
            Each car comes with complete documentation, insurance coverage,
            and quality checks before every rental.
          </p>
        </div>
      </section>

      {/* Booking Process */}
      <section className="about-section image-right">
        <div>
          <h2>Easy Booking Process</h2>
          <p>
            Our platform is designed with simplicity in mind. Users can
            register, log in, select a car, choose rental duration, and
            confirm bookings seamlessly.
          </p>
          <p>
            The system provides real-time availability and transparent
            pricing with no hidden charges.
          </p>
        </div>
        <img src={BookingImg} alt="Easy Booking" />
      </section>

      {/* Safety */}
      <section className="about-section image-left">
        <img src={SafetyImg} alt="Safety First" />
        <div>
          <h2>Safety & Security</h2>
          <p>
            User safety is our top priority. All vehicles are sanitized,
            inspected, and equipped with safety features.
          </p>
          <p>
            We also ensure secure authentication, data protection, and
            privacy for all registered users.
          </p>
        </div>
      </section>

      {/* Customer Support */}
      <section className="about-section image-right">
        <div>
          <h2>24/7 Customer Support</h2>
          <p>
            Our dedicated support team is available around the clock to
            assist users with bookings, payments, and vehicle-related
            queries.
          </p>
          <p>
            We believe in building long-term relationships by offering
            reliable service and quick issue resolution.
          </p>
        </div>
        <img src={Supports} alt="Customer Support" />
      </section>

      {/* Mission & Vision */}
      <section className="about-section mission">
        <h2>Our Mission & Vision</h2>
        <p>
          <strong>Mission:</strong> To provide affordable, reliable, and
          user-friendly car rental services using modern web technologies.
        </p>
        <p>
          <strong>Vision:</strong> To become a trusted and scalable car
          rental platform that enhances mobility and convenience for users.
        </p>
      </section>

    </div>
  );
};

export default About;
