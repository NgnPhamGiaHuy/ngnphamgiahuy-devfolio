import { z } from "zod";

export const StoredImageSchema = z.object({
    url: z.string(),
    path: z.string().default(""),
    fileName: z.string().default(""),
    uploadedAt: z.string().optional(),
});

export type StoredImage = z.infer<typeof StoredImageSchema>;

/**
 * Accepts both legacy string URLs and full StoredImage objects.
 * Old Firestore docs with `image: "/path/to/img.png"` auto-normalize to
 * `{ url: "/path/to/img.png", path: "", fileName: "" }` on read.
 */
export const ImageFieldSchema = z.preprocess(
    (v) => (typeof v === "string" ? { url: v, path: "", fileName: "" } : v),
    StoredImageSchema
);
