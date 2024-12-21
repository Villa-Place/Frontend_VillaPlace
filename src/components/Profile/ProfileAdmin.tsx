"use client";

import React, { useState, useEffect } from "react";
import ProfileDisplayAdmin from "./ProfileDisplayAdmin";
import EditProfileModalAdmin from "./EditProfileModalAdmin";
import useFetchData from "../../hooks/useFetchData";
import { useFetchAdmin } from "../../hooks/useFetchAdmin";
import { Admin } from "../../types/Admin";
import Swal from "sweetalert2";
import { FormikHelpers } from "formik";

interface AdminData {
  _id: string;
  nama: string;
  email: string;
}

const ProfileAdmin = () => {
  const { handleUpdateAdmin, error } = useFetchAdmin();
  const [showModal, setShowModal] = useState(false);
  const [adminData, setAdminData] = useState({
    _id: "",
    nama: "",
    email: "",
  });

  const { data } = useFetchData(
    "http://localhost:8000/api/admin/current-admin",
    {
      withCredentials: true,
    }
  );

  useEffect(() => {
    if (data) {
      setAdminData(data.data);
    }
  }, [data]);

  const handleUpdate = async (
    values: Omit<Admin, "_id">,
    formikHelpers: FormikHelpers<{
      _id: string;
      nama: string;
      email: string;
    }>
  ) => {
    try {
      const updatedAdmin = await handleUpdateAdmin(adminData._id, values);
      setShowModal(false);
      setAdminData(updatedAdmin.data);
    } catch (err) {
      if (error?.errors) {
        const backendErrors = error.errors;
        Object.keys(backendErrors).forEach((key) => {
          formikHelpers.setFieldError(key, backendErrors[key]);
        });
      } else {
        Swal.fire({
          title: "Gagal!",
          text: "Gagal memperbarui profil. Silakan coba lagi.",
          icon: "error",
          confirmButtonText: "OK",
        });
        console.error(err);
      }
    }
  };

  return (
    <>
      <ProfileDisplayAdmin
        adminData={adminData}
        onEdit={() => setShowModal(true)}
      />
      {showModal && (
        <EditProfileModalAdmin
          adminData={adminData}
          onSubmit={(
            values: AdminData,
            formikHelpers: FormikHelpers<{
              _id: string;
              nama: string;
              email: string;
            }>
          ) => handleUpdate(values, formikHelpers)}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default ProfileAdmin;
