'use client';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Download } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function OrderDetail({ order, onClose }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) setUser(JSON.parse(userData));
    }, []);

    const generatePDF = async () => {
        const doc = new jsPDF();

        const loadImageAsBase64 = (url) => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.crossOrigin = "anonymous";
                img.onload = () => {
                    const canvas = document.createElement("canvas");
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const ctx = canvas.getContext("2d");
                    ctx.drawImage(img, 0, 0);
                    resolve(canvas.toDataURL("image/png"));
                };
                img.onerror = reject;
                img.src = url;
            });
        };

        const logoBase64 = await loadImageAsBase64("http://ayun.myddns.me:5000/uploads/logo_wide_00e3f30449.svg");

        doc.setGState(new doc.GState({ opacity: 0.2 }));
        doc.addImage(logoBase64, 'PNG', 14, 60, 150, 40);
        doc.setGState(new doc.GState({ opacity: 1 }));

        doc.setFontSize(18);
        doc.text(`Facture Commande #${order.id}`, 14, 20);
        doc.setFontSize(12);
        doc.text(`Date : ${new Date(order.createdAt).toLocaleDateString()}`, 14, 30);

        if (user) {
            doc.text(`Prénom : ${user.firstName}`, 24, 70);
            doc.text(`Nom : ${user.lastName}`, 24, 80);
            doc.text(`Téléphone : ${user.phone || ''}`, 24, 90);
            doc.text(`Email : ${user.email}`, 24, 100);
        }

        // Adresse livraison
        doc.text('Adresse de livraison :', 120, 20);
        doc.text(`${order.shippingFirstName || ''} ${order.shippingLastName || ''}`, 120, 30);
        doc.text(`${order.shippingLine1}`, 120, 40);
        if (order.shippingLine2) {
            doc.text(`${order.shippingLine2}`, 120, 50);
            doc.text(`${order.shippingPostalCode} ${order.shippingCity}, ${order.shippingCountry}`, 120, 60);
        } else {
            doc.text(`${order.shippingPostalCode} ${order.shippingCity}, ${order.shippingCountry}`, 120, 50);
        }

        // Adresse facturation
        doc.text('Adresse de facturation :', 120, 70);
        doc.text(`${order.billingFirstName || ''} ${order.billingLastName || ''}`, 120, 80);
        doc.text(`${order.billingLine1}`, 120, 90);
        if (order.billingLine2) {
            doc.text(`${order.billingLine2}`, 120, 100);
            doc.text(`${order.billingPostalCode} ${order.billingCity}, ${order.billingCountry}`, 120, 110);
        } else {
            doc.text(`${order.billingPostalCode} ${order.billingCity}, ${order.billingCountry}`, 120, 100);
        }

        autoTable(doc, {
            startY: 120,
            headStyles: {
                fillColor: [232, 164, 153],
                textColor: 255,
            },
            styles: {
                fillColor: [255, 255, 255],
                textColor: 50,
                lineColor: [200, 200, 200],
                lineWidth: 0.2,
            },
            alternateRowStyles: {
                fillColor: [245, 245, 245],
            },
            head: [['Produit', 'Quantité', 'Prix unitaire (€)', 'Total (€)']],
            body: order.items.map((item) => [
                item.productName,
                item.quantity,
                item.productPrice.toFixed(2),
                (item.productPrice * item.quantity).toFixed(2),
            ]),
        });

        const finalY = doc.lastAutoTable.finalY || 100;
        doc.setFontSize(12);
        doc.text(`Total : ${order.total.toFixed(2)} €`, 14, finalY + 10);

        doc.save(`commande_${order.id}.pdf`);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            {/* Bouton retour */}
            <button
                onClick={onClose}
                className="inline-flex items-center text-sm mb-6 text-[#E08B7A] hover:underline"
            >
                ← Retour aux commandes
            </button>

            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Détail de la commande <span className="text-[#E08B7A]">#{order.id}</span>
            </h2>

            {/* Infos principales */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div>
                    <p className="text-sm text-gray-500">Utilisateur</p>
                    <p className="font-medium text-gray-700">
                        {order.user?.firstName} {order.user?.lastName} ({order.user?.email})
                    </p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-medium text-gray-700">
                        {new Date(order.createdAt).toLocaleString()}
                    </p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">Statut</p>
                    <p className="font-semibold text-[#E08B7A]">{order.status}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="font-bold text-gray-800">{order.total.toFixed(2)} €</p>
                </div>
            </div>

            {/* Adresses */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Livraison */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Adresse de livraison</h3>
                    <div className="text-sm text-gray-600 space-y-1">
                        <p>{order.shippingFirstName} {order.shippingLastName}</p>
                        <p>{order.shippingLine1}</p>
                        {order.shippingLine2 && <p>{order.shippingLine2}</p>}
                        <p>{order.shippingPostalCode} {order.shippingCity}</p>
                        <p>{order.shippingCountry}</p>
                    </div>
                </div>

                {/* Facturation */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Adresse de facturation</h3>
                    <div className="text-sm text-gray-600 space-y-1">
                        <p>{order.billingFirstName} {order.billingLastName}</p>
                        <p>{order.billingLine1}</p>
                        {order.billingLine2 && <p>{order.billingLine2}</p>}
                        <p>{order.billingPostalCode} {order.billingCity}</p>
                        <p>{order.billingCountry}</p>
                    </div>
                </div>
            </div>

            {/* Produits */}
            <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Articles commandés</h3>
                <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
                    <table className="w-full min-w-[600px] text-sm text-gray-700">
                        <thead className="bg-[#f7e9e5] text-gray-800 uppercase text-left text-xs font-semibold tracking-wider">
                        <tr>
                            <th className="p-3 border-b">Produit</th>
                            <th className="p-3 border-b">Quantité</th>
                            <th className="p-3 border-b text-right">Prix unitaire (€)</th>
                            <th className="p-3 border-b text-right">Total (€)</th>
                        </tr>
                        </thead>
                        <tbody>
                        {order.items?.map((item, i) => (
                            <tr
                                key={i}
                                className={`${i % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-[#fff2ef] transition`}
                            >
                                <td className="p-3 border-b">{item.productName}</td>
                                <td className="p-3 border-b">{item.quantity}</td>
                                <td className="p-3 border-b text-right">{item.productPrice.toFixed(2)}</td>
                                <td className="p-3 border-b text-right">
                                    {(item.productPrice * item.quantity).toFixed(2)}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Téléchargement facture */}
            <div className="mt-8">
                <button
                    onClick={generatePDF}
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-[#E08B7A] hover:bg-[#d17665] text-white font-medium rounded transition"
                >
                    <Download size={16} /> Télécharger la facture (PDF)
                </button>
            </div>
        </div>
    );
}
