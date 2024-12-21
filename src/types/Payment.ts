export default interface Payment {
  _id: string;
  nama_pembayar: string;
  email_pembayar: string;
  kode_pembayaran: string;
  metode_pembayaran: string;
  jumlah_pembayaran: number;
  status_pembayaran: string;
  tanggal_pembayaran: string;
  expiry_time: string;
  pdf_url: string;
  bank: string;
  pesanan: {
    villa: {
      _id: string;
      nama: string;
      foto_villa: { url: string }[];
      harga: number;
      lokasi: string;
    };
  };
}
