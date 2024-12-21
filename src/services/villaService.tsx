import { VillaProps } from "@/types/Villa";
import axios, { AxiosError } from "axios";
const API_BASE_URL = "http://localhost:8000/api";

export const getVillas = async (query: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/villa?${query}`, {
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

export const getVillaById = async (id: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/villa/${id}`, {
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

export const getVillaByOwner = async (query: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/villa/owner?${query}`, {
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

export const getVillaBookedDates = async (id: string) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/villa/${id}/booked-dates`,
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

export const createVilla = async (data: VillaProps) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/villa`, data, {
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

export const updateVilla = async (id: string, data: VillaProps) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/villa/${id}`, data, {
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

export const deleteVilla = async (id: string) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/villa/${id}`, {
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
