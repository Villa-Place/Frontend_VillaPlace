import axios from "axios";

const API_URL = "http://localhost:8000/api/favorite";

export const getFavorites = async () => {
  const response = await axios.get(API_URL, { withCredentials: true });
  return response.data;
};

export const deleteFavorite = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`, {
    withCredentials: true,
  });
  return response.data;
};
