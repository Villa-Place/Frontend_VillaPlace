"use client";

import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { error } from "console";

const LoginForm = () => {
  const [isUser, setIsUser] = useState(true);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `http://localhost:8000/api/auth/${isUser ? "/user" : "/owner"}/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        if (isUser) {
          router.push("/");
        } else {
          router.push("/dashboardMitra");
        }
      }
    } catch (error: any) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="w-full max-w-sm">
      {/* Tabs */}
      <div className="flex justify-center gap-7 mb-16">
        <button
          className={`text-4xl font-semibold px-4 py-2 ${
            isUser ? "text-black border-b-2 border-green-500" : "text-gray-500"
          }`}
          onClick={() => setIsUser(true)}
        >
          User
        </button>
        <button
          className={`text-4xl font-semibold px-4 py-2 ${
            !isUser
              ? "text-brown-500 border-b-2 border-brown-500"
              : "text-gray-500"
          }`}
          onClick={() => setIsUser(false)}
        >
          Mitra
        </button>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Form */}
      <form className="space-y-10" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-bold text-gray-700"
          >
            Email
          </label>
          <input
            type="text"
            id="email"
            className="block w-full border-b-2 border-green-500 focus:outline-none focus:border-green-600"
            placeholder="Enter Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-bold text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="block w-full border-b-2 border-green-500 focus:outline-none focus:border-green-600"
            placeholder="Enter Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 mt-11 mb-3 rounded-3xl hover:bg-green-700 transition"
        >
          Masuk
        </button>

        <p className="text-center text-gray-600">
          Tidak punya akun?{" "}
          <Link
            href={isUser ? "/auth/registUser" : "/auth/registMitra"}
            className="text-black font-bold"
          >
            Daftar sekarang
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
