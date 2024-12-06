import React from "react";
import Image from "next/image";
import LoginForm from "@/components/Auth/LoginFormAdmin";

const LoginPage = () => {
  return (
    <div className="flex min-h-screen">
      {/* Bagian Kiri Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 bg-white">
        {/* Logo */}
        <div className="mb-8">
          <Image
            src="/assets/images/logo.png"
            alt="Logo"
            width={100}
            height={100}
          />
        </div>

        {/* Form */}
        <LoginForm />
      </div>

      {/* Bagian Kanan - Gambar */}
      <div className="hidden md:flex md:w-1/2 relative">
        <Image
          src="/assets/images/villa.png"
          alt="Villa Background"
          layout="fill"
          objectFit="cover"
          className="rounded-r-lg object-cover h-full w-full"
        />
      </div>
    </div>
  );
};

export default LoginPage;
