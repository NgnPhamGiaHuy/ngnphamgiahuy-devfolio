import { z } from "zod";

import SanityDocumentSchema from "@/schemas/base/sanity-document.schema";
import SanityImageSchema from "@/schemas/base/sanity-image.schema";
import SeoFieldsSchema from "@/schemas/base/seo-fields.schema";

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
        image: z.url().or(SanityImageSchema),
        content: z.array(z.any()).optional(),
        categories: z.array(z.string()).optional(),
        author: z.string().optional().nullable(),
    })
);

export default BlogPostSchema;
