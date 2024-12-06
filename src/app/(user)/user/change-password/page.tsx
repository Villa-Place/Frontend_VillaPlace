import ChangePassword from "@/components/Change-password/ChangePassword";
import React from "react";

const page = () => {
  return (
    <>
      <div className=" p-2 border-b-2 border-gray-200 mb-5">
        <h1 className="text-lg font-bold">Ganti Password</h1>
      </div>
      <ChangePassword />
    </>
  );
};

export default page;
