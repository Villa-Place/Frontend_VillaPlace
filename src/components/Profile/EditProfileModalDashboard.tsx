import React from "react";
import { useFormik, FormikHelpers } from "formik";
import * as Yup from "yup";

interface EditProfileProps {
  data: {
    _id: string;
    nama: string;
    email: string;
    no_telepon: string;
  };
  setMenuOpen: (menu: string) => void;
  handleSubmitMitra: (
    values: {
      _id: string;
      nama: string;
      email: string;
      no_telepon: string;
    },
    formikHelpers: FormikHelpers<{
      _id: string;
      nama: string;
      email: string;
      no_telepon: string;
    }>
  ) => void;
}

const EditProfileDashboard: React.FC<EditProfileProps> = ({
  data,
  setMenuOpen,
  handleSubmitMitra,
}) => {
  const formik = useFormik({
    initialValues: data,
    validationSchema: Yup.object({
      nama: Yup.string()
        .min(3, "Nama harus memiliki minimal 3 karakter")
        .required("Nama wajib diisi"),
      email: Yup.string()
        .email("Email tidak valid")
        .required("Email wajib diisi"),
      no_telepon: Yup.string()
        .matches(/^[0-9]+$/, "Nomor telepon hanya boleh berisi angka")
        .min(10, "Nomor telepon minimal 10 digit")
        .max(13, "Nomor telepon maksimal 13 digit")
        .required("Nomor telepon wajib diisi"),
    }),
    onSubmit: async (values, formikHelpers) => {
      handleSubmitMitra(values, formikHelpers);
    },
  });

  return (
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

      <div className="mb-4">
        <label
          htmlFor="no_telepon"
          className="block text-md font-medium text-gray-700"
        >
          Nomor Telepon
        </label>
        <input
          type="text"
          id="no_telepon"
          name="no_telepon"
          value={formik.values.no_telepon}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`mt-4 bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5
              ${
                formik.touched.no_telepon && formik.errors.no_telepon
                  ? "border-red-500 "
                  : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              }
              dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
        />
        {formik.touched.no_telepon && formik.errors.no_telepon && (
          <div className="text-red-500 text-sm">{formik.errors.no_telepon}</div>
        )}
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={() => setMenuOpen("profile")}
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
  );
};

export default EditProfileDashboard;
