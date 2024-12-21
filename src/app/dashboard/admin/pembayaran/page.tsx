"use client";
import React, { useState, useEffect } from "react";
import TablePayment from "@/components/Payment/PaymentAdmin/TablePayment";
import Modal from "@/components/Modal";
import DetailPayment from "@/components/Payment/DetailPayment";
import EditPayment from "@/components/Payment/PaymentAdmin/EditPayment";
import useFetchPayment from "@/hooks/useFetchPayment";
import Swal from "sweetalert2";

// Types
import Payment from "@/types/Payment";

const PembayaranAdmin = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = React.useState(false);
  const [currentModalId, setCurrentModalId] = useState("");
  const [dataPayment, setDataPayment] = useState<Payment[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [filteredData, setFilteredData] = useState<Payment[]>([]);
  const [search, setSearch] = useState("");
  const [itemsPerPage] = useState(5); // 20 item per halaman
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const { handleUpdatePayment, handleGetAllPayment, handleDeletePayment } =
    useFetchPayment();

  useEffect(() => {
    const fetchData = async () => {
      const query = `status=${selectedStatus}`;

      const data = await handleGetAllPayment(query);
      if (data && data.data) {
        const filteredData = data.data;

        setDataPayment(filteredData);
      } else {
        setDataPayment([]);
      }
    };

    fetchData();
  });

  const toggleModal = (id: string) => {
    setCurrentModalId(id);
    setIsModalOpen(!isModalOpen);
  };

  const toggleModalEdit = (id: string) => {
    setCurrentModalId(id);
    setIsModalEditOpen(!isModalEditOpen);
  };

  const handleSubmit = (id: string, updatedPayment: Payment) => {
    handleUpdatePayment(id, updatedPayment);
    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Pembayaran berhasil diubah",
    });
    setFilteredData((prevData) =>
      prevData.map((item) => (item._id === id ? updatedPayment : item))
    );
    toggleModalEdit("");
  };

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeletePayment(id);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      } else {
        Swal.fire("Cancelled", "Your file is safe :)", "error");
      }
    });

    setFilteredData((prevData) => prevData.filter((item) => item._id !== id));
  };

  const handleCurrentPage = (currentPage: number) => {
    setCurrentPage(currentPage);
  };

  const handleSearch = (keyword: string) => {
    setSearch(keyword);
  };

  const handleSelectStatus = (selectedStatus: string) => {
    setSelectedStatus(selectedStatus);
  };

  useEffect(() => {
    const filteredPayment = dataPayment.filter((data) => {
      const searchKeyword = search.toLowerCase();

      const nama_villa = data.pesanan.villa.nama?.toLowerCase() || "";
      const bank = data.bank?.toLowerCase() || "";
      const nama_pembayar = data.nama_pembayar?.toLowerCase() || "";
      const lokasi = data.pesanan.villa?.lokasi.toLowerCase() || "";

      return (
        nama_pembayar.includes(searchKeyword) ||
        bank.includes(searchKeyword) ||
        nama_villa.includes(searchKeyword) ||
        lokasi.includes(searchKeyword)
      );
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredPayment.slice(
      indexOfFirstItem,
      indexOfLastItem
    );
    const totalPages = Math.ceil(filteredPayment.length / itemsPerPage);

    setTotalItems(filteredPayment.length);
    setTotalPages(totalPages);
    setFilteredData(currentItems);
  }, [dataPayment, search, currentPage, itemsPerPage]);

  return (
    <div>
      <div className="bg-white p-4 shadow-md rounded-md mb-4 mx-8">
        <nav aria-label="Breadcrumb">
          <ol className="flex space-x-2 text-sm font-medium">
            <li>
              <a
                href="/dashboard/admin"
                className="text-gray-500 hover:text-gray-700"
              >
                Dashboard
              </a>
            </li>
            <li>
              <span className="text-gray-500">/</span>
            </li>
            <li>
              <a
                href="/dashboard/admin/pembayaran"
                className="text-gray-500 hover:text-gray-700"
              >
                Transaksi
              </a>
            </li>
            <li>
              <span className="text-gray-500">/</span>
            </li>
            <li>
              <span className="text-gray-500"></span>
              Pembayaran
            </li>
          </ol>
        </nav>
      </div>

      <div className="flex justify-between border-2 shadow-lg rounded-md items-center mb-3 bg-white p-6 m-8">
        <div>
          <h1 className="text-2xl font-bold mb-2">Manajemen Pembayaran</h1>
          <p>Halaman untuk memanajemen pembayaran villa</p>
        </div>
      </div>

      <div className="p-8">
        <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-200">
          <h2 className="text-xl font-bold mb-6">Pembayaran</h2>
          <div className="border-b-2 border-gray-200 w-full md:w-[600px]"></div>
          <div className="mt-5">
            <TablePayment
              filteredData={filteredData}
              search={search}
              currentPage={currentPage}
              selectedStatus={selectedStatus}
              totalPages={totalPages}
              totalItems={totalItems}
              handleCurrentPage={handleCurrentPage}
              handleDelete={handleDelete}
              handleSearch={handleSearch}
              toggleModal={toggleModal}
              toggleModalEdit={toggleModalEdit}
              handleSelectStatus={handleSelectStatus}
            />
          </div>
        </div>
      </div>
      {isModalOpen && (
        <Modal
          onClose={() => toggleModal("")}
          title="Detail Pembayaran"
          className="max-h-screen overflow-y-auto h-3/4"
        >
          <DetailPayment paymentId={currentModalId} />
        </Modal>
      )}

      {isModalEditOpen && (
        <Modal
          onClose={() => toggleModalEdit("")}
          title="Edit Pembayaran"
          className="max-h-screen max-w-lg overflow-y-auto h-3/2"
        >
          <EditPayment paymentId={currentModalId} onSubmit={handleSubmit} />
        </Modal>
      )}
    </div>
  );
};

export default PembayaranAdmin;
