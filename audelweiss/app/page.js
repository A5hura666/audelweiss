"use client";

import Link from "next/link";
import {useEffect, useState} from "react";

export default function Home() {
    const [background, setBackground] = useState("");
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const main_products = [
        {
            img: "https://audelweiss.fr/wp-content/uploads/2025/02/geocache-400x284.jpg.webp",
            alt: "Objet voyageur",
            title: "Objet voyageur",
            category: "Amigurumis",
            href: "https://audelweiss.fr/project/objet-voyageur/",
        },
        {
            img: "https://audelweiss.fr/wp-content/uploads/2025/02/bandeaufantaisie-400x284.jpg.webp",
            alt: "Bonnet panda",
            title: "Bonnet panda",
            category: "Bonnet",
            href: "https://audelweiss.fr/project/bonnet-panda/",
        },
        {
            img: "https://audelweiss.fr/wp-content/uploads/2025/02/cardigan-400x284.jpg.webp",
            alt: "Cardigan",
            title: "Cardigan",
            category: "Vêtement",
            href: "https://audelweiss.fr/project/cardigan/",
        },
        {
            img: "https://audelweiss.fr/wp-content/uploads/2025/02/patate-positive-400x284.jpg.webp",
            alt: "La Patate positive",
            title: "La Patate positive",
            category: "Amigurumis, Déco",
            href: "https://audelweiss.fr/project/la-patate-positive/",
        },
    ];

    useEffect(() => {
        const updateBackground = () => {
            if (window.innerWidth >= 1280) {
                setBackground("url(/images/homepage/banner.png)");
            } else {
                setBackground(
                    "linear-gradient(40deg, rgba(246, 185, 156, 0) 0%, rgba(246, 185, 156, 0.65) 50%, rgba(255, 97, 135, 0.58) 100%), url(/images/homepage/banner.png)"
                );
            }
        };

        updateBackground()
        window.addEventListener("resize", updateBackground);
        return () => window.removeEventListener("resize", updateBackground);
    }, []);

    return (
        <div>
            <section
                className="h-[600px] lg:h-[700px] bg-cover bg-center flex flex-col items-center justify-center text-center text-white py-[50px]"
                style={{backgroundImage: background}}>
                <article
                    className="m-auto md:m-auto lg:ml-[30rem] xl:ml-[40rem] 2xl:ml-[60rem] md:w-1/2 w-[80%] text-left">
                    <h1 className="flex flex-col text-[3rem] lg:text-[5.5rem] text-[#303028] lg:leading-[5.5rem] leading-[3.5rem]">
                        <span>Des créations</span>
                        <span className="lg:text-[#FF6187] text-white">douce</span>
                        <span>au crochet</span>
                    </h1>
                    <p className="mt-4 mb-8 max-w-2xl font-light  text-lg text-[#303028] leading-8">
                        Chaque pièce est soigneusement confectionnée à la main dans les Hautes-Alpes.
                        Offrez-vous ou à vos proches un savoir-faire authentique, alliant douceur et originalité.
                    </p>
                    <Link href="#">
                    <span
                        className="px-6 py-4 text-[#D6D0C2] bg-[#303028] text-white text-lg hover:bg-[#FF6187] transition">
                        Découvrir la boutique
                    </span>
                    </Link>
                </article>
            </section>

            <section className="bg-white px-4 py-24">
                <div className="flex flex-col lg:flex-row justify-center items-center gap-16 lg:gap-28">
                    <article className="w-86 max-w-md -translate-y-10">
                        <div>
                            <span className="text-[#F6B99C] text-3xl">01</span>
                            <h2 className="w-5/6 uppercase text-2xl text-black mt-4">Artisanat embrunais</h2>
                            <p className="text-gray-700 mt-2 leading-7">
                                Je vis dans les Hautes-Alpes, un cadre qui m’inspire chaque jour.
                                Toutes mes créations sont réalisées ici, à la main, avec des matériaux choisis avec soin.
                                J’aime l’idée de proposer des pièces qui portent en elles un peu de cette authenticité montagnarde.
                            </p>
                        </div>
                    </article>

                    <article className="w-86 max-w-md translate-y-10">
                        <div>
                            <span className="text-[#F6B99C] text-3xl">02</span>
                            <h2 className="w-5/6 uppercase font-normal text-2xl text-black mt-4">Éditions limitées ou sur-mesure</h2>
                            <p className="text-gray-700 mt-2 leading-7">
                                Je suis une créatrice curieuse, toujours en quête de nouvelles idées.
                                J’aime tester des techniques, des couleurs et des matières différentes.
                                Cette envie d’explorer donne naissance à des pièces variées : certaines sont produites en petites séries,
                                d’autres peuvent être personnalisées selon vos goûts et vos besoins.
                            </p>
                        </div>
                    </article>

                    <article className="w-86 max-w-md -translate-y-10">
                        <div>
                            <span className="text-[#F6B99C] text-3xl">03</span>
                            <h2 className="w-5/6 uppercase font-normal text-2xl text-black mt-4">Énergie et bien-être avec le Reiki</h2>
                            <p className="text-gray-700 mt-2 leading-7">
                                Depuis 2021, je suis certifiée praticienne Reiki.
                                Chaque fois que je crée, je me connecte à cette énergie pour infuser mes pièces d’intentions positives.
                                Mon but est de proposer des créations qui vous apportent à la fois bien-être et harmonie visuelle.
                            </p>
                        </div>
                    </article>
                </div>
            </section>

            <section id="home-portfolio" className="bg-white px-10 md:px-40 py-20 relative z-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {main_products.map((proj, i) => (
                        <div
                            key={i}
                            className="group relative overflow-visible shadow-md"
                            onMouseEnter={() => setHoveredIndex(i)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            onMouseMove={(e) =>
                                setMousePos({
                                    x: e.nativeEvent.offsetX,
                                    y: e.nativeEvent.offsetY,
                                })
                            }
                        >
                            <a href={proj.href}>
                                <img
                                    src={proj.img}
                                    alt={proj.alt}
                                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            </a>

                            {hoveredIndex === i && (
                                <div
                                    className="absolute z-50 pointer-events-auto"
                                    style={{
                                        left: `${mousePos.x}px`,
                                        top: `${mousePos.y}px`,
                                    }}
                                >
                                    {/* Titre avec animation fade-down */}
                                    <div className="bg-[#F6B99C] text-white px-4 py-2 w-56 shadow animate-fade-down">
                                        <h2 className="text-2xl font-bold leading-tight">{proj.title}</h2>
                                    </div>

                                    {/* Catégorie avec animation fade-down-delay */}
                                    <div className="bg-[#F6B99C] text-white px-4 py-2 w-40 animate-fade-down-delay">
                                        <p className="text-sm">{proj.category}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
