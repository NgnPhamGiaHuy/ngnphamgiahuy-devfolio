import { z } from "zod";

export const SanityDocumentSchema = z.object({
    _id: z.string(),
    _type: z.string(),
    _createdAt: z.string(),
    _updatedAt: z.string(),
    _rev: z.string(),
});

export type SanityDocumentType = z.infer<typeof SanityDocumentSchema>;

export default SanityDocumentSchema;
