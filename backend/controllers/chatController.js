const { generateResponse } = require("../services/geminiService");
const chatController = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: "Prompt is required",
      });
    }

    // Get response from Gemini
    const reply = await generateResponse(prompt);

    return res.status(200).json({
      success: true,
      reply,
    });

  } catch (error) {
  console.error("Gemini Error:", error);

  return res.status(500).json({
    success: false,
    message: error.message,
    stack: error.stack,
  });
}
};

module.exports = {
  chatController,
};