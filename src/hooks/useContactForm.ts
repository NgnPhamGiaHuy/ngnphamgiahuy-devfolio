"use client"

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { API_CONFIG, FORM_MESSAGES } from "@/config";
import { ContactFormData, contactFormSchema } from "@/utils";

const useContactForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{
        type: "success" | "error";
        message: string;
    } | null>(null);

    const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<ContactFormData>({
        resolver: zodResolver(contactFormSchema),
        defaultValues: {
            name: "",
            email: "",
            subject: "",
            message: "",
            termsAccepted: false,
        },
    });

    const onSubmit = async (data: ContactFormData) => {
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            await new Promise((resolve) => setTimeout(resolve, API_CONFIG.TIMEOUT));

            console.log("Form data to submit:", data);

            setSubmitStatus({
                type: "success",
                message: FORM_MESSAGES.SUCCESS,
            });

            reset();
        } catch (error) {
            console.error("Form submission error:", error);
            setSubmitStatus({
                type: "error",
                message: FORM_MESSAGES.ERROR,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return { register, handleSubmit, errors, isSubmitting, submitStatus, onSubmit, watch };
};

export default useContactForm;