"use client";

import React from "react";
import SidebarProfile from "@/components/Sidebar/SidebarProfile";
import useFetchData from "@/hooks/useFetchData";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { data } = useFetchData("http://localhost:8000/api/user/current-user", {
    withCredentials: true,
  });
  return (
    <>
      <section className="flex-col my-8  flex md:flex-row max-w-screen-xl md:h-[643px] mx-auto px-4">
        <SidebarProfile data={data} />

        <main className="w-full py-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          {/* buat card */}
          <div className="px-12 py-5 h-full overflow-auto">{children}</div>
        </main>
      </section>
    </>
  );
}
