'use client';

import { useEffect, useState } from 'react';

export default function MyAccount() {
    const [user, setUser] = useState(null);
    const [form, setForm] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phone: '',
    });
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const stored = localStorage.getItem('user');
        if (stored) setUser(JSON.parse(stored));
    }, []);

    function validateForm() {
        if (!form.email || !form.password) {
            setError('Email et mot de passe requis');
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(form.email)) {
            setError('Email invalide');
            return false;
        }
        if (!isLogin) {
            if (!form.firstName || !form.lastName || !form.phone) {
                setError('Tous les champs sont requis');
                return false;
            }
            if (form.password.length < 6) {
                setError('Le mot de passe doit contenir au moins 6 caractères');
                return false;
            }
            if (!/^\+?\d{7,15}$/.test(form.phone)) {
                setError('Numéro de téléphone invalide');
                return false;
            }
        }
        setError('');
        return true;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';

        const res = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        });

        const data = await res.json();

        if (data.token) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            setUser(data.user);
        } else {
            setError(data.error || 'Une erreur est survenue');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    if (user) {
        return (
            <div className="max-w-xl mx-auto mt-12 p-6 bg-white rounded-lg shadow">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Bienvenue, {user.firstName} {user.lastName}
                </h2>
                <p className="text-gray-600 mb-2"><strong>Email :</strong> {user.email}</p>
                <p className="text-gray-600 mb-2"><strong>Téléphone :</strong> {user.phone}</p>
                <button
                    onClick={handleLogout}
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                    Se déconnecter
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-lg shadow">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {isLogin ? 'Connexion' : 'Créer un compte'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                    <>
                        <input
                            type="text"
                            placeholder="Prénom"
                            value={form.firstName}
                            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#E8A499]"
                        />
                        <input
                            type="text"
                            placeholder="Nom"
                            value={form.lastName}
                            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#E8A499]"
                        />
                        <input
                            type="tel"
                            placeholder="Téléphone"
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#E8A499]"
                        />
                    </>
                )}
                <input
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#E8A499]"
                />
                <input
                    type="password"
                    placeholder="Mot de passe"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#E8A499]"
                />
                {error && <p className="text-red-600 text-sm">{error}</p>}
                <button
                    type="submit"
                    className="w-full px-4 py-2 bg-[#E8A499] text-white font-semibold rounded hover:bg-[#d89589] transition"
                >
                    {isLogin ? 'Se connecter' : 'Créer un compte'}
                </button>
            </form>
            <div className="mt-4 text-center">
                <button
                    onClick={() => {
                        setError('');
                        setIsLogin(!isLogin);
                    }}
                    className="text-sm text-[#E8A499] hover:underline"
                >
                    {isLogin ? 'Créer un compte' : 'Déjà inscrit ? Connexion'}
                </button>
            </div>
        </div>
    );
}
