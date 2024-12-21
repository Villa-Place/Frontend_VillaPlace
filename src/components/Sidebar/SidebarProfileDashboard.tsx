"use client";

import React from "react";
import Image from "next/image";

interface SidebarProfileProps {
  data: any;
  menuOpen?: any;
  setMenuOpen?: any;
  role?: string;
}

const SidebarProfileDashboard: React.FC<SidebarProfileProps> = ({
  data,
  setMenuOpen,
  menuOpen,
  role,
}) => {
  return (
    <aside className="xl:w-1/3 flex flex-col gap-4 w-full mr-4 mb-4 h-full ">
      <div className="w-full h-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
        <div className="flex flex-col items-center py-10">
          <Image
            className="w-24 h-24 mb-3 rounded-full shadow-lg object-cover"
            src={`http://localhost:8000/images/owner-profile/${data?.foto_profile}`}
            alt="profile"
            width={100}
            height={100}
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {data.nama}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {data.email}
          </span>
        </div>
      </div>
      <div className="w-full h-full py-8 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-col  ">
          <ul className="">
            <li>
              <button
                onClick={() => setMenuOpen("profile")}
                className={` ${
                  menuOpen === "profile" || menuOpen === "editProfile"
                    ? "bg-[#089562] hover:bg-opacity-40 bg-opacity-30 dark:bg-opacity-30"
                    : "hover:bg-zinc-100 hover:bg-opacity-100"
                } flex   w-full max-w-full items-center justify-between py-3 pl-8 font-medium text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900`}
              >
                <div className="flex w-full items-center justify-center">
                  <div className="text mr-3 mt-2 text-zinc-950 dark:text-white ">
                    <svg
                      stroke="currentColor"
                      fill="none"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className="-mt-[7px] h-4 w-4 stroke-2 text-inherit"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                      ></path>
                    </svg>
                  </div>
                  <p className="mr-auto text-md font-semibold text-zinc-950 dark:text-zinc-400">
                    Profile
                  </p>
                </div>
              </button>
            </li>
            <li>
              <div
                onClick={() => setMenuOpen("changePassword")}
                className={` ${
                  menuOpen === "changePassword"
                    ? "bg-[#089562] hover:bg-opacity-40"
                    : "hover:bg-zinc-100 hover:bg-opacity-100"
                } flex w-full max-w-full cursor-pointer items-center justify-between py-3 pl-8 bg-opacity-30 font-semibold text-zinc-950 dark:bg-white  dark:text-zinc-950 hover:bg-opacity-40 `}
              >
                <div className="flex w-full items-center justify-center">
                  <div
                    className={`text mr-3 mt-2 font-semibold  dark:text-zinc-950 
                        `}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="-mt-[7px] h-4 w-4 stroke-2 text-inherit"
                      height="1em"
                      width="1em"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z"
                      />
                    </svg>
                  </div>
                  <p
                    className={`mr-auto text-md font-semibold dark:text-zinc-950  `}
                  >
                    Ganti Password
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default SidebarProfileDashboard;
