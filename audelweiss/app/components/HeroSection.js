"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function HeroSection({ heroData }) {
    const [background, setBackground] = useState("");

    useEffect(() => {
        const updateBackground = () => {
            // Utiliser l'image de Strapi si disponible, sinon fallback sur l'image locale
            const strapiImageUrl = heroData?.image?.url ? `http://ayun.myddns.me:5000${heroData.image.url}` : null;
            const backgroundImageUrl = strapiImageUrl || "/images/homepage/banner.png";
            
            if (window.innerWidth >= 1280) {
                setBackground(`url(${backgroundImageUrl})`);
            } else {
                setBackground(
                    `linear-gradient(40deg, rgba(246, 185, 156, 0) 0%, rgba(246, 185, 156, 0.65) 50%, rgba(255, 97, 135, 0.58) 100%), url(${backgroundImageUrl})`
                );
            }
        };

        updateBackground();
        window.addEventListener("resize", updateBackground);
        return () => window.removeEventListener("resize", updateBackground);
    }, [heroData]);

    if (!heroData) {
        return null;
    }

    return (
        <section
            className="h-[600px] lg:h-[700px] bg-cover bg-center flex flex-col items-center justify-center text-center text-white py-[50px]"
            style={{backgroundImage: background}}
        >
            <article className="m-auto md:m-auto lg:ml-[30rem] xl:ml-[40rem] 2xl:ml-[60rem] md:w-1/2 w-[80%] text-left">
                <h1 className="flex flex-col text-[3rem] lg:text-[5.5rem] text-[#303028] lg:leading-[5.5rem] leading-[3.5rem]">
                    <span>{heroData.title?.split(' ')[0] || 'Des créations'}</span>
                    <span className="lg:text-[#FF6187] text-white">{heroData.title?.split(' ')[1] || 'douce'}</span>
                    <span>{heroData.title?.split(' ').slice(2).join(' ') || 'au crochet'}</span>
                </h1>
                <p className="mt-4 mb-8 max-w-2xl font-light text-lg text-[#303028] leading-8">
                    {heroData.description || 'Chaque pièce est soigneusement confectionnée à la main dans les Hautes-Alpes. Offrez-vous ou à vos proches un savoir-faire authentique, alliant douceur et originalité.'}
                </p>
                <Link href={heroData.callToAction?.url || "#"}>
                    <span className="px-6 py-4 text-[#D6D0C2] bg-[#303028] text-white text-lg hover:bg-[#FF6187] transition">
                        {heroData.callToAction?.label || 'Découvrir la boutique'}
                    </span>
                </Link>
            </article>
        </section>
    );
} 