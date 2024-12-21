"use client";

import React, { useState, useMemo, useCallback } from "react";
import useFetchData from "@/hooks/useFetchData";
import VillaCard from "@/components/VillaCardCategory";
import { VillaProps } from "@/types/Villa";
import RatingFilter from "@/components/ui/RatingFilter";
import { useSearchParams } from "next/navigation";

// Filter types
interface FilterState {
  priceRange: {
    min: number;
    max: number;
  };
  kategori: string[];
  kamar: number | null;
  averageRating: number | null;
}

const Category = () => {
  const { data } = useFetchData("http://localhost:8000/api/villa", {
    method: "GET",
    withCredentials: true,
  });
  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  // State management
  const [searchQuery, setSearchQuery] = useState(search || "");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<FilterState>({
    priceRange: { min: 0, max: 999999999 },
    kategori: [],
    kamar: null,
    averageRating: null,
  });
  const itemsPerPage = 6;

  // Memoisasi data
  const villas = useMemo(() => data?.data || [], [data]);

  // Filter villas berdasarkan kondisi
  const filteredVillas = useMemo(() => {
    return villas.filter((villa: VillaProps) => {
      const search = searchQuery.toLowerCase();
      const matchesSearch =
        villa.nama.toLowerCase().includes(search) ||
        villa.lokasi.toLowerCase().includes(search) ||
        villa.kategori.some((cat: string) =>
          cat.toLowerCase().includes(search)
        );

      const matchesPrice =
        villa.harga >= filters.priceRange.min &&
        villa.harga <= filters.priceRange.max;

      const matchesKategori =
        filters.kategori.length === 0 ||
        villa.kategori.some((cat) => filters.kategori.includes(cat));

      const matchesKamar =
        !filters.kamar ||
        villa.fasilitas[0]?.includes(filters.kamar.toString());
      const matchesRating =
        filters.averageRating === null ||
        (villa.averageRating >= filters.averageRating &&
          villa.averageRating < filters.averageRating + 1); // Ensure the range

      return (
        matchesSearch &&
        matchesPrice &&
        matchesKategori &&
        matchesKamar &&
        matchesRating
      );
    });
  }, [villas, searchQuery, filters]);

  // Pagination
  const paginatedVillas = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredVillas.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredVillas, currentPage]);

  // Handler functions
  const handlePriceRangeChange = useCallback((min: number, max: number) => {
    setFilters((prev) => ({
      ...prev,
      priceRange: { min, max },
    }));
    setCurrentPage(1); // Reset page on filter change
  }, []);

  const handleKamarChange = useCallback((kamar: number | null) => {
    setFilters((prev) => ({
      ...prev,
      kamar,
    }));
    setCurrentPage(1);
  }, []);
  const handleRatingChange = useCallback((rating: number | null) => {
    setFilters((prev) => ({
      ...prev,
      averageRating: rating,
    }));
    setCurrentPage(1);
  }, []);
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filter Section */}
        <div className="space-y-6 mb-8">
          <div>
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                required
                placeholder="Cari villa..."
              />
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 bg-white p-4 rounded-lg shadow">
            {/* Range Harga Filter */}
            <div className="space-y-2">
              <label className="block text-md font-semibold">Range Harga</label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="w-1/2 px-3 py-2 border rounded"
                  value={filters.priceRange.min}
                  onChange={(e) =>
                    handlePriceRangeChange(
                      Number(e.target.value),
                      filters.priceRange.max
                    )
                  }
                />
                <input
                  type="number"
                  placeholder="Max"
                  className="w-1/2 px-3 py-2 border rounded"
                  value={filters.priceRange.max}
                  onChange={(e) =>
                    handlePriceRangeChange(
                      filters.priceRange.min,
                      Number(e.target.value)
                    )
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-md font-semibold">
                Jumlah Kamar
              </label>
              <select
                className="w-full px-3 py-2 border rounded bg-white text-left flex items-center justify-between"
                value={filters.kamar || ""}
                onChange={(e) =>
                  handleKamarChange(
                    e.target.value ? Number(e.target.value) : null
                  )
                }
              >
                <option value="">Semua</option>
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num} Kamar
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <RatingFilter
                value={filters.averageRating}
                onChange={handleRatingChange}
              />
            </div>

            {/* Category Filter */}
            {/* <div className="space-y-2 md:col-span-3">
              <label className="block text-md font-semibold">Kategori</label>
              <div className="flex flex-wrap gap-2">
                {availableCategories.map((kategori) => (
                  <label
                    key={kategori}
                    className="flex items-center space-x-2 w-1/2 sm:w-1/4"
                  >
                    <input
                      type="checkbox"
                      checked={filters.kategori.includes(kategori)}
                      onChange={() => handleKategoriChange(kategori)}
                      className="rounded text-brown-500"
                    />
                    <span className="text-sm">{kategori}</span>
                  </label>
                ))}
              </div>
            </div> */}

            {/* Room Filter */}
          </div>
        </div>

        {/* Results Count */}
        <h2 className="text-lg font-semibold mb-6 text-green-600">
          {filteredVillas.length} Villa Ditemukan
        </h2>

        {/* Villa Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-y-8 sm:gap-x-8 md:gap-x-10 md:gap-y-10">
          {paginatedVillas.length > 0 ? (
            paginatedVillas.map((villa: VillaProps) => (
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

        {/* Pagination Controls */}
        <div className="w-full border-gray-200 mt-8">
          <div className="flex justify-center py-2">
            <div className="flex space-x-1 sm:space-x-2">
              {/* Previous Button */}
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-1.5 sm:p-2 text-sm sm:text-md bg-brown-500 text-white rounded disabled:bg-gray-300"
              >
                Previous
              </button>

              <div className="flex space-x-1">
                {(() => {
                  const pages: JSX.Element[] = [];
                  const totalPages = Math.ceil(
                    filteredVillas.length / itemsPerPage
                  );

                  // Fungsi untuk menambahkan nomor halaman
                  const pushPage = (pageNum: number) => {
                    pages.push(
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`py-1 px-2.5 sm:py-2 sm:px-4 sm:text-md rounded ${
                          currentPage === pageNum
                            ? "bg-green-500 text-white"
                            : "bg-white text-brown-500 border border-brown-500"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  };

                  // Fungsi untuk menambahkan ellipsis
                  const pushEllipsis = (key: string) => {
                    pages.push(
                      <button
                        key={key}
                        className="py-1 px-1.5 sm:py-2 sm:px-3 text-sm sm:text-md rounded bg-white text-brown-500 border border-brown-500"
                        disabled
                      >
                        ...
                      </button>
                    );
                  };

                  // Selalu tampilkan halaman pertama
                  pushPage(1);

                  if (totalPages <= 5) {
                    // Ubah dari 7 ke 5 untuk mobile
                    // Jika total halaman 5 atau kurang, tampilkan semua
                    for (let i = 2; i < totalPages; i++) {
                      pushPage(i);
                    }
                  } else {
                    // Logika untuk halaman dengan ellipsis
                    if (currentPage > 3) {
                      pushEllipsis("start");
                    }
                    // Tampilkan halaman di sekitar halaman saat ini
                    let start = Math.max(2, currentPage - 1);
                    let end = Math.min(totalPages - 1, currentPage + 1);

                    if (currentPage <= 3) {
                      end = 4;
                    }
                    if (currentPage >= totalPages - 2) {
                      start = totalPages - 3;
                    }

                    for (let i = start; i <= end; i++) {
                      pushPage(i);
                    }

                    if (currentPage < totalPages - 2) {
                      pushEllipsis("end");
                    }
                  }

                  // Selalu tampilkan halaman terakhir jika lebih dari 1 halaman
                  if (totalPages > 1) {
                    pushPage(totalPages);
                  }

                  return pages;
                })()}
              </div>

              {/* Next Button */}
              <button
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.min(
                      prev + 1,
                      Math.ceil(filteredVillas.length / itemsPerPage)
                    )
                  )
                }
                disabled={
                  currentPage ===
                  Math.ceil(filteredVillas.length / itemsPerPage)
                }
                className="p-1.5 sm:p-2 text-sm sm:text-md bg-brown-500 text-white rounded disabled:bg-gray-300"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
