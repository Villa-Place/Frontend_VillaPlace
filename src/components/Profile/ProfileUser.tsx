"use client";

import React, { useState, useEffect } from "react";
import ProfilePictureUploader from "./ProfilePictureUploader";
import ProfileDisplay from "./ProfileDisplay";
import EditProfileModal from "./EditProfileModal";
import useFetchData from "../../hooks/useFetchData";
import { useFetchUser } from "../../hooks/useFetchUser";
import Swal from "sweetalert2";
import { FormikHelpers } from "formik";

interface UserData {
  _id: string;
  nama: string;
  email: string;
  no_telepon: string;
}

const ProfileUser = () => {
  const { handleUpdateUser, error } = useFetchUser();
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
    values: Omit<UserData, "_id">,
    formikHelpers: FormikHelpers<{
      _id: string;
      nama: string;
      email: string;
      no_telepon: string;
    }>
  ) => {
    try {
      const updatedUser = await handleUpdateUser(userData._id, values);
      setShowModal(false);
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
        console.error(err);
      }
    }
  };

  return (
    <>
      <div className="flex gap-10 md:flex-row flex-col">
        <ProfilePictureUploader role="user" userId={userData._id} />
        <ProfileDisplay userData={userData} onEdit={() => setShowModal(true)} />
        {showModal && (
          <EditProfileModal
            userData={userData}
            onSubmit={(values: Omit<UserData, "_id">, formikHelpers) =>
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
