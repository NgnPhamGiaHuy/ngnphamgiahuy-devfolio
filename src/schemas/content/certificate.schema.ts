import { z } from "zod";

import DocumentBaseSchema from "../base/document-base.schema";

const CertificateSchema = DocumentBaseSchema.extend({
    _type: z.literal("certificate"),
    title: z.string(),
    issuer: z.string(),
    issueDate: z.string(),
    expiryDate: z.string().optional(),
    credentialId: z.string().optional(),
    credentialUrl: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    category: z.string().optional(),
    order: z.number().optional(),
});

export type CertificateType = z.infer<typeof CertificateSchema>;

export default CertificateSchema;
