"use client";

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { User } from "@/types/User";
import { Mitra } from "@/types/Mitra";
import { Admin } from "@/types/Admin";
import useFetchData from "../../hooks/useFetchData";
import { useFetchAdmin } from "../../hooks/useFetchAdmin";
import { useFetchUser } from "../../hooks/useFetchUser";
import { useFetchMitra } from "../../hooks/useFetchMitra";
import Swal from "sweetalert2";

interface TableProps {
  table: "admin" | "mitra" | "user"; // type the table prop to accept specific values
}

const TableManagement: React.FC<TableProps> = ({ table }) => {
  const [loading, setLoading] = useState(false);
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
        setLoading(true);
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
              // If deletion was successful, remove from list and show success message
              if (type === "user") {
                setUserList((prevList) => prevList.filter((user) => user._id !== userId));
              } else if (type === "mitra") {
                setMitraList((prevList) => prevList.filter((mitra) => mitra._id !== userId));
              } else if (type === "admin") {
                setAdminList((prevList) => prevList.filter((admin) => admin._id !== userId));
              }
  
              Swal.fire("Deleted!", `${userName} has been deleted.`, "success");
            })
            .catch((error) => {
              // Handle any errors, and show the failure message
              Swal.fire("Error", `Failed to delete ${userName}: ${error.message}`, "error");
            })
            .finally(() => {
              setLoading(false);
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
        const matchesName = item.nama?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesEmail = item.email?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesNoTelepon = item.no_telepon?.toLowerCase().includes(searchTerm.toLowerCase()) || table !== "admin";
  
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
          <thead className="bg-brown-500 text-white">
            <tr>
              <th className="p-3 text-center border border-gray-300">No</th>
              <th className="p-3 text-center border border-gray-300">Nama</th>
              <th className="p-3 text-center border border-gray-300">Email</th>
              <th className="p-3 text-center border border-gray-300">No Telepon</th>
              <th className="p-3 text-center border border-gray-300">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentData.length > 0 ? (
              currentData.map((user, idx) => (
                <tr key={idx} className="border border-gray-300">
                  <td className="p-3 border text-center border-gray-300">
                    {indexOfFirstItem + idx + 1}
                  </td>
                  <td className="p-3 border border-gray-300">{user.nama}</td>
                  <td className="p-3 border border-gray-300">{user.email}</td>
                  <td className="p-3 border border-gray-300">
                    {user.no_telepon ? user.no_telepon : "-"}
                  </td>
                  <td className="p-3 border text-center border-gray-300">
                    <button
                      type="button"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(user._id, table, user.nama)}
                      disabled={loading}
                    >
                      {loading ? "Deleting..." : <FontAwesomeIcon icon={faTrash} className="w-5" />}
                    </button>
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
        <div className="flex justify-between mt-4 items-center">
          <div className="flex space-x-2">
            <button
              className="p-2 bg-gray-200 rounded"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <div className="flex space-x-1">
              {Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`p-2 rounded ${currentPage === i + 1 ? "bg-brown-500 text-white" : "bg-gray-200"}`}
                >
                  {i + 1}
                </button>
              ))}
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
