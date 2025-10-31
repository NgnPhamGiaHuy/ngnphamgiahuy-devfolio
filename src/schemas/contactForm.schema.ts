// ============================================================
// Utility: Contact Form Schema
// Purpose: Zod validation schema for contact form with comprehensive validation
// ============================================================

import { z } from "zod";

import { FORM_MESSAGES } from "@/config";

// ============================================================
// Constants
// ============================================================

/** Field length constraints */
const FIELD_CONSTRAINTS = {
    NAME_MIN_LENGTH: 1,
    NAME_MAX_LENGTH: 100,
    SUBJECT_MIN_LENGTH: 1,
    SUBJECT_MAX_LENGTH: 200,
    MESSAGE_MIN_LENGTH: 1,
    MESSAGE_MAX_LENGTH: 1000,
} as const;

/** Email validation regex pattern */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ============================================================
// Validation Schema
// ============================================================

/**
 * Contact form validation schema using Zod.
 * Provides comprehensive validation for all form fields with custom error messages.
 *
 * @example
 * ```typescript
 * // Basic validation
 * const result = contactFormSchema.safeParse(formData);
 * if (result.success) {
 *   // Form data is valid
 *   console.log(result.data);
 * } else {
 *   // Handle validation errors
 *   console.error(result.error.errors);
 * }
 * ```
 */
export const contactFormSchema = z.object({
    /** User's full name */
    name: z
        .string()
        .min(FIELD_CONSTRAINTS.NAME_MIN_LENGTH, {
            message: FORM_MESSAGES.REQUIRED.NAME,
        })
        .max(FIELD_CONSTRAINTS.NAME_MAX_LENGTH, {
            message: "Name must be less than 100 characters",
        })
        .trim(),

    /** User's email address */
    email: z
        .string()
        .min(FIELD_CONSTRAINTS.NAME_MIN_LENGTH, {
            message: FORM_MESSAGES.REQUIRED.EMAIL,
        })
        .email({
            message: FORM_MESSAGES.EMAIL_INVALID,
        })
        .regex(EMAIL_PATTERN, {
            message: "Please enter a valid email address",
        })
        .toLowerCase()
        .trim(),

    /** Message subject */
    subject: z
        .string()
        .min(FIELD_CONSTRAINTS.SUBJECT_MIN_LENGTH, {
            message: FORM_MESSAGES.REQUIRED.SUBJECT,
        })
        .max(FIELD_CONSTRAINTS.SUBJECT_MAX_LENGTH, {
            message: "Subject must be less than 200 characters",
        })
        .trim(),

    /** Message content */
    message: z
        .string()
        .min(FIELD_CONSTRAINTS.MESSAGE_MIN_LENGTH, {
            message: FORM_MESSAGES.REQUIRED.MESSAGE,
        })
        .max(FIELD_CONSTRAINTS.MESSAGE_MAX_LENGTH, {
            message: "Message must be less than 1000 characters",
        })
        .trim(),

    /** Terms and conditions acceptance */
    termsAccepted: z.boolean().refine((val) => val === true, {
        message: FORM_MESSAGES.REQUIRED.TERMS,
    }),
});

// ============================================================
// Types
// ============================================================

/** Inferred type from contact form schema */
export type ContactFormData = z.infer<typeof contactFormSchema>;

export default contactFormSchema;
