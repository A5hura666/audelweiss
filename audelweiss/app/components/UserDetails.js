'use client';

import { useState, useEffect } from 'react';
import InputField from './InputField';
import ChangePasswordModal from './ChangePasswordModal';
import OrderHistory from './OrderHistory';
import WishList from "@/app/components/WishList";

export default function UserDetails({ user, onLogout }) {
    const [sameAddress, setSameAddress] = useState(false);
    const [form, setForm] = useState({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        phone: user.phone || '',
        shippingAddress: user.shippingAddress || {
            firstName: '',
            lastName: '',
            line1: '',
            line2: '',
            postalCode: '',
            city: '',
            country: '',
        },
        billingAddress: user.billingAddress || {
            firstName: '',
            lastName: '',
            line1: '',
            line2: '',
            postalCode: '',
            city: '',
            country: '',
        },
    });
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [activeTab, setActiveTab] = useState('orders'); // 'orders' ou 'wishlist'

    const [orders, setOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(false);
    const [ordersError, setOrdersError] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            setLoadingOrders(true);
            setOrdersError('');
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setOrdersError('Utilisateur non authentifié');
                    setLoadingOrders(false);
                    return;
                }
                const res = await fetch('/api/orders', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!res.ok) {
                    const data = await res.json();
                    throw new Error(data.error || 'Erreur lors du chargement des commandes');
                }
                const data = await res.json();
                setOrders(data.orders || []);
            } catch (err) {
                setOrdersError(err.message);
            } finally {
                setLoadingOrders(false);
            }
        };

        fetchOrders();
    }, []);


    useEffect(() => {
        if (sameAddress) {
            setForm((prev) => ({
                ...prev,
                billingAddress: { ...prev.shippingAddress },
            }));
        }
    }, [sameAddress, form.shippingAddress]);

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
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
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

            <form onSubmit={handleUpdate} className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700">
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
                    onChange={() => {}}
                    disabled
                />

                <h3 className="text-xl font-semibold col-span-2 mt-8">Adresse de livraison</h3>
                {["firstName", "lastName", "line1", "line2", "postalCode", "city", "country"].map((field) => (
                    <InputField
                        key={`shipping-${field}`}
                        type="text"
                        placeholder={field}
                        value={form.shippingAddress[field]}
                        onChange={(e) =>
                            setForm((prev) => ({
                                ...prev,
                                shippingAddress: {
                                    ...prev.shippingAddress,
                                    [field]: e.target.value,
                                },
                            }))
                        }
                        required={["line1", "postalCode", "city", "country"].includes(field)}
                    />
                ))}

                <div className="col-span-2 flex items-center gap-3">
                    <input
                        type="checkbox"
                        id="sameAddress"
                        checked={sameAddress}
                        onChange={(e) => setSameAddress(e.target.checked)}
                        className="w-4 h-4"
                    />
                    <label htmlFor="sameAddress" className="text-sm text-gray-700">
                        Utiliser la même adresse pour la facturation
                    </label>
                </div>

                {!sameAddress && (
                    <>
                        <h3 className="text-xl font-semibold col-span-2 mt-8">Adresse de facturation</h3>
                        {["firstName", "lastName", "line1", "line2", "postalCode", "city", "country"].map((field) => (
                            <InputField
                                key={`billing-${field}`}
                                type="text"
                                placeholder={field}
                                value={form.billingAddress[field]}
                                onChange={(e) =>
                                    setForm((prev) => ({
                                        ...prev,
                                        billingAddress: {
                                            ...prev.billingAddress,
                                            [field]: e.target.value,
                                        },
                                    }))
                                }
                                required={["line1", "postalCode", "city", "country"].includes(field)}
                            />
                        ))}
                    </>
                )}

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
            <div className="flex gap-4 pb-2 mb-6 justify-center">
                <button
                    onClick={() => setActiveTab('orders')}
                    className={`px-3 py-1 rounded-t ${activeTab === 'orders' ? 'bg-[#E8A499] text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                    Mes commandes
                </button>
                <button
                    onClick={() => setActiveTab('wishlist')}
                    className={`px-3 py-1 rounded-t ${activeTab === 'wishlist' ? 'bg-[#E8A499] text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                    Ma wishlist
                </button>
            </div>
            <div className="mt-12">
                <div className="mt-8">
                    {activeTab === 'orders' && <OrderHistory />}
                    {activeTab === 'wishlist' && <WishList />}
                </div>
            </div>

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
