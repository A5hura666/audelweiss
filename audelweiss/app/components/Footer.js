// components/Footer.js
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-[#303028] text-white py-10">
            <div className="container mx-auto px-6 lg:px-20 grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Colonne 1 : Besoin d'aide */}
                <div className="text-center md:text-left">
                    <h3 className="text-lg font-semibold mb-3">Besoin d’aide ?</h3>
                    <ul className="space-y-2">
                        <li><Link href="/point-de-vente" className="hover:underline">Points de ventes physiques</Link></li>
                        <li><Link href="/livraison" className="hover:underline">Livraison</Link></li>
                        <li><Link href="/faq" className="hover:underline">Foire aux questions</Link></li>
                        <li><Link href="/contact" className="hover:underline">Me contacter</Link></li>
                    </ul>
                </div>

                {/* Colonne 2 : Logo + Description */}
                <div className="text-center">
                    <Image
                        src="https://audelweiss.fr/wp-content/uploads/2025/02/logo-blanc.svg"
                        alt="Logo Audelweiss"
                        width={150}
                        height={50}
                        className="mx-auto"
                    />
                    <p className="mt-4 text-sm">
                        Chaque pièce est imaginée et réalisée à la main dans les Hautes-Alpes, avec passion et créativité.
                    </p>
                    <p className="mt-2 text-sm">Retrouvez-moi sur Instagram pour suivre les actus 🧶✨</p>
                    <div className="mt-4">
                        <Link href="https://www.instagram.com/audelweiss.craft/" target="_blank">
              <span className="bg-pink-500 p-3 rounded-full hover:bg-pink-600 transition">
                📷 Instagram
              </span>
                        </Link>
                    </div>
                </div>

                {/* Colonne 3 : Liens utiles */}
                <div className="text-center md:text-right">
                    <h3 className="text-lg font-semibold mb-3">Liens utiles</h3>
                    <ul className="space-y-2">
                        <li><Link href="/cgv" className="hover:underline">CGV</Link></li>
                        <li><Link href="/mentions-legales" className="hover:underline">Mentions légales</Link></li>
                        <li><Link href="/privacy-policy" className="hover:underline">Politique de confidentialité</Link></li>
                    </ul>
                </div>

            </div>

            {/* Ligne de séparation */}
            <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
                <p>2025 © AUDELWEISS Craft – Site réalisé par{" "}
                    <Link href="https://audreyhossepian.fr" target="_blank" className="underline">
                        Audrey HOSSEPIAN
                    </Link>
                </p>
            </div>
        </footer>
    );
}
