import React, { useState } from "react";
import { Plus, Pencil, Trash2, Search } from "lucide-react";

interface COAItem {
  id: string;
  kode: string;
  nama: string;
  kategori: string;
  saldo: number;
}

const dummyData: COAItem[] = [
  {
    id: "1",
    kode: "1-1000",
    nama: "Kas",
    kategori: "Aset",
    saldo: 50000000,
  },
  {
    id: "2",
    kode: "1-1001",
    nama: "Bank BCA",
    kategori: "Aset",
    saldo: 150000000,
  },
  {
    id: "3",
    kode: "1-2000",
    nama: "Piutang Dagang",
    kategori: "Aset",
    saldo: 25000000,
  },
  {
    id: "4",
    kode: "2-1000",
    nama: "Hutang Dagang",
    kategori: "Kewajiban",
    saldo: 15000000,
  },
  {
    id: "5",
    kode: "3-1000",
    nama: "Modal",
    kategori: "Ekuitas",
    saldo: 200000000,
  },
  {
    id: "6",
    kode: "4-1000",
    nama: "Pendapatan Penjualan",
    kategori: "Pendapatan",
    saldo: 75000000,
  },
  {
    id: "7",
    kode: "5-1000",
    nama: "Beban Gaji",
    kategori: "Beban",
    saldo: 30000000,
  },
];

const MasterCOA: React.FC = () => {
  const [data, setData] = useState<COAItem[]>(dummyData);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentItem, setCurrentItem] = useState<COAItem | null>(null);
  const [formData, setFormData] = useState({
    kode: "",
    nama: "",
    kategori: "Aset",
    saldo: 0,
  });

  const filteredData = data.filter(
    (item) =>
      item.kode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.kategori.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (item: COAItem | null = null) => {
    if (item) {
      setCurrentItem(item);
      setFormData({
        kode: item.kode,
        nama: item.nama,
        kategori: item.kategori,
        saldo: item.saldo,
      });
    } else {
      setCurrentItem(null);
      setFormData({
        kode: "",
        nama: "",
        kategori: "Aset",
        saldo: 0,
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
      [name]: name === "saldo" ? parseFloat(value) || 0 : value,
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
      const newItem: COAItem = {
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
        <h1 className="text-2xl font-bold text-gray-800">Master Data COA</h1>
        <p className="text-gray-600">Kelola data Chart of Accounts</p>
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
            Tambah COA
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Kode</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Nama</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Kategori</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Saldo</th>
                <th className="py-3 px-4 text-center text-sm font-medium text-gray-600">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-800">{item.kode}</td>
                  <td className="py-3 px-4 text-sm text-gray-800">{item.nama}</td>
                  <td className="py-3 px-4 text-sm text-gray-800">{item.kategori}</td>
                  <td className="py-3 px-4 text-sm text-gray-800">
                    {formatCurrency(item.saldo)}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => handleOpenModal(item)}
                        className="p-1 text-blue-600 hover:text-blue-800"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-1 text-red-600 hover:text-red-800"
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
                    {currentItem ? "Edit" : "Tambah"} COA
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="kode"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Kode
                      </label>
                      <input
                        type="text"
                        id="kode"
                        name="kode"
                        value={formData.kode}
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
                        htmlFor="kategori"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Kategori
                      </label>
                      <select
                        id="kategori"
                        name="kategori"
                        value={formData.kategori}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2D5F2D] focus:border-[#2D5F2D]"
                      >
                        <option value="Aset">Aset</option>
                        <option value="Kewajiban">Kewajiban</option>
                        <option value="Ekuitas">Ekuitas</option>
                        <option value="Pendapatan">Pendapatan</option>
                        <option value="Beban">Beban</option>
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="saldo"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Saldo
                      </label>
                      <input
                        type="number"
                        id="saldo"
                        name="saldo"
                        value={formData.saldo}
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

export default MasterCOA;