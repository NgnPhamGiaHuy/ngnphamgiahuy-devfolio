import { z } from "zod";

const SeoFields = z.object({
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    ogImage: z.string().optional(),
});

export type SeoFieldsType = z.infer<typeof SeoFields>;

export default SeoFields;
