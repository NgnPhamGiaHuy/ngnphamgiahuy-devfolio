import { z } from "zod";

import DocumentBaseSchema from "../base/document-base.schema";

const PricingSchema = DocumentBaseSchema.extend({
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
