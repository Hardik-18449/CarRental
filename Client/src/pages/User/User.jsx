import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const User = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "Hardik Bhayre",
    email: "hardik@example.com",
    _id: "1234567890abcdef",
  });

  const [bookings] = useState([
    {
      id: "1",
      carName: "Honda City",
      pickupDate: "2026-02-05",
      returnDate: "2026-02-07",
      amount: "$120",
      status: "Confirmed",
    },
    {
      id: "2",
      carName: "Toyota Fortuner",
      pickupDate: "2026-01-20",
      returnDate: "2026-01-23",
      amount: "$300",
      status: "Completed",
    },
    {
      id: "3",
      carName: "Maruti Swift",
      pickupDate: "2026-01-10",
      returnDate: "2026-01-12",
      amount: "$80",
      status: "Cancelled",
    },
  ]);

  const handleLogout = () => {
  localStorage.removeItem("token");
  window.dispatchEvent(new Event("authChange"));
  navigate("/login");
};

  if (!user) {
    return (
      <div style={styles.center}>
        <div style={styles.card}>
          <h2>No user logged in</h2>
          <p>Please login to access your panel.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.center}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2>Welcome, {user.name} </h2>
          <button onClick={handleLogout} style={styles.logoutBtn}>
            Logout
          </button>
        </div>

        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>User ID:</strong> {user._id}</p>

        <h3 style={{ marginTop: "20px" }}>Your Bookings</h3>

        <table style={styles.table}>
          <thead>
            <tr>
              <th>Car Name</th>
              <th>Pickup Date</th>
              <th>Return Date</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings
              .sort((a, b) => new Date(b.pickupDate) - new Date(a.pickupDate))
              .map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.carName}</td>
                  <td>{booking.pickupDate}</td>
                  <td>{booking.returnDate}</td>
                  <td>{booking.amount}</td>
                  <td
                    style={{
                      fontWeight: "600",
                      color:
                        booking.status === "Confirmed"
                          ? "green"
                          : booking.status === "Completed"
                          ? "blue"
                          : "red",
                    }}
                  >
                    {booking.status}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  center: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f6f8",
  },
  card: {
    background: "#fff",
    padding: "25px",
    borderRadius: "12px",
    width: "90%",
    maxWidth: "900px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logoutBtn: {
    background: "#ff4d4f",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "15px",
  },
};

export default User;
