'use client';

import { useState, useEffect } from 'react';
import {
    Clock,
    CreditCard,
    Truck,
    CheckCircle,
    XCircle
} from 'lucide-react';

export default function OrderHistory() {
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
                    return;
                }
                const res = await fetch('/api/orders', {
                    headers: { Authorization: `Bearer ${token}` },
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

    const renderStatusBadge = (status) => {
        const base = 'inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium';

        switch (status) {
            case 'PENDING':
                return <span className={`${base} bg-yellow-100 text-yellow-800`}><Clock size={14} /> En attente</span>;
            case 'PAID':
                return <span className={`${base} bg-blue-100 text-blue-800`}><CreditCard size={14} /> Payée</span>;
            case 'SHIPPED':
                return <span className={`${base} bg-indigo-100 text-indigo-800`}><Truck size={14} /> Expédiée</span>;
            case 'DELIVERED':
                return <span className={`${base} bg-green-100 text-green-800`}><CheckCircle size={14} /> Livrée</span>;
            case 'CANCELED':
                return <span className={`${base} bg-red-100 text-red-800`}><XCircle size={14} /> Annulée</span>;
            default:
                return <span className={`${base} bg-gray-100 text-gray-800`}>{status}</span>;
        }
    };

    return (
        <div className="mt-12 text-gray-700">
            <h3 className="text-2xl font-semibold mb-4">Historique des commandes</h3>

            {loadingOrders && <p>Chargement des commandes...</p>}
            {ordersError && <p className="text-red-600">{ordersError}</p>}
            {!loadingOrders && orders.length === 0 && <p>Vous n'avez pas encore passé de commande.</p>}

            <ul>
                {orders.map((order) => (
                    <li key={order.id} className="border p-4 mb-4 rounded shadow-sm bg-white">
                        <div className="flex justify-between items-center mb-2">
                            <p className="font-semibold">Commande #{order.id}</p>
                            {renderStatusBadge(order.status)}
                        </div>
                        <p className="text-sm text-gray-600">Date : {new Date(order.createdAt).toLocaleDateString()}</p>
                        <p className="text-sm text-gray-600 mb-2">Total : {(order.total).toFixed(2)} €</p>
                        <details className="mt-2">
                            <summary className="cursor-pointer text-blue-600">Articles</summary>
                            <ul className="pl-4 list-disc mt-1 text-sm">
                                {order.items.map((item) => (
                                    <li key={item.id}>
                                        {item.productName} – {item.quantity} x {(item.productPrice).toFixed(2)} €
                                    </li>
                                ))}
                            </ul>
                        </details>
                    </li>
                ))}
            </ul>
        </div>
    );
}
