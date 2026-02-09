import Booking from "../models/BookingModel.js";
import Car from "../models/CarModel.js";

export const createBooking = async (req, res) => {
  try {
    const {
      carId,
      pickupDate,
      pickupTime,
      dropDate,
      dropTime,
    } = req.body;

    if (!carId || !pickupDate || !pickupTime || !dropDate || !dropTime) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    const booking = await Booking.create({
      user: req.User._id,
      car: carId,
      pickupDate,
      pickupTime,
      dropDate,
      dropTime,
      totalPrice: car.rent,
    });

    res.status(201).json({
      message: "Booking successful",
      booking,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

