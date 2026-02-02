import mongoose from "mongoose";
import User from "./src/models/User.js";
import dotenv from "dotenv";

dotenv.config();

const createAdmin = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const adminExists = await User.findOne({ role: "admin" });

  if (adminExists) {
    console.log("Admin already exists");
    process.exit();
  }

  await User.create({
    name: "Admin",
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
    role: "admin",
  });

  console.log("Admin created successfully");
  process.exit();
};

createAdmin();
