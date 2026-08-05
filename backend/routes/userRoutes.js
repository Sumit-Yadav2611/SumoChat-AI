const express = require("express");

const router = express.Router();

const upload = require("../middleware/uploadMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

const {
  uploadAvatar,
} = require("../controllers/userController");

// Upload Avatar
router.post(
  "/avatar",
  authMiddleware,
  upload.single("avatar"),
  uploadAvatar
);

module.exports = router;
