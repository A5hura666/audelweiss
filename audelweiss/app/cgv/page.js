"use client";

export default function CGV() {
  return (
    <main className="max-w-3xl mx-auto p-6 bg-white text-gray-900 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl mb-10 text-center aboreto">
        Conditions générales de vente
      </h1>

      <p className="font-bold mb-6 self-start">
        Dernière mise à jour : 08/02/2025
      </p>

      <p className="mb-6">
        Les présentes Conditions Générales de Vente (CGV) s’appliquent à toutes
        les commandes passées sur le site audelweiss.fr. En commandant sur notre
        site, vous acceptez sans réserve les présentes CGV.
      </p>

      <section className="w-full mb-6">
        <h2 className="text-xl mb-2 font-semibold text-[#E8A499]">
          1. Identification de la société
        </h2>
        <p>
          Nom de l’entreprise : Audelweiss Craft
          <br />
          Email : contact@audelweiss.fr
          <br />
          SIRET : 83275167100047
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-[#E8A499]">
          2. Produits proposés
        </h2>
        <p>Le site propose deux types de produits :</p>
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li>
            Produits physiques : Créations artisanales faites à
            la main, disponibles à l’achat.
          </li>
          <li>
            Produits numériques téléchargeables : Modèles ou
            documents au format numérique (PDF, fichiers crochet, tricot, etc.),
            téléchargeables immédiatement après le paiement.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-[#E8A499]">
          3. Commande
        </h2>
        <p>
          Pour passer une commande, vous devez sélectionner les produits de
          votre choix et les ajouter au panier, fournir les informations
          nécessaires (coordonnées de livraison, de facturation, etc.) et
          valider le paiement de votre commande.
        </p>
        <p className="mt-2">
          Un email de confirmation vous sera envoyé après validation de la
          commande. Nous nous réservons le droit de refuser ou d’annuler une
          commande en cas de non-paiement, de litige ou de suspicion de fraude.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-[#E8A499]">
          4. Prix et paiement
        </h2>
        <p>
          Les prix sont indiqués en euros (€). Les frais de livraison sont
          ajoutés au montant de la commande lors de la validation. Le paiement
          s’effectue via les moyens sécurisés proposés sur le site. Le paiement
          intégral est requis pour valider la commande.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-[#E8A499]">
          5. Livraison des produits physiques
        </h2>

        <h3 className="text-lg font-semibold mt-4 mb-1">Modes de livraison</h3>
        <p>Nous proposons les options suivantes :</p>
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li>
            Livraison à domicile via Mondial Relay. Si vous êtes absents, le
            colis sera déposé dans le point relai le plus proche.
          </li>
          <li>Mondial Relay (livraison en point relais)</li>
          <li>
            Click & collect à l’atelier (lieu-dit Saint-Jean de Crots 05200)
          </li>
        </ul>

        <h3 className="text-lg font-semibold mt-4 mb-1">Délais d’expédition</h3>
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li>
            Pour les produits nécessitant une création après commande (pas en
            stock) : l’expédition se fait sous environ 10 jours ouvrés, sauf
            indication contraire précisée directement sur la fiche produit ou
            par email au client.
          </li>
          <li className="mt-2">
            Pour les produits en stock : l’expédition est garantie sous 5 jours
            ouvrés après validation du paiement.
          </li>
        </ul>
        <h3 className="text-lg font-semibold mt-4 mb-1">Délais de livraison</h3>
        <p>
          Une fois expédiée, la livraison dépend des délais du transporteur
          choisi (généralement 2 à 5 jours ouvrés). Nous ne pouvons être tenus
          responsables des retards de livraison dus au transporteur ou à des
          circonstances exceptionnelles (grèves, intempéries, etc.).
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-[#E8A499]">
          6. Produits numériques téléchargeables
        </h2>
        <p>
          Les produits numériques commandés sont accessibles immédiatement après
          confirmation du paiement. Vous recevez un lien de téléchargement dans
          l’email de confirmation. Conformément à l’article L.221-28 du Code de
          la consommation, vous renoncez à votre droit de rétractation dès lors
          que le téléchargement du produit a commencé.
        </p>
        <p className="mt-2">
          <strong>Restrictions d’utilisation</strong>: Il est interdit de modifier, reproduire,
          diffuser, partager ou revendre les produits numériques sans
          l’autorisation écrite préalable d’Audelweiss Craft. Toute utilisation
          non autorisée expose l’utilisateur à des poursuites judiciaires.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-[#E8A499]">
          7. Droit de rétractation (Produits physiques)
        </h2>
        <p>
          Conformément aux dispositions légales, vous disposez d’un délai de 14
          jours à compter de la réception de votre commande pour exercer votre
          droit de rétractation et demander un remboursement.
        </p>
        <p className="mt-2">
          <strong>Exceptions</strong> : Le droit de rétractation ne s’applique pas aux produits
          confectionnés sur mesure ou personnalisés.
        </p>
        <p className="mt-2">
          Pour exercer ce droit, vous devez nous contacter à{" "}
          <a
            href="mailto:contact@audelweiss.fr"
            className="text-pink-600 underline hover:text-pink-700"
          >
            contact@audelweiss.fr
          </a>{" "}
          en précisant votre numéro de commande. Les produits doivent être
          retournés en parfait état, dans leur emballage d’origine, à vos frais.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-[#E8A499]">
          8. Responsabilité
        </h2>
        <p>
          Audelweiss Craft ne peut être tenue responsable des dommages indirects
          liés à l’utilisation des produits ou du site. La responsabilité de
          notre entreprise se limite au montant de la commande.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-[#E8A499]">
          9. Protection des données personnelles
        </h2>
        <p>
          Nous collectons vos données personnelles pour traiter vos commandes.
          Pour plus d’informations sur le traitement de vos données, veuillez
          consulter notre&nbsp;
          <a
            href="lien vers la politique de confidentialité"
            className="text-pink-600 underline hover:text-pink-700"
          >
            Politique de confidentialité
          </a>
          .
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-[#E8A499]">
          10. Propriété intellectuelle
        </h2>
        <p>
          Tous les contenus présents sur le site audelweiss.fr sont protégés par
          le droit d’auteur et restent la propriété exclusive d’Audelweiss
          Craft. Toute reproduction, modification ou diffusion sans autorisation
          préalable est interdite.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2 text-[#E8A499]">
          11. Litiges
        </h2>
        <p>
          Les présentes CGV sont soumises au droit français. En cas de litige,
          nous privilégions une solution amiable. À défaut d’accord, le
          différend sera porté devant les tribunaux compétents du ressort du
          siège social d’Audelweiss Craft à Gap (05).
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-2 text-[#E8A499]">
          12. Modification des CGV
        </h2>
        <p>
          Nous nous réservons le droit de modifier ces Conditions Générales de
          Vente à tout moment. Les CGV applicables sont celles en vigueur au
          moment de la commande.
        </p>
      </section>
    </main>
  );
}
