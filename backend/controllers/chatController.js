const { generateResponse } = require("../services/geminiService");
const { getCurrentImage } = require("../memory/imageMemory");

const Chat = require("../models/Chat");
const Message = require("../models/Message");

// ============================================================
// CREATE NEW CHAT
// ============================================================

const createChat = async (req, res) => {
  try {
    const chat = await Chat.create({
      userId: req.user._id,
      title: "New Chat",
    });

    return res.status(201).json({
      success: true,
      chat,
    });
  } catch (error) {
    console.error("Create Chat Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create chat",
    });
  }
};

// ============================================================
// GET USER CHATS
// ============================================================

const getChats = async (req, res) => {
  try {
    const chats = await Chat.find({
      userId: req.user._id,
    })
      .sort({ updatedAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      chats,
    });
  } catch (error) {
    console.error("Get Chats Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch chats",
    });
  }
};

// ============================================================
// GET CHAT MESSAGES
// ============================================================

const getChatMessages = async (req, res) => {
  try {
    const { chatId } = req.params;

    const chat = await Chat.findOne({
      _id: chatId,
      userId: req.user._id,
    });

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }

    const messages = await Message.find({
      chatId: chat._id,
    })
      .sort({ createdAt: 1 })
      .lean();

    return res.status(200).json({
      success: true,
      chat,
      messages,
    });
  } catch (error) {
    console.error("Get Chat Messages Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch chat messages",
    });
  }
};

// ============================================================
// SEND MESSAGE
// ============================================================

const sendChatMessage = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { prompt, document } = req.body;

    if (!prompt || !prompt.trim()) {
      return res.status(400).json({
        success: false,
        message: "Prompt is required",
      });
    }

    const chat = await Chat.findOne({
      _id: chatId,
      userId: req.user._id,
    });

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }

    const cleanPrompt = prompt.trim();

    // Save user message
    await Message.create({
      chatId: chat._id,
      role: "user",
      content: cleanPrompt,
    });

    // Generate title from first message
    if (chat.title === "New Chat") {
      chat.title =
        cleanPrompt.length > 40
          ? cleanPrompt.slice(0, 40) + "..."
          : cleanPrompt;
    }

    // Build Gemini prompt
    let finalPrompt = cleanPrompt;

    if (document && document.text) {
      finalPrompt = `
You are an intelligent AI assistant.

The user has uploaded the following PDF.

==================== PDF CONTENT ====================

${document.text}

=====================================================

Answer the user's question ONLY using the information
from the uploaded PDF whenever possible.

If the answer is not found in the PDF,
clearly say that it is not available in the uploaded document.

User Question:
${cleanPrompt}
`;
    }

    // Image
    const currentImage = getCurrentImage();

    console.log("Current Image:", currentImage);

    // Gemini
    const reply = await generateResponse(finalPrompt, currentImage);

    // Save assistant response
    await Message.create({
      chatId: chat._id,
      role: "assistant",
      content: reply,
    });

    await chat.save();

    return res.status(200).json({
      success: true,
      reply,
      chat,
    });
  } catch (error) {
    console.error("Gemini Chat Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

// ============================================================
// RENAME CHAT
// ============================================================

const renameChat = async (req, res) => {
  try {
    const { chatId } = req.params;
    const { title } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Chat title is required",
      });
    }

    const chat = await Chat.findOne({
      _id: chatId,
      userId: req.user._id,
    });

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }

    chat.title = title.trim();

    await chat.save();

    return res.status(200).json({
      success: true,
      chat,
    });
  } catch (error) {
    console.error("Rename Chat Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to rename chat",
    });
  }
};

// ============================================================
// DELETE CHAT
// ============================================================
const deleteChat = async (req, res) => {
  try {
    const { chatId } = req.params;

    const chat = await Chat.findOne({
      _id: chatId,
      userId: req.user._id,
    });

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }

    // Delete all messages belonging to chat
    await Message.deleteMany({
      chatId: chat._id,
    });

    // Delete chat
    await Chat.deleteOne({
      _id: chat._id,
    });

    return res.status(200).json({
      success: true,
      message: "Chat deleted successfully",
      chatId,
    });
  } catch (error) {
    console.error("Delete Chat Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete chat",
    });
  }
};

module.exports = {
  createChat,
  getChats,
  getChatMessages,
  sendChatMessage,
  renameChat,
  deleteChat,
};
// ============================================================
// GUEST CHAT
// ============================================================

const guestChatController = async (req, res) => {
  try {
    const { prompt, document } = req.body;

    if (!prompt || !prompt.trim()) {
      return res.status(400).json({
        success: false,
        message: "Prompt is required",
      });
    }

    const cleanPrompt = prompt.trim();

    // Build Gemini prompt
    let finalPrompt = cleanPrompt;

    // PDF content
    if (document && document.text) {
      finalPrompt = `
You are an intelligent AI assistant.

The user has uploaded the following PDF.

==================== PDF CONTENT ====================

${document.text}

=====================================================

Answer the user's question ONLY using the information
from the uploaded PDF whenever possible.

If the answer is not found in the PDF,
clearly say that it is not available in the uploaded document.

User Question:
${cleanPrompt}
`;
    }

    // Get uploaded image
    const currentImage = getCurrentImage();

    console.log(
      "Guest Current Image:",
      currentImage
    );

    // Generate Gemini response
    const reply = await generateResponse(
      finalPrompt,
      currentImage
    );

    return res.status(200).json({
      success: true,
      reply,
    });
  } catch (error) {
    console.error(
      "Guest Gemini Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Internal Server Error",
    });
  }
};

module.exports = {
  createChat,
  getChats,
  getChatMessages,
  sendChatMessage,
  renameChat,
  deleteChat,
  guestChatController,
};