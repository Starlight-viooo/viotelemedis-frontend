import React from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Activity, LogOut, HeartPulse } from 'lucide-react';
import { useAuth } from '../context/Authcontext'; // Menggunakan 'c' kecil sesuai permintaan Anda

const DashboardLayout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        // Di sini kita akan memanggil API logout di masa depan
        // Untuk sekarang, kita hanya membersihkan state di frontend
        logout();
        navigate('/'); // Arahkan ke landing page setelah logout
    };

    return (
        <div className="min-h-screen bg-slate-100">
            {/* =================================================================== */}
            {/* BAGIAN 1: HEADING / NAVBAR PERMANEN */}
            {/* =================================================================== */}
            <header className="bg-[#3E7E4C] shadow-md fixed w-full z-20">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    {/* Brand Logo */}
                    <Link to="/dashboard" className="flex items-center space-x-2">
                        <HeartPulse className="text-white" size={28} />
                        <span className="text-xl font-bold text-white">SMART PHR</span>
                    </Link>
                    
                    {/* Informasi User dan Tombol Logout */}
                    <div className="flex items-center space-x-4">
                        <span className="text-white hidden sm:block">
                            Selamat datang, <span className="font-semibold">{user?.name}</span>
                        </span>
                        <button
                            onClick={handleLogout}
                            className="bg-white text-[#3E7E4C] font-semibold py-2 px-4 rounded-lg hover:bg-slate-100 transition-colors duration-300 flex items-center space-x-2"
                        >
                            <LogOut size={16} />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* =================================================================== */}
            {/* BAGIAN 2: LAYOUT UTAMA (SIDEBAR + KONTEN) */}
            {/* =================================================================== */}
            <div className="flex pt-20"> {/* Padding top untuk memberi ruang bagi navbar */}
                
                {/* Sidebar Navigasi */}
                <aside className="w-64 flex-shrink-0 hidden md:block">
                    {/* Dibuat "sticky" agar tetap terlihat saat scroll */}
                    <div className="sticky top-20 bg-white p-4 rounded-lg shadow-md mx-6">
                        <nav className="space-y-1">
                            <NavLink to="/dashboard" end className={({ isActive }) => `flex items-center space-x-3 p-3 rounded-lg transition-colors ${isActive ? 'bg-teal-50 text-[#3E7E4C] font-semibold' : 'text-slate-600 hover:bg-slate-100'}`}>
                                <LayoutDashboard size={20} />
                                <span>Dashboard</span>
                            </NavLink>
                            <NavLink to="/dashboard/pasien" className={({ isActive }) => `flex items-center space-x-3 p-3 rounded-lg transition-colors ${isActive ? 'bg-teal-50 text-[#3E7E4C] font-semibold' : 'text-slate-600 hover:bg-slate-100'}`}>
                                <Users size={20} />
                                <span>Data Pasien</span>
                            </NavLink>
                            <NavLink to="/dashboard/biometrik" className={({ isActive }) => `flex items-center space-x-3 p-3 rounded-lg transition-colors ${isActive ? 'bg-teal-50 text-[#3E7E4C] font-semibold' : 'text-slate-600 hover:bg-slate-100'}`}>
                                <Activity size={20} />
                                <span>Biometrik Realtime</span>
                            </NavLink>
                        </nav>
                    </div>
                </aside>

                {/* Konten Utama Halaman */}
                <main className="flex-1 p-6">
                    <div className="bg-white p-8 rounded-lg shadow-md min-h-full">
                        <Outlet /> {/* Di sini konten (Dashboard, Pasien, Biometrik) akan ditampilkan */}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
