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
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

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
        body: JSON.stringify({ ...form, slug }),
      });

      if (!res.ok) throw new Error("Erreur soumission");

      await fetchComments();

      setForm({ name: "", email: "", website: "", comment: "" });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error("Erreur lors de l'envoi du commentaire", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pb-12">
      <ul className="mb-8 space-y-4">
        {comments.map((c) => (
          <li key={c.id} className="p-4 rounded-md">
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
          className="w-70 bg-gray-800 text-white px-1 py-3 hover:bg-[#E8A499] hover:text-white transition-colors duration-200 font-medium"
          disabled={loading}
        >
          {loading ? "Envoi..." : "Soumettre le commentaire"}
        </button>
      </form>
    </div>
  );
}
