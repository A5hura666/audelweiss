'use client';

import { useState, useEffect } from 'react';
import { getStrapiCall } from "@/app/lib/utils";
import { Heart } from "lucide-react";
import Link from "next/link";

export default function WishList() {
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [productList, setProductList] = useState([]);

    const fetchWishlist = async () => {
        setLoading(true);
        setError('');
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('Utilisateur non authentifié');
                setLoading(false);
                return;
            }

            const wishListRes = await fetch("/api/wishList", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!wishListRes.ok) {
                const data = await wishListRes.json();
                throw new Error(data.error || 'Erreur lors du chargement de la wishlist');
            }

            const data = await wishListRes.json();
            const wishlistItems = data.wishList || [];
            setWishlist(wishlistItems);

            // Récupération des produits en parallèle
            const productPromises = wishlistItems.map((product) =>
                fetch(
                    getStrapiCall(`/api/product-article-cards?filters[documentId][$eq]=${product.productId}&populate=productImages`)
                ).then((res) => res.json())
            );

            const productDataArray = await Promise.all(productPromises);

            const products = productDataArray
                .map((res) => res.data?.[0])
                .filter(Boolean);

            setProductList(products);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWishlist();
    }, []);

    const deleteProductToWishlist = async (productId) => {
        const res = await fetch("/api/wishList", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                productId,
                userId: JSON.parse(localStorage.getItem("user")).id,
            }),
        });

        if (res.ok) {
            // Relancer le fetch après suppression
            await fetchWishlist();
        } else {
            const data = await res.json();
            setError(data.error || 'Erreur lors de la suppression');
        }
    };

    const slugify = (str) =>
        str
            .toLowerCase()
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)+/g, "");

    return (
        <div className="mt-12">
            <h3 className="text-2xl font-semibold mb-6">Ma Wishlist</h3>

            {loading && <p>Chargement...</p>}
            {error && <p className="text-red-600">{error}</p>}
            {!loading && productList.length === 0 && <p>Votre wishlist est vide.</p>}

            <div className="flex overflow-x-auto gap-4 pb-4">
                {productList.map((product) => {
                    const imgUrl = "http://ayun.myddns.me:5000" + product.productImages[0]?.url;
                    const productName = product.productName;
                    const   category = product.productCategory;
                    const price = product.price
                        ? `${product.price} €`
                        : `${product.productChildPrice} € - ${product.productAdultPrice} €`;
                    const subCategory = product.subCategory || '';

                    return (

                        <div
                            key={product.id}
                            className="min-w-[240px] bg-white border rounded-lg shadow p-3 flex flex-col"
                        >
                            <img
                                src={imgUrl}
                                alt={productName}
                                className="h-40 w-full object-cover rounded mb-3"
                            />
                            <div className="flex-1">
                                <h4 className="font-semibold text-lg text-gray-800 mb-1">{productName}</h4>
                                <p className="text-sm text-gray-500 mb-2">{category}</p>
                                <p className="font-medium text-gray-700 mb-3">{price}</p>
                            </div>
                            <button
                                onClick={() => deleteProductToWishlist(product.documentId)}
                                className="flex items-center gap-2 text-[#E8A499] hover:text-[#d28a7e] transition text-sm"
                            >
                                Retirer
                            </button>
                            <Link
                                href={`/shop/${category}/${subCategory}${productName ? `/${slugify(productName)}` : ""}`}
                                className="w-full block bg-black text-white text-sm py-2 hover:bg-[#ff6187] transition text-center"
                                onClick={() => localStorage.setItem("selectedProductId", product.documentId)}
                            >
                                Voir le produit
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
