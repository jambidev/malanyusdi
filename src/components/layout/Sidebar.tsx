import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Map,
  CalendarCheck,
  Plane as Plant,
  Sprout,
  Bug,
  Users,
  DollarSign,
  BarChart3,
  Settings,
  ChevronRight,
  ChevronDown,
  Database,
  ClipboardList,
  FileText
} from "lucide-react";
import { useSidebar } from "../../contexts/SidebarContext";
import { useAuth } from "../../contexts/AuthContext";

interface NavItemProps {
  to?: string;
  icon: React.ReactNode;
  label: string;
  isCollapsed: boolean;
  hasDropdown?: boolean;
  isOpen?: boolean;
  onClick?: () => void;
}

interface DropdownItemProps {
  to: string;
  label: string;
  isCollapsed: boolean;
}

const NavItem = ({ to, icon, label, isCollapsed, hasDropdown, isOpen, onClick }: NavItemProps) => {
  const content = (
    <>
      <div className={`${isCollapsed ? "mr-0" : "mr-3"}`}>{icon}</div>
      {!isCollapsed && (
        <div className="flex items-center justify-between w-full">
          <span>{label}</span>
          {hasDropdown && (
            <span className="ml-auto">
              {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </span>
          )}
        </div>
      )}
    </>
  );

  if (to) {
    return (
      <NavLink
        to={to}
        className={({ isActive }) => `
          flex items-center px-4 py-3 text-gray-700 rounded-lg
          ${
            isActive
              ? "bg-[#2D5F2D]/10 text-[#2D5F2D] font-medium"
              : "hover:bg-gray-100"
          }
          ${isCollapsed ? "justify-center" : "justify-start"}
          transition-all duration-200
        `}
      >
        {content}
      </NavLink>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`
        flex items-center px-4 py-3 text-gray-700 rounded-lg cursor-pointer
        hover:bg-gray-100
        ${isCollapsed ? "justify-center" : "justify-start"}
        transition-all duration-200
      `}
    >
      {content}
    </div>
  );
};

const DropdownItem = ({ to, label, isCollapsed }: DropdownItemProps) => (
  <NavLink
    to={to}
    className={({ isActive }) => `
      flex items-center px-4 py-2 ml-8 text-sm text-gray-700 rounded-lg
      ${
        isActive
          ? "bg-[#2D5F2D]/10 text-[#2D5F2D] font-medium"
          : "hover:bg-gray-100"
      }
      ${isCollapsed ? "justify-center ml-0" : "justify-start"}
      transition-all duration-200
    `}
  >
    {!isCollapsed && <span>{label}</span>}
  </NavLink>
);

const Sidebar = () => {
  const { isOpen, close } = useSidebar();
  const { user } = useAuth();
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({
    masterData: false,
    transaksi: false,
    laporan: false
  });

  const toggleDropdown = (key: string) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Close sidebar on mobile when clicking outside
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        close();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [close]);

  // Define navigation items
  const navItems = [
    { to: "/dashboard", icon: <LayoutDashboard size={20} />, label: "Dasbor" },
    { to: "/field-mapping", icon: <Map size={20} />, label: "Pemetaan Lahan" },
    {
      to: "/task-scheduling",
      icon: <CalendarCheck size={20} />,
      label: "Jadwal Tugas",
    },
    {
      to: "/harvest-management",
      icon: <Plant size={20} />,
      label: "Manajemen Panen",
    },
    {
      to: "/fertilizer-management",
      icon: <Sprout size={20} />,
      label: "Manajemen Pupuk",
    },
    {
      to: "/pest-control",
      icon: <Bug size={20} />,
      label: "Pengendalian Hama",
    },
    { to: "/workforce", icon: <Users size={20} />, label: "Tenaga Kerja" },
    { to: "/financial", icon: <DollarSign size={20} />, label: "Keuangan" },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 z-20 md:hidden"
          onClick={close}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-30 h-full bg-white border-r border-gray-200
          transition-all duration-300 ease-in-out overflow-y-auto
          ${isOpen ? "w-64" : "w-20"} 
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="flex items-center justify-between p-4">
          {isOpen ? (
            <div className="flex items-center">
              <div className="w-10 h-10 bg-[#2D5F2D] rounded-lg flex items-center justify-center">
                <Plant size={24} className="text-white" />
              </div>
              <h2 className="ml-2 text-xl font-bold text-[#2D5F2D]">
                Malanyusdi
              </h2>
            </div>
          ) : (
            <div className="w-10 h-10 mx-auto bg-[#2D5F2D] rounded-lg flex items-center justify-center">
              <Plant size={24} className="text-white" />
            </div>
          )}
        </div>

        {/* User info */}
        {isOpen && user && (
          <div className="px-4 py-3 border-t border-b border-gray-200">
            <div className="flex items-center">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full"
                />
              ) : (
                <div className="w-10 h-10 bg-[#4A7C59] rounded-full flex items-center justify-center">
                  <span className="text-white font-medium">
                    {user.name.charAt(0)}
                  </span>
                </div>
              )}
              <div className="ml-3">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user.role}</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="mt-4 px-2 space-y-1 pb-20">
          {navItems.map((item) => (
            <NavItem
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={item.label}
              isCollapsed={!isOpen}
            />
          ))}
          
          {/* Master Data Dropdown */}
          <div className="py-1">
            <NavItem
              icon={<Database size={20} />}
              label="Master Data"
              isCollapsed={!isOpen}
              hasDropdown={true}
              isOpen={openDropdowns.masterData}
              onClick={() => toggleDropdown("masterData")}
            />
            {openDropdowns.masterData && !isCollapsed && (
              <div className="mt-1 space-y-1">
                <DropdownItem to="/master/coa" label="Master Data COA" isCollapsed={!isOpen} />
                <DropdownItem to="/master/pekerja-harian" label="Master Data Pekerja Harian" isCollapsed={!isOpen} />
                <DropdownItem to="/master/pks" label="Master Data PKS" isCollapsed={!isOpen} />
              </div>
            )}
          </div>
          
          {/* Transaksi Dropdown */}
          <div className="py-1">
            <NavItem
              icon={<ClipboardList size={20} />}
              label="Transaksi"
              isCollapsed={!isOpen}
              hasDropdown={true}
              isOpen={openDropdowns.transaksi}
              onClick={() => toggleDropdown("transaksi")}
            />
            {openDropdowns.transaksi && !isCollapsed && (
              <div className="mt-1 space-y-1">
                <DropdownItem to="/transaksi/kehadiran" label="Transaksi Kehadiran" isCollapsed={!isOpen} />
                <DropdownItem to="/transaksi/upah-pekerja" label="Transaksi Upah Pekerja" isCollapsed={!isOpen} />
                <DropdownItem to="/transaksi/produksi" label="Transaksi Produksi" isCollapsed={!isOpen} />
                <DropdownItem to="/transaksi/penjualan" label="Transaksi Penjualan" isCollapsed={!isOpen} />
              </div>
            )}
          </div>
          
          {/* Laporan Dropdown */}
          <div className="py-1">
            <NavItem
              icon={<BarChart3 size={20} />}
              label="Laporan"
              isCollapsed={!isOpen}
              hasDropdown={true}
              isOpen={openDropdowns.laporan}
              onClick={() => toggleDropdown("laporan")}
            />
            {openDropdowns.laporan && !isCollapsed && (
              <div className="mt-1 space-y-1">
                <DropdownItem to="/laporan/jurnal-umum" label="Jurnal Umum" isCollapsed={!isOpen} />
                <DropdownItem to="/laporan/buku-besar" label="Buku Besar" isCollapsed={!isOpen} />
                <DropdownItem to="/laporan/penjualan" label="Laporan Penjualan" isCollapsed={!isOpen} />
              </div>
            )}
          </div>
        </nav>

        {/* Settings at bottom */}
        <div className="fixed bottom-0 w-full p-2 border-t border-gray-200 bg-white">
          <NavItem
            to="/settings"
            icon={<Settings size={20} />}
            label="Pengaturan"
            isCollapsed={!isOpen}
          />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
