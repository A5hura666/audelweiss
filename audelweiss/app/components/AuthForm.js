'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import InputField from './InputField';

export default function AuthForm({ onLogin }) {
    const [form, setForm] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phone: '',
    });
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState('');
    const [redirectMessage, setRedirectMessage] = useState(false);

    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        const redirectParam = searchParams.get('redirect');
        if (redirectParam === 'cart') {
            setRedirectMessage(true);
        }
    }, [searchParams]);

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
            onLogin(data.user);

            const redirectParam = searchParams.get('redirect');
            if (redirectParam === 'cart') {
                router.push('/cart');
            }
        } else {
            setError(data.error || 'Une erreur est survenue');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-lg shadow my-24">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                {isLogin ? 'Connexion' : 'Créer un compte'}
            </h2>

            {redirectMessage && (
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 text-sm p-3 mb-4 rounded">
                    Connectez-vous pour accéder à votre panier. Vous serez redirigé automatiquement après la connexion.
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                    <>
                        <InputField
                            type="text"
                            placeholder="Prénom"
                            value={form.firstName}
                            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                        />
                        <InputField
                            type="text"
                            placeholder="Nom"
                            value={form.lastName}
                            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                        />
                        <InputField
                            type="tel"
                            placeholder="Téléphone"
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        />
                    </>
                )}
                <InputField
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <InputField
                    type="password"
                    placeholder="Mot de passe"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
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
