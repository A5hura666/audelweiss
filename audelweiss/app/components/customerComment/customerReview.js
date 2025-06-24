"use client";

import FormCreateComment from "@/app/components/customerComment/formCreateComment";
import Comment from "@/app/components/customerComment/comment";
import {getStrapiCall} from "@/app/lib/utils";
import {useEffect, useState} from "react";
import StarRating from "@/app/components/StarsComments";

export default function CustomerReview({ productDescriptionId }) {
    const [ratings, setRatings] = useState([
        {score: 5, count: 0, percent: 0},
        {score: 4, count: 0, percent: 0},
        {score: 3, count: 0, percent: 0},
        {score: 2, count: 0, percent: 0},
        {score: 1, count: 0, percent: 0},
    ]);
    const [comments, setComments] = useState([]);
    const [averageRating, setAverageRating] = useState(0);
    useEffect(() => {
        if (!productDescriptionId) return;

        const fetchHeaderData = async () => {
            try {
                const response = await fetch(
                    getStrapiCall(`/api/product-comments?populate=commentImage&populate=product_article_description&filters[product_article_description][id]=${productDescriptionId}`)
                );
                const data = await response.json();
                setComments(data.data);

                // Calculate ratings based on comments
                const totalComments = data.data.length;
                const updatedRatings = ratings.map((rating) => {
                    const count = data.data.filter(
                        (comment) => comment.commentNote === rating.score
                    ).length;
                    const percent = totalComments > 0 ? (count / totalComments) * 100 : 0;
                    return {...rating, count, percent};
                });

                setRatings(updatedRatings);
                // Calculate average rating
                const totalScore = data.data.reduce((sum, comment) => sum + comment.commentNote, 0);
                const average = totalComments > 0 ? (totalScore / totalComments).toFixed(1) : 0;
                setAverageRating(average);

            } catch (error) {
                console.error("Error fetching header data:", error);
            }
        };

        fetchHeaderData();
    }, [productDescriptionId]);

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
                                            <h2 className="font-manrope font-bold text-5xl text-black text-center mb-4">{averageRating}</h2>
                                            <div className="flex items-center gap-3 mb-4">
                                                <StarRating averageRating={averageRating} />
                                            </div>
                                            <p className="font-normal text-lg leading-8 text-gray-400">{comments.length} Ratings</p>
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="pb-8 border-b border-gray-200 max-xl:max-w-3xl max-xl:mx-auto">
                        <h4 className="font-manrope font-semibold text-3xl leading-10 text-black mb-6">Les commentaires des clients</h4>
                        <Comment productComments={comments}></Comment>
                    </div>
                    <div
                        className="flex flex-col sm:flex-row items-center justify-between pt-8  max-xl:max-w-3xl max-xl:mx-auto">
                        <p className="font-normal text-lg py-[1px] text-black">{comments.length} reviews</p>
                    </div>
                </div>
            </div>
            <FormCreateComment productCommentId={productDescriptionId}></FormCreateComment>

        </section>
    );
}