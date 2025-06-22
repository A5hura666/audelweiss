import ReactMarkdown from "react-markdown";

export default function MarkdownRenderer({ markdownText }) {
    return (
        <ReactMarkdown
            components={{
                h3: ({ node, ...props }) => (
                    <h1 className="aboreto text-3xl" {...props} />
                ),
                h4: ({ node, ...props }) => (
                    <h1 className="color-pink text-xl font-bold" {...props} />
                ),
                p: ({ node, ...props }) => (
                    <p className="text-gray-700 leading-relaxed" {...props} />
                ),
                a: ({ node, ...props }) => (
                    <a className="text-blue-600 underline" {...props} />
                ),
            }}
        >
            {markdownText}
        </ReactMarkdown>
    );
}
