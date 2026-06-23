// ============================================================
// Use-case: GetBlogPosts
// Purpose: Published blog posts for the public /blog routes — from Firestore
//          when configured, else the static demo set (same never-blank contract
//          as getPortfolioData). Sorted newest-first in memory (no Firestore
//          composite index required).
// ============================================================
import { cache } from "react";
import { where } from "firebase/firestore";

import type { BlogPostType } from "@/schemas";
import BlogPostSchema from "@/schemas/content/blog-post.schema";
import {
    COLLECTIONS,
    firebaseConfigured,
    readCollection,
} from "@/infrastructure/persistence/firebase";
import { REAL_BLOG_POSTS } from "@/infrastructure/persistence/content/blog-content";

const byDateDesc = (a: BlogPostType, b: BlogPostType): number =>
    (b.publishedAt ?? "").localeCompare(a.publishedAt ?? "");

const mockPosts = (): BlogPostType[] =>
    REAL_BLOG_POSTS.map((p, i) =>
        BlogPostSchema.parse({
            _id: p.slug ?? `post-${i}`,
            _type: "blogPost",
            ...p,
        })
    ).sort(byDateDesc);

const load = async (): Promise<BlogPostType[]> => {
    if (!firebaseConfigured()) return mockPosts();

    try {
        // Draft gate: the rule requires published == true for anon reads.
        const posts = await readCollection(
            COLLECTIONS.blogPosts,
            "blogPost",
            BlogPostSchema,
            [where("published", "==", true)]
        );
        // Empty collection → demo content, consistent with the project fallback.
        return posts.length ? [...posts].sort(byDateDesc) : mockPosts();
    } catch (error) {
        console.error(
            "[getBlogPosts] Firestore read failed — serving fallback.",
            error
        );
        return mockPosts();
    }
};

/** Memoized per request so the index, a post, and the sitemap share one fetch. */
export const getBlogPosts = cache(load);

export const getBlogPostBySlug = async (
    slug: string
): Promise<BlogPostType | null> =>
    (await getBlogPosts()).find((p) => p.slug === slug) ?? null;
