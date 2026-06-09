import axios from "axios";

const API = import.meta.env.VITE_SERVER_URL;
const API_URL = `${API}/api/cart`;

// 1. First isolated export function
export const addToCart = async (productId) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    `${API_URL}/add`,
    { productId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// 2. Second isolated export function
export const getCart = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    API_URL, 
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const removeFromCart = async (productId) => {
  const token = localStorage.getItem("token");

  // FIX: Changed from `${API_URL}/api/cart/remove` to just `${API_URL}/remove`
  // Otherwise, it translates to: http://.../api/cart/api/cart/remove
  const response = await axios.delete(
    `${API_URL}/remove`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        productId,
      },
    }
  );

  return response.data;
};

export const decreaseQuantity = async (productId) => {
  const token = localStorage.getItem("token");

  // FIX: Swapped hardcoded localhost with dynamic API_URL template string
  const response = await axios.patch(
    `${API_URL}/decrease`,
    { productId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getCartCount = async () => {
  const token = localStorage.getItem("token");

  // FIX: Swapped hardcoded localhost with dynamic API_URL template string
  const response = await axios.get(
    `${API_URL}/count`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};