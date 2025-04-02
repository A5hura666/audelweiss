// app/layout.js
"use client";

import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import {useEffect, useState} from "react";
import {getStrapiCall} from "@/app/lib/utils";

export default function RootLayout({ children }) {
    const [headerHeight, setHeaderHeight] = useState(0);
    const [title, setTitle] = useState("AUDELWEISS");
    const [metaTitle, setMetaTitle] = useState("Créations artisanales uniques – Fait main avec passion à Embrun – Audelweiss Craft");
    const [metaDescription, setMetaDescription] = useState("Découvre des créations crochetées avec soin, inspirées par la nature et l’artisanat. Des pièces uniques, faites à la main, qui allient authenticité et douceur.");
    const [favicon, setFavicon] = useState("/favicon.ico");

    useEffect(() => {
        const fetchSeoData = async () => {
            try {
                const response = await fetch(
                    getStrapiCall('/api/global?populate[0]=defaultSeo&populate[1]=favicon&populate[2]=defaultSeo.shareImage')
                );
                const data = await response.json();
                if (data?.data?.defaultSeo) {
                    if (data?.data?.defaultSeo.metaDescription){
                        setMetaDescription(data?.data?.defaultSeo.metaDescription);
                    }
                    if (data?.data?.defaultSeo.metaTitle){
                        setMetaTitle(data?.data?.defaultSeo.metaTitle);
                    }
                }

                if (data?.data?.favicon?.url){
                    setFavicon(process.env.STRAPI_BASE_URL + data?.data?.favicon?.url);
                }

                if (data?.data?.siteName){
                    setTitle(data?.data?.siteName);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération du seo :", error);
            }
        };
        fetchSeoData();
    }, []);

    useEffect(() => {
        const updateHeaderHeight = () => {
            const header = document.querySelector("header");
            if (header) {
                setHeaderHeight(header.offsetHeight - 1);
            }
        };

        updateHeaderHeight();
        window.addEventListener("resize", updateHeaderHeight);
        return () => window.removeEventListener("resize", updateHeaderHeight);
    }, []);

    return (
        <html lang="fr">
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="description" content={metaDescription} />
            <meta name="title" content={metaTitle} />
            <link rel="icon" href={favicon} sizes="any" />
            <title>{title}</title>
        </head>
        <body className="flex flex-col">
        <Header />
        <main style={{ paddingTop: `${headerHeight}px` }} className="flex-grow">{children}</main>
        <Footer />
        </body>
        </html>
    );
}
