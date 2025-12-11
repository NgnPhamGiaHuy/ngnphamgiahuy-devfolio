import { z } from "zod";

import { FORM_MESSAGES } from "@/infrastructure/config";

const FIELD_CONSTRAINTS = {
    NAME_MIN_LENGTH: 1,
    NAME_MAX_LENGTH: 100,
    SUBJECT_MIN_LENGTH: 1,
    SUBJECT_MAX_LENGTH: 200,
    MESSAGE_MIN_LENGTH: 1,
    MESSAGE_MAX_LENGTH: 1000,
} as const;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const contactFormSchema = z.object({
    name: z
        .string()
        .min(FIELD_CONSTRAINTS.NAME_MIN_LENGTH, {
            message: FORM_MESSAGES.REQUIRED.NAME,
        })
        .max(FIELD_CONSTRAINTS.NAME_MAX_LENGTH, {
            message: "Name must be less than 100 characters",
        })
        .trim(),

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

    subject: z
        .string()
        .min(FIELD_CONSTRAINTS.SUBJECT_MIN_LENGTH, {
            message: FORM_MESSAGES.REQUIRED.SUBJECT,
        })
        .max(FIELD_CONSTRAINTS.SUBJECT_MAX_LENGTH, {
            message: "Subject must be less than 200 characters",
        })
        .trim(),

    message: z
        .string()
        .min(FIELD_CONSTRAINTS.MESSAGE_MIN_LENGTH, {
            message: FORM_MESSAGES.REQUIRED.MESSAGE,
        })
        .max(FIELD_CONSTRAINTS.MESSAGE_MAX_LENGTH, {
            message: "Message must be less than 1000 characters",
        })
        .trim(),

    termsAccepted: z.boolean().refine((val) => val === true, {
        message: FORM_MESSAGES.REQUIRED.TERMS,
    }),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export default contactFormSchema;
