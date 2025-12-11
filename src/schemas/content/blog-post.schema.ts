import { z } from "zod";

import SanityDocumentSchema from "../base/sanity-document.schema";
import SanityImageSchema from "../base/sanity-image.schema";
import SeoFieldsSchema from "../base/seo-fields.schema";

const BlogPostSchema = SanityDocumentSchema.and(SeoFieldsSchema).and(
    z.object({
        _type: z.literal("blogPost"),
        title: z.string(),
        date: z.string(),
        excerpt: z.string(),
        slug: z.object({
            _type: z.literal("slug"),
            current: z.string(),
        }),
        image: z.union([SanityImageSchema, z.string()]),
        content: z.array(z.any()).optional(),
        categories: z.array(z.string()).optional(),
        author: z.string().optional().nullable(),
    })
);

export type BlogPostType = z.infer<typeof BlogPostSchema>;

export default BlogPostSchema;
