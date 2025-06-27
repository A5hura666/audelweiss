import { useState } from "react";
import Link from "next/link";

export default function ShopCard(props) {
    const [isHovered, setIsHovered] = useState(false);

    const {
        category,
        model,
        name,
        price,
        rating,
        img1,
        img2,
        productId
    } = props;

    const slugify = (str) =>
        str
            .toLowerCase()
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // retire les accents
            .replace(/[^a-z0-9]+/g, "-") // remplace tout sauf lettres et chiffres par -
            .replace(/(^-|-$)+/g, "");

    return (
        <div className="relative flex flex-col items-center w-60 mx-auto">
            <div className="relative flex flex-col items-center w-60 justify-center">
                <div
                    className="relative flex justify-center group w-full h-60"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <img
                        src={'http://ayun.myddns.me:5000' + img1}
                        alt={`${category} ${model} ${name}`}
                        className={`absolute w-full h-full object-cover transition-opacity duration-300 ${
                            isHovered && img2 ? "opacity-0" : "opacity-100"
                        }`}
                    />

                    {img2 && (
                        <img
                            src={'http://ayun.myddns.me:5000' + img2}
                            alt={`${category} ${model} ${name} - hover`}
                            className={`absolute w-full h-full object-cover transition-opacity duration-300 ${
                                isHovered ? "opacity-100" : "opacity-0"
                            }`}
                        />
                    )}
                    <div className="absolute z-10 bottom-2 w-full px-4">
                        <Link
                            href={`/shop/${category}/${model}${name ? `/${slugify(name)}` : ""}`}
                            className="w-full block bg-black text-white text-sm py-2 hover:bg-[#ff6187] transition text-center"
                            onClick={() => localStorage.setItem('selectedProductId', productId)}
                        >
                            Choix des options
                        </Link>
                    </div>
                </div>
            </div>
            <div className="text-center mt-2">
                <h2 className="text-sm font-semibold">{category} {model ? `| ${model}` : ''}</h2>
                <h3 className="text-lg font-bold">
                    {name}
                </h3>
                <h3 className="text-md font-bold">{price}</h3>
            </div>
        </div>
    );
}