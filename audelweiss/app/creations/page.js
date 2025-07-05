"use client";

import {Breadcrumbs} from "@/app/components/breadcrambs/breadcrumbs";
import * as React from "react";
import {useEffect, useState} from "react";
import {getStrapiCall} from "@/app/lib/utils";

function valuetext(value) {
    return `${value}€`;
}


let data = [];

export default function CreationList() {

    const [creations, setCreations] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [categoryFilters, setCategoryFilters] = useState([]);
    const [hashtags, setHashtags] = useState([]);  // <-- nouvelle state pour hashtags
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [selectedTag, setSelectedTag] = useState(null);

    useEffect(() => {
        const fetchFilteredProducts = async () => {
            try {
                let url = getStrapiCall(`/api/creations?populate=creationImages&populate=hashtags`);
                const response = await fetch(url);
                const data = await response.json();
                console.log("Fetched creations:", data);
                setCreations(data.data);
                setIsLoaded(true);

                // Récupération des hashtags sans doublons
                let hashtagsArray = [];
                data.data.forEach((creation) => {
                    creation.hashtags?.forEach((tag) => {
                        if (!hashtagsArray.includes(tag.title)) {
                            hashtagsArray.push(tag.title);
                        }
                    });
                });
                setHashtags(hashtagsArray);
                console.log("Hashtags uniques :", hashtagsArray);

            } catch (error) {
                console.error("Error fetching filtered products:", error);
            }
        };

        fetchFilteredProducts();
    }, []);

    const slugify = (str) =>
        str
            .toLowerCase()
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // retire les accents
            .replace(/[^a-z0-9]+/g, "-") // remplace tout sauf lettres et chiffres par -
            .replace(/(^-|-$)+/g, "");

    const handleTagClick = (tag) => {
        setSelectedTag(tag === selectedTag ? null : tag); // toggle sélection
    };

    return (
        <div>
            {!isLoaded && (<div
                role="status"
                className="fixed inset-0 flex items-center justify-center bg-white/70 dark:bg-gray-800/70 z-50"
                style={{backdropFilter: 'blur(5px)'}}
            >
                <svg
                    aria-hidden="true"
                    className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-[#ff6187]"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                    />
                    <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                    />
                </svg>
                <span className="sr-only">Loading...</span>
            </div>)}
            <section
                className="h-[450px] lg:h-[350px] bg-cover bg-center flex flex-col items-center justify-center text-center text-white py-[50px]"
                style={{backgroundImage: "url(/images/shop/creation_top.webp)"}}
            >
                <h1 className="text-7xl uppercase aboreto">Les Créations</h1>
                <span className="flex">
          <Breadcrumbs></Breadcrumbs>
        </span>
            </section>
            <section id="creations" className=" container mx-auto mb-12 p-4 flex flex-col gap-4">
                <section id="filtres">
                    <p className="text-2xl text-center mb-4">
                        Découvrez mes créations passées, chacune unique et réalisée avec soin. Elles peuvent vous inspirer pour une commande personnalisée : il vous suffit de me contacter pour en discuter ensemble ! 😊</p>
                    <ul className="flex w-full justify-center gap-2">
                        {hashtags.map((tag, index) => (
                            <li key={index}>
                                <button
                                    onClick={() => handleTagClick(tag)}
                                    className={`px-4 text-lg py-2 border border-[#F6B99C] transition-colors duration-300 hover:cursor-pointer ${
                                        selectedTag === tag
                                            ? "bg-[#F6B99C] text-white"
                                            : "bg-white text-[#F6B99C]"
                                    }`}
                                >
                                    {tag}
                                </button>
                            </li>
                        ))}
                    </ul>
                </section>
                <section id="creations" className="container mx-auto mb-12 p-4 grid grid-cols-1 md:grid-cols-4 gap-4">
                    {creations
                        .filter((creation) => {
                            if (!selectedTag) return true;
                            return creation.hashtags.some((tag) => tag.title === selectedTag);
                        })
                        .map((creation, i) => (
                            <div
                                key={creation.id}
                                className="group relative overflow-visible bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 aspect-square"
                                onMouseEnter={() => setHoveredIndex(i)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                onMouseMove={(e) =>
                                    setMousePos({
                                        x: e.nativeEvent.offsetX,
                                        y: e.nativeEvent.offsetY,
                                    })
                                }
                            >
                                <a
                                    href={`/creations/` + slugify(creation.name)}
                                    onClick={() => localStorage.setItem('selectedCreation', creation.documentId)}
                                >
                                    <img
                                        src={'http://ayun.myddns.me:5000' + creation.creationImages[0].url}
                                        alt={creation.title}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 rounded-lg"
                                    />
                                </a>

                                {hoveredIndex === i && (
                                    <a
                                        className="absolute z-50 pointer-events-auto hover:cursor-pointer"
                                        href={`/creations/` + slugify(creation.name)}
                                        onClick={() => localStorage.setItem('selectedCreation', creation.documentId)}
                                        style={{
                                            left: `${mousePos.x}px`,
                                            top: `${mousePos.y}px`,
                                        }}
                                    >
                                        <div className="bg-[#F6B99C] text-white px-4 py-2 min-w-68 w-full shadow animate-fade-down">
                                            <h2 className="text-xl font-bold leading-tight">{creation.name}</h2>
                                        </div>
                                        <div className="bg-[#F6B99C] text-white px-4 py-2 w-40 animate-fade-down-delay uppercase">
                                            <p className="text-sm">
                                                {creation.hashtags && creation.hashtags.length > 0
                                                    ? creation.hashtags.slice(0, 2).map((tag) => tag.title).join(" / ")
                                                    : "Sans hashtags"}
                                            </p>
                                        </div>
                                    </a>
                                )}
                            </div>
                        ))}
                </section>
            </section>
        </div>
    );
}
