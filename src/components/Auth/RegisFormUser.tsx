"use client";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import registerValidationSchema from "@/validations/register";

// Definisi tipe untuk nilai awal form
interface FormValues {
  nama: string;
  email: string;
  no_telepon: string;
  password: string;
  confirmPassword: string;
}

const RegisFormUser: React.FC = () => {
  const router = useRouter();

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, setFieldError }: FormikHelpers<FormValues>
  ) => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/auth/user/register",
        {
          nama: values.nama,
          email: values.email,
          no_telepon: values.no_telepon,
          password: values.password,
        }
      );

      if (res.status === 201) {
        await Swal.fire({
          title: "Berhasil",
          text: "Anda telah berhasil mendaftar",
          icon: "success",
        });
        router.push("/auth/login");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.errors
        ) {
          const errors = error.response.data.errors;

          console.log(errors.email);

          // Set error pada field yang relevan
          if (errors.nama) {
            setFieldError("nama", errors.nama[0]);
          }
          if (errors.email) {
            setFieldError("email", "Email sudah digunakan");
          }
          if (errors.no_telepon) {
            setFieldError("no_telepon", "Nomor Telepon sudah digunakan");
          }
          if (errors.password) {
            setFieldError("password", errors.password[0]);
          }
        } else {
          setFieldError("email", "Terjadi kesalahan, silakan coba lagi nanti"); // Default error jika field spesifik tidak ditemukan
        }
      } else {
        console.error("Unknown error:", error);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        nama: "",
        email: "",
        no_telepon: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={registerValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="w-full max-w-md space-y-6">
          <h2 className="text-2xl font-bold text-center">
            Daftar sebagai User
          </h2>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nama Lengkap
            </label>
            <Field
              type="text"
              name="nama"
              placeholder="Nama Lengkap"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
            <ErrorMessage
              name="nama"
              component="p"
              className="text-red-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <Field
              type="email"
              name="email"
              placeholder="Email"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
            <ErrorMessage
              name="email"
              component="p"
              className="text-red-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              No Telepon
            </label>
            <Field
              type="text"
              name="no_telepon"
              placeholder="No Telepon"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
            <ErrorMessage
              name="no_telepon"
              component="p"
              className="text-red-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <Field
              type="password"
              name="password"
              placeholder="Password"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
            <ErrorMessage
              name="password"
              component="p"
              className="text-red-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Konfirmasi Password
            </label>
            <Field
              type="password"
              name="confirmPassword"
              placeholder="Konfirmasi Password"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
            <ErrorMessage
              name="confirmPassword"
              component="p"
              className="text-red-500 text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            {isSubmitting ? "Mendaftar..." : "Daftar"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default RegisFormUser;
