import React from "react";
import Image from "next/image";
import RatingStar from "./RatingStar";

interface Ulasan {
  id: number;
  rating: number;
  komentar: string;
  createdAt: string;
  user: {
    id: number;
    nama: string;
    foto_profile: string;
  };
}

interface UserReviewProps {
  ulasan: Ulasan[];
  commentCount: number;
  averageRating: number;
  setIsModalReviewOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserReview = ({
  ulasan,
  commentCount,
  averageRating,
  setIsModalReviewOpen,
}: UserReviewProps) => {
  return (
    <div className="w-full ">
      <h3 className="text-xl flex items-center font-semibold">
        Ulasan Pengguna ({commentCount}){" "}
        <span className="text-yellow-500 pl-2">
          <RatingStar rating={averageRating} />
        </span>
      </h3>
      {ulasan.slice(0, 3).map((data: Ulasan, index: number) => (
        <div className="mt-4 flex gap-4 items-start" key={index}>
          <Image
            src={`http://localhost:8000/images/user-profile/${data.user.foto_profile}`}
            alt="User"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <div className="font-semibold flex gap-2 items-center justify-start">
              <h3>{data.user.nama}</h3>
              <span className="text-xs text-gray-400">
                {new Date(data.createdAt).toLocaleDateString("id-ID", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                {/* {data.createdAt} */}
              </span>
            </div>
            <div>
              <RatingStar rating={data.rating} />
            </div>

            <p>{data.komentar}</p>
          </div>
        </div>
      ))}
      {ulasan.length > 2 && (
        <button
          className="text-green-500 mt-6 underline"
          onClick={() => setIsModalReviewOpen(true)}
        >
          Lihat semua ulasan
        </button>
      )}
    </div>
  );
};

export default UserReview;
