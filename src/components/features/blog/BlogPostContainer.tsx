// ============================================================
// Component: BlogPostContainer
// Purpose: Main article container that renders portable content, social share,
//          and the comment form with decorative layout.
// ============================================================

// ============================================================
// Imports
// ============================================================
import clsx from "clsx";
import React from "react";

import {
    BlogItemForm,
    BlogPostContent,
    SocialShare,
    VerticalRule,
} from "@/components";

// ============================================================
// Constants
// ============================================================
const TEST_IDS = {
    root: "blog-post-container",
    article: "blog-post-article",
} as const;

// ============================================================
// Types
// ============================================================
interface BlogPostContainerProps {
    className?: string;
    contentValue?: any[];
    excerpt?: string;
    postUrl: string;
    postTitle: string;
}

/**
 * BlogPostContainer renders the main content area for a blog article.
 * It handles a portable-text value or falls back to an excerpt.
 *
 * Intent: Keep presentation predictable and accessible while allowing
 * content shape to evolve (portable text vs. excerpt fallback).
 *
 * @param props - Component props
 * @param props.className - Optional class name for layout composition
 * @param props.contentValue - Portable text blocks for the article body
 * @param props.excerpt - Fallback summary when content is unavailable
 * @param props.postUrl - Absolute or canonical URL used for sharing
 * @param props.postTitle - Title used for sharing accessibility/SEO
 * @returns JSX.Element - Rendered component
 */

// ============================================================
// Component Definition
// ============================================================
const BlogPostContainer: React.FC<BlogPostContainerProps> = ({
    className = "",
    contentValue,
    excerpt,
    postUrl,
    postTitle,
}) => {
    // No hooks/side effects required – component remains SSR-friendly and deterministic

    // ============================================================
    // Render
    // ============================================================
    return (
        <section
            className={clsx(
                "py-[100px] max-lg:py-[50px] z-3 relative",
                className
            )}
            aria-label="Post content"
            data-testid={TEST_IDS.root}
        >
            <div className="sm:max-w-[540px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1140px] 2xl:max-w-[1320px] w-full mx-auto px-[12px] max-md:px-[20px] relative">
                <div className="mx-[-12px] flex flex-wrap">
                    <div className="max-w-full w-full lg:w-[83.3333333333%] ml-[8.3333333333%] max-md:ml-0 max-lg:ml-0 px-[12px] sm:flex-0-0-auto shrink-0 relative">
                        <article
                            aria-label="Article body"
                            data-testid={TEST_IDS.article}
                        >
                            {contentValue?.length ? (
                                <BlogPostContent value={contentValue as any} />
                            ) : (
                                <p className="leading-7">{excerpt}</p>
                            )}
                        </article>
                        <div className="my-[30px]"></div>
                        <SocialShare
                            url={postUrl}
                            title={postTitle}
                            className="my-[30px]"
                        />
                        <BlogItemForm className="mt-[100px] max-md:mt-[60px]" />
                        <VerticalRule
                            top="-70px"
                            right="auto"
                            bottom="-30px"
                            left="-100px"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

// ============================================================
// Export
// ============================================================
export default BlogPostContainer;

// DX: Explicit display name for clearer React DevTools identification
BlogPostContainer.displayName = "BlogPostContainer";
