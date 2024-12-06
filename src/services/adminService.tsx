import axios from "axios";
import { Admin } from "../types/Admin";

const API_BASE_URL = "http://localhost:8000/api";

export const createAdmin = async (
    data: Omit<Admin, "_id">
  ): Promise<{ status: string; data: Admin }> => {
    try {
      const response = await axios.post<{ status: string; data: Admin }>(
        `${API_BASE_URL}/admin/`,
        data,
        { withCredentials: true }
      );
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message || "An unknown error occurred";
    }
  };

export const updateAdmin = async (
  id: string,
  data: Omit<Admin, "_id">
): Promise<{ status: string; data: Admin }> => {
  try {
    const response = await axios.put(`${API_BASE_URL}/user/${id}`, data, {
      withCredentials: true,
    });
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
      `${API_BASE_URL}/admin/change-password`,
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
export const deleteAdmin = async (id: string): Promise<{ status: string; message: string }> => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/admin/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error: any) {
      throw error.response?.data || error.message || "Failed to delete user";
    }
  };
