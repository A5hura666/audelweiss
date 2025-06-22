"use client";

import { useState } from "react";

export default function FormCreateComment() {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [images, setImages] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // récupère les valeurs du formulaire
        const formData = new FormData(e.target);
        formData.append("rating", rating);
        const data = Object.fromEntries(formData);
        console.log(data);
        // ici, tu peux envoyer data via fetch ou autre
    };


    const handleImageChange = (event) => {
        const files = Array.from(event.target.files);
        const newImages = [...images, ...files];

        // Limite à 3 images
        if (newImages.length > 3) {
            alert("Vous pouvez uploader jusqu'à 3 images maximum.");
            return;
        }

        setImages(newImages);
    };

    return (
        <section className="w-full flex justify-center items-center py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full">
                <h2 className="text-2xl font-semibold mb-6 text-center">Laisser un commentaire</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nom</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            className="mt-1 block w-full border-2 border-[#e8a499] rounded-md shadow-md bg-[#fff7f5] text-gray-900 text-lg font-semibold px-3 py-2 focus:border-[#e8a499] focus:ring-[#e8a499]"
                        />

                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="mt-1 block w-full border-2 border-[#e8a499] rounded-md shadow-md bg-[#fff7f5] text-gray-900 text-lg font-semibold px-3 py-2 focus:border-[#e8a499] focus:ring-[#e8a499]"
                        />
                    </div>

                    {/* Système d'étoiles */}
                    <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Note</label>
                        <div className="flex space-x-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    type="button"
                                    key={star}
                                    onClick={() => setRating(star)}
                                    onMouseEnter={() => setHover(star)}
                                    onMouseLeave={() => setHover(0)}
                                    className="focus:outline-none"
                                >
                                    <svg
                                        className={`w-8 h-8 ${
                                            (hover || rating) >= star ? "text-[#e8a499]" : "text-gray-300"
                                        }`}
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.955a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.286 3.955c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.286-3.955a1 1 0 00-.364-1.118L2.074 9.382c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.955z" />
                                    </svg>
                                </button>
                            ))}
                        </div>
                        <input type="hidden" name="rating" value={rating} />
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-4">
                            <label className="block font-medium text-gray-900">Ajouter des Images :</label>

                            {/* input caché */}
                            <input
                                type="file"
                                id="image-upload"
                                multiple
                                onChange={handleImageChange}
                                disabled={images.length >= 3}
                                className="hidden"
                            />

                            {/* bouton custom */}
                            <button
                                type="button"
                                onClick={() => document.getElementById("image-upload").click()}
                                disabled={images.length >= 3}
                                className="inline-flex items-center justify-center px-4 py-2 border-2 border-dashed border-[#e8a499] text-[#e8a499] rounded-lg bg-[#fff7f5] hover:bg-[#ffe9e4] transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                📷 Choisir des images (max 3)
                            </button>

                            {/* preview des images */}
                            <div className="flex flex-wrap gap-4 mt-4">
                                {images.map((image, index) => (
                                    <div key={index} className="relative w-32 h-32 overflow-hidden rounded-lg border">
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveImage(index)}
                                            className="absolute top-1 right-1 bg-white text-red-500 rounded-full p-1 shadow hover:bg-red-100"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                        <img
                                            src={URL.createObjectURL(image)}
                                            alt={`Uploaded ${index + 1}`}
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="comment" className="block text-sm font-medium text-gray-700">Commentaire</label>
                        <textarea
                            id="comment"
                            name="comment"
                            rows="4"
                            required
                            className="mt-1 block w-full border-2 border-[#e8a499] rounded-md shadow-md bg-[#fff7f5] text-gray-900 text-lg font-semibold px-3 py-2 focus:border-[#e8a499] focus:ring-[#e8a499]"
                        ></textarea>
                    </div>

                    <div className="sm:col-span-2">
                        <button
                            type="submit"
                            className="w-full bg-[#e8a499] text-white py-2 px-4 rounded-md hover:bg-[#e8a499]/90 transition duration-200"
                        >
                            Envoyer
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}
