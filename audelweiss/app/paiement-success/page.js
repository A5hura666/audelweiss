'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PaymentSuccess() {
    const router = useRouter();

    useEffect(() => {
        if (!router) return;

        const params = new URLSearchParams(window.location.search);
        const sessionId = params.get('session_id');
        if (!sessionId) return;

        const createOrderFromSession = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('Utilisateur non connecté');
                return;
            }

            try {
                const res = await fetch('/api/orders/create-from-session', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ sessionId }),
                });

                const data = await res.json();
                if (!res.ok) throw new Error(data.error || 'Erreur création commande');

                localStorage.removeItem('cart');
            } catch (error) {
                alert('Erreur lors de la création de la commande : ' + error.message);
            }
        };

        createOrderFromSession();
    }, [router]);

    return (
        <div className="p-10 text-center">
            <h1 className="text-2xl font-bold">Merci pour votre commande !</h1>
            <p>Votre paiement a bien été pris en compte.</p>
        </div>
    );
}
