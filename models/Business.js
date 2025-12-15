const mongoose = require("mongoose");

const businessSchema = new mongoose.Schema({
  name: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  commissionPercent: { type: Number, default: 10 }
});

module.exports = mongoose.model("Business", businessSchema);
