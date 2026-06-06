import axios from "axios";

const API_URL = "http://localhost:5000/api/orders";

export const placeOrder = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    `${API_URL}/place`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getMyOrders = async () => {
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