import { z } from "zod";

import SanityDocumentSchema from "@/schemas/base/sanity-document.schema";
import SanityImageSchema from "@/schemas/base/sanity-image.schema";

const TestimonialSchema = SanityDocumentSchema.extend({
    _type: z.literal("testimonial"),
    name: z.string(),
    position: z.string(),
    quote: z.string(),
    image: z.union([SanityImageSchema, z.string()]),
    order: z.number().optional(),
});

export default TestimonialSchema;
