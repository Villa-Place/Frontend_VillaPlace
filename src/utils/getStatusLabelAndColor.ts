// Fungsi untuk memetakan status ke label
export const getStatusLabel = (status: string) => {
  switch (status) {
    case "pending":
      return "Menunggu Pembayaran";
    case "success":
      return "Sedang Berlangsung";
    case "completed":
      return "Selesai";
    case "canceled":
      return "Dibatalkan";
    default:
      return "Tidak Diketahui";
  }
};

export const getStatusPaymentLabel = (status: string) => {
  switch (status) {
    case "pending":
      return "Menunggu Pembayaran";
    case "success":
      return "Berhasil";
    case "failed":
      return "Dibatalkan";
    default:
      return "Tidak Diketahui";
  }
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-yellow-600 border-yellow-500 text-yellow-600";
    case "success":
      return "bg-yellow-600 border-yellow-500 text-yellow-600";
    case "completed":
      return "bg-green-600 border-green-500 text-green-600";
    case "canceled":
      return "bg-red-500 border-red-500 text-red-500";
    default:
      return "bg-gray-100 border-gray-500 text-gray-800";
  }
};

export const getStatusPaymentColor = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-yellow-600 border-yellow-500 text-yellow-600";
    case "success":
      return "bg-green-600 border-green-500 text-green-600";
    case "failed":
      return "bg-red-500 border-red-500 text-red-500";
    default:
      return "bg-gray-100 border-gray-500 text-gray-800";
  }
};
