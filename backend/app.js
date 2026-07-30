const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const chatRoutes = require("./routes/chatRoutes");

// Chat Route
app.use("/api/chat", chatRoutes);
// Test Route
app.get("/", (req, res) => {
  res.send("Backend is running successfully 🚀");
});



module.exports = app;