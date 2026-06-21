// ============================================================
// Component: BlogItem
// Purpose: Server component that resolves a blog post by slug and renders
//          a complete, accessible article view (intro, hero, content, share, form).
// ============================================================

// ============================================================
// Imports
// ============================================================
import React from "react";

import { getPortfolioData } from "@/application/use-cases/content";
import {
    buildImageProps,
    buildPostUrl,
    getBlogPostBySlug,
} from "@/shared/utils/blog/blogPost.helpers";
import {
    BlogPostContainer,
    BlogPostHeader,
    BlogPostHeroImage,
    BlogPostIntro,
} from "@/components";

// ============================================================
// Constants
// ============================================================
const TEST_IDS = {
    root: "blog-item-root",
    empty: "blog-item-empty",
} as const;

// ============================================================
// Types
// ============================================================
interface BlogItemProps {
    slug: string;
}

/**
 * BlogItem renders a complete blog article view by slug using SSR-friendly utilities.
 * Designed for SSR and accessibility compliance.
 *
 * Intent: Keep the data fetching isolated and presentation predictable for testing and reuse.
 *
 * @param props - Component props
 * @param props.slug - Slug of the blog post to render
 * @returns JSX.Element - Rendered component
 */

// ============================================================
// Component Definition
// ============================================================
const BlogItem = async ({ slug }: BlogItemProps) => {
    // ------------------------------------------------------------
    // Data Fetch
    // ------------------------------------------------------------
    // Content comes from Firestore (or the static fallback) via the read use-case.
    const data = await getPortfolioData();
    const post = await getBlogPostBySlug(slug, data.blogs);

    // ------------------------------------------------------------
    // Guards
    // ------------------------------------------------------------
    // Gracefully handle missing content (keeps layout stable for parent and enables deterministic tests)
    if (!post) {
        return (
            <div
                className="relative"
                data-testid={TEST_IDS.empty}
                aria-live="polite"
                aria-busy="false"
                role="status"
            />
        );
    }

    // ------------------------------------------------------------
    // Derivations (pure, memo-free for SSR determinism)
    // ------------------------------------------------------------
    const { url: imageUrl, alt: imageAlt } = buildImageProps(post);
    const postUrl = await buildPostUrl(post.slug.current);

    // ============================================================
    // Render
    // ============================================================
    return (
        <article
            className="relative"
            data-testid={TEST_IDS.root}
            aria-label="Blog post"
        >
            <BlogPostIntro>
                <BlogPostHeader
                    title={post.title}
                    categories={post.categories}
                    date={post.date}
                    author={post.author}
                />
            </BlogPostIntro>

            <BlogPostHeroImage src={imageUrl} alt={imageAlt} />

            <BlogPostContainer
                excerpt={post.excerpt}
                postUrl={postUrl}
                postTitle={post.title}
            />
        </article>
    );
};

// ============================================================
// Export
// ============================================================
export default BlogItem;

// DX: Explicit display name for clearer React DevTools identification
BlogItem.displayName = "BlogItem";
