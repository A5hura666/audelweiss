'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, Plus, Minus } from 'lucide-react';

export default function CartPage() {
    const [user, setUser] = useState(null);
    const [cart, setCart] = useState([]);
    const [hasInitialized, setHasInitialized] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            router.push('/my-account?redirect=cart');
            return;
        }

        setUser(JSON.parse(storedUser));

        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            try {
                const parsedCart = JSON.parse(storedCart);
                if (Array.isArray(parsedCart)) {
                    setCart(parsedCart);
                } else {
                    setCart([]);
                }
            } catch (e) {
                console.error("Erreur parsing du panier", e);
                setCart([]);
                localStorage.removeItem('cart');
            }
        }

        setHasInitialized(true);
    }, []);

    useEffect(() => {
        if (hasInitialized) {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }, [cart, hasInitialized]);

    const updateQuantity = (index, delta) => {
        setCart(prev => {
            const updated = [...prev];
            const newQuantity = updated[index].quantity + delta;
            if (newQuantity <= 0) {
                updated.splice(index, 1);
            } else {
                updated[index] = { ...updated[index], quantity: newQuantity };
            }
            return updated;
        });
    };

    const removeItem = (index) => {
        setCart(prev => {
            const updated = [...prev];
            updated.splice(index, 1);
            return updated;
        });
    };

    const handleCheckout = () => {
        alert('Commande confirmée !');
        // setCart([]);
        // localStorage.removeItem('cart');
        // router.push('/paiement');
    };

    if (!user) return null;

    const total = cart.reduce((sum, item) => sum + item.productPrice * item.quantity, 0);

    return (
        <div className="max-w-5xl mx-auto px-6 py-12">
            <h1 className="text-4xl font-bold mb-10 text-center">Votre panier</h1>

            {cart.length === 0 ? (
                <p className="text-gray-600 text-center text-lg">Votre panier est vide.</p>
            ) : (
                <>
                    <div className="space-y-4">
                        {cart.map((item, index) => (
                            <div
                                key={index}
                                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg shadow-sm gap-4"
                            >
                                <div className="flex-1">
                                    <p className="font-semibold text-lg">{item.productName}</p>
                                    <p className="text-sm text-gray-500">
                                        Taille : {item.selectedFilters?.Taille} | Couleur : {item.color}
                                    </p>
                                </div>

                                <div className="flex items-center gap-3 whitespace-nowrap">
                                    <button
                                        onClick={() => updateQuantity(index, -1)}
                                        className="p-1 bg-gray-200 rounded hover:bg-gray-300"
                                    >
                                        <Minus size={16} />
                                    </button>
                                    <span className="min-w-[24px] text-center">{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(index, 1)}
                                        className="p-1 bg-gray-200 rounded hover:bg-gray-300"
                                    >
                                        <Plus size={16} />
                                    </button>
                                </div>

                                <div className="text-gray-600 text-sm min-w-[120px] text-center">
                                    <div>Prix unitaire</div>
                                    <div className="font-semibold text-[#E8A499]">{item.productPrice.toFixed(2)} €</div>
                                </div>

                                <div className="text-[#E8A499] font-bold min-w-[80px] text-right">
                                    {(item.productPrice * item.quantity).toFixed(2)} €
                                </div>

                                <button
                                    onClick={() => removeItem(index)}
                                    className="text-red-600 hover:text-red-700"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="mt-10 flex flex-col sm:flex-row justify-between items-center gap-6">
                        <p className="text-2xl font-bold">
                            Total : <span className="text-[#E8A499]">{total.toFixed(2)} €</span>
                        </p>
                        <button
                            onClick={handleCheckout}
                            className="px-6 py-3 bg-[#E8A499] text-white rounded-lg shadow hover:bg-[#d89589] transition font-medium"
                        >
                            Commander
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}