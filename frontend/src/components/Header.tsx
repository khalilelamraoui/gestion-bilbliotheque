"use client"
import { useState } from 'react';
import { motion } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-gray-900 sticky top-0 border border-[#FFFFFF]/[0.16] inset-x-0  backdrop-blur-md z-50">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <a href="/">FS-LIB</a>
        </motion.div>

        <nav className="hidden md:flex space-x-6">
          <a href="/" className="text-white hover:text-gray-300">Home</a>
          <a href="/features" className="text-white hover:text-gray-300">Features</a>
          <a href="/pricing" className="text-white hover:text-gray-300">Pricing</a>
          <a href="/contact" className="text-white hover:text-gray-300">Contact</a>
        </nav>

        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-900 md:hidden"
        >
          <div className="container mx-auto px-4 py-4">
            <a href="/" className="block text-white py-2">Home</a>
            <a href="/features" className="block text-white py-2">Features</a>
            <a href="/pricing" className="block text-white py-2">Pricing</a>
            <a href="/contact" className="block text-white py-2">Contact</a>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
