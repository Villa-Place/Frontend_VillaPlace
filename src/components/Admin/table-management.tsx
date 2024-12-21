"use client";

import React, { useState, useEffect } from "react";
import { User } from "@/types/User";
import { Mitra } from "@/types/Mitra";
import { Admin } from "@/types/Admin";
import useFetchData from "../../hooks/useFetchData";
import { useFetchAdmin } from "../../hooks/useFetchAdmin";
import { useFetchUser } from "../../hooks/useFetchUser";
import { useFetchMitra } from "../../hooks/useFetchMitra";
import Swal from "sweetalert2";
import ButtonDelete from "../BookingAdmin/ButtonDelete";

interface TableProps {
  table: "admin" | "mitra" | "user";
}

const TableManagement: React.FC<TableProps> = ({ table }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [userList, setUserList] = useState<User[]>([]);
  const [mitraList, setMitraList] = useState<Mitra[]>([]);
  const [adminList, setAdminList] = useState<Admin[]>([]);

  const { data: userData, loading: userLoading } = useFetchData(
    `http://localhost:8000/api/user`,
    { withCredentials: true }
  );
  const { data: mitraData, loading: mitraLoading } = useFetchData(
    `http://localhost:8000/api/owner`,
    { withCredentials: true }
  );
  const { data: adminData, loading: adminLoading } = useFetchData(
    `http://localhost:8000/api/admin`,
    { withCredentials: true }
  );

  const { handleDeleteAdmin } = useFetchAdmin();
  const { handleDeleteUser } = useFetchUser();
  const { handleDeleteMitra } = useFetchMitra();

  useEffect(() => {
    if (userData) setUserList(userData.data);
    if (mitraData) setMitraList(mitraData.data);
    if (adminData) setAdminList(adminData.data);
  }, [userData, mitraData, adminData]);

  const handleDelete = (userId: string, type: string, userName: string) => {
    Swal.fire({
      title: `Are you sure you want to delete ${userName}?`,
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        let deletePromise;

        if (type === "user") {
          deletePromise = handleDeleteUser(userId);
        } else if (type === "mitra") {
          deletePromise = handleDeleteMitra(userId);
        } else if (type === "admin") {
          deletePromise = handleDeleteAdmin(userId);
        }

        if (deletePromise) {
          deletePromise
            .then(() => {
              if (type === "user") {
                setUserList((prevList) =>
                  prevList.filter((user) => user._id !== userId)
                );
              } else if (type === "mitra") {
                setMitraList((prevList) =>
                  prevList.filter((mitra) => mitra._id !== userId)
                );
              } else if (type === "admin") {
                setAdminList((prevList) =>
                  prevList.filter((admin) => admin._id !== userId)
                );
              }

              Swal.fire("Deleted!", `${userName} has been deleted.`, "success");
            })
            .catch((error) => {
              Swal.fire(
                "Error",
                `Failed to delete ${userName}: ${error.message}`,
                "error"
              );
            });
        }
      }
    });
  };

  const renderTable = () => {
    let data: User[] | Mitra[] | Admin[] = [];

    if (table === "user") {
      data = userList;
    } else if (table === "mitra") {
      data = mitraList;
    } else if (table === "admin") {
      data = adminList;
    }

    if (userLoading || mitraLoading || adminLoading) {
      return <div className="text-center">Loading...</div>;
    }

    const filterData = (data: User[] | Mitra[] | Admin[]) => {
      return data.filter((item) => {
        const matchesName = item.nama
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesEmail = item.email
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesNoTelepon =
          item.no_telepon?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          table !== "admin";

        return matchesName || matchesEmail || matchesNoTelepon;
      });
    };

    const filteredData = filterData(data);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300 rounded-lg shadow-lg">
          <thead className="bg-primary text-white dark:bg-meta-4">
            <tr>
              <th className="p-3 text-center">No</th>
              <th className="p-3 text-left">Nama</th>
              <th className="p-3 text-left">Email</th>
              <th
                className={`p-3 text-left ${table === "admin" ? "hidden" : ""}`}
              >
                No Telepon
              </th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentData.length > 0 ? (
              currentData.map((user, idx) => (
                <tr
                  key={idx}
                  className="border border-gray-300 hover:bg-gray-50"
                >
                  <td className="p-3 text-center">
                    {indexOfFirstItem + idx + 1}
                  </td>
                  <td className="p-3">{user.nama}</td>
                  <td className="p-3">{user.email}</td>
                  <td className={`p-3 ${table === "admin" ? "hidden" : ""}`}>
                    {user.no_telepon ? user.no_telepon : "-"}
                  </td>
                  <td className="p-3 text-center">
                    <ButtonDelete
                      onClick={() => handleDelete(user._id, table, user.nama)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-3 text-center">
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

  return (
    <div className="bg-white rounded-xl p-6 border-gray-200">
      <div className="mb-5 flex items-center space-x-6">
        <input
          type="text"
          className="p-2 border rounded-lg w-64 focus:ring-2 focus:ring-brown-500 focus:outline-none focus:outline-2 focus:outline-brown-400 transition duration-200 ease-in-out"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {renderTable()}
    </div>
  );
};

export default TableManagement;
