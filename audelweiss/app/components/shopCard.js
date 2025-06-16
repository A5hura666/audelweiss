"use client";

import { useState } from "react";
import Link from "next/link";
import { CirclePlus } from "lucide-react";

export default function ShopCard(props) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={props.link} className="relative block">
      <div className="flex flex-col items-center">
        <div
          className="relative flex justify-center group w-60 h-60"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img
            src="/images/shop/bonnet.png"
            alt={`${props.category} ${props.model} ${props.name}`}
            className={`absolute w-full h-full object-cover transition-opacity duration-300 ${
              isHovered && props.img2 ? "opacity-0" : "opacity-100"
            }`}
          />

          {props.img2 && (
            <img
              src={props.img2}
              alt={`${props.category} ${props.model} ${props.name} - hover`}
              className={`absolute w-full h-full object-cover transition-opacity duration-300 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            />
          )}

          {!props.img2 && (
            <div className="absolute z-10 inset-0 bg-white flex items-center justify-center opacity-0 group-hover:opacity-80 transition-opacity duration-300 ease-in-out">
              <CirclePlus className="w-12 h-12 text-[#ff6187]" />
            </div>
          )}

          <a
            href={props.link}
            className="lg:w-11/12 z-11 absolute w-5/6 bottom-2 bg-black text-white p-2 px-4 hover:bg-[#ff6187] shadow-md transition duration-300 ease-in-out"
          >
            <CirclePlus className="inline-block mr-2" /> Choix des options
          </a>
        </div>
        <div className="text-center mt-2">
          <h2 className="text-lg font-semibold">{props.category}</h2>
          <h3 className="text-sm text-gray-600">
            {props.model} {props.name ? `| ${props.name}` : ""}
          </h3>
          <h3 className="text-md font-bold">{props.price}</h3>
        </div>
      </div>
    </Link>
  );
}
