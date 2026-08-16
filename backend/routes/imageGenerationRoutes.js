const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  generateImageController,
} = require("../controllers/imageGenerationController");

// ============================================================
// GENERATE IMAGE
// POST /api/image-generation/generate
// ============================================================

router.post(
  "/generate",
  protect,
  generateImageController
);

module.exports = router;