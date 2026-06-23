import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
    getBlogPostBySlug,
    getBlogPosts,
    getPortfolioData,
} from "@/application/use-cases/content";
import { getSiteUrl, resolveImageUrl } from "@/shared";
import { buildArticleLd, buildBreadcrumbLd } from "@/shared/utils/seo";
import { BlogArticle } from "@/components/features/blog";
import JsonLd from "@/components/seo/JsonLd";

export const revalidate = 300;

interface BlogPostPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
    const posts = await getBlogPosts();
    return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
    params,
}: BlogPostPageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = await getBlogPostBySlug(slug);
    if (!post) return {};

    const base = getSiteUrl();
    const title = post.metaTitle || post.title;
    const description = post.metaDescription || post.excerpt || undefined;
    const ogImage = resolveImageUrl(
        post.ogImage?.url || post.coverImage?.url,
        base
    );

    return {
        title,
        description,
        metadataBase: new URL(base),
        alternates: { canonical: `/blog/${slug}` },
        openGraph: {
            type: "article",
            title,
            description,
            url: `${base}/blog/${slug}`,
            publishedTime: post.publishedAt,
            images: ogImage
                ? [{ url: ogImage, width: 1200, height: 630, alt: post.title }]
                : [],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: ogImage ? [ogImage] : [],
        },
    };
}

const BlogPostPage = async ({
    params,
}: BlogPostPageProps): Promise<React.JSX.Element> => {
    const { slug } = await params;
    const post = await getBlogPostBySlug(slug);
    if (!post) return notFound();

    const { profile } = await getPortfolioData();
    const base = getSiteUrl();

    return (
        <>
            <JsonLd data={buildArticleLd(post, profile, base)} />
            <JsonLd
                data={buildBreadcrumbLd([
                    { name: "Home", url: `${base}/` },
                    { name: "Writing", url: `${base}/blog` },
                    { name: post.title, url: `${base}/blog/${slug}` },
                ])}
            />
            <BlogArticle post={post} />
        </>
    );
};

export default BlogPostPage;
