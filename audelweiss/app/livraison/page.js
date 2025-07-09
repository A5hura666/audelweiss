export default function Livraison() {
  return (
    <div className="max-w-3xl mx-auto py-16 px-4 text-gray-800">
      <h1 className="text-3xl font-serif font-normal text-center mb-10 tracking-tight text-black">
        LIVRAISON
      </h1>
      <p className="text-center mb-10 text-lg leading-loose">
        Chez <span className="font-bold">Audelweiss Craft</span>, chaque
        création est réalisée avec soin et envoyée avec toute l’attention
        qu’elle mérite. Voici les options de livraison disponibles :
      </p>

      <h2 className="text-3xl font-bold mb-4 text-[#E8A499]">
        Modes de livraison
      </h2>
      <div className="space-y-8 mb-8">
        <div className="flex items-start flex-col gap-3">
          <span className="font-semibold text-lg text-[#f9a48d]">
            📍 Click & Collect (gratuit)
          </span>
          <div>
            <p className="mt-1 leading-loose">
              Vous habitez dans les <strong>Hautes-Alpes</strong> ou êtes en{" "}
              <strong>vacances dans la région d’Embrun</strong> ? Optez pour le{" "}
              <strong>Click & Collect</strong> et venez récupérer votre commande
              au <strong>Lieu-dit Saint Jean de Crots 05200</strong>
              .<br />
              Une fois votre commande prête, vous recevrez un e-mail ou un
              message pour convenir d’un rendez-vous.
            </p>
          </div>
        </div>

        <div className="flex items-start flex-col gap-3">
          <span className="font-semibold text-lg text-[#f9a48d]">
            📦 Livraison en Point Relais (Mondial Relay)
          </span>
          <div>
            <p className="mt-1 leading-loose">
              Faites livrer votre commande dans un <strong>point relais</strong>{" "}
              de votre choix.
              <br />
              • <strong>Tarif</strong> : entre <strong>6 et 8 €</strong>{" "}
              selon le poids du colis.
              <br />
              • Vous sélectionnerez votre point de retrait lors de la commande.
              <br />• Un e-mail ou un SMS vous sera envoyé dès que votre colis
              sera disponible en point relais.
            </p>
          </div>
        </div>

        <div className="flex items-start flex-col gap-3">
          <span className="font-semibold text-lg text-[#f9a48d]">
            🚚 Livraison à domicile – Colissimo
          </span>
          <div>
            <p className="mt-1 leading-loose">
              Pour une livraison directement chez vous, choisissez{" "}
              <strong>Colissimo</strong>
              (service de La Poste).
              <br />
              • <strong>Tarif</strong> : entre <strong>9 et 13 €</strong> selon le poids du colis.
              <br />
              • Un numéro de suivi vous sera communiqué dès l’expédition.
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold mb-4 text-[#E8A499]">
        Délai d’expédition et de livraison
      </h2>
      <ul className="list-disc list-inside mb-6 leading-loose">
        <li>
          Chaque commande est traitée sous <strong>3 à 5 jours ouvrés</strong>,
          sauf mention contraire sur la fiche produit.
        </li>
        <li>
          Une fois expédié, votre colis est généralement livré sous{" "}
          <strong>48 à 72 heures</strong> pour la France métropolitaine.
        </li>
        <li>
          Ces délais sont indicatifs et peuvent varier en fonction du
          transporteur et des périodes de forte affluence (fêtes, grèves, etc.).
        </li>
      </ul>

      <h2 className="text-3xl font-bold mb-4 text-[#E8A499]">
        Livraison à l’étranger
      </h2>
      <p className="mt-1 mb-6 leading-loose">
        Vous souhaitez être livré(e) en dehors de la France ?{" "}
        <span className="font-semibold">
          Me contacter via le{" "}
          <a href="/contact" className="text-[#ff5e7e] font-bold">
            formulaire de contact
          </a>
        </span>{" "}
        formulaire de contact avant de passer commande afin d’évaluer les
        options et les frais de livraison adaptés à votre pays.
      </p>

      <h2 className="text-3xl font-bold mb-4 text-[#E8A499]">
        Suivi et réclamation
      </h2>
      <ul className="list-disc list-inside mb-6 leading-loose">
        <li>
          Un e-mail de confirmation vous sera envoyé dès l’expédition avec un
          lien de suivi.
        </li>
        <li>
          En cas de problème avec votre livraison (retard, perte, colis
          endommagé),{" "}
          <span className="font-semibold">
            me contacter via le{" "}
            <a href="/contact" className="text-[#ff5e7e] font-bold">
              formulaire de contact
            </a>
          </span>{" "}
          dans un délai de{" "}
          <span className="font-bold">48 heures après réception</span> du colis.
        </li>
        <li>
          Si le colis est retourné à l’expéditeur (adresse incorrecte,
          non-récupération en point relais), un nouvel envoi pourra être
          effectué à vos frais.
        </li>
      </ul>

      <h2 className="text-3xl font-bold mb-4 text-[#E8A499]">
        Retours et droit de rétractation
      </h2>
      <ul className="list-disc list-inside mb-6 leading-loose">
        <li>
          Conformément à{" "}
          <span className="font-bold">
            l’article L.221-18 du Code de la consommation
          </span>
          , vous disposez d’un{" "}
          <span className="font-bold">droit de rétractation de 14 jours</span>{" "}
          après réception du colis (sauf exceptions pour les produits
          personnalisés).
        </li>
        <li>
          Les{" "}
          <span className="font-bold">
            frais de retour sont à la charge du client
          </span>
          .
        </li>
        <li>
          Pour toute demande de retour,{" "}
          <span className="font-semibold">
            me contacter via le{" "}
            <a href="/contact" className="text-[#ff5e7e] font-bold">
              formulaire de contact
            </a>
          </span>{" "}
          en précisant votre numéro de commande et la raison du retour.
        </li>
      </ul>

      <h2 className="text-3xl font-bold mb-4 text-[#E8A499]">
        Mentions légales
      </h2>
      <ul className="list-disc list-inside mb-6 leading-loose">
        <li>
          Les frais de livraison incluent les frais de transport ainsi que
          l’emballage.
        </li>
        <li>
          Je ne peux être tenue responsable des retards liés aux transporteurs
          ou aux événements extérieurs (intempéries, grèves, etc.).
        </li>
      </ul>
      <p className="mt-4">
        Pour toute question,{" "}
        <span className="font-semibold">
          me contacter via le{" "}
          <a href="/contact" className="text-[#ff5e7e] font-bold">
            formulaire de contact
          </a>
        </span>
        .
      </p>
    </div>
  );
}
