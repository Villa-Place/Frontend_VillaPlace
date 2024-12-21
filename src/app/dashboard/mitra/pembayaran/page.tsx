"use client";
import React, { useState, useEffect } from "react";
import TablePayment from "@/components/Payment/PaymentMitra/TablePayment";
import Modal from "@/components/Modal";
import DetailPayment from "@/components/Payment/DetailPayment";
import useFetchPayment from "@/hooks/useFetchPayment";

// Types
import Payment from "@/types/Payment";
import Link from "next/link";

const PembayaranAdmin = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [currentModalId, setCurrentModalId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [filteredData, setFilteredData] = useState<Payment[]>([]);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const { handleGetAllPaymentOwner } = useFetchPayment();

  useEffect(() => {
    const fetchData = async () => {
      const query = `status=${selectedStatus}`;
      const itemsPerPage = 5;

      const data = await handleGetAllPaymentOwner(query);
      if (data && data.data) {
        const filteredData = data.data.filter((data: Payment) => {
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
        const currentItems = filteredData.slice(
          indexOfFirstItem,
          indexOfLastItem
        );
        const totalPages = Math.ceil(filteredData.length / itemsPerPage);

        setFilteredData(currentItems);
        setTotalItems(filteredData.length);
        setTotalPages(totalPages);
      }
    };

    fetchData();
  }, [search, currentPage, selectedStatus]);

  const toggleModal = (id: string) => {
    setCurrentModalId(id);
    setIsModalOpen(!isModalOpen);
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
  return (
    <>
      <div className="bg-white p-4 shadow-md rounded-md mb-4 mx-8">
        <nav aria-label="Breadcrumb">
          <ol className="flex space-x-2 text-sm font-medium">
            <li>
              <Link
                href="/dashboard/mitra"
                className="text-gray-500 hover:text-gray-700"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <span className="text-gray-500">/</span>
            </li>
            <li>
              <Link
                href="/dashboard/mitra/pembayaran"
                className="text-gray-500 hover:text-gray-700"
              >
                Transaksi
              </Link>
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
              handleSearch={handleSearch}
              toggleModal={toggleModal}
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
    </>
  );
};

export default PembayaranAdmin;
