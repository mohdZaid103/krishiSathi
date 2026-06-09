import axios from "axios";

const API =
  import.meta.env.VITE_SERVER_URL;

const API_URL = `${API}/api/products`;

export const getProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
