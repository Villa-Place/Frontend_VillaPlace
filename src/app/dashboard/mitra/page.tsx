"use client";
import React, { useEffect } from "react";
import { Users, Building2, Wallet, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import TransactionAreaChart from "@/components/Chart/TransactionChart";
import { useFetchMitra } from "@/hooks/useFetchMitra";

export interface DashboardDataOwner {
  villaCount: number;
  pesananCount: number;
  ulasanCount: number;
  avgRating: number;
}

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  bgColor: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, bgColor }) => (
  <div className={`${bgColor} rounded-xl p-6`}>
    <div className="flex flex-col">
      <div className="mb-4">{icon}</div>
      <h3 className="text-gray-700 mb-1 text-lg font-semibold">{title}</h3>
      <p className="text-4xl font-bold text-gray-900">{value}</p>
    </div>
  </div>
);

const DashboardMitra = () => {
  const [data, setData] = React.useState<DashboardDataOwner | null>(null);

  const { handleDashboardData } = useFetchMitra();

  useEffect(() => {
    const fetchData = async () => {
      const data = await handleDashboardData("range=1-6");

      setData(data.data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <div className="bg-white p-4 shadow-md rounded-md mb-4 mx-8">
        <nav aria-label="Breadcrumb">
          <ol className="flex space-x-2 text-sm font-medium">
            <li>
              <Link
                href="/dashboard/mitra"
                className="text-gray-500 hover:text-gray-700"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <span className="text-gray-500">/</span>
            </li>
            <li>Beranda</li>
          </ol>
        </nav>
      </div>

      <div className="border-2 rounded-md items-center mb-3 bg-white p-6 m-8">
        <div>
          <h1 className="text-2xl font-bold">Beranda</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-8">
        <StatCard
          icon={
            <Users className="w-14 h-14 text-white border border-white rounded-full bg-green-400 p-2" />
          }
          title="Total Villa"
          value={data?.villaCount || 0}
          bgColor="bg-green-200/80"
        />
        <StatCard
          icon={
            <Building2 className="w-14 h-14 text-white border border-white rounded-full bg-orange-400 p-2" />
          }
          title="Total Pesanan"
          value={data?.pesananCount || 0}
          bgColor="bg-orange-200/80"
        />
        <StatCard
          icon={
            <Wallet className="w-14 h-14 text-white border border-white rounded-full bg-purple-400 p-2" />
          }
          title="Total Ulasan"
          value={data?.ulasanCount || 0}
          bgColor="bg-purple-200/80"
        />
        <StatCard
          icon={
            <ImageIcon className="w-14 h-14 text-white border border-white rounded-full bg-blue-400 p-2" />
          }
          title="Rata-rata Rating"
          value={data?.avgRating || 0}
          bgColor="bg-blue-200/80"
        />
      </div>

      <div className="p-8">
        <TransactionAreaChart />
      </div>
    </div>
  );
};

export default DashboardMitra;
