import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { createMockData } from "@/infrastructure";
import { getBlogPostBySlug } from "@/shared/utils/blog/blogPost.helpers";
import BlogItem from "@/components/features/blogItem/BlogItem";

interface BlogPostDetailProps {
    params: Promise<{ slug: string }>;
}

export const generateMetadata = async ({
    params,
}: BlogPostDetailProps): Promise<Metadata> => {
    const { slug } = await params;

    const mockData = createMockData();

    const post = mockData.blogs.find((b) => b.slug?.current === slug);
    if (!post) return {};

    return {
        title: post.metaTitle || post.title,
        description: post.metaDescription || post.excerpt,
    };
};

const BlogPostPage = async ({ params }: BlogPostDetailProps) => {
    const { slug } = await params;

    const mockData = createMockData();

    const post = await getBlogPostBySlug(slug, mockData.blogs);
    if (!post) return notFound();

    return <BlogItem slug={slug} />;
};

export default BlogPostPage;
