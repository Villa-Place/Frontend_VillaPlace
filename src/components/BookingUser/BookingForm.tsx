import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface BookingFormProps {
  formData: {
    fullName: string;
    email: string;
    guests: number;
    checkInDate: string;
    checkOutDate: string;
    notes: string;
  };
  handleChange: (event: { target: { name: string; value: string } }) => void;
  bookingDate: { tanggal_mulai: string; tanggal_selesai: string }[];
  villa: any;
}

const BookingForm: React.FC<BookingFormProps> = ({
  formData,
  handleChange,
  bookingDate,
}) => {
  const today = new Date().toISOString().split("T")[0]; // Mendapatkan tanggal hari ini dalam format YYYY-MM-DD
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);

  // Fungsi untuk membuat daftar tanggal yang tidak tersedia
  const getDisabledDates = (): Set<string> => {
    const disabledDates = new Set<string>();
    bookingDate.forEach(({ tanggal_mulai, tanggal_selesai }) => {
      let currentDate = new Date(tanggal_mulai);
      const endDate = new Date(tanggal_selesai);

      // Tambahkan setiap tanggal dalam rentang ke dalam `disabledDates`
      while (currentDate <= endDate) {
        disabledDates.add(currentDate.toISOString().split("T")[0]);
        currentDate.setDate(currentDate.getDate() + 1);
      }
    });
    return disabledDates;
  };

  const disabledDates = getDisabledDates();

  const isDateDisabled = (date: string) => disabledDates.has(date);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Informasi Pemesanan</h2>
      <div className="bg-white p-6 rounded-lg shadow-md border md:h-[90%]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nama Lengkap
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="flex w-full items-center gap-5">
            <label className="block text-sm font-medium text-gray-700">
              Jumlah Orang
            </label>
            <input
              type="number"
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              className="mt-1 w-1/3 block border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Tanggal Masuk
          </label>

          <DatePicker
            selected={checkInDate}
            onChange={(date) => {
              if (date) {
                setCheckInDate(date);
                setCheckOutDate(null);

                handleChange({
                  target: {
                    name: "checkInDate",
                    value: date.toISOString(),
                  },
                });
              }
            }}
            minDate={new Date()}
            excludeDates={[...disabledDates].map((date) => new Date(date))}
            className="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            placeholderText="Pilih tanggal masuk"
            calendarClassName="bg-white border rounded-lg shadow-lg p-4"
            dayClassName={(date) =>
              disabledDates.has(date.toISOString().split("T")[0])
                ? "text-gray-500 cursor-not-allowed"
                : "text-gray-900 hover:bg-green-200 rounded-full"
            }
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Tanggal Keluar
          </label>
          <DatePicker
            selected={checkOutDate}
            onChange={(date) => {
              setCheckOutDate(date);
              handleChange({
                target: {
                  name: "checkOutDate",
                  value: date?.toISOString(),
                } as any,
              });
            }}
            minDate={
              checkInDate
                ? new Date(checkInDate.getTime() + 24 * 60 * 60 * 1000)
                : new Date()
            }
            excludeDates={[...disabledDates].map((date) => new Date(date))}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            placeholderText="Pilih tanggal keluar"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Catatan Tambahan (Optional)
          </label>
          <input
            type="text"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Tulis catatan tambahan disini..."
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
