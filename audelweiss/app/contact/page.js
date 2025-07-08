"use client";
import { useState } from "react";

export default function Contact() {
  const [selected, setSelected] = useState("");

  return (
    <div className="bg-white flex flex-col items-center py-12 px-4">
      <h1 className="text-3xl md:text-4xl font-serif font-normal mb-16 text-center w-full">
        POUR ME CONTACTER, C'EST ICI !
      </h1>
      <div className="max-w-7xl flex flex-col md:flex-row gap-12 w-full">
        <form className="flex-[1.3] flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nom"
            className="text-[#F6B99C] border border-[#f9c6b0] rounded-none px-4 py-3 focus:outline-none focus:border-[#ffb6b6] transition-colors bg-white focus:bg-[#f6b99c32] focus:text-black"
          />
          <input
            type="email"
            placeholder="Adresse email"
            className="text-[#F6B99C] border border-[#f9c6b0] rounded-none px-4 py-3 focus:outline-none focus:border-[#ffb6b6] transition-colors bg-white focus:bg-[#f6b99c32] focus:text-black"
          />
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="text-[#F6B99C] border border-[#f9c6b0] rounded-none px-4 py-3 focus:outline-none focus:border-[#ffb6b6] transition-colors bg-white focus:bg-[#f6b99c32] focus:text-black"
          >
            <option value="">La demande concerne</option>
            <option value="creation">
              Une demande de création personnalisée
            </option>
            <option value="produit">Une question sur un produit</option>
            <option value="sav">
              SAV / Un problème avec la commande ou le produit
            </option>
            <option value="commande">Une question sur ma commande</option>
            <option value="autre">Autre chose</option>
          </select>
          <textarea
            placeholder="Message"
            rows={5}
            className="border border-[#f9c6b0] rounded-none px-4 py-3 transition-colors bg-white text-[#F6B99C] focus:text-black focus:bg-[#f6b99c32] focus:outline-none"
          />
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-800 text-white px-6 py-2 hover:bg-[#E8A499] transition-colors duration-200"
            >
              Envoyer
            </button>
          </div>
        </form>
        <div className="flex-[0.7] flex flex-col justify-start gap-6">
          <div className="text-gray-700 text-base leading-relaxed">
            <p>
              Si tu souhaites plus d'informations concernant une création
              personnalisée qui n’est pas en boutique, tu peux également me
              contacter via Instagram :<br />
              <a
                href="https://www.instagram.com/audelweiss.craft/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#ff5e7e] font-semibold"
              >
                @audelweiss.craft
              </a>
            </p>
            <p className="mt-4">
              En cas de question concernant une commande passée, merci de
              m’écrire absolument via ce formulaire{" "}
              <span role="img" aria-label="emoji">
                🤗
              </span>
            </p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src={"/images/hautes-alpes.png.webp"}
              alt={`hautes-alpes`}
              className="w-60 h-60"
            ></img>
            <div className="text-[#f9c6b0] text-center text-md mt-2">
              Entreprise basée au 💛 des Hautes-Alpes, dans l’Embrunais
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
