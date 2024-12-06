import React from "react";

const SkeletonDetailVilla = () => {
  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="rounded-lg bg-white px-10 py-12">
        <div className="grid  grid-cols-1 md:grid-cols-2 gap-10 ">
          <div>
            <div className="rounded-lg bg-gray-300 animate-pulse">
              <div className="w-full h-96"></div>
            </div>
            <div className="flex space-x-4 mt-4">
              <div className="w-20 h-20 bg-gray-300 animate-pulse rounded-lg"></div>
              <div className="w-20 h-20 bg-gray-300 animate-pulse rounded-lg"></div>
              <div className="w-20 h-20 bg-gray-300 animate-pulse rounded-lg"></div>
              <div className="w-20 h-20 bg-gray-300 animate-pulse rounded-lg"></div>
              <div className="w-20 h-20 bg-gray-300 animate-pulse rounded-lg flex items-center justify-center text-gray-500"></div>
            </div>
          </div>
          <div>
            <div className="mb-2">
              <div className="flex items-center mb-2">
                <div className="w-10 h-10 bg-gray-300 animate-pulse rounded-full"></div>
                <span className="ml-2 text-sm font-semibold bg-gray-300 animate-pulse w-20 h-4 rounded-lg"></span>
              </div>
              <h1 className="text-2xl font-bold mb-2 bg-gray-300 animate-pulse w-40 h-6 rounded-lg"></h1>
              <div className="flex space-x-2">
                <span className="text-gray-700 bg-gray-300 animate-pulse w-20 h-4 rounded-lg"></span>
              </div>
            </div>
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-500"></div>
              <span className="text-sm text-gray-500 ml-2 bg-gray-300 animate-pulse w-20 h-4 rounded-lg"></span>
            </div>

            <div className="text-3xl font-bold mb-4 text-green bg-gray-300 animate-pulse w-40 h-6 rounded-lg"></div>
            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2 bg-gray-300 animate-pulse w-20 h-4 rounded-lg"></h2>
              <p className="text-gray-700 bg-gray-300 animate-pulse w-96 h-4 rounded-lg"></p>
            </div>

            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2 bg-gray-300 animate-pulse w-20 h-4 rounded-lg"></h2>
              <div className="flex space-x-2">
                <span className="inline-block capitalize py-1 px-3 text-sm font-semibold rounded-full bg-[#B7906C]/10 text-[#B7906C] bg-gray-300 animate-pulse w-20 h-4 "></span>
              </div>
            </div>

            <div className="flex gap-5">
              <button className="w-full bg-green text-white font-semibold py-3 rounded-lg flex items-center justify-center space-x-2 mb-4  bg-gray-300 animate-pulse ">
                <span>Pesan Sekarang</span>
              </button>
              <button className="w-12 h-12 rounded-lg flex items-center justify-center text-green bg-gray-300 animate-pulse "></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonDetailVilla;
