'use client';

import { useEffect, useRef, useState } from 'react';
import { X, MapPin, User, Home, Mail, Flag } from 'lucide-react';

export default function AddressModal({ shippingAddress, billingAddress, onClose, onConfirm }) {
    const modalRef = useRef(null);
    const [useAddresses, setUseAddresses] = useState(
        !!shippingAddress?.firstName && !!billingAddress?.firstName
    );

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleEsc);
        return () => document.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    const handleClickOutside = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            onClose();
        }
    };

    const handleConfirm = () => {
        onConfirm({
            shippingAddress: useAddresses ? shippingAddress : null,
            billingAddress: useAddresses ? billingAddress : null,
        });
    };

    const renderAddress = (address) => (
        <address className="not-italic text-gray-700 ml-6 mt-2 space-y-1">
            <p className="flex items-center gap-2">
                <User size={16} /> {address.firstName} {address.lastName}
            </p>
            <p className="flex items-center gap-2">
                <Home size={16} /> {address.line1}
            </p>
            {address.line2 && (
                <p className="flex items-center gap-2">
                    <Home size={16} /> {address.line2}
                </p>
            )}
            <p className="flex items-center gap-2">
                <Mail size={16} /> {address.postalCode} {address.city}
            </p>
            <p className="flex items-center gap-2">
                <Flag size={16} /> {address.country}
            </p>
        </address>
    );

    const hasBothAddresses = !!shippingAddress?.firstName && !!billingAddress?.firstName;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={handleClickOutside}
            aria-modal="true"
            role="dialog"
            aria-labelledby="address-modal-title"
        >
            <div
                ref={modalRef}
                className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6 relative animate-fade-in max-h-[80vh] overflow-auto"
            >
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition"
                    aria-label="Fermer"
                >
                    <X size={24} />
                </button>

                <h2
                    id="address-modal-title"
                    className="text-xl font-semibold text-gray-800 mb-6 text-center"
                >
                    Choisissez les adresses à utiliser
                </h2>

                {hasBothAddresses ? (
                    <>
                        <label className="flex items-center gap-3 cursor-pointer mb-4">
                            <input
                                type="checkbox"
                                checked={useAddresses}
                                onChange={() => setUseAddresses(!useAddresses)}
                            />
                            <span className="text-lg font-medium flex items-center gap-2">
                                <MapPin size={20} /> Utiliser l’adresse de livraison et de facturation
                            </span>
                        </label>

                        <div className="mb-4">
                            <h3 className="font-semibold text-gray-700">Adresse de livraison</h3>
                            {renderAddress(shippingAddress)}
                        </div>

                        <div>
                            <h3 className="font-semibold text-gray-700">Adresse de facturation</h3>
                            {renderAddress(billingAddress)}
                        </div>
                    </>
                ) : (
                    <p className="text-gray-500 italic mt-6 text-center max-w-md mx-auto">
                        Aucune adresse de livraison et/ou facturation renseignée.<br />
                        Si vous continuez, vous devrez les renseigner lors du paiement.
                    </p>
                )}

                <div className="mt-6 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded border border-gray-300 text-gray-600 hover:bg-gray-50 transition"
                    >
                        Annuler
                    </button>
                    <button
                        onClick={handleConfirm}
                        className={`px-4 py-2 rounded text-white transition bg-[#E8A499] hover:bg-[#d89589]`}
                    >
                        Confirmer
                    </button>
                </div>
            </div>
        </div>
    );
}
