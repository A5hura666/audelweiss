import Link from "next/link";

export default function Blog() {
  return (
    <div className="bg-white text-black min-h-screen p-6">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-3xl text-black">Blog</h1>
        <p className="mt-8">
          Actualités ou simplement informations complémentaires à mes créations
          😊
        </p>
      </div>

      <article className="flex justify-center mt-10 space-y-10">
        <div className="flex items-center gap-6">
          <div className="w-xl">
            <p className="bg-black text-white px-3 py-1 text-sm inline-block">
              Infos
            </p>
            <h2 className="text-2xl font-bold mt-6">
              Quelle laine choisir ? (Guide Complet 2025)
            </h2>
            <p className="text-[#E8A499] text-sm mt-6">
              12/03/2025 | 4 minutes de lecture estimées
            </p>
            <p className="mt-6">
              Choisir sa laine, c'est un peu comme choisir son tissu pour un
              vêtement ou son café du matin : il existe une multitude d'options,
              chacune avec ses caractéristiques et ses avantages...
            </p>
            <Link
              href="/articles/quelle-laine-choisir"
              className="inline-block mt-4 text-[#FF6187] font-semibold underline underline-offset-8 hover:brightness-90"
            >
              Lire l'article
            </Link>
          </div>

          <div className="w-lg">
            <img
              src="images/bg3-980x702.png.webp"
              alt="Guide sur la laine"
              className="w-full h-auto transition duration-300 ease-in-out hover:brightness-110"
            />
          </div>
        </div>
      </article>
      <article className="flex justify-center mt-10 space-y-10">
        <div className="flex items-center gap-6">
          <div className="w-lg">
            <img
              src="images/bonnet.webp"
              alt="Guide sur la laine"
              className="w-full h-auto transition duration-300 ease-in-out hover:brightness-110"
            />
          </div>
          <div className="w-xl">
            <p className="bg-black text-white px-3 py-1 text-sm inline-block">
              Infos
            </p>
            <h2 className="text-2xl font-bold mt-6">
              🧶 Bonnet en laine VS bonnet en acrylique : lequel choisir ?
            </h2>
            <p className="text-[#E8A499] text-sm mt-6">
              10/03/2025 | 2 minutes de lecture estimées
            </p>
            <p className="mt-6">
              Bonnet en laine ou en acrylique ? Découvre les différences pour
              choisir le plus adapté à tes besoins et consulte mon guide des
              laines. 🧶❄️
            </p>
            <Link
              href="/articles/quelle-laine-choisir"
              className="inline-block mt-4 text-[#FF6187] font-semibold underline hover:brightness-90"
            >
              Lire l'article
            </Link>
          </div>
        </div>
      </article>
      <article className="flex justify-center mt-10 space-y-10">
        <div className="flex items-center gap-6">
          <div className="w-xl">
            <p className="bg-black text-white px-3 py-1 text-sm inline-block">
              Conseils
            </p>
            <h2 className="text-2xl font-bold mt-6">
              Comment entretenir son bonnet en laine pour qu’il dure des années
              ?
            </h2>
            <p className="text-[#E8A499] text-sm mt-6">
              08/03/2025 | 2 minutes de lecture estimées
            </p>
            <p className="mt-6">
              Lave, sèche et entretiens ton bonnet en laine sans l’abîmer !
              Découvre mes conseils pour éviter le feutrage et prolonger sa
              durée de vie. 🧼🧶
            </p>
            <Link
              href="/articles/quelle-laine-choisir"
              className="inline-block mt-4 text-[#FF6187] font-semibold underline hover:brightness-90"
            >
              Lire l'article
            </Link>
          </div>

          <div className="w-lg">
            <img
              src="images/entreitne-tbonnet.webp"
              alt="Guide sur la laine"
              className="w-full h-auto transition duration-300 ease-in-out hover:brightness-110"
            />
          </div>
        </div>
      </article>
      <article className="flex justify-center mt-10 space-y-10">
        <div className="flex items-center gap-6">
          <div className="w-lg">
            <img
              src="images/patate-958x1024.png.webp"
              alt="Guide sur la laine"
              className="w-full h-auto transition duration-300 ease-in-out hover:brightness-110"
            />
          </div>
          <div className="w-xl">
            <p className="bg-black text-white px-3 py-1 text-sm inline-block">
              Idées cadeaux
            </p>
            <h2 className="text-2xl font-bold mt-6">
              🥔 Pourquoi la patate positive au crochet devient un cadeau
              anti-stress tendance ?
            </h2>
            <p className="text-[#E8A499] text-sm mt-6">
              18/02/2025 | 3 minutes de lecture estimées
            </p>
            <p className="mt-6">
              La patate positive au crochet, le cadeau fait main qui booste la
              bonne humeur ! Personnalisable avec un message, adopte la tienne
              pour un max de positivité.
            </p>
            <Link
              href="/articles/quelle-laine-choisir"
              className="inline-block mt-4 text-[#FF6187] font-semibold underline hover:brightness-90"
            >
              Lire l'article
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
