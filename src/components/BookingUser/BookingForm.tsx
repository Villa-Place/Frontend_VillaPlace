import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Formik, Form, Field, ErrorMessage } from "formik";
import validationSchemaBooking from "@/validations/bookingUser";

interface BookingValues {
  fullName: string;
  email: string;
  guests: number;
  checkInDate: string;
  checkOutDate: string;
  notes: string;
}

interface BookingFormProps {
  handleChange: (event: { target: { name: string; value: string } }) => void;
  handleSubmit: (values: BookingValues) => void;
  bookingDate: { tanggal_mulai: string; tanggal_selesai: string }[];
}

const BookingForm: React.FC<BookingFormProps> = ({
  handleChange,
  handleSubmit,
  bookingDate,
}) => {
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);

  // Fungsi untuk membuat daftar tanggal yang tidak tersedia
  const getDisabledDates = (): Set<string> => {
    const disabledDates = new Set<string>();
    bookingDate.forEach(({ tanggal_mulai, tanggal_selesai }) => {
      const currentDate = new Date(tanggal_mulai);
      const endDate = new Date(tanggal_selesai);

      // Tambahkan setiap tanggal dalam rentang ke dalam disabledDates
      while (currentDate <= endDate) {
        disabledDates.add(currentDate.toISOString().split("T")[0]);
        currentDate.setDate(currentDate.getDate() + 1);
      }
    });
    return disabledDates;
  };

  const disabledDates = getDisabledDates();

  const getExcludedCheckOutDates = (checkInDate: Date): Set<string> => {
    const excludedDates = new Set<string>();

    bookingDate.forEach(({ tanggal_mulai, tanggal_selesai }) => {
      const startDate = new Date(tanggal_mulai);
      const endDate = new Date(tanggal_selesai);

      const checkInDateUTC = new Date(checkInDate);
      const startDateUTC = new Date(startDate);
      const endDateUTC = new Date(endDate);

      // Exclude all dates in the booked range
      let currentDate = startDateUTC;
      while (currentDate <= endDateUTC) {
        excludedDates.add(currentDate.toISOString().split("T")[0]);
        currentDate.setDate(currentDate.getDate() + 1);
      }
      // Exclude all dates after the booked range if check-in is close
      if (checkInDateUTC <= endDateUTC) {
        currentDate = new Date(endDateUTC.getTime() + 24 * 60 * 60 * 1000);
        for (let i = 0; i < 30; i++) {
          // Assuming a max range of 30 days to restrict
          excludedDates.add(currentDate.toISOString().split("T")[0]);
          currentDate.setDate(currentDate.getDate() + 1);
        }
      }
    });

    return excludedDates;
  };

  const excludedCheckOutDates = checkInDate
    ? getExcludedCheckOutDates(checkInDate)
    : new Set<string>();

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Informasi Pemesanan</h2>
      <div className="bg-white p-6 rounded-lg shadow-md border md:h-[90%]">
        <Formik
          initialValues={{
            fullName: "",
            email: "",
            guests: 1,
            checkInDate: "",
            checkOutDate: "",
            notes: "",
          }}
          validationSchema={validationSchemaBooking}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
        >
          {({ setFieldValue }) => (
            <Form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Nama Lengkap
                  </label>
                  <Field
                    type="text"
                    name="fullName"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                  />
                  <ErrorMessage
                    name="fullName"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center gap-5">
                <label className="block text-sm font-medium text-gray-700">
                  Jumlah Orang
                </label>

                <Field
                  type="number"
                  name="guests"
                  className="mt-1 block w-24 border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                />
                <ErrorMessage
                  name="guests"
                  component="div"
                  className="text-red-500 text-sm"
                />
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
                      setFieldValue("checkOutDate", "");
                      setFieldValue("checkInDate", date?.toISOString());
                      handleChange({
                        target: {
                          name: "checkInDate",
                          value: date.toISOString(),
                        },
                      });
                    }
                  }}
                  minDate={new Date()}
                  excludeDates={[...disabledDates].map(
                    (date) => new Date(date)
                  )}
                  className="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                  placeholderText="Pilih tanggal masuk"
                />
                <ErrorMessage
                  name="checkInDate"
                  component="div"
                  className="text-red-500 text-sm"
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
                    setFieldValue("checkOutDate", date?.toISOString());
                    if (date) {
                      handleChange({
                        target: {
                          name: "checkOutDate",
                          value: date.toISOString(),
                        },
                      });
                    }
                  }}
                  minDate={
                    checkInDate
                      ? new Date(checkInDate.getTime() + 24 * 60 * 60 * 1000)
                      : new Date()
                  }
                  // excludeDates={[...disabledDates].map(
                  //   (date) => new Date(date)
                  // )}
                  excludeDates={[...excludedCheckOutDates].map(
                    (date) => new Date(date)
                  )}
                  // excludeDates={[...getExcludedCheckOutDates(checkInDate)].map(
                  //   (date) => new Date(date)
                  // )}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                  placeholderText="Pilih tanggal keluar"
                  disabled={!checkInDate}
                />
                <ErrorMessage
                  name="checkOutDate"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Catatan Tambahan (Optional)
                </label>
                <Field
                  type="text"
                  name="notes"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                />
                <ErrorMessage
                  name="notes"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="flex justify-end my-4 w-full">
                <button
                  type="submit"
                  className="px-4 py-2 w-full bg-primary text-white rounded-md hover:bg-green-700"
                >
                  Konfirmasi Pesanan
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default BookingForm;
