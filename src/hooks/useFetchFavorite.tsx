import { useState } from "react";
import { deleteFavorite } from "../services/favoriteService";

export const useFetchFavorite = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleDeleteFavorite = async (id: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const result = await deleteFavorite(id);
      setSuccess(true);

      return result;
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { handleDeleteFavorite, loading, error, success };
};
