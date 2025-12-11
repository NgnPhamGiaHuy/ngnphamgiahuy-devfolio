import { z } from "zod";

import SanityDocumentSchema from "../base/sanity-document.schema";
import SanityImageSchema from "../base/sanity-image.schema";

const TestimonialSchema = SanityDocumentSchema.extend({
    _type: z.literal("testimonial"),
    name: z.string(),
    position: z.string(),
    quote: z.string(),
    image: z.union([SanityImageSchema, z.string()]),
    order: z.number().optional(),
});

export type TestimonialType = z.infer<typeof TestimonialSchema>;

export default TestimonialSchema;
