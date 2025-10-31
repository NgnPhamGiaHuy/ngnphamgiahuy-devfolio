// ============================================================
// Component: BlogItem
// Purpose: Server component that resolves a blog post by slug and renders
//          a complete, accessible article view (intro, hero, content, share, form).
// ============================================================

// ============================================================
// Imports
// ============================================================
import React from "react";

import { data as mockData } from "@/data";
import {
    getBlogPostBySlug,
    buildImageProps,
    buildPostUrl,
    withCategoriesBlock,
} from "@/utils/blog/blogPost.helpers";
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
    // Source is mock/static today; can be swapped with CMS queries without changing the view layer
    const post = await getBlogPostBySlug(slug, mockData.blogs);

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
    // Keep content transformation separate from rendering to simplify testing and future reuse
    const contentWithCategories = withCategoriesBlock(post);

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
                // Casting retained to preserve current shape; can be replaced when portable-text types are aligned
                contentValue={contentWithCategories as any}
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
