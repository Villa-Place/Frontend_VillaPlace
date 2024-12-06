"use client";

import React, { useState, useMemo  } from "react";
import "@/styles/globals.css";
import Image from "next/image";
import Link from "next/link";
import useFetchData from "@/hooks/useFetchData";
import VillaCard from "@/components/VillaCard";
import { VillaProps } from "@/types/Villa";

const HomePage: React.FC = () => {
  const { data } = useFetchData("http://localhost:8000/api/villa?limit=6", {
    method: "GET",
    withCredentials: true,
  });
  const [searchQuery, setSearchQuery] = useState("Villa");
  const villas = useMemo(() => data?.data || [], [data]);

  const filteredVillas = useMemo(
    () =>
      villas.filter((villa) => {
        const search = searchQuery.replace(/[.,]/, "");
        const searchNumber = Number(search);
  
        return (
          villa.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
          villa.lokasi.toLowerCase().includes(searchQuery.toLowerCase()) ||
          villa.kategori.some((cat: string) =>
            cat.toLowerCase().includes(searchQuery.toLowerCase())
          ) ||
          villa.harga === searchNumber
        );
      }),
    [villas, searchQuery]
  );

  return (
    <div className="min-h-screen">
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
          <p className="text-2xl mb-2">Lorem ipsum lagi</p>
          <p className="text-2xl mb-8">Ntah ini isi aja bang</p>
          <div className="w-full max-w-2xl px-4">
            <div className="flex">
              <input
                type="text"value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 mt-[-5rem]">
        <h2 className="text-4xl font-bold mb-14 text-center">Rekomendasi</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {filteredVillas.length > 0 ? (
            filteredVillas.map((villa: VillaProps) => (
              <VillaCard
                key={villa._id}
                _id={villa._id}
                nama={villa.nama}
                deskripsi={villa.deskripsi}
                lokasi={villa.lokasi}
                fasilitas={villa.fasilitas}
                harga={villa.harga}
                foto_villa={villa.foto_villa}
                status={villa.status}
              />
            ))
          ) : (
            <p className="text-center col-span-full">Tidak ada villa yang ditemukan.</p>
          )}
        </div>
        <div className="text-end mt-10">
          <Link href="/category">
            <button className="text-green-600 hover:text-green-700 font-bold">
              Klik untuk lainnya..
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;