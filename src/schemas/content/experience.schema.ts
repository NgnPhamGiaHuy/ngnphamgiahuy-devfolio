import { z } from "zod";

import DocumentBaseSchema from "../base/document-base.schema";

const ExperienceSchema = DocumentBaseSchema.extend({
    _type: z.literal("experience"),
    title: z.string(),
    company: z.string(),
    description: z.string(),
    year: z.string(),
    order: z.number().optional(),
});

export type ExperienceType = z.infer<typeof ExperienceSchema>;

export default ExperienceSchema;
