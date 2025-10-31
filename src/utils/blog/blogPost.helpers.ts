import { headers } from "next/headers";

import type { BlogPost } from "@/types";

import { processImage } from "@/utils";
import { sanityFetch, blogPostBySlugQuery } from "@/lib";

const IMAGE_WIDTH = 800;
const IMAGE_HEIGHT = 450;
const FALLBACK_IMAGE = "/images/profile2.png";

export const getBlogPostBySlug = async (
    slug: string,
    fallbackBlogs: BlogPost[]
) => {
    let post: BlogPost | null = null;
    try {
        post = await sanityFetch<BlogPost>({
            query: blogPostBySlugQuery(slug),
        });
    } catch {
        post = null;
    }
    if (!post || !post.slug) {
        post = fallbackBlogs.find((b) => b.slug?.current === slug) || null;
    }
    return post;
};

export const buildImageProps = (post: BlogPost) => {
    return processImage(
        post.image,
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

export const withCategoriesBlock = (post: BlogPost) => {
    const contentWithCategories = post.content ? [...post.content] : [];
    if (post.categories && post.categories.length > 0) {
        contentWithCategories.push({
            _key: "custom-categories-block",
            _type: "categoriesBlock",
            categories: post.categories,
        } as any);
    }
    return contentWithCategories;
};
