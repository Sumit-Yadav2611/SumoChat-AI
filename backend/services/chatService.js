import axios from "axios";

const API_URL = "http://localhost:5000/api/chat";

const IMAGE_API_URL =
  "http://localhost:5000/api/image-generation";

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
// SEND MESSAGE TO SPECIFIC CHAT
// LOGGED-IN USER
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
// GUEST MESSAGE
// ============================================================

export const sendGuestPrompt = async (
  prompt,
  document
) => {
  const response = await axios.post(
    `${API_URL}/guest`,
    {
      prompt,
      document,
    }
  );

  return response.data.reply;
};

// ============================================================
// GENERATE IMAGE
// ============================================================

export const generateImage = async (
  prompt
) => {
  const response = await axios.post(
    `${IMAGE_API_URL}/generate`,
    {
      prompt,
    }
  );

  return {
    image: response.data.image,
    mimeType:
      response.data.mimeType ||
      "image/jpeg",
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