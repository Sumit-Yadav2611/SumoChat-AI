const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

// ============================================================
// MIDDLEWARE
// ============================================================

app.use(cors());
app.use(express.json());

// ============================================================
// IMPORT ROUTES
// ============================================================

const chatRoutes = require("./routes/chatRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const documentRoutes = require("./routes/documentRoutes");
const imageRoutes = require("./routes/imageRoutes");
const imageGenerationRoutes = require("./routes/imageGenerationRoutes");

// ============================================================
// GUEST CHAT CONTROLLER
// ============================================================

const {
  guestChatController,
} = require("./controllers/chatController");

// ============================================================
// PUBLIC GUEST CHAT
// IMPORTANT: NO protect middleware here
// ============================================================

app.use(
  "/api/image-generation",
  imageGenerationRoutes
);
app.post(
  "/api/chat/guest",
  (req, res, next) => {
    console.log("🔥 GUEST API ROUTE HIT");
    next();
  },
  guestChatController
);

// ============================================================
// CHAT ROUTES
// ============================================================

app.use("/api/chat", chatRoutes);

// ============================================================
// AUTH ROUTES
// ============================================================

app.use("/api/auth", authRoutes);

// ============================================================
// IMAGE ROUTES
// ============================================================

app.use("/api/image", imageRoutes);

// ============================================================
// DOCUMENT ROUTES
// ============================================================

app.use("/api/document", documentRoutes);

// ============================================================
// USER ROUTES
// ============================================================

app.use("/api/user", userRoutes);

// ============================================================
// UPLOADS
// ============================================================

app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "uploads")
  )
);

// ============================================================
// API HEALTH CHECK
// ============================================================

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "SumoChat AI backend is running",
  });
});

// ============================================================
// SERVE FRONTEND
// ============================================================

const frontendPath = path.join(
  __dirname,
  "../frontend/dist"
);

app.use(express.static(frontendPath));

// ============================================================
// REACT SPA FALLBACK
// ============================================================

app.use((req, res, next) => {
  if (
    req.method === "GET" &&
    !req.path.startsWith("/api/") &&
    !req.path.startsWith("/uploads/")
  ) {
    return res.sendFile(
      path.join(frontendPath, "index.html")
    );
  }

  next();
});

// ============================================================
// EXPORT
// ============================================================

module.exports = app;