"use client";

import { useState } from "react";
import Link from "next/link";
import { CirclePlus, ShoppingCart, Star, StarOff } from "lucide-react";

export default function ShopCard(props) {
  const [isHovered, setIsHovered] = useState(false);

  const {
    category,
    model,
    name,
    price,
    priceMin,
    priceMax,
    rating,
    link,
    addToCart,
    img1,
    img2,
  } = props;

  const displayPrice = typeof price === "number"
      ? `${price.toFixed(2)}€`
      : priceMin != null && priceMax != null
          ? `${priceMin.toFixed(2)}€ - ${priceMax.toFixed(2)}€`
          : "Prix non dispo";

  const stars =
      typeof rating === "number"
          ? Array.from({ length: 5 }, (_, i) =>
              i < rating ? (
                  <Star key={i} className="w-4 h-4 text-yellow-400 inline-block" />
              ) : (
                  <StarOff key={i} className="w-4 h-4 text-gray-300 inline-block" />
              )
          )
          : null;

  return (
      <div className="relative flex flex-col items-center w-60">
        <div
            className="relative flex justify-center group w-full h-60"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
          <img
              src={img1 || "/images/shop/bonnet.png"}
              alt={`${category} ${model} ${name}`}
              className={`absolute w-full h-full object-cover transition-opacity duration-300 ${
                  isHovered && img2 ? "opacity-0" : "opacity-100"
              }`}
          />

          {img2 && (
              <img
                  src={img2}
                  alt={`${category} ${model} ${name} - hover`}
                  className={`absolute w-full h-full object-cover transition-opacity duration-300 ${
                      isHovered ? "opacity-100" : "opacity-0"
                  }`}
              />
          )}

          <div className="absolute z-10 bottom-2 w-full px-4">
            {addToCart ? (
                <button className="w-full bg-[#ff6187] text-white text-sm py-2 hover:bg-black transition flex items-center justify-center gap-2">
                  <ShoppingCart className="w-4 h-4" />
                  Ajouter au panier
                </button>
            ) : (
                <Link
                    href={link || "#"}
                    className="w-full block bg-black text-white text-sm py-2 hover:bg-[#ff6187] transition text-center"
                >
                  <CirclePlus className="inline-block mr-1" />
                  Choix des options
                </Link>
            )}
          </div>
        </div>

        <div className="text-center mt-2">
          <h2 className="text-lg font-semibold">{category}</h2>
          <h3 className="text-sm text-gray-600">
            {model} {name ? `| ${name}` : ""}
          </h3>
          <h3 className="text-md font-bold">{displayPrice}</h3>
          {stars && <div className="mt-1">{stars}</div>}
        </div>
      </div>
  );
}
