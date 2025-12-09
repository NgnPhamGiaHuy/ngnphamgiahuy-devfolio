import { z } from "zod";

import SanityDocumentSchema from "@/schemas/base/sanity-document.schema";

const ServiceSchema = SanityDocumentSchema.extend({
    _type: z.literal("service"),
    icon: z.string().optional(),
    title: z.string(),
    order: z.number().optional(),
    category: z.string(),
    description: z.string(),
});

export default ServiceSchema;
