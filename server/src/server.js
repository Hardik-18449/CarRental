import express from "express";

import dotenv from "dotenv";
import connectDB from "./config/db.js";
import app from "./app.js";
import authRoutes from "./routes/authRoutes.js";
import CarRoutes from "./routes/CarRoutes.js";
import BookingRoutes from "./routes/BookingRoutes.js";

dotenv.config();
connectDB();
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/car", CarRoutes);
app.use("/api/cars", BookingRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



