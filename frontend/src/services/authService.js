import axios from "axios";

// Create Axios Instance
const API = axios.create({
  baseURL: "/api/auth",
  headers: {
    "Content-Type": "application/json",
  },
});

// ==========================
// Register User
// ==========================
export const registerUser = async (userData) => {
  const response = await API.post("/register", userData);
  return response.data;
};

// ==========================
// Login User
// ==========================
export const loginUser = async (userData) => {
  const response = await API.post("/login", userData);
  return response.data;
};

// ==========================
// Get Logged-in User Profile
// ==========================
export const getProfile = async (token) => {
  const response = await API.get("/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// ==========================
// Logout User
// (Frontend only)
// ==========================
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};