// ============================================================
// Component: BlogPostHeader
// Purpose: Renders the post meta (categories, date, author) and the h1 title.
// ============================================================

// ============================================================
// Imports
// ============================================================
import React from "react";
import Link from "next/link";

import { formatDate } from "@/utils";

// ============================================================
// Constants
// ============================================================
const TEST_IDS = {
    root: "blog-post-header",
    meta: "post-meta",
    title: "post-title",
} as const;

// ============================================================
// Types
// ============================================================
interface BlogPostHeaderProps {
    title: string;
    categories?: string[];
    date?: string;
    author?: string | null;
}

/**
 * BlogPostHeader renders the meta line and primary h1 title for a blog post.
 * Uses semantic HTML for clarity with screen readers and SEO.
 *
 * @param props - Component props
 * @param props.title - Post title used as the primary page heading (h1)
 * @param props.categories - Optional category labels linked to category pages
 * @param props.date - Optional ISO string or parseable date for publication time
 * @param props.author - Optional author name; defaults to Unknown author
 * @returns JSX.Element - Rendered component
 */

// ============================================================
// Component Definition
// ============================================================
const BlogPostHeader = ({
    title,
    categories,
    date,
    author,
}: BlogPostHeaderProps) => {
    return (
        <header
            className="mx-[-12px] flex flex-wrap"
            aria-label="Post header"
            data-testid={TEST_IDS.root}
        >
            <div className="max-w-full w-full px-[12px] shrink-0">
                <div className="text-center relative">
                    <p
                        className="text-center"
                        aria-label="Post metadata"
                        data-testid={TEST_IDS.meta}
                    >
                        {(categories ?? []).map((category, index, arr) => (
                            <React.Fragment key={category}>
                                <Link
                                    href={`/blog/category/${category.toLowerCase()}`}
                                    className="text-primary font-semibold hover:underline transition-colors duration-200"
                                    aria-label={`View posts in ${category}`}
                                    prefetch={false}
                                >
                                    {category}
                                </Link>
                                {index < arr.length - 1 && ", "}
                            </React.Fragment>
                        ))}
                        <span className="mx-2" aria-hidden>
                            /
                        </span>
                        <time
                            className="text-inverse!"
                            dateTime={date ?? undefined}
                        >
                            {formatDate(date ?? "")}
                        </time>
                        <span className="mx-2" aria-hidden>
                            /
                        </span>
                        <span className="text-inverse!">
                            by&nbsp;
                            {author ? (
                                <span className="text-primary font-semibold">
                                    {author}
                                </span>
                            ) : (
                                <span className="text-muted-foreground">
                                    Unknown author
                                </span>
                            )}
                        </span>
                    </p>
                    <h1
                        className="w-full max-w-[900px] mt-[20px]! mb-0! mx-auto! text-[54px] max-md:text-[34px] max-lg:text-[44px] text-inverse! text-center font-bold uppercase tracking-wider leading-[1.3]"
                        data-testid={TEST_IDS.title}
                    >
                        {title}
                    </h1>
                </div>
            </div>
        </header>
    );
};

// ============================================================
// Export
// ============================================================
export default BlogPostHeader;

// DX: Explicit display name for clearer React DevTools identification
BlogPostHeader.displayName = "BlogPostHeader";
