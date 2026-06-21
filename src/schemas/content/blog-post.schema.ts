import { z } from "zod";

import DocumentBaseSchema from "../base/document-base.schema";
import SeoFieldsSchema from "../base/seo-fields.schema";

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
        image: z.string(),
        content: z.array(z.any()).optional(),
        categories: z.array(z.string()).optional(),
        author: z.string().optional().nullable(),
    })
);

export type BlogPostType = z.infer<typeof BlogPostSchema>;

export default BlogPostSchema;
