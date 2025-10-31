// ============================================================
// Utility: Blog Comment Form Schema
// Purpose: Zod validation schema for blog comment form
// ============================================================

import { z } from "zod";

import { FORM_MESSAGES } from "@/config";

// ============================================================
// Constants
// ============================================================

const FIELD_CONSTRAINTS = {
    MESSAGE_MIN_LENGTH: 1,
    MESSAGE_MAX_LENGTH: 2000,
    NAME_MIN_LENGTH: 1,
    NAME_MAX_LENGTH: 100,
    EMAIL_MAX_LENGTH: 254,
} as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ============================================================
// Validation Schema
// ============================================================

export const blogCommentFormSchema = z.object({
    message: z
        .string()
        .min(FIELD_CONSTRAINTS.MESSAGE_MIN_LENGTH, {
            message: "Comment is required",
        })
        .max(FIELD_CONSTRAINTS.MESSAGE_MAX_LENGTH, {
            message: "Comment is too long",
        })
        .trim(),
    name: z
        .string()
        .min(FIELD_CONSTRAINTS.NAME_MIN_LENGTH, {
            message: "Name is required",
        })
        .max(FIELD_CONSTRAINTS.NAME_MAX_LENGTH, {
            message: "Name is too long",
        })
        .trim(),
    email: z
        .string()
        .min(1, { message: FORM_MESSAGES.REQUIRED.EMAIL })
        .email({ message: FORM_MESSAGES.EMAIL_INVALID })
        .regex(EMAIL_PATTERN, { message: "Please enter a valid email address" })
        .max(FIELD_CONSTRAINTS.EMAIL_MAX_LENGTH, {
            message: "Email is too long",
        })
        .toLowerCase()
        .trim(),
    termsAccepted: z.boolean().refine((val) => val === true, {
        message: FORM_MESSAGES.REQUIRED.TERMS,
    }),
});

// ============================================================
// Types
// ============================================================

export type BlogCommentFormData = z.infer<typeof blogCommentFormSchema>;

export default blogCommentFormSchema;
