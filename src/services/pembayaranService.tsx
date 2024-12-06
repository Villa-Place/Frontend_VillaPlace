import axios from "axios";

const API_URL = "http://localhost:8000/api/pembayaran";

export const getPembayaran = async () => {
  const response = await axios.get(API_URL, {
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

export const createPembayaran = async (data: any) => {
  const response = await axios.post(API_URL, data, {
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};
