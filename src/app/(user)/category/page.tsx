"use client";

import React, { useState, useMemo, useCallback } from "react";
import useFetchData from "@/hooks/useFetchData";
import VillaCard from "@/components/VillaCardCategory";
import { VillaProps } from "@/types/Villa";

// Filter types
interface FilterState {
  priceRange: {
    min: number;
    max: number;
  };
  kategori: string[];
  kamar: number | null;
}

const Category = () => {
  const { data } = useFetchData("http://localhost:8000/api/villa", {
    method: "GET",
    withCredentials: true,
  });

  // State management
  const [searchQuery, setSearchQuery] = useState("Villa");
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<FilterState>({
    priceRange: { min: 0, max: 999999999 },
    kategori: [],
    kamar: null,
  });
  const itemsPerPage = 6;

  // Memoisasi data
  const villas = useMemo(() => data?.data || [], [data]);

  // Mendapatkan kategori unik
  const availableCategories = useMemo(() => {
    const categories = new Set<string>();
    villas.forEach((villa: VillaProps) => {
      villa.kategori.forEach((cat: string) => categories.add(cat));
    });
    return Array.from(categories);
  }, [villas]);

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
        !filters.kamar || villa.fasilitas[0]?.includes(filters.kamar.toString());

      return matchesSearch && matchesPrice && matchesKategori && matchesKamar;
    });
  }, [villas, searchQuery, filters]);

  // Pagination
  const paginatedVillas = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredVillas.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredVillas, currentPage]);

  const totalPages = Math.ceil(filteredVillas.length / itemsPerPage);

  // Handler functions
  const handlePriceRangeChange = useCallback((min: number, max: number) => {
    setFilters((prev) => ({
      ...prev,
      priceRange: { min, max },
    }));
    setCurrentPage(1); // Reset page on filter change
  }, []);

  const handleKategoriChange = useCallback((kategori: string) => {
    setFilters((prev) => ({
      ...prev,
      kategori: prev.kategori.includes(kategori)
        ? prev.kategori.filter((k) => k !== kategori)
        : [...prev.kategori, kategori],
    }));
    setCurrentPage(1);
  }, []);

  const handleKamarChange = useCallback((kamar: number | null) => {
    setFilters((prev) => ({
      ...prev,
      kamar,
    }));
    setCurrentPage(1);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filter Section */}
        <div className="space-y-6 mb-8">
          {/* Search Bar */}
          <div className="flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 rounded-l-lg text-gray-900 border border-gray-300"
              placeholder="Cari villa..."
            />
            <button className="bg-brown-500 text-white px-6 py-4 rounded-r-lg hover:bg-brown-600">
              Cari
            </button>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 rounded-lg shadow">
            {/* Price Range Filter */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Range Harga
              </label>
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

            {/* Category Filter */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Kategori
              </label>
              <div className="space-y-2">
                {availableCategories.map((kategori) => (
                  <label key={kategori} className="flex items-center space-x-2">
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
            </div>

            {/* Room Filter */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Jumlah Kamar
              </label>
              <select
                className="w-full px-3 py-2 border rounded"
                value={filters.kamar || ""}
                onChange={(e) =>
                  handleKamarChange(e.target.value ? Number(e.target.value) : null)
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
          </div>
        </div>

        {/* Results Count */}
        <h2 className="text-lg font-semibold mb-6 text-green-600">
          {filteredVillas.length} villa ditemukan
        </h2>

        {/* Villa Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 sm:gap-6 md:gap-x-20 md:gap-y-10">
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
              />
            ))
          ) : (
            <p className="text-center col-span-full">
              Tidak ada villa yang ditemukan.
            </p>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded bg-brown-500 text-white disabled:bg-gray-300"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded ${
                  currentPage === page
                    ? "bg-brown-500 text-white"
                    : "bg-white text-brown-500 border border-brown-500"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded bg-brown-500 text-white disabled:bg-gray-300"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
