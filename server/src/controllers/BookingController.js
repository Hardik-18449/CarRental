import Booking from "../models/BookingModel.js";
import Car from "../models/CarModel.js";
import User from "../models/User.js";

export const createBooking = async (req, res) => {
  try {
    const { carNo, email, bookingType, startDate, endDate } = req.body;

    if (!carNo || !email || !bookingType || !startDate || !endDate) {
      return res.status(400).json({ message: "All fields required" });
    }

    const car = await Car.findOne({carNo});
   if (!car) {
  return res.status(404).json({ message: "Car not found" });
}

if (car.isAvailable === false) {
  return res.status(400).json({ message: "Car already booked" });
}

    const user = await User.findOne({email});
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const booking = await Booking.create({
      car: car._id,
      carNo: car.carNo,
      user: user._id,
      email: user.email,
      bookingType,
      startDate,
      endDate,
      status: "confirmed",
    });

    car.isAvailable = false;
    await car.save();

    res.status(201).json({
      message: "Booking successful",
      booking,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
