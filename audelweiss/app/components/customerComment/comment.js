"use client";

import Image from "next/image";
import * as React from "react";
import {useEffect, useState} from "react";

export default function Comment() {
    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const commentImages = [
        "/images/shop/bonnet.png",
        "https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg",
        "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg",
        "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg",
        ];

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
            if (event.key === "ArrowLeft" && commentImages.length > 1) {
                changeImageByIndex(currentIndex - 1);
            } else if (event.key === "ArrowRight" && commentImages.length > 1) {
                changeImageByIndex(currentIndex + 1);
            } else if (event.key === "Escape") {
                setIsOpen(false); // ferme la modal zoomée
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [currentIndex]);

    return (
        <div>
            <div className="flex sm:items-center flex-col sm:flex-row justify-between  mb-4">
                <div className="flex items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30"
                         fill="none">
                        <g clipPath="url(#clip0_13624_2974)">
                            <path
                                d="M14.1033 2.56698C14.4701 1.82374 15.5299 1.82374 15.8967 2.56699L19.1757 9.21093C19.3214 9.50607 19.6029 9.71064 19.9287 9.75797L27.2607 10.8234C28.0809 10.9426 28.4084 11.9505 27.8149 12.5291L22.5094 17.7007C22.2737 17.9304 22.1662 18.2614 22.2218 18.5858L23.4743 25.8882C23.6144 26.7051 22.7569 27.3281 22.0233 26.9424L15.4653 23.4946C15.174 23.3415 14.826 23.3415 14.5347 23.4946L7.9767 26.9424C7.24307 27.3281 6.38563 26.7051 6.52574 25.8882L7.7782 18.5858C7.83384 18.2614 7.72629 17.9304 7.49061 17.7007L2.1851 12.5291C1.59159 11.9505 1.91909 10.9426 2.73931 10.8234L10.0713 9.75797C10.3971 9.71064 10.6786 9.50607 10.8243 9.21093L14.1033 2.56698Z"
                                fill="#FBBF24"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_13624_2974">
                                <rect width="30" height="30" fill="white"/>
                            </clipPath>
                        </defs>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30"
                         fill="none">
                        <g clipPath="url(#clip0_13624_2974)">
                            <path
                                d="M14.1033 2.56698C14.4701 1.82374 15.5299 1.82374 15.8967 2.56699L19.1757 9.21093C19.3214 9.50607 19.6029 9.71064 19.9287 9.75797L27.2607 10.8234C28.0809 10.9426 28.4084 11.9505 27.8149 12.5291L22.5094 17.7007C22.2737 17.9304 22.1662 18.2614 22.2218 18.5858L23.4743 25.8882C23.6144 26.7051 22.7569 27.3281 22.0233 26.9424L15.4653 23.4946C15.174 23.3415 14.826 23.3415 14.5347 23.4946L7.9767 26.9424C7.24307 27.3281 6.38563 26.7051 6.52574 25.8882L7.7782 18.5858C7.83384 18.2614 7.72629 17.9304 7.49061 17.7007L2.1851 12.5291C1.59159 11.9505 1.91909 10.9426 2.73931 10.8234L10.0713 9.75797C10.3971 9.71064 10.6786 9.50607 10.8243 9.21093L14.1033 2.56698Z"
                                fill="#FBBF24"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_13624_2974">
                                <rect width="30" height="30" fill="white"/>
                            </clipPath>
                        </defs>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30"
                         fill="none">
                        <g clipPath="url(#clip0_13624_2974)">
                            <path
                                d="M14.1033 2.56698C14.4701 1.82374 15.5299 1.82374 15.8967 2.56699L19.1757 9.21093C19.3214 9.50607 19.6029 9.71064 19.9287 9.75797L27.2607 10.8234C28.0809 10.9426 28.4084 11.9505 27.8149 12.5291L22.5094 17.7007C22.2737 17.9304 22.1662 18.2614 22.2218 18.5858L23.4743 25.8882C23.6144 26.7051 22.7569 27.3281 22.0233 26.9424L15.4653 23.4946C15.174 23.3415 14.826 23.3415 14.5347 23.4946L7.9767 26.9424C7.24307 27.3281 6.38563 26.7051 6.52574 25.8882L7.7782 18.5858C7.83384 18.2614 7.72629 17.9304 7.49061 17.7007L2.1851 12.5291C1.59159 11.9505 1.91909 10.9426 2.73931 10.8234L10.0713 9.75797C10.3971 9.71064 10.6786 9.50607 10.8243 9.21093L14.1033 2.56698Z"
                                fill="#FBBF24"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_13624_2974">
                                <rect width="30" height="30" fill="white"/>
                            </clipPath>
                        </defs>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30"
                         fill="none">
                        <g clipPath="url(#clip0_13624_2974)">
                            <path
                                d="M14.1033 2.56698C14.4701 1.82374 15.5299 1.82374 15.8967 2.56699L19.1757 9.21093C19.3214 9.50607 19.6029 9.71064 19.9287 9.75797L27.2607 10.8234C28.0809 10.9426 28.4084 11.9505 27.8149 12.5291L22.5094 17.7007C22.2737 17.9304 22.1662 18.2614 22.2218 18.5858L23.4743 25.8882C23.6144 26.7051 22.7569 27.3281 22.0233 26.9424L15.4653 23.4946C15.174 23.3415 14.826 23.3415 14.5347 23.4946L7.9767 26.9424C7.24307 27.3281 6.38563 26.7051 6.52574 25.8882L7.7782 18.5858C7.83384 18.2614 7.72629 17.9304 7.49061 17.7007L2.1851 12.5291C1.59159 11.9505 1.91909 10.9426 2.73931 10.8234L10.0713 9.75797C10.3971 9.71064 10.6786 9.50607 10.8243 9.21093L14.1033 2.56698Z"
                                fill="#FBBF24"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_13624_2974">
                                <rect width="30" height="30" fill="white"/>
                            </clipPath>
                        </defs>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30"
                         fill="none">
                        <g clipPath="url(#clip0_13624_2974)">
                            <path
                                d="M14.1033 2.56698C14.4701 1.82374 15.5299 1.82374 15.8967 2.56699L19.1757 9.21093C19.3214 9.50607 19.6029 9.71064 19.9287 9.75797L27.2607 10.8234C28.0809 10.9426 28.4084 11.9505 27.8149 12.5291L22.5094 17.7007C22.2737 17.9304 22.1662 18.2614 22.2218 18.5858L23.4743 25.8882C23.6144 26.7051 22.7569 27.3281 22.0233 26.9424L15.4653 23.4946C15.174 23.3415 14.826 23.3415 14.5347 23.4946L7.9767 26.9424C7.24307 27.3281 6.38563 26.7051 6.52574 25.8882L7.7782 18.5858C7.83384 18.2614 7.72629 17.9304 7.49061 17.7007L2.1851 12.5291C1.59159 11.9505 1.91909 10.9426 2.73931 10.8234L10.0713 9.75797C10.3971 9.71064 10.6786 9.50607 10.8243 9.21093L14.1033 2.56698Z"
                                fill="#FBBF24"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_13624_2974">
                                <rect width="30" height="30" fill="white"/>
                            </clipPath>
                        </defs>
                    </svg>
                </div>
                <div className="flex items-center gap-3">
                    <h6 className="font-semibold text-lg leading-8 text-black">@john.doe</h6>
                    <p className="font-medium text-base leading-7 text-gray-400">Nov 01, 2023</p>
                </div>
            </div>

            <p className="font-normal text-lg leading-8 text-gray-500 ">
                I recently had the opportunity to explore Pagedone's UI design system, and it left a lasting
                impression on my workflow. The system seamlessly blends user-friendly features with a robust
                set
                of design components, making it a go-to for creating visually stunning and consistent
                interfaces.
            </p>
            <div
                className={" cursor-pointer flex flex-wrap gap-2 mt-4"}
            >
                {commentImages.map((src, index) => (
                    <div key={index}>
                        <img
                            src={src}
                            alt={`Miniature ${index + 1}`}
                            className="max-w-[250px] max-h-[250px] cursor-pointer"
                            onClick={() => {
                                setCurrentIndex(index);
                                setIsOpen(true);
                            }}
                        />
                    </div>
                ))}
                {isOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
                    >
                        <div className="relative max-w-[30%]">
                            <Image
                                src={commentImages[currentIndex]}
                                alt="Zoom photo"
                                width={800}
                                height={800}
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
    );
}