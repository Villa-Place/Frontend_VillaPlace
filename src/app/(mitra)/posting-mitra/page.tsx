"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import useFetchData from "@/hooks/useFetchData";
interface Villa {
  _id: string;
  nama: string;
  fasilitas: string[];
  harga: number;
  lokasi: string;
  kategori: string;
  status: string;
  foto_villa?: { url: string }[]; // Opsional jika properti ini bisa null/undefined
}
const PostingMitra = () => {
  const [villa, setVilla] = useState<Villa[]>([]);

  const { data, error, loading } = useFetchData(
    "http://localhost:8000/api/villa",
    {
      withCredentials: true,
    }
  );
  console.log(villa);
  useEffect(() => {
    if (data) {
      setVilla(data.data);
    }
  }, [data]);
  return (
    <>
      <div className="p-8">
        <div className="flex justify-between items-center mb-20">
          <h1 className="text-2xl font-bold">Owner Beranda</h1>
          <div className="flex items-center space-x-6">
            <button className="text-gray-600 hover:text-gray-800">
              Pengaturan
            </button>
            <button className="text-gray-600 hover:text-gray-800">
              Keluar
            </button>
            <div className="relative w-8 h-8">
              <Image
                src="/assets/images/profile-default.png"
                alt="Profile Admin"
                width={40}
                height={40}
                className="rounded-full"
              />
            </div>
          </div>
        </div>

        {/* Manajemen Posting */}
        <div className="border-2 rounded-xl md:flex md:justify-between">
          <div className="bg-white p-3">
            <h2 className="text-2xl font-semibold mb-3">Manajemen Posting</h2>
            <p className="text-lg font-normal text-gray-500">Description</p>
          </div>
          <div>
            <button
              type="button"
              className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 mt-7 mr-10"
            >
              <p>+ Tambah Postingan</p>
            </button>
          </div>
        </div>

        {/* Tabel */}
        <div className="border border-red-300 bg-white mt-5 p-5">
          <h1 className="text-xl font-semibold mb-3">Posting</h1>
          <div className="border-b-2 border-gray-200 w-full md:w-[600px]"></div>

          <div className="bg-white shadow-md rounded-lg overflow-hidden mt-5">
            <div className="overflow-x-auto">
              <table className="min-w-[600px] w-full table-auto border-collapse border border-black">
                <thead className="bg-brown-500 text-white">
                  <tr>
                    <th className="p-3 text-left border border-black">No</th>
                    <th className="p-3 text-left border border-black">
                      Nama Villa
                    </th>
                    <th className="p-3 text-left border border-black">
                      Fasilitas
                    </th>
                    <th className="p-3 text-left border border-black">Price</th>
                    <th className="p-3 text-left border border-black">
                      Lokasi
                    </th>
                    <th className="p-3 text-left border border-black">
                      Kategori
                    </th>
                    <th className="p-3 text-left border border-black">
                      Status
                    </th>
                    <th className="p-3 text-left border border-black">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {villa.map((data, index) => (
                    <tr key={index} className="border border-black">
                      <td className="p-3 border border-black">{index + 1}</td>
                      <td className="p-3 border border-black">{data.nama}</td>
                      <td className="p-3 border border-black  ">
                        {data.fasilitas.map((item, index) => (
                          <span className="mr-2 " key={index}>
                            {item}
                          </span>
                        ))}
                      </td>

                      <td className="p-3 border border-black">{data.harga}</td>
                      <td className="p-3 border border-black">{data.lokasi}</td>
                      <td className="p-3 border border-black">
                        {data.kategori}
                      </td>
                      <td className="p-3 border border-black">{data.status}</td>
                      <td className="p-3 border border-black">
                        <Image
                          src={
                            data.foto_villa?.[1]?.url || "/default-image.png"
                          }
                          alt="Profile Admin"
                          width={40}
                          height={40}
                          // className="rounded-full"
                        />
                      </td>
                      <td className="p-3 border border-black flex justify-end gap-5">
                        <a
                          href={`/edit/${index}`}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <FontAwesomeIcon icon={faEdit} className="w-5" />
                        </a>
                        <button
                          type="button"
                          // onClick={() => handleDelete(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FontAwesomeIcon icon={faTrash} className="w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostingMitra;
