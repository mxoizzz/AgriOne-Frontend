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
  register: async (data) => (await api.post("/users/register", data)).data,

  login: async (data) => {
    const res = await api.post("/users/login", data);
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
// Crop APIs (frontend-only image paths)
// ---------------------
export const cropAPI = {
  addCrop: async (cropData) => {
    // cropData.images = array of frontend-generated URLs (e.g., from URL.createObjectURL)
    return (await api.post("/crops", cropData)).data;
  },

  getAllCrops: async () => (await api.get("/crops")).data,
  getMyCrops: async () => (await api.get("/crops/my")).data,

  updateCrop: async (id, cropData) => {
    return (await api.put(`/crops/${id}`, cropData)).data;
  },

  deleteCrop: async (id) => (await api.delete(`/crops/${id}`)).data,
};

// ---------------------
// Order APIs
// ---------------------
export const orderAPI = {
  createOrder: async (data) => (await api.post("/orders", data)).data,
  getMyOrders: async () => (await api.get("/orders/my")).data,
  getOrderById: async (id) => (await api.get(`/orders/${id}`)).data,
  updateStatus: async (id, status) =>
    (await api.put(`/orders/${id}/status?status=${status}`)).data,
};

// ---------------------
// Payment APIs
// ---------------------
export const paymentAPI = {
  initiatePayment: async (data) => (await api.post("/payments", data)).data,
  getPaymentsByOrder: async (orderId) =>
    (await api.get(`/payments/order/${orderId}`)).data,
  getPaymentById: async (id) => (await api.get(`/payments/${id}`)).data,
  updatePaymentStatus: async (id, status) =>
    (await api.put(`/payments/${id}/status?status=${status}`)).data,
};
