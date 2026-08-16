const {
  generateImage,
} = require("../services/imageGenerationService");

const Chat = require("../models/Chat");
const Message = require("../models/Message");

// ============================================================
// GENERATE IMAGE
// ============================================================

const generateImageController = async (req, res) => {
  try {
    const { prompt, chatId } = req.body;

    // ========================================================
    // VALIDATE PROMPT
    // ========================================================

    if (!prompt || !prompt.trim()) {
      return res.status(400).json({
        success: false,
        message: "Image prompt is required",
      });
    }

    const cleanPrompt = prompt.trim();

    console.log("🎨 Image generation request");
    console.log("📝 Prompt:", cleanPrompt);

    // ========================================================
    // VERIFY CHAT
    // ========================================================

    let chat = null;

    if (chatId && req.user) {
      chat = await Chat.findOne({
        _id: chatId,
        userId: req.user._id,
      });

      if (!chat) {
        return res.status(404).json({
          success: false,
          message: "Chat not found",
        });
      }
    }

    // ========================================================
    // GENERATE IMAGE
    // ========================================================

    const result = await generateImage(
      cleanPrompt
    );

    console.log(
      "✅ Image generated successfully"
    );

    // ========================================================
    // SAVE IMAGE TO MONGODB
    // Only when a logged-in chat is provided
    // ========================================================

    if (chat) {
      // ------------------------------------------------------
      // Save user's image prompt
      // ------------------------------------------------------

      await Message.create({
        chatId: chat._id,
        role: "user",
        type: "text",
        content: cleanPrompt,
      });

      // ------------------------------------------------------
      // Save generated image
      // ------------------------------------------------------

      await Message.create({
        chatId: chat._id,
        role: "assistant",
        type: "image",
        content: result.image,
        mimeType:
          result.mimeType || "image/jpeg",
        prompt: cleanPrompt,
      });

      // ------------------------------------------------------
      // Update chat title
      // ------------------------------------------------------

      if (chat.title === "New Chat") {
        chat.title =
          cleanPrompt.length > 40
            ? cleanPrompt.slice(0, 40) + "..."
            : cleanPrompt;
      }

      await chat.save();

      console.log(
        "💾 Generated image saved to MongoDB"
      );
    }

    // ========================================================
    // RESPONSE
    // ========================================================

    return res.status(200).json({
      success: true,
      image: result.image,
      mimeType:
        result.mimeType || "image/jpeg",
      chat: chat || null,
    });
  } catch (error) {
    console.error(
      "❌ Image Generation Controller Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to generate image",
    });
  }
};

module.exports = {
  generateImageController,
};