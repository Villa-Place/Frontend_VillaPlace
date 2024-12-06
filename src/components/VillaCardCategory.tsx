"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { VillaProps } from "@/types/Villa";

const VillaCard = ({
    _id,
    nama,
    lokasi,
    fasilitas,
    harga,
    foto_villa,
  }: VillaProps) => {
    const imageUrl = foto_villa?.[0]?.url || "/default-image.png";
  
    return (
      <Link href={`/category/${_id}`}>
        <div className="bg-white rounded-lg shadow-md overflow-hidden flex cursor-pointer">
          {/* Image Section */}
          <div className="relative h-40 sm:w-1/3 md:w-2/3">
            <Image
              src={imageUrl}
              alt={nama}
              layout="fill"
              className="object-cover w-full h-full lg:p-2 rounded-md"
            />
          </div>
  
          {/* Information Section */}
          <div className="p-4 w-2/3 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-semibold">{nama}</h3>
              <p className="text-green-600 text-lg font-bold">
                Rp. {harga.toLocaleString()}
              </p>
            </div>
  
            <div className="flex items-center text-gray-600 mt-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span>{lokasi}</span>
            </div>
  
            <div className="flex mt-2 space-x-4 text-gray-600">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                <span>{fasilitas[0]}</span>
              </div>
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                <span>{fasilitas[1]}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  };
export default VillaCard;
