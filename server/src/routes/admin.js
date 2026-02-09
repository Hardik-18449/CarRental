import express from "express";
import upload from "../middleware/upload.js";
import Car from "../models/CarModel.js";

const router = express.Router();

router.post(
  "/add-car",
  upload.single("image"),
  async (req, res) => {
    try {
      const { carName, carNo, rent, seats } = req.body;

      const newCar = new Car({
        carName,
        carNo,
        rent,
        seats,
        image: req.file
          ? `/uploads/cars/${req.file.filename}`
          : "",
      });

      await newCar.save();

      res.status(201).json({
        success: true,
        message: "Car added successfully",
        car: newCar,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

export default router;
