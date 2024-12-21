import React from "react";
import ProfilePictureUploader from "./ProfilePictureUploader";

interface ProfileProps {
  data: {
    _id: string;
    nama: string;
    email: string;
    no_telepon: string;
  };
  setMenuOpen: (menu: string) => void;
  role: string;
}

const ProfileDashboard: React.FC<ProfileProps> = ({
  data,
  setMenuOpen,
  role,
}) => {
  return (
    <div className="flex gap-10 md:flex-row flex-col">
      {role !== "admin" && (
        <ProfilePictureUploader role="owner" userId={data._id} />
      )}

      <div className={` ${role === "admin" ? "w-full" : "w-1/2"}`}>
        <div className="max-w-2xl mt-10 mx-auto">
          <div>
            {/* Nama Lengkap */}
            <div className="flex flex-col mb-8">
              <span className="text-md w-1/2 font-semibold text-black dark:text-white">
                Nama Lengkap
              </span>
              <span className="text-gray-700 dark:text-gray-300">
                {data.nama}
              </span>
            </div>

            {/* Email */}
            <div className="flex flex-col mb-8">
              <span className="text-md w-1/2 font-semibold text-black dark:text-white">
                Email
              </span>
              <span className="text-gray-700 dark:text-gray-300">
                {data.email}
              </span>
            </div>

            {role !== "admin" && (
              <div className="flex flex-col mb-15">
                <span className="text-md w-1/2 font-semibold text-black dark:text-white">
                  Nomor Telepon
                </span>
                <span className="text-gray-700 dark:text-gray-300">
                  {data.no_telepon}
                </span>
              </div>
            )}

            {/* Edit Profile Button */}
            <div className="flex mr-10 justify-end items-end space-x-4">
              <button
                onClick={() => setMenuOpen("editProfile")}
                className="flex items-center font-semibold text-white bg-[#089562] hover:bg-green-800 rounded text-sm px-3 py-2 dark:bg-green-600 dark:hover:bg-green-700"
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;
