import React, { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";

import type { BlogPreviewProps } from "@/types";

import { ArrowLink } from "@/components";
import { formatDate, processImage } from "@/utils";

const IMAGE_WIDTH = 400;
const IMAGE_HEIGHT = 250;

const BlogPreview: React.FC<BlogPreviewProps> = ({ blog }) => {
    const { imageUrl, imageAlt } = useMemo(() => {
        const { url, alt } = processImage(
            blog.image,
            {
                width: IMAGE_WIDTH,
                height: IMAGE_HEIGHT,
                fallbackImage: "/images/profile2.png",
            },
            blog.title
        );
        return { imageUrl: url, imageAlt: alt };
    }, [blog.image, blog.title]);

    const formattedDate = useMemo(() => formatDate(blog.date), [blog.date]);

    const postHref = blog.link;
    const postTitle = blog.title;

    return (
        <div
            className={
                "mt-[40px] max-md:mt-[30px] px-[20px] max-md:px-[10px] relative"
            }
        >
            <div
                className={
                    "p-[30px] flex flex-col bg-card-inverse rounded-[18px] overflow-hidden relative"
                }
            >
                <div className={"flex flex-col"}>
                    <div
                        className={"h-auto mt-[30px] text-[0] order-2 relative"}
                    >
                        <Link
                            href={postHref}
                            aria-label={`Open post: ${postTitle}`}
                            prefetch
                        >
                            <Image
                                src={imageUrl}
                                alt={imageAlt}
                                className={
                                    "w-full h-[180px] object-cover rounded-[20px]"
                                }
                                width={IMAGE_WIDTH}
                                height={IMAGE_HEIGHT}
                                sizes="(max-width: 768px) 100vw, 400px"
                                loading="lazy"
                                decoding="async"
                                fetchPriority="auto"
                            />
                        </Link>
                    </div>
                    <div className={"order-1"}>
                        <div
                            className={
                                "mt-[15px] text-[13px] text-inverse! font-medium uppercase tracking-wider"
                            }
                        >
                            <span>{formattedDate}</span>
                        </div>
                        <h5 className={"text-[24px] text-inverse!"}>
                            <Link
                                href={postHref}
                                aria-label={`Read post: ${postTitle}`}
                                prefetch
                            >
                                {postTitle}
                            </Link>
                        </h5>
                        <div className={"opacity-80"}>
                            <p className={"line-clamp-4"}>{blog.excerpt}</p>
                            <div className={"mt-[10px]"}>
                                <ArrowLink href={postHref}>Read more</ArrowLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

BlogPreview.displayName = "BlogPreview";

export default BlogPreview;
