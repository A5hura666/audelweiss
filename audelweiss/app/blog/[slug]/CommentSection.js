"use client";
import { useEffect, useState } from "react";

export default function CommentSection({ slug }) {
  const [comments, setComments] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    website: "",
    comment: "",
  });
  const [replyTo, setReplyTo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const isAuthor = true;

  const fetchComments = async () => {
    try {
      const res = await fetch(`/api/comments?slug=${slug}`);
      const data = await res.json();
      setComments(data.comments || []);
    } catch (error) {
      console.error("Erreur récupération commentaires", error);
      setComments([]);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [slug]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...form, slug, replyTo: replyTo?.id }),
      });

      if (!res.ok) throw new Error("Erreur soumission");

      await fetchComments();

      setForm({ name: "", email: "", website: "", comment: "" });
      setReplyTo(null);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error("Erreur lors de l'envoi du commentaire", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pb-12 border-t-1 border-[#E8A499]">
      <ul className="mb-12 space-y-2 mt-4">
        {comments.map((c) => (
          <li key={c.id}>
            <div className="flex justify-between items-center gap-4 w-full py-4">
              <div className="flex-1">
                <p className="text-sm text-black">
                  <strong>{c.name}</strong> le{" "}
                  {new Date(c.date).toLocaleDateString("fr-FR")} à{" "}
                  {new Date(c.date)
                    .toLocaleTimeString("fr-FR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                    .replace(":", "h")}
                </p>
                <p className="text-gray-800 mt-2">{c.comment}</p>
              </div>

              {isAuthor && (
                <div className="w-25 self-center">
                  <button
                    onClick={() => setReplyTo({ id: c.id, name: c.name })}
                    className="bg-gray-800 text-white px-3 py-2 hover:bg-[#E8A499] transition-colors duration-200"
                  >
                    Répondre
                  </button>
                </div>
              )}
            </div>

            {c.replies?.length > 0 && (
              <ul className="mt-4 ml-80 space-y-2">
                {c.replies.map((r) => (
                  <li key={r.id} className="pl-2">
                    <div className="flex justify-between items-center gap-4 w-full py-4">
                      <div className="flex-1">
                        <p className="text-sm text-black">
                          <strong>{r.name}</strong> le{" "}
                          {new Date(r.date).toLocaleDateString("fr-FR")} à{" "}
                          {new Date(r.date)
                            .toLocaleTimeString("fr-FR", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                            .replace(":", "h")}
                        </p>
                        <p className="text-gray-800 mt-1">{r.comment}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      <h3 className="text-xl font-bold text-gray-800 mb-2">
        SOUMETTRE UN COMMENTAIRE
      </h3>
      <p className="text-gray-600 mb-6">
        Votre adresse e-mail ne sera pas publiée. Les champs obligatoires sont
        indiqués avec *
      </p>

      {success && (
        <p className="text-green-600 text-sm mb-4">
          Commentaire ajouté avec succès !
        </p>
      )}

      {replyTo && (
        <div className="mb-4 text-sm text-gray-700">
          En réponse à <strong>{replyTo.name}</strong>
          <button
            type="button"
            onClick={() => setReplyTo(null)}
            className="ml-2 text-xs text-gray-500 underline hover:text-gray-700"
          >
            Annuler la réponse
          </button>
        </div>
      )}

      <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
        <textarea
          name="comment"
          rows={4}
          required
          placeholder="Commentaire *"
          className="w-full px-3 py-2 text-black border border-gray-300 rounded-md shadow-sm 
             focus:outline-none focus:ring-1 focus:ring-[#E8A499] focus:border-[#E8A499]"
          value={form.comment}
          onChange={handleChange}
        />

        <input
          type="text"
          name="name"
          placeholder="Nom *"
          required
          className="w-100 px-3 py-2 text-black border border-gray-300 rounded-md shadow-sm 
            focus:outline-none focus:ring-1 focus:ring-[#E8A499] focus:border-[#E8A499]"
          value={form.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email *"
          required
          className="w-100 px-3 py-2 text-black border border-gray-300 rounded-md shadow-sm 
            focus:outline-none focus:ring-1 focus:ring-[#E8A499] focus:border-[#E8A499]"
          value={form.email}
          onChange={handleChange}
        />

        <input
          type="url"
          name="website"
          placeholder="Site web"
          className="w-100 px-3 py-2 text-black border border-gray-300 rounded-md shadow-sm 
            focus:outline-none focus:ring-1 focus:ring-[#E8A499] focus:border-[#E8A499]"
          value={form.website}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="w-fit bg-gray-800 text-white px-4 py-3 hover:bg-[#E8A499] hover:text-white transition-colors duration-200 font-medium"
          disabled={loading}
        >
          {loading ? "Envoi..." : "Soumettre le commentaire"}
        </button>
      </form>
    </div>
  );
}
