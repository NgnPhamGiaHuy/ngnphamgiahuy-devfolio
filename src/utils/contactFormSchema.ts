import { z } from "zod";

import { FORM_MESSAGES } from "@/config/contactForm.config";

export const contactFormSchema = z.object({
    name: z.string().min(1, { message: FORM_MESSAGES.REQUIRED.NAME }),
    email: z.string().min(1, { message: FORM_MESSAGES.REQUIRED.EMAIL }).email({
        message: FORM_MESSAGES.EMAIL_INVALID,
    }),
    subject: z.string().min(1, { message: FORM_MESSAGES.REQUIRED.SUBJECT }),
    message: z.string().min(1, { message: FORM_MESSAGES.REQUIRED.MESSAGE }),
    termsAccepted: z.boolean().refine((val) => val === true, {
        message: FORM_MESSAGES.REQUIRED.TERMS,
    }),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export default contactFormSchema;