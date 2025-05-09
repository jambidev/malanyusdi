import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-gray-200 py-3 px-4 text-center text-sm text-gray-500 bg-white">
      <p>
        &copy; {currentYear} PT. Malanyusdi Palm Oil Plantation Management System
      </p>
      <p className="text-xs">
        Developer: Mardianto Eka Saputra
      </p>
    </footer>
  );
};

export default Footer;