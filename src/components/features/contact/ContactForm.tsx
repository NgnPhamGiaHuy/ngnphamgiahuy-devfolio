"use client";

import React from "react";

import { ContactFields, FormStatus } from "@/components";
import useContactForm from "@/components/features/contact/hooks/useContactForm";

const ContactForm: React.FC = () => {
    const {
        register,
        handleSubmit,
        errors,
        isSubmitting,
        submitStatus,
        onSubmit,
        watch,
    } = useContactForm();

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
