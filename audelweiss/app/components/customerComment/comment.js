"use client";

import Image from "next/image";
import * as React from "react";
import { useEffect, useState, useRef } from "react";
import StarRating from "@/app/components/StarsComments";

export default function Comment({ productComments }) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [imageCommentSelected, setImageCommentSelected] = useState('');

    const changeImageByIndex = (newIndex) => {
        if (newIndex < 0) {
            setCurrentIndex(commentImages.length - 1);
        } else if (newIndex >= commentImages.length) {
            setCurrentIndex(0);
        } else {
            setCurrentIndex(newIndex);
        }
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                setIsOpen(false); // ferme la modal zoomée
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        console.log(productComments);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [currentIndex, productComments]);

    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return new Intl.DateTimeFormat('fr-FR', options).format(date);
    }

    return (
        <div className={"flex flex-col gap-6 mt-8"}>
            {productComments.map((comment, index) => (

                <div key={index}>
                    <div className="flex sm:items-center flex-col sm:flex-row justify-between  mb-4">
                        <div className="flex items-center gap-3">
                            <h6 className="font-semibold text-lg leading-8 text-black">{comment.authorName}</h6>
                            <p className="font-medium text-base leading-7 text-gray-400">{formatDate(comment.createdAt)}</p>
                        </div>
                        <StarRating averageRating={comment.commentNote}></StarRating>
                    </div>

                    <p className="font-normal text-lg leading-8 text-gray-500 ">
                        {comment.comment}
                    </p>
                    <div
                        className={" cursor-pointer flex flex-wrap gap-2 mt-4"}
                    >
                        {comment.commentImage.map((src, index) => (
                            <div key={index}>
                                <img
                                    src={`http://ayun.myddns.me:5000${src.url}`}
                                    alt={`Miniature ${index + 1}`}
                                    className="h-[300px] max-h-[350px] cursor-pointer b-2 rounded-lg shadow-md object-cover"
                                    onClick={() => {
                                        setCurrentIndex(index);
                                        setIsOpen(true);
                                        setImageCommentSelected(src.url);
                                    }}
                                />

                            </div>
                        ))}
                        {isOpen && (
                            <div
                                className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
                            >
                                <div className="relative max-w-[70%]">
                                    <img
                                        src={`http://ayun.myddns.me:5000${imageCommentSelected}`}
                                        alt="Zoom photo"
                                        height={1000}
                                        className="rounded-lg shadow-lg"
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
                </div>
                )
            )
            }
        </div>
    );
}