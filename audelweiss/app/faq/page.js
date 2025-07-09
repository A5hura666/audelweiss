"use client";
import { useState } from "react";

const faqData = [
	{
		question: "Quels types de produits proposez-vous ?",
		answer: (
			<div>
				Je propose principalement :
				<ul className="list-none mt-2 mb-2">
					<li>
						{" "}
						– Des{" "}
						<a
							href="/shop/Accessoires"
							className="font-semibold text-[#ff5e7e]    transition-colors"
						>
							accessoires en crochet
						</a>{" "}
						(bandeaux, bonnets, porte-clés, etc.).
					</li>
					<li>
						– Des <span className="font-semibold">objets personnalisés</span>{" "}
						grâce à la découpe vinyle et textile.
					</li>
					<li>
						– Prochainement : des patrons de crochet pour celles et ceux qui
						voudront créer eux-mêmes.
					</li>
				</ul>
			</div>
		),
	},
	{
		question: "Puis-je commander un article personnalisé ?",
		answer: (
			<div>
				Oui ! Je propose des articles{" "}
				<span className="font-bold">sur commande et personnalisables</span>. Il
				suffit de me contacter via Instagram{" "}
				<a
					href="https://www.instagram.com/audelweiss.craft/"
					target="_blank"
					rel="noopener noreferrer"
					className="font-semibold text-[#ff5e7e]    transition-colors"
				>
					@audelweiss.craft
				</a>{" "}
				ou par e-mail pour discuter de votre projet.
			</div>
		),
	},
	{
		question: "Quels éléments puis-je personnaliser ?",
		answer: (
			<div>
				Selon le produit, vous pouvez choisir :
				<ul className="list-none mt-2 mb-2">
					<li>– La couleur et la taille.</li>
					<li>
						– L’ajout d’un prénom ou d’un motif (grâce au vinyle textile).
					</li>
					<li>
						– Un message spécial sur certains articles comme les carnets ou
						pochettes.
					</li>
				</ul>
			</div>
		),
	},
	{
		question: "Quels sont les délais de fabrication et d’expédition ?",
		answer: (
			<div>
				<span className="font-bold">Créations en stock</span> : expédition sous{" "}
				<strong>5</strong> jours ouvrés.
				<br />
				<span className="font-bold">Commandes personnalisées</span> :
				fabrication selon la complexité de la personnalisation, se référer à la
				fiche produit.
				<br />
				<span className="font-bold">Livraison</span> : selon le mode choisi,
				entre{" "}
				<span className="font-bold">
					2 et 5 jours ouvrés en France métropolitaine
				</span>
				.
			</div>
		),
	},
	{
		question: "Expédiez-vous à l’international ?",
		answer: (
			<div>
				Oui ! Contactez-moi pour obtenir un devis sur les frais de port selon
				votre pays.
			</div>
		),
	},
	{
		question: "Quels sont les moyens de paiement acceptés ?",
		answer: (
			<div>
				J’accepte les paiements via :
				<ul className="list-none mt-2 mb-2">
					<li>– Carte bancaire</li>
					<li>– PayPal</li>
				</ul>
			</div>
		),
	},
	{
		question: "Puis-je retourner un article ?",
		answer: (
			<div>
				Les retours sont acceptés sous <strong>14 jours après réception</strong>
				, uniquement pour les{" "}
				<strong>articles non personnalisés et non portés</strong>. Les frais de
				retour sont à la charge du client.
			</div>
		),
	},
	{
		question: "Comment entretenir mes articles en crochet ?",
		answer: (
			<div>
				<ul className="list-none mt-2 mb-2">
					<li>
						– Lavage <strong>à la main ou en machine à 30°C</strong> dans un
						filet de lavage.
					</li>
					<li>– Séchage à plat pour éviter les déformations.</li>
					<li>– Ne pas repasser.</li>
				</ul>
				<span>
					Se référer à la fiche produit ou l’étiquette pour adapter l’entretien
					au type de laine de l’ouvrage.
				</span>
			</div>
		),
	},
	{
		question: "Les impressions en vinyle textile résistent-elles au lavage ?",
		answer: (
			<div>
				Oui, à condition de laver le textile{" "}
				<strong>à 30°C maximum et à l’envers</strong>. Évitez le sèche-linge et
				le repassage direct sur le motif.
			</div>
		),
	},
	{
		question: "Comment vous contacter ?",
		answer: (
			<div>
				Pour toute question, tu peux me joindre :
				<ul className="list-none mt-2 mb-2">
					<li>
						– Sur Instagram :{" "}
						<a
							href="https://www.instagram.com/audelweiss.craft/"
							target="_blank"
							rel="noopener noreferrer"
							className="text-[#ff5e7e] font-bold    transition-colors"
						>
							@audelweiss.craft
						</a>
					</li>
					<li>– Par e-mail : contact@audelweiss.fr</li>
					<li>
						– Via le{" "}
						<a
							href="/contact"
							className="text-[#ff5e7e] font-bold    transition-colors"
						>
							formulaire de contact sur la boutique
						</a>
					</li>
				</ul>
			</div>
		),
	},
	{
		question: "Proposez-vous des cartes cadeaux ?",
		answer: (
			<div>
				Bientôt directement sur la boutique ! En attendant, tu peux m’écrire
				pour que je t’en crée une manuellement. Une idée parfaite pour offrir un
				cadeau unique et personnalisé.
			</div>
		),
	},
];

export default function FAQ() {
	const [openIndex, setOpenIndex] = useState(null);

	const handleToggle = (idx) => {
		setOpenIndex(openIndex === idx ? null : idx);
	};

	return (
		<div className="max-w-2xl mx-auto py-16 px-4">
			<h1 className="text-3xl font-serif text-center mb-12 tracking-tight">
				FAQ
			</h1>
			<div className="space-y-6">
				{faqData.map((item, idx) => (
					<div key={idx}>
						<button
							className={`block text-left w-full font-semibold text-[#ff5e7e] text-lg md:text-xl transition-colors duration-150 focus:outline-none ${
								openIndex === idx ? "font-bold" : ""
							}`}
							onClick={() => handleToggle(idx)}
							aria-expanded={openIndex === idx}
							aria-controls={`faq-panel-${idx}`}
							type="button"
						>
							{item.question}
						</button>
						{openIndex === idx && (
							<div
								id={`faq-panel-${idx}`}
								className="mt-2 text-base text-gray-800 leading-relaxed transition-all duration-300 ease-in-out animate-fade-in"
								style={{
									opacity: openIndex === idx ? 1 : 0,
									transform:
										openIndex === idx
											? "translateY(0px)"
											: "translateY(-10px)",
								}}
							>
								{item.answer}
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
}
