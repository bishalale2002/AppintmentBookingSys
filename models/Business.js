const mongoose = require("mongoose");

const slotSchema = new mongoose.Schema({
  start: {
    type: String, // "09:00"
    required: true,
  },
  end: {
    type: String, // "10:00"
    required: true,
  },
  capacity: {
    type: Number, // how many people allowed
    required: true,
    min: 1,
  },
});

const weeklyScheduleSchema = new mongoose.Schema({
  day: {
    type: String, // Monday, Tuesday...
    required: true,
  },
  slots: {
    type: [slotSchema],
    required: true,
  },
});

const businessSchema = new mongoose.Schema(
  {
    businessName: {
      type: String,
      required: true,
    },

    businessType: {
      type: String, // salon, clinic, gym, consultant
      required: true,
    },

    ownerName: {
      type: String,
      required: true,
    },

    businessOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    weeklySchedule: {
      type: [weeklyScheduleSchema],
      required: true,
    },

    holidays: {
      type: [Date], // specific dates closed
      default: [],
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Business", businessSchema);
