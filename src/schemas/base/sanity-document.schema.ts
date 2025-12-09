import { z } from "zod";

const SanityDocumentSchema = z.object({
    _id: z.string(),
    _type: z.string(),
    _createdAt: z.string(),
    _updatedAt: z.string(),
    _rev: z.string(),
});

export default SanityDocumentSchema;
