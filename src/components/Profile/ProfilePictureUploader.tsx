import React, { useState, ChangeEvent } from "react";
import axios from "axios";
import Swal from "sweetalert2";

interface ProfilePictureUploaderProps {
  userId: string;
  role: string;
}

const ProfilePictureUploader: React.FC<ProfilePictureUploaderProps> = ({
  userId,
  role,
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const maxSizeInBytes = 5 * 1024 * 1024; // 10 MB
      if (file.size > maxSizeInBytes) {
        Swal.fire({
          title: "File terlalu besar",
          text: "Ukuran file tidak boleh lebih dari 10 MB.",
          icon: "error",
          confirmButtonText: "OK",
        });
        return;
      }

      const validTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!validTypes.includes(file.type)) {
        Swal.fire({
          title: "Format file tidak didukung",
          text: "Hanya file dengan format JPG, JPEG, atau PNG yang diperbolehkan.",
          icon: "error",
          confirmButtonText: "OK",
        });
        return;
      }

      // Membaca file jika ukuran valid
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!imagePreview) {
      await Swal.fire({
        title: "File belum dipilih",
        text: "Silakan pilih file terlebih dahulu.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }

    try {
      const formData = new FormData();
      const fileInput = document.getElementById("upload") as HTMLInputElement;
      if (fileInput.files) {
        formData.append("foto_profile", fileInput.files[0]);
        await axios.post(
          `http://localhost:8000/api/${role}/${userId}/upload`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
          }
        );
        Swal.fire({
          title: "Upload Berhasil!",
          text: "Foto profile berhasil diupload.",
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          // Cek apakah pengguna menekan tombol OK atau menutup modal
          if (result.isConfirmed || result.isDismissed) {
            // Refresh halaman
            window.location.reload();
            setImagePreview(null);

            // Reset file input
            fileInput.value = "";
          }
        });

        setImagePreview(null);
        fileInput.value = "";
      }
    } catch (error) {
      Swal.fire({
        title: "Gagal!",
        text: "Gagal mengupload foto profile. Silakan coba lagi.",
        icon: "error",
        confirmButtonText: "OK",
      });
      console.error("Failed to upload image:", error);
    }
  };

  return (
    <form action="" className="md:w-[40%] w-full rounded-md p-5 border shadow">
      <div className="flex flex-col justify-center items-center">
        <label
          htmlFor="upload"
          className="text-md font-semibold mb-5 text-black dark:text-white"
        >
          Foto Profile
        </label>
        <div
          id="image-preview"
          className="w-full h-56 mb-4 bg-gray-100 border-dashed border-2 border-gray-400 rounded-lg flex items-center justify-center text-center cursor-pointer"
        >
          <input
            id="upload"
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />
          <label htmlFor="upload" className="cursor-pointer w-full h-full">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <div className="h-full flex flex-col justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 text-gray-700 mx-auto mb-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                  />
                </svg>
                <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-700">
                  Pilih Foto
                </h5>
                <p className="font-normal text-sm text-gray-400 md:px-6">
                  Ukuran foto maks.: <b className="text-gray-600">10mb</b>
                </p>
                <p className="font-normal text-sm text-gray-400 md:px-6">
                  Format foto:{" "}
                  <b className="text-gray-600">JPG, PNG, atau JPEG</b>.
                </p>
              </div>
            )}
          </label>
        </div>
      </div>

      <div className="flex justify-center items-center">
        <button
          type="button"
          onClick={handleUpload}
          className="flex w-full justify-center font-semibold text-[#089562] bg-[#089562] bg-opacity-10 border border-[#089562] hover:bg-opacity-30 rounded text-sm px-3 py-1.5 me-2 dark:bg-green-600 dark:hover:bg-green-700"
        >
          Upload
        </button>
      </div>
    </form>
  );
};

export default ProfilePictureUploader;
