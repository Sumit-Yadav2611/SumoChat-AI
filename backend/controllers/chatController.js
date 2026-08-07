const { generateResponse } = require("../services/geminiService");
const { getCurrentImage } = require("../memory/imageMemory");
const chatController = async (req, res) => {
  try {
    const { prompt, document } = req.body;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: "Prompt is required",
      });
    }

    // Build prompt for Gemini
    let finalPrompt = prompt;

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
${prompt}
`;
    }

    // Generate AI response
    const currentImage = getCurrentImage();
    console.log("Current Image:", currentImage);

    const reply = await generateResponse(finalPrompt, currentImage);

    return res.status(200).json({
      success: true,
      reply,
    });
  } catch (error) {
    console.error("Gemini Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

module.exports = {
  chatController,
};
