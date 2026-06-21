import { z } from "zod";

import DocumentBaseSchema from "../base/document-base.schema";

const EducationSchema = DocumentBaseSchema.extend({
    _type: z.literal("education"),
    year: z.string(),
    degree: z.string(),
    institution: z.string(),
    description: z.string(),
    order: z.number().optional(),
});

export type EducationType = z.infer<typeof EducationSchema>;

export default EducationSchema;
