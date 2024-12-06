import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SidebarProfile from "@/components/SidebarProfile";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>
        <div>{children}</div>
      </main>
      <Footer />
    </>
  );
}
