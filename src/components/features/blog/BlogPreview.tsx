// ============================================================
// Component: BlogPreview
// Purpose: Individual blog post preview card with image, title, and excerpt
// ============================================================

import React from "react";
import Link from "next/link";
import Image from "next/image";

import type { BlogPreviewProps } from "@/types";

import { ArrowLink } from "@/components";
import { formatDate, processImage } from "@/utils";

// ============================================================
// Constants
// ============================================================

const IMAGE_WIDTH = 400;
const IMAGE_HEIGHT = 250;
const FALLBACK_IMAGE = "/images/profile2.png";

// ============================================================
// Component Definition
// ============================================================

/**
 * BlogPreview component renders an individual blog post preview card.
 * Displays blog image, publication date, title, excerpt, and read more link.
 * Features hover effects and optimized image loading for better UX.
 *
 * @param props - Component props
 * @param props.blog - Blog post data object
 * @param props - Additional props passed through to article element
 * @returns Blog preview card component
 */
const BlogPreview: React.FC<BlogPreviewProps> = ({ blog, ...props }) => {
    // ============================================================
    // Data Processing
    // ============================================================

    const { url: imageUrl, alt: imageAlt } = processImage(
        blog.image,
        {
            width: IMAGE_WIDTH,
            height: IMAGE_HEIGHT,
            fallbackImage: FALLBACK_IMAGE,
        },
        { fallbackAlt: blog.title }
    );

    const formattedDate = formatDate(blog.date);
    const postHref = `/blog/${blog.slug.current}`;
    const postTitle = blog.title;

    // ============================================================
    // Render
    // ============================================================

    return (
        <article
            className="mt-[40px] max-md:mt-[30px] px-[20px] max-md:px-[10px] relative"
            data-testid="blog-preview-card"
            {...props}
        >
            <div className="p-[30px] flex flex-col bg-card-inverse rounded-[18px] overflow-hidden relative">
                <div className="flex flex-col">
                    {/* Blog Image */}
                    <div className="h-auto mt-[30px] text-[0] order-2 relative">
                        <Link
                            href={postHref}
                            aria-label={`View blog post: ${postTitle}`}
                            prefetch={false}
                        >
                            <Image
                                src={imageUrl}
                                alt={imageAlt}
                                className="w-full h-[180px] object-cover rounded-[20px]"
                                width={IMAGE_WIDTH}
                                height={IMAGE_HEIGHT}
                                sizes="(max-width: 768px) 100vw, 400px"
                                loading="lazy"
                                decoding="async"
                                fetchPriority="auto"
                            />
                        </Link>
                    </div>

                    {/* Blog Content */}
                    <div className="order-1">
                        {/* Publication Date */}
                        <time
                            className="mt-[15px] text-[13px] text-inverse! font-medium uppercase tracking-wider block"
                            dateTime={blog.date}
                        >
                            {formattedDate}
                        </time>

                        {/* Blog Title */}
                        <h3 className="text-[24px] text-inverse!">
                            <Link
                                href={postHref}
                                aria-label={`Read blog post: ${postTitle}`}
                                prefetch={false}
                                className="hover:text-primary transition-colors duration-700"
                            >
                                {postTitle}
                            </Link>
                        </h3>

                        {/* Blog Excerpt */}
                        <div className="opacity-80">
                            <p className="line-clamp-4">{blog.excerpt}</p>
                            <div className="mt-[10px]">
                                <ArrowLink href={postHref}>Read more</ArrowLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
};

BlogPreview.displayName = "BlogPreview";

export default BlogPreview;
