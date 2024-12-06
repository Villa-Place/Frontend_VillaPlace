import React from "react";
import Booking from "@/components/BookingUser/Booking";
import axios from "axios";

async function getDataVilla({ villaId }: { villaId: string }) {
  if (!villaId) {
    return null;
  }

  const response = await axios.get(
    `http://localhost:8000/api/villa/${villaId}`,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.data;
}

async function getBookingDates({ villaId }: { villaId: string }) {
  try {
    if (!villaId) {
      return [];
    }
    const response = await axios.get(
      `http://localhost:8000/api/villa/${villaId}/booked-dates`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = response.data;

    const allBookedDates: Date[] = [];
    data.data.forEach(
      (item: { tanggal_mulai: string; tanggal_selesai: string }) => {
        const startDate = new Date(item.tanggal_mulai);
        const endDate = new Date(item.tanggal_selesai);

        // Generate semua tanggal dalam rentang
        let currentDate = new Date(startDate);
        while (currentDate <= endDate) {
          allBookedDates.push(new Date(currentDate));
          currentDate.setDate(currentDate.getDate() + 1); // Tambahkan 1 hari
        }
      }
    );

    return data.data;
  } catch (error) {
    return [];
  }
}

const BookingUser = async ({ params }: { params: { villaId: string } }) => {
  const { villaId } = await params;

  const villa = await getDataVilla({ villaId });
  const bookedDates = await getBookingDates({ villaId });

  return (
    <div className="bg-gray-50">
      <Booking villa={villa} bookedDates={bookedDates} />
    </div>
  );
};

export default BookingUser;
