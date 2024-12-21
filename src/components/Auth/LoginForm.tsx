"use client";

import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";

interface FormValues {
  email: string;
  password: string;
}

const LoginForm = () => {
  const [isUser, setIsUser] = useState(true);
  const router = useRouter();

  // Validasi Yup
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email tidak valid")
      .required("Email wajib diisi"),
    password: Yup.string().required("Password wajib diisi"),
  });

  const handleSubmit = async (
    values: { email: string; password: string },
    { setFieldError }: FormikHelpers<FormValues>
    { setFieldError }: FormikHelpers<FormValues>
  ) => {
    try {
      const res = await axios.post(
        `http://localhost:8000/api/auth/${isUser ? "user" : "owner"}/login`,
        values,
        {
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        if (isUser) {
          router.push("/");
        } else {
          router.push("/dashboard/mitra");
        }
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.errors
        ) {
          const errors = error.response.data.errors;

          if (errors.email) {
            setFieldError("email", "Email tidak ditemukan");
          }

          if (errors.password) {
            setFieldError("password", "Password salah");
          }
        } else {
          setFieldError("email", "Terjadi kesalahan, silakan coba lagi nanti");
        }
      } else {
        console.error("Unknown error:", error);
      }
    }
  };

  return (
    <div className="w-full max-w-sm">
      {/* Tabs */}
      <div className="flex justify-center gap-7 mb-16">
        <button
          className={`text-4xl font-semibold px-4 py-2 ${
            isUser
              ? "text-black border-b-2 font-bold border-green-500"
              : "text-gray-500"
          }`}
          onClick={() => setIsUser(true)}
        >
          User
        </button>
        <button
          className={`text-4xl font-semibold px-4 py-2 ${
            !isUser
              ? "text-brown-500 border-b-2 border-brown-500 font-bold"
              : "text-gray-500"
          }`}
          onClick={() => setIsUser(false)}
        >
          Mitra
        </button>
      </div>

      {/* Form */}
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-10">
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

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 mt-11 mb-3 rounded-3xl hover:bg-green-700 transition"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Memuat..." : "Masuk"}
            </button>

            <p className="text-center text-gray-600">
              Tidak punya akun?{" "}
              <Link
                href={isUser ? "/auth/register/user" : "/auth/register/mitra"}
                className="text-black font-bold"
              >
                Daftar sekarang
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
