import { z } from "zod";

/**
 * Contact / inquiry model.
 *
 * Two shapes:
 *  - `ContactSubmissionSchema` — the untrusted POST body the API re-validates
 *    (the server is the authority, independent of the client form).
 *  - `ContactRecordSchema` — the stored document in `contacts/`, written
 *    server-side via the Admin SDK. Following the codebase convention,
 *    `_id`/`_type` are NOT stored (id = doc path, type = collection).
 */
export const ContactSubmissionSchema = z.object({
    name: z.string().trim().min(1).max(100),
    email: z.string().trim().toLowerCase().email().max(200),
    subject: z.string().trim().min(1).max(200),
    message: z.string().trim().min(1).max(2000),
});

export type ContactSubmission = z.infer<typeof ContactSubmissionSchema>;

/** Inbox lifecycle — drives the future CRM (Phase 6). */
export const ContactStatusSchema = z.enum([
    "new",
    "read",
    "replied",
    "archived",
]);
export type ContactStatus = z.infer<typeof ContactStatusSchema>;
export const CONTACT_STATUSES = ContactStatusSchema.options;

export const ContactRecordSchema = ContactSubmissionSchema.extend({
    status: ContactStatusSchema,
    /** Where the lead came from (form id / campaign), for later segmentation. */
    source: z.string(),
    /** ISO 8601 timestamp (string keeps it transport- and schema-stable). */
    createdAt: z.string(),
    meta: z
        .object({
            userAgent: z.string().optional(),
            referer: z.string().optional(),
        })
        .optional(),
});

export type ContactRecord = z.infer<typeof ContactRecordSchema>;

export default ContactRecordSchema;
