"use client";

import React, { useState } from "react";
import ModalAdmin from "@/components/Admin/modalAdd";
import TableManajemen from "@/components/Admin/table-management";

const ManajemenPengguna = () => {
  const [showModal, setShowModal] = useState(false); // State for modal visibility

  return (
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
        <a href="/manajemen-pengguna/admin" className="text-gray-500 hover:text-gray-700">
          Manajemen Pengguna
        </a>
      </li>
      <li>
        <span className="text-gray-500">/</span>
      </li>
      <li>
        <span className="text-gray-500"></span>
        Admin
      </li>
          </ol>
        </nav>
      </div>

      <div className="flex justify-between border-2 shadow-lg rounded-md items-center mb-3 bg-white p-6 m-8">
        <div>
          <h1 className="text-2xl font-bold mb-2">Manajemen Pengguna - Admin</h1>
          <p>Halaman untuk memanajemen role admin</p>
        </div>
        <div>
          <button
            type="button"
            onClick={() => setShowModal(true)} // Open modal when clicked
            className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 mt-7 mr-10"
          >
            <p>+ Tambah Admin</p>
          </button>
        </div>
      </div>

      <div className="p-8">
        <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-200">
          <h2 className="text-xl font-bold mb-6">Admin</h2>
          <div className="border-b-2 border-gray-200 w-full md:w-[600px]"></div>
          <div className="mt-5">
            <TableManajemen table="admin"/>
          </div>
        </div>
      </div>

      <ModalAdmin showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
};

export default ManajemenPengguna;
