"use client";

export default function UspSection({ uspData }) {
    // Données par défaut si pas de données depuis Strapi
    const defaultUSPs = [
        {
            number: "01",
            title: "Artisanat embrunais",
            description: "Je vis dans les Hautes-Alpes, un cadre qui m'inspire chaque jour. Toutes mes créations sont réalisées ici, à la main, avec des matériaux choisis avec soin. J'aime l'idée de proposer des pièces qui portent en elles un peu de cette authenticité montagnarde."
        },
        {
            number: "02", 
            title: "Éditions limitées ou sur-mesure",
            description: "Je suis une créatrice curieuse, toujours en quête de nouvelles idées. J'aime tester des techniques, des couleurs et des matières différentes. Cette envie d'explorer donne naissance à des pièces variées : certaines sont produites en petites séries, d'autres peuvent être personnalisées selon vos goûts et vos besoins."
        },
        {
            number: "03",
            title: "Énergie et bien-être avec le Reiki", 
            description: "Depuis 2021, je suis certifiée praticienne Reiki. Chaque fois que je crée, je me connecte à cette énergie pour infuser mes pièces d'intentions positives. Mon but est de proposer des créations qui vous apportent à la fois bien-être et harmonie visuelle."
        }
    ];

    const usps = uspData?.items || defaultUSPs;

    return (
        <section className="bg-white px-4 py-24">
            <div className="flex flex-col lg:flex-row justify-center items-center gap-16 lg:gap-28">
                {usps.map((usp, index) => (
                    <article 
                        key={index}
                        className={`w-86 max-w-md ${index === 1 ? 'lg:translate-y-10' : 'lg:-translate-y-10'}`}
                    >
                        <div>
                            <span className="text-[#F6B99C] text-3xl">{usp.number}</span>
                            <h2 className="w-5/6 uppercase text-2xl text-black mt-4 font-normal">
                                {usp.title}
                            </h2>
                            <p className="text-gray-700 mt-2 leading-7">
                                {usp.description}
                            </p>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
} 