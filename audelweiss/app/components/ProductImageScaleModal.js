"use client";
import { useState } from "react";
import Image from "next/image";
import {Input} from "@mui/material";

export default function ImageZoom() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Image
                src="/images/photo.jpg"
                alt="Photo"
                width={150}
                height={150}
                className="cursor-pointer rounded"
                onClick={() => setIsOpen(true)}
            />

            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                    <div className="relative">
                        <Image
                            src="/images/photo.jpg"
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
        </>
    );
}
