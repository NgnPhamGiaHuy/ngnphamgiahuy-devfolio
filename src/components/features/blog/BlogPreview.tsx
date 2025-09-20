import React from "react";
import Link from "next/link";
import Image from "next/image";

import { processImage } from "@/utils";
import { BlogPreviewProps } from "@/types";
import { ArrowLink } from "@/components";

const BlogPreview: React.FC<BlogPreviewProps> = ({ blog }) => {
    const { url: imageUrl, alt: imageAlt } = processImage(
        blog.image,
        { width: 400, height: 250, fallbackImage: "/images/profile2.png" },
        blog.title
    );

    const formatData = (dateString: string): string => {
        const date = new Date(dateString);

        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "2-digit",
        })
    };

    return (
        <div className={"mt-[40px] max-md:mt-[30px] px-[20px] max-md:px-[10px] relative"}>
            <div className={"p-[30px] flex flex-col bg-card-inverse rounded-[18px] overflow-hidden relative"}>
                <div className={"flex flex-col"}>
                    <div className={"h-auto mt-[30px] text-[0] order-2 relative"}>
                        <Link href={blog.link}>
                            <Image
                                src={imageUrl}
                                alt={imageAlt}
                                className={"w-full h-[180px] object-cover rounded-[20px]"}
                                width={400}
                                height={250}
                            />
                        </Link>
                    </div>
                    <div className={"order-1"}>
                        <div className={"mt-[15px] text-[13px] text-inverse! font-medium uppercase tracking-wider"}>
                            <span>
                                {formatData(blog.date)}
                            </span>
                        </div>
                        <h5 className={"text-[24px] text-inverse!"}>
                            <Link href={blog.link}>
                                {blog.title}
                            </Link>
                        </h5>
                        <div className={"opacity-80"}>
                            <p className={"line-clamp-4"}>{blog.excerpt}</p>
                            <div className={"mt-[10px]"}>
                                <ArrowLink href={blog.link}>Read more</ArrowLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogPreview;


