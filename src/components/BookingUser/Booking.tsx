"use client";
import React, { useState, useEffect } from "react";
import BookingForm from "./BookingForm";
import BookingSummary from "./BookingSummary";
import axios from "axios";
import useFetchPayment from "@/hooks/useFetchPayment";
import useFetchBooking from "@/hooks/useFetchBooking";
import { calculateRentalDays } from "@/utils/calculateDays";
import Swal from "sweetalert2";
import generateBookingId from "@/utils/generateBookingId";
import { VillaProps } from "@/types/Villa";

interface BookingValues {
  fullName: string;
  email: string;
  guests: number;
  checkInDate: string;
  checkOutDate: string;
  notes: string;
}

interface BookingProps {
  villa: VillaProps;
  bookedDates: { tanggal_mulai: string; tanggal_selesai: string }[];
}

const Booking: React.FC<BookingProps> = ({ villa, bookedDates }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    guests: 1,
    checkInDate: "",
    checkOutDate: "",
    notes: "",
  });
  const [rentalDays, setRentalDays] = useState(0);

  const { handleCreatePayment } = useFetchPayment();
  const { handleCreateBooking } = useFetchBooking();

  const [tokenMidtrans, setTokenMidtrans] = useState(null);
  const [modal, setModal] = useState(false);

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "checkInDate" || name === "checkOutDate") {
      const res = calculateRentalDays(
        name === "checkInDate" ? value : formData.checkInDate,
        name === "checkOutDate" ? value : formData.checkOutDate
      );

      setRentalDays(res);
    }
  };

  const handleSubmit = async (values: BookingValues) => {
    // Swal.fire({
    //    title: "Pesan Villa",
    //    text: "Apakah anda yakin ingin memesan villa ini?",
    //    icon: "question",
    //    showCancelButton: true,
    //    confirmButtonText: "Ya",
    //    cancelButtonText: "Batal",
    //    reverseButtons: true,
    //  }).then((result) => {
    //    if (result.isConfirmed) {
    //      router.push(`/category/${detailVilla._id}/booking`);
    //    }
    //  });

    const { isConfirmed } = await Swal.fire({
      title: "Pesan Villa",
      text: "Apakah anda yakin ingin memesan villa ini?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya",
      cancelButtonText: "Batal",
      reverseButtons: true,
    });

    if (isConfirmed) {
      setRentalDays(
        calculateRentalDays(formData.checkInDate, formData.checkOutDate)
      );

      setFormData(values);
      // setFormData({
      //   fullName: values.fullname,
      //   email: values.email,
      //   guests: values.guest,
      //   checkInDate: addHours(values.checkInDate, 8)),
      //   checkOutDate: values.checkOutDate,
      //   notes: values.notes,
      // });

      const dataPayment = {
        nama_pembayar: values.fullName,
        kode_pembayaran: generateBookingId(),
        email_pembayar: values.email,
        jumlah_pembayaran: villa.harga * rentalDays,
      };

      const response = await axios.post(
        "http://localhost:8000/api/pembayaran/transaksi",
        dataPayment,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setTokenMidtrans(response.data.data.token);
    } else {
      return;
    }
  };

  useEffect(() => {
    const midtransUrl = "https://app.sandbox.midtrans.com/snap/snap.js";

    const scriptTag = document.createElement("script");
    const scriptTag = document.createElement("script");
    scriptTag.src = midtransUrl;

    const midtransClientKey = "SB-Mid-client-biw0_z5pnI4tFfTA";
    scriptTag.setAttribute("data-client-key", midtransClientKey);

    document.body.appendChild(scriptTag);

    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  useEffect(() => {
    if (!tokenMidtrans) return;
    try {
      window.snap.pay(tokenMidtrans, {
        onSuccess: async (result) => {
        onSuccess: async (result) => {
          const dataBooking = {
            jumlah_orang: formData.guests,
            tanggal_mulai: formData.checkInDate,
            tanggal_selesai: formData.checkOutDate,
            status: "success",
            catatan: formData.notes,
            harga: villa.harga * rentalDays,
            villa: villa._id,
          };

          const response = await handleCreateBooking(dataBooking);

          if (!response) {
            alert("Gagal membuat pesanan");
            return;
          }

          const dataPayment = {
            nama_pembayar: formData.fullName,
            email_pembayar: formData.email,
            kode_pembayaran: result.order_id,
            jumlah_pembayaran: villa.harga * rentalDays,
            status_pembayaran: "success",
            bank: result.va_numbers[0].bank,
            pdf_url: result.pdf_url,
            tanggal_pembayaran: result.transaction_time,
            nomor_va: result.va_numbers[0].va_number,
            expiry_time: result.transaction_time,
            pesanan: response.data._id,
            metode_pembayaran: result.payment_type,
          };

          await handleCreatePayment(dataPayment);

          window.location.href = "/user/bookings";
        },
        onPending: async (result) => {
        onPending: async (result) => {
          const midtransData = await axios.get(
            `http://localhost:8000/api/pembayaran/status/${result.order_id}`,
            {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,
            }
          );

          console.log("Form Data SUBMIT", formData);

          const dataBooking = {
            jumlah_orang: formData.guests,
            tanggal_mulai: formData.checkInDate,
            tanggal_selesai: formData.checkOutDate,
            status: "pending",
            catatan: formData.notes,
            harga: villa.harga * rentalDays,
            villa: villa._id,
          };

          const response = await handleCreateBooking(dataBooking);

          if (!response) {
            alert("Gagal membuat pesanan");
            return;
          }

          const dataPayment = {
            nama_pembayar: formData.fullName,
            email_pembayar: formData.email,
            kode_pembayaran: result.order_id,
            jumlah_pembayaran: villa.harga * rentalDays,
            status_pembayaran: "pending",
            tipe_pembayaran: result.payment_type,
            pdf_url: result.pdf_url,
            tanggal_pembayaran: result.transaction_time,
            nomor_va: result.va_numbers[0].va_number,
            expiry_time: midtransData.data.data.expiry_time,
            pesanan: response.data._id,
            metode_pembayaran: result.payment_type,
            bank: result.va_numbers[0].bank,
          };

          await handleCreatePayment(dataPayment);

          // Swal pke bahasa indonesia
          Swal.fire({
            icon: "success",
            title: "Pesanan Berhasil",
            text: "Pesanan anda sedang diproses",
          });
          window.location.href = `/user/payment-history`;
        },
        onError: (error) => {
        onError: (error) => {
          Swal.fire({
            icon: "error",
            title: "Gagal",
            text: "Pesanan gagal, silahkan coba lagi",
          });

          console.log("error", error);
        },
        onClose: () => {
          setModal(!modal);
          setTokenMidtrans(null);
        },
      });
    } catch (err) {
      alert("Error");
      console.log(err);
    }
  }, [formData, handleCreateBooking, handleCreatePayment, modal, rentalDays, tokenMidtrans, villa._id, villa.harga]);

  return (
    <div className="max-w-7xl  mx-auto   p-4">
      <div className="rounded-lg  md:px-10 md:py-12">
        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 justify-center ">
            <BookingForm
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              bookingDate={bookedDates}
            />
            <BookingSummary
              villa={villa}
              // handleSubmit={handleSubmit}
              rentalDays={rentalDays}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
