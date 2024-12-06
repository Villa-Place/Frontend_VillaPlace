// Contoh fungsi untuk membuat ID pesanan berdasarkan beberapa informasi
let bookingIdCounter = 0; // Counter simulasi nomor urut

const generateBookingId = () => {
  bookingIdCounter++;
  const timestamp = Date.now(); // Timestamp saat pembuatan pesanan
  const bookingId = `TES-${timestamp}-${bookingIdCounter}`;
  return bookingId;
};

export default generateBookingId;
