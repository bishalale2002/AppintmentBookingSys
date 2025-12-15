const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  business: { type: mongoose.Schema.Types.ObjectId, ref: "Business" },
  provider: { type: mongoose.Schema.Types.ObjectId, ref: "Provider" },
  clientEmail: String,
  time: String,
  duration: Number,
  price: Number,
  status: {
    type: String,
    enum: ["booked", "completed", "cancelled"],
    default: "booked"
  }
}, { timestamps: true });

module.exports = mongoose.model("Appointment", appointmentSchema);
