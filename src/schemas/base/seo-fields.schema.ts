import { z } from "zod";

import { ImageFieldSchema } from "./stored-image.schema";

const SeoFields = z.object({
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    ogImage: ImageFieldSchema.optional(),
});

export type SeoFieldsType = z.infer<typeof SeoFields>;

export default SeoFields;
