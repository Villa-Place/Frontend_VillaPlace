"use client";
// React
import React from "react";
import Image from "next/image";

// Hooks
import useFetchBooking from "@/hooks/useFetchBooking";

// Komponen
import Pagination from "@/components/Pagination";
import StatusBooking from "@/components/BookingOwner/StatusBooking";
import SearchInput from "@/components/SearchInput";

// Types
import { TableBookingOwnerProps } from "@/types/Props/TableBookingProps";

// Utils
import { formatDate } from "@/utils/formatDate";
import ButtonDetail from "./ButtonDetail";
import Booking from "@/types/Booking";
import { getStatusColor } from "@/utils/getStatusLabelAndColor";

const TableBookingOwner = ({
  search,
  filteredData,
  selectedStatus,
  currentPage,
  totalItems,
  totalPages,
  handleCurrentPage,
  handleSearch,
  handleSelectStatus,
  toggleModal,
}: TableBookingOwnerProps) => {
  const { loading, error } = useFetchBooking();

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between gap-2 my-4">
        <SearchInput search={search} handleSearch={handleSearch} />
        <StatusBooking
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
                  User
                </th>
                <th className="min-w-[220px] py-4 px-4 font-semibold text-gray-50 dark:text-white">
                  Villa
                </th>
                <th className="min-w-[200px] py-4 px-4 font-semibold text-gray-50 dark:text-white">
                  Pesanan
                </th>
                <th className="min-w-[150px] py-4 px-4 font-semibold text-gray-50 dark:text-white">
                  Total
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
              {filteredData.map((bookingItem: Booking, key: number) => (
                <tr key={key}>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-gray-800 dark:text-white">{key + 1}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                      <div className="rounded-full mr-2">
                        <Image
                          src={
                            "http://localhost:8000/images/user-profile/" +
                              bookingItem?.user?.foto_profile &&
                            "/assets/images/profile-default.png"
                          }
                          width={48}
                          height={48}
                          alt="User Profile"
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col">
                        <h5 className="font-semibold text-gray-800 dark:text-white">
                          {bookingItem?.user?.nama ?? "Owner"}
                        </h5>
                        <p className="text-sm text-gray-500">
                          {bookingItem?.user?.email ?? "owner@gmail.com"}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                      <div className="rounded-md">
                        <Image
                          src={
                            bookingItem.villa.foto_villa[0]?.url ||
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
                          {bookingItem.villa.nama}
                        </p>
                        <p className="text-sm font-semibold text-gray-800 dark:text-white">
                          Rp {bookingItem.villa.harga.toLocaleString("id-ID")}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <h5 className="font-semibold capitalize text-gray-800 dark:text-white">
                      Check In - Check Out
                    </h5>
                    <p className="text-sm text-slate-700">
                      {formatDate(bookingItem.tanggal_mulai)}
                    </p>
                    <p className="text-sm text-slate-700">
                      {formatDate(bookingItem.tanggal_selesai)}
                    </p>
                    <p className="text-xs text-gray-400">
                      {bookingItem.jumlah_orang} Orang
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="dark:text-white text-gray-800 font-bold">
                      Rp. {bookingItem.harga.toLocaleString("id-ID")}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p
                      className={`inline-flex rounded-full font-semibold capitalize bg-opacity-10 py-1 px-3 text-sm ${getStatusColor(
                        bookingItem.status
                      )}`}
                    >
                      {bookingItem.status}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex items-center ">
                      <ButtonDetail
                        onClick={() => toggleModal(bookingItem._id)}
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

export default TableBookingOwner;
