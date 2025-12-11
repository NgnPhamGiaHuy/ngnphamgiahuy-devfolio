import {
    FieldErrors,
    UseFormRegisterReturn,
    UseFormWatch,
} from "react-hook-form";

import { ContactFormData } from "@/components/features/contact/schemas/contactForm.schema";

export interface ContactFieldsProps {
    register: (name: keyof ContactFormData) => UseFormRegisterReturn;
    errors: FieldErrors<ContactFormData>;
    isSubmitting: boolean;
    watch: UseFormWatch<ContactFormData>;
}

export interface ContactMethodCardProps {
    type: string;
    value: string;
    label?: string;
}
