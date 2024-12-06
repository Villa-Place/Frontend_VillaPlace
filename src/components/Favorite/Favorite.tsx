"use client";
import React, { useEffect, useState } from "react";
import useFetchData from "@/hooks/useFetchData";
import { useFetchFavorite } from "@/hooks/useFetchFavorite";
import SkeletonFavorite from "./SkeletonFavorite";
import Empty from "../Empty";
import FavoriteCard from "./FavoriteCard";

const Favorite: React.FC = () => {
  const { handleDeleteFavorite } = useFetchFavorite();
  const [favorites, setFavorites] = useState([]);

  const { data, error, loading } = useFetchData(
    "http://localhost:8000/api/favorite",
    {
      withCredentials: true,
    }
  );

  useEffect(() => {
    if (data) {
      setFavorites(data.data);
    }
  }, [data]);

  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);

  // Fungsi toggle dropdown
  const toggleDropdown = (id: number) => {
    setActiveDropdown((prev) => (prev === id ? null : id));
  };

  const handleDelete = (id: string) => {
    handleDeleteFavorite(id);
    setActiveDropdown(null); // Tutup dropdown setelah menghapus
    setFavorites((prev) => prev.filter((favorite: any) => favorite._id !== id));
  };

  return (
    <>
      {loading && <SkeletonFavorite />}

      {favorites.length > 0 ? (
        <div className="flex gap-2 flex-wrap">
          {favorites.map((favorite: any) => (
            <FavoriteCard
              key={favorite._id}
              favorite={favorite}
              activeDropdown={activeDropdown}
              toggleDropdown={toggleDropdown}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <Empty message="Tidak ada villa favorit" />
      )}
    </>
  );
};

export default Favorite;
