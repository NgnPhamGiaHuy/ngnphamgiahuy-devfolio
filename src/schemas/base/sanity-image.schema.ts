import { z } from "zod";

const SanityImageSchema = z.object({
    _type: z.literal("image"),
    asset: z.object({
        _ref: z.string(),
        _type: z.literal("reference"),
    }),
    alt: z.string().optional(),
    caption: z.string().optional(),
});

export default SanityImageSchema;
