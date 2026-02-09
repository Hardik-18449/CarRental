import express from "express";
import BookingModel from "../models/BookingModel.js";
import authMiddleware from "../middlewares/authMiddleware.js";


const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      carId,
      pickupDate,
      pickupTime,
      dropDate,
      dropTime,
      totalPrice,
    } = req.body;

 
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const booking = await BookingModel.create({
      user: req.user._id,  
      car: carId,
      pickupDate,
      pickupTime,
      dropDate,
      dropTime,
      totalPrice,
      status: "confirmed",
    });

    res.status(201).json({ booking });
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ message: error.message });
  }
});


router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const booking = await BookingModel.findById(req.params.id)
      .populate("user", "name email")
      .populate("car");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json(booking);
  } catch (error) {
    console.error("Fetch booking error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
