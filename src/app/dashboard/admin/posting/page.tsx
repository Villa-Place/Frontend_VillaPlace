"use client";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Link from "next/link";
import ButtonEdit from "@/components/Payment/ButtonEdit";
import ButtonDelete from "@/components/BookingAdmin/ButtonDelete";


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
          ? `http://localhost:8000/api/villa/admin?show${status}=true`
          : "http://localhost:8000/api/villa/admin";
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
  const handleChangeStatus = async (id: string, status: string) => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/villa/${id}/change-status`,
        { status }, // Mengirim status baru dalam body request
        { withCredentials: true }
      );
      console.log(response.data);

      // Menampilkan notifikasi sukses
      Swal.fire({
        title: "Berhasil",
        text: "Status berhasil diperbarui!",
        icon: "success",
        confirmButtonText: "OK",
      });

      // Memperbarui status villa secara lokal
      setVilla((prevData) =>
        prevData.map((villa) =>
          villa._id === id ? { ...villa, status } : villa
        )
      );
    } catch (err) {
      console.error("Error updating status:", err);

      // Menampilkan notifikasi kesalahan
      Swal.fire({
        title: "Gagal",
        text: "Gagal memperbarui status.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <>
      <div>
        <div className="bg-white p-4 shadow-md rounded-md mb-4 mx-8">
          <nav aria-label="Breadcrumb">
            <ol className="flex space-x-2 text-sm font-medium">
              <li>
                <Link
                  href="/dashboard/admin"
                  className="text-gray-500 hover:text-gray-700"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <span className="text-gray-500">/</span>
              </li>
              <li>
                <span className="text-gray-500"></span>
                Manajemen Posting Admin
              </li>
            </ol>
          </nav>
        </div>

        <div className="flex justify-between border-2 shadow-lg rounded-md items-center mb-3 bg-white p-6 m-8">
          <div>
            <h1 className="text-2xl font-bold mb-2">Manajemen Posting Admin</h1>
            <p>Description</p>
          </div>
        </div>

        <div className="p-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-200">
            <h2 className="text-xl font-bold mb-6">Posting</h2>
            <div className="border-b-2 border-gray-200 w-full md:w-[600px]"></div>
            <div className="mt-2">
              <div className="bg-white rounded-xl p-6  border-gray-200">
                
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
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
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

                {/* Tabel Posting */}
                <div className="bg-white overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border-collapse border border-gray-300 rounded-lg shadow-lg">
                      <thead>
                        <tr className="bg-emerald-600 text-white dark:bg-meta-4">
                          <th className="px-4 text-center whitespace-nowrap">
                            No
                          </th>
                          <th className="p-3 text-center whitespace-nowrap">
                            Nama Villa
                          </th>
                          <th className="px-20 text-center whitespace-nowrap">
                            Fasilitas
                          </th>
                          <th className="p-3 text-center whitespace-nowrap">
                            Harga
                          </th>
                          <th className="px-20 text-center whitespace-nowrap">
                            Lokasi
                          </th>
                          <th className="p-3 text-center whitespace-nowrap">
                            Kategori
                          </th>
                          <th className="px-15 text-center whitespace-nowrap">
                            Status
                          </th>
                          <th className="px-10 text-center whitespace-nowrap">
                            Foto Villa
                          </th>
                          <th className="px-15 text-center whitespace-nowrap">
                            Action
                          </th>
                          <th className="px-10 text-center whitespace-nowrap">
                            Status
                          </th>
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
                            <tr
                              key={data._id}
                              className="border-t border-gray-300 hover:bg-gray-50"
                            >
                              <td className="p-3 text-center border-gray-300">
                                {index + 1}
                              </td>
                              <td className="p-3">{data.nama}</td>
                              <td className="p-5">
                                {data.fasilitas.join(", ")}
                              </td>
                              <td className="p-3 text-center">
                                {data.harga}
                              </td>
                              <td className="p-3">
                                {data.lokasi}
                              </td>
                              <td className="p-3">
                                {data.kategori}
                              </td>
                              <td className="p-3 text-center">
                                <span
                                  className={`px-3 py-1 rounded-full text-white text-sm ${
                                    data.status === "pending"
                                      ? "bg-yellow-100 text-yellow-800 font-semibold"
                                      : data.status === "success"
                                      ? "bg-green-100 text-green-800 font-semibold"
                                      : "bg-red-100 text-red-800 font-semibold"
                                  }`}
                                >
                                  {data.status}
                                </span>
                              </td>
                              <td className="items-center justify-center">
                                <Image
                                  src={
                                    data.foto_villa?.[0]?.url ||
                                    "/default-image.png"
                                  }
                                  alt="Gambar Villa"
                                  width={100}
                                  height={100}
                                  objectFit="cover"
                                  layout="responsive"
                                  className="mx-auto"
                                />
                              </td>
                              <td className="p-3 text-center justify-center gap-5">
                                  <ButtonEdit
                                    onClick={() => window.location.href = `/dashboard/admin/posting/editVilla/${data._id}`}
                                  />
                                <ButtonDelete
                                  onClick={() => {
                                    return confirm(
                                      "Anda yakin ingin menghapus data?"
                                    )
                                      ? handleDelete(data._id)
                                      : "";
                                  }}
                                />
                              </td>
                              <td className="p-3 text-center justify-center gap-5 border-r ">
                                {/* Tombol untuk mengubah status */}
                                <div className="mt-2 flex flex-col gap-4">
                                  <button
                                    className="px-2 py-1 bg-green-500 hover:bg-green-600 text-white rounded text-sm"
                                    onClick={() =>
                                      handleChangeStatus(data._id, "success")
                                    }
                                  >
                                    Success
                                  </button>
                                  <button
                                    className="px-2 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded text-sm"
                                    onClick={() =>
                                      handleChangeStatus(data._id, "pending")
                                    }
                                  >
                                    Pending
                                  </button>
                                  <button
                                    className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm"
                                    onClick={() =>
                                      handleChangeStatus(data._id, "rejected")
                                    }
                                  >
                                    Reject
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-8"></div>
    </>
  );
};

export default PostingMitra;
// !
