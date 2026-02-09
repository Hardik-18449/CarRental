import express from "express";
import multer from "multer";
import {
  getAllCar,
  getCarById,
  removeCar,
  availableCar,
  addCar
} from "../controllers/CarController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/cars"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

router.post("/", upload.single("image"), addCar); 
router.get("/", getAllCar);                                       
router.post("/removeCar", removeCar);
router.get("/availableCar", availableCar);
router.get("/:id", getCarById);
router.get("/:id", async (req, res) => {
  try {
    const car = await car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});






export default router;
