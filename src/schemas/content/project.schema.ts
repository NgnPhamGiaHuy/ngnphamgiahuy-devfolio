import { z } from "zod";

import SanityDocumentSchema from "@/schemas/base/sanity-document.schema";
import SanityImageSchema from "@/schemas/base/sanity-image.schema";
import SeoFieldsSchema from "@/schemas/base/seo-fields.schema";

const ProjectSchema = SanityDocumentSchema.and(SeoFieldsSchema).and(
    z.object({
        _type: z.literal("project"),
        name: z.string(),
        category: z.string(),
        description: z.string(),
        image: z.union([SanityImageSchema, z.string()]),
        link: z.string().optional(),
        featured: z.boolean().optional(),
        order: z.number().optional(),
    })
);

export default ProjectSchema;
