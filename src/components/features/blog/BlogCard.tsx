import React from "react";
import Link from "next/link";

import type { BlogPostType } from "@/schemas";

import { formatShortDate } from "@/shared/utils/date";

interface BlogCardProps {
    post: BlogPostType;
}

/** A text-forward index row — editorial, matches the site's aesthetic. */
const BlogCard: React.FC<BlogCardProps> = ({ post }) => (
    <article className="blog-card">
        <Link href={`/blog/${post.slug}`} className="blog-card__link group">
            <p className="eyebrow mb-2">
                {post.category}
                {post.category && post.publishedAt ? " · " : ""}
                {formatShortDate(post.publishedAt)}
            </p>
            <h3 className="blog-card__title">{post.title}</h3>
            {post.excerpt && (
                <p className="measure mt-2 text-graph-muted">{post.excerpt}</p>
            )}
            <span className="blog-card__more font-mono-tnum">read ↗</span>
        </Link>
    </article>
);

BlogCard.displayName = "BlogCard";

export default BlogCard;
