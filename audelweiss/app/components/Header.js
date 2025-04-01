"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, User, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const cartCount = 3;

    const menuItems = [
        { title: "ACCUEIL", href: "/" },
        { title: "BOUTIQUE", href: "/shop" },
        { title: "CRÉATIONS", href: "/creations" },
        { title: "À PROPOS", href: "/a-propos" },
        { title: "BLOG", href: "/blog" },
    ];

    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto flex justify-between items-center p-3 lg:p-8">
                {/* Logo */}
                <Link href="/">
                    <img src="/logo-wide.svg" alt="Logo" className={"w-[150px] lg:w-[200px]"}/>
                </Link>

                {/* Desktop Menu */}
                <nav className="hidden lg:flex items-center space-x-5">
                    {menuItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`text-sm font-bold ${
                                pathname === item.href ? "text-[#E8A499]" : "text-gray-700"
                            } hover:text-[#E8A499] transition`}
                        >
                            {item.title}
                        </Link>
                    ))}

                    {/* Icônes Profil & Panier */}
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

                {/* Mobile Menu (Burger) */}
                <div className="lg:hidden flex items-center space-x-4">
                    {/* Icône ShoppingCart à gauche */}
                    <Link href="/cart" className="relative">
                        <ShoppingCart size={22} className="text-gray-700 hover:text-[#E8A499]" />
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-[#E8A499] text-white text-xs font-bold rounded-full px-1">
                {cartCount}
              </span>
                        )}
                    </Link>

                    {/* Bouton Menu Burger */}
                    <button onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? (
                            <X size={28} className="text-gray-700 hover:text-[#E8A499]" />
                        ) : (
                            <Menu size={28} className="text-gray-700 hover:text-[#E8A499]" />
                        )}
                    </button>
                </div>

                {isOpen && (
                    <div className="lg:hidden border-t-3 border-[#E8A499] absolute top-14 left-0 w-full bg-white shadow-md px-12 pt-12 pb-8 flex flex-col space-y-4">
                        {menuItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`text-sm font-bold ${
                                    pathname === item.href ? "text-[#E8A499]" : "text-gray-700"
                                } hover:text-[#E8A499] transition`}
                                onClick={() => setIsOpen(false)}
                            >
                                {item.title}
                                <p className="mt-4 border-b-1 border-gray-100 w-full"></p>
                            </Link>
                        ))}

                        {/* Icônes Profil */}
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