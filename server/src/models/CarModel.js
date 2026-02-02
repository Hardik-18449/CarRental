import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
  {
    carName: { type: String, required: true },
    carNo: {type: String,required: true,unique: true,uppercase: true,trim: true,index: true},
    rent: { type: Number, required: true },
    seats: { type: Number, required: true },
    isAvailable: {type: Boolean,default: true,},
  },
  { timestamps: true }
);
const Car = mongoose.model("Car", carSchema);
export default Car;
