import axios, { AxiosError } from "axios";
import { Mitra } from "../types/Mitra";

const API_BASE_URL = "http://localhost:8000/api";

export const getDashboardData = async (query: string) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/pembayaran/chart?${query}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw error.response.data;
    }
    throw error instanceof Error ? error.message : "An unknown error occurred";
  }
};

export const updateMitra = async (
  id: string,
  data: Omit<Mitra, "_id">
): Promise<{ status: string; data: Mitra }> => {
  try {
    const response = await axios.put(`${API_BASE_URL}/owner/${id}`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw error.response.data;
    }
    throw error instanceof Error ? error.message : "An unknown error occurred";
  }
};

export const uploadProfilePicture = async (id: string, file: File) => {
  const formData = new FormData();
  formData.append("profile_picture", file);

  try {
    const response = await axios.post(
      `${API_BASE_URL}/owner/${id}/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw error.response.data;
    }
    throw error instanceof Error ? error.message : "An unknown error occurred";
  }
};

export const changePassword = async (data: {
  currentPassword: string;
  newPassword: string;
}) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/owner/change-password`,
      data,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw error.response.data;
    }
    throw error instanceof Error ? error.message : "An unknown error occurred";
  }
};

export const deleteMitra = async (
  id: string
): Promise<{ status: string; message: string }> => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/owner/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw error.response.data;
    }
    throw error instanceof Error ? error.message : "An unknown error occurred";
  }
};
