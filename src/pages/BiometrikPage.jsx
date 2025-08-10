import React, { useState, useEffect } from 'react';
import { Search, Heart, Droplets } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Registrasi komponen Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Data pasien palsu (dummy data)
const dummyPatients = [
    { id: 1, name: 'Ahmad Dahlan' },
    { id: 2, name: 'Budi Santoso' },
    { id: 3, name: 'Citra Lestari' },
];

// Data biometrik palsu untuk setiap pasien
const dummyBiometricData = {
    1: { // Data untuk Ahmad (ID 1)
        heartRate: 76,
        oxygenSaturation: 97,
        heartRateHistory: [75, 78, 76, 80, 79, 77, 76],
        oxygenSaturationHistory: [98, 97, 98, 96, 97, 97, 98],
    },
    2: { // Data untuk Budi (ID 2)
        heartRate: 82,
        oxygenSaturation: 98,
        heartRateHistory: [80, 81, 85, 83, 82, 84, 82],
        oxygenSaturationHistory: [99, 98, 98, 97, 98, 99, 98],
    },
    3: { // Data untuk Citra (ID 3)
        heartRate: 72,
        oxygenSaturation: 99,
        heartRateHistory: [70, 72, 71, 73, 74, 72, 72],
        oxygenSaturationHistory: [99, 99, 98, 99, 99, 98, 99],
    },
};

const BiometrikPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredPatients, setFilteredPatients] = useState(dummyPatients);
    const [selectedPatient, setSelectedPatient] = useState(dummyPatients[0]); // Default pilih pasien pertama
    const [biometricData, setBiometricData] = useState(dummyBiometricData[1]);

    // Fungsi pencarian lokal
    useEffect(() => {
        if (searchTerm === '') {
            setFilteredPatients(dummyPatients);
        } else {
            const results = dummyPatients.filter(patient =>
                patient.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredPatients(results);
        }
    }, [searchTerm]);

    // Fungsi untuk memilih pasien dan memuat datanya
    const selectPatient = (patient) => {
        setSelectedPatient(patient);
        setBiometricData(dummyBiometricData[patient.id]);
        setSearchTerm(''); // Kosongkan pencarian setelah memilih
        setFilteredPatients(dummyPatients); // Reset daftar
    };

    // Konfigurasi untuk grafik
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
            y: {
                beginAtZero: false,
                grid: { color: '#e5e7eb' },
                ticks: { color: '#6b7280' }
            },
            x: {
                grid: { display: false },
                ticks: { color: '#6b7280' }
            }
        }
    };

    const chartLabels = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];

    const heartRateChartData = {
        labels: chartLabels,
        datasets: [{
            label: 'Heart Rate',
            data: biometricData.heartRateHistory,
            borderColor: '#ef4444',
            backgroundColor: '#f87171',
            tension: 0.4,
        }],
    };

    const oxygenChartData = {
        labels: chartLabels,
        datasets: [{
            label: 'Oxygen Saturation',
            data: biometricData.oxygenSaturationHistory,
            borderColor: '#22c55e',
            backgroundColor: '#4ade80',
            tension: 0.4,
        }],
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-6">Data Biometrik Realtime</h1>
            
            {/* Menggabungkan semua kotak ke dalam satu grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Kotak Biometrik Pasien */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold text-slate-800 mb-4">Biometrik Pasien</h2>
                    <div className="relative">
                        <input 
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Cari & pilih pasien..."
                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E7E4C]"
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        {searchTerm && (
                            <ul className="absolute w-full bg-white border mt-1 rounded-lg shadow-lg z-10">
                                {filteredPatients.length > 0 ? (
                                    filteredPatients.map(p => (
                                        <li key={p.id} onClick={() => selectPatient(p)} className="px-4 py-2 hover:bg-slate-100 cursor-pointer">
                                            {p.name}
                                        </li>
                                    ))
                                ) : (
                                    <li className="px-4 py-2 text-slate-500">Tidak ditemukan</li>
                                )}
                            </ul>
                        )}
                    </div>

                    {selectedPatient && (
                        <div className="mt-6 grid grid-cols-2 gap-4 text-center">
                            <div>
                                <p className="text-sm text-slate-500">Heart Rate</p>
                                <div className="flex items-center justify-center space-x-2 mt-1">
                                    <Heart className="text-red-500" />
                                    <p className="text-3xl font-bold text-slate-800">{biometricData.heartRate}</p>
                                    <span className="text-slate-600">bpm</span>
                                </div>
                                <p className="text-sm text-green-600 font-semibold">Normal</p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">Oxygen Saturation</p>
                                <div className="flex items-center justify-center space-x-2 mt-1">
                                    <Droplets className="text-green-500" />
                                    <p className="text-3xl font-bold text-slate-800">{biometricData.oxygenSaturation}</p>
                                    <span className="text-slate-600">%</span>
                                </div>
                                <p className="text-sm text-green-600 font-semibold">Sehat</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Kotak Notifikasi */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold text-slate-800 mb-4">Notifikasi</h2>
                    <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
                        <p className="font-semibold text-red-800">SpO2 menurun dalam 3 hari berturut-turut.</p>
                        <p className="text-sm text-red-700 mt-1">Segera istirahat dan konsultasi medis.</p>
                        <button className="mt-4 bg-[#3E7E4C] text-white font-semibold py-2 px-4 rounded-lg text-sm hover:bg-green-800">
                            Kirim Saran
                        </button>
                    </div>
                </div>

                {/* Kotak Grafik Heart Rate */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold text-slate-800 mb-4">Heart Rate</h2>
                    {/* Mengurangi tinggi grafik */}
                    <div className="h-48">
                        <Line options={chartOptions} data={heartRateChartData} />
                    </div>
                </div>

                {/* Kotak Grafik Oxygen Saturation */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold text-slate-800 mb-4">Oxygen Saturation</h2>
                    {/* Mengurangi tinggi grafik */}
                    <div className="h-48">
                        <Line options={chartOptions} data={oxygenChartData} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BiometrikPage;
