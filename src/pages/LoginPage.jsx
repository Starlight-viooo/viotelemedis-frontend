import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { HeartPulse } from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../context/Authcontext';

// Fungsi bantuan untuk membaca cookie
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const from = location.state?.from?.pathname || "/dashboard";

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // 1. Ambil cookie CSRF dari Laravel
      await api.get('/sanctum/csrf-cookie');
      
      // 2. Baca token dari cookie yang baru saja diterima
      const xsrfToken = getCookie('XSRF-TOKEN');

      // 3. Kirim permintaan login DENGAN header CSRF manual
      const response = await api.post(
        '/api/login',
        { email, password },
        {
          headers: {
            // Tambahkan header X-XSRF-TOKEN secara manual
            'X-XSRF-TOKEN': decodeURIComponent(xsrfToken)
          }
        }
      );

      // Simpan data user dan role ke context
      login(response.data.user, response.data.roles);
      
      // Arahkan ke halaman tujuan
      navigate(from, { replace: true });

    } catch (err) {
      if (err.response && err.response.status === 422) {
        setError(err.response.data.errors.email[0]);
      } else if (err.response && err.response.status === 419) {
        setError("CSRF token mismatch. Silakan refresh halaman dan coba lagi.");
      } else {
        setError('Terjadi kesalahan. Silakan coba lagi.');
      }
      console.error("Error saat login:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 flex items-center justify-center min-h-screen p-4">
      <div className="bg-white p-8 md:p-12 rounded-xl shadow-lg w-full max-w-md border-t-4 border-[#3E7E4C]">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block mb-4">
            <HeartPulse className="text-[#3E7E4C] mx-auto" size={40} />
          </Link>
          <h1 className="text-2xl font-bold text-slate-800">
            Login Dashboard
          </h1>
          <p className="text-slate-500 mt-1">
            Khusus untuk Tenaga Medis
          </p>
        </div>
        
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Alamat Email</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full px-4 py-3 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-[#3E7E4C] focus:border-[#3E7E4C]" placeholder="superuser@gmail.com" required disabled={isLoading} />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 block w-full px-4 py-3 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-[#3E7E4C] focus:border-[#3E7E4C]" placeholder="••••••••" required disabled={isLoading} />
          </div>
          <div>
            <button type="submit" disabled={isLoading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#3E7E4C] hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3E7E4C] transition-colors duration-300 disabled:bg-slate-400">
              {isLoading ? 'Memproses...' : 'Masuk'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;