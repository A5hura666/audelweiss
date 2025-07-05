import ReactMarkdown from "react-markdown";

export default function MarkdownRendererAbout({ markdownText }) {
    return (
        <div className="p-6  flex flex-col gap-12">
            <ReactMarkdown
                components={{
                    h2: ({ node, ...props }) => (
                        <p className=" text-6xl sm:text-6xl xl:text-8xl lg:text-7xl text-black" {...props} />
                    ),
                    p: ({ node, ...props }) => (
                        <p className="text-xl text-black" {...props} />
                    ),
                    a: ({ node, ...props }) => (
                        <a className="color-pink hover:underline duration-4" {...props} />
                    ),
                }}
            >
                {markdownText}
            </ReactMarkdown>
        </div>
    );
}
