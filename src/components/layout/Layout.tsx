import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { useSidebar } from '../../contexts/SidebarContext';

const Layout = () => {
  const { isOpen } = useSidebar();

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className={`flex flex-col flex-1 overflow-hidden transition-all duration-300 ${
        isOpen ? 'md:ml-64' : 'md:ml-20'
      }`}>
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;