import axios from "axios";

const API = "http://localhost:5000/api/user";

export const uploadAvatar = async (file, token) => {
  const formData = new FormData();

  formData.append("avatar", file);

  const response = await axios.post(
    `${API}/avatar`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};