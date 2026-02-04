import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

/* AUTH */
export const Register = async (data) => {
  const res = await axios.post(`${backendUrl}/api/auth/register`, data);
  return res.data;
};

export const Login = async (data) => {
  const res = await axios.post(`${backendUrl}/api/auth/login`, data);
  localStorage.setItem("token", res.data.token);
  return res.data;
};

/* PRODUCTS */
export const getProducts = async () => {
  const res = await axios.get(`${backendUrl}/api/products`);
  return res.data;
};

export const getProductById = async (id) => {
  const res = await axios.get(`${backendUrl}/api/products/${id}`);
  return res.data;
};

/* ORDERS */
export const placeOrder = async (data) => {
  const token = localStorage.getItem("token");
  const res = await axios.post(`${backendUrl}/api/orders`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const getMyOrders = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get(`${backendUrl}/api/orders/my`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
