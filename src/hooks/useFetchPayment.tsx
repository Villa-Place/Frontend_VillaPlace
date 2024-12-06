import { createPembayaran } from "@/services/pembayaranService";
import React, { useState } from "react";

const useFetchPayment = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleCreatePayment = async (dataPayment: any) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const result = await createPembayaran(dataPayment);
      setSuccess(true);

      return result;
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { handleCreatePayment, loading, error, success };
};

export default useFetchPayment;
