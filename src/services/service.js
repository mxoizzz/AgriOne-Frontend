// src/service.js
import axios from "axios";

// ---------------------
// Axios instance
// ---------------------
const api = axios.create({
  baseURL: "http://localhost:8081/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Include JWT token automatically in headers
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ---------------------
// Auth APIs
// ---------------------
export const authAPI = {
  register: async (data) => {
    const res = await api.post("/users/register", data);
    return res.data;
  },

  login: async (data) => {
    const res = await api.post("/users/login", data);
    // Save JWT and user info
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    return res.data;
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  getCurrentUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },
};

// ---------------------
// Crop APIs
// ---------------------
export const cropAPI = {
  addCrop: async (data) => {
    const res = await api.post("/crops", data);
    return res.data;
  },

  getAllCrops: async () => {
    const res = await api.get("/crops");
    return res.data;
  },

  getMyCrops: async () => {
    const res = await api.get("/crops/my");
    return res.data;
  },

  updateCrop: async (id, data) => {
    const res = await api.put(`/crops/${id}`, data);
    return res.data;
  },

  deleteCrop: async (id) => {
    const res = await api.delete(`/crops/${id}`);
    return res.data;
  },
};

// ---------------------
// Order APIs
// ---------------------
export const orderAPI = {
  createOrder: async (data) => {
    const res = await api.post("/orders", data);
    return res.data;
  },

  getMyOrders: async () => {
    const res = await api.get("/orders/my");
    return res.data;
  },

  cancelOrder: async (id) => {
    const res = await api.put(`/orders/${id}/cancel`);
    return res.data;
  },

  markAsPaid: async (id) => {
    const res = await api.put(`/orders/${id}/paid`);
    return res.data;
  },
};
