import React from 'react';
import { Link } from 'react-router-dom';
import { HeartPulse } from 'lucide-react';

function Navbar() {
  return (
    // Menggunakan kode hex #3E7E4C secara langsung
    // my-color-brand-green
    // header className="bg-[#3E7E4C] shadow-md fixed w-full z-10">
    <header className="bg-[#3E7E4C] shadow-md fixed w-full z-10">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          {/* Ikon dan nama brand sekarang berwarna putih */}
          <HeartPulse className="text-white" size={28} />
          <span className="text-xl font-bold text-white">
            SMART PHR
          </span>
        </Link>
        <nav>
          <Link
            to="/login"
            // Tombol login dengan latar putih dan teks hijau
            className="bg-white text-[#3E7E4C] font-semibold py-2 px-6 rounded-lg hover:bg-slate-100 transition-colors duration-300"
          >
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
