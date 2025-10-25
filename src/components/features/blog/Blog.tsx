// ============================================================
// Component: Blog
// Purpose: Display latest blog posts with grid layout and CTA
// ============================================================

import Link from "next/link";
import React from "react";

import type { BlogSectionProps } from "@/types";

import { BlogPreview, BackdropText, Wrapper } from "@/components";

// ============================================================
// Constants
// ============================================================

const MAX_DISPLAYED_BLOGS = 3;
const BLOG_ROUTE = "/blog";

// ============================================================
// Component Definition
// ============================================================

/**
 * Blog component renders a section displaying the latest blog posts.
 * Features a responsive grid layout with individual blog previews
 * and a call-to-action button to view all posts.
 *
 * @param props - Component props
 * @param props.id - Unique identifier for the section
 * @param props.blogs - Array of blog post data
 * @param props.resetAnimationOnView - Whether to reset animations on view
 * @returns Blog section component
 */
const Blog: React.FC<BlogSectionProps> = ({
    id,
    blogs,
    resetAnimationOnView,
    verticalRulePosition,
}) => {
    // ============================================================
    // Data Processing
    // ============================================================

    // Remove unnecessary useMemo - simple array slice doesn't need memoization
    const displayedBlogs = blogs.slice(0, MAX_DISPLAYED_BLOGS);

    // ============================================================
    // Render
    // ============================================================

    return (
        <Wrapper
            id={id}
            title="Latest Blog"
            subtitle="My Articles and Advice"
            backgroundVariant="gradientUp"
            verticalRulePosition={verticalRulePosition}
            resetAnimationOnView={resetAnimationOnView}
        >
            <div className="flex-wrap-start">
                <div className="w-full relative">
                    {/* Blog Grid */}
                    <div
                        className="mt-[-40px] grid-responsive relative"
                        data-testid="blog-grid"
                        role="list"
                        aria-label="Latest blog posts"
                    >
                        {displayedBlogs.map((blog, index) => (
                            <BlogPreview
                                key={
                                    (blog as any)._id ||
                                    `${blog.title}-${blog.date}-${index}`
                                }
                                blog={blog}
                                data-testid={`blog-preview-${index}`}
                            />
                        ))}
                    </div>

                    {/* View All Button */}
                    <div className="mt-[70px] max-lg:mt-[50px] text-center relative z-2">
                        <Link
                            href={BLOG_ROUTE}
                            aria-label="View all blog posts"
                            prefetch={false}
                            className="inline-block"
                        >
                            <span
                                className="primary-button"
                                data-testid="view-all-blog-button"
                            >
                                View All Posts
                            </span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Decorative backdrop text */}
            <BackdropText text="Blog" />
        </Wrapper>
    );
};

Blog.displayName = "Blog";

export default Blog;
