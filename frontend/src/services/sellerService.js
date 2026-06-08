import axios from "axios";

const API =
  "http://localhost:5000/api/products";

export const getMyProducts =
  async () => {

    const token =
      localStorage.getItem("token");

    const response =
      await axios.get(
        `${API}/my-products`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };

export const createProduct = async (
  productData
) => {

  const token =
    localStorage.getItem("token");

  const response =
    await axios.post(
      API,
      productData,
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

  return response.data;
};