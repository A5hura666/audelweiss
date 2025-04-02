// MegaMenu.tsx
import Link from "next/link";

const MegaMenu = ({ productLinks, baseUrl }) => {
    return (
        <div  className={`fixed top-full left-0 w-full bg-white shadow-xl border-t border-gray-200 transform transition-all duration-300 ease-in-out`}>
            <div className="max-w-7xl mx-auto py-6 px-8 grid grid-cols-3 gap-8">
                {productLinks?.map((product) => (
                    <div key={product.id} className="flex items-center mb-4 hover:bg-gray-50 p-3">
                        {product.image && product.image.url && (
                            <img
                                src={baseUrl + product.image.url}
                                alt={product.image.alternativeText || product.title}
                                className="w-16 h-16 object-cover rounded-md mr-3"
                            />
                        )}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-800">
                                {product.title}
                            </h3>
                            {product.description && (
                                <p className="text-xs text-gray-500">
                                    {product.description}
                                </p>
                            )}
                            {product.url && (
                                <Link href={product.url} className="text-blue-500 text-xs hover:underline">
                                    Voir le produit
                                </Link>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MegaMenu;
