"use client"; // Si tu es en App Router

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, User } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Header() {
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
            <div className="container mx-auto flex justify-between items-center p-8">
                <Link href="/">
                    <Image src="logo-wide.svg" alt="Logo" width={200} height={50} />
                </Link>

                {/* Menu */}
                <nav className="flex items-center space-x-6">
                    {menuItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`text-sm font-bold ${
                                pathname === item.href ? "text-orange-500" : "text-gray-700"
                            } hover:text-orange-500 transition`}
                        >
                            {item.title}
                        </Link>
                    ))}

                    {/* Icônes Profil & Panier */}
                    <div className="flex items-center space-x-4">
                        <Link href="/my-account">
                            <User size={22} className="text-gray-700 hover:text-orange-500" />
                        </Link>

                        <Link href="/cart" className="relative">
                            <ShoppingCart size={22} className="text-gray-700 hover:text-orange-500" />

                            {/* Bulle rouge si le panier n'est pas vide */}
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full px-2">
                              {cartCount}
                            </span>
                            )}
                        </Link>
                    </div>
                </nav>
            </div>
        </header>
    );
}
