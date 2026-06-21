import { z } from "zod";

import DocumentBaseSchema from "../base/document-base.schema";

const SkillSchema = DocumentBaseSchema.extend({
    _type: z.literal("skill"),
    name: z.string(),
    order: z.number().optional(),
    category: z.string().optional(),
    description: z.string(),
    experience_years: z.number(),
});

export type SkillType = z.infer<typeof SkillSchema>;

export default SkillSchema;
