"use client";

export default function MentionsLegales() {
  return (
    <main className="max-w-3xl mx-auto p-6 bg-white text-gray-900 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl mb-10 text-center aboreto">Mentions légales</h1>

      <section className="w-full mb-6">
        <h2 className="text-xl mb-6 font-semibold">1. Éditeur du site</h2>
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li>
            <strong>Nom de la société</strong> : Audelweiss Craft (par{" "}
            <span className="text-pink-600 font-semibold">
              Audrey HOSSEPIAN
            </span>
            )
          </li>
          <li>
            <strong>Email</strong> : contact@audelweiss.fr
          </li>
          <li>
            <strong>Forme juridique</strong> : Micro-entreprise
          </li>
          <li>
            <strong>Numéro SIRET</strong> : 83275167100047
          </li>
        </ul>
      </section>

      <section className="w-full mb-6">
        <h2 className="text-xl mb-6 font-semibold">2. Hébergeur du site</h2>
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li>
            <strong>Nom</strong> : o2switch
          </li>
          <li>
            <strong>Adresse</strong> : Chemin des Pardiaux, 63000
            Clermont-Ferrand
          </li>
          <li>
            <strong>SIRET</strong> : 510 909 807 00032
          </li>
          <li>
            <strong>RCS</strong> : Clermont-Ferrand
          </li>
          <li>
            <strong>Forme juridique</strong> : SAS au capital de 100 000 €
          </li>
          <li>
            <strong>Numéro de téléphone</strong> : 04 44 44 60 40
          </li>
          <li>
            <strong>Email</strong> :{" "}
            <span className="text-pink-600 font-semibold">
              support@o2switch.fr
            </span>
          </li>
        </ul>
      </section>

      <section className="w-full mb-6">
        <h2 className="text-xl mb-6 font-semibold">
          3. Propriété intellectuelle
        </h2>
        <p>
          L’ensemble des contenus présents sur le site audelweiss.fr, incluant,
          de manière non exhaustive, les textes, images, graphismes, logos,
          icônes, sons, logiciels, sont la propriété exclusive d’Audelweiss
          Craft ou de ses partenaires. Toute reproduction, distribution,
          modification, adaptation, retransmission ou publication, même
          partielle, de ces différents éléments est strictement interdite sans
          l’accord écrit préalable d’Audelweiss Craft.
        </p>
      </section>

      <section className="w-full mb-6">
        <h2 className="text-xl mb-6 font-semibold">4. Données personnelles</h2>
        <p>
          Les informations recueillies sur le site audelweiss.fr sont traitées
          conformément à notre{" "}
          <a
            href="lien-vers-politique-de-confidentialite"
            className="text-pink-600 underline hover:text-pink-700"
          >
            Politique de Confidentialité
          </a>
          . Conformément à la loi “Informatique et Libertés” du 6 janvier 1978
          modifiée et au Règlement Général sur la Protection des Données (RGPD),
          vous disposez d’un droit d’accès, de rectification, de suppression et
          d’opposition aux données personnelles vous concernant. Pour exercer
          ces droits, vous pouvez nous contacter à l’adresse email suivante :
          contact@audelweiss.fr.
        </p>
      </section>

      <section className="w-full mb-6">
        <h2 className="text-xl mb-6 font-semibold">5. Cookies</h2>
        <p>
          Le site audelweiss.fr utilise des cookies pour améliorer l’expérience
          utilisateur, analyser le trafic du site et proposer des publicités
          ciblées. Vous pouvez configurer votre navigateur pour refuser les
          cookies ou être informé de leur utilisation. Pour en savoir plus,
          veuillez consulter notre{" "}
          <a
            href="lien-vers-politique-de-confidentialite"
            className="text-pink-600 underline hover:text-pink-700"
          >
            Politique de Confidentialité
          </a>
          .
        </p>
      </section>

      <section className="w-full mb-6">
        <h2 className="text-xl mb-6 font-semibold">
          6. Limitation de responsabilité
        </h2>
        <p>
          Audelweiss Craft s’efforce d’assurer l’exactitude et la mise à jour
          des informations diffusées sur le site audelweiss.fr. Toutefois, nous
          ne pouvons garantir l’exactitude, la précision ou l’exhaustivité des
          informations mises à disposition sur ce site. En conséquence,
          Audelweiss Craft décline toute responsabilité pour toute imprécision,
          inexactitude ou omission portant sur des informations disponibles sur
          le site.
        </p>
      </section>

      <section className="w-full mb-10">
        <h2 className="text-xl mb-6 font-semibold">7. Droit applicable</h2>
        <p>
          Les présentes mentions légales sont régies par le droit français. En
          cas de litige, et après une tentative de recherche de solution
          amiable, les tribunaux français seront seuls compétents pour connaître
          de ce litige.
        </p>
      </section>
    </main>
  );
}
