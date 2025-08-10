import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { MonitorSmartphone, HeartPulse, ShieldCheck } from 'lucide-react';

function LandingPage() {
  return (
    <div className="bg-slate-50 min-h-screen text-slate-800">
      <Navbar />

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-24 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight">
          Pantau Kesehatan, Genggam Masa Depan.
        </h1>
        {/* PERUBAHAN DI SINI */}
        <p className="mt-6 text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
          SMART PHR adalah platform pemantauan kesehatan personal yang menghubungkan data biometrik Anda secara real-time ke tenaga medis profesional.
        </p>
        <div className="mt-10">
          <Link
            to="/login"
            className="bg-teal-500 text-white font-bold py-3 px-8 rounded-full hover:bg-teal-600 transition-colors duration-300 shadow-lg"
          >
            Masuk untuk Tenaga Medis
          </Link>
        </div>
      </main>

      {/* ... sisa kode tidak berubah ... */}
      <section id="features" className="bg-white py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            Fitur Unggulan Kami
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="feature-card">
              <div className="bg-teal-100 rounded-full p-4 inline-block mb-4">
                <MonitorSmartphone className="text-teal-600" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Dashboard Real-time</h3>
              <p className="text-slate-600">
                Pantau data vital pasien dari mana saja secara langsung melalui dashboard web yang intuitif dan responsif.
              </p>
            </div>
            <div className="feature-card">
              <div className="bg-teal-100 rounded-full p-4 inline-block mb-4">
                <HeartPulse className="text-teal-600" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Analisis Cerdas (CDSS)</h3>
              <p className="text-slate-600">
                Dapatkan wawasan dari analisis data biometrik berbasis AI untuk mendukung keputusan klinis yang lebih cepat dan akurat.
              </p>
            </div>
            <div className="feature-card">
              <div className="bg-teal-100 rounded-full p-4 inline-block mb-4">
                <ShieldCheck className="text-teal-600" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Keamanan Terjamin</h3>
              <p className="text-slate-600">
                Data pasien dienkripsi dan disimpan dengan standar keamanan tertinggi untuk menjaga privasi dan kerahasiaan.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default LandingPage;