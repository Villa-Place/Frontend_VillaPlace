"use client";
import React, { useState, useEffect } from "react";
import Modal from "@/components/Modal";
import useFetchBooking from "@/hooks/useFetchBooking";
import TableBookingOwner from "@/components/BookingOwner/TableBookingOwner";
import Booking from "@/types/Booking";
import DetailBooking from "@/components/BookingOwner/DetailBooking";
import ButtonAdd from "@/components/BookingOwner/ButtonAdd";
import AddBooking from "@/components/BookingOwner/AddBooking";
import { useFetchVilla } from "@/hooks/useFetchVilla";
import useFetchPayment from "@/hooks/useFetchPayment";
import generateBookingId from "@/utils/generateBookingId";
import Swal from "sweetalert2";
import Link from "next/link";

interface AddBookingValue {
  guests: number;
  checkInDate: Date;
  checkOutDate: Date;
  total: number;
  villa: { value: string; label: string };
  fullName: string;
  email: string;
}
interface Villa {
  _id: string;
  nama: string;
  deskripsi: string;
  lokasi: string;
  kategori: string[];
  fasilitas: string[];
  harga: number;
  status: string;
}

const PesananMitra = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isModalAddOpen, setIsModalAddOpen] = React.useState(false);
  const [currentModalId, setCurrentModalId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [filteredData, setFilteredData] = useState<Booking[]>([]);
  const [search, setSearch] = useState("");
  const [detailBooking, setDetailBooking] = useState<Booking>();
  const [villa, setVilla] = useState<Villa[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const {
    handleGetBookingById,
    handleGetBookingByOwner,
    handleCreateBookingOwner,
  } = useFetchBooking();
  const { handleGetVillaByOwner } = useFetchVilla();
  const { handleCreatePayment } = useFetchPayment();

  useEffect(() => {
    const fetchData = async () => {
      const data = await handleGetVillaByOwner("limit=5&page=1");

      if (data && data.data) {
        setVilla(data.data);
      }
    };

    fetchData();
  }, [handleGetVillaByOwner]);

  useEffect(() => {
    const fetchData = async () => {
      const query = `status=${selectedStatus}`;
      const itemsPerPage = 5;

      const data = await handleGetBookingByOwner(query);
      if (data && data.data) {
        const filteredData = data.data.filter((data: Booking) => {
          const searchKeyword = search.toLowerCase();

          const nama_villa = data.villa.nama?.toLowerCase() || "";
          const nama_user = data.user?.nama?.toLowerCase() || "";
          const email_user = data.user?.email?.toLowerCase() || "";

          return (
            nama_villa.includes(searchKeyword) ||
            nama_user.includes(searchKeyword) ||
            email_user.includes(searchKeyword)
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
      } else {
        setTotalItems(0);
        setTotalPages(0);
      }
    };

    fetchData();
  }, [selectedStatus, search, currentPage]);

  useEffect(() => {
    if (currentModalId) {
      const fetchData = async () => {
        const data = await handleGetBookingById(currentModalId);
        if (data) {
          setDetailBooking(data.data);
        }
      };

      fetchData();
    }
  }, [currentModalId]);

  const toggleModal = (id: string) => {
    setCurrentModalId(id);
    setIsModalOpen(!isModalOpen);
  };

  const toggleModalAdd = () => {
    setIsModalAddOpen(!isModalAddOpen);
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

  const handleAddBooking = async (values: AddBookingValue) => {
    const res = await handleCreateBookingOwner({
      jumlah_orang: values.guests,
      tanggal_mulai: values.checkInDate,
      tanggal_selesai: values.checkOutDate,
      status: "success",
      harga: values.total,
      villa: values.villa.value,
    });

    if (!res) {
      alert("Gagal membuat pesanan");
      return;
    }
    await handleCreatePayment({
      nama_pembayar: values.fullName,
      email_pembayar: values.email,
      kode_pembayaran: generateBookingId(),
      jumlah_pembayaran: values.total,
      status_pembayaran: "success",
      pdf_url: "-",
      tanggal_pembayaran: new Date(),
      nomor_va: "-",
      expiry_time: new Date(),
      pesanan: res.data._id,
      metode_pembayaran: "Cash",
      bank: "-",
    });

    Swal.fire({
      icon: "success",
      title: "Berhasil",
      text: "Pesanan berhasil dibuat",
    });

    setIsModalAddOpen(false);
  };

  return (
    <div>
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
                href="/dashboard/mitra/pesanan"
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
              Pesanan
            </li>
          </ol>
        </nav>
      </div>

      <div className="flex justify-between border-2 shadow-lg rounded-md items-center mb-3 bg-white p-6 m-8">
        <div>
          <h1 className="text-2xl font-bold mb-2">Manajemen Pesanan</h1>
          <p>Halaman untuk memanajemen pesanan</p>
        </div>
        <div>
          <ButtonAdd onClick={toggleModalAdd} />
        </div>
      </div>

      <div className="p-8">
        <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-200">
          <h2 className="text-xl font-bold mb-6">Pesanan</h2>
          <div className="border-b-2 border-gray-200 w-full md:w-[600px]"></div>
          <div className="mt-5">
            <TableBookingOwner
              filteredData={filteredData}
              search={search}
              selectedStatus={selectedStatus}
              totalPages={totalPages}
              currentPage={currentPage}
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
          title="Detail Pesanan"
          className="max-h-screen overflow-y-auto h-3/4"
        >
          {detailBooking && <DetailBooking detailBooking={detailBooking} />}
        </Modal>
      )}

      {isModalAddOpen && (
        <Modal
          onClose={() => toggleModalAdd()}
          title="Tambah Pesanan"
          className="max-h-screen max-w-lg overflow-y-auto h-fit"
        >
          <AddBooking handleAddBooking={handleAddBooking} villaList={villa} />
        </Modal>
      )}
    </div>
  );
};

export default PesananMitra;
