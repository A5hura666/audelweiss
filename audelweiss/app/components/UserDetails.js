'use client';

import { useState } from 'react';
import InputField from './InputField';
import ChangePasswordModal from './ChangePasswordModal';

export default function UserDetails({ user, onLogout }) {
    const [form, setForm] = useState({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        phone: user.phone || '',
    });
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setSuccess('');
        setError('');

        if (!form.firstName || !form.lastName || !form.phone) {
            setError('Tous les champs sont requis');
            return;
        }
        if (!/^\+?\d{7,15}$/.test(form.phone)) {
            setError('Numéro de téléphone invalide');
            return;
        }

        try {
            const res = await fetch('/api/user/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(form),
            });
            const data = await res.json();

            if (res.ok) {
                const updatedUser = { ...user, ...form };
                localStorage.setItem('user', JSON.stringify(updatedUser));
                setSuccess('Informations mises à jour');
            } else {
                setError(data.error || 'Une erreur est survenue');
            }
        } catch {
            setError('Erreur réseau');
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-12 p-6 bg-white rounded-lg shadow space-y-6 my-24">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Modifier mes informations</h2>

            <form onSubmit={handleUpdate} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <InputField
                    type="text"
                    placeholder="Prénom"
                    value={form.firstName}
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                    required
                />
                <InputField
                    type="text"
                    placeholder="Nom"
                    value={form.lastName}
                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                    required
                />
                <InputField
                    type="tel"
                    placeholder="Téléphone"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    required
                />
                <InputField
                    type="email"
                    placeholder="Email"
                    value={user.email}
                    disabled
                />

                {error && <p className="text-red-600 text-sm col-span-2">{error}</p>}
                {success && <p className="text-green-600 text-sm col-span-2">{success}</p>}

                <div className="col-span-2 flex items-center justify-between mt-4">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-[#E8A499] text-white rounded hover:bg-[#d89589] transition"
                    >
                        Sauvegarder
                    </button>
                    <button
                        type="button"
                        onClick={() => setShowModal(true)}
                        className="text-sm text-[#E8A499] hover:underline focus:outline-none focus:ring-2 focus:ring-[#E8A499] rounded"
                    >
                        Changer le mot de passe
                    </button>
                </div>
            </form>

            <div className="text-right mt-6">
                <button
                    onClick={onLogout}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                    Se déconnecter
                </button>
            </div>

            {showModal && <ChangePasswordModal onClose={() => setShowModal(false)} />}
        </div>
    );
}
