import React from "react";
import { useFormik, FormikHelpers } from "formik";
import * as Yup from "yup";

interface EditProfileModalProps {
  adminData: {
    _id: string;
    nama: string;
    email: string;
  };
  onSubmit: (
    values: {
      _id: string;
      nama: string;
      email: string;
    },
    formikHelpers: FormikHelpers<{
      _id: string;
      nama: string;
      email: string;
    }>
  ) => void;
  onClose: () => void;
}

const EditProfileModalAdmin: React.FC<EditProfileModalProps> = ({
  adminData,
  onSubmit,
  onClose,
}) => {
  const formik = useFormik({
    initialValues: adminData,
    validationSchema: Yup.object({
      nama: Yup.string()
        .min(3, "Nama harus memiliki minimal 3 karakter")
        .required("Nama wajib diisi"),
      email: Yup.string()
        .email("Email tidak valid")
        .required("Email wajib diisi"),
    }),
    onSubmit: async (values, formikHelpers) => {
      await onSubmit(values, formikHelpers); // Kirim formikHelpers ke parent
    },
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg md:w-1/3 w-full mx-2 max-w-md ">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold mb-4">Edit Profile</h2>
          <button onClick={onClose} className="text-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="nama"
              className="block text-md font-medium text-gray-700"
            >
              Nama Lengkap
            </label>
            <input
              type="text"
              id="nama"
              name="nama"
              value={formik.values.nama}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`mt-4 bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5
              ${
                formik.touched.nama && formik.errors.nama
                  ? "border-red-500 "
                  : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              }
              dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
            />
            {formik.touched.nama && formik.errors.nama && (
              <div className="text-red-500 text-sm">{formik.errors.nama}</div>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-md font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`mt-4 bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5
              ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500 "
                  : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              }
              dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
            />{" "}
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            )}
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-md"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex items-center font-semibold text-white bg-[#089562] hover:bg-green-800 rounded text-sm px-3 py-2 dark:bg-green-600 dark:hover:bg-green-700"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModalAdmin;
