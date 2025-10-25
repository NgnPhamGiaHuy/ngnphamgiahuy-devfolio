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

/** Contact form field names */
export type ContactFormField = keyof ContactFormData;

/** Contact form validation error */
export type ContactFormError = z.ZodError<ContactFormData>;

// ============================================================
// Utility Functions
// ============================================================

/**
 * Validates contact form data and returns result with error handling.
 *
 * @param data - Form data to validate
 * @returns Validation result with success flag and data/errors
 *
 * @example
 * ```typescript
 * const result = validateContactForm(formData);
 * if (result.success) {
 *   // Process valid data
 *   await submitForm(result.data);
 * } else {
 *   // Handle validation errors
 *   setErrors(result.errors);
 * }
 * ```
 */
export const validateContactForm = (data: unknown) => {
    return contactFormSchema.safeParse(data);
};

/**
 * Gets field-specific validation error message.
 *
 * @param errors - Zod validation errors
 * @param fieldName - Name of the field to get error for
 * @returns Error message for the field or undefined
 *
 * @example
 * ```typescript
 * const result = validateContactForm(formData);
 * if (!result.success) {
 *   const emailError = getFieldError(result.error, 'email');
 *   if (emailError) {
 *     setEmailError(emailError);
 *   }
 * }
 * ```
 */
export const getFieldError = (
    errors: ContactFormError,
    fieldName: ContactFormField
): string | undefined => {
    const fieldError = errors.issues.find(
        (error: z.ZodIssue) => error.path[0] === fieldName
    );
    return fieldError?.message;
};

/**
 * Checks if contact form data is valid without throwing errors.
 *
 * @param data - Form data to check
 * @returns True if valid, false otherwise
 *
 * @example
 * ```typescript
 * if (isValidContactForm(formData)) {
 *   // Form is valid, proceed with submission
 *   submitForm(formData);
 * }
 * ```
 */
export const isValidContactForm = (data: unknown): data is ContactFormData => {
    return contactFormSchema.safeParse(data).success;
};

export default contactFormSchema;
