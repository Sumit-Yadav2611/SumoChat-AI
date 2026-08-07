const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.json());

const chatRoutes = require("./routes/chatRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const documentRoutes = require("./routes/documentRoutes");
const imageRoutes = require("./routes/imageRoutes");

// Chat Route
app.use("/api/chat", chatRoutes);
// Auth Route
app.use("/api/auth", authRoutes);
// Image Route
app.use("/api/image", imageRoutes);
// Document Route
app.use("/api/document", documentRoutes);
// User Route
app.use("/api/user", userRoutes);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// Test Route
app.get("/", (req, res) => {
  res.send("Backend is running successfully 🚀");
});



module.exports = app;