const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: {
    type: String,
    enum: ["admin", "provider", "client"],
    default: "client"
  },
  changeCount: { type: Number, default: 1 } // recipient can change once
});

module.exports = mongoose.model("User", userSchema);
