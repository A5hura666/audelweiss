'use client';

import { useEffect, useState } from 'react';
import AuthForm from '@/app/components/AuthForm';
import UserDetails from '@/app/components/UserDetails';

export default function MyAccount() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const stored = localStorage.getItem('user');
        if (stored) setUser(JSON.parse(stored));
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    return user ? (
        <UserDetails user={user} onLogout={handleLogout} />
    ) : (
        <AuthForm onLogin={setUser} />
    );
}
