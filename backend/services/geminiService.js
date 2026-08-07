const { GoogleGenAI } = require("@google/genai");
const fs = require("fs");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const generateResponse = async (prompt, image = null) => {
  try {
    let contents;

    // ---------- IMAGE + TEXT ----------
    if (image) {
      const imageBytes = fs.readFileSync(image.filePath);

      contents = [
        {
          role: "user",
          parts: [
            {
              inlineData: {
                mimeType: image.mimeType,
                data: imageBytes.toString("base64"),
              },
            },
            {
              text: prompt,
            },
          ],
        },
      ];
    }

    // ---------- TEXT ONLY ----------
    else {
      contents = [
        {
          role: "user",
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ];
    }

    const response = await ai.models.generateContent({
     model: "gemini-3.6-flash",
      contents,
    });

    return response.text;
  } catch (err) {
    console.error("Gemini Error:", err);
    throw err;
  }
};

module.exports = {
  generateResponse,
};