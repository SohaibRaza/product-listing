import api from "./base";

export const fetchProducts = async () => {
  try {
    const response = await api.get("/benirvingplt/products/products");
    return response.data;
  } catch (error) {
    throw error;
  }
};
