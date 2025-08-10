import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [roles, setRoles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkLoginStatus = async () => {
            // --- LANGKAH DEBUGGING ---
            console.log("Mencoba memeriksa status login...");
            console.log("Cookie yang terlihat oleh browser:", document.cookie);
            // --- AKHIR DEBUGGING ---

            try {
                const response = await api.get('/api/user');
                
                // --- LANGKAH DEBUGGING ---
                console.log("Berhasil! Jawaban dari /api/user:", response.data);
                // --- AKHIR DEBUGGING ---

                setUser(response.data);
                setRoles(response.data.roles);
            } catch (error) {
                // --- LANGKAH DEBUGGING ---
                console.error("Gagal memeriksa status login. Error:", error.response || error.message);
                // --- AKHIR DEBUGGING ---
            } finally {
                setIsLoading(false);
            }
        };

        checkLoginStatus();
    }, []);

    const login = (userData, userRoles) => {
        setUser(userData);
        setRoles(userRoles);
    };

    const logout = async () => {
        setUser(null);
        setRoles([]);
    };

    const isAuthenticated = !!user;

    if (isLoading) {
        return <div>Memuat aplikasi...</div>;
    }

    return (
        <AuthContext.Provider value={{ user, roles, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
