import { useState } from "react";
import {
  getVillas,
  getVillaByOwner,
  getVillaBookedDates,
  getVillaById,
} from "../services/villaService";

export const useFetchVilla = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null | unknown>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleGetVillas = async (query: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const result = await getVillas(query);
      setSuccess(true);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleGetVillaById = async (id: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const result = await getVillaById(id);
      setSuccess(true);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleGetVillaByOwner = async (query: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const result = await getVillaByOwner(query);
      setSuccess(true);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleGetVillaBookedDates = async (id: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const result = await getVillaBookedDates(id);
      setSuccess(true);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    success,
    handleGetVillas,
    handleGetVillaByOwner,
    handleGetVillaBookedDates,
    handleGetVillaById,
  };
};
