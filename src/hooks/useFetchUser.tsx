import { useState } from "react";
import { updateUser, changePassword, deleteUser } from "../services/userService";
import { User } from "../types/User";
import Swal from "sweetalert2";

export const useFetchUser = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleUpdateUser = async (id: string, data: Omit<User, "_id">) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const result = await updateUser(id, data);
      Swal.fire({
        title: "Berhasil!",
        text: "Profil Anda berhasil diperbarui.",
        icon: "success",
        confirmButtonText: "OK",
      });
      setSuccess(true);
      return result;
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (data: {
    currentPassword: string;
    newPassword: string;
  }) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const response = await changePassword(data);
      Swal.fire({
        title: "Success",
        text: response.data.message || "Password successfully changed!",
        icon: "success",
        confirmButtonText: "OK",
      });
      setSuccess(true);
    } catch (err: any) {
      setError(err.errors.currentPassword || "Failed to change password");
      Swal.fire({
        title: "Error",
        text: err.errors.currentPassword || "Failed to change password",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await deleteUser(id);

      Swal.fire({
        title: "Berhasil!",
        text: "User berhasil dihapus.",
        icon: "success",
        confirmButtonText: "OK",
      });

      setSuccess(true);
      return response;
    } catch (err: any) {
      Swal.fire({
        title: "Error",
        text: err.message || "Gagal menghapus user.",
        icon: "error",
        confirmButtonText: "OK",
      });

      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { handleUpdateUser, handleChangePassword, handleDeleteUser, loading, error, success };
};
