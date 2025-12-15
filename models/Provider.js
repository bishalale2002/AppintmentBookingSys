const mongoose = require("mongoose");

const providerSchema = new mongoose.Schema({
  name: String,
  business: { type: mongoose.Schema.Types.ObjectId, ref: "Business" },
  availableTimes: [String],
  changeCount: { type: Number, default: 3 }
});

module.exports = mongoose.model("Provider", providerSchema);
