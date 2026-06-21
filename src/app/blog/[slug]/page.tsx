import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getPortfolioData } from "@/application/use-cases/content";
import { getBlogPostBySlug } from "@/shared/utils/blog/blogPost.helpers";
import BlogItem from "@/components/features/blog/BlogItem";

interface BlogPostDetailProps {
    params: Promise<{ slug: string }>;
}

export const generateMetadata = async ({
    params,
}: BlogPostDetailProps): Promise<Metadata> => {
    const { slug } = await params;

    const data = await getPortfolioData();

    const post = data.blogs.find((b) => b.slug?.current === slug);
    if (!post) return {};

    return {
        title: post.metaTitle || post.title,
        description: post.metaDescription || post.excerpt,
    };
};

const BlogPostPage = async ({ params }: BlogPostDetailProps) => {
    const { slug } = await params;

    const data = await getPortfolioData();

    const post = await getBlogPostBySlug(slug, data.blogs);
    if (!post) return notFound();

    return <BlogItem slug={slug} />;
};

export default BlogPostPage;
