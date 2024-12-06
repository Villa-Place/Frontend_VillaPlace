"use client";
import React from "react";
import { useFormik } from "formik";

import * as Yup from "yup";
import { useFetchUser } from "../../hooks/useFetchUser";

const ChangePassword = () => {
  // const { handleChangePassword, loading, error } = useChangePassword();
  const { handleChangePassword, loading, error } = useFetchUser();

  // Formik setup
  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string().required("Password lama wajib diisi"),
      newPassword: Yup.string()
        .min(8, "Password baru minimal 8 karakter")
        .required("Password baru wajib diisi"),
      confirmPassword: Yup.string()
        .oneOf(
          [Yup.ref("newPassword"), undefined],
          "Konfirmasi password tidak cocok"
        )
        .required("Konfirmasi password wajib diisi"),
    }),
    onSubmit: (values, formikHelpers) => {
      try {
        if (error) {
          console.log("error", error);
          formikHelpers.setFieldError("currentPassword", error);
        } else {
          const { currentPassword, newPassword } = values;
          handleChangePassword({ currentPassword, newPassword });
          formikHelpers.resetForm();
        }
      } catch (err: any) {
        console.error(err);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="max-w-2xl mt-8 mx-auto">
      <div className="flex justify-between mb-10 flex-col md:flex-row">
        <label
          htmlFor="currentPassword"
          className="text-md font-semibold text-black dark:text-white"
        >
          Password Lama
        </label>
        <div className="md:w-2/3 w-full">
          <input
            type="password"
            id="currentPassword"
            className={`bg-gray-50 border text-sm rounded-lg block w-full p-2.5 ${
              formik.errors.currentPassword && formik.touched.currentPassword
                ? "border-red-500"
                : "border-gray-300"
            }`}
            {...formik.getFieldProps("currentPassword")}
          />

          {formik.errors.currentPassword && formik.touched.currentPassword && (
            <span className="text-red-500 text-sm">
              {formik.errors.currentPassword}
            </span>
          )}
        </div>
      </div>

      <div className="flex justify-between gap-2 flex-col md:flex-row mb-10">
        <label
          htmlFor="newPassword"
          className="text-md font-semibold text-black dark:text-white"
        >
          Password Baru
        </label>
        <div className="md:w-2/3 w-full">
          <input
            type="password"
            id="newPassword"
            className={`bg-gray-50 border text-sm rounded-lg block w-full p-2.5 ${
              formik.errors.newPassword && formik.touched.newPassword
                ? "border-red-500"
                : "border-gray-300"
            }`}
            {...formik.getFieldProps("newPassword")}
          />
          {formik.errors.newPassword && formik.touched.newPassword && (
            <span className="text-red-500 text-sm">
              {formik.errors.newPassword}
            </span>
          )}
        </div>
      </div>

      <div className="flex justify-between mb-10 flex-col md:flex-row">
        <label
          htmlFor="confirmPassword"
          className="text-md font-semibold text-black dark:text-white"
        >
          Konfirmasi Password
        </label>
        <div className="md:w-2/3 w-full">
          <input
            type="password"
            id="confirmPassword"
            className={`bg-gray-50 border text-sm rounded-lg block w-full p-2.5 ${
              formik.errors.confirmPassword && formik.touched.confirmPassword
                ? "border-red-500"
                : "border-gray-300"
            }`}
            {...formik.getFieldProps("confirmPassword")}
          />
          {formik.errors.confirmPassword && formik.touched.confirmPassword && (
            <span className="text-red-500 text-sm">
              {formik.errors.confirmPassword}
            </span>
          )}
        </div>
      </div>

      <div className="flex justify-end items-end">
        <button
          type="submit"
          className={`flex justify-end font-semibold text-white bg-[#089562] hover:bg-green-800 rounded text-sm px-3 py-2 me-2 dark:bg-green-600 dark:hover:bg-green-700 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Loading..." : "Ganti Password"}
        </button>
      </div>
    </form>
  );
};

export default ChangePassword;
