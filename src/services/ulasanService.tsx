import { AddUlasan } from "@/types/Ulasan";
import axios from "axios";

const API_URL = "http://localhost:8000/api/ulasan";

export const getUlasan = async () => {
  const response = await axios.get(API_URL, { withCredentials: true });
  return response.data;
};

export const getUlasanUser = async () => {
  const response = await axios.get(`${API_URL}/user`, {
    withCredentials: true,
  });
  return response.data;
};

export const postUlasan = async (data: AddUlasan) => {
  const response = await axios.post(API_URL, data, { withCredentials: true });
  return response.data;
};

export const deleteUlasan = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`, {
    withCredentials: true,
  });
  return response.data;
};
