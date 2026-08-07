import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/image",
});

export const uploadImage = async (file) => {
  const formData = new FormData();

  formData.append("image", file);

  const response = await API.post(
    "/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};