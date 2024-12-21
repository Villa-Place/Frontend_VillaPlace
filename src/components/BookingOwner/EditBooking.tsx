import React, { useState, useEffect } from "react";
import Booking from "@/types/Booking";
import useFetchBooking from "@/hooks/useFetchBooking";
import { formatDateMonthDayYear } from "@/utils/formatDate";

interface Props {
  bookingId: string;
  onEdit: (bookingId: string, updatedBooking: Booking) => void;
}

const EditBooking = ({ bookingId, onEdit }: Props) => {
  const [dataBooking, setDataBooking] = useState<Booking | null>(null);

  const { handleGetBookingById, loading } = useFetchBooking();

  useEffect(() => {
    // Simulasi fetch data payment berdasarkan paymentId
    const fetchPayment = async () => {
      try {
        const data = await handleGetBookingById(bookingId);
        setDataBooking(data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPayment();
  }, [bookingId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (dataBooking) {
      setDataBooking({
        ...dataBooking,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (dataBooking) {
      onEdit(bookingId, dataBooking);
    }
  };

  if (loading) return <p>Loading...</p>;

  if (!dataBooking) return <p>No payment data available</p>;

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 md:gap-6 mb-4">
          <div className="mb-2">
            <label
              htmlFor="tanggal_mulai"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Tanggal Masuk
            </label>
            <input
              type="date"
              id="tanggal_mulai"
              name="tanggal_mulai"
              value={formatDateMonthDayYear(dataBooking?.tanggal_mulai)}
              className="w-full rounded-md border border-stroke  py-[10px] px-5 text-gray-400 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-100 disabled:border-gray-100 dark:disabled:bg-gray-400 dark:disabled:border-gray-400"
              onChange={handleChange}
              // disabled
              required
            />
          </div>

          <div className="mb-2">
            <label
              htmlFor="tanggal_selesai"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Tanggal Keluar
            </label>
            <input
              type="date"
              id="tanggal_selesai"
              name="tanggal_selesai"
              value={formatDateMonthDayYear(dataBooking?.tanggal_selesai)}
              className="w-full rounded-md border border-stroke  py-[10px] px-5 text-gray-400 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-100 disabled:border-gray-100 dark:disabled:bg-gray-400 dark:disabled:border-gray-400"
              onChange={handleChange}
              required
              // disabled
            />
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="jumlah_orang"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Jumlah Orang
          </label>
          <input
            type="number"
            id="jumlah_orang"
            name="jumlah_orang"
            // disabled
            className="w-full rounded-md border border-stroke  py-[10px] px-5 text-gray-400 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-100 disabled:border-gray-100 dark:disabled:bg-gray-400 dark:disabled:border-gray-400"
            value={dataBooking?.jumlah_orang}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="harga"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Total Pembayaran
          </label>
          <input
            type="number"
            id="harga"
            name="harga"
            value={dataBooking?.harga}
            onChange={handleChange}
            className="w-full rounded-md border border-stroke  py-[10px] px-5 text-gray-400 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-100 disabled:border-gray-100 dark:disabled:bg-gray-400 dark:disabled:border-gray-400"
            // disabled
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="catatan"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Catatan
          </label>
          <input
            type="text"
            id="catatan"
            name="catatan"
            value={dataBooking?.catatan}
            className="w-full rounded-md border border-stroke  py-[10px] px-5 text-gray-400 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-100 disabled:border-gray-100 dark:disabled:bg-gray-400 dark:disabled:border-gray-400"
            onChange={handleChange}
            required
            // disabled
          />
        </div>

        <div>
          <label
            htmlFor="status"
            className="mb-[10px] block text-base font-medium text-dark dark:text-white"
          >
            Status Pembayaran:
          </label>
          <select
            id="status"
            name="status"
            value={dataBooking?.status}
            onChange={handleChange}
            className="w-full bg-white rounded-md border-2 border-stroke  py-[10px] px-5 text-gray-600 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-100 disabled:border-gray-100 dark:disabled:bg-gray-400 dark:disabled:border-gray-400"
            required
          >
            <option value="pending">Pending</option>
            <option value="success">Succeess</option>
            <option value="completed">Completed</option>
            <option value="failed">Failed</option>
          </select>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="w-full md:w-1/3  mt-5 font-semibold bg-primary text-white py-2 rounded-md"
          >
            Simpan
          </button>
        </div>
      </form>
    </>
  );
};

export default EditBooking;
