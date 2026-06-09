import axios from "axios";

const API =
  import.meta.env.VITE_SERVER_URL;

const API_URL =
  `${API}/api/dashboard`;

export const getDashboard =
  async () => {

    const token =
      localStorage.getItem("token");

    const response =
      await axios.get(
        API_URL,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
};