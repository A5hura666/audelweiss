"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {getStrapiCall} from "@/app/lib/utils";

export default function Blog() {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch(
          getStrapiCall("/api/blog-page?populate[blogArticles][populate]=cover")
        );
        const data = await response.json();

        if (data?.data) {
          const posts = data.data.map((item) => ({
            id: item.id,
            title: item.attributes.title,
            description: item.attributes.description,
            slug: item.attributes.slug,
            category: item.attributes.category,
            date: item.attributes.date,
            cover: item.attributes.cover?.data?.attributes?.url || null,
          }));

          setBlogPosts(posts);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des articles :", error);
      }
    };

    fetchBlogPosts();
  }, []);

  return (
    <div className="bg-white text-black min-h-screen p-6">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-3xl text-black">Blog</h1>
        <p className="mt-8">
          Actualités ou simplement informations complémentaires à mes créations
          😊
        </p>
      </div>

      {blogPosts.length > 0 ? (
        blogPosts.map((post) => (
          <article
            key={post.id}
            className="flex justify-center mt-10 space-y-10"
          >
            <div className="flex items-center gap-6">
              {post.thumbnail?.url && (
                <div className="w-lg">
                  <img
                    src={post.cover}
                    alt="Image de l'article"
                    className="w-full h-auto transition duration-300 ease-in-out hover:brightness-110"
                  />
                </div>
              )}
              <div className="w-xl">
                <p className="bg-black text-white px-3 py-1 text-sm inline-block">
                  {post.category || "Infos"}
                </p>
                <h2 className="text-2xl font-bold mt-6">{post.title}</h2>
                <p className="text-[#E8A499] text-sm mt-6">{post.date}</p>
                <p className="mt-6">{post.description}</p>
                <Link
                  href={`/articles/${post.slug}`}
                  className="inline-block mt-4 text-[#FF6187] font-semibold underline hover:brightness-90"
                >
                  Lire l'article
                </Link>
              </div>
            </div>
          </article>
        ))
      ) : (
        <p className="text-center mt-10">Aucun article disponible.</p>
      )}
    </div>
  );
}
