import Link from "next/link";
import React from "react";

import type { BlogSectionProps } from "@/shared/types";

import { Section } from "@/components/layouts";

import BlogPreview from "./BlogPreview";

const MAX_DISPLAYED_BLOGS = 3;
const BLOG_ROUTE = "/blog";

const Blog: React.FC<BlogSectionProps> = ({ id, blogs }) => {
    const displayedBlogs = blogs.slice(0, MAX_DISPLAYED_BLOGS);

    return (
        <Section
            id={id}
            tone="panel"
            eyebrow="Writing"
            title="Notes from the build"
            intro="Thinking in public — system design, data engineering, and the decisions behind the work above."
            aria-label="Blog and writing"
        >
            <div
                className="grid-responsive"
                role="list"
                aria-label="Latest writing"
            >
                {displayedBlogs.map((blog, index) => (
                    <BlogPreview
                        key={
                            (blog as any)._id ||
                            `${blog.title}-${blog.date}-${index}`
                        }
                        blog={blog}
                    />
                ))}
            </div>

            {displayedBlogs.length >= MAX_DISPLAYED_BLOGS && (
                <div className="mt-12 text-center">
                    <Link
                        href={BLOG_ROUTE}
                        aria-label="View all writing"
                        prefetch={false}
                    >
                        <span className="secondary-button">
                            View all writing →
                        </span>
                    </Link>
                </div>
            )}
        </Section>
    );
};

Blog.displayName = "Blog";

export default Blog;
