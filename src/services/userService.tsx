// services/userService.ts
import axios, { AxiosError } from "axios";
import { User } from "../types/User";

const API_BASE_URL = "http://localhost:8000/api";

export const updateUser = async (
  id: string,
  data: Omit<
    {
      nama: string;
      email: string;
      no_telepon: string;
    },
    "_id"
  >
): Promise<{ status: string; data: User }> => {
  try {
    const response = await axios.put(`${API_BASE_URL}/user/${id}`, data, {
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
      `${API_BASE_URL}/user/${id}/upload`,
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
      `${API_BASE_URL}/user/change-password`,
      data,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      throw error.response.data.errors.currentPassword;
    }
    throw error instanceof Error ? error.message : "An unknown error occurred";
  }
};

export const deleteUser = async (
  id: string
): Promise<{ status: string; message: string }> => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/user/${id}`, {
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
