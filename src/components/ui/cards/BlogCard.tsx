import React from "react";
import Link from "next/link";

import { BlogPost } from "@/data/data";
import ArrowLink from "@/components/ui/links/ArrowLink";

interface BlogCardProps {
    blog: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
    const formatData = (dateString: string): string => {
        const date = new Date(dateString);

        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "2-digit",
        })
    };

    return (
        <div className={"blog-card-outer"}>
            <div className={"blog-card"}>
                <div className={"blog-card-content-wrapper"}>
                    <div className={"blog-card-image-container"}>
                        <Link href={blog.link}>
                            <img src={blog.image} alt={blog.title} className={"blog-card-image"} />
                        </Link>
                    </div>
                    <div className={"blog-card-header"}>
                        <div className={"blog-card-date"}>
                            <span>
                                { formatData(blog.date) }
                            </span>
                        </div>
                        <h5 className={"blog-card-title"}>
                            <Link href={blog.link}>
                                { blog.title }
                            </Link>
                        </h5>
                        <div className={"blog-card-excerpt"}>
                            <p className={"line-clamp-4"}>{ blog.excerpt }</p>
                            <div className={"blog-card-readmore"}>
                                <ArrowLink href={blog.link}>Read more</ArrowLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
