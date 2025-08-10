import React from 'react';

function Footer() {
  return (
    <footer className="bg-slate-800 text-slate-400 py-8">
      <div className="container mx-auto px-6 text-center">
        {/* PERUBAHAN DI SINI */}
        <p>&copy; {new Date().getFullYear()} SMART PHR by Tim SMART PHR. All rights reserved.</p>
        <p className="text-sm mt-2">Sebuah Proyek untuk GEMASTIK.</p>
      </div>
    </footer>
  );
}

export default Footer;