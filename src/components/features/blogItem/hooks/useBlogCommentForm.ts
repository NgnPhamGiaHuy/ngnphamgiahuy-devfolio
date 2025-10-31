"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { API_CONFIG, FORM_MESSAGES } from "@/config";
import { BlogCommentFormData, blogCommentFormSchema } from "@/schemas";

interface SubmitStatus {
    type: "success" | "error";
    message: string;
}

const useBlogCommentForm = () => {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [submitStatus, setSubmitStatus] = useState<SubmitStatus | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isValid, isSubmitted },
        reset,
        watch,
    } = useForm<BlogCommentFormData>({
        resolver: zodResolver(blogCommentFormSchema),
        mode: "onChange",
        criteriaMode: "all",
        defaultValues: {
            message: "",
            name: "",
            email: "",
            termsAccepted: false,
        },
    });

    const onSubmit = async (data: BlogCommentFormData): Promise<void> => {
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            await new Promise((resolve) =>
                setTimeout(resolve, API_CONFIG.TIMEOUT)
            );

            const serialized = JSON.stringify(data);
            void serialized;

            setSubmitStatus({
                type: "success",
                message: FORM_MESSAGES.SUCCESS,
            });
            reset();
        } catch {
            setSubmitStatus({ type: "error", message: FORM_MESSAGES.ERROR });
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        register,
        handleSubmit,
        errors,
        isValid,
        isSubmitted,
        isSubmitting,
        submitStatus,
        onSubmit,
        watch,
    };
};

export default useBlogCommentForm;
