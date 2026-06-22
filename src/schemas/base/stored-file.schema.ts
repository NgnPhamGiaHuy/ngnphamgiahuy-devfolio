import { z } from "zod";

export const StoredFileSchema = z.object({
    url: z.string(),
    path: z.string().default(""),
    fileName: z.string().default(""),
    fileSize: z.number().default(0),
    mimeType: z.string().default(""),
    uploadedAt: z.string().optional(),
});

export type StoredFile = z.infer<typeof StoredFileSchema>;

/**
 * Accepts legacy string URLs (e.g. old cv_link: "https://...") and normalizes
 * them to a StoredFile object so existing Firestore docs continue to parse.
 */
export const FileFieldSchema = z.preprocess(
    (v) =>
        typeof v === "string"
            ? { url: v, path: "", fileName: "", fileSize: 0, mimeType: "" }
            : v,
    StoredFileSchema
);

// ---- Icon reference --------------------------------------------------------

export const SocialIconRefSchema = z.object({
    library: z.string(),
    name: z.string(),
});

export type SocialIconRef = z.infer<typeof SocialIconRefSchema>;

/**
 * Accepts legacy string icon paths ("/icons/github.svg") and normalizes them
 * to { library: "legacy", name: path } for backward-compatible rendering.
 */
export const IconFieldSchema = z.preprocess(
    (v) =>
        typeof v === "string" && v
            ? { library: "legacy", name: v }
            : v || undefined,
    SocialIconRefSchema.optional()
);
