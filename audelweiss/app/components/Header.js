"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingCart, User, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import {getStrapiCall} from "@/app/lib/utils";
import siteData from "@/data/headerData.json";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [headerHeight, setHeaderHeight] = useState(0);
    const [headerData, setHeaderData] = useState(siteData);
    const [logoData, setLogoData] = useState('/logo-wide.svg');
    const pathname = usePathname();
    const cartCount = 3;

    useEffect(() => {
        const fetchHeaderData = async () => {
            try {
                const response = await fetch(
                    getStrapiCall('/api/global?populate[0]=header&populate[1]=header.iconsLinks&populate[2]=header.iconsLinks.icon&populate[3]=header.links&populate[4]=header.links.megaMenu&populate[5]=header.links.megaMenu.links')
                );
                const data = await response.json();
                setHeaderData(data.data.header);
                setLogoData(process.env.STRAPI_BASE_URL + data.data.header.logo.url);
            } catch (error) {
                console.error("Erreur lors de la récupération du header :", error);
            }
        };
        fetchHeaderData();
    }, []);

    useEffect(() => {
        const header = document.querySelector("header");
        if (header) {
            setHeaderHeight(header.offsetHeight);
        }

        const handleScroll = () => {
            if (window.scrollY > headerHeight && window.scrollY > lastScrollY) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
            setLastScrollY(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY, headerHeight]);

    return (
        <header className={`fixed top-0 left-0 w-full bg-white transition-transform duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"}`}>
            <div className="container mx-auto flex justify-between items-center p-3 lg:p-8">
                <Link href="/">
                    <img src={logoData} alt="Logo" className="w-[150px] lg:w-[200px]" />
                </Link>

                {/* MENU DESKTOP */}
                <nav className="hidden lg:flex items-center space-x-5">
                    {headerData?.links?.map((item) => (
                        <Link
                            key={item.id}
                            href={item.url}
                            className={`text-sm font-bold ${pathname === item.url ? "text-[#E8A499]" : "text-gray-700"} hover:text-[#E8A499] transition`}
                        >
                            {item.label}
                        </Link>
                    ))}
                    <div className="flex items-center space-x-4">
                        {headerData?.iconsLinks?.map((icon) => (
                            <Link key={icon.id} href={icon.url} className="relative">
                                <img
                                    src={process.env.STRAPI_BASE_URL + icon.icon.url}
                                    alt={icon.icon.alternativeText || "Icon"}
                                    className="w-6 h-6 hover:opacity-80 transition"
                                />
                                {/* Affichage du compteur si c'est le panier */}
                                {icon.actionType === "cart" && cartCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-[#E8A499] text-white text-xs font-bold rounded-full px-1">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                        ))}
                    </div>
                </nav>

                {/* MENU MOBILE */}
                <div className="lg:hidden flex items-center space-x-4">
                    {headerData?.iconsLinks?.map((icon) => (
                        <Link key={icon.id} href={icon.url} className="relative">
                            <img
                                src={process.env.STRAPI_BASE_URL + icon.icon.url}
                                alt={icon.icon.alternativeText || "Icon"}
                                className="w-6 h-6 hover:opacity-80 transition"
                            />
                            {/* Affichage du compteur si c'est le panier */}
                            {icon.actionType === "cart" && cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-[#E8A499] text-white text-xs font-bold rounded-full px-1">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                    ))}
                    <button onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X size={28} className="text-gray-700 hover:text-[#E8A499]" /> : <Menu size={28} className="text-gray-700 hover:text-[#E8A499]" />}
                    </button>
                </div>

                {/* MENU BURGER OUVERT */}
                {isOpen && (
                    <div className="lg:hidden border-t-3 border-[#E8A499] absolute top-14 left-0 w-full bg-white shadow-md px-12 pt-12 pb-8 flex flex-col space-y-4">
                        {headerData?.links?.map((item) => (
                            <Link
                                key={item.id}
                                href={item.url}
                                className={`text-sm font-bold ${pathname === item.url ? "text-[#E8A499]" : "text-gray-700"} hover:text-[#E8A499] transition`}
                                onClick={() => setIsOpen(false)}
                            >
                                {item.label}
                                <p className="mt-4 border-b-1 border-gray-100 w-full"></p>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </header>
    );
}
