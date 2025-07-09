"use client";

import AccessoiresHoverSection from "./AccessoiresHoverSection";

export default function CategoriesSection({ categoriesData }) {
  if (
    !categoriesData ||
    !categoriesData.categories ||
    categoriesData.categories.length === 0
  ) {
    return null;
  }

  return (
    <section className="bg-[#fdf1eb] py-30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="relative flex flex-col items-center col-span-1 md:col-span-1">
            <img
              className="w-48 h-[28rem] object-cover rounded-full shadow 
      relative z-0 md:absolute md:-top-20 md:-left-10 md:z-10 pointer-events-none md:pointer-events-auto"
              src="https://audelweiss.fr/wp-content/uploads/2025/02/0b0bc07c-1615-4152-b893-770a637929dc.webp"
              alt="Image décorative"
            />

            <img
              className="w-80 h-[23rem] object-cover shadow 
      relative -translate-y-12 z-0 md:translate-y-0 md:absolute md:top-20 md:left-20 md:z-20 pointer-events-none md:pointer-events-auto"
              src="https://audelweiss.fr/wp-content/uploads/2025/02/bandeaufantaisie.jpg.webp"
              alt="Bandeau fantaisie"
            />
          </div>

          <div className="col-span-1 md:col-span-2 flex flex-col">
            {/* Sur mobile, afficher les catégories en colonne, images en dessous du texte */}
            <div className="flex flex-col gap-6 w-full md:hidden">
              {categoriesData.categories.map((category) => (
                <a
                  key={category.title}
                  href={category.url || "#"}
                  className="flex flex-col items-center bg-white rounded-lg shadow p-4"
                >
                  <span className="text-lg font-semibold mb-2">{category.title}</span>
                  {category.image?.url && (
                    <img
                      src={`http://ayun.myddns.me:5000${category.image.url}`}
                      alt={category.title}
                      className="w-40 h-40 object-cover rounded-md mt-2"
                    />
                  )}
                </a>
              ))}
            </div>
            {/* Desktop : AccessoiresHoverSection */}
            <div className="hidden md:block w-full">
              <AccessoiresHoverSection
                items={categoriesData.categories.map((category) => ({
                  key: category.title?.toLowerCase().replace(/\s+/g, "-") || "",
                  label: category.title || "",
                  href: category.url || "#",
                  image: category.image?.url
                    ? `http://ayun.myddns.me:5000${category.image.url}`
                    : "",
                }))}
                buttonItem={{
                  label: "Découvrir les accessoires",
                  href: "/shop/Accessoires/",
                }}
                className="w-full"
              />
            </div>
            {/* Bouton mobile */}
            <div className="block md:hidden mt-6 w-full">
              <a
                href="/shop/Accessoires/"
                className="block w-full text-center bg-[#e8a499] text-white font-semibold py-3 rounded shadow hover:bg-[#f6b99c] transition"
              >
                Découvrir les accessoires
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
