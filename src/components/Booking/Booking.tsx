"use client";

// React
import React, { useState, useEffect } from "react";
import Image from "next/image";

// Components
import DetailPesanan from "./DetailPesanan";
import Review from "./Review";
import Modal from "../Modal";
import Empty from "../Empty";
import SkeletonLoader from "./SkeletonLoader";

// Hooks
import useFetchData from "@/hooks/useFetchData";
import { useFetchUlasan } from "@/hooks/useFetchUlasan";

// Utils
import { formatDate } from "@/utils/formatDate";
import { getStatusColor, getStatusLabel } from "@/utils/getStatusLabelAndColor";
import { calculateDays } from "@/utils/calculateDays";

type Review = {
  rating: number;
  komentar: string;
  villa: string;
};

const Booking = () => {
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentModalPesananId, setCurrentModalPesananId] = useState("");
  const [currentModalReviewId, setCurrentModalReviewId] = useState("");
  const [isModalReviewOpen, setIsModalReviewOpen] = useState(false);
  const [BookingData, setBookingData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [reviewData, setReviewData] = useState<Review[]>([]);

  const { handleFetchUlasan } = useFetchUlasan();

  const { data, loading } = useFetchData(
    "http://localhost:8000/api/pesanan/user",
    {
      withCredentials: true,
    }
  );

  const { data: dataReview } = useFetchData(
    "http://localhost:8000/api/ulasan/user",
    {
      withCredentials: true,
    }
  );

  const handleSubmit = (values: { rating: number; komentar: string }) => {
    const data = {
      rating: values.rating,
      komentar: values.komentar,
      villa: currentModalReviewId,
    };
    handleFetchUlasan(data);
    setReviewData([...reviewData, data]);
    toggleModalReview(null);
  };

  useEffect(() => {
    if (data) {
      setBookingData(data.data);
    }
  }, [data]);

  useEffect(() => {
    if (dataReview) {
      setReviewData(dataReview.data);
    }
  }, [dataReview]);

  useEffect(() => {
    // Filter data berdasarkan status
    if (selectedStatus === "All") {
      setFilteredData(BookingData);
    } else {
      const filtered = BookingData.filter(
        (item: any) => item.status === selectedStatus
      );
      setFilteredData(filtered);
    }
  }, [selectedStatus, BookingData]);

  const toggleModal = (id: any) => {
    setCurrentModalPesananId(id);
    setIsModalOpen(!isModalOpen);
  };

  const toggleModalReview = (id: any) => {
    setCurrentModalReviewId(id);
    setIsModalReviewOpen(!isModalReviewOpen);
  };
  return (
    <>
      <div className=" mb-5 ">
        <div className="flex mb-4 items-start sm:items-center ">
          <div className="mr-4">
            <p className="font-semibold">Status</p>
          </div>
          <div className="w-full items-center flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedStatus("All")}
              className={`${
                selectedStatus === "All"
                  ? "bg-[#B7906C]   border-[#B7906C] text-white"
                  : "text-[#5e6c84]"
              } py-1 px-2.5 rounded font-semibold border-2`}
            >
              Semua
            </button>
            <button
              onClick={() => setSelectedStatus("pending")}
              className={`${
                selectedStatus === "pending"
                  ? "bg-[#B7906C]   border-[#B7906C] text-white"
                  : "text-[#5e6c84]"
              } py-1 px-2.5 rounded font-semibold border-2`}
            >
              Belum Bayar
            </button>
            <button
              onClick={() => setSelectedStatus("success")}
              className={`${
                selectedStatus === "success"
                  ? "bg-[#B7906C]   border-[#B7906C] text-white"
                  : "text-[#5e6c84]"
              } py-1 px-2.5 rounded font-semibold border-2`}
            >
              Berlangsung
            </button>
            <button
              onClick={() => setSelectedStatus("completed")}
              className={`${
                selectedStatus === "completed"
                  ? "bg-[#B7906C]   border-[#B7906C] text-white"
                  : "text-[#5e6c84]"
              } py-1 px-2.5 rounded font-semibold border-2`}
            >
              Selesai
            </button>
            <button
              onClick={() => setSelectedStatus("canceled")}
              className={`${
                selectedStatus === "canceled"
                  ? "bg-[#B7906C]   border-[#B7906C] text-white"
                  : "text-[#5e6c84]"
              } py-1 px-2.5 rounded font-semibold border-2`}
            >
              Dibatalkan
            </button>
          </div>
        </div>
        {loading ? (
          <SkeletonLoader />
        ) : filteredData.length > 0 ? (
          filteredData.map((item: any, index) => (
            <div key={index} className="box-3 mb-4">
              <div className="flex justify-between mb-4 items-center">
                <div className="inline-flex items-center text-sm font-semibold">
                  <p className="mr-2">Tanggal Pemesanan :</p>
                  <p>{formatDate(item.createdAt)}</p>
                </div>
                <p
                  // className={`inline-flex text-yellow-600 bg-yellow-600 border border-yellow-600 rounded-sm bg-opacity-10 py-1 px-3 text-sm font-bold`}
                  className={`inline-flex ${getStatusColor(
                    item.status
                  )} border rounded-full bg-opacity-10 py-1 px-3 text-xs font-bold`}
                >
                  {getStatusLabel(item.status)}
                </p>
              </div>
              <div className="flex flex-col md:flex-row w-full  ">
                <div className="md:item-content w-full ">
                  <div className="flex flex-col sm:flex-row">
                    <Image
                      src={
                        item.villa.foto_villa[0]?.url ||
                        "/assets/images/default-villa.jpg"
                      }
                      width={150}
                      height={150}
                      alt="villa"
                      className="rounded-lg mr-4 w-full h-45 sm:w-45 object-cover"
                    />
                    <div className="">
                      <p className="font-bold text-xl mb-2">
                        {item.villa.nama}
                      </p>
                      <div className="text-sm flex gap-2 text-form-strokedark mb-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-4 h-4 w-4 stroke-2 text-inherit"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                          />
                        </svg>
                        <span> {item.villa.lokasi}</span>
                      </div>
                      <p className="text-sm text-form-strokedark mb-2">
                        {calculateDays(
                          item.tanggal_mulai,
                          item.tanggal_selesai
                        )}{" "}
                        Hari x Rp {item.villa.harga.toLocaleString("id-ID")}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col w-full justify-between md:w-1/3">
                  <div className="flex flex-col justify-end items-end">
                    <p className="text-form-strokedark">Total Pembayaran</p>
                    <p className="font-bold text-lg">
                      Rp {item.harga.toLocaleString("id-ID")}
                    </p>
                  </div>
                  <div className="flex justify-end items-center gap-2">
                    <button
                      type="button"
                      onClick={() => toggleModal(item._id)}
                      className="flex justify-end font-semibold text-[#089562] bg-[#089562] bg-opacity-10 border border-[#089562] hover:bg-opacity-30 rounded text-sm px-3 py-1.5 me-2 dark:bg-green-600 dark:hover:bg-green-700"
                    >
                      Lihat Detail
                    </button>

                    {item.status === "completed" && (
                      <button
                        onClick={() => toggleModalReview(item.villa._id)}
                        // className="flex justify-end font-semibold text-white bg-[#089562] hover:bg-green-800 rounded text-sm px-3 py-1.5 dark:bg-green-600 dark:hover:bg-green-700"
                        className={`flex justify-end font-semibold text-white bg-[#089562] hover:bg-green-800 rounded text-sm px-3 py-1.5 dark:bg-green-600 dark:hover:bg-green-700 ${
                          reviewData.some(
                            (review: any) => review.villa === item.villa._id
                          )
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                        disabled={reviewData.some(
                          (review: any) => review.villa === item.villa._id
                        )}
                      >
                        Review Villa
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <Empty message="Tidak ada pesanan" />
        )}
      </div>
      {isModalOpen && (
        <Modal
          onClose={() => toggleModal(null)}
          title="Detail Pesanan Villa"
          className="max-h-screen overflow-y-auto h-3/4"
        >
          <DetailPesanan pesananId={currentModalPesananId} />
        </Modal>
      )}
      {isModalReviewOpen && (
        <Modal
          onClose={() => toggleModalReview(null)}
          title="Beri Ulasan Villa"
          className="max-w-md"
        >
          <Review handleSubmit={handleSubmit} />
        </Modal>
      )}
    </>
  );
};

export default Booking;
