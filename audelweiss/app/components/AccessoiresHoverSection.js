import { useState } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AccessoiresHoverSection({ items, buttonItem }) {
    const [activeKey, setActiveKey] = useState(items[0]?.key || "");
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextItem = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
        setActiveKey(items[(currentIndex + 1) % items.length].key);
    };

    const prevItem = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
        setActiveKey(items[(currentIndex - 1 + items.length) % items.length].key);
    };

    return (
        <div className="flex justify-end w-full">
            {/* BOUTONS (Desktop) */}
            <div className="hidden lg:flex flex-col items-start justify-center gap-6 w-full lg:w-1/3">
                {items.map((item) => (
                    <a
                        key={item.key}
                        href={item.href}
                        onMouseEnter={() => setActiveKey(item.key)}
                        className="group text-4xl font-semibold flex items-center gap-4 transition-colors duration-300 text-black hover:text-[rgb(255,97,135)]"
                    >
                        <span className="relative flex items-center">
                            {item.label}
                            <span className="ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 flex items-center">
                                <ArrowRight size={24} />
                            </span>
                        </span>
                    </a>
                ))}
                <Link
                    href={buttonItem.href}
                    className="bg-[#E8A499] text-white text-sm font-semibold py-4 px-4 rounded-lg shadow-md hover:bg-[#303028] transition"
                >
                    {buttonItem.label}
                </Link>
            </div>

            {/* CARROUSEL MOBILE */}
            <div className="relative w-full lg:hidden">
                {/* Flèches de navigation */}
                <div className="absolute top-1/2 left-2 transform -translate-y-1/2">
                    <button
                        onClick={prevItem}
                        className="bg-[#fdf1eb] text-[#FF6187] p-4 rounded-full shadow-md hover:bg-[#FF6187] hover:text-white transition"
                    >
                        <ArrowLeft size={28} />
                    </button>
                </div>

                {/* Détails du bouton - placé au-dessus de l'image */}
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-center z-10">
                    <a
                        href={items[currentIndex].href}
                        className="text-xl font-semibold flex items-center justify-center gap-4 text-black hover:text-[rgb(255,97,135)]"
                    >
                        <span>{items[currentIndex].label}</span>
                    </a>
                </div>

                {/* Image active du carrousel */}
                <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] overflow-hidden rounded-lg shadow-lg">
                    <img
                        key={items[currentIndex].key}
                        src={items[currentIndex].image}
                        alt={items[currentIndex].label}
                        className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out transform"
                    />
                </div>

                {/* Flèches de navigation à droite */}
                <div className="absolute top-1/2 right-2 transform -translate-y-1/2">
                    <button
                        onClick={nextItem}
                        className="bg-[#fdf1eb] text-[#FF6187] p-4 rounded-full shadow-md hover:bg-[#FF6187] hover:text-white transition"
                    >
                        <ArrowRight size={28} />
                    </button>
                </div>
            </div>

            {/* IMAGE RESPONSIVE (Desktop) */}
            <div className="relative w-full lg:w-[400px] h-[300px] sm:h-[400px] lg:h-[400px] overflow-hidden rounded-lg shadow-lg hidden lg:block">
                {items.map((item) => (
                    <img
                        key={item.key}
                        src={item.image}
                        alt={item.label}
                        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out transform ${
                            activeKey === item.key
                                ? "opacity-100 scale-100 translate-y-0 z-10"
                                : "opacity-0 scale-105 translate-y-2 z-0"
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}
