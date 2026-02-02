// routes/bookingRoutes.js
import express from "express";
import {
  createBooking,
//   getAllBookings,
//   getUserBookings,
//   cancelBooking,
} from "../controllers/BookingController.js";

const router = express.Router();

router.post("/create", createBooking);
// router.get("/all", getAllBookings);
// router.get("/user/:userId", getUserBookings);
// router.put("/cancel/:id", cancelBooking);

export default router;
