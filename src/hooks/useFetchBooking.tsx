import {
  createPesanan,
  createPesananOwner,
  getPesananById,
  getPesananByOwner,
  updatePesanan,
  deletePesanan,
  getPesanan,
  getPesananUser,
} from "@/services/pesananService";
import Booking from "@/types/Booking";

import { useState } from "react";

const useFetchBooking = () => {
  const [loading, setLoading] = useState<boolean>(false);
  // const [error, setError] = useStat>(null);
  const [error, setError] = useState<string | null | unknown>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleGetAllBooking = async (query: string) => {
    setLoading(true);
    setError(null);

    try {
      const result = await getPesanan(query);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleGetBookingById = async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const result = await getPesananById(id);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleGetBookingByOwner = async (query: string) => {
    setLoading(true);
    setError(null);

    try {
      const result = await getPesananByOwner(query);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleGetBookingByUser = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await getPesananUser();
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBooking = async (dataBooking: Booking) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const result = await createPesanan(dataBooking);
      setSuccess(true);

      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBookingOwner = async (dataBooking: Booking) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const result = await createPesananOwner(dataBooking);
      setSuccess(true);

      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateBooking = async (id: string, dataBooking: Booking) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const result = await updatePesanan(id, dataBooking);
      setSuccess(true);

      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBooking = async (id: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const result = await deletePesanan(id);
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
    handleCreateBooking,
    handleGetBookingByUser,
    handleCreateBookingOwner,
    handleGetAllBooking,
    handleGetBookingById,
    handleGetBookingByOwner,
    handleUpdateBooking,
    handleDeleteBooking,
    loading,
    error,
    success,
  };
};

export default useFetchBooking;
