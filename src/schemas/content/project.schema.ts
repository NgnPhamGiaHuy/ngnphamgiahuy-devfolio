import { z } from "zod";

import SanityDocumentSchema from "../base/sanity-document.schema";
import SanityImageSchema from "../base/sanity-image.schema";
import SeoFieldsSchema from "../base/seo-fields.schema";

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

export type ProjectType = z.infer<typeof ProjectSchema>;

export default ProjectSchema;
