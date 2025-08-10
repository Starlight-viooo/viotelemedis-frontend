import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './components/DashboardLayout';
import DashboardHomePage from './pages/DashboardHomePage';
import PasienPage from './pages/PasienPage';
import BiometrikPage from './pages/BiometrikPage';

function App() {
  return (
    <Routes>
      {/* Rute Publik */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Rute yang Dilindungi */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        {/* Halaman di dalam dashboard */}
        <Route index element={<DashboardHomePage />} />
        <Route path="pasien" element={<PasienPage />} />
        <Route path="biometrik" element={<BiometrikPage />} />
      </Route>
    </Routes>
  );
}

export default App;