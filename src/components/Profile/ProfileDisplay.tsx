import React from "react";

interface ProfileDisplayProps {
  userData: {
    nama: string;
    email: string;
    no_telepon: string;
  };
  onEdit: () => void;
}

const ProfileDisplay: React.FC<ProfileDisplayProps> = ({
  userData,
  onEdit,
}) => (
  <div className="md:w-[60%] w-full">
    <div className="max-w-2xl mt-10 mx-auto">
      <div>
        <div className="flex mb-8">
          <span className="text-md w-1/2 font-semibold text-black dark:text-white">
            Nama Lengkap
          </span>
          <span className="text-gray-700 dark:text-gray-300">
            : {userData.nama}
          </span>
        </div>
        <div className="flex mb-8">
          <span className="text-md w-1/2 font-semibold text-black dark:text-white">
            Email
          </span>
          <span className="text-gray-700 dark:text-gray-300">
            : {userData.email}
          </span>
        </div>
        <div className="flex mb-15">
          <span className="text-md w-1/2 font-semibold text-black dark:text-white">
            Nomor Telepon
          </span>
          <span className="text-gray-700 dark:text-gray-300">
            : {userData.no_telepon}
          </span>
        </div>
        <div className="flex mr-10 justify-end items-end ">
          <button
            onClick={onEdit}
            className="flex items-center font-semibold text-white bg-[#089562] hover:bg-green-800 rounded text-sm px-3 py-2 dark:bg-green-600 dark:hover:bg-green-700"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default ProfileDisplay;
