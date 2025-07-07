export default function Revendeurs() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-12 px-4">
      <h1 className="text-3xl font-serif text-center mb-8">
        OÙ RETROUVER MES CRÉATIONS <span role="img" aria-label="main">🧶</span>
      </h1>
      <p className="text-center text-gray-700 max-w-2xl mb-16">
        Tu peux découvrir mes pièces en vrai chez ces revendeurs de confiance, tous engagés dans le fait-main et les créateurs locaux. Voici où me retrouver :
      </p>

      <div className="flex flex-col gap-12 w-full max-w-4xl mb-10">
        <div className="flex flex-col md:flex-row items-start gap-8">
          <img
            src="/images/PXL-Mai-26-2025.jpg.webp"
            alt="O Douceurs Alpines"
            className="w-80 shadow-md object-cover"
          />
          <div>
            <h2 className="text-2xl font-serif mb-1">O DOUCEURS ALPINES</h2>
            <p className="text-gray-400 mb-2">37 rue Clovis Hugues 05200 Embrun</p>
            <p className="mb-2">
              Boutique chaleureuse mêlant gourmandises locales et produits artisanaux. Mes créations y trouvent leur place dans un univers doux et authentique, fidèle à l’esprit des Hautes-Alpes.
            </p>
            <div>
              <span className="font-semibold">Ce que tu peux y trouver :</span>
              <ul className="list-disc list-inside ml-2 text-gray-700">
                <li>dessous de plats et de verres gravés</li>
                <li>portes-clés gravés</li>
                <li>bois gravé, objets de décoration</li>
              </ul>
            </div>
          </div>
        </div>
      
        <div className="flex flex-col md:flex-row items-start gap-8">
          <img
            src="/images/juneink-e.jpeg"
            alt="June Ink"
            className="w-80 shadow-md object-cover"
          />
          <div>
            <h2 className="text-2xl font-serif mb-1">JUNE_INK</h2>
            <p className="text-gray-400 mb-2">Galerie marchande, Les Orres 1650</p>
            <p className="mb-2">
              Concept store d’une tatoueuse, mais surtout <span className="font-bold">artiste</span> créative et engagée au cœur des Hautes-Alpes, June_Ink met en avant l’artisanat local avec une sélection pointue de créateurs. Tu y trouveras quelques-unes de mes pièces aux côtés de belles découvertes.
            </p>
            <div>
              <span className="font-semibold">Ce que tu peux y trouver :</span>
              <ul className="list-disc list-inside ml-2 text-gray-700">
                <li>bandeaux</li>
                <li>sacs</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
