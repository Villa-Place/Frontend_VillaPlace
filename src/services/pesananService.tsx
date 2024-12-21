import Booking from "@/types/Booking";
import axios from "axios";

const API_URL = "http://localhost:8000/api/pesanan";

export const getPesanan = async (query: string) => {
  const response = await axios.get(`${API_URL}?${query}`, {
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

export const getPesananById = async (id: string) => {
  const response = await axios.get(`${API_URL}/${id}`, {
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

export const getPesananByOwner = async (query: string) => {
  const response = await axios.get(`${API_URL}/owner?${query}`, {
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

export const getPesananUser = async () => {
  const response = await axios.get(`${API_URL}/user`, {
    withCredentials: true,
  });

  return response.data;
};

export const createPesanan = async (data: Booking) => {
  const response = await axios.post(API_URL, data, {
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

export const createPesananOwner = async (data: Booking) => {
  const response = await axios.post(`${API_URL}/createPesananOwner`, data, {
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

export const updatePesanan = async (id: string, data: Booking) => {
  const response = await axios.put(`${API_URL}/${id}`, data, {
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

export const deletePesanan = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`, {
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};
