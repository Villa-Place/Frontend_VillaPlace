// page.tsx
import React from "react";
import { Users, Building2, Wallet, Image as ImageIcon } from "lucide-react";

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  bgColor: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, bgColor }) => (
  <div className={`${bgColor} rounded-xl p-6 shadow-lg`}>
    <div className="flex flex-col">
      <div className="mb-4">{icon}</div>
      <h3 className="text-gray-700 mb-1 text-lg font-semibold">{title}</h3>
      <p className="text-4xl font-bold text-gray-900">{value}</p>
    </div>
  </div>
);

const DashboardAdmin = () => {
  return (
    <div>
      <div className="bg-white p-4 shadow-md rounded-md mb-4 mx-8">
        <nav aria-label="Breadcrumb">
          <ol className="flex space-x-2 text-sm font-medium">
            <li>
              <a
                href="/dashboardAdmin"
                className="text-gray-500 hover:text-gray-700"
              >
                Dashboard
              </a>
            </li>
            <li>
              <span className="text-gray-500">/</span>
            </li>
            <li>
              Beranda
            </li>
          </ol>
        </nav>
      </div>

      <div className="border-2 rounded-md shadow-lg items-center mb-3 bg-white p-6 m-8">
        <div>
          <h1 className="text-2xl font-bold">Beranda</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-8">
        <StatCard
          icon={
            <Users className="w-14 h-14 text-white border border-white rounded-full bg-green-400 p-2" />
          }
          title="Total Pengguna"
          value="20"
          bgColor="bg-green-200/80"
        />
        <StatCard
          icon={
            <Building2 className="w-14 h-14 text-white border border-white rounded-full bg-orange-400 p-2" />
          }
          title="Total Mitra"
          value="20"
          bgColor="bg-orange-200/80"
        />
        <StatCard
          icon={
            <Wallet className="w-14 h-14 text-white border border-white rounded-full bg-purple-400 p-2" />
          }
          title="Total Transaksi"
          value="20"
          bgColor="bg-purple-200/80"
        />
        <StatCard
          icon={
            <ImageIcon className="w-14 h-14 text-white border border-white rounded-full bg-blue-400 p-2" />
          }
          title="Total Postingan"
          value="20"
          bgColor="bg-blue-200/80"
        />
      </div>

      <div className="p-8">
        <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-200">
          <h2 className="text-xl font-bold mb-6">Chart Transaksi</h2>
          <div className="border-b-2 border-gray-200 w-full md:w-[600px]"></div>
          <div className="mt-5">
            <div className="h-[400px] w-full bg-gray-50 rounded-xl flex items-center justify-center">
              <p className="text-gray-500">Area untuk grafik transaksi</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
