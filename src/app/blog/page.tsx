import React from "react";
import type { Metadata } from "next";

import { getBlogPosts } from "@/application/use-cases/content";
import { getSiteUrl } from "@/shared";
import { BlogList } from "@/components/features/blog";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
    const base = getSiteUrl();
    return {
        title: "Writing",
        description:
            "Notes on building this site and the decisions behind it.",
        metadataBase: new URL(base),
        alternates: { canonical: "/blog" },
    };
}

const BlogIndexPage = async (): Promise<React.JSX.Element> => {
    const posts = await getBlogPosts();
    return <BlogList posts={posts} />;
};

export default BlogIndexPage;
