import { getStrapiCall } from "@/app/lib/utils";
import Link from "next/link";
import CommentSection from "./CommentSection";
import ReactMarkdown from "react-markdown";
import {Breadcrumbs} from "@/app/components/breadcrambs/breadcrumbs";

export default async function BlogArticle({ params }) {
  const { slug } = await params;
  const res = await fetch(
    getStrapiCall(
      `/api/blog-article-pages?filters[slug][$eq]=${slug}&populate[blogArticle][populate][cover]=true&populate[blogArticle][populate][paragraphes]=*`
    )
  );

  if (!res.ok) {
    return <p>Erreur lors de la récupération de l'article</p>;
  }

  const json = await res.json();
  if (!json.data || json.data.length === 0) {
    return <p>Article introuvable</p>;
  }

  const article = json.data[0].blogArticle;
  if (!article) {
    return <p>Contenu de l'article non trouvé</p>;
  }

  const imageUrl = article.cover?.url
    ? `http://ayun.myddns.me:5000${article.cover.url}`
    : "/placeholder.png";

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#E8A499] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-white">
              <Breadcrumbs></Breadcrumbs>
          </nav>
        </div>
      </div>

      <div className="relative overflow-hidden">

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="order-2 lg:order-1">
              <img
                src={imageUrl}
                alt={article.title}
                className="w-full h-100 object-cover rounded-lg shadow-lg"
              />
            </div>

            <div className="order-1 lg:order-2">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight">
                {article.title}
              </h1>
              <p className="text-lg text-gray-600 mb-4">
                <span className="font-medium">Catégorie(s) :</span>{" "}
                <span className="text-[#E8A499] font-medium">
                  {article.ArticleCategory || "Infos"}
                </span>
              </p>
              <p className="text-gray-700 leading-relaxed">
                {article.description.length > 325
                  ? `${article.description.slice(0, 325)}[...]`
                  : article.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-black mb-6 leading-loose">
          {article.introduction}
        </div>
        <article className="prose prose-lg max-w-none">
          {article.paragraphes?.map((para, index) => (
            <section key={index} className="mb-12">
              <h2 className="text-2xl font-bold text-[#E8A499] mb-4">
                {`${para.title}`}
              </h2>
              <div className="space-y-6">
                <div className="gap-6">
                  <div>
                    <pre className="text-gray-700 whitespace-pre-line font-sans leading-loose">
                      <ReactMarkdown
                        components={{
                          a: ({ node, ...props }) => (
                            <a
                              {...props}
                              className="text-[#FF6187]"
                              target="_blank"
                            />
                          ),
                        }}
                      >
                        {para.description}
                      </ReactMarkdown>
                    </pre>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </article>

        <CommentSection slug={slug} />

        <section className="my-16 bg-rose-50 p-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Envie d'une pièce unique rien que pour toi ou pour offrir ?
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Après avoir parcouru mon portfolio, fais un tour dans ma
                boutique en ligne ! Tu y trouveras des créations disponibles ou
                tu peux me contacter pour une commande personnalisée. Apporte
                une touche d'authenticité et de douceur à ton quotidien. 🧶🤍
              </p>
            </div>

            <div className="shrink-0">
              <Link href="/shop" passHref>
                <button className="bg-gray-800 text-white px-8 py-3 font-medium hover:bg-[#E8A499] hover:text-white transition-colors">
                  Découvrir la boutique
                </button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
