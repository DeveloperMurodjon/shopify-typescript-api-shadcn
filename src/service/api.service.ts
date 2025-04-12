import axios from "axios";

// Global interceptors ni sozlash
axios.interceptors.request.use((config) => {
  config.baseURL = "https://dummyjson.com";
  return config;
});

const ProductAPIMobileAccessories = {
  getAll: async () => {
    const { data } = await axios.get(`/products/category/mobile-accessories`);
    return data;
  },
};

const ProductAPISmartphones = {
  getAll: async () => {
    const { data } = await axios.get(`/products/category/smartphones`); // Typo tuzatildi
    return data;
  },
};

export { ProductAPIMobileAccessories, ProductAPISmartphones }; // Individual eksport qilish
