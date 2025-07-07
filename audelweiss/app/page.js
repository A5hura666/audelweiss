"use client";

import {useEffect, useState} from "react";
import HeroSection from "./components/HeroSection";
import UspSection from "./components/UspSection";
import CategoriesSection from "./components/CategoriesSection";
import ProductsCarousel from "./components/ProductsCarousel";
import * as React from "react";

export default function Home() {
    const [pageData, setPageData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fonction pour récupérer les données depuis Strapi
    const fetchPageData = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://ayun.myddns.me:5000/api/home-page?populate[sections]=*&populate[sections][on][layout.usp-section][populate][items][populate]=*&populate[sections][on][layout.hero][populate]=*&populate[sections][on][layout.products-carousel][populate][product_articles][populate]=*&populate[sections][on][layout.categories-section][populate][categories][populate]=*');
            
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }
            
            const data = await response.json();
            setPageData(data.data);
            setError(null);
        } catch (err) {
            console.error('Erreur lors du chargement des données:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPageData();
    }, []);

    // Affichage pendant le chargement
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F6B99C] mx-auto mb-4"></div>
                    <p className="text-gray-600">Chargement en cours...</p>
                </div>
            </div>
        );
    }

    // Affichage en cas d'erreur
    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <p className="text-red-600 mb-4">Erreur lors du chargement: {error}</p>
                    <button 
                        onClick={fetchPageData}
                        className="px-4 py-2 bg-[#F6B99C] text-white rounded hover:bg-[#FF6187] transition"
                    >
                        Réessayer
                    </button>
                </div>
            </div>
        );
    }

    // Si pas de données, afficher un message
    if (!pageData || !pageData.sections) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-gray-600">Aucune donnée disponible</p>
            </div>
        );
    }

    const sections = pageData.sections || [];

    // Récupération des sections par type
    const heroSection = sections.find(section => section.__component === 'layout.hero');
    const uspSection = sections.find(section => section.__component === 'layout.usp-section');
    const categoriesSection = sections.find(section => section.__component === 'layout.categories-section');
    const productsSection = sections.find(section => section.__component === 'layout.products-carousel');

    return (
        <div>
            {/* Hero Section */}
            <HeroSection heroData={heroSection} />

            {/* USP Section */}
            <UspSection uspData={uspSection} />

            {/* Categories Section */}
            <CategoriesSection categoriesData={categoriesSection} />

            {/* Products Section */}
            <ProductsCarousel productsData={productsSection} />
        </div>
    );
}
