// ============================================================
// Component: ContactForm
// Purpose: Contact form wrapper with form handling and status display
// ============================================================

"use client";

import React from "react";

import useContactForm from "./hooks/useContactForm";
import { FormStatus, ContactFields } from "@/components";

// ============================================================
// Component Definition
// ============================================================

/**
 * ContactForm component renders a contact form with validation and submission handling.
 * Features form fields, validation, submission status, and error handling.
 *
 * @returns Contact form component
 */
const ContactForm: React.FC = () => {
    // ============================================================
    // Form Handling
    // ============================================================

    const {
        register,
        handleSubmit,
        errors,
        isSubmitting,
        submitStatus,
        onSubmit,
        watch,
    } = useContactForm();

    // ============================================================
    // Render
    // ============================================================

    return (
        <div data-testid="contact-form">
            <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                autoComplete="off"
                aria-label="Contact form"
            >
                <ContactFields
                    register={register}
                    isSubmitting={isSubmitting}
                    errors={errors}
                    watch={watch}
                />
            </form>
            <FormStatus submitStatus={submitStatus} />
        </div>
    );
};

ContactForm.displayName = "ContactForm";

export default ContactForm;
