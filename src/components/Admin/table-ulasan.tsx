import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faStar, faStarHalfAlt, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { Ulasan } from "@/types/Ulasan";
import useFetchData from "../../hooks/useFetchData";
import Swal from "sweetalert2";
import { useFetchUlasan } from "@/hooks/useFetchUlasan";

const TableUlasan = () => {
  const [loading, setLoading] = useState(false);
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
    "http://localhost:8000/api/ulasan",
    { withCredentials: true }
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTermUser, searchTermVilla, searchTermKomentar, searchTermRating]);

  const { handleDeleteUlasan } = useFetchUlasan();

  useEffect(() => {
    if (ulasanData) setUlasanList(ulasanData.data);
  }, [ulasanData]);

  const handleDelete = (ulasanId: string, userName: string): Promise<void> => {
    return Swal.fire({
      title: `Are you sure you want to delete the review from ${userName}?`,
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setLoading(true);
          return handleDeleteUlasan(ulasanId)
          .then(() => {
            setUlasanList((prevList) =>
              prevList.filter((ulasan) => ulasan._id !== ulasanId)
            );
            Swal.fire(
              "Deleted!",
              `Review from ${userName} has been deleted.`,
              "success"
            );
          })
          .catch((error) => {
            Swal.fire("Error!", error.message || "An error occurred.", "error");
          })
          .finally(() => {
            setLoading(false);
          });
      }
      return Promise.reject();
    });
  };

  const renderTable = () => {
    if (ulasanLoading) {
      return <div className="text-center">Loading...</div>;
    }

    const filteredData = ulasanList.filter((ulasan) => {
      return (
        (searchTermUser === "" || ulasan.user?.nama.toLowerCase().includes(searchTermUser.toLowerCase())) &&
        (searchTermVilla === "" || ulasan.villa?.nama.toLowerCase().includes(searchTermVilla.toLowerCase())) &&
        (searchTermKomentar === "" || ulasan.komentar.toLowerCase().includes(searchTermKomentar.toLowerCase())) &&
        (searchTermRating === "" || ulasan.rating.toString().includes(searchTermRating))
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
        <div className="flex flex-col md:flex-row justify-between m-4 items-center">
          <div className="flex flex-col md:flex-row space-x-0 md:space-x-2 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search by User"
              value={searchTermUser}
              onChange={(e) => setSearchTermUser(e.target.value)}
              className="p-2 mb-2 md:mb-0 border border-gray-300 rounded w-full md:w-48"
            />
            <input
              type="text"
              placeholder="Search by Villa"
              value={searchTermVilla}
              onChange={(e) => setSearchTermVilla(e.target.value)}
              className="p-2 mb-2 md:mb-0 border border-gray-300 rounded w-full md:w-48"
            />
            <input
              type="text"
              placeholder="Search by Comment"
              value={searchTermKomentar}
              onChange={(e) => setSearchTermKomentar(e.target.value)}
              className="p-2 mb-2 md:mb-0 border border-gray-300 rounded w-full md:w-48"
            />
            <input
              type="text"
              placeholder="Search by Rating"
              value={searchTermRating}
              onChange={(e) => setSearchTermRating(e.target.value)}
              className="p-2 mb-2 md:mb-0 border border-gray-300 rounded w-full md:w-48"
            />
          </div>
        </div>
      
        <table className="min-w-full table-auto border-collapse border border-gray-300 rounded-lg shadow-lg">
          <thead className="bg-brown-500 text-white">
            <tr>
              <th className="p-3 text-center border border-gray-300">No</th>
              <th className="p-3 text-center border border-gray-300">User</th>
              <th className="p-3 text-center border border-gray-300">Villa</th>
              <th className="p-3 text-center border border-gray-300">Komentar</th>
              <th className="p-3 text-center border border-gray-300">Rating</th>
              <th className="p-3 text-center border border-gray-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentData.length > 0 ? (
              currentData.map((ulasan, idx) => (
                <tr key={idx} className="border border-gray-300">
                  <td className="p-3 border text-center border-gray-300">
                    {indexOfFirstItem + idx + 1}
                  </td>
                  <td className="p-3 border border-gray-300">{ulasan.userName}</td>
                  <td className="p-3 border border-gray-300">
                    <a href={`/villa/${ulasan.villaId}`} className="text-blue-500">
                      {ulasan.villaName}
                    </a>
                  </td>
                  <td className="p-3 border border-gray-300">{ulasan.komentar}</td>
                  <td className="p-3 border border-gray-300">
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
                  <td className="p-3 border text-center border-gray-300">
                    <button
                      type="button"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(ulasan._id, ulasan.userName)}
                      disabled={loading}
                    >
                      {loading ? (
                        "Deleting..."
                      ) : (
                        <FontAwesomeIcon icon={faTrash} className="w-5" />
                      )}
                    </button>
                    <button
                      className="ml-2 text-blue-500 hover:text-blue-700"
                      onClick={() => openModal(ulasan)}
                    >
                      <FontAwesomeIcon icon={faInfoCircle} className="w-5" />
                    </button>
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
      
        <div className="flex flex-col md:flex-row justify-between mt-4 items-center">
          <div className="flex space-x-2 w-full md:w-auto">
            <button
              className="p-2 bg-gray-200 rounded"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <div className="flex space-x-1">
              {Array.from(
                { length: Math.ceil(filteredData.length / itemsPerPage) },
                (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`p-2 rounded ${
                      currentPage === i + 1
                        ? "bg-brown-500 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    {i + 1}
                  </button>
                )
              )}
            </div>
            <button
              className="p-2 bg-gray-200 rounded"
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={currentPage * itemsPerPage >= filteredData.length}
            >
              Next
            </button>
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

        {/* Text Info Section */}
        <p><strong>User:</strong> {selectedUlasan.user.nama}</p>
        
        {/* Added space after Villa name */}
        <p className="mb-4">
          <strong>Villa:</strong>
          <a 
            href={`/category/${selectedUlasan.villa._id}`} 
            className="text-blue-500 hover:text-blue-700 ml-2"
          >
            {selectedUlasan.villa.nama}
          </a>
        </p>

        <p><strong>Comment:</strong> {selectedUlasan.komentar}</p>
      </div>

      {/* Footer Section with Buttons */}
      <div className="mt-4 flex justify-end space-x-4">
        <button
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition-all"
          onClick={() => {
            handleDelete(selectedUlasan._id, selectedUlasan.user.nama)
              .then(() => {
                closeModal();
              });
          }}
        >
          Delete Review
        </button>
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
