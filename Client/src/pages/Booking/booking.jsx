import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../services/api";
import "./booking.css";

const Booking = () => {
  const { carId } = useParams();
  const navigate = useNavigate();

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  const [booking, setBooking] = useState({
    pickupDate: "",
    pickupTime: "",
    dropDate: "",
    dropTime: "",
  });

  const [totalDays, setTotalDays] = useState(0);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await API.get(`/cars/${carId}`);
        setCar(res.data);
      } catch (error) {
        console.error("Car not found", error);
        setCar(null);
      } finally {
        setLoading(false);
      }
    };
    fetchCar();
  }, [carId]);

  useEffect(() => {
    if (booking.pickupDate && booking.dropDate) {
      const start = new Date(booking.pickupDate);
      const end = new Date(booking.dropDate);
      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      setTotalDays(days > 0 ? days : 0);
    }
  }, [booking.pickupDate, booking.dropDate]);

  const handleChange = (e) => {
    setBooking({ ...booking, [e.target.name]: e.target.value });
  };

const token = localStorage.getItem("token"); 

const handleConfirmBooking = async () => {
  if (!booking.pickupDate || !booking.pickupTime || !booking.dropDate || !booking.dropTime) {
    return alert("Fill all booking details");
  }

  try {
    const res = await API.post("/booking",
      { carId, ...booking },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    navigate(`/confirm-booking/${res.data.booking._id}`);
  } catch (error) {
    alert(error.response?.data?.message || "Booking failed");
  }
};


  if (loading) return <p className="center">Loading...</p>;
  if (!car) return <p className="center">Car not found</p>;

  return (
    <div className="booking-container">
      <div className="booking-card">
        <img
          src={`http://localhost:5000/${car.image}`}
          alt={car.carName}
          className="booking-image"
        />

        <div className="booking-info">
          <h2>{car.carName}</h2>
          <p>₹{car.rent} / day</p>

          <div className="booking-form">
            <input type="date" name="pickupDate" onChange={handleChange} />
            <input type="time" name="pickupTime" onChange={handleChange} />
            <input type="date" name="dropDate" onChange={handleChange} />
            <input type="time" name="dropTime" onChange={handleChange} />

            <p>Total Days: <strong>{totalDays}</strong></p>
            <p>Total Price: <strong>₹{totalDays * car.rent}</strong></p>

            <button className="book-btn" onClick={handleConfirmBooking}>
              Confirm Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
