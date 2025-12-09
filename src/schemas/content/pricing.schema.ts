import { z } from "zod";

import SanityDocumentSchema from "@/schemas/base/sanity-document.schema";

const PricingSchema = SanityDocumentSchema.extend({
    _type: "pricing",
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

export default PricingSchema;
