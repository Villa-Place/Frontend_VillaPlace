"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import dynamic from "next/dynamic";

interface PembayaranItem {
  bulan: string;
  totalPembayaran: number;
}

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const TransactionAreaChart = () => {
  const [filter, setFilter] = useState<"1-6" | "7-12">("7-12");
  const [chartData, setChartData] = useState<number[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [totalKeseluruhan, setTotalKeseluruhan] = useState(0);

  // Mapping bulan untuk rentang waktu
  const bulanMapping: Record<"1-6" | "7-12", string[]> = {
    "1-6": ["January", "February", "March", "April", "May", "June"],
    "7-12": ["July", "August", "September", "October", "November", "December"],
  };

  // Fetch data dari backend
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/admin/dashboard?range=${filter}`,
        {
          withCredentials: true,
        }
      );
      const { data } = response.data;

      // Buat data pembayaran dengan nilai default 0 untuk bulan yang tidak ada
      const pembayaranData = bulanMapping[filter].map((bulan) => {
        const item = data.pembayaranData.find(
          (p: PembayaranItem) => p.bulan === bulan
        );
        return item ? item.totalPembayaran : 0;
      });

      // Update state dengan data dari backend
      setChartData(pembayaranData);
      setCategories(bulanMapping[filter]);
      setTotalKeseluruhan(data.totalKeseluruhan);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filter]);

  const chartOptions: ApexCharts.ApexOptions = {
    chart: {
      type: "area",
      height: 400,
      toolbar: {
        show: false, // Toolbar dihilangkan
      },
      zoom: {
        enabled: false, // Zoom dinonaktifkan
      },
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    xaxis: {
      categories, // Data kategori (bulan)
    },
    yaxis: {
      title: {
        text: "Jumlah Pembayaran",
      },
      min: 0, // Nilai minimum dinamis
      max: Math.max(...chartData) + 1000 || 0, // Nilai maksimum dinamis
    },
    markers: {
      size: 4,
      colors: ["#B7906C"],
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: {
        size: 7,
      },
    },
    tooltip: {
      y: {
        formatter: (val: number) => `Rp ${val.toLocaleString()}`,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.5,
        opacityTo: 0.9,
        stops: [0, 100],
      },
    },
    colors: ["#089562"],
  };

  const chartSeries = [
    {
      name: "Pembayaran",
      data: chartData, // Data chart
    },
  ];

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value as "1-6" | "7-12");
  };

  return (
    <div className="p-8 bg-white shadow-lg rounded-xl relative">
      <h2 className="text-xl font-bold mb-6">Chart Transaksi</h2>

      <div className="flex justify-between items-center mb-4 mt-4">
        <div className=" text-left">
          <h3 className="text-sm font-semibold text-gray-700">
            Total Pembayaran
          </h3>
          <h1 className="text-3xl font-semibold text-gray-900">
            Rp {totalKeseluruhan.toLocaleString("id-ID")}
          </h1>
        </div>
        <div>
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
            value={filter}
            onChange={handleFilterChange}
          >
            <option value="1-6">Januari - Juni</option>
            <option value="7-12">Juli - Desember</option>
          </select>
        </div>
      </div>

      {/* Area Chart */}
      <ReactApexChart
        options={chartOptions}
        series={chartSeries}
        type="area"
        height={400}
      />
    </div>
  );
};

export default TransactionAreaChart;
