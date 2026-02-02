import express from "express";
import { addCar, availableCar, getAllCar, removeCar } from "../controllers/CarController.js";

const router = express.Router();

router.post("/addCar", addCar);
router.post("/removeCar", removeCar);
router.get("/availableCar", availableCar);
router.get("/getAllCar", getAllCar);

export default router;
