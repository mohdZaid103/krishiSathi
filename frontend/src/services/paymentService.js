import axios from "axios";

const API_URL =
  import.meta.env.VITE_SERVER_URL;

const API =
  `${API_URL}/api/orders`;

export const createPaymentOrder =
  async () => {

    const token =
      localStorage.getItem("token");

    const response =
      await axios.post(
        `${API}/create-payment-order`,
        {},
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
};
export const verifyPayment =
  async (paymentData) => {

    const token =
      localStorage.getItem("token");

    const response =
      await axios.post(
        `${API}/verify-payment`,
        paymentData,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
};