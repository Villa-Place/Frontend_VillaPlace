import { on } from "events";
import Image from "next/image";
import React from "react";

interface ImageModalProps {
  isOpen: boolean;
  images: { url: string }[];
  selectedImageIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  images,
  selectedImageIndex,
  onClose,
  onNext,
  onPrev,
}) => {
  if (!isOpen) return null;
  const currentImage = images[selectedImageIndex]?.url || "";
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-10 p-2 bg-opacity-20 rounded-lg bg-gray-800 right-10 text-white text-xl font-bold"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </button>
      <div className="relative w-4/5 max-w-2xl">
        {/* Image */}
        <div className="flex items-center justify-center">
          <button
            onClick={onPrev}
            className="text-white fixed md:p-5 p-2 rounded-lg hover:bg-opacity-30 md:bg-gray-800 bg-opacity-15 md:left-5 left-0 text-2xl px-4 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          {/* Gambar Utama */}
          <div className="flex items-center justify-center">
            <Image
              src={currentImage}
              alt="Selected Villa"
              width={800}
              height={600}
              className="rounded-lg"
            />
          </div>

          <button
            onClick={onNext}
            className="fixed right-0 md:right-10 md:bg-gray-800 bg-opacity-15 hover:bg-opacity-30 md:p-5 p-2 rounded-lg text-white text-2xl px-4 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
