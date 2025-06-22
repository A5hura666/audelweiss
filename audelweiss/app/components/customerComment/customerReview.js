"use client";

import FormCreateComment from "@/app/components/customerComment/formCreateComment";
import Comment from "@/app/components/customerComment/comment";

const ratings = [
    {score: 5, count: 2, percent: 2},
    {score: 4, count: 40, percent: 40},
    {score: 3, count: 20, percent: 20},
    {score: 2, count: 16, percent: 16},
    {score: 1, count: 8, percent: 8},
];

export default function CustomerReview() {
    return (
        <section className="py-24 relative">
            <div className="w-full max-w-7xl px-4 md:px-5 lg:px-6 mx-auto">
                <div className="">
                    <h2 className="font-manrope font-bold text-3xl sm:text-4xl leading-10 text-black mb-8 text-center">
                        Avis et notes des clients</h2>
                    <div className="flex justify-center mb-11">
                        <div className="col-span-12 xl:col-span-4 flex items-center">
                            <div className="box flex flex-col gap-y-4 w-full max-xl:max-w-3xl mx-auto">
                                {ratings.map((rating) => (
                                    <div key={rating.score} className="flex items-center w-full">
                                        <p className="font-medium text-lg py-[1px] text-black mr-[2px]">{rating.score}</p>
                                        {/* étoile SVG */}
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path
                                                d="M9.10326 2.31699C9.47008 1.57374 10.5299 1.57374 10.8967 2.31699L12.7063 5.98347C12.8519 6.27862 13.1335 6.48319 13.4592 6.53051L17.5054 7.11846C18.3256 7.23765 18.6531 8.24562 18.0596 8.82416L15.1318 11.6781C14.8961 11.9079 14.7885 12.2389 14.8442 12.5632L15.5353 16.5931C15.6754 17.41 14.818 18.033 14.0844 17.6473L10.4653 15.7446C10.174 15.5915 9.82598 15.5915 9.53466 15.7446L5.91562 17.6473C5.18199 18.033 4.32456 17.41 4.46467 16.5931L5.15585 12.5632C5.21148 12.2389 5.10393 11.9079 4.86825 11.6781L1.94038 8.82416C1.34687 8.24562 1.67438 7.23765 2.4946 7.11846L6.54081 6.53051C6.86652 6.48319 7.14808 6.27862 7.29374 5.98347L9.10326 2.31699Z"
                                                fill="#FBBF24"/>
                                        </svg>
                                        {/* barre */}
                                        <p className="h-2 w-full sm:min-w-[278px] rounded-[30px] bg-gray-200 ml-5 mr-3">
                                          <span
                                              className="h-full rounded-[30px] bg-[#e8a499] flex"
                                              style={{width: `${rating.percent}%`}}
                                          ></span>
                                        </p>
                                        {/* nombre de votes */}
                                        <p className="font-medium text-lg py-[1px] text-black mr-[2px]">{rating.count}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="col-span-12 max-xl:mt-8 xl:col-span-8 xl:pl-8 min-h-[230px] w-fit">
                            <div
                                className="grid grid-cols-8 h-full px-8 max-lg:py-8 rounded-3xl bg-gray-100 max-xl:w-fit max-xl:mx-auto w-fit">
                                <div className="col-span-8  flex items-center">
                                    <div
                                        className="flex flex-col sm:flex-row items-center max-lg:justify-center w-full h-full">
                                        <div
                                            className="sm:pr-3 border-gray-200 flex items-center justify-center flex-col">
                                            <h2 className="font-manrope font-bold text-5xl text-black text-center mb-4">4.3</h2>
                                            <div className="flex items-center gap-3 mb-4">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36"
                                                     viewBox="0 0 36 36" fill="none">
                                                    <g clipPath="url(#clip0_13624_3137)">
                                                        <path
                                                            d="M17.1033 2.71738C17.4701 1.97413 18.5299 1.97413 18.8967 2.71738L23.0574 11.1478C23.2031 11.4429 23.4846 11.6475 23.8103 11.6948L33.1139 13.0467C33.9341 13.1659 34.2616 14.1739 33.6681 14.7524L26.936 21.3146C26.7003 21.5443 26.5927 21.8753 26.6484 22.1997L28.2376 31.4656C28.3777 32.2825 27.5203 32.9055 26.7867 32.5198L18.4653 28.145C18.174 27.9919 17.826 27.9919 17.5347 28.145L9.21334 32.5198C8.47971 32.9055 7.62228 32.2825 7.76239 31.4656L9.35162 22.1997C9.40726 21.8753 9.29971 21.5443 9.06402 21.3146L2.33193 14.7524C1.73841 14.1739 2.06593 13.1659 2.88615 13.0467L12.1897 11.6948C12.5154 11.6475 12.7969 11.4429 12.9426 11.1478L17.1033 2.71738Z"
                                                            fill="#FBBF24"/>
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_13624_3137">
                                                            <rect width="36" height="36" fill="white"/>
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36"
                                                     viewBox="0 0 36 36" fill="none">
                                                    <g clipPath="url(#clip0_13624_3137)">
                                                        <path
                                                            d="M17.1033 2.71738C17.4701 1.97413 18.5299 1.97413 18.8967 2.71738L23.0574 11.1478C23.2031 11.4429 23.4846 11.6475 23.8103 11.6948L33.1139 13.0467C33.9341 13.1659 34.2616 14.1739 33.6681 14.7524L26.936 21.3146C26.7003 21.5443 26.5927 21.8753 26.6484 22.1997L28.2376 31.4656C28.3777 32.2825 27.5203 32.9055 26.7867 32.5198L18.4653 28.145C18.174 27.9919 17.826 27.9919 17.5347 28.145L9.21334 32.5198C8.47971 32.9055 7.62228 32.2825 7.76239 31.4656L9.35162 22.1997C9.40726 21.8753 9.29971 21.5443 9.06402 21.3146L2.33193 14.7524C1.73841 14.1739 2.06593 13.1659 2.88615 13.0467L12.1897 11.6948C12.5154 11.6475 12.7969 11.4429 12.9426 11.1478L17.1033 2.71738Z"
                                                            fill="#FBBF24"/>
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_13624_3137">
                                                            <rect width="36" height="36" fill="white"/>
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36"
                                                     viewBox="0 0 36 36" fill="none">
                                                    <g clipPath="url(#clip0_13624_3137)">
                                                        <path
                                                            d="M17.1033 2.71738C17.4701 1.97413 18.5299 1.97413 18.8967 2.71738L23.0574 11.1478C23.2031 11.4429 23.4846 11.6475 23.8103 11.6948L33.1139 13.0467C33.9341 13.1659 34.2616 14.1739 33.6681 14.7524L26.936 21.3146C26.7003 21.5443 26.5927 21.8753 26.6484 22.1997L28.2376 31.4656C28.3777 32.2825 27.5203 32.9055 26.7867 32.5198L18.4653 28.145C18.174 27.9919 17.826 27.9919 17.5347 28.145L9.21334 32.5198C8.47971 32.9055 7.62228 32.2825 7.76239 31.4656L9.35162 22.1997C9.40726 21.8753 9.29971 21.5443 9.06402 21.3146L2.33193 14.7524C1.73841 14.1739 2.06593 13.1659 2.88615 13.0467L12.1897 11.6948C12.5154 11.6475 12.7969 11.4429 12.9426 11.1478L17.1033 2.71738Z"
                                                            fill="#FBBF24"/>
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_13624_3137">
                                                            <rect width="36" height="36" fill="white"/>
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36"
                                                     viewBox="0 0 36 36" fill="none">
                                                    <g clipPath="url(#clip0_13624_3137)">
                                                        <path
                                                            d="M17.1033 2.71738C17.4701 1.97413 18.5299 1.97413 18.8967 2.71738L23.0574 11.1478C23.2031 11.4429 23.4846 11.6475 23.8103 11.6948L33.1139 13.0467C33.9341 13.1659 34.2616 14.1739 33.6681 14.7524L26.936 21.3146C26.7003 21.5443 26.5927 21.8753 26.6484 22.1997L28.2376 31.4656C28.3777 32.2825 27.5203 32.9055 26.7867 32.5198L18.4653 28.145C18.174 27.9919 17.826 27.9919 17.5347 28.145L9.21334 32.5198C8.47971 32.9055 7.62228 32.2825 7.76239 31.4656L9.35162 22.1997C9.40726 21.8753 9.29971 21.5443 9.06402 21.3146L2.33193 14.7524C1.73841 14.1739 2.06593 13.1659 2.88615 13.0467L12.1897 11.6948C12.5154 11.6475 12.7969 11.4429 12.9426 11.1478L17.1033 2.71738Z"
                                                            fill="#FBBF24"/>
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_13624_3137">
                                                            <rect width="36" height="36" fill="white"/>
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36"
                                                     viewBox="0 0 36 36" fill="none">
                                                    <g clipPath="url(#clip0_13624_3137)">
                                                        <path
                                                            d="M17.1033 2.71738C17.4701 1.97413 18.5299 1.97413 18.8967 2.71738L23.0574 11.1478C23.2031 11.4429 23.4846 11.6475 23.8103 11.6948L33.1139 13.0467C33.9341 13.1659 34.2616 14.1739 33.6681 14.7524L26.936 21.3146C26.7003 21.5443 26.5927 21.8753 26.6484 22.1997L28.2376 31.4656C28.3777 32.2825 27.5203 32.9055 26.7867 32.5198L18.4653 28.145C18.174 27.9919 17.826 27.9919 17.5347 28.145L9.21334 32.5198C8.47971 32.9055 7.62228 32.2825 7.76239 31.4656L9.35162 22.1997C9.40726 21.8753 9.29971 21.5443 9.06402 21.3146L2.33193 14.7524C1.73841 14.1739 2.06593 13.1659 2.88615 13.0467L12.1897 11.6948C12.5154 11.6475 12.7969 11.4429 12.9426 11.1478L17.1033 2.71738Z"
                                                            fill="#FBBF24"/>
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_13624_3137">
                                                            <rect width="36" height="36" fill="white"/>
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </div>
                                            <p className="font-normal text-lg leading-8 text-gray-400">46 Ratings</p>
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="pb-8 border-b border-gray-200 max-xl:max-w-3xl max-xl:mx-auto">
                        <h4 className="font-manrope font-semibold text-3xl leading-10 text-black mb-6">Most helpful
                            positive
                            review</h4>
                        <Comment></Comment>
                    </div>
                    <div
                        className="flex flex-col sm:flex-row items-center justify-between pt-8  max-xl:max-w-3xl max-xl:mx-auto">
                        <p className="font-normal text-lg py-[1px] text-black">46 reviews</p>
                    </div>
                </div>
            </div>
            <FormCreateComment></FormCreateComment>

        </section>
    );
}