// services/userService.ts
import axios from "axios";
import { User } from "../types/User";

const API_BASE_URL = "http://localhost:8000/api";

export const updateUser = async (
  id: string,
  data: Omit<User, "_id">
): Promise<{ status: string; data: User }> => {
  try {
    const response = await axios.put(`${API_BASE_URL}/user/${id}`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error;
  }
};

export const uploadProfilePicture = async (
  id: string,
  file: File
): Promise<any> => {
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
  } catch (error: any) {
    throw error.response ? error.response.data : error;
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
  } catch (error: any) {
    throw error.response ? error.response.data : error;
  }
};

export const deleteUser = async (id: string): Promise<{ status: string; message: string }> => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/user/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message || "Failed to delete user";
  }
};