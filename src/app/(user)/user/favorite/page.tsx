import Favorite from "@/components/Favorite/Favorite";
import React from "react";

const page = () => {
  return (
    <div>
      <div className=" p-2 border-b-2 border-gray-200 mb-5">
        <h1 className="text-lg font-bold">Favorite</h1>
      </div>
      <Favorite />
    </div>
  );
};

export default page;
