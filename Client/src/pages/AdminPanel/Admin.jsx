import React, { useState } from "react";
import "./Admin.css";
import API from "../../services/api";


const Admin = () => {
 const [cars, setCars] = useState([]);

const [newCar, setNewCar] = useState({
  carName: "",
  carNo: "",
  rent: "",
  seats: "",
  image: null,
  });

  const handleChange = (e) => {
  setNewCar({ ...newCar, [e.target.name]: e.target.value });
};


  const handleImageChange = (e) => {
    setNewCar({ ...newCar, image: e.target.files[0] });
  };

const handleAddCar = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData();
    formData.append("carName", newCar.carName);
    formData.append("carNo", newCar.carNo);
    formData.append("rent", newCar.rent);
    formData.append("seats", newCar.seats);
    formData.append("image", newCar.image);

    const res = await API.post("/cars", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    alert(res.data.message);
    setCars([...cars, res.data.car]);

    setNewCar({
      carName: "",
      carNo: "",
      rent: "",
      seats: "",
      image: null,
    });
  } catch (error) {
    alert(error.response?.data?.message || "Failed to add car");
  }
};



  return (
    <div className="admin-panel">
      <h1>Admin Dashboard</h1>

      <div className="add-car">
        <h2>Add New Car</h2>

        <form onSubmit={handleAddCar}>
  <input
    type="text"
    name="carName"
    placeholder="Car Name"
    value={newCar.carName}
    onChange={handleChange}
    required
  />

  <input
    type="text"
    name="carNo"
    placeholder="Car Number"
    value={newCar.carNo}
    onChange={handleChange}
    required
  />

  <input
    type="number"
    name="rent"
    placeholder="Rent per day"
    value={newCar.rent}
    onChange={handleChange}
    required
  />

  <input
    type="number"
    name="seats"
    placeholder="Seats"
    value={newCar.seats}
    onChange={handleChange}
    required
  />
     <input
  type="file"
  accept="image/*"
  onChange={(e) =>
    setNewCar({ ...newCar, image: e.target.files[0] })
  }
  required
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
    <tr key={car._id}>
      <td>{car.carName}</td>
      <td>₹{car.rent}</td>
    </tr>
  ))}
</tbody>

        </table>
      </div>
    </div>
  );
};

export default Admin;


