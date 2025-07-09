'use client';

import { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {
    Clock,
    CreditCard,
    Truck,
    CheckCircle,
    XCircle,
    Download
} from 'lucide-react';

// … ton code existant …

export default function OrderHistory() {
    const [orders, setOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(false);
    const [ordersError, setOrdersError] = useState('');
    const [user , setUser] = useState(null);

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
                const userData = localStorage.getItem('user');
                setUser(JSON.parse(userData));
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

    const generatePDF = async (order) => {
        const doc = new jsPDF();

        // Charger le logo depuis le dossier public et le convertir en base64
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

        // Définir opacité à 0.75
        doc.setGState(new doc.GState({ opacity: 0.20 }));

        // Ajouter l'image (x, y, width, height)
        doc.addImage(logoBase64, 'PNG', 14, 60, 150, 40);

        // Remettre l'opacité à 1 pour le contenu texte
        doc.setGState(new doc.GState({ opacity: 1 }));

        // Titre
        doc.setFontSize(18);
        doc.text(`Facture Commande #${order.id}`, 14, 20);

        // Infos
        doc.setFontSize(12);
        doc.text(`Date : ${new Date(order.createdAt).toLocaleDateString()}`, 14, 30);

        // Information User
        doc.text(`Prénom : ${user.firstName}`, 24, 70);
        doc.text(`Nom : ${user.lastName}`, 24, 80);
        doc.text(`Numéro de téléphone : ${user.phone}`, 24, 90);
        doc.text(`Email : ${user.email}`, 24, 100);

        // Adresse livraison
        doc.text('Adresse de livraison :', 120, 20);
        doc.text(`${order.shippingFirstName || ''} ${order.shippingLastName || ''}`, 120, 30);
        doc.text(`${order.shippingLine1}`, 120, 40);
        if (order.shippingLine2){
            doc.text(`${order.shippingLine2}`, 120, 50);
            doc.text(`${order.shippingPostalCode} ${order.shippingCity}, ${order.shippingCountry}`, 120, 60);
        } else{
            doc.text(`${order.shippingPostalCode} ${order.shippingCity}, ${order.shippingCountry}`, 120, 50);
        }

        // Adresse facturation
        doc.text('Adresse de facturation :', 120, 70);
        doc.text(`${order.billingFirstName || ''} ${order.billingLastName || ''}`, 120, 80);
        doc.text(`${order.billingLine1}`, 120, 90);
        if (order.billingLine2){
            doc.text(`${order.billingLine2}`, 120, 100);
            doc.text(`${order.billingPostalCode} ${order.billingCity}, ${order.billingCountry}`, 120, 110);
        }else{
            doc.text(`${order.billingPostalCode} ${order.billingCity}, ${order.billingCountry}`, 120, 100);
        }

        // Tableau articles
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

// Récupérer la position Y après le tableau
        const finalY = doc.lastAutoTable.finalY || 100;

// Afficher le total juste après
        doc.setFontSize(12);
        doc.text(`Total : ${order.total.toFixed(2)} €`, 14, finalY + 10);

        // Sauvegarder le PDF
        doc.save(`commande_${order.id}.pdf`);
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
                        <p className="text-sm text-gray-600 mb-2">Total : {order.total.toFixed(2)} €</p>
                        <details className="mt-2">
                            <summary className="cursor-pointer text-blue-600">Articles</summary>
                            <ul className="pl-4 list-disc mt-1 text-sm">
                                {order.items.map((item) => (
                                    <li key={item.id}>
                                        {item.productName} – {item.quantity} x {item.productPrice.toFixed(2)} €
                                    </li>
                                ))}
                            </ul>
                        </details>
                        <button
                            onClick={() => generatePDF(order)}
                            className="mt-3 inline-flex items-center gap-1 text-sm text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
                        >
                            <Download size={14} /> Télécharger PDF
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
