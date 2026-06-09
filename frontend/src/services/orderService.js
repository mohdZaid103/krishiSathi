import axios from "axios";

const API =
  import.meta.env.VITE_SERVER_URL;

const API_URL = `${API}/api/orders`;

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

export const getOrderById =
  async (id) => {

    const token =
      localStorage.getItem("token");

    const response =
      await axios.get(
        `http://localhost:5000/api/orders/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
};