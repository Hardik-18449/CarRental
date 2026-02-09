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
    const res = await API.post("/cars", newCar);

    alert(res.data.message);

    setCars([...cars, res.data.car]);

    setNewCar({
      carName: "",
      carNo: "",
      rent: "",
      seats: "",
      image:"",
    });
  } catch (error) {
    alert(
      error.response?.data?.message || "Failed to add car"
    );
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

import Car from "../models/CarModel.js";

export const addCar = async (req, res) => {
  try {
    const {carNo, carName, rent, seats } = req.body;

    if (!carName ||!carNo || !rent || !seats) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const carExists = await Car.findOne({carNo});
    if (carExists) {
      return res.status(400).json({ message: "Car already exists" });
    }

    const newCar = await Car.create({
      carNo,
      carName,
      rent,
      seats,
      image,
    });

    res.status(201).json({
      message: "Car added successfully",
      car: newCar,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};



export const removeCar = async (req, res) => {
  try {
    const { carNo } = req.body;

    if (!carNo) {
      return res.status(400).json({ message: "Car number required" });
    }

    const deletedCar = await Car.findOneAndDelete({ carNo });

    if (!deletedCar) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.status(200).json({
      message: "Car removed successfully",
      car: deletedCar,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




export const availableCar = async (req, res) => {
  try {
    const { carNo } = req.body;

    const car = await Car.findOne({ carNo });

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.status(200).json({
      carNo: car.carNo,
      isAvailable: car.isAvailable,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getAllCar = async (req, res) => {
  try {
    const cars = await Car.find();
    res.status(200).json({
      count: cars.length,
      cars,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
  {
    carName: { type: String, required: true },
    carNo: { type: String, required: true, unique: true },
    rent: { type: Number, required: true },
    seats: { type: Number, required: true },
    image: { type: String },
     isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Car = mongoose.model("Car", carSchema);
export default Car;


import express from "express";
import multer from "multer";
import Car from "../models/CarModel.js";
import { availableCar, getAllCar, removeCar } from "../controllers/CarController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/cars"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, price } = req.body;

    const car = await Car.create({
      name,
      price,
      image: req.file.path,
    });

    res.status(201).json(car);
  } catch (err) {
    res.status(500).json({ message: "Car not added", error: err.message });
  }
});

router.get("/", getAllCar);
router.post("/removeCar", removeCar);
router.get("/availableCar", availableCar);

export default router;


import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default API; 