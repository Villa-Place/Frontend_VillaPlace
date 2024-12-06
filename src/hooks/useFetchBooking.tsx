import { createPesanan } from "@/services/pesananService";
import React, { useState } from "react";

const useFetchBooking = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleCreateBooking = async (dataPayment: any) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const result = await createPesanan(dataPayment);
      setSuccess(true);

      return result;
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { handleCreateBooking, loading, error, success };
};

export default useFetchBooking;
