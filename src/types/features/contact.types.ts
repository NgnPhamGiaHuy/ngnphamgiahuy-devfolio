import {
    FieldErrors,
    UseFormRegisterReturn,
    UseFormWatch,
} from "react-hook-form";

import { ContactItem } from "../sanity.types";
import { ContactFormData } from "@/utils";

export interface ContactFieldsProps {
    register: (name: keyof ContactFormData) => UseFormRegisterReturn;
    errors: FieldErrors<ContactFormData>;
    isSubmitting: boolean;
    watch: UseFormWatch<ContactFormData>;
}

export interface ContactItemProps {
    contact: ContactItem;
}
