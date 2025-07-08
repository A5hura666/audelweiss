"use client";

import AccessoiresHoverSection from "./AccessoiresHoverSection";

export default function CategoriesSection({ categoriesData }) {
    if (!categoriesData || !categoriesData.categories || categoriesData.categories.length === 0) {
        return null;
    }

    return (
        <section className="bg-[#fdf1eb] py-30">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Section des images décoratives */}
                    <div className="relative flex justify-center space-y-4 col-span-1 md:col-span-1">
                        <img
                            className="w-48 h-[28rem] object-cover rounded-full shadow absolute -top-20 -left-10 z-10"
                            src="https://audelweiss.fr/wp-content/uploads/2025/02/0b0bc07c-1615-4152-b893-770a637929dc.webp"
                            alt="Image décorative"
                        />
                        <img
                            className="w-80 h-[23rem] object-cover shadow absolute top-20 left-20 z-20"
                            src="https://audelweiss.fr/wp-content/uploads/2025/02/bandeaufantaisie.jpg.webp"
                            alt="Bandeau fantaisie"
                        />
                    </div>

                    {/* Section des catégories */}
                    <div className="col-span-1 md:col-span-2">
                        <AccessoiresHoverSection 
                            items={categoriesData.categories.map(category => ({
                                key: category.title?.toLowerCase().replace(/\s+/g, '-') || '',
                                label: category.title || '',
                                href: category.url || '#',
                                image: category.image?.url ? `http://ayun.myddns.me:5000${category.image.url}` : ''
                            }))}
                            buttonItem={{
                                label: "Découvrir les accessoires",
                                href: "/shop/Accessoires/"
                            }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
} 