import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { HeartPulse } from 'lucide-react';
import { useAuth } from '../context/Authcontext';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const from = location.state?.from?.pathname || "/dashboard";

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulasikan jeda jaringan selama 1 detik
    setTimeout(() => {
      // Periksa kredensial secara lokal (hardcoded)
      if (email === 'admin@gmail.com' && password === '123456') {
        // Buat data user palsu
        const dummyUser = { id: 1, name: 'Admin Demo', email: 'admin@gmail.com' };
        const dummyRoles = ['superuser'];

        // Panggil fungsi login dari context dengan data palsu
        login(dummyUser, dummyRoles);
        
        // Arahkan ke dashboard
        navigate(from, { replace: true });
      } else {
        setError('Email atau password salah.');
      }
      setIsLoading(false);
    }, 1000);
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
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full px-4 py-3 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-[#3E7E4C] focus:border-[#3E7E4C]" placeholder="admin@gmail.com" required disabled={isLoading} />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 block w-full px-4 py-3 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-[#3E7E4C] focus:border-[#3E7E4C]" placeholder="123456" required disabled={isLoading} />
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