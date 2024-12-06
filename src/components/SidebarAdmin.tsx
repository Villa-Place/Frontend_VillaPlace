"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
<<<<<<< HEAD
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
              <Link href={"/profile/riwayat"}>
                <div
                  className={`${
                    pathname.includes("riwayat")
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
                      Riwayat
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
=======
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUsers,
  faComments,
  faFileAlt,
  faMoneyBillWave,
  faChevronDown,
  faChevronUp,
  faBars,
  faGear,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface SubItem {
  label: string;
  href: string;
}

interface MenuItem {
  label: string;
  icon: JSX.Element;
  href?: string;
  subItems?: SubItem[];
}

const menuItems: MenuItem[] = [
  { label: "Beranda", icon: <FontAwesomeIcon icon={faHome} />, href: "/dashboardAdmin" },
  {
    label: "Manajemen Pengguna",
    icon: <FontAwesomeIcon icon={faUsers} />,
    subItems: [
      { label: "Admin", href: "/manajemen-pengguna/admin" },
      { label: "Mitra", href: "/manajemen-pengguna/mitra" },
      { label: "User", href: "/manajemen-pengguna/user" },
    ],
  },
  { label: "Manajemen Ulasan", icon: <FontAwesomeIcon icon={faComments} />, href: "/ulasan-admin" },
  { label: "Manajemen Posting", icon: <FontAwesomeIcon icon={faFileAlt} />, href: "/posting-admin" },
  {
    label: "Transaksi",
    icon: <FontAwesomeIcon icon={faMoneyBillWave} />,
    subItems: [
      { label: "Pesanan", href: "/pesanan-admin" },
      { label: "Pembayaran", href: "/pembayaran-admin" },
    ],
  },
];

const ProfileSection = ({ onClose, isMobile = false }: { onClose?: () => void; isMobile?: boolean }) => (
  <div className={`flex items-center ${isMobile ? 'flex-col space-y-4' : 'space-x-6'}`}>
    <Link href="/dashboardAdmin" className={`${isMobile ? 'w-full pr-6' : ''}`}>
      <button 
        onClick={onClose}
        className={`text-gray-600 font-semibold flex items-center space-x-2
          ${isMobile ? 'w-full text-white px-4 py-2 hover:bg-black/10 rounded-r-xl' : ''}`}
      >
        <FontAwesomeIcon icon={faGear} className={isMobile ? "w-5 text-white" : "hidden"} />
        <span>Pengaturan</span>
      </button>
    </Link>
    <Link href="/auth/login/admin" className={`${isMobile ? 'w-full pr-6' : ''}`}>
      <button 
        onClick={onClose}
        className={`text-gray-600 font-semibold flex items-center space-x-2
          ${isMobile ? 'w-full text-white px-4 py-2 hover:bg-black/10 rounded-r-xl' : ''}`}
      >
        <FontAwesomeIcon icon={faSignOut} className={isMobile ? "w-5 text-white" : "hidden"} />
        <span>Keluar</span>
      </button>
    </Link>
    <div className="relative w-10 h-10">
      <Image
        src="/assets/images/profile-default.png"
        alt="Profile Admin"
        width={60}
        height={60}
        className="rounded-full"
      />
    </div>
  </div>
);

const SidebarContent = ({ onClose }: { onClose?: () => void }) => {
  const pathname = usePathname();
  const [openSubmenus, setOpenSubmenus] = React.useState<Record<string, boolean>>({});

  const toggleSubmenu = (label: string) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  const isParentActive = (subItems?: SubItem[]): boolean => {
    return subItems ? subItems.some((subItem) => subItem.href === pathname) : false;
  };

  const handleClick = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="h-full flex flex-col overflow-y-auto">
      {/* Header Sidebar */}
      <div className="px-5 py-8">
        <div className="flex items-center space-x-3">
          <div className="relative w-10 h-10 flex-shrink-0">
            <Image
              src="/assets/images/logo.png"
              alt="Villa Place Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
          <span className="text-xl font-bold text-white">Villa Place</span>
        </div>
      </div>

      {/* Menu Content Sidebar */}
      <div className="flex-1 py-4">
        <ul className="space-y-4 pr-6">
          {menuItems.map((item) => {
            const isActive = item.href === pathname || isParentActive(item.subItems);

            return (
              <li key={item.label}>
                <div className="flex items-center justify-between">
                  {item.href ? (
                    <Link
                      href={item.href}
                      onClick={handleClick}
                      className={`flex items-center px-4 py-4 rounded-r-xl transition-colors w-full ${
                        isActive ? "bg-white text-green-500 font-semibold" : "text-white hover:bg-black/10"
                      }`}
                    >
                      <span className="mr-3">{item.icon}</span>
                      <span>{item.label}</span>
                    </Link>
                  ) : (
                    <button
                      onClick={() => toggleSubmenu(item.label)}
                      className={`flex items-center px-4 py-4 rounded-r-xl transition-colors w-full text-left ${
                        isActive ? "bg-white text-green-500 font-semibold" : "text-white hover:bg-black/10"
                      }`}
                    >
                      <span className="mr-3">{item.icon}</span>
                      <span>{item.label}</span>
                      <span className="ml-auto">
                        {openSubmenus[item.label] ? (
                          <FontAwesomeIcon icon={faChevronUp} />
                        ) : (
                          <FontAwesomeIcon icon={faChevronDown} />
                        )}
                      </span>
                    </button>
                  )}
                </div>
                {openSubmenus[item.label] && item.subItems && (
                  <ul className="pl-12 space-y-2 mt-2">
                    {item.subItems.map((subItem) => (
                      <li key={subItem.label}>
                        <Link
                          href={subItem.href}
                          onClick={handleClick}
                          className={`block px-4 py-2 rounded-lg transition-colors ${
                            pathname === subItem.href
                              ? "bg-white/85 text-green-600 font-semibold"
                              : "text-white hover:bg-black/10"
                          }`}
                        >
                          {subItem.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Footer Sidebar */}
      <div className="pb-10 mt-auto">
        <div className="lg:hidden">
          <Separator className="my-7 bg-white" />
          <ProfileSection onClose={onClose} isMobile={true} />
        </div>
      </div>
    </div>
  );
};

const SidebarAdmin = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white p-4 flex items-center justify-between shadow-md">
        <div className="flex items-center space-x-3">
          <Image
            src="/assets/images/logo.png"
            alt="Villa Place Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="text-xl font-bold">Villa Place</span>
        </div>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <FontAwesomeIcon icon={faBars} className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-80 p-0 bg-gradient-to-b from-green-500 to-brown-500 overflow-y-auto"
          >
            <SidebarContent onClose={() => setOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <nav className="hidden lg:block fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-green-500 to-brown-500 overflow-y-auto">
        <SidebarContent />
      </nav>

      {/* Desktop Content Header */}
      <div className="hidden lg:flex lg:ml-64 justify-between border-b shadow-md items-center mb-10 bg-white p-6">
        <h1 className="text-2xl font-bold">Dashboard Admin</h1>
        <ProfileSection />
      </div>
    </>
  );
};

export default SidebarAdmin;
>>>>>>> main
