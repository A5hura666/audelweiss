"use client";

import {useEffect, useState} from "react";
import UsersTable from "@/app/components/admin/UsersTable";
import OrdersTable from "@/app/components/admin/OrdersTable";
import OrderDetail from "@/app/components/admin/OrderDetail";

export default function DashboardPage() {
    const [user, setUser] = useState(null);
    const [activeTab, setActiveTab] = useState("users");
    const [users, setUsers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    // Récupération utilisateur au montage
    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log("Token récupéré :", token);
        if (!token) return;

        fetch("/api/user/me", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                if (!res.ok) throw new Error("Non autorisé");
                return res.json();
            })
            .then((data) => setUser(data.user))
            .catch(() => setUser(null));
    }, []);

    // Récupération données selon onglet et user
    useEffect(() => {
        if (!user) return;

        setLoading(true);

        if (activeTab === "users") {
            fetch("/api/admin/users", {credentials: "include",
            })
                .then((res) => res.json())
                .then((data) => setUsers(data.users || []))
                .catch(() => setUsers([]))
                .finally(() => setLoading(false));
        } else if (activeTab === "orders") {
            fetch("/api/admin/orders", {credentials: "include",
            })
                .then((res) => res.json())
                .then((data) => setOrders(data.orders || []))
                .catch(() => setOrders([]))
                .finally(() => setLoading(false));
        }
    }, [activeTab, user]);

    const handleSelectOrder = (order) => setSelectedOrder(order);
    const handleCloseDetail = () => setSelectedOrder(null);

    if (!user) {
        return <p className="text-center mt-10">Veuillez vous connecter pour accéder au dashboard.</p>;
    }

    return (
        <div className="container mx-auto p-8 min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

            <nav className="mb-8 flex space-x-4 border-b">
                <button
                    className={`pb-2 font-semibold ${
                        activeTab === "users" ? "border-b-2 border-[#E8A499]" : "text-gray-500"
                    }`}
                    onClick={() => setActiveTab("users")}
                >
                    Utilisateurs
                </button>
                <button
                    className={`pb-2 font-semibold ${
                        activeTab === "orders" ? "border-b-2 border-[#E8A499]" : "text-gray-500"
                    }`}
                    onClick={() => setActiveTab("orders")}
                >
                    Commandes
                </button>
            </nav>
            {loading && <p>Chargement...</p>}

            {!loading && activeTab === "users" && <UsersTable users={users} />}

            {!loading && activeTab === "orders" && !selectedOrder && (
                <OrdersTable orders={orders} onSelectOrder={handleSelectOrder} />
            )}

            {!loading && selectedOrder && (
                <OrderDetail order={selectedOrder} onClose={handleCloseDetail} />
            )}
        </div>
    );
}