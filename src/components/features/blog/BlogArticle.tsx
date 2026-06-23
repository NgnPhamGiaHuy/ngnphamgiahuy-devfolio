import React from "react";
import Link from "next/link";

import type { BlogPostType } from "@/schemas";

import { formatShortDate } from "@/shared/utils/date";
import { Section } from "@/components/layouts";

import Markdown from "./Markdown";

interface BlogArticleProps {
    post: BlogPostType;
}

const BlogArticle: React.FC<BlogArticleProps> = ({ post }) => (
    <Section id="post" aria-label={post.title}>
        <nav
            className="mb-8 font-mono-tnum text-xs text-graph-muted"
            aria-label="Breadcrumb"
        >
            <Link href="/" className="hover:underline">
                home
            </Link>{" "}
            <span aria-hidden="true">/</span>{" "}
            <Link href="/blog" className="hover:underline">
                writing
            </Link>{" "}
            <span aria-hidden="true">/</span>{" "}
            <span className="text-graph-ink">{post.title}</span>
        </nav>

        <article className="mx-auto max-w-3xl">
            <header className="mb-8">
                <p className="eyebrow mb-2">
                    {post.category}
                    {post.category && post.publishedAt ? " · " : ""}
                    {formatShortDate(post.publishedAt)}
                </p>
                <h1 className="display-fluid case-study-title">{post.title}</h1>
                {post.excerpt && (
                    <p className="measure mt-3 text-lg text-graph-muted">
                        {post.excerpt}
                    </p>
                )}
                {post.author && (
                    <p className="mt-4 font-mono-tnum text-xs text-graph-muted">
                        by {post.author}
                    </p>
                )}
            </header>

            {post.coverImage?.url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    src={post.coverImage.url}
                    alt={post.title}
                    className="mb-8 w-full rounded-[var(--radius-lg)] border border-[var(--color-hairline)]"
                />
            )}

            <Markdown>{post.content}</Markdown>

            {post.tags?.length ? (
                <footer className="mt-10 flex flex-wrap gap-2 border-t border-[var(--color-hairline)] pt-6">
                    {post.tags.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full border border-[var(--color-hairline)] px-3 py-1 font-mono-tnum text-xs text-graph-muted"
                        >
                            {tag}
                        </span>
                    ))}
                </footer>
            ) : null}
        </article>
    </Section>
);

BlogArticle.displayName = "BlogArticle";

export default BlogArticle;
