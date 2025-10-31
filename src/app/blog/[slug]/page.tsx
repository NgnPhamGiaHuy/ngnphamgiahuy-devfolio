// ============================================================
// Route: /blog/[slug]/page
// Purpose: Blog post detail route rendering SSR-ready BlogItem by slug
// ============================================================

// ============================================================
// Imports
// ============================================================
import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { data as mockData } from "@/data";
import { getBlogPostBySlug } from "@/utils/blog/blogPost.helpers";
import BlogItem from "@/components/features/blogItem/BlogItem";

// ============================================================
// Types
// ============================================================
interface BlogPostDetailProps {
    params: Promise<{ slug: string }>;
}

/**
 * generateMetadata resolves OpenGraph/SEO metadata for the blog detail page.
 * Kept lightweight and SSR-safe, using local mock data for now.
 */
export const generateMetadata = async ({
    params,
}: BlogPostDetailProps): Promise<Metadata> => {
    const { slug } = await params;
    const post = mockData.blogs.find((b) => b.slug?.current === slug);
    if (!post) return {};
    return {
        title: post.metaTitle || post.title,
        description: post.metaDescription || post.excerpt,
    };
};

// ============================================================
// Component Definition
// ============================================================
/**
 * BlogPostPage renders a blog article detail by slug, delegating the view to BlogItem.
 * Uses server data resolution and returns 404 when the post is missing.
 */
const BlogPostPage = async ({ params }: BlogPostDetailProps) => {
    const { slug } = await params;

    const post = await getBlogPostBySlug(slug, mockData.blogs);
    if (!post) return notFound();

    return <BlogItem slug={slug} />;
};

// ============================================================
// Export
// ============================================================
export default BlogPostPage;
