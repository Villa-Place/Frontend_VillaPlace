import axios, { AxiosError } from "axios";
import { Admin } from "../types/Admin";

const API_BASE_URL = "http://localhost:8000/api";

export const getDashboardData = async (query: string) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/admin/dashboard?${query}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      throw error.response.data;
    }
    throw error instanceof Error ? error.message : "An unknown error occurred";
  }
};

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
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      throw error.response.data;
    }
    throw error instanceof Error ? error.message : "An unknown error occurred";
  }
};

export const updateAdmin = async (
  id: string,
  data: Omit<Admin, "_id">
): Promise<{ status: string; data: Admin }> => {
  try {
    const response = await axios.put(`${API_BASE_URL}/admin/${id}`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: unknown) {
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
      `${API_BASE_URL}/admin/change-password`,
      data,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      throw error.response.data;
    }
    throw error instanceof Error ? error.message : "An unknown error occurred";
  }
};
export const deleteAdmin = async (
  id: string
): Promise<{ status: string; message: string }> => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/admin/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError && error.response) {
      throw error.response.data;
    }
    throw error instanceof Error ? error.message : "An unknown error occurred";
  }
};
