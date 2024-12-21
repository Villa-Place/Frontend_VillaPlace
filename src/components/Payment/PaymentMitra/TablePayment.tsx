"use client";
// React
import React from "react";
import Image from "next/image";

// Hooks
import useFetchPayment from "@/hooks/useFetchPayment";

// Komponen
import Pagination from "@/components/Pagination";
import StatusPayment from "@/components/Payment/StatusPayment";
import SearchInput from "@/components/SearchInput";
import ButtonDetail from "../ButtonDetail";

// Types
import { TablePaymentProps } from "@/types/Props/TablePaymentProps";

// Utils
import { formatDate } from "@/utils/formatDate";
import { getStatusPaymentColor } from "@/utils/getStatusLabelAndColor";

const TablePayment = ({
  search,
  filteredData,
  selectedStatus,
  totalPages,
  currentPage,
  totalItems,
  handleCurrentPage,
  handleSearch,
  handleSelectStatus,
  toggleModal,
}: TablePaymentProps) => {
  const { loading, error } = useFetchPayment();

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between gap-2 my-4">
        <SearchInput search={search} handleSearch={handleSearch} />
        <StatusPayment
          selectedStatus={selectedStatus}
          handleSelectStatus={handleSelectStatus}
        />
      </div>
      <div className="max-w-full overflow-x-auto">
        {loading ? (
          <div className="flex justify-center items-center py-6">
            <p className="text-gray-500">Loading data, please wait...</p>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center py-6">
            <p className="text-red-500">
              An error occurred while fetching data.
            </p>
          </div>
        ) : filteredData && filteredData.length === 0 ? (
          <div className="flex justify-center items-center py-6">
            <div className="text-center">
              <Image
                src="/assets/images/Empty-pana.png"
                width={200}
                height={200}
                alt="empty"
                className="mb-5"
              />
              <p className="text-lg font-semibold">Data Tidak Ditemukan</p>
            </div>
          </div>
        ) : (
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-primary text-left dark:bg-meta-4">
                <th className="min-w-[20px] py-4 px-4 font-semibold text-gray-50 dark:text-white">
                  #
                </th>
                <th className="min-w-[200px] py-4 px-4 font-semibold text-gray-50 dark:text-white">
                  Nama Pembayar
                </th>
                <th className="min-w-[220px] py-4 px-4 font-semibold text-gray-50 dark:text-white">
                  Villa
                </th>
                <th className="min-w-[200px] py-4 px-4 font-semibold text-gray-50 dark:text-white">
                  Metode Pembayaran
                </th>
                <th className="min-w-[150px] py-4 px-4 font-semibold text-gray-50 dark:text-white">
                  Total Pembayaran
                </th>
                <th className="min-w-[120px] py-4 px-4 font-semibold text-gray-50 dark:text-white">
                  Status
                </th>
                <th className="py-4 px-4 font-semibold text-gray-50 dark:text-white">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((paymentItem, key) => (
                <tr key={key}>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-gray-800 dark:text-white">{key + 1}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <h5 className="font-medium text-gray-800 dark:text-white">
                      {paymentItem.nama_pembayar}
                    </h5>
                    <p className="text-sm">{paymentItem.email_pembayar}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                      <div className="rounded-md bg-yellow-500">
                        <Image
                          src={
                            paymentItem.pesanan.villa.foto_villa[0]?.url ||
                            "/assets/images/default-villa.jpg"
                          }
                          width={70}
                          height={60}
                          className="rounded-md object-cover h-24 w-28"
                          alt="Product"
                        />
                      </div>
                      <div className="flex flex-col">
                        <p className="text-sm text-gray-800 dark:text-white">
                          {paymentItem.pesanan.villa.nama}
                        </p>
                        <p className="text-sm font-semibold text-gray-800 dark:text-white">
                          Rp{" "}
                          {paymentItem.pesanan.villa.harga.toLocaleString(
                            "id-ID"
                          )}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <h5 className="font-semibold capitalize text-gray-800 dark:text-white">
                      {paymentItem.metode_pembayaran === "bank_transfer"
                        ? "Bank Transfer"
                        : paymentItem.metode_pembayaran}{" "}
                      | <span className="uppercase">{paymentItem.bank}</span>
                    </h5>
                    <p className="text-sm text-slate-700">
                      {formatDate(paymentItem.tanggal_pembayaran)}
                    </p>
                    <p className="text-xs text-gray-400">
                      #{paymentItem.kode_pembayaran}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="dark:text-white text-gray-800 font-bold">
                      Rp.{" "}
                      {paymentItem.jumlah_pembayaran.toLocaleString("id-ID")}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p
                      className={`inline-flex rounded-full font-semibold capitalize bg-opacity-10 py-1 px-3 text-sm ${getStatusPaymentColor(
                        paymentItem.status_pembayaran
                      )}`}
                    >
                      {paymentItem.status_pembayaran}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex items-center ">
                      <ButtonDetail
                        onClick={() => toggleModal(paymentItem._id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {!loading && !error && filteredData.length > 0 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          totalItems={totalItems}
          handleCurrentPage={handleCurrentPage}
        />
      )}
    </>
  );
};

export default TablePayment;
