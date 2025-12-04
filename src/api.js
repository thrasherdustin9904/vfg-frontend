import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE || "https://vfg-backend12.onrender.com";

export default {
  getProducts: () => axios.get(`${API_BASE}/api/products`).then(r => r.data),
  createProduct: (formData, token) =>
    axios.post(`${API_BASE}/api/products`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      }
    }).then(r => r.data),
  createCheckoutSession: (items, email) =>
    axios.post(`${API_BASE}/api/orders/create-session`, { items, customerEmail: email }).then(r => r.data),
  adminLogin: (email, password) =>
    axios.post(`${API_BASE}/api/auth/admin-login`, { email, password }).then(r => r.data)
};
