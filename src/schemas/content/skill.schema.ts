import { z } from "zod";

import SanityDocumentSchema from "@/schemas/base/sanity-document.schema";

const SkillSchema = SanityDocumentSchema.extend({
    _type: z.literal("skill"),
    name: z.string(),
    order: z.number().optional(),
    category: z.string().optional(),
    description: z.string(),
    experience_years: z.number(),
});

export default SkillSchema;
