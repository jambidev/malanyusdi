import React, { useState } from "react";
import { Search, Calendar, Check, X, ChevronLeft, ChevronRight } from "lucide-react";

interface PekerjaItem {
  id: string;
  nik: string;
  nama: string;
}

interface KehadiranItem {
  id: string;
  pekerjaNik: string;
  pekerjaId: string;
  pekerja: string;
  tanggal: string;
  status: "Hadir" | "Tidak Hadir" | "Izin";
  keterangan: string;
}

const dummyPekerja: PekerjaItem[] = [
  { id: "1", nik: "3304112509870001", nama: "Budi Santoso" },
  { id: "2", nik: "3304112703900002", nama: "Siti Aminah" },
  { id: "3", nik: "3304111505880003", nama: "Ahmad Hidayat" },
  { id: "4", nik: "3304112208950004", nama: "Dewi Lestari" },
  { id: "5", nik: "3304111007920005", nama: "Eko Prasetyo" },
];

const generateDummyKehadiran = (date: string): KehadiranItem[] => {
  return dummyPekerja.map((pekerja) => ({
    id: `${pekerja.id}-${date}`,
    pekerjaNik: pekerja.nik,
    pekerjaId: pekerja.id,
    pekerja: pekerja.nama,
    tanggal: date,
    status: Math.random() > 0.2 ? "Hadir" : Math.random() > 0.5 ? "Tidak Hadir" : "Izin",
    keterangan: "",
  }));
};

const TransaksiKehadiran: React.FC = () => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);
  const [searchTerm, setSearchTerm] = useState("");
  const [kehadiranData, setKehadiranData] = useState<KehadiranItem[]>(
    generateDummyKehadiran(today.toISOString().split("T")[0])
  );

  const formatDate = (date: Date): string => {
    return date.toISOString().split("T")[0];
  };

  const changeDate = (days: number) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + days);
    setCurrentDate(newDate);
    
    // Generate new data for the selected date
    setKehadiranData(generateDummyKehadiran(formatDate(newDate)));
  };

  const handleStatusChange = (id: string, status: "Hadir" | "Tidak Hadir" | "Izin") => {
    setKehadiranData(
      kehadiranData.map((item) =>
        item.id === id ? { ...item, status } : item
      )
    );
  };

  const handleKeteranganChange = (id: string, keterangan: string) => {
    setKehadiranData(
      kehadiranData.map((item) =>
        item.id === id ? { ...item, keterangan } : item
      )
    );
  };

  const filteredData = kehadiranData.filter(
    (item) =>
      item.pekerja.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.pekerjaNik.includes(searchTerm)
  );

  const formatDateDisplay = (date: Date): string => {
    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Transaksi Kehadiran</h1>
        <p className="text-gray-600">Kelola data kehadiran pekerja harian</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => changeDate(-1)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex items-center bg-gray-100 px-4 py-2 rounded-lg">
              <Calendar size={20} className="text-gray-500 mr-2" />
              <span className="font-medium">{formatDateDisplay(currentDate)}</span>
            </div>
            <button
              onClick={() => changeDate(1)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Cari pekerja..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D5F2D]/50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">NIK</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Nama Pekerja</th>
                <th className="py-3 px-4 text-center text-sm font-medium text-gray-600">Status</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Keterangan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-800">{item.pekerjaNik}</td>
                  <td className="py-3 px-4 text-sm text-gray-800">{item.pekerja}</td>
                  <td className="py-3 px-4">
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => handleStatusChange(item.id, "Hadir")}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${item.status === "Hadir" ? "bg-green-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
                      >
                        <Check size={14} className="inline mr-1" />
                        Hadir
                      </button>
                      <button
                        onClick={() => handleStatusChange(item.id, "Tidak Hadir")}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${item.status === "Tidak Hadir" ? "bg-red-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
                      >
                        <X size={14} className="inline mr-1" />
                        Tidak
                      </button>
                      <button
                        onClick={() => handleStatusChange(item.id, "Izin")}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${item.status === "Izin" ? "bg-yellow-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
                      >
                        Izin
                      </button>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-md shadow-sm py-1 px-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#2D5F2D] focus:border-[#2D5F2D]"
                      placeholder="Tambahkan keterangan..."
                      value={item.keterangan}
                      onChange={(e) => handleKeteranganChange(item.id, e.target.value)}
                      disabled={item.status === "Hadir"}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            className="bg-[#2D5F2D] text-white px-4 py-2 rounded-lg hover:bg-[#2D5F2D]/90 transition-colors"
          >
            Simpan Kehadiran
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransaksiKehadiran;