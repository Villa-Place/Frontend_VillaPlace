import React from "react";
import Image from "next/image";
import Link from "next/link";

interface FavoriteCardProps {
  favorite: any;

  activeDropdown: number | null;
  toggleDropdown: (id: number) => void;
  handleDelete: (id: string) => void;
}

const FavoriteCard: React.FC<FavoriteCardProps> = ({
  favorite,
  toggleDropdown,
  handleDelete,
  activeDropdown,
}) => {
  return (
    <div key={favorite._id} className="w-[49%] mb-5">
      <div className="box-3 mb-4">
        <div className="flex mb-2">
          <div className="item-content">
            <div className="flex justify-between">
              <div className="flex w-full ">
                <Image
                  src={favorite.villa.foto_villa[0]?.url || "/villa.jpg"}
                  width={120}
                  height={120}
                  alt="product"
                  className="rounded-lg mr-2 object-cover border"
                />
                <div className="flex flex-col gap-2">
                  <p className="font-bold">{favorite.villa.nama}</p>
                  <p className="text-sm text-form-strokedark flex gap-1">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-4 h-4 w-4 stroke-2 text-inherit"
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
                    </span>
                    {favorite.villa.lokasi}
                  </p>
                  <p className="text-sm text-form-strokedark">
                    Fasilitas: {favorite.villa.fasilitas}
                  </p>
                </div>
              </div>
              <div className="relative ">
                <button onClick={() => toggleDropdown(favorite._id)}>
                  <svg
                    className="w-6 h-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth="3"
                      d="M6 12h.01m6 0h.01m5.99 0h.01"
                    />
                  </svg>
                </button>
                {activeDropdown === favorite._id && (
                  <div className="absolute right-0 w-20 p-1 bg-white rounded-lg shadow-lg border dark:bg-gray-800">
                    <button
                      onClick={() => handleDelete(favorite._id)}
                      className="block w-full text-center px-4 py-2 text-red-700 text-sm hover:bg-gray-100 font-semibold rounded"
                    >
                      Hapus
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end items-center">
          <Link href={`/villa/${favorite.villa._id}`}>
            <button
              type="button"
              className="flex justify-end font-semibold text-white bg-[#089562] hover:bg-green-800 rounded text-sm px-3 py-1.5 me-2 dark:bg-green-600 dark:hover:bg-green-700"
            >
              Lihat Villa
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FavoriteCard;
