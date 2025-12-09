import { z } from "zod";

import SanityDocumentSchema from "@/schemas/base/sanity-document.schema";

const EducationSchema = SanityDocumentSchema.extend({
    _type: z.literal("education"),
    year: z.string(),
    degree: z.string(),
    institution: z.string(),
    description: z.string(),
    order: z.number().optional(),
});

export default EducationSchema;
