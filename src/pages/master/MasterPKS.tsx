import React, { useState } from "react";
import { Plus, Pencil, Trash2, Search } from "lucide-react";

interface PKSItem {
  id: string;
  kode: string;
  nama: string;
  alamat: string;
  kontak: string;
  email: string;
  hargaTBS: number;
  jarak: number;
}

const dummyData: PKSItem[] = [
  {
    id: "1",
    kode: "PKS001",
    nama: "PT Sawit Makmur",
    alamat: "Jl. Raya Pekanbaru KM 15, Riau",
    kontak: "081234567890",
    email: "sawitmakmur@example.com",
    hargaTBS: 2100000,
    jarak: 15,
  },
  {
    id: "2",
    kode: "PKS002",
    nama: "PT Kelapa Sawit Nusantara",
    alamat: "Jl. Lintas Sumatera KM 25, Jambi",
    kontak: "081234567891",
    email: "ksnusantara@example.com",
    hargaTBS: 2050000,
    jarak: 25,
  },
  {
    id: "3",
    kode: "PKS003",
    nama: "PT Agro Lestari",
    alamat: "Jl. Industri Blok C5, Riau",
    kontak: "081234567892",
    email: "agrolestari@example.com",
    hargaTBS: 2150000,
    jarak: 10,
  },
  {
    id: "4",
    kode: "PKS004",
    nama: "PT Sawit Sejahtera",
    alamat: "Jl. Raya Palembang KM 30, Sumatera Selatan",
    kontak: "081234567893",
    email: "sawitsejahtera@example.com",
    hargaTBS: 2000000,
    jarak: 30,
  },
  {
    id: "5",
    kode: "PKS005",
    nama: "PT Mitra Sawit",
    alamat: "Jl. Industri Blok A3, Jambi",
    kontak: "081234567894",
    email: "mitrasawit@example.com",
    hargaTBS: 2080000,
    jarak: 20,
  },
];

const MasterPKS: React.FC = () => {
  const [data, setData] = useState<PKSItem[]>(dummyData);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentItem, setCurrentItem] = useState<PKSItem | null>(null);
  const [formData, setFormData] = useState({
    kode: "",
    nama: "",
    alamat: "",
    kontak: "",
    email: "",
    hargaTBS: 0,
    jarak: 0,
  });

  const filteredData = data.filter(
    (item) =>
      item.kode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.alamat.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (item: PKSItem | null = null) => {
    if (item) {
      setCurrentItem(item);
      setFormData({
        kode: item.kode,
        nama: item.nama,
        alamat: item.alamat,
        kontak: item.kontak,
        email: item.email,
        hargaTBS: item.hargaTBS,
        jarak: item.jarak,
      });
    } else {
      setCurrentItem(null);
      setFormData({
        kode: "",
        nama: "",
        alamat: "",
        kontak: "",
        email: "",
        hargaTBS: 0,
        jarak: 0,
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentItem(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "hargaTBS" || name === "jarak" ? parseFloat(value) || 0 : value,
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
      const newItem: PKSItem = {
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
        <h1 className="text-2xl font-bold text-gray-800">Master Data PKS</h1>
        <p className="text-gray-600">Kelola data Pabrik Kelapa Sawit (PKS)</p>
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
            Tambah PKS
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Kode</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Nama</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Alamat</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Kontak</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Email</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Harga TBS</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Jarak (km)</th>
                <th className="py-3 px-4 text-center text-sm font-medium text-gray-600">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-800">{item.kode}</td>
                  <td className="py-3 px-4 text-sm text-gray-800">{item.nama}</td>
                  <td className="py-3 px-4 text-sm text-gray-800">{item.alamat}</td>
                  <td className="py-3 px-4 text-sm text-gray-800">{item.kontak}</td>
                  <td className="py-3 px-4 text-sm text-gray-800">{item.email}</td>
                  <td className="py-3 px-4 text-sm text-gray-800">
                    {formatCurrency(item.hargaTBS)}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-800">{item.jarak}</td>
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
                    {currentItem ? "Edit" : "Tambah"} PKS
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
                        htmlFor="kontak"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Kontak
                      </label>
                      <input
                        type="text"
                        id="kontak"
                        name="kontak"
                        value={formData.kontak}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2D5F2D] focus:border-[#2D5F2D]"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2D5F2D] focus:border-[#2D5F2D]"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="hargaTBS"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Harga TBS (Rp/ton)
                      </label>
                      <input
                        type="number"
                        id="hargaTBS"
                        name="hargaTBS"
                        value={formData.hargaTBS}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#2D5F2D] focus:border-[#2D5F2D]"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="jarak"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Jarak (km)
                      </label>
                      <input
                        type="number"
                        id="jarak"
                        name="jarak"
                        value={formData.jarak}
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

export default MasterPKS;