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

  return (
    <>
      <div>
        <div className="bg-white p-4 shadow-md rounded-md mb-4 mx-8">
          <nav aria-label="Breadcrumb">
            <ol className="flex space-x-2 text-sm font-medium">
              <li>
                <a
                  href="/dashboardAdmin"
                  className="text-gray-500 hover:text-gray-700"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <span className="text-gray-500">/</span>
              </li>
              <li>
                <span className="text-gray-500"></span>
                Manajemen Posting
              </li>
            </ol>
          </nav>
        </div>

        <div className="flex justify-between border-2 shadow-lg rounded-md items-center mb-3 bg-white p-6 m-8">
          <div>
            <h1 className="text-2xl font-bold mb-2">Manajemen Posting</h1>
            <p>Description</p>
          </div>
          <Link href="/tambahVilla">
            <button
              type="button"
              className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 mt-7 mr-10"
            >
              <p>+ Tambah Postingan</p>
            </button>
          </Link>
        </div>

        <div className="p-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-200">
            <h2 className="text-xl font-bold mb-6">Posting</h2>
            <div className="border-b-2 border-gray-200 w-full md:w-[600px]"></div>
            <div className="mt-5">
              <div className="bg-white rounded-xl p-6  border-gray-200">
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

                <div className="bg-white overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border-collapse border border-gray-300 rounded-lg  shadow-lg">
                      <thead className="bg-brown-500 text-white">
                        <tr>
                          <th className="p-3 text-center border border-gray-300">
                            No
                          </th>
                          <th className="p-3 text-center border border-gray-300">
                            Nama Villa
                          </th>
                          <th className="p-3 text-center border border-gray-300">
                            Fasilitas
                          </th>
                          <th className="p-3 text-center border border-gray-300">
                            Harga
                          </th>
                          <th className="p-3 text-center border border-gray-300">
                            Lokasi
                          </th>
                          <th className="p-3 text-center border border-gray-300">
                            Kategori
                          </th>
                          <th className="p-3 text-center border border-gray-300">
                            Status
                          </th>
                          <th className="p-3 text-center border border-gray-300">
                            Foto Villa
                          </th>
                          <th className="p-3 text-center border border-gray-300">
                            Action
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
                              className="border-t border-gray-300"
                            >
                              <td className="p-3 border text-center border-gray-300">
                                {index + 1}
                              </td>
                              <td className="p-3 border border-gray-300">
                                {data.nama}
                              </td>
                              <td className="p-3 border border-gray-300">
                                {data.fasilitas.join(", ")}
                              </td>
                              <td className="p-3 border border-gray-300">
                                {data.harga}
                              </td>
                              <td className="p-3 border border-gray-300">
                                {data.lokasi}
                              </td>
                              <td className="p-3 border border-gray-300">
                                {data.kategori}
                              </td>
                              <td className="p-3 border text-center border-gray-300">
                                <span
                                  className={`px-3 py-1 rounded-full text-center text-white text-sm ${
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
                              <td className="p-3 border text-center border-gray-300  justify-center items-center">
                                <Image
                                  className="mx-auto"
                                  src={
                                    data.foto_villa?.[0]?.url ||
                                    "/default-image.png"
                                  }
                                  alt="Villa"
                                  width={50}
                                  height={50}
                                />
                              </td>
                              <td className="p-3 text-center justify-center gap-5">
                                <Link href="/editVilla">
                                  <button
                                    // href={`/edit/${index}`}
                                    className="text-blue-500 hover:text-blue-700"
                                  >
                                    <FontAwesomeIcon
                                      icon={faEdit}
                                      className="w-5"
                                    />
                                  </button>
                                </Link>
                                <button
                                  type="button"
                                  className="text-red-500 hover:text-red-700"
                                  onClick={() => {
                                    return confirm(
                                      "Anda yakin ingin menghapus data?"
                                    )
                                      ? handleDelete(data._id)
                                      : "";
                                  }}
                                >
                                  <FontAwesomeIcon
                                    icon={faTrash}
                                    className="w-5"
                                  />
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>{" "}
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
