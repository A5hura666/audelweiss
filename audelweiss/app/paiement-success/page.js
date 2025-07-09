'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {CheckCircle} from "lucide-react";

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
                window.location.href = '/my-account';
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
                if (!res.ok) {
                    throw new Error(data.error || 'Erreur création commande');
                }

                localStorage.removeItem('cart');
            } catch (error) {
                alert('Erreur lors de la création de la commande : ' + error.message);
            }
        };

        createOrderFromSession();
    }, [router]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[600px] bg-white p-8">
            <CheckCircle className="text-green-600" size={72} />
            <h1 className="mt-6 text-3xl font-extrabold text-green-800">
                Merci pour votre commande !
            </h1>
            <p className="mt-3 text-lg text-green-700">
                Votre paiement a bien été pris en compte.
            </p>
            <p className="mt-4 text-sm text-green-600 max-w-md text-center">
                Vous recevrez un email de confirmation sous peu avec les détails de votre commande.
            </p>
        </div>
    );
}