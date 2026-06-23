import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";

// ============================================================
// Component: Markdown
// Purpose: Render a Markdown string to styled HTML (server component, so it
//          ships in the SSR HTML for crawlers). GFM tables/strikethrough,
//          heading slugs (anchor targets / future TOC), and code syntax
//          highlighting (highlight.js theme loaded in app/blog/layout.tsx).
//          Styling: the .blog-prose scope (styles/components/article.css).
// ============================================================
interface MarkdownProps {
    children: string;
}

const Markdown: React.FC<MarkdownProps> = ({ children }) => (
    <div className="blog-prose">
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeSlug, rehypeHighlight]}
        >
            {children}
        </ReactMarkdown>
    </div>
);

Markdown.displayName = "Markdown";

export default Markdown;
