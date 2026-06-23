import React from "react";

import type { BlogPostType } from "@/schemas";

import { Section } from "@/components/layouts";

import BlogCard from "./BlogCard";

interface BlogListProps {
    posts: BlogPostType[];
}

const BlogList: React.FC<BlogListProps> = ({ posts }) => (
    <Section
        id="blog"
        eyebrow="Writing"
        title="The Notebook"
        intro="Notes on building this site and the decisions behind it."
        aria-label="Blog posts"
    >
        {posts.length === 0 ? (
            <p className="text-graph-muted">No posts yet — check back soon.</p>
        ) : (
            <div className="blog-list">
                {posts.map((post) => (
                    <BlogCard key={post.slug} post={post} />
                ))}
            </div>
        )}
    </Section>
);

BlogList.displayName = "BlogList";

export default BlogList;
