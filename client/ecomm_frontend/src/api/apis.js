import axios from "axios";

const backendUrl = "http://localhost:3000";

/* AUTH */
export const Register = async (data) => {
  const res = await axios.post(`${backendUrl}/api/auth/register`, data);
  return res.data;
};

export const Login = async (data) => {
  const res = await axios.post(`${backendUrl}/api/auth/login`, data);
  return res.data;
};

/* PRODUCTS */
export const getProducts = async () => {
  const res = await axios.get(`${backendUrl}/api/products`);
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
      },
    }
  );

  return res.data;
};
