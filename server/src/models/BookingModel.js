import mongoose from "mongoose";


const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    car: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
      required: true,
    },
    carNo : {
      type:String,
      required:true,
      unique:true,
    },
    pickupDate: String,
    pickupTime: String,
    dropDate: String,
    dropTime: String,
    totalPrice: Number,
    status: {
      type: String,
      default: "confirmed",
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;





