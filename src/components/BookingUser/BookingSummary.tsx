import React from "react";
import Image from "next/image";
import { VillaProps } from "@/types/Villa";

interface BookingSummaryProps {
  // handleSubmit: () => void;
  villa: VillaProps;
  rentalDays: number;
}

const BookingSummary: React.FC<BookingSummaryProps> = ({
  // handleSubmit,
  villa,
  rentalDays,
}) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Ringkasan Pesanan</h2>
      <div className="bg-white p-6 rounded-lg border shadow-md h-fit md:h-[90%]">
        <div className="mb-2">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex flex-col md:flex-row mb-4">
              <Image
                src={
                  villa?.foto_villa[0]?.url ||
                  "/assets/images/default-villa.jpg"
                }
                alt="Portable Stereo Speaker"
                className="md:w-24 md:h-24 w-full rounded-md md:mr-4 mb-4"
                width={120}
                height={120}
              />
              <div className="md:w-2/3 w-full">
                <p className="text-xl font-semibold">{villa?.nama}</p>
                <div className="text-xs flex mb-2 text-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                    />
                  </svg>
                  <p>{villa.lokasi}</p>
                </div>
              </div>
            </div>
            <div className="flex items-end flex-col justify-start w-full  md:w-1/3">
              <p className="font-bold">Harga</p>
              <span className="text-lg text-primary font-bold">
                Rp {villa?.harga.toLocaleString("id-ID")}
              </span>
            </div>
          </div>
        </div>
        <div className="border-t flex flex-col  border-gray-300 pt-4">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Sewa</span>
            <span className="text-sm font-semibold">
              Rp {villa.harga.toLocaleString("id-ID")} x {rentalDays} Hari
            </span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Diskon</span>
            <span className="text-sm font-semibold">Rp -</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Subtotal</span>
            <span className="text-sm font-semibold">
              Rp {(villa.harga * rentalDays).toLocaleString("id-ID")}
            </span>
          </div>
          <div className="flex justify-between border-t border-gray-300 pt-4 mb-4">
            <span className="text-xl font-bold">Total Pembayaran</span>
            <span className="text-2xl font-bold text-primary">
              Rp {(villa.harga * rentalDays).toLocaleString("id-ID")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;
