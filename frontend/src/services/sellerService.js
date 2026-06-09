import axios from "axios";

const API_url =
  import.meta.env.VITE_SERVER_URL;

const API =
  `${API_url}/api/products`;

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
export const deleteProduct =
  async (id) => {

    const token =
      localStorage.getItem("token");

    const response =
      await axios.delete(
        `${API}/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };

  export const getSellerOrders =
  async () => {

    const token =
      localStorage.getItem("token");

    const response =
      await axios.get(
        `${API_url}/api/orders/seller`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };
  export const updateOrderStatus =
  async (id, status) => {

    const token =
      localStorage.getItem("token");

    const response =
      await axios.put(
        `${API_url}/api/orders/${id}/status`,
        { status },
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };

  export const getSellerAnalytics =
  async () => {

    const token =
      localStorage.getItem("token");

    const response =
      await axios.get(
        `${API_url}/api/orders/seller/analytics`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };
  export const updateProduct =
  async (id, productData) => {

    const token =
      localStorage.getItem("token");

    const response =
      await axios.put(
        `${API}/${id}`,
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

  export const getSellerProductById =
  async (id) => {

    const token =
      localStorage.getItem("token");

    const response =
      await axios.get(
        `${API}/seller-product/${id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    return response.data;
  };