import Navbar from "@/components/Navbar";
import SidebarProfile from "@/components/SidebarProfile";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <section className="flex-col my-5 flex md:flex-row max-w-screen-xl md:h-[643px] mx-auto px-4">
        <SidebarProfile />

        <main className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          {/* buat card */}
          <div className="px-12 py-5 h-full overflow-auto">{children}</div>
        </main>
      </section>
    </>
  );
}
