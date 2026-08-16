const fs = require("fs");
const path = require("path");

// ============================================================
// CLOUDFLARE WORKERS AI
// FLUX.1 SCHNELL IMAGE GENERATION
// ============================================================

const generateImage = async (prompt) => {
  try {
    if (!prompt || !prompt.trim()) {
      throw new Error("Image prompt is required");
    }

    const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
    const apiToken = process.env.CLOUDFLARE_API_TOKEN;

    if (!accountId) {
      throw new Error(
        "CLOUDFLARE_ACCOUNT_ID is missing from .env"
      );
    }

    if (!apiToken) {
      throw new Error(
        "CLOUDFLARE_API_TOKEN is missing from .env"
      );
    }

    const cleanPrompt = prompt.trim();

    console.log("🎨 Generating image with FLUX...");
    console.log("📝 Prompt:", cleanPrompt);

    // ========================================================
    // CLOUDFLARE FLUX API
    // ========================================================

    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/@cf/black-forest-labs/flux-1-schnell`,
      {
        method: "POST",

        headers: {
          Authorization: `Bearer ${apiToken}`,
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          prompt: cleanPrompt,
        }),
      }
    );

    const data = await response.json();

    // ========================================================
    // API ERROR
    // ========================================================

    if (!response.ok || !data.success) {
      console.error(
        "❌ Cloudflare Image Generation Error:",
        data
      );

      throw new Error(
        data?.errors?.[0]?.message ||
          "Failed to generate image"
      );
    }

    // ========================================================
    // GET BASE64 IMAGE
    // ========================================================

    const imageBase64 = data?.result?.image;

    if (!imageBase64) {
      throw new Error(
        "Cloudflare did not return image data"
      );
    }

    console.log("✅ Image generated successfully");

    return {
      image: imageBase64,
      mimeType: "image/jpeg",
    };
  } catch (error) {
    console.error(
      "❌ Image Generation Service Error:",
      error.message
    );

    throw error;
  }
};

module.exports = {
  generateImage,
};