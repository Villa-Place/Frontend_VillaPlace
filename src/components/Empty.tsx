import React from "react";
import Image from "next/image";

interface EmptyProps {
  message: string;
}

const Empty: React.FC<EmptyProps> = ({ message }) => {
  return (
    <div className="flex items-center justify-center h-[50vh]">
      <div className="text-center">
        <Image
          src="/assets/images/Empty-pana.png"
          width={200}
          height={200}
          alt="empty"
          className="mb-5"
        />
        <p className="text-lg font-semibold">{message}</p>
      </div>
    </div>
  );
};

export default Empty;
