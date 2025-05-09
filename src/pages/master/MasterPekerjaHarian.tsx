import React, { useState } from "react";
import { Plus, Pencil, Trash2, Search, UserCheck, UserX } from "lucide-react";

interface PekerjaHarianItem {
  id: string;
  nik: string;
  nama: string;
  alamat: string;
  noHP: string;
  tanggalMulai: string;
  status: "Aktif" | "Nonaktif";
  upahHarian: number;
}

const dummyData: PekerjaHarianItem[] = [
  {
    id: "1",
    nik: "3304112509870001",
    nama: "Budi Santoso",
    alamat: "Desa Sukamaju RT 02/03",
    noHP: "081234567890",
    tanggalMulai: "2022-03-15",
    status: "Aktif",
    upahHarian: 120000,
  },
  {
    id: "2",
    nik: "3304112703900002",
    nama: "Siti Aminah",
    alamat: "Desa Sukamaju RT 01/03",
    noHP: "081234567891",
    tanggalMulai: "2022-04-10",
    status: "Aktif",
    upahHarian: 120000,
  },
  {
    id: "3",
    nik: "3304111505880003",
    nama: "Ahmad Hidayat",
    alamat: "Desa Sukamaju RT 03/01",
    noHP: "081234567892",
    tanggalMulai: "2022-02-20",
    status: "Aktif",
    upahHarian: 120000,
  },
  {
    id: "4",
    nik: "3304112208950004",
    nama: "Dewi Lestari",
    alamat: "Desa Sukamaju RT 04/02",
    noHP: "081234567893",
    tanggalMulai: "2022-05-05",
    status: "Nonaktif",
    upahHarian: 120000,
  },
  {
    id: "5",
    nik: "3304111007920005",
    nama: "Eko Prasetyo",
    alamat: "Desa Sukamaju RT 05/01",
    noHP: "081234567894",
    tanggalMulai: "2022-01-15",
    status: "Aktif",
    upahHarian: 120000,
  },
];

const MasterPekerjaHarian: React.FC = () => {
  const [data, setData] = useState<PekerjaHarianItem[]>(dummyData);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentItem, setCurrentItem] = useState<PekerjaHarianItem | null>(null);
  const [formData, setFormData] = useState({
    nik: "",
    nama: "",
    alamat: "",
    noHP: "",
    tanggalMulai: "",
    status: "Aktif" as "Aktif" | "Nonaktif",
    upahHarian: 120000,
  });

  const filteredData = data.filter(
    (item) =>
      item.nik.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.alamat.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (item: PekerjaHarianItem | null = null) => {
    if (item) {
      setCurrentItem(item);
      setFormData({
        nik: item.nik,
        nama: item.nama,
        alamat: item.alamat,
        noHP: item.noHP,
        tanggalMulai: item.tanggalMulai,
        status: item.status,
        upahHarian: item.upahHarian,
      });
    } else {
      setCurrentItem(null);
      setFormData({
        nik: "",
        nama: "",
        alamat: "",
        noHP: "",
        tanggalMulai: new Date().toISOString().split("T")[0],
        status: "Aktif",
        upahHarian: 120000,
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentItem(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "upahHarian" ? parseFloat(value) || 0 : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentItem) {
      // Update existing item
      setData(
        data.map((item) =>
          item.id === currentItem.id
            ? { ...item, ...formData }
            : item
        )
      );
    } else {
      // Add new item
      const newItem: PekerjaHarianItem = {
        id: Math.random().toString(36).substr(2, 9),
        ...formData,
      };
      setData([...data, newItem]);
    }
    handleCloseModal();
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      setData(data.filter((item) => item.id !== id));
    }
  };

  const handleToggleStatus = (id: string) => {
    setData(
      data.map((item) =>
        item.id === id
          ? { ...item, status: item.status === "Aktif" ? "Nonaktif" : "Aktif" }
          : item
      )
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Master Data Pekerja Harian</h1>
        <p className="text-gray-600">Kelola data pekerja harian perkebunan</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Cari..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D5F2D]/50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="bg-[#2D5F2D] text-white px-4 py-2 rounded-lg flex items-center hover:bg-[#2D5F2D]/90 transition-colors"
          >
            <Plus size={20} className="mr-2" />
            Tambah Pekerja
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">NIK</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Nama</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Alamat</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">No. HP</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Tanggal Mulai</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Upah Harian</th>
                <th className="py-3 px-4 text-center text-sm font-medium text-gray-600">Status</th>
                <th className="py-3 px-4 text-center text-sm font-medium text-gray-600">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-800">{item.nik}</td>
                  <td className="py-3 px-4 text-sm text-gray-800">{item.nama}</td>
                  <td className="py-3 px-4 text-sm text-gray-800">{item.alamat}</td>
                  <td className="py-3 px-4 text-sm text-gray-800">{item.noHP}</td>
                  <td className="py-3 px-4 text-sm text-gray-800">{item.tanggalMulai}</td>
                  <td className="py-3 px-4 text-sm text-gray-800">
                    {formatCurrency(item.upahHarian)}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${item.status === "Aktif" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => handleToggleStatus(item.id)}
                        className={`p-1 ${item.status === "Aktif" ? "text-red-600 hover:text-red-800" : "text-green-600 hover:text-green-800"}`}
                        title={item.status === "Aktif" ? "Nonaktifkan" : "Aktifkan"}
                      >
                        {item.status === "Aktif" ? <UserX size={18} /> : <UserCheck size={18} />}
                      </button>
                      <button
                        onClick={() => handleOpenModal(item)}
                        className="p-1 text-blue-600 hover:text-blue-800"
                        title="Edit"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1 text-red-600 hover:text-red-800"
                        title="Hapus"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              onClick={handleCloseModal}
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    {currentItem ? "Edit" : "Tambah"} Pekerja Harian
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="nik"
                        className="block text-sm font-medium text-gray-700"
                      >
                        NIK
                      </label>
                      <input
                        type="text"
                        id="nik"
                        name="nik"
                        value={formData.nik}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2D5F2D] focus:border-[#2D5F2D]"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="nama"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Nama
                      </label>
                      <input
                        type="text"
                        id="nama"
                        name="nama"
                        value={formData.nama}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2D5F2D] focus:border-[#2D5F2D]"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="alamat"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Alamat
                      </label>
                      <input
                        type="text"
                        id="alamat"
                        name="alamat"
                        value={formData.alamat}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2D5F2D] focus:border-[#2D5F2D]"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="noHP"
                        className="block text-sm font-medium text-gray-700"
                      >
                        No. HP
                      </label>
                      <input
                        type="text"
                        id="noHP"
                        name="noHP"
                        value={formData.noHP}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2D5F2D] focus:border-[#2D5F2D]"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="tanggalMulai"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Tanggal Mulai
                      </label>
                      <input
                        type="date"
                        id="tanggalMulai"
                        name="tanggalMulai"
                        value={formData.tanggalMulai}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2D5F2D] focus:border-[#2D5F2D]"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="status"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Status
                      </label>
                      <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2D5F2D] focus:border-[#2D5F2D]"
                      >
                        <option value="Aktif">Aktif</option>
                        <option value="Nonaktif">Nonaktif</option>
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="upahHarian"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Upah Harian
                      </label>
                      <input
                        type="number"
                        id="upahHarian"
                        name="upahHarian"
                        value={formData.upahHarian}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2D5F2D] focus:border-[#2D5F2D]"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#2D5F2D] text-base font-medium text-white hover:bg-[#2D5F2D]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2D5F2D] sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Simpan
                  </button>
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Batal
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MasterPekerjaHarian;