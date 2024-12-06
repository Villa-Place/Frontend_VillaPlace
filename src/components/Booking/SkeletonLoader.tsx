import React from "react";

const SkeletonLoader: React.FC = () => {
  return (
    <div className="animate-pulse">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="flex gap-4 mb-4">
          <div className="w-1/4 h-20 bg-gray-300 rounded"></div>
          <div className="flex flex-col justify-between w-2/3">
            <div className="flex justify-between">
              <div className="w-1/3 h-4 bg-gray-300 rounded"></div>
              <div className="w-1/4 h-4 bg-gray-300 rounded"></div>
            </div>
            <div className="w-2/3 h-4 bg-gray-300 rounded"></div>
            <div className="w-2/3 h-4 bg-gray-300 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
