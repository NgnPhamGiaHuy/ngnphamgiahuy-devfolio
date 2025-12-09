import { z } from "zod";

import SanityDocumentSchema from "@/schemas/base/sanity-document.schema";

const ExperienceSchema = SanityDocumentSchema.extend({
    _type: z.literal("experience"),
    title: z.string(),
    company: z.string(),
    description: z.string(),
    year: z.string(),
    order: z.number().optional(),
});

export default ExperienceSchema;
