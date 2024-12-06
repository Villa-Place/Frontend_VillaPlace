// SkeletonLoader.js
import React from "react";

const SkeletonLoader = () => {
  return (
    <div className="animate-pulse space-y-6">
      {/* Card Skeleton */}
      {[...Array(2)].map((_, index) => (
        <div
          key={index}
          className="flex flex-col p-4 border rounded-lg shadow-md space-y-4 bg-gray-100"
        >
          {/* Header Skeleton */}
          <div className="flex justify-between items-center">
            <div className="w-1/3 h-4 bg-gray-300 rounded"></div>
            <div className="w-1/6 h-4 bg-gray-300 rounded"></div>
          </div>

          {/* Image and Content Skeleton */}
          <div className="flex space-x-4">
            {/* Image Placeholder */}
            <div className="w-24 h-24 bg-gray-300 rounded-lg"></div>
            {/* Text Placeholder */}
            <div className="flex-1 space-y-3">
              <div className="h-4 bg-gray-300 rounded"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            </div>
          </div>

          {/* Footer Skeleton */}
          <div className="flex justify-end space-x-3">
            <div className="w-20 h-6 bg-gray-300 rounded"></div>
            <div className="w-24 h-6 bg-gray-300 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
