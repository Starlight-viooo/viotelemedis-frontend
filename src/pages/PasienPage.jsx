import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, X } from 'lucide-react';
import api from '../services/api';

// Fungsi bantuan untuk membaca cookie, kita perlukan di sini
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

const PasienPage = () => {
    const [patients, setPatients] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState('create');
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [formData, setFormData] = useState({ name: '', age: '', height_cm: '', weight_kg: '' });

    const fetchPatients = async (search = '') => {
        setIsLoading(true);
        try {
            const response = await api.get(`/api/patients?search=${search}`);
            setPatients(response.data);
        } catch (error) {
            console.error("Gagal mengambil data pasien. Detail Error:", error.response || error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPatients();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchPatients(searchTerm);
    };

    const openModal = (type, patient = null) => {
        setModalType(type);
        if (type === 'edit' && patient) {
            setSelectedPatient(patient);
            setFormData({ name: patient.name, age: patient.age, height_cm: patient.height_cm, weight_kg: patient.weight_kg });
        } else {
            setSelectedPatient(null);
            setFormData({ name: '', age: '', height_cm: '', weight_kg: '' });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedPatient(null);
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Handler saat form di-submit
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            // PERBAIKAN: Baca token CSRF sebelum mengirim
            const xsrfToken = getCookie('XSRF-TOKEN');
            const config = {
                headers: {
                    'X-XSRF-TOKEN': decodeURIComponent(xsrfToken)
                }
            };

            if (modalType === 'create') {
                // Kirim permintaan dengan header CSRF
                await api.post('/api/patients', formData, config);
            } else {
                // Kirim permintaan dengan header CSRF
                await api.put(`/api/patients/${selectedPatient.id}`, formData, config);
            }
            fetchPatients(searchTerm);
            closeModal();
        } catch (error) {
            console.error("Gagal menyimpan data pasien. Detail Error:", error.response || error);
        }
    };
    
    // Handler untuk menghapus pasien
    const handleDelete = async (patientId) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus pasien ini?')) {
            try {
                // PERBAIKAN: Tambahkan header CSRF untuk permintaan DELETE
                const xsrfToken = getCookie('XSRF-TOKEN');
                const config = {
                    headers: {
                        'X-XSRF-TOKEN': decodeURIComponent(xsrfToken)
                    }
                };
                await api.delete(`/api/patients/${patientId}`, config);
                fetchPatients(searchTerm);
            } catch (error) {
                console.error("Gagal menghapus pasien. Detail Error:", error.response || error);
            }
        }
    };

    return (
        <div>
            {/* Header Halaman */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800">Manajemen Data Pasien</h1>
                    <p className="mt-1 text-slate-600">Buat, lihat, perbarui, dan hapus data pasien.</p>
                </div>
                <button 
                    onClick={() => openModal('create')}
                    className="bg-[#3E7E4C] text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-800 transition-colors duration-300 flex items-center space-x-2"
                >
                    <Plus size={18} />
                    <span>Buat Pasien</span>
                </button>
            </div>

            {/* Area Tabel */}
            <div className="bg-white rounded-lg shadow-md">
                {/* Header Tabel: Pencarian */}
                <div className="p-4 border-b">
                    <form onSubmit={handleSearch} className="relative">
                        <input 
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Cari nama pasien..."
                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E7E4C]"
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    </form>
                </div>

                {/* Tabel Pasien */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="p-4 text-left text-sm font-semibold text-slate-600">Nama</th>
                                <th className="p-4 text-left text-sm font-semibold text-slate-600">Usia</th>
                                <th className="p-4 text-left text-sm font-semibold text-slate-600">Tinggi (cm)</th>
                                <th className="p-4 text-left text-sm font-semibold text-slate-600">Berat (kg)</th>
                                <th className="p-4 text-left text-sm font-semibold text-slate-600">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr><td colSpan="5" className="text-center p-8 text-slate-500">Memuat data...</td></tr>
                            ) : patients.length > 0 ? (
                                patients.map(patient => (
                                    <tr key={patient.id} className="border-t hover:bg-slate-50">
                                        <td className="p-4 font-medium text-slate-800">{patient.name}</td>
                                        <td className="p-4 text-slate-600">{patient.age}</td>
                                        <td className="p-4 text-slate-600">{patient.height_cm}</td>
                                        <td className="p-4 text-slate-600">{patient.weight_kg}</td>
                                        <td className="p-4 flex items-center space-x-2">
                                            <button 
                                                onClick={() => openModal('edit', patient)}
                                                className="text-blue-600 hover:text-blue-800 p-1"
                                                title="Edit"
                                            >
                                                <Edit size={18} />
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(patient.id)}
                                                className="text-red-600 hover:text-red-800 p-1"
                                                title="Hapus"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan="5" className="text-center p-8 text-slate-500">Tidak ada data pasien ditemukan.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal untuk Create/Edit */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30 p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
                        <div className="p-6 border-b flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-slate-800">
                                {modalType === 'create' ? 'Buat Pasien Baru' : 'Edit Data Pasien'}
                            </h2>
                            <button onClick={closeModal} className="text-slate-500 hover:text-slate-800">
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleFormSubmit}>
                            <div className="p-6 space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap</label>
                                    <input id="name" name="name" type="text" value={formData.name} onChange={handleFormChange} required className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E7E4C]" />
                                </div>
                                <div>
                                    <label htmlFor="age" className="block text-sm font-medium text-slate-700 mb-1">Usia</label>
                                    <input id="age" name="age" type="number" value={formData.age} onChange={handleFormChange} required className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E7E4C]" />
                                </div>
                                <div>
                                    <label htmlFor="height_cm" className="block text-sm font-medium text-slate-700 mb-1">Tinggi (cm)</label>
                                    <input id="height_cm" name="height_cm" type="number" value={formData.height_cm} onChange={handleFormChange} required className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E7E4C]" />
                                </div>
                                <div>
                                    <label htmlFor="weight_kg" className="block text-sm font-medium text-slate-700 mb-1">Berat (kg)</label>
                                    <input id="weight_kg" name="weight_kg" type="number" value={formData.weight_kg} onChange={handleFormChange} required className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3E7E4C]" />
                                </div>
                            </div>
                            <div className="bg-slate-50 p-4 flex justify-end space-x-3 rounded-b-lg">
                                <button type="button" onClick={closeModal} className="bg-slate-200 text-slate-800 font-semibold py-2 px-4 rounded-lg hover:bg-slate-300">
                                    Batal
                                </button>
                                <button type="submit" className="bg-[#3E7E4C] text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-800">
                                    Simpan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PasienPage;
