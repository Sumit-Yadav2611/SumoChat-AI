import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/document",
});

export const uploadPDF = async (file) => {
  const formData = new FormData();

  formData.append("document", file);

  const response = await API.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};