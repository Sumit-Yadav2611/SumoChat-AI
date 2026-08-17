import axios from "axios";

const API_URL = "/api/chat";

const IMAGE_API_URL = "/api/image-generation";
// ============================================================
// GET AUTH HEADER
// ============================================================

const getAuthConfig = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// ============================================================
// GET ALL CHATS FOR LOGGED-IN USER
// ============================================================

export const getChats = async (token) => {
  const response = await axios.get(
    API_URL,
    getAuthConfig(token)
  );

  return response.data.chats;
};

// ============================================================
// CREATE NEW CHAT
// ============================================================

export const createChat = async (token) => {
  const response = await axios.post(
    API_URL,
    {},
    getAuthConfig(token)
  );

  return response.data.chat;
};

// ============================================================
// GET MESSAGES OF A CHAT
// ============================================================

export const getChatMessages = async (
  chatId,
  token
) => {
  const response = await axios.get(
    `${API_URL}/${chatId}/messages`,
    getAuthConfig(token)
  );

  return {
    chat: response.data.chat,
    messages: response.data.messages,
  };
};

// ============================================================
// SEND MESSAGE TO A SPECIFIC CHAT
// ============================================================

export const sendPrompt = async (
  chatId,
  prompt,
  document,
  token
) => {
  const response = await axios.post(
    `${API_URL}/${chatId}/messages`,
    {
      prompt,
      document,
    },
    getAuthConfig(token)
  );

  return {
    reply: response.data.reply,
    chat: response.data.chat,
  };
};

// ============================================================
// GENERATE IMAGE
// LOGGED-IN USER
// ============================================================

export const generateImage = async (
  prompt,
  chatId,
  token
) => {
  const response = await axios.post(
    `${IMAGE_API_URL}/generate`,
    {
      prompt,
      chatId,
    },
    getAuthConfig(token)
  );

  return {
    image: response.data.image,
    mimeType:
      response.data.mimeType || "image/jpeg",
    chat: response.data.chat || null,
  };
};

// ============================================================
// DELETE CHAT
// ============================================================

export const deleteChat = async (
  chatId,
  token
) => {
  const response = await axios.delete(
    `${API_URL}/${chatId}`,
    getAuthConfig(token)
  );

  return response.data;
};

// ============================================================
// RENAME CHAT
// ============================================================

export const renameChat = async (
  chatId,
  title,
  token
) => {
  const response = await axios.put(
    `${API_URL}/${chatId}`,
    {
      title,
    },
    getAuthConfig(token)
  );

  return response.data.chat;
};

// ============================================================
// GUEST MESSAGE
// ============================================================

export const sendGuestPrompt = async (
  prompt,
  document
) => {
   const guestURL = "/api/chat/guest";

  console.log(
    "================================="
  );

  console.log(
    "🔥 GUEST FUNCTION EXECUTED"
  );

  console.log(
    "🔥 GUEST URL:",
    guestURL
  );

  console.log(
    "================================="
  );

  const response = await axios.post(
    guestURL,
    {
      prompt,
      document,
    }
  );

  return response.data.reply;
};