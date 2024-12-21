import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { Ulasan } from "@/types/Ulasan";
import useFetchData from "../../hooks/useFetchData";
import ButtonDetail from "../BookingAdmin/ButtonDetail";

const TableUlasan = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTermUser, setSearchTermUser] = useState("");
  const [searchTermVilla, setSearchTermVilla] = useState("");
  const [searchTermKomentar, setSearchTermKomentar] = useState("");
  const [searchTermRating, setSearchTermRating] = useState("");
  const [ulasanList, setUlasanList] = useState<Ulasan[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUlasan, setSelectedUlasan] = useState<Ulasan | null>(null);

  const { data: ulasanData, loading: ulasanLoading } = useFetchData(
    "http://localhost:8000/api/ulasan/owner",
    { withCredentials: true }
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTermUser, searchTermVilla, searchTermKomentar, searchTermRating]);

  useEffect(() => {
    if (ulasanData) setUlasanList(ulasanData.data);
  }, [ulasanData]);

  const renderTable = () => {
    if (ulasanLoading) {
      return <div className="text-center">Loading...</div>;
    }

    const filteredData = ulasanList.filter((ulasan) => {
      return (
        (searchTermUser === "" ||
          ulasan.user?.nama
            .toLowerCase()
            .includes(searchTermUser.toLowerCase())) &&
        (searchTermVilla === "" ||
          ulasan.villa?.nama
            .toLowerCase()
            .includes(searchTermVilla.toLowerCase())) &&
        (searchTermKomentar === "" ||
          ulasan.komentar
            .toLowerCase()
            .includes(searchTermKomentar.toLowerCase())) &&
        (searchTermRating === "" ||
          ulasan.rating.toString().includes(searchTermRating))
      );
    });

    const mappedData = filteredData.map((ulasan) => ({
      _id: ulasan._id,
      komentar: ulasan.komentar,
      rating: ulasan.rating,
      userName: ulasan.user?.nama || "-",
      villaName: ulasan.villa?.nama || "-",
      villaId: ulasan.villa?._id || "",
      user: ulasan.user,
      villa: ulasan.villa,
    }));

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = mappedData.slice(indexOfFirstItem, indexOfLastItem);

    return (
      <div className="overflow-x-auto">
        <div className="flex flex-col md:flex-row justify-between m-4 md:m-0 md:mb-4 items-center md:items-start">
          <div className="flex flex-col md:flex-row space-x-0 md:space-x-2 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search by User"
              value={searchTermUser}
              onChange={(e) => setSearchTermUser(e.target.value)}
              className="p-2 mb-2 md:mb-0 border border-gray-300 rounded-lg w-full md:w-48 focus:outline-none focus:border-brown-500"
            />
            <input
              type="text"
              placeholder="Search by Villa"
              value={searchTermVilla}
              onChange={(e) => setSearchTermVilla(e.target.value)}
              className="p-2 mb-2 md:mb-0 border border-gray-300 rounded-lg w-full md:w-48 focus:outline-none focus:border-brown-500"
            />
            <input
              type="text"
              placeholder="Search by Comment"
              value={searchTermKomentar}
              onChange={(e) => setSearchTermKomentar(e.target.value)}
              className="p-2 mb-2 md:mb-0 border border-gray-300 rounded-lg w-full md:w-48 focus:outline-none focus:border-brown-500"
            />
            <input
              type="text"
              placeholder="Search by Rating"
              value={searchTermRating}
              onChange={(e) => setSearchTermRating(e.target.value)}
              className="p-2 mb-2 md:mb-0 border border-gray-300 rounded-lg w-full md:w-48 focus:outline-none focus:border-brown-500"
            />
          </div>
        </div>

        <table className="min-w-full table-auto border-collapse border border-gray-300 rounded-lg shadow-lg">
          <thead className="bg-primary text-white dark:bg-meta-4">
            <tr>
              <th className="p-3 text-center">No</th>
              <th className="p-3 text-left">User</th>
              <th className="p-3 text-left">Villa</th>
              <th className="p-3 text-left">Komentar</th>
              <th className="p-3 text-left">Rating</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentData.length > 0 ? (
              currentData.map((ulasan, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-gray-50 border border-gray-300"
                >
                  <td className="p-3 text-center">
                    {indexOfFirstItem + idx + 1}
                  </td>
                  <td className="p-3">{ulasan.userName}</td>
                  <td className="p-3">
                    <a
                      href={`/category/${ulasan.villaId}`}
                      className="text-brown-500"
                    >
                      {ulasan.villaName}
                    </a>
                  </td>
                  <td className="p-3">{ulasan.komentar}</td>
                  <td className="p-3">
                    <div className="flex">
                      {Array.from({ length: 5 }, (_, i) => {
                        const fullStars = Math.floor(ulasan.rating);
                        const halfStar = ulasan.rating - fullStars >= 0.5;
                        if (i < fullStars) {
                          return (
                            <FontAwesomeIcon
                              key={i}
                              icon={faStar}
                              className="text-yellow-500"
                            />
                          );
                        } else if (i < fullStars + 1 && halfStar) {
                          return (
                            <FontAwesomeIcon
                              key={i}
                              icon={faStarHalfAlt}
                              className="text-yellow-500"
                            />
                          );
                        } else {
                          return (
                            <FontAwesomeIcon
                              key={i}
                              icon={faStar}
                              className="text-gray-300"
                            />
                          );
                        }
                      })}
                    </div>
                  </td>
                  <td className="p-3 text-center">
                    <ButtonDetail onClick={() => openModal(ulasan)} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-3 text-center">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>

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
                    filteredData.length / itemsPerPage
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
                      Math.ceil(filteredData.length / itemsPerPage)
                    )
                  )
                }
                disabled={
                  currentPage === Math.ceil(filteredData.length / itemsPerPage)
                }
                className="p-1.5 sm:p-2 text-sm sm:text-md bg-brown-500 text-white rounded disabled:bg-gray-300"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const openModal = (ulasan: Ulasan) => {
    setSelectedUlasan(ulasan);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedUlasan(null);
    setModalVisible(false);
  };

  const renderModal = () => {
    if (!modalVisible || !selectedUlasan) return null;

    return (
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-start md:justify-center"
        onClick={closeModal} // Close modal on clicking outside
      >
        <div
          className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full md:w-2/3 lg:w-1/2 xl:w-2/5"
          onClick={(e) => e.stopPropagation()} // Prevent click event from propagating to outer div
        >
          <div className="text-left flex flex-col items-start">
            <h2 className="text-xl font-semibold mb-4">Review Details</h2>

            {/* Stars Section */}
            <div className="flex justify-center mb-4">
              <div className="flex">
                {Array.from({ length: 5 }, (_, i) => {
                  const fullStars = Math.floor(selectedUlasan.rating);
                  const halfStar = selectedUlasan.rating - fullStars >= 0.5;
                  if (i < fullStars) {
                    return (
                      <FontAwesomeIcon
                        key={i}
                        icon={faStar}
                        className="text-yellow-500"
                      />
                    );
                  } else if (i < fullStars + 1 && halfStar) {
                    return (
                      <FontAwesomeIcon
                        key={i}
                        icon={faStarHalfAlt}
                        className="text-yellow-500"
                      />
                    );
                  } else {
                    return (
                      <FontAwesomeIcon
                        key={i}
                        icon={faStar}
                        className="text-gray-300"
                      />
                    );
                  }
                })}
              </div>
            </div>
            <p>
              <strong>User:</strong> {selectedUlasan.user.nama}
            </p>
            <p className="mb-4">
              <strong>Villa:</strong>
              <a
                href={`/category/${selectedUlasan.villa._id}`}
                className="text-brown-500 hover:text-brown-600 ml-2"
              >
                {selectedUlasan.villa.nama}
              </a>
            </p>

            <p>
              <strong>Comment:</strong> {selectedUlasan.komentar}
            </p>
          </div>

          {/* Footer Section with Buttons */}
          <div className="mt-4 flex justify-end space-x-4">
            <button
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700 transition-all"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {renderTable()}
      {renderModal()}
    </div>
  );
};

export default TableUlasan;
