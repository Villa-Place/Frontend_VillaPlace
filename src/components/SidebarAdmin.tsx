"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
const SidebarAdmin = () => {
  const pathname = usePathname();

  return (
    <aside className="md:w-1/3 w-full h-full mr-4 mb-5">
      <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
        <div className="flex flex-col items-center py-10">
          <Image
            className="w-24 h-24 mb-3 rounded-full shadow-lg"
            src="/assets/images/profile-default.png"
            alt="Bonnie image"
            width={100}
            height={100}
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            Kevin Pandoh
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            kevinmpandoh@gmail.com
          </span>
        </div>
      </div>
      <div className="w-full h-3/5 mt-4 py-8 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-col  ">
          <ul className="">
            <li>
              <Link href={"/profile/user"}>
                <div
                  className={` ${
                    pathname.includes("user")
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
                </div>
              </Link>
            </li>
            <li>
              <Link href="/profile/change-password">
                <div
                  className={` ${
                    pathname.includes("change-password")
                      ? "bg-[#089562] hover:bg-opacity-40"
                      : "hover:bg-zinc-100 hover:bg-opacity-100"
                  } flex w-full max-w-full items-center justify-between py-3 pl-8 bg-opacity-30 font-semibold text-zinc-950 dark:bg-white  dark:text-zinc-950 hover:bg-opacity-40 `}
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
              </Link>
            </li>
            <li>
              <Link href={"/profile/bookings"}>
                <div
                  className={`  ${
                    pathname.includes("bookings")
                      ? "bg-[#089562] hover:bg-opacity-40 bg-opacity-30 dark:bg-opacity-30"
                      : "hover:bg-zinc-100 hover:bg-opacity-100"
                  } flex w-full max-w-full items-center justify-between py-3 pl-8 font-medium text-zinc-950 dark:text-zinc-400  dark:hover:bg-zinc-900`}
                >
                  <div className="flex w-full items-center justify-center">
                    <div className="text mr-3 mt-2 text-zinc-950 dark:text-white ">
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
                          d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                        />
                      </svg>
                    </div>
                    <p className="mr-auto text-md font-semibold text-zinc-950 dark:text-zinc-400">
                      Villa saya
                    </p>
                  </div>
                </div>
              </Link>
            </li>
            <li>
              <Link href={"/profile/favorite"}>
                <div
                  className={`${
                    pathname.includes("favorite")
                      ? "bg-[#089562] hover:bg-opacity-40 bg-opacity-30 dark:bg-opacity-30"
                      : "hover:bg-zinc-100 hover:bg-opacity-100"
                  } flex w-full max-w-full items-center justify-between py-3 pl-8 font-medium text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900`}
                >
                  <div className="flex w-full items-center justify-center">
                    <div className="text mr-3 mt-2 text-zinc-950 dark:text-white ">
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
                          d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75h1.5m9 0h-9"
                        />
                      </svg>
                    </div>
                    <p className="mr-auto text-md font-semibold text-zinc-950 dark:text-zinc-400">
                      Favorite
                    </p>
                  </div>
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default SidebarAdmin;
