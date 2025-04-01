// app/layout.js
"use client";

import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import {useEffect, useState} from "react";

export default function RootLayout({ children }) {
    const [headerHeight, setHeaderHeight] = useState(0);

    useEffect(() => {
        const updateHeaderHeight = () => {
            const header = document.querySelector("header");
            if (header) setHeaderHeight(header.offsetHeight);
        };

        updateHeaderHeight();
        window.addEventListener("resize", updateHeaderHeight);
        return () => window.removeEventListener("resize", updateHeaderHeight);
    }, []);

    return (
        <html lang="fr">
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="description" content="Des créations douces au crochet, confectionnées à la main dans les Hautes-Alpes." />
            <link rel="icon" href="/favicon.ico" />
            <title>AUDELWEISS Craft</title>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet" />
        </head>
        <body className="flex flex-col">
        <Header />
        <main style={{ paddingTop: `${headerHeight}px` }} className="flex-grow">{children}</main>
        <Footer />
        </body>
        </html>
    );
}
