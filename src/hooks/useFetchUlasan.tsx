import { useState } from "react";
import { postUlasan, deleteUlasan } from "@/services/ulasanService";
import Swal from "sweetalert2";

export const useFetchUlasan = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleFetchUlasan = async (data: any) => {
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
    } catch (err: any) {
      Swal.fire({
        title: "Error",
        text: err.response?.data?.message || "Gagal menambahkan ulasan",
        icon: "error",
        confirmButtonText: "OK",
      });
      setError(err);
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
    } catch (err: any) {
      Swal.fire({
        title: "Error",
        text: err.response?.data?.message || "Gagal menghapus ulasan",
        icon: "error",
        confirmButtonText: "OK",
      });
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { handleFetchUlasan, handleDeleteUlasan, loading, error, success };
};
