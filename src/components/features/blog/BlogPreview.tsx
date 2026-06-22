import React from "react";
import Link from "next/link";
import Image from "next/image";

import type { BlogPostType } from "@/schemas";

import { ArrowLink } from "@/components";
import { formatDate, processImage } from "@/shared";

const IMAGE_WIDTH = 400;
const IMAGE_HEIGHT = 250;
const FALLBACK_IMAGE = "/images/profile2.png";

const BlogPreview = ({ blog, ...props }: { blog: BlogPostType }) => {
    const { url: imageUrl, alt: imageAlt } = processImage(
        blog.image?.url,
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

    return (
        <article
            className="mt-[30px] max-md:mt-[24px] px-[16px] max-md:px-[10px] relative h-full"
            data-testid="blog-preview-card"
            {...props}
        >
            <div className="p-6 flex flex-col bg-surface-card rounded-lg overflow-hidden relative hover:shadow-soft transition-shadow h-full">
                <div className="h-full flex flex-col justify-between">
                    {/* Blog Image */}
                    <div className="h-auto mt-[20px] text-[0] order-2 relative">
                        <Link
                            href={postHref}
                            aria-label={`View blog post: ${postTitle}`}
                            prefetch={false}
                        >
                            <Image
                                src={imageUrl}
                                alt={imageAlt}
                                className="w-full aspect-video object-cover rounded-[20px]"
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
                    <div className="order-1 flex flex-1 flex-col justify-between">
                        <div>
                            {/* Publication Date */}
                            <time
                                className="mt-[8px] mb-[2px] text-[13px] text-ink! font-medium uppercase tracking-wider block"
                                dateTime={blog.date}
                            >
                                {formattedDate}
                            </time>

                            {/* Blog Title */}
                            <h3 className="text-[22px] text-ink! line-clamp-2">
                                <Link
                                    href={postHref}
                                    aria-label={`Read blog post: ${postTitle}`}
                                    prefetch={false}
                                    className="hover:text-primary transition-colors duration-700"
                                >
                                    {postTitle}
                                </Link>
                            </h3>
                        </div>

                        {/* Blog Excerpt */}
                        <div className="opacity-80">
                            <p className="mb-1 line-clamp-4">{blog.excerpt}</p>
                        </div>

                        {/* Action */}
                        <div className="mt-[8px] opacity-80">
                            <ArrowLink href={postHref}>Read more</ArrowLink>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
};

BlogPreview.displayName = "BlogPreview";

export default BlogPreview;
