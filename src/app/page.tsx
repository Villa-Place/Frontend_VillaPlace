import React from "react";
import "@/styles/globals.css";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

interface VillaProps {
  name: string;
  location: string;
  price: number;
  imageUrl: string;
  numBedrooms: string;
  numBathrooms: string;
}

const VillaCard = ({
  name,
  location,
  price,
  imageUrl,
  numBedrooms,
  numBathrooms,
}: VillaProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48 w-full">
        <Image
          src={imageUrl}
          alt={name}
          layout="fill"
          className="rounded-t-lg w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold">{name}</h3>
        <div className="flex items-center mt-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-500"
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
          <span className="ml-2 text-gray-600">{location}</span>
        </div>
        <div className="flex justify-between items-center mt-3">
          <div className="flex space-x-4">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500"
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
              <span className="ml-1">{numBedrooms}</span>
            </div>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500"
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
              <span className="ml-1">{numBathrooms}</span>
            </div>
          </div>
          <p className="text-green-600 font-semibold items-center">
            Rp. {price.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

const HomePage = () => {
  const villas = [
    {
      name: "Villa Gitah",
      location: "Lokasi",
      price: 3500000,
      imageUrl: "/assets/images/villa-gitah.png",
      numBedrooms: "3 kamar",
      numBathrooms: "2 kamar",
    },
    {
      name: "Villa Bandung",
      location: "Lokasi",
      price: 3500000,
      imageUrl: "/assets/images/villa-bandung.png",
      numBedrooms: "3 kamar",
      numBathrooms: "2 kamar",
    },
    {
      name: "Villa Gitah",
      location: "Lokasi",
      price: 3500000,
      imageUrl: "/assets/images/villa-gitah.png",
      numBedrooms: "3 kamar",
      numBathrooms: "2 kamar",
    },
    {
      name: "Villa Bandung",
      location: "Lokasi",
      price: 3500000,
      imageUrl: "/assets/images/villa-bandung.png",
      numBedrooms: "3 kamar",
      numBathrooms: "2 kamar",
    },
    {
      name: "Villa Gitah",
      location: "Lokasi",
      price: 3500000,
      imageUrl: "/assets/images/villa-gitah.png",
      numBedrooms: "3 kamar",
      numBathrooms: "2 kamar",
    },
    {
      name: "Villa Bandung",
      location: "Lokasi",
      price: 3500000,
      imageUrl: "/assets/images/villa-bandung.png",
      numBedrooms: "3 kamar",
      numBathrooms: "2 kamar",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <div className="w-full h-[100vh] relative -mt-8 -mb-8">
        <Image
          src="/assets/images/hero-img.png"
          alt="Hero Image"
          layout="fill"
          objectFit="cover"
          className="w-full h-full object-cover brightness-50"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-5xl font-bold mb-8">VILLAPLACE</h1>
          <p className="text-2xl mb-2">Selamat Datang!</p>
          <p className="text-2xl mb-8">Tempatnya Mencari Villa Idaman. <br/> Silahkan mulai penelusuran anda dengan VillaPlace.</p>
          <div className="w-full max-w-2xl px-4">
            <div className="flex">
              <input
                type="text"
                className="w-full px-4 py-4 rounded-l-md text-gray-900"
                placeholder="Cari villa..."
              />
              <button className="bg-[#B7906C] text-white px-8 py-2 rounded-r-md hover:bg-brown-600">
                Cari
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 mt-[-5rem]">
        <h2 className="text-4xl font-bold mb-14 text-center">Rekomendasi</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {villas.map((villa, index) => (
            <VillaCard key={index} {...villa} />
          ))}
        </div>
        <div className="text-end mt-10">
          <Link href="/user/category">
            <button className="text-green-600 hover:text-green-700 font-bold">
              Klik untuk lainnya..
            </button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
