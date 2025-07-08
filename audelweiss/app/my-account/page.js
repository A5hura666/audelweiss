'use client';

import { useEffect, useState } from 'react';
import AuthForm from '@/app/components/AuthForm';
import UserDetails from '@/app/components/UserDetails';

export default function MyAccount() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const res = await fetch('/api/user/me', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) {
                    throw new Error('Échec de la récupération des infos utilisateur');
                }

                const data = await res.json();
                setUser(data.user);
            } catch (err) {
                console.error(err);
                localStorage.removeItem('token');
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    if (loading) {
        return <div className="text-center my-24 text-gray-600">Chargement...</div>;
    }

    return user ? (
        <UserDetails user={user} onLogout={handleLogout} />
    ) : (
        <AuthForm onLogin={setUser} />
    );
}