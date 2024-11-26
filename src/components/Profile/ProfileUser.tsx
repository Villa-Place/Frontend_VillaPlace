"use client";
import React, { useState, useEffect } from "react";
import ProfilePictureUploader from "./ProfilePictureUploader";
import ProfileDisplay from "./ProfileDisplay";
import EditProfileModal from "./EditProfileModal";
import useFetchData from "../../hooks/useFetchData";
import { useUpdateUser } from "../../hooks/useUpdateUser";
import { User } from "../../types/User";
import Swal from "sweetalert2";

const ProfileUser = () => {
  const { handleUpdateUser, loading, error, success } = useUpdateUser();
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState({
    _id: "",
    nama: "",
    email: "",
    no_telepon: "",
  });

  const { data } = useFetchData("http://localhost:8000/api/user/current-user", {
    withCredentials: true,
  });

  useEffect(() => {
    if (data) {
      setUserData(data.data);
    }
  }, [data]);

  const handleUpdate = async (
    values: Omit<User, "_id">,
    formikHelpers: any
  ) => {
    try {
      const updatedUser = await handleUpdateUser(userData._id, values);
      setShowModal(false);
      Swal.fire({
        title: "Berhasil!",
        text: "Profil Anda berhasil diperbarui.",
        icon: "success",
        confirmButtonText: "OK",
      });
      setUserData(updatedUser.data);
    } catch (err) {
      if (error.errors) {
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
      }
    }
  };

  return (
    <>
      <div className="flex gap-10">
        <ProfilePictureUploader userId={userData._id} />
        <ProfileDisplay userData={userData} onEdit={() => setShowModal(true)} />
        {showModal && (
          <EditProfileModal
            userData={userData}
            onSubmit={(values: any, formikHelpers: any) =>
              handleUpdate(values, formikHelpers)
            }
            onClose={() => setShowModal(false)}
          />
        )}
      </div>
    </>
  );
};

export default ProfileUser;