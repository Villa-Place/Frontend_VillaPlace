"use client";

import React, { useState, useEffect } from "react";
import "@/styles/globals.css";
import Image from "next/image";
import Link from "next/link";
import VillaCard from "@/components/VillaCard";
import { VillaProps } from "@/types/Villa";
import { useRouter } from "next/navigation";
import { useFetchVilla } from "@/hooks/useFetchVilla";

const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [villa, setVilla] = useState([]);
  const router = useRouter();

  const { handleGetVillas } = useFetchVilla();

  useEffect(() => {
    const fetchData = async () => {
      const res = await handleGetVillas("limit=6");

      if (res.data) {
        setVilla(res.data);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/category?search=${searchQuery}`);
  };

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
        <div className="absolute inset-0 flex flex-col items-center text-center justify-center text-white">
          <h1 className="text-5xl font-bold mb-8">VILLAPLACE</h1>
          <p className="flex flex-col text-lg sm:text-2xl mb-5 sm:mb-8">
            Discover the Perfect Living Experience,
            <span className="mt-1">Create Unforgettable Memories</span>
          </p>
          <div className="w-full max-w-2xl px-4">
            <form onSubmit={handleSearch}>
              <div className="flex">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-4 rounded-l-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Cari villa..."
                />
                <button
                  className="bg-[#B7906C] text-white px-8 py-2 rounded-r-md hover:bg-brown-600"
                  type="submit"
                >
                  Cari
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 mt-[-5rem]">
        <h2 className="text-4xl font-bold mb-14 text-center">Rekomendasi</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {villa.length > 0 ? (
            villa.map((villa: VillaProps) => (
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
                kategori={villa.kategori}
                averageRating={villa.averageRating}
                commentCount={villa.commentCount}
              />
            ))
          ) : (
            <p className="text-center col-span-full">
              Tidak ada villa yang ditemukan.
            </p>
          )}
        </div>
        <div className="text-end mt-10">
          <Link href="/category">
            <button className="text-green-600 hover:text-green-700 font-bold text-lg">
              Klik untuk lainnya..
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
