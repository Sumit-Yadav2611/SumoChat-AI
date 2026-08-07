const express = require("express");
const router = express.Router();

const upload = require("../middleware/imageUploadMiddleware");
const { uploadImage } = require("../controllers/imageController");

const {
  getCurrentImage,
} = require("../memory/imageMemory");

// Upload Image
router.post(
  "/upload",
  upload.single("image"),
  uploadImage
);

// Current Image
router.get("/current", (req, res) => {
  res.json(getCurrentImage());
});

module.exports = router;