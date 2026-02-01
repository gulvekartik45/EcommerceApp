import axios from "axios";

const backendUrl = "http://localhost:3000";

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

/* ✅ SINGLE PRODUCT (THIS WAS MISSING) */
export const getProductById = async (id) => {
  const res = await axios.get(`${backendUrl}/api/products/${id}`);
  return res.data;
};

export const addProduct = async (data) => {
  const token = localStorage.getItem("token");

  const res = await axios.post(
    `${backendUrl}/api/products`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
};

export const updateProduct = async (id, data) => {
  const token = localStorage.getItem("token");

  const res = await axios.put(
    `${backendUrl}/api/products/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
};

export const deleteProduct = async (id) => {
  const token = localStorage.getItem("token");

  const res = await axios.delete(
    `${backendUrl}/api/products/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};
