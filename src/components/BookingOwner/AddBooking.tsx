import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select, { SingleValue } from "react-select";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { calculateRentalDays } from "@/utils/calculateDays";
import { useFetchVilla } from "@/hooks/useFetchVilla";

interface VillaOption {
  label: string;
  value: string;
  nama: string;
  _id: string;
}

interface AddBookingProps {
  handleAddBooking: (values: BookingValues) => void;
  villaList: VillaOption[];
}

// Tipe untuk Nilai Booking
interface BookingValues {
  fullName: string;
  email: string;
  guests: number;
  checkInDate: string;
  checkOutDate: string;
  notes: string;
  villa: VillaOption | null;
  total: number;
}

interface BookingDate {
  tanggal_mulai: string;
  tanggal_selesai: string;
}

const AddBooking = ({ handleAddBooking, villaList }: AddBookingProps) => {
  const [selectedVilla, setSelectedVilla] =
    useState<SingleValue<VillaOption>>(null);
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const [bookingDate, setBookingDate] = useState<BookingDate[]>([]);
  const [hargaVilla, setHargaVilla] = useState<number>(0);

  const { handleGetVillaBookedDates, handleGetVillaById } = useFetchVilla();

  useEffect(() => {
    if (selectedVilla) {
      const fetchData = async () => {
        const data = await handleGetVillaBookedDates(selectedVilla.value);
        const villa = await handleGetVillaById(selectedVilla.value);
        if (data && data.data && villa) {
          setBookingDate(data.data);
          setHargaVilla(villa.data.harga);
        }
      };

      fetchData();
    }
  }, [selectedVilla]);

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Nama lengkap diperlukan"),
    email: Yup.string()
      .email("Format email tidak valid")
      .required("Email diperlukan"),
    guests: Yup.number()
      .min(1, "Minimal 1 tamu")
      .required("Jumlah tamu diperlukan"),
    checkInDate: Yup.date().required("Tanggal masuk diperlukan"),
    checkOutDate: Yup.date()
      .required("Tanggal keluar diperlukan")
      .test(
        "is-greater",
        "Tanggal keluar harus setelah tanggal masuk",
        function (value) {
          const { checkInDate } = this.parent;
          return value && checkInDate && value > checkInDate;
        }
      ),
    villa: Yup.object()
      .shape({
        label: Yup.string().required("Villa harus dipilih"),
        value: Yup.string().required("Villa harus dipilih"),
      })
      .nullable()
      .required("Villa harus dipilih"),
  });

  const getDisabledDates = (): Set<string> => {
    const disabledDates = new Set<string>();
    bookingDate.forEach(({ tanggal_mulai, tanggal_selesai }) => {
      const currentDate = new Date(tanggal_mulai);
      const endDate = new Date(tanggal_selesai);

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

  const villaOptions = villaList?.map((villa) => ({
    label: villa.nama,
    value: villa._id,
  }));

  // const customStyles = {
  //   control: (base: Record<string, any>, state: { isFocused: boolean }) => ({
  //     ...base,
  //     borderColor: state.isFocused ? "green" : base.borderColor,
  //     boxShadow: state.isFocused ? "0 0 0 1px green" : base.boxShadow,
  //     "&:hover": {
  //       borderColor: state.isFocused ? "green" : base.borderColor,
  //     },
  //   }),
  //   menu: (base: Record<string, any>) => ({
  //     ...base,
  //     zIndex: 9999, // Ensure dropdown appears above other elements
  //   }),
  // };

  return (
    <Formik
      initialValues={{
        fullName: "",
        email: "",
        guests: 1,
        checkInDate: "",
        checkOutDate: "",
        notes: "",
        villa: null,
        total: 0,
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        const totalDays = calculateRentalDays(
          values.checkInDate,
          values.checkOutDate
        );
        const totalPrice = totalDays * hargaVilla;

        handleAddBooking({ ...values, total: totalPrice });
      }}
    >
      {({ setFieldValue, values }) => (
        <Form>
          <div className="p-2 mb-4">
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Pilih Villa
              </label>
              <Select
                options={villaOptions}
                value={values.villa}
                // styles={customStyles}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 0,
                  colors: {
                    ...theme.colors,
                    primary25: "#D6F4E8",
                    primary: "#089562",
                  },
                })}
                onChange={(option) => {
                  setFieldValue("villa", option);
                  setSelectedVilla(option as SingleValue<VillaOption>);
                }}
                placeholder="Pilih villa"
                className="mt-1 block w-full"
              />
              <ErrorMessage
                name="villa"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 mb-4">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Tanggal Masuk
                </label>
                <DatePicker
                  selected={checkInDate}
                  onChange={(date) => {
                    setCheckInDate(date);
                    setFieldValue("checkInDate", date?.toISOString());
                  }}
                  minDate={new Date()}
                  excludeDates={[...disabledDates].map(
                    (date) => new Date(date)
                  )}
                  className="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                  placeholderText="Pilih tanggal masuk"
                  disabled={!selectedVilla}
                />
                <ErrorMessage
                  name="checkInDate"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Tanggal Keluar
                </label>
                <DatePicker
                  selected={checkOutDate}
                  onChange={(date) => {
                    setCheckOutDate(date);
                    setFieldValue("checkOutDate", date?.toISOString());
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
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                  placeholderText="Pilih tanggal keluar"
                  disabled={!selectedVilla || !checkInDate}
                />
                <ErrorMessage
                  name="checkOutDate"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Jumlah Orang
              </label>
              <Field
                type="number"
                name="guests"
                className="mt-1 block border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
              />
              <ErrorMessage
                name="guests"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
          </div>

          <div className="flex justify-end mt-4 w-full">
            <button
              type="submit"
              className="px-4 py-2 w-full bg-primary text-white rounded-md hover:bg-green-700"
            >
              Tambah Pesanan
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddBooking;
