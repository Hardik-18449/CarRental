import React, { useState } from "react";
import "./Admin.css";

const Admin = () => {
  // Mock car data
  const [cars, setCars] = useState([
    { id: 1, name: "Honda City", price: "$50/day" },
    { id: 2, name: "Toyota Fortuner", price: "$100/day" },
  ]);

  // Mock bookings data
  const [bookings] = useState([
    {
      id: "b1",
      user: "Hardik Bhayre",
      carName: "Honda City",
      pickupDate: "2026-02-05",
      returnDate: "2026-02-07",
      amount: "$120",
      status: "Confirmed",
    },
    {
      id: "b2",
      user: "Rahul Sharma",
      carName: "Toyota Fortuner",
      pickupDate: "2026-01-20",
      returnDate: "2026-01-23",
      amount: "$300",
      status: "Completed",
    },
  ]);

  // State for new car form
  const [newCar, setNewCar] = useState({ name: "", price: "" });

  const handleAddCar = (e) => {
    e.preventDefault();
    if (newCar.name && newCar.price) {
      setCars([...cars, { id: Date.now(), ...newCar }]);
      setNewCar({ name: "", price: "" });
      alert("Car added successfully!");
    }
  };

  return (
    <div className="admin-panel">
      <h1>Admin Dashboard</h1>

      {/* Add Car Form */}
      <div className="add-car">
        <h2>Add New Car</h2>
        <form onSubmit={handleAddCar}>
          <input
            type="text"
            placeholder="Car Name"
            value={newCar.name}
            onChange={(e) => setNewCar({ ...newCar, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Price per day"
            value={newCar.price}
            onChange={(e) => setNewCar({ ...newCar, price: e.target.value })}
          />
          <button type="submit">Add Car</button>
        </form>
      </div>
      <div className="cars-list">
        <h2>Available Cars</h2>
        <table>
          <thead>
            <tr>
              <th>Car Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr key={car.id}>
                <td>{car.name}</td>
                <td>{car.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bookings-list">
        <h2>All Bookings</h2>
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Car</th>
              <th>Pickup</th>
              <th>Return</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id}>
                <td>{b.user}</td>
                <td>{b.carName}</td>
                <td>{b.pickupDate}</td>
                <td>{b.returnDate}</td>
                <td>{b.amount}</td>
                <td className={`status ${b.status.toLowerCase()}`}>{b.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
