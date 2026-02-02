import express from "express";
import { loginUser, logoutUser, registerUser, verifyUser } from "../controllers/authController.js";
import { addCar } from "../controllers/CarController.js";
import authMiddleware, { adminOnly } from "../middlewares/authMiddleware.js";



const router = express.Router();

router.post("/add-car", authMiddleware, adminOnly, addCar);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/verify", authMiddleware, verifyUser);
export default router;




