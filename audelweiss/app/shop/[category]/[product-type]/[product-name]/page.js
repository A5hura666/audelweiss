"use client";

import {Breadcrumbs} from "@/app/components/breadcrambs/breadcrumbs";
import ShopCard from "../../../../components/shopCard";
import * as React from "react";
import {useEffect, useState} from "react";
import CustomerReview from "@/app/components/customerComment/customerReview";
import Image from "next/image";
import MarkdownRenderer from "@/app/components/MarkDownRenderer";
import {getStrapiCall} from "@/app/lib/utils";

export default function Product() {
    let data = [];
    const thumbnails = [
        "https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg",
        "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg",
        "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg",
    ];
    useEffect(() => {
        const mainImage = document.getElementById("main-image");
        const thumbnails = document.querySelectorAll("[data-src]");

        thumbnails.forEach((thumb) => {
            thumb.addEventListener("click", () => {
                const newSrc = thumb.getAttribute("data-src");
                mainImage.src = newSrc;

                // Optionnel : gérer la bordure active
                thumbnails.forEach((t) => t.classList.remove("border-[#ff6187]"));
                thumb.classList.add("border-[#ff6187]");
            });
        });
    }, []);

    const defaultSize = "adulte";
    const defaultPompom = "oui";
    const idArticle = localStorage.getItem('selectedProductId'); // Remplacez par l'ID de l'article que vous souhaitez afficher

    const [size, setSize] = useState(defaultSize);
    const [color, setColor] = useState(null);
    const [pompom, setPompom] = useState(defaultPompom);
    const [markdown, setMarkdown] = useState("");
    const [productName, setProductName] = useState("");
    const [productCategory, setProductCategory] = useState("");
    const [productParentPrice, setProductParentPrice] = useState(0);
    const [productChildPrice, setProductChildPrice] = useState(0);
    const [productDescription, setProductDescription] = useState("");
    const [isLoaded, setIsLoaded] = useState(true);
    const [filters, setFilters] = useState([]); // State pour les filtres
    const [colorFilter, setColorFilter] = useState([]); // State pour le filtre de couleur
    const [productOffers, setProductOffers] = useState(''); // State pour les offres du produit
    const [productSize, setProductSize] = useState(''); // State pour la taille du produit
    const [productWeight, setProductWeight] = useState(''); // State pour le poids du produit
    const [selectedFilters, setSelectedFilters] = useState({
        size: "",
        pompom: ""
    });
    const [productInformations, setProductInformations] = useState({
        composition: "",
        washingMachine: "",
        maxWashingTemperature: "",
    });

    useEffect(() => {
        const fetchHeaderData = async () => {
            try {
                const response = await fetch(
                    getStrapiCall(`/api/product-article-descriptions?filters[product_article][id][$eq]=${idArticle}` +
                        `&populate=*&populate[productImages]=*&populate[product_colors][populate]=colorImage&` +
                        `populate[product_filters][populate]=*&populate[product_article][populate]=*`)
                );
                const data = await response.json();

                const technicalDetail = data.data[0].technicalDetail;
                setMarkdown(technicalDetail); // Update state
                setProductName(data.data[0].product_article.productName);
                setProductCategory(data.data[0].product_article.productCategory);
                setProductParentPrice(data.data[0].product_article.productAdultPrice);
                setProductChildPrice(data.data[0].product_article.productChildPrice);
                setProductDescription(data.data[0].description);
                setFilters(data.data[0].product_filters);
                setColorFilter(data.data[0].product_colors);
                setProductOffers(data.data[0].reduction);
                setProductSize(data.data[0].size);
                setProductInformations({
                    composition: data.data[0].composition,
                    washingMachine: data.data[0].whashing,
                    maxWashingTemperature: data.data[0].maxWashingTemp,
                });
                setProductWeight(data.data[0].weight);
                setIsLoaded(false); // Set isLoaded to false after data is fetched
            } catch (error) {
                console.error("Error fetching header data:", error);
            }
        };
        fetchHeaderData();
    }, []);


    // fonction reset
    const resetFilters = () => {
        setSize(defaultSize);
        setPompom(defaultPompom);
        setQuantity(0);
    };

    const [quantity, setQuantity] = useState(0);

    const increment = () => setQuantity(prev => prev + 1);
    const decrement = () => setQuantity(prev => (prev > 0 ? prev - 1 : 0));
    const handleInputChange = (e) => {
        const value = parseInt(e.target.value);
        setQuantity(isNaN(value) ? 0 : value);
    };

    // State qui contient la source de l'image principale
    const [mainImageSrc, setMainImageSrc] = useState("https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg");

    const [isOpen, setIsOpen] = useState(false);

    const [currentIndex, setCurrentIndex] = useState(0);

    // Met à jour l'index de l'image principale (bouclage)
    const changeImageByIndex = (newIndex) => {
        if (newIndex < 0) {
            setCurrentIndex(thumbnails.length - 1);
        } else if (newIndex >= thumbnails.length) {
            setCurrentIndex(0);
        } else {
            setCurrentIndex(newIndex);
        }
    };

    // Gestion des flèches clavier
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "ArrowLeft") {
                changeImageByIndex(currentIndex - 1);
            } else if (event.key === "ArrowRight") {
                changeImageByIndex(currentIndex + 1);
            } else if (event.key === "Escape") {
                setIsOpen(false); // ferme la modal zoomée
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [currentIndex]);

    // Fonction pour setter la valeur en fonction du nom du filtre
    const handleFilterChange = (filterName, value) => {
        setSelectedFilters((prev) => ({
            ...prev,
            [filterName]: value
        }));
    };


    return (
        <section className="">
            {/* Loader */}

            {isLoaded && (<div
                role="status"
                className="fixed inset-0 flex items-center justify-center bg-white/70 dark:bg-gray-800/70 z-50"
                style={{backdropFilter: 'blur(5px)'}}
            >
                <svg
                    aria-hidden="true"
                    className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-[#ff6187]"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                    />
                    <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                    />
                </svg>
                <span className="sr-only">Loading...</span>
            </div>)}


            <section
                className="flex flex-col items-start justify-center text-center text-white py-[20px] 2xl:px-[20%] xl:px-[10%] lg:px-[5%]"
                style={{
                    backgroundColor: "#E8A499",
                }}
            >
                <Breadcrumbs></Breadcrumbs>
            </section>
            <section id={"product-main-content "} className={"px-4 2xl:px-[20%] xl:px-[10%] lg:px-[5%] py-4"}>
                <div
                    className={"flex flex-col md:flex-row md:items-start justify-center text-center py-[20px] w-full gap-4"}>
                    <section className={"flex flex-col items-start justify-center text-center py-[20px] w-full"}
                             style={{width: `100%`}}>
                        <section className="flex flex-col gap-4">
                            <div>
                                <img
                                    id="main-image"
                                    src={thumbnails[currentIndex]}
                                    alt="Image principale"
                                    className={"h-auto max-w-full rounded-lg border-4 border-white shadow-lg cursor-pointer max-h-[650px]"}
                                    onClick={() => setIsOpen(true)}
                                />
                                {isOpen && (
                                    <div
                                        className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                                        <div className="relative">
                                            <Image
                                                src={thumbnails[currentIndex]}
                                                alt="Zoom photo"
                                                width={800}
                                                height={800}
                                                className="rounded-lg max-w-full max-h-[90vh]"
                                            />
                                            <button
                                                onClick={() => setIsOpen(false)}
                                                className="absolute top-2 right-2 text-white text-2xl"
                                            >
                                                &times;
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div>
                                {/* Miniatures */}
                                <div className="flex justify-center gap-4 mt-4 overflow-x-auto">
                                    {thumbnails.map((src, index) => (
                                        <img
                                            key={src}
                                            src={src}
                                            alt={`Miniature ${index + 1}`}
                                            className={`h-20 w-auto rounded-lg border-2 cursor-pointer ${
                                                currentIndex === index ? "border-pink-600" : "border-transparent"
                                            }`}
                                            onClick={() => setCurrentIndex(index)}
                                        />
                                    ))}
                                </div>
                                {/* Ajoute les autres miniatures de la même façon */}
                            </div>
                        </section>
                        <i className={" hidden md:block w-full text-center py-4"}>Sur ordinateur, utilises les flèches
                            du clavier pour naviguer
                            entre les photos 😊</i>
                    </section>
                    <section className={" py-[20px] text-left flex flex-col gap-4 align-middle px-[20px]"}>
                        <h2 className="text-5xl uppercase aboreto ">{productName}</h2>
                        <h3 className="border-pink">
                            Catégorie : <span className="color-pink">Bandeaux / bonnets</span>
                        </h3>
                        <section className={"flex flex-col gap-4 list-none"}>
                            <p className={"w-5/6 leading-7"}>
                                {productDescription || "Aucun descriptif disponible pour ce produit."}
                            </p>
                            <h4 className={"text-[#ff6187] text-3xl"}>{productChildPrice}€ - {productParentPrice}€</h4>
                            <div>
                                {filters.map(({ id, filterName, filterValues }) => {
                                    const currentValue = selectedFilters[filterName] || "";

                                    return (
                                        <div key={id} className="mb-4">
                                            <h5>
                                                {filterName.charAt(0).toUpperCase() + filterName.slice(1)} :{" "}
                                                <span>{ currentValue=== '' ? "aucun choix n'a été fait"  :   currentValue.charAt(0).toUpperCase() + currentValue.slice(1)}</span>
                                            </h5>
                                            <ul className="space-y-2 flex flex-col md:flex-row gap-2">
                                                {Object.entries(filterValues).map(([key, val]) => (
                                                    <li key={key}>
                                                        <input
                                                            type="radio"
                                                            id={`${filterName}-${key}`}
                                                            name={filterName}
                                                            value={val}
                                                            checked={currentValue === val}
                                                            onChange={() => handleFilterChange(filterName, val)}
                                                            className="hidden peer"
                                                        />
                                                        <label
                                                            htmlFor={`${filterName}-${key}`}
                                                            className="block cursor-pointer rounded border-gray-400 px-4 py-2 select-none peer-checked:border-[#e8a499] border-2"
                                                        >
                                                            {val.charAt(0).toUpperCase() + val.slice(1)}
                                                        </label>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className={"space-y-6"}>
                                <h5>
                                    Couleur :
                                    <span>{color ? color : "Aucune couleur sélectionnée"}</span>
                                </h5>
                                <ul className={"flex"}>
                                    {colorFilter.map((col) => (
                                        <li key={col.id} className="relative group">
                                            <input
                                                type="radio"
                                                id={`size-${col.id}`}
                                                name="size"
                                                value={col.colorName}
                                                checked={size === col.colorName}
                                                onChange={() => setColor(col.colorName)}
                                                className="hidden peer"
                                            />
                                            <label
                                                htmlFor={`size-${col.id}`}
                                                className="block cursor-pointer rounded border-gray-400 select-none peer-checked:border-[#e8a499] border-2 relative"
                                            >
                                                <img
                                                    src={`http://ayun.myddns.me:5000${col.colorImage.url}`}
                                                    alt={col.colorImage.alternativeText || col.colorName}
                                                    width={100}
                                                    height={100}
                                                    className="object-cover"
                                                />
                                                {/* Tooltip au-dessus de l’image avec fondu */}
                                                <span
                                                    className="text-lg absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 rounded bg-[rgba(0,0,0,0.7)] text-white whitespace-nowrap z-10
                   opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                                                >
        {col.colorName}
      </span>

                                            </label>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <section>
                                <label htmlFor="quantity-input"
                                       className="block font-medium text-gray-900 dark:text-white">Choisir la quantité
                                    :</label>
                                <div className="relative flex items-center max-w-[8rem]">
                                    <button type="button" onClick={decrement}
                                            className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                        <svg className="w-3 h-3 text-gray-900 dark:text-white"
                                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                                  strokeWidth="2" d="M1 1h16"/>
                                        </svg>
                                    </button>


                                    <input type="text" id="quantity-input"
                                           value={quantity}
                                           onChange={handleInputChange}
                                           className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                           placeholder="999" required/>

                                    <button type="button" onClick={increment}
                                            className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                        <svg className="w-3 h-3 text-gray-900 dark:text-white"
                                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                                  strokeWidth="2" d="M9 1v16M1 9h16"/>
                                        </svg>
                                    </button>
                                </div>
                                <section
                                    className={"text-lg text-gray-500 mt-2 bg-[#fbedec] p-2 rounded flex flex-col gap-2"}>
                                    <p>
                                        🔥3 achetés = le lot à 9€ au lieu de 12€
                                    </p>
                                    <p>
                                        Ajoute la quantité souhaitée au panier, la réduction apparaitra directement dans
                                        le panier sous forme de réduction.
                                    </p>
                                </section>
                            </section>
                        </section>
                    </section>
                </div>
                <div
                    className={"flex flex-row md:flex-row space-between items-start justify-between text-center gap-12 py-[20px] w-full"}>
                    <section className={"w-[60%] text-left flex flex-col gap-4"}>
                        <MarkdownRenderer markdownText={markdown}/>
                    </section>
                    <section className={"w-[30%] text-left flex flex-col gap-4"}>
                        <h3 className={"text-2xl aboreto"}>Informations</h3>
                        <table>
                            <tbody className={""}>
                            <tr className={"border-pink leading-[50px]"}>
                                <th className={"w-[15%]"}><img
                                    src="https://audelweiss.fr/wp-content/uploads/2025/02/yarn.svg" alt=""/></th>
                                <td>Composition : {productInformations.composition}</td>
                            </tr>
                            <tr className={"border-pink leading-[50px]"}>
                                <th><img src="https://audelweiss.fr/wp-content/uploads/2025/02/washing-machine.svg"
                                         alt=""/></th>
                                <td>Lavage en machine : {productInformations.washingMachine ? "Oui": "Non"}</td>
                            </tr>
                            {productInformations.washingMachine &&(
                                <tr className={"border-pink leading-[50px]"}>
                                    <th><img
                                        src="https://audelweiss.fr/wp-content/uploads/2025/02/washing-machine-temperature.svg"
                                        alt=""/></th>
                                    <td>Température max de lavage : {productInformations.maxWashingTemperature}°C</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                        <h3 className={"text-2xl aboreto"}>Informations</h3>
                        <table>
                            <tbody>
                            <tr className={"border-pink leading-[50px]"}>
                                <td>Poids</td>
                                <td>{productWeight} kg</td>
                            </tr>
                            <tr className={"border-pink leading-[50px]"}>
                                <td>Dimensions</td>
                                <td>{productSize}</td>
                            </tr>
                            </tbody>
                        </table>
                    </section>
                </div>
            </section>
            <section id={"related-products"}>
                <section>
                    <CustomerReview></CustomerReview>
                </section>
                <section>
                    <h2>Tu pourrais aussi aimer ...</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {data.map((product, index) => (
                            <ShopCard key={index} product={product}/>
                        ))}
                    </div>
                </section>
            </section>
            <div
                className={`fixed bottom-0 left-0 w-full bg-white dark:bg-gray-800 border-t border-gray-300 dark:border-gray-600 p-4 flex flex-col items-center shadow-lg transition-all duration-500 ease-in-out overflow-hidden ${
                    quantity > 0 ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
                <div
                    className="flex flex-wrap items-center justify-center gap-6 mb-3 text-sm text-gray-800 dark:text-gray-200">
                    <span><strong>Taille :</strong> {size}</span>
                    <span><strong>Pompom :</strong> {pompom}</span>
                    <span><strong>Couleur :</strong> {color || "Aucune couleur sélectionnée"}</span>
                    <span><strong>Quantité :</strong> {quantity}</span>
                    <span><strong>Total :</strong> {(14 * quantity).toFixed(2)} €</span>
                </div>

                <div className="flex justify-center gap-4">
                    <button
                        onClick={resetFilters}
                        className="cursor-pointer rounded-lg bg-gray-200 px-6 py-2 font-medium text-gray-700 hover:opacity-80 focus:ring"
                    >
                        Annuler mes choix
                    </button>
                    <button
                        type="button"
                        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5"
                    >
                        Ajouter au panier
                    </button>
                </div>
            </div>
        </section>
    )
        ;
}
