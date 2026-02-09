import Car from "../models/CarModel.js";

export const addCar = async (req, res) => {
  try {
    const { carNo, carName, rent, seats } = req.body;

    if (!carName || !carNo || !rent || !seats) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const carExists = await Car.findOne({ carNo });
    if (carExists) {
      return res.status(400).json({ message: "Car already exists" });
    }

    const newCar = await Car.create({
      carNo,
      carName,
      rent,
      seats,
      image: req.file ? req.file.path : "",
    });

    res.status(201).json({
      message: "Car added successfully",
      car: newCar,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




export const removeCar = async (req, res) => {
  try {
    const { carNo } = req.body;

    if (!carNo) {
      return res.status(400).json({ message: "Car number required" });
    }

    const deletedCar = await Car.findOneAndDelete({ carNo });

    if (!deletedCar) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.status(200).json({
      message: "Car removed successfully",
      car: deletedCar,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




export const availableCar = async (req, res) => {
  try {
    const { carNo } = req.body;

    const car = await Car.findOne({ carNo });

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.status(200).json({
      carNo: car.carNo,
      isAvailable: car.isAvailable,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getAllCar = async (req, res) => {
  try {
    const cars = await Car.find();
    res.status(200).json({
      count: cars.length,
      cars,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


