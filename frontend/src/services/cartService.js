import axios from "axios";

const API_URL = "http://localhost:5000/api/cart";

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
    API_URL, // Used the constant here for consistency
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

  const response = await axios.delete(
    "http://localhost:5000/api/cart/remove",
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
export const decreaseQuantity = async (
  productId
) => {
  const token = localStorage.getItem("token");

  const response = await axios.patch(
    "http://localhost:5000/api/cart/decrease",
    { productId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getCartCount =
  async () => {

    const token =
      localStorage.getItem("token");

    const response =
      await axios.get(
        "http://localhost:5000/api/cart/count",
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
};