"use client";

import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

interface FormValues {
  email: string;
  password: string;
}

const LoginForm = () => {
  const router = useRouter();

  // Schema validasi dengan Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Email tidak valid")
      .required("Email wajib diisi"),
    password: Yup.string()
      .min(6, "Password minimal 6 karakter")
      .required("Password wajib diisi"),
  });

  // Handle submit
  const handleSubmit = async (
    values: { email: string; password: string },
    {}: FormikHelpers<FormValues>
  ) => {
    try {
      const res = await axios.post(
        `http://localhost:8000/api/auth/admin/login`,
        {
          email: values.email,
          password: values.password,
        },
        {
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        router.push("/dashboard/admin");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        Swal.fire({
          icon: "error",
          title: "Gagal Login",
          text: error?.response?.data.message,
        });
      }
      Swal.fire({
        icon: "error",
        title: "Gagal Login",
        text: "Terjadi kesalahan saat login",
      });
    }
  };

  return (
    <div className="w-full max-w-sm">
      <h1 className="text-4xl text-center font-bold mb-16">Login Admin</h1>

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-10">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-bold text-gray-700"
              >
                Email
              </label>
              <Field
                type="text"
                name="email"
                id="email"
                className="block w-full border-b-2 border-green-500 focus:outline-none focus:border-green-600"
                placeholder="Enter Email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-bold text-gray-700"
              >
                Password
              </label>
              <Field
                type="password"
                name="password"
                id="password"
                className="block w-full border-b-2 border-green-500 focus:outline-none focus:border-green-600"
                placeholder="Enter Password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-green-600 text-white py-3 mt-11 mb-3 rounded-3xl hover:bg-green-700 transition"
            >
              {isSubmitting ? "Loading..." : "Masuk"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
