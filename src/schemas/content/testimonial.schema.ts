import { z } from "zod";

import DocumentBaseSchema from "../base/document-base.schema";

const TestimonialSchema = DocumentBaseSchema.extend({
    _type: z.literal("testimonial"),
    name: z.string(),
    position: z.string(),
    quote: z.string(),
    image: z.string(),
    order: z.number().optional(),
});

export type TestimonialType = z.infer<typeof TestimonialSchema>;

export default TestimonialSchema;
