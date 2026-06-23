// ============================================================
// Hook: useContactForm
// Purpose: Manages contact form state, validation, and submission
// ============================================================

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { API_CONFIG, FORM_MESSAGES } from "@/infrastructure/config";
import { AnalyticsEvent, trackEvent } from "@/shared/analytics";
import {
    ContactFormData,
    contactFormSchema,
} from "@/components/features/contact/schemas/contactForm.schema";

// ============================================================
// Types
// ============================================================

/**
 * Form submission status
 */
interface SubmitStatus {
    type: "success" | "error";
    message: string;
}

/**
 * Return type for useContactForm hook
 */
interface UseContactFormReturn {
    /** React Hook Form register function */
    register: ReturnType<typeof useForm<ContactFormData>>["register"];
    /** React Hook Form handleSubmit function */
    handleSubmit: ReturnType<typeof useForm<ContactFormData>>["handleSubmit"];
    /** Form validation errors */
    errors: ReturnType<typeof useForm<ContactFormData>>["formState"]["errors"];
    /** Whether form is currently submitting */
    isSubmitting: boolean;
    /** Form submission status */
    submitStatus: SubmitStatus | null;
    /** Form submission handler */
    onSubmit: (data: ContactFormData) => Promise<void>;
    /** React Hook Form watch function */
    watch: ReturnType<typeof useForm<ContactFormData>>["watch"];
}

// ============================================================
// Hook Definition
// ============================================================

/**
 * Custom hook for managing contact form state and submission.
 * Provides form validation, submission handling, and status management.
 *
 * @returns Object containing form state and handlers
 *
 * @example
 * ```tsx
 * const { register, handleSubmit, errors, isSubmitting, onSubmit } = useContactForm();
 *
 * return (
 *   <form onSubmit={handleSubmit(onSubmit)}>
 *     <input {...register("name")} />
 *     {errors.name && <span>{errors.name.message}</span>}
 *     <button type="submit" disabled={isSubmitting}>
 *       {isSubmitting ? "Sending..." : "Send"}
 *     </button>
 *   </form>
 * );
 * ```
 */
const useContactForm = (): UseContactFormReturn => {
    // ============================================================
    // State
    // ============================================================

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [submitStatus, setSubmitStatus] = useState<SubmitStatus | null>(null);

    // ============================================================
    // Form Configuration
    // ============================================================

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactFormSchema),
        defaultValues: {
            name: "",
            email: "",
            subject: "",
            message: "",
            termsAccepted: false,
            company: "",
        },
    });

    // ============================================================
    // Form Submission Handler
    // ============================================================

    const onSubmit = async (data: ContactFormData): Promise<void> => {
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const response = await fetch(API_CONFIG.ENDPOINT, {
                method: API_CONFIG.METHOD,
                headers: API_CONFIG.HEADERS,
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    subject: data.subject,
                    message: data.message,
                    company: data.company ?? "",
                }),
            });

            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }

            setSubmitStatus({
                type: "success",
                message: FORM_MESSAGES.SUCCESS,
            });
            trackEvent(AnalyticsEvent.ContactSubmit, { subject: data.subject });
            reset();
        } catch (error) {
            // eslint-disable-next-line no-console -- surfaced for debugging; UI shows a friendly status
            console.error("[useContactForm] submission failed", error);
            setSubmitStatus({
                type: "error",
                message: FORM_MESSAGES.ERROR,
            });
            trackEvent(AnalyticsEvent.ContactSubmitError);
        } finally {
            setIsSubmitting(false);
        }
    };

    // ============================================================
    // Return
    // ============================================================

    return {
        register,
        handleSubmit,
        errors,
        isSubmitting,
        submitStatus,
        onSubmit,
        watch,
    };
};

export default useContactForm;
