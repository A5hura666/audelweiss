"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingCart, User, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [headerHeight, setHeaderHeight] = useState(0);
    const pathname = usePathname();
    const cartCount = 3;

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

    const menuItems = [
        { title: "ACCUEIL", href: "/" },
        { title: "BOUTIQUE", href: "/shop" },
        { title: "CRÉATIONS", href: "/creations" },
        { title: "À PROPOS", href: "/a-propos" },
        { title: "BLOG", href: "/blog" },
    ];

    return (
        <header className={`fixed top-0 left-0 w-full bg-white transition-transform duration-300 ${isVisible ? "translate-y-0" : "-translate-y-full"}`}>
            <div className="container mx-auto flex justify-between items-center p-3 lg:p-8">
                <Link href="/">
                    <img src="/logo-wide.svg" alt="Logo" className="w-[150px] lg:w-[200px]" />
                </Link>

                <nav className="hidden lg:flex items-center space-x-5">
                    {menuItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`text-sm font-bold ${pathname === item.href ? "text-[#E8A499]" : "text-gray-700"} hover:text-[#E8A499] transition`}
                        >
                            {item.title}
                        </Link>
                    ))}
                    <div className="flex items-center space-x-4">
                        <Link href="/my-account">
                            <User size={22} className="text-gray-700 hover:text-[#E8A499]" />
                        </Link>
                        <Link href="/cart" className="relative">
                            <ShoppingCart size={22} className="text-gray-700 hover:text-[#E8A499]" />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-[#E8A499] text-white text-xs font-bold rounded-full px-1">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                    </div>
                </nav>

                <div className="lg:hidden flex items-center space-x-4">
                    <Link href="/cart" className="relative">
                        <ShoppingCart size={22} className="text-gray-700 hover:text-[#E8A499]" />
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-[#E8A499] text-white text-xs font-bold rounded-full px-1">
                                {cartCount}
                            </span>
                        )}
                    </Link>
                    <button onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X size={28} className="text-gray-700 hover:text-[#E8A499]" /> : <Menu size={28} className="text-gray-700 hover:text-[#E8A499]" />}
                    </button>
                </div>

                {isOpen && (
                    <div className="lg:hidden border-t-3 border-[#E8A499] absolute top-14 left-0 w-full bg-white shadow-md px-12 pt-12 pb-8 flex flex-col space-y-4">
                        {menuItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`text-sm font-bold ${pathname === item.href ? "text-[#E8A499]" : "text-gray-700"} hover:text-[#E8A499] transition`}
                                onClick={() => setIsOpen(false)}
                            >
                                {item.title}
                                <p className="mt-4 border-b-1 border-gray-100 w-full"></p>
                            </Link>
                        ))}
                        <Link href="/my-account" className="flex items-center space-x-2">
                            <User size={22} className="text-gray-700 hover:text-[#E8A499]" />
                            <span className="text-gray-700 hover:text-[#E8A499]">Se connecter</span>
                        </Link>
                        <p className="border-b-1 border-gray-100 w-full"></p>
                    </div>
                )}
            </div>
        </header>
    );
}
