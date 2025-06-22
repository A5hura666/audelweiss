"use client";

import {Breadcrumbs} from "@/app/components/breadcrambs/breadcrumbs";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import ShopCard from "../components/shopCard";
import * as React from "react";
import {useEffect} from "react";
import {getStrapiCall} from "@/app/lib/utils";

function valuetext(value) {
    return `${value}€`;
}


let data = [];

export default function Shop() {
    const [value, setValue] = React.useState([0, 100]);
    const [isPriceOpen, setPriceOpen] = React.useState(true);
    const [allProducts, setAllProducts] = React.useState([]);
    const [isCategoryOpenData, setisCategoryOpenData] = React.useState({});
    const [isCategoryOpenD, setIsCategoryOpenD] = React.useState(true);
    const [checkedCategories, setCheckedCategories] = React.useState({});

    const toggleCategoryOpen = (category) => {
        setisCategoryOpenData((prev) => ({
            ...prev,
            [category]: !prev[category],
        }));
        setIsCategoryOpenD(!isCategoryOpenD);
    };

    const handleCategoryChange = (category, subCategories) => {
        const isChecked = !checkedCategories[category];

        // Mettre à jour la catégorie et toutes ses sous-catégories
        setCheckedCategories((prev) => {
            const newState = { ...prev, [category]: isChecked };
            subCategories.forEach((sub) => {
                newState[`${category}-${sub}`] = isChecked;
            });
            return newState;
        });
    };

    const handleSubCategoryChange = (category, subCategory, allSubCategories) => {
        const subCategoryKey = `${category}-${subCategory}`;
        const isChecked = !checkedCategories[subCategoryKey];

        setCheckedCategories((prev) => {
            const newState = { ...prev, [subCategoryKey]: isChecked };

            // Vérifie si toutes les sous-catégories sont cochées → coche la catégorie
            const allChecked = allSubCategories.every(
                (sub) => newState[`${category}-${sub}`]
            );
            newState[category] = allChecked;

            return newState;
        });
    };

    const handleSliderChange = (event, newValue) => {
        if (newValue[0] <= newValue[1]) {
            setValue(newValue);
        }
    };

    const handleInputChange = (index, event) => {
        const newValue = [...value];
        newValue[index] =
            event.target.value === "" ? "" : Number(event.target.value);

        if (newValue[0] <= newValue[1]) {
            setValue(newValue);
        }
    };

    useEffect(() => {
        const fetchHeaderData = async () => {
            try {
                const response = await fetch(
                    getStrapiCall(`/api/product-article-cards?populate=productImages`)
                );
                const data = await response.json();
                setAllProducts(data.data);
                console.log("Fetched data:", data);
            } catch (error) {
                console.error("Error fetching header data:", error);
            }
        };
        fetchHeaderData();
    }, []);

    // Construire un objet catégorie → sous-catégories
    const categories = allProducts.reduce((acc, product) => {
        if (!acc[product.productCategory]) {
            acc[product.productCategory] = new Set();
        }
        if (product.subCategory) {
            acc[product.productCategory].add(product.subCategory);
        }
        return acc;
    }, {});

    return (
        <div>
            <section
                className="h-[450px] lg:h-[350px] bg-cover bg-center flex flex-col items-center justify-center text-center text-white py-[50px]"
                style={{backgroundImage: "url(/images/shop/bg3.png.webp)"}}
            >
                <h1 className="text-7xl uppercase aboreto">Boutiques</h1>
                <span className="flex">
          <Breadcrumbs></Breadcrumbs>
        </span>
            </section>
            <section
                id="shop"
                className="container mx-auto mb-12 p-4 flex flex-col gap-4 md:flex-row"
            >
                <form action="" className="flex flex-col gap-4 w-full md:w-1/4">
                    <div className={"relative"}>
                        <section id="categories" className="flex flex-col justify-between">
                            {Object.entries(categories).map(([category, subCategories]) => (
                                <div key={category} className="mb-4">
                                    <button
                                        type="button"
                                        className="w-full text-left text-lg font-semibold text-[#E8A499] flex items-center justify-between"
                                        onClick={() => toggleCategoryOpen(category)}
                                    >
                                        <span>{category}</span>
                                        {isCategoryOpenD ? (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className={"lucide lucide-chevron-up-icon lucide-chevron-up"}
                                            >
                                                <path d="m18 15-6-6-6 6"/>
                                            </svg>
                                        ) : (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className={"lucide lucide-chevron-up-icon lucide-chevron-down"}
                                            >
                                                <path d="m6 9 6 6 6-6"/>
                                            </svg>
                                        )}
                                    </button>

                                    {isCategoryOpenData[category] && (
                                        <ul className="panel space-y-2 border-b-[#E8A499] border-b-1 pb-4">
                                            <li className="pl-0 flex gap-2">
                                                <input
                                                    type="checkbox"
                                                    id={`${category}Checkbox`}
                                                    checked={!!checkedCategories[category]}
                                                    onChange={() =>
                                                        handleCategoryChange(category, [...subCategories])
                                                    }
                                                    className="w-6 h-6 accent-[#E8A499] border-[#E8A499] rounded-md"
                                                />
                                                {category}
                                            </li>

                                            {[...subCategories].map((sub) => (
                                                <li key={sub} className="pl-4 flex gap-2">
                                                    <input
                                                        type="checkbox"
                                                        id={`${category}-${sub}Checkbox`}
                                                        checked={!!checkedCategories[`${category}-${sub}`]}
                                                        onChange={() =>
                                                            handleSubCategoryChange(category, sub, [...subCategories])
                                                        }
                                                        className="w-6 h-6 accent-[#E8A499] border-[#E8A499] rounded-md"
                                                    />
                                                    {sub}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}

                            <button
                                type="button"
                                className="w-full text-left text-lg font-semibold text-[#E8A499] flex items-center justify-between"
                                onClick={() => setPriceOpen(!isPriceOpen)}
                            >
                                <span>Prix </span>
                                {isPriceOpen ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className={"lucide lucide-chevron-up-icon lucide-chevron-up"}
                                    >
                                        <path d="m18 15-6-6-6 6"/>
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className={"lucide lucide-chevron-up-icon lucide-chevron-down"}
                                    >
                                        <path d="m6 9 6 6 6-6"/>
                                    </svg>
                                )}
                            </button>
                            {isPriceOpen && (
                                <section
                                    className="flex flex-col gap-2 items-center panel border-b-[#E8A499] border-b-1 pb-4">
                                    <Box sx={{width: "80%"}}>
                                        <Slider
                                            value={value}
                                            onChange={handleSliderChange}
                                            valueLabelDisplay="auto"
                                            getAriaValueText={valuetext}
                                            style={{color: "#E8A499"}}
                                            min={0}
                                            max={100}
                                        />
                                    </Box>
                                    <div className="flex gap-2 items-center">
                    <span className="flex items-center">
                      <input
                          type="number"
                          className="border border-[#E8A499] w-16 md:w-20 p-2 text-center"
                          value={value[0]}
                          onChange={(e) => handleInputChange(0, e)}
                      />
                      €
                    </span>
                                        <span>-</span>
                                        <span>
                      <input
                          type="number"
                          className="border border-[#E8A499] w-16 md:w-20 p-2 text-center"
                          value={value[1]}
                          onChange={(e) => handleInputChange(1, e)}
                      />
                      €
                    </span>
                                    </div>
                                </section>
                            )}
                        </section>
                    </div>
                </form>

                <section
                    id="products"
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols- w-full md:w-3/4 gap-4"
                >
                    {allProducts.map((item, index) => (
                        <ShopCard
                            key={item.productName + "-" + index}
                            category={item.productCategory}
                            model={item.subCategory}
                            name={item.productName}
                            price={item.price ? `${item.price}€` : `${item.productChildPrice}€ - ${item.productAdultPrice}€`}
                            img1={item.productImages[0].formats.thumbnail.url}
                            img2={item.productImages[1].formats.thumbnail.url !== undefined ? item.productImages[1].formats.thumbnail.url : ""}
                            rating={item.score}
                            productId={item.id}
                        />
                    ))}
                </section>
            </section>
        </div>
    );
}
