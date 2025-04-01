import Link from "next/link";

export default function Home() {
    return (
        <div className="h-[600px] lg:h-[700px] bg-cover bg-center flex flex-col items-center justify-center text-center text-white py-[50px]" style={{ backgroundImage: 'linear-gradient(40deg, rgba(246, 185, 156, 0) 0%, rgba(246, 185, 156, 0.65) 50%, rgba(255, 97, 135, 0.58) 100%), url(/images/homepage/banner.png)' }}>
            <div className="max-w-[1200px] m-auto w-[80%] text-left">
                <h1 className="flex flex-col text-[3rem] lg:text-[5rem] text-[#303028] leading-[3.5rem]">
                    <span>Des créations</span>
                    <span className="lg:text-pink-400 text-white">douce</span>
                    <span>au crochet</span>
                </h1>
                <p className="mt-4 mb-8 max-w-2xl font-light  text-lg text-[#303028] leading-8">
                    Chaque pièce est soigneusement confectionnée à la main dans les Hautes-Alpes.
                    Offrez-vous ou à vos proches un savoir-faire authentique, alliant douceur et originalité.
                </p>
                <Link href="#">
                    <span className="px-6 py-4 text-[#D6D0C2] bg-[#303028] text-white text-lg hover:bg-[#FF6187] transition">
                        Découvrir la boutique
                    </span>
                </Link>
            </div>
        </div>
    );
}
