import axios from "axios";

const API_URL = "http://localhost:5000/api/chat";

export const sendPrompt = async (prompt,document) => {
  const response = await axios.post(API_URL, {
    prompt,
    document
  });

  return response.data.reply;
};