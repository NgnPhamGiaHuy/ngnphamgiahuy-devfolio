import { z } from "zod";

import DocumentBaseSchema from "../base/document-base.schema";
import SeoFieldsSchema from "../base/seo-fields.schema";
import { ImageFieldSchema } from "../base/stored-image.schema";

/**
 * Blog post — Markdown model (Sprint D). Mirrors the project schema's
 * `published`-boolean visibility gate so the same Firestore rule + read-query
 * pattern applies (drafts are hidden + rule-protected). `content` is a Markdown
 * string rendered by components/features/blog/Markdown.tsx.
 */
const BlogPostSchema = DocumentBaseSchema.and(SeoFieldsSchema).and(
    z.object({
        _type: z.literal("blogPost"),
        title: z.string(),
        /** URL slug; also the Firestore document id. */
        slug: z.string(),
        excerpt: z.string(),
        /** Markdown body. */
        content: z.string(),
        coverImage: ImageFieldSchema.optional(),
        author: z.string().optional(),
        category: z.string().optional(),
        tags: z.array(z.string()).optional(),
        /** ISO date the post is/was published (drives ordering + display). */
        publishedAt: z.string().optional(),
        /** Public visibility gate (drafts are hidden + rule-protected). */
        published: z.boolean().optional(),
        order: z.number().optional(),
    })
);

export type BlogPostType = z.infer<typeof BlogPostSchema>;

export default BlogPostSchema;
