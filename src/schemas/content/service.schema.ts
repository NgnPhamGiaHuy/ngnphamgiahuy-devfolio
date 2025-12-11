import { z } from "zod";

import SanityDocumentSchema from "../base/sanity-document.schema";

const ServiceSchema = SanityDocumentSchema.extend({
    _type: z.literal("service"),
    icon: z.string().optional(),
    title: z.string(),
    order: z.number().optional(),
    category: z.string(),
    description: z.string(),
});

export type ServiceType = z.infer<typeof ServiceSchema>;

export default ServiceSchema;
