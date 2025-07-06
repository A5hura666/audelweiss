"use client";


import * as React from "react";
import {useEffect} from "react";
import {getStrapiCall} from "@/app/lib/utils";
import MarkdownRendererAbout from "@/app/components/MarkDownRendererAbout";

export default function About() {

    const [isLoaded, setIsLoaded] = React.useState(false);
    const [stepDescription, setStepDescription] = React.useState("");
    const [title, setTitle] = React.useState("");
    const [aboutLocation, setAboutLocation] = React.useState("");
    const [professionalCareer, setProfessionalCareer] = React.useState("");
    const [aboutImages, setAboutImages] = React.useState([]);
    const [professionalCareerImages, setProfessionalCareerImages] = React.useState([]);
    const [sections, setSections] = React.useState([]);
    const [stepImages, setStepImages] = React.useState([]);

    const parseMarkdownSections = (markdown) => {
        return markdown
            .split("## ")
            .filter((section) => section.trim() !== "")
            .map((section) => {
                const [titleLine, ...contentLines] = section.split("\n");
                return {
                    title: titleLine.trim(),
                    content: contentLines.join("\n").trim(),
                };
            });

    };

    useEffect(() => {
        const fetchHeaderData = async () => {
            try {
                const response = await fetch(
                    getStrapiCall(`/api/about-page?populate=aboutImages&populate=careerImages&populate=stepImages`)
                );
                const data = await response.json();
                if (data && data.data) {
                    const attributes = data.data;
                    setStepDescription(attributes.StepDescription);
                    setTitle(attributes.title);
                    setAboutLocation(attributes.aboutLocation);
                    setProfessionalCareer(attributes.professionalCareer);
                    setProfessionalCareerImages(attributes.careerImages.map(image => `http://ayun.myddns.me:5000${image.url}`));
                    setAboutImages(attributes.aboutImages.map(image => `http://ayun.myddns.me:5000${image.url}`));
                    setStepImages(attributes.stepImages.map(image => `http://ayun.myddns.me:5000${image.url}`));
                    setSections(parseMarkdownSections(stepDescription));
                } else {
                    console.error("No data found in response");
                }
                setIsLoaded(true);
            } catch (error) {
                console.error("Error fetching header data:", error);
            }
        };

        fetchHeaderData();
    }, [stepDescription, stepImages]);
    // Fonction pour parser le markdown en sections


    return (
        <div>
            {!isLoaded && (<div
                role="status"
                className="fixed inset-0 flex items-center justify-center bg-white/70 dark:bg-gray-800/70 z-50"
                style={{backdropFilter: 'blur(5px)'}}
            >
                <svg
                    aria-hidden="true"
                    className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-[#ff6187]"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                    />
                    <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                    />
                </svg>
                <span className="sr-only">Loading...</span>
            </div>)}
            <div
                className={"flex flex-col items-start justify-center text-center text-white py-[20px] 2xl:px-[15%] xl:px-[10%] lg:px-[5%] h-fit"}>
                <section className=" mt-8 pt-10 h-fit relative">
                    <div className="mx-auto px-4">
                        <div className="flex flex-col lg:flex-row justify-between text-left">
                            {/* Section des accessoires qui prend plus de place */}
                            {/* Section des images avec décalage */}
                            <div className="flex justify-center w-full lg:w-[35%] relative sm:min-h-[30rem] lg:min-h-[42rem]">
                                <img
                                    className="w-32 h-[24rem] object-cover rounded-full z-5 sm:hidden lg:block absolute  shadow-2xl  top-0 left-0"
                                    src={aboutImages[0]}
                                    alt="bobine de fils"
                                />
                                <img
                                    className="w-[100%] h-[30rem] object-cover shadow-2xl absolute top-0 left-0 lg:mt-20 lg:ml-24 rounded-2xl"
                                    src={aboutImages[1]}
                                    alt="créatrice d'audelweiss"
                                />
                            </div>
                            <div className="sm:w-[100%] xl:w-[55%] lg:w-[50%] px-8">
                                <div className="flex flex-col justify-between">
                                    <MarkdownRendererAbout markdownText={aboutLocation} />
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
                <section className="bg-white px-4 flex justify-center w-full">
                    <div className="flex flex-col lg:flex-row justify-center items-center gap-16 lg:gap-28 flex-wrap">
                        {sections.map((section, index) => (
                            <article
                                key={index}
                                className="w-[100%] 2xl:w-[60%] xl:w-[40%] lg:w-[30%]  max-w-md relative overflow-visible" // overflow-visible pour que l'image puisse dépasser si besoin
                            >
                                {/* Image de fond décalée */}
                                {stepImages[index] && (
                                    <img
                                        src={stepImages[index]}
                                        alt={`step-${index}`}
                                        className="absolute bottom-[-35%] right-[-35%] w-96 h-96 object-cover opacity-50 z-0 pointer-events-none"
                                    />
                                )}

                                {/* Contenu */}
                                <div className="relative z-10 flex flex-col items-center p-4  bg-opacity-30	 ">
      <span className="text-[#F6B99C] text-3xl">
        {String(index + 1).padStart(2, "0")}
      </span>
                                    <h2 className="w-5/6 uppercase text-2xl text-black mt-4">
                                        {section.title}
                                    </h2>
                                    <p className="text-gray-700 mt-2 leading-7 whitespace-pre-line !text-lg">
                                        <MarkdownRendererAbout markdownText={section.content}/>
                                    </p>
                                </div>
                            </article>
                        ))}

                    </div>
                </section>
                <section className=" mt-8 pt-10 h-fit relative">
                    <div className="mx-auto px-4">
                        <div className="flex flex-col lg:flex-row justify-between text-left">
                            {/* Section des accessoires qui prend plus de place */}
                            <div className="sm:w-[100%] xl:w-[55%] lg:w-[50%] px-8">
                                <div className="flex flex-col justify-between">
                                    <MarkdownRendererAbout markdownText={professionalCareer} />
                                </div>
                            </div>
                            {/* Section des images avec décalage */}
                            <div className="flex justify-center w-full lg:w-[35%] relative min-h-[42rem]">
                                <img
                                    className="w-32 h-[24rem] object-cover rounded-full sm:hidden lg:block  absolute  shadow-2xl  top-0 left-0"
                                    src={professionalCareerImages[0]}
                                    alt="bobine de fils"
                                />
                                <img
                                    className="w-[100%] h-[30rem] object-cover shadow-2xl z-5 absolute top-0 left-0 lg:mt-20 lg:ml-24 rounded-2xl"
                                    src={professionalCareerImages[1]}
                                    alt="créatrice d'audelweiss"
                                />
                            </div>

                        </div>
                    </div>
                </section>

            </div>
        </div>
    )

}
