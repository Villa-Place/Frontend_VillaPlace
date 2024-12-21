"use client";
import React, { useState, useEffect } from "react";

// Components
import DetailPembayaran from "./DetailPembayaran";
import Modal from "../../Modal";
import Empty from "../../Empty";
import SkeletonLoader from "./SkeletonLoader";

// Hooks
import useFetchData from "@/hooks/useFetchData";

// Utils
import PaymentCard from "./PaymentCard";
import calculateCountdown from "@/utils/calculateCountdown";
import Payment from "@/types/Payment";

const PaymentUser = () => {
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentModalId, setCurrentModalId] = useState("");
  const [PaymentData, setPaymentData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [countdowns, setCountdowns] = useState<{ [key: string]: string }>({});

  const { data, loading } = useFetchData(
    "http://localhost:8000/api/pembayaran/user",
    {
      withCredentials: true,
    }
  );

  useEffect(() => {
    if (data) {
      setPaymentData(data.data);
    }
  }, [data]);

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedCountdowns: { [key: string]: string } = {};

      PaymentData.forEach((item: Payment) => {
        if (item.status_pembayaran === "pending") {
          console.log(item, "ITEM");
          updatedCountdowns[item._id] = calculateCountdown(item.expiry_time);
        }
      });

      setCountdowns(updatedCountdowns);
    }, 1000);

    return () => clearInterval(interval);
  }, [PaymentData]);

  useEffect(() => {
    // Filter data berdasarkan status
    if (selectedStatus === "All") {
      setFilteredData(PaymentData);
    } else {
      const filtered = PaymentData.filter(
        (item: Payment) => item.status_pembayaran === selectedStatus
      );
      setFilteredData(filtered);
    }
  }, [selectedStatus, PaymentData]);

  const toggleModal = (id: string) => {
    setCurrentModalId(id);
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <div className="mb-5 text-[#212121]">
        <div className="flex mb-4 items-start sm:items-center">
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
              Pending
            </button>
            <button
              onClick={() => setSelectedStatus("success")}
              className={`${
                selectedStatus === "success"
                  ? "bg-[#B7906C]   border-[#B7906C] text-white"
                  : "text-[#5e6c84]"
              } py-1 px-2.5 rounded font-semibold border-2`}
            >
              Berhasil
            </button>
            <button
              onClick={() => setSelectedStatus("failed")}
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
          filteredData.map((item: Payment, index) => (
            <PaymentCard
              key={index}
              item={item}
              toggleModal={toggleModal}
              countdown={countdowns[item._id] || "Menghitung..."}
            />
          ))
        ) : (
          <Empty message="Tidak ada data pembayaran" />
        )}
      </div>
      {isModalOpen && (
        <Modal
          onClose={() => toggleModal("")}
          title="Detail Pembayaran"
          className="max-h-screen overflow-y-auto h-3/4"
        >
          <DetailPembayaran pembayaranId={currentModalId} />
        </Modal>
      )}
    </>
  );
};

export default PaymentUser;
