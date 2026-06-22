import { z } from "zod";

import DocumentBaseSchema from "../base/document-base.schema";
import SeoFieldsSchema from "../base/seo-fields.schema";
import { ImageFieldSchema } from "../base/stored-image.schema";

const BlogPostSchema = DocumentBaseSchema.and(SeoFieldsSchema).and(
    z.object({
        _type: z.literal("blogPost"),
        title: z.string(),
        date: z.string(),
        excerpt: z.string(),
        slug: z.object({
            _type: z.literal("slug"),
            current: z.string(),
        }),
        image: ImageFieldSchema,
        content: z.array(z.any()).optional(),
        categories: z.array(z.string()).optional(),
        author: z.string().optional().nullable(),
        /** Visibility gate for the public site (drafts are hidden + rule-protected). */
        published: z.boolean().optional(),
    })
);

export type BlogPostType = z.infer<typeof BlogPostSchema>;

export default BlogPostSchema;
