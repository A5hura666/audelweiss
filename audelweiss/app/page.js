"use client";

import Link from "next/link";
import {useEffect, useState} from "react";
import AccessoiresHoverSection from "./components/AccessoiresHoverSection";
import ShopCard from "@/app/components/shopCard";
import * as React from "react";

export default function Home() {
    const [background, setBackground] = useState("");
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
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

    useEffect(() => {
        const updateBackground = () => {
            // Utiliser l'image de Strapi si disponible, sinon fallback sur l'image locale
            const heroSection = pageData?.sections?.find(section => section.__component === 'layout.hero');
            const strapiImageUrl = heroSection?.image?.url ? `http://ayun.myddns.me:5000${heroSection.image.url}` : null;
            const backgroundImageUrl = strapiImageUrl || "/images/homepage/banner.png";
            
            if (window.innerWidth >= 1280) {
                setBackground(`url(${backgroundImageUrl})`);
            } else {
                setBackground(
                    `linear-gradient(40deg, rgba(246, 185, 156, 0) 0%, rgba(246, 185, 156, 0.65) 50%, rgba(255, 97, 135, 0.58) 100%), url(${backgroundImageUrl})`
                );
            }
        };

        if (pageData) {
            updateBackground();
        }
        window.addEventListener("resize", updateBackground);
        return () => window.removeEventListener("resize", updateBackground);
    }, [pageData]);

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
    const heroSection = sections.find(section => section.__component === 'layout.hero') || {};
    const categoriesSection = sections.find(section => section.__component === 'layout.categories-section') || {};
    const productsSection = sections.find(section => section.__component === 'layout.products-carousel') || {};

    return (
        <div>
            {/* Hero Section */}
            <section
                className="h-[600px] lg:h-[700px] bg-cover bg-center flex flex-col items-center justify-center text-center text-white py-[50px]"
                style={{backgroundImage: background}}>
                <article
                    className="m-auto md:m-auto lg:ml-[30rem] xl:ml-[40rem] 2xl:ml-[60rem] md:w-1/2 w-[80%] text-left">
                    <h1 className="flex flex-col text-[3rem] lg:text-[5.5rem] text-[#303028] lg:leading-[5.5rem] leading-[3.5rem]">
                        <span>{heroSection.title?.split(' ')[0] || 'Des créations'}</span>
                        <span className="lg:text-[#FF6187] text-white">{heroSection.title?.split(' ')[1] || 'douce'}</span>
                        <span>{heroSection.title?.split(' ').slice(2).join(' ') || 'au crochet'}</span>
                    </h1>
                    <p className="mt-4 mb-8 max-w-2xl font-light text-lg text-[#303028] leading-8">
                        {heroSection.description || 'Chaque pièce est soigneusement confectionnée à la main dans les Hautes-Alpes. Offrez-vous ou à vos proches un savoir-faire authentique, alliant douceur et originalité.'}
                    </p>
                    <Link href={heroSection.callToAction?.url || "#"}>
                        <span className="px-6 py-4 text-[#D6D0C2] bg-[#303028] text-white text-lg hover:bg-[#FF6187] transition">
                            {heroSection.callToAction?.label || 'Découvrir la boutique'}
                        </span>
                    </Link>
                </article>
            </section>

            {/* Section des valeurs (statique pour le moment) */}
            <section className="bg-white px-4 py-24">
                <div className="flex flex-col lg:flex-row justify-center items-center gap-16 lg:gap-28">
                    <article className="w-86 max-w-md lg:-translate-y-10">
                        <div>
                            <span className="text-[#F6B99C] text-3xl">01</span>
                            <h2 className="w-5/6 uppercase text-2xl text-black mt-4">Artisanat embrunais</h2>
                            <p className="text-gray-700 mt-2 leading-7">
                                Je vis dans les Hautes-Alpes, un cadre qui m&apos;inspire chaque jour.
                                Toutes mes créations sont réalisées ici, à la main, avec des matériaux choisis avec
                                soin.
                                J&apos;aime l&apos;idée de proposer des pièces qui portent en elles un peu de cette authenticité
                                montagnarde.
                            </p>
                        </div>
                    </article>

                    <article className="w-86 max-w-md lg:translate-y-10">
                        <div>
                            <span className="text-[#F6B99C] text-3xl">02</span>
                            <h2 className="w-5/6 uppercase font-normal text-2xl text-black mt-4">Éditions limitées ou
                                sur-mesure</h2>
                            <p className="text-gray-700 mt-2 leading-7">
                                Je suis une créatrice curieuse, toujours en quête de nouvelles idées.
                                J&apos;aime tester des techniques, des couleurs et des matières différentes.
                                Cette envie d&apos;explorer donne naissance à des pièces variées : certaines sont produites
                                en petites séries,
                                d&apos;autres peuvent être personnalisées selon vos goûts et vos besoins.
                            </p>
                        </div>
                    </article>

                    <article className="w-86 max-w-md lg:-translate-y-10">
                        <div>
                            <span className="text-[#F6B99C] text-3xl">03</span>
                            <h2 className="w-5/6 uppercase font-normal text-2xl text-black mt-4">Énergie et bien-être
                                avec le Reiki</h2>
                            <p className="text-gray-700 mt-2 leading-7">
                                Depuis 2021, je suis certifiée praticienne Reiki.
                                Chaque fois que je crée, je me connecte à cette énergie pour infuser mes pièces
                                d&apos;intentions positives.
                                Mon but est de proposer des créations qui vous apportent à la fois bien-être et harmonie
                                visuelle.
                            </p>
                        </div>
                    </article>
                </div>
            </section>

            {/* Categories Section */}
            {categoriesSection.categories && categoriesSection.categories.length > 0 && (
                <section className="bg-[#fdf1eb] py-30">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="relative flex justify-center space-y-4 col-span-1 md:col-span-1">
                                <img
                                    className="w-48 h-[28rem] object-cover rounded-full shadow absolute -top-20 -left-10 z-10"
                                    src="https://audelweiss.fr/wp-content/uploads/2025/02/0b0bc07c-1615-4152-b893-770a637929dc.webp"
                                    alt="0b0bc07c-1615-4152-b893-770a637929dc"
                                />
                                <img
                                    className="w-80 h-[23rem] object-cover shadow absolute top-20 left-20 z-20"
                                    src="https://audelweiss.fr/wp-content/uploads/2025/02/bandeaufantaisie.jpg.webp"
                                    alt="bandeaufantaisie"
                                />
                            </div>

                            <div className="col-span-1 md:col-span-2">
                                <AccessoiresHoverSection 
                                    items={categoriesSection.categories.map(category => ({
                                        key: category.title?.toLowerCase().replace(/\s+/g, '-') || '',
                                        label: category.title || '',
                                        href: category.url || '#',
                                        image: category.image?.url ? `http://ayun.myddns.me:5000${category.image.url}` : ''
                                    }))}
                                    buttonItem={{
                                        label: "Découvrir les accessoires",
                                        href: "/product-category/accessoires/"
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Products Section */}
            {productsSection.product_articles && productsSection.product_articles.length > 0 && (
                <section className="bg-white py-12 px-4">
                    <div className="max-w-6xl mx-auto text-center mb-12 text-3xl text-gray-800">
                        <h2>
                            {productsSection.title || 'Des créations artisanales uniques'}
                        </h2>
                        <p className="mt-2">
                            {productsSection.description || 'Fait main avec passion, pour toi et ceux que tu aimes ✨'}
                        </p>
                    </div>

                    <div className="max-w-6xl mx-auto grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                        {productsSection.product_articles.map((product, index) => {
                            // Récupération de la première image du produit
                            const firstImage = product.productImages && product.productImages.length > 0 ? product.productImages[0] : null;
                            const secondImage = product.productImages && product.productImages.length > 1 ? product.productImages[1] : null;
                            
                            return (
                                <ShopCard
                                    key={product.documentId || index}
                                    category={product.productCategory || ''}
                                    model={product.subCategory || ''}
                                    name={product.productName || ''}
                                    price={product.productAdultPrice || product.productChildPrice || product.price}
                                    priceMin={product.productChildPrice}
                                    priceMax={product.productAdultPrice}
                                    link={`/shop/product/${product.documentId}`}
                                    img1={firstImage?.url ? `http://ayun.myddns.me:5000${firstImage.url}` : ''}
                                    img2={secondImage?.url ? `http://ayun.myddns.me:5000${secondImage.url}` : ''}
                                    addToCart={true}
                                    rating={product.score}
                                />
                            );
                        })}
                    </div>
                </section>
            )}
        </div>
    );
}
