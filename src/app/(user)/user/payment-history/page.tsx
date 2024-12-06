import React from "react";
import PaymentUser from "@/components/PaymentUser/PaymentUser";

export const metadata = {
  title: "Pesanan | Villaplace",
};

const PaymentHistory = () => {
  return (
    <>
      <div className=" p-2 border-b-2 border-gray-200 mb-5">
        <h1 className="text-lg font-bold">Riwayat Transaksi</h1>
      </div>

      <PaymentUser />
    </>
  );
};

export default PaymentHistory;
