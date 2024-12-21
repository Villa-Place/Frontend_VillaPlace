import { useState } from "react";
import {
  postUlasan,
  deleteUlasan,
  getUlasanUser,
} from "@/services/ulasanService";
import Swal from "sweetalert2";
import { AddUlasan } from "@/types/Ulasan";
import { AxiosError } from "axios";

export const useFetchUlasan = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null | unknown>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleGetUlasanUser = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await getUlasanUser();
      setError(null);
      setSuccess(true);
      return response;
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };
  const handleFetchUlasan = async (data: AddUlasan) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const result = await postUlasan(data);

      Swal.fire({
        title: "Success",
        text: "Ulasan berhasil ditambahkan",
        icon: "success",
        confirmButtonText: "OK",
        timer: 3000,
      });
      setSuccess(true);

      return result;
    } catch (err) {
      if (err instanceof AxiosError) {
        Swal.fire({
          title: "Error",
          text: err.response?.data?.message || "Gagal menambahkan ulasan",
          icon: "error",
          confirmButtonText: "OK",
        });
        setError(err.message);
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUlasan = async (id: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const result = await deleteUlasan(id);

      Swal.fire({
        title: "Deleted",
        text: "Ulasan berhasil dihapus",
        icon: "success",
        confirmButtonText: "OK",
        timer: 3000,
      });
      setSuccess(true);

      return result;
    } catch (err) {
      if (err instanceof AxiosError) {
        Swal.fire({
          title: "Error",
          text: err.response?.data?.message || "Gagal menghapus ulasan",
          icon: "error",
          confirmButtonText: "OK",
        });
        setError(err.message);
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    handleFetchUlasan,
    handleGetUlasanUser,
    handleDeleteUlasan,
    loading,
    error,
    success,
  };
};
