"use client";

import ShopCard from "./shopCard";

export default function ProductsCarousel({ productsData }) {
    if (!productsData || !productsData.product_articles || productsData.product_articles.length === 0) {
        return null;
    }

    return (
        <section className="bg-white py-12 px-4">
            <div className="max-w-6xl mx-auto text-center mb-12 text-3xl text-gray-800">
                <h2>
                    {productsData.title || 'Des créations artisanales uniques'}
                </h2>
                <p className="mt-2">
                    {productsData.description || 'Fait main avec passion, pour toi et ceux que tu aimes ✨'}
                </p>
            </div>

            <div className="max-w-6xl mx-auto grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {productsData.product_articles.map((product, index) => {
                    // Récupération de la première image du produit
                    const firstImage = product.productImages && product.productImages.length > 0 ? product.productImages[0] : null;
                    const secondImage = product.productImages && product.productImages.length > 1 ? product.productImages[1] : null;
                    
                    return (
                        <ShopCard
                            key={product.documentId || index}
                            category={product.productCategory || ''}
                            model={product.subCategory || ''}
                            name={product.productName || ''}
                            price={product.productAdultPrice || product.productChildPrice || product.price}
                            priceMin={product.productChildPrice}
                            priceMax={product.productAdultPrice}
                            link={`/shop/product/${product.documentId}`}
                            img1={firstImage?.url ? `http://ayun.myddns.me:5000${firstImage.url}` : ''}
                            img2={secondImage?.url ? `http://ayun.myddns.me:5000${secondImage.url}` : ''}
                            addToCart={true}
                            rating={product.score}
                        />
                    );
                })}
            </div>
        </section>
    );
} 