"use client";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Link from "next/link";

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
  const [status, setStatus] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>(""); // State baru untuk input pencarian

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = status
          ? `http://localhost:8000/api/villa/owner?show${status}=true`
          : "http://localhost:8000/api/villa/owner";
        const response = await axios.get(url, {
          withCredentials: true,
        });
        setVilla(response.data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [status]);

  const filteredVilla = villa.filter((data) => {
    const searchKeyword = searchInput.toLowerCase();

    const nama = data.nama?.toLowerCase() || "";
    const fasilitas = data.fasilitas?.join(", ").toLowerCase() || "";
    const harga = data.harga?.toString() || "";
    const lokasi = data.lokasi?.toLowerCase() || "";
    const kategori = Array.isArray(data.kategori)
      ? data.kategori.join(", ").toLowerCase() // Jika kategori adalah array, gabungkan menjadi string
      : data.kategori?.toLowerCase() || ""; // Jika kategori adalah string, lakukan toLowerCase
    const status = data.status?.toLowerCase() || "";

    return (
      nama.includes(searchKeyword) ||
      fasilitas.includes(searchKeyword) ||
      harga.includes(searchKeyword) ||
      lokasi.includes(searchKeyword) ||
      kategori.includes(searchKeyword) ||
      status.includes(searchKeyword)
    );
  });

  // Fungsi untuk menghapus data villa
  const deleteData = async (id: string) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/villa/${id}`,
        { withCredentials: true }
      );
      console.log(response);

      // Menampilkan SweetAlert jika data berhasil dihapus
      Swal.fire({
        title: "Berhasil",
        text: "Data berhasil dihapus!",
        icon: "success",
        confirmButtonText: "OK",
      });

      // Memperbarui daftar villa setelah data berhasil dihapus
      setVilla((prevData) => prevData.filter((villa) => villa._id !== id));
    } catch (err) {
      console.error("Error deleting villa:", err);

      // Menampilkan SweetAlert jika terjadi kesalahan
      Swal.fire({
        title: "Gagal",
        text: "Gagal menghapus data.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleDelete = (id: string) => {
    // Menampilkan SweetAlert konfirmasi sebelum menghapus
    Swal.fire({
      title: "Anda yakin?",
      text: "Data ini akan dihapus permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteData(id); // Menghapus data jika dikonfirmasi
      }
    });
  };

  return (
    <>
      <div className="p-8">
        {/* MANAJEMENT POSTING */}
        <div className="border-2 rounded-md md:flex md:justify-between mb-5">
          <div className="bg-white p-3">
            <h2 className="text-2xl font-semibold mb-3">Manajemen Posting</h2>
            <p className="text-lg font-normal text-gray-500">Description</p>
          </div>
          <div>
            <Link href="/tambahVilla">
              <button
                type="button"
                className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 mt-7 mr-10"
              >
                <p>+ Tambah Postingan</p>
              </button>
            </Link>
          </div>
        </div>
        {/* Tombol Filter */}
        <div className="ml-2 mb-5">
          <button
            onClick={() => setStatus("")}
            className="mr-2 px-4 py-2 bg-slate-800 hover:bg-slate-500 rounded text-white"
          >
            All
          </button>
          <button
            onClick={() => setStatus("Pending")}
            className="mr-2 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 rounded text-white"
          >
            Pending
          </button>
          <button
            onClick={() => setStatus("Success")}
            className="mr-2 px-4 py-2 bg-green-700 hover:bg-green-500 rounded text-white"
          >
            Success
          </button>
          <button
            onClick={() => setStatus("Rejected")}
            className="px-4 py-2 bg-red-600 hover:bg-red-400 rounded text-white"
          >
            Rejected
          </button>
        </div>
        {/* Input Pencarian */}

        <form className="max-w-md ml-2 mb-5">
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
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search here..."
              required
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Search
            </button>
          </div>
        </form>

        {/* Tabel */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full border-collapse border border-black">
            <thead className="bg-brown-500 text-white">
              <tr>
                <th className="p-3 text-left border border-black">No</th>
                <th className="p-3 text-left border border-black">
                  Nama Villa
                </th>
                <th className="p-3 text-left border border-black">Fasilitas</th>
                <th className="p-3 text-left border border-black">Harga</th>
                <th className="p-3 text-left border border-black">Lokasi</th>
                <th className="p-3 text-left border border-black">Kategori</th>
                <th className="p-3 text-left border border-black">Status</th>
                <th className="p-3 text-left border border-black">
                  Foto Villa
                </th>
                <th className="p-3 text-left border border-black">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredVilla.length === 0 ? (
                <tr>
                  <td colSpan={10} className="p-3 text-center">
                    Data tidak tersedia
                  </td>
                </tr>
              ) : (
                filteredVilla.map((data, index) => (
                  <tr key={data._id} className="border-t border-black">
                    <td className="p-3 border border-black">{index + 1}</td>
                    <td className="p-3 border border-black">{data.nama}</td>
                    <td className="p-3 border border-black">
                      {data.fasilitas.join(", ")}
                    </td>
                    <td className="p-3 border border-black">{data.harga}</td>
                    <td className="p-3 border border-black">{data.lokasi}</td>
                    <td className="p-3 border border-black">{data.kategori}</td>
                    <td className="p-3 border border-black">
                      <span
                        className={`px-3 py-1 rounded-full text-white text-sm ${
                          data.status === "pending"
                            ? "bg-yellow-500"
                            : data.status === "success"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      >
                        {data.status}
                      </span>
                    </td>
                    <td className="p-3 border border-black">
                      <Image
                        src={data.foto_villa?.[0]?.url || "/default-image.png"}
                        alt="Villa"
                        width={40}
                        height={40}
                      />
                    </td>
                    <td className="p-3 flex justify-end gap-5">
                      <Link href="/editVilla">
                        <button
                          // href={`/edit/${index}`}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <FontAwesomeIcon icon={faEdit} className="w-5" />
                        </button>
                      </Link>
                      <button
                        type="button"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => {
                          return confirm("Anda yakin ingin menghapus data?")
                            ? handleDelete(data._id)
                            : "";
                        }}
                      >
                        <FontAwesomeIcon icon={faTrash} className="w-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default PostingMitra;
// !
