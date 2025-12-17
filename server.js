require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// DB
connectDB();

// 🔥 MUST BE HERE (before routes)
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log("METHOD:", req.method);
  console.log("HEADERS:", req.headers["content-type"]);
  console.log("BODY:", req.body);
  next();
});

// Routes
app.use("/api/auth", require("./routes/authRoutes"));

app.get("/", (req, res) => {
  res.send("Backend is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
