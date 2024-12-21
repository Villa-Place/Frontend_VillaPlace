import Payment from "@/types/Payment";
import axios from "axios";

const API_URL = "http://localhost:8000/api/pembayaran";

export const getPembayaran = async () => {
  const response = await axios.get(API_URL, {
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};
export const getAllPayment = async (query: string) => {
  const response = await axios.get(`${API_URL}?${query}`, {
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

export const getAllPaymentOwner = async (query: string) => {
  const response = await axios.get(`${API_URL}/owner?${query}`, {
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

export const getPaymentById = async (id: string) => {
  const response = await axios.get(`${API_URL}/${id}`, {
    withCredentials: true,
  });
  return response.data;
};

export const createPembayaran = async (data: Payment) => {
  const response = await axios.post(API_URL, data, {
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

export const updatePayment = async (id: string, data: Payment) => {
  const response = await axios.put(`${API_URL}/${id}`, data, {
    withCredentials: true,
  });
  return response.data;
};

export const deletePayment = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`, {
    withCredentials: true,
  });
  return response.data;
};
