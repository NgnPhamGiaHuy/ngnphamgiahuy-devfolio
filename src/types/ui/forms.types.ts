import { UseFormRegisterReturn } from "react-hook-form";

export interface FormInputProps {
    id: string;
    label: string;
    placeholder?: string;
    type?: string;
    isTextArea?: boolean;
    cols?: number;
    rows?: number;
    error?: string;
    registration: UseFormRegisterReturn;
    className?: string;
}

export interface FormStatusProps {
    submitStatus: {
        type: "success" | "error";
        message: string;
    } | null;
}

export interface SubmitButtonProps {
    isSubmitting: boolean;
}
