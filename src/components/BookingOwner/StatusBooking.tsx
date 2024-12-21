import React from "react";

interface StatusBookingProps {
  selectedStatus: string;
  handleSelectStatus: (status: string) => void;
}

const StatusBooking = ({
  selectedStatus,
  handleSelectStatus,
}: StatusBookingProps) => {
  return (
    <div className="flex mb-4 items-start sm:items-center">
      <div className="w-full items-center flex flex-wrap gap-2">
        <button
          onClick={() => handleSelectStatus("All")}
          className={`${
            selectedStatus === "All"
              ? "bg-[#B7906C]   border-[#B7906C] text-white"
              : "text-[#5e6c84]"
          } py-1 px-2.5 rounded font-semibold border-2`}
        >
          All
        </button>
        <button
          onClick={() => handleSelectStatus("pending")}
          className={`${
            selectedStatus === "pending"
              ? "bg-[#B7906C]   border-[#B7906C] text-white"
              : "text-[#5e6c84]"
          } py-1 px-2.5 rounded font-semibold border-2`}
        >
          Pending
        </button>
        <button
          onClick={() => handleSelectStatus("success")}
          className={`${
            selectedStatus === "success"
              ? "bg-[#B7906C]   border-[#B7906C] text-white"
              : "text-[#5e6c84]"
          } py-1 px-2.5 rounded font-semibold border-2`}
        >
          Success
        </button>
        <button
          onClick={() => handleSelectStatus("completed")}
          className={`${
            selectedStatus === "completed"
              ? "bg-[#B7906C]   border-[#B7906C] text-white"
              : "text-[#5e6c84]"
          } py-1 px-2.5 rounded font-semibold border-2`}
        >
          Completed
        </button>
        <button
          onClick={() => handleSelectStatus("failed")}
          className={`${
            selectedStatus === "failed"
              ? "bg-[#B7906C]   border-[#B7906C] text-white"
              : "text-[#5e6c84]"
          } py-1 px-2.5 rounded font-semibold border-2`}
        >
          Failed
        </button>
      </div>
    </div>
  );
};

export default StatusBooking;
