"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getStrapiCall } from "@/app/lib/utils";

export default function Blog() {
  const [blogPage, setBlogPage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogPage = async () => {
      try {
        const res = await fetch(
          getStrapiCall(
            "/api/blog-pages?populate[blogList][populate][blogs][populate][thumbnail]=true&populate[blogList][populate][blogs][populate][linkToArticle]=true"
          )
        );
        if (!res.ok) {
          throw new Error("Erreur API");
        }
        const json = await res.json();
        setBlogPage(json.data?.[0]);
      } catch (error) {
        console.error("Erreur lors du fetch blog-page :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPage();
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (!blogPage?.blogList || blogPage.blogList.length === 0) {
    return <p>Données du blog introuvables.</p>;
  }

  const blogList = blogPage?.blogList?.[0];
  const articles = blogList?.blogs || [];

  return (
    <div className="bg-white text-black min-h-screen p-6">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-3xl text-black">{blogList.pageTitle}</h1>
        <p className="mt-8 max-w-2xl">{blogList.text}</p>
      </div>

      <div className="mt-10 space-y-16">
        {articles.length === 0 ? (
          <p>Aucun article disponible.</p>
        ) : (
          articles.map((article, index) => {
            const {
              title,
              description,
              date,
              readingTime,
              ArticleCategory,
              thumbnail,
              linkToArticle,
            } = article;

            const imageUrl = thumbnail?.url
              ? `http://ayun.myddns.me:5000${thumbnail.url}`
              : "/placeholder.png";

            // Inverse la ligne tous les articles avec index impair
            const isOdd = index % 2 === 1;

            return (
              <article key={index} className="flex justify-center">
                <div
                  className={`flex items-center gap-6 max-w-5xl ${
                    isOdd ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <div className="w-full md:w-1/2">
                    <p className="bg-black text-white px-3 py-1 text-sm inline-block">
                      {ArticleCategory || "Catégorie"}
                    </p>
                    <h2 className="text-2xl font-bold mt-4">{title}</h2>
                    <p className="text-[#E8A499] text-sm mt-4">
                      {new Date(date).toLocaleDateString("fr-FR")} |{" "}
                      {readingTime} Lecture estimée
                    </p>
                    <p className="mt-4">{description}</p>
                    <Link
                      href={`/blog/${linkToArticle.url}`}
                      className="inline-block mt-4 text-[#FF6187] underline underline-offset-8 hover:brightness-90"
                    >
                      Lire l'article
                    </Link>
                  </div>

                  <div className="w-full md:w-1/2">
                    <img
                      src={imageUrl}
                      alt={title}
                      className="w-full h-auto hover:brightness-110 transition duration-300"
                    />
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>
    </div>
  );
}
