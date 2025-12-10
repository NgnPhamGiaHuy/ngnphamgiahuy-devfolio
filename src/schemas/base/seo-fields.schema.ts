import { z } from "zod";

import SanityImageSchema from "@/schemas/base/sanity-image.schema";

const SeoFields = z.object({
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    ogImage: SanityImageSchema.optional(),
});

export default SeoFields;
