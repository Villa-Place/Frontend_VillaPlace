import React from "react";

const SkeletonFavorite = () => {
  return (
    <>
      <div className="flex gap-2 flex-wrap">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="w-[49%] mb-5">
            <div className="box-3 mb-4">
              <div className="flex mb-2">
                <div className="item-content">
                  <div className="flex justify-between">
                    <div className="flex w-full ">
                      <div className="rounded-lg mr-2 object-cover border bg-gray-300 w-28 h-28"></div>
                      <div className="flex flex-col gap-2">
                        <div className="w-36 h-4 bg-gray-300 rounded"></div>
                        <div className="w-24 h-3 bg-gray-300 rounded"></div>
                        <div className="w-24 h-3 bg-gray-300 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end items-center">
                <div className="w-24 h-8 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SkeletonFavorite;
