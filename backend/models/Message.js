const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
      required: true,
      index: true,
    },

    role: {
      type: String,
      enum: ["user", "assistant"],
      required: true,
    },

    // ============================================================
    // MESSAGE TYPE
    // ============================================================

    type: {
      type: String,
      enum: ["text", "image"],
      default: "text",
    },

    // ============================================================
    // MESSAGE CONTENT
    // ============================================================

    content: {
      type: String,
      required: true,
    },

    // ============================================================
    // IMAGE MIME TYPE
    // Example: image/jpeg
    // ============================================================

    mimeType: {
      type: String,
      default: null,
    },

    // ============================================================
    // ORIGINAL IMAGE GENERATION PROMPT
    // ============================================================

    prompt: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Message", messageSchema);
