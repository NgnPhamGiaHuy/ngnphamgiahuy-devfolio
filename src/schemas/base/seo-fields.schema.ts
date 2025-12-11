import { z } from "zod";

import SanityImageSchema from "../base/sanity-image.schema";

const SeoFields = z.object({
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    ogImage: SanityImageSchema.optional(),
});

export type SeoFieldsType = z.infer<typeof SeoFields>;

export default SeoFields;
