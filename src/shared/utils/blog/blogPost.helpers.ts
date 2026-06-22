import { headers } from "next/headers";

import type { BlogPostType } from "@/schemas";

import { processImage } from "@/shared";

const IMAGE_WIDTH = 800;
const IMAGE_HEIGHT = 450;
const FALLBACK_IMAGE = "/images/profile2.png";

export const getBlogPostBySlug = async (
    slug: string,
    blogs: BlogPostType[]
) => {
    return blogs.find((b) => b.slug?.current === slug) || null;
};

export const buildImageProps = (post: BlogPostType) => {
    return processImage(
        post.image?.url,
        {
            width: IMAGE_WIDTH,
            height: IMAGE_HEIGHT,
            fallbackImage: FALLBACK_IMAGE,
        },
        { fallbackAlt: post.title }
    );
};

export const buildPostUrl = async (slug: string) => {
    const hdrs = await headers();
    const host =
        hdrs.get("x-forwarded-host") || hdrs.get("host") || "localhost:3000";
    const proto =
        hdrs.get("x-forwarded-proto") ||
        (host.includes("localhost") ? "http" : "https");
    const origin = process.env.NEXT_PUBLIC_SITE_URL || `${proto}://${host}`;

    return `${origin}/blog/${slug}`;
};
