"use client";

import { Breadcrumbs } from "@/app/components/breadcrambs/breadcrumbs";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import ShopCard from "../components/shopCard";
import * as React from "react";

function valuetext(value) {
  return `${value}€`;
}

let test = [
  {
    category: "BONNETS",
    model: "POMPOM",
    name: "Urban Yeti",
    price: "14.00€ - 18,00€",
    link: "/shop/bonnets/pompom-urban-yeti",
    img1: "/images/shop/bonnet.png",
    img2: "/images/shop/bg3.png.webp",
  },
  {
    category: "BONNETS",
    model: "POMPOM",
    name: "Urban Yeti",
    price: "14.00€ - 18,00€",
    link: "/shop/bonnets/pompom-urban-yeti2",
    img1: "/images/shop/bonnet.png",
  },
  {
    category: "BONNETS",
    model: "POMPOM",
    name: "Urban Yeti",
    price: "14.00€ - 18,00€",
    link: "/shop/bonnets/pompom-urban-yeti3",
    img1: "/images/shop/bonnet.png",
  },
  {
    category: "BONNETS",
    model: "POMPOM",
    name: "Urban Yeti",
    price: "14.00€ - 18,00€",
    link: "/shop/bonnets/pompom-urban-yeti4",
    img1: "/images/shop/bonnet.png",
  },
  {
    category: "BONNETS",
    model: "POMPOM",
    name: "Urban Yeti",
    price: "14.00€ - 18,00€",
    link: "/shop/bonnets/pompom-urban-yeti5",
    img1: "/images/shop/bonnet.png",
  },
  {
    category: "BONNETS",
    model: "POMPOM",
    name: "Urban Yeti",
    price: "14.00€ - 18,00€",
    link: "/shop/bonnets/pompom-urban-yeti6",
    img1: "/images/shop/bonnet.png",
  },
];

export default function Shop() {
  const [value, setValue] = React.useState([0, 100]);
  const [isCategoryOpen, setCategoryOpen] = React.useState(true);
  const [isPriceOpen, setPriceOpen] = React.useState(true);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (index, event) => {
    const newValue = [...value];
    newValue[index] =
      event.target.value === "" ? "" : Number(event.target.value);
    setValue(newValue);
  };

  return (
    <div>
      <section
        className="h-[450px] lg:h-[350px] bg-cover bg-center flex flex-col items-center justify-center text-center text-white py-[50px]"
        style={{ backgroundImage: "url(/images/shop/bg3.png.webp)" }}
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
          <div class="relative">
            <section id="categories" className="flex flex-col justify-between">
              <section class=" mb-4">
                <button
                  type="button"
                  className="w-full text-left text-lg font-semibold text-[#E8A499] flex items-center justify-between"
                  onClick={() => setCategoryOpen(!isCategoryOpen)}
                >
                  <span>Catégories </span>
                  {isCategoryOpen ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-chevron-up-icon lucide-chevron-up"
                    >
                      <path d="m18 15-6-6-6 6" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-chevron-down-icon lucide-chevron-down"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  )}
                </button>
                {isCategoryOpen && (
                  <ul className="panel space-y-2 border-b-[#E8A499] border-b-1 pb-4">
                    <li className="pl-0 flex gap-2">
                      <input
                        type="checkbox"
                        id="accessoiresCheckbox"
                        className="w-6 h-6 accent-[#E8A499] border-[#E8A499] rounded-md"
                      />{" "}
                      Accessoires
                    </li>
                    <li className="pl-4 flex gap-2">
                      <ul className="space-y-2">
                        <li className="pl-4  flex gap-2">
                          <input
                            type="checkbox"
                            id="bandeauCheckbox"
                            className="w-6 h-6 accent-[#E8A499] border-[#E8A499] rounded-md"
                          />{" "}
                          Bandeaux
                        </li>
                        <li className="pl-4 flex gap-2">
                          <input
                            type="checkbox"
                            id="bonnetCheckbox"
                            className="w-6 h-6 accent-[#E8A499] border-[#E8A499] rounded-md"
                          />{" "}
                          Bonnets
                        </li>
                        <li className="pl-4 flex gap-2">
                          <input
                            type="checkbox"
                            id="bannaneCheckbox"
                            className="w-6 h-6 accent-[#E8A499] border-[#E8A499] rounded-md"
                          />{" "}
                          Sacs / Bannanes
                        </li>
                        <li className="pl-4 flex gap-2">
                          <input
                            type="checkbox"
                            id="scrunchyCheckbox"
                            className="w-6 h-6 accent-[#E8A499] border-[#E8A499] rounded-md"
                          />{" "}
                          Scrunchy
                        </li>
                      </ul>
                    </li>
                    <li className="pl-0 flex gap-2">
                      <input
                        type="checkbox"
                        id="cuisineCheckbox"
                        className="w-6 h-6 accent-[#E8A499] border-[#E8A499] rounded-md"
                      />{" "}
                      Cuisine
                    </li>
                    <li className="pl-0 flex gap-2">
                      <input
                        type="checkbox"
                        id="decoCheckbox"
                        className="w-6 h-6 accent-[#E8A499] border-[#E8A499] rounded-md"
                      />{" "}
                      Déco
                    </li>
                  </ul>
                )}
              </section>
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
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-chevron-up-icon lucide-chevron-up"
                  >
                    <path d="m18 15-6-6-6 6" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-chevron-down-icon lucide-chevron-down"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                )}
              </button>
              {isPriceOpen && (
                <section className="flex flex-col gap-2 items-center panel border-b-[#E8A499] border-b-1 pb-4">
                  <Box sx={{ width: "80%" }}>
                    <Slider
                      value={value}
                      onChange={handleSliderChange}
                      valueLabelDisplay="auto"
                      getAriaValueText={valuetext}
                      style={{ color: "#E8A499" }}
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
          {test.map((item) => (
            <ShopCard
              key={item.link}
              category={item.category}
              model={item.model}
              name={item.name}
              price={item.price}
              link={item.link}
              img1={item.img1}
              img2={item.img2 !== undefined ? item.img2 : ""}
            />
          ))}
        </section>
      </section>
    </div>
  );
}
