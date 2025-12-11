import { z } from "zod";

import SanityDocumentSchema from "../base/sanity-document.schema";

const PricingSchema = SanityDocumentSchema.extend({
    _type: z.literal("pricing"),
    plan: z.string(),
    price: z.string(),
    period: z.string(),
    description: z.string(),
    features: z.object({
        included: z.array(z.string()),
        not_included: z.array(z.string()),
    }),
    highlight: z.boolean().optional(),
    order: z.number().optional(),
});

export type PricingType = z.infer<typeof PricingSchema>;

export default PricingSchema;
