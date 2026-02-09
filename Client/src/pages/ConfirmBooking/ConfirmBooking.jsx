import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import API from "../../services/api";
import { jsPDF } from "jspdf";
import "./ConfirmBooking.css";

const ConfirmBooking = () => {
  const { bookingId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const { totalDays, totalPrice } = location.state || {};

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get(`/booking/${bookingId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBooking(res.data);
      } catch (err) {
        console.error("Failed to fetch booking", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBooking();
  }, [bookingId]);

  const handleDownloadPDF = () => {
    if (!booking) return;

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Car Rental Booking Invoice", 20, 20);

    doc.setFontSize(12);
    doc.text(`Booking ID: ${booking._id}`, 20, 40);
    doc.text(`User Name: ${booking.user?.name}`, 20, 50);
    doc.text(`Email: ${booking.user?.email}`, 20, 60);

    doc.text("Car Details:", 20, 80);
    doc.text(`Name: ${booking.car.carName}`, 20, 90);
    doc.text(`Car No: ${booking.car.carNo}`, 20, 100);
    doc.text(`Rent per day: ₹${booking.car.rent}`, 20, 110);

    doc.text("Booking Details:", 20, 130);
    doc.text(`Pickup: ${booking.pickupDate} at ${booking.pickupTime}`, 20, 140);
    doc.text(`Drop: ${booking.dropDate} at ${booking.dropTime}`, 20, 150);

    doc.save(`Invoice_${booking._id}.pdf`);
  };

  if (loading) return <p className="center">Loading...</p>;
  if (!booking) return <p className="center">Booking not found</p>;

  return (
    <div className="invoice-container">
      <h2>Booking Invoice</h2>
      <p><strong>Booking ID:</strong> {booking._id}</p>
      <p><strong>User Name:</strong> {booking.user?.name}</p>
      <p><strong>Email:</strong> {booking.user?.email}</p>

      <h3>Car Details</h3>
      <p><strong>Name:</strong> {booking.car.carName}</p>
      <p><strong>Car No:</strong> {booking.car.carNo}</p>
      <p><strong>Rent per day:</strong> ₹{booking.car.rent}</p>

      <h3>Booking Details</h3>
      <p><strong>Pickup:</strong> {booking.pickupDate} at {booking.pickupTime}</p>
      <p><strong>Drop:</strong> {booking.dropDate} at {booking.dropTime}</p>
      {/* <p><strong>Total Days:</strong> {totalDays || 0}</p>
      <p><strong>Total Price:</strong> ₹{totalPrice || booking.totalPrice}</p> */}

      <button className="download-btn" onClick={handleDownloadPDF}>
        Download PDF
      </button>
    </div>
  );
};

export default ConfirmBooking;
