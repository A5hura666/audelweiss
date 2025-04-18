"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingCart, User, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import {getStrapiCall} from "@/app/lib/utils";
import siteData from "@/data/headerData.json";
import MegaMenu from "./MegaMenu";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [headerHeight, setHeaderHeight] = useState(0);
    const [headerData, setHeaderData] = useState(siteData);
    const [logoData, setLogoData] = useState('/logo-wide.svg');
    const [baseUrl, setBaseUrl] = useState('');
    const [activeMegaMenu, setActiveMegaMenu] = useState(null);
    const pathname = usePathname();
    const cartCount = 3;

    useEffect(() => {
        const fetchHeaderData = async () => {
            try {
                const response = await fetch(
                    getStrapiCall('/api/global?populate[0]=header&populate[1]=header.iconsLinks&populate[2]=header.iconsLinks.icon&populate[3]=header.links&populate[4]=header.links.megaMenu&populate[5]=header.links.megaMenu.productLinks&populate[6]=header.links.megaMenu.productLinks.image')
                );
                const data = await response.json();

                if (data?.data?.header) {
                    setHeaderData(data.data.header);
                }

                const updatedBaseUrl = process.env.STRAPI_BASE_URL;
                setBaseUrl(updatedBaseUrl);

                if (data?.data?.header?.logo?.url) {
                    setLogoData(updatedBaseUrl + data?.data?.header?.logo?.url);
                } else {
                    console.warn("Logo URL is missing from Strapi response");
                }
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
                setIsOpen(false);
                setActiveMegaMenu(null);
            } else {
                setIsVisible(true);
            }
            setLastScrollY(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY, headerHeight]);

    return (
        <header className={`fixed z-50 top-0 left-0 w-full bg-white transition-transform duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"}`}>
            <div className="container mx-auto flex justify-between items-center p-3 lg:p-8 relative">
                <Link href="/">
                    <img src={logoData} alt="Logo" className="w-[150px] lg:w-[200px]" />
                </Link>

                {/* MENU DESKTOP */}
                <nav className="hidden lg:flex items-center space-x-5">
                    {headerData?.links?.map((item) => (
                        <div
                            key={item.id}
                            className="relative"
                            onMouseEnter={() => item.megaMenu ? setActiveMegaMenu(item.id) : setActiveMegaMenu(null)}
                        >
                            <Link
                                href={item.url}
                                className={`text-sm font-bold ${pathname === item.url ? "text-[#E8A499]" : "text-gray-700"} hover:text-[#E8A499] transition`}
                            >
                                {item.label}
                            </Link>
                            {item.megaMenu && activeMegaMenu === item.id && (
                                <MegaMenu productLinks={item.megaMenu.productLinks} baseUrl={baseUrl} />
                            )}
                        </div>
                    ))}
                    <div className="flex items-center space-x-4">
                        {headerData?.iconsLinks?.map((icon, index) => (
                            <Link key={icon.id || `icon-${index}`} href={icon.url} className="relative">
                                <img
                                    src={baseUrl + icon.icon.url}
                                    alt={icon.icon.alternativeText || "Icon"}
                                    className="w-6 h-6 hover:opacity-80 transition"
                                />
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
                    {headerData?.iconsLinks?.map((icon, index) => (
                        <Link key={icon.id || `icon-${index}`} href={icon.url} className="relative">
                            <img
                                src={baseUrl + icon.icon.url}
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
