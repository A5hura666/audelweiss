import {useState, useEffect} from "react";
import Link from "next/link";
import {Heart} from "lucide-react";
import {motion, AnimatePresence} from "framer-motion";

export default function ShopCard(props) {
    const [isHovered, setIsHovered] = useState(false);
    const [liked, setLiked] = useState(false);

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
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)+/g, "");

    const addProductToWishlist = async (productId) => {
        const res = await fetch("/api/wishList", {
            method: liked ? "DELETE" : "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                productId,
                userId: JSON.parse(localStorage.getItem("user")).id,
            }),
        });
    };

    // Appel une seule fois pour récupérer la wishlist et initialiser le like
    useEffect(() => {
        const getAllWishListProduct = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                const wishListRes = await fetch("/api/wishList", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await wishListRes.json();
                if (data?.wishList) {
                    const isLiked = data.wishList.some((item) => item.productId === productId);
                    setLiked(isLiked);
                }
            } catch (error) {
                console.error("Erreur récupération wishlist", error);
            }
        };

        getAllWishListProduct();
    }, [productId]);

    return (
        <div className="relative flex flex-col items-center w-60 mx-auto">
            <div className="relative flex flex-col items-center w-60 justify-center">
                <div
                    className="relative flex justify-center group w-full h-60"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {
                        localStorage.getItem("user") && (
                            <button
                                onClick={() => {
                                    setLiked(!liked);
                                    addProductToWishlist(productId);
                                }}
                                className="absolute top-2 right-2 z-20 p-2 rounded-full bg-white shadow-md"
                            >
                                <AnimatePresence>
                                    <motion.div
                                        key={liked ? "liked" : "unliked"}
                                        animate={{scale: 1.2, opacity: 1}}
                                        transition={{type: "spring", stiffness: 300, damping: 15}}
                                    >
                                        <Heart
                                            size={24}
                                            className={`transition-colors ${
                                                liked ? "fill-[#e8a499] text-[#e8a499]" : "text-gray-400"
                                            }`}
                                        />
                                    </motion.div>
                                </AnimatePresence>
                            </button>
                        )
                    }


                    {/* Image principale */}
                    <img
                        src={"http://ayun.myddns.me:5000" + img1}
                        alt={`${category} ${model} ${name}`}
                        className={`absolute w-full h-full object-cover transition-opacity duration-300 ${
                            isHovered && img2 ? "opacity-0" : "opacity-100"
                        }`}
                    />

                    {/* Image hover */}
                    {img2 && (
                        <img
                            src={"http://ayun.myddns.me:5000" + img2}
                            alt={`${category} ${model} ${name} - hover`}
                            className={`absolute w-full h-full object-cover transition-opacity duration-300 ${
                                isHovered ? "opacity-100" : "opacity-0"
                            }`}
                        />
                    )}

                    {/* Bouton Choix des options */}
                    <div className="absolute z-10 bottom-2 w-full px-4">
                        <Link
                            href={`/shop/${category}/${model}${name ? `/${slugify(name)}` : ""}`}
                            className="w-full block bg-black text-white text-sm py-2 hover:bg-[#ff6187] transition text-center"
                            onClick={() => localStorage.setItem("selectedProductId", productId)}
                        >
                            Choix des options
                        </Link>
                    </div>
                </div>
            </div>

            {/* Infos produit */
            }
            <div className="text-center mt-2">
                <h2 className="text-sm font-semibold">
                    {category} {model ? `| ${model}` : ""}
                </h2>
                <h3 className="text-lg font-bold">{name}</h3>
                <h3 className="text-md font-bold">{price}</h3>
            </div>
        </div>
    )
        ;
}
