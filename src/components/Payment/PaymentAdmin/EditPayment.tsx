import React, { useState, useEffect } from "react";
import Payment from "@/types/Payment";
import useFetchPayment from "@/hooks/useFetchPayment";
import { formatDateMonthDayYear } from "@/utils/formatDate";

interface EditPaymentProps {
  paymentId: string;
  onSubmit: (paymentId: string, updatedPayment: Payment) => void;
}

const EditPayment: React.FC<EditPaymentProps> = ({ paymentId, onSubmit }) => {
  const [paymentData, setPaymentData] = useState<Payment | null>(null);

  const { handleGetPaymentById, loading, error } = useFetchPayment();

  useEffect(() => {
    // Simulasi fetch data payment berdasarkan paymentId
    const fetchPayment = async () => {
      try {
        const data = await handleGetPaymentById(paymentId);
        setPaymentData(data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPayment();
  }, [paymentId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (paymentData) {
      setPaymentData({
        ...paymentData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentData) {
      onSubmit(paymentId, paymentData);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!paymentData) return <p>No payment data available</p>;
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="nama_pembayar"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Nama Pembayar
          </label>
          <input
            type="text"
            id="nama_pembayar"
            name="nama_pembayar"
            disabled
            className="w-full rounded-md border border-stroke  py-[10px] px-5 text-gray-400 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-100 disabled:border-gray-100 dark:disabled:bg-gray-400 dark:disabled:border-gray-400"
            value={paymentData.nama_pembayar}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email_pembayar"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email Pembayar
          </label>
          <input
            type="email"
            id="email_pembayar"
            name="email_pembayar"
            className="w-full rounded-md border border-stroke  py-[10px] px-5 text-gray-400 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-100 disabled:border-gray-100 dark:disabled:bg-gray-400 dark:disabled:border-gray-400"
            value={paymentData.email_pembayar}
            onChange={handleChange}
            disabled
            required
          />
        </div>

        <div className="grid md:grid-cols-2 md:gap-6 mb-4">
          <div className="mb-2">
            <label
              htmlFor="metode_pembayaran"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Metode Pembayaran
            </label>
            <input
              type="text"
              id="metode_pembayaran"
              name="metode_pembayaran"
              value={paymentData.metode_pembayaran}
              className="w-full rounded-md border border-stroke  py-[10px] px-5 text-gray-400 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-100 disabled:border-gray-100 dark:disabled:bg-gray-400 dark:disabled:border-gray-400"
              onChange={handleChange}
              disabled
              required
            />
          </div>

          <div className="mb-2">
            <label
              htmlFor="bank"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Bank
            </label>
            <input
              type="text"
              id="bank"
              name="bank"
              value={paymentData.bank}
              className="w-full rounded-md uppercase border border-stroke  py-[10px] px-5 text-gray-400 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-100 disabled:border-gray-100 dark:disabled:bg-gray-400 dark:disabled:border-gray-400"
              onChange={handleChange}
              required
              disabled
            />
          </div>

          <div className="">
            <label
              htmlFor="tanggal_pembayaran"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Tanggal Pembayaran
            </label>
            <input
              type="date"
              id="tanggal_pembayaran"
              name="tanggal_pembayaran"
              value={formatDateMonthDayYear(paymentData.tanggal_pembayaran)}
              className="w-full rounded-md border border-stroke  py-[10px] px-5 text-gray-400 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-100 disabled:border-gray-100 dark:disabled:bg-gray-400 dark:disabled:border-gray-400"
              onChange={handleChange}
              required
              disabled
            />
          </div>
          <div>
            <label
              htmlFor="jumlah_pembayaran"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Jumlah Pembayaran:
            </label>
            <input
              type="number"
              id="jumlah_pembayaran"
              name="jumlah_pembayaran"
              value={paymentData.jumlah_pembayaran}
              onChange={handleChange}
              className="w-full rounded-md border border-stroke  py-[10px] px-5 text-gray-400 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-100 disabled:border-gray-100 dark:disabled:bg-gray-400 dark:disabled:border-gray-400"
              disabled
              required
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="status_pembayaran"
            className="mb-[10px] block text-base font-medium text-dark dark:text-white"
          >
            Status Pembayaran:
          </label>
          <select
            id="status_pembayaran"
            name="status_pembayaran"
            value={paymentData.status_pembayaran}
            onChange={handleChange}
            className="w-full bg-white rounded-md border border-stroke  py-[10px] px-5 text-gray-400 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-100 disabled:border-gray-100 dark:disabled:bg-gray-400 dark:disabled:border-gray-400"
            required
          >
            <option value="pending">Pending</option>
            <option value="success">Success</option>
            <option value="failed">Failed</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full mt-5 font-semibold bg-primary text-white py-2 rounded-md"
        >
          Simpan
        </button>
      </form>
    </>
  );
};

export default EditPayment;
