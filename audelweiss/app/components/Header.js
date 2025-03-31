// components/Header.js
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto flex justify-between items-center p-4">
                {/* Logo */}
                <Link href="https://audelweiss.fr/">
                    <Image
                        src="logo-wide.svg"
                        alt="Logo"
                        width={150}
                        height={50}
                    />
                </Link>

                {/* Menu */}
                <nav>
                    <ul className="flex space-x-6">
                        <li><Link href="/audelweiss/public">Accueil</Link></li>
                        <li><Link href="/shop">Boutique</Link></li>
                        <li><Link href="/creations">Créations</Link></li>
                        <li><Link href="/a-propos">À propos</Link></li>
                        <li><Link href="/blog">Blog</Link></li>
                        <li>
                            <Link href="/my-account">
                                <Image
                                    src="images/circle-dotted-user.svg"
                                    alt="Mon compte"
                                    width={24}
                                    height={24}
                                />
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
