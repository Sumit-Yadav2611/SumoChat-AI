const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createChat,
  getChats,
  getChatMessages,
  sendChatMessage,
  renameChat,
  deleteChat,
  guestChatController,
} = require("../controllers/chatController");

// ============================================================
// GUEST CHAT
// ============================================================

// Guest users can use AI without authentication
router.post("/guest", (req, res, next) => {
  console.log("🔥 GUEST ROUTE HIT");
  next();
}, guestChatController);


// ============================================================
// LOGGED-IN CHAT
// ============================================================

// Create new MongoDB chat
router.post(
  "/",
  protect,
  createChat
);

// Get user's chats
router.get(
  "/",
  protect,
  getChats
);

// Get messages
router.get(
  "/:chatId/messages",
  protect,
  getChatMessages
);

// Send message to existing chat
router.post(
  "/:chatId/messages",
  protect,
  sendChatMessage
);

// Rename
router.put(
  "/:chatId",
  protect,
  renameChat
);

// Delete
router.delete(
  "/:chatId",
  protect,
  deleteChat
);

module.exports = router;