import Car from "../models/CarModel.js";

export const addCar = async (req, res) => {
  try {
    const {carNo, carName, rent, seats } = req.body;

    if (!carName ||!carNo || !rent || !seats) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const carExists = await Car.findOne({carNo});
    if (carExists) {
      return res.status(400).json({ message: "Car already exists" });
    }

    const newCar = await Car.create({
      carNo,
      carName,
      rent,
      seats,
    });

    res.status(201).json({
      message: "Car added successfully",
      car: newCar,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};




//Remove Cars

export const removeCar = async (req, res) => {
  try {
    const { carNo } = req.body;

    if (!carNo) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const carExists = await Car.findOne({carNo});
    if (!carExists) {
      return res.status(400).json({ message: "Car Not exists" });
    }

    const delCar = await Car.findOneAndDelete(carNo);
    res.status(201).json({
      message: "Car Removed successfully",
      carNo
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};



export const availableCar = async (req, res) => {
  try {
    const { carNo } = req.body;

    if (!carNo) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const avaCar = await Car.findOne({carNo});
   if( avaCar) {
      return res.status(400).json({ message: "Car Available" });
    }
    else{
       return res.status(400).json({ message: "Car Not Available" });

    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


export const getAllCar = async (req, res) => {
  try {
    const cars = await Car.find();

    res.status(200).json({
      count: cars.length,
      cars
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

