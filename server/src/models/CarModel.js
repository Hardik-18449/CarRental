import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
  {
    carName: { type: String, required: true },
    carNo: { type: String, required: true, unique: true },
    rent: { type: Number, required: true },
    seats: { type: Number, required: true },
    image: { type: String },
     isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Car = mongoose.model("Car", carSchema);
export default Car;
