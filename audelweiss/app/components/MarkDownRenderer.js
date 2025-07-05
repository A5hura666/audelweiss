import ReactMarkdown from "react-markdown";
import React from "react";

export default function MarkdownRenderer({ markdownText }) {
    return (
        <ReactMarkdown
            components={{
                h2: ({ node, ...props }) => (
                    <h1 className="color-pink font-bold text-2xl sm:text-2xl xl:text-4xl lg:text-4xl " {...props} />
                ),
                h3: ({ node, ...props }) => (
                    <h1 className="color-pink font-bold text-xl sm:text-xl xl:text-2xl lg:text-2xl " {...props} />
                ),
                h4: ({ node, ...props }) => (
                    <h1 className="color-pink text-xl font-bold" {...props} />
                ),
                p: ({ node, children, ...props }) => {
                    // Force children en tableau
                    const childArray = React.Children.toArray(children);

                    const onlyImages = childArray.every(
                        (child) => child.type === "img"
                    );

                    if (onlyImages) {
                        const imagesWithSmallSize = childArray.map((child, index) =>
                            React.cloneElement(child, {
                                key: index,
                                className:
                                    "w-24 sm:w-32 md:w-40 rounded-lg border border-gray-300",
                            })
                        );

                        return (
                            <div className="flex flex-wrap gap-4 my-4">
                                {imagesWithSmallSize}
                            </div>
                        );
                    }

                    return (
                        <div className="text-gray-700 leading-relaxed mb-4" {...props}>
                            {children}
                        </div>
                    );
                },
                a: ({ node, ...props }) => (
                    <a className="color-pink underline" {...props} />
                ),
                img: ({ node, ...props }) => (
                    <img
                        className="w-full rounded-lg border border-gray-300 my-4"
                        {...props}
                    />
                ),
            }}
        >
            {markdownText}
        </ReactMarkdown>
    );
}
