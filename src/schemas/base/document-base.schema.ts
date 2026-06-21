import { z } from "zod";

export const DocumentBaseSchema = z.object({
    _id: z.string(),
});

export type DocumentBaseType = z.infer<typeof DocumentBaseSchema>;

export default DocumentBaseSchema;
